# File Naming Conventions

## For music projects

### Root Project
SongName_Project/
 ├── Ableton/
 │    └── (Ableton .als, samples, backups, etc.)
 ├── Exports/
 │    ├── Mixes/
 │    │    ├── SongName_v1_mix.wav
 │    │    ├── SongName_v2_mix.wav
 │    │    └── SongName_v3_mix.wav
 │    │
 │    ├── Masters/
 │    │    ├── SongName_v1_master.wav
 │    │    ├── SongName_v2_master.wav
 │    │    └── SongName_v3_master.wav
 │    │
 │    ├── References/
 │    │    ├── SongName_carCheck.mp3
 │    │    └── SongName_limiterTest.mp3
 │    │
 │    └── Delivery/
 │         ├── SongName_master_24bit_44k.wav
 │         ├── SongName_master_320kbps.mp3
 │         ├── SongName_inst_master_24bit_44k.wav
 │         └── SongName_acapella_master_24bit_44k.wav
 │
 └── Notes/ (optional: session notes, lyrics, client feedback)

---

### Naming Conventions
- **Versioning:**  
  - `v1`, `v2`, `v3` (never use “final”)  
  - Only used in *Mixes* and *Masters* folders.  
  - Delivery folder = *clean final files*, no version numbers.

- **Roles:**  
  - `mix`, `master`, `inst`, `acapella`, `ref`

- **Bit depth & sample rate (WAVs):**  
  - `_24bit_44k`, `_24bit_48k`, `_16bit_44k`  

- **Bitrate (MP3s):**  
  - `_320kbps`, `_192kbps`  

---

### Example Delivery Folder
Delivery/
 ├── BlinderThanTheBlind_master_24bit_44k.wav
 ├── BlinderThanTheBlind_master_320kbps.mp3
 ├── BlinderThanTheBlind_inst_master_24bit_44k.wav
 └── BlinderThanTheBlind_acapella_master_24bit_44k.wav