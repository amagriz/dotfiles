"use strict";var m=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var C=(t,e)=>{for(var r in e)m(t,r,{get:e[r],enumerable:!0})},P=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of v(e))!O.call(t,n)&&n!==r&&m(t,n,{get:()=>e[n],enumerable:!(o=L(e,n))||o.enumerable});return t};var N=t=>P(m({},"__esModule",{value:!0}),t);var X={};C(X,{confirmation:()=>z,default:()=>B});module.exports=N(X);var I=require("@raycast/api");var c=require("@raycast/utils");var w=require("child_process");var y=require("@raycast/api"),R=require("@raycast/utils");function f(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function k(t,e){return!e||!t?t:t.filter(r=>r.title.toLowerCase().includes(e.toLowerCase())||r.url?.toLowerCase().includes(e.toLowerCase()))}var S=require("react"),G=require("@raycast/api"),W=require("@raycast/utils");var J=require("react/jsx-runtime");function V(t){let e=!1,r=!1,o=!1,n="{",a="";for(let l=0;l<t.length;l++){let i=t[l];if(o){a+=i,o=!1;continue}if(i==="\\"){a+=i,o=!0;continue}if(!e&&(i==="{"||i===","||i===":"||i==="}"||i==="]")&&(n=i),i==='"'){if(e){let s=l+1;for(;s<t.length&&t[s]===" ";)s++;let u=t[s],A=r&&u===":",D=!r&&(u===","||u==="}"||u==="]"||s>=t.length);A||D?(a+=i,e=!1):a+="\\"+i}else a+=i,e=!0,r=n==="{"||n===",";continue}a+=i}return a}async function h(){try{let{tabs:t,windowCount:e}=await Y();if(t.length===0&&e>0)try{let r=await _();if(r.length>0)return r}catch{}return t}catch{try{return await _()}catch{return[]}}}async function Y(){let e=(0,w.execSync)(`osascript -l JavaScript -e '${`
    (() => {
      const dia = Application("Dia");
      const wins = dia.windows();
      const tabs = [];
      for (let i = 0; i < wins.length; i++) {
        const w = wins[i];
        try {
          const wId = String(w.id());
          const wTabs = w.tabs();
          for (let j = 0; j < wTabs.length; j++) {
            const t = wTabs[j];
            let url = "";
            try { url = t.url() || ""; } catch(e) {}
            tabs.push({
              windowId: wId,
              tabId: String(t.id()),
              title: t.name() || t.title() || "",
              url: url,
              isPinned: !!t.isPinned(),
              isFocused: !!t.isFocused(),
            });
          }
        } catch(e) {}
      }
      return JSON.stringify({ tabs: tabs, windowCount: wins.length });
    })()
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),r=JSON.parse(e);return{tabs:r.tabs.map(o=>({...o,url:o.url||void 0})),windowCount:r.windowCount}}async function _(){let t=await(0,c.runAppleScript)(`
      on escape_value(this_text)
        if this_text is missing value then return ""
        set this_text to this_text as text
        set AppleScript's text item delimiters to "\\\\"
        set the item_list to every text item of this_text
        set AppleScript's text item delimiters to "\\\\\\\\"
        set this_text to the item_list as string
        set AppleScript's text item delimiters to "\\""
        set the item_list to every text item of this_text
        set AppleScript's text item delimiters to "\\\\\\""
        set this_text to the item_list as string
        set AppleScript's text item delimiters to ""
        return this_text
      end escape_value

      set _output to ""

      tell application "Dia"
        repeat with w in every window
          try
            set wId to id of w
            set allTabs to properties of every tab of w
            set tabsCount to count of allTabs
            repeat with i from 1 to tabsCount
              try
                set _tab to item i of allTabs
                set _title to ""
                try
                  set _title to my escape_value(get title of _tab)
                end try
                if _title is "" then
                  try
                    set _title to my escape_value(get name of _tab)
                  end try
                end if
                set _url to ""
                try
                  set _url to my escape_value(get URL of _tab)
                end try
                set _id to get id of _tab
                set _isPinned to get isPinned of _tab
                set _isFocused to get isFocused of _tab

                if _output is not "" then
                  set _output to (_output & ",")
                end if
                set _output to (_output & "{\\"windowId\\": \\"" & wId & "\\", \\"tabId\\": \\"" & _id & "\\", \\"title\\": \\"" & _title & "\\", \\"url\\": \\"" & _url & "\\", \\"isPinned\\": " & _isPinned & ", \\"isFocused\\": " & _isFocused & "}")
              on error
                (* skip this tab, avoid dangling comma *)
              end try
            end repeat
          on error errMsg number errNum
            (* swallow error for this window so we still return tabs from other windows *)
          end try
        end repeat
      end tell

      return "[" & _output & "]"
    `);if(!t||t.trim()==="[]")return[];let e=t.split("").map(o=>o.charCodeAt(0)<=31?" ":o).join("");return e=V(e),JSON.parse(e).map(o=>({...o,url:o.url||void 0}))}async function x(){let t=(await h()).filter(r=>r.isFocused);if(t.length<=1)return t[0];let e=(await(0,c.runAppleScript)('tell application "Dia" to return id of window 1')).trim();return t.find(r=>r.windowId===e)??t[0]}var p=class extends Error{constructor(){super("Tab not found; it may have already been closed."),this.name="TabNotFoundError"}};async function E(t){let e=f(t.windowId),r=f(t.tabId),o;try{let n=`
      (() => {
        const dia = Application("Dia");
        const wins = dia.windows();
        for (let i = 0; i < wins.length; i++) {
          if (String(wins[i].id()) === '${t.windowId.replace(/'/g,"\\'")}') {
            const tabs = wins[i].tabs();
            for (let j = 0; j < tabs.length; j++) {
              if (String(tabs[j].id()) === '${t.tabId.replace(/'/g,"\\'")}') {
                tabs[j].close();
                return "ok";
              }
            }
          }
        }
        return "not_found";
      })()
    `;o=(0,w.execSync)(`osascript -l JavaScript -e '${n.replace(/'/g,"'\\''")}'`,{timeout:3e3,encoding:"utf-8"}).trim()}catch{o=(await(0,c.runAppleScript)(`set _result to "not_found"
        tell application "Dia"
          repeat with w in every window
            if id of w is "${e}" then
              repeat with t in every tab of w
                if id of t is "${r}" then
                  close t
                  set _result to "ok"
                  exit repeat
                end if
              end repeat
              exit repeat
            end if
          end repeat
        end tell
        return _result`)).trim()}if(o!=="ok")throw new p}var g="Raycast needs permission to control Dia. Enable Dia under Raycast in System Settings \u2192 Privacy & Security \u2192 Automation, then try again.";function T(t){return t instanceof Error&&t.message.includes("-1743")?new Error(g):t}async function d({tabId:t,query:e}){let r=e?.trim();if(!t&&!r){let i=await x();if(!i)throw new Error(`No focused tab found. Make sure Dia is open with at least one window. ${g}`);return i}let o=await h();if(o.length===0)throw new Error(`No open tabs found in Dia. Make sure Dia is open. ${g}`);if(t){let i=o.find(s=>s.tabId===t);if(!i)throw new Error(`No open tab has the ID "${t}". It may have been closed.`);return i}let n=k(o,r)??[],a=n.filter(i=>i.title.toLowerCase()===r.toLowerCase()),l=a.length===1?a:n;if(l.length===0)throw new Error(`No open tab matches "${r}".`);if(l.length>1){let i=l.slice(0,10).map(s=>`- ${s.title} (${s.url??"no URL"}) [tabId: ${s.tabId}]`).join(`
`);throw new Error(`${l.length} tabs match "${r}". Ask the user which one they mean, then retry with its tabId:
${i}`)}return l[0]}async function B(t){if(!t.tabId){let r=await d(t);return{closed:!1,candidate:{tabId:r.tabId,title:r.title,url:r.url},message:"Nothing was closed. Call close-tab again with this candidate's tabId to close it."}}let e=await d({tabId:t.tabId});return await E(e).catch(r=>{throw T(r)}),{closed:!0,closedTab:{tabId:e.tabId,title:e.title,url:e.url}}}var z=async t=>{if(!t.tabId)return;let e=await d({tabId:t.tabId}).catch(r=>{let o=r instanceof Error?r.message:String(r);throw new Error(`${o} Nothing was closed.`)});return{style:I.Action.Style.Destructive,message:"Close this tab?",info:[{name:"Title",value:e.title},{name:"URL",value:e.url??""}]}};0&&(module.exports={confirmation});
