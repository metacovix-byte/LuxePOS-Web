# 📝 Sessions cumulées · 2026-05-07 → 2026-05-18

## 🎯 État final 2026-05-18 : Pipeline complète + Marketing pro + Mobile + Analytics + BOM + Hotfix complet modal produit

### 🆕 Livré 2026-05-18 (nuit, après audit indépendant) — v5.14.19 Hotfix COMPLET

**Découverte critique** : audit indépendant (agent général-purpose) du hotfix
v5.14.18 a révélé que celui-ci était **incomplet**. La modal produit crashait
toujours après installation v5.14.18 — exactement le symptôme initial de Maëlle
("l'ongle dans le programme window ne marche pas y a une erruer").

**Cause** : `this._isCapacitor()` n'existe pas sur la classe UI (uniquement sur
Store). Le commit c133979 n'avait corrigé qu'`_isScannerAvailable()`, laissant
3 autres sites :
- `UI.renderPOS()` l. 11272 — bouton scan caisse
- `UI.openProductModal()` l. 15478 — bouton scan modal produit (LE crash de Maëlle)
- `UI.scanBarcode()` l. 28173 — fallback webcam

**Fix v5.14.19** : remplacement aux 3 sites par `window.store?._isCapacitor?.()`.
+ nouveau test 611 qui invoque `openProductModal(productId)` après effacement
temporaire de `_isCapacitor` (couvre exactement le scénario qui crashait).

**Tests : 49 passent** (50 avec test 611 ajouté ; 2 legacy `/api/*` attendus,
1 skipped).

### 🆕 Livré 2026-05-18 (nuit) — v5.14.18 Hotfix scanner Windows (PARTIEL)

**Bug remonté par Maëlle** : "l'ongle dans le programme window ne marche pas y a une erreur"
— l'onglet (clic sur produit) crashait silencieusement après v5.14.17.

- **Diagnostic** : `TypeError: this._isCapacitor is not a function` à
  `luxepos-final.html:27551` dans `_isScannerAvailable()`. La méthode `_isCapacitor()`
  vit sur la classe `Store`, pas sur la classe `UI` → l'appel `this._isCapacitor()`
  retournait undefined et levait à l'exécution.
- **Fix** (1 ligne) : `window.store?._isCapacitor?.()` avec optional chaining.
- **Test 708** corrigé (faux-positif) : `chaine_y` apparaissait dans le HTML même quand
  filter='perle' parce que le bloc d'alerte "Réassort recommandé" liste TOUS les
  composants en rupture (intentionnel). Test recentré sur `#atelier-components-content
  tbody` uniquement.
- **CI release v5.14.18** : Windows + macOS + auto-updater build ✅, GitHub Pages ✅.
- **Tests** : 46/49 pass (`/api/status` et `/api/save` sont legacy backend, attendus).

**À tester côté Maëlle** : installer v5.14.18, ouvrir la modal d'édition produit,
vérifier que tous les champs s'affichent correctement (Référence, Nom, Catégorie,
Prix, Coût, Stock, Photo, Variantes, BOM…).

---

### 🆕 Livré 2026-05-18 (soir) — v5.14.17 BOM finalisée

Le scaffolding Store BOM/Composants/Fournisseurs (déjà en place depuis v5.0) est
maintenant pleinement exploitable côté UI :

- **Modal d'édition produit** : bouton "+ Composition (BOM)" / "Modifier la
  composition" juste sous le champ Coût Achat. Badge "AUTO BOM" si une composition
  existe. L'éditeur BOM existant (`showBomEditor`) est ouvert avec autocomplete sur
  les composants et preview du coût calculé en temps réel.
- **Page Atelier** : barre de filtres (recherche full-text + type + niveau de stock)
  + compteur `filtrés/total`. Bouton "Réinitialiser" si filtres actifs.
- **Wizard coûts** : nouveau bouton "🧱 Recalculer depuis les BOM" qui recalcule
  uniquement les produits ayant une composition, plus précis que les suggestions
  par catégorie.
- **Dashboard** : nouvelle alerte "X composition(s) avec composant supprimé".
- **APP_CONFIG.VERSION** : aligné à 5.14.17 (était figé à 5.11).
- **8 tests Playwright BOM (701–708)** dans `tests/smoke.spec.js`.

