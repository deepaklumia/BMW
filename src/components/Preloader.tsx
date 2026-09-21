import React from 'react';
import { Film, Sparkles } from 'lucide-react';

interface PreloaderProps {
  progress: number;
  isReady: boolean;
  onEnter: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isReady, onEnter }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#050608] flex flex-col items-center justify-between p-10 text-white select-none transition-opacity duration-700">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
        <span className="text-[10px] tracking-[0.35em] font-syne uppercase text-white/50">
          BMW M • HAUTE COUTURE CAMPAIGN
        </span>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center max-w-md w-full">
        {/* Monogram */}
        <div className="w-20 h-20 rounded-full border border-[#d4af37]/40 flex items-center justify-center mb-8 bg-black/60 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
          <span className="font-cinzel text-2xl font-bold text-[#d4af37]">M</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl tracking-[0.25em] text-white uppercase font-light mb-3">
          HAUTE VITESSE
        </h1>
        <p className="font-cormorant italic text-lg text-neutral-300 mb-10">
          Where Fashion Becomes Cinema.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden mb-4 relative">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between w-full text-[10px] font-mono tracking-widest text-white/50 mb-8">
          <span>FRAME CACHE</span>
          <span className="text-[#d4af37] font-bold">{progress}%</span>
        </div>

        {/* Enter Button when ready */}
        {isReady || progress >= 25 ? (
          <div className="w-full space-y-2">
            <button
              id="enter-experience-btn"
              onClick={onEnter}
              className="btn-gold-shimmer w-full flex items-center justify-center gap-2 cursor-pointer shadow-2xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter The Cinematic Experience</span>
            </button>
            {progress < 100 && (
              <span className="text-[9px] font-syne tracking-widest text-white/40 block text-center uppercase">
                {progress}% cached • Streaming remainder in background
              </span>
            )}
          </div>
        ) : (
          <div className="text-[11px] font-syne tracking-widest uppercase text-white/40 flex items-center gap-2">
            <Film className="w-3.5 h-3.5 animate-spin" />
            <span>Preloading Visual Stream...</span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-[9px] tracking-[0.3em] font-syne uppercase text-white/30 text-center">
        4K Master Footage • Scroll-Driven Dynamic Storytelling
      </div>
    </div>
  );
};
