# GitHub Sponsors — Setup pas-à-pas

> Guide interne pour activer GitHub Sponsors sur le compte `metacovix-byte` et exposer le bouton "Sponsor" sur le repo LuxePOS-Web.

**URL cible finale** : [github.com/sponsors/metacovix-byte](https://github.com/sponsors/metacovix-byte)
**Statut actuel** : non activé (à faire).
**Temps estimé** : 30 à 60 minutes selon la rapidité de la validation Stripe.

---

## 1. Pourquoi GitHub Sponsors plutôt que Patreon / Ko-Fi / BMC

| Critère | GitHub Sponsors | Patreon | Ko-Fi | Buy Me a Coffee |
|---|---|---|---|---|
| **Frais plateforme** | 0% | 5-12% | 0% (Gold à 6$/mois) | 5% |
| **Frais paiement** | Stripe standard (~2.9% + 0.30€) | Stripe inclus | PayPal/Stripe | Stripe |
| **Intégration repo** | Native (badge, README) | Lien externe | Lien externe | Lien externe |
| **Visibilité dev** | Très haute | Faible | Faible | Faible |
| **Tax form** | Auto via GitHub | Manuel | Manuel | Manuel |
| **Cible idéale** | Devs et utilisateurs tech | Créateurs contenus | Artistes | Devs casual |

**Verdict** : GitHub Sponsors gagne pour LuxePOS — c'est natif au repo open source, 0% frais plateforme, et le badge s'affiche directement sur la page projet.

---

## 2. Procédure d'activation (pas-à-pas)

### Étape 1 — Vérifier l'identité GitHub

1. Aller sur [github.com/sponsors](https://github.com/sponsors)
2. Cliquer **"Join the waitlist"** ou **"Become a sponsored developer"**
3. GitHub demande :
   - Confirmer ton compte (email + 2FA déjà actifs sur `metacovix-byte`, normalement)
   - Vérifier ton pays de résidence : **Suisse 🇨🇭**
4. Délai : approbation en général sous 24h, parfois 7 jours.

### Étape 2 — Connecter Stripe Connect

GitHub Sponsors paye via Stripe Connect (séparé d'un compte Stripe normal).

1. GitHub te redirige vers Stripe Express
2. Tu fournis :
   - **Identité** : nom complet (passeport ou ID suisse)
   - **Adresse** : adresse Genève (justificatif facture EDS / Naef / Swisscom suffit)
   - **Date de naissance** + **nationalité**
   - **IBAN suisse** : compte CH (BCGE, PostFinance, Revolut CH, Neon, etc.)
   - **Numéro IDE** si entreprise ; sinon coche "individu"
3. Stripe vérifie sous 1 à 3 jours ouvrés.

**Important pour la Suisse** : si tu es sous le seuil TVA (CHF 100'000), coche "non-assujetti TVA". GitHub Sponsors n'ajoutera pas de TVA.

### Étape 3 — Compléter le profil Sponsor

Une fois validé, tu accèdes à `github.com/sponsors/metacovix-byte/dashboard`.

À remplir :

- **Photo de profil** : la même que ton compte GitHub, ou une photo atelier
- **Headline (60 chars)** : `Artisane bijoutière qui code LuxePOS open source à Genève 🇨🇭`
- **Short bio (long form)** : voir section 4 ci-dessous
- **Goal** : optionnel — par exemple "Atteindre 20 sponsors = je peux passer à mi-temps sur LuxePOS"
- **Mission statement** : 1-2 phrases sur le projet

### Étape 4 — Configurer les tiers

Voir section 3 ci-dessous pour la structure recommandée.

### Étape 5 — Activer le bouton Sponsor sur le repo

1. Créer le fichier `.github/FUNDING.yml` à la racine du repo `LuxePOS-Web` :

```yaml
# .github/FUNDING.yml
github: [metacovix-byte]
custom: ['https://luxepos.app/pricing.html']
```

2. Commit + push.
3. GitHub affichera automatiquement un bouton **💚 Sponsor** en haut du repo, à côté de Watch / Star / Fork.

### Étape 6 — Mettre à jour les liens dans le site

Le site `pricing.html` a déjà :
```html
<a href="https://github.com/sponsors/metacovix-byte">...</a>
```
Vérifier que ce lien fonctionne après activation (il sera live dès que le profil sera public).

---

## 3. Les 3 tiers à proposer

> Principe : aucun avantage matériel (pas de mug, pas de sticker à expédier — coût caché énorme). Que des signaux de gratitude et de visibilité.

### ☕ Tier 1 — Café

- **Prix** : **5 € / mois**
- **Public cible** : utilisateurs reconnaissants qui veulent dire merci
- **Avantages affichés** :
  - Tu apparais dans le `SPONSORS.md` du repo (si tu veux, opt-in)
  - Un emoji ☕ s'affiche à côté de ton pseudo dans le repo
  - Tu reçois la newsletter mensuelle "Coulisses LuxePOS" (3 sujets : nouveautés, conseil métier, dev journal)
- **Texte du tier** :
  > Un café par mois pour soutenir LuxePOS. Tu apparais dans les remerciements et tu reçois la newsletter coulisses (1×/mois). Pas plus, pas moins. Merci ☕

### 💚 Tier 2 — Supporter

- **Prix** : **15 € / mois**
- **Public cible** : utilisateurs réguliers qui veulent investir dans le projet
- **Avantages affichés** :
  - Tout ce qu'il y a dans Café
  - Badge "💚 Supporter" dans ton profil
  - Accès anticipé aux nouvelles features (1 semaine avant tout le monde)
  - Tu peux voter sur la roadmap (1 vote/mois sur une feature à prioriser)
- **Texte du tier** :
  > Tu crois au projet et tu veux qu'il dure. En échange : accès aux features 1 semaine avant les autres, et un vote mensuel sur la roadmap. Pas un perk obligatoire, juste une voix dans le pilotage 💚

### 💎 Tier 3 — Patron

- **Prix** : **50 € / mois**
- **Public cible** : pros, entreprises, artisanes qui ont une marge confortable et veulent porter le projet
- **Avantages affichés** :
  - Tout ce qu'il y a dans Supporter
  - Badge "💎 Patron" + ton nom listé dans le README du repo (opt-in)
  - 30 min d'échange visio par trimestre si tu veux (questions techniques, feature requests)
  - Ta logo/nom dans la section "Soutenu par" du site (opt-in, après validation)
- **Texte du tier** :
  > Tu portes le projet. Concrètement : 30 min/trimestre on parle directement (questions, feedback, demandes spécifiques). Ton nom dans le README. Logo sur le site si tu veux. C'est un budget pro pour un outil pro. Merci 💎

---

## 4. Texte de profil "About" (FR + EN)

À copier-coller dans le champ **Short bio** du profil GitHub Sponsors.

### 🇫🇷 Français

```
Je m'appelle Maëlle. Je suis artisane bijoutière à Genève (acier inoxydable,
perles, pièces uniques). J'ai 500 produits, 100 ventes par mois, 2 points
dépôt-vente.

J'ai codé LuxePOS parce qu'aucun outil de caisse ne savait gérer mon métier
correctement — Square ne comprend pas les pièces uniques, Shopify est fait
pour l'e-commerce, et les solutions "luxe" coûtent 200 CHF/mois sans
parler dépôt-vente. J'ai donc fait l'app avec une IA (Claude) qui m'aide
à écrire le code, mais c'est moi qui décide quoi construire.

LuxePOS est open source sous licence MIT. Le code vit sur GitHub. L'app
est gratuite aujourd'hui et le restera dans une version Découverte
(100 produits, 50 ventes/mois). À partir de 2027, une version Pro
existera à 9 CHF/mois pour ceux qui ont besoin du multi-POS et de
l'illimité.

Pourquoi GitHub Sponsors plutôt que Pro tout de suite ? Parce que :
1) tout le monde n'a pas besoin de Pro, certains veulent juste soutenir,
2) ça me donne de la marge pour finir les versions Mac et Android sans
   pression de l'urgence commerciale.

Aucun sponsor n'a d'avantage matériel — pas de mug, pas de sticker.
Que de la gratitude affichée et un peu de transparence (newsletter
mensuelle "Coulisses LuxePOS").

Si tu veux soutenir le projet, c'est ici. Si tu préfères attendre Pro,
c'est ok aussi. Merci 💚
```

### 🇬🇧 English

```
I'm Maëlle. I'm a jewelry artisan in Geneva, Switzerland (stainless steel,
beads, one-of-a-kind pieces). 500 products, 100 sales/month, 2 consignment
shops.

I built LuxePOS because no POS app understood my craft properly — Square
doesn't get unique pieces, Shopify is built for e-commerce, and "luxury"
solutions cost 200 CHF/month without handling consignment. So I built
the app with an AI (Claude) that helps me write code, but I decide what
to build.

LuxePOS is open source under MIT licence. The code lives on GitHub. The
app is free today and will stay free in a Discovery tier (100 products,
50 sales/month). From 2027 onwards, a Pro version will exist at 9 CHF/month
for those who need multi-POS and unlimited features.

Why GitHub Sponsors instead of jumping straight to Pro ? Because :
1) not everyone needs Pro, some just want to support,
2) it gives me runway to finish the Mac and Android versions without
   commercial urgency.

No sponsor gets material perks — no mug, no sticker. Just gratitude
displayed and a bit of transparency (monthly newsletter "LuxePOS
behind the scenes").

If you want to support the project, here it is. If you'd rather wait
for Pro, that's fine too. Thank you 💚
```

---

## 5. Vérifier le bouton Sponsors sur le site existant

Le site `website/pricing.html` (lignes 297-308) contient déjà la section sponsor :

```html
<a href="https://github.com/sponsors/metacovix-byte" target="_blank" rel="noopener" class="btn btn-primary btn-large">
    💚 <span data-i18n="pricingPage.sponsorCta">Devenir sponsor sur GitHub</span>
</a>
```

✅ Lien correct, prêt à fonctionner dès que le profil sera live.

Le site `index.html` n'a pas encore de bouton sponsor visible. À ajouter :

- **Suggestion** : dans le footer, à côté des liens GitHub / Changelog / Contact, ajouter `<a href="https://github.com/sponsors/metacovix-byte">💚 Sponsor</a>`
- **Ou** : section dédiée en bas de la home, similaire à celle de `pricing.html`.

---

## 6. Bouton Sponsor sur le README du repo

Le `README.md` du repo doit afficher un badge cliquable. Voir le fichier `marketing/README_LUXEPOS.md` pour la version refondue. Le bloc à ajouter :

```markdown
[![Sponsor](https://img.shields.io/badge/💚-Sponsor%20on%20GitHub-EA4AAA?style=flat-square)](https://github.com/sponsors/metacovix-byte)
```

Ou en HTML pour plus de contrôle :

```html
<a href="https://github.com/sponsors/metacovix-byte">
  <img src="https://img.shields.io/badge/💚-Sponsor-EA4AAA?style=flat-square" alt="Sponsor LuxePOS">
</a>
```

---

## 7. Suivi et reporting

Une fois GitHub Sponsors actif, dashboard accessible à :
`github.com/sponsors/metacovix-byte/dashboard`

À surveiller mensuellement :
- Nombre de sponsors actifs par tier
- Revenus nets (après Stripe ~3% mais 0% GitHub jusqu'en 2030 dans l'engagement Microsoft actuel)
- Churn (qui se désabonne et pourquoi — GitHub envoie un feedback optionnel)

À envoyer aux sponsors une fois par mois (newsletter Buttondown) :
- 1 nouveauté récente
- 1 chiffre du projet (nombre d'utilisateurs, ventes traitées, etc.)
- 1 prochaine étape

---

## 8. Checklist finale d'activation

- [ ] Profil Sponsor demandé sur GitHub
- [ ] Identité vérifiée par GitHub
- [ ] Stripe Connect lié et IBAN suisse confirmé
- [ ] Photo + headline + bio renseignés
- [ ] 3 tiers configurés (Café 5€ / Supporter 15€ / Patron 50€)
- [ ] Profil publié et accessible publiquement
- [ ] Fichier `.github/FUNDING.yml` créé sur le repo
- [ ] Bouton 💚 Sponsor visible en haut du repo GitHub
- [ ] Liens du site testés (`pricing.html` + footer)
- [ ] Badge dans `README.md` ajouté
- [ ] Première newsletter d'annonce envoyée (voir `LAUNCH_EMAILS.md`)
- [ ] Annoncé sur Instagram (voir carrousel #7 — Gratuit/Ouvert/Suisse)

---

*Guide version 1.0 — relire avant activation, certaines règles Stripe Connect changent souvent.*
