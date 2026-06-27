import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedLogo from './AnimatedLogo';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hold the screen for 2.4 seconds to let the SVG draw fully and look premium
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          id="intro-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Subtle Ambient Radial Backlight Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.08)_0%,transparent_60%)] pointer-events-none" />

          <div className="flex flex-col items-center">
            {/* Giant Centered Animated Logo */}
            <AnimatedLogo size="hero" />

            {/* Glowing Tagline */}
            <motion.p
              className="text-xs uppercase tracking-[0.5em] text-[#D4AF37]/60 font-sans mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.0 }}
            >
              Elevated Dining • Under The Stars
            </motion.p>

            {/* Loading Progress Line */}
            <div className="w-48 h-[1px] bg-neutral-900 mt-6 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#A881AF] to-[#D4AF37]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
