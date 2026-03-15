"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace these with your actual contact details
  const phoneNumber = "+1234567890";
  const whatsappNumber = "1234567890";
  const whatsappMessage = "Hello ShiroVeda team, I would like to know more about your programs!";

  const toggleMenu = () => setIsOpen(!isOpen);

  // Framer Motion Variants for smooth staggered animations
  const menuVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.5,
      filter: "blur(4px)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop-up Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            // Tighter vertical space to make the group look compact
            className="flex flex-col items-end space-y-3 mb-4"
          >
            {/* WhatsApp Row */}
            {/* gap-6 adds the extra horizontal space you requested */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              {/* Compact Dark Label */}
              <div className="px-3.5 py-1.5 bg-[#0A0A0A] text-white text-[13px] font-bold tracking-wide rounded-full shadow-md whitespace-nowrap">
                WhatsApp Us
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                // Reduced size to 48px (w-12 h-12)
                className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                aria-label="WhatsApp Us"
              >
                {/* Scaled down icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.85-6.96zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a7.86 7.86 0 0 1-1.21-4.23c0-4.36 3.55-7.91 7.91-7.91c2.11 0 4.1.82 5.59 2.32c1.49 1.49 2.32 3.48 2.32 5.59c-.01 4.37-3.56 7.91-7.92 7.91zm4.33-5.92c-.24-.12-1.42-.7-1.64-.78c-.22-.08-.38-.12-.54.12c-.16.24-.62.78-.76.94c-.14.16-.28.18-.52.06c-.24-.12-1.01-.37-1.92-1.18c-.71-.63-1.19-1.41-1.33-1.65c-.14-.24-.02-.37.1-.49c.11-.11.24-.28.36-.42c.12-.14.16-.24.24-.4c.08-.16.04-.3-.02-.42c-.06-.12-.54-1.3-.74-1.78c-.2-.47-.4-.41-.54-.42c-.14-.01-.3-.01-.46-.01c-.16 0-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6c.57.24 1.01.39 1.36.5c.57.18 1.09.15 1.5.09c.46-.06 1.42-.58 1.62-1.14c.2-.56.2-.104.14-1.14c-.06-.08-.22-.12-.46-.24z"/>
                </svg>
              </a>
            </motion.div>

            {/* Phone Row */}
            <motion.div variants={itemVariants} className="flex items-center gap-6">
               {/* Compact Dark Label */}
              <div className="px-3.5 py-1.5 bg-[#0A0A0A] text-white text-[13px] font-bold tracking-wide rounded-full shadow-md whitespace-nowrap">
                Call Us
              </div>
              <a
                href={`tel:${phoneNumber}`}
                // Reduced size to 48px (w-12 h-12)
                className="flex items-center justify-center w-12 h-12 bg-[#1DA1F2] text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                aria-label="Call Us"
              >
                {/* Scaled down icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.div
        animate={{
          boxShadow: isOpen
            ? "0px 0px 0px 0px rgba(37, 99, 235, 0)"
            : [
                "0px 0px 0px 0px rgba(239, 68, 68, 0.4)",
                "0px 0px 0px 15px rgba(239, 68, 68, 0)",
              ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-full"
      >
        <button
          onClick={toggleMenu}
          // Set to 52px so it's slightly larger than the children, but smaller than the previous 60px
          className={`flex items-center justify-center w-[52px] h-[52px] rounded-full shadow-2xl transition-colors duration-300 z-50 focus:outline-none ${
            isOpen ? "bg-[#EF4444] hover:bg-red-600" : "bg-[#EF4444] hover:bg-red-600"
          }`}
          aria-label={isOpen ? "Close Contact Options" : "Open Contact Options"}
        >
          <motion.div
            animate={{ 
              rotate: isOpen ? 90 : 0, // A 90-degree rotate creates the perfect 'X' from a '+'
              scale: isOpen ? 1.1 : 1 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-white"
          >
            {/* Switched to a standard '+' icon so it naturally becomes an 'X' when rotated */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}