**Test rapide Maëlle** :
1. Atelier → "+ Composant" → "Perle turquoise 8mm", type perle, prix 0.42 EUR, stock 200, seuil 20
2. Atelier → "+ Composant" → "Chaîne acier 316L", type chaîne, prix 1.20 EUR, stock 50, seuil 10
3. Inventaire → édite un bracelet → bouton "+ Composition" → ajoute 6× perle + 1× chaîne → enregistre
4. Le coût du bracelet passe automatiquement à `6×0.42 + 1×1.20 = 3.72 EUR`
5. Modifie le prix de la perle à 0.50 EUR → tous les bijoux liés voient leur coût recalculé
6. Atelier → "+ Commande fournisseur" → 100× perles à 0.40 EUR → "Marquer reçu" → stock += 100 + coût mis à jour à 0.40

### 🆕 Livré cette session (2026-05-18)

**Performance & accessibilité site** (Agent design-critique) :
- WCAG 2.1 AA compliant : skip-link traduit, `:focus-visible` global, graceful no-JS, touch targets 44×44
- Rapport `website/DESIGN_AUDIT.md` complet
- Animations GPU (`transform: scaleX()` au lieu de `width`)
- Fonts allégées 10 → 6 weights, `font-display: optional`
- Mesh gradient désactivé mobile

**Android mobile** (Agent android-build) :
- APK Capacitor 5.8 MB → 30 MB avec scanner code-barres ML Kit Google
- Plugin `@capacitor-mlkit/barcode-scanning` installé
- 3 méthodes JS exposées : `scanBarcode()`, `scanBarcodeToCart()`, `scanBarcodeToProductRef()`
- 2 boutons "Scanner" dans le HTML (POS + form produit), affichés uniquement mobile
- Permissions caméra dans AndroidManifest
- Doc `ANDROID_BARCODE_SCANNER.md`
- Tauri Windows reste intact (dynamic import jamais exécuté hors Capacitor)

**Démos animées** (Agent demo-maker) :
- `marketing/demo/sale-flow.html` (12s loop) — vente complète en 5 taps
- `marketing/demo/inventory-import.html` (8s loop) — drag-drop Excel + scan
- `marketing/demo/index.html` — page vitrine embed les 2 en iframe
- Section "Voir l'app en action" intégrée dans `website/index.html`

**Waitlist + lead capture** (Agent waitlist) :
- `website/waitlist.html` — page dédiée avec form Formspree, glass-card, counter
- `website/waitlist-success.html` — page de confirmation
- Promesse : Lifetime early-bird 99 CHF (au lieu de 199) pour les 50 premières inscrites
- Honeypot anti-spam + validation HTML5 + i18n 4 langues
- Doc `marketing/WAITLIST_SETUP.md` (création compte Formspree)
- Lien "Waitlist" ajouté dans la nav de toutes les pages

**Analytics RGPD-safe** (Agent analytics) :
- GoatCounter intégré sur les 5 pages (script async 4 KB)
- Zéro cookie, zéro IP stockée, open source
- `website/privacy.html` — page politique de confidentialité (4 langues)
- Lien "Confidentialité" dans le footer de toutes les pages
- Doc `marketing/ANALYTICS_SETUP.md`

**Screencast outil** (Agent screencast) :
- `marketing/demo/record.js` — script Node.js Puppeteer + ffmpeg
- Convertit les démos HTML en MP4 + GIF, 4 variantes par démo (Insta carré, Insta story, README, Twitter)
- Testé : `inventory-import` génère 8 fichiers en 17.8s
- Doc `marketing/demo/RECORD_GUIDE.md`

**Guide d'achat domaine** :
- `marketing/DOMAIN_PURCHASE_GUIDE.md` — procédure complète `luxepos.ch` (Infomaniak) + `luxepos.app` (Cloudflare)
- DNS records GitHub Pages, custom domain, email forwarding, sous-domaines

### Récap structure finale du repo

