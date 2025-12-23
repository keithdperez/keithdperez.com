# Songs Library

A well-organized collection of worship and music lead sheets in ChordPro format.

## Folder Structure

```
songs/
├── README.md                    # This file
├── chordpro/                    # ChordPro source files (.cho)
│   ├── christmas/              # Christmas songs and carols
│   └── worship/                # Worship songs and hymns
├── templates/                   # Templates for creating new songs
│   ├── worship-song-template.cho
│   ├── simple-song-template.cho
│   └── hymn-template.cho
└── archived/                    # Old files from previous organization
```

## Quick Start

### Creating a New Song

1. Copy a template from `templates/` folder:
   - **worship-song-template.cho** - Full-featured worship song with all sections
   - **simple-song-template.cho** - Basic song structure
   - **hymn-template.cho** - Traditional hymn format

2. Rename and save to appropriate category folder

3. Fill in the metadata and lyrics with chords

4. Generate PDF using:
   ```bash
   chordpro "path/to/song.cho" -o "output.pdf"
   ```

### Converting to PDF

**Single song:**
```bash
chordpro "chordpro/christmas/Silent Night.cho" -o "Silent Night.pdf"
```

**Batch convert (from songs folder):**
```bash
convert-obsidian-songs.sh
```

### Using the GUI

Open ChordPro.app and drag any `.cho` file to edit and preview in real-time.

## ChordPro Format Basics

### Essential Directives

- `{title: Song Name}` - Song title
- `{artist: Name}` - Artist or songwriter
- `{key: C}` - Musical key
- `{tempo: 120}` - Tempo in BPM
- `{capo: 2}` - Capo position

### Song Structure

- `{start_of_verse}` ... `{end_of_verse}` - Verse section
- `{start_of_chorus}` ... `{end_of_chorus}` - Chorus section
- `{start_of_bridge}` ... `{end_of_bridge}` - Bridge section
- `{chorus}` - Repeat the chorus
- `{comment: Text}` - Add performance notes

### Chord Notation

Place chords in square brackets before the syllable where they change:

```
[C]Silent night, [G]holy [C]night
```

## Song Categories

### Christmas Songs (chordpro/christmas/)

Traditional carols and modern Christmas music:
- Joy To The World
- Silent Night
- O Come All Ye Faithful
- Jingle Bells
- Rudolph the Red-Nosed Reindeer
- Santa Claus Is Coming To Town
- Feliz Navidad

### Worship Songs (chordpro/worship/)

Hymns and contemporary worship songs for church services.

## Transposing Songs

Change key on the fly:

```bash
# Transpose up 2 semitones
chordpro song.cho -o output.pdf --transpose=2

# Transpose to specific key
chordpro song.cho -o output.pdf --key=D

# With capo
chordpro song.cho -o output.pdf --capo=2
```

## Creating Setlists

Combine multiple songs into one PDF:

```bash
chordpro song1.cho song2.cho song3.cho -o setlist.pdf --toc
```

The `--toc` flag adds a table of contents.

## Best Practices

1. **Metadata is important** - Always fill in title, artist, and key
2. **Use sections** - Mark verses, choruses, and bridges clearly
3. **Add comments** - Use `{comment: }` for performance notes
4. **Consistent naming** - Use clear, descriptive file names
5. **Test your files** - Generate a PDF to verify formatting
6. **Version control** - Keep originals, experiment with copies

## Tips for Musicians

- **Transpose before practice** - Generate charts in comfortable keys
- **Lyrics-only versions** - Use `--lyrics-only` for vocalists
- **Print-ready** - PDFs are formatted for standard US Letter paper
- **Chord diagrams** - Can be added with `{define:}` directive

## Resources

- **ChordPro Guide**: See "ChordPro Usage Guide.md" in vault root
- **Official Docs**: https://chordpro.org
- **User Forum**: https://groups.io/g/ChordPro

## Conversion Scripts

The `convert-obsidian-songs.sh` script automatically:
- Finds markdown files with chord notation
- Extracts chords from code blocks
- Creates proper ChordPro files
- Generates PDFs
- Organizes output into folders

Located at: `~/bin/convert-obsidian-songs.sh`

## File Formats

- `.cho` / `.chopro` - ChordPro source files (editable text)
- `.pdf` - Generated lead sheets (for printing/sharing)
- `.md` - Markdown files with embedded chords

## Getting Help

1. Check the ChordPro Usage Guide in your vault
2. Try `chordpro --help` in terminal
3. Visit https://chordpro.org for full documentation
4. Search the user forum for specific questions

---

*Last updated: December 17, 2025*
*ChordPro Version: 6.090.0*
