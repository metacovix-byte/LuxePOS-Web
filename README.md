# LuxePOS

Caisse & gestion de bijouterie artisanale, conçue pour artisan single-user (Suisse 🇨🇭).

App native Windows (Tauri 2 + WebView2) avec backups OneDrive chiffrés AES-GCM.

## Stack

- **Frontend** : Single-file `luxepos-final.html` (~28k lignes) — Vanilla JS ES6+, Tailwind CSS (inliné), Lucide Icons (inliné), Chart.js, Firebase Firestore (optionnel), Web Speech API
- **Backend** : Rust 2021 + Tauri 2 — 8 commandes (save_data, load_data, get_status, rotate_backup, check_conflicts, app_version, onedrive_status, restore_from_onedrive)
- **Tests** : Playwright (31/34 passent, 2 obsolètes legacy /api)
- **Mobile** : Capacitor scaffold (Android prêt, iOS bloqué sans Mac)

## Structure

```
LuxePOS-Web/
├── luxepos-final.html       ← code source unique (Tailwind + Lucide inlinés)
├── dist-web/                ← assets bundlés Tauri
│   ├── luxepos-final.html
│   ├── index.html
│   ├── sw.js
│   └── vendor/              ← Tailwind 3.4.16 + Lucide 0.460 (backup)
├── src-tauri/               ← backend Rust
│   ├── src/lib.rs           ← 8 commandes Tauri + chiffrement OneDrive
│   ├── Cargo.toml
│   └── tauri.conf.json
├── android/                 ← Capacitor Android scaffold
├── tests/smoke.spec.js      ← 34 tests Playwright
├── DESIGN_SYSTEM.md         ← doc tokens / composants
├── MOBILE_AND_MAC_PLAN.md   ← roadmap multi-plateforme
└── SESSION_RECAP.md         ← état d'avancement
```

## Build local (Windows)

Pré-requis : Node 20+, Rust stable, WebView2.

```powershell
git clone <repo-url>
cd LuxePOS-Web
npm install

# Sync source HTML to dist-web (à faire après chaque modif de luxepos-final.html)
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html

# Build .exe + installer NSIS
npx tauri build
# → src-tauri\target\release\bundle\nsis\LuxePOS_X.X.X_x64-setup.exe
```

## Tests

```powershell
# Lance un http-server local sur 8765 (les tests s'attendent à cette URL)
npx http-server . -p 8765 --silent &

npx playwright test tests/smoke.spec.js
```

## Builds CI (GitHub Actions)

- **Windows** : `.github/workflows/build-windows.yml` (manuel ou tag `v*`)
- **macOS** : `.github/workflows/build-mac.yml` (universal binary x64 + arm64)

Après push sur GitHub, va dans **Actions → Build macOS app → Run workflow** pour produire un `.dmg` (téléchargeable depuis l'onglet Artifacts).

## Données

- **Local** : `%APPDATA%\Roaming\ch.luxepos.desktop\luxepos-data.json` (clair)
- **Backup OneDrive** : `OneDrive\LuxePOS-Backup\luxepos-data.json` (AES-GCM 256, magic prefix `LXP1\n`, clé locale dans AppData)

## Versions

Voir `SESSION_RECAP.md` pour l'historique détaillé. Versioning sémantique sur `tauri.conf.json` + `Cargo.toml` + `package.json`.

## Licence

Privé — usage interne single-user.
