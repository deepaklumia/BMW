import React from 'react';
import { Award, Sparkles, Feather } from 'lucide-react';

export const EditorialManifesto: React.FC = () => {
  return (
    <section
      id="scene-manifesto"
      className="relative w-full h-screen overflow-hidden py-8 md:py-12 px-6 md:px-16 lg:px-24 bg-[#050608] text-white flex flex-col justify-center border-b border-white/10"
    >
      {/* Background Decorative Monogram & Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between h-full max-h-[90vh]">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Feather className="w-4 h-4 text-[#d4af37]" />
            <span className="editorial-tag text-xs tracking-[0.4em]">
              SCENE 08 • LE MANIFESTE DE LA CRÉATION
            </span>
          </div>
          <span className="font-mono text-xs text-white/40 tracking-widest hidden sm:inline">
            VOLUME 01 • PARIS / MUNICH
          </span>
        </div>

        {/* Headline */}
        <div className="my-auto py-2">
          <h2 className="editorial-title text-white font-normal uppercase tracking-tight leading-[0.9] text-3xl sm:text-5xl lg:text-6xl mb-3">
            Fashion is Motion. <br />
            <span className="italic font-light font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-white">
              Velocity is Art.
            </span>
          </h2>
          <p className="font-editorial italic text-base sm:text-xl lg:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed">
            "We do not design vehicles to merely move bodies across geography. We compose sculptures of light, speed, and tactile obsession that electrify the human spirit."
          </p>
        </div>

        {/* Magazine Editorial Spread Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 pt-6 border-t border-white/10 items-center">
          {/* Column 1: Philosophy */}
          <div className="md:col-span-4 space-y-3">
            <span className="editorial-tag text-[10px] text-[#d4af37] block">
              I. THE ARCHITECTURE OF DESIRE
            </span>
            <p className="editorial-body text-neutral-300 leading-relaxed text-xs sm:text-sm">
              True luxury is uncompromising coherence. The same philosophy that guides Saint Laurent’s sharpest lapel or Dior’s architectural silhouette governs every intake duct and flared arch of the BMW M4.
            </p>
            <p className="editorial-body text-neutral-400 leading-relaxed text-xs hidden sm:block">
              Each surface is tuned in acoustic wind tunnels, tested on wet mountain passes at dawn, and calibrated to feel like a bespoke second skin tailored in steel, leather, and carbon fiber.
            </p>
          </div>

          {/* Column 2: Centerpiece Couture Specimen Image */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden glass-panel border border-white/15 group shadow-2xl">
              <img
                src="/images/fashion_noir.jpg"
                alt="Editorial Couture Noir"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-center">
                <span className="text-[9px] tracking-[0.3em] font-syne uppercase text-[#d4af37] block mb-0.5">
                  Editorial Exclusive
                </span>
                <span className="font-serif text-xs text-white">
                  Haute Couture Meets S58 Twin-Turbo
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: The Four Tenets of Cinema */}
          <div className="md:col-span-4 space-y-3">
            <span className="editorial-tag text-[10px] text-[#00b4d8] block">
              II. THE PILLARS OF CINÉMA
            </span>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#d4af37]/40 transition-colors">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-syne font-bold text-[11px] uppercase text-white">
                    01 • Chiaroscuro Lighting
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Sculpting forms out of pitch darkness with dramatic focused laser beams.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#d4af37]/40 transition-colors">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-syne font-bold text-[11px] uppercase text-white">
                    02 • Tactile Sensation
                  </span>
                  <Award className="w-3.5 h-3.5 text-[#00b4d8]" />
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Perforated leather, cold anodized aluminum, and warm carbon textures.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#d4af37]/40 transition-colors">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-syne font-bold text-[11px] uppercase text-white">
                    03 • Unbroken Velocity
                  </span>
                  <span className="text-[10px] font-mono text-[#ff3344] font-bold">510 PS</span>
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed">
                  Sub-second gearshifts calibrated to synchronize with the human pulse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
