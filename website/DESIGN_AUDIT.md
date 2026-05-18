# LuxePOS Marketing Site — Design Audit & Accessibility Review

> Audit réalisé le 2026-05-17 sur `website/index.html`, `website/pricing.html`, `website/style.css` (v3), `website/pricing.css` (v2).
> Méthode : revue manuelle WCAG 2.1 AA + critique design + cohérence i18n + responsive.

---

## 1. Première impression (test des 2 secondes)

**Ce qui attire l'œil en premier** (au-dessus du fold, ordre de capture visuelle) :
1. Le titre `La caisse de mon atelier de bijoux.` (gros, Playfair, gradient émeraude→sable sur "atelier de bijoux")
2. Le mockup de l'app à droite (perspective 3D + glow émeraude)
3. Le bouton primaire vert "Télécharger pour Windows"
4. La pastille pulsante "Pour artisan bijou" (kicker animé)

**Purpose clair ?** **Oui à 90 %.** Le headline raconte une histoire ("la caisse de mon atelier"), pas un slogan corporate. La sub-headline précise les bénéfices clés en 1 phrase (vendre, suivre 500 pièces, DM, dépôt-vente). Le mockup en perspective donne un signal "produit fini, pas mockup Figma".

**Friction observée** :
- Le badge `bêta · v5.14.15` à côté du logo, en très petit corps (0.65rem ≈ 10.4 px), est presque illisible et risque de paraître "alpha / instable" plutôt que "transparent". Tous les utilisateurs ne savent pas que c'est positif d'être versionné publiquement.
- Le **switcher de langue FR/EN/DE/IT** est très visible (volontairement, cf v3) mais le picto 🌍 en `::before` à `-28px` peut sortir du conteneur sur petits écrans → masqué via media query `820px`, ce qui est OK.

**Réaction émotionnelle** : confiance technique + chaleur artisanale, alignée avec la voix de marque ("artisan-à-artisan"). Le mesh gradient subtil + le sparkle ✨ sur "Bon après-midi" évitent l'effet "site de start-up tech froid".

---

## 2. Hiérarchie visuelle

### Hero — ordre de lecture (vertical reading)
```
KICKER (pulse vert)            ←  signal d'entrée
H1 PLAYFAIR DISPLAY            ←  ancrage émotionnel
LEDE (gris secondaire)         ←  argumentaire condensé
CTA PRIMARY + CTA GHOST        ←  appel à l'action
PILLS (3 chips)                ←  rassurance (gratuit, OSS, no tracking)
```
**Verdict** : F-pattern propre. L'emphase est sur le bon élément (h1 + CTA primary).

### Emphase
- **Bien** : gradient émeraude→sable sur le mot-clé "atelier de bijoux" focalise l'attention sur le métier
- **Bien** : le bouton primaire avec `--shadow-glow` (`0 10px 40px rgba(16,185,129,0.35)`) a la priorité visuelle
- **À surveiller** : les `pill` ont un fond `--glass-bg` quasi identique à celui du `lede` — manque de contraste de hiérarchie

### Espacements
- Hero `padding: clamp(60px, 8vh, 100px) 0 clamp(80px, 12vh, 140px)` → généreux, OK
- `.section` à `clamp(60px, 10vh, 120px) 0` → rythme cohérent entre sections
- `.section-lede` `margin: 0 auto 56px` → respiration correcte avant le contenu
- **Problème** : `.cta-row` `margin-bottom: 28px` puis `.hero-meta` direct — un peu serré quand le viewport est étroit, les pills wrap sous les CTA et la séparation visuelle CTA/preuves se perd.

---

## 3. Cohérence avec l'app (identité 1:1 ?)

| Token | Site | App | Aligné ? |
|---|---|---|---|
| `--brand-main` | `#10b981` | `#10b981` | ✅ |
| `--accent` | `#d4a574` | `#d4a574` | ✅ |
| `--bg-primary` | `#0f172a` | `#0f172a` | ✅ |
| `--glass-bg` | `rgba(30,41,59,0.55)` | `rgba(30,41,59,0.55)` | ✅ |
| Display font | Playfair Display | Playfair Display | ✅ |
| Mesh gradient | 4 radial layers, 28s drift | identique | ✅ |
| Diamant logo | `rotate(45deg)` linear-gradient | identique (`.sb-diamond`) | ✅ |
| Glassmorphism | `backdrop-filter: blur(22px) saturate(1.35)` | identique | ✅ |

