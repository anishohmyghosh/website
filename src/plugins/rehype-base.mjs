// Adds the deploy base (e.g. "/website") to root-relative links and images inside posts,
// so you can keep writing "/post/..." or "/images/..." in markdown.
import { visit } from 'unist-util-visit';

export default function rehypeBase({ base = '' } = {}) {
  const b = base.replace(/\/$/, '');
  const fix = (v) => (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(b + '/') ? b + v : v);
  return (tree) => {
    if (!b) return;
    visit(tree, (node) => {
      if (node.type === 'element') {
        for (const k of ['href', 'src', 'poster']) if (node.properties?.[k]) node.properties[k] = fix(node.properties[k]);
      } else if (node.type === 'raw') {
        node.value = node.value.replace(/(href|src|poster)="(\/[^/"][^"]*)"/g, (m, a, v) => `${a}="${fix(v)}"`);
      }
    });
  };
}
