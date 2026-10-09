// Paste a YouTube / Vimeo / SoundCloud / Spotify / Apple Music link on its own
// line in a post and it turns into an embedded player.
import { visit } from 'unist-util-visit';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export function embedFor(raw) {
  let url;
  try { url = new URL(raw.trim()); } catch { return null; }
  const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '');

  // YouTube
  let yt = null;
  if (host === 'youtu.be') yt = url.pathname.slice(1);
  else if (host === 'youtube.com' && url.pathname === '/watch') yt = url.searchParams.get('v');
  else if (host === 'youtube.com' && /^\/(embed|shorts|live)\//.test(url.pathname)) yt = url.pathname.split('/')[2];
  if (yt) {
    const start = parseInt(url.searchParams.get('t') || url.searchParams.get('start') || '0', 10);
    const src = `https://www.youtube-nocookie.com/embed/${yt}${start ? `?start=${start}` : ''}`;
    return `<div class="embed embed-video"><iframe src="${esc(src)}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
  }

  // Vimeo
  if (host === 'vimeo.com' && /^\/\d+/.test(url.pathname)) {
    const id = url.pathname.split('/')[1];
    return `<div class="embed embed-video"><iframe src="https://player.vimeo.com/video/${id}" title="Vimeo video" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
  }

  // SoundCloud (tracks and sets)
  if (host === 'soundcloud.com' && url.pathname.split('/').filter(Boolean).length >= 2) {
    const clean = `https://soundcloud.com${url.pathname}`;
    const isSet = url.pathname.includes('/sets/');
    const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(clean)}&color=%235f7a52&visual=${isSet ? 'false' : 'true'}&show_comments=false`;
    return `<div class="embed embed-audio ${isSet ? 'embed-set' : ''}"><iframe src="${esc(src)}" title="SoundCloud player" loading="lazy" allow="autoplay; encrypted-media"></iframe></div>`;
  }

  // Spotify
  if (host === 'open.spotify.com') {
    const m = url.pathname.match(/\/(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
    if (m) {
      const tall = m[1] !== 'track' && m[1] !== 'episode';
      return `<div class="embed embed-spotify ${tall ? 'tall' : ''}"><iframe src="https://open.spotify.com/embed/${m[1]}/${m[2]}" title="Spotify player" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></div>`;
    }
  }

  // Apple Music
  if (host === 'music.apple.com') {
    return `<div class="embed embed-apple"><iframe src="https://embed.music.apple.com${esc(url.pathname + url.search)}" title="Apple Music player" loading="lazy" allow="autoplay *; encrypted-media *; clipboard-write" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>`;
  }
  return null;
}

export default function remarkEmbeds() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || node.children.length !== 1) return;
      const child = node.children[0];
      let url = null;
      if (child.type === 'text') url = child.value.trim();
      else if (child.type === 'link' && child.children.length === 1 && child.children[0].type === 'text' && child.children[0].value.trim() === child.url) url = child.url;
      if (!url || /\s/.test(url) || !/^https?:\/\//.test(url)) return;
      const html = embedFor(url);
      if (html) parent.children[index] = { type: 'html', value: html };
    });
  };
}
