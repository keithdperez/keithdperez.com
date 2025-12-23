# ChordPro Usage Guide

A comprehensive guide to using ChordPro for creating professional lead sheets from your worship and music files.

## What is ChordPro?

ChordPro is a text-based format and tool for creating professional-looking sheet music with lyrics and chords. It converts simple text files into beautiful PDFs that musicians can use.

## Installation

ChordPro is installed at: `/Applications/ChordPro.app`

The command-line tool is available in your terminal as `chordpro` (restart terminal if needed).

## ChordPro File Format

ChordPro files use the `.cho` or `.chopro` extension and contain:
- **Directives** in curly braces `{directive: value}`
- **Chords** in square brackets `[Am]`
- **Lyrics** as plain text

### Basic Example

```chordpro
{title: Amazing Grace}
{artist: John Newton}
{key: G}

[G]Amazing [G7]grace how [C]sweet the [G]sound
That saved a wretch like [D]me
I [G]once was [G7]lost but [C]now I'm [G]found
Was blind but [D]now I [G]see
```

## Common Directives

### Song Metadata
- `{title: Song Name}` - Song title (appears at top)
- `{subtitle: Text}` - Subtitle or additional info
- `{artist: Name}` - Artist or composer
- `{composer: Name}` - Composer name
- `{key: C}` - Musical key
- `{tempo: 120}` - Tempo in BPM
- `{time: 4/4}` - Time signature
- `{capo: 2}` - Capo position

### Song Structure
- `{start_of_chorus}` or `{soc}` - Begin chorus section
- `{end_of_chorus}` or `{eoc}` - End chorus section
- `{start_of_verse}` or `{sov}` - Begin verse section
- `{end_of_verse}` or `{eov}` - End verse section
- `{start_of_bridge}` or `{sob}` - Begin bridge section
- `{end_of_bridge}` or `{eob}` - End bridge section
- `{chorus}` - Repeat the chorus
- `{comment: Text}` or `{c: Text}` - Add a comment/instruction

### Formatting
- `{new_page}` - Start a new page
- `{column_break}` - Break to new column
- `{textsize: 12}` - Set text size
- `{chordsize: 10}` - Set chord size

## Command Line Usage

### Basic Conversion

Convert a ChordPro file to PDF:
```bash
chordpro song.cho -o song.pdf
```

### Batch Conversion

Convert all .cho files in a directory:
```bash
for file in *.cho; do
    chordpro "$file" -o "${file%.cho}.pdf"
done
```

### Common Options

- `-o filename.pdf` - Specify output file
- `--config=file.json` - Use custom configuration
- `--lyrics-only` - Generate lyrics-only version (no chords)
- `--toc` - Generate table of contents
- `--transpose=N` - Transpose by N semitones (e.g., --transpose=2)
- `--key=C` - Transpose to specific key
- `--capo=N` - Add capo at fret N

### Examples

Transpose a song up 2 semitones:
```bash
chordpro song.cho -o song-transposed.pdf --transpose=2
```

Create a lyrics-only version:
```bash
chordpro song.cho -o lyrics.pdf --lyrics-only
```

Transpose to key of D:
```bash
chordpro song.cho -o song-D.pdf --key=D
```

## Working with Obsidian

### Creating ChordPro Files in Obsidian

You can write ChordPro content directly in markdown using code blocks:

````markdown
```chordpro
{title: My Song}
{key: C}

[C]This is a [F]simple [G]song
[C]Easy to [F]sing a[G]long
```
````

### Converting from Markdown

To convert markdown files with chord notation:

1. Extract the chord notation from code blocks
2. Add ChordPro directives for metadata
3. Save with `.cho` extension
4. Process with `chordpro` command

### Organizing Your Songs

Recommended folder structure:
```
songs/
├── chordpro/          # .cho source files
├── pdf/               # Generated PDF files
└── setlists/          # Song collections
```

## Advanced Features

### Chord Diagrams

Add chord diagrams for guitar:
```chordpro
{define: Am base-fret 1 frets x 0 2 2 1 0}
```

### Inline Formatting

- `**bold text**` - Bold text
- `*italic text*` - Italic text
- `_underline_` - Underlined text

### Conditional Content

Show content only in certain versions:
```chordpro
{if: lyrics}
This only appears in lyrics-only version
{endif}
```

### Tab Notation

Include guitar tabs:
```chordpro
{start_of_tab}
e|--0--1--3--|
B|--1--1--0--|
G|--0--2--0--|
D|--2--3--0--|
A|--3--3--2--|
E|--x--x--3--|
{end_of_tab}
```

## Configuration

ChordPro can be customized with JSON configuration files. Create a `config.json`:

```json
{
  "settings": {
    "chordcolor": "blue",
    "chordsize": 10,
    "textsize": 12
  },
  "pdf": {
    "fontsize": 12,
    "papersize": "letter"
  }
}
```

Use with:
```bash
chordpro song.cho -o song.pdf --config=config.json
```

## GUI Application

For interactive editing:

1. Open `/Applications/ChordPro.app`
2. Create or open a `.cho` file
3. Edit in the left pane
4. Preview updates in real-time on the right
5. Export to PDF when ready

## Tips and Best Practices

1. **Start with metadata** - Always include title, artist, and key
2. **Use sections** - Mark verses, choruses, and bridges clearly
3. **Add comments** - Use `{c: }` for performance notes
4. **Consistent spacing** - Keep chord placement consistent
5. **Test transposition** - Verify songs work in different keys
6. **Version control** - Keep `.cho` files in git for history
7. **Name conventions** - Use clear file names: `song-title-key.cho`

## Resources

- Official Website: https://chordpro.org
- Documentation: https://chordpro.org/chordpro/chordpro-reference-implementation/
- User Forum: https://groups.io/g/ChordPro
- Full Directive Reference: https://chordpro.org/chordpro/directives/

## Quick Reference Card

| Task | Command |
|------|---------|
| Create PDF | `chordpro song.cho -o song.pdf` |
| Transpose up 2 | `chordpro song.cho -o out.pdf --transpose=2` |
| Lyrics only | `chordpro song.cho -o out.pdf --lyrics-only` |
| To key of D | `chordpro song.cho -o out.pdf --key=D` |
| Add capo | `chordpro song.cho -o out.pdf --capo=2` |
| Get help | `chordpro --help` |
| Version info | `chordpro --version` |

## Your Songs Location

Songs folder: `/Users/keithperez/Library/Mobile Documents/iCloud~md~obsidian/Documents/keithdperez/songs/`

ChordPro exports: `~/Desktop/chordpro-exports/`

---

*Guide created: December 17, 2025*
*ChordPro Version: 6.090.0*
