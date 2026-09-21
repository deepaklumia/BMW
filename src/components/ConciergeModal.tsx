import React, { useState } from 'react';
import { X, Sparkles, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Paris');
  const [interest, setInterest] = useState('Coupe Competition');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffffff', '#00b4d8']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <div 
        className="relative w-full max-w-lg bg-[#0a0c10] border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl"
        style={{
          boxShadow: '0 30px 80px -20px rgba(0,0,0,1), 0 0 50px rgba(212,175,55,0.2)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <span className="editorial-tag text-xs text-[#d4af37] block">
              INVITATION CONFIRMED
            </span>
            <h3 className="font-serif text-3xl text-white">
              Merci, {name || 'Cher Client'}.
            </h3>
            <p className="font-cormorant italic text-lg text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your private dossier has been received. Our VIP Concierge at the {city} Atelier will contact you within 24 hours.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-gold-shimmer w-full"
              >
                Return To Film
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="editorial-tag text-[10px] text-[#d4af37]">
                PRIVATE ATELIER CONSULTATION
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
              Request Your Audience.
            </h3>
            <p className="font-editorial italic text-sm sm:text-base text-neutral-400 mb-6 leading-relaxed">
              Experience the bespoke materials, personalized dynamic setup, and high-fashion craftsmanship of the BMW M Collection.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-syne tracking-widest uppercase text-white/60 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jean-Luc Delacroix"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#d4af37] font-sans transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-syne tracking-widest uppercase text-white/60 mb-1.5">
                  Private Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#d4af37] font-sans transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-syne tracking-widest uppercase text-white/60 mb-1.5">
                    Preferred Atelier
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0d0f14] border border-white/10 rounded-lg text-white text-xs font-syne focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Paris">Paris • Vendôme</option>
                    <option value="Milan">Milan • Monte Napoleone</option>
                    <option value="Munich">Munich • M Headquarters</option>
                    <option value="London">London • Mayfair</option>
                    <option value="New York">New York • Madison Ave</option>
                    <option value="Tokyo">Tokyo • Ginza</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-syne tracking-widest uppercase text-white/60 mb-1.5">
                    Model Interest
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0d0f14] border border-white/10 rounded-lg text-white text-xs font-syne focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Coupe Competition">M4 Coupé Competition</option>
                    <option value="Couture Atelier Edition">Couture Atelier Bespoke</option>
                    <option value="M Carbon Track Package">M Carbon Track Spec</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-gold-shimmer w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Invitation Request</span>
                </button>
              </div>

              <p className="text-[10px] font-syne text-white/40 text-center tracking-wider pt-2">
                Discretion guaranteed. No solicitation.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
