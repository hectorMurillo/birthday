import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState, useRef } from 'react';

interface IntroStageProps {
  onComplete: () => void;
  onFirstTouch?: () => void;
  partnerName: string;
}

export default function IntroStage({ onComplete, onFirstTouch, partnerName }: IntroStageProps) {
  const [progress, setProgress] = useState(0);
  const hasTouchedRef = useRef(false);

  const triggerFirstTouch = () => {
    if (!hasTouchedRef.current && onFirstTouch) {
      hasTouchedRef.current = true;
      onFirstTouch();
    }
  };

  const handleInteraction = () => {
    triggerFirstTouch();
    setProgress((prev) => {
      const next = prev + 15;
      if (next >= 100) {
        setTimeout(onComplete, 500); // small delay before transition
        return 100;
      }
      return next;
    });
  };

  const getPhrase = (p: number) => {
    if (p === 0) return "Toca el corazón para empezar";
    if (p < 30) return "¡Eso es, sigue así!";
    if (p < 60) return "No pares ahora...";
    if (p < 90) return "Falta muy poco...";
    if (p < 100) return "¡Ya casi lo tienes!";
    return "¡Perfecto!";
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full px-6 text-center select-none"
      onClick={triggerFirstTouch}
    >
      <motion.h1 
        className="font-script text-6xl text-[var(--text-brown)] mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {partnerName}
      </motion.h1>
      <motion.div
        className="h-8 mb-16 flex items-center justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <AnimatePresence mode="wait">
          <motion.p 
            key={getPhrase(progress)}
            className="text-[var(--text-brown)]/80 italic text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {getPhrase(progress)}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          handleInteraction();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mb-12 outline-none tap-highlight-transparent"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <Heart 
          size={64} 
          className="text-[var(--accent-red)]" 
          fill={progress > 0 ? "var(--accent-red)" : "transparent"} 
          strokeWidth={1.5}
        />
      </motion.button>

      <div className="w-full max-w-[280px] h-4 bg-[var(--envelope-bg)]/60 rounded-full overflow-hidden relative shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-[var(--accent-red)] to-[#F2A9B7] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      </div>
      <p className="mt-4 text-xs font-serif text-[var(--text-brown)]/60 tracking-widest">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
