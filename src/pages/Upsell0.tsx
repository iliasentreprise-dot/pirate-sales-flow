import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import tiktokLiveImg from "@/assets/tiktok-live-2037.jpg";

const Upsell0 = () => {
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
  const [secondsLeft, setSecondsLeft] = useState(660);
  const [loadingUpsell, setLoadingUpsell] = useState(false);
  const [imgZoom, setImgZoom] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const handleAccept = async () => {
    const email = window.sessionStorage.getItem("declic_email");
    if (!email) {
      navigate(`/upsell1?token=${token}`);
      return;
    }
    setLoadingUpsell(true);
    setPaymentError(false);
    try {
      const res = await fetch("https://tebqeeyvcgupwaoqfdod.supabase.co/functions/v1/charge-upsell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps",
        },
        body: JSON.stringify({ email, upsell_type: "upsell0" }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && data && data.success === true) {
        navigate(`/upsell1?token=${token}`);
      } else {
        setPaymentError(true);
        setLoadingUpsell(false);
      }
    } catch {
      setPaymentError(true);
      setLoadingUpsell(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          navigate(`/upsell1?token=${token}`);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [navigate]);

  const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");

  const goRefuse = () => navigate(`/upsell1?token=${token}`);

  return (
    <div style={{ background: "#0a0a0a", color: "#f2ead8", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        .u0 { --black:#0a0a0a; --red:#e8110a; --gold:#f5c518; --cream:#f2ead8; --grey:#1a1a1a; }
        .u0 * { box-sizing:border-box; }

        .u0-alert { background:#e8110a; color:white; text-align:center; padding:14px 20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(14px,3vw,20px); letter-spacing:2px; animation:u0blink 1.5s infinite; }
        @keyframes u0blink { 0%,100%{background:#e8110a;} 50%{background:#b50d08;} }

        .u0-hero { background:radial-gradient(ellipse at 50% 0%,rgba(232,17,10,0.2) 0%,transparent 60%),#0a0a0a; padding:60px 20px; text-align:center; border-bottom:2px solid rgba(255,255,255,0.06); }
        .u0-fomo { display:inline-block; border:2px solid #e8110a; color:#e8110a; font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:4px; padding:8px 24px; margin-bottom:30px; animation:u0border 1.5s infinite; }
        @keyframes u0border { 0%,100%{border-color:#e8110a;color:#e8110a;} 50%{border-color:#ff4444;color:#ff4444;} }
        .u0-hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(40px,8vw,90px); line-height:0.95; color:white; margin:0 0 16px; }
        .u0-hero h1 span { color:#f5c518; display:block; }
        .u0-hero h1 em { color:#e8110a; font-style:normal; }
        .u0-hero .lead { font-size:clamp(16px,3vw,20px); color:#bbb; max-width:700px; margin:20px auto; line-height:1.65; }
        .u0-hero .lead strong { color:white; }
        .u0-disappear { background:rgba(232,17,10,0.08); border:1px solid rgba(232,17,10,0.25); color:#e87070; font-size:14px; padding:14px 24px; max-width:600px; margin:24px auto 0; line-height:1.6; }

        .u0-section { max-width:860px; margin:0 auto; padding:70px 20px; }
        .u0-tag { font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:5px; color:#e8110a; display:block; margin-bottom:14px; }
        .u0-section h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(32px,6vw,60px); color:white; line-height:1; margin:0 0 24px; }
        .u0-section h2 em { color:#f5c518; font-style:normal; }
        .u0-section h2 span { color:#e8110a; }
        .u0-section p { font-size:17px; color:#bbb; line-height:1.75; margin:0 0 18px; }
        .u0-section p strong { color:white; }
        .u0-section p em { color:#f5c518; font-style:normal; }

        .u0-dark { background:#1a1a1a; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05); padding:70px 20px; }
        .u0-dark .inner { max-width:860px; margin:0 auto; }

        .u0-upgrade { background:rgba(232,17,10,0.08); border:1px solid rgba(232,17,10,0.3); border-left:4px solid #e8110a; padding:30px; margin:30px 0; }
        .u0-upgrade h3 { font-family:'Bebas Neue',sans-serif; font-size:clamp(22px,4vw,36px); color:white; margin:0 0 16px; letter-spacing:1px; }
        .u0-upgrade p { font-size:16px; color:#bbb; line-height:1.7; margin:0; }
        .u0-upgrade p strong { color:white; }

        .u0-proof { background:#111; border-left:4px solid #f5c518; padding:24px 28px; margin:30px 0; }
        .u0-proof .pt { font-family:'Bebas Neue',sans-serif; font-size:20px; color:#f5c518; letter-spacing:2px; margin-bottom:14px; }
        .u0-proof ul { list-style:none; padding:0; margin:0; }
        .u0-proof li { font-size:16px; color:#ccc; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .u0-proof li:last-child { border:none; }
        .u0-proof li strong { color:white; }

        .u0-img { background:#111; border:2px dashed rgba(255,255,255,0.12); border-radius:8px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; margin:24px 0; gap:10px; }
        .u0-img span { font-size:40px; }
        .u0-img p { font-size:13px; color:#444; margin:0; }

        .u0-armes { display:grid; gap:12px; margin:36px 0; }
        .u0-arme { background:#111; border:1px solid rgba(255,255,255,0.05); border-left:3px solid #e8110a; padding:20px 24px; }
        .u0-arme .lbl { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:4px; color:#e8110a; margin-bottom:6px; display:block; }
        .u0-arme h3 { font-family:'Bebas Neue',sans-serif; font-size:22px; color:white; margin:0 0 8px; letter-spacing:1px; }
        .u0-arme p { font-size:15px; color:#999; line-height:1.6; margin:0; }
        .u0-bonus { background:linear-gradient(135deg,#1a1400,#0a0a0a); border:2px solid #f5c518; padding:24px; margin-top:12px; text-align:center; }
        .u0-bonus h3 { font-family:'Bebas Neue',sans-serif; font-size:24px; color:#f5c518; margin:0 0 8px; }
        .u0-bonus p { font-size:15px; color:#bbb; margin:0; }

        .u0-value { background:#111; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #e8110a; padding:24px 28px; margin:30px 0; }
        .u0-value ul { list-style:none; padding:0; margin:0; }
        .u0-value li { font-size:15px; color:#999; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .u0-value li:last-child { border:none; color:white; font-weight:700; }

        .u0-cd { background:rgba(232,17,10,0.06); border:1px solid rgba(232,17,10,0.25); padding:40px 20px; text-align:center; }
        .u0-cd .ttl { font-family:'Bebas Neue',sans-serif; font-size:clamp(20px,4vw,32px); color:white; letter-spacing:1px; margin-bottom:20px; }
        .u0-cd .timer { font-family:'Bebas Neue',sans-serif; font-size:clamp(60px,12vw,90px); color:#f5c518; letter-spacing:4px; line-height:1; margin-bottom:20px; }
        .u0-cd .sub { font-size:15px; color:#888; max-width:500px; margin:0 auto; line-height:1.6; }
        .u0-cd .sub strong { color:white; }

        .u0-rare { text-align:center; padding:30px 20px; max-width:600px; margin:0 auto; }
        .u0-rare .text { font-family:'Bebas Neue',sans-serif; font-size:18px; color:#e8110a; letter-spacing:2px; margin-bottom:14px; animation:u0blinkText 1s infinite; }
        @keyframes u0blinkText { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
        .u0-pbar { background:#222; height:12px; border-radius:6px; overflow:hidden; margin-bottom:8px; }
        .u0-pfill { height:100%; width:94%; background:#e8110a; border-radius:6px; }
        .u0-plabel { font-size:12px; color:#555; }

        .u0-cta { text-align:center; padding:60px 20px; max-width:700px; margin:0 auto; }
        .u0-choix { text-align:center; max-width:600px; margin:0 auto 30px; font-size:18px; color:#bbb; line-height:1.7; }
        .u0-choix strong { color:white; }
        .u0-pcross { font-size:22px; color:#555; text-decoration:line-through; margin-bottom:6px; }
        .u0-pmain { font-family:'Bebas Neue',sans-serif; font-size:clamp(70px,14vw,100px); color:#f5c518; line-height:1; letter-spacing:-3px; }
        .u0-pnote { font-size:14px; color:#555; margin:8px 0 32px; }
        .u0-badge { display:inline-block; background:rgba(232,17,10,0.15); border:1px solid rgba(232,17,10,0.3); color:#e87070; font-size:13px; padding:6px 16px; margin-bottom:20px; letter-spacing:1px; }

        .u0-yes { display:block; background:#e8110a; color:white; font-family:'Bebas Neue',sans-serif; font-size:clamp(18px,4vw,28px); letter-spacing:2px; padding:22px 40px; text-decoration:none; border:none; cursor:pointer; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); box-shadow:0 8px 50px rgba(232,17,10,0.5); animation:u0pulse 2s infinite; margin:0 auto 12px; width:100%; max-width:700px; }
        @keyframes u0pulse { 0%,100%{box-shadow:0 8px 50px rgba(232,17,10,0.5);} 50%{box-shadow:0 8px 70px rgba(232,17,10,0.8);} }
        .u0-secure { font-size:12px; color:#333; margin-top:10px; }
        .u0-no { display:block; font-size:13px; color:#333; text-decoration:underline; cursor:pointer; margin-top:20px; background:none; border:none; width:100%; text-align:center; line-height:1.5; font-family:'DM Sans',sans-serif; }

        .u0-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); }

        /* LIVE VS ALGO */
        .u0-vs { background:#0a0a0a; padding:70px 20px; }
        .u0-vs .inner { max-width:860px; margin:0 auto; }
        .u0-vsgrid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:36px; }
        @media (max-width:600px){ .u0-vsgrid{grid-template-columns:1fr;} }
        .u0-vscard { padding:28px 24px; border:1px solid rgba(255,255,255,0.06); }
        .u0-vscard.bad { background:rgba(232,17,10,0.05); border-left:3px solid #444; opacity:0.7; }
        .u0-vscard.good { background:rgba(245,197,24,0.05); border-left:3px solid #f5c518; }
        .u0-vscard .vs-label { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:5px; margin-bottom:14px; display:block; }
        .u0-vscard.bad .vs-label { color:#555; }
        .u0-vscard.good .vs-label { color:#f5c518; }
        .u0-vscard h3 { font-family:'Bebas Neue',sans-serif; font-size:22px; margin:0 0 16px; letter-spacing:1px; }
        .u0-vscard.bad h3 { color:#666; }
        .u0-vscard.good h3 { color:white; }
        .u0-vscard ul { list-style:none; padding:0; margin:0; }
        .u0-vscard ul li { font-size:14px; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.04); line-height:1.5; }
        .u0-vscard.bad ul li { color:#555; }
        .u0-vscard.bad ul li::before { content:"✗ "; color:#444; }
        .u0-vscard.good ul li { color:#ccc; }
        .u0-vscard.good ul li::before { content:"✓ "; color:#f5c518; }

        /* TIMELINE CERVEAU */
        .u0-cerveau { background:#0d0d0d; border-top:1px solid rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.04); padding:70px 20px; }
        .u0-cerveau .inner { max-width:860px; margin:0 auto; }
        .u0-timeline { position:relative; margin-top:40px; padding-left:24px; border-left:2px solid rgba(232,17,10,0.3); }
        .u0-tstep { position:relative; padding:0 0 36px 32px; }
        .u0-tstep:last-child { padding-bottom:0; }
        .u0-tstep::before { content:''; position:absolute; left:-7px; top:6px; width:12px; height:12px; background:#e8110a; border-radius:50%; }
        .u0-tstep .t-min { font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:4px; color:#e8110a; margin-bottom:6px; display:block; }
        .u0-tstep h3 { font-family:'Bebas Neue',sans-serif; font-size:22px; color:white; margin:0 0 6px; letter-spacing:1px; }
        .u0-tstep p { font-size:15px; color:#888; line-height:1.6; margin:0; }
        .u0-biais-tag { display:inline-block; background:rgba(245,197,24,0.08); border:1px solid rgba(245,197,24,0.2); color:#f5c518; font-size:11px; letter-spacing:3px; padding:3px 10px; margin-bottom:8px; font-family:'Bebas Neue',sans-serif; }

        /* HATER */
        .u0-hater-sec { background:#0a0a0a; padding:70px 20px; position:relative; overflow:hidden; }
        .u0-hater-sec .inner { max-width:860px; margin:0 auto; position:relative; }
        .u0-he { background:#111; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #333; padding:20px 24px; margin:12px 0; }
        .u0-he .lbl { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:4px; color:#444; margin-bottom:8px; display:block; }
        .u0-he .comment { font-size:16px; color:#777; font-style:italic; margin-bottom:12px; }
        .u0-he .reaction { font-size:14px; color:#bbb; line-height:1.6; }
        .u0-he .reaction strong { color:#f5c518; }
        .u0-arrow { text-align:center; font-size:28px; color:#e8110a; padding:4px 0; display:block; }
        .u0-hresult { background:rgba(245,197,24,0.05); border:1px solid rgba(245,197,24,0.2); border-left:3px solid #f5c518; padding:20px 24px; margin-top:12px; }
        .u0-hresult p { font-size:16px; color:#ccc; line-height:1.7; margin:0; }
        .u0-hresult p strong { color:#f5c518; }

        /* BIAIS */
        .u0-biais { background:#1a1a1a; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05); padding:70px 20px; }
        .u0-biais .inner { max-width:860px; margin:0 auto; }
        .u0-bgrid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:36px; }
        @media (max-width:600px){ .u0-bgrid{grid-template-columns:1fr;} }
        .u0-bcard { background:#111; border:1px solid rgba(255,255,255,0.05); padding:22px; position:relative; overflow:hidden; }
        .u0-bcard .b-name { font-family:'Bebas Neue',sans-serif; font-size:18px; color:#f5c518; letter-spacing:2px; margin-bottom:6px; display:block; }
        .u0-bcard h3 { font-family:'Bebas Neue',sans-serif; font-size:20px; color:white; margin:0 0 10px; letter-spacing:1px; }
        .u0-bcard p { font-size:14px; color:#888; line-height:1.6; margin:0; }
        .u0-bcard p strong { color:#ccc; }

        .u0-mini-cta { text-align:center; padding:50px 20px; max-width:700px; margin:0 auto; }
        .u0-mini-cta .ph { font-family:'Bebas Neue',sans-serif; font-size:clamp(20px,4vw,36px); color:white; margin-bottom:20px; letter-spacing:1px; }
        .u0-mini-cta .ph span { color:#f5c518; }
        .u0-mini-cta .sub { font-size:13px; color:#444; margin-top:8px; }
      `}</style>

      <div className="u0">
        {/* ALERT */}
        <div className="u0-alert">⚠️ PERSONNALISATION DE TA COMMANDE EN COURS — NE FERME SURTOUT PAS CETTE PAGE ⚠️</div>

        {/* HERO */}
        <div className="u0-hero">
          <div className="u0-fomo">🏴‍☠️ TA COMMANDE N'EST PAS TERMINÉE</div>
          <h1>Attends —<span>Tu vas recevoir</span><em>la Méthode Pirate...</em></h1>
          <p className="lead">
            Mais avant de continuer, lis bien ce qui suit.<br />
            Tu vas pouvoir faire tes premières ventes avec les carrousels.<br />
            Mais <strong>3 000€/mois avec des carrousels — c'est le niveau DÉBUTANT.</strong><br />
            Les vrais Pirates font 10 000€/mois minimum. Et ils maîtrisent UN seul truc que 99% ignorent.
          </p>
          <div className="u0-disappear">⚠️ Cette page n'existera plus dès que tu la quittes. Impossible d'y revenir. C'est maintenant ou jamais.</div>
        </div>

        {/* CTA HERO */}
        <div style={{ textAlign: "center", padding: "36px 20px", background: "rgba(232,17,10,0.06)", borderBottom: "1px solid rgba(232,17,10,0.15)" }}>
          <div className="u0-badge">Tu viens d'acheter pendant mon live — c'est la preuve que ça marche</div>
          <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX ENCAISSER 1 500€ PAR LIVE"}</button>
          <p style={{ fontSize: 13, color: "#444", marginTop: 8 }}>Ou continue à lire pour comprendre exactement ce que tu vas recevoir ↓</p>
        </div>

        <div className="u0-divider"></div>

        {/* UPGRADE IDENTITÉ */}
        <div className="u0-section">
          <span className="u0-tag">☠ POURQUOI TU VAS RESTER BLOQUÉ</span>
          <h2>Voici pourquoi tu vas rester coincé<br />à <span>200€/mois</span> comme un amateur</h2>
          <div className="u0-upgrade">
            <h3>Pendant que tu fêtes tes premiers carrousels à 200€...</h3>
            <p>D'autres encaissent <strong>1 500€ en UN SEUL LIVE</strong> avec moins de 20 spectateurs.<br /><br />
            Les carrousels c'est le niveau DÉBUTANT. Si tu t'arrêtes là tu resteras dans la catégorie <strong>"petits joueurs"</strong> pendant que les vrais Pirates font 10 000€/mois avec leurs lives TikTok.</p>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* LIVE VS ALGO */}
        <div className="u0-vs">
          <div className="inner">
            <span className="u0-tag">⚓ CARROUSELS VS LIVE</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,6vw,60px)", color: "white", lineHeight: 1, margin: "0 0 16px" }}>Les carrousels dépendent de l'algo.<br /><em style={{ color: "#f5c518", fontStyle: "normal" }}>Le Live — toi tu le contrôles.</em></h2>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, marginBottom: 8 }}>
              Si TikTok décide de ne plus te pousser demain matin — tes revenus tombent à zéro. C'est ce qui arrive à <strong style={{ color: "white" }}>tout le monde qui compte uniquement sur les carrousels.</strong><br />
              Avec le Live, tu décides quand tu vends. Tu allumes le Live, tu appliques le script, tu encaisses.
            </p>
            <div className="u0-vsgrid">
              <div className="u0-vscard bad">
                <span className="vs-label">☠ CARROUSELS SEULS</span>
                <h3>Tu supplies l'algo</h3>
                <ul>
                  <li>TikTok décide si tu gagnes aujourd'hui</li>
                  <li>Reach peut chuter du jour au lendemain</li>
                  <li>Impossible de forcer une vente</li>
                  <li>Tu attends. Tu espères.</li>
                  <li>Plafond naturel à 3000€/mois si t'es bon</li>
                </ul>
              </div>
              <div className="u0-vscard good">
                <span className="vs-label">🏴‍☠️ LIVE PIRATE</span>
                <h3>Tu contrôles tout</h3>
                <ul>
                  <li>Tu décides quand tu vends</li>
                  <li>50 spectateurs suffisent pour 2 000€</li>
                  <li>Pas besoin de followers</li>
                  <li>Chaque live = revenu prévisible</li>
                  <li>8 lives par mois = 10 000€ minimum</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* CTA mini */}
        <div className="u0-mini-cta">
          <p className="ph">Tu veux contrôler tes revenus<br /><span>ou attendre que l'algo décide pour toi ?</span></p>
          <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX ENCAISSER 1 500€ PAR LIVE"}</button>
          <p className="sub">Ou continue à lire ↓</p>
        </div>

        <div className="u0-divider"></div>

        {/* MÉCANISME SECRET */}
        <div className="u0-dark">
          <div className="inner">
            <span className="u0-tag">⚓ LE MÉCANISME SECRET</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,6vw,60px)", color: "white", lineHeight: 1, margin: "0 0 24px" }}>Le mécanisme secret<br />que les Pirates utilisent :</h2>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, marginBottom: 24 }}>
              La <strong style={{ color: "white" }}>Méthode de Conversion Live.</strong> Elle court-circuite le cerveau qui hésite et active directement la partie qui achète. Résultat : tes spectateurs sortent leur CB avant même de comprendre pourquoi.
            </p>
            <div className="u0-proof">
              <div className="pt">MES RÉSULTATS EN LIVE :</div>
              <ul>
                <li>⚡ <strong>1 live = 1 103€</strong> avec seulement 30 minutes</li>
                <li>👥 <strong>50 spectateurs = 2 000€</strong> encaissés</li>
                <li>📅 <strong>8 lives par mois = 10 000€ minimum</strong></li>
              </ul>
            </div>
            <p style={{ fontSize: 16, color: "#bbb", lineHeight: 1.7, marginBottom: 20 }}>
              Preuve que ça marche : tu viens d'acheter la Méthode Pirate pendant mon live. Je suis en train de générer 2 000€ durant ce live grâce exactement à ce que je vais te révéler.
            </p>
            <div style={{ background: "#f1f1f1", border: "1px solid #d9d9d9", borderRadius: 16, padding: "28px 24px", margin: "24px 0", textAlign: "center", boxShadow: "0 4px 18px rgba(0,0,0,0.25)" }}>
              <p style={{ fontWeight: 800, fontSize: "32px", color: "#e11d2a", margin: "0 0 18px", lineHeight: 1.2 }}>2037€ générés en un seul live TikTok</p>
              <img
                src={tiktokLiveImg}
                alt="2037€ générés en un seul live TikTok"
                onClick={() => setImgZoom(true)}
                style={{ maxWidth: "420px", width: "100%", height: "auto", borderRadius: 8, cursor: "zoom-in", display: "inline-block" }}
              />
            </div>
            {imgZoom && (
              <div
                onClick={() => setImgZoom(false)}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, cursor: "zoom-out", padding: 24 }}
              >
                <img src={tiktokLiveImg} alt="2037€ générés en un seul live TikTok" style={{ maxWidth: "92vw", maxHeight: "92vh", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
              </div>
            )}
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* CERVEAU TIMELINE */}
        <div className="u0-cerveau">
          <div className="inner">
            <span className="u0-tag">🧠 PSYCHOLOGIE DU LIVE</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,6vw,60px)", color: "white", lineHeight: 1, margin: "0 0 16px" }}>Ce qui se passe dans le cerveau<br />de ton spectateur <em style={{ color: "#f5c518", fontStyle: "normal" }}>minute par minute</em></h2>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, marginBottom: 8 }}>
              Un spectateur qui entre dans ton live ne va pas acheter tout de suite. Son cerveau passe par <strong style={{ color: "white" }}>7 états précis</strong> avant de sortir sa CB. La plupart des gens font des lives sans savoir ça — ils perdent leurs prospects entre l'étape 3 et 4.
            </p>
            <div className="u0-timeline">
              <div className="u0-tstep">
                <span className="u0-biais-tag">BIAIS DE NOUVEAUTÉ</span>
                <span className="t-min">MINUTE 0-2</span>
                <h3>🔍 Il scanne. Il juge. Il décide en 8 secondes.</h3>
                <p>Son cerveau reptilien évalue la menace. Est-ce que cette personne est crédible ? Tu as 8 secondes pour déclencher la curiosité sinon il swipe. Ce que tu dis dans les 2 premières minutes décide de tout.</p>
              </div>
              <div className="u0-tstep">
                <span className="u0-biais-tag">BIAIS D'ANCRAGE</span>
                <span className="t-min">MINUTE 3-7</span>
                <h3>⚡ Il commence à se reconnaître dans ton discours</h3>
                <p>Tu nommes exactement sa douleur. Son cerveau s'allume — "il parle de moi". C'est là que tu ancres le problème profond. Sans ça, il reste spectateur. Avec ça, il devient prospect chaud.</p>
              </div>
              <div className="u0-tstep">
                <span className="u0-biais-tag">EFFET DE RÉCIPROCITÉ</span>
                <span className="t-min">MINUTE 8-12</span>
                <h3>🎁 Tu lui donnes quelque chose GRATUITEMENT</h3>
                <p>Une technique concrète, un chiffre, une révélation. Son cerveau enregistre : "cette personne m'a déjà aidé". Il se sent inconsciemment redevable. La vente devient 3x plus facile après cette étape.</p>
              </div>
              <div className="u0-tstep">
                <span className="u0-biais-tag">PREUVE SOCIALE + FOMO</span>
                <span className="t-min">MINUTE 13-18</span>
                <h3>👥 Les autres achètent — il ne veut pas être le seul à rater</h3>
                <p>C'est ici que tu montres les résultats. Screenshots, témoignages, chiffres. Son cerveau social s'active : "si les autres ont fait ça, je peux aussi". Et si quelqu'un achète en live devant lui — c'est terminé.</p>
              </div>
              <div className="u0-tstep">
                <span className="u0-biais-tag">URGENCE TEMPORELLE</span>
                <span className="t-min">MINUTE 19-25</span>
                <h3>⏰ L'offre expire. Son cerveau panique.</h3>
                <p>Tu introduis la limite : prix qui monte dans X minutes, places limitées, bonus qui disparaît. La peur de la perte est 2x plus forte que le désir de gagner. Son hésitation se transforme en action.</p>
              </div>
              <div className="u0-tstep">
                <span className="u0-biais-tag">BIAIS DE COHÉRENCE</span>
                <span className="t-min">MINUTE 26-30</span>
                <h3>✅ Il a dit OUI 3 fois. Il ne peut plus dire NON.</h3>
                <p>Tu lui as posé des questions auxquelles il a répondu "oui" en commentaire. Son cerveau veut rester cohérent avec ses propres déclarations publiques. Acheter devient logique. Partir devient une contradiction.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* CTA après cerveau timeline */}
        <div className="u0-mini-cta">
          <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ JE VEUX ENCAISSER 1 500€ PAR LIVE"}</button>
          {paymentError && (
            <p style={{ color: "#e8110a", fontWeight: 700, fontSize: 16, textAlign: "center", margin: "16px 0" }}>❌ Paiement refusé, veuillez vérifier votre carte ou contacter votre banque.</p>
          )}
          <p className="sub">Ou continue à lire ↓</p>
        </div>

        <div className="u0-divider"></div>

        {/* HATER */}
        <div className="u0-hater-sec">
          <div className="inner">
            <span className="u0-tag">💀 L'ARME LA PLUS CONTRE-INTUITIVE</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,6vw,60px)", color: "white", lineHeight: 1, margin: "0 0 16px" }}>Les haters ne détruisent pas ton live.<br /><em style={{ color: "#f5c518", fontStyle: "normal" }}>Ils le financent.</em></h2>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, marginBottom: 30 }}>
              99% des créateurs ont peur des commentaires négatifs. Ils s'excusent, ils ignorent, ou ils pètent un câble en live.<br />
              <strong style={{ color: "white" }}>C'est la pire chose à faire.</strong> Et c'est pour ça qu'ils restent à 0 vente.<br /><br />
              Les vrais Pirates savent que chaque commentaire négatif est une opportunité de vente déguisée. Voici exactement comment.
            </p>

            <div className="u0-he">
              <span className="lbl">COMMENTAIRE HATER TYPE 01</span>
              <div className="comment">"C'est une arnaque, personne ne gagne d'argent avec ça"</div>
              <div className="reaction">❌ Réponse amateur : ignorer ou se défendre<br />
              ✅ Réponse Pirate : <strong>"Merci pour le commentaire. Je comprends le scepticisme. Les 47 personnes qui ont acheté ce mois-ci pensaient pareil avant. Leur résultat est dans ma bio."</strong></div>
            </div>
            <span className="u0-arrow">↓</span>
            <div className="u0-hresult">
              <p>Le hater vient de te donner une objection que <strong>100% de tes spectateurs silencieux avaient aussi</strong> mais n'osaient pas écrire. En répondant publiquement, tu traites l'objection de tout le monde en même temps. <strong>Résultat moyen : +3 à +7 ventes dans les 5 minutes qui suivent.</strong></p>
            </div>

            <div className="u0-he" style={{ marginTop: 24 }}>
              <span className="lbl">COMMENTAIRE HATER TYPE 02</span>
              <div className="comment">"T'es pas crédible, t'as même pas de résultats"</div>
              <div className="reaction">❌ Réponse amateur : montrer ses stats défensivement<br />
              ✅ Réponse Pirate : <strong>"Tu as raison de demander des preuves. C'est exactement ce que font les gens intelligents avant d'acheter."</strong> [montre screenshot Stripe]</div>
            </div>
            <span className="u0-arrow">↓</span>
            <div className="u0-hresult">
              <p>Tu viens de <strong>valider son intelligence</strong> devant tout le monde. Il ne peut plus attaquer sans se contredire. Et les spectateurs qui hésitaient viennent de voir exactement la preuve dont ils avaient besoin. <strong>Le hater t'a fait vendre à sa place.</strong></p>
            </div>

            <div className="u0-he" style={{ marginTop: 24 }}>
              <span className="lbl">COMMENTAIRE HATER TYPE 03</span>
              <div className="comment">"C'est trop cher"</div>
              <div className="reaction">❌ Réponse amateur : baisser le prix ou s'énerver<br />
              ✅ Réponse Pirate : <strong>"97€ c'est trop cher. Une semaine de McDo c'est 97€. Sauf qu'une semaine de McDo te rapporte 0€. Ma méthode t'en rapporte 1 500€."</strong></div>
            </div>
            <span className="u0-arrow">↓</span>
            <div className="u0-hresult">
              <p>Tu viens de <strong>recontextualiser la valeur</strong> devant toute ta salle. Le "trop cher" est mort. Et les 3 personnes qui pensaient la même chose viennent de changer d'avis. <strong>Ce commentaire t'a coûté 0€ et t'a rapporté des ventes.</strong></p>
            </div>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* CTA après hater */}
        <div className="u0-mini-cta">
          <p className="ph">Les haters travaillent pour toi.</p>
          <p style={{ fontSize: 15, color: "#888", marginBottom: 24 }}>Apprends à transformer chaque commentaire négatif en vente.</p>
          <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX ENCAISSER 1 500€ PAR LIVE"}</button>
          <p className="sub">Ou continue à lire ↓</p>
        </div>

        <div className="u0-divider"></div>

        {/* BIAIS */}
        <div className="u0-biais">
          <div className="inner">
            <span className="u0-tag">🧠 LES BIAIS QUE TU VAS ACTIVER</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,6vw,60px)", color: "white", lineHeight: 1, margin: "0 0 16px" }}>Les 6 biais psychologiques<br />que tu vas <em style={{ color: "#f5c518", fontStyle: "normal" }}>déclencher dans l'ordre exact</em></h2>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, marginBottom: 8 }}>
              Ces biais existent dans le cerveau de chaque spectateur. La plupart des vendeurs en activent 1 ou 2 par accident. Toi tu vas les activer tous les 6, dans le bon ordre, au bon moment.
            </p>
            <div className="u0-bgrid">
              <div className="u0-bcard">
                <span className="b-name">BIAIS 01</span>
                <h3>Réciprocité</h3>
                <p>Tu donnes quelque chose de valeur <strong>gratuitement</strong> en live. Son cerveau enregistre une dette. Il achète pour s'acquitter inconsciemment.</p>
              </div>
              <div className="u0-bcard">
                <span className="b-name">BIAIS 02</span>
                <h3>Preuve sociale</h3>
                <p>Quand il voit d'autres personnes acheter en direct, son cerveau copie le comportement du groupe. <strong>La vente en engendre d'autres automatiquement.</strong></p>
              </div>
              <div className="u0-bcard">
                <span className="b-name">BIAIS 03</span>
                <h3>Aversion à la perte</h3>
                <p>La peur de <strong>rater une opportunité</strong> est 2x plus forte que le désir de gagner. Tu actives ça au bon moment — il n'a plus le choix.</p>
              </div>
              <div className="u0-bcard">
                <span className="b-name">BIAIS 04</span>
                <h3>Cohérence</h3>
                <p>Tu lui fais dire OUI 3 fois publiquement. <strong>Son cerveau veut rester cohérent</strong> avec ses déclarations. Acheter devient la seule issue logique.</p>
              </div>
              <div className="u0-bcard">
                <span className="b-name">BIAIS 05</span>
                <h3>Autorité</h3>
                <p>Les chiffres concrets, les screenshots, les résultats spécifiques. <strong>Pas de "j'ai réussi" — mais "1 103€ le 14 mars, 47 minutes".</strong> Le détail = crédibilité.</p>
              </div>
              <div className="u0-bcard">
                <span className="b-name">BIAIS 06</span>
                <h3>Effet d'identité</h3>
                <p>Tu ne vends pas un produit. Tu vends une identité — <strong>"devenir quelqu'un qui encaisse en live"</strong>. Son ego fait le reste du travail à ta place.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* CTA après biais */}
        <div className="u0-mini-cta">
          <p className="ph">6 biais. 1 script. Des ventes à chaque live.</p>
          <p style={{ fontSize: 15, color: "#888", marginBottom: 24 }}>Tu veux que je t'explique comment les activer dans l'ordre exact ?</p>
          <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX ENCAISSER 1 500€ PAR LIVE"}</button>
          <p className="sub">Ou continue à lire ↓</p>
        </div>

        <div className="u0-divider"></div>

        {/* 6 ARMES */}
        <div className="u0-section">
          <span className="u0-tag">☠ LES 6 ARMES SECRÈTES</span>
          <h2>Les 6 armes secrètes<br />du <em>Live Pirate</em></h2>
          <div className="u0-armes">
            <div className="u0-arme"><span className="lbl">ARME 01</span><h3>☠️ Le Piège à Spectateurs Chauds</h3><p>Ces 2 carrousels postés exactement 30 minutes avant ton live font que tes spectateurs arrivent déjà convaincus d'acheter — avant même que tu présentes ton offre. (78% arrivent chauds)</p></div>
            <div className="u0-arme"><span className="lbl">ARME 02</span><h3>⚡ La Boucle d'Urgence Infinie</h3><p>Cette phrase de 5 mots répétée toutes les 7 minutes déclenche des achats paniques au lieu de la méfiance. Tes spectateurs écrivent "vite donne-moi le lien" en live.</p></div>
            <div className="u0-arme"><span className="lbl">ARME 03</span><h3>🔒 Le Script de Conversion en 7 Minutes</h3><p>La séquence exacte de phrases qui désactive l'esprit critique de tes spectateurs et les transforme en acheteurs. Testé sur 20+ lives.</p></div>
            <div className="u0-arme"><span className="lbl">ARME 04</span><h3>🎯 L'Interrogatoire Social Fatal</h3><p>Ces 4 questions qui forcent tes prospects à avouer leurs échecs devant tout le monde. Ils achètent obligatoirement après pour ne pas perdre la face.</p></div>
            <div className="u0-arme"><span className="lbl">ARME 05</span><h3>👥 Le Complice Invisible</h3><p>Comment utiliser un commentaire stratégique pour déclencher une épidémie de "moi aussi je veux" en 3 minutes chrono.</p></div>
            <div className="u0-arme"><span className="lbl">ARME 06</span><h3>💀 L'Arme Anti-Hater</h3><p>Cette réponse de 11 mots transforme chaque hater en vente supplémentaire. Les critiques deviennent tes meilleurs commerciaux sans s'en rendre compte. Tu viens de voir 3 exemples concrets ci-dessus.</p></div>
            <div className="u0-bonus"><h3>🎁 BONUS — Le Script Live Complet Système Pirate</h3><p>Le script minute par minute de mes lives qui génèrent 1 000€+ — copie-colle et exécute.</p></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <div className="u0-badge">Accès immédiat · Plus que 3 places disponibles</div>
            <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX ENCAISSER 1500€ PAR LIVE"}</button>
            <p style={{ fontSize: 13, color: "#444", marginTop: 8 }}>Tu rentabilises en un seul live · Accès immédiat</p>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* VALEUR */}
        <div className="u0-dark">
          <div className="inner">
            <span className="u0-tag">💰 VALEUR RÉELLE</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(32px,6vw,60px)", color: "white", lineHeight: 1, margin: "0 0 24px" }}>Pour maîtriser ces 6 armes<br />tu devrais normalement payer :</h2>
            <div className="u0-value">
              <ul>
                <li>• Formation psychologie de la persuasion .............. 2 500€</li>
                <li>• Coach en closing live ................................ 3 000€</li>
                <li>• 18 mois de tests et d'optimisation .................. Inestimable</li>
                <li>• Total : 8 500€ et 2 ans de ta vie</li>
              </ul>
            </div>
            <p style={{ fontSize: 17, color: "#bbb", lineHeight: 1.75, textAlign: "center", marginTop: 24 }}>
              Mais parce que tu fais partie des rares personnes<br />qui viennent d'acquérir la Méthode Pirate...
            </p>
          </div>
        </div>

        <div className="u0-divider"></div>

        {/* COUNTDOWN */}
        <div className="u0-cd">
          <div className="ttl">⚠️ ATTENTION — Cette page se DÉTRUIT automatiquement dans exactement :</div>
          <div className="timer">{m}:{s}</div>
          <p className="sub">
            Parce que ces armes sont TROP efficaces. L'accès est limité à 5 places par mois.<br />
            Le prochain accès sera à 467€ à partir du 1er du mois prochain.<br />
            Tu ne reverras <strong>JAMAIS</strong> cette offre à 97€.
          </p>
        </div>

        {/* RARETÉ */}
        <div className="u0-rare">
          <div className="text">⚠️ Plus que 3 places sur 50</div>
          <div className="u0-pbar"><div className="u0-pfill"></div></div>
          <div className="u0-plabel">94% des places prises</div>
        </div>

        <div className="u0-divider"></div>

        {/* CHOIX FINAL + CTA */}
        <div className="u0-cta">
          <div className="u0-choix">
            Dans 6 mois tu veux être :<br />
            <strong>Celui qui attend que l'algo veuille bien te pousser...</strong><br />
            Ou celui qui allume son live et encaisse <strong>1 500€ en 30 minutes ?</strong>
          </div>
          <div className="u0-pcross">467€</div>
          <div className="u0-pmain">97€</div>
          <div className="u0-pnote">Uniquement sur cette page · Jamais reproposé à ce prix</div>
          <div className="u0-badge">3 places restantes · Accès immédiat</div>
          <button type="button" className="u0-yes" onClick={handleAccept} disabled={loadingUpsell}>{loadingUpsell ? "Traitement en cours..." : "🏴‍☠️ OUI — JE VEUX ENCAISSER 1500€ PAR LIVE"}</button>
          <div className="u0-secure">🔒 Paiement sécurisé via Stripe · Accès immédiat</div>
          {paymentError && (
            <p style={{ color: "#e8110a", fontWeight: 700, textAlign: "center", marginTop: 16, fontSize: 16 }}>
              ❌ Paiement refusé, veuillez vérifier votre carte ou contacter votre banque.
            </p>
          )}
          <button onClick={goRefuse} style={{ background: "#ffffff", color: "#000000", border: "1px solid #cccccc", borderRadius: "4px", padding: "12px 24px", fontSize: "13px", cursor: "pointer", marginTop: "16px", display: "inline-block" }}>
            Non, je refuse cette opportunité. Je préfère attendre que l'algo me pousse et rester à 200€/mois pendant que les vrais Pirates encaissent 1 500€ par live à ma place.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upsell0;
