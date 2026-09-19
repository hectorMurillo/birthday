import fs from 'fs';
import sharp from 'sharp';

const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0F2"/>
      <stop offset="100%" stop-color="#FCE4E8"/>
    </linearGradient>
    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F28B9F"/>
      <stop offset="100%" stop-color="#D9536F"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#8C4A57" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Background rounded rectangle -->
  <rect width="512" height="512" rx="110" fill="url(#bgGrad)"/>
  
  <!-- Subtle inner border -->
  <rect x="16" y="16" width="480" height="480" rx="96" fill="none" stroke="#E27B8E" stroke-opacity="0.3" stroke-width="4"/>

  <!-- Heart shape -->
  <g filter="url(#shadow)">
    <path d="M256 420 C256 420 80 300 80 180 C80 110 135 70 195 70 C230 70 256 100 256 100 C256 100 282 70 317 70 C377 70 432 110 432 180 C432 300 256 420 256 420 Z" fill="url(#heartGrad)"/>
  </g>

  <!-- Highlight on heart -->
  <path d="M140 160 C130 180 130 210 145 230" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.6"/>

  <!-- Small sparkle -->
  <path d="M370 120 L376 138 L394 144 L376 150 L370 168 L364 150 L346 144 L364 138 Z" fill="#FFF" opacity="0.85"/>
</svg>
`;

const svgMaskable = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0F2"/>
      <stop offset="100%" stop-color="#FCE4E8"/>
    </linearGradient>
    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F28B9F"/>
      <stop offset="100%" stop-color="#D9536F"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#8C4A57" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Full bleed background for maskable -->
  <rect width="512" height="512" fill="url(#bgGrad)"/>

  <!-- Scaled-down heart for Android safe-zone (15% padding) -->
  <g transform="translate(64, 64) scale(0.75)" filter="url(#shadow)">
    <path d="M256 420 C256 420 80 300 80 180 C80 110 135 70 195 70 C230 70 256 100 256 100 C256 100 282 70 317 70 C377 70 432 110 432 180 C432 300 256 420 256 420 Z" fill="url(#heartGrad)"/>
    <path d="M140 160 C130 180 130 210 145 230" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.6"/>
    <path d="M370 120 L376 138 L394 144 L376 150 L370 168 L364 150 L346 144 L364 138 Z" fill="#FFF" opacity="0.85"/>
  </g>
</svg>
`;

async function run() {
  fs.writeFileSync('public/icon.svg', svgIcon.trim());

  const svgBuffer = Buffer.from(svgIcon);
  const maskableBuffer = Buffer.from(svgMaskable);

  await sharp(svgBuffer).resize(192, 192).png().toFile('public/pwa-192x192.png');
  await sharp(svgBuffer).resize(512, 512).png().toFile('public/pwa-512x512.png');
  await sharp(maskableBuffer).resize(512, 512).png().toFile('public/pwa-maskable-512x512.png');
  await sharp(svgBuffer).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(svgBuffer).resize(64, 64).png().toFile('public/favicon.ico');

  console.log('All PWA icons generated successfully!');
}

run().catch(console.error);
