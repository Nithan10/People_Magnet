"use client";

import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-color: #FFFFFF; 
  --text-main: #111827; 
  --text-muted: #4B5563; 
  --accent: #0F172A; /* Deep Navy */
  --brand: #2563EB; /* Trust Blue */
  --surface: #F9FAFB;
  --border: #E5E7EB;
}

/* ── SECTION & CONTAINER ──────────────────────────── */
.le-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 120px 0 0; /* No bottom padding because of marquee */
  color: var(--text-main);
  overflow: hidden;
}
.le-container {
  max-width: 1000px; /* Slightly narrower for readability on timelines */
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
.le-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 80px;
}
.le-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 16px;
  display: block;
}
.le-headline {
  font-family: 'Fraunces', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 24px;
}
.le-headline em { font-style: italic; color: var(--brand); }
.le-subhead {
  font-size: 18px; 
  color: var(--text-muted); 
  line-height: 1.6;
}

/* ── TIMELINE ─────────────────────────────────────── */
.le-timeline {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
}

.le-step {
  display: flex;
  gap: 40px;
  position: relative;
  padding-bottom: 64px;
}
.le-step:last-child {
  padding-bottom: 0;
}

/* The vertical connecting line */
.le-step::before {
  content: '';
  position: absolute;
  left: 28px; /* Center of the 56px circle */
  top: 56px;
  bottom: -8px;
  width: 2px;
  background: var(--border);
  z-index: 0;
}
.le-step:last-child::before {
  display: none;
}

/* Number Indicator */
.le-step-num {
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #EFF6FF;
  color: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 24px;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 0 0 8px var(--bg-color); /* Creates a cutout effect over the line */
}

/* Step Content */
.le-step-content {
  padding-top: 12px;
}
.le-step-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 12px;
}
.le-step-desc {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.6;
}
.le-step-desc strong {
  color: var(--text-main);
  font-weight: 500;
}

/* ── INFINITE MARQUEE ─────────────────────────────── */
.le-marquee-section {
  margin-top: 120px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 40px 0;
  overflow: hidden;
  position: relative;
  display: flex;
}

/* Optional fade gradients on the edges of the marquee */
.le-marquee-section::before,
.le-marquee-section::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 150px;
  z-index: 2;
  pointer-events: none;
}
.le-marquee-section::before {
  left: 0;
  background: linear-gradient(to right, var(--surface), transparent);
}
.le-marquee-section::after {
  right: 0;
  background: linear-gradient(to left, var(--surface), transparent);
}

.le-marquee-track {
  display: flex;
  width: max-content;
  animation: scrollMarquee 30s linear infinite;
}

/* Pause on hover for better UX */
.le-marquee-track:hover {
  animation-play-state: paused;
}

.le-marquee-content {
  display: flex;
  align-items: center;
  gap: 64px;
  padding-right: 64px; /* Matches gap to ensure seamless loop */
}

.le-marquee-item {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 400;
  color: #9CA3AF; /* Light gray */
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
}
.le-marquee-dot {
  color: var(--brand);
  font-size: 16px;
}

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Scrolls exactly half the width (one full set) */
}

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 768px) {
  .le-section { padding: 80px 0 0; }
  .le-marquee-section { margin-top: 80px; padding: 32px 0; }
  .le-step { gap: 24px; padding-bottom: 48px; }
  .le-step-num { width: 48px; height: 48px; font-size: 20px; }
  .le-step::before { left: 24px; top: 48px; }
  .le-step-title { font-size: 20px; }
  .le-marquee-item { font-size: 22px; }
}
`;

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

/* ── Data ─────────────────────────────────────────── */
const steps = [
  {
    num: "1",
    title: "Foundation",
    desc: <>Understand the <strong>fundamentals of marketing</strong>. We strip away the noise and teach you the core principles of consumer psychology and market positioning.</>,
  },
  {
    num: "2",
    title: "Practical Training",
    desc: <>Work on <strong>real projects and campaigns</strong>. Apply your foundational knowledge immediately to live briefs, simulating actual agency or startup environments.</>,
  },
  {
    num: "3",
    title: "Tool Mastery",
    desc: <>Learn the <strong>latest industry tools</strong>. Become proficient in the software and platforms that top marketing teams use every single day.</>,
  },
  {
    num: "4",
    title: "Portfolio Building",
    desc: <>Create your <strong>personal marketing portfolio</strong>. Graduate with tangible proof of your skills, complete with data-backed case studies of your campaigns.</>,
  },
  {
    num: "5",
    title: "Career Preparation",
    desc: <>Get ready for <strong>jobs, freelancing, or starting your own agency</strong>. We provide interview prep, personal branding guidance, and networking strategies.</>,
  },
];

/* Marquee Items (Repeated twice in the track for infinite scrolling) */
const marqueeItems = [
  "Meta Ads",
  "Google Analytics",
  "Premiere Pro",
  "SEO Strategy",
  "Content Marketing",
  "CapCut",
  "Conversion Optimization",
  "Growth Hacking",
  "AI Marketing Tools",
  "Figma"
];

/* ── Component ────────────────────────────────────── */
export default function LearningExperience() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: timelineRef, visible: timelineVisible } = useReveal();

  return (
    <>
      <style>{css}</style>
      <section className="le-section" id="learning-experience">
        
        <div className="le-container">
          {/* Header */}
          <div 
            ref={headerRef}
            className={`le-header reveal-wrapper ${headerVisible ? 'is-visible' : ''}`}
          >
            <span className="le-eyebrow">Learning Experience</span>
            <h2 className="le-headline">
              How You Will <em>Learn.</em>
            </h2>
            <p className="le-subhead">
              Our proven 5-step framework takes you from absolute beginner to a confident, hirable professional.
            </p>
          </div>

          {/* Timeline */}
          <div 
            ref={timelineRef}
            className={`le-timeline reveal-wrapper ${timelineVisible ? 'is-visible' : ''}`}
          >
            {steps.map((step, index) => (
              <div 
                key={step.num} 
                className="le-step"
                style={{ transitionDelay: `${index * 0.15}s` }} /* Staggered fade in */
              >
                <div className="le-step-num">{step.num}</div>
                <div className="le-step-content">
                  <h3 className="le-step-title">{step.title}</h3>
                  <p className="le-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Marquee Carousel */}
        <div className="le-marquee-section">
          <div className="le-marquee-track">
            
            {/* Set 1 */}
            <div className="le-marquee-content">
              {marqueeItems.map((item, i) => (
                <div key={`set1-${i}`} className="le-marquee-item">
                  <span>{item}</span>
                  <span className="le-marquee-dot">✦</span>
                </div>
              ))}
            </div>

            {/* Set 2 (Exact duplicate for seamless looping) */}
            <div className="le-marquee-content">
              {marqueeItems.map((item, i) => (
                <div key={`set2-${i}`} className="le-marquee-item">
                  <span>{item}</span>
                  <span className="le-marquee-dot">✦</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>
    </>
  );
}