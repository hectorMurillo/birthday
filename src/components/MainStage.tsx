import { motion } from 'motion/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import PhotosCarousel from './PhotosCarousel';
import Envelope from './Envelope';

interface MainStageProps {
  date: string;
  onOpenLetter?: () => void;
}

export default function MainStage({ date, onOpenLetter }: MainStageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpenLetter) onOpenLetter();
    
    // Fire confetti after envelope opens
    setTimeout(() => {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['var(--accent-red)', 'var(--accent-red)', 'var(--envelope-bg)', 'var(--text-brown)']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['var(--accent-red)', 'var(--accent-red)', 'var(--envelope-bg)', 'var(--text-brown)']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 600);
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-h-[100dvh] w-full pt-6 pb-24 px-4 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center mb-6">
        <h2 className="font-playfair text-2xl italic text-[var(--text-brown)] mb-2 font-medium">
          Hoy es el cumpleaños<br />de mi persona favorita
        </h2>
        <p className="font-serif text-sm tracking-widest text-[var(--text-brown)]/70 uppercase">
          {date}
        </p>
      </div>

      <PhotosCarousel />

      <motion.div 
        className="w-8 h-px bg-[var(--text-brown)]/30 my-6"
        initial={{ width: 0 }}
        animate={{ width: 32 }}
      />

      <Envelope isOpen={isOpen} onOpen={handleOpen} />

    </motion.div>
  );
}
