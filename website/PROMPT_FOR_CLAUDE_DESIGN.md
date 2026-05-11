# Brief design — Site vitrine LuxePOS

> Document à transmettre à Claude Design (skill `design:*`) pour produire la maquette d'un site marketing single-page pour LuxePOS.

---

## 1. Contexte projet

**LuxePOS** est une application native Windows (bientôt macOS + Android) pour la gestion de boutique artisanale de bijoux. Conçue à l'origine pour une artisane unique à Genève (~500 produits, ~100 ventes/mois), elle vise maintenant à toucher d'autres artisans francophones (Suisse, France, Belgique, Québec).

**Le repo GitHub est public** : https://github.com/metacovix-byte/LuxePOS-Web

**L'app actuelle (v5.14.15)** fait déjà :
- Caisse + inventaire + clients + commandes Instagram/WhatsApp + analytics
- Backups chiffrés AES-GCM 256 automatiques vers OneDrive
- Assistant IA local **Lumi** (21 intentions, 3 personnalités, voice STT+TTS)
- Multi-POS : Atelier + 2 points dépôt-vente avec commissions automatiques
- Wizard coûts proactif avec suggestions pré-remplies par catégorie
- Auto-updater GitHub Releases signé cryptographiquement
- Mode offline-first total (zéro CDN au runtime, tout inliné)
- 5 thèmes visuels (emerald, rosegold, champagne, onyx, royal)

**Objectif du site** : convertir des artisans qui cherchent une caisse adaptée à leur métier (pas Square, pas Shopify, pas un truc générique).

---

## 2. Persona cible

### Marie, artisane bijoutière, 28-45 ans
- Vend en boutique + Instagram/WhatsApp + dépôt-vente
- ~50 à 500 produits, ~30 à 200 ventes/mois
- Pas geek, mais débrouillarde sur Excel
- Veut un outil qui **respecte son métier** (pièces uniques, commission dépôt-vente, suivi DM)
- Refus catégorique : abonnement mensuel, dépendance internet permanente, "cloud opaque"
- Recherche émotionnelle : se sentir **professionnelle sans devoir devenir comptable**

### Anti-persona
- Boutique de luxe avec 5 vendeuses
- E-commerce pur (Shopify suffit)
- Restauration / coiffure (besoin différent)

---

## 3. Voix de marque

- **Tu**, jamais "vous" (artisan-à-artisan, pas corporate)
- **Concret** : montrer les écrans, pas vendre des "synergies"
- **Honnête** : "Encore en bêta, gratuit pour l'instant" plutôt que "Solution leader"
- **Suisse-confiant** : précis, pas démonstratif. Ni français-pompeux, ni américain-superlatif
- **Chaleur du métier** : on parle bijoux, pas "SKU"

**Mots à utiliser** : artisan, pièce unique, atelier, dépôt-vente, commission, marge réelle, sauvegarde, hors-ligne.
**Mots à éviter** : SaaS, scalabilité, écosystème, disrupter, transformer, ROI, ecosystem, leverage.

---

## 4. Identité visuelle

### Couleurs (alignées avec l'app)
- **Brand principal** : émeraude `#10b981` → `#059669` (gradient)
- **Accent chaud** : doré-sable `#d4a574`
- **Fonds clair** : `#fafaf7` (papier crème)
- **Fonds sombre** (mode dark) : `#0f172a`
- **Texte principal** : `#0f172a` (clair) / `#f8fafc` (sombre)

### Typographie
- **Display** (titres) : **Playfair Display** (serif éditoriale, signal "atelier")
- **Body** : **Inter Variable** (sans-serif, lisible, moderne)
- Tabular numbers (font-variant-numeric) pour les chiffres financiers

### Style
- **Glassmorphism subtil** sur les cards (backdrop-blur)
- **Mesh gradient animé** très discret en arrière-plan du hero (respecter `prefers-reduced-motion`)
- **Photos macro de bijoux** acier inoxydable et perles (Unsplash : keywords "handmade jewelry", "atelier")
- **Pas de stock photo de bureau Apple** ni de "femme souriant à son laptop"

