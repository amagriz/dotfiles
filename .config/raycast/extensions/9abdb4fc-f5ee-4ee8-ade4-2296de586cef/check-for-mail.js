"use strict";var c=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var w=Object.prototype.hasOwnProperty;var m=(t,a)=>{for(var o in a)c(t,o,{get:a[o],enumerable:!0})},d=(t,a,o,l)=>{if(a&&typeof a=="object"||typeof a=="function")for(let i of p(a))!w.call(t,i)&&i!==o&&c(t,i,{get:()=>a[i],enumerable:!(l=s(a,i))||l.enumerable});return t};var f=t=>d(c({},"__esModule",{value:!0}),t);var h={};m(h,{default:()=>r});module.exports=f(h);var e=require("@raycast/api"),n=require("@raycast/utils");async function r(){await(0,e.closeMainWindow)(),await(0,e.showToast)(e.Toast.Style.Animated,"Checking for new mail"),await(0,n.runAppleScript)(`
    tell application "Mail"
      repeat with acc in accounts
        tell acc to check for new mail
      end repeat
    end tell
  `),await(0,e.showToast)(e.Toast.Style.Success,"Loaded new messages")}
