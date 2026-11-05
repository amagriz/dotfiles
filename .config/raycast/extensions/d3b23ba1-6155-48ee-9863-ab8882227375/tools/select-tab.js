"use strict";var d=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var L=Object.prototype.hasOwnProperty;var O=(t,e)=>{for(var r in e)d(t,r,{get:e[r],enumerable:!0})},v=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of D(e))!L.call(t,n)&&n!==r&&d(t,n,{get:()=>e[n],enumerable:!(i=I(e,n))||i.enumerable});return t};var P=t=>v(d({},"__esModule",{value:!0}),t);var V={};O(V,{default:()=>B});module.exports=P(V);var c=require("@raycast/utils");var p=require("child_process");var h=require("@raycast/api"),C=require("@raycast/utils");function m(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function g(t,e){return!e||!t?t:t.filter(r=>r.title.toLowerCase().includes(e.toLowerCase())||r.url?.toLowerCase().includes(e.toLowerCase()))}var y=require("react"),U=require("@raycast/api"),H=require("@raycast/utils");var G=require("react/jsx-runtime");function W(t){let e=!1,r=!1,i=!1,n="{",a="";for(let l=0;l<t.length;l++){let o=t[l];if(i){a+=o,i=!1;continue}if(o==="\\"){a+=o,i=!0;continue}if(!e&&(o==="{"||o===","||o===":"||o==="}"||o==="]")&&(n=o),o==='"'){if(e){let s=l+1;for(;s<t.length&&t[s]===" ";)s++;let u=t[s],T=r&&u===":",A=!r&&(u===","||u==="}"||u==="]"||s>=t.length);T||A?(a+=o,e=!1):a+="\\"+o}else a+=o,e=!0,r=n==="{"||n===",";continue}a+=o}return a}async function f(){try{let{tabs:t,windowCount:e}=await J();if(t.length===0&&e>0)try{let r=await b();if(r.length>0)return r}catch{}return t}catch{try{return await b()}catch{return[]}}}async function J(){let e=(0,p.execSync)(`osascript -l JavaScript -e '${`
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
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),r=JSON.parse(e);return{tabs:r.tabs.map(i=>({...i,url:i.url||void 0})),windowCount:r.windowCount}}async function b(){let t=await(0,c.runAppleScript)(`
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
    `);if(!t||t.trim()==="[]")return[];let e=t.split("").map(i=>i.charCodeAt(0)<=31?" ":i).join("");return e=W(e),JSON.parse(e).map(i=>({...i,url:i.url||void 0}))}async function S(){let t=(await f()).filter(r=>r.isFocused);if(t.length<=1)return t[0];let e=(await(0,c.runAppleScript)('tell application "Dia" to return id of window 1')).trim();return t.find(r=>r.windowId===e)??t[0]}async function _(t){try{let e=`
      (() => {
        const dia = Application("Dia");
        dia.activate();
        const wins = dia.windows();
        for (let i = 0; i < wins.length; i++) {
          if (String(wins[i].id()) === '${t.windowId.replace(/'/g,"\\'")}') {
            const tabs = wins[i].tabs();
            for (let j = 0; j < tabs.length; j++) {
              if (String(tabs[j].id()) === '${t.tabId.replace(/'/g,"\\'")}') {
                tabs[j].focus();
                return "ok";
              }
            }
          }
        }
        return "not_found";
      })()
    `;(0,p.execSync)(`osascript -l JavaScript -e '${e.replace(/'/g,"'\\''")}'`,{timeout:3e3,encoding:"utf-8"})}catch{let e=m(t.windowId),r=m(t.tabId);await(0,c.runAppleScript)(`tell application "Dia"
        activate
        repeat with w in every window
          if id of w is "${e}" then
            repeat with t in every tab of w
              if id of t is "${r}" then
                focus t
                exit repeat
              end if
            end repeat
            exit repeat
          end if
        end repeat
      end tell`)}}var w="Raycast needs permission to control Dia. Enable Dia under Raycast in System Settings \u2192 Privacy & Security \u2192 Automation, then try again.";function x(t){return t instanceof Error&&t.message.includes("-1743")?new Error(w):t}async function E({tabId:t,query:e}){let r=e?.trim();if(!t&&!r){let o=await S();if(!o)throw new Error(`No focused tab found. Make sure Dia is open with at least one window. ${w}`);return o}let i=await f();if(i.length===0)throw new Error(`No open tabs found in Dia. Make sure Dia is open. ${w}`);if(t){let o=i.find(s=>s.tabId===t);if(!o)throw new Error(`No open tab has the ID "${t}". It may have been closed.`);return o}let n=g(i,r)??[],a=n.filter(o=>o.title.toLowerCase()===r.toLowerCase()),l=a.length===1?a:n;if(l.length===0)throw new Error(`No open tab matches "${r}".`);if(l.length>1){let o=l.slice(0,10).map(s=>`- ${s.title} (${s.url??"no URL"}) [tabId: ${s.tabId}]`).join(`
`);throw new Error(`${l.length} tabs match "${r}". Ask the user which one they mean, then retry with its tabId:
${o}`)}return l[0]}async function B(t){let e=await E(t);return await _(e).catch(r=>{throw x(r)}),{title:e.title,url:e.url}}
