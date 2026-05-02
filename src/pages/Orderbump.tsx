import { useState, useEffect, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const STRIPE_PK =
  "pk_live_51SNc4KQ9u6EzX6YbcWbV1iXFA96SnuLahor9v5y1IzYIKpFnY3ThpDbsBLZwxJ1Pm5HwX23FHXU1Q5bZc5pl57Hb00mhAZFOcM";
const PI_URL =
  "https://tebqeeyvcgupwaoqfdod.supabase.co/functions/v1/create-payment-intent";
const PI_AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps";

const stripePromise = loadStripe(STRIPE_PK);

const PaymentForm = ({
  bumpAdded,
  total,
  prenom,
  setPrenom,
  email,
  setEmail,
}: {
  bumpAdded: boolean;
  total: string;
  prenom: string;
  setPrenom: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!stripe || !elements) return;
    if (!prenom.trim() || !email.trim()) {
      setErrorMsg("Merci de renseigner ton prénom et ton email.");
      return;
    }

    setLoading(true);

    sessionStorage.setItem("declic_email", email);
    sessionStorage.setItem("declic_bump", bumpAdded ? "1" : "0");

    try {
      const tokenRes = await fetch(
        "https://tebqeeyvcgupwaoqfdod.supabase.co/functions/v1/create-upsell-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: PI_AUTH,
          },
          body: JSON.stringify({ email }),
        }
      );
      const tokenData = await tokenRes.json();
      const returnUrl = `${window.location.origin}/upsell0?token=${tokenData.token}`;

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: {
            billing_details: { name: prenom, email },
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || "Le paiement a échoué.");
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ob-pay-form">
      <div className="ob-field-row">
        <div className="ob-field">
          <label>Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Ton prénom"
            required
          />
        </div>
        <div className="ob-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => {
              const v = e.target.value.trim();
              if (!v) return;
              fetch("https://tebqeeyvcgupwaoqfdod.supabase.co/rest/v1/email_leads", {
                method: "POST",
                headers: {
                  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps",
                  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYnFlZXl2Y2d1cHdhb3FmZG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjUwMjUsImV4cCI6MjA5MjkwMTAyNX0.Tm9BP4sCpefxzX3S2b3hcp7pUtH5yvHyQJhBfRIJ6Ps",
                  "Content-Type": "application/json",
                  "Prefer": "resolution=ignore-duplicates",
                },
                body: JSON.stringify({ email: v, source: "orderbump" }),
              }).catch(() => {});
            }}
            placeholder="ton@email.com"
            required
          />
        </div>
      </div>
      <div className="ob-field">
        <label>Mode de paiement</label>
        <div className="ob-card-wrap">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
      </div>
      {errorMsg && <div className="ob-error">⚠️ {errorMsg}</div>}
      <button
        type="submit"
        className="ob-pay-btn"
        disabled={!stripe || loading}
      >
        {loading ? "PAIEMENT EN COURS…" : `☠️ PAYER ${total} ET ACCÉDER MAINTENANT`}
      </button>
      <div className="ob-secure-note">
        🔒 Paiement 100% sécurisé via Stripe · Carte & Klarna disponibles
      </div>
    </form>
  );
};

const CheckoutSection = ({ bumpAdded, total }: { bumpAdded: boolean; total: string }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [piError, setPiError] = useState<string | null>(null);
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setClientSecret(null);
    setPiError(null);
    const amount = bumpAdded ? 14400 : 9700;
    fetch(PI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: PI_AUTH,
      },
      body: JSON.stringify({
        amount,
        bump: bumpAdded,
        payment_method_types: ["card", "klarna"],
      }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((data) => {
        const cs = data.clientSecret || data.client_secret;
        if (!cs) throw new Error("Réponse invalide du serveur.");
        setClientSecret(cs);
      })
      .catch((err) => {
        setPiError(err?.message || "Impossible d'initialiser le paiement.");
      });
  }, [bumpAdded]);

  if (piError) {
    return <div className="ob-error">⚠️ {piError}</div>;
  }

  if (!clientSecret) {
    return (
      <div className="ob-pay-form" style={{ textAlign: "center", color: "#888" }}>
        Chargement du paiement…
      </div>
    );
  }

  return (
    <Elements
      key={clientSecret}
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#a78bfa",
            colorBackground: "#0f0f0f",
            colorText: "#f2ead8",
            fontFamily: "'DM Sans', sans-serif",
          },
        },
      }}
    >
      <PaymentForm
        bumpAdded={bumpAdded}
        total={total}
        prenom={prenom}
        setPrenom={setPrenom}
        email={email}
        setEmail={setEmail}
      />
    </Elements>
  );
};

