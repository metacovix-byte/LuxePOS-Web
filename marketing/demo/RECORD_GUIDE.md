# LuxePOS — Recorder de démos (HTML → MP4 + GIF)

Outil Node.js qui automatise la conversion des démos HTML animées (`sale-flow.html`, `inventory-import.html`) en fichiers vidéo prêts à utiliser pour Instagram, Twitter, README GitHub et press kit.

Pas besoin d'OBS, pas de capture manuelle : le HTML est piloté par Puppeteer headless puis recoupé/encodé via ffmpeg.

---

## Pré-requis

| Outil | Version min | Vérifier |
|---|---|---|
| Node.js | 20.x | `node --version` |
| npm | 10.x | `npm --version` |
| ffmpeg | 6.x+ | `ffmpeg -version` |

### Installer ffmpeg

- **Windows** : `winget install Gyan.FFmpeg` (puis redémarre le terminal)
  - Ou via Chocolatey : `choco install ffmpeg`
- **macOS** : `brew install ffmpeg`
- **Linux (Debian/Ubuntu)** : `sudo apt install ffmpeg`
- **Linux (Arch)** : `sudo pacman -S ffmpeg`

Si `ffmpeg -version` ne retourne rien, le script s'arrête avec un message clair.

---

## Installation

Depuis la racine du repo :

```bash
cd marketing/demo
npm install
```

La première install télécharge Chromium pour Puppeteer (~170 Mo) — c'est normal, ça ne se fait qu'une fois.

---

## Lancer

```bash
# Tout : 2 démos × 4 variantes × (MP4 + GIF) = 16 fichiers
npm run record

# Une seule démo
npm run record:sale    # sale-flow uniquement
npm run record:inv     # inventory-import uniquement

# Un seul format
npm run record:mp4     # MP4 uniquement (pas de GIF)
npm run record:gif     # GIF uniquement (les MP4 intermédiaires sont supprimés)
```

CLI avancé :

```bash
node record.js --demo=sale-flow --format=gif
node record.js --demo=all       --format=mp4
```

---

## Output

Tous les fichiers atterrissent dans `marketing/demo/output/` (ignoré par git).

Pour chaque démo, le script génère **4 variantes × 2 formats** :

| Fichier | Dimensions | Usage |
|---|---|---|
| `{demo}-readme.mp4` / `.gif`        | 1280×800   | README GitHub, embed site |
| `{demo}-twitter.mp4` / `.gif`       | 1200×676   | Twitter / X (16:9, hauteur arrondie au pair pour libx264) |
| `{demo}-insta-square.mp4` / `.gif`  | 1080×1080  | Insta carrousel / post |
| `{demo}-insta-story.mp4` / `.gif`   | 1080×1920  | Insta Reels / Story (9:16) |

Plus un fichier source `{demo}-source.mp4` (1280×800 brut Puppeteer) si tu lances avec `--format=mp4` ou `--format=all`.

### Tailles attendues (approx.)

| Fichier | Poids approx. |
|---|---|
| MP4 readme (12s) | ~1.5–2 Mo |
| MP4 insta-story (12s) | ~1 Mo |
| GIF readme | ~1–3 Mo |
| GIF insta-square | ~2–4 Mo |
| GIF insta-story | ~1–2 Mo |

---

## Comment utiliser les fichiers générés

### README GitHub

```markdown
![Démo : une vente en 5 taps](marketing/demo/output/sale-flow-readme.gif)
```

GitHub bride les GIFs à 10 Mo — vise < 2 Mo idéalement pour un chargement rapide. Si le poids dépasse, baisse `gifFps` ou `gifWidth` dans `record.js` (variante `readme`).

### Instagram Reels / Stories

- **Reels** : upload `sale-flow-insta-story.mp4` (1080×1920, 60s max — la démo fait 12s ✓)
- **Stories** : idem, durée max 15s ✓
- **Carrousel** : upload `sale-flow-insta-square.gif` (1080×1080, 5 Mo max — vérifier le poids)

### Twitter / X

