#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Launch btop in Ghostty
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 📈
# @raycast.packageName System Tools

# Documentation:
# @raycast.description Opens Ghostty and immediately runs the btop monitor.
# @raycast.author YourName

/Applications/Ghostty.app/Contents/MacOS/ghostty -e btop
