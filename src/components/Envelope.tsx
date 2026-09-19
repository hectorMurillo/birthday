import { motion } from 'motion/react';
import { getAssetUrl } from '../utils/assetUrl';

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <div className="relative w-full max-w-[340px] mx-auto mt-16 mb-24 perspective-[1000px]">
      
      {/* Letter Content (Starts hidden inside) */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-[#FFF0F2] p-8 shadow-md text-left z-0 rounded-sm overflow-hidden"
        initial={{ y: 0, opacity: 0, height: 0 }}
        animate={isOpen ? { y: -60, opacity: 1, height: 'auto', zIndex: 30, paddingBottom: 64 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ originY: 1 }}
      >
        <div className="absolute top-4 left-0 w-full flex justify-center opacity-40">
           <span>🎈 🎂 🎈</span>
        </div>
        <p className="font-playfair text-[var(--text-brown)] text-lg leading-relaxed mt-6 relative z-10">
          Hay personas que llegan<br/>
          y lo cambian todo.<br/><br/>
          Pienso que ni el destino<br/>
          escribiendo la mejor de las historias<br/>
          habría creado a alguien tan<br/>
          especial como tú.<br/><br/>
          Hoy celebro tu risa, tu luz<br/>
          y tu forma de hacerme<br/>
          sentir en casa.<br/><br/>
          Que la vida te siga mostrando<br/>
          que no hay nada más<br/>
          especial que tú.
        </p>
        <p className="font-script text-2xl mt-8 text-right text-[var(--accent-red)]">
          Te amo
        </p>

        {/* Final photo with phrase */}
        <div className="mt-12 flex flex-col items-center border-t border-[var(--text-brown)]/20 pt-8">
           <div className="w-full aspect-[3/4] bg-gray-200 rounded-sm overflow-hidden shadow-inner mb-4 relative">
              <img src={getAssetUrl('/foto1.webp')} alt="Final Memory" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10" />
           </div>
           <p className="font-playfair text-[var(--text-brown)] text-center italic text-xl">
             "Gracias por estar conmigo"
           </p>
           <p className="font-playfair text-[var(--accent-red)] text-center italic text-lg mt-2">
             Que pases feliz cumpleaños.
           </p>
        </div>

      </motion.div>

      {/* Envelope Back */}
      <div className="relative w-full h-[220px] bg-[var(--envelope-flap)] shadow-lg rounded-md z-10 overflow-hidden">
        {/* Envelope Flap (Top) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-[120px] bg-[var(--envelope-bg)] origin-top z-30 drop-shadow-md"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Envelope Bottom Flap */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[140px] bg-[#E6BCC2] z-20"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
        />
        
        {/* Envelope Left/Right Flaps */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#EFC6CB] z-10"
          style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%, 100% 100%, 100% 0)' }}
        />
      </div>

      {/* Wax Seal & Instruction */}
      {!isOpen && (
        <motion.div 
          className="absolute top-[90px] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center cursor-pointer"
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="relative w-16 h-16 bg-gradient-to-br from-[var(--accent-red)] to-[#C55A6E] rounded-full shadow-md flex items-center justify-center border-2 border-[var(--text-brown)]/20">
            <span className="font-playfair text-white/90 italic text-xs tracking-wider">Descúbrelo</span>
            
            {/* Click Hand Animation */}
            <motion.div 
              className="absolute -bottom-6 -right-6 text-white drop-shadow-md w-12 h-12"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 0.9, 1]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <svg viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11.5V3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3V9.5" />
                <path d="M11 9.5V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V9.5" />
                <path d="M13 9.5V7.5C13 6.94772 13.4477 6.5 14 6.5C14.5523 6.5 15 6.94772 15 7.5V11" />
                <path d="M15 11.5V10.5C15 9.94772 15.4477 9.5 16 9.5C16.5523 9.5 17 9.94772 17 10.5V14.5C17 17.5376 14.5376 20 11.5 20H10C7.79086 20 6 18.2091 6 16V13L7.5 11.5L9 11.5" />
              </svg>
            </motion.div>
          </div>
          
          <p className="mt-8 font-serif italic text-sm text-[var(--text-brown)]/70">
            Hay algo dentro para ti
          </p>
        </motion.div>
      )}

      {/* Footer Text */}
      <div className="absolute -bottom-16 left-0 w-full text-center">
        <p className="font-serif text-[10px] tracking-[0.2em] text-[var(--text-brown)]/40 uppercase">
          Hecho con amor
        </p>
      </div>
    </div>
  );
}