```
LuxePOS-Web/
├── luxepos-final.html             ← app source (Tailwind+Lucide inlinés)
├── dist-web/                      ← bundle Tauri
├── src-tauri/                     ← backend Rust + updater + crypto
├── android/                       ← Capacitor + ML Kit barcode scanner
├── website/                       ← site marketing 4 langues
│   ├── index.html
│   ├── pricing.html
│   ├── waitlist.html
│   ├── waitlist-success.html
│   ├── privacy.html
│   ├── i18n.js (4 langues × ~250 clés)
│   ├── style.css + pricing.css
│   ├── script.js
│   ├── DESIGN_AUDIT.md
│   └── DESIGN_SYSTEM.md
├── marketing/
│   ├── PRESS_KIT.md
│   ├── LAUNCH_EMAILS.md
│   ├── INSTA_POSTS.md (10 carrousels)
│   ├── GITHUB_SPONSORS_SETUP.md
│   ├── README_LUXEPOS.md
│   ├── NEWSLETTER_TEMPLATE.md
│   ├── WAITLIST_SETUP.md
│   ├── ANALYTICS_SETUP.md
│   ├── DOMAIN_PURCHASE_GUIDE.md
│   └── demo/
│       ├── sale-flow.html
│       ├── inventory-import.html
│       ├── index.html
│       ├── record.js (Puppeteer + ffmpeg)
│       ├── package.json
│       ├── RECORD_GUIDE.md
│       └── README.md
├── tests/smoke.spec.js
├── .github/workflows/
│   ├── release.yml (Mac + Windows signés sur tag v*)
│   ├── deploy-pages.yml
│   └── build-mac.yml / build-windows.yml (manual)
├── MONETIZATION_STRATEGY.md (40 KB stratégie commerciale)
├── ANDROID_BARCODE_SCANNER.md
├── DESIGN_SYSTEM.md
├── ANDROID_BUILD.md / ANDROID_BUILD_RESULT.md
├── DEPLOY_PAGES.md
├── UPDATER_SETUP.md
├── GITHUB_SECRETS_SETUP.md
├── BUILD_PIPELINE_PLAN.md / UI_REFACTOR_PLAN.md / MOBILE_AND_MAC_PLAN.md
├── README.md / CHANGELOG.md / SESSION_RECAP.md
└── .github/workflows/ (CI complète)
```

### Actions utilisatrice restantes (TOUTES sont quick-wins)

1. ⏳ **Activer GitHub Pages** : Settings → Pages → Source: GitHub Actions → Save (30 sec)
2. ⏳ **Créer compte Formspree** : https://formspree.io/register, copier ID dans `website/waitlist.html` (5 min)
3. ⏳ **Créer compte GoatCounter** : https://www.goatcounter.com/signup, sous-domaine `luxepos` (5 min)
4. ⏳ **Activer GitHub Sponsors** : profil sponsors metacovix-byte (suivre `marketing/GITHUB_SPONSORS_SETUP.md`)
5. ⏳ **Tester APK barcode scanner** sur ton tel Android
6. ⏳ **Acheter domaine** `luxepos.ch` chez Infomaniak (15 CHF, 10 min)
7. ⏳ **Session Claude Design** sur le site live une fois Pages activé

---

## 🎯 Sessions antérieures (référence)

# 📝 Session du 2026-05-07 → site marketing complet livré

## 🎯 État actuel : v5.14.15 (app) + site marketing multilingue complet + pack monétisation

### 🆕 Livré aujourd'hui (2026-05-07)

**App** (v5.14.11 → v5.14.15) :
- Auto-updater Tauri 2 activé (clés générées, secrets GitHub, signing, latest.json)
- Bug `createUpdaterArtifacts` corrigé pour générer les .sig sur la CI
- Bouton manuel "Vérifier les mises à jour" dans Paramètres + auto-check au boot
- v5.14.15 (avec `createUpdaterArtifacts: true`) : CI verte avec .exe + .dmg + .sig + latest.json
- Wizard coûts trié par impact financier + badge "🎯 PRIORITÉ #1"
- Footer "💾 Sauvegardé il y a X" cliquable → export rapide .json
- Bridge Capacitor `_isCapacitor()` ajouté

**Site marketing** (`website/`) :
- `index.html` + `style.css` + `script.js` — dark + glassmorphism, identité 1:1 avec l'app
- `pricing.html` + `pricing.css` — page tarifs dédiée (3 tiers, math transparente, comparatif annuel, FAQ)
- `i18n.js` — 4 langues complètes (FR/EN/DE/IT) avec switcher 🌍 + hreflang SEO
- 7 améliorations visuelles sur tarifs : reveal scroll, count-up "économise", barres animées, badge shimmer, sticky CTA mobile, noise overlay
- Repo public sur GitHub, prêt pour GitHub Pages

**Stratégie commerciale** :
- `MONETIZATION_STRATEGY.md` (40 KB) — document de stratégie complet 10 sections :
  - Persona ICP "Marie l'artisane" + 6 sous-segments + anti-personas
  - Roadmap 4 phases (M0 → M24+) avec actions mois par mois
  - 10 canaux d'acquisition analysés (effort/coût/ROI)
  - KPIs avec North Star "Weekly Active Sellers"
  - Pricing détaillé (early-bird, coupons, saisonnier)
  - Setup technique Stripe (~6 jours dev)
  - 7 risques + mitigations
  - 5 quick wins cette semaine
  - Objectifs SMART 6/12/18/24 mois

