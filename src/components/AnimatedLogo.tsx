import { motion } from 'motion/react';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export default function AnimatedLogo({ className = '', size = 'md' }: AnimatedLogoProps) {
  // Dimension calculations
  const dims = {
    sm: { width: 140, height: 40, iconSize: 24, fontSize: 'text-sm' },
    md: { width: 200, height: 50, iconSize: 32, fontSize: 'text-base' },
    lg: { width: 280, height: 70, iconSize: 44, fontSize: 'text-xl' },
    hero: { width: 380, height: 110, iconSize: 64, fontSize: 'text-3xl' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id={`logo-${size}`}>
      {/* SVG Icon: Elegant Monogram "W" woven with Wisteria Vines */}
      <motion.svg
        width={dims.iconSize}
        height={dims.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2C5" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#63456C" />
            <stop offset="50%" stopColor="#A881AF" />
            <stop offset="100%" stopColor="#E4D3E6" />
          </linearGradient>
        </defs>

        {/* Outer Elegant Circle Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0, rotate: -45 }}
          animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Wisteria Vine Path 1 */}
        <motion.path
          d="M30 75C30 75 32 50 42 35C45 30 52 20 58 24C65 28 60 40 50 48C42 54 36 62 38 70C39 74 44 76 48 74"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
        />

        {/* Wisteria Petals (Hanging Bud designs) */}
        <motion.circle
          cx="42"
          cy="35"
          r="3.5"
          fill="url(#purpleGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.circle
          cx="48"
          cy="28"
          r="2.5"
          fill="url(#purpleGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        />
        <motion.circle
          cx="54"
          cy="22"
          r="3"
          fill="url(#purpleGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />

        {/* Monogram "W" Serif in Center */}
        <motion.path
          d="M28 32 L38 68 L48 42 L52 42 L62 68 L72 32"
          stroke="url(#goldGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* Text Branding */}
      <div className="flex flex-col">
        <motion.span
          className={`font-serif tracking-[0.25em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#AA7C11] ${dims.fontSize}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Wisteria
        </motion.span>
        {size !== 'sm' && (
          <motion.span
            className="text-[9px] uppercase tracking-[0.45em] text-[#A881AF] font-sans font-medium -mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            Cafe & Kitchen
          </motion.span>
        )}
      </div>
    </div>
  );
}
