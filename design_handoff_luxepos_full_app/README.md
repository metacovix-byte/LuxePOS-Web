# Handoff — LuxePOS · Application complète

## Overview
LuxePOS est un logiciel de caisse + gestion + relation client pour bijouteries / boutiques de luxe indépendantes (1 à 3 personnes). L'app combine :
- une caisse rapide (POS)
- un catalogue + stock
- une boîte de réception unifiée (Instagram DM, WhatsApp, email)
- un compagnon IA appelé **Lumi** qui aide la commerçante à comprendre ses ventes, répondre aux client·e·s et gérer son stock
- la compta de base (TVA, exports, échéances suisses)

L'app cible 3 contextes :
1. **Desktop** (1280×820) — caisse principale en boutique
2. **iPad** (1024×768) — caisse mobile pour les ventes en mouvement
3. **iPhone** (393×852) — gestion en déplacement (consulter DM, ajouter une pièce avec photo, parler à Lumi)

L'identité visuelle est **« Sable & Encre »** : artisanale, chic, modern. Palette terre/encre, typographie serif éditoriale + sans neutre, beaucoup de blanc, des chiffres en serif italique pour la chaleur.

## About the Design Files
**Les fichiers de ce bundle sont des références de design réalisées en HTML/React** — des prototypes qui montrent l'apparence et le comportement attendus. Ce ne sont **pas** du code de production à copier tel quel.

La tâche est de **recréer ces designs dans l'environnement existant de l'application LuxePoS**, en utilisant ses patterns établis (composants, routing, gestion d'état, librairies UI). Si aucun environnement n'est encore en place, choisir le framework le plus adapté (React/Next.js + Tailwind est un bon défaut puisque le design system fourni est des tokens CSS prêts à porter).

Les `.jsx` du bundle ne sont pas un module React structuré — c'est du Babel-in-the-browser avec des composants attachés à `window`. Lire pour comprendre la structure visuelle et le contenu, puis réimplémenter proprement.

## Fidelity
**High-fidelity** (hi-fi) — les couleurs, typographies, espacements, rayons et ombres sont définitifs. Les écrans doivent être reproduits **au pixel près** (à l'unité d'espacement près) en utilisant les composants et patterns du codebase cible.

## Files in this bundle

| Fichier | Rôle |
|---|---|
| `LuxePOS App.html` | Point d'entrée — assemble tous les écrans dans un design canvas |
| `design-system.css` | **Source de vérité** des tokens (couleurs, typo, espacements, composants). À porter en variables CSS / config Tailwind / styled-components selon le codebase. |
| `chrome.jsx` | Sidebar, topbar, window chrome, page header — composants partagés |
| `home.jsx` | Tableau de bord (dashboard) |
| `screens-1.jsx` | POS, Catalogue, Ajout pièce, Stock, Clientèle, Ventes, Inbox |
| `screens-2.jsx` | Lumi plein écran, Compta, Réglages, Login, Onboarding |
| `screens-3.jsx` | Versions mobile (iPhone) + tablet (iPad) |
| `icons.jsx` | Icônes inline 1.6px stroke. À remplacer par la librairie d'icônes du codebase (Lucide recommandé — l'API est compatible). |
| `design-canvas.jsx` | Composant de présentation uniquement — **à ne pas porter** |

## Design Tokens

### Couleurs
```css
/* Backgrounds */
--bg:        #f6f2ec  /* fond app */
--surface:   #fffefb  /* cartes, sidebar interne */
--surface-2: #faf6f0  /* fond léger, hover */
--surface-3: #f0eadf  /* hover plus marqué */

/* Texte */
--ink:    #1a1714    /* texte principal */
--ink-2:  #4a423a    /* texte secondaire */
--muted:  #8a7f72    /* labels, meta */

/* Lignes */
--line:   #ebe4d8    /* bordures par défaut */
--line-2: #ddd3c3    /* bordures plus marquées */

/* Accent (terre cuite) */
--accent:      #b85c3e
--accent-soft: #f4e2d8
--accent-ink:  #6e2f19  /* hover, dark accent */

/* Sémantique */
--good:      #5d7a4a   --good-soft: #e8efe0
--warn:      #b08a3e   --warn-soft: #f5ebd8
--bad:       #a8503e   --bad-soft:  #f4e0d8
--gold:      #c9a96a
```

