import React from 'react';
import { motion } from 'motion/react';
import { Heart, Music, Camera, Utensils, PartyPopper } from 'lucide-react';

const events = [
  { time: '06:30 PM', title: 'Arrival & Welcome', icon: Heart, desc: 'The celebration begins at the Grand Ballroom, The Blue Water.' },
  { time: '06:37 PM', title: 'Poruwa Ceremony', icon: Heart, desc: 'Poruwa Ceremony commences at 6.37 pm.' },
  { time: '08:30 PM', title: 'Buffet Dinner', icon: Utensils, desc: 'Dinner will be served.' },
  { time: '11:56 PM', title: 'Going Away', icon: PartyPopper, desc: 'The couple will depart at 11.56 pm.' },
];

interface TimelineProps {
  event?: string | null;
}

export const Timeline: React.FC<TimelineProps> = ({ event = 'both' }) => {
  const filteredEvents = events.filter(evt => {
    if (event === 'poruwa') {
      return evt.title !== 'Homecoming Function';
    }
    if (event === 'homecoming') {
      return evt.title === 'Homecoming Function';
    }
    return true; // 'both' or default
  });

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-20">
        <span className="text-brand-plum uppercase tracking-[0.4em] text-[10px] font-medium mb-4 block">
          {event === 'homecoming' ? "The Evening's Flow" : "The Day's Flow"}
        </span>
        <h2 className="text-5xl font-display text-stone-800 tracking-tight">
          {event === 'homecoming' ? "Homecoming Timeline" : "Wedding Timeline"}
        </h2>
        <div className="w-12 h-px bg-brand-lavender/30 mx-auto mt-6" />
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-lavender/20 to-transparent" />

        <div className="space-y-24">
          {filteredEvents.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Time */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-2xl font-serif text-brand-plum italic">{item.time}</span>
              </div>

              {/* Icon Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-brand-lavender/30 flex items-center justify-center shadow-xl">
                <item.icon className="w-5 h-5 text-brand-plum" />
              </div>

              {/* Content */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h4 className="text-xl font-display text-stone-800 mb-1">{item.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
