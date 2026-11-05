"use strict";var n=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var g=(e,t)=>{for(var i in t)n(e,i,{get:t[i],enumerable:!0})},d=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of m(t))!u.call(e,l)&&l!==i&&n(e,l,{get:()=>t[l],enumerable:!(a=c(t,l))||a.enumerable});return e};var f=e=>d(n({},"__esModule",{value:!0}),e);var k={};g(k,{default:()=>p,getMailDeeplinks:()=>r});module.exports=f(k);var s=require("@raycast/api"),o=require("@raycast/utils");async function r(){let e=await(0,o.runAppleScript)(`
    tell application "System Events"
      set frontmostApp to name of application processes whose frontmost is true
    end tell

    if frontmostApp as string is equal to "Mail" then
      tell application "Mail"
        set _sel to get selection
        set _links to {}
        repeat with _msg in _sel
          set _messageURL to "message://%3c" & _msg's message id & "%3e"
          set end of _links to _messageURL
        end repeat

        set AppleScript's text item delimiters to return
        set _linksText to _links as string

        return _linksText
      end tell
    else
      return "ERROR: Foreground app was " & frontmostApp & ", not Mail"
    end if
  `);return e.startsWith("ERROR:")?{success:!1,links:[],message:e.replace("ERROR: ","")}:{success:!0,links:e.split(`
`).filter(i=>i.trim()!==""),message:"Successfully retrieved email deeplinks"}}async function p(){await(0,s.closeMainWindow)(),await(0,s.showToast)(s.Toast.Style.Animated,"Getting Mail deeplink");let e=await r();e.success&&e.links.length>0?(await s.Clipboard.copy(e.links.join(`
`)),await(0,s.showToast)(s.Toast.Style.Success,"Copied email deeplink to clipboard")):await(0,s.showToast)(s.Toast.Style.Failure,e.message)}0&&(module.exports={getMailDeeplinks});
