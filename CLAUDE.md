# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Quartz v4, a static site generator that publishes digital gardens and notes from Markdown files. The site is deployed at keithdperez.com and uses content from an Obsidian vault (symlinked at `content/`).

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
- `content/` - Markdown content (symlinked to Obsidian vault)
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
- Custom color theme (warm browns/tans)
- Plausible analytics
- Conditional breadcrumbs (hidden on index)
- Content from Obsidian vault at `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Keith/personal`
- Ignores patterns: `private`, `templates`, `.obsidian`, `archive`

## Technical Stack
- **Runtime**: Node.js 22+, npm 10.9.2+
- **Build**: esbuild + TypeScript (ESM modules)
- **UI**: Preact with server-side rendering
- **Markdown**: unified/remark/rehype pipeline
- **Styling**: SCSS with lightningcss
- **Search**: FlexSearch client-side index
- **Hot reload**: chokidar file watcher + WebSocket

## Important Notes
- Content directory is a symlink—changes update both Obsidian and site
- Plugin order in `quartz.config.ts` affects transformation results
- Components use Preact JSX (`jsxImportSource: "preact"`)
- Tests use tsx test runner: `tsx --test`
- CLI entry point: `quartz/bootstrap-cli.mjs`
