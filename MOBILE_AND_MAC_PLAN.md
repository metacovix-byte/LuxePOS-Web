# Plan multi-plateforme — Mobile + macOS

> **État actuel (mai 2026)** : Phase 1 (Tauri Windows) ✅ **livrée**.
> OneDrive sync auto ✅ **livré**.
> Capacitor Android : config créée, build à faire avec Android Studio.
> Phase 2 (macOS) + Phase 3 (iOS) : en attente d'accès à un Mac.

---

## ✅ Ce qui est en place

```
LuxePOS-Web/
├── src-tauri/         ← Tauri Windows (compilé en .exe natif 6.9 MB)
├── android/           ← Capacitor Android scaffold (initialisé)
├── capacitor.config.json
├── dist-web/          ← Web assets (luxepos-final.html, index.html, icons)
└── package.json       ← deps : @tauri-apps/cli, @capacitor/cli, @capacitor/android, @capacitor/filesystem, @capacitor/preferences
```

## 📱 Phase 3a — Android (build APK)

### Prérequis
1. Installer **Android Studio** : <https://developer.android.com/studio> (~3 GB)
2. Installer **JDK 17** (souvent inclus avec Android Studio)
3. Au 1er lancement Android Studio :
   - Accepter les licences SDK
   - Installer SDK Platform 34 minimum
   - Installer Build Tools

### Build
```powershell
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web

# Régénérer les assets (à faire à chaque update de luxepos-final.html)
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html
npx cap sync android

# Ouvrir dans Android Studio (build via GUI plus simple la 1ère fois)
npx cap open android

# OU build CLI direct
cd android
.\gradlew assembleDebug    # APK debug : android\app\build\outputs\apk\debug\app-debug.apk
.\gradlew assembleRelease  # APK release : signé, à publier
```

### Adaptations code nécessaires
- Le `_isTauri()` détecte Tauri. Il faut ajouter `_isCapacitor()` qui détecte `window.Capacitor`.
- Pour la persistance fichier : utiliser `@capacitor/filesystem` au lieu de Tauri invoke.
- À ajouter dans le bridge Store :
  ```js
  _isCapacitor() { return typeof window.Capacitor !== 'undefined'; }
  async _diskBridgeSave(body) {
      if (this._isTauri()) return invoke('save_data', { payload: body });
      if (this._isCapacitor()) {
          const { Filesystem, Directory } = await import('@capacitor/filesystem');
          await Filesystem.writeFile({
              path: 'luxepos-data.json',
              data: body,
              directory: Directory.Data,
              encoding: 'utf8'
          });
          return { ok: true, size: body.length };
      }
      // ... fetch existant
  }
  ```

### Distribution
- **Test perso** : APK direct, transfert via câble USB ou Google Drive
- **Famille / amis** : APK debug suffisant
- **Play Store** : compte développeur Google 25 $ une fois + signature AAB + screenshots + privacy policy + 7-14j review

---

## 🍎 Phase 3b — iOS (impossible sans Mac)

### Pré-requis bloquants
- ❌ **Un Mac est obligatoire** (Apple impose Xcode pour compiler iOS)
- 99 $/an pour publier sur App Store (Apple Developer Program)
- Si pas de Mac à toi : **MacInCloud** (~30 $/mois) ou un Mac d'occasion

### Plan une fois Mac disponible
```bash
# Sur Mac
cd LuxePOS-Web
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
# Xcode s'ouvre → Build → simulateur iPhone OK → archiver pour App Store
```

### Code à adapter
Idem Android : ajouter `_isCapacitor()` et utiliser `@capacitor/filesystem`.

---

## 🖥 Phase 2 — Tauri macOS (impossible sans Mac)

### Pré-requis bloquants
- Tauri demande macOS pour compiler le `.dmg` (Apple ne permet pas la cross-compilation)

### Plan une fois Mac disponible
```bash
# Sur Mac
cd LuxePOS-Web
npm install
cd src-tauri
cargo install tauri-cli
npx tauri build
# → src-tauri/target/release/bundle/dmg/LuxePOS_5.14.0_x64.dmg
```

### Alternative — GitHub Actions cloud
Si tu n'as pas de Mac mais tu mets le projet sur GitHub :

```yaml
# .github/workflows/build-mac.yml
name: Build macOS
on: workflow_dispatch
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - uses: dtolnay/rust-toolchain@stable
      - run: npm ci
      - run: npx tauri build
      - uses: actions/upload-artifact@v4
        with:
          name: macos-dmg
          path: src-tauri/target/release/bundle/dmg/*.dmg
```

Tu pousses ton code sur GitHub, lances le workflow, et tu télécharges le `.dmg` dans 5 min. **Gratuit jusqu'à 2000 min/mois** (largement suffisant).

---

## 🧭 Ce que je recommande comme prochain pas

| Si... | Action |
|---|---|
| Tu veux juste l'app **Windows** (cas actuel) | ✅ **Rien à faire**, c'est livré |
| Tu veux pouvoir prendre photos / scanner SKU sur Android | Installer Android Studio (3 GB, 30 min) → je guide le 1er build |
| Tu veux iPhone | Avoir accès à un Mac → 1 jour de boulot |
| Tu veux distribuer largement | Compte App Store (99 $/an) + Play Store (25 $) + signature codes Windows (200-400 $/an) |

**Mon conseil** : utilise l'app Windows pendant 2-3 semaines, identifie ce qui te manque vraiment côté mobile, ET LÀ on attaque la phase la plus utile.
