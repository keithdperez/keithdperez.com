---
categories: ["[[Church]]"]
publish: false
---

# ProPresenter Church Setup Guide
*Complete Configuration for Livestreaming, Confidence Monitors, and Audience Displays*

---

## Table of Contents
1. [Hardware Requirements](#hardware-requirements)
2. [Initial Setup & Configuration](#initial-setup--configuration)
3. [Screen Configuration](#screen-configuration)
4. [Confidence Monitor (Stage Display) Setup](#confidence-monitor-stage-display-setup)
5. [Audience Screen Configuration](#audience-screen-configuration)
6. [Livestream Output Setup](#livestream-output-setup)
7. [General Configuration & Best Practices](#general-configuration--best-practices)
8. [Troubleshooting Tips](#troubleshooting-tips)

---

## Hardware Requirements

### Computer Specifications

**Recommended Setup:**
- **Mac**: Mac Mini M4 (base model for basic setups, 10-core CPU/GPU version for 3+ screens)
  - Alternative: Mac Mini M2 Pro or Mac Studio M1 Max/Ultra
- **Windows**: i7 or i9 processor with dedicated GPU
- **RAM**: Minimum 16GB (32GB recommended for complex setups)
- **Storage**: At least 512GB SSD (256GB minimum, but limited for media storage)

**Performance Considerations:**
- Base Mac Mini M4 handles: lyrics, motion backgrounds, confidence monitors, and livestream graphics with ease
- Upgrade to 10-core model if running more than three unique screens
- Dedicated GPU essential for Windows systems

### Display Hardware

**For Stage Display/Confidence Monitor:**
- External monitor (can use existing TV or computer monitor)
- Connection options:
  - HDMI port (direct connection)
  - Mini-Display Port/Thunderbolt adapter
  - USB video adapter (for computers with limited outputs)

**For Livestreaming:**
- NDI network connection (recommended - requires gigabit Ethernet)
- SDI output (requires Blackmagic DeckLink Card or UltraStudio 4K)
- HDMI capture card (alternative)

---

## Initial Setup & Configuration

### First Launch Setup

1. **Open ProPresenter** for the first time
2. **Welcome Screen Options:**
   - Choose whether to enable House of Worship features
   - Enable/disable: Renewed Vision Media Store, Bibles, Planning Center Online integration
3. **Access Preferences:**
   - Mac: Press `Command + Comma`
   - Windows: Press `Control + Comma`
   - Or: Click ProPresenter menu → Preferences

### Essential Preference Settings

#### Display Tab
1. Open Preferences → Display
2. Click the **Arrangement** tab
3. **Uncheck** "Mirror Displays" option
4. Arrange your screens in the visual layout

#### Media Repository
1. Set directory where purchased/imported media is stored
2. **Optional**: Check "Manage Media Automatically" to copy all imported media to this location
3. Ensure sufficient storage space on selected drive

#### House of Worship Settings
Toggle these features based on your needs:
- Bible integration
- Planning Center Online sync
- Media Store access

---

## Screen Configuration

### Understanding Screen Types

ProPresenter uses two main screen categories:

1. **Audience Screens**: All crowd-facing displays (sanctuary screens, lobby monitors)
2. **Stage Screens**: Displays visible to performers/production team (confidence monitors, operator screens)

### Basic Configuration Steps

1. **Open Screen Configuration:**
   - Menu Bar → Screens → Configure Screens

2. **Add Screens:**
   - Click the **+** button to add each physical display
   - Name each screen descriptively (e.g., "Main Sanctuary," "Stage Left Monitor," "Livestream Output")

3. **Assign Screen Types:**
   - Drag outputs to appropriate physical displays
   - Black "Output" box = Audience screens
   - Purple "SD" box = Stage Display screens

4. **Set Resolution & Frame Rate:**
   - Match each screen's native resolution for best quality
   - Standard: 1920x1080 @ 60fps
   - For livestreaming: Match your streaming resolution (typically 1080p or 720p)

---

## Confidence Monitor (Stage Display) Setup

### Hardware Connection

**Step 1: Physical Connection**
- Connect monitor to computer using available port:
  - Direct HDMI/DisplayPort (preferred)
  - Thunderbolt/Mini-DisplayPort adapter
  - USB video adapter (for limited ports)

**Step 2: Configure as External Display**
- Mac: System Preferences → Displays → Arrangement → Set up as extended display
- Windows: Display Settings → Multiple Displays → Extend these displays

### ProPresenter Stage Display Configuration

**Step 1: Enable Stage Display**
1. ProPresenter menu → Preferences → Display tab
2. Locate the box representing your stage monitor
3. Drag the purple "SD" box to that display
4. Check "Enable Stage Display"

**Step 2: Customize Stage Display Layout**
1. Menu Bar → Screen → Edit Stage Layouts
2. Available layout elements:
   - **Current Slide**: What's showing now
   - **Next Slide**: Upcoming slide preview
   - **Notes**: Speaker notes and cues
   - **Clocks**: System time, countdown timers
   - **Timers**: Event/segment timers
   - **Chord Charts**: For worship team
   - **Custom Messages**: Live messages to stage talent

**Step 3: Create Multiple Layouts**
Best practice: Create different layouts for different service segments:

- **Worship Layout**: Current slide + Next slide + Chord charts
- **Sermon Layout**: Current slide + Notes + Timer
- **Transition Layout**: Clock + Next slide + Custom messages

**Step 4: Layout Switching**
- **Manual**: Click layout dropdown during service
- **Automatic**: Add Actions to presentations to switch layouts automatically

### Stage Display Best Practices

- **Font Size**: Use large, readable fonts (visible from 10-15 feet)
- **High Contrast**: Dark background with white/bright text
- **Minimal Information**: Don't overcrowd—focus on essential info
- **Positioning**: Place monitors in natural sightlines for performers
- **Customization**: Ask your worship team what information they need most
- **Test Visibility**: Stand where performers will be and verify readability

---

## Audience Screen Configuration

### Setup Process

1. **Screen Configuration Menu:**
   - Screens → Configure Screens
   - Add audience screen(s)
   - Set to "Audience" type

2. **Resolution Settings:**
   - Match your projector/display's native resolution
   - Common settings: 1920x1080, 1280x720

3. **Layout Options:**
   - Standard: Full-screen output
   - Split: Multiple content areas (not recommended for worship)

### Output Best Practices

**For In-Person Congregation:**
- Use full-screen slides for lyrics, scripture, announcements
- High contrast (dark backgrounds, bright text)
- Large, readable fonts (minimum 60pt for lyrics)
- Test visibility from back of sanctuary

**Image & Video Guidelines:**
- Use high-resolution backgrounds (1080p minimum)
- Avoid overly busy backgrounds that make text hard to read
- Test all media before services

---

## Livestream Output Setup

### Understanding Livestream Needs

**Key Difference from Audience Screens:**
- In-person: Full-screen lyrics/scripture (covers whole screen)
- Livestream: Lower-thirds (overlay at bottom, shows stage in background)

This allows online viewers to see both the content AND what's happening on stage.

### Output Method 1: NDI (Recommended)

**Requirements:**
- Gigabit Ethernet network
- NDI-compatible streaming software (OBS, vMix, Ecamm Live)
- NDI version 6 compatibility

**Setup Steps:**

1. **Configure NDI Output in ProPresenter:**
   - Screens → Configure Screens
   - Click **+** to add new screen
   - Select "New NDI" from Output dropdown
   - Set resolution (typically 1920x1080)
   - Set frame rate (30fps or 60fps based on streaming specs)

2. **Enable Transparency (For Lower-Thirds):**
   - Click **Alpha Key** tab in screen settings
   - Check "Enable" checkbox
   - This makes backgrounds transparent for overlay effects

3. **Audio Configuration:**
   - ProPresenter Preferences → Audio tab
   - Under "SDI & NDI" subsection
   - Check "Enable" to send audio with NDI

4. **Connect to Streaming Software (OBS Example):**
   - In OBS: Add Source → NDI Source
   - Select ProPresenter NDI output from list
   - Position/resize as needed

**NDI Advantages:**
- No additional capture hardware required
- Network-based (multiple devices can receive)
- Includes embedded audio
- Alpha channel support for lower-thirds

### Output Method 2: SDI

**Requirements:**
- Blackmagic DeckLink Card or UltraStudio 4K device installed
- SDI cable to streaming switcher/encoder

**Setup:**
1. Install Blackmagic drivers
2. Connect SDI hardware to computer
3. ProPresenter: Screens → Configure Screens
4. Select SDI device from Output dropdown
5. Configure resolution and frame rate

**Audio over SDI:**
- Preferences → Audio → SDI & NDI
- Enable audio output

### Output Method 3: HDMI Capture

**Requirements:**
- HDMI capture card (Elgato, Blackmagic, etc.)

**Setup:**
1. Configure HDMI screen output in ProPresenter
2. Connect HDMI to capture device
3. Capture device feeds into streaming computer/software

### Livestream-Specific Features

**Lower-Thirds Configuration:**
1. Create separate "Livestream" output screen
2. Design templates with transparent backgrounds
3. Text positioned in lower third of frame
4. Use Alpha Key output for transparency

**Dual Output Strategy:**
- Audience screen: Full-screen content
- Livestream screen: Lower-thirds overlay
- Both update simultaneously from same presentation

---

## General Configuration & Best Practices

### Bible Setup

1. **Access Bibles:**
   - View → Bibles (menu bar)
   - Or click Bibles button in toolbar

2. **Install Bibles:**
   - Download desired translations
   - Register Bibles in preferences

3. **Bible Options:**
   - Show Verse Numbers: Display verse numbers in passages
   - Break on New Verse: Create new slide for each verse
   - Display Translation: Show which translation is being used

### Media Management

**Best Practices:**
- Create folder structure: Worship Songs, Sermon Media, Announcements, Backgrounds
- Use "Manage Media Automatically" to centralize media files
- Regularly clean up unused media to save storage
- Name files descriptively (not "IMG_1234.jpg")

### Planning Center Integration

If using Planning Center Online:
1. Enable in House of Worship settings
2. Link PCO account in preferences
3. Auto-import service orders and song arrangements
4. Reduces manual playlist creation

### Presentation Organization

**Folder Structure:**
```
ProPresenter Library/
├── Worship Songs/
│   ├── Fast Songs/
│   ├── Slow Songs/
│   └── Seasonal/
├── Sermon Series/
│   ├── Current Series/
│   └── Archive/
├── Announcements/
└── Special Events/
```

**Naming Conventions:**
- Songs: "Song Title - Artist"
- Sermons: "YYYY-MM-DD - Sermon Title"
- Announcements: "ANN - Topic - Date"

### Keyboard Shortcuts

Essential shortcuts to know:
- `Space`: Trigger next slide
- `Delete/Backspace`: Previous slide
- `Esc`: Clear all screens
- `Command/Ctrl + Comma`: Preferences
- `Command/Ctrl + F`: Search presentations

### Template Creation

**Create Consistent Look:**
1. Design master template with church branding
2. Set default fonts, colors, backgrounds
3. Save as reusable template
4. Apply to all presentations for consistency

---

## Troubleshooting Tips

### NDI Issues

**Problem: NDI source not appearing in streaming software**
- Verify both ProPresenter and streaming software use NDI version 6
- Check network connection (must be on same network)
- Restart NDI service in ProPresenter

**Problem: NDI video choppy/laggy**
- Ensure gigabit Ethernet connection (not WiFi)
- Check network bandwidth usage
- Lower resolution or frame rate if needed

### Stage Display Problems

**Problem: Stage display not showing**
- Verify physical connection to monitor
- Check Display preferences (computer recognizes monitor?)
- Ensure "Enable Stage Display" is checked
- Confirm purple "SD" box is on correct display

**Problem: Text too small on stage display**
- Edit Stage Layout → Select text elements → Increase font size
- Simplify layout to allow larger elements

### Performance Issues

**Problem: ProPresenter lagging/dropping frames**
- Check CPU usage (Activity Monitor/Task Manager)
- Reduce number of simultaneous outputs
- Lower resolution on less critical outputs
- Upgrade hardware if consistently overloaded
- Close unnecessary background applications

**Problem: Video playback stuttering**
- Convert videos to ProPresenter-optimized codec (H.264)
- Reduce video resolution if too high
- Store videos on fast SSD, not external USB drive

### General Issues

**Problem: Media files not importing**
- Check file format compatibility (MP4, MOV, PNG, JPG recommended)
- Ensure sufficient storage space
- Verify media isn't corrupted (test in other player)

**Problem: Presentations not saving**
- Check storage space
- Verify write permissions to ProPresenter library folder
- Restart ProPresenter

---

## Quick Start Checklist

For someone setting up ProPresenter for the first time:

- [ ] Install ProPresenter on appropriate computer
- [ ] Configure display arrangement (Preferences → Display)
- [ ] Connect and configure audience screen(s)
- [ ] Connect and configure stage display monitor
- [ ] Set up livestream output (NDI/SDI/HDMI)
- [ ] Install Bible translations
- [ ] Set up media repository location
- [ ] Create folder structure for organization
- [ ] Build presentation templates with church branding
- [ ] Configure stage display layouts for different service segments
- [ ] Test all outputs before first service
- [ ] Train operators on basic shortcuts and workflow
- [ ] Create backup plan (what if ProPresenter crashes?)

---

## Additional Resources

- **Official Documentation**: [learn.renewedvision.com/propresenter](https://learn.renewedvision.com/propresenter)
- **Support Articles**: [support.renewedvision.com](https://support.renewedvision.com)
- **Training**: Search for "ProPresenter training" on YouTube
- **Community**: ProPresenter Facebook groups and forums

---

*This guide created based on ProPresenter 7 best practices for church worship environments (2025)*
