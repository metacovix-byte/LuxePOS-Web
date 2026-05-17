# Déploiement du site marketing sur GitHub Pages

Ce guide explique comment activer et maintenir le déploiement automatique
du site marketing LuxePOS (`website/`) sur **GitHub Pages**.

Le pipeline est défini par le workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

---

## 1. Activer GitHub Pages (à faire UNE FOIS)

Une fois le workflow poussé sur `main`, l'utilisatrice doit faire **3 actions** dans GitHub :

### Étape A — Ouvrir les paramètres Pages

1. Aller sur `https://github.com/metacovix-byte/LuxePOS-Web/settings/pages`

### Étape B — Choisir la source

2. Dans **Build and deployment** → champ **Source**, sélectionner **`GitHub Actions`**
   (et **PAS** "Deploy from a branch")

### Étape C — Déclencher le premier déploiement

3. Aller dans l'onglet **Actions** → workflow **"Deploy website to GitHub Pages"**
   → cliquer **"Run workflow"** sur la branche `main`
   (ou simplement pousser un commit qui touche `website/`)

Au premier déploiement réussi, l'URL apparaît dans Settings → Pages
ainsi que dans l'environnement `github-pages` du repo.

---

## 2. URL finale attendue

- **URL de production** : `https://metacovix-byte.github.io/LuxePOS-Web/`
- La page d'accueil est servie depuis `website/index.html` (copié à la racine du site déployé)
- La page tarifs est accessible via `https://metacovix-byte.github.io/LuxePOS-Web/pricing.html`

> NOTE : on déploie le contenu de `website/` **à la racine** du site Pages
> (pas dans `/website/`). C'est plus propre, et ça facilite la migration future
> vers un domaine personnalisé.

---

## 3. Déclencheurs du workflow

Le workflow se relance automatiquement quand :
- un push sur `main` modifie un fichier dans `website/`
- un push touche `.github/workflows/deploy-pages.yml`
- un tag `v*` est poussé (utile pour rebuild après release de l'app desktop)
- on clique manuellement **Run workflow** dans l'onglet Actions

---

## 4. Configurer un domaine personnalisé (plus tard)

Quand le domaine sera prêt (`luxepos.app`, `luxepos.ch`, ...) :

### 4.1 DNS chez le registrar

Configurer un enregistrement DNS :

```
# Pour un sous-domaine (www, app, …)
Type:   CNAME
Name:   www  (ou @ si apex via ALIAS / ANAME)
Value:  metacovix-byte.github.io
TTL:    3600
```

Pour un **apex** (`luxepos.ch` sans `www.`), utiliser des enregistrements **A** vers
les IPs officielles GitHub Pages :

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 4.2 Ajouter un fichier `CNAME` au déploiement

Créer `website/CNAME` (un seul ligne, le domaine final) :

```
luxepos.app
```

GitHub Pages lit ce fichier à la racine du site et configure automatiquement
le domaine custom + le certificat TLS Let's Encrypt (peut prendre 10–60 min).

### 4.3 Forcer HTTPS

Dans **Settings → Pages**, cocher **"Enforce HTTPS"** une fois le certificat émis.

---

## 5. Cache & invalidation

### Côté GitHub Pages
- Pages applique un `Cache-Control: max-age=600` (10 min) sur les fichiers statiques.
- Pour invalider rapidement, on utilise du **cache-busting via querystring** dans le HTML :
  ```html
  <link rel="stylesheet" href="style.css?v=20260517">
  <script src="script.js?v=20260517"></script>
  ```
- Bumper la query `?v=...` à chaque release suffit à forcer le rechargement.

### Si on met Cloudflare devant
1. Ajouter le domaine sur Cloudflare → DNS → CNAME vers `metacovix-byte.github.io`
2. Mode SSL : **Full (strict)**
3. Page Rule sur `*luxepos.app/*` → Cache Level: Standard, Edge TTL: 1h
4. Après chaque deploy, purger via `Caching → Configuration → Purge Everything`
   (ou API `POST /zones/:id/purge_cache` dans une step CI plus tard)

---

## 6. Vérifier qu'un déploiement a réussi

1. Onglet **Actions** → dernier run "Deploy website to GitHub Pages" → tous les jobs verts
2. Settings → **Environments** → `github-pages` → URL clicable du déploiement
3. Ouvrir l'URL en navigation privée pour ignorer le cache local

---

## 7. Dépannage

| Symptôme | Cause probable | Fix |
|---|---|---|
| 404 sur la racine | Pages pas activé en mode "GitHub Actions" | Voir étape B ci-dessus |
| 404 sur `/pricing.html` | Fichier non copié dans `_site` | Vérifier la step "Prepare site directory" dans les logs |
| Vieux contenu servi | Cache navigateur ou CDN | Hard-reload (Ctrl+F5) ou bump `?v=` |
| Workflow ne se déclenche pas | Modif hors `website/` | Lancer manuellement via workflow_dispatch |
| `actions/deploy-pages` échoue avec 403 | Permissions manquantes | Vérifier `permissions:` au top du workflow (déjà OK) |

---

## 8. Pourquoi pas la branche `gh-pages` legacy ?

On déploie **depuis Actions** (modèle moderne) plutôt que via la branche `gh-pages` car :
- pas besoin d'historique git pollué par chaque deploy
- les permissions sont scoped (OIDC via `id-token: write`)
- le rollback se fait en relançant un run précédent
- la doc officielle GitHub recommande cette approche depuis 2023
