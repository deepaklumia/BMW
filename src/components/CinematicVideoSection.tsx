import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX, Compass, Zap, Gauge, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NOCTURNE_TOTAL_FRAMES = 200;

export const CinematicVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeFrame, setActiveFrame] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameObj = useRef({ current: 0 });

  // 1. Preload 200 high-res frames for silky 60 FPS scrubbing
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    imagesRef.current = imgs;

    for (let i = 1; i <= NOCTURNE_TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames_nocturne/frame_${numStr}.jpg`;

      if (i === 1) {
        img.onload = () => {
          renderFrame(0);
        };
      }
      imgs.push(img);
    }
  }, []);

  // 2. High-DPR Cover Canvas Render with Bicubic Smoothing
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < NOCTURNE_TOTAL_FRAMES; offset++) {
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

  // 3. GSAP ScrollTrigger Scrub Timeline
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

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
            NOCTURNE_TOTAL_FRAMES - 1,
            Math.floor(self.progress * (NOCTURNE_TOTAL_FRAMES - 1))
          );
          frameObj.current.current = frame;
          setActiveFrame(frame);
          renderFrame(frame);
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
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsAudioPlaying(true);
    }
  };

  // 4 Story Phases through the 200 frames:
  // Phase 1: 0 - 58 (Tokyo Rain City Drive)
  // Phase 2: 59 - 105 (360 Metropolis Drift)
  // Phase 3: 106 - 155 (Exploded CAD Laser Blueprint)
  // Phase 4: 156 - 199 (Twin-Turbo S58 Engine)
  const isPhase1 = activeFrame >= 0 && activeFrame <= 58;
  const isPhase2 = activeFrame >= 59 && activeFrame <= 105;
  const isPhase3 = activeFrame >= 106 && activeFrame <= 155;
  const isPhase4 = activeFrame >= 156;

  const scrollPct = Math.round((activeFrame / (NOCTURNE_TOTAL_FRAMES - 1)) * 100);

  return (
    <div
      ref={containerRef}
      id="scene-cinema"
      className="relative w-full"
      style={{ height: '500vh' }}
    >
      {/* Hidden Audio Element with Authentic S58 Engine Acoustics */}
      <audio
        ref={audioRef}
        src="/videos/nocturne_drive.mp4"
        loop
        playsInline
      />

      {/* 100vw x 100vh Pinned Fullscreen Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-screen h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Full-bleed 60 FPS Storytelling Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover select-none"
        />

        {/* Ambient Vignette Gradients for Luxury Film Depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/60" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/75" />

        {/* Top Header HUD */}
        <div className="absolute top-6 md:top-10 left-6 md:left-14 right-6 md:right-14 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00b4d8] animate-pulse" />
            <span className="text-[10px] md:text-xs tracking-[0.35em] font-syne uppercase text-white/90">
              SCENE 07 • NOCTURNE CINÉMA
            </span>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-white/80">
              <Compass className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>TOKYO C1 SHUTO • 03:42 AM</span>
            </div>

            <button
              onClick={toggleAudio}
              className="px-4 py-2 rounded-full bg-black/70 hover:bg-[#00b4d8] hover:text-black border border-white/20 text-white text-[10px] tracking-widest uppercase font-syne flex items-center gap-2 transition-all shadow-xl cursor-pointer backdrop-blur-md"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>S58 Audio: Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#00b4d8]" />
                  <span>Unmute S58 Roar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PHASE 1: Tokyo Rain • Midnight Velocity (0 - 30%) */}
        {/* ===================================================================== */}
        <div
          className={`absolute inset-x-6 md:inset-x-14 bottom-14 md:bottom-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none transition-all duration-700 ${
            isPhase1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="editorial-tag !text-[#00b4d8] block mb-2">ACT I • THE SHINJUKU CANYONS</span>
            <h2 className="editorial-title text-white text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-3">
              Tokyo Rain. <br />
              <span className="italic font-light font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#00b4d8] via-white to-[#d4af37]">
                Raw Velocity.
              </span>
            </h2>
            <p className="font-editorial text-lg md:text-2xl text-white/85 font-light leading-relaxed">
              Cruising through rain-slicked canyons at 3:00 AM. 510 horsepower channeled through M xDrive, painting light trails across wet asphalt.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[10px] text-white/70 bg-black/60 p-4 rounded-xl border border-white/15 backdrop-blur-md">
            <div className="flex justify-between gap-6">
              <span>ATMOSPHERE</span>
              <span className="text-[#00b4d8] font-bold">Rain 98% • Wet Asphalt</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>DRIVETRAIN</span>
              <span className="text-white font-bold">M xDrive 4WD Sport</span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PHASE 2: 360° Metropolis Choreography (30 - 55%) */}
        {/* ===================================================================== */}
        <div
          className={`absolute inset-x-6 md:inset-x-14 bottom-14 md:bottom-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none transition-all duration-700 ${
            isPhase2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="editorial-tag !text-[#d4af37] block mb-2">ACT II • ROTATIONAL DYNAMICS</span>
            <h2 className="editorial-title text-white text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-3">
              Choreography <br />
              <span className="italic font-light font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-white">
                Of Shadow.
              </span>
            </h2>
            <p className="font-editorial text-lg md:text-2xl text-white/85 font-light leading-relaxed">
              Full 360-degree rotational drift. Active M Differential calibrates millisecond torque transfer to hold the perfect slip angle.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/60 px-5 py-3 rounded-xl border border-white/15 backdrop-blur-md">
            <Zap className="w-5 h-5 text-[#d4af37]" />
            <div className="text-left">
              <span className="text-[9px] font-syne uppercase tracking-widest text-[#d4af37] block">Lateral G-Force</span>
              <span className="font-mono text-sm font-bold text-white">1.24 G Slip Angle</span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PHASE 3: Laser CAD Blueprint (55 - 80%) */}
        {/* ===================================================================== */}
        <div
          className={`absolute inset-x-6 md:inset-x-14 bottom-14 md:bottom-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none transition-all duration-700 ${
            isPhase3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="editorial-tag !text-[#ff3344] block mb-2">ACT III • LASER CAD BLUEPRINT</span>
            <h2 className="editorial-title text-white text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-3">
              Deconstructed <br />
              <span className="italic font-light font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#ff3344] via-white to-[#00b4d8]">
                Anatomy.
              </span>
            </h2>
            <p className="font-editorial text-lg md:text-2xl text-white/85 font-light leading-relaxed">
              Volumetric red laser scans expose the inner engineering. Suspension geometry, carbon monocoque, and active aero dampers laid bare.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[10px] text-white/70 bg-black/60 p-4 rounded-xl border border-white/15 backdrop-blur-md">
            <div className="flex justify-between gap-6">
              <span>SCAN TELEMETRY</span>
              <span className="text-[#ff3344] font-bold">128-Beam Optical LiDAR</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>TORSIONAL RIGIDITY</span>
              <span className="text-white font-bold">42,000 Nm/deg</span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PHASE 4: Twin-Turbo S58 Heart (80 - 100%) */}
        {/* ===================================================================== */}
        <div
          className={`absolute inset-x-6 md:inset-x-14 bottom-14 md:bottom-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none transition-all duration-700 ${
            isPhase4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <span className="editorial-tag !text-[#d4af37] block mb-2">ACT IV • THE POWERPLANT</span>
            <h2 className="editorial-title text-white text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-3">
              The Mechanical <br />
              <span className="italic font-light font-cormorant text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-white">
                Heart.
              </span>
            </h2>
            <p className="font-editorial text-lg md:text-2xl text-white/85 font-light leading-relaxed">
              S58 3.0L Twin-Turbo Inline-6. Dual mono-scroll turbochargers spooling to 180,000 RPM with laser-illuminated intake induction.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/60 px-5 py-3 rounded-xl border border-white/15 backdrop-blur-md">
            <Gauge className="w-5 h-5 text-[#ff3344]" />
            <div className="text-left">
              <span className="text-[9px] font-syne uppercase tracking-widest text-[#d4af37] block">Peak Output</span>
              <span className="font-mono text-sm font-bold text-white">510 HP • 650 Nm • 7,200 RPM</span>
            </div>
          </div>
        </div>

        {/* Bottom Corner Scroll Progress */}
        <div className="absolute bottom-6 left-6 md:left-14 right-6 md:right-14 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/50">{scrollPct}% SCROLL PROGRESS</span>
            <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00b4d8] to-[#d4af37] transition-all duration-100"
                style={{ width: `${scrollPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-syne uppercase text-white/60">
            <span>Scroll to traverse timeline</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#d4af37] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
