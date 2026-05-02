import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avis1 from "@/assets/avis-1.jpeg";
import avis2 from "@/assets/avis-2.png";
import avis3 from "@/assets/avis-3.png";
import avis4 from "@/assets/avis-4.png";
import avis5 from "@/assets/avis-5.png";
import avis6 from "@/assets/avis-6.png";
import mockup from "@/assets/mockup-systeme-pirate.png";
import logo from "@/assets/logo-drop-digital.png";

const Index = () => {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState(() => Math.floor(Math.random() * 12) + 11); // 11-22 initial
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setVisitors((prev) => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        const magnitude = Math.random() < 0.75 ? 1 : 2;
        let next = prev + delta * magnitude;
        if (next < 5) next = 5 + Math.floor(Math.random() * 3);
        if (next > 27) next = 27 - Math.floor(Math.random() * 3);
        return next;
      });
    };
    const schedule = () => {
      const delay = 3000 + Math.random() * 3000; // 3-6s
      return window.setTimeout(function run() {
        tick();
        (schedule as any)._id = window.setTimeout(run, 3000 + Math.random() * 3000);
      }, delay);
    };
    const id = schedule();
    return () => { window.clearTimeout(id); window.clearTimeout((schedule as any)._id); };
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
          --sp-grey: #1a1a1a;
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
        .badge-red { background: #e8110a; color: white; font-size: 11px; padding: 2px 6px; border-radius: 3px; }
        @media (max-width: 768px) {
          .sp-page { padding-top: 80px; }
          .fixed-nav-wrapper { top: 0; left: 0; right: 0; flex-direction: column; align-items: stretch; }
          .fixed-btn-right { order: -1; width: 100%; height: 36px; font-size: 12px; border-radius: 0; padding: 0; justify-content: center; text-align: center; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); transform: none; animation: none; }
          .fixed-btn-left { width: 100%; height: 44px; font-size: 15px; font-weight: 700; border-radius: 0; padding: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 1px; }
        }
        .hero { min-height: 100vh; background: var(--sp-black); background-image: radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 20px; position: relative; border-bottom: 2px solid var(--sp-purple); }
        .badge-top { background: var(--sp-purple); color: white; font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 3px; padding: 8px 20px; margin-bottom: 30px; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); }
        .price-block { margin: 30px 0; }
        .price-old { font-size: 20px; color: #888; text-decoration: line-through; margin-bottom: 4px; }
        .price-new { font-family: 'Bebas Neue', sans-serif; font-size: 72px; color: var(--sp-purple-light); line-height: 1; letter-spacing: -2px; }
        .price-note { font-size: 13px; color: #888; margin-top: 4px; }
        .btn-cta { display: inline-block; background: var(--sp-purple); color: white; font-family: 'Bebas Neue', sans-serif; font-size: clamp(26px, 5vw, 40px); letter-spacing: 2px; padding: 22px 60px; border: none; cursor: pointer; position: relative; clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%); transition: all 0.2s; box-shadow: 0 8px 40px rgba(124,58,237,0.5); animation: pulse-btn 2s ease-in-out infinite; margin: 10px 0; }
        @keyframes pulse-btn { 0%, 100% { box-shadow: 0 8px 40px rgba(124,58,237,0.5); transform: scale(1); } 50% { box-shadow: 0 8px 60px rgba(124,58,237,0.8); transform: scale(1.02); } }
        .btn-cta:hover { background: var(--sp-purple-dark); transform: scale(1.04) !important; }
        .btn-sub { display: block; font-size: 12px; color: #666; margin-top: 10px; }
        .divider { width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--sp-purple), transparent); margin: 0; }
        .section-tag { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 5px; color: var(--sp-purple); margin-bottom: 16px; display: block; }
        .problem-list { list-style: none; margin: 30px 0; }
        .problem-list li { display: flex; align-items: flex-start; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 17px; color: #bbb; }
        .problem-list li .icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
        .dark-section { background: var(--sp-grey); padding: 80px 20px; border-top: 2px solid rgba(255,255,255,0.05); border-bottom: 2px solid rgba(255,255,255,0.05); }
        .dark-section .inner { max-width: 900px; margin: 0 auto; }
        .modules { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-top: 40px; }
        .module-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid var(--sp-purple); padding: 24px; transition: border-color 0.2s; }
        .module-card:hover { border-left-color: var(--sp-purple-light); }
        .module-card .num { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: rgba(124,58,237,0.2); line-height: 1; margin-bottom: 8px; }
        .module-card h3 { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--sp-white); letter-spacing: 1px; margin-bottom: 10px; }
        .module-card p { font-size: 14px; color: #888; line-height: 1.6; }
        .proof-section { padding: 80px 20px; max-width: 900px; margin: 0 auto; }
        .results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin: 40px 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
        .result-stat { background: var(--sp-black); padding: 30px 20px; text-align: center; }
        .result-stat .number { font-family: 'Bebas Neue', sans-serif; font-size: 56px; color: var(--sp-purple-light); line-height: 1; }
        .result-stat .label { font-size: 13px; color: #666; margin-top: 6px; text-transform: uppercase; letter-spacing: 1px; }
        .avis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
        @media (max-width: 600px) { .avis-grid { grid-template-columns: 1fr; } .results-grid { grid-template-columns: 1fr; } .btn-cta { padding: 18px 30px; } }
        .avis-card { background: #0f0f0f; border: 2px solid #7c3aed; border-radius: 12px; padding: 8px; box-shadow: 0 0 16px rgba(124,58,237,0.4), 0 0 32px rgba(124,58,237,0.15); overflow: hidden; }
        .avis-card img { width: 100%; height: auto; display: block; border-radius: 8px; object-fit: cover; }
        .recois-section { padding: 80px 20px; max-width: 900px; margin: 0 auto; text-align: center; }
        .recois-mockup { width: 100%; max-width: 700px; display: block; margin: 0 auto 32px; border-radius: 12px; border: 2px solid #7c3aed; box-shadow: 0 0 30px rgba(124,58,237,0.5); }
        .recois-list { list-style: none; max-width: 600px; margin: 0 auto; text-align: left; }
        .recois-list li { background: #111; border-left: 3px solid #7c3aed; padding: 12px 16px; margin-bottom: 2px; color: #ccc; font-size: 15px; display: flex; justify-content: space-between; }
        .recois-list li .recois-price { color: var(--sp-purple-light); font-weight: 700; white-space: nowrap; margin-left: 8px; }
        .recois-offer-box { background: #1a1a1a; border: 2px solid #7c3aed; border-radius: 8px; max-width: 500px; margin: 40px auto 0; padding: 30px; text-align: center; }
        .bounce-arrow { font-size: 32px; color: var(--sp-purple); animation: bounce-arrow 1.5s ease-in-out infinite; display: block; margin: 16px auto; }
        @keyframes bounce-arrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        .blink-live { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: var(--sp-purple-light); animation: blink-text 1.2s ease-in-out infinite; }
        @keyframes blink-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .guarantee-section { background: linear-gradient(135deg, #0f0f0f, #1a0a2e); border-top: 2px solid var(--sp-purple-light); border-bottom: 2px solid var(--sp-purple-light); padding: 80px 20px; text-align: center; }
        .guarantee-medal { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed, #5b21b6); box-shadow: 0 0 0 8px rgba(124,58,237,0.2), 0 0 0 16px rgba(124,58,237,0.1), 0 20px 60px rgba(124,58,237,0.3), inset 0 -4px 8px rgba(0,0,0,0.3); margin: 0 auto 40px; animation: medal-glow 2s ease-in-out infinite; }
        @keyframes medal-glow { 0%, 100% { box-shadow: 0 0 0 8px rgba(124,58,237,0.2), 0 0 0 16px rgba(124,58,237,0.1), 0 20px 60px rgba(124,58,237,0.3), inset 0 -4px 8px rgba(0,0,0,0.3); } 50% { box-shadow: 0 0 0 12px rgba(124,58,237,0.3), 0 0 0 24px rgba(124,58,237,0.15), 0 20px 80px rgba(124,58,237,0.5), inset 0 -4px 8px rgba(0,0,0,0.3); } }
        .guarantee-medal .medal-text { font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 3px; color: rgba(255,255,255,0.85); line-height: 1.2; text-align: center; }
        .guarantee-medal .medal-big { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: rgba(255,255,255,0.95); line-height: 1; margin: 4px 0; }
        .medal-ribbon { width: 120px; height: 20px; background: linear-gradient(90deg, #6d28d9, #7c3aed, #6d28d9); margin: 6px auto 0; clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%); }
        .guarantee-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 6vw, 64px); color: var(--sp-purple-light); margin-bottom: 20px; }
        .guarantee-section p { font-size: 18px; color: #bbb; max-width: 600px; margin: 0 auto 20px; line-height: 1.7; }
        .guarantee-section p strong { color: var(--sp-white); }
        .guarantee-box { background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.2); max-width: 600px; margin: 30px auto 0; padding: 24px 30px; font-size: 16px; color: #bbb; line-height: 1.7; }
        .final-cta { padding: 100px 20px; text-align: center; background: radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.1) 0%, transparent 70%); }
        .final-cta h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 7vw, 80px); color: var(--sp-white); margin-bottom: 16px; line-height: 1; }
        .final-cta h2 span { color: var(--sp-purple); }
        .final-cta p { font-size: 18px; color: #888; margin-bottom: 40px; }
        .sp-footer { border-top: 1px solid rgba(255,255,255,0.05); padding: 30px 20px; text-align: center; font-size: 13px; color: #444; }
        .skull-divider { text-align: center; padding: 20px 0; font-size: 28px; opacity: 0.3; letter-spacing: 20px; }
        .warning-text { color: #e8110a; font-size: 13px; margin-top: 10px; display: block; }
        .urgency-bar { background:#0f0f0f; border:1px solid #7c3aed; border-radius:8px; padding:20px; margin: 0 auto 24px; max-width:500px; width:90%; }
        .urgency-text-blink { font-family:'Bebas Neue',sans-serif; font-size:16px; color:#e8110a; text-align:center; animation: urgBlink 1s infinite alternate; }
        @keyframes urgBlink { from{opacity:1} to{opacity:0.4} }
        .urgency-progress { background:#1a1a1a; height:14px; border-radius:7px; margin:12px 0; overflow:hidden; }
        .urgency-fill { height:100%; background:linear-gradient(90deg,#7c3aed,#a78bfa); border-radius:7px; }
        .urgency-labels { display:flex; justify-content:space-between; font-size:12px; }
        .social-proof-notif { position: fixed; top: 70px; right: 20px; z-index: 9998; background: rgba(10,10,10,0.95); border: 2px solid #BF00FF; border-radius: 12px; padding: 20px 28px; display: flex; align-items: center; gap: 12px; min-width: 320px; box-shadow: 0 0 10px #BF00FF, 0 0 20px #BF00FF; transform: translateX(120%); transition: transform 0.5s ease-in-out; }
        .social-proof-notif.show { transform: translateX(0); }
        .social-proof-notif.hide { transform: translateX(120%); }
        .social-proof-notif .fire-emoji { font-size: 24px; flex-shrink: 0; }
        .social-proof-notif .notif-text { color: white; font-size: 16px; font-weight: 500; line-height: 1.4; }
        @media (max-width: 768px) { .social-proof-notif { top: 90px; right: 10px; width: 220px; min-width: auto; padding: 12px 16px; } .social-proof-notif .notif-text { font-size: 13px; } }
        .module-glow { background:rgba(124,58,237,0.05); border:1px solid #7c3aed; box-shadow:0 0 20px rgba(124,58,237,0.4),0 0 40px rgba(124,58,237,0.15),inset 0 0 20px rgba(124,58,237,0.03); padding:24px; transition:box-shadow 0.3s ease; }
        .module-glow:hover { box-shadow:0 0 30px rgba(124,58,237,0.7),0 0 60px rgba(124,58,237,0.3),inset 0 0 30px rgba(124,58,237,0.05); }
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
    const pirateEmojis = ['🏴‍☠️','⚓','☠️','🗡️','💰'];
    const container = document.getElementById('social-proof-container');
    const showNotif = () => {
      if (!container) return;
      const name = names[Math.floor(Math.random() * names.length)];
      const emoji = pirateEmojis[Math.floor(Math.random() * pirateEmojis.length)];
      const notif = document.createElement('div');
      notif.className = 'social-proof-notif';
      notif.innerHTML = `<span class="fire-emoji">${emoji}</span><div class="notif-text">${name} vient d'acheter la méthode</div>`;
      container.appendChild(notif);
      requestAnimationFrame(() => notif.classList.add('show'));
      setTimeout(() => { notif.classList.remove('show'); notif.classList.add('hide'); setTimeout(() => notif.remove(), 500); }, 2500);
    };
    const t1 = setTimeout(showNotif, 3000);
    const t2 = setInterval(showNotif, 30000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  const scrollToAcces = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('acces')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goOrderbump = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/orderbump');
  };

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
          <span>Offre exclusif Live</span>
          <span className="badge-red">-600€</span>
        </a>
      </div>

      <section className="hero">
        <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img src={logo} alt="Drop Digital" className="floating-logo" />
        </div>
        <div className="badge-top">⚓ MÉTHODE INTERDITE — LES AUTRES NE VEULENT PAS QUE VOUS VOYIEZ ÇA ⚓</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,7vw,80px)', letterSpacing: '-1px', color: 'white', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 10 }}>
          Faire <span style={{ color: '#a855f7' }}>1 027 €</span> par jour avec le <span style={{ color: '#a855f7' }}>DropDigital</span> automatisé
        </h1>
        <p style={{ fontSize: 'clamp(16px,3vw,22px)', color: 'var(--sp-cream)', opacity: 0.85, maxWidth: 700, margin: '20px auto 10px', lineHeight: 1.5 }}>
          La méthode pour vendre des produits digitaux sur TikTok avec de simples carrousels —<strong style={{ color: 'var(--sp-purple-light)' }}> sans montrer ton visage, sans audience, sans budget pub.</strong><br />Des ventes dès la première semaine. Garanti.
        </p>
        <div className="price-block">
          <div className="price-old">697€</div>
          <div className="price-new">97€</div>
          <div className="price-note">Offre Live uniquement · Disparaît à la fin du live</div>
        </div>
        <div className="urgency-bar">
          <div className="urgency-text-blink">⚠️ SEULEMENT 3 PLACES RESTANTES SUR 20</div>
          <div className="urgency-progress"><div className="urgency-fill" style={{ width: '75%' }}></div></div>
          <div className="urgency-labels"><span style={{ color: '#a78bfa' }}>17 places prises</span><span style={{ color: '#e8110a' }}>3 places restantes</span></div>
        </div>
        <a href="/orderbump" onClick={goOrderbump} className="btn-cta">☠️ OUI — JE VEUX LA MÉTHODE PIRATE MAINTENANT</a>
        <span className="warning-text">⚠️ Cette offre disparaît dès la fin du live</span>
        <span className="btn-sub">Accès immédiat · Paiement sécurisé · Garanti ou remboursé</span>
      </section>

      <div className="divider"></div>

      <div style={{ background: '#111111', padding: '80px 20px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span className="section-tag" style={{ fontSize: 'clamp(18px,3vw,28px)', letterSpacing: 3, color: 'white', marginBottom: 24 }}>⚓ C'EST QUOI LE DROP DIGITAL AUTOMATISÉ ?</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 32 }}>
            <div className="module-glow">
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: 'white', marginBottom: 10 }}>Étape 1 — Tu crées ton produit digital en 5 minutes</h3>
              <p style={{ fontSize: 16, color: '#bbb', lineHeight: 1.7 }}>Grâce à notre outil IA on te génère un PDF complet et une page de vente prête à encaisser. Zéro compétence. Zéro temps perdu.</p>
            </div>
            <div className="module-glow">
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: 'white', marginBottom: 10 }}>Étape 2 — Le Système Pirate transforme tes <span style={{ color: '#7c3aed', fontWeight: 700 }}>VUES</span> en <span style={{ color: '#7c3aed', fontWeight: 700 }}>VENTES</span></h3>
              <p style={{ fontSize: 16, color: '#bbb', lineHeight: 1.7 }}>Un tunnel de vente <span style={{ color: '#7c3aed', fontWeight: 700 }}>AGRESSIF</span> — 300% plus <span style={{ color: '#7c3aed', fontWeight: 700 }}>EFFICACE</span> qu'un tunnel classique — qui pousse chaque visiteur à acheter impulsivement. Sans te montrer. Sans négocier. Sans relancer.</p>
            </div>
            <div className="module-glow">
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: 'white', marginBottom: 10 }}>Étape 3 — Des carrousels TikTok automatisés vendent à ta place</h3>
              <p style={{ fontSize: 16, color: '#bbb', lineHeight: 1.7 }}>Pas de vidéo à filmer. Pas de montage. Pas de visage. De simples images qui défilent — postées <span style={{ color: '#7c3aed', fontWeight: 700 }}>AUTOMATIQUEMENT</span> sur TikTok — qui attirent les bonnes personnes et les envoient directement vers ton tunnel.</p>
            </div>
          </div>
          <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid #7c3aed', boxShadow: '0 0 25px rgba(124,58,237,0.5),0 0 50px rgba(124,58,237,0.2),inset 0 0 25px rgba(124,58,237,0.04)', padding: 28, marginTop: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 18, color: '#bbb', lineHeight: 1.75 }}>Un système qui génère des ventes 24h/24 — même quand tu dors, même quand tu voyages, même quand tu fais autre chose.</p>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(24px,4vw,40px)', color: '#7c3aed', marginTop: 16 }}>Et qui m'a rapporté plus de 8 000€ le premier mois où je me suis lancé.</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div style={{ padding: '80px 20px', maxWidth: 900, margin: '0 auto' }}>
        <span className="section-tag">☠ LA VÉRITÉ QUE PERSONNE NE DIT</span>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1, color: 'white', marginBottom: 30 }}>
          Pourquoi tu <em style={{ color: 'var(--sp-purple)', fontStyle: 'normal' }}>galères</em> encore à vendre en ligne
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ccc', marginBottom: 20 }}>Tu as essayé. Tu as regardé des centaines de vidéos YouTube. Tu as peut-être même acheté une formation. Et pourtant — <strong style={{ color: 'var(--sp-cream)' }}>toujours zéro vente.</strong></p>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ccc', marginBottom: 20 }}>C'est pas ta faute. Les formateurs t'ont menti par omission. Ils arrondissent les bords, filtrent les vraies stratégies, gardent les meilleures techniques pour eux.</p>
        <ul className="problem-list">
          <li><span className="icon">✗</span><span>Tu passes des heures à créer du contenu pour 300 vues et 0 vente</span></li>
          <li><span className="icon">✗</span><span>Tu ne sais pas quoi vendre ni comment créer un produit qui se vend</span></li>
          <li><span className="icon">✗</span><span>Tu penses qu'il faut des milliers d'abonnés pour commencer à gagner de l'argent</span></li>
          <li><span className="icon">✗</span><span>Personne ne t'a montré comment construire une offre qui donne vraiment envie d'acheter</span></li>
          <li><span className="icon">✗</span><span>Tu bosses pour rien pendant que d'autres encaissent sans montrer leur visage</span></li>
        </ul>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ccc' }}><strong style={{ color: 'var(--sp-cream)' }}>Système Pirate c'est la fin de tout ça.</strong> Pas de langue de bois. Pas de stratégie édulcorée. Le système brut, tel qu'il est utilisé pour générer des ventes chaque jour.</p>
      </div>

      <div className="skull-divider">☠ ☠ ☠</div>
      <div className="divider"></div>

      <div className="divider"></div>

      <div className="proof-section">
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 'clamp(30px,5vw,50px) clamp(20px,4vw,40px)', textAlign: 'center' }}>
          <span className="section-tag">📊 PREUVES RÉELLES</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1, color: 'white', marginBottom: 10 }}>
            Des résultats. <em style={{ color: 'var(--sp-purple)', fontStyle: 'normal' }}>Pas des promesses.</em>
          </h2>
          <p style={{ fontSize: 17, color: '#888' }}>Le système tourne. Les chiffres parlent.</p>
          <div className="results-grid">
            <div className="result-stat"><div className="number">20</div><div className="label">Comptes TikTok actifs</div></div>
            <div className="result-stat"><div className="number">1 an</div><div className="label">Business model éprouvé</div></div>
            <div className="result-stat"><div className="number">J7</div><div className="label">Premières ventes garanties</div></div>
          </div>
        </div>

        <div style={{ height: 2, margin: '60px auto', maxWidth: 600, background: 'linear-gradient(90deg, transparent, var(--sp-purple), transparent)', boxShadow: '0 0 20px var(--sp-purple), 0 0 40px var(--sp-purple)', borderRadius: 2 }}></div>

        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(30px,5vw,52px)', lineHeight: 1, color: 'white', marginBottom: 30 }}>💬 ILS ONT APPLIQUÉ. VOILÀ CE QU'ILS EN DISENT.</h2>
        </div>
        <div className="avis-grid">
          {[avis1, avis2, avis3, avis4, avis5, avis6].map((src, i) => (
            <div key={i} className="avis-card" onClick={() => setZoomedImg(src)} style={{ cursor: 'zoom-in' }}>
              <img src={src} alt={`Avis client ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      <div className="recois-section">
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1, color: 'white', marginBottom: 30 }}>☠️ TOUT CE QUE TU REÇOIS<br />DANS LE SYSTÈME PIRATE</h2>
        <img className="recois-mockup" src={mockup} alt="Système Pirate - Mockup" />
        <ul className="recois-list">
          <li><span>✅ Le Système Pirate complet — 6 modules</span><span className="recois-price">197€</span></li>
          <li><span>✅ Accompagnement personnalisé</span><span className="recois-price">147€</span></li>
          <li><span>✅ Outil IA secret</span><span className="recois-price">97€</span></li>
          <li><span>✅ Tunnel de vente à haute conversion</span><span className="recois-price">97€</span></li>
          <li><span>✅ Méthode Carrousels comme un vrai Pirate</span><span className="recois-price">67€</span></li>
          <li><span>✅ Templates produit digital</span><span className="recois-price">47€</span></li>
          <li><span>✅ Groupe privé résultats élèves</span><span className="recois-price">45€</span></li>
          <li><span>✅ Garantie 30 jours satisfait ou remboursé</span><span className="recois-price">Inclus</span></li>
          <li><span>✅ Accès à vie</span><span className="recois-price">Inclus</span></li>
        </ul>
        <div style={{ width: '100%', maxWidth: 600, height: 2, background: 'var(--sp-purple)', margin: '30px auto', opacity: 0.5 }}></div>
        <div className="recois-offer-box">
          <div style={{ fontSize: 22, color: '#666', textDecoration: 'line-through', marginBottom: 8 }}>Prix habituel : 697€</div>
          <span className="bounce-arrow">↓</span>
          <div className="blink-live">Mais pendant ce LIVE UNIQUEMENT :</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 80, color: 'white', lineHeight: 1, margin: '10px 0' }}>97€</div>
          <div className="urgency-bar">
            <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 10, letterSpacing: 0.5 }}>La méthode pour vendre des produits digitaux sur TikTok avec de simples carrousels automatisés</div>
            <div className="urgency-text-blink">⚠️ SEULEMENT 3 PLACES RESTANTES SUR 20</div>
            <div className="urgency-progress"><div className="urgency-fill" style={{ width: '75%' }}></div></div>
            <div className="urgency-labels"><span style={{ color: '#a78bfa' }}>17 places prises</span><span style={{ color: '#e8110a' }}>3 places restantes</span></div>
          </div>
          <a href="/orderbump" onClick={goOrderbump} className="btn-cta" style={{ fontSize: 'clamp(18px,3.5vw,30px)', marginTop: 10 }}>☠️ OUI — JE VEUX LA MÉTHODE PIRATE MAINTENANT</a>
          <span className="warning-text">⚠️ Cette offre disparaît dès la fin du live</span>
        </div>
      </div>

      <div className="divider"></div>

      <div id="acces" style={{ background: 'var(--sp-grey)', padding: '70px 20px', textAlign: 'center' }}>
        <span className="section-tag" style={{ display: 'block', marginBottom: 16 }}>⚓ ACCÈS IMMÉDIAT</span>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,64px)', color: 'white', lineHeight: 1, marginBottom: 20 }}>Tu es prêt à <span style={{ color: 'var(--sp-purple)' }}>passer pirate</span> ?</h2>
        <div className="price-block" style={{ margin: '24px 0' }}>
          <div className="price-old">697€</div>
          <div className="price-new">97€</div>
          <div className="price-note">Offre Live uniquement · Disparaît à la fin du live</div>
        </div>
        <div className="urgency-bar">
          <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 10, letterSpacing: 0.5 }}>La méthode pour vendre des produits digitaux sur TikTok avec de simples carrousels automatisés</div>
          <div className="urgency-text-blink">⚠️ SEULEMENT 3 PLACES RESTANTES SUR 20</div>
          <div className="urgency-progress"><div className="urgency-fill" style={{ width: '75%' }}></div></div>
          <div className="urgency-labels"><span style={{ color: '#a78bfa' }}>17 places prises</span><span style={{ color: '#e8110a' }}>3 places restantes</span></div>
        </div>
        <a href="/orderbump" onClick={goOrderbump} className="btn-cta">☠️ OUI — JE VEUX LA MÉTHODE PIRATE MAINTENANT</a>
        <span className="warning-text">⚠️ Cette offre disparaît dès la fin du live</span>
        <span className="btn-sub">Accès immédiat après paiement · 100% sécurisé</span>
      </div>

      <div className="divider"></div>

      <div className="guarantee-section">
        <div className="guarantee-medal">
          <div className="medal-text">GARANTI</div>
          <div className="medal-big">☠️</div>
          <div className="medal-text">RÉSULTATS</div>
          <div className="medal-text" style={{ fontSize: 11, marginTop: 2 }}>PREMIÈRE SEMAINE</div>
        </div>
        <div className="medal-ribbon" style={{ marginBottom: 40 }}></div>
        <h2>Garanti ou remboursé</h2>
        <p>Je suis tellement convaincu que ce système fonctionne que je prends tout le risque à ta place.</p>
        <div className="guarantee-box">
          <strong style={{ color: 'var(--sp-purple-light)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 1, display: 'block', marginBottom: 12 }}>LA GARANTIE PIRATE</strong>
          Tu appliques le système pendant 7 jours. Si à la fin de cette première semaine tu n'as pas de résultats — pas une seule vente — <strong>je te rembourse intégralement, sur le champ.</strong> Sans question. Sans délai. Tu repars avec ton argent et tout ce que tu as appris.<br /><br />
          <span style={{ color: 'var(--sp-purple)', fontSize: 14 }}>Cette garantie existe parce que je sais que ça marche. Pas parce que je suis sympa.</span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="final-cta">
        <h2>Arrête de <span>regarder</span> les autres vendre.</h2>
        <p>Offre Live uniquement. 97€. Accompagnement inclus. Résultats garantis la première semaine.</p>
        <div className="price-block" style={{ marginBottom: 20 }}>
          <div className="price-old">697€</div>
          <div className="price-new">97€</div>
          <div className="price-note">Offre Live uniquement · Disparaît à la fin du live</div>
        </div>
        <div className="urgency-bar">
          <div className="urgency-text-blink">⚠️ SEULEMENT 3 PLACES RESTANTES SUR 20</div>
          <div className="urgency-progress"><div className="urgency-fill" style={{ width: '75%' }}></div></div>
          <div className="urgency-labels"><span style={{ color: '#a78bfa' }}>17 places prises</span><span style={{ color: '#e8110a' }}>3 places restantes</span></div>
        </div>
        <a href="/orderbump" onClick={goOrderbump} className="btn-cta" style={{ fontSize: 'clamp(22px,4vw,36px)' }}>☠️ OUI — JE VEUX LA MÉTHODE PIRATE MAINTENANT</a>
        <span className="warning-text">⚠️ Cette offre disparaît dès la fin du live</span>
      </div>

      <footer className="sp-footer">
        <p>© 2025 Système Pirate · Tous droits réservés · <a href="#" style={{ color: '#444' }}>Mentions légales</a> · <a href="#" style={{ color: '#444' }}>CGV</a></p>
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
