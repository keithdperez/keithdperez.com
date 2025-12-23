
A comprehensive guide to version control, how Git actually works, and when (and when not) to use GitHub.

---

## What Git Actually Is

Git is a **distributed version control system**. But what does that really mean?

At its core, Git is a content tracker that takes snapshots of your project over time. Think of it like a sophisticated undo system that remembers every version of every file you've ever saved, along with who changed what and why.

The "distributed" part means every copy of a Git repository is a complete, independent version with full history. You're not dependent on a central server—you have everything locally.

---

## The Fundamental Concepts

### Repository (Repo)
A repository is a project folder that Git is tracking. It contains:
- Your actual project files
- A hidden `.git` folder that stores all the version history and metadata

When you "initialize" a Git repo (`git init`), Git creates that `.git` folder and starts watching.

### Commits
A commit is a snapshot of your entire project at a specific point in time. Think of it like a save point in a video game—you can always return to it.

Each commit contains:
- The state of all your files at that moment
- A unique ID (SHA hash) like `26aaed6`
- Author information (who made the change)
- Timestamp (when it was made)
- Commit message (why it was made)

**Key insight:** Git doesn't store differences between files—it stores complete snapshots. It's smart about storage though, using compression and only storing changed files.

### Branches
A branch is a movable pointer to a commit. The default branch is usually called `main` (or `master` in older repos).

Branches let you work on different versions of your project simultaneously:
- `main` — your stable, production-ready code
- `feature-new-login` — experimental work on a new feature
- `bugfix-broken-link` — fixing a specific issue

When you create a branch, you're not duplicating files—you're just creating a new pointer. Branches are lightweight and cheap.

### HEAD
`HEAD` is Git's way of saying "you are here." It points to your current branch and commit. When you switch branches, HEAD moves.

### Staging Area (Index)
This is the middle ground between your working directory and your commit history. You can selectively choose which changes to include in your next commit.

The workflow:
1. **Working Directory** — where you edit files
2. **Staging Area** — where you prepare changes (`git add`)
3. **Repository** — where commits are saved (`git commit`)

### Remote
A remote is a version of your repository hosted somewhere else (like GitHub, GitLab, or another computer). You can push your changes to a remote and pull others' changes from it.

Common remote operations:
- `origin` — the default name for your main remote
- `git push` — send your commits to the remote
- `git pull` — fetch and merge changes from the remote
- `git fetch` — download changes without merging them

---

## How Git Actually Works (Under the Hood)

Git stores data as a series of snapshots in a tree structure. Here's what happens when you make a commit:

1. **Blob objects** — Git compresses and stores each file as a "blob"
2. **Tree objects** — Git creates a tree that maps filenames to blobs
3. **Commit objects** — Git creates a commit that points to the tree and includes metadata

Each object is identified by a SHA-1 hash (that long string of letters and numbers).

When you commit, Git:
- Takes the current state of your staging area
- Creates blob objects for any new or changed files
- Creates a tree object representing your project structure
- Creates a commit object that points to the tree and links to the previous commit (the parent)

This creates a **directed acyclic graph** (DAG)—a chain of commits where each one knows its parent(s). That's why you can trace your entire history.

**Branches are just pointers:** A branch is literally a file in `.git/refs/heads/` that contains a commit SHA. When you commit, Git updates the pointer to the new commit.

---

## Navigating Git: Essential Commands

### Starting and Checking Status

```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone https://github.com/username/repo.git

# Check what's changed
git status

# See your commit history
git log
git log --oneline --graph --all  # visual branch history
```

### Making Changes

```bash
# Stage specific files
git add filename.md
git add folder/

# Stage everything
git add .
git add -A

# Commit staged changes
git commit -m "Add new essay on rooted masculinity"

# Stage and commit in one step (only for tracked files)
git commit -am "Quick fix to daily note template"

# Amend the last commit (if you forgot something)
git commit --amend
```

### Branching

```bash
# Create a new branch
git branch feature-name

# Switch to a branch
git checkout feature-name
git switch feature-name  # newer syntax

# Create and switch in one command
git checkout -b feature-name
git switch -c feature-name  # newer syntax

# List all branches
git branch
git branch -a  # include remote branches

# Delete a branch
git branch -d feature-name  # safe delete (only if merged)
git branch -D feature-name  # force delete
```

