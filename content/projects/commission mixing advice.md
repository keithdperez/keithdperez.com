# Folk/Americana Mixing Framework

For an earthy, natural, acoustic-driven sound (folk/americana with grit and authenticity).
Use **bus-based mixing** for cohesion instead of processing every single track.

---

## 1. Session Setup
- **Groups/Busses**:
  - **Drums (Percussion Bus)** → cajon, snare brush, auxiliary percussion
  - **Strings Bus** → acoustic guitars, mandolin, strum stick, banjo
  - **Bass Bus** → upright or electric
  - **Vocal Bus** → lead, doubles, harmonies
  - **Master Bus** → gentle glue + headroom

---

## 2. Drums/Percussion Bus
**Goal:** Warm, organic, cohesive kit (not hyped modern drums).
**Suggested Chain:**
- **FabFilter Pro-Q 4**: HPF at 30–40Hz, dip boxy 200–300Hz
- **uaudio_api_2500**: slow attack, medium release, 2:1 ratio, 1–2dB GR for glue
- **RC-20 Retro Color (light use)**: subtle tape/room feel
- **ValhallaRoom (optional)**: small wood room, low blend for realism

---

## 3. Strings Bus (Acoustic Instruments)
**Goal:** Preserve pluck/air, tame resonances, avoid harshness.
**Suggested Chain:**
- **Pro-Q 4**: notch resonances (3–5kHz harshness, 200–300Hz boom)
- **uaudio_pultec_eqp-1a**: low shelf boost (~100Hz), high shelf (~10–12kHz)
- **FabFilter Saturn 2 (tape mode)**: light saturation for thickness
- **Neutron 4 Transient Shaper (optional)**: soften attack if too plucky
- **ValhallaVintageVerb (send)**: short plate/room (~1s), blended subtly

---

## 4. Vocal Bus
**Goal:** Raw, gritty, intimate — "front porch," not over-polished.
**Lead Vocal Chain:**
1. **Nectar 4 De-esser** (6–8kHz wideband)
2. **uaudio_teletronix_la-2a_gray**: 2–3dB comp, smooth leveling
3. **Pro-Q 4**: dip muddiness ~200Hz, brighten 10–12kHz
4. **SoundToys Decapitator or Saturn 2 (warm mode)**: low drive for grit
5. **ValhallaRoom / Neoverb**: short room for realism
6. **Plate Reverb (send)**: for vibe and depth

**Harmonies:** Process with **SSL Native Vocalstrip 2** (light comp/EQ), blend gently.

---

## 5. Bass Bus
**Goal:** Round, steady foundation without losing natural tone.
**Suggested Chain:**
- **Pro-Q 4**: roll highs >8kHz
- **uaudio_studer_a800**: tape saturation for warmth
- **Neutron Compressor**: light 2–3dB compression

---

## 6. Mix Bus (Master)
**Goal:** Keep dynamics and authenticity, minimal sweetening.
**Suggested Chain:**
- **Ozone 11 Vintage Tape**: gentle warmth
- **SSL 4K B or uaudio_api_2500**: 1–2dB GR glue, slow attack
- **Pro-Q 4 (linear phase)**: subtle 0.5dB air shelf if needed
- **Ozone 11 Maximizer**: final level, aim -14 to -12 LUFS

---

## 7. Philosophy
- **Natural presence > perfection**
- Favor **bus moves** over track-by-track editing
- Use **shared reverb sends** for a unified space
- Leave **imperfections** (instrument creaks, breaths) for authenticity
