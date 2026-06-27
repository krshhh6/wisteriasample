import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export default function HeroSection({ onReserveClick, onExploreMenuClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sparkles & Bokeh Canvas effect to make the background "seductive" and alive
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      x!: number;
      y!: number;
      size!: number;
      speedY!: number;
      speedX!: number;
      opacity!: number;
      fadeSpeed!: number;
      color!: string;

      constructor() {
        this.reset();
        this.y = Math.random() * height; // Start at random positions initially
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2 + 0.5; // fine gold dust
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        // Warm gold vs soft purple sparks
        this.color = Math.random() > 0.4 
          ? `rgba(212, 175, 55, ${this.opacity})` // gold
          : `rgba(168, 129, 175, ${this.opacity})`; // purple
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeSpeed;

        if (this.y < 0 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color.includes('212') ? '#D4AF37' : '#A881AF';
        ctx.fill();
      }
    }

    // Larger glowing bokeh lights
    class Bokeh {
      x!: number;
      y!: number;
      radius!: number;
      speedY!: number;
      alpha!: number;
      color!: string;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 100;
        this.radius = Math.random() * 40 + 20;
        this.speedY = -(Math.random() * 0.2 + 0.05);
        this.alpha = Math.random() * 0.06 + 0.01;
        this.color = Math.random() > 0.5 
          ? `rgba(168, 129, 175, ${this.alpha})` // translucent purple
          : `rgba(212, 175, 55, ${this.alpha})`; // translucent gold
      }

      update() {
        this.y += this.speedY;
        if (this.y < -this.radius * 2) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 0; // turn off shadow for large arcs to save CPU
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => new Particle());
    const bokehs: Bokeh[] = Array.from({ length: 15 }, () => new Bokeh());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw large bokeh blobs first (background layer)
      bokehs.forEach((b) => {
        b.update();
        b.draw();
      });

      // Draw gold sparks (foreground layer)
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-20"
    >
      {/* 1. Cinematic Background Video Loop */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-[1.05]"
          poster="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1600&q=80"
        >
          {/* A high-end moody slow motion video loop: bar mocktail pouring or cozy lounge */}
          <source 
            src="https://res.cloudinary.com/dfvfphe5z/video/upload/v1782533891/Food_Reel_-_Dar%C3%ADo_Idoate_-_Dario_Idoate_Film_1080p_h264_fxiydl.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Seductive Dual Overlay: Radial Black Gradient + Purple/Gold Ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/65 via-[#050505]/75 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,129,175,0.15)_0%,transparent_60%)]" />
      </div>

      {/* 2. Floating Sparks Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen"
      />

      {/* Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 py-12">
        
        {/* Left Column: Typography Headline and CTAs */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start" id="hero-cta-block">
          
          {/* Micro Tagline */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#FFF2C5]">
              6th Floor Rooftop Lounge Experience
            </span>
          </motion.div>

          {/* Majestic Typography Title */}
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          >
            Elevated Dining.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">
              Under the Stars.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="font-sans text-neutral-400 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
          >
            Experience the exquisite fusion of slow-roasted Tandoori heritage and vibrant mocktail mixology, high above the city skyline. Cozy fires, panoramic skylines, and elite culinary artistry.
          </motion.p>

          {/* Interactive Luxury Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
          >
            <button
              onClick={onReserveClick}
              id="btn-book-table-hero"
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4CF57] to-[#AA7C11] text-black font-semibold text-sm tracking-widest uppercase overflow-hidden shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all hover:scale-[1.03] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)] cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Book A Table
            </button>

            <button
              onClick={onExploreMenuClick}
              id="btn-explore-menu-hero"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-[#A881AF]/40 bg-white/[0.03] hover:bg-[#A881AF]/5 text-white font-medium text-sm tracking-widest uppercase backdrop-blur-sm transition-all hover:scale-[1.03] cursor-pointer"
            >
              Explore Menu
            </button>
          </motion.div>
        </div>

        {/* Right Column: Floating Culinary Masterpieces */}
        <div className="lg:col-span-5 flex flex-row lg:flex-col items-center justify-center gap-4 sm:gap-12 lg:gap-6 relative mt-8 lg:mt-0" id="hero-dishes-block">
          
          {/* Backlit Glow behind the dishes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#A881AF]/15 to-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* 1. Steaming Mutton Rogan Josh Plate (Left/Upper) */}
          <motion.div
            className="relative group w-[150px] h-[150px] xs:w-48 xs:h-48 sm:w-72 sm:h-72 lg:w-76 lg:h-76 flex items-center justify-center"
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -8 }}
          >
            {/* Glowing Aura and circular shadow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Floating shadow beneath plate */}
            <div className="absolute bottom-[-10px] sm:bottom-[-15px] left-1/2 -translate-x-1/2 w-32 sm:w-48 h-3 sm:h-4 bg-black/60 rounded-full blur-md" />

            {/* Custom Steam CSS simulation */}
            <div className="absolute top-[-20px] sm:top-[-30px] left-1/2 -translate-x-1/2 flex gap-0.5 sm:gap-1 pointer-events-none z-30 select-none">
              <div className="w-1 h-8 sm:w-1.5 sm:h-12 bg-white/20 blur-sm rounded-full animate-steam-1" />
              <div className="w-0.5 h-10 sm:w-1 sm:h-16 bg-white/10 blur-sm rounded-full animate-steam-2 delay-200" />
              <div className="w-1 h-6 sm:w-1.5 sm:h-10 bg-white/15 blur-sm rounded-full animate-steam-3 delay-500" />
            </div>

            {/* Premium Copper Bowl Container */}
            <div className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-60 sm:h-60 rounded-full p-1.5 sm:p-2 border border-white/10 group-hover:border-[#D4AF37] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
              <img
                src="https://images.unsplash.com/photo-1545247181-516773cae76d?auto=format&fit=crop&w=600&q=80"
                alt="Kashmiri Mutton Rogan Josh"
                className="w-full h-full object-cover rounded-full select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Miniature gold accent label */}
            <div className="absolute bottom-1 right-1 xs:bottom-4 xs:right-4 bg-black/85 sm:bg-white/5 border border-white/10 backdrop-blur-md py-1 px-2 xs:py-1.5 xs:px-3 rounded-full text-[8px] xs:text-[10px] font-mono tracking-wider text-white flex items-center gap-1 shadow-lg pointer-events-none">
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37] animate-pulse" />
              <span>ROGAN JOSH • ₹449</span>
            </div>
          </motion.div>

          {/* 2. Frost-covered Ambiance Live Video (Right/Lower) */}
          <motion.div
            className="relative group w-[140px] h-[140px] xs:w-44 xs:h-44 sm:w-64 sm:h-64 lg:w-68 lg:h-68 flex items-center justify-center lg:-mt-12 lg:ml-24"
            initial={{ opacity: 0, x: 50, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, y: -8 }}
          >
            {/* Glowing purple aura */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.3)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Floating shadow */}
            <div className="absolute bottom-[-8px] sm:bottom-[-10px] left-1/2 -translate-x-1/2 w-28 sm:w-36 h-2.5 sm:h-3 bg-black/60 rounded-full blur-md" />

            {/* Glass Container with Video */}
            <div className="relative w-28 h-28 xs:w-36 xs:h-36 sm:w-52 sm:h-52 rounded-full p-1.5 sm:p-2 border border-white/10 group-hover:border-[#A881AF] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
              <video
                src="https://res.cloudinary.com/dfvfphe5z/video/upload/v1782533272/Untitled_-_June_27_2026_at_08.39.05_i4lph0.mp4"
                className="w-full h-full object-cover rounded-full select-none"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Condensation Simulation Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Miniature purple accent label */}
            <div className="absolute bottom-1 left-1 xs:bottom-3 xs:left-4 bg-black/85 sm:bg-white/5 border border-white/10 backdrop-blur-md py-1 px-2 xs:py-1.5 xs:px-3 rounded-full text-[8px] xs:text-[10px] font-mono tracking-wider text-white flex items-center gap-1 shadow-lg pointer-events-none">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A881AF] animate-ping" />
              <span>Wisteria • Veg & Non-Veg</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Elegant bottom transition divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-[2]" />
    </section>
  );
}
