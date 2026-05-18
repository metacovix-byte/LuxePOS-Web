# Waitlist Pro 2027 — Setup pas-à-pas

> Guide pour activer le formulaire de la page `waitlist.html` afin qu'il collecte vraiment des emails (et pas dans le vide).

**Fichier à modifier** : `website/waitlist.html`
**Recherche** : la chaîne `YOUR_FORM_ID_HERE`
**Temps estimé** : 5 minutes (création de compte + collage de l'ID)

---

## 1. Pourquoi Formspree plutôt que Google Forms / Tally / Mailchimp

| Critère | Formspree (free) | Google Forms | Tally (free) | Buttondown | Mailchimp (free) |
|---|---|---|---|---|---|
| **Soumissions/mois (free)** | 50 | illimité | illimité | 100 abonnés | 500 contacts |
| **Form custom (HTML)** | ✅ natif | ❌ iframe imposée | ✅ embed | ✅ natif | ❌ pop-up payant |
| **Identité visuelle** | ✅ 100% libre | ❌ Google look | ✅ libre | ✅ libre | ⚠️ logo MC en bas |
| **Export CSV** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Honeypot anti-spam** | ✅ `_gotcha` | n/a (capcha) | ✅ | ✅ | ✅ |
| **Notif email à chaque envoi** | ✅ | ⚠️ via add-on | ✅ | ✅ | ❌ |
| **Pas de tracker tiers** | ✅ | ❌ Google | ✅ | ✅ | ❌ |
| **Pas de pub plateforme** | ✅ | ✅ | ✅ | ✅ | ❌ |

**Verdict pour LuxePOS** : Formspree gagne — 50 soumissions/mois c'est large pour démarrer une waitlist de 50 places, le HTML est 100% libre (donc identité visuelle préservée), et il n'y a pas de cookies tiers Google à charger.

Si tu dépasses 50/mois (joli problème), tu passes au plan payant à **10 $/mois** (1 000 soumissions) ou tu bascules sur Buttondown (excellent aussi pour transformer la liste en vraie newsletter).

---

## 2. Procédure d'activation (pas-à-pas)

### Étape 1 — Créer un compte Formspree

1. Aller sur [formspree.io/register](https://formspree.io/register)
2. Choisir **Sign up with email** (ou GitHub si tu préfères)
3. Utiliser **metacovix@gmail.com** (cohérence avec le reste du projet)
4. Confirmer l'email reçu
5. Sur le dashboard, le plan **Free** est actif par défaut — pas besoin de carte bancaire

### Étape 2 — Créer le formulaire "waitlist"

1. Dans le dashboard, cliquer **+ New Form**
2. **Form name** : `LuxePOS Pro 2027 Waitlist`
3. **Send submissions to** : `metacovix@gmail.com` (tu peux ajouter une 2e adresse plus tard)
4. Cliquer **Create Form**
5. Une page apparaît avec un endpoint genre :
   ```
   https://formspree.io/f/moqgrwpa
   ```
   Le segment final (`moqgrwpa` dans cet exemple) c'est ton **Form ID**.

### Étape 3 — Coller l'ID dans le fichier waitlist.html

1. Ouvrir `website/waitlist.html` dans ton éditeur
2. Chercher (Ctrl+F) : `YOUR_FORM_ID_HERE`
3. Tu devrais trouver cette ligne :
   ```html
   <form class="waitlist-form glass-panel"
         action="https://formspree.io/f/YOUR_FORM_ID_HERE"
         method="POST"
         novalidate>
   ```
4. Remplacer **uniquement** `YOUR_FORM_ID_HERE` par ton vrai ID, par exemple :
   ```html
   action="https://formspree.io/f/moqgrwpa"
   ```
5. Sauvegarder, commit, push → GitHub Pages redéploie automatiquement (~1 minute)

### Étape 4 — Test end-to-end

1. Ouvrir `https://metacovix-byte.github.io/LuxePOS-Web/website/waitlist.html`
2. Remplir le form avec un email test (le tien)
3. Cliquer **Réserve ma place**
4. **Premier envoi uniquement** : Formspree envoie un email de confirmation à `metacovix@gmail.com` avec un bouton "Confirm your form". Cliquer dessus, sinon les futurs envois sont bloqués.
5. Le navigateur redirige vers `waitlist-success.html` → message "Merci ! Tu es dans la liste."
6. Vérifier ta boîte : un email arrive avec le contenu du form.
7. Tester aussi un **email invalide** (genre `pas-un-email`) → HTML5 doit bloquer le submit ✅

---

## 3. Récupérer les emails collectés (export CSV)

Quand tu veux envoyer la notif de lancement Pro :

1. Aller sur [formspree.io](https://formspree.io) → dashboard
2. Cliquer sur le form **LuxePOS Pro 2027 Waitlist**
3. Onglet **Submissions** → liste toutes les inscriptions avec date
4. Bouton **Export → CSV** en haut à droite
5. Le CSV contient : `firstName`, `email`, `consent`, `submitted_at`
6. Ouvrir dans Excel ou Google Sheets pour rédiger ton mail de masse

**Astuce** : tu peux aussi mettre Buttondown ou ConvertKit en aval pour gérer la diffusion proprement (avec lien de désinscription auto). À ce moment-là, importe le CSV Formspree dans Buttondown.

---

## 4. Honeypot anti-spam — déjà en place

Le form contient déjà :

```html
<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" style="...">
```

Formspree connaît la convention `_gotcha` : si ce champ est rempli (= bot qui remplit aveuglément tous les inputs), la soumission est **silencieusement ignorée** côté serveur. Aucun captcha visible pour les humaines. ✅

Si tu veux durcir (rare avant 50 soumissions/mois), tu peux activer **reCAPTCHA invisible** dans les settings Formspree — mais ça ajoute un script Google que tu ne charges pas pour l'instant. À éviter sauf afflux de spam.

---

## 5. Alternatives si tu changes d'avis

### Google Forms (le plus simple, mais look Google)

1. forms.google.com → nouveau formulaire avec 2 questions (Prénom, Email)
2. Copier le lien de partage → mettre dans `action="..."` (mais l'iframe Google est moche, donc plutôt remplacer la section form par un lien externe)
3. Ne marche pas pour garder l'identité visuelle LuxePOS — donc à éviter

### Tally (alternative jolie)

1. tally.so → free tier illimité, customisation OK
2. Créer un form, copier l'endpoint embed
3. Plus de flexibilité que Google Forms, mais le HTML doit être adapté

### Buttondown (si tu veux une vraie newsletter direct)

1. buttondown.email → free jusqu'à 100 abonnés
2. Permet d'envoyer des emails de masse depuis l'app, avec markdown
3. Endpoint compatible : `https://buttondown.email/api/emails/embed-subscribe/<username>`
4. Bon choix si tu veux dès maintenant pouvoir envoyer un mail à toute la liste depuis le dashboard

---

## 6. Configuration avancée Formspree

Dans **Settings** du form :

- **Allowed domains** : ajouter `metacovix-byte.github.io` et `localhost` (pour tests). Bloque les soumissions venant d'autres domaines copiant ton form.
- **reCAPTCHA** : laisser OFF tant que pas de spam massif.
- **Email notifications** : activer "Send a copy to submitter" si tu veux qu'elle reçoive un mail de confirmation auto (à activer plus tard quand tu auras rédigé un mail de confirmation).
- **Spam filter** : laisser sur "Default" — bloque déjà 95% du spam.

---

## 7. Coût total sur la durée

| Période | Soumissions estimées | Plan |
|---|---|---|
| **Juin 2026 → Juin 2027** | 20-50 (early adopters) | Free (0 €) |
| **Juin 2027 (launch Pro)** | éventuellement 200+ en 1 mois | Basic 10 $/mois (1 mois suffit) |
| **Après launch** | flux résiduel | Free suffit |

**Coût total prévu : 0 à 10 $ sur 18 mois.**

---

## 8. Désinscription (RGPD-friendly)

Le fineprint du form promet "désinscription en 1 click". Pour tenir la promesse :

- Dans chaque email envoyé à la liste, ajouter un lien `mailto:metacovix@gmail.com?subject=Désinscription waitlist`
- Tenir une liste manuelle des unsubscribes (juste un fichier `.txt` ou tag dans Buttondown)
- Avant chaque mail de masse, filtrer le CSV Formspree par cette liste

Quand Pro sera lancé, **supprimer définitivement les emails non-souscrits** du dashboard Formspree (bouton **Delete submission**). Cohérent avec le consentement coché par l'utilisatrice : "email conservé jusqu'au lancement de Pro, puis supprimé si je ne souscris pas".

---

## 9. Suivi du compteur visible sur la page

La page `waitlist.html` affiche `0 / 50` en dur dans le HTML. Pour faire évoluer ce nombre :

1. Une fois par mois, va sur Formspree dashboard → noter le total
2. Éditer la ligne dans `website/waitlist.html` :
   ```html
   <div class="waitlist-counter-number" aria-hidden="true">0 / 50</div>
   ```
3. Idem pour la chaîne traduite `waitlistPage.counterText` dans `website/i18n.js` (4 langues)
4. Commit + push → MAJ visible en ~1 minute

Si tu veux automatiser plus tard : Formspree expose une API REST, mais pour ~50 inscriptions max, c'est de la sur-ingénierie. Mise à jour manuelle mensuelle largement suffisante.

---

## 10. Récap : ce qui est déjà en place

✅ `website/waitlist.html` — page complète avec form, benefits, counter
✅ `website/waitlist-success.html` — page de remerciement post-submit
✅ `website/pricing.css` — styles `.waitlist-form`, `.form-input`, `.form-checkbox`, `.form-submit`, `.benefit-card`, `.waitlist-counter`
✅ `website/i18n.js` — 4 langues complètes (FR, EN, DE, IT) avec ~25 chaînes par langue
✅ Honeypot `_gotcha` invisible déjà inséré
✅ Validation HTML5 native (`type=email required`)
✅ Loading state JS au submit (spinner sur le bouton)
✅ Validation visuelle en temps réel (focus émeraude, invalid rouge subtil)
✅ Liens vers waitlist depuis index.html, pricing.html, et boutons "Bientôt" de pricing
✅ Aucun tracker tiers (pas de reCAPTCHA, pas de GA, pas de Hotjar)

**Reste à faire** : juste remplacer `YOUR_FORM_ID_HERE` dans `waitlist.html` 🎯
