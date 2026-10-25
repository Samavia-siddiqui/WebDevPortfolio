import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowUpRight, HelpCircle, Sparkles } from 'lucide-react';
import { pricingPlans, pricingNotes } from '../data/pricing.js';

export default function Pricing({ onSelectPlan }) {
  const [currency, setCurrency] = useState('pkr'); // 'pkr' | 'usd'
  const shouldReduceMotion = useReducedMotion();

  const handleCtaClick = (plan) => {
    if (onSelectPlan) {
      onSelectPlan(plan.projectType);
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      aria-label="Pricing Packages"
      className="py-10 md:py-14 bg-light text-dark relative border-t border-light-border overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header & Currency Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10">
          <div>
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="text-xs font-black uppercase tracking-widest text-accent">
                Pricing
              </span>
            </motion.div>

            {/* Section Heading (Two-line rule) */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tight leading-none text-dark">
                <span className="block">SIMPLE</span>
                <span className="block text-outline">PRICING.</span>
              </h2>
            </motion.div>
          </div>

          {/* Currency Toggle (PKR / USD) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-light-surface border border-light-border p-1 rounded-full self-start md:self-auto shadow-sm"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 pl-2.5">
              Currency:
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrency('pkr')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  currency === 'pkr'
                    ? 'bg-dark text-light shadow-sm'
                    : 'text-zinc-600 hover:text-dark'
                }`}
                aria-pressed={currency === 'pkr'}
              >
                PKR (Rs)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('usd')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  currency === 'usd'
                    ? 'bg-dark text-light shadow-sm'
                    : 'text-zinc-600 hover:text-dark'
                }`}
                aria-pressed={currency === 'usd'}
              >
                USD ($)
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards Grid (Compact & Sleek) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {pricingPlans.map((plan, idx) => {
            const isStandard = plan.highlighted;
            const priceValue =
              currency === 'pkr'
                ? `Rs ${plan.price.pkr}`
                : `$${plan.price.usd}`;

            return (
              <motion.div
                key={plan.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                  isStandard
                    ? 'bg-dark text-light border-2 border-accent shadow-xl lg:-translate-y-2 z-10'
                    : 'bg-light-surface text-dark border border-light-border hover:border-accent/40 shadow-sm'
                }`}
              >
                {/* Standard Card Dominant Badge */}
                {isStandard && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-light px-3.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                    <Sparkles className="w-2.5 h-2.5 stroke-[2.5]" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className={`text-lg sm:text-xl font-black uppercase tracking-tight ${isStandard ? 'text-light' : 'text-dark'}`}>
                      {plan.name}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-current opacity-70">
                      {plan.subtitle}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="mt-2.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-0.5">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl md:text-3xl font-black tracking-tight">
                        {priceValue}
                      </span>
                    </div>
                  </div>

                  {/* Specs Matrix (Compact) */}
                  <div className={`py-2.5 my-3.5 border-y text-[11px] font-medium space-y-1.5 ${isStandard ? 'border-zinc-800 text-zinc-300' : 'border-light-border text-zinc-600'}`}>
                    <div className="flex justify-between">
                      <span className="opacity-70">Turnaround:</span>
                      <span className="font-bold">{plan.delivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Revisions:</span>
                      <span className="font-bold">{plan.revisions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Pages / Screens:</span>
                      <span className="font-bold">{plan.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Tech Stack:</span>
                      <span className="font-bold text-accent">{plan.tech}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-5">
                    <span className={`text-[10px] font-black uppercase tracking-wider block ${isStandard ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Included Features:
                    </span>
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className={isStandard ? 'text-zinc-200' : 'text-zinc-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 text-xs font-bold text-accent pt-0.5">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>Production Deployment</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA Button */}
                <button
                  type="button"
                  onClick={() => handleCtaClick(plan)}
                  className={`w-full py-3 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 transform active:scale-95 shadow-sm ${
                    isStandard
                      ? 'bg-accent hover:bg-accent-hover text-light'
                      : 'bg-dark hover:bg-zinc-800 text-light'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Scope Highlight Line */}
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base font-bold text-dark">
            &ldquo;{pricingNotes.customScope}&rdquo;
          </p>
        </div>

        {/* Not Included Notes Box (Compact) */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-light-surface border border-light-border max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
              Honest Clarification &bull; What is Not Included
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] text-zinc-600">
            {pricingNotes.notIncluded.map((item) => (
              <div key={item} className="flex items-start gap-1.5">
                <span className="text-zinc-400">&bull;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
