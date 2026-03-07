"use client";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Clean, Professional Palette */
  --bg-color: #FAFAFA; 
  --text-main: #111827; /* Dark Slate */
  --text-muted: #4B5563; /* Gray */
  --accent: #0F172A; /* Deep Navy */
  --brand: #2563EB; /* Trust Blue */
  --brand-hover: #1D4ED8;
  --surface: #FFFFFF;
  --border: #E5E7EB;
}

/* ─── HERO ──────────────────────────────────────────── */
.pm-hero {
  position: relative;
  width: 100%;
  background: var(--bg-color);
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pm-inner {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  min-height: 90vh;
}

/* ─── LEFT CONTENT ───────────────────────────────────── */
.pm-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Badge */
.pm-badge {
  display: inline-flex; 
  align-items: center; 
  gap: 8px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 100px;
  padding: 6px 16px;
  width: fit-content;
  margin-bottom: 32px;
  opacity: 0;
  animation: fadeUp 0.8s ease forwards;
}
.pm-badge-text {
  font-size: 13px; 
  font-weight: 600;
  color: var(--brand);
  letter-spacing: 0.05em;
}

/* Headline */
.pm-headline {
  font-family: 'Fraunces', serif;
  font-size: clamp(40px, 4.5vw, 64px);
  font-weight: 400;
  color: var(--text-main);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}
.pm-headline span {
  display: block;
  opacity: 0;
}
.pm-hl-1 { animation: fadeUp 0.8s ease 0.1s forwards; }
.pm-hl-2 { animation: fadeUp 0.8s ease 0.2s forwards; }
.pm-hl-3 { animation: fadeUp 0.8s ease 0.3s forwards; }
.pm-hl-brand { color: var(--brand); font-weight: 600; }

/* Description */
.pm-desc {
  font-size: 18px;
  color: var(--text-muted); 
  line-height: 1.6;
  max-width: 540px;
  margin-bottom: 40px;
  opacity: 0; 
  animation: fadeUp 0.8s ease 0.4s forwards;
}

/* CTAs */
.pm-ctas {
  display: flex; 
  gap: 16px; 
  flex-wrap: wrap;
  opacity: 0; 
  animation: fadeUp 0.8s ease 0.5s forwards;
}
.pm-btn-primary {
  padding: 14px 28px;
  background: var(--brand); 
  color: #fff;
  font-size: 15px; 
  font-weight: 500;
  border-radius: 6px; 
  text-decoration: none; 
  transition: background 0.3s ease;
}
.pm-btn-primary:hover { 
  background: var(--brand-hover); 
}
.pm-btn-secondary {
  padding: 14px 28px;
  background: transparent; 
  color: var(--text-main);
  font-size: 15px; 
  font-weight: 500;
  border-radius: 6px; 
  text-decoration: none; 
  border: 1px solid var(--border);
  transition: border-color 0.3s ease;
}
.pm-btn-secondary:hover {
  border-color: var(--text-muted);
}

/* Stats */
.pm-stats {
  display: flex; 
  gap: 40px;
  margin-top: 56px; 
  padding-top: 40px;
  border-top: 1px solid var(--border);
  opacity: 0; 
  animation: fadeUp 0.8s ease 0.6s forwards;
}
.pm-stat-num {
  font-family: 'Fraunces', serif;
  font-size: 32px; 
  color: var(--text-main); 
  margin-bottom: 4px;
}
.pm-stat-lbl { 
  font-size: 13px; 
  color: var(--text-muted); 
  font-weight: 500; 
}

/* ─── RIGHT CONTENT (Clean Image & Card) ─────────────── */
.pm-right {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeUp 1s ease 0.4s forwards;
}
.pm-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 4/5;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}
.pm-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #E5E7EB; /* Fallback color */
}

/* Floating Clean Card */
.pm-float-card {
  position: absolute;
  bottom: 40px;
  left: -40px;
  background: var(--surface);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border: 1px solid var(--border);
  width: 260px;
}
.pm-card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 16px;
}
.pm-card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--text-muted);
}
.pm-card-row:last-child { margin-bottom: 0; }
.pm-card-val { font-weight: 600; color: var(--text-main); }

