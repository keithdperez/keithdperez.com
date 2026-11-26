# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Quartz v4, a static site generator that publishes digital gardens and notes from Markdown files. The site is deployed at keithdperez.com and uses content from an Obsidian vault via symlink at `content/`.

## Direction (Keith, 2026-11-21; gift UI 2026-11-24)

Astro editorial site replacing Quartz. Look: `design/comp.html` (Aeon structure; the vault's Rubric materials:
Alegreya, one red `#b8321e`, one pigment per category, typographic pigment covers when a note has no banner, no labels shown).
2026-11-24: Keith tried a hymnal-contents restructure and kept the original look; only the gift UI stays (promise
under the byline, the gift handed over at the end with its file type/size, gift line on cards). The reader's
goal is the gift. Shapes over text (Keith, 2026-11-26): no labels, kickers or instructions; the design carries the
meaning (the gift is a filled red tile, the next piece is an arrow row). No pigment covers; lists are rows
with a pigment square. The mark is Keith's face in a circle, not a wordmark. Desktop is one centered column. Dark follows the system with the vault's
Rubric dark palette. The production build fails while no essay is live. Content: only vault notes marked for publishing.
Everything below the go-live sections describes the old Quartz site.

## Addresses (Keith, 2026-11-22)

Writing lives at the root: `keithdperez.com/<slug>`, one plain word, two at most, set as `slug:` in
the note. A live slug never changes; old Quartz addresses forward. Everything is listed at `/writing/`; old shelf addresses forward there. Files people
take go under `/downloads/<name>` once the first one exists. The build fails on a bad or reserved slug.
`INCLUDE_UNREVIEWED=1` previews unapproved notes locally; CI never sets it.

## What a piece is (Keith, 2026-11-24)

The site is Keith's own blog: who he is and what is in his heart, plus a deliverable when there is one.
Projects, ministry ops and tutorials stay off it. A gift is optional (`gives:` + `gives_link:`, a URL or a
vault file served at `/downloads/<name>`); when present it leads, like the Ableton blog, and sometimes the
writing is plenty. The site shows no category labels; `categories:` only marks a note as blog material.
Shares use the banner or `public/og.png`. Phone first (Keith, 2026-11-26): it must look beautiful on a phone above all; check every change at 390px in WebKit, dark and light. Voice: vault `agent/docs/writing-voice.md`.

## Go-live gate (Keith, 2026-11-22)

An essay goes live only after Keith has read it and called it his: `publish: true` plus
`reviewed: true` (enforced in `src/lib/content.js`). AI-sounding pieces come back to his voice first by
talking them through, one at a time (vault `agent/docs/writing-voice.md`). The deploy workflow is staged on `astro`; pushing and re-enabling Pages need his go-ahead.

## Build Commands

### Development
```bash
npx quartz build --serve
```
Starts local development server at http://localhost:8080 with hot reloading. For production builds, omit `--serve`.

### Build Options
- `-d <dir>` - Content directory (default: `content`)
- `-o <dir>` - Output directory (default: `public`)
- `-v` - Verbose logging
- `--port <num>` - Local server port
- `--concurrency <num>` - Parser thread count

### Code Quality
```bash
npm run check      # Type check and format check
npm run format     # Auto-format with Prettier
npm test           # Run tests with tsx
```

## Architecture

### Plugin Pipeline
Quartz uses a three-stage transformation pipeline defined in `quartz.config.ts`:

1. **Transformers** - Map over content (parse frontmatter, syntax highlighting, table of contents, etc.)
2. **Filters** - Filter content (remove drafts, etc.)
3. **Emitters** - Reduce content to outputs (generate pages, RSS, sitemap, assets, etc.)

Plugin order matters—transformers execute sequentially and some are position-sensitive.

### Core Directories
- `quartz/` - Core framework code
  - `quartz/plugins/` - Plugin system (transformers, filters, emitters)
  - `quartz/components/` - React/Preact UI components
  - `quartz/util/` - Shared utilities
  - `quartz/processors/` - Content processing pipeline
  - `quartz/styles/` - SCSS stylesheets
  - `quartz/cli/` - CLI command handlers
- `content/` - Markdown content (symlink to local Obsidian vault)
- `public/` - Build output
- `docs/` - Quartz framework documentation

### Configuration Files
- `quartz.config.ts` - Main site configuration (title, theme, analytics, plugins)
- `quartz.layout.ts` - Component layout for pages (header, footer, sidebars)
- `tsconfig.json` - TypeScript config (Preact JSX, ESNext modules)

### Content Processing
1. Markdown files in `content/` are parsed with remark/rehype
2. Plugins transform content (frontmatter, links, syntax highlighting)
3. Filtered content is emitted as static HTML pages
4. Components render using Preact with server-side rendering

### Custom Configuration
This site uses:
- Custom color theme (cool blues/cyans)
- Plausible analytics
- Conditional breadcrumbs (hidden on index)
- Content via symlink to local Obsidian vault
- Ignores patterns: private, templates, .obsidian, archive, journal, daily, bible, reference, agents, .claude, _NoteCompanion, .notecompanion, bases, moc, attachments, projects, resources, production, church, guides

## Technical Stack
- **Runtime**: Node.js 22+, npm 10.9.2+
- **Build**: esbuild + TypeScript (ESM modules)
- **UI**: Preact with server-side rendering
- **Markdown**: unified/remark/rehype pipeline
- **Styling**: SCSS with lightningcss
- **Search**: FlexSearch client-side index
- **Hot reload**: chokidar file watcher + WebSocket

## Important Notes
- Content is a symlink pointing to local Obsidian vault at `/Users/keithperez/Library/Mobile Documents/iCloud~md~obsidian/Documents/keithdperez`
- The content directory is ignored by git (local development only)
- Plugin order in `quartz.config.ts` affects transformation results
- Components use Preact JSX (`jsxImportSource: "preact"`)
- Tests use tsx test runner: `tsx --test`
- CLI entry point: `quartz/bootstrap-cli.mjs`

## Deployment Pipeline
1. Edit content in Obsidian (synced to iCloud)
2. Push vault changes to `keithdperez/vault` repository
3. Vault repo's GitHub Action triggers `repository_dispatch` event
4. Site repo receives `vault-update` event, checks out vault content, and rebuilds
5. Deploys to GitHub Pages at keithdperez.com

Note: During GitHub Actions builds, the workflow checks out the `keithdperez/vault` repository into the `content/` directory since symlinks don't work in CI environments.

To manually trigger: `gh api repos/keithdperez/keithdperez.com/dispatches -X POST -f event_type=vault-update`

## Mobile Workflow with Claude GitHub App
The Claude GitHub App allows making site changes from mobile devices:
1. Open GitHub mobile app → keithdperez/keithdperez.com repository
2. Create a new Issue or comment on existing issue
3. Tag `@claude` and describe the requested change (e.g., "change the font to Merriweather" or "make sidebar darker")
4. Claude automatically makes the changes, commits to v4 branch
5. Site automatically rebuilds and deploys via GitHub Pages

### Design Change Guidelines
When making design/UI changes requested via issues:
- **Typography changes**: Edit `quartz.config.ts` → `theme.typography` section
- **Color changes**: Edit `quartz.config.ts` → `theme.colors` section (lightMode and darkMode)
- **Layout changes**: Edit `quartz.layout.ts` → modify component placement
- **Custom styles**: Edit files in `quartz/styles/` directory
- **Component changes**: Edit files in `quartz/components/` directory

Always verify changes compile before committing: `npx quartz build`
