## Modifications dans `src/pages/Orderbump.tsx`

Une seule cible : remplacer la section paiement Stripe par deux liens directs. Aucun autre fichier touché.

### 1. Supprimer les imports Stripe (lignes 1-9)
Enlever : `loadStripe`, `Elements`, `PaymentElement`, `useStripe`, `useElements`, ainsi que `FormEvent` (plus utilisé). Garder `useState`, `useEffect`, `supabase`, et les imports d'images bonus.

### 2. Supprimer les constantes Stripe (lignes 13-16)
Retirer `STRIPE_PK` et `stripePromise`.

### 3. Supprimer le composant `PaymentForm` (lignes 41-187)
Bloc entier retiré (champs prénom/email, banner Klarna, PaymentElement, bouton submit).

### 4. Supprimer le composant `CheckoutSection` (lignes 189-257)
Bloc entier retiré (création du PaymentIntent, wrapper `<Elements>`).

### 5. Remplacer l'appel `<CheckoutSection .../>` (ligne 441)
Juste après le `</div>` de fermeture de `.ob-order-summary`, insérer :

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
  <a href="https://buy.stripe.com/dRmfZjgsocRMdRK2xe8IU0n" className="ob-pay-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
    ☠️ PAYER 144€ ET ACCÉDER MAINTENANT
  </a>
  <a href="https://buy.stripe.com/aFacN73FCcRM14Yc7O8IU07" className="ob-pay-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', background: 'transparent', border: '2px solid #7c3aed', color: '#a78bfa', boxShadow: 'none', animation: 'none' }}>
    ☠️ PAYER 97€ SANS LES LOGICIELS
  </a>
</div>
```

### Conservé intact
- Hero, bump box, toggle bump, récapitulatif de commande
- `CountdownTimer`, le state `bumpAdded`/`total`, `useEffect` de scroll
- Tout le bloc CSS `<style>` (les classes `.ob-pay-btn`, `.ob-field`, `.ob-card-wrap` restent — non-utilisées mais non-supprimées comme demandé)
- Les imports d'assets bonus
