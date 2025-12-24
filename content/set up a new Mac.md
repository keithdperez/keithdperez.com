---
categories: ["[[Guides]]"]
type: ["[[Guide]]"]
publish: false
---

# 🍎 Mac Init

> My clean slate setup process for a new macOS machine.  
> Covers Xcode, Homebrew, CLI tools, and personal vault configs.

---

## 1. System Basics

- Disable Gatekeeper prompts (optional):
    
    ```sh
    sudo spctl --master-disable
    ```
    
- Install Xcode CLI tools:
    
    ```sh
    xcode-select --install
    ```
    
- Enable tap-to-click, fast key repeat, scroll direction, etc. (manual for now)
    

---

## 2. Install Homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Add to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```sh
eval "$(/opt/homebrew/bin/brew shellenv)"
```

---

## 3. Brew Packages

> Core CLI stack

```sh
brew install git neovim zsh tmux fzf ripgrep fd yazi starship
```

> Extra tools

```sh
brew install gh lazygit node python3
brew install --cask iterm2 raycast alt-tab
```

---

## 4. Set Up Dotfiles

Clone your dotfiles repo (private or public):

```sh
git clone git@github.com:keith/.dotfiles ~/.dotfiles
cd ~/.dotfiles && ./install
```

Link any configs (if not automated):

```sh
ln -s ~/.dotfiles/nvim ~/.config/nvim
```

---

## 6. Fonts & UI

- [Fira Code](https://github.com/tonsky/FiraCode)
    
- [SF Pro Fonts (Apple)](https://developer.apple.com/fonts/)
    

---

## 7. Manual Installs (Not via Brew)

- [SoundToys Suite](see `[[downloads]]`)
    
- [Sunday Keys for Ableton/Mainstage](see `[[downloads]]`)
    
- [Ableton Live](from license/email)
    
- [Helix Native](from Line6 account)
    

---

## 8. Login Credentials

Reference: `[[vault/dev]]`, `[[vault/personal]]`

---

