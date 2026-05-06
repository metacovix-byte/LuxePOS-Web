# GitHub Secrets — Setup pour auto-updater

Cette étape **doit être faite manuellement par toi** (Claude ne peut pas accéder à GitHub.com).

## ⚠️ La clé privée est déjà dans ton presse-papier (Ctrl+V pour la coller)

Si tu l'as perdue : `C:\Users\mouni\.tauri\luxepos.key` (lis-la avec Notepad ou n'importe quel éditeur, copie tout le contenu).

---

## Procédure (5 minutes)

### 1. Aller sur GitHub
**https://github.com/metacovix-byte/LuxePOS-Web/settings/secrets/actions**

### 2. Ajouter le 1er secret

Clique **"New repository secret"** (vert, en haut à droite) :
- **Name** : `TAURI_SIGNING_PRIVATE_KEY`
- **Secret** : Colle (Ctrl+V) le contenu de la clé privée (déjà dans ton presse-papier ! 348 caractères)
- **Add secret** (bouton vert)

### 3. Ajouter le 2e secret (mot de passe — vide dans notre cas)

Clique encore **"New repository secret"** :
- **Name** : `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
- **Secret** : laisse VIDE puis clique Add secret  
  *(la clé a été générée sans mot de passe pour simplifier)*

### 4. Vérifier

Tu devrais voir 2 secrets listés :
- `TAURI_SIGNING_PRIVATE_KEY` · Updated X seconds ago
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` · Updated X seconds ago

---

## ⚠️ IMPORTANT — Backup de la clé privée

**Si tu perds cette clé, tu ne pourras plus jamais pousser de mises à jour à tes apps existantes** (la signature ne matchera pas et l'updater refusera).

**Backup recommandé** :
1. Copie le fichier `C:\Users\mouni\.tauri\luxepos.key` quelque part de SÛR :
   - PAS dans OneDrive (risque de leak si compte hacké)
   - Plutôt : USB chiffré + email perso à toi-même + gestionnaire de mots de passe (1Password, Bitwarden)
2. Note quelque part qu'elle a été générée sans password
3. Si jamais tu changes de PC, tu devras copier ce fichier sur le nouveau

---

## Après avoir ajouté les secrets

Reviens me dire "secrets ajoutés" et je push le tag v5.14.11.

Le workflow CI va :
1. Build Windows + Mac
2. **Signer** les binaires avec ta clé privée (qui vit en sécurité dans GitHub Secrets)
3. **Créer une GitHub Release** avec les binaires + un fichier `latest.json` qui contient les URLs et les signatures
4. À partir de là, **toute app v5.14.10+ que tu as installée détectera la nouvelle version au démarrage** et te proposera de l'installer.
