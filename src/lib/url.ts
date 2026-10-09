/** Prefix a site-root path ("/post/x") with the deploy base ("/website"). Leaves full URLs alone. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (p: string) => (p && p.startsWith('/') && !p.startsWith('//') ? BASE + p : p);
/** Strip the base from a pathname so "/website/about" -> "/about". */
export const unbase = (p: string) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p);