**Mockup hero** : très fidèle (titlebar mac-like + sidebar 64px + greeting Playfair + bandeau orange "rentabilité aveugle" + 3 hero cards yellow/blue/pink + mini-stats glass). C'est probablement la meilleure section de cohérence app/site.

**Petit décrochage** :
- Les hero cards (yellow/blue/pink) du mockup sont en `min-height: 84px` alors que l'app a des aspect-ratio plus carrés. Mineur.
- `.mock-banner-cta` utilise un gradient `#f59e0b → #b85c3e` orange/cuivre — c'est cohérent avec l'app (variant warning).

---

## 4. Accessibilité WCAG 2.1 AA — Audit détaillé

### 4.1 Contrastes texte/fond (calcul WCAG)

| Couleur texte | Sur fond | Ratio | AA 14 px | AA 18 px+ |
|---|---|---|---|---|
| `--text-primary` `#f8fafc` | `--bg-primary` `#0f172a` | **15.97:1** | ✅ | ✅ |
| `--text-secondary` `#cbd5e1` | `#0f172a` | **11.36:1** | ✅ | ✅ |
| `--text-tertiary` `#94a3b8` | `#0f172a` | **6.42:1** | ✅ | ✅ |
| `--text-tertiary` `#94a3b8` | `--glass-bg` ≈ `#1c2640` | **5.78:1** | ✅ | ✅ |
| `--brand-main` `#10b981` | `#0f172a` | **6.36:1** | ✅ | ✅ |
| `--brand-main` `#10b981` | `rgba(16,185,129,0.12)` over dark | **6.0:1** | ✅ | ✅ |
| `.tier-restriction` `#94a3b8 @ opacity 0.7` | `--glass-bg` | **~4.0:1** | ⚠️ borderline | ✅ |
| `.kicker` `#10b981` 0.72rem (11.5 px) | `rgba(16,185,129,0.12)` | OK ratio mais **font sub-12px** | ⚠️ | n/a |
| `.brand-badge` `#10b981` 0.65rem (10.4 px) | `rgba(16,185,129,0.18)` | OK ratio mais **font sub-12px** | ⚠️ | n/a |
| `.mock-saved-footer` `#94a3b8` 0.6rem (9.6 px) | `--bg-primary` | **6.42:1** mais **font 9.6 px illisible** | ⚠️ |  |
| `.mock-card-sub` blanc opacity 0.88 0.62 rem | gradients colorés | Variable | ⚠️ |  |
| White `#fff` | `.btn-primary` gradient `#10b981→#059669` | **3.36:1** sur le milieu du gradient | ⚠️ borderline pour 14 px |

**Verdict global** : les contrastes texte sont solides. Le risque est lié aux **tailles de polices décoratives** (0.6–0.65rem) qui descendent sous 12 px et créent un problème de **lisibilité**, pas de contraste. C'est tolérable dans un mockup décoratif (`role="img"`), mais à éviter pour des éléments de l'UI réelle comme `.brand-badge`.

### 4.2 Touch targets (WCAG 2.5.5 Target Size — AAA mais best practice mobile)

| Élément | Dimensions | ≥ 44 × 44 ? |
|---|---|---|
| `.btn-primary` | ~150 × 50 px | ✅ |
| `.btn-ghost` | ~130 × 50 px | ✅ |
| `.github-link` | 38 × 38 px | ❌ (en deçà) |
| `.lang-switch button` | ~36 × 32 px (padding 7 × 12) | ❌ |
| `.faq summary::after` (+) | 28 × 28 px (icône cliquable du résumé) | ❌ — mais summary entier ≈ 64 px de hauteur → OK |
| `.faq summary` (zone) | 100 % × ~64 px | ✅ |
| `.nav-links a` | ~80 × 30 px | ❌ |
| `.tier-cta` | ~280 × 50 px | ✅ |
| `.cost-row` (clickable ?) | non clickable, OK |  |

**Verdict** : `.github-link`, `.lang-switch button`, `.nav-links a` sont **sous le seuil 44×44**. Critique pour les utilisateurs avec problèmes moteurs sur mobile. Recommandation : porter à 44×44 minimum (padding renforcé OU hit-zone invisible via pseudo-élément).

