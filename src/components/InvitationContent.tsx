import { motion } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Hero } from './Hero';
import { FloatingPetals } from './FloatingPetals';

import { CeremonyDetails } from './CeremonyDetails';
import { Location } from './Location';
import { Timeline } from './Timeline';
import { Countdown } from './Countdown';
import { RSVPForm } from './RSVPForm';
import { WishesSection } from './WishesSection';
import { InviteeBanner } from './InviteeBanner';
import { DeferredMount } from './DeferredMount';

interface InvitationContentProps {
  active: boolean;
  eventParam: string;
  fullInviteeName: string;
  eventLabel: string;
  weddingDate: Date;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export function InvitationContent({
  active,
  eventParam,
  fullInviteeName,
  eventLabel,
  weddingDate,
  isMusicPlaying,
  onToggleMusic,
}: InvitationContentProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="font-sans text-stone-800 bg-brand-blush selection:bg-brand-plum/20"
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={onToggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] flex items-center justify-center border border-brand-lavender/50 text-brand-plum hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? (
          <Music className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </motion.button>

      <FloatingPetals />
      <Hero event={eventParam} inviteeName={fullInviteeName} />

      {fullInviteeName && (
        <DeferredMount active={active} delay={80}>
          <InviteeBanner inviteeName={fullInviteeName} eventLabel={eventLabel} />
        </DeferredMount>
      )}



      <DeferredMount active={active} delay={180} minHeight="40vh">
        <div className="py-24 sm:py-32 bg-white relative overflow-hidden">
          <CeremonyDetails event={eventParam} />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={240} minHeight="40vh">
        <div className="pt-24 pb-12 sm:py-32 bg-gradient-to-b from-white via-brand-rose/30 to-brand-blush relative overflow-hidden">
          <Location event={eventParam} />
        </div>
      </DeferredMount>



      <DeferredMount active={active} delay={360} minHeight="20vh">
        <div className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/ChatGPT Image Jul 5, 2026, 02_20_06 AM.png"
              alt="Countdown Background"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16 text-center">
            <span className="text-stone-900 uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
              The Wait Is Almost Over
            </span>
          </div>
          <div className="relative z-10">
            <Countdown targetDate={weddingDate} />
          </div>
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={420} minHeight="30vh">
        <div className="py-24 sm:py-32 bg-brand-blush relative overflow-hidden">
          <RSVPForm inviteeName={fullInviteeName} eventName={eventLabel} eventParam={eventParam} />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={480} minHeight="30vh">
        <div className="py-24 sm:py-32 bg-gradient-to-b from-brand-blush to-white relative mt-10 overflow-hidden">
          <WishesSection eventParam={eventParam} inviteeName={fullInviteeName} />
        </div>
      </DeferredMount>

      <DeferredMount active={active} delay={520}>
        <footer className="py-12 bg-white border-t border-brand-lavender/20 text-center relative overflow-hidden mt-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-lavender/10 blur-[80px] rounded-full pointer-events-none" />
          <Heart className="w-6 h-6 mx-auto mb-6 text-brand-plum fill-brand-lavender/20" />
          <p className="font-names text-4xl sm:text-5xl text-stone-800 mb-2">Mihingi & Gayan</p>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-stone-400 font-semibold block mb-8">
            November 16, 2026
          </span>
        </footer>
      </DeferredMount>
    </motion.div>
  );
}
