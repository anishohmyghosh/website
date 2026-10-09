# anish ghosh — portfolio

My site, moved off Wix. Built with [Astro](https://astro.build), hosted on GitHub Pages.

## Run it locally

```sh
npm install
npm run dev        # → http://localhost:4321
```

## Write a new post

```sh
npm run new "My New Post" -- --tags Music,Technology
```

That makes `src/content/posts/my-new-post/index.md`. Open it, write, drop images into the same
folder, and reference them like `![caption](./photo.jpg)`. Delete the `draft: true` line when it's
ready. Push to GitHub and the site rebuilds itself.

Everything updates on its own: the home page, the Projects page, tag pages, Research (anything
tagged `Technology`), Artwork, related posts, the RSS feed, and the sitemap.

**Post front matter**

| field | what it does |
|---|---|
| `title` | post title |
| `date` | `YYYY-MM-DD` — newest shows first |
| `description` | shown on cards + search results |
| `tags` | `[Music, Technology]` — any new tag automatically gets its own page |
| `cover` | `./cover.jpg` — card + header image (optional) |
| `featured` | `true` pins it to the front of the home page |
| `draft` | `true` hides it from the live site (still visible in `npm run dev`) |

**Embeds:** paste a YouTube, Vimeo, SoundCloud, Spotify, or Apple Music link on its own line.
**Buttons:** `<a class="button" href="https://...">Label</a>` (put several on one line for a row).
**Galleries:** put several images on consecutive lines with no blank line between them.

## Edit the other pages

Most page content lives in plain JSON in `src/data/`:

| file | controls |
|---|---|
| `site.json` | name, tagline, nav, social links, resume link, contact email |
| `tags.json` | tag order + descriptions |
| `about.json` | about text + education |
| `press.json` | Recent Press cards (images in `public/images/press/`) |
| `music.json` | players at the top of Artwork |
| `graphics.json` | Graphics gallery (images in `public/images/graphics/`) |
| `collabs.json` | logos in the home-page playground (images in `public/images/collabs/`) |

## Deploy

1. Create a GitHub repo and push this folder to `main`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Set `site` in `astro.config.mjs` to the final URL. If the repo isn't named
   `<username>.github.io`, also add `base: '/<repo-name>'`, or use a custom domain.

Old Wix links (`/post/...`, `/projects/categories/...`, `/portfolio`, etc.) keep working.
