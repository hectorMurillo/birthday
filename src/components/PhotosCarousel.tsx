import { motion, PanInfo } from 'motion/react';
import { useState } from 'react';

// We expect the user to upload their photos into the public folder named foto1.jpg, foto2.jpg, etc.
const initialPhotos = [
  { id: 7, src: "/foto7.webp", rot: 2, y: -2, phrase: "Tú y yo, siempre." },
  { id: 6, src: "/foto6.webp", rot: -4, y: 5, phrase: "Mi lugar favorito." },
  { id: 5, src: "/foto5.webp", rot: 3, y: -1, phrase: "La mejor casualidad." },
  { id: 4, src: "/foto4.webp", rot: -2, y: 8, phrase: "Me haces tan feliz." },
  { id: 3, src: "/foto8.webp", rot: 4, y: -5, phrase: "Un amor para toda la vida." },
  { id: 2, src: "/foto2.webp", rot: -3, y: 0, phrase: "Cada momento es especial." },
  { id: 1, src: "/foto1.webp", rot: -5, y: 10, phrase: "Eres mi mundo entero." },
];

export default function PhotosCarousel() {
  const [cards, setCards] = useState(initialPhotos);

  const handleDragEnd = (event: any, info: PanInfo, id: number) => {
    // Threshold to detect a swipe
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.offset.y) > swipeThreshold) {
      setCards((prev) => {
        const newCards = [...prev];
        const index = newCards.findIndex((c) => c.id === id);
        if (index !== -1) {
          // Remove the card from its current position
          const [card] = newCards.splice(index, 1);
          // Add it to the beginning of the array so it renders at the back (lowest z-index)
          newCards.unshift(card);
        }
        return newCards;
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-2">
      <div className="text-center mb-2">
        <p className="font-serif italic text-[11px] text-[var(--text-brown)]/60 tracking-widest uppercase">
          Desliza la foto
        </p>
      </div>
      <div className="relative w-full max-w-[320px] h-[450px] mx-auto flex items-center justify-center">
        {cards.map((photo, i) => {
          const isTop = i === cards.length - 1;
          return (
            <motion.div
              key={photo.id}
              className={`absolute w-64 p-3 pb-12 bg-white shadow-xl rounded-sm ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{ 
                zIndex: i,
                transformOrigin: "bottom center"
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: isTop ? 1 : 1 - (cards.length - 1 - i) * 0.05, 
                y: photo.y + (cards.length - 1 - i) * 15,
                rotate: photo.rot,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: isTop ? 0 : 0.05 }}
              drag={isTop}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => isTop && handleDragEnd(e, info, photo.id)}
              whileHover={isTop ? { scale: 1.02 } : {}}
              whileTap={isTop ? { cursor: 'grabbing' } : {}}
            >
              <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm relative pointer-events-none">
                 <img src={photo.src} alt="Memory" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40" />
              </div>
              <div className="absolute bottom-3 left-0 w-full flex justify-center space-x-2 text-[var(--text-brown)]/40 pointer-events-none">
                 <span className="text-lg font-script text-center leading-tight">{photo.phrase}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
