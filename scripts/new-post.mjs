// Usage: npm run new "My Post Title" -- --tags Music,Research
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const tagIdx = args.indexOf('--tags');
const tags = tagIdx > -1 ? args.splice(tagIdx, 2)[1].split(',').map((t) => t.trim()).filter(Boolean) : [];
const title = args.join(' ').trim();
if (!title) {
  console.log('Usage: npm run new "My Post Title" -- --tags Music,Research');
  process.exit(1);
}
const slug = title.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');
const dir = path.join('src/content/posts', slug);
if (fs.existsSync(dir)) {
  console.error(`Already exists: ${dir}`);
  process.exit(1);
}
fs.mkdirSync(dir, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dir, 'index.md'), `---
title: "${title.replace(/"/g, '\\"')}"
date: ${today}
description: "One or two sentences that show up on cards and in search results."
tags: [${tags.join(', ')}]
# cover: ./cover.jpg      <- drop a cover.jpg in this folder and remove the #
draft: true               # <- delete this line (or set false) when you're ready to publish
---

Write your post here. **Bold**, *italics*, and [links](https://example.com) all work.

![Describe the photo](./photo.jpg)

Paste a YouTube, Vimeo, SoundCloud, Spotify, or Apple Music link on its own line to embed it:

https://www.youtube.com/watch?v=dQw4w9WgXcQ

<a class="button" href="https://example.com">A button</a>
`);
console.log(`Created ${dir}/index.md\nDrop your images in that folder, then run: npm run dev`);
