---
publish: false
---

/Users/keithperez/Library/Mobile Documents/iCloud~md~obsidian/Documents/keithdperez Agent Ecosystem Complete
Structure Created
~/.config/opencode/
├── opencode.json          # Main config with MCP servers
├── SETUP.md               # Setup guide & documentation
├── agent/
│   ├── write.md           # Writing agent (your voice)
│   ├── design.md          # Creative design agent
│   ├── plan-life.md       # Life planning agent
│   ├── cli.md             # CLI/dotfiles agent
│   └── garden.md          # Digital garden agent
├── command/
│   ├── write.md           # /write command
│   ├── design.md          # /design command
│   ├── plan.md            # /plan command
│   ├── cli.md             # /cli command
│   ├── garden.md          # /garden command
│   ├── publish.md         # /publish command
│   └── obsidian-plugin.md # /obsidian-plugin command
└── mcp/
    └── things-server.js   # Custom Things 3 MCP server
Available Commands
| Command | What it does |
|---------|--------------|
| /write | Write content in your voice with your essay structure |
| /design | Creative design, CSS, web work (has creative liberty) |
| /plan | Life planning with Things 3 access |
| /cli | Modify your dotfiles and terminal setup |
| /garden | Improve vault cross-linking and quality |
| /publish | Push vault changes to Quartz site |
| /obsidian-plugin <repo> | Install Obsidian plugins from GitHub |
MCP Servers Configured
1. Filesystem - Access to vault, dotfiles, Dropbox, Quartz
2. Things 3 - Custom AppleScript server for task management
3. Browser (Puppeteer) - Web research for design references
4. Context7 - Documentation search
Next Steps
5. Restart OpenCode to load the new configuration
6. Test the commands: Try /plan help me sort my week
7. Grant Things 3 permissions: First time you use Things tools, macOS will ask for automation permissions
8. Optional: Set up Google OAuth following the guide in ~/.config/opencode/SETUP.md
Writing Style Captured
Your writing agent knows:
- Opening blockquote thesis in italics
- --- section dividers
- Short H3 headers
- Single-sentence paragraphs
- Em dashes for emphasis
- Scripture anchoring at the end
- ### Connected Notes with wiki-links
- Your faith-integrated, personal voice
Try it out: /write Write a short piece about finding stillness in chaos