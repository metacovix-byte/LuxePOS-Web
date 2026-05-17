# Scanner code-barres natif (Android — ML Kit)

LuxePOS embarque depuis **v5.14.16** un scanner de codes-barres et QR codes natif sur
l'app Android, basé sur **Google ML Kit Barcode Scanning** via le plugin officiel
[`@capacitor-mlkit/barcode-scanning`](https://github.com/capawesome-team/capacitor-mlkit/tree/main/packages/barcode-scanning).

Le scanner est **100 % offline** (aucune donnée n'est envoyée à Google), **gratuit**
et performant. Le module ML Kit est téléchargé automatiquement par Google Play Services
à la première utilisation (~ 2 Mo, transparent pour l'utilisateur).

## Où l'utiliser dans l'app

Deux entrées sont disponibles, visibles **uniquement** quand l'app tourne en mode
Capacitor (APK Android / app iOS) :

### 1. Page Caisse (POS) — scanner pour ajouter au panier

Un bouton émeraude **« Scanner »** apparaît à droite de la barre de recherche produits.

- Tape dessus → caméra plein écran s'ouvre.
- Vise un code-barres ou QR : reconnu instantanément, caméra se ferme.
- L'app cherche le code dans la référence des produits :
  - **Match exact** → le produit est ajouté au panier, toast vert `+ <nom>`.
  - **Match unique partiel** → idem.
  - **Aucun match** → toast `Aucun produit trouvé pour « <code> »`.

### 2. Formulaire produit (Inventaire) — scanner pour remplir la référence

Quand on crée ou édite un produit, un petit bouton **« Scan »** apparaît à côté du
bouton « Auto » sur la ligne du champ référence.

- Tape dessus → caméra → code lu.
- Le champ `Référence` est pré-rempli (en MAJUSCULES) avec la valeur lue, et tu peux
  toujours l'éditer manuellement avant de sauvegarder.

## Formats supportés

ML Kit reconnaît automatiquement (sans configuration) :

| Catégorie | Formats |
|---|---|
| 1D produits | EAN-13, EAN-8, UPC-A, UPC-E |
| 1D génériques | Code 128, Code 39, Code 93, Codabar, ITF |
| 2D | **QR Code**, Data Matrix, PDF417, Aztec |

Idéal pour les étiquettes que tu imprimes toi-même (QR rapide, format libre, robuste
même quand l'impression est moyenne).

## Permissions Android

L'app demande la permission caméra à la première utilisation seulement. Si tu refuses,
tu peux la réactiver dans :

> Paramètres Android → Applications → LuxePOS → Autorisations → Appareil photo → Autoriser

Permissions déclarées dans `android/app/src/main/AndroidManifest.xml` :

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

Le `required="false"` permet à l'app de s'installer sur les très rares appareils sans
caméra (tablettes industrielles) — les boutons « Scanner » seront simplement présents
mais le scan échouera proprement avec un toast d'erreur.

## Plateformes

| Plateforme | Scanner dispo ? | Comment |
|---|---|---|
| **APK Android (Capacitor)** | ✅ Oui | Bouton visible, ML Kit natif |
| **App iOS (Capacitor, futur)** | ✅ Oui (au build iOS) | Voir note iOS plus bas |
| **Tauri Windows / macOS** | ❌ Non | Bouton masqué côté HTML (`_isCapacitor()` retourne `false`) |
| **PWA navigateur** | ❌ Non | Idem — bouton masqué |

Le code utilise un `import('@capacitor-mlkit/barcode-scanning')` **dynamique** dans
une branche `if (this._isCapacitor())` — le module n'est donc jamais chargé en dehors
de l'app mobile native, et le build Tauri/web n'est pas pollué.

## Note iOS (à faire lors du futur build iOS)

Sur iOS, il faudra ajouter dans `ios/App/App/Info.plist` :

```xml
<key>NSCameraUsageDescription</key>
<string>LuxePOS utilise la caméra pour scanner les codes-barres de vos bijoux et accélérer les ventes.</string>
```

Sans cette clé, l'app crashera au premier `BarcodeScanner.scan()` (politique Apple).

## Limitations connues

- **1ère utilisation** : le module ML Kit doit être téléchargé par Play Services.
  L'app affiche `Téléchargement du module scanner (1ère utilisation)…` et lance
  `installGoogleBarcodeScannerModule()`. Compter ~10 s sur une bonne connexion.
- **Téléphones sans Google Play Services** (Huawei récents, AOSP custom) : le scan ne
  fonctionnera pas. C'est une limitation upstream de ML Kit.
- **Code-barres très petits ou flous** : ML Kit a besoin de ~ 1 cm de hauteur visible
  pour décoder un EAN-13. Approcher le téléphone si ça ne déclenche pas.

## Dépannage rapide

| Symptôme | Cause probable | Solution |
|---|---|---|
| Bouton Scanner absent | App ouverte dans le navigateur, pas l'APK | Installer l'APK Android |
| `Permission caméra refusée` | Refus utilisateur | Réglages → Apps → LuxePOS → Caméra |
| `Plugin scanner indisponible` | APK pas rebuild après `npm install` | Refaire `npx cap sync android` puis `./gradlew assembleDebug` |
| Caméra noire | Autre app utilise la caméra | Fermer Snapchat / Insta etc., relancer |
| Aucun produit trouvé | Le code lu ≠ la référence stockée | Vérifier la référence dans l'inventaire — penser à scanner d'abord puis utiliser « Scan » dans le formulaire pour aligner |

## Côté code

Le tout vit dans **`luxepos-final.html`**, classe `UI`, en bas (~ ligne 27217) :

- `scanBarcode()` — primitive qui lance la caméra et retourne `string | null`.
- `scanBarcodeToCart()` — workflow POS (scan → match référence → addToCart).
- `scanBarcodeToProductRef()` — workflow inventaire (scan → remplit `#product-reference`).

Les boutons sont conditionnés par `${this._isCapacitor() ? '...' : ''}` dans
`renderPOS()` et le formulaire produit, donc invisibles hors Capacitor.

## Rebuild après modification

```powershell
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web

# 1. Sync HTML vers dist-web
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html

# 2. Sync vers Android
npx cap sync android

# 3. Rebuild APK
cd android
.\gradlew.bat assembleDebug
# → android\app\build\outputs\apk\debug\app-debug.apk
```

Sans Android Studio dans le PATH, exporter d'abord :

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```
