"use client";

import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-color: #FAFAFA; 
  --text-main: #111827; 
  --text-muted: #4B5563; 
  --brand: #2563EB; /* Trust Blue */
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

/* ── SECTION & CONTAINER ──────────────────────────── */
.faq-section {
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  padding: 100px 0 120px;
  color: var(--text-main);
}
.faq-container {
  max-width: 800px; /* Kept narrow for optimal reading length */
  margin: 0 auto;
  padding: 0 40px;
}

/* ── HEADER ───────────────────────────────────────── */
.faq-header {
  text-align: center;
  margin-bottom: 56px;
}
.faq-eyebrow {
  font-size: 13px; 
  font-weight: 600;
  text-transform: uppercase; 
  letter-spacing: 0.1em;
  color: var(--brand);
  margin-bottom: 16px;
  display: block;
}
.faq-headline {
  font-family: 'Fraunces', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  line-height: 1.1;
}
.faq-headline em { font-style: italic; color: var(--brand); }

/* ── ACCORDION LIST ───────────────────────────────── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.faq-item {
  background: #FFFFFF;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.faq-item:hover {
  border-color: #D1D5DB;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.faq-item.is-open {
  border-color: var(--brand);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
}

/* Question Button */
.faq-question {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  color: var(--text-main);
  transition: color 0.2s ease;
}
.faq-item.is-open .faq-question {
  color: var(--brand);
}

/* Icon Animation */
.faq-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s ease;
}
.faq-item.is-open .faq-icon {
  transform: rotate(180deg);
  color: var(--brand);
}

/* Answer Content (Animated using CSS Grid) */
.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-item.is-open .faq-answer-wrapper {
  grid-template-rows: 1fr;
}
.faq-answer-inner {
  overflow: hidden;
}
.faq-answer-text {
  padding: 0 32px 24px;
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 640px) {
  .faq-section { padding: 80px 0; }
  .faq-container { padding: 0 24px; }
  .faq-question { padding: 20px 24px; font-size: 16px; }
  .faq-answer-text { padding: 0 24px 20px; }
}
`;

/* ── Icons ────────────────────────────────────────── */
const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

/* ── Data ─────────────────────────────────────────── */
const faqs = [
  {
    q: "Do I need prior experience?",
    a: "No, our programs start from the basics. We teach you everything you need to know from the ground up, making it perfect for absolute beginners."
  },
  {
    q: "Will I work on real projects?",
    a: "Yes, practical learning is a core part of our training. You will work on live briefs and actual campaigns to ensure you graduate with hands-on experience."
  },
  {
    q: "Will I get career guidance?",
    a: "Absolutely. We help with portfolio building, interview preparation, and overall career direction whether you want to land a job, freelance, or start an agency."
  },
  {
    q: "How long are the programs?",
    a: "Program durations vary depending on the specific course you choose. Most of our intensive programs are designed to be completed in a few short months."
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
export default function FAQ() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: listRef, visible: listVisible } = useReveal();
  
  // Track which FAQ is currently open (default to the first one being open)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    // If clicking the already open item, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>{css}</style>
      <section className="faq-section" id="faq">
        <div className="faq-container">
          
          {/* Header */}
          <div 
            ref={headerRef}
            className={`faq-header reveal-wrapper ${headerVisible ? 'is-visible' : ''}`}
          >
            <span className="faq-eyebrow">Got Questions?</span>
            <h2 className="faq-headline">
              Frequently Asked <em>Questions</em>
            </h2>
          </div>

          {/* FAQ Accordion List */}
          <div 
            ref={listRef}
            className={`faq-list reveal-wrapper ${listVisible ? 'is-visible' : ''}`}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    {faq.q}
                    <span className="faq-icon">
                      <ChevronDown />
                    </span>
                  </button>
                  
                  {/* CSS Grid trick for smooth height animation */}
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-inner">
                      <div className="faq-answer-text">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}