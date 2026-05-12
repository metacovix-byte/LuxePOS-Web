// ═══════════════════════════════════════════════════════════════════════
// LuxePOS — i18n (4 langues : Français · English · Deutsch · Italiano)
// Suisse 🇨🇭 friendly. Persistance localStorage + auto-detect navigateur.
// ═══════════════════════════════════════════════════════════════════════

window.LUXEPOS_I18N = {

    // ─── FRANÇAIS (langue source) ─────────────────────────────────────────
    fr: {
        meta: {
            title: "LuxePOS — Caisse pour artisan bijou · Windows, Mac, Android",
            description: "Caisse, stock, Instagram et dépôt-vente : l'app native pensée pour les artisans bijou. Hors-ligne, chiffrée, sans abonnement.",
            ogTitle: "LuxePOS — La caisse de mon atelier de bijoux",
            ogDescription: "Vendre, suivre 500 pièces uniques, gérer dépôt-vente et DMs Instagram. Sans cloud opaque, sans abonnement."
        },
        nav: {
            features: "Fonctions",
            how: "Comment ça marche",
            stack: "Sous le capot",
            faq: "FAQ",
            github: "Voir le code sur GitHub"
        },
        hero: {
            kicker: "Pour artisan bijou · Windows · Mac · Android",
            h1Pre: "La caisse de mon ",
            h1Em: "atelier de bijoux",
            h1Post: ".",
            lede: 'Une seule app native pour vendre, suivre tes 500 pièces uniques, gérer tes DMs Instagram et tes points dépôt-vente. <strong>Hors-ligne. Chiffrée. Sans abonnement.</strong>',
            ctaDownload: "Télécharger pour Windows",
            ctaDownloadSub: "3.4 Mo · v5.14.15",
            ctaSource: "Code source",
            pill1: "✓ Gratuit pendant la bêta",
            pill2: "✓ Open source",
            pill3: "✓ Pas de tracking",
            savedFooter: "💾 Sauvegardé il y a 3 min",
            mockBannerKicker: "Rentabilité aveugle",
            mockBannerTitle: "294 pièces sans coût",
            mockBannerCta: "🧮 Saisir les coûts (5 min)",
            mockCard1: "Vente éclair",
            mockCard1Sub: "3 taps",
            mockCard2: "Ajouter stock",
            mockCard2Sub: "Nouvelle pièce",
            mockCard3: "DM Insta",
            mockCard3Sub: "WhatsApp",
            mockStat1Label: "Ce mois",
            mockStat1Value: "191 CHF",
            mockStat2Label: "Panier 7j",
            mockStat2Value: "31 CHF",
            mockStat3Label: "Stock",
            mockStat3Value: "À calculer",
            mockGreeting: "Bon après-midi",
            mockDate: "7 mai 2026"
        },
        forWhom: {
            title: "Pour qui c'est fait",
            lede: "Si tu te reconnais dans une de ces trois, l'app est pour toi.",
            card1Title: "Artisan bijou",
            card1Body: "Tu fais des pièces uniques en acier 316L, perles, vintage. Tes ventes sont à la pièce, pas au stock reproductible.",
            card2Title: "Dépôt-vente multi-points",
            card2Body: "Tu déposes chez 2-3 partenaires. Tu veux savoir qui a quoi, combien on te doit, à qui revient la commission.",
            card3Title: "Vendeur Instagram / WhatsApp",
            card3Body: "L'essentiel de tes ventes passe par DM. Tu veux suivre devis → paiement → expédition sans copier-coller."
        },
        features: {
            title: "Ce qui change vraiment",
            lede: "Les outils génériques ne pensent pas comme un artisan. Voilà les 6 trucs qu'on a faits différemment.",
            f1Title: "Pièces uniques natives",
            f1Body: 'L\'app sait qu\'une pièce vendue n\'est pas "en rupture" — c\'est juste vendue. Plus d\'alertes fantômes sur 290 produits.',
            f2Title: "Commissions dépôt-vente",
            f2Body: "Annemasse 30%, Salon 25%, Atelier 0%. C'est calculé automatiquement à chaque vente.",
            f3Title: "Backup OneDrive chiffré",
            f3Body: "AES-GCM 256, clé locale dans AppData. Si OneDrive est piraté, tes données restent illisibles.",
            f4Title: "Lumi, ton assistant local",
            f4Body: "21 commandes vocales et écrites, 3 personnalités au choix. Tourne sur ton PC. Pas une API distante.",
            f5Title: "Wizard coûts intelligent",
            f5Body: "Suggestions par catégorie (collier ≈ 10 CHF, bague ≈ 4). Tri par impact financier. 5 min pour 500 pièces.",
            f6Title: "Pipeline DM intégré",
            f6Body: "Reçu → Devis → Payé → Expédié → Livré. Preuve de paiement TWINT/Revolut + n° suivi Swiss Post."
        },
        how: {
            title: "Comment ça marche",
            lede: "3 étapes pour passer d'Excel à une vraie caisse.",
            s1Title: "Importe ton Excel",
            s1Body: 'Drag-drop ton fichier. Le parseur reconnaît tes colonnes "Vendu le", "À qui", "Couleur", même si elles sont en désordre. Aucune perte.',
            s2Title: "Saisis tes coûts en 5 min",
            s2Body: "Le wizard pré-remplit selon ta catégorie. Tu valides ou tu ajustes. Le tri commence par celle qui a le plus d'impact financier.",
            s3Title: "Vends, suis, comprends",
            s3Body: 'Dashboard avec CA jour, panier moyen 7j, valeur stock. Au lieu de "↓100% vs hier" décourageant : "🌅 Première vente attendue".'
        },
        stack: {
            title: "Sous le capot",
            lede: "Transparence radicale. Tout est vérifiable.",
            cmtStack: "# Stack",
            cmtPrivacy: "# Confidentialité",
            cmtData: "# Données",
            cmtDistribution: "# Distribution",
            cmtPerf: "# Performance",
            valNone: "aucun"
        },
        pricing: {
            title: "Combien ça coûte",
            badge: "Bêta publique",
            amount: "Gratuit",
            sub: "jusqu'à la v6.0 (mi-2027 environ)",
            f1: "✓ Toutes les fonctions débloquées",
            f2: "✓ Mises à jour automatiques signées",
            f3: "✓ Backup OneDrive chiffré",
            f4: "✓ Pas de limite de produits / clients / ventes",
            f5: "✓ Pas de carte bancaire demandée",
            note: 'Le futur tarif sera autour de <strong>9 CHF/mois</strong> si tu veux soutenir le projet, mais une version gratuite restera disponible. Pas de bait-and-switch.'
        },
        roadmap: {
            title: "Feuille de route publique",
            lede: "Pas de promesses, juste des étapes vraies.",
            r1: "<strong>Windows natif</strong> · v5.14.15 livré",
            r2: "<strong>macOS universel</strong> · CI verte, manque tests Mac réel",
            r3: "<strong>Android</strong> · Capacitor scaffold, build pending Android Studio",
            r4: "<strong>iOS</strong> · besoin Mac dev + 99$/an Apple",
            r5: '<strong>Multi-utilisateurs</strong> · rôle "vendeuse"',
            r6: "<strong>Scan code-barres natif</strong> · Capacitor BarcodeScanner",
            r7: "<strong>Facturation TVA suisse / française</strong> · si demande utilisateurs"
        },
        faq: {
            title: "Questions honnêtes",
            q1: "Est-ce que mes données sont à toi ?",
            a1: 'Non. Tes données vivent dans <code>%APPDATA%\\Roaming\\ch.luxepos.desktop\\</code> sur ton PC, et un miroir chiffré dans ton OneDrive personnel. Je n\'ai aucun accès à rien. Pas de serveur tiers, pas de tracking.',
            q2: "Qu'est-ce qui se passe si je perds mon PC ?",
            a2: "Ton backup OneDrive est synchronisé automatiquement à chaque vente (chiffré AES-GCM 256). Tu installes l'app sur un nouveau PC, la clé de déchiffrement est ré-générée à partir d'un fichier que tu auras pris soin de sauvegarder. Tu pourras tout récupérer.",
            q3: "Pourquoi pas un abonnement comme Square ou Lightspeed ?",
            a3: "Parce que pour une artisane à 100 ventes/mois, payer 40-80€/mois c'est absurde. Et parce que je crois qu'on devrait pouvoir <em>posséder</em> ses outils, pas les louer à vie.",
            q4: "Et la TVA suisse / française ?",
            a4: 'Mode "non-assujettie" par défaut (art. 10 LTVA, CA &lt; 100\'000 CHF). Si tu dépasses le seuil, l\'app calcule la TVA et l\'imprime sur les factures. Multi-taux supporté (7.7% CH, 20% FR, etc.).',
            q5: "Je vends sur 3 lieux différents (atelier + 2 dépôts). Ça gère ?",
            a5: "Oui — c'est même un des trucs centraux. Tu déclares tes points (Atelier, Annemasse, Salon Genève), chaque produit est rattaché à un emplacement, les commissions par partenaire sont configurables, et un rapport mensuel te dit combien chacun te doit.",
            q6: "C'est compatible Mac ?",
            a6: "Le build Mac universel (Intel + Apple Silicon) est généré automatiquement par GitHub Actions à chaque release. Il fonctionne, mais n'a pas encore été testé par un vrai utilisateur Mac. Si tu veux être le premier, on est preneurs.",
            q7: "Et iPad / iPhone ?",
            a7: "Capacitor permet de faire iOS, mais la signature App Store nécessite un compte Apple Developer (99 $/an) + un Mac pour compiler. C'est sur la roadmap mais pas avant 2027.",
            q8: "L'assistant IA Lumi, c'est ChatGPT déguisé ?",
            a8: "Non. Lumi tourne 100% sur ton PC. C'est un parseur d'intentions par regex (21 commandes) + génération de réponses templated. Il connaît tes ventes, tes stocks, tes clients, et te répond instantanément sans appel réseau. Limité mais privé.",
            q9: "Pourquoi gratuit ?",
            a9: "Parce que je veux que le projet vive, et que la meilleure traction c'est l'usage réel. Le futur modèle économique sera transparent quand on en sera là."
        },
        finalCta: {
            title: "Prête à essayer ?",
            body: "3.4 Mo. Pas de carte bancaire. Pas d'email demandé. Tu désinstalles si ça te plaît pas.",
            cta: "Télécharger LuxePOS pour Windows",
            small: 'macOS universel disponible sur la <a href="https://github.com/metacovix-byte/LuxePOS-Web/releases">page Releases</a>'
        },
        footer: {
            tagline: "<strong>LuxePOS</strong> · Fait à Genève par une artisane et son IA, avec amour et beaucoup de café ☕",
            meta: "Pas de tracking · RGPD-friendly · Open source MIT",
            github: "GitHub",
            changelog: "Changelog",
            contact: "Contact"
        }
    },

    // ─── ENGLISH ─────────────────────────────────────────────────────────
    en: {
        meta: {
            title: "LuxePOS — POS for jewelry artisans · Windows, Mac, Android",
            description: "Sales, stock, Instagram and consignment shops: a native app built for jewelry artisans. Offline, encrypted, no subscription.",
            ogTitle: "LuxePOS — The POS for my jewelry workshop",
            ogDescription: "Sell, track 500 unique pieces, manage consignment and Instagram DMs. No opaque cloud, no subscription."
        },
        nav: {
            features: "Features",
            how: "How it works",
            stack: "Under the hood",
            faq: "FAQ",
            github: "View source on GitHub"
        },
        hero: {
            kicker: "For jewelry artisans · Windows · Mac · Android",
            h1Pre: "The POS for my ",
            h1Em: "jewelry workshop",
            h1Post: ".",
            lede: 'One native app to sell, track your 500 unique pieces, manage Instagram DMs and consignment shops. <strong>Offline. Encrypted. No subscription.</strong>',
            ctaDownload: "Download for Windows",
            ctaDownloadSub: "3.4 MB · v5.14.15",
            ctaSource: "Source code",
            pill1: "✓ Free during beta",
            pill2: "✓ Open source",
            pill3: "✓ No tracking",
            savedFooter: "💾 Saved 3 min ago",
            mockBannerKicker: "Profitability blind spot",
            mockBannerTitle: "294 items without cost",
            mockBannerCta: "🧮 Enter costs (5 min)",
            mockCard1: "Quick sale",
            mockCard1Sub: "3 taps",
            mockCard2: "Add stock",
            mockCard2Sub: "New piece",
            mockCard3: "Insta DM",
            mockCard3Sub: "WhatsApp",
            mockStat1Label: "This month",
            mockStat1Value: "191 CHF",
            mockStat2Label: "Avg 7d",
            mockStat2Value: "31 CHF",
            mockStat3Label: "Stock",
            mockStat3Value: "To compute",
            mockGreeting: "Good afternoon",
            mockDate: "May 7, 2026"
        },
        forWhom: {
            title: "Who it's built for",
            lede: "If you recognize yourself in one of these three, this app is for you.",
            card1Title: "Jewelry artisan",
            card1Body: "You craft unique pieces from 316L stainless steel, pearls, vintage parts. Your sales are per piece, not bulk inventory.",
            card2Title: "Multi-location consignment",
            card2Body: "You consign pieces with 2-3 partners. You want to know who has what, how much you're owed, and who gets the commission.",
            card3Title: "Instagram / WhatsApp seller",
            card3Body: "Most of your sales happen in DMs. You want to track quote → payment → shipping without copy-pasting."
        },
        features: {
            title: "What's actually different",
            lede: "Generic tools don't think like an artisan. Here are 6 things we did differently.",
            f1Title: "Native unique pieces",
            f1Body: 'The app knows that a sold piece is not "out of stock" — it\'s just sold. No more phantom alerts on 290 products.',
            f2Title: "Consignment commissions",
            f2Body: "Annemasse 30%, Salon 25%, Workshop 0%. Calculated automatically on every sale.",
            f3Title: "Encrypted OneDrive backup",
            f3Body: "AES-GCM 256, local key in AppData. If OneDrive is hacked, your data stays unreadable.",
            f4Title: "Lumi, your local assistant",
            f4Body: "21 voice and text commands, 3 personalities. Runs on your PC. Not a remote API.",
            f5Title: "Smart cost wizard",
            f5Body: "Per-category suggestions (necklace ≈ 10 CHF, ring ≈ 4). Sorted by financial impact. 5 min for 500 pieces.",
            f6Title: "Built-in DM pipeline",
            f6Body: "Received → Quote → Paid → Shipped → Delivered. TWINT/Revolut payment proof + Swiss Post tracking."
        },
        how: {
            title: "How it works",
            lede: "3 steps to move from Excel to a real POS.",
            s1Title: "Import your Excel",
            s1Body: 'Drag and drop your file. The parser recognizes your "Sold on", "To whom", "Color" columns, even out of order. Nothing lost.',
            s2Title: "Enter costs in 5 minutes",
            s2Body: "The wizard pre-fills by category. You validate or adjust. Sorted by highest financial impact first.",
            s3Title: "Sell, track, understand",
            s3Body: 'Dashboard with daily revenue, 7-day average, stock value. Instead of a discouraging "↓100% vs yesterday": "🌅 First sale expected".'
        },
        stack: {
            title: "Under the hood",
            lede: "Radical transparency. Everything is verifiable.",
            cmtStack: "# Stack",
            cmtPrivacy: "# Privacy",
            cmtData: "# Data",
            cmtDistribution: "# Distribution",
            cmtPerf: "# Performance",
            valNone: "none"
        },
        pricing: {
            title: "How much it costs",
            badge: "Public beta",
            amount: "Free",
            sub: "until v6.0 (around mid-2027)",
            f1: "✓ All features unlocked",
            f2: "✓ Signed automatic updates",
            f3: "✓ Encrypted OneDrive backup",
            f4: "✓ No limit on products / clients / sales",
            f5: "✓ No credit card asked",
            note: 'Future pricing will be around <strong>9 CHF/month</strong> if you want to support the project, but a free version will remain available. No bait-and-switch.'
        },
        roadmap: {
            title: "Public roadmap",
            lede: "No promises, just honest milestones.",
            r1: "<strong>Native Windows</strong> · v5.14.15 shipped",
            r2: "<strong>macOS universal</strong> · CI green, needs real Mac user testing",
            r3: "<strong>Android</strong> · Capacitor scaffold, build pending Android Studio",
            r4: "<strong>iOS</strong> · needs Mac dev + Apple Developer Program ($99/year)",
            r5: '<strong>Multi-user</strong> · "sales assistant" role',
            r6: "<strong>Native barcode scanner</strong> · Capacitor BarcodeScanner",
            r7: "<strong>Swiss / French VAT invoicing</strong> · on user demand"
        },
        faq: {
            title: "Honest questions",
            q1: "Is my data yours?",
            a1: 'No. Your data lives in <code>%APPDATA%\\Roaming\\ch.luxepos.desktop\\</code> on your PC, and an encrypted mirror in your personal OneDrive. I have access to nothing. No third-party server, no tracking.',
            q2: "What happens if I lose my PC?",
            a2: "Your OneDrive backup is synced automatically on every sale (AES-GCM 256 encrypted). You install the app on a new PC, the decryption key is regenerated from a file you've kept safe. You recover everything.",
            q3: "Why not a subscription like Square or Lightspeed?",
            a3: "Because for an artisan doing 100 sales/month, paying $40-80/month is absurd. And because I believe you should be able to <em>own</em> your tools, not rent them forever.",
            q4: "What about Swiss / French VAT?",
            a4: 'Default "not subject to VAT" mode (art. 10 Swiss VAT Act, revenue &lt; 100,000 CHF). Above the threshold, the app calculates VAT and prints it on invoices. Multi-rate supported (7.7% CH, 20% FR, etc.).',
            q5: "I sell at 3 different locations (workshop + 2 consignments). Does it handle that?",
            a5: "Yes — it's actually one of the core features. You declare your locations (Workshop, Annemasse, Salon Geneva), each product is attached to a location, commissions per partner are configurable, and a monthly report tells you what each owes you.",
            q6: "Mac compatible?",
            a6: "The universal Mac build (Intel + Apple Silicon) is generated automatically by GitHub Actions on every release. It works, but hasn't been tested by a real Mac user yet. If you want to be the first, we're listening.",
            q7: "iPad / iPhone?",
            a7: "Capacitor allows iOS, but App Store signing requires an Apple Developer account ($99/year) and a Mac to compile. It's on the roadmap but not before 2027.",
            q8: "Lumi, the AI assistant — is that ChatGPT in disguise?",
            a8: "No. Lumi runs 100% on your PC. It's a regex intent parser (21 commands) + templated response generation. It knows your sales, stock, clients, and responds instantly with no network call. Limited but private.",
            q9: "Why free?",
            a9: "Because I want the project to live, and the best traction is real usage. The future business model will be transparent when we get there."
        },
        finalCta: {
            title: "Ready to try?",
            body: "3.4 MB. No credit card. No email asked. Uninstall if you don't like it.",
            cta: "Download LuxePOS for Windows",
            small: 'Universal macOS build available on the <a href="https://github.com/metacovix-byte/LuxePOS-Web/releases">Releases page</a>'
        },
        footer: {
            tagline: "<strong>LuxePOS</strong> · Made in Geneva by an artisan and her AI, with love and a lot of coffee ☕",
            meta: "No tracking · GDPR-friendly · MIT open source",
            github: "GitHub",
            changelog: "Changelog",
            contact: "Contact"
        }
    },

    // ─── DEUTSCH (Schweizerhochdeutsch — Standarddeutsch) ────────────────
    de: {
        meta: {
            title: "LuxePOS — Kasse für Schmuck-Kunsthandwerker · Windows, Mac, Android",
            description: "Verkauf, Lager, Instagram und Kommissionsläden: eine native App für Schmuck-Kunsthandwerker. Offline, verschlüsselt, kein Abo.",
            ogTitle: "LuxePOS — Die Kasse für meine Schmuckwerkstatt",
            ogDescription: "Verkaufe, verfolge 500 Unikate, verwalte Kommissionsverkauf und Instagram-DMs. Keine intransparente Cloud, kein Abo."
        },
        nav: {
            features: "Funktionen",
            how: "So funktioniert's",
            stack: "Unter der Haube",
            faq: "FAQ",
            github: "Quellcode auf GitHub"
        },
        hero: {
            kicker: "Für Schmuck-Kunsthandwerker · Windows · Mac · Android",
            h1Pre: "Die Kasse meiner ",
            h1Em: "Schmuckwerkstatt",
            h1Post: ".",
            lede: 'Eine einzige native App, um zu verkaufen, deine 500 Unikate zu verfolgen, Instagram-DMs und Kommissionsläden zu verwalten. <strong>Offline. Verschlüsselt. Kein Abo.</strong>',
            ctaDownload: "Für Windows herunterladen",
            ctaDownloadSub: "3.4 MB · v5.14.15",
            ctaSource: "Quellcode",
            pill1: "✓ Kostenlos in der Beta",
            pill2: "✓ Open Source",
            pill3: "✓ Kein Tracking",
            savedFooter: "💾 Vor 3 Min. gespeichert",
            mockBannerKicker: "Rentabilität unklar",
            mockBannerTitle: "294 Stücke ohne Kosten",
            mockBannerCta: "🧮 Kosten erfassen (5 Min.)",
            mockCard1: "Schnellverkauf",
            mockCard1Sub: "3 Taps",
            mockCard2: "Lager",
            mockCard2Sub: "Neues Stück",
            mockCard3: "Insta DM",
            mockCard3Sub: "WhatsApp",
            mockStat1Label: "Diesen Monat",
            mockStat1Value: "191 CHF",
            mockStat2Label: "Schnitt 7T",
            mockStat2Value: "31 CHF",
            mockStat3Label: "Lager",
            mockStat3Value: "Zu berechnen",
            mockGreeting: "Guten Nachmittag",
            mockDate: "7. Mai 2026"
        },
        forWhom: {
            title: "Für wen das gemacht ist",
            lede: "Wenn du dich in einer der drei wiederfindest, ist die App für dich.",
            card1Title: "Schmuck-Kunsthandwerkerin",
            card1Body: "Du fertigst Unikate aus 316L Edelstahl, Perlen, Vintage-Teilen. Deine Verkäufe sind pro Stück, nicht aus Massenlager.",
            card2Title: "Kommissionsverkauf an mehreren Orten",
            card2Body: "Du lieferst an 2-3 Partner. Du willst wissen, wer was hat, wieviel du bekommst und wer welche Kommission erhält.",
            card3Title: "Instagram- / WhatsApp-Verkäuferin",
            card3Body: "Das meiste verkaufst du über DM. Du willst Offerte → Zahlung → Versand verfolgen, ohne zu kopieren-einfügen."
        },
        features: {
            title: "Was wirklich anders ist",
            lede: "Generische Tools denken nicht wie eine Kunsthandwerkerin. Hier sind 6 Dinge, die wir anders gemacht haben.",
            f1Title: "Native Unikate",
            f1Body: 'Die App weiss, dass ein verkauftes Stück nicht "ausverkauft" ist — es ist einfach verkauft. Schluss mit Phantom-Alarmen auf 290 Produkten.',
            f2Title: "Kommissions-Tarife",
            f2Body: "Annemasse 30%, Salon 25%, Werkstatt 0%. Bei jedem Verkauf automatisch berechnet.",
            f3Title: "Verschlüsseltes OneDrive-Backup",
            f3Body: "AES-GCM 256, lokaler Schlüssel im AppData. Falls OneDrive gehackt wird, bleiben deine Daten unlesbar.",
            f4Title: "Lumi, deine lokale Assistentin",
            f4Body: "21 Sprach- und Textbefehle, 3 Persönlichkeiten zur Auswahl. Läuft auf deinem PC. Keine Remote-API.",
            f5Title: "Intelligenter Kostenassistent",
            f5Body: "Vorschläge pro Kategorie (Halskette ≈ 10 CHF, Ring ≈ 4). Sortiert nach finanzieller Wirkung. 5 Min. für 500 Stücke.",
            f6Title: "Eingebaute DM-Pipeline",
            f6Body: "Erhalten → Offerte → Bezahlt → Versendet → Geliefert. TWINT-/Revolut-Zahlungsbeleg + Swiss-Post-Tracking."
        },
        how: {
            title: "So funktioniert's",
            lede: "3 Schritte von Excel zu einer echten Kasse.",
            s1Title: "Importiere dein Excel",
            s1Body: 'Datei per Drag-and-Drop. Der Parser erkennt deine Spalten "Verkauft am", "An wen", "Farbe", auch wenn unsortiert. Kein Verlust.',
            s2Title: "Kosten in 5 Minuten erfassen",
            s2Body: "Der Assistent füllt nach Kategorie vor. Du bestätigst oder passt an. Sortiert nach höchstem finanziellem Einfluss.",
            s3Title: "Verkaufen, verfolgen, verstehen",
            s3Body: 'Dashboard mit Tagesumsatz, 7-Tage-Durchschnitt, Lagerwert. Statt deprimierendem "↓100% vs gestern": "🌅 Erster Verkauf erwartet".'
        },
        stack: {
            title: "Unter der Haube",
            lede: "Radikale Transparenz. Alles ist überprüfbar.",
            cmtStack: "# Stack",
            cmtPrivacy: "# Datenschutz",
            cmtData: "# Daten",
            cmtDistribution: "# Verteilung",
            cmtPerf: "# Performance",
            valNone: "keine"
        },
        pricing: {
            title: "Was es kostet",
            badge: "Öffentliche Beta",
            amount: "Gratis",
            sub: "bis zur v6.0 (etwa Mitte 2027)",
            f1: "✓ Alle Funktionen freigeschaltet",
            f2: "✓ Signierte automatische Updates",
            f3: "✓ Verschlüsseltes OneDrive-Backup",
            f4: "✓ Kein Limit für Produkte / Kunden / Verkäufe",
            f5: "✓ Keine Kreditkarte verlangt",
            note: 'Der zukünftige Tarif wird bei etwa <strong>9 CHF/Monat</strong> liegen, falls du das Projekt unterstützen willst — aber eine Gratisversion bleibt verfügbar. Kein Bait-and-Switch.'
        },
        roadmap: {
            title: "Öffentliche Roadmap",
            lede: "Keine Versprechen, nur ehrliche Etappen.",
            r1: "<strong>Windows nativ</strong> · v5.14.15 ausgeliefert",
            r2: "<strong>macOS universal</strong> · CI grün, echter Mac-Test fehlt",
            r3: "<strong>Android</strong> · Capacitor-Gerüst, Build wartet auf Android Studio",
            r4: "<strong>iOS</strong> · braucht Mac-Entwickler + 99 $/Jahr Apple",
            r5: '<strong>Mehrbenutzer</strong> · Rolle "Verkäuferin"',
            r6: "<strong>Nativer Barcode-Scanner</strong> · Capacitor BarcodeScanner",
            r7: "<strong>Schweizerische / französische MWST-Fakturierung</strong> · auf Nutzeranfrage"
        },
        faq: {
            title: "Ehrliche Fragen",
            q1: "Gehören meine Daten dir?",
            a1: 'Nein. Deine Daten liegen in <code>%APPDATA%\\Roaming\\ch.luxepos.desktop\\</code> auf deinem PC, und ein verschlüsselter Spiegel in deinem persönlichen OneDrive. Ich habe keinerlei Zugriff. Kein Drittserver, kein Tracking.',
            q2: "Was passiert, wenn ich meinen PC verliere?",
            a2: "Dein OneDrive-Backup wird bei jedem Verkauf automatisch synchronisiert (AES-GCM 256 verschlüsselt). Du installierst die App auf einem neuen PC, der Entschlüsselungsschlüssel wird aus einer von dir gesicherten Datei wiederhergestellt. Alles wird wiederhergestellt.",
            q3: "Warum kein Abo wie Square oder Lightspeed?",
            a3: "Weil für eine Kunsthandwerkerin mit 100 Verkäufen/Monat 40-80 €/Monat absurd sind. Und weil ich glaube, dass man seine Werkzeuge <em>besitzen</em> sollte, nicht ewig mieten.",
            q4: "Und die Schweizer / französische MWST?",
            a4: 'Standard "nicht steuerpflichtig" (Art. 10 MWSTG, Umsatz &lt; 100\'000 CHF). Über der Schwelle berechnet die App die MWST und druckt sie auf die Rechnungen. Multi-Satz unterstützt (7.7% CH, 20% FR, usw.).',
            q5: "Ich verkaufe an 3 verschiedenen Orten (Werkstatt + 2 Kommissionen). Geht das?",
            a5: "Ja — das ist sogar ein Kern-Feature. Du deklarierst deine Standorte (Werkstatt, Annemasse, Salon Genf), jedes Produkt wird einem Ort zugeordnet, Kommissionen pro Partner sind konfigurierbar, und ein Monatsbericht sagt dir, wer dir was schuldet.",
            q6: "Mac-kompatibel?",
            a6: "Der universelle Mac-Build (Intel + Apple Silicon) wird bei jeder Release automatisch von GitHub Actions erzeugt. Er funktioniert, wurde aber noch nicht von einem echten Mac-Nutzer getestet. Wenn du der Erste sein willst, hören wir zu.",
            q7: "iPad / iPhone?",
            a7: "Capacitor erlaubt iOS, aber App-Store-Signierung benötigt ein Apple-Developer-Konto (99 $/Jahr) + einen Mac zum Kompilieren. Steht auf der Roadmap, aber nicht vor 2027.",
            q8: "Ist der KI-Assistent Lumi ein verkleidetes ChatGPT?",
            a8: "Nein. Lumi läuft zu 100% auf deinem PC. Es ist ein Regex-Intent-Parser (21 Befehle) + Template-basierte Antwortgenerierung. Er kennt deine Verkäufe, Lager, Kunden und antwortet sofort ohne Netzwerkanfrage. Limitiert, aber privat.",
            q9: "Warum gratis?",
            a9: "Weil ich will, dass das Projekt lebt, und die beste Traktion echte Nutzung ist. Das zukünftige Geschäftsmodell wird transparent, wenn wir soweit sind."
        },
        finalCta: {
            title: "Bereit, es auszuprobieren?",
            body: "3.4 MB. Keine Kreditkarte. Keine E-Mail verlangt. Deinstallieren falls es dir nicht gefällt.",
            cta: "LuxePOS für Windows herunterladen",
            small: 'Universeller macOS-Build verfügbar auf der <a href="https://github.com/metacovix-byte/LuxePOS-Web/releases">Releases-Seite</a>'
        },
        footer: {
            tagline: "<strong>LuxePOS</strong> · Gemacht in Genf von einer Kunsthandwerkerin und ihrer KI, mit Liebe und viel Kaffee ☕",
            meta: "Kein Tracking · DSGVO-freundlich · MIT-Open-Source",
            github: "GitHub",
            changelog: "Changelog",
            contact: "Kontakt"
        }
    },

    // ─── ITALIANO ────────────────────────────────────────────────────────
    it: {
        meta: {
            title: "LuxePOS — Cassa per artigiani gioiellieri · Windows, Mac, Android",
            description: "Vendite, magazzino, Instagram e conto vendita: l'app nativa pensata per artigiani gioiellieri. Offline, cifrata, senza abbonamento.",
            ogTitle: "LuxePOS — La cassa del mio atelier di gioielli",
            ogDescription: "Vendi, segui 500 pezzi unici, gestisci conto vendita e DM Instagram. Senza cloud opaco, senza abbonamento."
        },
        nav: {
            features: "Funzioni",
            how: "Come funziona",
            stack: "Sotto il cofano",
            faq: "FAQ",
            github: "Codice su GitHub"
        },
        hero: {
            kicker: "Per artigiani gioiellieri · Windows · Mac · Android",
            h1Pre: "La cassa del mio ",
            h1Em: "atelier di gioielli",
            h1Post: ".",
            lede: 'Una sola app nativa per vendere, seguire i tuoi 500 pezzi unici, gestire i DM Instagram e i punti conto vendita. <strong>Offline. Cifrata. Senza abbonamento.</strong>',
            ctaDownload: "Scarica per Windows",
            ctaDownloadSub: "3.4 MB · v5.14.15",
            ctaSource: "Codice sorgente",
            pill1: "✓ Gratis durante la beta",
            pill2: "✓ Open source",
            pill3: "✓ Nessun tracking",
            savedFooter: "💾 Salvato 3 min fa",
            mockBannerKicker: "Redditività cieca",
            mockBannerTitle: "294 pezzi senza costo",
            mockBannerCta: "🧮 Inserisci i costi (5 min)",
            mockCard1: "Vendita lampo",
            mockCard1Sub: "3 tap",
            mockCard2: "Aggiungi magazzino",
            mockCard2Sub: "Nuovo pezzo",
            mockCard3: "DM Insta",
            mockCard3Sub: "WhatsApp",
            mockStat1Label: "Questo mese",
            mockStat1Value: "191 CHF",
            mockStat2Label: "Media 7g",
            mockStat2Value: "31 CHF",
            mockStat3Label: "Magazzino",
            mockStat3Value: "Da calcolare",
            mockGreeting: "Buon pomeriggio",
            mockDate: "7 maggio 2026"
        },
        forWhom: {
            title: "Per chi è pensata",
            lede: "Se ti riconosci in una di queste tre, l'app è per te.",
            card1Title: "Artigiana gioielliera",
            card1Body: "Fai pezzi unici in acciaio 316L, perle, vintage. Le tue vendite sono per pezzo, non a magazzino riproducibile.",
            card2Title: "Conto vendita multi-punto",
            card2Body: "Lasci pezzi presso 2-3 partner. Vuoi sapere chi ha cosa, quanto ti devono, a chi spetta la commissione.",
            card3Title: "Venditrice Instagram / WhatsApp",
            card3Body: "Quasi tutto vendi in DM. Vuoi seguire preventivo → pagamento → spedizione senza copia-incolla."
        },
        features: {
            title: "Cosa cambia davvero",
            lede: "Gli strumenti generici non ragionano come un'artigiana. Ecco 6 cose che abbiamo fatto diversamente.",
            f1Title: "Pezzi unici nativi",
            f1Body: 'L\'app sa che un pezzo venduto non è "esaurito" — è solo venduto. Niente più allarmi fantasma su 290 prodotti.',
            f2Title: "Commissioni conto vendita",
            f2Body: "Annemasse 30%, Salone 25%, Atelier 0%. Calcolate automaticamente a ogni vendita.",
            f3Title: "Backup OneDrive cifrato",
            f3Body: "AES-GCM 256, chiave locale in AppData. Se OneDrive viene compromesso, i tuoi dati restano illeggibili.",
            f4Title: "Lumi, la tua assistente locale",
            f4Body: "21 comandi vocali e scritti, 3 personalità a scelta. Gira sul tuo PC. Non è un'API remota.",
            f5Title: "Procedura costi intelligente",
            f5Body: "Suggerimenti per categoria (collana ≈ 10 CHF, anello ≈ 4). Ordinati per impatto finanziario. 5 min per 500 pezzi.",
            f6Title: "Pipeline DM integrata",
            f6Body: "Ricevuto → Preventivo → Pagato → Spedito → Consegnato. Prova pagamento TWINT/Revolut + tracking Swiss Post."
        },
        how: {
            title: "Come funziona",
            lede: "3 passi per passare da Excel a una vera cassa.",
            s1Title: "Importa il tuo Excel",
            s1Body: 'Trascina il file. Il parser riconosce le colonne "Venduto il", "A chi", "Colore", anche in disordine. Nessuna perdita.',
            s2Title: "Inserisci i costi in 5 min",
            s2Body: "La procedura pre-compila per categoria. Confermi o adatti. Ordina dalle categorie con maggior impatto finanziario.",
            s3Title: "Vendi, segui, capisci",
            s3Body: 'Dashboard con fatturato del giorno, media 7g, valore magazzino. Invece di "↓100% vs ieri" scoraggiante: "🌅 Prima vendita attesa".'
        },
        stack: {
            title: "Sotto il cofano",
            lede: "Trasparenza radicale. Tutto è verificabile.",
            cmtStack: "# Stack",
            cmtPrivacy: "# Privacy",
            cmtData: "# Dati",
            cmtDistribution: "# Distribuzione",
            cmtPerf: "# Prestazioni",
            valNone: "nessuno"
        },
        pricing: {
            title: "Quanto costa",
            badge: "Beta pubblica",
            amount: "Gratis",
            sub: "fino alla v6.0 (metà 2027 circa)",
            f1: "✓ Tutte le funzioni sbloccate",
            f2: "✓ Aggiornamenti automatici firmati",
            f3: "✓ Backup OneDrive cifrato",
            f4: "✓ Nessun limite di prodotti / clienti / vendite",
            f5: "✓ Nessuna carta di credito richiesta",
            note: 'La futura tariffa sarà intorno ai <strong>9 CHF/mese</strong> se vuoi sostenere il progetto, ma una versione gratuita resterà disponibile. Niente bait-and-switch.'
        },
        roadmap: {
            title: "Roadmap pubblica",
            lede: "Niente promesse, solo tappe vere.",
            r1: "<strong>Windows nativo</strong> · v5.14.15 consegnato",
            r2: "<strong>macOS universale</strong> · CI verde, manca test Mac reale",
            r3: "<strong>Android</strong> · scaffolding Capacitor, build in attesa di Android Studio",
            r4: "<strong>iOS</strong> · serve dev Mac + 99$/anno Apple",
            r5: '<strong>Multi-utente</strong> · ruolo "venditrice"',
            r6: "<strong>Scanner codici a barre nativo</strong> · Capacitor BarcodeScanner",
            r7: "<strong>Fatturazione IVA svizzera / francese</strong> · su richiesta utenti"
        },
        faq: {
            title: "Domande sincere",
            q1: "I miei dati sono tuoi?",
            a1: 'No. I tuoi dati vivono in <code>%APPDATA%\\Roaming\\ch.luxepos.desktop\\</code> sul tuo PC, e uno specchio cifrato nel tuo OneDrive personale. Io non ho accesso a niente. Nessun server terzo, nessun tracking.',
            q2: "Cosa succede se perdo il PC?",
            a2: "Il backup OneDrive è sincronizzato automaticamente a ogni vendita (cifrato AES-GCM 256). Installi l'app su un nuovo PC, la chiave di decifratura viene rigenerata da un file che avrai salvato. Recuperi tutto.",
            q3: "Perché non un abbonamento come Square o Lightspeed?",
            a3: "Perché per un'artigiana con 100 vendite/mese, pagare 40-80€/mese è assurdo. E perché credo che si debba poter <em>possedere</em> i propri strumenti, non affittarli per sempre.",
            q4: "E l'IVA svizzera / francese?",
            a4: 'Modalità "non assoggettata" predefinita (art. 10 LIVA, fatturato &lt; 100\'000 CHF). Oltre la soglia, l\'app calcola l\'IVA e la stampa sulle fatture. Multi-aliquota supportata (7.7% CH, 22% IT, 20% FR, ecc.).',
            q5: "Vendo in 3 luoghi diversi (atelier + 2 conto vendita). Gestisce?",
            a5: "Sì — è anzi una delle funzioni centrali. Dichiari i tuoi punti (Atelier, Annemasse, Salone Ginevra), ogni prodotto è collegato a un luogo, le commissioni per partner sono configurabili, e un report mensile ti dice quanto ti deve ciascuno.",
            q6: "Compatibile Mac?",
            a6: "Il build Mac universale (Intel + Apple Silicon) è generato automaticamente da GitHub Actions a ogni release. Funziona, ma non è ancora stato testato da un utente Mac reale. Se vuoi essere il primo, ti ascoltiamo.",
            q7: "iPad / iPhone?",
            a7: "Capacitor permette iOS, ma la firma App Store richiede un account Apple Developer (99 $/anno) + un Mac per compilare. È in roadmap ma non prima del 2027.",
            q8: "L'assistente IA Lumi è ChatGPT travestito?",
            a8: "No. Lumi gira al 100% sul tuo PC. È un parser di intenti via regex (21 comandi) + generazione di risposte template. Conosce le tue vendite, il magazzino, i clienti, e risponde istantaneamente senza chiamate di rete. Limitato ma privato.",
            q9: "Perché gratis?",
            a9: "Perché voglio che il progetto viva, e la migliore trazione è l'uso reale. Il futuro modello economico sarà trasparente quando ci arriveremo."
        },
        finalCta: {
            title: "Pronta a provare?",
            body: "3.4 MB. Niente carta di credito. Niente email richiesta. Disinstalli se non ti piace.",
            cta: "Scarica LuxePOS per Windows",
            small: 'Build macOS universale disponibile sulla <a href="https://github.com/metacovix-byte/LuxePOS-Web/releases">pagina Releases</a>'
        },
        footer: {
            tagline: "<strong>LuxePOS</strong> · Fatto a Ginevra da un'artigiana e dalla sua IA, con amore e tanto caffè ☕",
            meta: "Nessun tracking · GDPR-friendly · Open source MIT",
            github: "GitHub",
            changelog: "Changelog",
            contact: "Contatti"
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════
// Logique i18n : detect, swap, persist
// ═══════════════════════════════════════════════════════════════════════

window.LuxeI18n = (function () {
    const SUPPORTED = ['fr', 'en', 'de', 'it'];
    const DEFAULT = 'fr';
    const STORAGE_KEY = 'luxepos_lang';

    function detectLang() {
        // 1. URL parameter ?lang=de
        const params = new URLSearchParams(window.location.search);
        const fromUrl = params.get('lang');
        if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;
        // 2. localStorage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED.includes(stored)) return stored;
        } catch (e) {}
        // 3. navigator.language (prefix 2 chars)
        const navLang = (navigator.language || navigator.userLanguage || DEFAULT).slice(0, 2).toLowerCase();
        if (SUPPORTED.includes(navLang)) return navLang;
        // 4. fallback
        return DEFAULT;
    }

    function getValue(obj, path) {
        return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    }

    function apply(lang) {
        const dict = window.LUXEPOS_I18N[lang] || window.LUXEPOS_I18N[DEFAULT];
        // Update <html lang="...">
        document.documentElement.lang = lang;
        // Update <title> + meta
        document.title = dict.meta?.title || document.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict.meta?.description) metaDesc.setAttribute('content', dict.meta.description);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && dict.meta?.ogTitle) ogTitle.setAttribute('content', dict.meta.ogTitle);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && dict.meta?.ogDescription) ogDesc.setAttribute('content', dict.meta.ogDescription);

        // Update all [data-i18n] elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getValue(dict, key);
            if (value !== undefined && value !== null) {
                // Si la valeur contient du HTML (balises), utiliser innerHTML
                if (/[<>&]/.test(value)) {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }
        });
        // Update [data-i18n-aria]
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            const value = getValue(dict, key);
            if (value) el.setAttribute('aria-label', value);
        });
        // Update [data-i18n-attr] format: "attr:key"
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const spec = el.getAttribute('data-i18n-attr');
            const [attr, key] = spec.split(':');
            const value = getValue(dict, key);
            if (value) el.setAttribute(attr, value);
        });

        // Update active state on language switcher
        document.querySelectorAll('[data-lang-switch]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang-switch') === lang);
            btn.setAttribute('aria-current', btn.getAttribute('data-lang-switch') === lang ? 'true' : 'false');
        });
    }

    function set(lang) {
        if (!SUPPORTED.includes(lang)) return;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        apply(lang);
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }

    function init() {
        const lang = detectLang();
        apply(lang);
        // Wire up language switcher buttons
        document.querySelectorAll('[data-lang-switch]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                set(btn.getAttribute('data-lang-switch'));
            });
        });
    }

    return { init, set, apply, detectLang, SUPPORTED, DEFAULT };
})();

// Auto-init at DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.LuxeI18n.init());
} else {
    window.LuxeI18n.init();
}
