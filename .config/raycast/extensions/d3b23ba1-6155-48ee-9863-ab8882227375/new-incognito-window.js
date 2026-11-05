"use strict";var n=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var h=(t,e)=>{for(var i in e)n(t,i,{get:e[i],enumerable:!0})},k=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of w(e))!g.call(t,o)&&o!==i&&n(t,o,{get:()=>e[o],enumerable:!(s=f(e,o))||s.enumerable});return t};var y=t=>k(n({},"__esModule",{value:!0}),t);var v={};h(v,{default:()=>p});module.exports=y(v);var d=require("@raycast/api"),m=require("@raycast/utils");var r=require("@raycast/utils");var a=require("@raycast/api"),b=require("@raycast/utils");var c=require("react"),T=require("@raycast/api"),D=require("@raycast/utils");var O=require("react/jsx-runtime");async function u(){await(0,r.runAppleScript)(`
      tell application "Dia"
        activate
        
        tell application "System Events"
          keystroke "n" using {command down, shift down}
        end tell
      end tell
    `)}async function p(){try{await(0,d.closeMainWindow)(),await u()}catch(t){await(0,m.showFailureToast)(t,{title:"Failed opening a new incognito window"})}}
