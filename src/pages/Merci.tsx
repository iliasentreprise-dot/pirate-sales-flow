const WHATSAPP_URL =
  "https://wa.me/33768299662?text=Bonjour%2C%20je%20viens%20de%20prendre%20Syst%C3%A8me%20Pirate%20et%20je%20voudrais%20acc%C3%A9der%20%C3%A0%20mes%20contenus%20%F0%9F%8F%B4%E2%80%8D%E2%98%A0%EF%B8%8F";

const Merci = () => {
  return (
    <div style={{ background: "#0a0a0a", color: "#f2ead8", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        .me-top { background:linear-gradient(90deg,#1aab52,#25D366,#1aab52); padding:14px 20px; text-align:center; font-family:'Bebas Neue',sans-serif; font-size:clamp(15px,3vw,20px); letter-spacing:3px; color:white; }
        .me-hero { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:60px 20px; background:radial-gradient(ellipse at 50% 0%,rgba(37,211,102,0.12) 0%,transparent 60%),#0a0a0a; }
        .me-skull { font-size:80px; animation:me-float 3s infinite; margin-bottom:20px; filter:drop-shadow(0 0 30px rgba(37,211,102,0.4)); }
        @keyframes me-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
        .me-badge { display:inline-block; background:#25D366; color:white; font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:3px; padding:8px 24px; margin-bottom:28px; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); }
        .me-hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(48px,9vw,100px); line-height:0.95; color:white; margin-bottom:16px; }
        .me-hero h1 span { color:#25D366; display:block; }
        .me-lead { font-size:clamp(17px,3vw,21px); color:#bbb; max-width:640px; margin:0 auto 40px; line-height:1.65; }
        .me-lead strong { color:white; }
        .me-steps { max-width:640px; margin:0 auto 50px; width:100%; text-align:left; }
        .me-step { display:flex; align-items:flex-start; gap:18px; padding:20px 24px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-left:3px solid #25D366; margin-bottom:12px; }
        .me-step .num { font-family:'Bebas Neue',sans-serif; font-size:36px; color:#25D366; line-height:1; flex-shrink:0; }
        .me-step h3 { font-family:'Bebas Neue',sans-serif; font-size:20px; color:white; letter-spacing:1px; margin-bottom:4px; }
        .me-step p { font-size:14px; color:#888; line-height:1.5; margin:0; }
        .me-wa { max-width:640px; width:100%; margin:0 auto; text-align:center; }
        .me-wa-btn { display:flex; align-items:center; justify-content:center; gap:14px; background:#25D366; color:white; font-family:'Bebas Neue',sans-serif; font-size:clamp(22px,4vw,32px); letter-spacing:2px; padding:22px 40px; text-decoration:none; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); box-shadow:0 8px 50px rgba(37,211,102,0.4); animation:me-pulse 2s infinite; transition:all 0.2s; width:100%; }
        @keyframes me-pulse { 0%,100%{box-shadow:0 8px 50px rgba(37,211,102,0.4);} 50%{box-shadow:0 8px 70px rgba(37,211,102,0.7);} }
        .me-wa-btn:hover { filter:brightness(1.1); }
        .me-wa-icon { width:36px; height:36px; flex-shrink:0; fill:white; }
        .me-num { display:inline-block; color:#25D366; font-weight:700; font-size:18px; margin-top:8px; letter-spacing:1px; }
        .me-msgbox { max-width:640px; margin:24px auto 0; width:100%; background:#1a1a1a; border:1px solid rgba(37,211,102,0.15); padding:24px; text-align:left; }
        .me-msgbox .lbl { font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:3px; color:#25D366; margin-bottom:12px; display:block; }
        .me-msgbox .tpl { background:rgba(37,211,102,0.05); border-left:3px solid #25D366; padding:16px 20px; font-size:15px; color:#ccc; line-height:1.6; font-style:italic; }
        .me-foot { border-top:1px solid rgba(255,255,255,0.04); padding:24px 20px; text-align:center; font-size:12px; color:#333; }
      `}</style>

      <div className="me-top">✅ PAIEMENT CONFIRMÉ — BIENVENUE DANS L'ÉQUIPAGE ✅</div>

      <div className="me-hero">
        <div className="me-skull">🏴‍☠️</div>
        <div className="me-badge">⚓ TU FAIS PARTIE DE L'ÉQUIPAGE</div>
        <h1>Bienvenue<span>à bord.</span></h1>
        <p className="me-lead">Ton paiement est confirmé. <strong>Tu as pris la bonne décision.</strong><br />Maintenant voilà exactement ce qui se passe ensuite.</p>

        <div className="me-steps">
          <div className="me-step">
            <div className="num">01</div>
            <div>
              <h3>📱 Envoie-moi un message WhatsApp</h3>
              <p>Clique sur le bouton ci-dessous et envoie-moi un message avec ton prénom et ta commande. Je réponds personnellement.</p>
            </div>
          </div>
          <div className="me-step">
            <div className="num">02</div>
            <div>
              <h3>📞 On fait un appel de 5 min</h3>
              <p>Un court appel récapitulatif — je te présente la méthode, on fait le point sur ta situation, et je t'envoie tous tes accès immédiatement après.</p>
            </div>
          </div>
          <div className="me-step">
            <div className="num">03</div>
            <div>
              <h3>🚀 Tu reçois tous tes accès</h3>
              <p>Formation, accompagnement, bonus — tout t'est envoyé directement après l'appel. On démarre immédiatement.</p>
            </div>
          </div>
        </div>

        <div className="me-wa">
          <a href={WHATSAPP_URL} className="me-wa-btn" target="_blank" rel="noreferrer">
            <svg className="me-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            📱 M'ENVOYER UN MESSAGE SUR WHATSAPP
          </a>
          <div style={{ fontSize: 13, color: "#555", marginTop: 12 }}>Mon numéro WhatsApp personnel</div>
          <div className="me-num">07 68 29 96 62</div>
          <div className="me-msgbox">
            <span className="lbl">💬 COPIE CE MESSAGE :</span>
            <div className="tpl">"Bonjour, je viens de prendre Système Pirate et je voudrais accéder à mes contenus 🏴‍☠️"</div>
          </div>
        </div>
      </div>

      <footer className="me-foot">© 2025 Système Pirate · Tous droits réservés</footer>
    </div>
  );
};

export default Merci;