### Inspirations à étudier
- **Linear.app** (header magnétique, sections claires, mais on garde plus de chaleur)
- **Stripe.com** (rigueur typographique, hiérarchie)
- **Cron.com** (avant Notion Calendar — confiance et clarté technique)
- **Pas Apple.com** : trop froid pour un artisan

---

## 5. Structure du site (single-page)

### Hero (above the fold)
- Headline : "**La caisse de mon atelier de bijoux.**" (en Playfair)
- Sub-headline : "Une seule app native Windows pour vendre, suivre tes 500 pièces uniques, et faire ta compta — sans abonnement, sans cloud opaque, sans bullshit."
- 2 CTA :
  - **Primaire** : "Télécharger pour Windows" (.exe, 3.4 Mo)
  - **Secondaire** : "Voir le code sur GitHub" (signal de confiance technique)
- Visuel : screenshot du dashboard de l'app (avec "Bon après-midi ✨", hero card 3 boutons)

### Section "Pour qui ?"
3 cartes côte à côte :
1. **Artisans bijou** acier / perles / vintage
2. **Boutiques avec dépôt-vente** (commissions, multi-POS)
3. **Vendeur Instagram / WhatsApp** (suivi DM → expédition)

### Section "Ce qui change" (différenciation)
4-6 cartes mettant en avant les vraies différences :
- **Pièces uniques natives** : pas d'alertes stock fantômes, distinction "à racheter" vs "vendue"
- **Commissions dépôt-vente** : Annemasse 30%, Salon 25%, c'est automatique
- **Backup OneDrive chiffré** : tes données, chez toi + OneDrive (AES-GCM 256), pas un serveur tiers
- **Lumi, assistant IA local** : pas une connexion ChatGPT, l'IA tourne sur ton PC
- **Wizard coûts intelligent** : pré-remplit selon ta catégorie ("collier ≈ 10 CHF"), tu valides en 5 min
- **Instagram/WhatsApp natif** : pipeline devis→paiement→expédition→livré sans copier-coller

### Section "Comment ça marche" (3 étapes)
1. **Importe ton Excel** : drag-drop, mapping intelligent (gère les colonnes "Vendu", "Couleur", "Prix payé")
2. **Saisis tes coûts en 5 min** : wizard avec suggestions par catégorie
3. **Vends, suis, comprends** : dashboard avec "première vente attendue", panier moyen 7j, valeur stock

### Section "Sous le capot" (transparence technique)
Liste compacte, ton fair-play :
- **Code source ouvert** sur GitHub (lien)
- **Stack** : Tauri 2 + Rust 1.93 + WebView2 + Vanilla JS
- **Pas de tracking, pas d'analytics tiers**
- **Hors-ligne total** : Tailwind + Lucide inlinés, zéro CDN au runtime
- **Signature cryptographique** des mises à jour (minisign)
- **31/34 tests Playwright** passent

