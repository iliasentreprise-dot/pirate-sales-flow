import { useState, useEffect } from "react";
import bonusTiktokSecret from "@/assets/bonus-tiktok-secret.jpg";
import bonusBoostUltime from "@/assets/bonus-boost-ultime.jpg";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const PAYPAL_CLIENT_ID =
  import.meta.env.VITE_PAYPAL_CLIENT_ID ||
  "AbwLv3_GiqKnxihz6BZBDHHYRmOjlLtONZtpj5nhAeWDEX9wEgUQ9mrhyt6TUal1lqG1gdZwZLANm8D3";
const IS_SANDBOX = import.meta.env.VITE_PAYPAL_ENV === "sandbox";

const CountdownTimer = ({ hours }: { hours: number }) => {
  const [endTs] = useState(() => {
    const stored = sessionStorage.getItem("declic_bonus_end");
    if (stored) return parseInt(stored, 10);
    const ts = Date.now() + hours * 3600 * 1000;
    sessionStorage.setItem("declic_bonus_end", String(ts));
    return ts;
  });
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, endTs - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="ob-countdown">⏱ Fin de l'offre dans {pad(h)}h {pad(m)}m {pad(s)}s</span>
  );
};

function PayPalSection({ bumpAdded }: { bumpAdded: boolean }) {
  const navigate = useNavigate();
  const amount = bumpAdded ? "144.00" : "97.00";
  const description = bumpAdded ? "Système Pirate + Pack Bonus Secret" : "Système Pirate";

  const createOrder = (_data: unknown, actions: { order: { create: (o: object) => Promise<string> } }) =>
    actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "EUR", value: amount }, description }],
    });

  const onApprove = async (_data: unknown, actions: { order?: { capture: () => Promise<{ payer?: { email_address?: string } }> } }) => {
    const order = await actions.order!.capture();
    const email = order.payer?.email_address ?? "";
    if (email) {
      sessionStorage.setItem("declic_email", email);
      await supabase.functions.invoke("save-lead", { body: { email } }).catch(() => {});
    }
    navigate("/merci");
  };

  return (
    <div style={{ background: "#1a1a1a", border: "1px solid rgba(167,139,250,0.25)", padding: 30, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, color: "#a78bfa", letterSpacing: 3, marginBottom: 4 }}>
        CHOISISSEZ VOTRE MODE DE PAIEMENT
      </div>
      {(["paypal", "card", "installment"] as const).map((funding) => (
        <PayPalButtons
          key={funding}
          fundingSource={funding as any}
          style={{ layout: "horizontal", height: 50, shape: "rect", label: funding === "paypal" ? "pay" : undefined }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      ))}
      <p style={{ textAlign: "center", fontSize: 12, color: "#555", margin: "4px 0 0" }}>
        🔒 Paiement 100% sécurisé par PayPal · SSL 256 bits
      </p>
    </div>
  );
}

