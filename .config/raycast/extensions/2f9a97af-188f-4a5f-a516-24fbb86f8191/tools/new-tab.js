"use strict";var a=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var A=(t,o)=>{for(var n in o)a(t,n,{get:o[n],enumerable:!0})},S=(t,o,n,c)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of R(o))!u.call(t,r)&&r!==n&&a(t,r,{get:()=>o[r],enumerable:!(c=E(o,r))||c.enumerable});return t};var m=t=>S(a({},"__esModule",{value:!0}),t);var y={};A(y,{default:()=>g});module.exports=m(y);var I=require("@raycast/api");var f=require("@raycast/utils");var e={HISTORY_RESULTS:30,BOOKMARK_RESULTS:100,TAB_RESULTS:50,SEARCH_ALL_RESULTS:50},h=e.HISTORY_RESULTS,N=e.BOOKMARK_RESULTS,C=e.TAB_RESULTS,D=e.SEARCH_ALL_RESULTS,i={DEBOUNCE_DELAY:300,CACHE_TTL:300*1e3,MAX_RETRY_ATTEMPTS:3,RETRY_DELAY:1e3},k=i.DEBOUNCE_DELAY,M=i.CACHE_TTL,B=i.MAX_RETRY_ATTEMPTS,v=i.RETRY_DELAY,s={WINDOW_INIT_RETRY_LIMIT:20,WINDOW_INIT_RETRY_DELAY:.1,WINDOW_ACTIVATION_DELAY:.2},T=s.WINDOW_INIT_RETRY_LIMIT,p=s.WINDOW_INIT_RETRY_DELAY,_=s.WINDOW_ACTIVATION_DELAY,O=()=>{let t=[];return(e.BOOKMARK_RESULTS<1||e.BOOKMARK_RESULTS>1e3)&&t.push(`Bookmark result limit (${e.BOOKMARK_RESULTS}) outside recommended range (1-1000)`),(e.HISTORY_RESULTS<1||e.HISTORY_RESULTS>500)&&t.push(`History result limit (${e.HISTORY_RESULTS}) outside recommended range (1-500)`),(e.TAB_RESULTS<1||e.TAB_RESULTS>200)&&t.push(`Tab result limit (${e.TAB_RESULTS}) outside recommended range (1-200)`),(e.SEARCH_ALL_RESULTS<1||e.SEARCH_ALL_RESULTS>100)&&t.push(`Search all result limit (${e.SEARCH_ALL_RESULTS}) outside recommended range (1-100)`),t.length>0&&console.warn("Memory limit configuration warnings:",t),t};O();var d=require("@raycast/utils");async function w(){await(0,d.runAppleScript)(`
    tell application "Comet"
      -- Check if at least one window exists
      if (count of windows) > 0 then
        make new tab at end of tabs of window 1
        activate
      else
        -- No windows exist, create a new window with a tab
        make new window
        
        -- Wait for window to be fully initialized
        repeat with i from 1 to ${T}
            if (count of windows) > 0 then
                exit repeat
            end if
            delay ${p}
        end repeat
        
        -- Additional small delay to ensure window is ready
        delay ${_}
        activate
      end if
    end tell
    return true
  `)}async function l(t){await(0,d.runAppleScript)(`
    tell application "Comet"
      activate
      open location "${t}"
    end tell
    return true
  `)}function L(t){return t.startsWith("http://")||t.startsWith("https://")?t:`https://${t}`}async function g(t){if(t.query){let o=`https://perplexity.ai/search?q=${encodeURIComponent(t.query)}`;return await l(o),`Searching "${t.query}" with Perplexity`}if(t.website){let o=L(t.website);return await l(o),`Opening new tab to ${o}`}return await w(),"Opening new tab"}