### Typographie
- **Serif** — `Instrument Serif` (Google Fonts) — titres, gros chiffres, italique pour les noms (« Maëlle », « Aria »)
- **Sans** — `Inter` (Google Fonts) — UI, body, labels
- **Mono** — `JetBrains Mono` (Google Fonts) — eyebrows, méta, références SKU, badges

Échelle :
| Token | Famille | Taille | Poids | Letter-spacing | Usage |
|---|---|---|---|---|---|
| `.ds-h1` | serif | 44px | 400 | -.01em | Titre de page |
| `.ds-h2` | serif | 32px | 400 | -.01em | Titre section |
| `.ds-h3` | serif | 24px | 400 | -.01em | Sous-section |
| `.ds-num` | serif | variable | 400 | -.02em | Chiffres en évidence |
| `.ds-eyebrow` | mono | 10px | 400 | .14em uppercase | Pré-titre, label catégorie |
| `.ds-meta` | mono | 11px | 400 | normal | Méta, références, dates |
| body | sans | 13px | 400 | normal | Corps |

### Espacements (--s-1 à --s-10)
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 80 px

### Rayons
6 · 9 · 11 · 14 · 18 · 24 px

### Ombres
- `--shadow-1` — `0 1px 2px rgba(26,23,20,.04)` — élévation très légère
- `--shadow-2` — `0 2px 8px rgba(26,23,20,.06)`
- `--shadow-3` — `0 8px 24px rgba(26,23,20,.08)` — modal, popover
- `--shadow-4` — `0 24px 64px rgba(26,23,20,.16)` — fenêtre app
- `--shadow-accent` — `0 8px 24px rgba(184,92,62,.18)` — boutons accent prominents

## Composants partagés

