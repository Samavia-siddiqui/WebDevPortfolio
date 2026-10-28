import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { PROJECT_TYPE_LABELS } from '../data/projects.js';

function GitHubIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectLightbox({
  isOpen,
  project,
  projects,
  onClose,
  onNavigate,
}) {
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !project) return null;

  const badgeText = PROJECT_TYPE_LABELS[project.type] || 'Web Project';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-project-title"
      >
        {/* Backdrop (no backdrop-blur as specified) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window: fullscreen on mobile, rounded on tablet/desktop */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] bg-[#0A0A0B] border-0 sm:border sm:border-zinc-800 rounded-none sm:rounded-3xl overflow-y-auto shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-[#0A0A0B] border-b border-zinc-800">
            <span className="text-xs font-black uppercase tracking-widest text-accent">
              Project Details
            </span>

            <div className="flex items-center gap-2">
              {/* Desktop Prev / Next controls */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate(-1)}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button (min 44x44px tap target on mobile) */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-accent hover:border-accent flex items-center justify-center transition-colors ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-8 flex flex-col gap-6">
            {/* Image Preview (Full uncropped screenshot) */}
            <div className="w-full h-52 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c0c0e] border border-zinc-800 relative shrink-0 flex items-center justify-center p-1">
              <img
                src={project.image}
                alt={project.imageAlt || project.name}
                className="w-full h-full object-contain object-center"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div
                style={{ display: 'none' }}
                className="w-full h-full bg-[#121214] flex-col justify-between p-6 text-center border border-zinc-800"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    {project.id}.app
                  </span>
                </div>
                <div className="my-auto py-6">
                  <span className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 text-accent text-3xl font-black flex items-center justify-center mx-auto mb-3 shadow-md">
                    {project.name ? project.name.slice(0, 2).toUpperCase() : 'PR'}
                  </span>
                  <span className="text-light text-xl font-bold block mb-1">
                    {project.name}
                  </span>
                  <span className="text-zinc-400 text-xs font-mono">
                    {project.shows}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs text-zinc-500 font-mono">
                  <span>{badgeText}</span>
                  <span className="text-accent font-semibold">Web Application</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-accent/15 text-accent border border-accent/40">
                  {badgeText}
                </span>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  {project.tech ? project.tech.join(' • ') : ''}
                </span>
              </div>

              <h2
                id="lightbox-project-title"
                className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-light"
              >
                {project.name}
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.description}
              </p>

              {/* What It Shows */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="block text-xs font-black uppercase tracking-wider text-accent mb-1">
                  What It Demonstrates
                </span>
                <p className="text-sm text-zinc-300 leading-normal">
                  {project.shows}
                </p>
              </div>

              {/* Tech Stack Chips */}
              {project.tech && project.tech.length > 0 && (
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-zinc-700 bg-zinc-900 text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-accent-ink font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors shadow-lg"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  </a>
                ) : null}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-accent text-light hover:text-accent font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors"
                  >
                    <span>View GitHub Code</span>
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Mobile Bottom Navigation (Previous / Next Buttons) */}
            <div className="sm:hidden flex items-center justify-between pt-4 border-t border-zinc-800 mt-2">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                className="min-h-[44px] px-5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                className="min-h-[44px] px-5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                aria-label="Next project"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
