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

/* ── TOOLS SECTION ────────────────────────────────── */
.tools-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 120px 0 80px;
  color: var(--text-main);
}
.tools-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}
.tools-header {
  text-align: left; /* Aligned left for consistency */
  max-width: 800px;
  margin: 0 0 64px 0;
}
.tools-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 16px;
  display: block;
}
.tools-headline {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800; /* Bolder weight for sans-serif */
  line-height: 1.1;
  margin-bottom: 16px;
  letter-spacing: -0.03em;
}
.tools-subhead {
  font-size: 18px; 
  color: var(--text-muted); 
}

/* Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.tool-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.04);
  border-color: #D1D5DB;
}
.tool-icon {
  width: 40px;
  height: 40px;
  background: #F3F4F6;
  color: var(--text-main);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tool-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}

/* ── CTA SECTION ──────────────────────────────────── */
.cta-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 0 40px 120px;
}
.cta-container {
  max-width: 1200px;
  margin: 0 auto;
}
.cta-banner {
  background: var(--accent);
  border-radius: 24px;
  padding: 80px 64px;
  text-align: left; /* Left-aligned content */
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
}

/* Subtle background glow for CTA */
.cta-banner::before {
  content: '';
  position: absolute;
  top: -50%; left: 0%; /* Adjusted glow position */
  width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cta-headline {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800; /* Bolder sans-serif typography */
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 1;
}
.cta-headline em {
  font-style: italic;
  color: #60A5FA;
  font-weight: 700;
}
.cta-subhead {
  font-size: 18px;
  color: #CBD5E1;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 0 48px 0; /* Removed auto margins for left alignment */
  position: relative;
  z-index: 1;
}
.cta-subhead strong {
  color: #FFFFFF;
  font-weight: 600;
}

/* Buttons */
.cta-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align buttons to the left */
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}
.cta-btn {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.cta-btn-primary {
  background: var(--brand);
  color: white;
  border: 1px solid var(--brand);
}
.cta-btn-primary:hover {
  background: #1D4ED8;
  border-color: #1D4ED8;
  transform: translateY(-2px);
}
.cta-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.cta-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}
.cta-btn-tertiary {
  background: transparent;
  color: #94A3B8;
  border: 1px solid transparent;
}
.cta-btn-tertiary:hover {
  color: #FFFFFF;
}

