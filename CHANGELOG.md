# Changelog

Toutes les versions notables de LuxePOS sont documentées ici.

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versioning : [SemVer](https://semver.org/spec/v2.0.0.html).

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
