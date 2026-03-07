"use client";

import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-color: #FAFAFA; 
  --text-main: #111827; 
  --text-muted: #4B5563; 
  --accent: #0F172A; /* Deep Navy */
  --brand: #2563EB; /* Trust Blue */
  --surface: #FFFFFF;
  --border: #E5E7EB;
}

/* ── SECTION & CONTAINER ──────────────────────────── */
.wc-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 120px 0;
  color: var(--text-main);
}
.wc-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ── REVEAL ANIMATION ─────────────────────────────── */
.reveal-wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.reveal-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── HEADER ───────────────────────────────────────── */
.wc-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 72px;
}
.wc-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 16px;
  display: block;
}
.wc-headline {
  font-family: 'Fraunces', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 24px;
}
.wc-headline em { font-style: italic; color: var(--brand); }
.wc-subhead {
  font-size: 18px; 
  color: var(--text-muted); 
  line-height: 1.6;
}

/* ── GRID & CARDS ─────────────────────────────────── */
.wc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 96px;
}
.wc-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 40px 32px;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.wc-card:hover {
  box-shadow: 0 12px 24px rgba(0,0,0,0.04);
  transform: translateY(-4px);
  border-color: #D1D5DB;
}
.wc-icon-wrap {
  width: 48px; 
  height: 48px;
  background: #EFF6FF;
  color: var(--brand);
  border-radius: 8px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  margin-bottom: 24px;
}
.wc-card-title {
  font-family: 'Fraunces', serif;
  font-size: 20px; 
  font-weight: 600;
  margin-bottom: 12px;
}
.wc-card-body {
  font-size: 15px; 
  color: var(--text-muted);
  line-height: 1.6;
  flex-grow: 1;
}
.wc-card-body strong { color: var(--text-main); font-weight: 500; }
.wc-card-link {
  margin-top: 24px;
  font-size: 14px;
  font-weight: 600;
  color: var(--brand);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── BOTTOM CTA BANNER ────────────────────────────── */
.wc-cta-banner {
  background: var(--accent);
  border-radius: 16px;
  padding: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  color: #FFFFFF;
}
.wc-cta-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 3vw, 36px); 
  font-weight: 400;
  line-height: 1.2; 
  margin-bottom: 16px;
}
.wc-cta-title em { font-style: italic; color: #94A3B8; }
.wc-cta-sub {
  font-size: 16px; 
  color: #CBD5E1;
  line-height: 1.6; 
  max-width: 500px;
}
.wc-cta-actions {
  display: flex; 
  gap: 16px; 
  flex-shrink: 0;
}
.wc-btn-primary, .wc-btn-secondary {
  padding: 14px 28px;
  font-size: 15px; 
  font-weight: 500;
  border-radius: 6px; 
  cursor: pointer;
  transition: all 0.3s ease;
}
.wc-btn-primary {
  background: var(--brand); 
  color: white;
  border: none;
}
.wc-btn-primary:hover { background: #1D4ED8; }
.wc-btn-secondary {
  background: transparent; 
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
}
.wc-btn-secondary:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* ── POPUP MODAL ──────────────────────────────────── */
.wc-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}
.wc-modal {
  background: var(--surface);
  border-radius: 12px;
  padding: 48px;
  max-width: 480px; 
  width: 100%;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(20px);
  animation: slideUpModal 0.4s ease forwards;
}
.wc-modal-close {
  position: absolute; top: 24px; right: 24px;
  background: transparent; border: none; cursor: pointer;
  font-size: 20px; color: var(--text-muted);
  transition: color 0.2s ease;
}
.wc-modal-close:hover { color: var(--text-main); }
.wc-modal-title {
  font-family: 'Fraunces', serif;
  font-size: 28px; 
  margin-bottom: 12px;
}
.wc-modal-sub {
  font-size: 15px; color: var(--text-muted);
  line-height: 1.6; margin-bottom: 32px;
}
.wc-modal-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px;
  border-radius: 8px; cursor: pointer;
  font-size: 15px; font-weight: 500;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}
.wc-modal-btn.dark { background: var(--accent); color: white; border: 1px solid var(--accent); }
.wc-modal-btn.dark:hover { background: #1E293B; }
.wc-modal-btn.light { background: var(--surface); color: var(--text-main); border: 1px solid var(--border); }
.wc-modal-btn.light:hover { border-color: var(--text-muted); }
.wc-modal-note { text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 24px; }

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .wc-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .wc-cta-banner { flex-direction: column; align-items: flex-start; padding: 48px 32px; }
}
@media (max-width: 640px) {
  .wc-section { padding: 80px 0; }
  .wc-grid { grid-template-columns: 1fr; }
  .wc-cta-actions { flex-direction: column; width: 100%; }
  .wc-btn-primary, .wc-btn-secondary { width: 100%; text-align: center; justify-content: center; }
  .wc-modal { padding: 32px 24px; }
}

