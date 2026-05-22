# Changelog

Toutes les versions notables de LuxePOS sont documentées ici.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versioning : [SemVer](https://semver.org/spec/v2.0.0.html).

## [5.14.20] — 2026-05-18 — Fix schéma repairs import Excel (P0)

### Corrigé — `commitExcelImport` produisait des SAV avec un schéma incompatible
Un agent Plan d'audit a découvert que la branche "réparations" du commit Excel
poussait directement dans `state.repairs` un objet minimal qui n'avait **aucun
champ requis par la page Réparations** :

| Avant (incompatible) | Après (aligné addRepair) |
|---|---|
| `description` | `itemDescription` + `issue` |
| `price` | `estimatedPrice` + `finalPrice` (selon status) |
| `status: 'paid'\|'free'` | `status: 'received'\|'delivered'` |
| absent | `ref` (`SAV-IMP-001`, `SAV-IMP-002`, …) |
| absent | `itemType`, `priority`, `history[]`, `deposit` |
| absent | `createdAt`, `updatedAt` |

**Conséquence avant fix** : page Réparations crash silencieusement sur
`repair.itemDescription` undefined ; filtres status (`'ready'`, etc.) excluent
tous les SAV importés ; aucune référence affichée.

**Mapping status** :
- Excel `status: 'paid'` (prix > 0, donc le client a payé) → SAV `status: 'delivered'`, finalPrice = prix.
- Excel `status: 'free'` (pas de prix, gratuit ou pas encore payé) → SAV `status: 'received'`, finalPrice = 0.

**Historique automatique** : chaque SAV importé reçoit 1 entrée `'received'`
(création) + éventuellement 1 entrée `'delivered'` si payé.

### Tests
- **801** : commitExcelImport avec 2 SAV (1 payé + 1 gratuit) → schéma complet
  vérifié champ par champ + mapping status correct.
- **802** : page Réparations rend sans crash après import + le SAV importé
  apparaît dans le DOM (nom client / description / ref `SAV-IMP-001`).

52 tests Playwright pass (était 50/52, +2 nouveaux 801+802).

## [5.14.19] — 2026-05-18 — Hotfix complet modal produit

### Corrigé — v5.14.18 était incomplète : 3 sites `this._isCapacitor()` restants
Un audit indépendant a révélé que le hotfix v5.14.18 n'avait corrigé qu'**un seul**
des 4 sites où `this._isCapacitor()` était appelé sur la classe UI (alors que la
méthode vit sur Store). **La modal produit crashait toujours après installation
v5.14.18** — c'est exactement le symptôme remonté initialement par Maëlle.

Les 3 sites restants, tous corrigés en v5.14.19 :
- **`luxepos-final.html:11272`** — `UI.renderPOS()` (template du panneau de recherche
  avec bouton scanner code-barres dans la caisse).
- **`luxepos-final.html:15478`** — `UI.openProductModal()` (champ Référence avec
  bouton scan code-barres). **C'est le crash que Maëlle rapportait.**
- **`luxepos-final.html:28173`** — `UI.scanBarcode()` (logique fallback webcam).

**Fix** : remplacement par `window.store?._isCapacitor?.()` aux 3 sites, identique au
fix v5.14.18 pour `_isScannerAvailable`.

### Tests
- **Nouveau test 611** : régression end-to-end — appelle `renderPOS()`,
  `openProductModal(productId)` et `scanBarcode()` après avoir effacé temporairement
  `window.store._isCapacitor`. Doit produire 0 throw + modal rendue.
- Le test couvre le scénario exact qui crashait chez Maëlle (ouverture modal d'un
  produit existant).

### What's New modal
- Catalogue features renommé `5.14.18` → `5.14.19`, ajout d'une carte
  "Fix complet modal produit" expliquant la régression.
- Fallback `_getWhatsNewFeatures()` mis à jour vers `5.14.19`.

## [5.14.18] — 2026-05-18

### Corrigé — Scanner code-barres dans la modal produit (Windows)
- **Bug** : ouvrir la modal produit avec un produit existant déclenchait
  `TypeError: this._isCapacitor is not a function` à `luxepos-final.html:27551`,
  empêchant l'affichage du bouton scanner code-barres et bloquant le rendu de l'onglet.
- **Cause** : la méthode `_isCapacitor()` n'est définie que sur la classe `Store`, mais
  `_isScannerAvailable()` (classe UI) tentait `this._isCapacitor()` qui était undefined.
- **Fix** : `window.store?._isCapacitor?.()` avec optional chaining → fallback gracieux
  vers la détection `BarcodeDetector` (caméra web native Chromium / WebView2).
- **Impact** : la modal produit fonctionne à nouveau sur Tauri Windows. Le bouton
  scanner s'affiche si `BarcodeDetector` est disponible (Chromium ≥ 83, WebView2).

### Tests
- **Test 708 (filtres Atelier)** : faux-positif corrigé. Le bloc "Réassort recommandé"
  liste globalement les composants en rupture (comportement intentionnel d'alerte
  globale), ce qui faisait apparaître `chaine_y` même quand le filtre type='perle'
  était actif. Le test cible désormais uniquement `#atelier-components-content tbody`
  pour valider le filtrage du tableau principal sans interférence avec l'alerte.
- 46/49 tests Playwright pass (2 legacy `/api/*` fails attendus, 1 skipped).

## [5.14.17] — 2026-05-18

### Ajouté — BOM (Bill of Materials) finalisée : composants ↔ bijoux finis
La feature **Composants & BOM** (scaffold Store complet depuis v5.0) est maintenant
pleinement exploitable côté UI. Cible : artisane bijoux fantaisie (acier 316L + perles
AliExpress) qui veut un coût de revient toujours juste sans recalculer à la main.

- **Section BOM dans la modal d'édition produit** : après le champ "Coût Achat", un
  bouton "+ Composition (BOM)" / "Modifier la composition" ouvre l'éditeur BOM, avec
  badge "AUTO BOM" si une composition existe. Affiche le nombre de composants liés et
  l'état "coût recalculé auto".
- **Page Atelier : filtres + recherche** : barre d'outils glassmorphism avec recherche
  full-text (nom + fournisseur + réf + notes), filtre par type (perle / chaîne /
  fermoir / anneau / pendentif / fil / autre) et filtre stock (tous / stock faible /
  rupture). Compteur "X/Y composants" et bouton "Réinitialiser".
- **Wizard coûts : bouton "Recalculer depuis les BOM"** : pour les pièces ayant une
  composition définie, le coût est recalculé à partir de la somme(composant.unitCost
  × qty). Précis vs les suggestions par catégorie. Snapshot pris avant.
- **Dashboard alerte BOM orpheline** : nouvelle todo "X composition(s) avec composant
  supprimé" qui pointe vers l'onglet Compositions de la page Atelier.
- **APP_CONFIG.VERSION → 5.14.17** (était figé à 5.11 depuis longtemps — mise à jour
  rétroactive pour cohérence des affichages).
- **8 tests Playwright BOM** (701–708) : create/update/delete composant, propagation
  coût quand prix composant change, blocage suppression si lié à un BOM, alertes stock
  faible, réception commande fournisseur (stock + unitCost rafraîchi), rendu page
  Atelier, filtres composants.

### Existant — confirmation du scaffolding Store
Les méthodes suivantes (déjà présentes depuis v5.0) sont désormais documentées et
testées :
- `Store.createComponent / updateComponent / deleteComponent / getLowStockComponents`
- `Store.getBOM / setBOM / recomputeProductCostFromBOM / recomputeProductsUsingComponent`
- `Store.createSupplierOrder / updateSupplierOrder / receiveSupplierOrder / deleteSupplierOrder`
- `Store.getComponentTypes / getSupplierOrderStatuses`
- Modales `showComponentModal`, `showSupplierOrderModal`, `showBomEditor`
- Route `atelier` (déjà branchée dans le router + le menu Plus)

## [5.14.16] — 2026-05-18

### Ajouté — Workflow photo + scanner webcam (parité Tauri ↔ Android)
- **Capture webcam dans la modal produit** : bouton "📸 Caméra" à côté de "Choisir un fichier".
  Ouvre une preview live (getUserMedia), capture → review (reprendre/utiliser) → compression auto
  (max 800×800px, JPEG qualité 0.82, ~50–100 KB). Sélecteur multi-caméras si plusieurs détectées.
  Fallback gracieux "Aucune caméra détectée" si aucune webcam.
- **Import en masse de photos** (Inventaire → bouton "📁 Photos en masse") : pick d'un dossier
  (webkitdirectory) ou fichiers multiples. Match auto par référence (B44.jpg → produit B44,
  insensible casse, gère `-1`, `_main`, ` (2)` etc.). Rapport visuel : ✅ nouvelles, 🔄 remplacements,
  ⚠ sans match. Aperçu 12 photos avant commit. Snapshot pris avant import (undo possible).
- **Paste depuis presse-papier** (Ctrl+V dans la modal produit) : extrait l'image, compresse,
  l'assigne au produit. Toast "✓ Photo collée".
- **Scanner code-barres webcam** (Tauri / Windows / Mac) : utilise l'API native
  `BarcodeDetector` (Chromium/WebView2). Modal pleine largeur avec viseur vert qui suit le code
  détecté. Formats : code_128, code_39, ean_13, ean_8, qr_code, data_matrix, upc_a, upc_e.
  Auto-close à la détection. Le bouton "Scanner" est désormais visible sur desktop ET mobile.
- **Utilitaire `compressImage(source, opts)`** exposé globalement (window.compressImage) :
  accepte Blob / File / Image / Video / Canvas → data URL JPEG ou WebP compressé.
- **7 tests Playwright** ajoutés (601–607) : extractRefFromFilename, compression < 200KB,
  ratio préservé, BarcodeDetector graceful degradation, modal sans caméra.

## [5.14.10] — 2026-05-06

### Ajouté
- **Audit design appliqué** (5 priorités validées via skill `design:design-critique`) :
  - Distinction "composants à racheter" vs "pièces uniques vendues" partout (badges POS, alertes inventaire, dashboard)
  - Carte Client dégonflée : 6 boutons → 2 visibles (Timeline + Modifier) + menu kebab pour le reste
  - Avatar client : couleur déterministe par hash du nom (8 palettes)
  - Filtre note auto "Importé depuis Excel" → mini badge "📥 Excel" discret
  - Dashboard dédupliqué : todo cost-blind cachée si bandeau orange visible
  - Bouton "Voir l'analyse complète" du bas retiré (doublon avec header)
  - Lumi tooltip Astuce : auto-dismiss après 12s
  - KPI Valeur stock : "À calculer" si >50% produits sans coût
  - Trend "↓100% vs hier" remplacé par "🌅 Première vente attendue" si CA=0 et avant 14h
  - Placeholder photo inventaire : gradient catégorie + initiale Playfair Display + référence
- **UX-copy harmonisé** (skill `design:ux-copy`) :
  - 7 messages "Veuillez..." formels → "tu" cohérent
  - Messages d'erreur techniques humanisés
- **Design system documenté** (`DESIGN_SYSTEM.md`) : tokens, composants, conventions, tech debt
- **Git initialisé** : repo, .gitignore, README, premier commit
- **GitHub Actions CI** : workflows `build-mac.yml` (universal x64+arm64) et `build-windows.yml`
- **Auto-updater Tauri** : guide complet dans `UPDATER_SETUP.md` (à activer après push GitHub)

### Corrigé
- **Bouton Filtres inventaire** : drawer manquait la classe `.open` → restait hors-écran à droite
- **Bouton "Astuces"** flottant retiré (faisait doublon avec Lumi + auto-show)
- **Bouton "Sélectionner client"** POS : couleur brand (jaune/vert) au lieu de violet/rose

## [5.14.7] — 2026-05-05 (soir)

### Corrigé
- **Bug visuel critique** : Service Worker mettait Tailwind/Lucide en cache `no-cors` opaque, ce qui empêchait leur exécution. Solution : Tailwind + Lucide **inlinés directement** dans le HTML (zéro CDN au runtime), Service Worker désactivé en Tauri.

### Ajouté
- **Tailwind 3.4.16 + Lucide 0.460 inlinés** dans le HTML (~800 KB) → app fonctionne hors-ligne, plus de cache opaque
- **Auto-désinscription du SW corrompu** au boot (`navigator.serviceWorker.getRegistrations()`)
- **Purge automatique des caches** au boot Tauri

## [5.14.0] — 2026-05-04

### Ajouté
- **Phase 1 Tauri Windows livrée** : app native, démarre en <1s, 26 MB RAM
- **Backup OneDrive automatique chiffré** AES-GCM 256, magic prefix `LXP1\n`, clé locale dans AppData
- **8 commandes Rust** : save_data, load_data, get_status, rotate_backup, check_conflicts, app_version, onedrive_status, restore_from_onedrive
- **Capacitor Android scaffold** (build à faire avec Android Studio)
- **30 tests Playwright** (31/34 passent, 2 obsolètes legacy /api)

### Sécurité
- **XSS sanitization** sur 12+ sites critiques (cart, sale modal, client picker, import)
- **Toast whitelist HTML** (`<strong>/<b>/<em>/<i>/<br>` autorisés, reste échappé)

### Performance
- **Fast-diff fingerprint** avant `JSON.stringify` (économise ~80% des comparaisons)

## [5.13.x] — 2026-04-21+

(Sable Pro v2 — rolled back à v5.11)

## [5.11] — 2026-04-19

### Ajouté
- **Refactor APP_CONFIG / LOG / Crypto / i18n** — couches centralisées
- **Pivot métier** : artisan bijou fantaisie Genève (au lieu de "luxe")
- **Localisation Suisse** : CHF par défaut, TWINT/Revolut, format `1'234.50`, art. 10 LTVA
- **Multi-POS** : Atelier / Annemasse FR / Salon Genève + commissions
- **Workflow DM** Instagram/WhatsApp : pipeline devis → paiement → expédition → livraison

## [4.9+] — 2026-04-18

### Ajouté
- **Lumi assistant IA local** (Option B, ~600 lignes) : 21 intentions parsées, 3 personnalités, voice STT+TTS, réactions ventes (confetti scaling)

## [4.9] — 2026-04-17

### Ajouté
- 8 fonctionnalités métier : Réparations/SAV, Réservations, Saisonnalité, Rentabilité, SMS/WhatsApp, Anniversaires, Portail client, File d'attente offline

## [4.8] — 2026-04-16

### Ajouté
- 5 thèmes (emerald, rosegold, champagne, onyx, royal)
- Glassmorphism+, mesh background animé
- Heatmap 7j × 12h, jauge objectif mensuel
- Édition inline double-clic inventaire
- Sélection multiple + bulk actions
- Undo/Redo global (Ctrl+Z/Ctrl+Y)
- Favoris produits, raccourcis 1-9 POS
- 5 tiers fidélité (Bronze → Diamant) + timeline client
- Onboarding 6 étapes
