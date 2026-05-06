# LuxePOS — Design System

> Documentation du système de design appliqué dans `luxepos-final.html`.
> Audit fait le 2026-05-06 via skill `design:design-system`.

## 🎨 Tokens — Variables CSS

### Couleurs

Toutes les couleurs principales passent par des **variables CSS** définies sur `:root` (mode clair) et surchargées par `body.dark-mode`.

#### Brand (5 thèmes via `body[data-theme="..."]`)
| Thème | --brand-main | --brand-dark | Mood |
|---|---|---|---|
| `emerald` (défaut) | #10b981 | #059669 | Frais, naturel — vert émeraude |
| `rosegold` | #e11d74 | #be185d | Féminin, joaillerie — rose magenta |
| `champagne` | #c9a227 | #a16207 | Luxe, doré |
| `onyx` | #475569 | #1e293b | Sobre, monochrome |
| `royal` | #3b82f6 | #1e40af | Corporate, confiance |

#### Backgrounds (light/dark theme-aware)
- `--bg-primary` : page background
- `--bg-secondary` : cards 2e niveau
- `--bg-tertiary` : panels les plus enfoncés
- `--glass-bg` : glassmorphism (rgba avec alpha bas)

#### Texte
- `--text-primary` : texte principal
- `--text-secondary` : texte de soutien (60-80% opacity)
- `--text-tertiary` : texte mineur (60% opacity)

#### Sémantique
- `--color-warning` : orange/amber (#f59e0b)
- `--color-danger` : red (#ef4444)
- Vert : passe par --brand-main quand thème emerald

### Espacement
Variables `--space-1` à `--space-8` (4px à 64px). Utilisées via `padding: var(--space-5)`.

### Border radius
- `--radius-sm` : 6px
- `--radius-md` : 12px
- `--radius-lg` : 18px
- `--radius-xl` : 24px

### Ombres
- `--shadow-color` : rgba(0,0,0,0.1) light / 0.3 dark
- Box-shadows : `0 4px 16px var(--shadow-color)` standard, `0 10px 30px` pour cards proéminentes

---

## 📐 Composants

### Boutons

#### `.btn-2026` (primary)
- Gradient brand, padding 8-12px, border-radius var(--radius-md)
- États : `:hover` (lift), `:active` (compress), `:disabled` (opacity 0.45 + grayscale)
- Variantes : `.btn-2026.secondary`, `.btn-2026.ghost`

#### Icon-only buttons
- `width: 44px; height: 44px; border-radius: 50%`
- Toujours `aria-label` + `title` pour accessibilité

### Cards

#### `.glass-card`
- `background: var(--glass-bg)`
- `backdrop-filter: blur(22px) saturate(1.35)` (renforcé si `body.glass-plus`)
- `border: 1px solid var(--border-color)`
- `border-radius: var(--radius-xl)`
- `padding: var(--space-5)` (20px)

#### `.stat-card-2026`
- Compact KPI card avec :
  - `.stat-label` (uppercase, opacity 0.6)
  - `.stat-value` (font-mono, font-weight 800, taille variable)
  - `.stat-trend` (badge ↑ ou ↓ %)

### Inputs
- `.glass-input` : background semi-transparent, focus ring brand
- `padding: 8-12px`, `border-radius: var(--radius-md)`

### Badges
- `.loyalty-badge` : Bronze/Argent/Or/Platine/Diamant (gradients métalliques)
- `.badge-2026.warning` / `.danger` / `.neutral` / `.success`

### Toasts
- `position: fixed`, slide-up animation
- 4 types : success (green), error (red), warning (orange), info (blue)
- Whitelist HTML : `<strong>/<b>/<em>/<i>/<br>` autorisés, reste échappé (XSS)
- `aria-live="polite"` (assertive pour error)

---

## 🅰️ Typographie

- **Body** : Inter Variable (100-900) via Google Fonts → préchargé
- **Display** (h1/h2 quand `body[data-display-font="on"]`) : Playfair Display
- Hauteurs harmonisées : `h1 = clamp(1.6rem, 3vw, 2.05rem)`, `font-weight: 800`, `letter-spacing: -0.02em`
- Numbers : `font-family: 'JetBrains Mono', 'SF Mono', monospace` pour les chiffres financiers

---

## ✨ Animations

- Spring : `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Standard ease : `cubic-bezier(0.16, 1, 0.3, 1)`
- Durées : 200ms (interactions), 300ms (panels), 600ms+ (count-up)
- **`@media (prefers-reduced-motion: reduce)`** : toutes les animations désactivées

---

## 🔍 Audit — Cohérences à améliorer

### ✅ Solide
- Variables CSS bien centralisées (`--brand-main`, `--bg-primary`, etc.)
- 5 thèmes fonctionnels avec switch dynamique (theme picker)
- Mode clair / sombre auto + manual override
- Focus visible WCAG 2.4.7
- Reduced motion (3 endroits)
- Échappement XSS (`esc()`, whitelist toast)
- Toggles a11y (haute lisibilité, contraste max)

### ⚠️ Tech debt connu

1. **73 occurrences de `#10b981` hardcodé** au lieu de `var(--brand-main)`. Fix : grep + replace, mais à tester thème par thème (risque de régression). Estimé 30 min + tests.

2. **Mix `style="..."` inline et classes Tailwind** : héritage de la dette accumulée. Beaucoup de fixes successifs ont ajouté du `style="background: var(--bg-tertiary)"` plutôt que créer une classe utilitaire. Pas critique mais alourdit le HTML.

3. **Plusieurs variantes de boutons sans nomenclature claire** : `.btn-2026`, `.btn-press`, `.glass-card` (utilisée comme bouton parfois). Convention à clarifier : `.btn-*` pour les boutons, `.card-*` pour les conteneurs.

4. **Pas de doc des composants** avant ce fichier. La classe UI géante (~25k lignes) rend l'inspection visuelle difficile. À découper (cf `UI_REFACTOR_PLAN.md`).

5. **Pas de Storybook ou catalogue visuel** : pour le moment, l'audit visuel se fait à l'œil sur l'app live. Un Storybook est probablement overkill pour single-user.

---

## 🛠️ Conventions à suivre pour ajouts futurs

1. **Toujours utiliser les variables CSS** pour les couleurs, espacements, radius
2. **Préférer une classe** (`.glass-card`) plutôt qu'`style="..."` inline pour les patterns récurrents
3. **Toute nouvelle catégorie de composant** → ajouter une section ici
4. **Pour les badges/statuts** → `.badge-2026.<variant>` (pas inventer une nouvelle classe)
5. **Échappement XSS systématique** (`esc()` sur toute donnée user dans innerHTML)
