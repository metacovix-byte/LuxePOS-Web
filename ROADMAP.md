# 🗺️ LuxePOS — Roadmap stratégique

> Vue d'ensemble du projet, livré et à venir. Mis à jour 2026-05-18 (nuit, post v5.14.18).

---

## ✅ Livré (phase 1 → phase 2 partielle)

### Plateformes
- ✅ **Windows natif** (Tauri 2.11 + WebView2) — v5.14.18, installeur signé, 3.3 MB
- ✅ **macOS universel** (Intel + Apple Silicon) — auto-build CI, signé
- ✅ **Android APK** (Capacitor 8) — avec scanner code-barres ML Kit natif, ~30 MB
- ⏳ **iOS** — bloqué (besoin compte Apple Developer 99 €/an + Mac)
- ⏳ **Linux** — non priorisé (pas demandé)

### Core métier
- ✅ Caisse (POS) avec ventes éclair en 3 taps
- ✅ Inventaire (galerie + catégorie + liste, 400 produits)
- ✅ Clients (CRM léger, 27 clients, timeline, badges fidélité Bronze→Diamant)
- ✅ Commandes Instagram/WhatsApp (pipeline devis→paiement→expédition→livré)
- ✅ Réparations / SAV
- ✅ Réservations
- ✅ Dashboard (CA jour, panier moyen 7j, valeur stock, hero cards)

