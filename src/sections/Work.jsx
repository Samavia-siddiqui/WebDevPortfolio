import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectLightbox from '../components/ProjectLightbox.jsx';

// Inline GitHub SVG as specified
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

export default function Work() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Category filter tabs
  const categories = [
    { id: 'all', label: `All (${projects.length})` },
    { id: 'mern', label: `Full Stack (${projects.filter((p) => p.type === 'mern').length})` },
    { id: 'frontend', label: `Front-end (${projects.filter((p) => p.type === 'frontend').length})` },
    { id: 'landing', label: `Landing (${projects.filter((p) => p.type === 'landing').length})` },
  ];

  // Filtered projects
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.type === selectedCategory);

  // Lightbox navigation handlers
  const handleOpenLightbox = (project) => {
    const idx = projects.findIndex((p) => p.id === project.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setActiveProject(project);
    setIsLightboxOpen(true);
  };

  const handleNavigateLightbox = (step) => {
    const nextIdx = (lightboxIndex + step + projects.length) % projects.length;
    setLightboxIndex(nextIdx);
    setActiveProject(projects[nextIdx]);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="py-10 md:py-14 bg-light text-dark relative border-t border-light-border overflow-hidden"
    >
      {/* Lightbox Modal */}
      <ProjectLightbox
        isOpen={isLightboxOpen}
        project={activeProject}
        projects={projects}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
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
                Selected Work
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
                <span className="block">SELECTED</span>
                <span className="block text-outline">WORK.</span>
              </h2>
            </motion.div>
          </div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-1.5"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? 'bg-dark text-light border-dark shadow-md'
                      : 'bg-white text-zinc-600 hover:text-dark hover:border-zinc-400 border-light-border'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ================= CLEAN RESPONSIVE GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex"
            >
              <ProjectCard
                project={proj}
                onOpenLightbox={handleOpenLightbox}
                isReducedMotion={shouldReduceMotion}
              />
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM CTA: MORE PROJECTS ON GITHUB ================= */}
        <div className="mt-8 md:mt-10 flex justify-center">
          <a
            href="https://github.com/Samavia-siddiqui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-dark hover:bg-zinc-900 text-light border border-zinc-700 hover:border-accent font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>More Projects on GitHub</span>
            <GitHubIcon className="w-3.5 h-3.5 text-accent" />
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
