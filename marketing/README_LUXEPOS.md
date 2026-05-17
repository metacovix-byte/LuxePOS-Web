<!--
 README marketing pour le repo LuxePOS-Web.
 Destiné à remplacer (ou enrichir) le README.md actuel à la racine.
 Garde la rigueur technique mais ajoute un angle plus accueillant.
-->

<div align="center">

```
   ╭───────────────────────────╮
   │     ◆  L U X E P O S  ◆   │
   │   atelier · caisse · zen  │
   ╰───────────────────────────╯
```

**La caisse de mon atelier de bijoux.**

App native pensée pour les artisans qui fabriquent des pièces uniques.
Hors-ligne. Chiffrée. Sans abonnement obligatoire.

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-5.14.15-d4a574?style=flat-square)](./CHANGELOG.md)
[![Platform](https://img.shields.io/badge/platform-Windows%20·%20macOS%20·%20Android-0f172a?style=flat-square)](#plateformes)
[![Made in CH](https://img.shields.io/badge/made_in-Switzerland%20🇨🇭-DA291C?style=flat-square)](https://luxepos.app)
[![Sponsor](https://img.shields.io/badge/💚-Sponsor-EA4AAA?style=flat-square)](https://github.com/sponsors/metacovix-byte)

[Site web](https://luxepos.app) · [Télécharger](https://github.com/metacovix-byte/LuxePOS-Web/releases/latest) · [Tarifs](https://luxepos.app/pricing.html) · [Changelog](./CHANGELOG.md)

</div>

---

![Demo LuxePOS — à remplacer par le GIF démo](./marketing/demo.gif)

> *Demo à fournir — capture une vente complète en 8 secondes : ouverture POS, ajout au panier, sélection client, validation TWINT.*

---

## Pourquoi LuxePOS

Cinq raisons qui font que cet outil n'est pas un Square de plus.

1. **Pièces uniques natives.** Une pièce vendue ne déclenche pas d'alerte "stock 0 — à réassortir". C'est une pièce unique, elle ne sera pas refaite. LuxePOS le sait. Square, Shopify et Lightspeed l'ignorent.
2. **Dépôt-vente compris dans l'ADN.** Multi-POS avec commissions automatiques par partenaire (Atelier, Annemasse 30%, Salon Genève 25%, autant que tu veux). Transferts entre emplacements tracés. Récap mensuel PDF en un clic.
3. **Hors-ligne total.** Aucun CDN au runtime. Tailwind et Lucide inlinés directement dans le HTML. Tu peux travailler en sous-sol, en avion, à la cabane. Tes ventes se synchronisent au retour du wifi.
4. **Backup chiffré dans ton propre cloud.** AES-GCM 256, magic prefix `LXP1`, clé locale dans ton AppData. Si Microsoft se fait pirater demain, les données dans OneDrive sont illisibles sans ta clé qui n'a jamais quitté ton PC.
5. **Pas un SaaS.** Gratuit aujourd'hui, autour de 9 CHF/mois en 2027, ou 199 CHF à vie. Le code reste open source MIT. Si je disparais demain, tu fork et tu continues. Tes données sont à toi pour toujours.

---

## Quick install (Windows)

```powershell
# Télécharger l'installeur signé depuis GitHub Releases
curl -L https://github.com/metacovix-byte/LuxePOS-Web/releases/latest/download/LuxePOS_5.14.15_x64-setup.exe -o LuxePOS-setup.exe

# Lancer l'installeur (clic-clic, ~10 secondes)
./LuxePOS-setup.exe
```

Ou télécharge en un clic depuis [luxepos.app](https://luxepos.app). L'installeur Windows pèse **3.4 Mo**. Aucun runtime à installer (Tauri 2 + WebView2 déjà présent sur Windows 10+).

---

## Features

- 💎 **Caisse rapide** — Vente éclair 3 taps, raccourcis numériques 1-9 sur produits visibles
- 📦 **Inventaire** — 500+ pièces, édition inline double-clic, sélection multiple, bulk actions
- 👥 **Clients** — 5 tiers de fidélité (Bronze → Diamant), timeline par cliente, avatars déterministes
- 💬 **Pipeline Instagram / WhatsApp** — Du DM au colis livré, sans copier-coller
- 🏪 **Multi-POS dépôt-vente** — Atelier + N points avec commissions automatiques
- 🧮 **Wizard coûts** — Saisis tes coûts de revient en 5 min par catégorie
- 📈 **Dashboard** — Heatmap 7j × 12h, jauge objectif mensuel, période comparative
- 🔐 **Backup OneDrive chiffré** — AES-GCM 256, automatique, à toi seule
- 🤖 **Lumi** — Assistant IA local (21 intentions, 3 personnalités, voice STT+TTS, 100% en local)
- 🎨 **5 thèmes visuels** — Emerald, Rosegold, Champagne, Onyx, Royal
- ↩️ **Undo / Redo global** — Ctrl+Z / Ctrl+Y partout
- 🌍 **i18n** — FR · EN · DE · IT (site marketing) · FR (app pour l'instant)
- 🇨🇭 **Localisation Suisse** — CHF par défaut, TWINT/Revolut natifs, format `1'234.50`, art. 10 LTVA
- ⌨️ **Raccourcis clavier** — Alt+L (Lumi), Ctrl+Z/Y (undo/redo), 1-9 (quick-add)
- 📱 **Offline-first** — Service worker, file d'attente offline, indicateur de connectivité

---

## Screenshots

> *Captures à fournir — versions haute résolution dans `marketing/screenshots/`.*

| Vue | Description |
|---|---|
| `dashboard.png` | Dashboard principal avec stats du jour, heatmap, jauge objectif |
| `pos.png` | Caisse en action avec panier rempli et client sélectionné |
| `inventory.png` | Vue inventaire avec 500 pièces, filtres et bulk actions |
| `lumi.png` | Conversation avec Lumi en personnalité Coach |
| `multi-pos.png` | Vue répartition stock Atelier / Annemasse / Salon Genève |
| `dm-pipeline.png` | Pipeline Instagram du DM à l'expédition |

---

## Plateformes

| OS | Statut | Tech |
|---|---|---|
| **Windows 10/11** | ✅ Stable v5.14.15 | Tauri 2 + Rust + WebView2 |
| **macOS** | 🚧 CI prête, tests utilisateurs en cours | Tauri 2 + Rust universal binary |
| **Android** | 🚧 Capacitor scaffold, build pending | Capacitor + WebView Android |
| **iOS** | ⏳ Bloqué (besoin Mac dev + 99$/an Apple) | Capacitor (théorique) |
| **Web** | ⏳ Mode démo en navigateur (sans backup OneDrive) | HTML/JS pur, fonctionne déjà |

---

## Pour les développeurs

### Stack technique

- **Frontend** : single-file `luxepos-final.html` (~28 000 lignes) — Vanilla JS ES6+, Tailwind CSS (inliné), Lucide Icons (inliné), Chart.js, Web Speech API
- **Backend** : Rust 1.93 + Tauri 2 — 8 commandes (save_data, load_data, get_status, rotate_backup, check_conflicts, app_version, onedrive_status, restore_from_onedrive)
- **Chiffrement** : AES-GCM 256, magic prefix `LXP1\n`, clé locale dans `%APPDATA%`
- **Tests** : Playwright 31/34 passent (2 obsolètes legacy `/api`)
- **Mobile** : Capacitor scaffold Android prêt
- **Stockage** : `%APPDATA%\Roaming\ch.luxepos.desktop\luxepos-data.json` (clair) + backup chiffré OneDrive

### Build local

Pré-requis : Node 20+, Rust stable, WebView2 (déjà présent Windows 10+).

```powershell
git clone https://github.com/metacovix-byte/LuxePOS-Web.git
cd LuxePOS-Web
npm install

# Sync source HTML to dist-web (après chaque modif de luxepos-final.html)
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html

# Build .exe + installer NSIS
npx tauri build
# → src-tauri\target\release\bundle\nsis\LuxePOS_X.X.X_x64-setup.exe
```

### Tests

```powershell
# Lance un http-server local sur 8765
npx http-server . -p 8765 --silent &

# Run tests
npx playwright test tests/smoke.spec.js
```

### Builds CI (GitHub Actions)

- **Windows** : `.github/workflows/build-windows.yml` (manuel ou tag `v*`)
- **macOS** : `.github/workflows/build-mac.yml` (universal binary x64 + arm64)

### Contribuer

Toute contribution est bienvenue, particulièrement :

- 🐛 **Bug reports** détaillés (OS, version, étapes pour reproduire)
- 🌍 **Traductions** — DE, IT, ES, PT pour l'app (le site est déjà en 4 langues)
- 🍎 **Tests macOS** — j'ai un Mac mais pas le temps de tester en profondeur
- 📱 **Tests Android** — pareil, le scaffold est prêt mais besoin de retours réels
- 🎨 **Thèmes visuels** — propose ton thème en plus des 5 existants
- 📝 **Documentation** — toujours à améliorer

Process simple :
1. Fork
2. Branch `feat/ma-feature` ou `fix/mon-bug`
3. PR avec description claire (ce qui change, pourquoi, comment tester)
4. Je review sous 7 jours en général

Pas de CLA. Licence MIT, tu gardes la paternité de tes commits.

### Licence

[MIT](./LICENSE) — fais ce que tu veux avec le code, dis juste merci.

---

## Pour les utilisatrices

Tu cherches juste l'app sans entrer dans le code ?

→ **[luxepos.app](https://luxepos.app)** — site marketing en FR / EN / DE / IT avec toutes les explications.
→ **[Télécharger l'installeur Windows](https://github.com/metacovix-byte/LuxePOS-Web/releases/latest)** (3.4 Mo, signé cryptographiquement)
→ **[Voir les tarifs](https://luxepos.app/pricing.html)** — gratuit aujourd'hui, transparence totale sur 2027

Questions ? Écris à [metacovix@gmail.com](mailto:metacovix@gmail.com) — je lis tout, je réponds dans la semaine.

---

## Soutenir le projet

LuxePOS est gratuit aujourd'hui. Si tu veux qu'il soit là dans 5 ans, plusieurs façons d'aider :

- 💚 **[GitHub Sponsors](https://github.com/sponsors/metacovix-byte)** — 5, 15 ou 50 €/mois selon ton tier
- ⭐ **Star sur GitHub** — ça aide vraiment pour la visibilité
- 📣 **Parler du projet** — à une artisane qui galère sur Excel, sur Instagram, dans un forum craft
- 🐛 **Faire un bug report** ou une PR — chaque retour rend l'app meilleure pour tout le monde
- ☕ **Acheter la version Pro en 2027** quand elle sortira (9 CHF/mois ou 199 CHF à vie)

---

<div align="center">

**Fait à Genève par une artisane et son IA, avec amour et beaucoup de café ☕**

[Site](https://luxepos.app) · [GitHub](https://github.com/metacovix-byte/LuxePOS-Web) · [Contact](mailto:metacovix@gmail.com)

*Pas de tracking. Pas d'analytics tiers. RGPD-friendly. Open source MIT.*

</div>