### Merging and Rebasing

```bash
# Merge a branch into your current branch
git merge feature-name

# Rebase your branch onto another (rewrite history)
git rebase main

# Interactive rebase (clean up commits)
git rebase -i HEAD~3  # last 3 commits
```

**Merge vs Rebase:**
- **Merge** creates a new commit that combines two branches (preserves history)
- **Rebase** replays your commits on top of another branch (rewrites history, cleaner but potentially dangerous)

### Working with Remotes

```bash
# View remotes
git remote -v

# Add a remote
git remote add origin https://github.com/username/repo.git

# Push to remote
git push origin main
git push -u origin main  # set upstream tracking

# Pull from remote
git pull origin main
git pull  # if tracking is set

# Fetch without merging
git fetch origin

# Push a new branch to remote
git push -u origin feature-name
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- filename.md
git restore filename.md  # newer syntax

# Unstage a file (keep changes in working directory)
git reset HEAD filename.md
git restore --staged filename.md  # newer syntax

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes in working directory)
git reset --mixed HEAD~1
git reset HEAD~1  # same as above

# Undo last commit (discard changes completely)
git reset --hard HEAD~1  # DANGEROUS

# Create a new commit that undoes a previous commit
git revert commit-hash  # safer than reset
```

### Viewing History and Changes

```bash
# See what changed in a file
git diff filename.md

# See staged changes
git diff --staged

# See changes in a specific commit
git show commit-hash

# Search commit messages
git log --grep="bug fix"

# See who changed what line in a file
git blame filename.md

# Find when a bug was introduced
git bisect start
```

---

## What GitHub Adds to Git

GitHub is not Git. GitHub is a **hosting service** for Git repositories that adds:

### 1. Remote Hosting
Your code lives on GitHub's servers, accessible from anywhere. This provides backup and collaboration infrastructure.

### 2. Collaboration Tools
- **Pull Requests (PRs)** — propose changes and get feedback before merging
- **Code Review** — inline comments, suggestions, approval workflows
- **Issues** — bug tracking, feature requests, discussions
- **Projects** — kanban boards for project management
- **Wiki** — documentation space

### 3. Automation
- **GitHub Actions** — CI/CD workflows (automated testing, deployment)
- **Webhooks** — trigger external services when things happen
- **Apps** — integrate third-party tools

### 4. Social/Discovery Features
- **Following** users and starring repos
- **Forks** — creating your own copy of someone else's repo
- **Contributions graph** — showing your activity
- **GitHub Pages** — free static site hosting

### 5. Access Control
- **Organizations** — manage teams and permissions
- **Branch protection** — require reviews, status checks before merging
- **Secrets** — store sensitive data for Actions

---

## When to Use GitHub

### ✅ Good Use Cases

**1. Open Source Projects**
GitHub is the de facto home for open source. If you want others to discover, use, and contribute to your project, GitHub is essential.

**2. Team Collaboration**
Pull requests, code review, and issue tracking make GitHub excellent for teams working on the same codebase.

**3. Automated Workflows**
GitHub Actions can run tests, deploy code, build documentation, send notifications—powerful automation that's free for public repos.

**4. Portfolio/Resume**
Your GitHub profile is a living resume. Employers often check candidates' GitHub activity to assess coding skills.

**5. Documentation and Project Management**
Issues, wikis, and README files create a central hub for project information. GitHub's markdown rendering is excellent.

**6. Free Hosting**
GitHub Pages hosts static sites for free. Great for portfolios, documentation, and small projects (like keithdperez.com).

**7. Backup and Access**
Your code is safe on GitHub's servers and accessible from any device. It's version control in the cloud.

**8. Integration Ecosystem**
Thousands of tools integrate with GitHub: CI/CD, project management, code quality, security scanning, etc.

### Example: Your Vault Setup

Your Obsidian vault uses GitHub effectively:
- **Version control** — track changes to your notes over time
- **Automation** — GitHub Actions trigger site rebuilds when you push
- **Backup** — your writing is safely stored remotely
- **Publishing** — the repo serves as the source for your public site

---

## When to Avoid GitHub (or Consider Alternatives)

### ❌ Not Ideal For

**1. Private, Sensitive Data**
While GitHub offers private repos, storing highly sensitive information (passwords, API keys, financial data) in version control is risky. Use environment variables, secrets managers, or encrypted vaults instead.

