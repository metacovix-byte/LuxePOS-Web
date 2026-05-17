# Stratégie de monétisation — LuxePOS

> Document de travail, écrit en mai 2026, après le passage en open source du repo et la publication du site marketing en 4 langues. À relire tous les 3 mois. Tout chiffre ici est une hypothèse honnête, pas une projection vendue à un VC.

**Auteure principale** : Maëlle (artisane bijoutière + dev solo avec Claude)
**Horizon du plan** : 18 mois (mai 2026 → novembre 2027)
**Hypothèse de capacité** : 10 à 15 h / semaine sur le projet, sans collaborateurs

---

## 1. Persona ICP (Ideal Customer Profile)

### 1.1 Le profil principal : "Marie l'artisane installée"

- **Sexe / âge** : femme, 28-48 ans (90 % du marché bijou-fantaisie indépendant en Europe francophone est féminin)
- **Activité** : artisane bijou à temps plein ou complément de revenu sérieux (pas hobby pur)
- **Chiffre d'affaires** : 15 000 à 60 000 CHF / an (≈ sous le seuil TVA suisse, ou micro-entrepreneuse FR)
- **Catalogue** : 100 à 800 pièces actives, dont beaucoup d'**uniques**
- **Volume de ventes** : 30 à 200 ventes / mois
- **Canaux de vente** :
  - Instagram (DM + Stories shop)
  - WhatsApp Business
  - Dépôt-vente (1 à 4 points)
  - Marchés / salons (occasionnel)
  - Site Etsy ou shop perso (parfois, mais secondaire)
- **Outils actuels** :
  - Excel ou Google Sheets bricolés
  - Carnet papier pour les commandes WhatsApp
  - Calculatrice du téléphone pour les marges
  - Aucune compta digitale au-delà du fichier des recettes annuel
- **Douleurs** :
  - "Je sais pas combien je gagne vraiment, parce que je ne mets jamais le coût des composants à jour"
  - "Quand la copine du dépôt-vente me ramène sa liste papier, ça me prend 1h pour la rentrer"
  - "Sur Instagram, j'oublie des DM, je perds des ventes"
  - "Square / Shopify c'est 40 €/mois, je peux pas justifier"
  - "Quand mon ordi crash, je flippe pour mes données"
- **Personnalité** : sensible au métier, méfiante des outils "made in Silicon Valley", aime bien le côté local / chaleureux, prête à payer pour ce qui marche mais pas pour ce qui frime

### 1.2 Géographie cible par phase

| Phase | Marché prioritaire | Pourquoi |
|---|---|---|
| **0-1 (M0-M9)** | Suisse romande + France (Auvergne-Rhône-Alpes, IDF, sud) | Mêmes codes culturels, mêmes salons, langue = FR |
| **1-2 (M9-M18)** | Belgique francophone + Québec | Diaspora FR-CA active sur Insta artisan, peu d'outils dédiés |
| **2-3 (M18+)** | DACH (Suisse alémanique → Allemagne → Autriche) | Public artisan bijou très structuré, traduction DE déjà prête sur le site |
| **3 (M24+)** | Italie + UK | Marchés artisans très vivants, traductions IT/EN déjà partiellement prêtes |

Note : ne jamais dépenser un euro de pub sur un marché qu'on n'a pas pénétré en organique. Le site est déjà traduit, c'est suffisant pour valider l'intérêt local.

### 1.3 Sous-segments précis (à prioriser dans le contenu et les features)

1. **Acier inoxydable 316L + AliExpress** ← *segment-mère de Maëlle, donc le mieux compris*
   Marges 60-80 %, volumes élevés, composants importés
2. **Perles d'eau douce / perles naturelles**
   Marges moyennes, pièces semi-uniques
3. **Bijoux vintage chinés** (revendeuses)
   Stock unique total, besoin de tracking pièce-à-pièce
4. **Macramé / tissage / fil d'argent**
   Beaucoup de temps de fabrication, donc besoin de "coût horaire" dans le wizard coûts
5. **Bijoux résine / époxy / fleurs séchées**
   Coût matière variable, lots de production
6. **Argent 925 / plaqué or fait main**
   Marges plus serrées, plus de clientèle revente

Chacun de ces segments mérite **un témoignage spécifique** (Phase 1) et **un mini-tutoriel d'import Excel adapté** (Phase 1).

### 1.4 Anti-personas (à dire explicitement non)

- **Boutique physique salariée** (5+ vendeuses, multi-tills, gestion droits utilisateurs avancée) → Lightspeed/Square sont mieux
- **E-commerce pur** (90 % du CA sur shop en ligne) → Shopify
- **Bijoux de luxe** (or massif, diamants, certificats GIA) → besoin de logiciel spécialisé type GoldVision, ERPNext
- **Métiers connexes** (coiffeur, esthéticienne, café) → ce n'est pas leur métier, le vocabulaire ne colle pas
- **Multi-pays e-commerce** (TVA OSS, douanes US) → trop complexe pour la roadmap solo
- **Quelqu'un qui veut "un outil clé en main avec support 24/7"** → on est solo, on assume

---

## 2. Positionnement

### 2.1 Le pitch en 1 phrase

> **LuxePOS est l'app native qui pense comme une artisane bijoutière : pièces uniques, dépôt-vente, DMs Insta — sans abonnement obligatoire et sans cloud opaque.**

Variante courte (Twitter / bio) :
> *La caisse de mon atelier de bijoux. Hors-ligne. Chiffrée. Open source.*

### 2.2 Les 3 promesses-clés différenciantes

1. **"Tes données vivent chez toi."**
   Pas un SaaS. App native Windows / Mac / Android. Backup chiffré AES-GCM 256 dans **ton** OneDrive. Si LuxePOS ferme, l'app continue de tourner — c'est du code MIT sur GitHub.

2. **"Pensée pour les pièces uniques, pas pour les SKU répétés."**
   Distinction native composant-à-réassortir vs pièce-unique-vendue. Pas d'alertes stock fantômes. Wizard coûts qui pré-remplit par catégorie ("collier ≈ 10 CHF").