const Orderbump = () => {
  const [bumpAdded, setBumpAdded] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [fieldError, setFieldError] = useState("");
  const total = bumpAdded ? "144€" : "97€";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#f2ead8", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .ob-hero { background: linear-gradient(135deg,#0a0a0a,#0f0a1a); border-bottom:3px solid #a78bfa; padding:50px 20px 40px; text-align:center; }
        .ob-step-badge { display:inline-block; background:#7c3aed; color:white; font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:3px; padding:8px 24px; margin-bottom:24px; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); }
        .ob-hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(38px,7vw,80px); color:white; line-height:1; margin-bottom:12px; }
        .ob-hero h1 span { color:#a78bfa; }
        .ob-hero p { font-size:18px; color:#bbb; max-width:650px; margin:0 auto; line-height:1.6; }
        .ob-bump-container { max-width:780px; margin:50px auto; padding:0 20px; }
        .ob-bump-box { border:3px dashed #a78bfa; background:linear-gradient(135deg,#0f0a1a,#0f0f0f); padding:36px; position:relative; }
        .ob-bump-label { position:absolute; top:-16px; left:30px; background:#a78bfa; color:black; font-family:'Bebas Neue',sans-serif; font-size:14px; letter-spacing:3px; padding:6px 20px; }
        .ob-bump-header { display:flex; align-items:flex-start; gap:20px; margin-bottom:24px; }
        .ob-custom-check { width:32px; height:32px; border:3px solid #a78bfa; background:transparent; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; font-size:20px; color:#a78bfa; flex-shrink:0; margin-top:4px; }
        .ob-custom-check.checked { background:#a78bfa; color:black; }
        .ob-bump-title-block .subtitle { font-size:14px; color:#888; letter-spacing:2px; text-transform:uppercase; }
        .ob-bump-title-block h2 { font-family:'Bebas Neue',sans-serif; font-size:clamp(22px,4vw,36px); color:#a78bfa; line-height:1.1; margin:6px 0 0; }
        .ob-secret-badge { display:inline-block; background:rgba(124,58,237,0.15); border:1px solid #7c3aed; color:#7c3aed; font-size:11px; letter-spacing:2px; padding:4px 12px; margin-bottom:16px; text-transform:uppercase; }
        .ob-bump-body p { font-size:16px; color:#bbb; line-height:1.7; margin-bottom:14px; }
        .ob-bump-body p strong { color:white; }
        .ob-bump-body p em { color:#a78bfa; font-style:normal; }
        .ob-bump-features { list-style:none; margin:20px 0; padding:0; }
        .ob-bump-features li { display:flex; align-items:flex-start; gap:12px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); font-size:15px; color:#ccc; }
        .ob-bump-features li .icon { color:#a78bfa; flex-shrink:0; }
        .ob-urgency-bar { background:rgba(124,58,237,0.08); border:1px solid rgba(124,58,237,0.2); padding:12px 16px; font-size:14px; color:#b794f4; margin-bottom:20px; }
        .ob-bump-price-row { display:flex; align-items:center; gap:16px; margin:24px 0 20px; flex-wrap:wrap; }
        .ob-bump-price-old { font-size:18px; color:#555; text-decoration:line-through; }
        .ob-bump-price-new { font-family:'Bebas Neue',sans-serif; font-size:52px; color:#a78bfa; line-height:1; }
        .ob-bump-price-tag { background:#7c3aed; color:white; font-size:12px; padding:4px 12px; font-weight:700; letter-spacing:1px; }
        .ob-summary-box { max-width:780px; margin:0 auto; padding:0 20px 60px; }
        .ob-order-summary { background:#1a1a1a; border:1px solid rgba(255,255,255,0.08); padding:30px; margin-bottom:24px; }
        .ob-order-summary h3 { font-family:'Bebas Neue',sans-serif; font-size:24px; color:white; margin-bottom:20px; letter-spacing:1px; }
        .ob-order-line { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:15px; color:#bbb; gap:12px; }
        .ob-order-line.total { border-bottom:none; font-weight:700; font-size:18px; color:white; margin-top:8px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.1); }
        .ob-order-line .price { color:#a78bfa; font-family:'Bebas Neue',sans-serif; font-size:20px; white-space:nowrap; }
        .ob-order-line.total .price { font-size:28px; }
        .ob-bonus-line { background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.25); padding:12px 14px !important; margin:6px 0; }
        .ob-bonus-label { display:flex; flex-direction:column; gap:6px; }
        .ob-bonus-title { color:#fff; font-weight:600; }
        .ob-countdown { color:#22c55e; font-size:12px; font-family:'Bebas Neue',sans-serif; letter-spacing:1.5px; }
        .ob-bonus-price { display:flex; align-items:center; gap:10px; }
        .ob-bonus-price .ob-old { color:#666; text-decoration:line-through; font-family:'DM Sans',sans-serif; font-size:16px; }
        .ob-bonus-price .ob-free { color:#22c55e !important; font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:1px; }
        .ob-bonus-thumbs { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:24px 0 8px; }
        .ob-bonus-thumb { background:linear-gradient(135deg,#1a1208,#0f0a05); border:2px solid #d4af37; border-radius:8px; overflow:hidden; box-shadow:0 0 30px rgba(212,175,55,0.25), inset 0 0 20px rgba(212,175,55,0.08); transition:transform .2s; }
        .ob-bonus-thumb:hover { transform:translateY(-3px); box-shadow:0 6px 40px rgba(212,175,55,0.45); }
        .ob-bonus-thumb img { width:100%; height:auto; display:block; }
        .ob-bonus-thumb-label { padding:10px 12px; text-align:center; font-family:'Bebas Neue',sans-serif; font-size:14px; letter-spacing:1.5px; color:#d4af37; background:rgba(0,0,0,0.5); border-top:1px solid rgba(212,175,55,0.4); }
        @media (max-width:480px) { .ob-bonus-thumbs { grid-template-columns:1fr; } }
        .ob-badge-red { background:#e8110a; color:white; font-size:13px; font-weight:700; padding:4px 10px; border-radius:999px; font-family:'DM Sans',sans-serif; letter-spacing:0.5px; }
        .ob-total-old { color:#666; text-decoration:line-through; font-size:14px; padding:6px 0 0; text-align:right; font-family:'DM Sans',sans-serif; }
        .ob-klarna-btn { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; background:#FFB3C7; color:#17120E; font-family:'DM Sans',sans-serif; font-size:17px; font-weight:700; letter-spacing:0.3px; padding:16px 20px; border:none; border-radius:8px; cursor:pointer; box-sizing:border-box; transition:filter 0.2s; }
        .ob-klarna-btn:hover { filter:brightness(0.93); }
        .ob-klarna-logo { font-family:'DM Sans',sans-serif; font-size:22px; font-weight:900; color:#17120E; letter-spacing:-1px; display:inline-block; }
        .ob-klarna-sub { text-align:center; font-size:12px; color:#888; margin-top:4px; margin-bottom:0; }
      `}</style>

      <div className="ob-hero">
        <div className="ob-step-badge">🤖 ÉTAPE 2 SUR 2 — FINALISE TA COMMANDE</div>
        <h1>Attends —<br /><span>Un bonus secret</span><br />t'attend ici</h1>
        <p>Avant de payer, j'ai quelque chose d'exclusif à te proposer.<br />Quelque chose que je ne montre <strong>jamais publiquement.</strong></p>
      </div>

      <div className="ob-bump-container">
        <div className="ob-bump-box">
          <div className="ob-bump-label">⚡ OFFRE EXCLUSIVE — UNE SEULE FOIS</div>
          <div className="ob-bump-header">
            <div
              className={`ob-custom-check ${bumpAdded ? "checked" : ""}`}
              onClick={() => setBumpAdded(!bumpAdded)}
              role="checkbox"
              aria-checked={bumpAdded}
              tabIndex={0}
            >✓</div>
            <div className="ob-bump-title-block">
              <div className="subtitle">✓ Ajouter à ma commande</div>
              <h2>👑 Pack Bonus Secret<br />— Les 2 Logiciels qui font tourner le système en automatique</h2>
            </div>
          </div>
          <div className="ob-bump-body">
            <div className="ob-secret-badge">🔒 JAMAIS VENDU PUBLIQUEMENT</div>
            <p>Ces 2 logiciels, c'est ce que j'utilise en coulisses pour que mon système tourne sans moi. <strong>Je ne les montre jamais.</strong> Pourquoi ? Parce que le jour où tout le monde les utilise, ils perdent leur avantage.</p>
            <p>Mais aujourd'hui, <em>uniquement sur cette page</em>, je te donne accès aux 2 outils qui alimentent ma machine à vendre. Tu récupères exactement :</p>
            <ul className="ob-bump-features">
              <li><span className="icon">🤖</span><span><strong>L'Outil d'Automatisation TikTok SECRET</strong> — il publie, optimise et fait tourner tes comptes pendant que tu dors</span></li>
              <li><span className="icon">🚀</span><span><strong>Le Logiciel de BOOST d'abonnés ULTIME</strong> — +100k abonnés en 24h, boost de vente et de confiance client intégré</span></li>
            </ul>
            <p>Ces outils <strong>n'existent nulle part ailleurs à ce prix.</strong> Ils ne sont pas dans la formation. Ils ne sont pas sur mon TikTok. Ils ne seront plus disponibles après cette page. C'est la seule et unique fois que je les ouvre.</p>
            <div className="ob-urgency-bar">⚠️ Cette offre disparaît dès que tu quittes cette page. Impossible d'y revenir après.</div>

            <div className="ob-bonus-thumbs">
              <div className="ob-bonus-thumb">
                <img src={bonusTiktokSecret} alt="Automatisation TikTok Secret" loading="lazy" width={1024} height={1024} />
                <div className="ob-bonus-thumb-label">🤖 Automatisation TikTok</div>
              </div>
              <div className="ob-bonus-thumb">
                <img src={bonusBoostUltime} alt="Boost Abonnés Ultime" loading="lazy" width={1024} height={1024} />
                <div className="ob-bonus-thumb-label">🚀 Boost Abonnés Ultime</div>
              </div>
            </div>

            <div className="ob-bump-price-row">
              <span className="ob-bump-price-old">Valeur réelle : 127€</span>
              <span className="ob-bump-price-new">47€</span>
              <span className="ob-bump-price-tag">-63%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0" }}>
              <div
                onClick={() => setBumpAdded(true)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", padding: "16px 20px", background: bumpAdded ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)", border: bumpAdded ? "2px solid #22c55e" : "2px solid rgba(255,255,255,0.1)", borderRadius: 8, transition: "all 0.2s" }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: bumpAdded ? "#22c55e" : "#2a2a2a", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {bumpAdded && <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>✓ OUI, je veux les 2 logiciels secrets qui automatisent mon système TikTok</span>
              </div>
              <div
                onClick={() => setBumpAdded(false)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", padding: "16px 20px", background: !bumpAdded ? "rgba(232,17,10,0.08)" : "rgba(255,255,255,0.03)", border: !bumpAdded ? "2px solid #e8110a" : "2px solid rgba(255,255,255,0.1)", borderRadius: 8, transition: "all 0.2s" }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: !bumpAdded ? "#e8110a" : "#2a2a2a", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {!bumpAdded && <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>✗</span>}
                </div>
                <span style={{ color: "#e8110a", fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>NON, je préfère construire mon système sans les outils qui le font tourner en automatique</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ob-summary-box">
        <div className="ob-order-summary">
          <h3>📋 RÉCAPITULATIF DE COMMANDE</h3>
          <div className="ob-order-line"><span>🤖 Système DigiDrop (méthode complète)</span><span className="price">97€</span></div>
          {bumpAdded && (
            <div className="ob-order-line"><span>👑 Pack Bonus Secret (2 logiciels)</span><span className="price">47€</span></div>
          )}
          <div className="ob-order-line ob-bonus-line">
            <span className="ob-bonus-label">
              <span className="ob-bonus-title">🎁 Accède à mon Whatsapp PRIVÉ pour me poser des questions en cas de blocage</span>
              <CountdownTimer hours={32} />
            </span>
            <span className="price ob-bonus-price">
              <span className="ob-old">347€</span>
              <span className="ob-free">GRATUIT</span>
            </span>
          </div>
          <div className="ob-order-line"><span>🔴 Réduction Offre Live</span><span className="ob-badge-red">-100€</span></div>
          <div className="ob-total-old">Prix total : <span style={{ textDecoration: "line-through" }}>{bumpAdded ? "244€" : "197€"}</span></div>
          <div className="ob-order-line total"><span>TOTAL</span><span className="price">{total}</span></div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ color: "#a855f7", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Nom & Prénom</div>
            <input
            type="text"
            required
            placeholder="Jean Dupont"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: "100%",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              color: "#f2ead8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              padding: "14px 16px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          </div>
          <div>
            <div style={{ color: "#a855f7", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</div>
            <input
            type="email"
            required
            placeholder="jean@example.com"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            style={{
              width: "100%",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              color: "#f2ead8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              padding: "14px 16px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          </div>
        </div>

        {fieldError && (
          <p style={{ color: "#e8110a", fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>
            {fieldError}
          </p>
        )}
        <button
          onClick={() => {
            const nameMissing = customerName.trim().length === 0;
            const emailMissing = customerEmail.trim().length === 0;
            if (nameMissing && emailMissing) {
              setFieldError("* Veuillez renseigner votre prénom & nom et votre email avant de continuer.");
              return;
            }
            if (nameMissing) {
              setFieldError("* Veuillez renseigner votre prénom et nom.");
              return;
            }
            if (emailMissing) {
              setFieldError("* Veuillez renseigner votre adresse email.");
              return;
            }
            setFieldError("");
            sessionStorage.setItem("declic_name", customerName.trim());
            sessionStorage.setItem("declic_email", customerEmail.trim());
            const url = bumpAdded
              ? "https://revolut.me/ilias_business?currency=EUR&amount=14400&note=Formation%20%20%20Logiciel%20d%27automatisation"
              : "https://revolut.me/ilias_business?currency=EUR&amount=9700&note=Le%20Système%20pirate%20complet";
            window.open(url, "_blank", "noopener,noreferrer");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: 1,
            textAlign: "center",
            padding: "18px 20px",
            marginBottom: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            boxSizing: "border-box",
          }}
        >
          Payer par carte — {bumpAdded ? "144" : "97"}€
        </button>
        {(() => {
          const klarnaLinkBase = "https://buy.stripe.com/dRmfZhafw6RyeQ0dt86wE04";
          const klarnaLinkBump = "https://buy.stripe.com/7sY4gzbjA1xegY83Sy6wE01";
          const klarnaLink = bumpAdded ? klarnaLinkBump : klarnaLinkBase;
          const klarnaInstalment = bumpAdded ? "3x 48€" : "3x 32,33€";
          return (
            <>
              <button
                className="ob-klarna-btn"
                onClick={() => {
                  const nameMissing = customerName.trim().length === 0;
                  const emailMissing = customerEmail.trim().length === 0;
                  if (nameMissing && emailMissing) {
                    setFieldError("* Veuillez renseigner votre prénom & nom et votre email avant de continuer.");
                    return;
                  }
                  if (nameMissing) {
                    setFieldError("* Veuillez renseigner votre prénom et nom.");
                    return;
                  }
                  if (emailMissing) {
                    setFieldError("* Veuillez renseigner votre adresse email.");
                    return;
                  }
                  setFieldError("");
                  sessionStorage.setItem("declic_name", customerName.trim());
                  sessionStorage.setItem("declic_email", customerEmail.trim());
                  window.open(klarnaLink, "_blank", "noopener,noreferrer");
                }}
              >
                Payer en 3x avec&nbsp;
                <span className="ob-klarna-logo">klarna</span>
              </button>
              <p className="ob-klarna-sub">Sans frais — {klarnaInstalment}</p>
            </>
          );
        })()}
        <p style={{ textAlign: "center", fontSize: 12, color: "#555", marginBottom: 24, marginTop: 16 }}>
          🔒 Paiement sécurisé avec Revolut · SSL 256 bits
        </p>
      </div>
    </div>
  );
};

export default Orderbump;
