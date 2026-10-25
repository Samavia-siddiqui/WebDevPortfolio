import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import InteractiveCharacter from '../components/InteractiveCharacter.jsx';
import { projects } from '../data/projects.js';

export default function Hero() {
  const [isWaving, setIsWaving] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const liveCount = projects ? projects.length : 5;

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[calc(100vh-80px)] bg-white text-dark flex items-center justify-center pt-4 pb-8 md:pt-6 md:pb-10 overflow-hidden"
    >
      {/* Subtle Architectural Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: INTRO & CTAS (7 cols) ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left z-20">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 self-start bg-white border border-accent/30 px-3.5 py-1.5 rounded-full mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600">
                CREATOR &times; ENGINEER
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark tracking-tight leading-[1.12]">
                I build fast, animated web apps, and help you scale.
              </h1>
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
            >
              Full Stack Developer (React, Node.js, Express, MongoDB) based in Karachi. I turn business ideas into fast, polished web experiences.
            </motion.p>

            {/* Primary Action Buttons + Say Hi Trigger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="inline-flex items-center gap-2.5 bg-dark hover:bg-zinc-800 text-light font-black text-xs uppercase tracking-wider px-6 sm:px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Work With Me</span>
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </a>

              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, '#work')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-full border border-zinc-300 text-zinc-700 bg-transparent hover:bg-dark hover:text-light hover:border-dark transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2]" />
              </a>

              {/* Interactive "HI" pill */}
              <button
                type="button"
                onMouseEnter={() => setIsWaving(true)}
                onMouseLeave={() => setIsWaving(false)}
                onClick={() => {
                  setIsWaving(true);
                  setTimeout(() => setIsWaving(false), 2200);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-black text-accent uppercase tracking-wider bg-accent/10 hover:bg-accent/20 border border-accent/30 px-5 py-3.5 rounded-full transition-all duration-200 transform hover:scale-105 shadow-sm active:scale-95"
                aria-label="Make Samavia wave"
              >
                <span className="animate-bounce inline-block text-accent">↗</span>
                <span>HI 👋</span>
              </button>
            </motion.div>

            {/* Live Stats Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-zinc-200/80 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <strong className="text-dark">{liveCount}</strong> Projects Live
              </span>
              <span>&bull;</span>
              <span>MERN Stack</span>
              <span>&bull;</span>
              <span>Karachi, PKT</span>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: PROMINENT CHARACTER WITH HEADING ON TOP (5 cols) ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center py-4 lg:py-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2 text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-dark">
                Hi, I&apos;m{' '}
                <span className="font-extrabold italic text-accent">
                  Samavia<span className="text-accent">.</span>
                </span>
              </h2>
            </motion.div>
            <InteractiveCharacter isWaving={isWaving} />
          </div>

        </div>
      </div>
    </section>
  );
}
