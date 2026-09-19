import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  const repoName = 'canva-qr'; // Nombre exacto del repositorio en GitHub
  const basePath = `/${repoName}/`;

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'icon.svg',
          'cancion1.mp3',
          'cancion2.mp3',
          'foto1.webp',
          'foto2.webp',
          'foto3.webp',
          'foto4.webp',
          'foto5.webp',
          'foto6.webp',
          'foto7.webp',
          'foto8.webp',
        ],
        manifest: {
          id: basePath,
          name: 'Para Paola',
          short_name: 'Paola',
          description: 'Una sorpresa especial de cumpleaños hecha con mucho amor.',
          theme_color: '#FFF5F6',
          background_color: '#FFF5F6',
          display: 'standalone',
          orientation: 'portrait',
          start_url: basePath,
          scope: basePath,
          icons: [
            {
              src: 'pwa-192x192.png', // Quitamos la barra inicial para evitar 404
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png', // Quitamos la barra inicial
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-512x512.png', // Quitamos la barra inicial
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB to allow MP3 caching
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,mp3,woff,woff2}'],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
