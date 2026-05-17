# Build Android — Résultat du 1er build (2026-05-17)

## TL;DR

**APK debug généré avec succès.**

- Chemin : `android\app\build\outputs\apk\debug\app-debug.apk`
- Taille : **5'951'575 octets (~5.8 MB)** — cohérent avec WebView + HTML 2.5 MB inliné
- Version Capacitor : 8.3.1
- AppId : `ch.luxepos.app`
- minSdk 24 / compileSdk 36 / targetSdk 36

---

## Environnement détecté

| Composant | Valeur trouvée | Statut |
|---|---|---|
| `ANDROID_HOME` (env) | (vide) | Manquante au niveau système — set pour la session uniquement |
| `ANDROID_SDK_ROOT` (env) | (vide) | idem |
| `JAVA_HOME` (env) | (vide) | idem |
| Android SDK | `C:\Users\mouni\AppData\Local\Android\Sdk` | OK (installé par Android Studio) |
| JDK | `C:\Program Files\Android\Android Studio\jbr` (OpenJDK 21.0.10) | OK (livré avec Android Studio) |
| Build-tools | 36.1.0, 37.0.0 (35.0.0 téléchargé automatiquement par Gradle) | OK |
| Platforms | android-36.1 (android-36 téléchargé automatiquement) | OK |
| Gradle | 8.14.3 (téléchargé automatiquement au 1er build) | OK |

> **Note** : aucune variable d'env n'était persistée au niveau Windows. Pour les builds futurs, soit on les set au niveau utilisateur (`setx ANDROID_HOME ...`), soit on les set à chaque session PowerShell avant `gradlew`.

### Variables à set avant chaque build (PowerShell)

```powershell
$env:ANDROID_HOME = "C:\Users\mouni\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\mouni\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:PATH"
```

Ou rendre ça permanent :

```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\mouni\AppData\Local\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", "C:\Users\mouni\AppData\Local\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
```

---

## Commandes exécutées

```powershell
# 1. dist-web était déjà à jour (luxepos-final.html + index.html, 2'567'989 octets, 2026-05-07)
#    → pas besoin de re-sync les fichiers HTML

# 2. Set env vars (cf section ci-dessus)

# 3. Capacitor sync
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web
npx cap sync android
# √ Copying web assets from dist-web to android\app\src\main\assets\public
# √ Updating Android plugins
# [info] Found 2 Capacitor plugins for android:
#        @capacitor/filesystem@8.1.2
#        @capacitor/preferences@8.0.1
# [info] Sync finished in 0.099s

# 4. Build APK debug
cd android
.\gradlew.bat assembleDebug --no-daemon
# BUILD SUCCESSFUL in 2m 41s
# 154 actionable tasks: 154 executed
```

## Auto-download durant le 1er build

Gradle a téléchargé automatiquement (sans intervention manuelle) :

1. **Gradle 8.14.3** (distribution complète) — ~150 MB
2. **Android SDK Build-Tools 35.0.0** — license auto-acceptée car déjà accepté dans `~\Sdk\licenses\`
3. **Android SDK Platform 36 (revision 2)**

C'est normal pour un 1er build et ça ne se reproduira pas (cache local).

## Warnings non bloquants observés

- `WARNING: Using flatDir should be avoided` (côté capacitor-cordova-android-plugins) — pratique standard Capacitor, ignorable.
- `'fun downloadFile(call: PluginCall): Unit' is deprecated. Use @capacitor/file-transfer plugin instead.` — déprécation Kotlin dans `@capacitor/filesystem`, on n'utilise pas downloadFile, ignorable.
- `SDK XML version 4 encountered, only understands up to 3` — léger décalage de version entre Android Studio command-line tools et le SDK manager, sans impact sur le build.
- Lint Java `unchecked or unsafe operations` dans `capacitor-android` — interne au framework Capacitor.

Aucune erreur, build complet.

---

## Comment installer l'APK sur un téléphone

### Option A — Câble USB + adb (le plus rapide)

```powershell
# Sur le téléphone :
#  1. Paramètres → À propos → tape 7× sur "Numéro de build" pour activer le mode dev
#  2. Paramètres → Options développeur → active "Débogage USB"
#  3. Branche le téléphone au PC, accepte l'invite de confiance

# Sur le PC :
$env:PATH = "C:\Users\mouni\AppData\Local\Android\Sdk\platform-tools;$env:PATH"
adb devices     # vérifie que le tel est listé
adb install -r "C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web\android\app\build\outputs\apk\debug\app-debug.apk"
```

### Option B — Drive / WhatsApp (sans câble)

1. Upload l'APK sur Google Drive (ou envoie-le sur WhatsApp à toi-même)
2. Sur le téléphone, télécharge l'APK
3. **Avant d'installer** : Paramètres → Sécurité → "Installer des applications inconnues" → autorise le navigateur (ou WhatsApp / Drive selon où tu télécharges)
4. Tape sur l'APK depuis le gestionnaire de fichiers → "Installer"

L'app apparaît avec le nom **LuxePOS** dans le tiroir d'applications.

---

## Limitations connues de cette build

1. **Pas de signature production** : c'est un APK debug signé avec la clé debug par défaut Android Studio. Ne pourra pas être publié sur le Play Store tel quel. Pour le Play Store : `assembleRelease` + keystore signé (`keytool -genkey`) + compte Google Play Developer ($25 une fois).
2. **Pas de OneDrive sync sur Android** : l'app utilise `@capacitor/filesystem` avec `Directory.Data` → `/data/data/ch.luxepos.app/files/luxepos-data.json`. C'est privé à l'app et **supprimé si l'app est désinstallée**. Solutions futures : `@capacitor/share` pour export manuel JSON, ou Microsoft Graph API (OneDrive cloud) — ~2-3h de dev.
3. **Pas de scan code-barres** : faisable en ajoutant `@capacitor-community/barcode-scanner`.
4. **Pas de caméra** : faisable avec `@capacitor/camera`.
5. **Pas de notifications push** : non implémenté (single-user, pas un besoin pour l'usage actuel).

---

## Procédure pour les builds futurs (après update du HTML)

```powershell
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web

# 1. Sync HTML
copy luxepos-final.html dist-web\luxepos-final.html
copy luxepos-final.html dist-web\index.html

# 2. Set env (ou rendre permanent, cf début du doc)
$env:ANDROID_HOME = "C:\Users\mouni\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# 3. Sync Capacitor
npx cap sync android

# 4. Build
cd android
.\gradlew.bat assembleDebug
# → APK : android\app\build\outputs\apk\debug\app-debug.apk
```

Les builds suivants prendront **~30-45 secondes** (vs 2m41 pour le 1er) car Gradle et le SDK sont déjà en cache.

---

## Métadonnées du build

- Date : 2026-05-17 23:31
- Durée totale : 2 min 41 s
- Tasks Gradle : 154 (toutes exécutées avec succès)
- Plugins Capacitor inclus : `@capacitor/filesystem@8.1.2`, `@capacitor/preferences@8.0.1`
- Output metadata (extrait de `output-metadata.json`) :
  - versionCode : 1
  - versionName : 1.0
  - applicationId : ch.luxepos.app
