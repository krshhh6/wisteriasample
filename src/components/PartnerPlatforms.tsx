import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShoppingBag, Utensils, Sparkles, Compass } from 'lucide-react';

interface PartnerPlatform {
  id: string;
  name: string;
  description: string;
  url: string;
  badge: string;
  tagline: string;
  logoColor: string;
  glowColor: string;
  icon: ReactNode;
}

export default function PartnerPlatforms() {
  const platforms: PartnerPlatform[] = [
    {
      id: 'zomato',
      name: 'Zomato',
      tagline: 'Signature Delivery & Dining Out',
      description: 'Order our iconic tandoor masterpieces directly to your doorstep or view real-time premium customer reviews and photo galleries.',
      url: 'https://www.zomato.com/patna/wisteria-cafe-kitchen-khajpura/book',
      badge: 'Deliver & Explore',
      logoColor: 'from-[#E23744] to-[#F15C62]',
      glowColor: 'rgba(226,55,68,0.15)',
      icon: <ShoppingBag className="w-5 h-5 text-white" />
    },
    {
      id: 'eazydiner',
      name: 'EazyDiner',
      tagline: 'Prime Tables & Exclusive Discounts',
      description: 'Book table coupons, earn EazyPoints, and unlock up to 50% discount deals on our luxury rooftop lounge experiences.',
      url: 'https://www.eazydiner.com/patna/wisteria-cafe-kitchen-sheikhpura-patna-696977',
      badge: 'Gourmet Privilege',
      logoColor: 'from-[#D4AF37] to-[#AA7C11]',
      glowColor: 'rgba(212,175,55,0.15)',
      icon: <Utensils className="w-5 h-5 text-white" />
    },
    {
      id: 'swiggy',
      name: 'Swiggy',
      tagline: 'Hyperlocal Lightning Fast Delivery',
      description: 'The quickest way to savor our fast food, pastas, and light bites. Packaged in custom insulated heat-retentive containers.',
      url: 'https://www.swiggy.com/restaurants/wisteria-cafe-and-kitchen-shekhpura-phulwari-sharif-patna-926887/dineout?is_retargeting=true&media_source=GoogleReserve',
      badge: 'Instant Delivery',
      logoColor: 'from-[#FC8019] to-[#FF9E4A]',
      glowColor: 'rgba(252,128,25,0.15)',
      icon: <Compass className="w-5 h-5 text-white" />
    },
    {
      id: 'district',
      name: 'District.in',
      tagline: 'Out-Of-Home Event Privilege',
      description: 'Reserve curated live entertainment entries, rooftop acoustic nights, and special curated seasonal tasting menus at Wisteria.',
      url: 'https://www.district.in/dining/patna/wisteria-cafe-kitchen-khajpura/book',
      badge: 'Events & Lounges',
      logoColor: 'from-[#EC008C] to-[#FC6767]',
      glowColor: 'rgba(236,0,140,0.15)',
      icon: <Sparkles className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section id="partners" className="relative py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Soft atmospheric background grids & lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(168,129,175,0.035)_0%,transparent,70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Title Block */}
        <div className="text-center mb-16" id="partners-header">
          <span className="text-[#D4AF37] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
            Digital Gateways
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Order & Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">Online</span>
          </h2>
          <p className="text-neutral-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Savor Wisteria's legendary culinary creations in the comfort of your home, or access premium dining benefits across our official digital hospitality partners.
          </p>
        </div>

        {/* 4-Column Luxury Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="partners-grid">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              className="group relative bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5"
              style={{
                boxShadow: `hover: 0 15px 35px ${platform.glowColor}`
              }}
              whileHover={{
                boxShadow: `0 15px 35px ${platform.glowColor}`,
                borderColor: 'rgba(255, 255, 255, 0.25)',
              }}
            >
              <div>
                {/* Badge & Decorative Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                    {platform.badge}
                  </span>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${platform.logoColor} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-6`}>
                    {platform.icon}
                  </div>
                </div>

                {/* Info Text */}
                <h3 className="text-xl font-bold text-white font-serif tracking-wide group-hover:text-[#FFF2C5] transition-colors">
                  {platform.name}
                </h3>
                <p className="text-[#D4AF37] text-[11px] font-mono tracking-wider uppercase mt-1">
                  {platform.tagline}
                </p>
                <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                  {platform.description}
                </p>
              </div>

              {/* Action Redirection Button */}
              <div className="mt-8 border-t border-white/5 pt-4">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer referrer"
                  className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/5 text-neutral-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Informational Subtext */}
        <div className="mt-12 text-center text-neutral-600 text-[10px] font-mono uppercase tracking-widest leading-relaxed max-w-md mx-auto">
          Terms & ordering policies are managed directly by each respective provider platform.
        </div>

      </div>
    </section>
  );
}
