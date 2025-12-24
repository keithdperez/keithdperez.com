---
draft: true
categories: ["[[Guides]]"]
type: ["[[Guide]]"]
publish: false
---

# keithdperez.com DNS Setup

Your personal site is deployed and ready! Here's what you need to do to make it live at keithdperez.com.

## Current Status

- Site deployed to GitHub Pages: https://keithdperez.github.io/keithdperez.com/
- Custom domain configured in GitHub: keithdperez.com
- Content source: Your Obsidian vault at `Keith/personal/`
- Theme: Clean minimal design with Inter font and blue accents

## DNS Configuration Required

You need to update your DNS records for keithdperez.com to point to GitHub Pages.

### Steps

1. Log into your domain registrar (wherever you registered keithdperez.com)
2. Go to DNS settings / DNS management
3. Create 4 A records pointing to GitHub's servers:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

4. Remove any existing A records for @ (root domain)
5. Save the changes

### DNS Propagation

- Changes can take 24-48 hours to propagate worldwide
- Usually works in a few minutes to a few hours
- You can check status at: https://dnschecker.org

### HTTPS

Once DNS is configured and propagates:
- GitHub will automatically enable HTTPS
- Your site will be accessible at https://keithdperez.com
- HTTP will redirect to HTTPS

## Publishing Workflow

### How to Publish New Content

1. Write or edit notes in Obsidian `Keith/personal/` folder
2. Commit and push changes:
   ```bash
   cd ~/projects/keithdperez-site
   git add content/
   git commit -m "Update personal reflections"
   git push
   ```
3. GitHub Actions automatically builds and deploys (takes ~1 minute)
4. Changes appear live at keithdperez.com

### Quartz Sync Command

Or use Quartz's built-in sync:
```bash
cd ~/projects/keithdperez-site
npx quartz sync
```

This does git pull + add + commit + push in one command.

## Site Configuration

Current customizations in `quartz.config.ts`:

- **Fonts**: Inter (header/body), JetBrains Mono (code)
- **Colors**: Blue accent (#3b82f6), clean minimal palette
- **Dark mode**: Enabled
- **Page title**: Keith Perez
- **Base URL**: keithdperez.com

## What Gets Published

Only notes in `Keith/personal/` folder are published. Other folders (church, production, daily) stay private in your vault.

### Excluding Content

To keep specific notes private, move them out of the `personal/` folder or add to `.gitignore`.

## Monitoring Deployments

Check deployment status:
```bash
cd ~/projects/keithdperez-site
gh run list --workflow=deploy.yml --limit 5
```

View deployment logs:
```bash
gh run view --log
```

## Next Steps

Once DNS is configured:

1. Wait for propagation
2. Visit https://keithdperez.com
3. Verify HTTPS is working
4. Start publishing your reflections

## Future Enhancements

Consider adding:
- RSS feed (already configured)
- Comments via GitHub Discussions
- Analytics (Plausible, already configured in config)
- More custom styling

## Repository

GitHub: https://github.com/keithdperez/keithdperez.com

Your site is live at the GitHub Pages URL now and will switch to keithdperez.com once DNS propagates.
