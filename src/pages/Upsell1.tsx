import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Upsell1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetch(
      "https://tebqeeyvcgupwaoqfdod.supabase.co/functions/v1/validate-upsell-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps",
        },
        body: JSON.stringify({ token }),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.valid) navigate("/");
      });
  }, [token]);

  const refuse = () => navigate(`/upsell2?token=${token}`);
  const [loadingUpsell, setLoadingUpsell] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const handleAccept = async () => {
    const email = window.sessionStorage.getItem("declic_email");
    if (!email) { navigate(`/upsell2?token=${token}`); return; }
    setLoadingUpsell(true);
    setPaymentError(false);
    try {
      const res = await fetch("https://tebqeeyvcgupwaoqfdod.supabase.co/functions/v1/charge-upsell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps",
        },
        body: JSON.stringify({ email, upsell_type: "upsell1" }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && data && data.success === true) {
        navigate(`/upsell2?token=${token}`);
      } else {
        setPaymentError(true);
        setLoadingUpsell(false);
      }
    } catch {
      setPaymentError(true);
      setLoadingUpsell(false);
    }
  };

  return (
    <div style={{ background: "#0a0a0a", color: "#f2ead8", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        .u1-alert { background:#e8110a; color:white; text-align:center; padding:14px 20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(16px,3vw,22px); letter-spacing:2px; animation:u1blink 2s infinite; }
        @keyframes u1blink { 0%,100%{background:#e8110a;} 50%{background:#b50d08;} }
        .u1-hero { background:radial-gradient(ellipse at 50% 0%,rgba(232,17,10,0.2) 0%,transparent 60%),#0a0a0a; padding:60px 20px; text-align:center; border-bottom:2px solid rgba(255,255,255,0.06); }
        .u1-fomo { display:inline-block; border:2px solid #e8110a; color:#e8110a; font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:4px; padding:8px 24px; margin-bottom:30px; animation:u1border 1.5s infinite; }
        @keyframes u1border { 0%,100%{border-color:#e8110a;color:#e8110a;} 50%{border-color:#ff4444;color:#ff4444;} }
        .u1-hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(48px,9vw,100px); line-height:0.95; color:white; margin-bottom:16px; }
        .u1-hero h1 span { color:#f5c518; display:block; }
        .u1-hero h1 em { color:#e8110a; font-style:normal; }
        .u1-hero .lead { font-size:clamp(17px,3vw,22px); color:#bbb; max-width:700px; margin:20px auto; line-height:1.6; }
        .u1-hero .lead strong { color:white; }
        .u1-disappear { background:rgba(232,17,10,0.08); border:1px solid rgba(232,17,10,0.25); color:#e87070; font-size:14px; padding:14px 24px; max-width:600px; margin:24px auto 0; line-height:1.6; }
        .u1-section { max-width:860px; margin:0 auto; padding:70px 20px; }
        .u1-tag { font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:5px; color:#e8110a; display:block; margin-bottom:14px; }
        .u1-section h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(34px,6vw,64px); color:white; line-height:1; margin-bottom:24px; }
        .u1-section h2 em { color:#f5c518; font-style:normal; }
        .u1-section h2 span { color:#e8110a; }
        .u1-section p { font-size:17px; color:#bbb; line-height:1.75; margin-bottom:18px; }
        .u1-section p strong { color:white; }
        .u1-section p em { color:#f5c518; font-style:normal; }
        .u1-dark { background:#1a1a1a; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05); padding:70px 20px; }
        .u1-dark .inner { max-width:860px; margin:0 auto; }
        .u1-todo { list-style:none; margin:36px 0; display:grid; gap:14px; padding:0; }
        .u1-todo li { display:flex; align-items:flex-start; gap:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-left:3px solid #f5c518; padding:18px 20px; font-size:16px; color:#ccc; line-height:1.5; }
        .u1-todo li .icon { font-size:22px; flex-shrink:0; margin-top:2px; }
        .u1-todo li strong { color:white; display:block; margin-bottom:4px; }
        .u1-youdo { background:rgba(232,17,10,0.05); border:1px solid rgba(232,17,10,0.15); padding:24px 28px; margin:30px 0; text-align:center; }
        .u1-youdo p { font-family:'Bebas Neue',sans-serif; font-size:clamp(24px,4vw,40px); color:white; letter-spacing:1px; margin:0; }
        .u1-youdo p span { color:#e8110a; }
        .u1-guarantee { background:linear-gradient(135deg,#120f00,#0a0a0a); border:2px solid #f5c518; padding:30px; margin:40px 0; text-align:center; }
        .u1-guarantee .gt { font-family:'Bebas Neue',sans-serif; font-size:32px; color:#f5c518; margin-bottom:12px; letter-spacing:2px; }
        .u1-guarantee p { font-size:16px; color:#bbb; max-width:500px; margin:0 auto; line-height:1.7; }
        .u1-guarantee p strong { color:white; }
        .u1-cta { text-align:center; padding:70px 20px; max-width:700px; margin:0 auto; }
        .u1-pcross { font-size:20px; color:#555; text-decoration:line-through; margin-bottom:6px; }
        .u1-pmain { font-family:'Bebas Neue',sans-serif; font-size:90px; color:#f5c518; line-height:1; letter-spacing:-3px; }
        .u1-pnote { font-size:14px; color:#666; margin:8px 0 32px; }
        .u1-yes { display:block; background:#e8110a; color:white; font-family:'Bebas Neue',sans-serif; font-size:clamp(20px,4vw,32px); letter-spacing:2px; padding:22px 40px; text-decoration:none; border:none; cursor:pointer; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); box-shadow:0 8px 50px rgba(232,17,10,0.5); animation:u1pulse 2s infinite; margin-bottom:16px; width:100%; }
        @keyframes u1pulse { 0%,100%{box-shadow:0 8px 50px rgba(232,17,10,0.5);} 50%{box-shadow:0 8px 70px rgba(232,17,10,0.8);} }
        .u1-no { display:block; font-size:13px; color:#444; text-decoration:underline; cursor:pointer; margin-top:16px; background:none; border:none; width:100%; text-align:center; }
        .u1-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); }
      `}</style>

      <div className="u1-alert">⚠️ ATTENDS — NE PARS PAS · CETTE PAGE DISPARAÎTRA À TOUT JAMAIS ⚠️</div>

      <div className="u1-hero">
        <div className="u1-fomo">🏴‍☠️ OFFRE UNIQUE — VISIBLE UNE SEULE FOIS</div>
        <h1>Pirate<span>En Bande</span><em>Organisée</em></h1>
        <p className="lead">Tu viens d'acquérir la méthode. Maintenant imagine que <strong>je fasse tout à ta place.</strong><br />Le produit. Le tunnel. Le contenu. La stratégie. Tout.</p>
        <div className="u1-disappear">⚠️ Cette page n'existera plus dans quelques secondes dès que tu la quittes. Impossible d'y revenir. C'est maintenant ou jamais.</div>
      </div>

      <div className="u1-divider"></div>

      <div className="u1-section">
        <span className="u1-tag">☠ CE QUE C'EST</span>
        <h2>Je travaille <em>à ta place.</em><br />Tu encaisses <span>les résultats.</span></h2>
        <p>Tu as la méthode. Mais je sais que la partie la plus difficile c'est de passer à l'action. Trouver la bonne niche. Créer l'offre parfaite. Monter le funnel. Produire le contenu qui vend.</p>
        <p><strong>Et si tu n'avais pas à faire tout ça ?</strong></p>
        <p>Avec "Pirate en Bande Organisée", on travaille main dans la main. Sauf que c'est moi qui fais le gros du travail. J'ai plus d'un an d'expérience, une vingtaine de comptes TikTok actifs, et je sais <em>exactement</em> ce qui fonctionne et ce qui ne fonctionne pas.</p>
        <p>Toi tu fournis l'envie. Moi je fournis le reste.</p>
      </div>

      <div className="u1-divider"></div>

      <div className="u1-dark">
        <div className="inner">
          <span className="u1-tag">⚓ CE QUE JE FAIS À TA PLACE</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(34px,6vw,64px)", color: "white", lineHeight: 1, marginBottom: 24 }}>Zéro produit à créer.<br />Zéro funnel à monter.<br /><em style={{ color: "#f5c518", fontStyle: "normal" }}>Zéro prise de tête.</em></h2>
          <ul className="u1-todo">
            <li><span className="icon">🎯</span><div><strong>Je choisis ta niche et ton produit</strong>Je sélectionne pour toi la niche qui vend le mieux avec le moins d'effort possible. Pas n'importe laquelle — celle qui correspond à ton profil et qui convertit.</div></li>
            <li><span className="icon">📦</span><div><strong>Je crée ton produit digital</strong>Ebook, mini-formation, guide — je m'occupe de tout. Structure, contenu, design. Tu reçois un produit prêt à vendre.</div></li>
            <li><span className="icon">🔧</span><div><strong>Je monte ton tunnel de vente complet</strong>Page de vente, prise de paiement, livraison automatique. Tout est en place avant même que tu commences à poster.</div></li>
            <li><span className="icon">🎬</span><div><strong>Je te donne les idées de contenu</strong>Les angles, les hooks, les structures de carrousels qui convertissent. Tu n'as plus qu'à appliquer ce que je te donne.</div></li>
            <li><span className="icon">💬</span><div><strong>Je reste à tes côtés jusqu'aux résultats</strong>Accès direct, suivi personnalisé, on avance ensemble jusqu'à ce que les ventes tombent.</div></li>
          </ul>
          <div className="u1-youdo"><p>Toi, tu n'as qu'à <span>poster le contenu.</span><br />Le reste, c'est mon problème.</p></div>
          <div className="u1-guarantee">
            <div className="gt">☠️ GARANTI 1000€ / SEMAINE</div>
            <p>Si en appliquant ce qu'on met en place ensemble tu ne génères pas <strong>au moins 1000€ la première semaine</strong>, je continue à t'accompagner gratuitement jusqu'à ce que ce soit le cas. Sans limite de temps.</p>
          </div>
        </div>
      </div>

      <div className="u1-divider"></div>

      <div className="u1-cta">
        <span className="u1-tag" style={{ display: "block", marginBottom: 16 }}>⚡ ACCÈS IMMÉDIAT</span>
        <div className="u1-pcross">Valeur réelle : 1997€</div>
        <div className="u1-pmain">127€</div>
        <div className="u1-pnote">Uniquement sur cette page · Jamais reproposé à ce prix</div>
        <button type="button" className="u1-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX QUE TU FASSES TOUT À MA PLACE"}</button>
        <div style={{ fontSize: 12, color: "#333", marginTop: 10 }}>🔒 Paiement sécurisé via Stripe · Accès immédiat</div>
        {paymentError && (
          <p style={{ color: "#e8110a", fontWeight: 700, textAlign: "center", marginTop: 16, fontSize: 16 }}>
            ❌ Paiement refusé, veuillez vérifier votre carte ou contacter votre banque.
          </p>
        )}
        <button onClick={refuse} style={{ background: "#ffffff", color: "#000000", border: "1px solid #cccccc", borderRadius: "4px", padding: "12px 24px", fontSize: "13px", cursor: "pointer", marginTop: "16px", display: "inline-block" }}>Non merci, je préfère tout faire seul et passer à côté de cette opportunité</button>
      </div>
    </div>
  );
};

export default Upsell1;
