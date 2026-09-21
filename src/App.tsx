import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/Navigation';
import { AudioController } from './components/AudioController';
import { CanvasScrubber } from './components/CanvasScrubber';
import { ExplodedModal } from './components/ExplodedModal';
import { HorizontalGallery } from './components/HorizontalGallery';
import { CinematicVideoSection } from './components/CinematicVideoSection';
import { EditorialManifesto } from './components/EditorialManifesto';
import { SceneFinale } from './components/SceneFinale';
import { ConciergeModal } from './components/ConciergeModal';
import { Preloader } from './components/Preloader';

import './styles/cinema.css';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  // Preloading & Experience Ready State
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [entered, setEntered] = useState(false);

  // Audio State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Cinematic Aspect Framing (2.39:1 Cinemascope)
  const [cinemascope, setCinemascope] = useState(false);

  // Active Story Scene (1 to 8)
  const [activeScene, setActiveScene] = useState(1);

  // Modals
  const [activeExplodedPart, setActiveExplodedPart] = useState<string | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });
    (window as any).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Auto-enter smoothly once frames start arriving so the user is never stuck
  useEffect(() => {
    if (isReady && !entered) {
      const timer = setTimeout(() => {
        handleEnterExperience();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isReady, entered]);

  // Refresh ScrollTrigger after entering to ensure exact scroll coordinates
  useEffect(() => {
    if (entered) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [entered]);

  const handleEnterExperience = () => {
    setEntered(true);
    // Refresh ScrollTrigger
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <div className={`relative w-full bg-[#050608] text-white min-h-screen ${cinemascope ? 'cinemascope-active' : ''}`}>
      {/* Film Grain Texture */}
      <div className="film-grain" />

      {/* Cinematic Vignette */}
      <div className="cinematic-vignette" />

      {/* Cinemascope 2.39:1 Aspect Letterbox Bars */}
      <div className="letterbox-bar-top" />
      <div className="letterbox-bar-bottom" />

      {/* Preloader */}
      {!entered && (
        <Preloader
          progress={loadProgress}
          isReady={isReady}
          onEnter={handleEnterExperience}
        />
      )}

      {/* Master Navigation */}
      <Navigation
        cinemascope={cinemascope}
        onToggleCinemascope={() => setCinemascope(!cinemascope)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        activeScene={activeScene}
      />

      {/* Soundscape Controller */}
      <AudioController
        isPlaying={isPlayingAudio}
        onToggle={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Main Interactive Scroll Story (Scenes 1 - 5) */}
      <main>
        <section id="scene-hero">
          <CanvasScrubber
            onLoaded={() => setIsReady(true)}
            onProgress={(pct) => setLoadProgress(pct)}
            onActiveSceneChange={(scene) => setActiveScene(scene)}
            onOpenExplodedModal={(partId) => setActiveExplodedPart(partId)}
          />
        </section>

        {/* Scene 6 — Horizontal Cinematic Lookbook Gallery */}
        <HorizontalGallery />

        {/* Scene 7 — Nocturne Cinéma (4K Tokyo Midnight Drive Video) */}
        <CinematicVideoSection />

        {/* Scene 8 — Brand Story & Manifesto */}
        <EditorialManifesto />

        {/* Scene 8 — Grand Finale & The Call to Action */}
        <SceneFinale onOpenConcierge={() => setIsConciergeOpen(true)} />
      </main>

      {/* Exploded Blueprint Interactive Modal */}
      <ExplodedModal
        partId={activeExplodedPart}
        onClose={() => setActiveExplodedPart(null)}
      />

      {/* VIP Concierge Booking Modal */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
};

export default App;
