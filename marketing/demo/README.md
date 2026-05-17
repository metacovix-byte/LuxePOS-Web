# LuxePOS — Démos animées

Animations HTML/CSS/SVG autonomes qui simulent l'usage de l'app, à utiliser dans le README du repo, le press kit, et les posts Insta.

## Contenu

| Fichier | Durée | Résolution cible | Usage |
|---|---|---|---|
| `sale-flow.html` | 12 s (loop) | 1280×800 (16:10) | Démo principale — vente en 5 taps |
| `inventory-import.html` | 8 s (loop) | 1280×800 (16:10) | Import Excel |
| `index.html` | — | responsive | Page vitrine qui embed les deux côte à côte |

## Pourquoi pas un screen recording ?

L'enregistrement écran de l'app live est impossible à automatiser dans un agent headless, et un GIF capturé à la main vieillit à chaque release. Ces démos sont **du code** : tu changes une couleur du brand → toutes les démos s'alignent.

Identité visuelle 1:1 avec l'app et le site marketing :
- Émeraude `#10b981` + sable doré `#d4a574`
- Glassmorphism (`backdrop-filter: blur(22px)`)
- Playfair Display (titres) + Inter (UI) + JetBrains Mono (chiffres)
- Mesh gradient animé en arrière-plan
- Curseur fictif SVG qui se déplace selon une `@keyframes` synchronisée

Aucune dépendance JS, aucun framework, ~25 ko par fichier.

## Aperçu local

```powershell
# Depuis la racine du repo
npx --yes http-server marketing/demo -p 8080
# puis ouvre http://localhost:8080/
```

Ou simplement double-clic sur `index.html` (les iframes locales fonctionnent en `file://`).

---

## Conversion en GIF

### Option A — via vidéo intermédiaire (recommandé)

1. **Capture en MP4** (voir section suivante)
2. **Conversion en GIF** :
   ```bash
   # GIF léger 720p, 15 fps, palette optimisée
   ffmpeg -i sale-flow.mp4 \
     -vf "fps=15,scale=720:-1:flags=lanczos,palettegen=stats_mode=diff" \
     -y palette.png

   ffmpeg -i sale-flow.mp4 -i palette.png \
     -lavfi "fps=15,scale=720:-1:flags=lanczos[v];[v][1:v]paletteuse=dither=bayer" \
     -y sale-flow.gif
   ```
3. **Compression supplémentaire** (optionnel) :
   ```bash
   gifsicle -O3 --colors 128 sale-flow.gif -o sale-flow.min.gif
   ```

### Option B — Gifski (qualité supérieure, fichier un peu plus gros)

```bash
ffmpeg -i sale-flow.mp4 -vf "fps=20,scale=720:-1" frames/%04d.png
gifski -o sale-flow.gif --fps 20 --width 720 --quality 90 frames/*.png
```

### Tailles cibles

| Usage | Largeur | FPS | Couleurs | Poids approx. |
|---|---|---|---|---|
| README GitHub | 720 px | 15 | 128 | ~1.5 Mo |
| Insta carrousel | 1080 px | 24 | 256 | ~4 Mo |
| Twitter / X | 600 px | 12 | 64 | ~800 ko |

---

## Capture en MP4 (Puppeteer headless)

Crée un fichier `record-demo.js` à la racine du repo :

```js
// record-demo.js — capture l'animation en MP4
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 800 }
  });
  const page = await browser.newPage();

  const file = process.argv[2] || 'sale-flow';
  const duration = parseInt(process.argv[3] || '12', 10);

  const url = 'file://' + path.resolve(__dirname, `marketing/demo/${file}.html`);
  await page.goto(url, { waitUntil: 'networkidle0' });
  // laisser le rendu se stabiliser
  await new Promise(r => setTimeout(r, 800));

  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'medium',
    aspectRatio: '16:10',
  });
  const out = path.resolve(__dirname, `${file}.mp4`);
  await recorder.start(out);
  // capture 1 boucle entière + petit lead-in
  await new Promise(r => setTimeout(r, duration * 1000 + 300));
  await recorder.stop();
  await browser.close();
  console.log('Saved →', out);
})();
```

Installation et exécution :

```bash
npm i -D puppeteer puppeteer-screen-recorder
node record-demo.js sale-flow 12
node record-demo.js inventory-import 8
```

### Alternative manuelle : OBS

1. Crée une scène "Browser Source" qui pointe vers `file://.../sale-flow.html`
2. Résolution canvas : 1280×800
3. Encode H.264, MP4, CRF 18, 30 fps
4. Boucle l'enregistrement pour avoir 1 cycle complet (12 s pour sale-flow, 8 s pour inventory)

---

## Recommandations d'usage

### 1. README du repo (GitHub)

```markdown
## Aperçu

![Démo : une vente en 5 taps](marketing/demo/sale-flow.gif)
```

Préfère un GIF < 2 Mo (GitHub bride au-delà). Si la démo est plus longue, héberge-la sur YouTube et embed la thumbnail.

### 2. Press kit

- Inclus le **MP4 brut 1280×800** + un **GIF 720p** + un **PNG screenshot frozen** à la frame "Confetti" (la plus iconique).
- Ajoute un README qui rappelle les couleurs brand (`#10b981` + `#d4a574`) et la typo (Playfair + Inter).

### 3. Posts Instagram

- **Carrousel** : capture 3 frames clés en PNG carré 1080×1080
  - Frame 1 : dashboard "Bon après-midi ✨"
  - Frame 2 : modal Vente éclair avec 6 produits
  - Frame 3 : toast success + confetti
- **Reels** : MP4 vertical 1080×1920 — recompose en re-zoomant sur le contenu (le 16:10 ne tient pas en vertical natif)
- **Stories** : MP4 vertical 1080×1920, durée ≤ 15 s — l'animation tient déjà dans ce timing

### 4. Site marketing

Embed direct via iframe, déjà fait dans `website/index.html` (section "Voir l'app en action" après le hero).

```html
<iframe src="../marketing/demo/sale-flow.html"
        title="Démo : une vente en 5 taps"
        loading="lazy"
        style="width:100%; aspect-ratio:16/10; border:0; border-radius:18px;"></iframe>
```

---

## Personnaliser

Toutes les variables clés sont au top de chaque fichier :

```css
:root {
  --brand-main: #10b981;  /* émeraude */
  --accent: #d4a574;      /* sable doré */
  --T: 12s;               /* durée du cycle */
}
```

Change `--T` pour ralentir/accélérer la boucle. Les `animation-delay` sont en `calc(var(--T) * 0.XX)` donc tout se resynchronise automatiquement.

Pour ajouter une frame : ajoute une `@keyframes` qui démarre à un `%` libre, et un waypoint correspondant dans `cursorPath`.

---

## Roadmap

- [ ] Variant "salon Genève" avec UI dépôt-vente
- [ ] Démo Lumi (assistant IA) — bulle 💎 qui répond à "CA aujourd'hui ?"
- [ ] Version mobile (375×812) pour les screens iPhone des press releases
- [ ] Export auto via GitHub Action (Puppeteer → MP4 + GIF + frames PNG à chaque tag)
