#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Launch Neovim in Ghostty
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 📝
# @raycast.packageName Developer Tools

# Documentation:
# @raycast.description Opens Ghostty and launches Neovim.
# @raycast.author YourName

# Replace these paths with the output of 'which ghostty' and 'which nvim'
#GHOSTTY_PATH="/Applications/Ghostty.app/Contents/MacOS/ghostty"
#NVIM_PATH="/opt/homebrew/bin/nvim"

#if [ -z "$1" ]; then
#  $GHOSTTY_PATH -e $NVIM_PATH
#else
#  $GHOSTTY_PATH -e $NVIM_PATH "$1"
#fi
/Applications/Ghostty.app/Contents/MacOS/ghostty -e nvim
