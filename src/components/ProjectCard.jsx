import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECT_TYPE_LABELS } from '../data/projects.js';

// Inline GitHub SVG as specified (no external brand icon library)
function GitHubIcon({ className = 'w-3.5 h-3.5' }) {
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

export default function ProjectCard({
  project,
  onOpenLightbox,
  isReducedMotion = false,
  className = '',
}) {
  const [imgError, setImgError] = useState(false);
  const badgeText = PROJECT_TYPE_LABELS[project.type] || 'Web Project';

  const displayedTech = project.tech ? project.tech.slice(0, 4) : [];
  const remainingTechCount = project.tech ? project.tech.length - displayedTech.length : 0;

  return (
    <motion.div
      whileHover={
        isReducedMotion
          ? {}
          : {
              y: -8,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }
      }
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      className={`w-full rounded-2xl overflow-hidden group bg-[#0A0A0B] border border-zinc-800 hover:border-accent transition-all duration-300 flex flex-col shadow-xl relative select-none ${className}`}
      role="group"
      aria-label={project.name}
    >
      {/* Top Half: Project Image Area (Natural 16:7.5 widescreen ratio for uncropped full screenshots) */}
      <div
        className="relative aspect-[16/7.5] bg-[#0c0c0e] overflow-hidden cursor-pointer shrink-0 flex items-center justify-center border-b border-zinc-800/80"
        onClick={() => onOpenLightbox(project)}
      >
        {!imgError ? (
          <picture className="w-full h-full flex items-center justify-center">
            {project.imageMobile && (
              <source media="(max-width: 639.98px)" srcSet={project.imageMobile} />
            )}
            <img
              src={project.image}
              alt={project.imageAlt || project.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </picture>
        ) : (
          /* Stylized Browser Window Mockup for Missing Images */
          <div className="w-full h-full bg-[#121214] flex flex-col justify-between p-3.5 sm:p-4 border-b border-zinc-800 relative overflow-hidden group-hover:bg-[#18181B] transition-colors">
            {/* Browser top chrome */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800/60 max-w-[130px] truncate">
                {project.id}.app
              </span>
            </div>

            {/* Inner App Preview Content */}
            <div className="my-auto py-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 text-accent font-black text-base flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                {project.name ? project.name.slice(0, 2).toUpperCase() : 'PR'}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-light line-clamp-1">
                {project.name}
              </h4>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5 line-clamp-1">
                {project.tech?.slice(0, 3).join(' • ')}
              </p>
            </div>

            {/* Subtle bottom wireframe bar */}
            <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800/60 text-[9px] text-zinc-500 font-mono uppercase">
              <span>{badgeText}</span>
              <span className="text-accent font-semibold">Live Project</span>
            </div>
          </div>
        )}

        {/* Type Badge on Image Corner */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0A0A0B]/90 text-accent border border-accent/40 shadow-sm">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Bottom Half: Content Panel */}
      <div className="flex-1 p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between bg-[#0A0A0B] overflow-hidden">
        <div>
          {/* Tag row: Lucide Tag icon in orange + badge label */}
          <div className="flex items-center gap-1.5 text-accent text-[10px] font-black uppercase tracking-wider mb-1">
            <Tag className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
            <span className="truncate">{badgeText}</span>
          </div>

          {/* Project Name (bold, white) */}
          <h3 className="text-sm sm:text-base lg:text-lg font-black text-light group-hover:text-accent transition-colors line-clamp-1">
            {project.name}
          </h3>

          {/* One line shows text */}
          <p className="mt-1 text-zinc-400 text-[11px] sm:text-xs leading-snug line-clamp-2">
            {project.shows}
          </p>

          {/* Tech tags as small outline chips */}
          <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-1">
            {displayedTech.map((tech) => (
              <span
                key={tech}
                className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold border border-zinc-800 text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold border border-accent/30 text-accent">
                +{remainingTechCount}
              </span>
            )}
          </div>
        </div>

        {/* Footer Row with Thin Top Border */}
        <div className="pt-2 sm:pt-3 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
          {/* Left: Live and GitHub links */}
          <div className="flex items-center gap-3">
            {/* If live is empty, hide the Live button completely */}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-zinc-400 hover:text-accent transition-colors min-h-[44px] sm:min-h-0 flex items-center"
                aria-label={`Visit live demo for ${project.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            ) : null}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-zinc-400 hover:text-accent transition-colors min-h-[44px] sm:min-h-0 flex items-center"
                aria-label={`View GitHub repository for ${project.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>GitHub</span>
                <GitHubIcon className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Right: Circle arrow button (opens lightbox) */}
          <button
            type="button"
            onClick={() => onOpenLightbox(project)}
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-zinc-800 group-hover:bg-accent text-zinc-300 group-hover:text-accent-ink flex items-center justify-center transition-all duration-300 transform group-hover:-rotate-45 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Open details lightbox for ${project.name}`}
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