- Upload `sale-flow-twitter.mp4` (1200×675, 2:20 max — on est largement sous ✓)

### Press kit

Pack à fournir :
- `sale-flow-source.mp4` (brut 1280×800)
- `sale-flow-readme.gif` (preview rapide)
- 1 screenshot PNG d'une frame iconique (à extraire manuellement avec `ffmpeg -ss 8.5 -i sale-flow-source.mp4 -frames:v 1 frame.png`)

---

## Personnaliser

Les paramètres clés sont en haut de `record.js` :

```js
const DEMOS = {
  'sale-flow':        { duration: 12, leadIn: 0.8 },
  'inventory-import': { duration: 8,  leadIn: 0.8 },
};

const VARIANTS = {
  'readme':       { scale: '1280:800',  crop: null,            gifWidth: 800,  gifFps: 15 },
  'twitter':      { scale: '1200:675',  crop: '1280:720:0:40', gifWidth: 800,  gifFps: 15 },
  'insta-square': { scale: '1080:1080', crop: '800:800:240:0', gifWidth: 720,  gifFps: 18 },
  'insta-story':  { scale: '1080:1920', crop: '450:800:415:0', gifWidth: 540,  gifFps: 18 },
};
```

- **`duration`** : durée totale capturée (correspond à `--T` dans le HTML)
- **`crop`** : ffmpeg crop `w:h:x:y` AVANT scale — utile pour cadrer le 16:10 en 9:16 sans étirer
- **`scale`** : dimensions finales du MP4
- **`gifFps`** / **`gifWidth`** : compromis qualité/poids du GIF (15 fps + 720 px = sweet spot)

Pour ajouter une nouvelle démo :
1. Ajoute le fichier `{nom}.html` dans `marketing/demo/`
2. Ajoute une entrée dans `DEMOS` avec sa durée
3. Relance `npm run record`

---

## Troubleshooting

### `ffmpeg introuvable sur le PATH`

Le script vérifie ffmpeg avant tout. Si tu as ce message, voir [Installer ffmpeg](#installer-ffmpeg) plus haut. Sur Windows, après `winget install`, ferme et rouvre ton terminal.

### `Failed to launch the browser process`

Puppeteer n'a pas téléchargé Chromium. Force la réinstallation :

```bash
cd marketing/demo
rm -rf node_modules
npm install
```

Sur Linux headless, il faut parfois installer des libs système :

```bash
sudo apt install -y libnss3 libatk-bridge2.0-0 libcups2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0 libasound2
```

### Le GIF est trop lourd pour GitHub

Baisse `gifFps` à 12 ou `gifWidth` à 600 dans la variante `readme`. Ou ajoute un post-process gifsicle :

```bash
gifsicle -O3 --colors 96 output/sale-flow-readme.gif -o output/sale-flow-readme.min.gif
```

### Les fonts Google ne se chargent pas en headless

Ça arrive sur connexion lente — le `waitUntil: 'networkidle0'` attend 500 ms d'inactivité réseau, normalement suffisant. Si tu vois Times New Roman dans le rendu, augmente `leadIn` à 1.5 dans `DEMOS`.

### Animations désynchronisées

Les démos utilisent `--T: 12s` comme variable CSS racine, tous les `animation-delay` sont en `calc(var(--T) * 0.XX)`. Si tu modifies `--T` dans le HTML, mets à jour `duration` dans `DEMOS` à la même valeur.

---

## Limites connues

- Pas d'audio (les démos sont muettes par design)
- Le crop des variantes Insta est statique — pour une démo très différente, ré-ajuste les valeurs `crop` en regardant le source MP4 d'abord
- Chromium headless ne supporte pas certains backdrop-filter sur des vieilles versions — utiliser Node 20 + Puppeteer 23+ garantit une compat OK

---

## Roadmap

- [ ] Extraction auto de frames PNG iconiques (au % donné de la timeline)
- [ ] GitHub Action qui regénère à chaque tag
- [ ] Variante "TikTok" (1080×1920, 9:16, watermark optionnel)
- [ ] Compression auto via gifsicle si GIF > 2 Mo
