import React, { useState, useEffect, useRef } from 'react';

// Active transparent PNG frames in /public/hero (blink removed)
const FRAME_KEYS = ['center', 'left', 'right', 'down', 'wave'];

const getFrameSrc = (key) => `/hero/frame_${key}.png`;
const getFallbackSrc = (key) => `/hero/frame_${key}.webp`;

// Idle Attention Loop sequence without deleted blink frame:
const ATTENTION_LOOP = [
  { frame: 'center', duration: 1800 },
  { frame: 'left', duration: 1400 },
  { frame: 'center', duration: 1200 },
  { frame: 'right', duration: 1400 },
  { frame: 'down', duration: 2200 },
];

export default function InteractiveCharacter({ isWaving = false, className = '' }) {
  const [activeFrame, setActiveFrame] = useState('center');
  const characterBoxRef = useRef(null);
  const idleResumeTimerRef = useRef(null);
  const loopTimerRef = useRef(null);
  const stepIndexRef = useRef(0);

  // Preload existing frames
  useEffect(() => {
    FRAME_KEYS.forEach((key) => {
      const img = new Image();
      img.src = getFrameSrc(key);
    });
  }, []);

  // Handle external waving trigger
  useEffect(() => {
    if (isWaving) {
      setActiveFrame('wave');
      stopAttentionLoop();
      if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    } else {
      idleResumeTimerRef.current = setTimeout(() => {
        startAttentionLoop();
      }, 800);
    }
  }, [isWaving]);

  // Attention loop runner
  const runNextStep = () => {
    if (isWaving) return;
    const step = ATTENTION_LOOP[stepIndexRef.current];
    setActiveFrame(step.frame);

    loopTimerRef.current = setTimeout(() => {
      stepIndexRef.current = (stepIndexRef.current + 1) % ATTENTION_LOOP.length;
      runNextStep();
    }, step.duration);
  };

  const startAttentionLoop = () => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    if (isWaving) return;
    stepIndexRef.current = 0;
    runNextStep();
  };

  const stopAttentionLoop = () => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
  };

  useEffect(() => {
    startAttentionLoop();
    return () => {
      stopAttentionLoop();
      if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    };
  }, []);

  // Mouse & Touch tracking logic (Relative to Character center)
  useEffect(() => {
    const trackPoint = (clientX, clientY) => {
      if (isWaving) return;

      stopAttentionLoop();
      if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);

      if (characterBoxRef.current) {
        const rect = characterBoxRef.current.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height * 0.42;

        const dx = clientX - charCenterX;
        const dy = clientY - charCenterY;

        // If mouse is below character's chest / laptop area -> LOOK DOWN
        if (dy > 40 && Math.abs(dx) < rect.width * 1.1) {
          setActiveFrame('down');
        } else if (dx < -50) {
          // Pointer is to the left of character
          setActiveFrame('left');
        } else if (dx > 50) {
          // Pointer is to the right of character
          setActiveFrame('right');
        } else {
          // Pointer is in front of character
          setActiveFrame('center');
        }
      } else {
        // Fallback to screen ratio if ref not measured
        const ratio = clientX / window.innerWidth;
        if (ratio < 0.35) {
          setActiveFrame('left');
        } else if (ratio > 0.65) {
          setActiveFrame('right');
        } else {
          setActiveFrame('center');
        }
      }

      // Resume idle loop after 2.5s of inactivity
      if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
      idleResumeTimerRef.current = setTimeout(() => {
        startAttentionLoop();
      }, 2500);
    };

    const handleMouseMove = (e) => {
      trackPoint(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        trackPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    };
  }, [isWaving]);

  return (
    <div
      ref={characterBoxRef}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Stationary Locked Character Container (Scaled to prevent pixelation) */}
      <div className="relative w-[230px] h-[305px] sm:w-[270px] sm:h-[358px] md:w-[310px] md:h-[410px] flex items-center justify-center">
        {FRAME_KEYS.map((key) => {
          const isCurrent = activeFrame === key;

          return (
            <img
              key={key}
              src={getFrameSrc(key)}
              onError={(e) => {
                if (!e.target.dataset.triedFallback) {
                  e.target.dataset.triedFallback = 'true';
                  e.target.src = getFallbackSrc(key);
                } else {
                  // If neither exists, hide completely to prevent alt text flash
                  e.target.style.display = 'none';
                }
              }}
              alt=""
              aria-hidden="true"
              draggable="false"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-in-out"
              style={{
                opacity: isCurrent ? 1 : 0,
                zIndex: isCurrent ? 10 : 1,
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          );
        })}
      </div>

      {/* Static Ground Shadow */}
      <div
        className="w-36 sm:w-44 md:w-52 h-3.5 sm:h-4 bg-black/10 rounded-full blur-md -mt-2.5 sm:-mt-3 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
