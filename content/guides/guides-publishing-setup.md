---
draft: true
---

# Your Obsidian Vault Organization & Publishing Setup

## ✅ What Just Happened

### Vault Organization Complete!

Your "Keith" vault is now organized:

```
Keith/
├── church/ (9 notes)
│   ├── The Table.md
│   ├── ProPresenter-Church-Setup-Guide.md
│   ├── Sunday Setup & Teardown for The Table.md
│   ├── Audio Checklist.md
│   ├── Media checklist.md
│   ├── worship setlists.md
│   ├── Arts Team.md
│   └── ...
│
├── personal/ (40+ notes)
│   ├── Marriage/Relationship (Julianna, date nights, rebuilding trust)
│   ├── Personal Growth (masculinity, spiritual fatherhood, holy ambition)
│   ├── Spiritual Reflections (fruit, sabbath, inner authority)
│   └── ...
│
├── production/ (6 notes)
│   ├── mixing & mastering.md
│   ├── mixing chains.md
│   ├── mixing workflow.md
│   ├── processing cheat sheet.md
│   ├── file naming convention.md
│   └── drum machines.md
│
├── daily/ (your dated daily notes)
├── projects/ (client projects - unchanged)
├── bible/ (unchanged)
├── templates/ (unchanged)
└── [69 notes still in root - working notes, misc]
```

**You can still work from root** - the folders are there to FIND things, not restrict you.

---

## 🌐 Your Publishing Vision

### Two Websites You Want to Create

#### 1. Personal Site: www.keithdperez.com
**Purpose**: Share your insights, reflections, personal world
**Content from**: `personal/` folder in your vault
**Publish**: Reflections, spiritual insights, personal growth journey

#### 2. Church Site: docs.thetablechurch.life
**Purpose**: Documentation and resources for The Table Church
**Content from**: Future "The Table" vault (symlinked)
**Publish**: Church guides, ProPresenter docs, volunteer training, setup instructions

---

## 📚 Publishing Tech Stack (Quartz)

### What is Quartz?
- Converts Obsidian markdown notes → beautiful static website
- Hosts free on GitHub Pages
- Based on: https://quartz.jashny.zhao

### Benefits
- Write in Obsidian (your workflow stays the same)
- Publish with a git push
- Free hosting (GitHub Pages)
- Fully customizable (Tailwind CSS)
- Search, graph view, backlinks built-in

---

## 🚀 Next Steps: Publishing Setup

### Phase 1: Personal Site (keithdperez.com)

**What we'll do**:
1. Clone Quartz repository
2. Configure for your personal vault
3. Set up GitHub repository
4. Configure custom domain (keithdperez.com)
5. Create publish workflow
6. Customize with your style/colors

**Command to start**:
```bash
cd ~/projects
git clone https://github.com/jackyzha0/quartz.git keithdperez-site
cd keithdperez-site
npm install
```

**Your content source**:
- `/Users/keithperez/Library/Mobile Documents/iCloud~md~obsidian/Documents/Keith/personal/`

**What gets published**:
- Only notes you want to share (you control this)
- Clean URLs: keithdperez.com/holy-ambition
- Automatic backlinks and graph view

### Phase 2: Church Site (docs.thetablechurch.life)

**What we'll do**:
1. Create new "The Table" Obsidian vault
2. Symlink to your church Google Drive
3. Clone Quartz for church site
4. Set up separate GitHub repo
5. Configure subdomain on Squarespace
6. Publish church documentation

**The Table vault structure**:
```
The Table/
├── sunday-setup/
├── propresenter/
├── audio-system/
├── volunteer-guides/
├── tech-docs/
└── team/
```

**What gets published**:
- Public documentation for volunteers
- Setup guides
- Troubleshooting docs
- Service checklists

---

## 🎨 Customization Plan

### Design Approach
- Start with Quartz defaults (clean, professional)
- Customize colors to match your brand
- Use Tailwind CSS for styling
- Add your personal touch

### Personal Site Theme Ideas
- Warm, approachable colors
- Focus on readability
- Highlight spiritual/reflective content
- Simple navigation

