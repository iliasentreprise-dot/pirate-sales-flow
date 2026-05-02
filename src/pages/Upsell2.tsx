import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Upsell2 = () => {
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

  const refuse = () => navigate(`/merci?token=${token}`);
  const [loadingUpsell, setLoadingUpsell] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const handleAccept = async () => {
    const email = window.sessionStorage.getItem("declic_email");
    if (!email) { navigate(`/merci?token=${token}`); return; }
    setLoadingUpsell(true);
    setPaymentError(false);
    try {
      const res = await fetch("https://tebqeeyvcgupwaoqfdod.supabase.co/functions/v1/charge-upsell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps",
        },
        body: JSON.stringify({ email, upsell_type: "upsell2" }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && data && data.success === true) {
        navigate(`/merci?token=${token}`);
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
        .u2-alert { background:linear-gradient(90deg,#0a4a8a,#1a6abf,#0a4a8a); color:white; text-align:center; padding:14px; font-family:'Bebas Neue',sans-serif; font-size:clamp(15px,3vw,20px); letter-spacing:2px; }
        .u2-hero { background:radial-gradient(ellipse at 50% 0%,rgba(42,138,255,0.2) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(10,74,138,0.15) 0%,transparent 50%),#0a0a0a; padding:60px 20px; text-align:center; border-bottom:2px solid rgba(42,138,255,0.2); position:relative; overflow:hidden; }
        .u2-hero::before { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,#2a8aff,transparent); animation:u2wave 3s infinite; }
        @keyframes u2wave { 0%,100%{opacity:0.5;transform:scaleX(0.8);} 50%{opacity:1;transform:scaleX(1.1);} }
        .u2-tag { display:inline-block; border:2px solid #2a8aff; color:#2a8aff; font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:4px; padding:8px 24px; margin-bottom:28px; }
        .u2-hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(50px,9vw,110px); line-height:0.9; color:white; margin-bottom:16px; }
        .u2-hero h1 .blue { color:#2a8aff; }
        .u2-hero h1 .gold { color:#f5c518; }
        .u2-hero .lead { font-size:clamp(17px,3vw,21px); color:#bbb; max-width:680px; margin:20px auto; line-height:1.65; }
        .u2-hero .lead strong { color:white; }
        .u2-hero .lead em { color:#2a8aff; font-style:normal; }
        .u2-fomo { background:rgba(42,138,255,0.06); border:1px solid rgba(42,138,255,0.2); color:#7ab8ff; font-size:14px; padding:14px 24px; max-width:600px; margin:24px auto 0; line-height:1.6; }
        .u2-section { max-width:860px; margin:0 auto; padding:70px 20px; }
        .u2-stag { font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:5px; color:#2a8aff; display:block; margin-bottom:14px; }
        .u2-section h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(34px,6vw,64px); color:white; line-height:1; margin-bottom:24px; }
        .u2-section h2 em { color:#2a8aff; font-style:normal; }
        .u2-section h2 span { color:#f5c518; }
        .u2-section p { font-size:17px; color:#bbb; line-height:1.75; margin-bottom:18px; }
        .u2-section p strong { color:white; }
        .u2-section p em { color:#2a8aff; font-style:normal; }
        .u2-dark { background:#111; border-top:1px solid rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.04); padding:70px 20px; }
        .u2-dark .inner { max-width:860px; margin:0 auto; }
        .u2-niches { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:40px 0; }
        @media (max-width:600px){ .u2-niches{grid-template-columns:1fr;} .u2-stats{grid-template-columns:1fr;} }
        .u2-niche { background:rgba(42,138,255,0.04); border:1px solid rgba(42,138,255,0.15); border-top:3px solid #2a8aff; padding:30px 20px; text-align:center; position:relative; overflow:hidden; }
        .u2-niche::before { content:'?'; position:absolute; font-family:'Bebas Neue',sans-serif; font-size:120px; color:rgba(42,138,255,0.05); top:-10px; left:50%; transform:translateX(-50%); }
        .u2-niche .num { font-family:'Bebas Neue',sans-serif; font-size:14px; color:#2a8aff; letter-spacing:3px; margin-bottom:12px; display:block; }
        .u2-niche h3 { font-family:'Bebas Neue',sans-serif; font-size:24px; color:white; margin-bottom:10px; letter-spacing:1px; }
        .u2-niche p { font-size:13px; color:#666; line-height:1.5; }
        .u2-locked { display:inline-block; background:rgba(42,138,255,0.1); border:1px solid rgba(42,138,255,0.3); color:#2a8aff; font-size:11px; letter-spacing:2px; padding:4px 12px; margin-top:12px; text-transform:uppercase; }
        .u2-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); margin:40px 0; }
        .u2-stat { background:#0a0a0a; padding:28px 16px; text-align:center; }
        .u2-stat .n { font-family:'Bebas Neue',sans-serif; font-size:52px; color:#2a8aff; line-height:1; }
        .u2-stat .l { font-size:12px; color:#555; margin-top:6px; text-transform:uppercase; letter-spacing:1px; }
        .u2-cta { text-align:center; padding:70px 20px; max-width:700px; margin:0 auto; }
        .u2-pcross { font-size:20px; color:#555; text-decoration:line-through; margin-bottom:6px; }
        .u2-pmain { font-family:'Bebas Neue',sans-serif; font-size:90px; color:#f5c518; line-height:1; letter-spacing:-3px; }
        .u2-pnote { font-size:14px; color:#555; margin:8px 0 32px; }
        .u2-yes { display:block; background:linear-gradient(135deg,#0a4a8a,#1a6abf); color:white; font-family:'Bebas Neue',sans-serif; font-size:clamp(18px,3.5vw,28px); letter-spacing:2px; padding:22px 40px; text-decoration:none; border:none; cursor:pointer; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); box-shadow:0 8px 50px rgba(42,138,255,0.4); animation:u2pulse 2s infinite; margin-bottom:16px; width:100%; }
        @keyframes u2pulse { 0%,100%{box-shadow:0 8px 50px rgba(42,138,255,0.4);} 50%{box-shadow:0 8px 70px rgba(42,138,255,0.7);} }
        .u2-no { display:block; font-size:13px; color:#333; text-decoration:underline; cursor:pointer; margin-top:16px; background:none; border:none; width:100%; text-align:center; }
        .u2-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(42,138,255,0.15),transparent); }
      `}</style>

      <div className="u2-alert">🌊 ATTENDS — CETTE PAGE DISPARAÎTRA À TOUT JAMAIS DÈS QUE TU LA QUITTES 🌊</div>

      <div className="u2-hero">
        <div className="u2-tag">🌊 LES 3 NICHES QUE JE GARDE POUR MOI DEPUIS 1 AN</div>
        <h1>L'<span className="blue">Océan</span><br /><span className="gold">Bleu</span></h1>
        <p className="lead">Zéro concurrence. <em>Des ventes avec 300 vues.</em><br />Les 3 niches secrètes que j'utilise depuis plus d'un an — et que je n'ai <strong>jamais montrées à personne.</strong></p>
        <div className="u2-fomo">🌊 Ces 3 niches sont mon avantage concurrentiel depuis 1 an. Je les révèle uniquement sur cette page, uniquement aujourd'hui. Dès que tu pars, cette information disparaît pour toujours.</div>
      </div>

      <div className="u2-divider"></div>

      <div className="u2-section">
        <span className="u2-stag">🌊 POURQUOI L'OCÉAN BLEU</span>
        <h2>Pendant que tout le monde<br />se bat dans <em>l'océan rouge</em>...</h2>
        <p>La fitness. Le développement personnel. Le make money online. Des milliers de personnes vendent la même chose, sur les mêmes niches, avec les mêmes contenus. <strong>Résultat : tout le monde se noie.</strong></p>
        <p>Moi j'ai fait différemment. J'ai cherché les niches où <em>personne ne va</em>. Des niches avec une demande réelle, des gens qui paient, et quasiment aucun vendeur en face.</p>
        <p>Le résultat ? <strong>Des ventes avec seulement 300 vues par TikTok.</strong> Pas besoin d'audience massive. Pas besoin de se battre. L'océan est vide — et les poissons sont là.</p>
        <p>Ces 3 niches, je les ai gardées secrètes pendant plus d'un an. Je les utilise pour mes propres comptes. Aujourd'hui, uniquement sur cette page, je lève le voile.</p>
      </div>

      <div className="u2-divider"></div>

      <div className="u2-dark">
        <div className="inner">
          <span className="u2-stag">🔒 LES 3 NICHES SECRÈTES</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(34px,6vw,64px)", color: "white", lineHeight: 1, marginBottom: 24 }}>Elles génèrent <span style={{ color: "#f5c518" }}>10K+/mois</span><br />pour quiconque les connaît.</h2>
          <div className="u2-niches">
            <div className="u2-niche"><span className="num">NICHE 01</span><h3>🔒 Cachée</h3><p>Demande massive, zéro vendeur en face. Des ventes dès les premiers carrousels.</p><div className="u2-locked">Accès après paiement</div></div>
            <div className="u2-niche"><span className="num">NICHE 02</span><h3>🔒 Cachée</h3><p>Une niche que personne ne pense à cibler. Pourtant les gens cherchent et paient.</p><div className="u2-locked">Accès après paiement</div></div>
            <div className="u2-niche"><span className="num">NICHE 03</span><h3>🔒 Cachée</h3><p>Celle qui m'a rapporté le plus. Aucune concurrence. Conversion maximale.</p><div className="u2-locked">Accès après paiement</div></div>
          </div>
          <div className="u2-stats">
            <div className="u2-stat"><div className="n">300</div><div className="l">vues suffisent pour vendre</div></div>
            <div className="u2-stat"><div className="n">0</div><div className="l">concurrents dans ces niches</div></div>
            <div className="u2-stat"><div className="n">10K+</div><div className="l">par mois atteignable</div></div>
          </div>
        </div>
      </div>

      <div className="u2-divider"></div>

      <div className="u2-section">
        <span className="u2-stag">⚠️ POURQUOI MAINTENANT</span>
        <h2>Dès que trop de monde<br />connaît une niche —<br /><em>elle est morte.</em></h2>
        <p>C'est pour ça que je ne les montre jamais. C'est pour ça qu'elles fonctionnent encore aussi bien après un an. Plus les gens les connaissent, moins elles sont efficaces.</p>
        <p><strong>Aujourd'hui je fais une exception unique.</strong> Ces 3 niches sont accessibles uniquement sur cette page, uniquement maintenant. Si tu pars, cette page disparaît. Pas de deuxième chance. Pas de replay. Jamais.</p>
      </div>

      <div className="u2-cta">
        <span className="u2-stag" style={{ display: "block", marginBottom: 16 }}>🌊 ACCÈS IMMÉDIAT</span>
        <div className="u2-pcross">Valeur réelle : 347€</div>
        <div className="u2-pmain">87€</div>
        <div className="u2-pnote">Uniquement sur cette page · Disparaît dès que tu pars</div>
        <button type="button" className="u2-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🌊 OUI — JE VEUX LES 3 NICHES SECRÈTES"}</button>
        <div style={{ fontSize: 12, color: "#333", marginTop: 10 }}>🔒 Paiement sécurisé via Stripe · Accès immédiat</div>
        {paymentError && (
          <p style={{ color: "#e8110a", fontWeight: 700, textAlign: "center", marginTop: 16, fontSize: 16 }}>
            ❌ Paiement refusé, veuillez vérifier votre carte ou contacter votre banque.
          </p>
        )}
        <button onClick={refuse} style={{ background: "#ffffff", color: "#000000", border: "1px solid #cccccc", borderRadius: "4px", padding: "12px 24px", fontSize: "13px", cursor: "pointer", marginTop: "16px", display: "inline-block" }}>Non merci, je préfère rester sur les niches saturées et laisser cette opportunité partir pour toujours</button>
      </div>
    </div>
  );
};

export default Upsell2;
