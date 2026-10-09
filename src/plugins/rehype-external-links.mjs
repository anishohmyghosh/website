// Links to other websites open in a new tab; links within this site stay in the same tab.
import { visit } from 'unist-util-visit';

const isExternal = (href) => typeof href === 'string' && /^https?:\/\//i.test(href);

export default function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'element' && node.tagName === 'a' && isExternal(node.properties?.href)) {
        node.properties.target = '_blank';
        node.properties.rel = ['noopener', 'noreferrer'];
      } else if (node.type === 'raw') {
        // raw HTML in posts, e.g. <a class="button" href="https://...">
        node.value = node.value.replace(/<a\b([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (m, pre, href, post) =>
          /\btarget=/.test(pre + post) ? m : `<a${pre}href="${href}"${post} target="_blank" rel="noopener noreferrer">`);
      }
    });
  };
}
