#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * LuxePOS — Demo Recorder
 *
 * Convertit les démos HTML animées (sale-flow, inventory-import) en :
 *   - MP4 1280x800 (capture Puppeteer brute)
 *   - Variantes croppées/redimensionnées : insta-square 1080x1080,
 *     insta-story 1080x1920, readme 1280x800, twitter 1200x675
 *   - GIFs optimisés (palettegen + paletteuse) pour chaque variante
 *
 * Usage:
 *   node record.js [--demo=sale-flow|inventory-import|all] [--format=mp4|gif|all]
 *
 * Output: marketing/demo/output/{demo}-{variant}.{ext}
 *
 * Pré-requis: Node 20+, ffmpeg sur le PATH, deps installées (npm install).
 */

const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

// ─── Config ────────────────────────────────────────────────────────────────
const DEMOS = {
  'sale-flow': { duration: 12, leadIn: 0.8 },
  'inventory-import': { duration: 8, leadIn: 0.8 },
};

// Variantes de sortie : on part d'un MP4 source 1280x800 et on dérive.
// crop: ffmpeg crop expression (w:h:x:y) appliqué AVANT scale (laisser null = pas de crop)
// scale: dimensions finales (w:h)
// Toutes les dimensions doivent être paires (yuv420p / libx264).
// On force avec un trim trunc(...) en post-scale au cas où.
const VARIANTS = {
  'readme':       { scale: '1280:800',  crop: null,                       gifWidth: 800,  gifFps: 15 },
  'twitter':      { scale: '1200:676',  crop: '1280:720:0:40',            gifWidth: 800,  gifFps: 15 },
  'insta-square': { scale: '1080:1080', crop: '800:800:240:0',            gifWidth: 720,  gifFps: 18 },
  'insta-story':  { scale: '1080:1920', crop: '450:800:415:0',            gifWidth: 540,  gifFps: 18 },
};

const VIEWPORT = { width: 1280, height: 800 };
const FPS = 30;

// ─── CLI ───────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { demo: 'all', format: 'all' };
  for (const a of argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.+)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}
const args = parseArgs(process.argv);

// ─── Helpers ───────────────────────────────────────────────────────────────
function log(msg) { console.log(`[record] ${msg}`); }
function warn(msg) { console.warn(`[record] ${msg}`); }
function die(msg, code = 1) { console.error(`[record] ${msg}`); process.exit(code); }

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function checkFfmpeg() {
  const r = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  if (r.error || r.status !== 0) {
    die([
      'ffmpeg introuvable sur le PATH.',
      '',
      '  Windows : winget install Gyan.FFmpeg',
      '  macOS   : brew install ffmpeg',
      '  Linux   : sudo apt install ffmpeg  (ou équivalent)',
      '',
      'Vérifie ensuite avec : ffmpeg -version',
    ].join('\n'));
  }
  const first = (r.stdout || '').split('\n')[0].trim();
  log(`ffmpeg OK — ${first}`);
}

function runFfmpeg(argsList, label) {
  const r = spawnSync('ffmpeg', argsList, { encoding: 'utf8' });
  if (r.status !== 0) {
    warn(`ffmpeg failed (${label}):`);
    if (r.stderr) console.error(r.stderr.split('\n').slice(-15).join('\n'));
    throw new Error(`ffmpeg ${label} failed`);
  }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// ─── Capture Puppeteer ─────────────────────────────────────────────────────
async function captureDemo(demoName, outDir) {
  const cfg = DEMOS[demoName];
  if (!cfg) throw new Error(`Démo inconnue: ${demoName}`);

  const htmlPath = path.resolve(__dirname, `${demoName}.html`);
  if (!fs.existsSync(htmlPath)) throw new Error(`Fichier introuvable: ${htmlPath}`);

  const url = 'file://' + htmlPath.replace(/\\/g, '/');
  const outMp4 = path.join(outDir, `${demoName}-source.mp4`);

  log(`Lancement Puppeteer (headless) pour ${demoName}…`);
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: VIEWPORT,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=medium',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Laisser les fonts/animations se stabiliser
    await new Promise(r => setTimeout(r, cfg.leadIn * 1000));

    const recorder = new PuppeteerScreenRecorder(page, {
      fps: FPS,
      videoCrf: 18,
      videoCodec: 'libx264',
      videoPreset: 'medium',
      aspectRatio: '16:10',
    });

    log(`Capture MP4 ${VIEWPORT.width}x${VIEWPORT.height} @ ${FPS}fps pendant ${cfg.duration}s…`);
    await recorder.start(outMp4);
    // Capture exactement 1 boucle + un petit buffer pour clean end
    await new Promise(r => setTimeout(r, cfg.duration * 1000 + 300));
    await recorder.stop();

    log(`Source MP4 → ${path.basename(outMp4)} (${fmtBytes(fs.statSync(outMp4).size)})`);
    return outMp4;
  } finally {
    await browser.close();
  }
}

