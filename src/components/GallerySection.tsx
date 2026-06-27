import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Play, Pause, Camera, Sparkles } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

export default function GallerySection() {
  const images: GalleryImage[] = [
    {
      id: 'sunset-seating',
      url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1600&q=85',
      title: 'Golden Hour Terrace',
      category: 'Rooftop Ambiance',
      description: 'Elegant seating framed by city views and the soft glow of Patna\'s evening skyline.',
    },
    {
      id: 'fairy-lights',
      url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85',
      title: 'The Wisteria Cocktail Lounge',
      category: 'Lounge & Bar',
      description: 'Artisanal mixology meets celestial starry-night aesthetics under custom pergolas.',
    },
    {
      id: 'night-tables',
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85',
      title: 'Acoustic Dinners',
      category: 'Rooftop Ambiance',
      description: 'Warm candlelight dining paired with live instrumental soundscapes every weekend.',
    },
    {
      id: 'premium-dining',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
      title: 'Skyline Private Dining',
      category: 'VIP Cabanas',
      description: 'Exclusive glass-dome dining experiences offering unmatched luxury and panoramic horizons.',
    },
    {
      id: 'bar-detail',
      url: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=1600&q=85',
      title: 'Lush Botanical Corners',
      category: 'Rooftop Garden',
      description: 'Vibrant green cascading foliage blending nature with sophisticated urban architecture.',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Autoplay interval
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoplay]);

  const handleNext = () => {
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setIsLoaded(false);
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="relative py-24 bg-black border-t border-white/5 overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#A881AF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" id="gallery-header">
          <div>
            <span className="text-[#D4AF37] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
              Rooftop Vibe Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
              Atmospheric <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">Gallery</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-3 max-w-xl leading-relaxed">
              Explore our beautiful skyline seating, bespoke botanical corners, and sparkling terrace ambiance on Patna\'s premier rooftop.
            </p>
          </div>

          {/* Autoplay Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              {isAutoplay ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume Tour</span>
                </>
              )}
            </button>
            <span className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono text-neutral-500">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Master Slider Container */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group" id="gallery-slider-frame">
          
          {/* Main Display Image */}
          <div className="absolute inset-0 bg-neutral-950">
            {/* Elegant Skeleton loader while image is loading */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
                <Camera className="w-8 h-8 text-neutral-700 animate-bounce" />
              </div>
            )}
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className="w-full h-full object-cover select-none transition-transform duration-1000"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
            
            {/* Moody overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-black/70 border border-white/10 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              title="Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-black/70 border border-white/10 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 flex items-center justify-center transition-all duration-300 pointer-events-auto backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              title="Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Top category pill & fullscreen zoom */}
          <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10">
            <span className="bg-black/75 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {images[currentIndex].category}
            </span>
            
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-3 rounded-xl bg-black/75 border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer hover:bg-black"
              title="Open Fullscreen Slide"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom text info */}
          <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 z-10 text-left pointer-events-none max-w-2xl">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                {images[currentIndex].title}
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-2 leading-relaxed font-sans max-w-xl">
                {images[currentIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Slideshow progress bar */}
          {isAutoplay && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
              <motion.div
                key={currentIndex}
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#A881AF]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail Tray Strip */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-6 overflow-x-auto py-2 no-scrollbar" id="gallery-thumbnails">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => selectImage(idx)}
              className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#D4AF37] scale-105 shadow-[0_4px_15px_rgba(212,175,55,0.2)]'
                  : 'border-white/10 hover:border-white/30 hover:scale-102 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
              {currentIndex === idx && (
                <div className="absolute inset-0 bg-[#D4AF37]/10" />
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/98 z-50 flex flex-col justify-between p-6 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase">
                  Immersive Skyline View
                </span>
                <h4 className="text-white text-lg font-serif mt-1 font-semibold">
                  {images[currentIndex].title}
                </h4>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close Fullscreen"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Immersive Main Image */}
            <div className="relative flex-1 flex items-center justify-center my-6 max-h-[75vh]">
              {/* Left Selector */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 w-14 h-14 rounded-full bg-black/60 border border-white/10 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/40 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={`lightbox-${currentIndex}`}
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                className="max-w-full max-h-full object-contain rounded-2xl border border-white/5 shadow-2xl select-none"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />

              {/* Right Selector */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 w-14 h-14 rounded-full bg-black/60 border border-white/10 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/40 flex items-center justify-center transition-all duration-300 z-10 cursor-pointer backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Info & Thumbnail Tray inside Lightbox */}
            <div className="flex flex-col items-center gap-6 w-full">
              <p className="text-neutral-400 text-xs sm:text-sm text-center max-w-xl leading-relaxed">
                {images[currentIndex].description}
              </p>

              <div className="flex gap-2.5 overflow-x-auto max-w-full no-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button
                    key={`lightbox-thumb-${img.id}`}
                    onClick={() => selectImage(idx)}
                    className={`relative w-16 h-11 rounded-lg overflow-hidden border transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      currentIndex === idx
                        ? 'border-[#D4AF37] scale-105'
                        : 'border-white/10 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover select-none"
                    />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
