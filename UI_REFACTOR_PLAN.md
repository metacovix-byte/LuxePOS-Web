# Plan de découpage de la classe UI (v5.14)

> **Statut** : à exécuter quand le besoin se fera sentir (multi-dev, ou refactor lourd planifié).
> **Effort estimé** : 1-2 semaines solo, avec risque de régression élevé sur les chemins de rendu.

## Constat actuel

- Classe `UI` : **18 409 lignes** (1.16 MB), ~1 240 méthodes
- Catégories observées :
  - `render*` : 34 méthodes (renderDashboard, renderInventory, renderClients, etc.)
  - `show*` / `open*` : 55 méthodes (showConfirm, openProductModal, showQuickSaleModal, etc.)
  - `archive*` / `delete*` : 10 méthodes (handlers d'actions destructives)
  - `init*` : 13 méthodes (initSavedFooter, initSyncBadge, initFAB, etc.)
  - méthodes privées `_*` : 64
  - autres : 1 064 (helpers, validators, formatters, anims, etc.)

## Découpage cible (par responsabilité)

### 1. `UIRenderer` (~30%)
Toutes les méthodes `render*` :
- `renderDashboard`, `renderInventory`, `renderInventoryCards`, `renderInventoryGrouped`
- `renderClients`, `renderHistory`, `renderAnalytics`, `renderSettings`
- `renderPOS`, `renderOrders`, `renderRepairs`, `renderReservations`
- `renderEmptyState`, `renderStockAlerts`
- (incluant les variantes Sable v1/v2 si on les garde)

### 2. `UIModals` (~20%)
Toutes les méthodes `show*Modal`, `open*Modal`, et helpers de modal :
- `showConfirm`, `confirmDestructive`, `showInfo`, `showWarning`
- `openProductModal`, `openClientModal`, `showQuickSaleModal`
- `showSaleDetailsModal`, `showCreditNoteModal`
- `showVariantsDetail`, `showBomEditor`

### 3. `UIForms` (~10%)
Validation et soumission de formulaires :
- `handleProductSubmit`, `handleClientSubmit`
- `validatePhoneField`, `validateEmailField`, `validateTextField`
- `previewImageUrl`

### 4. `UINotifications` (~5%)
- `toast`, `showUndoToast`, `showCommandPalette`
- `playSound`, `haptic`
- `_refreshSavedFooter`, `_refreshPersistenceIndicator`

### 5. `UIArchive` (~5%)
Opérations d'archivage :
- `archiveProductUI`, `unarchiveProductUI`
- `archiveClientUI`, `unarchiveClientUI`
- `archiveSaleUI`, `unarchiveSaleUI`
- `showArchiveSuggestions`, `_bulkArchiveSuggested`

### 6. `UISettings` (~10%)
Tout ce qui touche aux paramètres :
- `setColorTheme`, `applyVisualSettings`
- `confirmTaxToggle`, `setV48Toggle`
- `refreshPersistencePanel`, `refreshArchivesPanel`
- `forceSaveNow`, `forceRestoreFromIDB`

### 7. `UICore` (le reste, ~20%)
- Constructor, listeners globaux
- Routing helpers
- Méthodes orchestratrices qui utilisent les autres modules

## Plan d'exécution en 5 étapes

### Étape 1 — Préparation (2h)
- Backup complet
- Smoke tests à étendre : 30+ tests Playwright qui couvrent chaque page principale
- Mesurer le temps actuel de cold start (référence avant/après)

### Étape 2 — Extraction passive (4h)
- Créer 7 nouvelles classes (`UIRenderer`, `UIModals`, `UIForms`, `UINotifications`, `UIArchive`, `UISettings`, `UICore`)
- Déplacer chaque méthode dans sa classe **MAIS sans toucher à l'API publique** : la classe `UI` les exporte toujours
- Pattern : `class UI { renderDashboard(...args) { return UIRenderer.renderDashboard.call(this, ...args); } }`

### Étape 3 — Tests massifs (2h)
- Lancer les 30+ smoke tests
- Tester chaque page manuellement
- Vérifier les performances (cold start, navigation)

### Étape 4 — Cleanup progressif (4h)
- Une fois validé que tout marche, on peut commencer à appeler directement `UIRenderer.X()` dans les autres modules
- Éliminer les façades legacy au fur et à mesure
- Garder `window.ui.X()` comme alias pour le code legacy / event handlers HTML

### Étape 5 — Benchmark + commit (1h)
- Comparer le temps de cold start avant/après
- Comparer la taille du fichier (probablement -10% par déduplication)
- Documenter les nouveaux contracts inter-modules

## Risques connus

1. **Méthodes inter-dépendantes** : `renderDashboard` appelle `renderStockAlerts` qui appelle `getOutOfStockProducts` qui est sur Store. Si on déplace, il faut vérifier les bindings `this`.
2. **Event handlers HTML inline** (`onclick="window.ui.X(...)"`) : 307 occurrences. Il faut maintenir l'API `window.ui.X` accessible même si la méthode déplace.
3. **Règles métier mélangées** : certaines `render*` contiennent du calcul (sum, filter), pas juste du HTML. Il faut décider si on les laisse là ou on les bouge dans Store.

## Pourquoi ne pas le faire maintenant

- L'utilisatrice est seule à utiliser/maintenir l'app → la dette technique ne la bloque pas pour l'instant
- 1-2 semaines de travail sans gain visible utilisateur (juste la maintenabilité interne)
- Risque non négligeable de régression
- Le smoke test minimal actuel (10 tests) est insuffisant pour valider un refactor de cette ampleur

## Quand le faire

✅ **Trigger** : si tu décides d'embaucher un dev pour t'aider, OU si tu veux ouvrir le code à d'autres artisans, OU si tu approches 50k lignes.
❌ **Pas maintenant** : tant que tu codes seule et que l'app fonctionne.

## Alternative : refactor progressif

Au lieu d'un big-bang, à chaque session future où tu touches une zone :
- Si tu modifies `renderDashboard` → la déplacer dans un fichier `ui-renderer-dashboard.js` (servi par le serveur PowerShell)
- Si tu touches modals → la sortir
- En 6-12 mois, l'extraction est faite naturellement

C'est plus lent mais beaucoup moins risqué.