// ─── ffmpeg : MP4 variante (crop + scale + ré-encode) ──────────────────────
function makeMp4Variant(sourceMp4, demoName, variantName, outDir) {
  const v = VARIANTS[variantName];
  const outFile = path.join(outDir, `${demoName}-${variantName}.mp4`);
  const vf = [];
  if (v.crop) vf.push(`crop=${v.crop}`);
  vf.push(`scale=${v.scale}:flags=lanczos`);
  // Sécurité : force dimensions paires pour libx264 / yuv420p
  vf.push('pad=ceil(iw/2)*2:ceil(ih/2)*2');

  runFfmpeg([
    '-y',
    '-i', sourceMp4,
    '-vf', vf.join(','),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    outFile,
  ], `mp4 ${variantName}`);

  return outFile;
}

// ─── ffmpeg : GIF avec palette ─────────────────────────────────────────────
function makeGifVariant(mp4Variant, demoName, variantName, outDir) {
  const v = VARIANTS[variantName];
  const outFile = path.join(outDir, `${demoName}-${variantName}.gif`);
  const palette = path.join(outDir, `.palette-${demoName}-${variantName}.png`);

  const filterCommon = `fps=${v.gifFps},scale=${v.gifWidth}:-1:flags=lanczos`;

  // Étape 1 : palette
  runFfmpeg([
    '-y',
    '-i', mp4Variant,
    '-vf', `${filterCommon},palettegen=stats_mode=diff`,
    palette,
  ], `palette ${variantName}`);

  // Étape 2 : applique palette
  runFfmpeg([
    '-y',
    '-i', mp4Variant,
    '-i', palette,
    '-lavfi', `${filterCommon}[v];[v][1:v]paletteuse=dither=bayer:bayer_scale=5`,
    outFile,
  ], `gif ${variantName}`);

  // Cleanup palette
  try { fs.unlinkSync(palette); } catch (_) { /* noop */ }

  return outFile;
}

// ─── Pipeline ──────────────────────────────────────────────────────────────
async function processOne(demoName, outDir, doMp4, doGif) {
  log('─'.repeat(60));
  log(`Démo : ${demoName}`);

  const sourceMp4 = await captureDemo(demoName, outDir);

  const results = [];

  for (const variantName of Object.keys(VARIANTS)) {
    log(`  → variante ${variantName}`);
    const mp4Variant = makeMp4Variant(sourceMp4, demoName, variantName, outDir);
    const mp4Size = fs.statSync(mp4Variant).size;
    log(`    MP4 ${path.basename(mp4Variant)} — ${fmtBytes(mp4Size)}`);
    results.push({ kind: 'mp4', variant: variantName, file: mp4Variant, size: mp4Size });

    if (doGif) {
      const gif = makeGifVariant(mp4Variant, demoName, variantName, outDir);
      const gifSize = fs.statSync(gif).size;
      log(`    GIF ${path.basename(gif)} — ${fmtBytes(gifSize)}`);
      results.push({ kind: 'gif', variant: variantName, file: gif, size: gifSize });
    }

    // Si on ne veut pas les MP4 variants finaux, on les supprime (mais on garde
    // au moins l'étape intermédiaire le temps du GIF — déjà fait juste avant)
    if (!doMp4) {
      try { fs.unlinkSync(mp4Variant); } catch (_) { /* noop */ }
    }
  }

  // Le MP4 source est gardé seulement si on veut les MP4
  if (!doMp4) {
    try { fs.unlinkSync(sourceMp4); } catch (_) { /* noop */ }
  }

  return results;
}

// ─── Main ──────────────────────────────────────────────────────────────────
(async () => {
  const t0 = Date.now();
  log(`Démarrage — demo=${args.demo} format=${args.format}`);

  checkFfmpeg();

  const outDir = path.resolve(__dirname, 'output');
  ensureDir(outDir);
  log(`Output dir : ${outDir}`);

  const demosToRun = args.demo === 'all'
    ? Object.keys(DEMOS)
    : [args.demo].filter(d => DEMOS[d] || (warn(`Démo inconnue: ${d}`), false));

  if (demosToRun.length === 0) die('Aucune démo valide à traiter.');

  const doMp4 = args.format === 'all' || args.format === 'mp4';
  const doGif = args.format === 'all' || args.format === 'gif';
  if (!doMp4 && !doGif) die(`format inconnu: ${args.format} (attendu: mp4|gif|all)`);

  const allResults = [];
  for (const d of demosToRun) {
    try {
      const r = await processOne(d, outDir, doMp4, doGif);
      allResults.push(...r);
    } catch (e) {
      warn(`Erreur sur ${d}: ${e.message}`);
    }
  }

  // ─── Récap ────────────────────────────────────────────────────────────────
  log('─'.repeat(60));
  log('Récapitulatif :');
  const grouped = allResults.reduce((acc, r) => {
    (acc[r.kind] = acc[r.kind] || []).push(r);
    return acc;
  }, {});
  for (const kind of Object.keys(grouped)) {
    log(`  ${kind.toUpperCase()} :`);
    for (const r of grouped[kind]) {
      log(`    ${path.basename(r.file).padEnd(45)} ${fmtBytes(r.size)}`);
    }
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  log(`Terminé en ${dt}s — ${allResults.length} fichier(s) générés.`);
})().catch(e => {
  console.error('[record] FATAL:', e);
  process.exit(1);
});