**Pack marketing** (`marketing/`) :
- `PRESS_KIT.md` — boilerplate FR/EN, palette, 17 faits-clés, 3 citations, 5 angles presse
- `LAUNCH_EMAILS.md` — 3 templates (pré-annonce Pro J-30, Lifetime early-bird 50 places, lancement public J-0) FR+EN
- `INSTA_POSTS.md` — 10 carrousels Instagram complets (slides, captions, hashtags, calendrier 10 semaines)
- `GITHUB_SPONSORS_SETUP.md` — procédure complète + 3 tiers (☕ 5€ / 💚 15€ / 💎 50€) + FUNDING.yml
- `README_LUXEPOS.md` — refonte marketing du README projet
- `NEWSLETTER_TEMPLATE.md` — template Buttondown.email + 12 mois de sujets + welcome email FR/EN

### Git/CI infra
- Repo **PUBLIC** sur https://github.com/metacovix-byte/LuxePOS-Web
- 18+ commits poussés cette session
- Workflow `release.yml` opérationnel (Mac + Windows signés sur tag v*)
- Tag v5.14.15 → GitHub Release auto avec tous les artefacts signés

---

## 🎯 État précédent (référence)

## 🎯 v5.14.10 (2026-05-06, ancien état) : audit design appliqué + git + CI ready

### 📦 Builds livrés cette session
- **v5.14.7** : version propre (CDN inlinés, SW désactivé) — fin de soirée 1
- **v5.14.8** : 5 priorités design audit appliquées (alertes stock, carte client, dashboard dédupliqué, chiffres faux cachés, polish)
- **v5.14.9** : fix bouton Filtres inventaire (drawer `.open` class manquante)
- **v5.14.10** : ux-copy harmonisé (tu/vous), boutons flottants nettoyés, design system documenté, git initialisé, workflows CI GitHub Actions prêts

### ⚙️ Infra livrée v5.14.10
- ✅ **Git initialisé** + 1er commit + 151 fichiers tracked
- ✅ **`.gitignore`** complet (target/, node_modules/, données privées, photos, build artifacts)
- ✅ **`.github/workflows/build-mac.yml`** — universal binary x64+arm64 sur push tag `v*`
- ✅ **`.github/workflows/build-windows.yml`** — release Windows sur push tag `v*`
- ✅ **`README.md`** — doc projet (stack, structure, build, tests, données)
- ✅ **`DESIGN_SYSTEM.md`** — tokens, composants, conventions, audit cohérence
- ✅ **`UPDATER_SETUP.md`** — guide pas-à-pas pour activer Tauri auto-updater (à activer après push GitHub)

### 🎨 Audit design : 5 priorités validées + appliquées (depuis screenshots)

| # | Priorité | Status | Impact |
|---|---|---|---|
| 1 | 🔴 Fausses alertes stock (Dernier!/293 stock faible) | ✅ | Composants vs uniques distingués partout |
| 2 | 🔴 Carte Client dégonflée (6 boutons → 2 + kebab) | ✅ | -50% bruit visuel + avatar couleur déterministe |
| 3 | 🟡 Dashboard dédupliqué (todo cost, CTA bas, Lumi auto-dismiss) | ✅ | 3 doublons retirés |
| 4 | 🟡 Chiffres faux cachés (Valeur stock "à calculer", trend 1ère vente) | ✅ | Plus de "0 CHF" trompeur |
| 5 | 🟢 Polish (placeholder photo gradient + initiale, bouton brand) | ✅ | Inventaire visuel-

et + bouton client cohérent |

### 🎨 UX-copy — harmonisations appliquées (skill `design:ux-copy`)
- 7 messages "Veuillez..." formels → "tu" cohérent ("Donne un nom", "Ajoute une variante", "Sélectionne", "Choisis un client")
- "Erreur lors de la sauvegarde locale" → "Sauvegarde locale échouée — vérifie l'espace disque"
- "Erreur lors de l'export" → "Export impossible — réessaie ou contacte Claude"
- "Le panier est vide" → "Ajoute au moins 1 article au panier"
- "Valeur invalide" → "Saisis un nombre positif"
- "Erreur de sérialisation des données" → message plus humain

### ♿ A11y (skill `design:accessibility-review`)
- Solide déjà : focus-visible WCAG 2.4.7, prefers-reduced-motion (3 endroits), aria-live sur toasts (assertive pour erreurs), skip-link, modes haute lisibilité + contraste max
- Pas de changements nécessaires

