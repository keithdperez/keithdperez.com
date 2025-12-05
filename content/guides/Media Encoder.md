# **Media Encoder: Hands-Free Video Automation**

A simple system to auto-export finished videos into multiple formats using Adobe Media Encoder’s **Watch Folders**.

---

## **Folder Setup**

> Dropbox/Videos/
├─ _MediaEncoder/
│  ├─ WatchFolders/
│  │  ├─ Highlights/
│  │  ├─ Tutorials/
│  │  └─ Messages/
│  └─ Output/
│     ├─ Highlights/
│     ├─ Tutorials/
│     └─ Messages/
├─ Footage/        ← Raw clips (by date/event)
├─ Projects/       ← Premiere or AE sessions
├─ Templates/      ← Logos, intros, .mogrt files

---

## **1. Highlights**

For events: church, weddings, parties, concerts.

**Steps:**
- Export master video from Premiere
- Drop into:
    _MediaEncoder/WatchFolders/Highlights/
- Media Encoder outputs:
    - 1920x1080 (YouTube/lobby)
    - 1080x1920 (Reels)
    - .jpg thumbnail (e.g. frame at 0:05)

---

## **2. Tutorials**

For walkthroughs or branded teaching content.

**Steps:**
- Export finished tutorial video
- Drop into:
    _MediaEncoder/WatchFolders/Tutorials/
- Media Encoder adds:
    - Intro/outro (preset)
    - Auto-ducked music (optional)
    - Outputs:
        - Full HD
        - Vertical crop
        - Compressed version

---

## **3. Quick Messages**

For iMessage or quick video updates.

**Steps:**
- Record on phone or Mac
- Drop into:
    _MediaEncoder/WatchFolders/Messages/
- Media Encoder:
    - Trims silence (optional)
    - Styles lightly
    - Compresses to < 20MB

---

## **Tips**

- ✅ Use **spaces** in folder names (clean in Finder)
- ✅ Use **underscores/dashes** in file names (safe for scripts)
- Keep WatchFolders clean — they’re temporary drop zones
- Archive source files in Footage/ after export

---

## **Next Steps (Optional)**

- Add auto-archive or file cleanup
- Use .epr presets for each folder
- Set up notifications when encoding finishes