**Your vault's `.gitignore`** appropriately excludes `/private/` and sensitive files for this reason.

**2. Large Binary Files**
Git isn't designed for large media files (videos, PSDs, high-res images). Every version of every binary file bloats the repo.

**Alternatives:**
- Git LFS (Large File Storage) for binaries
- Cloud storage (Dropbox, S3) with links in your repo
- Asset management systems for media

**3. Real-Time Collaboration**
Git is asynchronous. If you need simultaneous editing (like Google Docs), GitHub isn't the right tool.

**Better options:**
- Notion, Coda, Google Docs for real-time collaboration
- Figma, Miro for design collaboration
- Obsidian Sync with live editing (experimental)

**4. Non-Technical Users**
The Git learning curve is steep. If your team isn't technical, forcing them to use GitHub creates friction.

**Alternatives:**
- Notion, Confluence for documentation
- Airtable, Coda for structured data
- Specialized tools for the use case (e.g., WordPress for blogs)

**5. When You Need Control Over Infrastructure**
GitHub is a third-party service. If you need complete control (compliance, custom features, air-gapped environments), consider:
- Self-hosted GitLab
- Gitea or Gogs (lightweight self-hosted options)
- BitBucket Server

**6. Projects That Don't Need Versioning**
Not everything benefits from version control. If you're just storing static files that never change, a simple file storage solution (Dropbox, iCloud) is simpler.

**7. When Licensing/Privacy Is Critical**
GitHub's terms of service give them certain rights. For extremely sensitive IP or specific licensing needs, review carefully or self-host.

---

## Alternative Tools to Consider

### Git Hosting Platforms

**GitLab**
- Similar to GitHub, often used by enterprises
- Built-in CI/CD (more powerful than GitHub Actions)
- Can be self-hosted
- Better for large monorepos

**Bitbucket**
- Atlassian product (integrates with Jira, Confluence)
- Popular in enterprise environments
- Free private repos for small teams

**Gitea / Gogs**
- Lightweight, self-hosted Git service
- Open source, minimal resource requirements
- Good for personal servers or small teams

### Version Control Beyond Git

**Mercurial**
- Similar to Git but simpler commands
- Less popular but still used (Facebook used it internally)

**Perforce**
- Centralized version control for large binary files
- Used in game development (Unreal Engine, AAA studios)

**Subversion (SVN)**
- Older centralized system
- Still used in some enterprises

### Non-Git Collaboration Tools

**Notion / Coda**
- For living documents that need real-time collaboration
- Better for non-technical teams

**Obsidian Sync**
- Encrypted, real-time sync for Obsidian vaults
- Alternative to Git for personal knowledge bases

**Dropbox / iCloud**
- Simple file sync without version control complexity
- Good for non-code projects

---

## Practical Wisdom

### Keep Commits Atomic
Each commit should represent one logical change. Don't bundle unrelated changes together.

**Bad:**
```bash
git commit -m "Fixed bug, updated docs, refactored helper function"
```

**Good:**
```bash
git commit -m "Fix authentication bug in login flow"
git commit -m "Update API documentation for auth endpoints"
git commit -m "Refactor validateUser helper for clarity"
```

### Write Meaningful Commit Messages
Your future self (and collaborators) will thank you.

**Format:**
```
Short summary (50 chars or less)

More detailed explanation if needed. Wrap at 72 characters.
Explain what changed and why, not how (the code shows how).

- Bullet points are fine
- Reference issues: "Fixes #123"
```

### Branch Naming Conventions
Use descriptive, consistent names:
- `feature/user-authentication`
- `bugfix/broken-login-link`
- `hotfix/security-patch`
- `docs/update-readme`

### Don't Commit Secrets
Never commit passwords, API keys, or sensitive credentials. Use:
- Environment variables
- `.gitignore` to exclude config files
- Secrets management tools (GitHub Secrets, Vault)

If you accidentally commit a secret, you must:
1. Rotate/revoke the credential immediately
2. Remove it from Git history (complex, use `git filter-branch` or BFG Repo-Cleaner)

### Merge vs Rebase Strategy

**Use merge when:**
- Working on a shared branch
- You want to preserve the exact history
- You're not comfortable with rebase

