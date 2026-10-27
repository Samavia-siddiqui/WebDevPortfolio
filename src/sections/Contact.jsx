import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

// Brand SVGs as specified (no external icon dependencies)
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15s-.777.978-.953 1.179c-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.233-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.908 1.229 3.109.15.2 2.122 3.24 5.14 4.543.718.31 1.279.495 1.716.634.721.229 1.377.197 1.896.119.579-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.544 2 2.08 6.464 2.08 11.96c0 1.86.513 3.597 1.405 5.087L2 22l5.105-1.455c1.435.845 3.107 1.375 4.935 1.375 5.496 0 9.96-4.464 9.96-9.96S17.536 2 12.04 2zm0 18.258c-1.63 0-3.14-.492-4.407-1.336l-.316-.21-3.03.864.847-2.956-.226-.328a8.21 8.21 0 01-1.282-4.332c0-4.57 3.718-8.288 8.288-8.288 4.57 0 8.288 3.718 8.288 8.288 0 4.57-3.718 8.288-8.288 8.288z" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-5 h-5' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-5 h-5' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const PROJECT_TYPES = [
  'Landing Page',
  'Business Website',
  'Web App',
  'Redesign',
  'Other',
];

export default function Contact({ preselectedType }) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'whatsapp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Landing Page',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();

  // Sync preselected project type when user clicked from Services or Pricing
  useEffect(() => {
    if (preselectedType && PROJECT_TYPES.includes(preselectedType)) {
      setFormData((prev) => ({ ...prev, projectType: preselectedType }));
    }
  }, [preselectedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/xrpppbnq';

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: 'Landing Page',
          message: '',
        });
      } else {
        const data = await response.json();
        setErrorMessage(data?.error || 'Unable to send message. Please try WhatsApp directly.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try sending via WhatsApp.');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Samavia Siddiqui"
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
            Contact
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
            <span className="block">LET&apos;S START</span>
            <span className="block text-outline">A PROJECT.</span>
          </h2>
        </motion.div>

        {/* Grid: Left Column Tabs (Form / WhatsApp) + Right Column Direct Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (7 cols): Interactive Tabs Container */}
          <div className="lg:col-span-7 bg-light-surface border border-light-border rounded-2xl p-5 sm:p-7 shadow-sm">
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 border-b border-light-border pb-4 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'form'
                    ? 'bg-dark text-light shadow-md'
                    : 'text-zinc-600 hover:text-dark'
                }`}
                aria-selected={activeTab === 'form'}
              >
                Send a Message
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'whatsapp'
                    ? 'bg-accent text-dark shadow-md'
                    : 'text-zinc-600 hover:text-dark'
                }`}
                aria-selected={activeTab === 'whatsapp'}
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Tab 1: Formspree Message Form */}
            {activeTab === 'form' && (
              <motion.div
                key="form-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 text-center bg-dark text-light rounded-2xl border border-accent/40"
                  >
                    <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-3 stroke-[2]" />
                    <h3 className="text-xl font-black uppercase tracking-tight text-light mb-1.5">
                      Message Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto mb-4">
                      Thank you for reaching out. I reply to every client inquiry within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-accent text-dark hover:bg-accent-hover transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-black uppercase tracking-wider text-zinc-600 mb-1.5"
                      >
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-light text-dark border border-zinc-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-black uppercase tracking-wider text-zinc-600 mb-1.5"
                      >
                        Your Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@business.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-light text-dark border border-zinc-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm transition-colors"
                      />
                    </div>

                    {/* Project Type Dropdown */}
                    <div>
                      <label
                        htmlFor="contact-type"
                        className="block text-[11px] font-black uppercase tracking-wider text-zinc-600 mb-1.5"
                      >
                        Project Scope / Type
                      </label>
                      <select
                        id="contact-type"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-light text-dark border border-zinc-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[11px] font-black uppercase tracking-wider text-zinc-600 mb-1.5"
                      >
                        Project Brief / Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your goals, features, and desired timeline..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-light text-dark border border-zinc-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-xs sm:text-sm transition-colors resize-none"
                      />
                    </div>

                    {/* Error Banner */}
                    {status === 'error' && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3 rounded-full bg-accent hover:bg-accent-hover text-dark font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md transform active:scale-98 disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* Tab 2: Direct WhatsApp Action */}
            {activeTab === 'whatsapp' && (
              <motion.div
                key="whatsapp-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="py-5 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mb-3">
                  <WhatsAppIcon className="w-7 h-7" />
                </div>

                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-dark mb-1.5">
                  Prefer Instant Chat?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mb-5 leading-relaxed">
                  I am available directly on WhatsApp for initial discovery questions, quick project quotes, and voice notes.
                </p>

                <a
                  href="https://wa.me/923130080742"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-dark font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Open WhatsApp (+92 313 0080742)</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </motion.div>
            )}
          </div>

          {/* Right Column (5 cols): Always Visible Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-dark text-light border border-zinc-800 shadow-lg">
              <span className="text-[10px] font-black uppercase tracking-widest text-accent block mb-1.5">
                Direct Channels
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-light mb-4">
                Always Reachable
              </h3>

              <div className="space-y-3.5">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923130080742"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-zinc-300 hover:text-light transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-accent group-hover:text-accent flex items-center justify-center shrink-0 transition-colors">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                      WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-bold group-hover:text-accent transition-colors">
                      +92 313 0080742
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:samaviasiddiqui3@gmail.com"
                  className="flex items-center gap-3 group text-zinc-300 hover:text-light transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-accent group-hover:text-accent flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                      Email
                    </span>
                    <span className="text-xs sm:text-sm font-bold group-hover:text-accent transition-colors">
                      samaviasiddiqui3@gmail.com
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/samavia-siddiqui-398322381"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-zinc-300 hover:text-light transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-accent group-hover:text-accent flex items-center justify-center shrink-0 transition-colors">
                    <LinkedInIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                      LinkedIn
                    </span>
                    <span className="text-xs sm:text-sm font-bold group-hover:text-accent transition-colors">
                      samavia-siddiqui
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Samavia-siddiqui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-zinc-300 hover:text-light transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-accent group-hover:text-accent flex items-center justify-center shrink-0 transition-colors">
                    <GitHubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                      GitHub
                    </span>
                    <span className="text-xs sm:text-sm font-bold group-hover:text-accent transition-colors">
                      Samavia-siddiqui
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Reassurance Box */}
            <div className="p-4 rounded-2xl bg-light-surface border border-light-border text-xs text-zinc-600 leading-relaxed">
              <span className="font-bold text-dark block mb-0.5">
                Fast Response Guarantee:
              </span>
              I respect your project timeline. All inquiries receive a written reply or preliminary scoping assessment within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
