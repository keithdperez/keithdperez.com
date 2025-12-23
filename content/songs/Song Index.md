# Song Index

A quick reference guide to all songs in the library.

## Christmas Songs

### Traditional Carols & Hymns

| Title | Key | Tempo | File |
|-------|-----|-------|------|
| Joy To The World | G | 110 | [chordpro/christmas/Joy To The World.cho](chordpro/christmas/Joy%20To%20The%20World.cho) |
| Silent Night | G | 60 | [chordpro/christmas/Silent Night.cho](chordpro/christmas/Silent%20Night.cho) |
| O Come All Ye Faithful | G | 100 | [chordpro/christmas/O Come All Ye Faithful.cho](chordpro/christmas/O%20Come%20All%20Ye%20Faithful.cho) |

### Fun & Secular

| Title | Key | Tempo | File |
|-------|-----|-------|------|
| Jingle Bells | E | 120 | [chordpro/christmas/Jingle Bells.cho](chordpro/christmas/Jingle%20Bells.cho) |
| Rudolph the Red-Nosed Reindeer | C | 120 | [chordpro/christmas/Rudolph the Red-Nosed Reindeer.cho](chordpro/christmas/Rudolph%20the%20Red-Nosed%20Reindeer.cho) |
| Santa Claus Is Coming To Town | G | 120 | [chordpro/christmas/Santa Claus Is Coming To Town.cho](chordpro/christmas/Santa%20Claus%20Is%20Coming%20To%20Town.cho) |
| Feliz Navidad | C | 140 | [chordpro/christmas/Feliz Navidad.cho](chordpro/christmas/Feliz%20Navidad.cho) |

## Worship Songs

*Songs to be added here*

## Quick Actions

### Generate PDFs for All Christmas Songs

```bash
cd "~/Library/Mobile Documents/iCloud~md~obsidian/Documents/keithdperez/songs/chordpro/christmas"
for song in *.cho; do
    chordpro "$song" -o "~/Desktop/${song%.cho}.pdf"
done
```

### Create Christmas Setlist

```bash
chordpro \
  "chordpro/christmas/Joy To The World.cho" \
  "chordpro/christmas/Silent Night.cho" \
  "chordpro/christmas/O Come All Ye Faithful.cho" \
  -o "~/Desktop/Christmas Setlist.pdf" --toc
```

## Song Statistics

- **Total Songs**: 7
- **Christmas**: 7
- **Worship**: 0
- **Average Tempo**: 107 BPM
- **Most Common Key**: G (4 songs)

## Tags

Use these tags to find songs quickly:

- `#christmas` - Christmas songs
- `#worship` - Worship songs
- `#traditional` - Traditional hymns and carols
- `#contemporary` - Modern worship
- `#kids` - Kid-friendly songs
- `#bilingual` - Multiple languages
- `#fun` - Upbeat, sing-along songs

## Recently Added

1. Joy To The World (Dec 17, 2025)
2. Silent Night (Dec 17, 2025)
3. O Come All Ye Faithful (Dec 17, 2025)
4. Jingle Bells (Dec 17, 2025)
5. Rudolph the Red-Nosed Reindeer (Dec 17, 2025)
6. Santa Claus Is Coming To Town (Dec 17, 2025)
7. Feliz Navidad (Dec 17, 2025)

## Songs by Key

### Key of C
- Rudolph the Red-Nosed Reindeer
- Feliz Navidad

### Key of E
- Jingle Bells

### Key of G
- Joy To The World
- Silent Night
- O Come All Ye Faithful
- Santa Claus Is Coming To Town

## Next Steps

1. Add more worship songs for services
2. Create themed setlists (Christmas Eve, Kids Service, etc.)
3. Add guitar chord diagrams for beginners
4. Consider adding bass/percussion notation

---

*Auto-generated: December 17, 2025*
