import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15s-.777.978-.953 1.179c-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.233-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.908 1.229 3.109.15.2 2.122 3.24 5.14 4.543.718.31 1.279.495 1.716.634.721.229 1.377.197 1.896.119.579-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.544 2 2.08 6.464 2.08 11.96c0 1.86.513 3.597 1.405 5.087L2 22l5.105-1.455c1.435.845 3.107 1.375 4.935 1.375 5.496 0 9.96-4.464 9.96-9.96S17.536 2 12.04 2zm0 18.258c-1.63 0-3.14-.492-4.407-1.336l-.316-.21-3.03.864.847-2.956-.226-.328a8.21 8.21 0 01-1.282-4.332c0-4.57 3.718-8.288 8.288-8.288 4.57 0 8.288 3.718 8.288 8.288 0 4.57-3.718 8.288-8.288 8.288z" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer
      id="footer"
      aria-label="Site Footer"
      className="py-8 md:py-10 bg-dark text-light border-t border-zinc-800/80 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Big Name Text Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pb-6 border-b border-zinc-800"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-accent">
              Full Stack Web Developer &bull; Karachi, PK
            </span>

            {/* Back to top button with subtle bounce */}
            <motion.button
              type="button"
              onClick={handleBackToTop}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -3, 0],
                    }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-zinc-400 hover:text-accent transition-colors self-start sm:self-auto py-1.5 px-3 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
          </div>

          <h2 className="text-[clamp(2.2rem,7vw,4.5rem)] font-black uppercase tracking-tight leading-none text-light select-none">
            SAMAVIA <span className="text-outline">SIDDIQUI.</span>
          </h2>
        </motion.div>

        {/* Footer Bottom Bar: Copyright & Social Links */}
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-center md:text-left">
            &copy; {new Date().getFullYear()} Samavia Siddiqui. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/Samavia-siddiqui"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-accent hover:text-accent text-zinc-400 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
              aria-label="GitHub Profile"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/samavia-siddiqui-398322381"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-accent hover:text-accent text-zinc-400 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/923130080742"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-accent hover:text-accent text-zinc-400 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
              aria-label="WhatsApp Contact"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="mailto:samaviasiddiqui3@gmail.com"
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-accent hover:text-accent text-zinc-400 flex items-center justify-center transition-all duration-200 transform hover:scale-105"
              aria-label="Email Inquiries"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
