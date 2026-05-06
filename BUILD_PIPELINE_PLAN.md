# Plan de migration vers un build pipeline (futur)

> **Statut** : pas urgent. Document à conserver pour quand l'app dépassera 30k lignes
> ou quand on voudra du TypeScript / des tests unitaires sérieux.

## Pourquoi un build pipeline un jour ?

Le single-file actuel (~1.6 MB) tient bien tant qu'on est seul à coder. Il deviendra
inconfortable quand :
- Le fichier dépasse 30k lignes (autocomplete IDE rame, debug source maps inutilisable)
- On veut TypeScript pour le code Store/UI critique
- On veut tree-shaking / code-splitting (ne charger qu'une partie au démarrage)
- Plusieurs personnes travaillent dessus en parallèle

## Architecture cible

```
LuxePOS-Web/
├── src/
│   ├── config/
│   │   └── app-config.js          (APP_CONFIG actuel)
│   ├── lib/
│   │   ├── logger.js              (LOG actuel)
│   │   ├── crypto.js              (Crypto actuel)
│   │   ├── i18n.js                (I18N actuel)
│   │   └── event-delegator.js     (EventDelegator actuel)
│   ├── store/
│   │   ├── store.js               (la classe Store)
│   │   ├── persistence.js         (les 5 couches : LS/IDB/OPFS/disk)
│   │   ├── snapshots.js           (capture/restore)
│   │   └── archive.js             (archiveEntity, suggestArchivable)
│   ├── ui/
│   │   ├── ui.js                  (la classe UI orchestrateur)
│   │   ├── modals.js              (showConfirm, etc.)
│   │   ├── notifications.js       (toast, undoToast)
│   │   ├── components/            (cards, forms, badges réutilisables)
│   │   └── pages/
│   │       ├── dashboard.js
│   │       ├── pos.js
│   │       ├── inventory.js
│   │       ├── clients.js
│   │       ├── history.js
│   │       └── settings.js
│   ├── router/
│   │   └── router.js
│   ├── styles/
│   │   ├── tokens.css             (variables CSS, design tokens 2026)
│   │   ├── components.css
│   │   └── animations.css
│   └── index.html                 (squelette minimal)
├── public/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.json
│   ├── photo-map.json             (généré)
│   └── server.ps1                 (inchangé)
├── tests/
│   └── *.spec.js
├── package.json
├── vite.config.js                 (ou esbuild)
└── tsconfig.json                  (si TypeScript)
```

## Outils recommandés (par ordre de simplicité)

### Option A — esbuild (le plus simple, le plus rapide)
**Pourquoi** : zero-config, build < 100ms, parfait pour single-author.
```bash
npm install -D esbuild
# package.json:
"build": "esbuild src/ui/ui.js --bundle --outfile=dist/luxepos.js --minify"
```

### Option B — Vite (le plus moderne)
**Pourquoi** : HMR (live reload pendant le dev), plugin TypeScript intégré, écosystème riche.
```bash
npm create vite@latest luxepos -- --template vanilla-ts
```

### Option C — Bun (le plus expérimental)
**Pourquoi** : runtime + bundler tout-en-un, ultra rapide, syntaxe simple.
```bash
bun build ./src/ui/ui.js --outdir ./dist
```

## Plan de migration en 5 étapes (1 jour de boulot total)

### Étape 1 — Extraction non-destructive (2h)
- Créer `src/lib/` et y déplacer `LOG`, `Crypto`, `I18N`, `EventDelegator` (déjà bien isolés)
- Garder `luxepos-final.html` qui les importe via `<script src="src/lib/...">`
- Vérifier que ça marche encore (smoke tests)

### Étape 2 — Extraction Store (3h)
- Créer `src/store/store.js`
- Bouger la classe Store (~5000 lignes)
- Pas de bundler encore : juste `<script src="src/store/store.js">` dans le HTML

### Étape 3 — Extraction pages UI (3h)
- Une page = un fichier (`dashboard.js`, `pos.js`, etc.)
- La classe UI orchestre, mais les méthodes `renderXxx()` deviennent des fichiers
- `<script src="src/ui/pages/dashboard.js">` etc.

### Étape 4 — Mise en place esbuild/Vite (2h)
- `npm install -D esbuild`
- Script `build` dans `package.json`
- Génère `dist/luxepos.bundle.js` à partir de `src/`
- Le `index.html` n'a plus qu'UN `<script src="dist/luxepos.bundle.js">`

### Étape 5 — Migration vers TypeScript (optionnel, 1 semaine)
- Renommer `.js` → `.ts` au fur et à mesure
- Ajouter les types pour Store.state (gros gain !)
- `tsc --noEmit` en CI pour catch les régressions

## Coût/bénéfice

| Avant migration (actuel) | Après migration |
|--------------------------|-----------------|
| ✅ Workflow 1-clic (double-clic .bat) | ❌ Étape `npm run build` à chaque modif |
| ✅ Pas de Node.js requis | ❌ Node.js + npm requis |
| ✅ Modifier en live = recharger Chrome | ✅ HMR avec Vite (modif visible instantanément) |
| ❌ 30k lignes dans 1 fichier | ✅ Chaque fichier < 1000 lignes |
| ❌ Pas de TypeScript | ✅ Types stricts → moins de bugs |
| ❌ Pas de tree-shaking | ✅ Code mort éliminé auto |
| ❌ Source maps difficiles | ✅ Stack traces claires |

## Quand déclencher cette migration ?

**Pas avant** :
- Que tu aies utilisé l'app au moins 6 mois en production
- Que tu sois sûre des features que tu veux garder
- Que tu sois prête à apprendre Node.js / npm

**Déclenche immédiatement si** :
- Tu veux ajouter un développeur sur le projet
- Tu veux vendre/partager l'app à d'autres artisanes
- Tu as plus de 50k lignes de code

---

## Pratique en attendant

Pour garder le single-file sain :

1. **Discipline naming** : préfixer chaque méthode importante par sa "couche" (`store_`, `ui_`, `pos_`)
2. **Sections marquées** : utiliser les commentaires `█ STORE LAYER` (déjà en place)
3. **Pas de cycle** : Store ne doit JAMAIS appeler `window.ui.X()` directement — utiliser `this.emit('event')`
4. **Magic numbers** : tous dans `APP_CONFIG`
5. **Logs** : tous via `LOG.info/warn/error` ou `LOG.safe(...)` — plus de `try{}catch(e){}` muet
6. **Tests** : ajouter un test smoke dans `tests/` à chaque grosse feature

C'est suffisant pour tenir 1 à 2 ans à 1 développeur.
