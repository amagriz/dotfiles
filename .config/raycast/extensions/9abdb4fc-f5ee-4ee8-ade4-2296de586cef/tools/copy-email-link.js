"use strict";var n=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var m=(e,s)=>{for(var t in s)n(e,t,{get:s[t],enumerable:!0})},g=(e,s,t,a)=>{if(s&&typeof s=="object"||typeof s=="function")for(let i of c(s))!u.call(e,i)&&i!==t&&n(e,i,{get:()=>s[i],enumerable:!(a=p(s,i))||a.enumerable});return e};var d=e=>g(n({},"__esModule",{value:!0}),e);var k={};m(k,{default:()=>f});module.exports=d(k);var l=require("@raycast/api"),o=require("@raycast/utils");async function r(){let e=await(0,o.runAppleScript)(`
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
`).filter(t=>t.trim()!==""),message:"Successfully retrieved email deeplinks"}}async function f(){let e=await r();return e.success&&e.links.length>0?{result:e.links,metadata:{success:!0,count:e.links.length}}:{error:e.message||"Failed to get email link, you may not have any emails selected in the Mail app.",metadata:{success:!1}}}
