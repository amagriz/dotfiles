"use strict";var s=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var E=Object.prototype.hasOwnProperty;var R=(e,t)=>{for(var i in t)s(e,i,{get:t[i],enumerable:!0})},u=(e,t,i,d)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of _(t))!E.call(e,r)&&r!==i&&s(e,r,{get:()=>t[r],enumerable:!(d=T(t,r))||d.enumerable});return e};var S=e=>u(s({},"__esModule",{value:!0}),e);var g={};R(g,{default:()=>L});module.exports=S(g);var I=require("@raycast/api");var m=require("@raycast/utils");var o={HISTORY_RESULTS:30,BOOKMARK_RESULTS:100,TAB_RESULTS:50,SEARCH_ALL_RESULTS:50},C=o.HISTORY_RESULTS,N=o.BOOKMARK_RESULTS,b=o.TAB_RESULTS,k=o.SEARCH_ALL_RESULTS,a={DEBOUNCE_DELAY:300,CACHE_TTL:300*1e3,MAX_RETRY_ATTEMPTS:3,RETRY_DELAY:1e3},D=a.DEBOUNCE_DELAY,M=a.CACHE_TTL,v=a.MAX_RETRY_ATTEMPTS,B=a.RETRY_DELAY,l={WINDOW_INIT_RETRY_LIMIT:20,WINDOW_INIT_RETRY_DELAY:.1,WINDOW_ACTIVATION_DELAY:.2},A=l.WINDOW_INIT_RETRY_LIMIT,f=l.WINDOW_INIT_RETRY_DELAY,c=l.WINDOW_ACTIVATION_DELAY,O=()=>{let e=[];return(o.BOOKMARK_RESULTS<1||o.BOOKMARK_RESULTS>1e3)&&e.push(`Bookmark result limit (${o.BOOKMARK_RESULTS}) outside recommended range (1-1000)`),(o.HISTORY_RESULTS<1||o.HISTORY_RESULTS>500)&&e.push(`History result limit (${o.HISTORY_RESULTS}) outside recommended range (1-500)`),(o.TAB_RESULTS<1||o.TAB_RESULTS>200)&&e.push(`Tab result limit (${o.TAB_RESULTS}) outside recommended range (1-200)`),(o.SEARCH_ALL_RESULTS<1||o.SEARCH_ALL_RESULTS>100)&&e.push(`Search all result limit (${o.SEARCH_ALL_RESULTS}) outside recommended range (1-100)`),e.length>0&&console.warn("Memory limit configuration warnings:",e),e};O();var p=require("@raycast/utils");async function w(){await(0,p.runAppleScript)(`
    tell application "Comet"
      make new window
      
      -- Small delay to ensure window is fully initialized before activation
      delay ${c}
      activate
    end tell
    return true
  `)}var n=require("@raycast/utils");function y(e){return e.startsWith("http://")||e.startsWith("https://")?e:`https://${e}`}async function L(e){try{if(e.query){let t=`https://perplexity.ai/search?q=${encodeURIComponent(e.query)}`;return await(0,n.runAppleScript)(`
        tell application "Comet"
          make new window
          
          -- Small delay to ensure window is fully initialized before loading URL
          delay 0.2
          activate
          open location "${t}"
        end tell
      `),`Searching "${e.query}" with Perplexity in new window`}if(e.website){let t=y(e.website);return await(0,n.runAppleScript)(`
        tell application "Comet"
          make new window
          
          -- Small delay to ensure window is fully initialized before loading URL
          delay 0.2
          activate
          open location "${t}"
        end tell
      `),`Opening new window to ${t}`}return await w(),"Opening new window"}catch(t){throw await(0,n.showFailureToast)(t),t}}
