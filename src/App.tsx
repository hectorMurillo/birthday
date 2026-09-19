import { useState, useRef, useEffect } from 'react';
import IntroStage from './components/IntroStage';
import MainStage from './components/MainStage';
import { PWAInstallButton } from './components/PWAInstallButton';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [stage, setStage] = useState<'intro' | 'main'>('intro');
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Force load the audio to prepare it on mount
    if (audio1Ref.current) audio1Ref.current.load();
    if (audio2Ref.current) audio2Ref.current.load();
  }, []);

  const handleFirstTouch = () => {
    // If supported, request fullscreen to hide browser bars
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Silently catch if not allowed (e.g. inside iframe)
      });
    }

    if (audio1Ref.current && audio1Ref.current.paused) {
      audio1Ref.current.volume = 1.0; 
      const playPromise = audio1Ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log('Audio1 play failed:', e));
      }
    }
  };

  const handleCompleteIntro = () => {
    setStage('main');
  };

  const handleOpenLetter = () => {
    if (audio1Ref.current) {
      audio1Ref.current.pause();
    }
    if (audio2Ref.current) {
      audio2Ref.current.volume = 1.0;
      audio2Ref.current.currentTime = 0;
      const playPromise = audio2Ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log('Audio2 play failed:', e));
      }
    }
  };

  return (
    <div className="w-full min-h-[100dvh] relative overflow-hidden bg-[var(--bg-cream)]">
      <PWAInstallButton />

      {/* Include playsInline for better mobile compatibility */}
      <audio ref={audio1Ref} src="/cancion1.mp3" loop preload="auto" playsInline />
      <audio ref={audio2Ref} src="/cancion2.mp3" loop preload="auto" playsInline />
      
      <AnimatePresence mode="wait">
        {stage === 'intro' ? (
          <motion.div key="intro" className="w-full h-full absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.8 } }}>
            <IntroStage onComplete={handleCompleteIntro} partnerName="Paola" onFirstTouch={handleFirstTouch} />
          </motion.div>
        ) : (
          <motion.div key="main" className="w-full h-full absolute inset-0 overflow-y-auto overflow-x-hidden">
            <MainStage date="27 de Septiembre" onOpenLetter={handleOpenLetter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

