# Quartz v4

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.
Quartz v4 features a from-the-ground rewrite focusing on end-user extensibility and ease-of-use.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>

## Astro editorial site

The Astro app lives at the repository root. `npm run dev` starts the preview server; `npm run build` writes a static site to `dist/`; `npm run preview` serves that build. Set `CONTENT_DIR` to an Obsidian content directory (default: `~/vault`). A note is published only when its frontmatter contains `publish: true`. To publish, add that field and a `categories` link such as `"[[writing]]"`, `"[[studies]]"`, or `"[[reflections]]"`; drafts without the true flag are excluded from pages, RSS, and copied media.