/* ── POPUP MODAL & FORM ───────────────────────────── */
.cta-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}
.cta-modal {
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
.cta-modal-close {
  position: absolute; top: 20px; right: 20px;
  background: #F1F5F9; border: none; cursor: pointer;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--text-muted);
  transition: color 0.2s ease, background 0.2s ease;
}
.cta-modal-close:hover { color: var(--text-main); background: #E2E8F0; }
.cta-modal-title {
  font-size: 24px; 
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text-main);
  letter-spacing: -0.02em;
}
.cta-modal-sub {
  font-size: 15px; color: var(--text-muted);
  line-height: 1.5; margin-bottom: 24px;
}

/* Form Styles */
.cta-form-group {
  margin-bottom: 16px;
}
.cta-label {
  display: block; font-size: 13px; font-weight: 600; 
  color: var(--text-main); margin-bottom: 6px;
}
.cta-input {
  width: 100%; padding: 12px 16px; border-radius: 12px;
  border: 1px solid #E2E8F0; font-size: 15px; outline: none;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  background: var(--surface);
  color: var(--text-main);
}
.cta-input:focus { border-color: var(--brand); }
.cta-submit-btn {
  margin-top: 8px; width: 100%; padding: 14px;
  background: var(--brand); color: white; font-size: 15px;
  font-weight: 700; border-radius: 12px; border: none;
  cursor: pointer; transition: background 0.2s;
  box-shadow: 0 4px 12px rgba(37,99,235,0.2);
}
.cta-submit-btn:hover { background: #1D4ED8; }

/* Success State Styles */
.cta-success-box {
  text-align: center; padding: 24px 0;
}
.cta-success-icon {
  width: 64px; height: 64px; background: #DEF7EC; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; color: #046C4E;
}
.cta-close-btn {
  padding: 12px 24px; background: #F1F5F9; color: var(--text-main);
  font-size: 15px; font-weight: 700; border-radius: 100px;
  border: none; cursor: pointer; transition: background 0.2s;
}
.cta-close-btn:hover { background: #E2E8F0; }

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .tools-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .tools-header { text-align: center; margin: 0 auto 48px; }
  .cta-banner { text-align: center; padding: 64px 32px; }
  .cta-subhead { margin: 0 auto 48px; }
  .cta-actions { justify-content: center; }
}
@media (max-width: 640px) {
  .tools-section { padding: 80px 0 60px; }
  .tools-container { padding: 0 24px; }
  .tools-grid { grid-template-columns: 1fr; }
  .cta-section { padding: 0 24px 80px; }
  .cta-banner { padding: 64px 24px; border-radius: 16px; }
  .cta-actions { flex-direction: column; width: 100%; }
  .cta-btn { width: 100%; }
}

@keyframes fadeIn { to { opacity: 1; } }
@keyframes slideUpModal { to { transform: translateY(0); } }
`;

/* ── Icons ────────────────────────────────────────── */
const icons = {
  meta: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 10V4"/></svg>,
  google: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  analytics: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  canva: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5 5 2 7-7-4-7 4 2-7-5-5h7z"/></svg>,
  capcut: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  premiere: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  seo: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  ai: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
};

/* ── Data ─────────────────────────────────────────── */
const tools = [
  { name: "Meta Ads Manager", icon: icons.meta },
  { name: "Google Ads", icon: icons.google },
  { name: "Google Analytics", icon: icons.analytics },
  { name: "Canva", icon: icons.canva },
  { name: "CapCut", icon: icons.capcut },
  { name: "Premiere Pro", icon: icons.premiere },
  { name: "SEO Tools", icon: icons.seo },
  { name: "AI Marketing Tools", icon: icons.ai },
];

/* ── Intersection Hook ────────────────────────────── */
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
    <div className="cta-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cta-modal">
        <button className="cta-modal-close" onClick={onClose}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <div>
            <h2 className="cta-modal-title">Start Your Journey</h2>
            <p className="cta-modal-sub">
              Fill out the form below and our admissions team will get in touch with you shortly.
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="cta-form-group">
                <label className="cta-label">Full Name</label>
                <input type="text" className="cta-input" required placeholder="John Doe" />
              </div>
              
              <div className="cta-form-group">
                <label className="cta-label">Email Address</label>
                <input type="email" className="cta-input" required placeholder="john@example.com" />
              </div>

              <div className="cta-form-group">
                <label className="cta-label">Program of Interest</label>
                <select className="cta-input" required>
                  <option value="">Select a program...</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="leadership">Business Leadership</option>
                  <option value="creative">Creative Strategy</option>
                </select>
              </div>

              <button type="submit" className="cta-submit-btn">
                Submit Enquiry
              </button>
            </form>
          </div>
        ) : (
          <div className="cta-success-box">
            <div className="cta-success-icon">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="cta-modal-title">Application Received!</h2>
            <p className="cta-modal-sub" style={{ marginBottom: '24px' }}>
              Thank you for your interest. Our admissions team will get back to you soon.
            </p>
            <button onClick={onClose} className="cta-close-btn">
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Component ────────────────────────────────────── */
export default function ToolsAndCTA() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();
  const { ref: ctaRef, visible: ctaVisible } = useReveal();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{css}</style>
      
      {modalOpen && <FormModal onClose={() => setModalOpen(false)} />}
      
      {/* ── TOOLS SECTION ── */}
      <section className="tools-section" id="tools">
        <div className="tools-container">
          <div 
            ref={headerRef}
            className={`tools-header reveal-wrapper ${headerVisible ? 'is-visible' : ''}`}
          >
            <span className="tools-eyebrow">7. Tools You Will Learn</span>
            <h2 className="tools-headline">Learn the tools used by top marketers</h2>
          </div>

          <div 
            ref={gridRef}
            className={`tools-grid reveal-wrapper ${gridVisible ? 'is-visible' : ''}`}
          >
            {tools.map((tool, index) => (
              <div 
                key={tool.name} 
                className="tool-card"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="cta-section" id="cta">
        <div className="cta-container">
          <div 
            ref={ctaRef}
            className={`cta-banner reveal-wrapper ${ctaVisible ? 'is-visible' : ''}`}
          >
            <h2 className="cta-headline">
              Start Your Journey With <em>PeopleMagnet</em>
            </h2>
            <p className="cta-subhead">
              Build the skills that power modern businesses. Join a school designed for <strong>future marketers, creators, and entrepreneurs.</strong>
            </p>

            <div className="cta-actions">
              <button className="cta-btn cta-btn-primary" onClick={() => setModalOpen(true)}>
                Apply Now
              </button>
              <button className="cta-btn cta-btn-secondary" onClick={() => setModalOpen(true)}>
                Explore Programs
              </button>
              <button className="cta-btn cta-btn-tertiary">
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}