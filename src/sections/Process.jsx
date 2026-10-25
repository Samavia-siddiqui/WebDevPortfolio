import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We talk goals, audience and scope.',
    detail: 'We align on business objectives, target users, technical requirements, and milestone deadlines before committing a single line of code.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'You see the look and layout before any code.',
    detail: 'High-fidelity wireframes and interactive component layouts ensure we agree on typography, color hierarchy, and mobile ergonomics.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'I develop it in React with clean, fast code.',
    detail: 'Modular ES6 React, responsive Tailwind styling, fluid Framer Motion animations, and clean REST APIs or database schemas.',
  },
  {
    number: '04',
    title: 'Review',
    description: 'You test on a private preview link and request changes.',
    detail: 'You receive a private staging URL to test across real devices, consolidate feedback rounds, and inspect performance firsthand.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'I deploy, connect your domain and hand it over.',
    detail: 'Production deployment, DNS/domain mapping, performance audits, and a full code/asset handover walkthrough.',
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="process"
      aria-label="Process and Methodology"
      className="py-10 md:py-14 bg-dark text-light relative border-t border-zinc-800/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Sticky Title on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="text-xs font-black uppercase tracking-widest text-accent">
                How I Work
              </span>
            </motion.div>

            {/* Section Heading (Two-line rule) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3"
            >
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-none text-light">
                <span className="block">HOW I</span>
                <span className="block text-outline">WORK.</span>
              </h2>
            </motion.div>

            <p className="text-sm md:text-base text-zinc-400 font-normal leading-relaxed max-w-sm">
              A predictable 5-step engineering roadmap designed to keep your project on schedule, on budget, and free of surprises.
            </p>

            <div className="mt-4 pt-3.5 border-t border-zinc-800 hidden lg:block">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                Typical Turnaround
              </span>
              <span className="text-sm font-bold text-light">
                3–10 Days (Websites) &bull; 3–6 Weeks (Apps)
              </span>
            </div>
          </div>

          {/* Right Column: 5 Process Steps with Vertical Animated Line */}
          <div className="lg:col-span-7 relative pl-8 md:pl-12">
            {/* Background Track Line */}
            <div
              className="absolute left-[11px] md:left-[15px] top-4 bottom-8 w-[2px] bg-zinc-800"
              aria-hidden="true"
            />

            {/* Vertical Animated Drawing Line */}
            <motion.div
              className="absolute left-[11px] md:left-[15px] top-4 bottom-8 w-[2px] bg-accent origin-top"
              style={{
                scaleY: shouldReduceMotion ? 1 : smoothProgress,
              }}
              aria-hidden="true"
            />

            {/* Steps List (Compact gaps) */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 25 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: shouldReduceMotion ? 0 : 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <div
                    className="absolute -left-[30px] md:-left-[43px] top-2 w-[18px] h-[18px] rounded-full bg-dark border-2 border-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>

                  {/* Step Card Content (Refined padding) */}
                  <div className="bg-dark-surface/90 border border-zinc-800 hover:border-accent/40 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 shadow-md">
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <span className="text-xs font-black uppercase tracking-widest text-accent">
                        Phase {step.number}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        0{idx + 1} / 05
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-light">
                      {step.title}: <span className="font-normal text-zinc-300">{step.description}</span>
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
