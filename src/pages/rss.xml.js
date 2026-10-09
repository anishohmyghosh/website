import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';
import site from '../data/site.json';
import { u } from '../lib/url';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, pubDate: p.data.date, description: p.data.description, link: u(`/post/${p.slug}/`), categories: p.data.tags })),
  });
}
