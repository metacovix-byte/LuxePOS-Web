# Setup analytics RGPD-safe — GoatCounter

Ce document explique comment activer les statistiques de visite du site LuxePOS **sans cookie, sans tracking individuel, sans vente de données**. La solution retenue est **GoatCounter**.

---

## TL;DR (5 minutes chrono)

1. Va sur https://www.goatcounter.com/signup
2. Crée un compte avec ton email `metacovix@gmail.com`
3. Sous-domaine recommandé : `luxepos` → ton dashboard sera sur `luxepos.goatcounter.com`
4. Dans **Settings → Privacy**, coche `Don't track or collect IP addresses at all`
5. C'est tout. Le code est déjà intégré sur le site, ça commence à compter dès le prochain visiteur.

> Si le sous-domaine `luxepos` est pris, essaie `luxepos-app` ou `luxepos-ch`, **et n'oublie pas de remplacer `luxepos` dans les 5 fichiers HTML** (`index.html`, `pricing.html`, `waitlist.html`, `waitlist-success.html`, `privacy.html`) — cherche le bloc commenté `ANALYTICS : GoatCounter`.

---

## Pourquoi GoatCounter (et pas Google Analytics)

On voulait répondre à une seule question :
> Combien de personnes visitent le site, depuis où, sur quelles pages ?

Mais sans :
- cookie
- empreinte digitale (fingerprinting)
- tracking individuel
- revente de données

Voici les 4 options qu'on a comparées :

| Solution | Prix | Cookies | Open source | Score conformité RGPD | Verdict |
|---|---|---|---|---|---|
| **GoatCounter** ✅ | Gratuit jusqu'à 100k visites/mois | ❌ aucun | ✅ MIT | Maximum (IP non stockée, agrégé) | **Choisi** |
| Plausible Cloud | 9 €/mois | ❌ aucun | ✅ AGPL | Maximum | Bon mais payant — pas idéal pour une bêta gratuite |
| Umami Cloud | Gratuit jusqu'à 100k events | ❌ aucun | ✅ MIT | Maximum | Bon, mais GoatCounter est plus simple à déployer |
| Cloudflare Web Analytics | Gratuit illimité | ❌ aucun | ❌ | Bon | Nécessite hébergement Cloudflare Pages — pas notre cas |

**Choix : GoatCounter** parce que c'est gratuit, open source, le script ne fait que **4 KB**, et l'auteur (Martin Tournoij) est connu pour son engagement strict sur la privacy. Et on peut self-héberger plus tard si on veut.

---

## Étape par étape

### 1. Créer le compte

1. Va sur https://www.goatcounter.com/signup
2. Remplis :
   - **Site code** : `luxepos` (donnera `luxepos.goatcounter.com`)
   - **Site domain** : `luxepos.app` (ou ton domaine actuel — si tu n'as pas encore de domaine, laisse vide)
   - **Email** : `metacovix@gmail.com`
   - **Password** : utilise ton gestionnaire de mots de passe
3. Valide. Tu reçois un mail de confirmation.

> **Si `luxepos` est déjà pris :** tente `luxepos-app`, `luxepos-ch`, ou `luxepos2026`. **N'oublie pas** ensuite de mettre à jour la balise `<script data-goatcounter="https://VOTRE-SUB.goatcounter.com/count">` dans les 5 fichiers HTML.

### 2. Activer la privacy max

Une fois connectée au dashboard :

1. Clique sur **Settings** (en haut à droite)
2. Onglet **Privacy**
3. Coche :
   - ✅ `Don't track or collect IP addresses at all` (max privacy — recommandé)
   - ✅ `Use sessions instead of fingerprinting` (déjà coché par défaut, mais vérifier)
4. **Save**

Ces deux options font que :
- Aucune IP n'est jamais stockée (même temporairement)
- La détection de visiteurs uniques se fait via une session courte qui expire en quelques heures, **sans empreinte digitale**

### 3. Vérifier que ça marche

1. Va sur https://luxepos.app (ou ton URL de prod GitHub Pages)
2. Recharge la page une fois
3. Reviens sur `luxepos.goatcounter.com`
4. Tu devrais voir 1 visite dans les 30 secondes

Si rien ne s'affiche après 1 minute :
- Vérifie que tu n'as pas un bloqueur de pub très agressif sur ton navigateur (uBlock Origin avec listes anti-tracking peut bloquer GoatCounter — pourtant éthique. C'est un faux positif. Ouvre la page en navigation privée pour tester sans extension.)
- Vérifie dans la console (F12) qu'il n'y a pas d'erreur de chargement de `//gc.zgo.at/count.js`

### 4. Lire le dashboard

Le dashboard te montre, par défaut, sur **les 30 derniers jours** :

