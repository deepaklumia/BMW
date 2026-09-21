import React, { useState, useEffect } from 'react';
import { Film, Sparkles } from 'lucide-react';

interface NavigationProps {
  cinemascope: boolean;
  onToggleCinemascope: () => void;
  onOpenConcierge: () => void;
  activeScene: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  cinemascope,
  onToggleCinemascope,
  onOpenConcierge,
  activeScene
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPct = (winScroll / height) * 100;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(scrolledPct))));
      setScrolled(winScroll > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#050608]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-black/80 group-hover:border-[#d4af37] transition-all">
              <span className="font-cinzel text-xs font-bold text-[#d4af37]">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-sm md:text-base tracking-[0.35em] text-white font-semibold">
                HAUTE VITESSE
              </span>
              <span className="text-[8px] tracking-[0.3em] text-[#d4af37] uppercase font-syne -mt-0.5">
                Cinéma De L'Automobile
              </span>
            </div>
          </div>

          {/* Quick Scene Jump (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase font-syne text-white/50">
            {[
              { id: 'scene-hero', label: '01 Genesis' },
              { id: 'scene-gallery', label: '02 Lookbook' },
              { id: 'scene-cinema', label: '03 Cinéma' },
              { id: 'scene-manifesto', label: '04 Manifesto' },
              { id: 'scene-finale', label: '05 Finale' }
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors py-1 hover:text-[#d4af37] ${
                  activeScene === idx + 1 ? 'text-[#d4af37] font-bold border-b border-[#d4af37]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls & Actions */}
          <div className="flex items-center gap-4">
            {/* Cinemascope Toggle */}
            <button
              id="cinemascope-toggle"
              onClick={onToggleCinemascope}
              title="Toggle 2.39:1 Cinemascope Framing"
              className={`px-3 py-1.5 rounded text-[10px] tracking-[0.2em] uppercase font-syne flex items-center gap-1.5 transition-all cursor-pointer ${
                cinemascope
                  ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37]'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30'
              }`}
            >
              <Film className="w-3 h-3" />
              <span className="hidden sm:inline">2.39:1 Frame</span>
            </button>

            {/* VIP Concierge Button */}
            <button
              id="nav-concierge-btn"
              onClick={onOpenConcierge}
              className="btn-outline-luxury text-[10px] !py-2 !px-4 tracking-[0.25em] flex items-center gap-2 cursor-pointer hover:border-[#d4af37]"
            >
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>VIP Atelier</span>
            </button>
          </div>
        </div>

        {/* Global Minimal Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-transparent via-[#d4af37] to-[#00b4d8] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Vertical Fixed Scene Indicator (Left Edge) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] font-syne text-white/40 uppercase rotate-180 [writing-mode:vertical-lr]">
          SCENE 0{activeScene} / 08
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-[#d4af37] transition-all duration-300"
            style={{ height: `${(activeScene / 8) * 100}%` }}
          />
        </div>
        <span className="text-[9px] font-syne text-[#d4af37] tracking-wider">
          {scrollProgress}%
        </span>
      </div>
    </>
  );
};
