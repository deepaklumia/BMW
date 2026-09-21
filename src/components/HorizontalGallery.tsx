import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  specs: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "01",
    category: "VOGUE PARIS • HAUTE COUTURE",
    title: "L'Élégance Noire",
    subtitle: "Chiseled Tailoring x Obsidian Carbon",
    season: "Collection Automne-Hiver",
    image: "/images/fashion_noir.jpg",
    specs: "Bespoke Silk Tuxedo & Aerodynamic Silhouette"
  },
  {
    id: "02",
    category: "M POWER CINEMA",
    title: "Midnight Velocity",
    subtitle: "Reflections in Rain-Slicked Tokyo",
    season: "Track & Metropolis",
    image: "/images/neon_street.jpg",
    specs: "Adaptive M Laserlight • 650m Penetration"
  },
  {
    id: "03",
    category: "MILAN FASHION WEEK",
    title: "Draped Avant-Garde",
    subtitle: "Sculptural Silver Metallic Gown",
    season: "Runway Specimen 03",
    image: "/images/fashion_runway.jpg",
    specs: "Fluid Metallic Fabric Mimicking Airflow Dynamics"
  },
  {
    id: "04",
    category: "DRIFT & DYNAMICS",
    title: "Asphalt Choreography",
    subtitle: "Industrial Warehouse Ballet",
    season: "Performance Series",
    image: "/images/drift_warehouse.jpg",
    specs: "Active M Differential • 510 PS Competition"
  },
  {
    id: "05",
    category: "INTERIOR ATELIER",
    title: "Sensory Cockpit",
    subtitle: "Perforated Italian Nappa & Carbon Fiber",
    season: "Bespoke Individual",
    image: "/images/fashion_detail.jpg",
    specs: "Hand-Stitched Leather with M Tri-Color Thread"
  }
];

export const HorizontalGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="scene-gallery"
      className="relative w-full h-screen overflow-hidden bg-[#07080b] border-t border-b border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute top-10 left-12 z-20 pointer-events-none">
        <span className="editorial-tag text-[10px] text-[#d4af37] block">
          SCENE 06 • THE CINEMATIC LOOKBOOK
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-white mt-1">
          Horizontal <span className="italic font-cormorant text-[#f3e5ab]">Panorama.</span>
        </h2>
      </div>

      {/* Horizontal Sliding Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full pl-12 md:pl-28 pr-32 gap-10 md:gap-16 pt-16 will-change-transform"
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group relative flex-shrink-0 w-[80vw] sm:w-[500px] md:w-[620px] h-[72vh] rounded-xl overflow-hidden glass-panel border border-white/10 transition-all duration-500 hover:border-[#d4af37]/60"
            style={{
              boxShadow: '0 30px 70px -20px rgba(0,0,0,0.8)'
            }}
          >
            {/* Image */}
            <div className="w-full h-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

            {/* Top Film Strip Header */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-[10px] font-syne tracking-widest text-white/60">
              <span className="glass-pill px-3 py-1 uppercase border border-white/10 bg-black/50">
                {item.category}
              </span>
              <span className="font-mono text-white/40">SCENE #{item.id} / 05</span>
            </div>

            {/* Bottom Content Card */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] tracking-[0.25em] font-syne text-[#d4af37] uppercase block mb-1">
                {item.season}
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="font-cormorant italic text-lg md:text-xl text-neutral-300 mb-3">
                {item.subtitle}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-syne text-white/60">
                <span className="truncate pr-4 text-[11px]">{item.specs}</span>
                <span className="flex items-center gap-1 text-[#d4af37] text-[10px] tracking-wider uppercase whitespace-nowrap group-hover:translate-x-1 transition-transform">
                  Examine <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Bottom Instruction */}
      <div className="absolute bottom-6 right-12 z-20 pointer-events-none hidden sm:flex items-center gap-3 text-[10px] tracking-[0.25em] font-syne text-white/40 uppercase">
        <span>Scroll vertically to traverse cinema reel</span>
        <div className="w-8 h-[1px] bg-white/30" />
      </div>
    </div>
  );
};
