import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface InviteeBannerProps {
  inviteeName: string;
  eventLabel: string;
}

export const InviteeBanner: React.FC<InviteeBannerProps> = ({ inviteeName, eventLabel }) => {
  return (
    <div className="w-full bg-gradient-to-r from-brand-rose/40 via-brand-rose/80 to-brand-rose/40 border-y border-brand-lavender/30 py-12 px-6 relative overflow-hidden shadow-sm">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-4 h-4 text-brand-plum animate-pulse" />
            <span className="text-brand-plum uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-xs font-bold drop-shadow-sm">
              Specially Invited Guest
            </span>
            <Sparkles className="w-4 h-4 text-brand-plum animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-stone-800 tracking-tight mb-4 drop-shadow-sm">
            {inviteeName}
          </h2>

          <div className="flex items-center gap-4 justify-center max-w-xl mx-auto">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-plum/40" />
            <p className="text-stone-600 font-serif italic text-lg sm:text-xl">
              We joyfully invite you to celebrate <span className="text-brand-plum font-semibold">{eventLabel}</span> with us.
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-plum/40" />
          </div>

          <Heart className="w-5 h-5 text-brand-plum mt-6 fill-brand-lavender/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};
