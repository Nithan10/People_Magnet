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
.wj-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 120px 0;
  color: var(--text-main);
}
.wj-container {
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
.wj-header {
  text-align: left; /* Aligned left for consistency */
  max-width: 800px;
  margin: 0 0 64px 0;
}
.wj-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 16px;
  display: block;
}
.wj-headline {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800; /* Bolder weight for sans-serif */
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}
.wj-headline em { 
  font-style: italic; 
  color: var(--brand); 
  font-weight: 700;
}

/* ── GRID & CARDS ─────────────────────────────────── */
.wj-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 56px;
}
.wj-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 40px 32px;
  text-align: left; /* Changed from center to left */
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns contents to the left */
}
.wj-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.04);
  border-color: #D1D5DB;
}
.wj-icon-wrap {
  width: 56px;
  height: 56px;
  background: #EFF6FF;
  color: var(--brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.wj-card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}
.wj-card-desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ── BOTTOM BANNER ────────────────────────────────── */
.wj-footer {
  display: flex;
  justify-content: flex-start; /* Aligned left to match content */
}
.wj-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--brand);
}
.wj-badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--brand);
  color: #fff;
  border-radius: 50%;
}

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .wj-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .wj-section { padding: 80px 0; }
  .wj-header { text-align: center; margin: 0 auto 48px; } /* Center aligned on mobile */
  .wj-grid { grid-template-columns: 1fr; }
  .wj-card { align-items: center; text-align: center; } /* Center cards on mobile */
  .wj-footer { justify-content: center; } /* Center badge on mobile */
  .wj-badge { width: 100%; justify-content: center; text-align: center; flex-direction: column; gap: 12px; padding: 20px; }
}
`;

/* ── Icons ────────────────────────────────────────── */
const icons = {
  student: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
  ),
  graduate: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
  ),
  freelancer: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  ),
  business: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
  ),
  creator: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
  ),
  anyone: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  )
};

/* ── Data ─────────────────────────────────────────── */
const audiences = [
  {
    title: "Students",
    desc: "Looking for lucrative career opportunities and internships.",
    icon: icons.student,
  },
  {
    title: "Fresh Graduates",
    desc: "Want to kickstart a high-paying career immediately after college.",
    icon: icons.graduate,
  },
  {
    title: "Freelancers",
    desc: "Who want to learn high-income skills and attract premium clients.",
    icon: icons.freelancer,
  },
  {
    title: "Business Owners",
    desc: "Who want to scale their revenue and grow their brand online.",
    icon: icons.business,
  },
  {
    title: "Content Creators",
    desc: "Influencers looking to monetize their audience and brand deals.",
    icon: icons.creator,
  },
  {
    title: "Anyone Interested",
    desc: "Anyone with a passion for learning digital marketing from scratch.",
    icon: icons.anyone,
  },
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

/* ── Component ────────────────────────────────────── */
export default function WhoCanJoin() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();
  const { ref: footerRef, visible: footerVisible } = useReveal();

  return (
    <>
      <style>{css}</style>
      <section className="wj-section" id="who-can-join">
        <div className="wj-container">
          
          {/* Header */}
          <div 
            ref={headerRef}
            className={`wj-header reveal-wrapper ${headerVisible ? 'is-visible' : ''}`}
          >
            <span className="wj-eyebrow">Who Can Join</span>
            <h2 className="wj-headline">
              This Program Is <em>Perfect For</em>
            </h2>
          </div>

          {/* Grid */}
          <div 
            ref={gridRef}
            className={`wj-grid reveal-wrapper ${gridVisible ? 'is-visible' : ''}`}
          >
            {audiences.map((item, index) => (
              <div 
                key={item.title} 
                className="wj-card"
                style={{ transitionDelay: `${index * 0.1}s` }} /* Staggered fade in */
              >
                <div className="wj-icon-wrap">{item.icon}</div>
                <h3 className="wj-card-title">{item.title}</h3>
                <p className="wj-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer Badge */}
          <div 
            ref={footerRef}
            className={`wj-footer reveal-wrapper ${footerVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="wj-badge">
              <div className="wj-badge-icon">{icons.check}</div>
              No prior experience required. We teach you from the ground up.
            </div>
          </div>

        </div>
      </section>
    </>
  );
}