### 4.3 Navigation clavier

| Test | Résultat |
|---|---|
| Tab parcourt tous les liens/boutons | ✅ |
| `:focus` indicator visible | ⚠️ — `outline` natif présent mais aucune règle `:focus-visible` custom → utilise outline navigateur peu visible sur dark theme |
| Esc ferme les `<details>` FAQ | ❌ Esc ne ferme pas natif `<details>` (open=false manuel requis) |
| Enter active les `<details>` | ✅ natif |
| Enter active boutons lang-switch | ✅ |
| Skip-link "Aller au contenu principal" focussable en premier | ⚠️ — fonctionne mais voir 4.5 |

**Verdict** : pas de styles `:focus-visible` explicites = anneau de focus invisible ou trop discret. **Problème WCAG 2.4.7 critique.**

### 4.4 ARIA-labels & rôles

| Élément | Statut |
|---|---|
| `.app-mockup` | `role="img"` + `aria-label="Aperçu du dashboard LuxePOS"` ✅ — mais l'aria-label est en français et ne change pas avec la langue ❌ |
| `.lang-switch` | `role="group" aria-label="Langue"` ✅ mais "Langue" en FR seulement ❌ |
| `.lang-switch button` | seulement `title` + `aria-current` — **pas d'aria-label explicite** ⚠️ |
| `.github-link` | `aria-label` + `data-i18n-aria="nav.github"` ✅ |
| `.terminal` | `role="region" aria-label="Détails techniques"` ✅ — mais FR fixe ❌ |
| `.skip-link` | présent mais `data-i18n="nav.features"` → traduit en "Fonctions" (mauvaise clé) ❌ **CRITIQUE** |
| FAQ `<details>` | natif, pas besoin d'aria ✅ |
| `.gallery-mockup` | `aria-hidden="true"` ✅ correct (décoratif) |
| Brand link `<a href="#">` (`index.html`) | href="#" remonte mais n'a pas d'aria-label "Accueil" ⚠️ |
| Tableau compare | `<table>` sans `<caption>` ni `aria-label` ⚠️ |

### 4.5 Skip-link

```html
<a href="#main" class="skip-link" data-i18n="nav.features">Aller au contenu principal</a>
```
**Problème critique** : la clé `nav.features` retourne **"Fonctions" / "Features" / "Funktionen" / "Funzioni"**, pas "Aller au contenu principal". Le skip-link est cassé dans toutes les langues. Il faut créer une clé dédiée `nav.skipLink` dans i18n.js (les 4 langues) OU retirer le `data-i18n` et garder le texte FR brut.

Aussi, le style `position: absolute; top: -100px` fonctionne mais sur certains navigateurs mobiles cela peut décaler le layout. `position: fixed` est plus sûr.

### 4.6 `prefers-reduced-motion`

