'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navLinks = [
    { name: 'Home',           href: '#home' },
    { name: 'About',          href: '#about' },
    { name: 'Why Choose Us',  href: '#why-choose-us' },
    { name: 'Programs',       href: '#programs' },
    { name: 'Experience',     href: '#experience' },
    { name: 'Join',           href: '#who-can-join' },
    { name: 'Tools',          href: '#tools' },
  ];

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-6xl relative">

        {/* ── Pill Bar ── */}
        <div
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 8px 8px 28px',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px',
              fontWeight: 800,
              color: '#0E1117',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            People
            <span style={{
              background: 'linear-gradient(90deg, #1B4DFF, #3B6EFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Magnet
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: '2px', position: 'relative' }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                style={{
                  position: 'relative',
                  padding: '8px 14px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  color: hoveredIndex === index ? '#0E1117' : '#5A5B6E',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  zIndex: 10,
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.name}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: '100px',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                      border: '1px solid rgba(14,17,23,0.06)',
                      zIndex: -1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex" style={{ flexShrink: 0 }}>
            <Link
              href="#apply"
              style={{
                padding: '10px 24px',
                fontSize: '13.5px',
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                color: 'white',
                background: '#0E1117',
                borderRadius: '100px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(14,17,23,0.2)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#1B4DFF';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(27,77,255,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#0E1117';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 14px rgba(14,17,23,0.2)';
              }}
            >
              Apply Now ✦
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                padding: '8px',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#5A5B6E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {!isOpen ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: 0, right: 0,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.9)',
                borderRadius: '28px',
                padding: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                zIndex: 50,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '16px',
                      fontSize: '15px',
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      color: '#5A5B6E',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = '#F8F7F4';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#0E1117';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#5A5B6E';
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(14,17,23,0.06)' }}>
                  <Link
                    href="#apply"
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '14px',
                      background: '#0E1117',
                      color: 'white',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      borderRadius: '16px',
                      textDecoration: 'none',
                    }}
                  >
                    Apply Now ✦
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}