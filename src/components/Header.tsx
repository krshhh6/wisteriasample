import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

interface HeaderProps {
  currentView: 'home' | 'menu';
  onViewChange: (view: 'home' | 'menu', targetHash?: string) => void;
  onReserveClick: () => void;
}

export default function Header({ currentView, onViewChange, onReserveClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, targetView: 'home' | 'menu', targetHash?: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onViewChange(targetView, targetHash);
  };

  return (
    <>
      {/* Translucent Glassmorphic Header */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-black/40 backdrop-blur-md border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between">
          
          {/* Left Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 w-1/3 text-xs uppercase font-sans tracking-widest font-semibold text-neutral-400">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, 'home', '#hero')}
              className={`hover:text-white transition-colors relative group py-2 ${currentView === 'home' ? 'text-neutral-200' : ''}`}
            >
              Skyline
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#menu"
              onClick={(e) => handleLinkClick(e, 'menu')}
              className={`hover:text-white transition-colors relative group py-2 ${currentView === 'menu' ? 'text-gold' : ''}`}
            >
              Menu Selection
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleLinkClick(e, 'home', '#gallery')}
              className="hover:text-white transition-colors relative group py-2"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#ambiance"
              onClick={(e) => handleLinkClick(e, 'home', '#ambiance')}
              className="hover:text-white transition-colors relative group py-2"
            >
              Ambiance
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Center Branding (Desktop: absolute center for maximum focus) */}
          <div className="lg:w-1/3 flex justify-center">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, 'home', '#hero')}
              className="inline-block"
            >
              <AnimatedLogo size={isScrolled ? 'sm' : 'md'} />
            </a>
          </div>

          {/* Right Links & Booking CTA (Desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-6 w-1/3">
            {/* Partners Redirection Button */}
            <a
              href="#partners"
              onClick={(e) => handleLinkClick(e, 'home', '#partners')}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-purple/40 bg-white/5 hover:bg-purple/5 text-neutral-400 hover:text-purple text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer backdrop-blur-md"
            >
              Order Online
            </a>

            {/* Gold bordered Reserve CTA */}
            <button
              onClick={() => {
                onViewChange('home', '#reservations');
              }}
              id="btn-book-table-navbar"
              className="px-5 py-2.5 rounded-xl border border-gold hover:bg-gold/5 text-gold hover:text-white font-semibold text-xs tracking-widest uppercase transition-all hover:scale-[1.03] cursor-pointer backdrop-blur-md"
            >
              Book A Table
            </button>
          </div>

          {/* Mobile Actions Overlay */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Order Online Link */}
            <a
              href="#partners"
              onClick={(e) => handleLinkClick(e, 'home', '#partners')}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider text-neutral-400 hover:text-white cursor-pointer backdrop-blur-md"
            >
              ORDER
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white cursor-pointer backdrop-blur-md"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-2xl flex flex-col justify-center items-center p-8 lg:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex flex-col items-center gap-8 text-center">
              <AnimatedLogo size="md" />

              <nav className="flex flex-col gap-6 text-base uppercase font-sans tracking-[0.25em] font-bold text-neutral-400">
                <a
                  href="#hero"
                  onClick={(e) => handleLinkClick(e, 'home', '#hero')}
                  className="hover:text-white text-lg transition-colors"
                >
                  Skyline
                </a>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, 'menu')}
                  className={`hover:text-white text-lg transition-colors ${currentView === 'menu' ? 'text-gold' : ''}`}
                >
                  Menu Selection
                </a>
                <a
                  href="#gallery"
                  onClick={(e) => handleLinkClick(e, 'home', '#gallery')}
                  className="hover:text-white text-lg transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#ambiance"
                  onClick={(e) => handleLinkClick(e, 'home', '#ambiance')}
                  className="hover:text-white text-lg transition-colors"
                >
                  Ambiance
                </a>
                <a
                  href="#light-bites"
                  onClick={(e) => handleLinkClick(e, 'home', '#light-bites')}
                  className="hover:text-white text-lg transition-colors"
                >
                  Fast Food
                </a>
                <a
                  href="#reservations"
                  onClick={(e) => handleLinkClick(e, 'home', '#reservations')}
                  className="hover:text-white text-lg transition-colors"
                >
                  VIP Bookings
                </a>
              </nav>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onViewChange('home', '#reservations');
                }}
                className="mt-6 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-xs tracking-widest uppercase shadow-lg cursor-pointer animate-pulse"
              >
                Book A Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