**Use rebase when:**
- Cleaning up your feature branch before merging
- You want a linear history
- You're working on a private branch

**Golden rule:** Never rebase commits that have been pushed to a shared branch. You'll rewrite history and cause problems for others.

### Pull Before You Push
Always pull the latest changes before pushing your work:
```bash
git pull origin main
git push origin main
```

This prevents merge conflicts and keeps history clean.

### Use `.gitignore` Aggressively
Exclude files that don't belong in version control:
- Build artifacts (`dist/`, `build/`, `*.exe`)
- Dependencies (`node_modules/`, `venv/`)
- OS files (`.DS_Store`, `Thumbs.db`)
- IDE files (`.vscode/`, `.idea/`)
- Sensitive data (`*.env`, `secrets/`, `/private/`)

### Commit Often, Push Less Often
Commit frequently (every logical change), but you don't need to push every commit. This gives you flexibility to rewrite local history if needed.

---

## Common Workflows

### Solo Developer Flow
```bash
# Daily work
git pull                           # get latest
# ... make changes ...
git add .
git commit -m "Add new feature"
git push
```

### Feature Branch Flow
```bash
# Create feature branch
git checkout -b feature-new-login

# Work and commit
# ... make changes ...
git add .
git commit -m "Implement login form"

# Get latest main
git checkout main
git pull

# Merge feature
git checkout feature-new-login
git rebase main                    # or merge main into feature
git checkout main
git merge feature-new-login

# Push and cleanup
git push
git branch -d feature-new-login
```

### Pull Request Flow (GitHub)
```bash
# Create feature branch
git checkout -b feature-new-login

# Work and commit
# ... make changes ...
git add .
git commit -m "Implement login form"

# Push branch to GitHub
git push -u origin feature-new-login

# Create PR on GitHub (via web interface)
# Get code review, address feedback
# Merge via GitHub (creates merge commit)

# Update local main
git checkout main
git pull

# Delete feature branch
git branch -d feature-new-login
git push origin --delete feature-new-login
```

---

## Troubleshooting Common Issues

### Merge Conflicts
When Git can't automatically merge changes:

```bash
# After git merge or git pull
# Git marks conflicts in files:
<<<<<<< HEAD
Your version
=======
Their version
>>>>>>> branch-name

# 1. Open files and resolve conflicts manually
# 2. Remove conflict markers
# 3. Stage resolved files
git add resolved-file.md

# 4. Complete the merge
git commit
```

### Accidentally Committed to Wrong Branch
```bash
# You're on main but wanted to commit to feature branch
git reset HEAD~1           # undo commit, keep changes
git stash                  # save changes temporarily
git checkout feature-name
git stash pop              # apply changes
git add .
git commit -m "Message"
```

### Pushed Something You Shouldn't Have
```bash
# If no one else has pulled
git revert commit-hash     # safer option
git push

# Or if you must rewrite history (dangerous if shared)
git reset --hard commit-hash
git push --force           # ONLY if you're sure
```

### Detached HEAD State
```bash
# You checked out a specific commit instead of a branch
git checkout commit-hash   # now in detached HEAD

# To keep changes, create a branch
git checkout -b new-branch-name

# To discard and return to main
git checkout main
```

---

## Final Thoughts

Git is complex because it's powerful. You don't need to master everything—most developers use 10-20 commands regularly and Google the rest.

**Core principles:**
1. **Commit often** — small, logical changes
2. **Write clear messages** — your future self will thank you
3. **Branch fearlessly** — they're cheap and safe
4. **Pull before push** — stay in sync
5. **Don't panic** — almost everything is recoverable in Git

GitHub is a tool, not a requirement. Use it when it adds value (collaboration, automation, hosting). Skip it when it adds complexity without benefit.

The best way to learn Git is to use it daily. Make mistakes in a test repo. Break things and fix them. Git's entire design philosophy is about making it hard to permanently lose work—take advantage of that while learning.

---

## Resources for Going Deeper

- **Pro Git book** (free online) — comprehensive reference
- **Oh Shit, Git!** — fixing common mistakes
- **Git from the inside out** — understanding Git's internals
- **GitHub Docs** — official GitHub guides
- **Learn Git Branching** (interactive tutorial) — visual practice

Git is a journey, not a destination. Start with the basics, build confidence, and gradually expand your knowledge as you encounter new scenarios.
