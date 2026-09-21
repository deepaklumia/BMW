import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(e => {
        console.warn('Audio autoplay blocked by browser policy:', e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
      <audio 
        ref={audioRef} 
        src="/audio/soundtrack.mp3" 
        loop 
        preload="auto" 
      />
      <button
        id="audio-toggle-btn"
        onClick={onToggle}
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
        className="glass-pill px-4 py-2.5 flex items-center gap-3 cursor-pointer text-white hover:border-[#d4af37] transition-all duration-300 shadow-2xl group"
        style={{
          background: 'rgba(10, 12, 16, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        <div className="sound-bars-wrapper">
          <div className={`sound-bar ${!isPlaying ? 'paused' : ''}`} />
          <div className={`sound-bar ${!isPlaying ? 'paused' : ''}`} />
          <div className={`sound-bar ${!isPlaying ? 'paused' : ''}`} />
          <div className={`sound-bar ${!isPlaying ? 'paused' : ''}`} />
        </div>
        
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-neutral-300 group-hover:text-[#d4af37] transition-colors">
          {isPlaying ? 'Soundtrack • Live' : 'Soundtrack • Muted'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
        )}
      </button>
    </div>
  );
};
