import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function WhatsAppIcon({ className = 'w-6 h-6' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15s-.777.978-.953 1.179c-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.233-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.908 1.229 3.109.15.2 2.122 3.24 5.14 4.543.718.31 1.279.495 1.716.634.721.229 1.377.197 1.896.119.579-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.544 2 2.08 6.464 2.08 11.96c0 1.86.513 3.597 1.405 5.087L2 22l5.105-1.455c1.435.845 3.107 1.375 4.935 1.375 5.496 0 9.96-4.464 9.96-9.96S17.536 2 12.04 2zm0 18.258c-1.63 0-3.14-.492-4.407-1.336l-.316-.21-3.03.864.847-2.956-.226-.328a8.21 8.21 0 01-1.282-4.332c0-4.57 3.718-8.288 8.288-8.288 4.57 0 8.288 3.718 8.288 8.288 0 4.57-3.718 8.288-8.288 8.288z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide when Contact section is in view
    const contactElement = document.querySelector('#contact');
    if (!contactElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If contact section is intersecting, hide the floating button
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(contactElement);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/923130080742"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent text-accent-ink flex items-center justify-center shadow-lg shadow-accent/40 border border-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
          aria-label="Direct chat on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