- **Total Pageviews** : nombre total de pages vues
- **Total Visitors** : visiteurs uniques (basé sur session courte, pas sur cookie)
- **Top Pages** : quelles pages sont visitées
- **Top Referrers** : d'où viennent les gens (Google, GitHub, Twitter, etc.)
- **Browsers / Systems / Sizes** : agrégés, anonymes
- **Locations** : pays approximatifs (géolocalisés au pays, pas plus précis)

Tu peux changer la période en haut à droite (Today, 7 days, 30 days, custom range).

### 5. Exporter les stats en CSV

1. Sur le dashboard → **More** (menu en haut) → **Export**
2. Choisis la période et le format (CSV ou JSON)
3. Download

C'est pratique si tu veux faire des stats persos dans Excel, ou archiver chaque mois.

---

## Custom domain (optionnel, plus tard)

Si tu achètes le domaine `luxepos.app`, tu peux faire pointer un sous-domaine `stats.luxepos.app` vers GoatCounter :

1. Chez ton registrar (ex. Infomaniak, Namecheap), ajoute un enregistrement DNS :
   - **Type** : CNAME
   - **Nom** : `stats`
   - **Valeur** : `luxepos.goatcounter.com`
2. Dans GoatCounter → **Settings** → **Domain** : ajoute `stats.luxepos.app`
3. Attends 5-30 minutes pour la propagation DNS
4. Met à jour les 5 fichiers HTML :
   ```html
   <script data-goatcounter="https://stats.luxepos.app/count"
           async src="//gc.zgo.at/count.js"></script>
   ```
   (note : `gc.zgo.at` reste le CDN du script, on ne change que le `data-goatcounter`)

Avantage : ton dashboard est sur ton domaine, plus pro pour partager publiquement. **Pas obligatoire**.

---

## Code intégré sur le site

Le script est ajouté **juste avant `</body>`** sur les 5 pages :

```html
<script data-goatcounter="https://luxepos.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

Notes :
- **`async`** : le script ne bloque pas le rendu de la page
- **Position en bas** : exécuté après le DOM, n'impacte pas le LCP / FCP
- **Taille** : ~4 KB minifié, gzippé : ~2 KB
- **Domaine** : `gc.zgo.at` est le CDN officiel de GoatCounter, hébergé par l'auteur sur un VPS européen

### Impact Lighthouse attendu

Le script étant en `async` et chargé en fin de body, l'impact sur le score Lighthouse est **négligeable** :
- LCP : pas impacté (HTML/CSS prioritaires terminés avant)
- TBT : +5-15 ms (parse + exec du script de 4 KB)
- CLS : nul (pas de DOM modifié visuellement)

Score Lighthouse Performance attendu : **toujours 95+**, identique à sans GoatCounter.

---

## Alternatives si tu préfères changer un jour

### Si tu veux self-host (souveraineté max)
GoatCounter est open source. Tu peux le tourner sur un VPS à 5 €/mois :
```bash
# Sur un Debian/Ubuntu
wget https://github.com/arp242/goatcounter/releases/latest/download/goatcounter-linux-amd64.gz
gunzip goatcounter-linux-amd64.gz && chmod +x goatcounter-linux-amd64
./goatcounter-linux-amd64 serve -listen :80 -tls none
```
Doc : https://github.com/arp242/goatcounter#installation

### Si tu préfères Plausible (qualité supérieure, payant)
9 €/mois (ou 90 €/an). Dashboard plus joli, plus de filtres avancés.
https://plausible.io

### Si tu préfères Umami (open source, à self-host facilement)
Gratuit, tourne sur Vercel/Railway en 5 min. Dashboard moderne.
https://umami.is

### Si tu veux 0 € et 0 effort, et que tu acceptes d'héberger sur Cloudflare
Cloudflare Web Analytics : illimité, gratuit, mais demande de basculer le site sur Cloudflare Pages.
https://www.cloudflare.com/web-analytics/

---

## Ce qu'on NE fera JAMAIS sur le site

Pour rappel, voici la liste noire — ces outils ne seront **jamais** ajoutés :

- ❌ Google Analytics
- ❌ Facebook Pixel
- ❌ Hotjar / Mouseflow / FullStory (heatmap = enregistre la souris des visiteurs = creepy)
- ❌ Sentry / LogRocket (replay de session = encore plus creepy)
- ❌ Intercom / Crisp (widget chat avec fingerprinting)
- ❌ Tout outil qui pose un cookie tiers

Cette promesse est inscrite dans `privacy.html` et dans la baseline marketing "Pas de tracking" affichée sur la page d'accueil. **C'est non-négociable** : si on en ajoute un un jour, on doit d'abord en parler explicitement sur le site et mettre à jour la politique de confidentialité.

---

## Contact

Question sur ce setup ? Écris à `metacovix@gmail.com` ou ouvre une issue sur le repo.

---

*Dernière mise à jour : 18 mai 2026 · Maintenue dans `marketing/ANALYTICS_SETUP.md`*
