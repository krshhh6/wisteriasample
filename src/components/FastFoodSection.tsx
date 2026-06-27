import { MenuItem } from '../types';
import { motion } from 'motion/react';
import { Plus, Check, Star, Eye } from 'lucide-react';

interface FastFoodSectionProps {
  onDishClick: (item: MenuItem) => void;
}

export default function FastFoodSection({ onDishClick }: FastFoodSectionProps) {
  // Extract specific items requested
  const lightBites: MenuItem[] = [
    {
      id: 'fb1',
      name: 'Tandoori Chicken Grilled Sandwich',
      price: 249,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
      vegetarian: false,
      popular: true,
      description: 'Juicy tandoor-roasted chicken shredded and layered with mint chutney, mozzarella cheese, and grilled to absolute golden crispiness.'
    },
    {
      id: 'fb2',
      name: 'Alfredo Chicken Pasta',
      price: 299,
      image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
      vegetarian: false,
      popular: true,
      description: 'Penne pasta tossed in a luxurious, creamy garlic-infused parmesan cream sauce and loaded with sliced pan-grilled chicken breast.'
    },
    {
      id: 'fb3',
      name: 'King Grill Burger',
      price: 269,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      vegetarian: false,
      popular: false,
      description: 'A premium double-patty chargrilled beef or chicken burger with melted cheddar, caramelized onions, crisp lettuce, and signature house sauce.'
    }
  ];

  return (
    <section id="light-bites" className="relative py-24 bg-black/40 border-t border-white/5 overflow-hidden backdrop-blur-md">
      
      {/* Background ambient gold light accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(214,175,55,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Title Block */}
        <div className="text-center mb-16" id="fast-food-header">
          <span className="text-[#A881AF] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
            Casual Indulgence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Fast Food & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">Light Bites</span>
          </h2>
          <p className="text-neutral-400 text-sm mt-4 max-w-lg mx-auto">
            Perfectly crafted, quick-served luxury staples. Every bite is an explosion of gourmet spices and texture.
          </p>
        </div>

        {/* 3-Column Premium Grid with Purple Glowing Hover States */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="fast-food-grid">
          {lightBites.map((item) => {
            return (
              <motion.div
                key={item.id}
                className="group relative bg-white/[0.03] backdrop-blur-lg border border-white/10 hover:border-[#A881AF]/60 hover:bg-white/[0.06] rounded-2xl overflow-hidden p-5 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_12px_40px_rgba(168,129,175,0.12)]"
                whileHover={{ y: -6 }}
              >
                {/* Upper Half: Picture & Tags */}
                <div>
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient fade-in inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => onDishClick(item)}
                        className="p-3 rounded-full bg-neutral-950/80 border border-white/10 text-[#D4AF37] hover:scale-110 transition-transform cursor-pointer"
                        title="View ingredients"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Pop item tag */}
                    {item.popular && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#FFF2C5] text-black font-semibold font-mono tracking-widest text-[9px] px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-black stroke-black" />
                        <span>POPULAR CHOICE</span>
                      </div>
                    )}
                  </div>

                  {/* Text Title & Copy */}
                  <div>
                    <h3 className="text-white font-serif text-lg font-bold group-hover:text-[#FFF2C5] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Half: Price and Action */}
                <div className="flex items-center justify-between border-t border-white/10 mt-6 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-500 font-mono">PRICE</span>
                    <span className="text-[#D4AF37] font-serif font-bold text-lg">₹{item.price}</span>
                  </div>

                  {/* Explore details action */}
                  <button
                    onClick={() => onDishClick(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 border border-white/10 text-white hover:border-[#A881AF]/60 hover:bg-[#A881AF]/5 cursor-pointer bg-white/5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>EXPLORE</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
