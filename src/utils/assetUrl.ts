/**
 * Returns the proper public asset URL respecting Vite's base path
 * (e.g. on GitHub Pages where base is '/canva-qr/').
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  // If it's already an external URL or data URI, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${baseUrl}${cleanPath}`;
}