3. **"Une artisane et son IA, pas une équipe à San Francisco."**
   Le prix reflète ça : 9 CHF/mois en 2027, jamais 49. Le roadmap est public. Quand tu écris à `metacovix@gmail.com`, c'est Maëlle qui répond.

### 2.3 Les anti-features (ce qu'on NE FERA PAS, et c'est rassurant)

- ❌ **Pas de cloud propriétaire.** Tes données ne sont jamais sur nos serveurs (on n'en a pas).
- ❌ **Pas de boutique en ligne intégrée.** Si tu veux vendre sur le web, garde Etsy/Shopify. LuxePOS sait dialoguer avec eux (exports), pas les remplacer.
- ❌ **Pas de paiement carte intégré.** Pas de terminal, pas de SumUp built-in. TWINT/Revolut/cash uniquement (la réalité du marché artisan suisse/français).
- ❌ **Pas de gestion compta complète.** On exporte vers QuickBooks/Bexio/Pennylane, on ne les remplace pas.
- ❌ **Pas de multi-employés (Phase 1-2).** L'app est mono-utilisatrice par installation. Si tu as une vendeuse à temps plein, attends la v6.x.
- ❌ **Pas d'IA "marketing miracle".** Lumi est un assistant local pour comprendre tes chiffres, pas un générateur de contenu Insta.
- ❌ **Pas de plans Enterprise / Custom.** Trois prix publics, point. Si tu veux du sur-mesure, fork le repo.
- ❌ **Pas d'app gratuite pour toujours en feature complet.** Le tier gratuit est honnête (100 produits / 50 ventes / mois). Au-delà, Pro à 9 CHF.

---

## 3. Roadmap commerciale 4 phases (calendrier 18 mois)

### Phase 0 — M0 à M3 : Validation (mai → août 2026)

**Objectif unique** : passer de 1 utilisatrice (Maëlle) à **5-10 utilisatrices régulières**. "Régulière" = a lancé l'app au moins 3 fois sur 4 semaines distinctes.

**M0 (mai 2026) — Mise en route**
- ✅ Repo public sur GitHub (fait)
- ✅ Site marketing 4 langues publié (fait)
- 🎯 Acheter le domaine `luxepos.app` (≈ 15 €/an chez Porkbun ou Cloudflare Registrar)
- 🎯 Configurer DNS → GitHub Pages ou Cloudflare Pages
- 🎯 Activer GitHub Sponsors sur le compte `metacovix-byte`
- 🎯 Créer un compte Instagram dédié `@luxepos.app` (séparé du compte perso de Maëlle)
- 🎯 Mettre en place **Plausible Analytics** auto-hébergé OU **Cloudflare Web Analytics** (gratuit, RGPD-friendly, zéro cookie)
- 🎯 Écrire un README GitHub honnête, sans hyperbole, avec gif animé du dashboard

**M1 (juin 2026) — Premiers contacts**
- 🎯 Publier 1 post LinkedIn + 1 post Instagram sur le **lancement open source** (pas "lancement produit", c'est différent)
- 🎯 Identifier 20 artisanes bijoutières dans ton réseau Insta (followings + DMs récents) → leur envoyer un message **personnel** (pas un copier-coller) : *"Salut, je viens de publier l'app que j'utilise pour gérer ma boutique. C'est gratuit, c'est open source, ça gère le dépôt-vente. Si t'as 10 min un soir je te montre."*
- 🎯 Cibler 5 démos en visio (Google Meet, 20 min chacune) → enregistrer leurs retours dans un Notion ou un doc partagé
- 🎯 Créer un canal **Discord** ou **groupe Telegram** "Artisanes LuxePOS" — invite-only au début (max 30 personnes)

**M2 (juillet 2026) — Itération sur retours**
- 🎯 Fixer les 5-10 frictions remontées par les 5 premières utilisatrices (probable : import Excel non-standard, copy française à clarifier, bug Windows)
- 🎯 Sortir une **v5.16** avec changelog public mentionnant qui a remonté quoi (signal communautaire)
- 🎯 Lancer un **GitHub Discussions** (gratuit) pour les questions publiques
- 🎯 Publier un premier **carrousel Insta** sur "Combien je gagne vraiment par bracelet — la math derrière mon prix" (storytelling + utilité de LuxePOS sans le vendre frontalement)

**M3 (août 2026) — Bilan + ajustement**
- 🎯 Mesurer : combien d'installations ? combien d'utilisatrices régulières ? combien d'étoiles GitHub ?
- 🎯 Décision : si < 5 utilisatrices régulières → **rester en Phase 0 deux mois de plus**, ne pas forcer la croissance
- 🎯 Si ≥ 5 utilisatrices régulières → passer Phase 1
- 🎯 Documenter dans `RETROSPECTIVES.md` les 3 plus gros enseignements

**Métriques Phase 0**
- Installations cumulées (téléchargements GitHub Releases)
- Utilisatrices "régulières" (auto-déclaratif via le Discord, ou via opt-in analytics dans l'app)
- Issues GitHub ouvertes / fermées
- Étoiles GitHub
- Followers Insta `@luxepos.app`

**Budget Phase 0** : ~30 € (domaine + éventuels frais postaux pour des cartes de remerciement)

---

### Phase 1 — M3 à M9 : Croissance gratuite organique (août 2026 → février 2027)

**Objectif** : 50 à 100 utilisatrices régulières. **Toujours gratuit**. C'est la phase où on **prouve l'utilité** avant de demander à être payée.

**Stratégie d'ensemble** : "Show, don't sell." On crée du contenu utile pour les artisanes (même celles qui n'installeront jamais LuxePOS) et l'app suit comme conséquence naturelle.

#### Canaux d'acquisition activés en Phase 1

##### a) Instagram organique — **canal #1**
- Fréquence : 2-3 posts/semaine + 5-10 stories/semaine
- Mix de contenu :
  - 40 % **"Coulisses d'artisane"** : photos atelier, perles AliExpress qui arrivent, pièces en cours
  - 30 % **"Conseils business"** : "comment calculer ta marge réelle", "le piège du dépôt-vente sans contrat"
  - 20 % **"Démo discrète LuxePOS"** : screencast 15 sec d'une feature précise (ex: import Excel)
  - 10 % **Story-time / personnel** : "pourquoi j'ai codé ça", erreurs en production, vie d'artisane à Genève
- Hashtags à viser (par puissance descendante) :
  `#bijouxfaitsmain #artisanebijoux #bijouxartisanaux #handmadejewelry #jewelrymaker #atelierbijoux #bijouxacierinoxydable #bijouxpersonnalisés #petitcommerce #micropreneur`
- Compte à étudier (concurrent doux / inspirant) :
  - @latelierdumonde
  - @lepetitmandala
  - @bijoux.maison
  - @marie.j.bijoux
  - Comptes francophones d'artisanes 1k-15k followers (la *vraie* audience cible)
- KPI Insta : passer de 0 à **1 500 followers en 6 mois** (réaliste en organique pur)

##### b) Communautés Facebook bijoutières (gratuit, peu d'effort)
Groupes à rejoindre (lecture seule au début, contribuer après 2 semaines) :
- **"Artisanes Bijoux France"** (~25k membres)
- **"Bijoux Faits Main – Vente et Conseils"** (~40k membres)
- **"Créatrices de Bijoux Suisse Romande"** (~3k membres, très qualifié)
- **"Bijoux et Accessoires Faits Main"** (~60k membres)
Tactique : répondre aux questions tech ("comment vous gérez votre stock ?") avec réponse utile + en signature *"PS : je code une app gratuite pour ça, voir bio"*. Jamais de spam, jamais de lien direct dans le premier message.

##### c) Reddit (anglophone, prépare Phase 2 export DACH/UK)
- `r/Etsy` (2M membres)
- `r/EtsySellers` (140k)
- `r/jewelry` (200k)
- `r/jewelrymaking` (90k)
- `r/Entrepreneur` (3M)
Posts à écrire (1 par mois max) : *"I built a free desktop POS for indie jewelry makers, here's why I stopped paying Shopify"* — storytelling + démo gif, AMA dans les commentaires.

##### d) GitHub — capitaliser sur l'open source
- Soigner le README (gif animé, screenshots, structure claire)
- Ajouter `awesome-pos`, `awesome-tauri`, `awesome-rust` listes communautaires (PR)
- Postuler à `console.dev` (newsletter dev qui couvre les apps open source originales)
- Topics GitHub à ajouter : `pos`, `point-of-sale`, `jewelry`, `tauri`, `offline-first`, `swiss`, `artisan`

##### e) LinkedIn (1 post/semaine)
Public : entrepreneurs / artisans / fans de tech indé
Format : 200-400 mots, storytelling, screenshot de l'app, hook fort en première ligne
Exemples de hooks qui marchent :
- *"En 2024 j'ai démissionné pour vendre des bijoux. En 2025 j'ai dû apprendre à coder. Voici ce que j'ai appris."*
- *"Ma copine Stéphanie m'a ramené sa liste papier de vente du dépôt-vente. 47 lignes. 1h47 pour la rentrer dans Excel. C'est là que j'ai compris."*

##### f) Newsletter "Artisanes & Outils"
- Plateforme : **Buttondown** (gratuit jusqu'à 100 abonnés) ou **Substack** (gratuit, mais le public lifestyle est plus présent)
- Fréquence : **mensuelle** (pas plus, on n'est pas une chaîne de média)
- Contenu : 1 sujet artisanat-business (marge, dépôt-vente, fiscalité simple) + 1 update LuxePOS court
- Objectif M9 : 200 abonnés (qualité > quantité)
- CTA newsletter visible sur le site (pop-up *non-intrusif*, déclenché après 30s de scroll)

#### Contenu à produire (Phase 1, 6 mois)

| Type | Fréquence | Effort/unité | Total 6 mois |
|---|---|---|---|
| Posts Insta carrousel | 2/semaine | 45 min | ~36 h |
| Stories Insta | 5/semaine | 5 min | ~10 h |
| Posts LinkedIn | 1/semaine | 30 min | ~12 h |
| Newsletter mensuelle | 1/mois | 2h | 12 h |
| Réponses communautés FB | 30 min/semaine | — | 12 h |
| Reddit posts | 1/mois | 1h | 6 h |
| Démos en visio | 2/mois | 30 min | 6 h |
| **Total contenu** | | | **~94 h sur 6 mois** = ~4 h/sem |

Reste 6-11 h/semaine pour le dev. Soutenable.

#### Communauté — qui contacter en Phase 1

- **Micro-influenceuses Insta** (500-5k followers, artisanes elles-mêmes) : DM perso avec accès gratuit Pro (anticipé), pas de partenariat formel
- **Blogs francophones business artisan** :
  - `lepoint-mode-business.fr`
  - `etsy-france.fr`
  - `creation-bijoux.eu`
- **Podcasts artisanat** : "Métiers d'Art" (FR), "L'Artisan en Selle"
- **Forums** : forumcreatif.com, bijoutiers.org

**Budget Phase 1** : 0 à 200 € total
- Newsletter Buttondown : gratuit < 100 abonnés
- Domaine : déjà payé
- Pub Insta : zéro (organique uniquement)
- Éventuel : ~50 € pour boost 1-2 posts qui marchent déjà bien organiquement (test, pas reflex)

---

### Phase 2 — M9 à M18 : Lancement monétisation (février → novembre 2027)

**Objectif** : activer Pro + Lifetime early-bird, atteindre **30 abonnés Pro payants + 50 Lifetime vendues**.
Revenue cible M18 : **~270 CHF/mois MRR + ~5 000 CHF cumulés Lifetime** = ≈ 800-1 000 CHF/mois équivalent salaire complément.

#### Plan de lancement de la monétisation

**Pré-lancement (M9-M10)**
- Annoncer **6 semaines à l'avance** sur tous les canaux : *"Le 15 février, LuxePOS devient payant à 9 CHF/mois. Voici pourquoi et comment je vais accompagner la transition."*
- Page **waitlist Lifetime early-bird** : "50 premières places à 99 CHF (au lieu de 199)". Compteur honnête `12/50` en temps réel.
- Email aux ~200 abonnés newsletter : annonce + offre **early-bird exclusive** (-50 % les 7 premiers jours pour eux uniquement)

**Lancement (M10-M11)**
- **Jour J** : poste Insta + LinkedIn + newsletter + post épinglé Discord + commit GitHub "v6.0 — paid tiers activated"
- **Scarcity authentique** : les 50 Lifetime sont vraiment limitées (parce que Maëlle peut techniquement les vendre toutes, mais elle veut un public mixte). Quand c'est sold-out, c'est sold-out. Pas de reset.
- **Communication transparente** : "Voici combien on a vendu cette semaine" toutes les 2 semaines (Twitter/Insta stories) → signal de confiance

**Post-lancement (M11-M18)**
- Surveillance attentive du **churn mensuel** (objectif < 5 %)
- Itération sur les features Pro que les abonnés demandent
- Communication régulière "voilà ce qu'on a ajouté ce mois grâce à votre soutien"

#### Email marketing (séquence onboarding)

Outil suggéré : **Resend.com** + **React Email** (gratuit jusqu'à 3 000 mails/mois) OU **Plunk** (open source, self-hosted possible)

**Séquence post-inscription Pro (7 emails sur 14 jours)** :
1. **J+0** : "Bienvenue. Ta clé est dedans." (clé license + lien download)
2. **J+1** : "Le wizard coûts en 5 minutes" (mini-tuto)
3. **J+3** : "Comment importer ton Excel" (vidéo 90 sec)
4. **J+5** : "Connecte ton OneDrive (chiffré)"
5. **J+7** : "Configure ton dépôt-vente"
6. **J+10** : "Ton pipeline DM Insta"
7. **J+14** : "Comment vas-tu ? (réponse Maëlle en personne)" — c'est un VRAI mail manuel, pas auto

**Séquence reconquête (annulation Pro)** :
- J+0 : "Désolée de te voir partir. Tu peux me dire pourquoi en 1 phrase ?"
- J+30 : "Tu reviens quand tu veux. Ta licence Découverte est prête."

#### Affiliation / parrainage

**Programme parrainage à activer en Phase 2 (mois M12+)** :
- Chaque utilisatrice Pro a un code parrainage unique
- Filleule paie : marraine reçoit **20 % de la première année** (≈ 16 CHF/an mensuel ou 39 CHF Lifetime)
- Forme : crédit sur facture suivante (pas virement Stripe — trop compliqué solo)
- Tracking : simple table dans le backend, code dans l'URL de checkout
- Plafonné à 10 filleules/marraine (anti-abus)
- **Cible** : 5-10 % du recrutement par parrainage en M18

#### Budget Phase 2 : 200 à 1 000 €

| Poste | Coût | Quand |
|---|---|---|
| Resend.com (3000 mails/mois) | 0 € puis ~20 €/mois | M10+ |
| Compte Stripe | 0 € fixe, 1.5 % + 0.30 CHF/transaction | M10 |
| Ads Insta ciblées (test) | 100-300 € total | M12-M15 |
| Sponsoring micro-newsletter artisanat | 50-100 € | M14 |
| Carte cadeau remerciement parraines | 50 € | M16 |
| **Total estimé** | **400-700 €** | |

---

### Phase 3 — M18 et au-delà (décembre 2027+)

**Si la traction est confirmée** (≥ 100 abonnés Pro payants, ≥ 100 Lifetime vendues, churn < 5 %) :

#### a) Embaucher ou pas ?
- **Pas de salariat à temps plein** avant 24 mois minimum
- Première dépense humaine envisagée : **freelance support 8h/semaine** (réponses email Pro + Discord) — ≈ 300-500 CHF/mois
- Si ça décolle vraiment : **dev junior 50 %** en M30 (≈ 3 000 CHF/mois charges incluses)
- **Pas de commercial, jamais.** Si on a besoin d'un commercial, c'est qu'on a perdu le positionnement.

#### b) Expansion produit
- **Multi-utilisateurs** (employée vendeuse, droits limités) — feature la plus demandée probable
- **Scan code-barres natif** (Capacitor camera plugin)
- **API REST locale** pour intégrations tierces (Etsy import, Shopify export)
- **Marketplace addons** (long terme, 30 mois+) : un dev tiers code un connecteur Pennylane et le vend 19 CHF. Maëlle prend 30 %.
- **Module compta complète** : non, c'est un autre métier, on reste exporter vers Bexio/QuickBooks

#### c) Expansion géographique
- M18-M24 : pousser activement DACH (DE/AT/CH-DE) — traduction déjà prête, manque sponsoring 1-2 newsletters allemandes
- M24-M30 : Italie + UK — partenariats avec marketplaces de cours d'artisanat locaux
- **Pas d'USA avant 36 mois** (TVA sales tax = enfer pour une solo)

#### d) M&A ou pas ?
- **Probablement non.** L'identité du projet est "indé". Une acquisition par Lightspeed/Shopify détruirait la confiance bâtie.
- **Exception** : si une fondation type Sovereign Tech Fund ou NGEU propose un grant sans contrepartie capitalistique, on accepte.
- **Stratégie de sortie naturelle** : projet auto-financé qui paie un salaire correct à Maëlle (3-5k CHF/mois net) sans jamais devoir vendre.

---

## 4. Canaux d'acquisition — détail par canal

Notation effort = h/semaine moyennes. ROI = qualitatif basé sur les pratiques de produits similaires (Plausible Analytics, Buttondown, Standard Notes — des indies qui ont scalé sans VC).

| # | Canal | Effort/sem | Coût/mois | ROI attendu | Activation |
|---|---|---|---|---|---|
| 1 | **Instagram organique** | 4 h | 0 € | **Haut** (LE canal pour bijou) | Phase 0 |
| 2 | **Communautés FB bijoutières** | 30 min | 0 € | **Moyen** (qualifié mais lent) | Phase 0 |
| 3 | **GitHub (open source, README, topics)** | 1 h | 0 € | **Moyen** (visibilité dev = crédibilité presse tech) | Phase 0 |
| 4 | **ProductHunt launch** | 8 h (1 fois) | 0 € | **Moyen-bas** (public dev US, peu bijoutières dessus mais boost SEO + crédibilité) | M9 (avec Pro) |
| 5 | **Reddit r/Etsy, r/jewelrymaking** | 30 min | 0 € | **Moyen** (anglophone, prépare DACH/UK) | Phase 1 |
| 6 | **LinkedIn (artisan + tech)** | 30 min | 0 € | **Moyen** (presse + dev community + recruteurs futurs) | Phase 1 |
| 7 | **Newsletter "Artisanes & Outils"** | 2 h | 0 €→20 € | **Haut** (asset propriétaire qui s'apprécie) | M3 |
| 8 | **Partenariats magazines bijoux** | 2 h ponctuel | 50-200 € article | **Moyen-haut** (1 article sérieux = 50+ téléchargements) | Phase 2 |
| 9 | **Salons (Geneva Time, Munich, Métiers d'Art)** | 8h prep + 2 jours stand | 200-800 € visiteur (pas exposant !) | **Bas-moyen** (cher, mais discussions qualitatives) | Phase 2-3 |
| 10 | **Affiliation micro-influenceurs bijou** | 1 h | 0 € (codes gratuits) | **Moyen** (long à activer mais qualité haute) | Phase 2 |

**Total effort marketing soutenable** : **8-10 h/semaine en Phase 1**, descendre à **6 h/semaine en Phase 2** quand le produit prend le relais.

### Détails par canal

#### 1. Instagram organique
- **Pourquoi central** : 90 % du persona y vit déjà, vend déjà, communique déjà.
- **Sous-tactique** : créer un compte secondaire `@luxepos.app` (séparé du perso de Maëlle) — autorise plus de pédagogie sans contaminer son fil artisan.
- **Outils** : Canva (gratuit) ou Figma pour les carrousels, **Buffer** ou **Later** (gratuit) pour planifier.
- **Métriques à surveiller** : taux de save (signal d'utilité), DM entrants, clics bio link.

#### 2. Communautés Facebook bijoutières
- **Effort** : faible, **gratuit**, mais demande de la patience (ne pas spammer)
- **Réponse modèle** : "Salut [prénom], j'utilise pour ça une app que j'ai codée (gratuite, open source, voir bio). Je peux te montrer en visio si tu veux, ça prend 15 min."
- **Attention** : se faire bannir = mort du canal. Lire les règles 3 fois.

#### 3. GitHub
- README en FR+EN avec gif animé, screenshots, badges (build, version, license)
- Topics : `pos`, `tauri`, `jewelry`, `offline-first`, `swiss`, `aes-gcm`
- Soumettre à `console.dev`, `awesome-tauri`, `awesome-pos` (PR)
- Cibler **500 étoiles GitHub à M12, 1 500 à M18** (réaliste pour un projet de niche bien exécuté)

#### 4. ProductHunt launch
- **Une seule fois**, en M9 quand Pro est prêt et qu'il y a déjà 20 utilisatrices fidèles qui peuvent upvoter le matin du launch
- **Hunter** : trouver un hunter PH à 5k+ followers (réseau Tauri ou via Twitter dev)
- **Préparation** : 4 semaines à l'avance (visuels, gifs, démo vidéo, FAQ pré-écrite)
- **Risque** : si on flop ProductHunt, ne pas paniquer — le public PH n'est pas le persona

#### 5. Reddit
- **Storytelling > pitch**. Format : "I built X to solve Y, here's what I learned". Pas "Check out my new app".
- **Modération** : chaque sub a des règles différentes. r/Etsy interdit toute promo. r/SideProject l'autorise les samedis.
- **Bonus** : un post Reddit qui fait du bruit ramène du SEO long-terme (Reddit ranke très bien sur Google).

#### 6. LinkedIn
- **Audience secondaire mais utile** : presse tech FR (`Maddyness`, `Frenchweb`), recruteurs dev (réseau futur), entrepreneurs artisans
- **Format gagnant** : story personnelle + screenshot + leçon. Pas de "tips" listes génériques.
- **Outil de planification** : LinkedIn Scheduler natif (gratuit)

#### 7. Newsletter
- **Asset le plus important à long terme** car indépendant des algos
- **Stratégie** : pas de promo dans 80 % des emails. On donne du conseil utile, on mentionne LuxePOS en pied ou dans 1 email sur 5.
- **Croissance** : popup site (30s scroll) + bouton sur Insta bio + signature email perso de Maëlle

#### 8. Partenariats magazines bijoux
- **Magazines à cibler** :
  - *L'Atelier des Bijoux* (FR) — magazine trimestriel, 15k tirage
  - *Bijoux Magazine* (FR) — mensuel
  - *Pforzheimer Goldschmiedezeitung* (DE) — référence DACH (Phase 3)
  - *Bijouterie Suisse* (CH) — niche mais qualifié
- **Pitch type** : "Article invité gratuit sur 'comment calculer sa marge réelle en artisanat bijou' avec encart LuxePOS discret"
- **Pas de publi-rédactionnel payant** sauf si l'audience est ultra-qualifiée et < 200 €

#### 9. Salons
- **PAS exposant en Phase 1-2** (trop cher, ROI flou)
- **Visiteur réseautage** uniquement : Salon des Métiers d'Art Genève (novembre), Salon Maison & Objet Paris, Munich Inhorgenta
- **Tactique** : DMs LinkedIn pré-salon aux artisanes inscrites, café-rencontres
- **Coût** : 50-200 € par salon (entrée + train)

#### 10. Affiliation micro-influenceuses
- Cible : **artisanes Insta 500-5k followers** (vraies créatrices, pas "influenceuses lifestyle")
- Offre : **clé Lifetime gratuite** + 20 % récurrent sur les inscriptions venues de leur code
- **Pas de paiement upfront jamais.** L'argent vient des conversions réelles.
- M12+ : viser **20 ambassadrices** actives, chacune ramène 2-5 abonnées/an

---

## 5. KPIs et métriques à tracker

### 5.1 North Star Metric

> **Nombre d'utilisatrices ayant fait au moins 1 vente dans LuxePOS la semaine dernière** (Weekly Active Sellers — WAS)

C'est la métrique qui dit *"l'app sert vraiment à son métier, pas juste à être ouverte"*. Tout le reste découle.

### 5.2 Métriques par phase

#### Phase 0 (validation)
| Métrique | Cible M3 | Comment mesurer |
|---|---|---|
| Téléchargements GitHub Releases | 100 cumulés | API GitHub (gratuit) |
| Utilisatrices régulières (≥ 3 sessions distinctes) | 5-10 | Opt-in analytics anonyme intégré à l'app + Discord auto-déclaratif |
| Issues GitHub ouvertes | 10-20 | GitHub natif |
| Étoiles GitHub | 50-100 | GitHub natif |

#### Phase 1 (croissance organique)
| Métrique | Cible M9 | Comment mesurer |
|---|---|---|
| **WAS (north star)** | 50 | Opt-in telemetry anonyme |
| Téléchargements cumulés | 1 000 | GitHub |
| Étoiles GitHub | 500 | GitHub |
| Followers Insta `@luxepos.app` | 1 500 | Insta natif |
| Abonnés newsletter | 200 | Buttondown dashboard |
| NPS (échantillon 30 utilisatrices) | > 40 | Sondage Tally (gratuit) 2x/an |
| CAC organique | 0 € (par def) | — |

#### Phase 2 (monétisation)
| Métrique | Cible M18 | Comment mesurer |
|---|---|---|
| **WAS** | 150 | Telemetry |
| **MRR** | 270 CHF | Stripe Dashboard |
| Lifetime cumulés vendus | 50 | Stripe |
| **Conversion Free → Paid** | 5-10 % | Stripe + telemetry |
| Churn mensuel | < 5 % | Stripe |
| LTV moyenne Pro | 200 CHF (≈ 2 ans) | Calcul Stripe |
| Trial-to-paid (si trial) | — | Pas de trial prévu, juste tier free permanent |

### 5.3 Outils concrets

**Analytics web (site marketing)** :
- **Cloudflare Web Analytics** (gratuit, RGPD, zéro cookie) — choix par défaut
- Alternative : **Plausible.io** (9 €/mois) ou **Plausible self-hosted** (gratuit, ~1h setup)

**Telemetry app (opt-in)** :
- Pas de SaaS tiers (incohérent avec le positionnement "tes données chez toi")
- **Solution simple** : un endpoint Cloudflare Worker (gratuit) qui reçoit `{anonymous_id, version, week_was_active: true}` et stocke dans **D1** (SQLite Cloudflare, gratuit)
- L'opt-in est demandé au premier lancement avec un toggle clair, désactivable

**Tableau de bord interne** :
- **Notion** gratuit (page partagée Maëlle + futurs partenaires)
- Mise à jour manuelle hebdomadaire (15 min) jusqu'à 200 utilisateurs

**NPS et sondages** :
- **Tally.so** (gratuit jusqu'à 200 réponses/mois)
- Sondage envoyé 2x/an aux abonnées newsletter + utilisatrices régulières

**Roadmap publique** :
- **GitHub Projects** (gratuit, déjà utilisé)
- Signal de transparence fort

---

## 6. Plan de pricing détaillé

### 6.1 Calendrier d'activation

| Date | Action |
|---|---|
| M0-M9 | Tout gratuit (phase de validation puis croissance) |
| M9 | **Activation Pro** + ouverture waitlist Lifetime |
| M9-M10 | Early-bird Lifetime à **99 CHF** (50 places authentiquement limitées) |
| M10+ | Lifetime à **199 CHF** prix plein |
| M9+ | Pro à **9 CHF/mois** ou **79 CHF/an** |

### 6.2 Stratégie early-bird Lifetime (50 places, scarcity authentique)

**Pourquoi 50 places ?**
- 50 × 99 = 4 950 CHF d'un coup → 6 mois de tranquillité financière pour Maëlle
- Suffisant pour signaler la valeur, pas trop pour vider la pipeline future
- Limite **authentique** : passé 50, le prix passe à 199 CHF *vraiment*, pas un faux compteur

**Scarcity authentique vs artificielle**
- ✅ Compteur public en temps réel `12/50 places` (réel)
- ✅ Pas de "fake urgency" type "plus que 2 minutes !"
- ✅ Quand c'est sold-out, on ne rouvre pas une 2e vague à 99 (sinon promesse trahie)
- ✅ Communication transparente : "Aujourd'hui on est à 23/50. On en vendra peut-être 50 dans 2 mois, ou jamais. C'est ok."

### 6.3 Coupon codes

| Population | Coupon | Comment |
|---|---|---|
| **Étudiantes art / bijouterie** | -50 % Pro à vie tant que statut | Email avec photo carte étudiante → code manuel |
| **Associations / NGO** | Gratuit | Email avec preuve statut → code manuel |
| **Précarité financière** | -100 % temporaire (6 mois) | Email *"je peux pas payer, voici ma situation"* → code gratuit sans paperasse |
| **Beta-testeuses Phase 0-1** | Lifetime à 49 CHF (offre exclusive M9) | Email manuel aux 30 premières utilisatrices |
| **Parrainage** | Filleule -10 % première année | Code auto-généré dans l'app |

**Principe** : aucune paperasse, juste de la confiance. L'abus marginal coûte moins cher qu'un système anti-fraude lourd.

### 6.4 Promotion saisonnière

**Black Friday — non.**
LuxePOS n'est pas un produit jetable. Faire -50 % en novembre dégrade le positionnement et énerve celles qui ont payé plein tarif.
Maximum acceptable : **-15 % sur l'annuel uniquement pendant 1 semaine**, communiqué comme "ma façon honnête de participer".

**Saint-Valentin (pic des ventes pour bijoutières)** — OUI mais en valeur :
- Pas de promo sur le prix
- Newsletter spéciale "comment gérer le pic de commandes" + features Pro spécifiques (pipeline DM Insta)
- Conversion latente, pas frontale

**Rentrée septembre (artisanes qui se mettent à compte)** — OUI :
- Campagne newsletter + Insta autour de "ton outil pour démarrer"
- Pas de promo, juste de la visibilité

### 6.5 Stratégie d'augmentation de prix

**Règle absolue : jamais d'augmentation rétroactive sur les clients existants.**

Scénarios possibles à long terme (M24+) :
- Si MRR > 5 000 CHF et qu'on peut bosser à temps plein → maintien 9 CHF
- Si on doit embaucher → potentielle hausse à **12 CHF/mois** pour les **nouveaux abonnés uniquement**
- Plafond absolu : **19 CHF/mois** (promis sur la page pricing publique, contrat moral)

Communication d'une hausse :
1. Annonce **3 mois à l'avance**
2. **Grandfathering total** des existants (ils restent à leur prix initial à vie)
3. Justification publique chiffrée (ex: "on a embauché Sarah au support, voici sa fiche de paie")

---

## 7. Setup technique pour monétiser

### 7.1 Stripe Checkout (3 produits)

**Produits à créer dans Stripe Dashboard** :
1. `pro_monthly` — 9 CHF/mois récurrent
2. `pro_yearly` — 79 CHF/an récurrent
3. `lifetime_earlybird` — 99 CHF one-shot (50 quantité max, désactivation auto)
4. `lifetime_full` — 199 CHF one-shot

**Configuration Stripe** :
- **Customer Portal** activé (cancellation, update card, voir factures) — gratuit, intégré
- **Tax settings** : Suisse non-assujettie tant que sous 100k. À activer si on dépasse.
- **Locales** : FR, EN, DE, IT (Stripe gère nativement)
- **Devises** : CHF primaire, EUR secondaire (Stripe convertit auto)
- **Méthodes de paiement** : Card + **TWINT** (Stripe supporte TWINT depuis 2024) + **PostFinance** (CH)

**URL de checkout** : `https://buy.stripe.com/...` (Stripe Payment Link, pas besoin de backend custom)

### 7.2 License key cryptographique

**Approche** : réutiliser l'infra `minisign` déjà en place pour l'auto-updater Tauri.

**Architecture** :
1. Backend léger (Cloudflare Worker, gratuit) reçoit webhook Stripe `checkout.session.completed`
2. Worker génère un payload `{email, plan, expires_at, plan_id}` signé par la clé privée minisign de Maëlle
3. Email envoyé via Resend avec la clé (texte brut, copiable)
4. L'app Tauri vérifie la signature avec la clé publique embarquée dans le binaire
5. Si signature valide ET pas expirée → unlock Pro features

**Avantages** :
- Pas de backend permanent à maintenir
- Fonctionne offline (la clé est vérifiée localement)
- Inviolable sans la clé privée minisign

**Code à écrire** (estimation) :
- Webhook Cloudflare Worker : ~80 lignes JS
- Vérification dans Rust (Tauri) : ~50 lignes
- UI activation dans l'app : ~150 lignes JS
- **Total : ~280 lignes nouvelles**

### 7.3 Email transactionnel

**Choix** : **Resend.com** (3 000 emails/mois gratuit, API simple)
Alternative : **Plunk** (open source, self-hosted)

**Emails à coder** :
- Confirmation achat + clé license (déclenché par webhook Stripe)
- Reset clé license (lien magic-link)
- Pré-expiration annuel (J-14 et J-1)
- Newsletter (séparé : via Buttondown)

### 7.4 Webhook Stripe → email auto avec clé

Pipeline complet :
```
Stripe checkout success
   → Webhook Cloudflare Worker
   → Worker génère clé license signée minisign
   → Worker envoie email via API Resend
   → Worker enregistre dans D1 SQLite : {email, plan, key_hash, created_at}
```

**Sécurité** :
- Webhook Stripe signature vérifiée (anti-replay)
- Clé minisign privée dans Cloudflare Secrets (chiffré)
- Pas de PII stockée au-delà de l'email

### 7.5 Customer Portal Stripe

- Activation : 1 case à cocher dans Stripe Dashboard, 0 code
- Lien dans l'app : `Réglages → Compte → Gérer mon abonnement` → ouvre `https://billing.stripe.com/p/login/...`
- Permet : annulation, changement carte, téléchargement factures, changement plan (mensuel↔annuel)

### 7.6 Estimation effort total

| Tâche | Effort |
|---|---|
| Setup Stripe Dashboard (produits, webhook, portal) | 0.5 jour |
| Cloudflare Worker webhook + D1 | 1 jour |
| Génération clé minisign + email Resend | 0.5 jour |
| Vérification clé license dans Tauri/Rust | 1 jour |
| UI activation dans l'app + paramètres Pro | 1.5 jour |
| Tests end-to-end (Stripe test mode) | 1 jour |
| Documentation utilisateur (FAQ activation) | 0.5 jour |
| **Total** | **~6 jours de dev concentré** (= ~3 semaines à 15h/sem) |

À planifier idéalement **2 mois avant M9** pour avoir de la marge de bug fix.

---

## 8. Risques + mitigations

| # | Risque | Mitigation |
|---|---|---|
| 1 | **Personne ne paie** (Pro lancement floppe) | Tier gratuit reste vivable, donc pas de pression existentielle. Si après 3 mois Pro on a < 5 abonnés, on **pivot prix** (test à 5 CHF/mois) ou on **pivot bundle** (genre offre "Atelier" à 19 CHF/mois pour 2 PCs). Pas de mort subite. |
| 2 | **Code MIT permet à quelqu'un de fork + vendre concurrent** | Vraie probabilité : faible. Vraie barrière : la marque, la confiance, la communauté, le support direct, l'identité "Maëlle l'artisane qui code". Un fork sans âme ne convainc pas. Mitigation supplémentaire : trademark "LuxePOS" déposé à l'OMPI (Suisse) en M9 (~700 CHF). |
| 3 | **Maëlle burn-out solo** | Rythme contraint à 10-15 h/sem max. Pas de dette technique cachée (le projet est small). **Pause de 2 semaines minimum 2x/an non négociable.** Discord communauté → délégation progressive de l'entraide. Phase 3 prévoit freelance support. |
| 4 | **Concurrent (Square, Shopify) copie le modèle dépôt-vente artisan** | Très improbable (trop niche pour eux). Si arrive : la différenciation "open source + offline + native" reste impossible à copier sans tout refondre. On garde 18 mois d'avance minimum. |
| 5 | **Loi suisse change** (TVA, RGPD-équivalent, signature digitale) | Veille trimestrielle 2h. Le seuil TVA à 100k peut bouger à 50k → impact direct. Préparer le toggle "TVA assujettie" dès la v6 (peu de code à ajouter). |
| 6 | **Bug critique pertes de données** | Backup OneDrive chiffré déjà en place. Tests Playwright sur le save/load. Migration de schéma avec backup auto avant écrasement. Politique : tout bug data → patch < 48h, communication publique transparente. |
| 7 | **Maladie / accident de Maëlle (single point of failure humain)** | Dépôt git public + documentation `OPS.md` à écrire en Phase 1 pour qu'**un dev senior tiers puisse reprendre** en 1 semaine. Compte Stripe en mode "pause facturation" possible (configuré en M9). |

---

## 9. Quick wins IMMÉDIATS (cette semaine)

Top 5 actions concrètes, ordre de priorité, à faire **avant lundi prochain** :

### #1 — Acheter le domaine `luxepos.app`
- **Effort** : 15 min
- **Impact** : crédibilité immédiate, SEO démarre, branding cohérent
- **Comment** : Porkbun.com → recherche → checkout → ~15 €/an. DNS pointe sur GitHub Pages.

### #2 — Activer GitHub Sponsors sur `metacovix-byte`
- **Effort** : 20 min (formulaire + bio)
- **Impact** : signal de soutien possible dès aujourd'hui, premiers euros sans attendre Pro
- **Comment** : github.com/sponsors → "Become a sponsored developer" → écrire bio honnête + 3 tiers (5/10/20 €/mois sans avantage spécifique)

### #3 — Créer le compte Insta `@luxepos.app` dédié
- **Effort** : 30 min
- **Impact** : permet de poster sans contaminer le compte perso de Maëlle, prépare Phase 1
- **Comment** : insta → nouveau compte → bio en 4 langues → 3 premières stories (atelier, dashboard, "bienvenue") + premier post épinglé

### #4 — DM personnels à 10 artisanes du réseau
- **Effort** : 90 min (10 DM personnalisés)
- **Impact** : 2-4 utilisatrices Phase 0 dès cette semaine
- **Template** : *"Coucou [prénom], dis-moi, t'utilises quoi pour gérer ton stock / tes ventes ? Je viens de publier en open source l'app que j'ai codée pour ma propre boutique. C'est gratuit, ça gère [détail spécifique à elle, ex: dépôt-vente]. T'as 15 min un soir cette semaine pour que je te montre ?"*

### #5 — Publier le 1er post LinkedIn "lancement open source"
- **Effort** : 45 min
- **Impact** : presse tech FR, recruteurs futurs, communauté dev — fondations long terme
- **Hook proposé** : *"Il y a 2 ans, je vendais des bijoux. Il y a 1 an, j'ai appris à coder avec une IA. Aujourd'hui, mon app est en open source. Voici ce que j'ai appris [thread]."*

**Total effort cette semaine : ~3 h.** Tous gratuits sauf le domaine (15 €).

---

## 10. Métriques de succès / objectifs SMART

### À 6 mois (novembre 2026 — fin Phase 1)
- ✅ **30 utilisatrices régulières** (WAS hebdo)
- ✅ **300 téléchargements GitHub cumulés**
- ✅ **150 abonnées newsletter**
- ✅ **800 followers Insta** `@luxepos.app`
- ✅ **NPS ≥ 40** sur sondage 20 répondants
- ✅ **0 perte de données** rapportée (critique)

### À 12 mois (mai 2027 — milieu Phase 2)
- ✅ **80 utilisatrices régulières WAS**
- ✅ **15 abonnées Pro payantes** (≈ 135 CHF/mois MRR)
- ✅ **25 Lifetime vendues** (dont 25 early-bird)
- ✅ **1 000 téléchargements cumulés**
- ✅ **400 abonnées newsletter**
- ✅ **1 500 followers Insta**
- ✅ **1 article presse** (Maddyness, L'Atelier des Bijoux ou équivalent)

### À 18 mois (novembre 2027 — fin Phase 2)
- ✅ **150 utilisatrices régulières WAS**
- ✅ **30 abonnées Pro payantes** (≈ 270 CHF/mois MRR)
- ✅ **50 Lifetime vendues** (early-bird épuisé)
- ✅ **Revenue cumulé ≈ 10 000 CHF** sur 9 mois de monétisation
- ✅ **Churn mensuel < 5 %**
- ✅ **5 % de croissance MoM des utilisatrices régulières**

### À 24 mois (mai 2028 — début Phase 3)
- Cible **soutenable et honnête** : **MRR 800-1 500 CHF/mois** = complément de revenu correct pour Maëlle, sans burn-out, sans embauche obligatoire
- **Pas** : "10 000 abonnées et lever 1M€"
- **Si** ça dépasse : on réinvestit dans le support, pas dans la croissance forcée

---

## Conclusion — Le contrat moral

Cette stratégie repose sur une intuition simple : **les artisanes méritent un outil fait avec elles, pas pour elles**. Le projet réussit si dans 2 ans, une bijoutière à Toulouse, Lausanne ou Bruxelles ouvre LuxePOS le matin et se dit *"c'est exactement ce qu'il me fallait"* — pas si on a fait la une de TechCrunch.

Les seules promesses non négociables :
1. **Le code reste open source MIT.** Toujours.
2. **Les données restent chez l'utilisatrice.** Toujours.
3. **Pas d'augmentation rétroactive de prix.** Jamais.
4. **Le tier gratuit reste vivable** (pas de "freemium piège"). Toujours.
5. **La transparence sur les revenus, le churn et la roadmap.** Public et chiffré.

Le reste — features, marketing, expansion — peut évoluer. Ces 5 promesses, non.

---

*Document à relire et amender tous les 3 mois. Prochaine relecture : août 2026.*
*Dernière mise à jour : 17 mai 2026.*
