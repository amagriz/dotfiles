#!/bin/bash

while true; do
  osascript -e 'tell application "System Events" to get name of first application process whose frontmost is true'
  sleep 1
done