### Boutons
- **Default** (`.ds-btn`) : surface blanche, bordure line, texte ink
- **Primary** (`.ds-btn-primary`) : fond ink, texte surface — pour actions principales neutres
- **Accent** (`.ds-btn-accent`) : fond accent (#b85c3e), texte blanc — pour actions critiques/conversions (ex. Encaisser)
- **Ghost** (`.ds-btn-ghost`) : transparent, hover surface-2
- **Sm / Lg** : variantes tailles (padding 6/10 vs 12/18)

Padding par défaut : 9×14px · radius 9px · transition .15s

### Inputs
Padding 10×12, radius 9, bordure line, focus = bordure accent. Label : `.ds-label` — mono 10px uppercase letter-spacing .12em color muted, marge bottom 6.

### Cards (`.ds-card`)
Surface, bordure line, radius 14px. Avec padding interne via `.ds-card-pad` (22px).

### Pills / Tags
Padding 3×8, radius 5, mono 10px. Variantes :
- default — surface-2 / muted
- `ds-pill-up` — good-soft / good
- `ds-pill-down` — bad-soft / bad
- `ds-pill-warn` — warn-soft / warn
- `ds-pill-accent` — accent-soft / accent-ink

### Sidebar
Largeur 200px, fond surface-2, bordure droite line, padding 18×12. Logo 32×32 + texte boutique en haut. Sections séparées par eyebrows (« principal », « boutique », « admin »). Item actif = surface blanche + bordure line + texte accent.

### Topbar
Hauteur ~70px, fond surface, bordure-bas line, padding 18×28. Avec champ recherche pill (surface-2, radius 11) + actions à droite.

### Tables (`.ds-table`)
- En-têtes : mono 10px uppercase letter-spacing .12em color muted, padding 12×16, bordure-bas line
- Cellules : 14×16 padding, bordure-bas line, color ink-2
- Hover ligne : surface-2
- Colonne `.num` : mono, alignée droite, color ink

### Window chrome
Cadre 1280×820, radius 18, bordure line-2, ombre shadow-4. Titlebar 36px avec mini-logo + boutons macOS-style à droite.

---

## Écrans

### 1. Login
**Layout** : grid 2 colonnes, gauche 1fr (gradient accent-soft → bg) + droite 480px (formulaire surface).

Gauche : logo en haut, gros titre H1 56px italique « L'outil **artisan** de votre boutique. », tagline 16px.
Droite : eyebrow « Connexion » + H2 « Bon retour, Maëlle. », champs email + mot de passe, bouton accent large « Entrer en boutique → ».

### 2. Onboarding (4 étapes)
Stepper full-width en haut (ligne pleine accent + label numéroté mono).
Carte centrale max 720px : eyebrow « Étape X sur 4 », H1 56px avec mot italique accent.
Étape 3 montrée en exemple = présentation à Lumi (personnalité boutique, ton, autonomie publication).
Footer sticky : « ← Retour » + « Continuer → ».

### 3. Tableau de bord (`HomeScreen`)
Hero : eyebrow date + H1 « Bonjour, *Maëlle* » (Maëlle en italique accent).
KPI hero card (CA aujourd'hui = 0 CHF gros chiffre 56px serif + sparkline mini-bars 14 barres à droite).
3 quick actions cards : « Vente éclair » (ink/accent inversé), « Ajouter au stock », « Répondre · 12 DM » avec raccourci clavier mono en haut à droite.
3 KPI mois (objectif, panier, stock).
**Liste « Aujourd'hui · 3 actions »** : checklist cliquable (toggle done = strike + opacity .5). Chaque ligne = grid `28px 1fr auto auto` avec mini-icône colorée + titre + tag pill + bouton.

### 4. Caisse (POS)
Layout grid `1fr 380px`. 
Gauche : breadcrumb + titre + barre recherche large + grille 3 colonnes de cartes produit (thumb hachuré 45° accent transparent, SKU mono, nom 14px med, matière, prix gros serif).
Click produit = ajouter au panier (incrémente qty si déjà présent).
Droite : panneau panier surface, items avec thumb 44×44, footer fixé : sous-total + TVA 7,7% + **total gros chiffre 32px serif** + bouton accent large « Encaisser → ».

### 5. Catalogue
Page header standard avec actions « Filtrer » / « Nouvelle pièce » accent.
Grille 4 cards par ligne, thumb aspect 4/5 en haut, info en bas avec pill statut (« en stock » ou « rupture »).

### 6. Ajouter une pièce (Desktop)
Stepper horizontal 3 étapes (Photo → Détails → Prix & stock).
Layout 2 colonnes : zone drop photo aspect 4/5 dashed à gauche avec carte conseil Lumi (fond accent-soft) ; formulaire à droite (réf auto, nom, catégorie + matière en grid 2col, description). Footer : Annuler / Brouillon / Continuer accent.

### 7. Stock
Page header + 3 cards stat (Rupture rouge / Stock faible orange / En stock vert) avec gros chiffres serif.
Tableau : Réf / Pièce / Catégorie / Stock (num) / Statut pill / Valeur (num) / Actions.

### 8. Clientèle
Tableau avec avatar dégradé accent dans la 1re cellule, statut pill (VIP en accent-soft), date dernière interaction, total dépensé num, badge messages, bouton « Ouvrir → ».

### 9. Ventes (historique)
Tableau N° (mono) / Date / Client / Pièces / Paiement (pill) / Montant (gros num serif 16px) / Reçu.

### 10. Inbox (Boîte de réception)
**Trois colonnes** : 340px liste + 1fr conversation + 280px panneau Lumi.
Liste : items avec avatar + nom + canal (Insta/WhatsApp) + preview tronqué 2 lignes + dot accent si non-lu. Item actif = fond accent-soft.
Conversation : header avec nom client + bouton « Voir fiche client », bulles (gauche surface-2 / droite accent), composer textarea + bouton accent envoyer.
Panneau droite : eyebrow « Lumi suggère », carte avec bordure accent contenant la réponse rapide proposée + bouton « Utiliser », carte « Contexte client ».

### 11. Lumi plein écran
Layout 320px sidebar conversations + 1fr chat (max 760px lecture).
Sidebar : avatar Lumi + statut, liste conversations récentes.
Chat : messages utilisateur (à droite, accent), bot (à gauche, surface-2), **cartes hypothèses** (carte standard avec eyebrow accent + titre + body + actions « Approfondir » / « Plus tard »).
Composer pleine largeur en bas.

### 12. Compta / Rapports
4 KPI cards (CA mois, ventes, TVA, marge brute) avec gros chiffres serif + détail mono.
Bar chart 30 jours (barres line-2, jour actuel = accent).
2 cards côte-à-côte : Top catégories (avec barres de progression accent) + Échéances fiscales (avec dot statut).

### 13. Réglages
Layout 240px sub-sidebar + content. Onglets Boutique/Équipe/Paiements/Notifications/Lumi/Intégrations/Sécurité/Facturation.
Boutique = formulaire grid 2 colonnes (raison sociale, adresse, TVA, IBAN) + card horaires d'ouverture (Lundi-Samedi avec heures début/fin).

### 14. iPad · Caisse
Layout 1fr + 360px. Grille catalogue 3 colonnes plus dense, panneau vente droite avec total + bouton encaisser.

### 15. iPhone · Accueil
Status bar 14:23, header logo + bouton Lumi rond, eyebrow date + H1 36px serif italique accent.
Card CA gros chiffre, 2 quick actions (« Vente éclair » noir + « Ajouter une pièce »), checklist 3 actions.
Tabbar bas : Accueil / Caisse / Boîte / Lumi / Plus (mono labels 9px).

### 16. iPhone · Ajouter pièce avec photo
Top : retour / 2/3 / Sauver. 
Zone photo aspect 4/5 dashed avec bouton « 📷 Prendre la photo » accent rond + **overlay Lumi blur** en bas (« Lumi détecte bague or rose avec 1 saphir... »).
Formulaire avec champs grands (padding 14, font 16) — le prix utilise le serif 24px.
CTA sticky bas « Continuer → ».

### 17. iPhone · Lumi
Header avatar L + nom + statut + close.
Stream chat avec bulles + carte de suggestion (« 3 demandes de prix » avec bouton « Préparer les réponses »).
Composer bottom sticky.

---

## Interactions & comportement

- **Sidebar** : click change la screen active (single-page). Item actif change de surface + bordure + couleur texte (accent).
- **POS** : click sur carte produit ajoute au panier. Si déjà présent, incrémente qty. Total = sum(price × qty). TVA suisse 7,7%.
- **Tableau de bord** : checklist toggle done par click sur la ligne entière (text-decoration: line-through + opacity .5).
- **Cards produit catalogue** : hover translateY(-2px) + bordure accent, transition .15s.
- **Inbox** : click item de la liste change la conversation active (état `active`).
- **Onboarding** : Continuer incrémente step (max 3), Retour décrémente.
- **Ajout pièce** : stepper visuel — étape courante en accent, suivantes en muted.
- **Animations** : fade-in 250ms cubic-bezier(.2,.7,.3,1) pour entrée d'éléments. Boutons transition .15s sur background + border-color.

## State management
État local par écran. Pour la prod, prévoir :
- Store global pour : `cart` (POS), `notifications` (badge sidebar Inbox), `user` (Maëlle), `settings boutique`
- Fetch : produits, clients, ventes, DM threads, suggestions Lumi
- Real-time : DM entrants (WebSocket recommandé)

## Assets
- **Fonts** : Instrument Serif, Inter, JetBrains Mono — toutes Google Fonts, déjà importées.
- **Icônes** : 23 icônes inline SVG `currentColor` 1.6px stroke (cf. `icons.jsx`). Utilisez **Lucide React** dans le codebase — l'API et le style sont compatibles à 95% (mêmes noms : Home, ShoppingBag, Inbox, Users, MessageCircle, Calculator, Sun, MoreHorizontal, Search, BarChart, Zap, Plus, Box, Send, ArrowRight, X, Minus, Square, AlertTriangle, Archive, Sparkles, Settings).
- **Photos produit** : pour l'instant placeholder hachuré accent transparent. À remplacer par les vraies images du catalogue boutique.
- **Logo** : pastille accent #b85c3e, lettre "L" en Instrument Serif italic blanc. À redessiner si la marque finale change.

## Localisation
**Français suisse**. Devise CHF avec format `1'234` (apostrophe), TVA 7,7%, dates au format `27 avril` ou `27 avr.`. Numéros de téléphone `+41 79 …`. IBAN suisse format `CH93 0076 …`.

## Dépendances suggérées (si stack neuf)
- React 18 + Vite (ou Next.js si SSR/SEO)
- Tailwind CSS (porter `design-system.css` en `theme.extend`)
- Lucide React (icônes)
- Inter, Instrument Serif, JetBrains Mono via `@fontsource` ou `<link>` Google Fonts
- TanStack Query (fetch/cache)
- Zustand ou Redux Toolkit (état global)
- React Router ou Next App Router

## Comment lire les sources
1. Ouvrir `LuxePOS App.html` dans un navigateur (servir via http-server local) pour voir tous les écrans côte-à-côte sur le canvas.
2. Cliquer/zoomer sur un artboard pour l'isoler.
3. Lire le code JSX correspondant pour le contenu exact, les classes utilisées, l'état local.
4. Lire `design-system.css` pour comprendre tous les tokens et les classes utilitaires (`.ds-*`).
