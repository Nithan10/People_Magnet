"use client";

import { useEffect, useRef, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-color: #FAFAFA; 
  --text-main: #111827; 
  --brand: #2563EB; /* Trust Blue */
  --footer-bg: #0F172A; /* Deep Navy */
  --footer-text: #F8FAFC;
  --footer-muted: #94A3B8;
  --footer-border: rgba(255, 255, 255, 0.1);
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

/* ── FOOTER SECTION ───────────────────────────────── */
.ft-section {
  background: var(--footer-bg);
  color: var(--footer-text);
  font-family: 'Inter', sans-serif;
  padding: 80px 0 32px;
}
.ft-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ── GRID LAYOUT ──────────────────────────────────── */
.ft-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 64px;
}

/* Column 1: Brand */
.ft-brand-title {
  font-size: 24px;
  font-weight: 800; /* Bolder sans-serif typography */
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.ft-brand-title em {
  font-style: italic;
  color: #60A5FA;
  font-weight: 700;
}
.ft-tagline {
  font-size: 15px;
  color: var(--footer-muted);
  line-height: 1.6;
  max-width: 280px;
}

/* Column Headers */
.ft-col-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--footer-muted);
  margin-bottom: 24px;
}

/* Links & Lists */
.ft-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ft-link {
  color: var(--footer-text);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}
.ft-link:hover {
  color: #60A5FA;
  transform: translateX(4px);
}

/* Contact Details */
.ft-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--footer-text);
  margin-bottom: 20px;
  line-height: 1.5;
}
.ft-contact-item:last-child {
  margin-bottom: 0;
}
.ft-contact-icon {
  color: #60A5FA;
  flex-shrink: 0;
  margin-top: 2px;
}
.ft-contact-item a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}
.ft-contact-item a:hover {
  color: #60A5FA;
}

/* ── BOTTOM BAR ───────────────────────────────────── */
.ft-bottom {
  border-top: 1px solid var(--footer-border);
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--footer-muted);
}
.ft-bottom-links {
  display: flex;
  gap: 24px;
}
.ft-bottom-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}
.ft-bottom-links a:hover {
  color: var(--footer-text);
}

/* ── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1024px) {
  .ft-grid {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
  }
}
@media (max-width: 640px) {
  .ft-section { padding: 64px 0 32px; }
  .ft-container { padding: 0 24px; }
  .ft-grid { grid-template-columns: 1fr; gap: 40px; }
  .ft-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
`;

/* ── Icons ────────────────────────────────────────── */
const icons = {
  instagram: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  youtube: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>,
  linkedin: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  mail: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  phone: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mapPin: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
};

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
export default function Footer() {
  const { ref: footerRef, visible: footerVisible } = useReveal();

  return (
    <>
      <style>{css}</style>
      <footer className="ft-section">
        <div 
          ref={footerRef}
          className={`ft-container reveal-wrapper ${footerVisible ? 'is-visible' : ''}`}
        >
          <div className="ft-grid">
            
            {/* Column 1: Brand Info */}
            <div>
              <h2 className="ft-brand-title">
                PeopleMagnet<br /><em>School of Business</em>
              </h2>
              <p className="ft-tagline">
                Learn Marketing. Build Skills. Create Impact.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <div className="ft-col-title">Explore</div>
              <ul className="ft-list">
                <li><a href="#programs" className="ft-link">Programs</a></li>
                <li><a href="#admissions" className="ft-link">Admissions</a></li>
              </ul>
            </div>

            {/* Column 3: Socials */}
            <div>
              <div className="ft-col-title">Follow Us</div>
              <ul className="ft-list">
                <li><a href="#" className="ft-link">{icons.instagram} Instagram</a></li>
                <li><a href="#" className="ft-link">{icons.youtube} YouTube</a></li>
                <li><a href="#" className="ft-link">{icons.linkedin} LinkedIn</a></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <div className="ft-col-title">Contact</div>
              <div className="ft-contact-item">
                <span className="ft-contact-icon">{icons.mail}</span>
                <a href="mailto:marketing@peoplemagnet.in">marketing@peoplemagnet.in</a>
              </div>
              <div className="ft-contact-item">
                <span className="ft-contact-icon">{icons.phone}</span>
                <a href="tel:9629959948">+91 9629959948</a>
              </div>
              <div className="ft-contact-item">
                <span className="ft-contact-icon">{icons.mapPin}</span>
                <span>Brookefields, Coimbatore,<br />Tamil Nadu</span>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="ft-bottom">
            <div>&copy; {new Date().getFullYear()} PeopleMagnet School of Business. All rights reserved.</div>
            <div className="ft-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}