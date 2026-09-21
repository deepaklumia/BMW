import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SceneFinaleProps {
  onOpenConcierge: () => void;
}

export const SceneFinale: React.FC<SceneFinaleProps> = ({ onOpenConcierge }) => {
  const [activeSpecTab, setActiveSpecTab] = useState<'competition' | 'couture'>('competition');

  const triggerDiscovery = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#d4af37', '#ffffff', '#00b4d8', '#ff3344']
    });
    onOpenConcierge();
  };

  return (
    <section
      id="scene-finale"
      className="relative w-full h-screen overflow-hidden py-8 md:py-12 px-6 md:px-16 lg:px-24 bg-[#030406] text-white flex flex-col justify-between"
    >
      {/* Cinematic Finale Collage Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className="overflow-hidden rounded-lg">
          <img src="/images/drift_warehouse.jpg" alt="Finale 1" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img src="/images/fashion_runway.jpg" alt="Finale 2" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img src="/images/neon_street.jpg" alt="Finale 3" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="overflow-hidden rounded-lg">
          <img src="/images/fashion_detail.jpg" alt="Finale 4" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030406] via-[#030406]/90 to-[#030406]/70 pointer-events-none" />

      {/* Top Tag */}
      <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/60">
            <span className="font-cinzel text-[10px] font-bold text-[#d4af37]">M</span>
          </div>
          <span className="editorial-tag text-xs tracking-[0.4em] text-[#d4af37]">
            SCENE 09 • LE GRAND FINAL
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40 tracking-widest hidden sm:inline">
          HAUTE COUTURE AUTOMOBILE
        </span>
      </div>

      {/* Main Content (Centered) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto py-2">
        <h2 className="editorial-title text-white mb-2 uppercase text-3xl sm:text-5xl lg:text-6xl">
          An Icon For The <br />
          <span className="italic font-cormorant font-light text-[#f3e5ab]">Unapologetic.</span>
        </h2>

        <p className="font-editorial italic text-base sm:text-lg lg:text-xl text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed font-light">
          Your invitation to witness the convergence of Haute Couture fashion and peak motorsport engineering in person.
        </p>

        {/* Spec Comparison Pills */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <button
            onClick={() => setActiveSpecTab('competition')}
            className={`px-5 py-1.5 rounded-full text-xs font-syne tracking-widest uppercase transition-all cursor-pointer ${
              activeSpecTab === 'competition'
                ? 'bg-[#d4af37] text-black font-bold shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            M4 Competition
          </button>
          <button
            onClick={() => setActiveSpecTab('couture')}
            className={`px-5 py-1.5 rounded-full text-xs font-syne tracking-widest uppercase transition-all cursor-pointer ${
              activeSpecTab === 'couture'
                ? 'bg-[#d4af37] text-black font-bold shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Couture Atelier Edition
          </button>
        </div>

        {/* Interactive Highlight Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mb-8">
          {activeSpecTab === 'competition' ? (
            <>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">0-100 KM/H</span>
                <span className="font-syne text-lg md:text-xl font-bold text-white">3.4 SEC</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">OUTPUT</span>
                <span className="font-syne text-lg md:text-xl font-bold text-[#d4af37]">510 HP</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">TORQUE</span>
                <span className="font-syne text-lg md:text-xl font-bold text-white">650 NM</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">TOP SPEED</span>
                <span className="font-syne text-lg md:text-xl font-bold text-[#00b4d8]">290 KM/H</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">LEATHER</span>
                <span className="font-syne text-sm md:text-base font-bold text-white">Merino Nappa</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">TRIM</span>
                <span className="font-syne text-sm md:text-base font-bold text-[#d4af37]">High Carbon</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">SOUND</span>
                <span className="font-syne text-sm md:text-base font-bold text-white">464W Studio</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[9px] tracking-widest font-syne text-white/40 uppercase block mb-0.5">PAINT</span>
                <span className="font-syne text-sm md:text-base font-bold text-[#00b4d8]">Frozen White</span>
              </div>
            </>
          )}
        </div>

        {/* Primary Call To Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            id="discover-collection-btn"
            onClick={triggerDiscovery}
            className="btn-gold-shimmer flex items-center gap-2 cursor-pointer py-3 px-7 text-xs font-syne"
          >
            <span>Discover The Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={onOpenConcierge}
            className="btn-outline-luxury flex items-center gap-2 cursor-pointer py-3 px-6 text-xs font-syne"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Private Atelier Consultation</span>
          </button>
        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="relative z-10 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-syne tracking-widest text-white/40 uppercase">
        <div className="flex items-center gap-4">
          <span className="text-white">HAUTE VITESSE • M</span>
          <span>© 2026 BMW M CINÉMATIQUE CAMPAIGN</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">Couture Lookbook</span>
          <span className="hover:text-white transition-colors cursor-pointer">Technical Specs</span>
          <span className="hover:text-white transition-colors cursor-pointer">Legal & Privacy</span>
        </div>
      </footer>
    </section>
  );
};
