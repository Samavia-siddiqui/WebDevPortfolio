import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'FAQ', href: '#faq' },
];

function BuildLogoMark({ className = 'w-8 h-8' }) {
  return (
    <div
      className={`${className} rounded-xl bg-dark border border-zinc-800 flex items-center justify-center shrink-0 shadow-sm group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(255,186,100,0.3)] transition-all duration-300`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      >
        {/* Isometric 3D Builder Cube */}
        <path d="M12 2.5L20 7L12 11.5L4 7L12 2.5Z" fill="#FDE68A" />
        <path d="M4 7V16L12 20.5V11.5L4 7Z" fill="#FFBA64" />
        <path d="M12 11.5V20.5L20 16V7L12 11.5Z" fill="#B45309" />
        {/* Crisp Code Brackets */}
        <path
          d="M9 11.5L7.5 13L9 14.5M15 11.5L16.5 13L15 14.5"
          stroke="#1A0F00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-sm py-3'
          : 'bg-white border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo / Monogram: BuildBySamavia */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, '#hero')}
          className="flex items-center gap-2 sm:gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg shrink-0"
          aria-label="BuildBySamavia - Home"
        >
          <BuildLogoMark className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-dark font-sans select-none">
            BuildBy<span className="text-accent-text">Samavia</span><span className="text-accent-text">.</span>
          </span>
        </a>

        {/* Center Desktop Navigation Links */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-white/80 border border-zinc-200/80 rounded-full px-3 py-1 shadow-sm backdrop-blur-sm"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 hover:text-dark px-3 py-1.5 rounded-full hover:bg-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop/Tablet CTA */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-2 bg-dark hover:bg-zinc-800 text-light font-black text-xs uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" aria-hidden="true" />
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-dark hover:text-accent rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-base font-bold text-dark hover:text-accent-text py-2 border-b border-zinc-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="mt-2 text-center bg-accent text-accent-ink font-black text-xs uppercase tracking-wider py-3 rounded-full hover:bg-accent-hover transition-colors shadow-md"
              >
                Let&apos;s Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
