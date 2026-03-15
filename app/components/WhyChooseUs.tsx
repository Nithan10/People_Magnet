"use client";

import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

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
  text-align: left; /* Left alignment for consistency */
  max-width: 800px;
  margin: 0 0 72px 0;
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
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800; /* Bolder sans-serif typography */
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}
.wc-headline em { font-style: italic; color: var(--brand); font-weight: 700; }
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
  text-align: left;
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
  font-size: 20px; 
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}
.wc-card-body {
  font-size: 15px; 
  color: var(--text-muted);
  line-height: 1.6;
  flex-grow: 1;
}
.wc-card-body strong { color: var(--text-main); font-weight: 600; }
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
  text-align: left;
}
.wc-cta-title {
  font-size: clamp(28px, 3vw, 36px); 
  font-weight: 800;
  line-height: 1.2; 
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.wc-cta-title em { font-style: italic; color: #60A5FA; font-weight: 700; }
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
  font-weight: 600;
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

/* ── POPUP MODAL & FORM ───────────────────────────── */
.wc-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}
.wc-modal {
  background: var(--surface);
  border-radius: 24px;
  padding: 40px;
  max-width: 440px; 
  width: 100%;
  position: relative;
  box-shadow: 0 24px 48px rgba(0,0,0,0.15);
  transform: translateY(20px);
  animation: slideUpModal 0.4s ease forwards;
  text-align: left;
}
.wc-modal-close {
  position: absolute; top: 20px; right: 20px;
  background: #F1F5F9; border: none; cursor: pointer;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--text-muted);
  transition: color 0.2s ease, background 0.2s ease;
}
.wc-modal-close:hover { color: var(--text-main); background: #E2E8F0; }
.wc-modal-title {
  font-size: 24px; 
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text-main);
  letter-spacing: -0.02em;
}
.wc-modal-sub {
  font-size: 15px; color: var(--text-muted);
  line-height: 1.5; margin-bottom: 24px;
}

/* Form Styles */
.wc-form-group {
  margin-bottom: 16px;
}
.wc-label {
  display: block; font-size: 13px; font-weight: 600; 
  color: var(--text-main); margin-bottom: 6px;
}
.wc-input {
  width: 100%; padding: 12px 16px; border-radius: 12px;
  border: 1px solid #E2E8F0; font-size: 15px; outline: none;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  background: var(--surface);
}
.wc-input:focus { border-color: var(--brand); }
.wc-submit-btn {
  margin-top: 8px; width: 100%; padding: 14px;
  background: var(--brand); color: white; font-size: 15px;
  font-weight: 700; border-radius: 12px; border: none;
  cursor: pointer; transition: background 0.2s;
  box-shadow: 0 4px 12px rgba(37,99,235,0.2);
}
.wc-submit-btn:hover { background: #1D4ED8; }

/* Success State Styles */
.wc-success-box {
  text-align: center; padding: 24px 0;
}
.wc-success-icon {
  width: 64px; height: 64px; background: #DEF7EC; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; color: #046C4E;
}
.wc-close-btn {
  padding: 12px 24px; background: #F1F5F9; color: var(--text-main);
  font-size: 15px; font-weight: 700; border-radius: 100px;
  border: none; cursor: pointer; transition: background 0.2s;
}
.wc-close-btn:hover { background: #E2E8F0; }

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .wc-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .wc-cta-banner { flex-direction: column; align-items: flex-start; padding: 48px 32px; }
  .wc-header { text-align: center; margin: 0 auto 48px; } /* Center on mobile for flow */
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

/* ── Minimal Icons ─────────────── */
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

/* ─── Popup Form Modal ───────────────────────────────────── */
function FormModal({ onClose }: { onClose: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Call
    setIsSubmitted(true);
  };

  return (
    <div className="wc-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="wc-modal">
        <button className="wc-modal-close" onClick={onClose}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <div>
            <h2 className="wc-modal-title">Start Your Journey</h2>
            <p className="wc-modal-sub">
              Fill out the form below and our admissions team will get in touch with you shortly.
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="wc-form-group">
                <label className="wc-label">Full Name</label>
                <input type="text" className="wc-input" required placeholder="John Doe" />
              </div>
              
              <div className="wc-form-group">
                <label className="wc-label">Email Address</label>
                <input type="email" className="wc-input" required placeholder="john@example.com" />
              </div>

              <div className="wc-form-group">
                <label className="wc-label">Program of Interest</label>
                <select className="wc-input" required>
                  <option value="">Select a program...</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="leadership">Business Leadership</option>
                  <option value="creative">Creative Strategy</option>
                </select>
              </div>

              <button type="submit" className="wc-submit-btn">
                Submit Enquiry
              </button>
            </form>
          </div>
        ) : (
          <div className="wc-success-box">
            <div className="wc-success-icon">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="wc-modal-title">Application Received!</h2>
            <p className="wc-modal-sub" style={{ marginBottom: '24px' }}>
              Thank you for your interest. Our admissions team will get back to you soon.
            </p>
            <button onClick={onClose} className="wc-close-btn">
              Close Window
            </button>
          </div>
        )}
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
      
      {modalOpen && <FormModal onClose={() => setModalOpen(false)} />}

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