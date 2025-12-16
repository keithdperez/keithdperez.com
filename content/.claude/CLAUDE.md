# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is Keith's personal Obsidian vault containing notes on faith, masculinity, marriage, leadership, and personal growth. The vault is version-controlled with Git and syncs to a public website (keithdperez.com) through an automated publishing workflow.

**Key Context:**
- Owner: Keith Perez - husband, father, worship leader, designer
- Tone: Personal, reflective, direct, authentic
- Mix of private notes (daily journals, private folder) and public content (published writings)
- Active Obsidian plugins: Templater, Things3 sync, Git auto-sync, Dataview, Excalidraw
- Auto-commits occur regularly via obsidian-git plugin (commit pattern: `auto-commit: | YYYY-MM-DD HH:MM:SS`)

## File Organization & Structure

### Directory Layout

- `/daily/` — Daily notes in `YYYY-MM-DD.md` format (not published)
- `/templates/` — Reusable note templates (daily-note, meeting_note, etc.)
- `/private/` — Sensitive/personal content (never published)
- `/attachments/` — Images, audio, PDFs; `/attachments/excalidraw/` for drawings
- `/_NoteCompanion/` — NoteCompanion plugin data (not published)
- Root directory — Main content notes (essays, reflections, concepts)

### Publishing Workflow

**Frontmatter for Publishing:**
```yaml
---
publish: true  # Include this to publish to keithdperez.com
title: Page Title
description: Optional meta description
---
```

**Publishing Pipeline:**
1. Changes pushed to `main` branch (via auto-commit or manual commit)
2. GitHub Action (`.github/workflows/trigger-site-build.yml`) triggers on push
3. Workflow sends repository dispatch to `keithdperez/keithdperez.com` repo
4. Separate Quartz-based site rebuilds with updated vault content

**What Gets Published:**
- Only files with `publish: true` in frontmatter
- `.gitignore` excludes: private/, daily/, templates/, attachments/, moc/, and others

### Naming Conventions

- Lowercase with spaces for readability: `presence & posture.md`, `holy ambition.md`
- Question-based titles encouraged: `why do I exist?.md`, `what makes me feel alive.md`
- Daily notes: strict `YYYY-MM-DD.md` format in `/daily/` folder
- No special naming rules for most content notes

## Content Patterns

### Frontmatter Structure

```yaml
---
title: Display Title
publish: true  # or false/omitted
description: Optional description for web
tags:
  - optional-tag
hubs:
  - "[[Related Note]]"
urls:
  - https://example.com
---
```

### Linking & References

- Use Obsidian `[[wikilinks]]` for internal note connections
- Preserve existing link patterns when editing
- The `index.md` file serves as the public homepage/landing page

### Daily Notes Template

Uses Templater syntax with:
- Dynamic date: `Monday, December 15th, 2025`
- Bible reading integration via `life-journal-links.json` lookup
- Things app integration: `things:///show?id=today`
- Structured sections: Morning Reflection, Gratitude, Plan of Action, End of Day Reflection

## Common Commands

### Git Operations

```bash
# Check status (auto-commits happen frequently)
git status

# Manual commit when needed (use descriptive messages, not "auto-commit:")
git add .
git commit -m "Add new essay on rooted masculinity"
git push origin main

# View recent commits
git log --oneline --max-count=10
```

### Publishing Verification

```bash
# Check which files would be published (have publish: true)
grep -r "^publish: true" --include="*.md" .

# Verify site trigger token is configured (GitHub secret)
# This is set in the keithdperez/vault repository settings
```

### Testing Changes Locally

**Note:** There is no local Quartz build in this vault repository. The publishing happens in a separate `keithdperez.com` repository. To test published output, you would need to work in that repository.

## Writing Style Guidelines

**From AGENTS.md:**
- Personal, reflective, direct tone
- Conversational style mixing spiritual, relational, and technical themes
- Short paragraphs, clear sections with `---` horizontal rules
- Authentic voice - Keith's writing addresses real struggles, growth, faith journey
- No overly formal or corporate language

**When Editing Content:**
- Preserve Keith's voice and writing style
- Maintain existing MOC (Map of Content) linking patterns
- Keep daily note format consistent with template structure
- Don't create new organizational folders without explicit direction

## Key Files Reference

- `index.md` — Public homepage/landing page for keithdperez.com
- `AGENTS.md` — Agent guidelines (file organization, naming, content style)
- `.gitignore` — Publishing boundaries (what stays private vs. public)
- `life-journal-links.json` — Bible reading plan lookup table (date → URL mapping)
- `.github/workflows/trigger-site-build.yml` — Publishing automation trigger

## Integration Points

### Obsidian Plugins (Key Ones)

- **obsidian-git**: Auto-commits every ~15min, creates the "auto-commit:" pattern
- **templater-obsidian**: Powers dynamic daily note templates
- **obsidian-things3-sync**: Enables `things:///` URL scheme integration
- **dataview**: May be used in some notes for dynamic queries
- **meld-encrypt**: Handles `.mdenc` encrypted files (see `test.mdenc`)

### External Services

- **Things 3**: Task management app, linked in daily notes
- **GitHub**: Version control and publishing trigger
- **keithdperez.com**: Quartz-based public site (separate repository)
- **Life Journal**: Bible reading plan integration via JSON lookup