@keyframes fadeIn { to { opacity: 1; } }
@keyframes slideUpModal { to { transform: translateY(0); } }
`;

/* ── Minimal Icons (Replacing Emojis) ─────────────── */
const icons = {
  curriculum: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  training: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  mentors: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  portfolio: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  career: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  tools: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
};

/* ── Intersection-triggered animation helper ─────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Popup Modal ───────────────────────────────────── */
function Modal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="wc-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="wc-modal">
        <button className="wc-modal-close" onClick={onClose}>✕</button>
        <h3 className="wc-modal-title">Take the Next Step</h3>
        <p className="wc-modal-sub">
          Ready to transform your career? Choose how you'd like to get started with <strong>PeopleMagnet School of Business</strong>.
        </p>

        <button className="wc-modal-btn dark">
          <span>Enroll in the Program</span>
          <span>→</span>
        </button>

        <button className="wc-modal-btn light">
          <span>Download the Brochure</span>
          <span>↓</span>
        </button>

        <p className="wc-modal-note">No commitment required · Free consultation available</p>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────── */
export default function WhyChooseUs() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();
  const { ref: ctaRef,  visible: ctaVisible  } = useReveal();
  const [modalOpen, setModalOpen] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Industry-Focused Curriculum",
      body: <>Learn skills that <strong>companies actually use</strong> — not outdated textbook content.</>,
      icon: icons.curriculum,
    },
    {
      id: 2,
      title: "100% Practical Training",
      body: <>Work on <strong>live projects and real campaigns</strong> from Day 1. Build what matters.</>,
      icon: icons.training,
    },
    {
      id: 3,
      title: "Expert Mentors",
      body: <>Learn from <strong>experienced marketers and creators</strong> who have done what you want to do.</>,
      icon: icons.mentors,
    },
    {
      id: 4,
      title: "Portfolio Development",
      body: <>Build your <strong>personal brand and portfolio</strong> while you learn — graduate with proof of work.</>,
      icon: icons.portfolio,
    },
    {
      id: 5,
      title: "Career Guidance",
      body: <>We guide you on <strong>portfolio building, interviews, and freelancing</strong> at every step.</>,
      icon: icons.career,
    },
    {
      id: 6,
      title: "Latest Marketing Tools",
      body: <>Hands-on with <strong>Meta Ads, Google Ads, SEO tools, AI tools,</strong> and more.</>,
      icon: icons.tools,
    },
  ];

  return (
    <>
      <style>{css}</style>
      
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}

      <section className="wc-section" id="why-choose-us">
        <div className="wc-container">

          {/* ── HEADER ── */}
          <div 
            ref={headerRef} 
            className={`wc-header reveal-wrapper ${headerVisible ? 'is-visible' : ''}`}
          >
            <span className="wc-eyebrow">Why Choose Us</span>
            <h2 className="wc-headline">
              Why Students Choose <em>PeopleMagnet</em>
            </h2>
            <p className="wc-subhead">
              We don't just teach marketing — we build professionals who are ready to execute, grow, and lead in the digital economy.
            </p>
          </div>

          {/* ── GRID ── */}
          <div 
            className={`wc-grid reveal-wrapper ${gridVisible ? 'is-visible' : ''}`} 
            ref={gridRef}
          >
            {cards.map((card) => (
              <div key={card.id} className="wc-card" onClick={() => setModalOpen(true)}>
                <div className="wc-icon-wrap">{card.icon}</div>
                <h3 className="wc-card-title">{card.title}</h3>
                <p className="wc-card-body">{card.body}</p>
                <div className="wc-card-link">Learn more <span>→</span></div>
              </div>
            ))}
          </div>

          {/* ── BOTTOM CTA BANNER ── */}
          <div 
            ref={ctaRef} 
            className={`wc-cta-banner reveal-wrapper ${ctaVisible ? 'is-visible' : ''}`}
          >
            <div>
              <h3 className="wc-cta-title">Ready to Build Your <em>Future?</em></h3>
              <p className="wc-cta-sub">
                Join hundreds of students already learning real skills at PeopleMagnet School of Business. Your career starts here.
              </p>
            </div>
            <div className="wc-cta-actions">
              <button className="wc-btn-primary" onClick={() => setModalOpen(true)}>Enroll Now</button>
              <button className="wc-btn-secondary" onClick={() => setModalOpen(true)}>Download Brochure</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}