import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAssetUrl } from '../utils/assetUrl';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside standalone app mode, don't show the button
  if (isInstalled) {
    return null;
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        {isInstallable ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={install}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-[#E27B8E]/30 rounded-full shadow-sm text-xs font-serif text-[var(--text-brown)] hover:bg-white transition-colors"
          >
            <Download size={14} className="text-[var(--accent-red)]" />
            <span>Abrir como App</span>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-[#E27B8E]/30 rounded-full shadow-sm text-xs font-serif text-[var(--text-brown)] hover:bg-white transition-colors"
          >
            <Sparkles size={13} className="text-[var(--accent-red)]" />
            <span>Usar como App</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showIOSGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs rounded-2xl bg-[#FFF5F6] p-6 shadow-2xl border border-[var(--envelope-bg)] text-center relative"
            >
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-[var(--text-brown)]/60 hover:text-[var(--text-brown)] p-1"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-white shadow-md mx-auto flex items-center justify-center mb-3 overflow-hidden border border-[#E27B8E]/20">
                <img src={getAssetUrl('/apple-touch-icon.png')} alt="Icono de la App" className="w-10 h-10 object-contain rounded-xl" />
              </div>

              <h3 className="font-playfair text-lg text-[var(--text-brown)] font-medium mb-1">
                Abrir en Pantalla Completa
              </h3>
              <p className="text-xs font-serif text-[var(--text-brown)]/70 mb-5 leading-relaxed">
                Para disfrutarla como una app nativa sin barras del navegador:
              </p>

              <div className="space-y-3 text-left text-xs font-serif text-[var(--text-brown)]/85 bg-white/70 p-3.5 rounded-xl border border-[#E27B8E]/20">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[var(--envelope-bg)] text-[var(--text-brown)] shrink-0 mt-0.5">
                    <Share size={14} />
                  </div>
                  <span>
                    1. Toca el botón <strong>Compartir</strong> en la barra de tu navegador.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[var(--envelope-bg)] text-[var(--text-brown)] shrink-0 mt-0.5">
                    <PlusSquare size={14} />
                  </div>
                  <span>
                    2. Desliza y selecciona <strong>"Añadir a pantalla de inicio"</strong>.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-full bg-[var(--accent-red)] py-2.5 text-xs font-serif text-white shadow-md hover:opacity-90 active:scale-98 transition-all"
              >
                ¡Entendido!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
