import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkEmbeds from './src/plugins/remark-embeds.mjs';

// When you deploy, set `site` to your real URL (e.g. https://anishohmyghosh.github.io
// or your custom domain). If the repo is served from a sub-path, also set `base`.
export default defineConfig({
  site: 'https://anishohmyghosh.github.io',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  markdown: {
    remarkPlugins: [remarkEmbeds],
  },
  // Keep old Wix links working.
  redirects: {
    '/projects/categories/music': '/projects/tag/music',
    '/projects/categories/research': '/projects/tag/technology',
    '/projects/categories/motion-graphics': '/projects/tag/design',
    '/projects/categories/fashion': '/projects/tag/art',
    '/projects-1': '/projects',
    '/projects-8': '/projects/tag/art',
    '/portfolio': '/graphics',
    '/inquiry-services-page': '/about#contact',
  },
});
