import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/faq.js';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const shouldReduceMotion = useReducedMotion();

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-10 md:py-14 bg-light text-dark relative border-t border-light-border overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading and Context Statement */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="text-xs font-black uppercase tracking-widest text-accent-text">
                FAQ
              </span>
            </motion.div>

            {/* Section Heading (Two-line rule) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 md:mb-6"
            >
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-none text-dark">
                <span className="block">THE</span>
                <span className="block text-outline">DETAILS.</span>
              </h2>
            </motion.div>

            {/* Short line with thin orange left border */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pl-3.5 border-l-2 border-accent"
            >
              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                Everything you need to know about how we work together.
              </p>
            </motion.div>

            <div className="mt-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider hidden lg:block">
              Still have a question?{' '}
              <a
                href="#contact"
                className="text-dark font-black hover:text-accent-text underline underline-offset-4 transition-colors"
              >
                Send a quick direct message &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Rows */}
          <div className="lg:col-span-7 divide-y divide-dark/15 border-y border-dark/15">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const questionId = `faq-question-${faq.number}`;
              const answerId = `faq-answer-${faq.number}`;

              return (
                <div key={faq.number} className="group py-3.5 md:py-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    id={questionId}
                    className="w-full text-left flex items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <span className="text-xs font-black text-accent-text tracking-widest shrink-0 mt-0.5">
                        /{faq.number}
                      </span>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-dark group-hover:text-accent-text transition-colors duration-200 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Plus Icon rotating into an X */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-dark/20 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-dark text-accent border-dark rotate-45'
                          : 'group-hover:border-accent text-dark'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Smooth height animation accordion panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2.5 pl-6 md:pl-8 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
