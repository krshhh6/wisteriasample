import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation, CartItem } from '../types';
import { Calendar, Users, MapPin, Sparkles, Check, Trash2, ShieldCheck, Ticket, QrCode } from 'lucide-react';

interface BookingFormProps {
  onReservationSuccess: (res: Reservation) => void;
}

export default function BookingForm({ onReservationSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: 2,
    tableLocation: 'rooftop-edge' as Reservation['tableLocation'],
    specialRequests: ''
  });

  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const [recentTicket, setRecentTicket] = useState<Reservation | null>(null);

  // Load existing reservations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('wisteria_reservations');
    if (stored) {
      try {
        setActiveReservations(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing reservations', err);
      }
    }
  }, []);

  const handleGuestsChange = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      guests: Math.max(1, Math.min(12, prev.guests + amount))
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      return;
    }

    // Generate custom VIP reservation
    const newReservation: Reservation = {
      id: `WIS-${Math.floor(1000 + Math.random() * 9000)}-${formData.tableLocation.substring(0, 3).toUpperCase()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      tableLocation: formData.tableLocation,
      specialRequests: formData.specialRequests,
      status: 'confirmed'
    };

    const updated = [newReservation, ...activeReservations];
    setActiveReservations(updated);
    localStorage.setItem('wisteria_reservations', JSON.stringify(updated));

    setRecentTicket(newReservation);
    onReservationSuccess(newReservation);

    // Reset Form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '20:00',
      guests: 2,
      tableLocation: 'rooftop-edge',
      specialRequests: ''
    });
  };

  const handleCancelReservation = (id: string) => {
    const filtered = activeReservations.filter(res => res.id !== id);
    setActiveReservations(filtered);
    localStorage.setItem('wisteria_reservations', JSON.stringify(filtered));
    if (recentTicket?.id === id) {
      setRecentTicket(null);
    }
  };

  const tableLocations = [
    {
      id: 'rooftop-edge',
      name: 'Rooftop Edge View',
      desc: 'Panoramic city lights & open-air starry skies.',
      badge: 'Highly Premium',
      color: '#D4AF37'
    },
    {
      id: 'canopy-lounge',
      name: 'Wisteria Canopy',
      desc: 'Cozy seating nestled under backlit wisteria vines.',
      badge: 'Most Popular',
      color: '#A881AF'
    },
    {
      id: 'indoor-lounge',
      name: 'The Firepit Cozy',
      desc: 'Snug layout next to warm central stone firepits.',
      badge: 'Warm & Quiet',
      color: '#FFF2C5'
    },
    {
      id: 'sky-bar',
      name: 'High Sky Bar',
      desc: 'Elevated bar stools with dynamic cocktail mixology views.',
      badge: 'High Energy',
      color: '#ffffff'
    }
  ];

  return (
    <section id="reservations" className="relative py-24 bg-black/40 border-t border-white/5 overflow-hidden backdrop-blur-md">
      
      {/* Dynamic Backlight mapping */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(168,129,175,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Interactive Input Form (7 columns) */}
          <div className="lg:col-span-7" id="booking-form-block">
            <span className="text-[#D4AF37] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
              VIP Reservation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C5] via-[#D4AF37] to-[#A881AF]">Celestial Table</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-4 mb-10 max-w-lg">
              Unlock a premier, 6th-floor rooftop seating experience. Table placements are reserved for 2.5 hours. Pre-selected menu items will be prepared on your arrival.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.03] backdrop-blur-lg border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-neutral-600 backdrop-blur-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-neutral-600 backdrop-blur-md"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">CONTACT PHONE *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-neutral-600 backdrop-blur-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">NUMBER OF GUESTS</label>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-1.5 h-[46px] backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(-1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-300 hover:text-white transition-all cursor-pointer font-bold border border-white/5"
                    >
                      -
                    </button>
                    <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-300 hover:text-white transition-all cursor-pointer font-bold border border-white/5"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">DATE OF CELEBRATION *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none transition-all [color-scheme:dark] backdrop-blur-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">SELECT PREFERRED TIME</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all backdrop-blur-md [&>option]:bg-neutral-950"
                  >
                    <option value="17:00">5:00 PM (Sunset Hour)</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM (Prime Time)</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="23:00">11:00 PM (Late Night Sky)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Table Location (Visual Chooser) */}
              <div className="flex flex-col">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-3">SELECT THE AMBIANCE ZONE</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tableLocations.map((loc) => {
                    const isSelected = formData.tableLocation === loc.id;
                    return (
                      <div
                        key={loc.id}
                        onClick={() => setFormData(prev => ({ ...prev, tableLocation: loc.id as Reservation['tableLocation'] }))}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 backdrop-blur-md ${
                          isSelected 
                            ? 'bg-white/10 border-[#D4AF37]/50 shadow-[0_4px_15px_rgba(212,175,55,0.08)]' 
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white text-xs font-bold font-serif tracking-wide">{loc.name}</span>
                          <span 
                            className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${loc.color}15`, color: loc.color }}
                          >
                            {loc.badge}
                          </span>
                        </div>
                        <p className="text-neutral-500 text-[10px] leading-relaxed">{loc.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>



              {/* Special Requests */}
              <div className="flex flex-col">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest mb-2">DIETARY RESTRAINTS / BIRTHDAYS / REQUESTS</label>
                <textarea
                  placeholder="E.g., Vegetarian prep only, proposing to my partner, allergies to cashew nuts..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  className="bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all placeholder-neutral-600 h-24 resize-none backdrop-blur-md"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="btn-confirm-booking-form"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4CF57] to-[#AA7C11] text-black font-semibold text-xs tracking-widest uppercase shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>CONFIRM CELESTIAL RESERVATION</span>
              </button>

            </form>
          </div>

          {/* Right Block: VIP Passes Display & Tickets (5 columns) */}
          <div className="lg:col-span-5 space-y-8" id="active-reservations-block">
            
            <span className="text-[#A881AF] text-xs uppercase font-mono tracking-[0.4em] block mb-3">
              Your Tickets
            </span>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Active VIP Passes
            </h3>

            <AnimatePresence mode="popLayout">
              
              {/* Ticket 1: The Brand New Generated Ticket */}
              {recentTicket && (
                <motion.div
                  key="recent-ticket"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="relative p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* Glowing visual backdrop */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2 text-[#D4AF37]">
                      <Ticket className="w-5 h-5 animate-pulse" />
                      <span className="text-xs uppercase font-mono tracking-[0.25em] font-bold">Wisteria VIP Pass</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">Confirmed</span>
                  </div>

                  {/* Ticket Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider block">GUEST ENTRANT</span>
                        <span className="text-sm font-semibold text-white font-serif">{recentTicket.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider block">PASS CODE</span>
                        <span className="text-sm font-mono font-bold text-[#D4AF37]">{recentTicket.id}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-b border-white/10">
                      <div>
                        <span className="text-[8px] text-neutral-500 font-mono uppercase block">DATE</span>
                        <span className="text-[11px] text-white font-bold">{recentTicket.date}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-neutral-500 font-mono uppercase block">TIME</span>
                        <span className="text-[11px] text-white font-bold">{recentTicket.time}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-neutral-500 font-mono uppercase block">SEATS</span>
                        <span className="text-[11px] text-[#A881AF] font-bold">{recentTicket.guests} Guests</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#A881AF]" />
                        <div>
                          <span className="text-[8px] text-neutral-500 block uppercase font-mono">SEATING AREA</span>
                          <span className="text-[10px] text-white font-semibold">
                            {tableLocations.find(l => l.id === recentTicket.tableLocation)?.name}
                          </span>
                        </div>
                      </div>
                      {/* Interactive cancel trash */}
                      <button
                        onClick={() => handleCancelReservation(recentTicket.id)}
                        className="p-1.5 rounded-md hover:bg-red-500/10 text-neutral-600 hover:text-red-500 transition-all cursor-pointer"
                        title="Cancel reservation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* QR Code Graphic Symbol Simulation */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="text-left max-w-[150px]">
                        <span className="text-[8px] text-neutral-500 font-mono block">VIP ADMITTANCE</span>
                        <p className="text-[9px] text-neutral-400 mt-0.5 leading-normal">Show this ticket to hostesses on the 6th floor rooftop elevator lobby.</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-neutral-100 shadow-md">
                        <QrCode className="w-12 h-12 text-black" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Historic Tickets from localStorage */}
              {activeReservations.filter(r => r.id !== recentTicket?.id).map((res) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-xl flex justify-between items-center group hover:border-[#A881AF]/40 transition-all duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[#A881AF]">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#D4AF37] font-bold">{res.id}</span>
                        <span className="text-[9px] text-neutral-500">• {res.guests} Guests</span>
                      </div>
                      <h4 className="text-white text-xs font-serif font-semibold mt-1">
                        {res.date} at {res.time}
                      </h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">
                        {tableLocations.find(l => l.id === res.tableLocation)?.name}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelReservation(res.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-600 hover:text-red-500 transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
                    title="Cancel Booking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}

              {/* Empty state */}
              {activeReservations.length === 0 && !recentTicket && (
                <div className="p-8 border border-dashed border-neutral-800 rounded-2xl text-center">
                  <Ticket className="w-8 h-8 text-neutral-700 mx-auto mb-3 stroke-1" />
                  <p className="text-neutral-500 text-xs font-serif">No active bookings found on this device.</p>
                  <p className="text-neutral-600 text-[10px] mt-1">Enter your details and choose a scenic table to reserve.</p>
                </div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
