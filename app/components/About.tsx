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

/* ── SECTION WRAPPER ──────────────────────────────── */
.ab-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 120px 0;
  color: var(--text-main);
}

.ab-container {
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

/* ── TOP SPLIT ─────────────────────────────────────── */
.ab-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 96px;
  align-items: flex-start;
  text-align: left;
}

.ab-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 24px;
  display: block;
}

.ab-headline {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 800; /* Increased weight for sans-serif */
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}
.ab-headline em { font-style: italic; color: var(--brand); }

.ab-lead {
  font-size: 18px; 
  color: var(--text-muted); 
  line-height: 1.6;
}

.ab-body-text {
  font-size: 16px; 
  color: var(--text-muted); 
  line-height: 1.7;
  margin-bottom: 32px;
}
.ab-body-text strong { color: var(--text-main); font-weight: 600; }

.ab-highlight {
  background: var(--surface);
  border-left: 4px solid var(--brand);
  padding: 24px;
  font-size: 16px; 
  color: var(--text-main);
  font-weight: 500; 
  line-height: 1.6;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.ab-roles-label {
  font-size: 12px; 
  font-weight: 600; 
  text-transform: uppercase;
  letter-spacing: 0.05em; 
  color: var(--text-muted); 
  margin-bottom: 16px;
}
.ab-roles-grid {
  display: flex; 
  flex-wrap: wrap; 
  gap: 12px;
}
.ab-role-pill {
  padding: 8px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 14px; 
  font-weight: 500; 
  color: var(--text-main);
}

/* ── DIFFERENTIATOR STRIP ────────────────────────── */
.ab-diff-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 96px;
  text-align: left;
}
.ab-diff-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 40px 32px;
  border-radius: 8px;
}
.ab-diff-num {
  font-size: 40px; 
  font-weight: 800;
  color: var(--text-main); 
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.ab-diff-num span { font-size: 20px; color: var(--text-muted); font-weight: 600; }
.ab-diff-title {
  font-size: 18px; 
  font-weight: 700; 
  margin-bottom: 12px;
}
.ab-diff-body { 
  font-size: 15px; 
  color: var(--text-muted); 
  line-height: 1.6; 
}

/* ── COMPARE TABLE ────────────────────────────────── */
.ab-compare-wrap { 
  margin-bottom: 96px; 
}
.ab-compare-title {
  font-size: 32px; 
  font-weight: 800;
  margin-bottom: 32px;
  text-align: left; /* Aligned to left for consistency */
  letter-spacing: -0.02em;
}
.ab-compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
}
.ab-col { padding: 40px; }
.ab-col-trad { background: #F9FAFB; border-right: 1px solid var(--border); }
.ab-col-pm { background: var(--surface); }

.ab-col-header {
  font-size: 20px; 
  font-weight: 700; 
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.ab-col-pm .ab-col-header { color: var(--brand); }

.ab-row {
  display: flex; 
  align-items: flex-start; 
  gap: 12px;
  font-size: 15px; 
  margin-bottom: 16px;
  line-height: 1.5;
}
.ab-row:last-child { margin-bottom: 0; }
.ab-col-trad .ab-row { color: var(--text-muted); }
.ab-col-pm .ab-row { color: var(--text-main); font-weight: 500; }
.ab-row-icon { font-weight: 700; }
.ab-col-trad .ab-row-icon { color: #EF4444; } /* Red X */
.ab-col-pm .ab-row-icon { color: #10B981; } /* Green Check */

/* ── ECOSYSTEM STRIP ──────────────────────────────── */
.ab-ecosystem {
  background: var(--accent);
  color: #FFFFFF;
  padding: 80px 64px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px; 
  align-items: center;
  text-align: left;
}
.ab-eco-tag {
  font-size: 12px; 
  font-weight: 600; 
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  color: #94A3B8; 
  margin-bottom: 16px;
}
.ab-eco-title {
  font-size: 40px; 
  font-weight: 800;
  line-height: 1.1; 
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}
.ab-eco-title em { font-style: italic; color: #60A5FA; }
.ab-eco-body {
  font-size: 16px; 
  color: #CBD5E1;
  line-height: 1.7; 
}

.ab-equation {
  display: flex; 
  flex-direction: column; 
  gap: 16px; 
}
.ab-eq-item {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; 
  padding: 20px;
}
.ab-eq-text { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.ab-eq-sub { font-size: 14px; color: #94A3B8; }
.ab-eq-result {
  background: var(--brand);
  border-color: var(--brand);
}
.ab-eq-result .ab-eq-sub { color: #DBEAFE; }

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .ab-top { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .ab-top > div { display: flex; flex-direction: column; align-items: center; }
  .ab-diff-strip { grid-template-columns: 1fr; text-align: center; }
  .ab-compare-grid { grid-template-columns: 1fr; }
  .ab-compare-title { text-align: center; }
  .ab-col-trad { border-right: none; border-bottom: 1px solid var(--border); }
  .ab-ecosystem { grid-template-columns: 1fr; padding: 48px 32px; text-align: center; }
  .ab-roles-grid { justify-content: center; }
}
`;

/* ── Intersection-triggered animation helper ─────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          setVisible(true); 
          obs.disconnect(); 
        } 
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  
  return { ref, visible };
}

export default function About() {
  const { ref: topRef, visible: topVisible } = useReveal();
  const { ref: stripRef, visible: stripVisible } = useReveal();
  const { ref: compareRef, visible: compareVisible } = useReveal();
  const { ref: ecoRef, visible: ecoVisible } = useReveal();

  const roles = [
    "Skilled Marketers", 
    "Creative Professionals", 
    "Growth Strategists", 
    "Business Thinkers", 
    "Digital Entrepreneurs"
  ];

  const tradRows = [
    "Heavy theory, minimal practical execution",
    "Outdated and slow-moving curriculum cycles",
    "Passive learning in traditional classrooms",
    "Focus prioritizes degrees over actual skills",
    "Limited to no direct industry connection"
  ];

  const pmRows = [
    "Skills and execution taught from Day 1",
    "Continuously updated, modern content",
    "Active, project-based learning models",
    "Career, freelance, and venture ready",
    "Built with industry professionals at the core"
  ];

  return (
    <>
      <style>{css}</style>

      <section className="ab-section" id="about">
        <div className="ab-container">

          {/* ── TOP SPLIT ── */}
          <div 
            ref={topRef} 
            className={`ab-top reveal-wrapper ${topVisible ? 'is-visible' : ''}`}
          >
            <div>
              <span className="ab-eyebrow">About Us</span>
              <h2 className="ab-headline">
                About <em>PeopleMagnet</em><br />
                School of Business
              </h2>
              <p className="ab-lead">
                A new-age learning ecosystem built for the digital world — where skills, execution, and real industry experience come before traditional theory.
              </p>
            </div>

            <div>
              <p className="ab-body-text">
                Traditional education often focuses on theory. At PeopleMagnet, we focus on <strong>skills, execution, and real industry experience</strong>. Our programs are designed to prepare students not just for jobs — but for careers, freelancing, and building their own ventures.
              </p>

              <div className="ab-highlight">
                At PeopleMagnet, marketing is not just a subject — it's a powerful business language every modern professional must speak fluently.
              </div>

              <div>
                <div className="ab-roles-label">Our students become:</div>
                <div className="ab-roles-grid">
                  {roles.map((label) => (
                    <div key={label} className="ab-role-pill">{label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── DIFFERENTIATOR STRIP ── */}
          <div 
            ref={stripRef} 
            className={`ab-diff-strip reveal-wrapper ${stripVisible ? 'is-visible' : ''}`}
          >
            <div className="ab-diff-card">
              <div className="ab-diff-num">100<span>%</span></div>
              <div className="ab-diff-title">Skills-First Curriculum</div>
              <div className="ab-diff-body">Every module is built around real industry skills. No fluff — just what actually gets you hired or launched.</div>
            </div>
            <div className="ab-diff-card">
              <div className="ab-diff-num">3<span>×</span></div>
              <div className="ab-diff-title">Industry Exposure</div>
              <div className="ab-diff-body">Students engage with real tools, real briefs, and real professionals throughout every program they take.</div>
            </div>
            <div className="ab-diff-card">
              <div className="ab-diff-num">1:1</div>
              <div className="ab-diff-title">Execution Mentorship</div>
              <div className="ab-diff-body">We don't just teach — we guide students to build portfolios, land clients, and launch their own ventures.</div>
            </div>
          </div>

          {/* ── COMPARE TABLE ── */}
          <div 
            ref={compareRef} 
            className={`ab-compare-wrap reveal-wrapper ${compareVisible ? 'is-visible' : ''}`}
          >
            <h3 className="ab-compare-title">Traditional Education vs PeopleMagnet</h3>
            <div className="ab-compare-grid">
              
              <div className="ab-col ab-col-trad">
                <div className="ab-col-header">Traditional Education</div>
                {tradRows.map((text, i) => (
                  <div key={i} className="ab-row">
                    <span className="ab-row-icon">✕</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="ab-col ab-col-pm">
                <div className="ab-col-header">PeopleMagnet Approach</div>
                {pmRows.map((text, i) => (
                  <div key={i} className="ab-row">
                    <span className="ab-row-icon">✓</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── ECOSYSTEM STRIP ── */}
          <div 
            ref={ecoRef} 
            className={`ab-ecosystem reveal-wrapper ${ecoVisible ? 'is-visible' : ''}`}
          >
            <div>
              <div className="ab-eco-tag">Our Approach</div>
              <h3 className="ab-eco-title">
                Education + Experience<br />
                + Exposure =<br />
                <em>Real Careers.</em>
              </h3>
              <p className="ab-eco-body">
                We combine education, practical experience, and industry exposure to help students build real careers — not just earn certificates. Every program is a bridge between the classroom and the real world.
              </p>
            </div>

            <div className="ab-equation">
              <div className="ab-eq-item">
                <div className="ab-eq-text">1. Education</div>
                <div className="ab-eq-sub">Deep, modern knowledge base</div>
              </div>
              <div className="ab-eq-item">
                <div className="ab-eq-text">2. Practical Experience</div>
                <div className="ab-eq-sub">Real briefs & live projects</div>
              </div>
              <div className="ab-eq-item">
                <div className="ab-eq-text">3. Industry Exposure</div>
                <div className="ab-eq-sub">Tools, pros & networks</div>
              </div>
              <div className="ab-eq-item ab-eq-result">
                <div className="ab-eq-text">🏆 Real Careers Built</div>
                <div className="ab-eq-sub">That's the PeopleMagnet promise</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}