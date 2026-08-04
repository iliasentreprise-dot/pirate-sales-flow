import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avis1 from "@/assets/avis-1.jpeg";
import avis3 from "@/assets/avis-3.png";
import avis4 from "@/assets/avis-4.png";
import avis5 from "@/assets/avis-5.png";
import avis6 from "@/assets/avis-6.png";
import avisNoah from "@/assets/avis-noah.png";
import avisLamine from "@/assets/avis-lamine.png";
import avisProofLock from "@/assets/avis-proof-lock.png";
import mockup from "@/assets/mockup-systeme-pirate-v3.png.asset.json";
import logo from "@/assets/logo-drop-digital.png";
import PayPalCheckout from "@/components/PayPalCheckout";

const LV_MIN = 3;
const LV_MAX = 24;

const Index = () => {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState(11);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const nextTick = () => {
      setVisitors((count) => {
        let up: number, down: number, stay: number;
        if (count < 8) {
          up = 0.55; down = 0.2; stay = 0.25;
        } else if (count > 15) {
          up = 0.2; down = 0.55; stay = 0.25;
        } else {
          up = 0.33; down = 0.32; stay = 0.35;
        }
        const r = Math.random();
        let next = count;
        if (r < stay) {
          next = count;
        } else if (r < stay + up) {
          next = Math.min(LV_MAX, count + 1);
        } else {
          next = Math.max(LV_MIN, count - 1);
        }
        if (Math.random() < 0.05) {
          next = Math.min(LV_MAX, Math.max(LV_MIN, next + (Math.random() < 0.5 ? 2 : -2)));
        }
        return next;
      });
      timeoutId = window.setTimeout(nextTick, 2500 + Math.random() * 3500);
    };
    timeoutId = window.setTimeout(nextTick, 2500 + Math.random() * 3500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Inject styles
    const styleId = "systeme-pirate-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        :root {
          --sp-black: #0a0a0a;
          --sp-purple: #7c3aed;
          --sp-purple-light: #a78bfa;
          --sp-purple-dark: #6d28d9;
          --sp-cream: #f2ead8;
          --sp-white: #ffffff;
          --sp-grey: #141118;
        }
        .sp-page * { margin: 0; padding: 0; box-sizing: border-box; }
        .sp-page { background: var(--sp-black); color: var(--sp-cream); font-family: 'DM Sans', sans-serif; overflow-x: hidden; min-height: 100vh; }
        .sp-page a { text-decoration: none; }
        .fixed-nav-wrapper { position: fixed; top: 16px; left: 16px; right: 16px; z-index: 9999; display: flex; justify-content: space-between; align-items: center; pointer-events: none; }
        .fixed-nav-wrapper > * { pointer-events: auto; }
        .fixed-btn-left { background: #7c3aed; color: white; font-size: 13px; font-weight: 600; border-radius: 4px; padding: 8px 14px; border: none; cursor: pointer; }
        .fixed-btn-right { background: rgba(255,255,255,0.15); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.25); color: white; font-size: 13px; font-weight: 600; border-radius: 4px; padding: 8px 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; transform: translateX(120%); animation: slideInRight 0.6s ease-out 1.5s forwards; }
        @keyframes slideInRight { to { transform: translateX(0); } }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #a78bfa; animation: blink-dot 0.8s infinite alternate; }
        @keyframes blink-dot { from { opacity: 1; } to { opacity: 0.2; } }
        @media (max-width: 768px) {
          .sp-page { padding-top: 80px; }
          .fixed-nav-wrapper { top: 0; left: 0; right: 0; flex-direction: column; align-items: stretch; }
          .fixed-btn-right { order: -1; width: 100%; height: 36px; font-size: 12px; border-radius: 0; padding: 0; justify-content: center; text-align: center; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); transform: none; animation: none; }
          .fixed-btn-left { width: 100%; height: 44px; font-size: 15px; font-weight: 700; border-radius: 0; padding: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 1px; }
        }
        .hero { min-height: 100vh; background: var(--sp-black); background-image: radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.16) 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 20px; position: relative; border-bottom: 2px solid var(--sp-purple); }
        .badge-top { background: var(--sp-purple); color: white; font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 3px; padding: 8px 20px; margin-bottom: 30px; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); max-width: 680px; }
        .price-block { margin: 30px 0; }
        .price-old { font-size: 18px; color: #888; text-decoration: line-through; margin-bottom: 4px; }
        .price-new { font-family: 'Bebas Neue', sans-serif; font-size: 68px; color: var(--sp-purple-light); line-height: 1; letter-spacing: -1px; }
        .price-note { font-size: 13px; color: #888; margin-top: 4px; }
        .btn-cta { display: inline-block; background: var(--sp-purple); color: white; font-family: 'Bebas Neue', sans-serif; font-size: clamp(22px, 4vw, 34px); letter-spacing: 1.5px; padding: 20px 46px; border: none; cursor: pointer; clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%); box-shadow: 0 8px 40px rgba(124,58,237,0.45); animation: pulse-btn 2.2s ease-in-out infinite; margin: 10px 0; transition: all 0.2s; }
        @keyframes pulse-btn { 0%, 100% { box-shadow: 0 8px 40px rgba(124,58,237,0.45); transform: scale(1); } 50% { box-shadow: 0 8px 55px rgba(124,58,237,0.7); transform: scale(1.015); } }
        .btn-cta:hover { background: var(--sp-purple-dark); transform: scale(1.04) !important; }
        .cta-arrow { display: inline-block; margin-left: 10px; animation: cta-bounce 0.7s ease-in-out infinite alternate; }
        @keyframes cta-bounce { from { transform: translateY(0); } to { transform: translateY(6px); } }
        .btn-sub { display: block; font-size: 12px; color: #666; margin-top: 10px; }
        .divider { width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--sp-purple), transparent); margin: 0; }

        .neon-live { display:inline-block; background:#050505; color:#fff; font-family:'Bebas Neue',sans-serif; font-size:15px; letter-spacing:3px; padding:9px 24px; border-radius:4px; border:1px solid #ff4444; text-shadow:0 0 8px #ff5555, 0 0 16px #ff5555; box-shadow:0 0 10px #e8110a, 0 0 25px #e8110a, 0 0 45px rgba(232,17,10,0.55); animation:neonPulse 1.6s ease-in-out infinite; margin:0 auto 16px; }
        @keyframes neonPulse {
          0%, 100% { box-shadow:0 0 10px #e8110a, 0 0 25px #e8110a, 0 0 45px rgba(232,17,10,0.55); text-shadow:0 0 8px #ff5555, 0 0 16px #ff5555; }
          50% { box-shadow:0 0 18px #ff4444, 0 0 42px #ff4444, 0 0 75px rgba(255,68,68,0.85); text-shadow:0 0 14px #ff8888, 0 0 30px #ff8888; }
        }

        .eyebrow-small { font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 2px; color: var(--sp-purple-light); margin-bottom: 16px; display: block; text-transform: uppercase; }
        .section-tag { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 5px; color: var(--sp-purple); margin-bottom: 16px; display: block; }

        .urgency-box { background:#0f0d13; border:1px solid var(--sp-purple); border-radius:8px; padding:18px 20px; margin: 0 auto 24px; max-width:480px; width:90%; }
        .urgency-title { font-family:'Bebas Neue',sans-serif; font-size:16px; color:var(--sp-purple-light); text-align:center; letter-spacing: 0.5px; }
        .urgency-sub { font-size: 12.5px; color: #888; text-align: center; margin-top: 6px; }

        .content { padding: 76px 20px; max-width: 860px; margin: 0 auto; }
        .content h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px,5.5vw,58px); line-height: 1.05; color: white; margin-bottom: 26px; }
        .content h2 em { color: var(--sp-purple-light); font-style: normal; }
        .content p { font-size: 17px; line-height: 1.75; color: #ccc; margin-bottom: 18px; }
        .content p strong { color: var(--sp-cream); }
        .content p.big { font-size: 19px; color: var(--sp-purple-light); font-weight: 600; }

        .grey-section { background: var(--sp-grey); padding: 76px 20px; border-top: 2px solid rgba(255,255,255,0.05); border-bottom: 2px solid rgba(255,255,255,0.05); }

        .problem-list { list-style: none; margin: 26px 0; }
        .problem-list li { display: flex; align-items: flex-start; gap: 14px; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 16.5px; color: #bbb; }
        .problem-list li .icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; color: var(--sp-purple-light); }

        .module-card { background: rgba(124,58,237,0.05); border: 1px solid var(--sp-purple); box-shadow: 0 0 20px rgba(124,58,237,0.35); padding: 24px; margin-bottom: 16px; }
        .module-card .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 13px; color: var(--sp-purple-light); letter-spacing: 3px; margin-bottom: 8px; display: block; }
        .module-card h3 { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: white; margin-bottom: 10px; letter-spacing: 0.3px; }
        .module-card p { font-size: 15.5px; color: #bbb; line-height: 1.7; }

        .highlight-box { background: rgba(124,58,237,0.08); border: 1px solid var(--sp-purple); box-shadow: 0 0 25px rgba(124,58,237,0.4); padding: 28px; margin-top: 30px; text-align: center; }
        .highlight-box p { font-size: 17px; color: #bbb; line-height: 1.75; }

        .proof-section { padding: 76px 20px; max-width: 900px; margin: 0 auto; }
        .proof-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: clamp(28px,5vw,48px) clamp(20px,4vw,38px); text-align: center; }
        .proof-box h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px,5.5vw,56px); line-height: 1.05; color: white; margin-bottom: 8px; }
        .proof-box h2 em { color: var(--sp-purple-light); font-style: normal; }
        .proof-box .sub { font-size: 16px; color: #888; }
        .results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin: 36px 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
        .result-stat { background: var(--sp-black); padding: 28px 18px; text-align: center; }
        .result-stat .number { font-family: 'Bebas Neue', sans-serif; font-size: 50px; color: var(--sp-purple-light); line-height: 1; }
        .result-stat .label { font-size: 12.5px; color: #666; margin-top: 6px; text-transform: uppercase; letter-spacing: 1px; }
        .avis-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 36px; }
        @media (max-width: 700px) { .avis-grid { grid-template-columns: repeat(2, 1fr); } .results-grid { grid-template-columns: 1fr; } .btn-cta { padding: 18px 30px; } }
        .avis-card { background: #0f0f0f; border: 2px solid #7c3aed; border-radius: 12px; padding: 8px; box-shadow: 0 0 16px rgba(124,58,237,0.4), 0 0 32px rgba(124,58,237,0.15); overflow: hidden; }
        .avis-card img { width: 100%; height: auto; display: block; border-radius: 8px; object-fit: cover; }

        .value-section { padding: 76px 20px; max-width: 860px; margin: 0 auto; text-align: center; }
        .value-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px,5.5vw,56px); line-height: 1.05; color: white; margin-bottom: 28px; }
        .value-mockup { width: 100%; max-width: 640px; display: block; margin: 0 auto 30px; border-radius: 12px; border: 2px solid #7c3aed; box-shadow: 0 0 30px rgba(124,58,237,0.4); }
        .value-list { list-style: none; max-width: 580px; margin: 0 auto; text-align: left; }
        .value-list li { background: #111; border-left: 3px solid var(--sp-purple); padding: 12px 16px; margin-bottom: 2px; color: #ccc; font-size: 15px; display: flex; justify-content: space-between; gap: 10px; }
        .value-price { color: var(--sp-purple-light); font-weight: 700; white-space: nowrap; }
        .value-offer-box { background: #151018; border: 2px solid var(--sp-purple); border-radius: 8px; max-width: 480px; margin: 36px auto 0; padding: 28px; text-align: center; }
        .strike-price { font-size: 20px; color: #666; text-decoration: line-through; margin-bottom: 6px; }
        .drop-arrow { font-size: 28px; color: var(--sp-purple); display: block; margin: 14px auto; }
        .live-label { font-family: 'Bebas Neue', sans-serif; font-size: 17px; color: var(--sp-purple-light); }

        .access-section { background: var(--sp-grey); padding: 68px 20px; text-align: center; }
        .access-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px,5.5vw,56px); color: white; line-height: 1.05; margin-bottom: 20px; }
        .access-section h2 span { color: var(--sp-purple-light); }

        .guarantee-section { background: linear-gradient(135deg, #0f0d13, #170a26); border-top: 2px solid var(--sp-purple-light); border-bottom: 2px solid var(--sp-purple-light); padding: 76px 20px; text-align: center; }
        .guarantee-badge { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, var(--sp-purple-light), var(--sp-purple), var(--sp-purple-dark)); box-shadow: 0 0 0 8px rgba(124,58,237,0.18), 0 0 0 16px rgba(124,58,237,0.09), 0 20px 60px rgba(124,58,237,0.3); margin: 0 auto 36px; animation: medal-glow 2s ease-in-out infinite; }
        @keyframes medal-glow { 0%, 100% { box-shadow: 0 0 0 8px rgba(124,58,237,0.18), 0 0 0 16px rgba(124,58,237,0.09), 0 20px 60px rgba(124,58,237,0.3); } 50% { box-shadow: 0 0 0 12px rgba(124,58,237,0.28), 0 0 0 24px rgba(124,58,237,0.14), 0 20px 80px rgba(124,58,237,0.5); } }
        .guarantee-badge .t1 { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 3px; color: rgba(255,255,255,0.85); }
        .guarantee-badge .t2 { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: rgba(255,255,255,0.95); margin: 6px 0; }
        .guarantee-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px, 5.5vw, 56px); color: var(--sp-purple-light); margin-bottom: 18px; }
        .guarantee-section p { font-size: 17px; color: #bbb; max-width: 560px; margin: 0 auto 18px; line-height: 1.7; }
        .guarantee-section p strong { color: var(--sp-white); }
        .guarantee-box { background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.2); max-width: 560px; margin: 26px auto 0; padding: 24px 28px; font-size: 15.5px; color: #bbb; line-height: 1.7; text-align: left; }

        .faq-section { padding: 76px 20px; max-width: 780px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 20px 0; }
        .faq-item .q { font-weight: 700; color: white; font-size: 16px; margin-bottom: 8px; display: flex; gap: 10px; }
        .faq-item .q .qmark { color: var(--sp-purple-light); flex-shrink: 0; }
        .faq-item .a { font-size: 15px; color: #bbb; line-height: 1.65; padding-left: 24px; }

        .final-cta { padding: 96px 20px; text-align: center; background: radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%); }
        .final-cta h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 6vw, 68px); color: var(--sp-white); margin-bottom: 14px; line-height: 1.05; }
        .final-cta h2 span { color: var(--sp-purple-light); }
        .final-cta p { font-size: 17px; color: #999; margin-bottom: 30px; max-width: 520px; margin-left: auto; margin-right: auto; }

        .sp-footer { border-top: 1px solid rgba(255,255,255,0.05); padding: 30px 20px; text-align: center; font-size: 13px; color: #444; }

        .social-proof-notif { position: fixed; top: 70px; right: 20px; z-index: 9998; background: rgba(10,10,10,0.95); border: 2px solid #BF00FF; border-radius: 12px; padding: 20px 28px; display: flex; align-items: center; gap: 12px; min-width: 320px; box-shadow: 0 0 10px #BF00FF, 0 0 20px #BF00FF; transform: translateX(120%); transition: transform 0.5s ease-in-out; }
        .social-proof-notif.show { transform: translateX(0); }
        .social-proof-notif.hide { transform: translateX(120%); }
        .social-proof-notif .fire-emoji { font-size: 24px; flex-shrink: 0; }
        .social-proof-notif .notif-text { color: white; font-size: 16px; font-weight: 500; line-height: 1.4; }
        @media (max-width: 768px) { .social-proof-notif { top: 90px; right: 10px; width: 220px; min-width: auto; padding: 12px 16px; } .social-proof-notif .notif-text { font-size: 13px; } }

        .floating-logo { width: 180px; height: 180px; border-radius: 24px; box-shadow: 0 0 40px rgba(124,58,237,0.7), 0 0 80px rgba(124,58,237,0.3); animation: logo-float 3.5s ease-in-out infinite; object-fit: contain; background: rgba(124,58,237,0.05); padding: 8px; }
        @keyframes logo-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @media (max-width: 600px) { .floating-logo { width: 140px; height: 140px; } }

        .live-visitors { position: fixed; bottom: 20px; left: 20px; z-index: 9998; background: rgba(10,10,10,0.92); backdrop-filter: blur(8px); border: 1px solid rgba(124,58,237,0.45); color: #f2ead8; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.25); animation: lv-slide-in 0.6s ease-out 0.8s both; max-width: calc(100vw - 40px); }
        .live-visitors-dot { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 0 rgba(34,197,94,0.7); animation: lv-pulse 1.6s infinite; flex-shrink: 0; }
        .live-visitors-count { color: #a78bfa; font-weight: 700; }
        @keyframes lv-pulse { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.7); } 70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
        @keyframes lv-slide-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) { .live-visitors { bottom: 12px; left: 12px; right: 12px; font-size: 12px; padding: 9px 12px; } }
      `;
      document.head.appendChild(style);
    }

    // Social proof notifs
    const names = ["Sophie","Lucas","Camille","Nathan","Léa","Maxime","Chloé","Hugo","Inès","Thomas","Manon","Enzo","Julie","Romain","Sarah","Alexis","Emma","Théo","Laura","Kevin"];
    const emojis = ['⚡','🔥','✅','💰'];
    const container = document.getElementById('social-proof-container');
    const showNotif = () => {
      if (!container) return;
      const name = names[Math.floor(Math.random() * names.length)];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const notif = document.createElement('div');
      notif.className = 'social-proof-notif';
      notif.innerHTML = `<span class="fire-emoji">${emoji}</span><div class="notif-text">${name} vient de rejoindre DigiDrop Academy</div>`;
      container.appendChild(notif);
      requestAnimationFrame(() => notif.classList.add('show'));
      setTimeout(() => { notif.classList.remove('show'); notif.classList.add('hide'); setTimeout(() => notif.remove(), 500); }, 2500);
    };
    const t1 = setTimeout(showNotif, 3000);
    const t2 = setInterval(showNotif, 30000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  const goOrderbump = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/orderbump');
  };

  const handlePayPalSuccess = useCallback((email: string) => {
    if (email) sessionStorage.setItem("declic_email", email);
    navigate("/merci");
  }, [navigate]);

  return (
    <div className="sp-page">
      <div className="live-visitors" aria-live="polite">
        <span className="live-visitors-dot"></span>
        <span><span className="live-visitors-count">{visitors}</span> {visitors > 1 ? 'personnes consultent' : 'personne consulte'} cette page en ce moment</span>
      </div>
      <div className="fixed-nav-wrapper">
        <a href="/orderbump" className="fixed-btn-left" onClick={goOrderbump}>Réserver mon accès</a>
        <a href="/orderbump" className="fixed-btn-right" onClick={goOrderbump}>
          <span className="live-dot"></span>
          <span>Offre LIVE</span>
        </a>
      </div>

      {/* ============ HERO ============ */}
      <section className="hero">
        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img src={logo} alt="Drop Digital" className="floating-logo" />
        </div>
        <div className="badge-top">SYSTÈME AUTOMATISÉ · VENTE DE PRODUITS DIGITAUX SUR TIKTOK</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(34px,6.5vw,74px)', letterSpacing: '-0.5px', color: 'white', lineHeight: 1, marginBottom: 20, maxWidth: 900 }}>
          Ton téléphone peut vendre.<br />Même quand tu n'y <span style={{ color: '#a78bfa' }}>touches pas</span>.
        </h1>
        <p style={{ fontSize: 'clamp(16px,2.6vw,20px)', color: 'var(--sp-cream)', opacity: 0.88, maxWidth: 680, margin: '0 auto 8px', lineHeight: 1.55 }}>
          DigiDrop transforme de simples carrousels TikTok en machine à vendre des ebooks — <strong style={{ color: 'var(--sp-purple-light)' }}>sans montrer ton visage, sans audience de départ, sans budget pub.</strong><br />Premières ventes dès la première semaine. Garanti, ou remboursé.
        </p>
        <div className="neon-live">⚡ OFFRE LIVE</div>
        <div className="price-block">
          <div className="price-old">297€</div>
          <div className="price-new">144€</div>
          <div className="price-note">Prix du batch en cours · Remonte au prochain palier de 20 élèves</div>
        </div>
        <a href="/orderbump" onClick={goOrderbump} className="btn-cta">REJOINDRE DIGIDROP ACADEMY<span className="cta-arrow">↓</span></a>
        <span className="btn-sub">Accès immédiat · Paiement sécurisé · Garanti ou remboursé</span>
      </section>

      <div className="divider"></div>

      {/* ============ RÊVE ============ */}
      <div className="content">
        <span className="eyebrow-small">VISUALISE ÇA</span>
        <h2>Ton téléphone vibre. Encore une <em>notification</em>.</h2>
        <p>Une vente. Puis une autre. Tu n'as rien fait aujourd'hui — pas de vidéo tournée, pas de client à rassurer en message, pas de visage à montrer. Juste un carrousel posté hier soir, qui continue de tourner tout seul pendant que tu es ailleurs : au travail, en train de dormir, en train de vivre ta vie normalement.</p>
        <p className="big">C'est exactement ce que vivent aujourd'hui les élèves dont le système tourne déjà.</p>
      </div>

      <div className="divider"></div>

      {/* ============ ÉCHEC ============ */}
      <div className="grey-section">
        <div className="content" style={{ padding: 0, maxWidth: 780 }}>
          <span className="eyebrow-small">SI TU AS DÉJÀ ESSAYÉ SANS RÉSULTAT</span>
          <h2>Ce n'est pas un problème de <em>talent</em>.</h2>
          <p>Tu as regardé des dizaines de vidéos YouTube. Tu as peut-être déjà acheté une formation. Résultat : toujours zéro vente.</p>
          <p>Ce n'est pas ta faute. 90% de ce qu'on te montre en ligne, c'est la version édulcorée — la stratégie qu'on te donne pour te garder accroché au contenu, jamais celle qui fait vraiment rentrer l'argent.</p>
          <ul className="problem-list">
            <li><span className="icon">✕</span><span>Tu crées du contenu pendant des heures pour 300 vues et 0 vente</span></li>
            <li><span className="icon">✕</span><span>Tu n'as toujours pas d'offre — juste des idées de contenu qui s'accumulent</span></li>
            <li><span className="icon">✕</span><span>On t'a fait croire qu'il fallait 10K abonnés avant de gagner un centime</span></li>
            <li><span className="icon">✕</span><span>Tu bosses gratuitement pendant que d'autres encaissent sans jamais montrer leur visage</span></li>
          </ul>
          <p>Le problème n'a jamais été ton contenu. C'est que personne ne t'a montré le système complet — l'offre, le tunnel, et la mécanique qui transforme un inconnu en acheteur en moins de 48h.</p>
        </div>
      </div>

      <div className="divider"></div>

      {/* ============ PEUR ============ */}
      <div className="content">
        <span className="eyebrow-small">CE QUI NE CHANGERA PAS SI TU ATTENDS</span>
        <h2>Dans 6 mois, <em>rien n'aura bougé</em> — sauf le calendrier.</h2>
        <p>Si tu continues exactement comme aujourd'hui, voici ce qui t'attend dans 6 mois : encore une centaine de vidéos "comment gagner de l'argent en ligne" regardées, peut-être encore une formation achetée, et le même chiffre affiché sur ton compte en banque.</p>
        <p>Pendant ce temps, d'autres — sans plus de talent que toi, sans montrer leur visage — auront posté leur 200e, 300e carrousel. Ce n'est pas une question de mérite. C'est une question de qui a commencé, et qui a encore attendu.</p>
        <p>Dans la vente de produits digitaux, ceux qui galèrent sur le long terme, ce sont ceux qui misent tout sur du contenu créé à la main, jour après jour, pour encaisser manuellement. Toi, tu peux sauter direct cette étape : démarrer avec un système automatisé qui tourne 24h/24, sans jamais avoir à filmer, poster ou relancer qui que ce soit. Plus tu attends pour commencer avec l'automatisation en place, plus l'écart se creuse avec ceux qui l'auront déjà — et il ne se referme jamais.</p>
      </div>

      <div className="divider"></div>

      {/* ============ ENNEMI ============ */}
      <div className="grey-section">
        <div className="content" style={{ padding: 0, maxWidth: 780 }}>
          <span className="eyebrow-small">CE QU'ON NE TE DIT PAS</span>
          <h2>Ceux qui vendent le rêve ne te diront <em>jamais la vérité</em>.</h2>
          <p>La plupart des formations business en ligne ne montrent jamais le système qui tourne derrière — <strong>ni le compte, ni le tunnel, ni la stratégie.</strong> Certaines vendent même une méthode <strong>qu'ils n'appliquent plus eux-mêmes</strong>, ou qui ne représente <strong>qu'une fraction de leurs vraies ventes</strong>. Juste des captures de revenus, jamais le mécanisme.</p>
          <p>DigiDrop, c'est <strong>le système complet</strong>, pas la version édulcorée. Celui que j'utilise moi-même <strong>depuis plus d'un an</strong>, sur <strong>une vingtaine de comptes TikTok anonymes et automatisés</strong> — sans visage, sans audience, sans stock.</p>
        </div>
      </div>

      <div className="divider"></div>

      {/* ============ DOUTE (transition) ============ */}
      <div className="content">
        <span className="eyebrow-small">TU TE DIS PEUT-ÊTRE</span>
        <h2>"Ça a l'air trop <em>simple</em> pour être vrai."</h2>
        <p>C'est la réaction normale — et c'est exactement pour ça que la section suivante n'a que des chiffres et des preuves concrètes, pas des promesses.</p>
      </div>

      <div className="divider"></div>

      {/* ============ PREUVE ============ */}
      <div className="proof-section">
        <div className="proof-box">
          <span className="eyebrow-small">PREUVES RÉELLES</span>
          <h2>Des résultats. <em>Pas des promesses.</em></h2>
          <p className="sub">Le système tourne. Les chiffres parlent.</p>
          <div className="results-grid">
            <div className="result-stat"><div className="number">20</div><div className="label">Comptes TikTok actifs</div></div>
            <div className="result-stat"><div className="number">1 an</div><div className="label">Business model éprouvé</div></div>
            <div className="result-stat"><div className="number">J7</div><div className="label">Premières ventes garanties</div></div>
          </div>
        </div>

        <div style={{ height: 2, margin: '56px auto', maxWidth: 560, background: 'linear-gradient(90deg, transparent, var(--sp-purple), transparent)' }}></div>

        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4.5vw,46px)', lineHeight: 1.05, color: 'white', marginBottom: 28 }}>Ce que disent <em style={{ color: 'var(--sp-purple-light)', fontStyle: 'normal' }}>les élèves</em></h2>
        <div className="avis-grid">
          {[avisLamine, avisProofLock, avisNoah, avis1, avis3, avis4, avis5, avis6].map((src, i) => (
            <div key={i} className="avis-card" onClick={() => setZoomedImg(src)} style={{ cursor: 'zoom-in' }}>
              <img src={src} alt={`Avis client ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      {/* ============ MÉCANISME ============ */}
      <div className="grey-section">
        <div className="content" style={{ padding: 0, maxWidth: 860 }}>
          <span className="eyebrow-small">COMMENT ÇA MARCHE — SIMPLE, RAPIDE, FACILE</span>
          <h2>Trois étapes. <em>C'est tout.</em></h2>
          <div className="module-card">
            <span className="step-num">ÉTAPE 1</span>
            <h3>Tu crées ton produit digital en 5 minutes</h3>
            <p>L'outil IA inclus te génère un ebook complet et une page de vente prête à encaisser. Zéro compétence requise, zéro temps perdu.</p>
          </div>
          <div className="module-card">
            <span className="step-num">ÉTAPE 2</span>
            <h3>Le tunnel DigiDrop transforme les vues en ventes</h3>
            <p>Un tunnel de vente pensé pour convertir, qui pousse chaque visiteur à l'achat sans que tu aies à négocier ou relancer qui que ce soit.</p>
          </div>
          <div className="module-card">
            <span className="step-num">ÉTAPE 3</span>
            <h3>Des carrousels automatisés vendent à ta place</h3>
            <p>Pas de vidéo à filmer, pas de montage, pas de visage. De simples images racontant une histoire émotionnelle, postées automatiquement sur TikTok, qui amènent les bonnes personnes directement vers ton tunnel.</p>
          </div>
          <div className="highlight-box">
            <p>Un système qui génère des ventes 24h/24 — même quand tu dors, même quand tu voyages, même quand tu fais autre chose.</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* ============ BÉNÉFICE / ESCALADE ============ */}
      <div className="content">
        <span className="eyebrow-small">CE QUI T'ATTEND</span>
        <h2>Ce que ça change, <em>semaine après semaine</em>.</h2>
        <p><strong>Dans 48h :</strong> ton premier produit est en ligne, ton premier carrousel tourne.</p>
        <p><strong>Dans une semaine :</strong> les premières ventes tombent en automatique, pendant que tu fais autre chose.</p>
        <p><strong>Dans un mois :</strong> le système tourne assez pour devenir un vrai complément de revenu.</p>
        <p><strong>Dans 2 mois :</strong> tu as déjà 2 comptes TikTok qui génèrent des ventes grâce à ton programme, automatiquement.</p>
        <p className="big">Et tout ça commence par les 5 prochaines minutes.</p>
      </div>

      <div className="divider"></div>

      {/* ============ CLOSING 1 — ANCRAGE + VALUE STACK ============ */}
      <div className="value-section">
        <h2>TOUT CE QUE TU REÇOIS<br />DANS LA DIGIDROP ACADEMY</h2>
        <img className="value-mockup" src={mockup.url} alt="DigiDrop Academy - Mockup formation" />
        <ul className="value-list">
          <li><span>✅ Le Système DigiDrop complet — 6 modules</span><span className="value-price">197€</span></li>
          <li><span>✅ Accompagnement personnalisé</span><span className="value-price">147€</span></li>
          <li><span>✅ Outil IA de génération de produit</span><span className="value-price">97€</span></li>
          <li><span>✅ Tunnel de vente à haute conversion</span><span className="value-price">97€</span></li>
          <li><span>✅ Méthode carrousels viraux et ciblés</span><span className="value-price">67€</span></li>
          <li><span>✅ Logiciel qui crée ton produit et ton site en 5 min</span><span className="value-price">47€</span></li>
          <li><span>✅ Groupe privé résultats élèves</span><span className="value-price">45€</span></li>
          <li><span>✅ Garantie 30 jours satisfait ou remboursé</span><span className="value-price">Inclus</span></li>
          <li><span>✅ Accès à vie</span><span className="value-price">Inclus</span></li>
        </ul>
        <div style={{ width: '100%', maxWidth: 580, height: 2, background: 'var(--sp-purple)', margin: '28px auto', opacity: 0.5 }}></div>
        <div className="value-offer-box">
          <div className="neon-live">⚡ OFFRE LIVE</div>
          <div className="strike-price">Prix habituel : 697€</div>
          <span className="drop-arrow">↓</span>
          <div className="live-label">Prix de lancement, tant que le palier actuel n'est pas atteint :</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 72, color: 'white', lineHeight: 1, margin: '10px 0' }}>144€</div>
          <div className="urgency-box">
            <div className="urgency-title">Le prix remonte à chaque palier de 20 nouveaux élèves</div>
            <div className="urgency-sub">Prix actuel : 144€ — tarif du batch en cours</div>
          </div>
        </div>
        <a href="/orderbump" onClick={goOrderbump} className="btn-cta" style={{ fontSize: 'clamp(17px,3.2vw,26px)', marginTop: 10 }}>REJOINDRE DIGIDROP ACADEMY<span className="cta-arrow">↓</span></a>
      </div>

      <div className="divider"></div>

      {/* ============ CLOSING 2 — ROI ============ */}
      <div id="acces" className="access-section">
        <span className="eyebrow-small">ACCÈS IMMÉDIAT</span>
        <h2>Quelques ventes, et l'investissement est <span>déjà remboursé</span>.</h2>
        <p style={{ fontSize: 17, color: '#bbb', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.7 }}>Le système coûte 144€. Tes propres produits se vendent entre 17,80€ et 47€. Il te suffit de quelques ventes pour rembourser l'investissement — tout ce qui suit, c'est du profit.</p>
        <div className="neon-live">⚡ OFFRE LIVE</div>
        <div className="price-block" style={{ margin: '20px 0' }}>
          <div className="price-old">297€</div>
          <div className="price-new">144€</div>
          <div className="price-note">Prix du batch en cours</div>
        </div>
        <div style={{ maxWidth: 560, margin: '32px auto 0' }}>
          <PayPalCheckout amount={144} onSuccess={handlePayPalSuccess} />
        </div>
        <span className="btn-sub">Accès immédiat après paiement · 100% sécurisé</span>
      </div>

      <div className="divider"></div>

      {/* ============ GARANTIE ============ */}
      <div className="guarantee-section">
        <div className="guarantee-badge">
          <div className="t1">GARANTI</div>
          <div className="t2">✓</div>
          <div className="t1">RÉSULTATS</div>
          <div className="t1" style={{ fontSize: 10, marginTop: 2 }}>PREMIÈRE SEMAINE</div>
        </div>
        <h2>Garanti ou remboursé</h2>
        <p>Je suis tellement convaincu que ce système fonctionne que je prends tout le risque à ta place.</p>
        <div className="guarantee-box">
          <strong style={{ color: 'var(--sp-purple-light)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 19, letterSpacing: 0.5, display: 'block', marginBottom: 12 }}>LA GARANTIE DIGIDROP</strong>
          Tu appliques le système pendant 30 jours. Si à la fin de ces 30 jours tu n'as pas de résultats — pas une seule vente — <strong>je te rembourse intégralement, sur le champ.</strong> Sans question. Sans délai.<br /><br />
          <span style={{ color: 'var(--sp-purple-light)', fontSize: 14 }}>Cette garantie existe parce que je sais que ça marche. Pas parce que je suis sympa.</span>
        </div>
      </div>

      <div className="divider"></div>

      {/* ============ FAQ ============ */}
      <div className="faq-section">
        <span className="eyebrow-small">CE QUE TU TE DEMANDES SÛREMENT</span>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4.5vw,44px)', color: 'white', marginBottom: 20 }}>Questions fréquentes</h2>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>Je n'ai aucune compétence technique, ça va marcher pour moi ?</div>
          <div className="a">Le système génère ton produit et ta page de vente en 5 minutes avec l'outil IA inclus. Zéro compétence requise pour démarrer.</div>
        </div>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>Je n'ai pas d'audience ni de budget pub, c'est un problème ?</div>
          <div className="a">C'est exactement le point du système : les carrousels automatisés tournent sans audience de départ et sans budget publicitaire.</div>
        </div>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>TikTok c'est saturé, ça marche encore pour vendre ?</div>
          <div className="a">Le format carrousel anonyme reste largement sous-exploité comparé aux vidéos face caméra — c'est justement pour ça que ça marche encore aussi bien.</div>
        </div>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>Je n'ai pas beaucoup de temps à y consacrer.</div>
          <div className="a">Le système est fait pour tourner en automatique une fois lancé. Le temps investi est concentré au démarrage, pas en continu.</div>
        </div>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>Et si ça ne marche pas pour moi ?</div>
          <div className="a">Garantie 30 jours : zéro vente à la fin du mois, tu es remboursé intégralement, sans justification à donner.</div>
        </div>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>Est-ce que je peux commencer même si je pars de zéro ?</div>
          <div className="a">Oui — le système est pensé pour un démarrage à zéro : zéro audience, zéro produit existant, zéro compétence technique préalable.</div>
        </div>
        <div className="faq-item">
          <div className="q"><span className="qmark">?</span>Si ça marche, pourquoi tu formes des gens à faire pareil au lieu de le garder pour toi ?</div>
          <div className="a">Parce que vendre des ebooks sur TikTok et transmettre le système, ce sont deux activités différentes. TikTok touche des centaines de millions de personnes chaque jour — qu'il y ait un compte de plus ou pas ne change rien à mes propres ventes. Et avec le temps, enseigner ce système est devenu une activité à part entière, aussi rentable que le système lui-même. Je n'ai aucun intérêt à te vendre quelque chose qui ne marche pas : mes résultats et mes comptes sont vérifiables, contrairement à beaucoup de ceux qui vendent ce genre de formation.</div>
        </div>
      </div>

      <div className="divider"></div>

      {/* ============ CLOSING 3 — COÛT DE L'INACTION ============ */}
      <div className="final-cta">
        <h2>Arrête de <span>regarder</span> les autres vendre.</h2>
        <p>En ne cliquant pas maintenant, tu ne restes pas simplement "là où tu es" — tu recules, pendant que d'autres avancent avec ce même système, aujourd'hui même.</p>
        <div className="neon-live">⚡ OFFRE LIVE</div>
        <div className="price-block" style={{ marginBottom: 20 }}>
          <div className="price-old">297€</div>
          <div className="price-new">144€</div>
          <div className="price-note">Prix du batch en cours · Remonte au prochain palier</div>
        </div>
        <a href="/orderbump" onClick={goOrderbump} className="btn-cta" style={{ fontSize: 'clamp(20px,3.6vw,30px)' }}>COMMENCER MAINTENANT<span className="cta-arrow">↓</span></a>
      </div>

      <footer className="sp-footer">
        <p>© 2025 DigiDrop Academy · Tous droits réservés · <a href="#" style={{ color: '#444' }}>Mentions légales</a> · <a href="/cgv" style={{ color: '#444' }}>CGV</a></p>
        <p style={{ marginTop: 8 }}>Support : <a href="mailto:support@digidropacademy.fr" style={{ color: '#666' }}>support@digidropacademy.fr</a></p>
      </footer>

      <div id="social-proof-container"></div>

      {zoomedImg && (
        <div
          onClick={() => setZoomedImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20, cursor: 'zoom-out', animation: 'lv-slide-in 0.25s ease-out',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setZoomedImg(null); }}
            aria-label="Fermer"
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(124,58,237,0.85)', color: 'white',
              border: 'none', borderRadius: '50%', width: 44, height: 44,
              fontSize: 22, cursor: 'pointer', fontWeight: 700,
              boxShadow: '0 0 20px rgba(124,58,237,0.6)',
            }}
          >×</button>
          <img
            src={zoomedImg}
            alt="Avis client agrandi"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95vw', maxHeight: '90vh', objectFit: 'contain',
              borderRadius: 12, border: '2px solid #7c3aed',
              boxShadow: '0 0 40px rgba(124,58,237,0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