### 🎨 Design system (skill `design:design-system`)
- Documenté dans `DESIGN_SYSTEM.md` : tokens (5 thèmes brand, bg/text, sémantique, espacement, radius, shadows), composants (.btn-2026, .glass-card, .stat-card-2026, .loyalty-badge, .badge-2026.*, toasts), typo (Inter Variable + Playfair display), animations
- Tech debt identifié : 73 occurrences de `#10b981` hardcodé (au lieu de `var(--brand-main)`) — 30 min de fix + tests par thème, à faire un autre jour

### 🐛 Bug bonus corrigé
- **Bouton "Astuces" flottant retiré** : doublon avec Lumi + auto-show 12s. Astuces accessibles via Ctrl+K (palette de commandes). Nettoie le coin bas-droit.

### Ce qui s'est passé cette session
1. **Audit Windows** demandé : 4 axes parallèles (design, UX, sécurité, perf) → rapport avec Niveau 1 (3 critiques) + Niveau 2 (5 confort)
2. **8 fixes appliqués** dans `luxepos-final.html` :
   - **#1 Wizard coûts proactif** : bandeau orange dashboard quand >30% sans coût + suggestions pré-remplies par catégorie (bracelet ≈ 6 CHF, collier ≈ 10, bague ≈ 4) plafonnées à 40% du prix moyen + bouton "Pré-remplir toutes les catégories"
   - **#2 XSS + CSP** : toast avec whitelist HTML (`<strong>/<b>/<em>/<i>/<br>` ok, reste échappé), `esc()` ajouté sur ~12 sites critiques (cart, sale modal, client picker, import preview)
   - **#3 Chiffrement OneDrive** : AES-GCM 256 dans Rust, clé locale dans AppData (jamais dans OneDrive), magic prefix `LXP1\n`, nouvelle commande `restore_from_onedrive`, `onedrive_status` retourne `backup_encrypted: bool`
   - **#4 Stock=0 distinction** : "À réassortir" (rouge composants) vs "Pièces vendues à archiver" (gris calme)
   - **#5 Toast post-vente** : N° facture + montant + intensité confetti (small/medium/big) + anti-double-click 3s
   - **#6 Boutons disabled** : opacity 0.45 + grayscale + cursor not-allowed
   - **#7 Perf save** : fast-diff par fingerprint avant `JSON.stringify` (économise ~80% des comparaisons)
   - **#8 Lucide throttle** : RETIRÉ finalement (causait des icônes manquantes — bug)

3. **Build initial v5.14.0** → installé → bug visuel énorme (icônes manquantes, pas de Tailwind)

4. **Audit spécialisé** lancé : trouvé que **Service Worker mettait Tailwind/Lucide en cache `no-cors` opaque** = scripts ne peuvent plus s'exécuter dans WebView2. Le rebuild ne nettoie pas ce cache.

