# Build Android — Procédure pas-à-pas

LuxePOS est prêt côté code (bridge `_isCapacitor()` + Filesystem implementé en v5.14.11). Il manque juste l'environnement Android Studio pour compiler l'APK.

## Pré-requis (1ère fois seulement, ~30 min)

### 1. Installer Android Studio (~3 GB)
- Télécharge : https://developer.android.com/studio
- Lance l'installeur, accepte les défauts
- Au 1er lancement :
  - Accepte les licences SDK
  - **Important** : installe SDK Platform 34 minimum + Build Tools

### 2. Vérifier JDK 17
Android Studio l'inclut. Pour vérifier dans PowerShell :
```powershell
$env:JAVA_HOME
java -version
```
Devrait dire 17.x ou plus.

---

## Build — Procédure (à chaque update du HTML)

```powershell
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web

# 1. Sync HTML vers dist-web
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html

# 2. Sync vers le projet Android
npx cap sync android

# 3. Build APK
cd android
.\gradlew assembleDebug
# → APK créé : android\app\build\outputs\apk\debug\app-debug.apk
```

## Tester l'APK sur ton téléphone

### Option A — Câble USB
1. Active le **mode développeur** sur ton Android : Paramètres → À propos → tape 7× sur "Numéro de build"
2. Active **Débogage USB** dans Options de développement
3. Branche ton téléphone au PC
4. `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`

### Option B — Drive ou WhatsApp
1. Upload l'APK sur Google Drive (ou envoie-le via WhatsApp à ton propre numéro)
2. Sur ton téléphone, télécharge le fichier
3. Avant d'installer : Paramètres → Sécurité → autorise "Installer des applications inconnues" pour ton navigateur
4. Tape sur l'APK → Installer

---

## Build APK signé pour distribution (Play Store ou famille)

```powershell
cd android
.\gradlew assembleRelease
# → APK signé (mais avec une clé debug par défaut)
```

Pour le **Play Store**, il faut générer une clé signée production :
```powershell
keytool -genkey -v -keystore luxepos-release.keystore -alias luxepos -keyalg RSA -keysize 2048 -validity 10000
```
Puis configurer `android/app/build.gradle` avec les `signingConfigs`. Compte développeur Google = 25 $ une fois.

---

## Stockage des données sur Android

L'app utilise `@capacitor/filesystem` avec `Directory.Data` :
- **Android** : `/data/data/ch.luxepos.app/files/luxepos-data.json` (privé à l'app, supprimé si l'app est désinstallée)
- **iOS** : équivalent dans le sandbox de l'app

⚠️ **Pas de backup OneDrive automatique sur mobile** (Android n'a pas un OneDrive monté en file-system comme Windows). Solutions futures possibles :
- Plugin `@capacitor/share` pour exporter manuellement le JSON
- Intégration directe Microsoft Graph API (OneDrive cloud) → 2-3h de boulot

## Compilation iOS (impossible sans Mac)

```bash
# Sur Mac uniquement
npx cap add ios
npx cap sync ios
npx cap open ios
# Xcode s'ouvre → Build → simulateur ou archiver pour App Store
```

Pour un test sans avoir de Mac : pousse le code sur GitHub, ajoute un workflow `.github/workflows/build-ios.yml` qui run sur `macos-latest`. Idem que pour macOS (`tauri-action`), mais il faut un compte Apple Developer ($99/an) pour signer.

---

## Limitations actuelles connues

1. **Pas de scan code-barres natif** : faisable avec `@capacitor-community/barcode-scanner` (à ajouter plus tard)
2. **Photos** : faisable avec `@capacitor/camera` (à ajouter)
3. **Notifications push** : non implémenté (single-user, pas un besoin)
4. **OneDrive sync** : non disponible mobile (cf ci-dessus)
