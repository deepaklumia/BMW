import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Zap, Gauge, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CanvasScrubberProps {
  onLoaded: () => void;
  onProgress: (pct: number) => void;
  onActiveSceneChange: (scene: number) => void;
  onOpenExplodedModal?: (partId: string) => void;
}

const TOTAL_FRAMES = 200;

export const CanvasScrubber: React.FC<CanvasScrubberProps> = ({
  onLoaded,
  onProgress,
  onActiveSceneChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameObj = useRef({ current: 0 });

  // 1. Preload all frames with robust fallback
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];
    imagesRef.current = imgs;

    let isTriggered = false;
    const markReady = () => {
      if (isTriggered) return;
      isTriggered = true;
      setImagesLoaded(true);
      onLoaded();
      renderFrame(0);
    };

    // Auto-ready safety timeout (1.5 seconds)
    const timer = setTimeout(() => {
      markReady();
    }, 1500);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.jpg`;

      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        onProgress(pct);

        if (i === 1) {
          renderFrame(0);
        }

        if (loadedCount >= 25 || loadedCount === TOTAL_FRAMES) {
          markReady();
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= 25) {
          markReady();
        }
      };

      imgs.push(img);
    }

    return () => clearTimeout(timer);
  }, []);

  // 2. Render helper with crisp aspect-ratio cover math and high-quality smoothing
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety fallback: if target frame is not ready, pick closest ready frame
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const cWidth = rect.width > 0 ? rect.width : window.innerWidth;
    const cHeight = rect.height > 0 ? rect.height : window.innerHeight;

    const targetW = Math.floor(cWidth * dpr);
    const targetH = Math.floor(cHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Object-fit: cover calculation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cWidth / cHeight;
    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = cWidth;
      renderH = cWidth / imgRatio;
      offsetX = 0;
      offsetY = (cHeight - renderH) / 2;
    } else {
      renderH = cHeight;
      renderW = cHeight * imgRatio;
      offsetX = (cWidth - renderW) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  };

  // 3. Floating particles effect for Scene 1 & 2
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedY: Math.random() * -0.6 - 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.05
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * 0.002) * p.pulse;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(0.8, p.opacity))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 4. GSAP ScrollTrigger scrub timeline
  useEffect(() => {
    if (!containerRef.current) return;

    renderFrame(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const frame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * (TOTAL_FRAMES - 1))
          );
          frameObj.current.current = frame;
          setActiveFrame(frame);
          renderFrame(frame);

          if (frame < 38) {
            onActiveSceneChange(1);
          } else if (frame < 80) {
            onActiveSceneChange(2);
          } else if (frame < 125) {
            onActiveSceneChange(3);
          } else if (frame < 165) {
            onActiveSceneChange(4);
          } else {
            onActiveSceneChange(5);
          }
        }
      });
    }, containerRef);

    const handleResize = () => {
      renderFrame(frameObj.current.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded]);

  // Derived scene text states
  const showScene1 = activeFrame >= 0 && activeFrame <= 36;
  const showScene2 = activeFrame >= 37 && activeFrame <= 78;
  const showScene3 = activeFrame >= 79 && activeFrame <= 122;
  const showScene4 = activeFrame >= 123 && activeFrame <= 162;
  const showScene5 = activeFrame >= 163;

  return (
    <div
      ref={containerRef}
      id="hero-scrub-section"
      className="relative w-full"
      style={{ height: '550vh' }}
    >
      {/* Pinned Canvas Viewport via GSAP ScrollTrigger */}
      <div
        ref={stickyRef}
        className="relative top-0 left-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Main 60 FPS Storytelling Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover select-none"
        />

        {/* Floating Particles Canvas Overlay (Scene 1 & 2) */}
        <canvas
          ref={particleCanvasRef}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            showScene1 || showScene2 ? 'opacity-100' : 'opacity-20'
          }`}
        />

        {/* Ambient Dark Gradient Overlays for Cinematic Depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/65" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/75" />

        {/* ========================================================================= */}
        {/* SCENE 1 — THE INTRODUCTION: Where Fashion Becomes Cinema */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-8 md:p-16 lg:p-24 pointer-events-none transition-all duration-700 ${
            showScene1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="editorial-tag">COLLECTION PRIVÉE • SCENE 01</span>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] tracking-[0.3em] font-syne text-white/50 block">PARIS & MUNICH</span>
              <span className="text-xs font-serif text-[#d4af37]">HAUTE COUTURE 2026</span>
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="editorial-title text-white drop-shadow-2xl mb-4">
              Where Fashion <br />
              <span className="italic font-light font-cormorant text-[#f3e5ab]">Becomes Cinema.</span>
            </h1>
            <p className="font-editorial text-xl md:text-3xl text-white/85 font-light max-w-2xl tracking-wide leading-relaxed">
              A collection crafted for the extraordinary. An editorial journey through sculpted darkness, dramatic light, and untamed elegance.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70">
                <ArrowDown className="w-4 h-4 animate-bounce text-[#d4af37]" />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase font-syne text-white/70">
                Scroll To Reveal Scenes
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-[10px] tracking-[0.2em] font-syne text-white/40 uppercase">
              <span>Chiaroscuro Spotlight</span>
              <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
              <span>Fluid Runway Motion</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 2 — EDITORIAL REVEAL: Timeless Elegance */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 flex items-center justify-end p-8 md:p-20 pointer-events-none transition-all duration-700 ${
            showScene2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-lg bg-transparent p-6 md:p-8 border-l-2 border-l-[#d4af37] drop-shadow-2xl">
            <span className="editorial-tag block mb-3 drop-shadow">SCENE 02 • EDITORIAL REVEAL</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight drop-shadow-lg">
              Timeless <br />
              <span className="italic font-light font-cormorant text-[#f3e5ab]">Elegance.</span>
            </h2>
            <p className="editorial-body text-neutral-200 mb-6 drop-shadow">
              A single silhouette emerges from the velvet darkness. Soft overhead spotlights contour every chiseled surface, blending haute-couture tailoring with sculpted kinetic grace.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15 text-xs font-syne drop-shadow">
              <div>
                <span className="text-white/60 block text-[9px] tracking-[0.2em] uppercase">Atmosphere</span>
                <span className="text-white font-semibold tracking-wider">Noir Editorial</span>
              </div>
              <div>
                <span className="text-white/60 block text-[9px] tracking-[0.2em] uppercase">Composition</span>
                <span className="text-[#d4af37] font-semibold tracking-wider">Cinematic Push-In</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 3 — MOTION SEQUENCE: Pure Full-Screen Car Motion */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-8 md:p-16 pointer-events-none transition-all duration-700 ${
            showScene3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="editorial-tag drop-shadow">SCENE 03 • MOTION SEQUENCE</span>
            <span className="text-[10px] tracking-[0.3em] font-syne text-[#00b4d8] uppercase font-bold flex items-center gap-1.5 drop-shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Parallax Velocity
            </span>
          </div>

          {/* Center area left completely clear of text cards and photos so 4K video is fully visible */}
          <div className="flex-1" />

          <div className="flex gap-4 text-xs font-syne">
            <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-white/80 flex items-center gap-2 drop-shadow">
              <Gauge className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>Multi-Layer Parallax</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-white/80 flex items-center gap-2 drop-shadow">
              <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Differential Velocity</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 4 — RUNWAY EXPERIENCE: Minimal Transparent Overlay */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 flex items-center justify-between p-8 md:p-20 pointer-events-none transition-all duration-700 ${
            showScene4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <div className="max-w-md bg-transparent p-6 md:p-8 border-l-2 border-[#00b4d8] drop-shadow-2xl">
            <span className="editorial-tag !text-[#00b4d8] block mb-2 drop-shadow">SCENE 04 • RUNWAY EXPERIENCE</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-3 drop-shadow-lg">
              The Catwalk <br />
              <span className="italic font-cormorant text-[#f3e5ab]">Of Power.</span>
            </h2>
            <p className="editorial-body text-sm mb-4 text-white/85 drop-shadow">
              Dramatic shadows, laser illumination, and frame-by-frame precision transform the asphalt into an haute-couture runway.
            </p>
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded border border-white/10 text-[11px] font-syne space-y-1 text-white/80 drop-shadow">
              <div className="flex justify-between">
                <span>Lighting Concept</span>
                <span className="text-[#00b4d8] font-bold">Chiaroscuro Lasers</span>
              </div>
              <div className="flex justify-between">
                <span>Pacing</span>
                <span className="text-white font-bold">Frame-by-Frame Scrub</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 5 — THE FINALE & CRIMSON M4 CLIMAX */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-6 md:p-16 transition-all duration-700 pointer-events-none ${
            showScene5 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="editorial-tag !text-[#ff3344]">SCENE 05 • CRIMSON M4 FINALE</span>
              <h2 className="font-serif text-2xl md:text-5xl text-white mt-1 drop-shadow-2xl">
                Sculpted <span className="italic font-cormorant text-[#f3e5ab]">Dominance.</span>
              </h2>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] tracking-[0.3em] font-syne text-white/50 block">M POWER MOTORSPORT</span>
              <span className="text-xs font-serif text-[#d4af37]">510 HORSEPOWER • COMPETITION</span>
            </div>
          </div>

          {/* Clean Viewport: No dots or text badges obstructing the car */}
          <div className="flex-1" />

          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
            <span className="text-[10px] tracking-[0.3em] uppercase font-syne text-white/60">
              Crimson Atmosphere • Tokyo Wet Stage
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.25em] font-syne text-[#d4af37] uppercase">
                Continue scrolling for Lookbook
              </span>
              <ArrowDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
