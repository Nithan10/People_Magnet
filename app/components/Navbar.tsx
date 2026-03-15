'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navLinks = [
    { name: 'Home',           href: '#home' },
    { name: 'About',          href: '#about' },
    { name: 'Why Choose Us',  href: '#why-choose-us' },
    { name: 'Programs',       href: '#programs' },
    { name: 'Experience',     href: '#learning-experience' },
    { name: 'Join',           href: '#who-can-join' },
    { name: 'Tools',          href: '#tools' },
  ];

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsOpen(false); // Close mobile menu if open
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate an API call / form processing here
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset the form state after the exit animation completes
    setTimeout(() => {
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <>
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

            {/* CTA Desktop */}
            <div className="hidden lg:flex" style={{ flexShrink: 0 }}>
              <button
                onClick={handleApplyClick}
                style={{
                  padding: '10px 24px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'white',
                  background: '#0E1117',
                  borderRadius: '100px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(14,17,23,0.2)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#1B4DFF';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(27,77,255,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#0E1117';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(14,17,23,0.2)';
                }}
              >
                Apply Now ✦
              </button>
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
                    <button
                      onClick={handleApplyClick}
                      style={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                        padding: '14px',
                        background: '#0E1117',
                        color: 'white',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '15px',
                        fontWeight: 700,
                        borderRadius: '16px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Apply Now ✦
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* ── Enquiry Form Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0"
              style={{
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: '#FFFFFF',
                width: '100%',
                maxWidth: '440px',
                borderRadius: '24px',
                padding: '32px',
                position: 'relative',
                boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#4B5563',
                }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!isSubmitted ? (
                // FORM STATE
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0E1117', marginBottom: '8px' }}>
                    Start Your Journey
                  </h2>
                  <p style={{ color: '#5A5B6E', fontSize: '15px', marginBottom: '24px', lineHeight: 1.5 }}>
                    Fill out the form below and our admissions team will get in touch with you shortly.
                  </p>

                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0E1117', marginBottom: '6px' }}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0E1117', marginBottom: '6px' }}>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@example.com"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0E1117', marginBottom: '6px' }}>Program of Interest</label>
                      <select 
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          fontSize: '15px',
                          color: '#0E1117',
                          outline: 'none',
                          background: '#FFFFFF'
                        }}
                      >
                        <option value="">Select a program...</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="leadership">Business Leadership</option>
                        <option value="creative">Creative Strategy</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: '8px',
                        width: '100%',
                        padding: '14px',
                        background: '#1B4DFF',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 700,
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        boxShadow: '0 4px 12px rgba(27,77,255,0.2)'
                      }}
                    >
                      Submit Enquiry
                    </button>
                  </form>
                </div>
              ) : (
                // SUCCESS STATE
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ 
                    width: '64px', height: '64px', background: '#DEF7EC', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#046C4E'
                  }}>
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0E1117', marginBottom: '12px' }}>
                    Application Received!
                  </h2>
                  <p style={{ color: '#5A5B6E', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                    Thank you for your interest. Our admissions team will get back to you soon.
                  </p>
                  <button
                    onClick={closeModal}
                    style={{
                      padding: '12px 24px',
                      background: '#F1F5F9',
                      color: '#0E1117',
                      fontSize: '15px',
                      fontWeight: 700,
                      borderRadius: '100px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}