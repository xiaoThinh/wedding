"use client";

import { useEffect, useRef, useState } from "react";

interface MusicProviderProps {
  children: React.ReactNode;
}

export default function MusicProvider({ children }: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasTriedPlay, setHasTriedPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const tryPlay = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.8;
          await audioRef.current.play();
        }
        setHasTriedPlay(true);
        setIsPlaying(true);
      } catch {
        // Browser chặn autoplay, sẽ chờ tương tác user
      }
    };

    // Thử autoplay khi load lần đầu
    if (!hasTriedPlay) {
      tryPlay();
    }

    // Sau lần click/touch đầu tiên trên trang thì thử play lại
    const resumeOnInteraction = () => {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.8;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
      setHasTriedPlay(true);
      window.removeEventListener("click", resumeOnInteraction);
      window.removeEventListener("touchstart", resumeOnInteraction);
    };

    window.addEventListener("click", resumeOnInteraction);
    window.addEventListener("touchstart", resumeOnInteraction);

    return () => {
      window.removeEventListener("click", resumeOnInteraction);
      window.removeEventListener("touchstart", resumeOnInteraction);
    };
  }, [hasTriedPlay]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/i-do.mp3"
        loop
        autoPlay
        playsInline
        style={{ display: "none" }}
      />
      {/* Nút điều khiển nhạc góc dưới bên phải */}
      <button
        type="button"
        onClick={togglePlayback}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white/90 backdrop-blur shadow-lg border border-primary/20 px-4 py-2 flex items-center gap-2 text-sm font-body text-text-primary hover:bg-white hover:shadow-xl transition-all"
      >
        <span className="text-lg">{isPlaying ? "🔊" : "🔈"}</span>
        
      </button>
      {children}
    </>
  );
}