### Section "Prix"
- **Gratuit pendant la bêta** (jusqu'à v6.0)
- Honnête : "Le futur tarif sera autour de 9 CHF/mois (≈10 €) si tu veux soutenir le projet, mais l'app restera utilisable gratuitement."
- Pas de bullet "Pro / Enterprise / Custom" — c'est une app pour artisan, pas un SaaS B2B

### Section "Roadmap publique"
- ✅ Windows natif (v5.14.x)
- 🚧 macOS universel (CI prête, manque tests utilisateurs Mac)
- 🚧 Android (Capacitor scaffold, build pending)
- ⏳ iOS (besoin Mac dev + 99$/an Apple)
- ⏳ Multi-utilisateurs (employée vendeuse)
- ⏳ Code de barres scan natif

### FAQ
8-10 questions concrètes (pas du marketing) :
- "Est-ce que mes données sont à toi ?"
- "Qu'est-ce qui se passe si je perds mon PC ?"
- "Pourquoi pas un abonnement comme Square ?"
- "Et la TVA suisse / française ?"
- "Je vends sur 3 lieux différents, ça gère ?"
- "C'est compatible Mac ?"
- "Et l'iPad / mobile ?"
- "Tu fais comment l'assistant IA Lumi ?"
- "Pourquoi gratuit ?"

### Footer
- Petit signal humain : "Fait à Genève par une artisane et son IA, avec amour et beaucoup de café ☕"
- Liens : GitHub, Email contact, CHANGELOG
- Mentions légales : made in CH, RGPD-friendly (zéro tracking)

---

## 6. Contraintes techniques

### Performance
- **Score Lighthouse ≥ 95** sur toutes les métriques
- **Pas de framework lourd** : HTML/CSS/JS vanilla ou Astro statique
- **Images** : WebP avec fallback JPEG, `loading="lazy"` partout sauf hero
- **Fonts** : woff2 self-hosted (pas Google Fonts CDN)
- **CSS** : Tailwind avec purge, ou variables CSS pures

### Accessibilité
- **WCAG 2.1 AA** minimum
- **Contraste ≥ 4.5:1** sur tous les textes
- **Navigation clavier** complète (Tab, Enter, Esc)
- **Skip-link** "Aller au contenu principal"
- **Reduced motion** respecté (animations off si user le veut)
- **alt** descriptif sur toutes les images

### SEO
- **`<title>`** : "LuxePOS — Caisse pour artisan bijou · Windows, Mac, Android"
- **Meta description** sous 155 chars
- **Open Graph** + Twitter Card avec preview du dashboard
- **JSON-LD** Schema.org/SoftwareApplication
- **`hreflang`** prêt pour FR/EN même si EN pas encore traduit
- **Sitemap.xml** + robots.txt

### Hébergement
- Statique sur **GitHub Pages** ou **Cloudflare Pages** (gratuit, rapide)
- Domaine custom à acheter : `luxepos.app` ou `luxepos.ch` (à valider)
- HTTPS obligatoire

---

## 7. Livrables attendus de Claude Design

1. **Maquette Figma** ou équivalent (mockup haute-fidélité de la home complète, desktop + mobile)
2. **Design tokens** : couleurs, espacements, typographies (en JSON ou CSS variables)
3. **Composants réutilisables** : hero, feature card, FAQ accordion, footer
4. **Specs handoff** : prêt à coder (dimensions, états hover/focus, animations)
5. **Suggestions de copy** : titres et sous-titres mieux que ce brief si tu trouves
6. **Photos suggérées** : 6-8 URLs Unsplash spécifiques (pas générique)
7. **Audit accessibilité** sur la maquette finale

---

## 8. Hors-périmètre (à NE PAS faire)

- ❌ Blog (pas de contenu à publier régulièrement)
- ❌ Témoignages clients fake (la seule cliente actuelle, c'est Maëlle ; on peut citer son retour réel)
- ❌ Calculateur de ROI (c'est de la com pour gros SaaS, pas pour artisans)
- ❌ Pop-up "newsletter" agressif
- ❌ Chatbot commercial (Lumi est dans l'app, pas un appât marketing)
- ❌ Section "Partenaires" ou "Logos clients prestigieux"

---

## 9. Inspiration de copy (à itérer)

### Headlines candidats
- "La caisse de mon atelier de bijoux." (favori)
- "Vendre. Suivre. Comprendre. Sans cloud opaque."
- "L'app de gestion qui pense comme une artisane."
- "Caisse, stock, Instagram, dépôt-vente : tout dans une app native."

### Phrases-signal de différenciation
- "Tes données vivent chez toi. Pas dans un cloud étranger."
- "Pas un abonnement de plus, pas un truc à apprendre, pas un serveur qui plante."
- "Pour les artisans qui en ont marre des outils faits pour les autres."
- "Tu fabriques. L'app gère le reste."

---

## 10. Notes finales

Le ton général doit donner envie à une artisane qui n'aime pas la tech de tester l'app **dans la minute**. Le site doit déjouer les réticences classiques (cloud, abonnement, complexité) et créer une confiance technique sans devenir aride.

Le succès se mesure à : **est-ce qu'une bijoutière en visitant 30 secondes le site décide de cliquer "Télécharger" ?**

Si tu veux pousser l'audace : la section "Sous le capot" peut être faite en style **terminal** (fond noir, font monospace, ASCII art). Ce serait un signal puissant : "ce projet a une âme technique" sans devenir hostile au non-tech.