### Church Site Theme
- Clean, professional
- Easy to scan (volunteers need quick info)
- Search-first (find guides fast)
- Mobile-friendly (access on phone during setup)

---

## 📋 Immediate Action Items

### Ready to Start Publishing?

**Option A: Set up personal site first** (keithdperez.com)
```bash
claude "Help me set up Quartz for my personal site"
```

**Option B: Set up church site first** (docs.thetablechurch.life)
```bash
claude "Help me set up Quartz for The Table church site"
```

**Option C: Do both in parallel** (I can help with this)

### Before We Publish

**Decide what to share**:
- Not all personal notes need to be public
- You control exactly what gets published
- We can add front matter to notes: `publish: true/false`

**Example**:
```markdown
---
title: Holy Ambition
publish: true
tags: [spiritual-growth, personal]
---

# Holy Ambition

Your content here...
```

---

## 🔄 Publishing Workflow (Once Set Up)

### How Publishing Will Work

**For Personal Site**:
1. Write in Obsidian (like you do now)
2. Mark notes you want to publish
3. Run: `npm run publish` (or we automate this)
4. Changes go live on keithdperez.com

**For Church Site**:
1. Update church docs in "The Table" vault
2. Run publish command
3. Updates appear on docs.thetablechurch.life
4. Volunteers see latest guides

### Git Workflow
```bash
# Personal site
cd ~/projects/keithdperez-site
npm run build
git add .
git commit -m "Update reflections"
git push

# Church site
cd ~/projects/thetable-docs
npm run build
git add .
git commit -m "Update Sunday setup guide"
git push
```

We can automate this with a simple script or GitHub Actions.

---

## 🛠️ Technical Setup Preview

### GitHub Repositories You'll Create
1. `keithdperez/keithdperez.com` - Personal site
2. `thetablechurch/docs` - Church documentation

### Domain Configuration

**Personal Site**:
- Domain: keithdperez.com (you already own this)
- DNS: Point to GitHub Pages
- HTTPS: Automatic via GitHub

**Church Site**:
- Subdomain: docs.thetablechurch.life
- Squarespace DNS: Add CNAME record
- Point to GitHub Pages

### File Structure
```
~/projects/
├── keithdperez-site/          # Personal Quartz site
│   ├── content/               # Symlink to Keith/personal/
│   ├── quartz.config.ts      # Site configuration
│   └── ...
│
└── thetable-docs/             # Church Quartz site
    ├── content/               # Symlink to The Table vault
    ├── quartz.config.ts
    └── ...
```

---

## 💡 Cool Features You'll Get

### Built-in Quartz Features
- **Full-text search** - Find any note instantly
- **Graph view** - See connections between notes
- **Backlinks** - Automatic note relationships
- **Dark mode** - Easy on the eyes
- **Mobile responsive** - Works on any device
- **Fast** - Static site = lightning quick

### Custom Features We Can Add
- **RSS feed** - People can subscribe to your reflections
- **Comments** - Optional (via GitHub Discussions)
- **Analytics** - See what people find helpful
- **Custom styling** - Match your personal brand

---

## 📝 What You Need to Decide

Before we set up publishing, think about:

1. **What do you want to share publicly?**
   - All personal reflections?
   - Selected insights?
   - Growth journey posts?

2. **How often will you publish?**
   - As you write?
   - Weekly batch?
   - When inspired?

3. **Do you want comments/feedback?**
   - Enable discussions?
   - Contact form?
   - Social media links?

4. **Church site access**:
   - Fully public?
   - Password protected sections?
   - Just for The Table members?

---

## 🎯 Let's Get Started

When you're ready, just say:

**"Set up my personal publishing site"**
OR
**"Set up The Table church documentation site"**
OR
**"Let's do both - start with [personal/church]"**

I'll walk you through each step and we'll get you publishing in no time.

---

## 📚 Resources

- **Quartz Documentation**: https://quartz.jashny.zhao
- **Quartz GitHub**: https://github.com/jackyzha0/quartz
- **GitHub Pages**: https://pages.github.com
- **Tailwind CSS**: https://tailwindcss.com (for customization)

---

**Your vault is organized. Your vision is clear. Let's publish your world.**