const Orderbump = () => {
  const [bumpAdded, setBumpAdded] = useState(true);
  const total = bumpAdded ? "144€" : "97€";

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
        .ob-add-btn { width:100%; background:#a78bfa; color:black; font-family:'Bebas Neue',sans-serif; font-size:clamp(15px,2.6vw,20px); letter-spacing:2px; padding:18px; border:none; cursor:pointer; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:all 0.2s; margin-bottom:12px; }
        .ob-add-btn:hover { filter:brightness(1.1); }
        .ob-add-btn.active { box-shadow:0 0 0 3px rgba(167,139,250,0.4), 0 0 30px rgba(167,139,250,0.5); }
        .ob-refuse-btn { width:100%; background:transparent; color:#666; font-family:'DM Sans',sans-serif; font-size:clamp(12px,2.2vw,14px); letter-spacing:1px; padding:14px; border:1px solid rgba(255,255,255,0.1); cursor:pointer; transition:all 0.2s; text-transform:uppercase; }
        .ob-refuse-btn:hover { color:#999; border-color:rgba(255,255,255,0.2); }
        .ob-refuse-btn.active { color:#a78bfa; border-color:#a78bfa; }
        .ob-summary-box { max-width:780px; margin:0 auto 60px; padding:0 20px; }
        .ob-order-summary { background:#1a1a1a; border:1px solid rgba(255,255,255,0.08); padding:30px; margin-bottom:24px; }
        .ob-order-summary h3 { font-family:'Bebas Neue',sans-serif; font-size:24px; color:white; margin-bottom:20px; letter-spacing:1px; }
        .ob-order-line { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:15px; color:#bbb; gap:12px; }
        .ob-order-line.total { border-bottom:none; font-weight:700; font-size:18px; color:white; margin-top:8px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.1); }
        .ob-order-line .price { color:#a78bfa; font-family:'Bebas Neue',sans-serif; font-size:20px; white-space:nowrap; }
        .ob-order-line.total .price { font-size:28px; }

        .ob-pay-form { background:#1a1a1a; border:1px solid rgba(167,139,250,0.25); padding:30px; display:flex; flex-direction:column; gap:18px; }
        .ob-field-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media (max-width:560px) { .ob-field-row { grid-template-columns:1fr; } }
        .ob-field { display:flex; flex-direction:column; gap:8px; }
        .ob-field label { font-family:'Bebas Neue',sans-serif; letter-spacing:2px; font-size:13px; color:#a78bfa; }
        .ob-field input { background:#0f0f0f; border:1px solid rgba(255,255,255,0.1); color:#f2ead8; font-family:'DM Sans',sans-serif; font-size:16px; padding:14px 16px; outline:none; transition:border-color 0.2s; }
        .ob-field input:focus { border-color:#a78bfa; }
        .ob-card-wrap { background:#0f0f0f; border:1px solid rgba(255,255,255,0.1); padding:16px; transition:border-color 0.2s; }
        .ob-card-wrap:focus-within { border-color:#a78bfa; }
        .ob-error { background:rgba(255,107,107,0.1); border:1px solid rgba(255,107,107,0.4); color:#ff9b9b; padding:12px 16px; font-size:14px; }
        .ob-pay-btn { width:100%; background:#7c3aed; color:white; font-family:'Bebas Neue',sans-serif; font-size:clamp(20px,4vw,30px); letter-spacing:2px; padding:22px; border:none; cursor:pointer; clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); box-shadow:0 8px 40px rgba(124,58,237,0.4); animation:ob-pulse 2s ease-in-out infinite; transition:all 0.2s; }
        .ob-pay-btn:disabled { opacity:0.6; cursor:not-allowed; animation:none; }
        @keyframes ob-pulse { 0%,100%{box-shadow:0 8px 40px rgba(124,58,237,0.4);} 50%{box-shadow:0 8px 60px rgba(124,58,237,0.7);} }
        .ob-pay-btn:hover:not(:disabled) { filter:brightness(1.1); }
        .ob-secure-note { text-align:center; font-size:12px; color:#666; margin-top:4px; }
      `}</style>

      <div className="ob-hero">
        <div className="ob-step-badge">⚓ ÉTAPE 2 SUR 2 — FINALISE TA COMMANDE</div>
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
              <div className="subtitle">Ajouter à ma commande</div>
              <h2>☠️ Accès à mon compte TikTok secret<br />— Analyse & Copie ma machine à vendre</h2>
            </div>
          </div>
          <div className="ob-bump-body">
            <div className="ob-secret-badge">🔒 JAMAIS MONTRÉ PUBLIQUEMENT</div>
            <p>J'ai plusieurs dizaines de comptes TikTok qui vendent des produits digitaux chaque jour à ma place. <strong>Je ne les montre jamais.</strong> Pourquoi ? Parce que si tout le monde les connaît, ils perdent de leur efficacité.</p>
            <p>Mais aujourd'hui, <em>uniquement sur cette page</em>, je t'ouvre les portes d'un de mes meilleurs comptes — celui qui convertit le plus. Tu verras exactement :</p>
            <ul className="ob-bump-features">
              <li><span className="icon">👁️</span><span>La structure exacte de mes carrousels qui génèrent des ventes avec 1000 vues seulement</span></li>
              <li><span className="icon">🎯</span><span>Les hooks que j'utilise et qui stoppent le scroll en moins de 2 secondes</span></li>
              <li><span className="icon">💰</span><span>Comment j'ai organisé mon compte pour que l'algo me pousse en continu</span></li>
              <li><span className="icon">📋</span><span>Mes templates de carrousels à copier-coller directement dans ta stratégie</span></li>
            </ul>
            <p>Cette offre <strong>n'existe nulle part ailleurs.</strong> Elle n'est pas dans la formation. Elle n'est pas sur mon TikTok. Elle n'existera plus après cette page. C'est la seule et unique fois que je l'ouvre.</p>
            <div className="ob-urgency-bar">⚠️ Cette offre disparaît dès que tu quittes cette page. Impossible d'y revenir après.</div>
            <div className="ob-bump-price-row">
              <span className="ob-bump-price-old">Valeur réelle : 197€</span>
              <span className="ob-bump-price-new">47€</span>
              <span className="ob-bump-price-tag">-76%</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "24px 0" }}>
              <div
                onClick={() => setBumpAdded(true)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", padding: "16px 20px", background: bumpAdded ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)", border: bumpAdded ? "2px solid #22c55e" : "2px solid rgba(255,255,255,0.1)", borderRadius: 8, transition: "all 0.2s" }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: bumpAdded ? "#22c55e" : "#2a2a2a", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {bumpAdded && <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>OUI, je veux voir ton compte secret qui fait 2000€/mois en anonyme</span>
              </div>
              <div
                onClick={() => setBumpAdded(false)}
                style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", padding: "16px 20px", background: !bumpAdded ? "rgba(232,17,10,0.08)" : "rgba(255,255,255,0.03)", border: !bumpAdded ? "2px solid #e8110a" : "2px solid rgba(255,255,255,0.1)", borderRadius: 8, transition: "all 0.2s" }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 6, background: !bumpAdded ? "#e8110a" : "#2a2a2a", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  {!bumpAdded && <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>✗</span>}
                </div>
                <span style={{ color: "#e8110a", fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>NON, je préfère louper l'opportunité de pouvoir voir comment tu vends tes produits digitaux avec tes vrais comptes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ob-summary-box">
        <div className="ob-order-summary">
          <h3>📋 RÉCAPITULATIF DE COMMANDE</h3>
          <div className="ob-order-line"><span>☠️ Système Pirate (méthode complète + accompagnement)</span><span className="price">97€</span></div>
          {bumpAdded && (
            <div className="ob-order-line"><span>🔒 Accès compte TikTok secret</span><span className="price">47€</span></div>
          )}
          <div className="ob-order-line total"><span>TOTAL</span><span className="price">{total}</span></div>
        </div>

        <CheckoutSection bumpAdded={bumpAdded} total={total} />
      </div>
    </div>
  );
};

export default Orderbump;
