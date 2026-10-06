import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';

interface HeroProps {
  event?: string | null;
  inviteeName?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  return touch;
}

export const Hero: React.FC<HeroProps> = ({ event = 'both', inviteeName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const useParallax = !reducedMotion && !isTouch;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-blush/30">
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={useParallax ? { y: y1, scale } : undefined}
      >
        <img
          src="/heroback.jpg"
          alt="Wedding Background"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
      </motion.div>



      <div className="absolute inset-5 sm:inset-8 border border-brand-plum/30 rounded-3xl pointer-events-none z-20 hidden sm:block shadow-[inset_0_0_30px_rgba(201,169,110,0.1)]" />
      <div className="absolute inset-6 sm:inset-9 border border-brand-plum/15 rounded-[1.3rem] pointer-events-none z-20 hidden sm:block" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-6xl mt-8 sm:mt-16"
        style={useParallax ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-brand-plum to-transparent" />
            <Heart className="w-5 h-5 text-brand-plum fill-brand-plum/30 animate-pulse" />
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-brand-plum to-transparent" />
          </div>

          <div className="mb-6 sm:mb-10 inline-block">
            <span className="text-stone-900 uppercase tracking-[0.6em] sm:tracking-[0.8em] text-[10px] sm:text-xs font-black block drop-shadow-sm font-sans">
              The Celebration of Love
            </span>
          </div>

          <div className="relative mb-6 sm:mb-12 w-full flex justify-center py-4 sm:py-10 px-2 overflow-visible">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] sm:w-[125%] h-[150%] sm:h-[160%] bg-gradient-radial from-white/95 via-white/85 to-transparent blur-[40px] sm:blur-[70px] rounded-full pointer-events-none" />

            <h1 className="relative text-4xl sm:text-[5.5rem] lg:text-[7.5rem] font-names text-[#C9A96E] font-normal leading-normal sm:leading-[0.85] drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)] tracking-normal sm:tracking-tight overflow-visible py-2">
              MIHINGI <br className="sm:hidden" />
              <span className="text-[#C9A96E] font-normal mx-2 sm:mx-6 text-3xl sm:text-[4.5rem] lg:text-[6rem] inline-block -translate-y-1 sm:-translate-y-6 drop-shadow-[0_4px_12px_rgba(201,169,110,0.3)]">&</span>
              <br className="sm:hidden" />
              GAYAN
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 sm:mb-16 relative z-10">
            <div className="hidden sm:block h-[1px] w-16 bg-gradient-to-r from-transparent via-brand-plum to-transparent" />
            <p className="text-[1.15rem] sm:text-2xl font-serif italic text-stone-900 font-bold tracking-wide px-2 text-center max-w-xl leading-relaxed drop-shadow-sm">
              Together with our families, we joyfully invite you to join us
            </p>
            <div className="hidden sm:block h-[1px] w-16 bg-gradient-to-r from-transparent via-brand-plum to-transparent" />
          </div>


        </motion.div>
      </motion.div>

      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-30">
        <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-brand-plum to-transparent" />
        <div className="bg-stone-900/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-brand-plum/40 shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-brand-rose font-bold font-sans">
            The Blue Water • Wadduwa
          </p>
        </div>
        <div className="w-[1px] h-28 bg-gradient-to-t from-transparent via-brand-plum to-transparent" />
      </div>

      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-30">
        <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-brand-plum to-transparent" />
        <div className="bg-stone-900/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-brand-plum/40 shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-brand-rose font-bold font-sans rotate-180">
            Save the Date • November 2026
          </p>
        </div>
        <div className="w-[1px] h-28 bg-gradient-to-t from-transparent via-brand-plum to-transparent" />
      </div>

      <motion.div
        className="absolute bottom-0 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.5em] text-stone-900 font-extrabold bg-gradient-to-r from-brand-rose via-white to-brand-rose px-5 py-2 rounded-full border border-brand-plum/40 backdrop-blur-md shadow-lg">
          Discover
        </span>
        <div className="w-[1px] h-6 sm:h-16 bg-gradient-to-b from-brand-plum to-transparent animate-bounce" />
      </motion.div>
    </div>
  );
};
