"use strict";var n=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var k=(t,e)=>{for(var i in e)n(t,i,{get:e[i],enumerable:!0})},y=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of g(e))!h.call(t,o)&&o!==i&&n(t,o,{get:()=>e[o],enumerable:!(s=w(e,o))||s.enumerable});return t};var b=t=>y(n({},"__esModule",{value:!0}),t);var C={};k(C,{default:()=>f});module.exports=b(C);var m=require("@raycast/api"),p=require("@raycast/utils");var r=require("@raycast/utils");var a=require("@raycast/api"),_=require("@raycast/utils");function l(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}var u=require("react"),D=require("@raycast/api"),O=require("@raycast/utils");var v=require("react/jsx-runtime");async function d(t){if(t){let e=l(t);await(0,r.runAppleScript)(`
        tell application "Dia"
          activate
          tell application "System Events"
            tell process "Dia"
              tell menu bar item "File" of menu bar 1
                click
                tell menu item "New Window" of menu "File"
                  click
                  delay 0.1
                  click menu item "New ${e} Window" of menu 1
                end tell
              end tell
            end tell
          end tell
        end tell
      `)}else await(0,r.runAppleScript)(`
        tell application "Dia"
          activate
          tell application "System Events"
            keystroke "n" using {command down}
          end tell
        end tell
      `)}async function f(t){try{await(0,m.closeMainWindow)(),await d(t.arguments.profile)}catch(e){await(0,p.showFailureToast)(e,{title:"Could not open a new Dia window"})}}
