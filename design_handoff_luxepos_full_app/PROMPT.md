# Prompt à coller dans Claude Code

> Copier-coller ce prompt en début de session dans Claude Code, après avoir extrait le zip à la racine du repo (ou ailleurs — adapter le chemin).

---

```
J'ai un dossier `design_handoff_luxepos_full_app/` qui contient une refonte complète de l'app LuxePOS sous forme de prototypes HTML/React. Tu vas implémenter ces designs dans le codebase existant.

## Étape 1 — Lecture
Avant d'écrire la moindre ligne de code :
1. Lis intégralement `design_handoff_luxepos_full_app/README.md`. C'est la source de vérité.
2. Regarde les 17 captures dans `design_handoff_luxepos_full_app/screenshots/` pour avoir une image mentale de chaque écran.
3. Lis `design_handoff_luxepos_full_app/design-system.css` pour mémoriser tous les tokens (couleurs, typo, espacements, rayons, ombres).
4. Parcours rapidement les `.jsx` du bundle pour comprendre la structure de chaque écran et les états locaux. Ces fichiers ne sont **pas** à copier — ils servent de référence visuelle et structurelle.
5. Inspecte le codebase actuel : framework utilisé, librairie de composants, système de routing, gestion d'état, conventions de fichiers, librairie d'icônes, système de theming.

Quand tu as fait ça, fais-moi un résumé court de :
- Le stack actuel du codebase
- Les écrans LuxePOS déjà présents dans le code (et lesquels sont nouveaux)
- Le plan d'implémentation que tu proposes (ordre, découpage en PRs/commits)

⚠️ N'écris pas encore de code. Attends ma validation du plan.

## Étape 2 — Design tokens
Une fois le plan validé, commence par porter le design system :
- Convertir `design-system.css` en config du projet (Tailwind theme, ou CSS variables, ou theme provider — selon ce qui est déjà en place)
- Charger les 3 fonts Google : Instrument Serif, Inter, JetBrains Mono
- Mettre en place les classes utilitaires équivalentes à `.ds-h1`, `.ds-h2`, `.ds-eyebrow`, `.ds-meta`, `.ds-num`, `.ds-pill`, `.ds-card`, etc.
- Créer / adapter les composants atomiques : Button (default/primary/accent/ghost + sm/lg), Input, Label, Card, Pill, Avatar, Logo

## Étape 3 — Composants chrome partagés
- Sidebar (200px, sections principal/boutique/admin, logo + nom boutique en haut, profil user en bas)
- Topbar (recherche pill + actions)
- PageHeader (eyebrow date · dot · titre H1 · sub · actions à droite)
- Stepper horizontal (utilisé par Onboarding et Add Product)
- Window chrome desktop (titlebar + body) — uniquement pour les démos / mode kiosk

## Étape 4 — Écrans, dans cet ordre
1. **Login** — simple, valide le design system
2. **Tableau de bord** — KPI hero + quick actions + checklist
3. **Caisse (POS)** — interaction la plus critique du métier
4. **Catalogue** — grille, états stock
5. **Stock** — table dense
6. **Ajouter une pièce** (desktop puis mobile) — flow critique avec photo + Lumi
7. **Clientèle**
8. **Ventes (historique)**
9. **Boîte de réception** — 3 colonnes + suggestions Lumi
10. **Lumi plein écran** — chat + cartes hypothèses
11. **Compta** — KPI + bar chart + top catégories + échéances
12. **Réglages** — formulaire boutique + horaires
13. **Onboarding** — 4 étapes, étape 3 montrée
14. **iPad — Caisse** — variante POS densifiée
15. **iPhone — Accueil**
16. **iPhone — Ajouter pièce avec photo** (overlay Lumi)
17. **iPhone — Lumi**

Pour chaque écran :
- Réutilise les composants atomiques portés à l'étape 2-3
- Respecte les tokens — pas de couleurs hardcodées hors du design system
- Reproduis fidèlement la hiérarchie typo (serif pour titres + chiffres, sans pour UI, mono pour eyebrows/meta)
- Garde le contenu fictif des captures pour les états vides — il sera remplacé par les vraies données plus tard
- Données fictives en français suisse : CHF avec apostrophe (1'234), TVA 7,7%, dates `27 avr.`, IBAN `CH93 …`
- Icônes : Lucide React (les noms sont compatibles à 95% — voir le tableau dans le README)

## Règles
- **Pas de copier-coller** des `.jsx` du bundle. Réimplémenter avec les patterns du codebase.
- Tester chaque écran après implémentation (visuellement + tests unitaires si présents)
- Une PR / commit par section logique
- Si un écran a une fonctionnalité backend qui n'existe pas (ex. Lumi suggestions), créer le composant front avec mock data + un TODO clair pour le hook backend à venir
- Si tu hésites sur un choix de design, **ouvre une discussion avant** d'implémenter — ne devine pas.

## Localisation
Tout en français suisse romand. Si i18n est en place, ajouter les clés sous `fr-CH/`.

C'est parti — commence par l'étape 1.
```
