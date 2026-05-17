# Press Kit — LuxePOS

> Dossier de presse à destination des journalistes, blogueurs et podcasteurs qui couvrent l'artisanat, l'open source, la tech romande ou les outils indépendants.

**Contact presse** : Maëlle — [metacovix@gmail.com](mailto:metacovix@gmail.com)
**Repo public** : [github.com/metacovix-byte/LuxePOS-Web](https://github.com/metacovix-byte/LuxePOS-Web)
**Site** : [luxepos.app](https://luxepos.app) *(domaine en cours)*

---

## 1. Boilerplate

### 🇫🇷 Court (50 mots)

LuxePOS est une application native de caisse pensée pour les artisans bijoutiers. Conçue à Genève par une artisane qui code avec une IA, elle gère vente, stock, dépôt-vente et DMs Instagram, hors-ligne et sans abonnement obligatoire. Le code est ouvert sous licence MIT.

### 🇫🇷 Long (150 mots)

LuxePOS est une application de caisse et de gestion conçue pour les artisans qui fabriquent des pièces uniques — bijoutiers, créateurs en série limitée, dépositaires. Née à Genève en 2026 d'une bijoutière qui voulait sortir d'Excel, elle a été co-développée avec une IA (Claude). Elle tourne en natif sur Windows aujourd'hui, macOS et Android bientôt, sans cloud opaque : les données vivent sur le PC de l'artisane et dans son propre OneDrive, chiffrées AES-GCM 256. LuxePOS gère le multi-POS (atelier + dépôts-ventes avec commissions automatiques), les ventes Instagram et WhatsApp, l'import Excel intelligent et un assistant local nommé Lumi. Le code source est ouvert sous licence MIT. Le projet est gratuit aujourd'hui, autour de 9 CHF/mois en 2027, avec une option à vie. Une seule utilisatrice en production. Une mission : que les outils servent les artisans, pas l'inverse.

### 🇬🇧 Short (50 words)

LuxePOS is a native point-of-sale app built for jewelry artisans. Designed in Geneva by a craftswoman coding with an AI, it handles sales, inventory, consignment and Instagram DMs — offline, no mandatory subscription. Source code is open under MIT licence. Built with Tauri, Rust and vanilla JavaScript.

### 🇬🇧 Long (150 words)

LuxePOS is a point-of-sale and management app designed for artisans who make unique pieces — jewelers, small-batch creators, consignment sellers. Born in Geneva in 2026 from a jeweler who wanted to leave Excel behind, it was co-built with an AI (Claude). It runs natively on Windows today, macOS and Android soon, with no opaque cloud : data lives on the artisan's PC and in their own OneDrive, encrypted with AES-GCM 256. LuxePOS handles multi-POS (workshop + consignment shops with automatic commissions), Instagram and WhatsApp orders, smart Excel import and a local assistant called Lumi. Source code is open under MIT licence. The project is free today, around 9 CHF/month in 2027, with a lifetime option. One real user in production. One mission : tools should serve artisans, not the other way around.

---

## 2. Identité visuelle

### Palette de couleurs

| Rôle | Hex | Usage |
|---|---|---|
| **Brand principal** | `#10b981` → `#059669` | gradient émeraude, CTA, accents |
| **Accent chaud** | `#d4a574` | doré-sable, highlights, badges premium |
| **Fond clair** | `#fafaf7` | papier crème, background des sections |
| **Fond sombre** | `#0f172a` | dark mode, footer |
| **Texte principal clair** | `#0f172a` | corps de texte en clair |
| **Texte principal sombre** | `#f8fafc` | corps de texte en sombre |
| **Gris neutre** | `#94a3b8` | textes secondaires, dividers |

### Typographie

- **Display (titres)** : **Playfair Display** — serif éditoriale, signal "atelier"
- **Body** : **Inter Variable** — sans-serif, lisible, moderne, tabular numbers
- **Mono** : **JetBrains Mono** — terminaux, sections techniques

### Logo

Un losange émeraude minimaliste (le mark `.brand-mark` du site) accompagné du wordmark "LuxePOS" en Inter Bold. Le losange évoque la facette d'une pierre taillée, sans tomber dans le cliché "diamant 4 carats". À utiliser sur fond clair ou sombre, sans halo ni shadow.

> *Logo et déclinaisons SVG/PNG : à fournir — pack en cours de finalisation.*

---

## 3. Faits-clés pour journalistes

| Indicateur | Valeur |
|---|---|
| **Année de création** | 2026 |
| **Lieu** | Genève, Suisse |
| **Équipe** | 1 humaine (Maëlle) + 1 IA (Claude) |
| **Licence** | MIT (open source) |
| **Plateformes** | Windows ✅ · macOS 🚧 · Android 🚧 · iOS ⏳ |
| **Stack** | Tauri 2 · Rust 1.93 · WebView2 · Vanilla JS ES6+ |
| **Taille de l'app** | 3.4 Mo (.exe Windows) |
| **Démarrage** | < 1 seconde |
| **RAM utilisée** | ~26 Mo en idle |
| **Lignes de code** | ~28'000 (single-file HTML) |
| **Tests automatisés** | 31/34 Playwright passent |
| **Chiffrement** | AES-GCM 256 sur les backups |
| **Hors-ligne** | Total — zéro CDN au runtime |
| **Tracking** | Aucun |
| **Utilisatrices en production** | 1 (la créatrice) |
| **Pièces uniques gérées** | 400+ en catalogue réel |
| **Ventes mensuelles** | ~131 sur l'instance de production |
| **Modèle économique** | Gratuit aujourd'hui · 9 CHF/mois en 2027 · 199 CHF à vie |
| **Domiciliation données** | PC local + OneDrive personnel de l'utilisateur |
| **Version actuelle** | v5.14.15 (bêta publique) |

---

## 4. Citations attribuables à Maëlle

Trois citations pré-rédigées, utilisables dans un article sans validation supplémentaire. Adapte si besoin, mais l'esprit est là.

### Citation 1 — sur le pivot d'Excel à une vraie app

> « Je gérais 500 pièces uniques avec un Excel de 11 onglets. Le jour où j'ai cassé une formule, j'ai compris qu'il me fallait un outil pensé pour mon métier — pas un truc générique avec 200 fonctions dont 195 sont pour des restaurants. J'ai codé LuxePOS avec une IA, c'est devenu mon vrai outil. Et maintenant, je le partage. »

### Citation 2 — sur le choix de l'open source et du local

> « Mes données vivent chez moi. Pas dans le cloud de quelqu'un d'autre. Mes ventes, mes clientes, mes coûts — c'est mon métier, pas le carburant d'une startup. L'app est open source MIT, comme ça si je disparais demain, l'outil ne disparaît pas avec moi. »

### Citation 3 — sur l'IA et l'artisanat

> « Coder avec une IA, c'est pas de la triche. C'est comme avoir un apprenti très rapide qui ne dort jamais. Moi je sais ce qu'il me faut pour mon atelier, l'IA sait comment l'implémenter. On fait équipe. Le résultat, c'est qu'une artisane seule peut avoir un outil au niveau d'un éditeur logiciel avec dix développeurs. C'est ça qui change. »

---

## 5. Captures d'écran et assets

> *Tous les visuels haute résolution sont à fournir sur demande à [metacovix@gmail.com](mailto:metacovix@gmail.com). Ci-dessous, le sommaire de ce qui sera disponible :*

- **Dashboard principal** (1920×1080, light + dark theme) — *à fournir*
- **Vue Caisse en action** (panier rempli, client sélectionné) — *à fournir*
- **Inventaire avec 500 pièces** — *à fournir*
- **Lumi en conversation** (3 screenshots des 3 personnalités) — *à fournir*
- **Pipeline Instagram → expédition** — *à fournir*
- **Logo SVG + PNG transparent** (carré + horizontal) — *à fournir*
- **Photo de Maëlle à l'atelier** (avec PC + bijoux acier) — *à fournir*
- **GIF démo 8 sec** : import Excel → vente en 3 clics — *à fournir*

**Licence d'utilisation** : libre pour usage éditorial (presse, blog, vidéo, podcast). Crédit souhaité : *« LuxePOS / Maëlle Genève »*.

---

## 6. Angles d'article suggérés

Si tu cherches un angle pour ton sujet :

- **Tech romande indé** — Une artisane suisse code son outil avec une IA, le rend open source
- **Anti-SaaS** — Un projet qui dit "tes données restent chez toi" à l'ère du tout-cloud
- **IA et artisanat** — Coder à 2026 quand on n'est pas développeur
- **Économie circulaire numérique** — Un outil métier pour 199 CHF à vie vs 49 CHF/mois SaaS
- **Modèle Tauri** — Pourquoi pas Electron, pourquoi Rust + WebView2 pour 3 Mo au lieu de 200

---

*Press kit version 1.0 — mis à jour le 17 mai 2026.*
