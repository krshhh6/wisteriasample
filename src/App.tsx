/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, Reservation } from './types';
import IntroOverlay from './components/IntroOverlay';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveMenu from './components/InteractiveMenu';
import AmbianceSection from './components/AmbianceSection';
import FastFoodSection from './components/FastFoodSection';
import GallerySection from './components/GallerySection';
import PartnerPlatforms from './components/PartnerPlatforms';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { Sparkles, Calendar, Check, X, Bell, Flame } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'gold';
}

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'menu'>('home');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [exploredDish, setExploredDish] = useState<MenuItem | null>(null);
  
  // Custom Mouse Trailer state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Helper to trigger elegant floating notifications
  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDishExplore = (menuItem: MenuItem) => {
    addToast(`Culinary Insight: ${menuItem.name}`, 'gold');
    setExploredDish(menuItem);
  };

  const handleReservationSuccess = (res: Reservation) => {
    addToast(`Reservation Confirmed! Welcome, ${res.name}. Ticket: ${res.id}`, 'gold');
    
    // Play a gentle confirm sound chime if browser allows
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5 node
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5 node
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.3); // G5 node
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // Audio context block is benign, ignore
    }
  };

  const handleViewChange = (view: 'home' | 'menu', targetHash?: string) => {
    setCurrentView(view);
    if (targetHash) {
      // Try to find the element and scroll. If not immediately found (due to transitions), retry.
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          clearInterval(interval);
        } else {
          attempts++;
          if (attempts > 15) { // 15 attempts * 60ms = ~900ms, plenty of time for route exit transition
            clearInterval(interval);
          }
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-primary text-white overflow-x-hidden selection:bg-gold/30 selection:text-gold-light transition-colors duration-500">
      
      {/* 1. Introductory Luxury Screen Loader */}
      <IntroOverlay onComplete={() => setIntroCompleted(true)} />

      {/* 2. Seductive Mouse Trail Spotlight Halo */}
      {cursorVisible && introCompleted && (
        <div
          id="mouse-trailer"
          className="fixed pointer-events-none z-50 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.065)_0%,rgba(212,175,55,0.015)_40%,transparent_70%)] blur-md transition-all duration-150 ease-out hidden md:block"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Main Container rendered once intro finishes */}
      {introCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="flex flex-col min-h-screen"
        >
          {/* Header Navigation */}
          <Header
            currentView={currentView}
            onViewChange={handleViewChange}
            onReserveClick={() => handleViewChange('home', '#reservations')}
          />

          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                {/* Hero Segment */}
                <HeroSection
                  onReserveClick={() => handleViewChange('home', '#reservations')}
                  onExploreMenuClick={() => handleViewChange('menu')}
                />

                {/* Split Ambiance storytelling and masonry */}
                <AmbianceSection
                  onReserveClick={() => handleViewChange('home', '#reservations')}
                />

                {/* 3-Column Light Bites Casual Grid */}
                <FastFoodSection
                  onDishClick={handleDishExplore}
                />

                {/* Immersive interactive skyline view gallery */}
                <GallerySection />

                {/* Partner Online Ordering Channels */}
                <PartnerPlatforms />

                {/* Live Table Reservation Engine */}
                <BookingForm
                  onReservationSuccess={handleReservationSuccess}
                />
              </motion.div>
            ) : (
              <motion.div
                key="menu-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="pt-24 min-h-screen flex flex-col bg-black"
              >
                {/* Interactive Flat-Lay Carousel Menu */}
                <InteractiveMenu onOrderOnlineClick={() => handleViewChange('home', '#partners')} />

                {/* Live Table Reservation Engine (Seat Booking Reservation) */}
                <div className="bg-neutral-950 border-t border-white/5 py-16">
                  <BookingForm
                    onReservationSuccess={handleReservationSuccess}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal coordinate locator footer */}
          <Footer />

        </motion.div>
      )}

      {/* Immersive Explored Dish Modal Overlay */}
      <AnimatePresence>
        {exploredDish && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            {/* Modal Backdrop closer clicker */}
            <div className="absolute inset-0" onClick={() => setExploredDish(null)} />

            <motion.div
              layoutId={`card-container-${exploredDish.id}`}
              className="relative w-full max-w-2xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 z-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setExploredDish(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Left Side: Massive plate visualization */}
                <div className="flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
                  <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-[#D4AF37]/30 p-2 overflow-hidden shadow-2xl">
                    <img
                      src={exploredDish.image}
                      alt={exploredDish.name}
                      className="w-full h-full object-cover rounded-full select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Dietary Info */}
                  <div className="flex gap-3 mt-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-wider border ${
                      exploredDish.vegetarian 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      {exploredDish.vegetarian ? '100% VEGETARIAN' : 'NON-VEGETARIAN'}
                    </span>
                    {exploredDish.spicy && (
                      <span className="bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-[9px] font-mono tracking-wider flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 animate-pulse" /> SPICY
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side: Elaborated Content */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] text-[#A881AF] uppercase tracking-[0.3em] font-mono">Chef's Gourmet Series</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mt-2">
                      {exploredDish.name}
                    </h3>
                    <p className="text-[#D4AF37] font-semibold text-xl tracking-wide mt-3">₹{exploredDish.price}</p>
                    
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-5">
                      {exploredDish.description || 'Our signature recipe passed down through generations. Cooked using pure artisan ingredients, aromatic infusions, and plated with hyper-detailed modern precision.'}
                    </p>

                    {/* Bullet Info Points */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-900 my-6 py-4">
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase font-mono tracking-wider">Preparation Time</span>
                        <span className="text-xs text-white font-medium">15-20 Minutes</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase font-mono tracking-wider">Spice Profile</span>
                        <span className="text-xs text-white font-medium">{exploredDish.spicy ? 'Intense Sensation' : 'Mild & Balanced'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action links */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setExploredDish(null)}
                      className="flex-1 py-3.5 rounded-xl border border-white/10 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white/5 transition-all cursor-pointer text-center"
                    >
                      Close Details
                    </button>
                    <button
                      onClick={() => {
                        setExploredDish(null);
                        handleViewChange('home', '#partners');
                      }}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFF2C5] text-black font-semibold text-xs tracking-widest uppercase shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer text-center flex items-center justify-center"
                    >
                      ORDER ONLINE
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Global Floating Toast Notifications Overlay */}
      <div id="toast-container" className="fixed bottom-6 right-6 z-[99999] space-y-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: 50 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className={`p-4 rounded-xl border flex items-start gap-3 shadow-2xl backdrop-blur-md pointer-events-auto ${
                t.type === 'gold'
                  ? 'bg-neutral-950/90 border-[#D4AF37]/50 text-white'
                  : t.type === 'info'
                  ? 'bg-neutral-950/90 border-[#A881AF]/40 text-neutral-300'
                  : 'bg-neutral-950/90 border-neutral-850 text-white'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.type === 'gold' ? (
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                ) : (
                  <Bell className="w-4 h-4 text-[#A881AF]" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-serif font-semibold">{t.message}</p>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
                className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