- `style.css` ligne 1427-1439 : block global qui désactive `animation-*` et `transition-*` → ✅
- `pricing.css` ligne 639-664 : surcharges pour `.tier-card`, barres, etc. → ✅
- **Non couvert** : `.app-mockup` `transform: perspective(1400px) rotateY(-4deg)` reste appliqué (pas une animation, c'est une transform statique → OK)
- `body::before` mesh animation explicitement neutralisé (`body::before { animation: none; }`) → ✅
- Sticky CTA mobile transition désactivée → ✅

**Verdict** : couverture solide, rien à corriger.

### 4.7 Alt / images

Le site n'utilise **aucune balise `<img>`** — uniquement des SVG inline et des mockups CSS. Tous les SVG décoratifs (icônes GitHub, icônes flèches) sont contenus dans des `<a>`/`<button>` avec aria-label, donc invisibles aux SR (bon).

Les emojis (`✨`, `📦`, `💬`, `📈`, etc.) dans les mockups ne sont pas marqués `aria-hidden="true"` mais ils sont **dans un parent `role="img" aria-label="..."`** donc le SR ne descend pas. ✅

---

## 5. Cohérence i18n

### Strings hardcodées en FR (qui resteront FR en EN/DE/IT)

| Fichier:ligne | Chaîne | Visible utilisateur ? | Sévérité |
|---|---|---|---|
| `index.html:50` | skip-link `data-i18n="nav.features"` → mauvaise clé | OUI (au Tab) | **critique** |
| `index.html:67` | `aria-label="Langue"` | SR uniquement | élevé |
| `index.html:111` | `aria-label="Aperçu du dashboard LuxePOS"` (`.app-mockup`) | SR uniquement | élevé |
| `index.html:507` | `aria-label="Détails techniques"` (`.terminal`) | SR uniquement | élevé |
| `pricing.html:24` | skip-link sans data-i18n du tout | OUI | critique |
| `pricing.html:40` | `aria-label="Langue"` | SR uniquement | élevé |
| `pricing.html:47` | `aria-label="GitHub"` | SR uniquement | moyen |
| `index.html:58/pricing.html:32` | `bêta · v5.14.15` (brand-badge, pas de i18n) | OUI | moyen (technique, OK en universel ?) |
| `index.html:75` | `aria-label="Voir le code sur GitHub"` — couvert par `data-i18n-aria="nav.github"` ✅ |  |  |
| Hero buttons sub-labels macOS/Android | `script.js:54-72` hardcodés FR | OUI sur Mac/Linux/iOS | élevé |

### Verdict i18n
- 95 % des chaînes visibles ont `data-i18n` ✅
- Le **skip-link** est cassé en non-FR (critique)
- Les **aria-labels** ne sont pas tous traduits (élevé)
- `script.js` UA-detection écrit du FR en dur — invisible pour Mac users non-FR ⚠️

---

## 6. Performance perçue

### Web Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@500;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```
- **`display=swap`** ✅ → texte affiché en fallback puis remplacé (no FOIT)
- **`preconnect` à fonts.gstatic.com** ✅
- **`preconnect` à fonts.googleapis.com manquant** ⚠️ → ajout possible (+50–100ms)
- Charge 4+3+2 = 9 graisses → pourrait être réduit à 3 graisses Inter (400, 600, 800) + 2 Playfair (500, 700) + 1 mono → mais marginal

### Animations CPU
- `body::before` mesh gradient : `transform: translate + scale` sur élément `position: fixed` → **GPU-accelerated** ✅
- `.sparkle`, `.pulse`, `.ringPulse`, `.blink`, `.badgePulse`, `.badgeShimmer` → toutes en `transform` ou `opacity` → composées GPU ✅
- `.cost-fill` `transition: width 1.2s` → **width = repaint coûteux** ⚠️ mais court (< 2s, une fois)
- `.faq summary::after` `transform: translateY rotate` au open → léger ✅

### Lazy loading
- Aucune `<img loading="lazy">` car aucune `<img>` → non applicable.
- `script.js` est `defer` ✅
- `i18n.js` est **synchrone** (volontaire pour appliquer la langue avant render) → bloquant mais petit (~30 KB) → tolérable.

### Risque graceful degradation **élevé**
`script.js:22-27` met **tous les `.section`, `.feature`, `.persona-card`, `.step`, `.rm-item` à `opacity: 0`** via JS au chargement, puis observe l'intersection pour les révéler.
**Conséquence** : si JS plante ou est bloqué (uBlock paranoia, CSP stricte, vieux Safari), **toute la page est invisible**. Il faut faire l'inverse : opacity 0 dans une classe CSS supprimable, ET appliquer la classe **uniquement si JS marche**.

---

## 7. Mobile responsive

### Breakpoints utilisés
- `820px` — masque le globe 🌍 du lang-switch
- `720px` — masque les liens nav (sauf github) et le brand-badge, lang-switch rétrécit
- `980px` — hero passe en 1 col, features-grid en 2 cols, pricing-tiers en 1 col, sticky CTA mobile apparaît
- `880px` — stats-grid en 2 cols
- `580px` — features-grid en 1 col
- `480px` — stats-grid en 1 col

**Verdict** : breakpoints **cohérents mais beaucoup** (5 valeurs). Pas critique, mais simplifiable.

### Tableau comparatif mobile
`.compare-table { min-width: 720px }` dans `.compare-wrap { overflow-x: auto }` → **scroll horizontal forcé** sous 720 px. Pas de hint visuel "→ scroll" ni de scroll-snap. WCAG 1.4.10 (reflow) ne tolère pas le scroll dans les deux directions pour le contenu principal, mais le tableau est une exception courante. **Améliorations** :
- Ajouter un fade gauche/droite pour signaler le scroll
- Ou un `<p>` indicatif "← Glisse pour voir tous les concurrents →"

### Tier-cards mobile
`@media (max-width: 980px) { .pricing-tiers { grid-template-columns: 1fr; } }` → stacking OK.
`.tier-card-featured` `transform: translateY(-12px) scale(1.02)` → annulé en mobile ✅

### Lang switcher mobile
Reste visible et accessible. ✅ (mais touch target sous-dimensionné, cf 4.2).

### Hero mockup mobile
Devient lourd verticalement (min-height 460px) sous 980px. Pourrait être réduit à 320–380 px sur très petits écrans (< 480 px).

---

## 8. Top 10 améliorations prioritaires

| # | Sévérité | Localisation | Problème | Fix proposé |
|---|---|---|---|---|
| **1** | 🔴 Critique | `index.html:50`, `pricing.html:24` | Skip-link cassé en EN/DE/IT (data-i18n="nav.features") | Créer clé `nav.skipLink` dans 4 langues + corriger l'attribut |
| **2** | 🔴 Critique | `script.js:22-27` | Si JS échoue → toute la page est invisible (opacity:0 appliqué inline avant l'observer) | Déplacer l'opacity:0 dans une classe `.js-reveal` ajoutée par JS, ou no-JS fallback |
| **3** | 🔴 Critique | `style.css` (pas de règle `:focus-visible`) | Aucun anneau de focus visible → WCAG 2.4.7 fail | Ajouter `:focus-visible { outline: 2px solid var(--brand-main); outline-offset: 2px; }` global |
| **4** | 🟠 Élevé | `style.css:170-176, 205-218, 167` | Touch targets < 44×44 (lang-switch ~32px, github-link 38px, nav-links a ~30px) | Min-height/width 44 ou ajout de zone cliquable invisible via `::before` |
| **5** | 🟠 Élevé | `index.html:67,111,507`, `pricing.html:40,47` | aria-labels hardcodés en FR | Ajouter `data-i18n-aria` + clés i18n correspondantes |
| **6** | 🟠 Élevé | `style.css:1377-1380` (cell padding) + `.compare-wrap` | Tableau comparatif scrolle horizontalement sans indicateur visuel | Ajouter fade lateral + texte d'aide visible mobile uniquement |
| **7** | 🟠 Élevé | `script.js:54-72` | UA-detection écrit du FR en dur ("Télécharger pour macOS", "Bientôt sur mobile") | Utiliser le dict i18n pour récupérer les variants OU laisser les boutons d'origine et juste swap l'href |
| **8** | 🟠 Élevé | `index.html` brand link `<a href="#">` | Pas d'aria-label "Accueil" sur le logo | Ajouter `aria-label="LuxePOS — accueil"` traduit |
| **9** | 🟡 Moyen | `style.css:155-162` (brand-badge 0.65rem) | Texte sous 12px, illisible | Passer à 0.72rem min ou retirer du DOM en mobile |
| **10** | 🟡 Moyen | `style.css` (compare table) | Table sans `<caption>` ni résumé pour SR | Ajouter `<caption class="sr-only">LuxePOS vs Square / Lightspeed / Shopify…</caption>` |

### Bonus (faible)
- Sticky CTA mobile sur pricing : `bottom: 16px` peut chevaucher la safe-area iPhone — ajouter `padding-bottom: env(safe-area-inset-bottom)`
- `body::after` noise overlay dans pricing.css → ajouter aussi à index.html pour cohérence ?
- Préconnect manquant à `fonts.googleapis.com` (gain 50–100 ms TTI)

---

## 9. Synthèse exécutive

Le site est **visuellement très soigné** et **fortement aligné** avec l'identité de l'app Tauri (couleurs, typo, glassmorphism, mesh gradient, mockups fidèles). Le travail i18n est sérieux (4 langues, switcher visible) mais souffre de **trous critiques** :

1. **Skip-link non traduit** : invisible aux non-francophones utilisant un screen reader
2. **Aria-labels en FR pur** : la promesse "site 4 langues" n'est pas tenue côté assistance
3. **Pas de :focus-visible** : violation WCAG 2.4.7 directe
4. **Page disparaît si JS plante** : régression accessibilité grave

Les fixes sont **techniques et localisés** — pas de refonte design nécessaire. ~1h de travail pour passer de "joli mais cassé pour SR/EN/handicap" à "production WCAG 2.1 AA solide".
