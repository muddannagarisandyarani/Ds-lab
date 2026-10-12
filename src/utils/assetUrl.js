/**
 * Helper utility to resolve asset paths reliably across both local development
 * and deployed environments (such as GitHub Pages under /Ds-lab/ or custom domains).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  
  // If path already starts with base, return as-is
  if (base !== '/' && (path === base || path.startsWith(base))) {
    return path;
  }

  const cleanBase = base.replace(/^\/+|\/+$/g, '');
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Prevent double prefixing if cleanPath already starts with cleanBase
  if (cleanBase && cleanPath.startsWith(cleanBase + '/')) {
    return `/${cleanPath}`;
  }

  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}