/* ─── VISION STRIP ───────────────────────────────────── */
.pm-vision {
  background: var(--accent);
  padding: 80px 40px;
}
.pm-vision-inner {
  max-width: 1200px; 
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px; 
  align-items: center;
}
.pm-vision-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 3vw, 40px); 
  color: #FFFFFF; 
  line-height: 1.2;
}
.pm-vision-title em { 
  font-style: italic; 
  color: #94A3B8; 
  font-weight: 300; 
}
.pm-vision-body {
  border-left: 1px solid rgba(255,255,255,0.1);
  padding-left: 40px;
}
.pm-vision-p { 
  font-size: 16px; 
  color: #CBD5E1; 
  line-height: 1.7; 
  margin-bottom: 16px;
}
.pm-vision-p strong { color: #FFFFFF; font-weight: 500; }
.pm-vision-p:last-child { margin-bottom: 0; }

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .pm-inner {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 80px 24px;
  }
  .pm-left { align-items: center; }
  .pm-desc { margin: 0 auto 40px; }
  .pm-ctas, .pm-stats { justify-content: center; }
  .pm-float-card { left: 50%; transform: translateX(-50%); bottom: -30px; }
  
  .pm-vision-inner { grid-template-columns: 1fr; text-align: center; gap: 32px;}
  .pm-vision-body { border-left: none; padding-left: 0; }
}

/* ─── GLOBAL KEYFRAMES ───────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export default function Hero() {
  return (
    <>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section className="pm-hero">
        <div className="pm-inner">
          
          {/* LEFT CONTENT */}
          <div className="pm-left">
            <div className="pm-badge">
              <span className="pm-badge-text">PeopleMagnet Academy</span>
            </div>

            <h1 className="pm-headline">
              <span className="pm-hl-1">Where Future</span>
              <span className="pm-hl-2">Marketers & Leaders</span>
              <span className="pm-hl-3">Are <span className="pm-hl-brand">Built.</span></span>
            </h1>

            <p className="pm-desc">
              Welcome to an elite institution designed to teach real-world marketing, creative strategy, and the growth skills needed to thrive in today's digital economy.
            </p>

            <div className="pm-ctas">
              <a href="/programs" className="pm-btn-primary">Explore Programs</a>
              <a href="/apply" className="pm-btn-secondary">Start Your Journey</a>
            </div>

            <div className="pm-stats">
              {[
                { num: "500+", lbl: "Active Students" },
                { num: "12+",  lbl: "Expert Programs" },
                { num: "92%",  lbl: "Career Placement" },
              ].map(({ num, lbl }) => (
                <div key={lbl} className="pm-stat">
                  <div className="pm-stat-num">{num}</div>
                  <div className="pm-stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT (Simple & Clean) */}
          <div className="pm-right">
            <div className="pm-image-wrapper">
              {/* Replace the src below with an actual high-quality image of students, a campus, or a modern office space */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Students collaborating" 
                className="pm-hero-img"
              />
            </div>
            
            <div className="pm-float-card">
              <div className="pm-card-title">Career Outcomes</div>
              <div className="pm-card-row">
                <span>Avg. Starting Salary</span>
                <span className="pm-card-val">$75k+</span>
              </div>
              <div className="pm-card-row">
                <span>Hired within 6 mo.</span>
                <span className="pm-card-val">92%</span>
              </div>
              <div className="pm-card-row">
                <span>Partner Companies</span>
                <span className="pm-card-val">150+</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── VISION STRIP ── */}
      <section className="pm-vision">
        <div className="pm-vision-inner">
          <div>
            <h2 className="pm-vision-title">
              Building the most<br />
              <em>impactful</em> modern<br />
              business school.
            </h2>
          </div>

          <div className="pm-vision-body">
            <p className="pm-vision-p">
              To build one of the most impactful <strong>modern marketing and business academies</strong>, empowering individuals with the precise skills needed to thrive in a rapidly shifting digital landscape.
            </p>
            <p className="pm-vision-p">
              We aim to create professionals who don't just learn traditional marketing, but who command an understanding of <strong>business growth, consumer psychology, and digital innovation</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}