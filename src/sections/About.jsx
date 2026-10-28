import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

export default function About() {
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Samavia Siddiqui"
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
          <span className="text-xs font-black uppercase tracking-widest text-accent-text">
            About
          </span>
        </motion.div>

        {/* Section Heading (Two-line rule) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-8 max-w-2xl"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-none text-dark">
            <span className="block">ABOUT</span>
            <span className="block text-outline">ME.</span>
          </h2>
        </motion.div>

        {/* About Grid: Circular Avatar with Rotating Orange Ring + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Avatar Column (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72">
              {/* Slowly Rotating Thin Orange Ring */}
              <motion.div
                className="absolute -inset-3 rounded-full border border-dashed border-accent/70 pointer-events-none"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: 24,
                  ease: 'linear',
                }}
                aria-hidden="true"
              />

              {/* Secondary static thin accent border */}
              <div
                className="absolute -inset-1 rounded-full border border-accent pointer-events-none shadow-[0_0_15px_rgba(255,186,100,0.3)]"
                aria-hidden="true"
              />

              {/* Circular Avatar Image */}
              <div className="w-full h-full rounded-full overflow-hidden bg-dark shadow-xl relative">
                {!imgError ? (
                  <img
                    src={avatarImg}
                    alt="Samavia Siddiqui - Full Stack Developer"
                    loading="lazy"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-dark flex flex-col items-center justify-center p-4 text-center text-light">
                    <span className="text-4xl font-black text-accent mb-1">SS</span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Samavia Siddiqui
                    </span>
                  </div>
                )}
              </div>

              {/* Verified Badge Pill */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-dark text-light border border-accent px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Full Stack Developer</span>
              </div>
            </div>
          </motion.div>

          {/* Bio Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Bio Paragraphs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-dark mb-3">
                Engineering high-performance web products that elevate business credibility.
              </h3>

              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mb-2.5">
                Full Stack Developer and Front-end AI Engineering intern based in Karachi, specializing in the MERN stack. I turn business ideas into fast, polished web experiences.
              </p>

              <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mb-4">
                Whether you need a high-converting landing page to launch a new product or a full-scale web application with custom REST APIs and MongoDB database architecture, I write clean, maintainable code with zero bloat and fluid micro-interactions.
              </p>
            </motion.div>

            {/* Credential Pills Grid */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-light-border"
            >
              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-light-surface border border-light-border">
                <MapPin className="w-4 h-4 text-accent-text shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-dark">
                    Karachi, Pakistan (PKT)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-light-surface border border-light-border">
                <Code2 className="w-4 h-4 text-accent-text shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                    Core Specialization
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-dark">
                    React &bull; Node.js &bull; MongoDB
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-light-surface border border-light-border">
                <Sparkles className="w-4 h-4 text-accent-text shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                    Frontend Focus
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-dark">
                    Fast Vite &bull; Tailwind &bull; Motion
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-light-surface border border-light-border">
                <CheckCircle2 className="w-4 h-4 text-accent-text shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                    Client Commitment
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-dark">
                    100% On-Time Delivery
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
