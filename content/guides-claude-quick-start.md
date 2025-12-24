---
draft: true
categories: ["[[Guides]]"]
type: ["[[Guide]]"]
publish: false
---

# Claude Code Quick Start Examples

Try these right now to see how your custom setup works!

## Example 1: System Health Check

```bash
claude /system-check
```

I'll check:
- Disk space
- Homebrew status
- Outdated packages
- Tailscale connection

Takes 10 seconds. You'll know if anything needs attention.

---

## Example 2: Create Client Follow-Up

Scenario: You just finished mixing for a client named Sarah.

```bash
claude /follow-up
```

Then tell me:
- Project type: "audio mixing"
- Client: "Sarah"
- What you delivered: "final master v2"

I'll draft an email in your voice. You review and approve before sending.

**What you'll get**:
```
Hey Sarah,

Just finished the final master for your track. I sent v2 over via Dropbox -
check your email for the link.

I made some adjustments to the low end and brought up the vocals a bit in
the chorus like you mentioned. If this sounds good, you're all set. If you
want any tweaks, just let me know.

Keith
```

---

## Example 3: Create Documentation

Scenario: You need to document the ProPresenter Sunday setup for volunteers.

```bash
claude /doc
```

Tell me what to document: "ProPresenter Sunday morning setup"

I'll create step-by-step instructions that volunteers can follow without you.

---

## Example 4: Organize Your Obsidian Vault

```bash
claude /vault-organize
```

I'll help you:
- Create a simple folder structure
- Set up templates
- Organize existing notes
- Make it shareable

Won't overwhelm you. Start simple, enhance gradually.

---

## Example 5: Remote Access Help

Scenario: Can't connect to church server.

```bash
claude /remote-help
```

Tell me the issue: "can't SSH to dc"

I'll troubleshoot:
- Check Tailscale status
- Test connectivity
- Try alternative methods (mosh, VNC)
- Give specific fix steps

---

## Example 6: General Help

Just talk to me:

```bash
claude
```

Then ask anything:
- "Help me write a quote for a wedding event"
- "My zsh is loading slowly"
- "Create volunteer instructions for the sound system"
- "Organize my Ableton project templates"
- "Draft a follow-up for the church installation project"

I'll figure out which agent to use and help you out.

---

## Example 7: Config Help

```bash
claude /dotfiles-help
```

Ask about:
- Optimizing configs
- Creating new functions
- Brewfile management
- Documenting your setup

---

## Example 8: Safe Cleanup

```bash
claude /cleanup
```

I'll:
- Check disk space
- Find safe files to remove
- Clear caches
- Free up space

Won't touch Ableton, Adobe, or plugins.

---

## Pro Tips

### 1. Just Ask in Plain Language
Don't overthink it. Just say what you need:
- "Create a follow-up for this project"
- "Help me document this workflow"
- "Check if my system is healthy"

### 2. I'll Ask for Details
If I need more info, I'll ask:
- Client name?
- What type of project?
- Any specific requirements?

### 3. You Always Approve
I draft, you approve. Nothing goes out without your OK.

### 4. Tell Me When I'm Wrong
If something doesn't sound like you:
- "That's too formal"
- "I wouldn't say it that way"
- "Can you make it more casual?"

I'll learn and adjust.

---

## Try Right Now

1. Open terminal
2. Type: `claude /system-check`
3. See how it works

Then try whatever you actually need help with today.

---

## Your Custom Setup Locations

Everything's in `~/.claude/`:
```
~/.claude/
├── agents/                     # 5 specialized agents
│   ├── keiths-voice.md
│   ├── dotfiles-architect.md
│   ├── system-maintenance.md
│   ├── remote-admin.md
│   └── knowledge-manager.md
├── commands/                   # 8 slash commands
│   ├── follow-up.md
│   ├── doc.md
│   ├── quote.md
│   ├── vault-organize.md
│   ├── system-check.md
│   ├── cleanup.md
│   ├── remote-help.md
│   └── dotfiles-help.md
├── config.json                 # Your optimized settings
├── keiths-voice-profile.md     # How you sound
└── README.md                   # Full documentation
```

You can edit any of these. They're yours to customize.

---

## What's Next?

### This Week
- Try the slash commands
- Use `/follow-up` for a real client
- Run `/system-check` daily
- Ask for help when you need it

### Coming Soon
Automation opportunities I spotted:
- YouTube Live auto-scheduling (Saturday manual process)
- ProPresenter sermon parser (parse RED text from Google Doc)
- Ableton template generator
- Client project tracker
- Volunteer training documentation system

Just ask when you're ready: "Can you help automate [specific task]?"

---

Need help? Just ask. That's what I'm here for.
