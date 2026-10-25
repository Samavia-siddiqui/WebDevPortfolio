import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { whyPoints } from '../data/why.js';

export default function WhyMe() {
  const shouldReduceMotion = useReducedMotion();

  const icons = [
    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" key="scope" />,
    <ShieldCheck className="w-5 h-5 text-accent shrink-0" key="preview" />,
    <Zap className="w-5 h-5 text-accent shrink-0" key="stack" />,
  ];

  return (
    <section
      id="why"
      aria-label="Why Choose Samavia Siddiqui"
      className="py-10 md:py-14 bg-light text-dark relative border-t border-light-border overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <span className="text-xs font-black uppercase tracking-widest text-accent">
            Why Me
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-8 max-w-xl"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-none text-dark">
            <span className="block">WHY</span>
            <span className="block text-outline">ME.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
            Hiring a freelance developer shouldn't feel like a gamble. I work with absolute transparency from the first brief to final deployment.
          </p>
        </motion.div>

        {/* Balanced 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Clear Scope */}
          {whyPoints[0] && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-light-surface border border-light-border hover:border-accent/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group h-full"
            >
              <div className="absolute top-2 right-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none select-none">
                <span className="text-5xl font-black text-dark tracking-tighter">/01</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3.5">
                  {icons[0]}
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent">
                    Step 1 Guarantee
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-dark mb-2 leading-snug">
                  {whyPoints[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {whyPoints[0].description}
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-light-border/70 flex items-center justify-between text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                <span>No surprises</span>
                <span className="text-accent font-bold">✓ Written Scope</span>
              </div>
            </motion.div>
          )}

          {/* Card 2: Payment Protection (Featured Dark Card) */}
          {whyPoints[1] && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-dark text-light border border-dark-border hover:border-accent/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-lg relative overflow-hidden group h-full"
            >
              <div className="absolute top-2 right-3 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none select-none">
                <span className="text-5xl font-black text-light tracking-tighter">/02</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3.5">
                  {icons[1]}
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent">
                    Payment Protection
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-light mb-2 leading-snug">
                  {whyPoints[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {whyPoints[1].description}
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-dark-border flex items-center justify-between text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                <span>Staged</span>
                <span className="text-accent font-bold">50% / 50% Handover</span>
              </div>
            </motion.div>
          )}

          {/* Card 3: Modern Fast Stack */}
          {whyPoints[2] && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-light-surface border border-light-border hover:border-accent/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group h-full"
            >
              <div className="absolute top-2 right-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none select-none">
                <span className="text-5xl font-black text-dark tracking-tighter">/03</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3.5">
                  {icons[2]}
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent">
                    Engineering
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-dark mb-2 leading-snug">
                  {whyPoints[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {whyPoints[2].description}
                </p>
              </div>

              {/* Stack Badges in Footer */}
              <div className="mt-5 pt-3.5 border-t border-light-border/70 flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-dark text-light">
                  React 19
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-dark text-light">
                  Vite
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-dark text-light">
                  Tailwind
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-accent/40 text-accent bg-accent/5">
                  Fast FCP
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
