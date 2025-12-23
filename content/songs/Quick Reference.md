# ChordPro Quick Reference

Essential commands and tips for working with your song library.

## Most Common Commands

### Single Song to PDF
```bash
chordpro "song.cho" -o "song.pdf"
```

### Transpose to Different Key
```bash
chordpro "song.cho" -o "song-D.pdf" --key=D
```

### Lyrics Only (No Chords)
```bash
chordpro "song.cho" -o "lyrics.pdf" --lyrics-only
```

### Transpose Up/Down
```bash
# Up 2 semitones
chordpro "song.cho" -o "higher.pdf" --transpose=2

# Down 3 semitones
chordpro "song.cho" -o "lower.pdf" --transpose=-3
```

### Batch Convert All Songs
```bash
convert-obsidian-songs.sh
```

## ChordPro Syntax Cheat Sheet

### Metadata (Top of File)
```chordpro
{title: Song Name}
{artist: Artist Name}
{key: C}
{tempo: 120}
{capo: 2}
{time: 4/4}
```

### Sections
```chordpro
{start_of_verse}
Lyrics here
{end_of_verse}

{start_of_chorus}
Chorus lyrics
{end_of_chorus}

{chorus}  # Repeats the chorus
```

### Chords
```chordpro
[C]Word [G]with [Am]chords [F]above
```

### Comments
```chordpro
{comment: Performance note or instruction}
{c: Short comment}
```

## Keyboard Shortcuts (GUI)

- `Cmd+O` - Open file
- `Cmd+S` - Save file
- `Cmd+P` - Export to PDF
- `Cmd+T` - Transpose dialog
- `Cmd++` - Zoom in
- `Cmd+-` - Zoom out

## Common Tasks

### Create a Setlist
```bash
chordpro song1.cho song2.cho song3.cho \
  -o "setlist.pdf" --toc
```

### Change Tempo (in file)
```chordpro
{tempo: 120}  # Original
{tempo: 140}  # Faster
{tempo: 90}   # Slower
```

### Add Capo
```chordpro
{capo: 2}  # In the file metadata
# OR at command line:
chordpro "song.cho" -o "capo.pdf" --capo=2
```

## File Organization

```
Create new song:
1. Copy template from templates/
2. Rename and save to chordpro/category/
3. Edit metadata and content
4. Generate PDF to test
```

## Helpful Tags

Add to metadata for easy searching:
```chordpro
{tags: Christmas, Worship, Traditional, Kids, Fun}
```

## Pro Tips

1. **Test Early** - Generate PDF often while editing
2. **Save Originals** - Keep unmodified versions
3. **Name Files Clearly** - "Song Title - Key.cho"
4. **Use Comments** - Document tricky timing or feel
5. **Consistent Keys** - Group songs by key for easy setlists
6. **Backup** - Songs folder is in iCloud, but backup elsewhere too

## Transposition Guide

| From → To | Semitones |
|-----------|-----------|
| C → D | +2 |
| C → E | +4 |
| C → G | +7 |
| G → A | +2 |
| G → C | +5 |
| A → C | -3 |
| D → G | +5 |

Quick formula: Each key is a semitone (use `--transpose`)

## Common Chord Progressions

### I-V-vi-IV (Most Popular)
- Key of C: C - G - Am - F
- Key of G: G - D - Em - C
- Key of D: D - A - Bm - G

### I-IV-V (Classic)
- Key of C: C - F - G
- Key of G: G - C - D
- Key of D: D - G - A

### vi-IV-I-V (Emotional)
- Key of C: Am - F - C - G
- Key of G: Em - C - G - D

## Troubleshooting

**Q: Chords don't align**
A: Check chord placement - must be before the syllable

**Q: PDF looks wrong**
A: Verify all directives are closed (end_of_verse, etc.)

**Q: Can't transpose**
A: Make sure chords use standard notation [C], [G], etc.

**Q: Command not found**
A: Restart terminal or run `source ~/.zprofile`

## Getting More Help

- Full Guide: See "ChordPro Usage Guide.md"
- Official Docs: https://chordpro.org
- Command Help: `chordpro --help`
- This Vault: "README.md" in songs folder

---

*Keep this handy for quick reference!*
