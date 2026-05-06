# Tests LuxePOS — 30 smoke tests

Filet de sécurité pour vérifier que les invariants critiques de l'app ne sont pas cassés.

## Lancer en 1 clic (Windows)

1. Vérifier que **Node.js** est installé : <https://nodejs.org> (LTS recommandé)
2. Lancer `LuxePOS Pro` depuis le bureau (le serveur doit tourner)
3. Double-clic sur **`tests/run-tests.bat`**

La 1ère fois, le script installe Playwright + Chromium (~30s, ~150 Mo). Les fois suivantes, ~10s pour les 30 tests.

## Lancer en ligne de commande

```bash
cd C:\Users\mouni\OneDrive\Documents\SB\LuxePOS-Web

# Une seule fois
npm init -y
npm install -D @playwright/test
npx playwright install chromium

# À chaque fois
npx playwright test tests/smoke.spec.js

# Mode debug visuel (Chromium ouvert, on voit l'app)
npx playwright test --headed --ui
```

## Que vérifient les 30 tests ?

### 1xx — Bootstrap (4 tests)
- 101. Page charge sans erreur JS
- 102. APP_CONFIG complet et figé
- 103. Modules globaux exposés (Store, UI, Router, LOG, Crypto, t, EventDelegator)
- 104. Lucide icons rendus dans le DOM

### 2xx — Persistance (7 tests)
- 201. Store initialisé avec collections
- 202. Pub/Sub typé : `on/emit/off`
- 203. Logger LOG capture en buffer
- 204. localStorage write+read round-trip
- 205. `/api/status` répond avec version serveur
- 206. `/api/save` accepte JSON valide
- 207. `_aggCache` invalidé au save

### 3xx — Sécurité (6 tests)
- 301. Crypto round-trip OK
- 302. Mauvais mot de passe → erreur explicite
- 303. Mot de passe trop court → refusé
- 304. Path traversal URL-encoded → 403
- 305. Lumi sanitize : `<script>` est échappé (anti-XSS)
- 306. Lumi sanitize : `<strong>` reste fonctionnel

### 4xx — Workflows métier (7 tests)
- 401. Archive produit : sort de `getActive`
- 402. Archive client : événement `client.archived` émis
- 403. Distinction "vendu unique" vs "à réassortir"
- 404. Snapshot : `invoiceCounter` ne recule pas (compliance LTVA)
- 405. Cost wizard accessible
- 406. Wizard apply : applique coût aux produits sans coût
- 407. `suggestArchivableProducts` utilise le cache `_aggCache`

### 5xx — UI (10 tests)
- 501. Navigation Dashboard rend la page
- 502. Navigation Inventaire affiche le titre
- 503. Navigation Clients affiche le titre
- 504. Navigation Settings affiche thème picker
- 505. Bascule thème "sable" puis "emerald" — réversible
- 506. Recherche inventaire filtre les résultats
- 507. EventDelegator dispatche les actions
- 508. `showConfirm` avec `extraButton` (3 choix)
- 509. i18n `t()` renvoie le texte FR par défaut
- 510. Hover preview détaché correctement

## Que faire si un test échoue ?

```bash
npx playwright show-report
```

Ouvre un rapport HTML avec :
- Stack trace de l'erreur
- Screenshot avant/après
- Trace complète (replay) de chaque action

Ne JAMAIS shipper avec un test rouge sans diagnostiquer pourquoi.

## Étendre

Pour ajouter un nouveau test, il suffit de coller dans `smoke.spec.js` :

```js
test('XYZ. Mon nouveau test', async ({ page }) => {
    const result = await page.evaluate(() => {
        // Code exécuté DANS la page (a accès à window.store, window.ui, etc.)
        return window.store.state.products.length;
    });
    expect(result).toBeGreaterThan(0);
});
```

Numérotation suggérée : `1xx` bootstrap, `2xx` persistance, `3xx` sécurité, `4xx` métier, `5xx` UI, `6xx` perf.

## CI/CD

Pas de CI configurée pour l'instant (single-dev, single-machine).
Si un jour besoin → GitHub Actions avec service container PowerShell pour le serveur, puis `npx playwright test`.
