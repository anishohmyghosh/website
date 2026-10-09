import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkEmbeds from './src/plugins/remark-embeds.mjs';
import rehypeBase from './src/plugins/rehype-base.mjs';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';

// Where the site lives. Repo "website" → https://anishohmyghosh.github.io/website/
// If you switch to a custom domain later: set SITE to it and BASE to ''.
const SITE = 'https://anishohmyghosh.github.io';
const BASE = '/website';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  markdown: {
    remarkPlugins: [remarkEmbeds],
    rehypePlugins: [[rehypeBase, { base: BASE }], rehypeExternalLinks],
  },
  // Keep old Wix links working.
  redirects: {
    '/projects/categories/music': `${BASE}/projects/tag/music`,
    '/projects/categories/research': `${BASE}/projects/tag/research`,
    '/projects/categories/motion-graphics': `${BASE}/projects/tag/design`,
    '/projects/categories/fashion': `${BASE}/projects/tag/art`,
    '/projects-1': `${BASE}/projects`,
    '/projects-8': `${BASE}/projects/tag/art`,
    '/portfolio': `${BASE}/graphics`,
    '/inquiry-services-page': `${BASE}/about#contact`,
  },
});
