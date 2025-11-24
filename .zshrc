LC_CTYPE=en_US.UTF-8
LC_ALL=en_US.UTF-8

# history setup
HISTFILE=$HOME/.zhistory
SAVEHIST=1000
HISTSIZE=999
setopt share_history
setopt hist_expire_dups_first
setopt hist_ignore_dups
setopt hist_verify

# zsh-syntax-highlighting theme
source ~/.zsh/catppuccin_mocha-zsh-syntax-highlighting.zsh

# completion using arrow keys (based on history)
bindkey '^[[A' history-search-backward
bindkey '^[[B' history-search-forward
source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# ---- Eza (better ls) -----
alias ls="eza --hyperlink -a --icons=always"

# ---- Zoxide (better cd) ----
eval "$(zoxide init zsh)"

alias cd="z"

eval "$(starship init zsh)"

eval "$(fzf --zsh)"

# Created by `pipx` on 2025-11-23 00:54:06
export PATH="$PATH:/Users/lukemiles/.local/bin"
