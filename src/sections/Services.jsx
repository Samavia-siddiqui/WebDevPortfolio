import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services.js';

export default function Services({ onSelectService }) {
  const shouldReduceMotion = useReducedMotion();

  const handleRowClick = (service) => {
    if (onSelectService) {
      onSelectService(service.projectType);
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="services"
      aria-label="Services Section"
      className="py-10 md:py-14 bg-light text-dark relative overflow-hidden"
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
            Services
          </span>
        </motion.div>

        {/* Section Heading (Two-line rule) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-8"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-none text-dark">
            <span className="block">WHAT I</span>
            <span className="block text-outline">BUILD.</span>
          </h2>
        </motion.div>

        {/* Full-width Service Rows */}
        <div className="border-t border-light-border divide-y divide-light-border">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service.number}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: isEven ? -40 : 40 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative py-5 md:py-6 px-3 sm:px-4 md:px-6 overflow-hidden transition-colors duration-300"
              >
                {/* Black fill sliding up from bottom on desktop hover */}
                <div
                  className="absolute inset-0 bg-dark pointer-events-none origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
                  aria-hidden="true"
                />

                {/* Row Content */}
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
                  {/* Left: Number & Big Title */}
                  <div className="flex items-start gap-3 md:gap-6 max-w-xl">
                    <span className="text-xs md:text-sm font-black text-accent tracking-widest shrink-0 mt-1">
                      /{service.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-dark group-hover:text-light transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </p>
                      <p className="mt-1 text-[11px] sm:text-xs font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                        <span className="font-bold text-accent">Best for:</span> {service.bestFor}
                      </p>
                    </div>
                  </div>

                  {/* Middle / Right: Tech Chips & CTA Circle Button */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-3 md:gap-6 mt-1 lg:mt-0">
                    {/* Outline Tech Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {service.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border border-zinc-300 text-zinc-700 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors duration-300"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Request Quote Button (Only trigger on explicit button click) */}
                    <button
                      type="button"
                      onClick={() => handleRowClick(service)}
                      className="flex items-center gap-2 shrink-0 py-1 px-2.5 -mr-1 rounded-full text-dark group-hover:text-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`Request a quote for ${service.title}`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                        Request a Quote
                      </span>
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-dark/20 group-hover:border-accent group-hover:bg-accent text-dark group-hover:text-dark flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45 shadow-sm"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
