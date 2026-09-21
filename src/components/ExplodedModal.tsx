import React from 'react';
import { X, Sparkles, Shield, Flame, Wind, Cpu } from 'lucide-react';

interface ExplodedModalProps {
  partId: string | null;
  onClose: () => void;
}

interface PartDetail {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  icon: React.ReactNode;
}

const PARTS_DATA: Record<string, PartDetail> = {
  aero: {
    title: "Carbon Aerodynamic Splitter & Kidney Grille",
    subtitle: "L'Aérodynamisme de Précision",
    category: "Composite Tailoring",
    description: "Form follows aggression. Autoclaved dry carbon weave channeled through CFD supercomputer simulations to generate 140kg of high-speed downforce while feeding cryogenic cooling air to twin oil radiators.",
    specs: [
      { label: "Material Weave", value: "3K Toray Carbon Pre-Preg" },
      { label: "Downforce", value: "140 kg @ 250 km/h" },
      { label: "Finish", value: "Obsidian High-Gloss Lacquer" }
    ],
    image: "/images/neon_street.jpg",
    icon: <Wind className="w-5 h-5 text-[#00b4d8]" />
  },
  brakes: {
    title: "M Carbon Ceramic High-Deceleration System",
    subtitle: "La Puissance du Freinage",
    category: "Thermal Metallurgy",
    description: "Massive 395mm front carbon-silicon carbide discs clenched by 6-piston fixed monobloc calipers finished in Gold M metallic paint. Resists brake fade beyond 1,000° Celsius under track demands.",
    specs: [
      { label: "Disc Diameter", value: "395 mm Front / 380 mm Rear" },
      { label: "Weight Savings", value: "-14.5 kg Unsprung Mass" },
      { label: "Max Operating Temp", value: "1,050° C Fade Resistant" }
    ],
    image: "/images/exploded_cad.jpg",
    icon: <Shield className="w-5 h-5 text-[#d4af37]" />
  },
  engine: {
    title: "S58 3.0L M TwinPower Turbo Powerplant",
    subtitle: "Le Cœur Mécanique",
    category: "High-Revving Heart",
    description: "A closed-deck crankcase with forged crankshaft and wire-arc sprayed cylinder liners. Twin mono-scroll turbochargers force air into an indirect liquid intercooler, producing instant response to a 7,200 RPM redline.",
    specs: [
      { label: "Peak Power", value: "510 Horsepower (375 kW)" },
      { label: "Torque Peak", value: "650 Nm (2,750 - 5,500 RPM)" },
      { label: "Engine Redline", value: "7,200 RPM" }
    ],
    image: "/images/twin_turbo.jpg",
    icon: <Flame className="w-5 h-5 text-[#ff3344]" />
  },
  chassis: {
    title: "Carbon Fiber Reinforced Plastic (CFRP) Architecture",
    subtitle: "Le Monocoque Allégé",
    category: "Structural Couture",
    description: "An ultra-rigid carbon roof lowers the center of gravity by 8.5mm, paired with aluminum shear panels and aluminum strut braces across the engine bay for laser-sharp steering feedback.",
    specs: [
      { label: "Weight Reduction", value: "CFRP Roof saves 6.2 kg at highest point" },
      { label: "Torsional Rigidity", value: "32,000 Nm/degree" },
      { label: "Weight Distribution", value: "Perfect 50:50 Front/Rear" }
    ],
    image: "/images/drift_warehouse.jpg",
    icon: <Cpu className="w-5 h-5 text-[#d4af37]" />
  }
};

export const ExplodedModal: React.FC<ExplodedModalProps> = ({ partId, onClose }) => {
  if (!partId || !PARTS_DATA[partId]) return null;
  const part = PARTS_DATA[partId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0b0d12] border border-white/15 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            {part.icon}
          </div>
          <div>
            <span className="editorial-tag text-[9px] block text-[#d4af37]">
              {part.category}
            </span>
            <span className="font-cormorant italic text-sm text-neutral-400">
              {part.subtitle}
            </span>
          </div>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
          {part.title}
        </h3>

        <p className="editorial-body text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
          {part.description}
        </p>

        {/* Preview image */}
        <div className="w-full h-44 rounded-lg overflow-hidden relative mb-6 border border-white/10">
          <img
            src={part.image}
            alt={part.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] tracking-widest font-syne uppercase text-white/80">
              Couture Engineering Specimen
            </span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {part.specs.map((spec, idx) => (
            <div key={idx} className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-[9px] tracking-widest font-syne uppercase text-white/40 block mb-1">
                {spec.label}
              </span>
              <span className="font-syne text-xs sm:text-sm font-semibold text-white">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-white/10 hover:bg-[#d4af37] hover:text-black border border-white/10 transition-all duration-300 font-syne text-xs tracking-widest uppercase font-bold rounded cursor-pointer"
        >
          Return To Blueprint
        </button>
      </div>
    </div>
  );
};
