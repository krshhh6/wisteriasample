import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Heart, Clock, X } from 'lucide-react';

interface AmbianceSectionProps {
  onReserveClick: () => void;
}

export default function AmbianceSection({ onReserveClick }: AmbianceSectionProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'staff',
      url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80',
      title: 'Polite Elite Service',
      desc: 'Our staff are trained to anticipate your every desire, delivering bespoke, warm, non-intrusive hospitality.',
      size: 'col-span-1 row-span-2'
    },
    {
      id: 'couple',
      url: 'https://images.unsplash.com/photo-1469504512102-900f29606341?auto=format&fit=crop&w=600&q=80',
      title: 'Twilight Skylines',
      desc: 'Seductive lighting and expansive 6th-floor views create the ultimate romantic sanctuary.',
      size: 'col-span-1 row-span-1'
    },
    {
      id: 'pastries',
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      title: 'Artisanal Bakery & Pâtisserie',
      desc: 'Savor our fresh-baked, flaky, golden morning pastries and decadent late-night desserts.',
      size: 'col-span-1 row-span-2'
    },
    {
      id: 'lounge',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      title: 'The Canopy Lounge',
      desc: 'Cozy firepits, premium velvet seating, and ambient, cinematic background music loops.',
      size: 'col-span-1 row-span-1'
    }
  ];

  return (
    <section id="ambiance" className="relative py-24 bg-black/40 border-t border-white/5 overflow-hidden backdrop-blur-md">
      
      {/* Subtle background glow mapping */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Sophisticated Storytelling Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center" id="about-text-column">
            <span className="text-[#D4AF37] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
              Your Rooftop Sanctuary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              An Elevated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">Escape</span>
            </h2>
            
            <p className="text-neutral-400 text-sm leading-relaxed mt-6">
              Nestled gracefully on the 6th floor rooftop, Wisteria Cafe & Kitchen is a love letter to luxury lounge culture. Far removed from the chaotic streets below, we invite you to breathe deep, sip exquisite strawberry mocktails, and sink into velvet plush cushions under the stars.
            </p>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mt-4">
              Our venue blends cozy warm firepits and romantic string lights with a futuristic wisteria design. It’s inclusive yet private, vibrant yet incredibly comforting. Whether celebrating a major milestone, sharing whispers under the twilight glow, or biting into crisp fresh pastries, Wisteria offers a flawless atmosphere of unhurried elegance.
            </p>

            {/* Premium Perks Grid */}
            <div className="grid grid-cols-2 gap-6 my-10 border-t border-white/10 pt-8" id="about-perks">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#D4AF37] backdrop-blur-md">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-sans">Open-Air Lounge</h4>
                  <p className="text-neutral-500 text-[11px] mt-1 leading-normal">5:00 PM – Midnight, Daily</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#A881AF] backdrop-blur-md">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-sans">Inclusive Vibe</h4>
                  <p className="text-neutral-500 text-[11px] mt-1 leading-normal">Cozy layouts for everyone</p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex">
              <button
                onClick={onReserveClick}
                id="btn-reserve-ambiance"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#A881AF]/40 hover:border-[#D4AF37]/50 text-white font-medium text-xs tracking-widest uppercase transition-all hover:scale-[1.02] cursor-pointer backdrop-blur-md"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Reserve An Experience</span>
              </button>
            </div>
          </div>

          {/* Right Column: Stunning Masonry Gallery */}
          <div className="lg:col-span-7" id="about-masonry-gallery">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 auto-rows-[160px] sm:auto-rows-[190px]">
              {galleryItems.map((photo) => (
                <motion.div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo.url)}
                  className={`relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer ${photo.size}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image with zoom on hover */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Dark Glass Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                    <span className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-mono">atmosphere</span>
                    <h4 className="text-white font-serif text-sm sm:text-base font-bold tracking-wide mt-1">
                      {photo.title}
                    </h4>
                    <p className="text-neutral-400 text-[10px] sm:text-xs leading-normal mt-1 max-w-xs">
                      {photo.desc}
                    </p>
                  </div>

                  {/* Corner Sparkle indicator icon */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 border border-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 4. Immersive Full-Screen Photo Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
            {/* Background clicker */}
            <div className="absolute inset-0" onClick={() => setActivePhoto(null)} />
            
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-lg bg-white/5"
            >
              <img
                src={activePhoto}
                alt="Ambiance Enlargement"
                className="w-full h-full object-contain max-h-[85vh]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
