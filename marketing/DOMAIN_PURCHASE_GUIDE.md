# Guide d'achat de domaine — LuxePOS

> Quand tu seras prête à passer de `metacovix-byte.github.io/LuxePOS-Web/` à un vrai domaine pro, voici la procédure complète. Pas urgent — l'URL GitHub Pages marche déjà parfaitement.

---

## 🇨🇭 Quel domaine choisir ?

### Option A — `luxepos.ch` ⭐ recommandé pour toi
- **Pourquoi** : tu es en Suisse, tu cibles principalement le marché CH
- **Signal** : "marque suisse, made in Switzerland"
- **Prix** : ~12-15 CHF/an
- **Registrar conseillé** : [Infomaniak](https://www.infomaniak.com/fr/domaines/.ch) (suisse, support FR, RGPD-compliant nativement)

### Option B — `luxepos.app`
- **Pourquoi** : extension moderne, HTTPS obligatoire (sécurité par défaut), reconnaissable comme "app"
- **Prix** : ~14 €/an
- **Registrar conseillé** : [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) — au prix coûtant, pas de markup, pas de upsell agressif

### Option C — `luxepos.com`
- **Pourquoi** : extension universelle, peut-être saturé
- **Prix** : ~10 €/an
- **À vérifier** : si le `.com` est encore disponible (vérifie sur https://nic.cc/luxepos)

### Option D — `getluxepos.ch`, `try-luxepos.app`, `luxepos.studio`
- **Si** `luxepos.ch` et `luxepos.app` ne sont pas dispos
- **À éviter** : les tirets multiples (`mon-luxe-pos.ch`) → mauvais SEO et difficile à dicter à l'oral

---

## 🛒 Procédure d'achat

### Si tu choisis Infomaniak (.ch)

1. Va sur https://www.infomaniak.com/fr/domaines
2. Tape `luxepos` dans la barre de recherche
3. Sélectionne `.ch` (tu peux ajouter `.app` et `.com` si tu veux les réserver aussi — 25 CHF/an total)
4. Crée un compte (ou login)
5. Paye par carte bancaire ou TWINT (oui, Infomaniak accepte TWINT)
6. Le domaine est actif **en 5-15 minutes**

### Si tu choisis Cloudflare Registrar (.app, .com)

1. Va sur https://dash.cloudflare.com/ (crée compte gratuit si pas encore)
2. **Add a Domain** → tape `luxepos.app`
3. Si dispo : "Register" → paye au prix coûtant (~14 €/an)
4. Configuration DNS automatique (Cloudflare gère)

---

## 🔗 Connecter le domaine à GitHub Pages

Une fois le domaine acheté, voici comment le pointer vers ton site GitHub Pages.

### Étape 1 — DNS chez le registrar

Ajoute ces enregistrements **A** + **AAAA** + **CNAME** pour pointer vers GitHub Pages :

**4 enregistrements A (apex `luxepos.ch`)** :
```
@   A   185.199.108.153
@   A   185.199.109.153
@   A   185.199.110.153
@   A   185.199.111.153
```

**Optionnel — 4 enregistrements AAAA (IPv6)** :
```
@   AAAA   2606:50c0:8000::153
@   AAAA   2606:50c0:8001::153
@   AAAA   2606:50c0:8002::153
@   AAAA   2606:50c0:8003::153
```

**1 enregistrement CNAME pour `www.luxepos.ch`** :
```
www   CNAME   metacovix-byte.github.io
```

### Étape 2 — Configuration GitHub Pages

1. Va sur **https://github.com/metacovix-byte/LuxePOS-Web/settings/pages**
2. Dans **Custom domain**, tape : `luxepos.ch` (ou `luxepos.app`)
3. **Save**
4. GitHub vérifie automatiquement les DNS (5-30 min)
5. ✅ Coche **Enforce HTTPS** dès que possible (certificat Let's Encrypt auto)

### Étape 3 — Ajouter un fichier `CNAME` au repo

Crée le fichier `website/CNAME` avec une seule ligne :
```
luxepos.ch
```

Puis commit + push :
```powershell
git add website/CNAME
git commit -m "feat(website): custom domain luxepos.ch"
git push
```

Le workflow GitHub Pages reprend automatiquement ce fichier et configure le domaine.

---

## 📧 Bonus : email pro `contact@luxepos.ch`

Si tu veux un email professionnel sur ton domaine (au lieu de `metacovix@gmail.com`).

### Option gratuite — Cloudflare Email Routing
- Forward `contact@luxepos.ch` → `metacovix@gmail.com`
- Tu réponds depuis Gmail mais l'expéditeur perçoit `contact@luxepos.ch`
- **Setup** : Cloudflare Dashboard → Email → Email Routing → ajouter règle
- **Prix** : 0 €

### Option pro — Infomaniak Mail
- Vrai compte email indépendant `contact@luxepos.ch` + webmail + IMAP
- **Prix** : ~4 CHF/mois inclus dans certains plans
- Plus pro mais plus de friction (boîte de plus à consulter)

---

## 🌍 Setup sous-domaines utiles (gratuits)

Une fois le domaine acheté, voici les sous-domaines à configurer :

| Sous-domaine | Pour quoi | Type DNS | Cible |
|---|---|---|---|
| `luxepos.ch` | Site principal | A + AAAA | GitHub Pages (IPs ci-dessus) |
| `www.luxepos.ch` | Redirect vers principal | CNAME | `metacovix-byte.github.io` |
| `stats.luxepos.ch` | GoatCounter custom domain | CNAME | `goatcounter.com` (cf `ANALYTICS_SETUP.md`) |
| `docs.luxepos.ch` | (plus tard) doc utilisateur | CNAME | GitBook / Notion / Docusaurus |
| `status.luxepos.ch` | (plus tard) status page | CNAME | UptimeRobot / Better Uptime |

---

## ⚠️ Considérations légales suisses

### Mentions légales obligatoires
Si tu commerces depuis un site CH (même gratuit pour l'instant), tu dois afficher :
- **Nom** (Maëlle [nom] ou ta raison sociale si tu l'as)
- **Adresse postale**
- **Email de contact**
- **Activité** (artisanat de bijoux, logiciel)

Page à ajouter : `website/mentions-legales.html` (FR/EN/DE/IT)

### LPD (Loi suisse sur la Protection des Données)
La page `privacy.html` créée par l'agent B est déjà conforme LPD + RGPD européen.

### TVA / impôt
- Sous CHF 100'000 de CA → pas assujettie TVA
- À déclarer dans ton activité indépendante au cantonal (Genève → AFC)

---

## 💰 Récapitulatif coût annuel (si tu veux le full setup pro)

| Item | Coût annuel | Optionnel ? |
|---|---|---|
| Domaine `.ch` (Infomaniak) | 15 CHF | Recommandé |
| Domaine `.app` (Cloudflare) | 14 € (~14 CHF) | Optionnel mais bon backup |
| Domaine `.com` (Cloudflare) | 10 € (~10 CHF) | Optionnel |
| Email forwarding Cloudflare | 0 € | Recommandé (gratuit) |
| GoatCounter | 0 € | Déjà setup |
| GitHub Pages | 0 € | Déjà setup |
| **Total minimum** | **15 CHF/an** | Pour avoir luxepos.ch + email pro |
| **Total confortable** | **40 CHF/an** | Avec les 3 extensions + protection |

---

## 🎯 Ma recommandation pour toi MAINTENANT

1. **Achète `luxepos.ch`** chez Infomaniak (15 CHF, 10 minutes)
2. **Configure DNS** vers GitHub Pages (suivre étapes ci-dessus)
3. **Setup email forwarding** Cloudflare gratuit : `contact@luxepos.ch` → `metacovix@gmail.com`
4. **Plus tard** (si tu veux protéger la marque) : achète aussi `.app` et `.com`

**Pourquoi pas tout de suite ?** Avant d'avoir tes 20 premières utilisatrices, le domaine n'est qu'un signal de pro. L'URL GitHub Pages marche déjà. Mais c'est un coût symbolique (15 CHF) qui change la perception "projet hobby" → "projet sérieux".

**À faire avant LE GRAND lancement Pro en 2027** : domaine + email + page mentions légales + landing waitlist active.

---

## 🔗 Liens utiles

- Vérifier disponibilité .ch : https://nic.ch
- Vérifier disponibilité .app : https://get.app
- Cloudflare Registrar : https://www.cloudflare.com/products/registrar/
- Infomaniak Domaines : https://www.infomaniak.com/fr/domaines
- Doc officielle GitHub Pages custom domain : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
