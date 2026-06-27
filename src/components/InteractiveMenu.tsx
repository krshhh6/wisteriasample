import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuCategories } from '../data/menu';
import { MenuItem } from '../types';
import { Search, Flame, ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';

interface InteractiveMenuProps {
  onOrderOnlineClick?: () => void;
}

export default function InteractiveMenu({ onOrderOnlineClick }: InteractiveMenuProps) {
  const categoriesWithAll = [
    {
      id: 'all',
      name: 'All Items',
      icon: 'Sparkles',
      items: menuCategories.flatMap(c => c.items)
    },
    ...menuCategories
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll positions to show indicator buttons
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Run once initially and on category switch
      checkScroll();
      // Handle resize
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [selectedCategoryId, searchQuery, vegOnly]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.75;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Find the selected category
  const activeCategory = categoriesWithAll.find(c => c.id === selectedCategoryId);

  // Filter items based on search and dietary preferences
  const filteredItems = categoriesWithAll.flatMap(cat => {
    // If a category is selected and we aren't searching globally, restrict to active category
    if (selectedCategoryId && cat.id !== selectedCategoryId) {
      return [];
    }
    return cat.items;
  }).filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVeg = !vegOnly || item.vegetarian;
    return matchesSearch && matchesVeg;
  });

  return (
    <section id="menu" className="relative py-24 bg-black/40 border-t border-white/5 overflow-hidden backdrop-blur-md">
      {/* Background Decorative Wisteria Vine Art */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(168,129,175,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div id="menu-section-header">
            <span className="text-[#A881AF] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
              Epicurean Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              A Symphony of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">Flavors</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-3 max-w-lg">
              Explore our curated, top-tier selections of local delicacies, fusion starters, and stellar cocktails. Hover to view details and start ordering.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto" id="menu-filters">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search delicate dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 focus:border-[#A881AF]/40 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all"
              />
            </div>

            {/* Veg Switcher */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono tracking-wider transition-all cursor-pointer backdrop-blur-md ${
                vegOnly 
                  ? 'bg-[#15803d]/10 border-[#22c55e]/30 text-[#4ade80]' 
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-[#22c55e] animate-pulse' : 'bg-neutral-700'}`} />
              VEG ONLY
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-neutral-900" id="category-pills">
          {categoriesWithAll.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSearchQuery(''); // clear search on category switch to prevent empty state surprise
                }}
                className={`relative px-5 py-3 rounded-full text-xs uppercase font-sans tracking-widest font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected 
                    ? 'text-black z-10' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FFF2C5] rounded-full -z-10 shadow-[0_2px_15px_rgba(212,175,55,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Floating Horizontal Carousel Wrapper */}
        <div className="relative group/carousel">
          
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-950/90 border border-neutral-800 text-[#D4AF37] flex items-center justify-center shadow-lg hover:bg-neutral-900 transition-all cursor-pointer hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-neutral-950/90 border border-neutral-800 text-[#D4AF37] flex items-center justify-center shadow-lg hover:bg-neutral-900 transition-all cursor-pointer hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Horizontal Drag/Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto py-8 px-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`card-container-${item.id}`}
                    className="flex-none w-[270px] sm:w-[310px] bg-white/[0.03] border border-white/10 backdrop-blur-lg hover:border-[#D4AF37]/50 hover:bg-white/[0.06] rounded-2xl p-6 snap-start flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(212,175,55,0.08)]"
                  >
                    {/* Tiny visual purple shimmer line on top */}
                    <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#A881AF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div>
                      {/* Interactive Perfectly Circular Top-Down (Flat Lay) Food plate cutout */}
                      <div 
                        className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto mb-6 flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectedDishDetail(item)}
                      >
                        {/* Elegant Outer Ring Ring */}
                        <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-[#D4AF37]/20 transition-all duration-500 scale-[1.03]" />
                        
                        {/* Seductive Gold Glow Drop Shadow behind circular dish */}
                        <div className="absolute inset-4 rounded-full bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/15 blur-xl transition-all duration-500" />
                        
                        {/* Slow Rotating Flat-lay Cutout */}
                        <motion.div 
                          className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden p-1 bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/40 shadow-inner transition-all duration-500"
                          whileHover={{ rotate: 15 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-full select-none transform transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>

                        {/* Veg / Non-Veg Icon Overlay */}
                        <div className="absolute top-2 right-2 z-10 bg-black/80 backdrop-blur-md p-1.5 rounded-lg border border-neutral-800 shadow-md">
                          <div className={`w-3 h-3 border-2 flex items-center justify-center p-0.5 ${item.vegetarian ? 'border-green-600' : 'border-red-600'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.vegetarian ? 'bg-green-600' : 'bg-red-600'}`} />
                          </div>
                        </div>

                        {/* Popular badge */}
                        {item.popular && (
                          <div className="absolute bottom-2 left-2 z-10 bg-black/90 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full text-[8px] font-mono tracking-widest text-[#D4AF37]">
                            POPULAR
                          </div>
                        )}
                      </div>

                      {/* Info & Title */}
                      <div className="text-center cursor-pointer" onClick={() => setSelectedDishDetail(item)}>
                        <h3 className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-[#FFF2C5] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-neutral-500 text-xs mt-1.5 line-clamp-2 h-8 leading-relaxed">
                          {item.description || 'A masterpiece of taste, crafted with secret spices and visual elegance.'}
                        </p>
                      </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="flex items-center justify-between border-t border-neutral-900 mt-6 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono tracking-wider text-neutral-500">PRICE</span>
                        <span className="text-base font-bold text-[#D4AF37]">₹{item.price}</span>
                      </div>

                      {/* Interactive View Details Button */}
                      <button
                        onClick={() => setSelectedDishDetail(item)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer"
                      >
                        <span>EXPLORE</span>
                      </button>
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <div className="w-full py-16 flex flex-col items-center justify-center text-center">
                <Filter className="w-10 h-10 text-neutral-700 mb-4 stroke-1" />
                <h4 className="text-neutral-400 font-serif text-lg">No culinary masterpieces found</h4>
                <p className="text-neutral-600 text-xs mt-1">Try adjusting your filters or typing another name.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 3. Detailed Dish Modal Overlay */}
      <AnimatePresence>
        {selectedDishDetail && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            {/* Modal Backdrop closer clicker */}
            <div className="absolute inset-0" onClick={() => setSelectedDishDetail(null)} />

            <motion.div
              layoutId={`card-container-${selectedDishDetail.id}`}
              className="relative w-full max-w-2xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 z-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDishDetail(null)}
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
                      src={selectedDishDetail.image}
                      alt={selectedDishDetail.name}
                      className="w-full h-full object-cover rounded-full select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Dietary Info */}
                  <div className="flex gap-3 mt-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-wider border ${
                      selectedDishDetail.vegetarian 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                      {selectedDishDetail.vegetarian ? '100% VEGETARIAN' : 'NON-VEGETARIAN'}
                    </span>
                    {selectedDishDetail.spicy && (
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
                      {selectedDishDetail.name}
                    </h3>
                    <p className="text-[#D4AF37] font-semibold text-xl tracking-wide mt-3">₹{selectedDishDetail.price}</p>
                    
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-5">
                      {selectedDishDetail.description || 'Our signature recipe passed down through generations. Cooked using pure artisan ingredients, aromatic infusions, and plated with hyper-detailed modern precision.'}
                    </p>

                    {/* Bullet Info Points */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-900 my-6 py-4">
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase font-mono tracking-wider">Preparation Time</span>
                        <span className="text-xs text-white font-medium">15-20 Minutes</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase font-mono tracking-wider">Spice Profile</span>
                        <span className="text-xs text-white font-medium">{selectedDishDetail.spicy ? 'Intense Sensation' : 'Mild & Balanced'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action links */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSelectedDishDetail(null)}
                      className="flex-1 py-3.5 rounded-xl border border-white/10 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white/5 transition-all cursor-pointer text-center"
                    >
                      Close Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDishDetail(null);
                        if (onOrderOnlineClick) {
                          onOrderOnlineClick();
                        } else {
                          const el = document.getElementById('partners');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
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

    </section>
  );
}