### Spécificités artisan bijou
- ✅ Pièces uniques natives (pas d'alertes stock fantômes)
- ✅ Multi-POS (Atelier + Annemasse FR + Salon Genève)
- ✅ Commissions automatiques par partenaire
- ✅ Wizard coûts avec suggestions par catégorie + tri par impact financier
- ✅ Distinction "à racheter" (composants) vs "vendue" (pièces uniques)

### IA & assistance
- ✅ Lumi (assistant IA local, 21 intentions, 3 personnalités, voice STT+TTS)

### Sécurité & données
- ✅ Backup OneDrive chiffré AES-GCM 256
- ✅ Clé locale jamais partagée
- ✅ XSS sanitization
- ✅ Skip-link, focus-visible, WCAG 2.1 AA

### Distribution & CI
- ✅ Auto-updater Tauri signé (clés minisign)
- ✅ GitHub Actions release (Mac + Win automatique sur tag v*)
- ✅ Repo public MIT (github.com/metacovix-byte/LuxePOS-Web)
- ✅ CHANGELOG.md + SemVer

### Photo workflow (v5.14.16)
- ✅ Capture webcam dans modal produit
- ✅ Import en masse photos (drag-folder, match auto par référence)
- ✅ Paste Ctrl+V depuis presse-papier
- ✅ Scanner code-barres webcam Tauri (parité Android)

### Site marketing
- ✅ Site dark + glassmorphism (4 langues FR/EN/DE/IT)
- ✅ Page Tarifs (3 tiers, math transparente, comparatif annuel)
- ✅ Page Waitlist (Formspree)
- ✅ Page Privacy (RGPD/LPD)
- ✅ Démos HTML animées + recorder MP4/GIF
- ⏳ Hébergement GitHub Pages (waiting user activation)

### Pack marketing
- ✅ Press kit FR+EN
- ✅ 3 templates emails (pré-annonce / early-bird / GA)
- ✅ 10 carrousels Instagram
- ✅ Setup GitHub Sponsors documenté
- ✅ Newsletter template Buttondown
- ✅ MONETIZATION_STRATEGY.md (40 KB)
- ✅ DOMAIN_PURCHASE_GUIDE.md

---

### BOM / Composants (v5.14.17)
- ✅ Catalogue de composants (perles, chaînes, fermoirs)
- ✅ Tracker stock + coût unitaire des composants
- ✅ Linkage produits ↔ composants (BOM) avec recalc auto
- ✅ Commandes fournisseur (AliExpress tracking + réception)
- ✅ Filtres Atelier (type + stock + recherche) + alerte réassort
- ✅ Wizard "Recalculer depuis BOM"
- ✅ 8 tests Playwright (701–708)

### Hotfix scanner (v5.14.18 → v5.14.19)
- ✅ v5.14.18 fix `_isScannerAvailable` (test 608)
- ⚠️ v5.14.18 ÉTAIT INCOMPLET — audit indépendant a trouvé 3 autres sites
  `this._isCapacitor()` dans UI (l. 11272, 15478, 28173) → modal produit
  crashait toujours après install.
- ✅ v5.14.19 fix COMPLET (3 sites + test 611 régression bout-en-bout)
- ✅ What's New modal multi-version (v5.14.19 par défaut, v4.8 archivée)

### Import Excel (v5.14.20, Phase 0)
- ✅ Découverte audit : flow déjà 90% implémenté (Store l. 7229-7982, UI l. 17554-17920)
- ✅ Fix P0 : schéma `repairs` aligné avec `addRepair` (ref, itemDescription,
  finalPrice, history[], status mapping paid→delivered)
- ✅ Tests 801–809 (9 tests Excel) :
  * 801-802 : schéma repairs + page Répa render
  * 803 : SheetJS inliné (offline-first)
  * 804 : parser Bracelets (refs, prix, stock 2x, locations, ventes)
  * 805 : double marquage Isley+Sandra → Atelier + warning
  * 806 : CAPSULES → bundles avec componentRefs (séparateurs / , ; +)
  * 807 : feuille Colliers (col Longueurs décalée — risque #1 audit)
  * 808 : Chart+confetti+tilt+XLSX tous inlinés (risque #3 audit)
  * 809 : flow E2E complet drag-drop → preview → commit (risque #2 audit)
- ✅ Phase 0.5 (mapping UI colonnes) : différé (besoin pas validé sur 1 user)

### Offline-first complet côté JS (v5.14.21)
- ✅ SheetJS 0.18.5 (882 KB), Chart.js 4.4.0 (200 KB), canvas-confetti 1.9.2
  (10 KB), vanilla-tilt 1.8.1 (8 KB) tous inlinés.
- ✅ ZÉRO `<script src=cdn>` côté JS. HTML 3.7 MB (acceptable pour app native).
- ✅ Reste sur CDN : fonts.googleapis (fallback système OK), open-dyslexic
  woff (opt-in accessibilité).
- ✅ `inline-vendors.js` idempotent + helper `inlineCdn()` factorisé.

### Localisation Suisse (Phase 1 — déjà implémentée, verrouillée par tests)
- ✅ CHF devise par défaut
- ✅ Locale fr-CH : apostrophe milliers (1'234.50) avec décimales,
  arrondi entier (1'235 CHF) par défaut dashboard
- ✅ Format date JJ.MM.AAAA via `toLocaleDateString('fr-CH')`
- ✅ TVA non assujettie par défaut (taxEnabled=false) + note légale
  "TVA non applicable, art. 10 LTVA" en pied de facture
- ✅ Paiements TWINT/Revolut/Cash en premier dans le dropdown
- ✅ Multi-POS 3 emplacements (Atelier CHF, Annemasse EUR 30% commission,
  Salon Genève CHF 25% commission)
- ✅ 4 tests Playwright 901-904 verrouillent ce comportement

## 🚧 En cours (mai 2026)

Rien d'actif côté code. v5.14.21 est en attente d'install Maëlle.
65 tests Playwright Pass (8 Excel + 4 Suisse + reste métier).
Prochaines pistes : Phase 3 (workflow Instagram/WhatsApp) ou Phase 2.5
(commissions reconciliation depuis liste papier partenaires).

---

## ⏳ Backlog priorisé

### Court terme (1-3 mois)
1. **Mode atelier** : ordre de fabrication, BOM, temps passé par pièce
2. **Multi-utilisateurs** : rôle "vendeuse" (read-only sur prix d'achat, accès POS uniquement)
3. **Stripe integration** (préparé en v6.0 — gated payant)
4. **Activation paywall** : tier Pro vs Découverte (limites 100 produits / 50 ventes/mois)
5. **License key système** : minisign + vérif locale (zéro appel réseau)
6. **Achat domaine luxepos.ch** (15 CHF/an) + email forwarding Cloudflare

### Moyen terme (3-9 mois)
1. **Lumi+ avancée** : modèle local (Ollama? llama.cpp?) ou option API distante optionnelle
2. **TVA suisse/française multi-taux** : pour utilisateurs au-dessus du seuil
3. **Facturation pro PDF** : templates personnalisables, logo, conditions
4. **Caisse enregistreuse certifiée CH** (LR-VAT compatible si besoin)
5. **Integration Twint Pay API** (pas seulement preuve de paiement, vrai encaissement)
6. **Multi-langue UI dans l'app** (actuellement FR uniquement côté app, EN/DE/IT à ajouter)

### Long terme (9-18 mois)
1. **Marketplace de templates** (factures, étiquettes, exports comptables)
2. **API publique** pour intégrations custom (50 CHF/mois)
3. **iOS App Store** (si compte Apple Dev + Mac dispo)
4. **Linux build** (AppImage)
5. **Refactor UI** : découpage de la classe UI géante (~28k lignes) en modules
6. **Real-time sync** entre devices (au lieu de OneDrive file-based)

### Très long terme / vision
1. **Communauté d'artisans** (forum / Discord) autour de l'outil
2. **B2B2C** : licence à des marketplaces existants (Etsy artisans)
3. **Edition mobile native** (pas Capacitor — vraie app React Native ou Swift/Kotlin)
4. **AI fine-tuning** sur les patterns de Maëlle + autres artisans (avec consentement)

---

## 🎯 Stratégie phase 2 → phase 3 (résumé)

| Phase | Période | Objectif principal | Métrique |
|---|---|---|---|
| **M0-M6** | 2026 H1 | Build + use (Maëlle) | App stable, 1 user |
| **M6-M12** | 2026 H2 | Acquérir 20-30 users via Insta + GitHub | 30 installs réelles |
| **M12-M18** | 2027 H1 | Lancement Pro (9 CHF/mois) + Lifetime early-bird (99 CHF) | 30 paying users, 270 CHF MRR |
| **M18-M24** | 2027 H2 | Croissance organique, mobile-first | 100 users, 800 CHF MRR |
| **M24+** | 2028+ | Marketplace + Pro+ enterprise (si besoin) | 500+ users, 4500 CHF MRR |

**North Star Metric** : *Weekly Active Sellers* (WAS) = nombre d'utilisateurs ayant fait au moins 1 vente cette semaine.

---

## 🚫 Hors-périmètre (volontaire)

Décisions assumées :
- ❌ Pas de cloud sync managé (ferait perdre l'argument "tes données sont à toi")
- ❌ Pas d'e-commerce intégré (Shopify le fait mieux, on est focus POS physique)
- ❌ Pas de chatbot commercial (anti-bullshit)
- ❌ Pas de tracker tiers (RGPD-first)
- ❌ Pas de blog (pas de bande passante pour du contenu régulier)
- ❌ Pas d'abonnement avant 20-30 utilisateurs réels confirmés
- ❌ Pas de pivot vers d'autres métiers (céramique, cuir...) avant d'avoir saturé l'artisan bijou suisse/francophone

---

## 📝 Décisions techniques notables

| Décision | Pourquoi |
|---|---|
| Single-file HTML (28k lignes) | Démarrage rapide, zéro build, debug facile. Refactor planifié quand l'app sera très utilisée |
| Tauri 2 (pas Electron) | 3.3 MB vs ~150 MB, RAM 26 vs 250 MB, sécurité Rust |
| Tailwind + Lucide inlinés | Zéro CDN au runtime, app marche offline total |
| Capacitor pour mobile | Réutilise 100% du code web, vraie app native packaging |
| OneDrive pour backup (pas cloud LuxePOS) | "Tes données sont à toi" = USP fort vs concurrents |
| AES-GCM 256 + clé locale | Défense en profondeur même si OneDrive est compromis |
| Open source MIT | Trust + community + protection contre lock-in user |
| Auto-updater minisign | Signatures cryptographiques sans dépendre d'Apple/MS |
| Pricing freemium 100 produits / 50 ventes/mois | Couvre l'usage débutant, monétise la croissance |
| 4 langues UI website (FR/EN/DE/IT) | Suisse multilingue + EU market |

---

## 🤝 Collaborateurs

- **Maëlle** : product owner, artisane bijoutière, première utilisatrice, ICP parfaite
- **Claude (IA)** : co-dev, support à la décision, code generation
- **GitHub Actions** : CI/CD
- **Apple/Google/Microsoft** : distribution (stores)
- **Stripe** (futur) : paiements
- **Formspree / GoatCounter / Buttondown** (futur) : outils SaaS gratuits pour lead capture + analytics + newsletter

---

## 📊 KPIs à tracker (dès activation Pages)

### Site marketing
- Visiteurs uniques (GoatCounter)
- Pages vues / source de trafic
- Taux téléchargement (visiteurs → install)
- Inscriptions waitlist (Formspree)

### App
- Installs (GitHub Releases downloads)
- Updates auto réussis (signature valide)
- Crashes (à instrumenter plus tard si nécessaire — actuellement zéro telemetry)

### Business (quand Pro activé)
- MRR (Monthly Recurring Revenue)
- ARPU (Average Revenue Per User)
- Churn rate (% qui annulent)
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost) — should approach 0 si bouche-à-oreille

---

## 💡 Idées en attente de validation

Issues GitHub à ouvrir quand on aura plus de signal utilisateur :
- [ ] Sauvegarde Google Drive en plus de OneDrive ?
- [ ] Multi-device sync sans cloud (P2P via QR code) ?
- [ ] Mode "Salon" avec multi-vendeuses + stats individuelles ?
- [ ] Integration WooCommerce ou Etsy pour qui a aussi un e-shop ?
- [ ] Voice notes attachées aux ventes ("client veut bague identique pour mariage juin")
- [ ] Mode "Apprenti" pour formation employée
- [ ] Export comptable annuel format Bexio / Crésus (CH) ou QuickBooks (FR)

---

*Dernière mise à jour : 2026-05-18. Maintenu manuellement par Claude + Maëlle.*
