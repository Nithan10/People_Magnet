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
.pg-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 120px 0;
  color: var(--text-main);
}
.pg-container {
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
.pg-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 72px;
}
.pg-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 16px;
  display: block;
}
.pg-headline {
  font-family: 'Fraunces', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 24px;
}
.pg-headline em { font-style: italic; color: var(--brand); }
.pg-subhead {
  font-size: 18px; 
  color: var(--text-muted); 
  line-height: 1.6;
}

/* ── GRID & CARDS ─────────────────────────────────── */
.pg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.pg-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.pg-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.04);
  border-color: #D1D5DB;
}

/* Card Header */
.pg-card-icon {
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
.pg-card-title {
  font-family: 'Fraunces', serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 12px;
  color: var(--text-main);
}
.pg-card-desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 32px;
}

/* Card List */
.pg-card-divider {
  height: 1px;
  background: var(--border);
  margin-bottom: 24px;
}
.pg-list-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-main);
  margin-bottom: 16px;
}
.pg-list {
  list-style: none;
  margin-bottom: 32px;
  flex-grow: 1; /* Pushes tags to the bottom */
}
.pg-list-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 12px;
  line-height: 1.5;
}
.pg-list-item:last-child { margin-bottom: 0; }
.pg-list-icon {
  color: #10B981; /* Success Green */
  flex-shrink: 0;
  margin-top: 2px;
}

/* Card Footer Tags */
.pg-tags-wrapper {
  background: #F9FAFB;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}
.pg-tags-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.pg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pg-tag {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
}

/* CTA */
.pg-btn {
  width: 100%;
  padding: 14px;
  text-align: center;
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.pg-btn:hover {
  background: var(--text-main);
  color: var(--surface);
  border-color: var(--text-main);
}

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}
@media (max-width: 768px) {
  .pg-section { padding: 80px 0; }
  .pg-grid { grid-template-columns: 1fr; }
}
`;

/* ── Icons ────────────────────────────────────────── */
const icons = {
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  marketing: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  video: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  growth: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  ),
};

/* ── Data ─────────────────────────────────────────── */
const programs = [
  {
    id: 1,
    title: "Digital Marketing Program",
    desc: "Master the skills required to become a highly sought-after professional digital marketer.",
    icon: icons.marketing,
    learn: [
      "Social Media Marketing",
      "Meta Ads & Google Ads",
      "Search Engine Optimization (SEO)",
      "Content Marketing",
      "Lead Generation Strategies",
      "Email Marketing",
      "AI Tools for Marketing",
      "Website & Funnel Basics",
      "Analytics & Data Tracking"
    ],
    tagsLabel: "Perfect For",
    tags: ["Students", "Business Owners", "Freelancers", "Job Seekers"]
  },
  {
    id: 2,
    title: "Video Editing Program",
    desc: "Learn to create high-quality videos, reels, and marketing content that brands need today.",
    icon: icons.video,
    learn: [
      "Professional Video Editing",
      "Reels & Short Form Content",
      "YouTube Video Editing",
      "Storytelling & Video Structure",
      "Motion Graphics Basics",
      "Color Correction",
      "Editing for Social Media"
    ],
    tagsLabel: "Tools Covered",
    tags: ["Premiere Pro", "After Effects", "CapCut", "AI Video Tools"]
  },
  {
    id: 3,
    title: "Growth Marketing Program",
    desc: "Learn advanced strategies to understand how companies scale from zero to millions of users.",
    icon: icons.growth,
    learn: [
      "Growth Marketing Frameworks",
      "Performance Marketing",
      "Funnel Building",
      "Conversion Optimization",
      "Data Driven Marketing",
      "Viral Marketing Strategies",
      "Customer Psychology"
    ],
    tagsLabel: "Perfect For",
    tags: ["Founders", "Marketers", "Agency Owners", "Product Managers"] // Added inferred tags for layout consistency
  }
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
export default function Programs() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <>
      <style>{css}</style>
      <section className="pg-section" id="programs">
        <div className="pg-container">
          
          {/* Header */}
          <div 
            ref={headerRef}
            className={`pg-header reveal-wrapper ${headerVisible ? 'is-visible' : ''}`}
          >
            <span className="pg-eyebrow">Our Programs</span>
            <h2 className="pg-headline">
              Master the skills that <em>matter.</em>
            </h2>
            <p className="pg-subhead">
              Intensive, execution-focused programs designed to turn beginners into highly capable professionals.
            </p>
          </div>

          {/* Cards Grid */}
          <div 
            ref={gridRef}
            className={`pg-grid reveal-wrapper ${gridVisible ? 'is-visible' : ''}`}
          >
            {programs.map((prog, index) => (
              <div 
                key={prog.id} 
                className="pg-card"
                style={{ 
                  transitionDelay: `${index * 0.15}s` /* Staggered fade in */
                }}
              >
                
                {/* Top Section */}
                <div className="pg-card-icon">{prog.icon}</div>
                <h3 className="pg-card-title">{prog.title}</h3>
                <p className="pg-card-desc">{prog.desc}</p>
                
                <div className="pg-card-divider" />

                {/* List Section */}
                <div className="pg-list-title">What You Will Learn</div>
                <ul className="pg-list">
                  {prog.learn.map((item, i) => (
                    <li key={i} className="pg-list-item">
                      <div className="pg-list-icon">{icons.check}</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags Section */}
                <div className="pg-tags-wrapper">
                  <div className="pg-tags-title">{prog.tagsLabel}</div>
                  <div className="pg-tags">
                    {prog.tags.map((tag, i) => (
                      <span key={i} className="pg-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <button className="pg-btn">View Full Curriculum</button>

              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}