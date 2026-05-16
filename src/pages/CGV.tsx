import { useEffect } from "react";
import { Link } from "react-router-dom";

const CGV = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#f2ead8", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", padding: "0 0 80px" }}>
      <style>{`
        .cgv-wrap { max-width: 760px; margin: 0 auto; padding: 60px 24px; }
        .cgv-wrap h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 7vw, 64px); color: #a78bfa; margin-bottom: 8px; }
        .cgv-wrap .updated { color: #666; font-size: 13px; margin-bottom: 48px; }
        .cgv-wrap h2 { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: #a78bfa; letter-spacing: 1px; margin: 40px 0 12px; }
        .cgv-wrap p { font-size: 15px; color: #bbb; line-height: 1.8; margin-bottom: 14px; }
        .cgv-wrap ul { padding-left: 24px; margin-bottom: 14px; }
        .cgv-wrap li { font-size: 15px; color: #bbb; line-height: 1.8; margin-bottom: 6px; }
        .cgv-back { display: inline-block; margin-bottom: 40px; color: #a78bfa; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; text-decoration: none; }
        .cgv-back:hover { opacity: 0.7; }
      `}</style>

      <div className="cgv-wrap">
        <Link to="/" className="cgv-back">← Retour à la page de vente</Link>

        <h1>Conditions Générales de Vente</h1>
        <p className="updated">Dernière mise à jour : mai 2025</p>

        <h2>1. Identification du vendeur</h2>
        <p>
          Système Pirate est une marque exploitée par un entrepreneur individuel.<br />
          Email de contact : <a href="mailto:support@systempirate.fr" style={{ color: "#a78bfa" }}>support@systempirate.fr</a>
        </p>

        <h2>2. Objet</h2>
        <p>Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits numériques (formations en ligne, guides, outils digitaux) proposés sur le site Système Pirate.</p>

        <h2>3. Produits et prix</h2>
        <p>Les produits commercialisés sont des formations et ressources digitales à téléchargement immédiat. Les prix sont indiqués en euros TTC. Système Pirate se réserve le droit de modifier ses tarifs à tout moment, sans préavis, les prix applicables étant ceux affichés au moment de la commande.</p>

        <h2>4. Commande et paiement</h2>
        <p>Le paiement est effectué en ligne par carte bancaire via Stripe (plateforme de paiement sécurisée). La commande est confirmée dès réception du paiement. Aucune commande n'est validée sans paiement préalable.</p>
        <p>Options de paiement disponibles :</p>
        <ul>
          <li>Paiement en 1 fois par carte bancaire</li>
          <li>Paiement en 3x sans frais via Klarna (selon disponibilité)</li>
        </ul>

        <h2>5. Accès au produit</h2>
        <p>Dès confirmation du paiement, l'accès à la formation est accordé immédiatement via l'espace membre en ligne. Les identifiants sont envoyés à l'adresse email fournie lors de la commande.</p>

        <h2>6. Droit de rétractation</h2>
        <p>Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques dont l'exécution a commencé avec l'accord préalable du consommateur et pour lesquels il a renoncé expressément à son droit de rétractation.</p>
        <p>En finalisant l'achat et en accédant immédiatement au contenu, l'acheteur reconnaît renoncer expressément à son droit de rétractation. <strong style={{ color: "#f2ead8" }}>Aucun remboursement ne sera accordé une fois l'accès au contenu fourni.</strong></p>

        <h2>7. Propriété intellectuelle</h2>
        <p>L'ensemble des contenus proposés (vidéos, textes, documents, outils) est protégé par le droit d'auteur. Toute reproduction, distribution ou revente, même partielle, est strictement interdite sans accord écrit préalable.</p>

        <h2>8. Responsabilité</h2>
        <p>Les résultats présentés sur la page de vente sont des témoignages individuels et ne constituent pas une garantie de résultats. Les performances dépendent de l'implication de chaque client. Système Pirate ne saurait être tenu responsable des résultats obtenus ou non obtenus par l'acheteur.</p>

        <h2>9. Service client</h2>
        <p>Pour toute question ou réclamation, contactez-nous à : <a href="mailto:support@systempirate.fr" style={{ color: "#a78bfa" }}>support@systempirate.fr</a></p>
        <p>Nous nous engageons à répondre dans un délai de 48h ouvrées.</p>

        <h2>10. Droit applicable</h2>
        <p>Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire.</p>
      </div>
    </div>
  );
};

export default CGV;
