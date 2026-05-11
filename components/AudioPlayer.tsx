import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only works due to user interaction tracking
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;

    const handleFirstInteraction = () => {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(() => {});
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setShowPrompt(false);
    }
  };

  return (
    <>
      {showPrompt && (
         <div className="fixed bottom-20 right-6 z-50 bg-[#FFFDF7] px-3 py-1 scrapbook-card text-sm font-handwritten text-[#3D2B1F] animate-bounce">
            Tap to play ♫
         </div>
      )}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#E8A0A0] hover:bg-[#FFFDF7]/80 transition-colors shadow-lg"
        aria-label="Toggle music"
      >
        {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current translate-x-[1px]" />}
      </button>
    </>
  );
}
