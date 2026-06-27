import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUp, Send } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-neutral-900 pt-20 pb-8 overflow-hidden" id="footer">
      
      {/* Background ambient circular glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Upper Column: Logo & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          
          <div className="md:col-span-5 space-y-6">
            {/* Logo */}
            <AnimatedLogo size="md" />
            <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
              An elite, 6th-floor open-air sanctuary merging slow-roasted traditional Tandoor starters, sizzling desserts, and masterclass mixology under the sky.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-[#A881AF] hover:bg-[#A881AF]/10 text-neutral-400 hover:text-[#A881AF] flex items-center justify-center transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-neutral-400 hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest font-sans">Visual Navigation</h4>
            <ul className="space-y-2 text-neutral-400 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Hero Skyline</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">Menu Selection</a>
              </li>
              <li>
                <a href="#ambiance" className="hover:text-[#D4AF37] transition-colors">Rooftop Ambiance</a>
              </li>
              <li>
                <a href="#light-bites" className="hover:text-[#D4AF37] transition-colors">Fast Food Bites</a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-[#D4AF37] transition-colors">VIP Reservations</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest font-sans">Celestial Dispatch</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Subscribe to unlock secret champagne weekends, VIP table priorities, and starry tasting menu invitations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative mt-2">
              <input
                type="email"
                placeholder="Your luxury email address"
                className="w-full bg-neutral-950 border border-neutral-850 focus:border-[#D4AF37]/40 rounded-xl py-3 pl-4 pr-12 text-xs text-white focus:outline-none transition-all placeholder-neutral-700"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFF2C5] text-black transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Column: Location Pin & Direct styled interactive map preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 items-center">
          
          {/* Address and Contact Card */}
          <div className="lg:col-span-5 space-y-6" id="contact-info">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest font-sans">Contact & Coordinates</h4>
            
            <div className="space-y-4 text-xs text-neutral-400">
              <a 
                href="https://maps.app.goo.gl/skUG6fkGkuVhMysQ6"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 hover:text-[#D4AF37] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Wisteria Cafe & Kitchen, 6th Floor Rooftop Skyline, Premium Plaza, Block-B, Sector-12</span>
              </a>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A881AF] shrink-0" />
                <span>reservations@wisteriacafe.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#A881AF] shrink-0" />
                <span>Open Daily: 5:00 PM – Midnight (Rooftop Dining)</span>
              </div>
            </div>
          </div>

          {/* Interactive Styled Google Map Panel */}
          <div className="lg:col-span-7" id="dark-map-panel">
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 shadow-2xl transition-all duration-300">
              <iframe
                title="Wisteria Cafe Map"
                src="https://maps.google.com/maps?q=Premium%20Plaza,%20Sector%2012,%20Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: 'grayscale(1) invert(0.92) contrast(1.1) brightness(0.95)' }}
                allowFullScreen
                loading="lazy"
              />
              {/* Subtle accent corner frame glow */}
              <div className="absolute inset-0 border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300 pointer-events-none rounded-2xl" />
            </div>
          </div>

        </div>

        {/* Lower Row: Legalities & Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-900 text-neutral-600 text-[10px] font-mono tracking-widest uppercase">
          <div>
            © 2026 Wisteria Cafe & Kitchen | All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>6th Floor Rooftop Dining Experience</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-[#D4AF37] transition-all cursor-pointer font-semibold"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