5. **Tentative self-host vendor/** (v5.14.1, .2) → bug persiste

6. **Tentative inline Tailwind+Lucide dans HTML** : bug `String.replace($&)` qui injecte le HTML 5 fois À L'INTÉRIEUR du code Tailwind → corruption totale

7. **Réparation HTML + inline propre** (forme fonctionnelle de replace) → v5.14.3, .4, .5 → bug persiste TOUJOURS car cache WebView2 corrompu de l'install initial

8. **Diagnostic dans titre fenêtre** (v5.14.6) → l'utilisatrice **redémarre l'app** → BUG RÉSOLU. Le code de purge SW + caches que j'avais ajouté en v5.14.2 fait son travail au démarrage suivant.

9. **v5.14.7 CLEAN** : code debug retiré, titre propre, tous les fixes actifs.

### Versions
- Tauri **2.11.0**
- Rust stable **1.93.0**
- aes-gcm 0.10 + rand 0.8 + base64 0.22 (pour le chiffrement OneDrive)
- Capacitor **8.x** (toujours pas testé en build)
- Node v24.11.1, npm 11.6.2

### Installeur final
```
src-tauri\target\release\bundle\nsis\LuxePOS_5.14.7_x64-setup.exe   (2.5 MB)
```

---

## 🚧 Ce qui reste à faire

### 1. Validation par l'utilisatrice (en cours)
- A installé v5.14.7 ce soir et **a vu que ça marche**
- Doit utiliser l'app demain pour identifier ce qui manque vraiment

### 2. Saisie des coûts (URGENT pour rentabilité)
- 294/294 produits sans coût → **rentabilité aveugle**
- Le bandeau orange du dashboard pousse à le faire
- Bouton "Saisir les coûts (5 min)" ouvre le wizard avec suggestions pré-remplies

### 3. Lumi alerte sur 107 ruptures de stock
- Vérifier si ce sont de vraies ruptures de composants (à recommander AliExpress)
- Ou des pièces uniques vendues (à archiver via le nouveau bandeau gris)
- La distinction est désormais visible dans l'UI grâce à Fix #4

### 4. Phase Android (1-2h avec Android Studio)
**Prérequis** : installer Android Studio (~3 GB) — <https://developer.android.com/studio>

**Build commands** :
```powershell
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html
npx cap sync android
cd android
.\gradlew assembleDebug
# APK: android\app\build\outputs\apk\debug\app-debug.apk
```

**À faire côté JS** : ajouter `_isCapacitor()` dans la classe Store, et utiliser `@capacitor/filesystem` pour la persistance fichier (cf `MOBILE_AND_MAC_PLAN.md`).

### 5. Phase Mac/iOS (besoin Mac)
Voir `MOBILE_AND_MAC_PLAN.md`. Pas accessible sans Mac physique ou GitHub Actions cloud.

---

## 🔧 Commandes utiles pour reprendre

### Vérifier l'état du dossier
```powershell
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web
ls dist-web\
ls dist-web\vendor\        # tailwindcss + lucide self-hosted (backup)
ls src-tauri\src\
```

### Rebuild app Windows après modif HTML
```powershell
copy luxepos-final.html dist-web\
copy luxepos-final.html dist-web\index.html
npx tauri build
# Nouveau .exe : src-tauri\target\release\bundle\nsis\LuxePOS_5.14.X_x64-setup.exe
```

### Lancer les 30 tests Playwright
```powershell
# Le serveur PowerShell n'existe plus en v5.14, donc démarrer un http-server pour les tests
npx http-server . -p 8765 --silent &
# Puis :
npx playwright test tests/smoke.spec.js --reporter=list
# (2 tests legacy /api/* échouent, c'est normal — ils testent l'ancien serveur PowerShell)
```

---

## 📁 Fichiers clés du projet (mis à jour 2026-05-06)

```
LuxePOS-Web/
├── luxepos-final.html       ← code source principal (≈ 2.5 MB après inline Tailwind+Lucide)
├── dist-web/                ← assets bundlés dans Tauri/Capacitor
│   ├── luxepos-final.html
│   ├── index.html           ← alias requis par Capacitor
│   ├── sw.js                ← Service Worker (version v5-14-2, plus de prefetch CDN)
│   └── vendor/              ← v5.14.7 NOUVEAU — Tailwind + Lucide en backup
│       ├── tailwindcss-3.4.16.js   (440 KB)
│       └── lucide-0.460.0.min.js   (348 KB)
├── src-tauri/
│   ├── Cargo.toml           ← profil release : LTO=false, strip=false. Crates v5.14.7 : + aes-gcm, rand, base64
│   ├── tauri.conf.json      ← identifier ch.luxepos.desktop, version 5.14.7
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs           ← v5.14.7 : 8 commandes Rust
│   │                          (save/load/status/rotate/conflicts/version/onedrive_status/restore_from_onedrive)
│   │                          + chiffrement AES-GCM 256 du miroir OneDrive
│   │                          + clé locale dans AppData (luxepos-data.key)
│   ├── icons/
│   └── capabilities/default.json
├── android/                 ← Capacitor Android (scaffold, pas testé)
├── capacitor.config.json
├── tests/
│   ├── smoke.spec.js        ← 34 tests, 31 passent (2 obsolètes /api/*, 1 skip)
│   ├── run-tests.bat
│   └── README.md
├── package.json
├── playwright.config.js
├── photo-map.json           ← index 312 photos
├── Z0. STOCK 2026/          ← 312 photos bijoux
├── Z0. VENTES 2026.xlsx
├── icon-192/512/maskable.png
├── manifest.json + sw.js    ← PWA legacy
├── BUILD_PIPELINE_PLAN.md
├── UI_REFACTOR_PLAN.md
├── MOBILE_AND_MAC_PLAN.md
├── SESSION_RECAP.md         ← ce fichier
├── inline-vendors.js        ← script Node pour réinliner Tailwind+Lucide après modif (v5.14.7+)
├── repair-html.js           ← outil de réparation au cas où
├── check-html.js            ← outil de validation
└── generate-photo-map.ps1 + generate-icons.ps1
```

---

## 🧠 Pour Claude (mémoire de session 2026-05-06)

### Bugs qu'on a écrasés cette session (NE PAS RÉPÉTER)
1. **Lucide throttle** : ne JAMAIS coalesce `lucide.createIcons()` — drop des appels = icônes manquantes. Si on veut throttle, faire un debounce trailing qui re-fire avec `lastOpts` à chaque fois.
2. **CSP Tauri** : la CSP serrée bloque Firebase + CDN. Garder `csp: null` jusqu'à un audit dédié de TOUS les endpoints utilisés.
3. **String.replace en JS** : si la `replacement string` contient `$&`, `$1`, `$\``, etc., ils sont interprétés. Toujours utiliser **la forme fonctionnelle** `replace(old, () => new)` pour des contenus arbitraires (notamment quand on injecte du code minifié comme Tailwind).
4. **WebView2 cache** : un Service Worker qui prefetch des CDN en `mode: 'no-cors'` produit des **réponses opaques** qui ne peuvent pas être ré-exécutées comme scripts. **PIRE** : ce cache survit aux rebuilds. Solution : self-host les CDN OU désactiver le SW dans Tauri (ce qu'on a fait).
5. **NSIS installer** : si on garde la même version (5.14.0), l'installeur peut refuser d'écraser. **Toujours bumper** (5.14.X) pour forcer le replace.

### Architecture actuelle confirmée stable
- Tauri 2.11 + Rust stable 1.93 + WebView2 v147 + LTO=false + strip=false
- 7 commandes Rust + chiffrement AES-GCM 256 du miroir OneDrive
- Tailwind + Lucide INLINED dans le HTML (zéro CDN au runtime)
- Service Worker désactivé en Tauri (auto-désinscription au boot)
- 31/34 tests Playwright passent (2 fails legacy /api/*)
- App data : `%AppData%\Roaming\ch.luxepos.desktop\luxepos-data.json` (clair) + `OneDrive\LuxePOS-Backup\luxepos-data.json` (chiffré AES-GCM)

### Métiers de l'utilisatrice (rappel)
- Artisane bijoux fantaisie à Genève (CH)
- 400 produits actifs, 39 clients, 108 ventes, 20 bundles
- ⚠️ **Tous les produits ont cost=0** → rentabilité aveugle. Le wizard et le bandeau orange du dashboard sont là pour ça.
- 102 produits stock=0 (mostly pièces uniques vendues, pas vraies ruptures)
- 22 produits sans prix
- Lumi dit "107 ruptures" — distinction maintenant visible dans l'UI (gris = vendu, rouge = composant à réassortir)

### Workflow de modif (à suivre demain)
1. Modifier `luxepos-final.html`
2. Si on touche au bloc `<script src="vendor/...">` ou aux scripts inline → **refaire l'inline** : `node inline-vendors.js`
3. `copy luxepos-final.html dist-web\` (et `index.html`)
4. `npx tauri build`
5. Bumper version dans `Cargo.toml` + `tauri.conf.json` AVANT le build (sinon NSIS refuse d'écraser)
6. Désinstaller proprement avant de réinstaller
7. **Si bug au 1er lancement, redémarrer l'app** (purge cache WebView2)

---

## 💬 Question à l'utilisatrice pour la reprise

> "T'as utilisé v5.14.7 aujourd'hui ? Le bandeau coûts t'a aidée ? Tu as commencé à saisir des coûts ? Quels sont les 2-3 trucs qui t'ont manqué ?"

---

## 🎨 DESIGN CRITIQUE 2026-05-06 (skill `design:design-critique` validé par utilisatrice)

L'utilisatrice a partagé 5 screenshots (Dashboard, POS, Inventaire, Clients, Commandes vide). Critique faite, **priorités validées par utilisatrice** ("je valide") à attaquer demain dans cet ordre :

### 🔴 Priorité 1 — Désamorcer les "fausses alertes stock" (~1h)
**Diagnostic** : "293 stock faible" affiché sur 294 pièces + "Dernier!" badge sur 100% des cartes POS. C'est le pattern "loup-cri-au-loup" : l'utilisatrice apprend à ignorer les alertes, donc quand un VRAI composant manque elle ne le verra plus.

**Implémentation** :
- Ajouter flag `isUniquePiece` (ou utiliser le `_isUniquePiece()` qui existe déjà côté store)
- Dans `getStockAlerts()` : exclure les pièces uniques du seuil "stock faible"
- Dans `getOutOfStockProducts()` : différencier composant (rouge, action: commander AliExpress) vs pièce unique vendue (gris, action: archiver) — déjà en partie fait en v5.14.7 (Fix #4), juste **propager partout**
- Badge "Dernier!" sur la card POS : afficher SEULEMENT si pièce unique ET non vendue (chercher dans `luxepos-final.html` les `Dernier!` et conditionner)
- Stat top inventaire "X stock faible" : recalculer en excluant uniques

### 🔴 Priorité 2 — Dégonfler la carte Client (~30 min)
**Diagnostic** : 6 boutons d'action par carte (Timeline + Edit + Chat + QR + Archive + Delete) × 27 clients = 162 boutons. Trop de bruit visuel, l'utilisatrice navigue moins.

**Implémentation** :
- Garder visibles : **Timeline** (action principale, gradient violet) + **Modifier** (icône crayon)
- Menu kebab "⋯" pour : Archiver, Supprimer, WhatsApp/Chat, QR Code
- Champ NOTES "Importé depuis Excel" automatique → le retirer comme texte, en faire un mini badge gris discret (ou le cacher si l'utilisatrice n'a pas écrit de vraie note manuelle)
- Toute la carte devient cliquable (hover state) → ouvre Timeline. Boutons en bas garde les actions explicites.

**Bonus optionnel si le temps** :
- Hash le prénom pour générer une couleur d'avatar déterministe (Alexandra=violet, Amie=rose…) au lieu du même gradient pink/purple partout

### 🟡 Priorité 3 — Dédupliquer le dashboard (~15 min)
**Diagnostic** : 
1. Bandeau orange "294 pièces sans coût" + Todo "1 chose à régler — 294 pièces sans coût" affichés à 5 cm = doublon
2. "Voir l'analyse complète" en bas + "Analyse complète" en haut à droite = doublon
3. Lumi tooltip "Astuce / Chargement…" reste affiché en permanence et chevauche les KPIs

**Implémentation** :
- Si le bandeau cost-blind est visible → cacher la todo correspondante (la todo n'apparaît QUE si bandeau dismissé)
- Supprimer le "Voir l'analyse complète" du bas de page (garder celui du header)
- Lumi tooltip : auto-dismiss après 10s OU collapse en bulle 💎 seule

### 🟡 Priorité 4 — Cacher les chiffres faux pendant cost=0 majoritaire (~20 min)
**Diagnostic** : Afficher "VALEUR STOCK 0 CHF" et "↓100% vs hier" enseigne à l'utilisatrice que les chiffres sont faux. Effet inverse du but.

**Implémentation** :
- Si >50% produits sans coût → KPI "VALEUR STOCK" affiche "À calculer" + petit bouton "Saisir" qui ouvre le wizard
- Si CA jour = 0 ET il est avant 14h → afficher "Première vente attendue" plutôt que "↓100% vs hier"

### 🟢 Priorité 5 — Polish (optionnel, 30 min)
- Pastille couleur sous les cartes POS : trop petite et illisible → l'agrandir ou retirer
- Cartes inventaire avec photo manquante (placeholder gris vide 📦) : remplacer par fond dégradé par catégorie + grosse initiale typo
- Bouton "Sélectionner" client en POS : passer en couleur brand (jaune/vert) au lieu de violet/rose pour cohérence
- Carte "+99 autres" / "+51 autres" : ajouter une flèche → pour signaler que c'est cliquable
- Bouton "Encaisser" disabled : ajouter sous-texte "Ajoutez au moins 1 article" ou animation flèche

---

## 🎨 Pistes design pour SESSIONS suivantes (après priorités ci-dessus)

- **`design:ux-copy`** sur écrans clés (vente, inventaire, paramètres) — beaucoup de micro-copies créées à la volée pourraient être uniformisées
- **`design:accessibility-review`** WCAG 2.1 AA — vérifier contrastes sur fond glassmorphism, navigation clavier, badges colorés
- **`design:design-system`** — auditer la cohérence interne (mélange de styles inline et classes Tailwind, plusieurs variantes de boutons sans doc)

---

## Pistes plus larges (pas design)
- A. Affiner le wizard coûts (autres heuristiques par catégorie ?)
- B. Phase Android (si elle veut le mobile pour Instagram/WhatsApp en mobilité)
- C. Mise en CI GitHub pour pouvoir builder Mac sans avoir de Mac
- D. Refactor UI (cf UI_REFACTOR_PLAN.md) — 1-2 semaines de boulot
