# ChordPro Styling Guide

Your songs automatically get beautiful, category-specific styling when you convert them to PDF.

## Available Styles

### Christmas "Ink on Paper" Style

**Used for:** Songs in `chordpro/christmas/` folder

**Aesthetic:** Minimalist, clean, timeless
- **Fonts:** Times Roman (classic book serif, similar to ETBembo)
- **Title Color:** Pure black (#000000)
- **Chord Color:** Dark gray (#1a1a1a) - subtle, not bold
- **Text Color:** Dark gray (#1a1a1a)
- **Background:** Soft white (#fffff8) - like quality paper
- **Chorus Bar:** None (invisible)
- **Spacing:** Very generous margins (65pt) for breathing room
- **Overall Feel:** Classic printed book, simple elegance, "ink on paper"

Perfect for a timeless, understated aesthetic that looks like a vintage caroling book. No colors, no decoration - just beautiful typography and generous white space. Times Roman provides the same classic old-style serif feel as ETBembo (used in Marked's ink.css).

### Modern Worship Style

**Used for:** Songs in `chordpro/worship/` folder

**Aesthetic:** Clean, modern, universal
- **Fonts:** Helvetica (clean sans-serif)
- **Title Color:** Pure black (#1a1a1a)
- **Chord Color:** Vibrant blue (#2563eb)
- **Text Color:** Black
- **Background:** Pure white
- **Chorus Bar:** Bright blue (#3b82f6)
- **Spacing:** Optimized for readability
- **Overall Feel:** Contemporary worship, professional lead sheet

Perfect for worship teams and modern church services.

## How It Works

### Automatic Detection

The conversion scripts automatically detect which style to use based on the song's folder:

```bash
# This uses Christmas style automatically
song2pdf chordpro/christmas/Silent Night.cho

# This uses Worship style automatically
song2pdf chordpro/worship/Amazing Grace.cho
```

### Manual Override

You can manually specify a config if you want:

```bash
# Force Christmas style on any song
chordpro song.cho -o output.pdf --config=config-christmas.json

# Force Worship style on any song
chordpro song.cho -o output.pdf --config=config-worship.json
```

## Style Comparison

| Feature | Christmas (Ink) | Worship |
|---------|-----------------|---------|
| Font Family | Times (serif) | Helvetica (sans-serif) |
| Title Size | 24pt | 20pt |
| Title Color | Black | Black |
| Chord Color | Dark Gray | Blue |
| Background | Soft White | Pure White |
| Chorus Indicator | None | Blue bar |
| Margins | Very generous (65pt) | Standard (50pt) |
| Feeling | Minimalist book | Modern lead sheet |

## Customizing Styles

The style configs are JSON files in your songs folder:
- `config-christmas.json` - Christmas style
- `config-worship.json` - Worship style

You can edit these to customize:
- Font sizes
- Colors (hex codes)
- Spacing and margins
- Chorus bar appearance

### Example Customizations

**Make title bigger:**
```json
"title": {
  "name": "Times-Roman",
  "size": 26,  // Changed from 22
  "color": "#8b0000"
}
```

**Change chord color:**
```json
"chord": {
  "name": "Times-Bold",
  "size": 11,
  "color": "#006400"  // Changed to forest green
}
```

**Adjust spacing:**
```json
"spacing": {
  "title": 3,     // More space after title
  "lyrics": 1.5,  // More space between lines
  "chords": 1.5
}
```

## Color Palette Reference

### Christmas "Ink" Palette
- **Pure Black:** `#000000` - Titles only
- **Dark Gray:** `#1a1a1a` - All text, chords, lyrics
- **Soft White:** `#fffff8` - Background (like paper)
- **Medium Gray:** `#666666` - Comments only
- **No chorus bars** - Invisible, minimalist approach

### Worship Palette
- **Pure Black:** `#1a1a1a` - Titles, lyrics
- **Vibrant Blue:** `#2563eb` - Chords
- **Bright Blue:** `#3b82f6` - Chorus bar
- **Cool Gray:** `#6b7280` - Comments
- **Pure White:** `#ffffff` - Background

## Creating Your Own Style

To create a new style for another category:

1. Copy an existing config file:
   ```bash
   cp config-worship.json config-easter.json
   ```

2. Edit the colors and fonts to match your theme

3. Create a folder for that category:
   ```bash
   mkdir chordpro/easter
   ```

4. Update `chordpro-convert.sh` to recognize the new folder:
   ```bash
   elif [[ "$filepath" == *"/easter/"* ]]; then
       echo "$SONGS_DIR/config-easter.json"
   ```

## Tips for Best Results

1. **Consistency** - Keep all songs in a category using that category's folder
2. **Testing** - Generate a PDF after editing configs to preview changes
3. **Backup** - Keep copies of original configs before experimenting
4. **Readability** - Ensure text is readable when printed at actual size
5. **Purpose** - Choose style based on how the sheet will be used

## Available PDF Fonts

ChordPro uses these standard PDF fonts:

**Serif (Traditional):**
- Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic

**Sans-serif (Modern):**
- Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique

**Monospace (Code/Tabs):**
- Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique

## Quick Commands

```bash
# Convert with auto-detected style
song2pdf song.cho

# Batch convert a folder with auto-styles
chordpro-convert.sh chordpro/christmas/

# Manual style override
chordpro song.cho -o output.pdf --config=config-christmas.json

# Compare both styles (same song, two PDFs)
chordpro song.cho -o christmas.pdf --config=config-christmas.json
chordpro song.cho -o worship.pdf --config=config-worship.json
```

## Examples on Desktop

Check your Desktop for example PDFs showing the styles:
- `Joy-To-The-World-Ink-Style.pdf` - Minimalist ink on paper
- `Silent-Night-Ink-Style.pdf` - Clean black and white caroling book
- `Silent-Night-Worship-Style.pdf` - Modern worship lead sheet

---

*Styling makes your lead sheets not just functional, but beautiful!*
