import { getCollection, type CollectionEntry } from 'astro:content';
import tagInfo from '../data/tags.json';
import { u } from './url';

export type Post = CollectionEntry<'posts'>;

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');

export const tagHref = (tag: string) => u(`/projects/tag/${slugify(tag)}`);

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Every tag used by any post, ordered by tags.json first, then by post count. */
export async function getTags() {
  const posts = await getPosts();
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  const order = Object.keys(tagInfo).filter((k) => !k.startsWith('_'));
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugify(name), description: (tagInfo as any)[name]?.description ?? '' }))
    .sort((a, b) => {
      const ia = order.indexOf(a.name), ib = order.indexOf(b.name);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return b.count - a.count;
    });
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
