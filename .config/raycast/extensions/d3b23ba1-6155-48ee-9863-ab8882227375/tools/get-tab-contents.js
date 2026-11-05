"use strict";var m=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var v=Object.prototype.hasOwnProperty;var P=(t,o)=>{for(var e in o)m(t,e,{get:o[e],enumerable:!0})},C=(t,o,e,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of O(o))!v.call(t,s)&&s!==e&&m(t,s,{get:()=>o[s],enumerable:!(i=D(o,s))||i.enumerable});return t};var $=t=>C(m({},"__esModule",{value:!0}),t);var rt={};P(rt,{default:()=>A});module.exports=$(rt);var w=require("@raycast/utils"),B=require("timers/promises");var u=require("@raycast/utils");var S=require("child_process");var g=require("@raycast/api"),N=require("@raycast/utils");function d(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function h(t,o){return!o||!t?t:t.filter(e=>e.title.toLowerCase().includes(o.toLowerCase())||e.url?.toLowerCase().includes(o.toLowerCase()))}var k=require("react"),H=require("@raycast/api"),J=require("@raycast/utils");var W=require("react/jsx-runtime");function V(t){let o=!1,e=!1,i=!1,s="{",l="";for(let a=0;a<t.length;a++){let r=t[a];if(i){l+=r,i=!1;continue}if(r==="\\"){l+=r,i=!0;continue}if(!o&&(r==="{"||r===","||r===":"||r==="}"||r==="]")&&(s=r),r==='"'){if(o){let n=a+1;for(;n<t.length&&t[n]===" ";)n++;let c=t[n],I=e&&c===":",L=!e&&(c===","||c==="}"||c==="]"||n>=t.length);I||L?(l+=r,o=!1):l+="\\"+r}else l+=r,o=!0,e=s==="{"||s===",";continue}l+=r}return l}async function p(){try{let{tabs:t,windowCount:o}=await X();if(t.length===0&&o>0)try{let e=await b();if(e.length>0)return e}catch{}return t}catch{try{return await b()}catch{return[]}}}async function X(){let o=(0,S.execSync)(`osascript -l JavaScript -e '${`
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
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),e=JSON.parse(o);return{tabs:e.tabs.map(i=>({...i,url:i.url||void 0})),windowCount:e.windowCount}}async function b(){let t=await(0,u.runAppleScript)(`
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
    `);if(!t||t.trim()==="[]")return[];let o=t.split("").map(i=>i.charCodeAt(0)<=31?" ":i).join("");return o=V(o),JSON.parse(o).map(i=>({...i,url:i.url||void 0}))}async function _(){let t=(await p()).filter(e=>e.isFocused);if(t.length<=1)return t[0];let o=(await(0,u.runAppleScript)('tell application "Dia" to return id of window 1')).trim();return t.find(e=>e.windowId===o)??t[0]}var f="Raycast needs permission to control Dia. Enable Dia under Raycast in System Settings \u2192 Privacy & Security \u2192 Automation, then try again.";function x(t){return t instanceof Error&&t.message.includes("-1743")?new Error(f):t}async function E({tabId:t,query:o}){let e=o?.trim();if(!t&&!e){let r=await _();if(!r)throw new Error(`No focused tab found. Make sure Dia is open with at least one window. ${f}`);return r}let i=await p();if(i.length===0)throw new Error(`No open tabs found in Dia. Make sure Dia is open. ${f}`);if(t){let r=i.find(n=>n.tabId===t);if(!r)throw new Error(`No open tab has the ID "${t}". It may have been closed.`);return r}let s=h(i,e)??[],l=s.filter(r=>r.title.toLowerCase()===e.toLowerCase()),a=l.length===1?l:s;if(a.length===0)throw new Error(`No open tab matches "${e}".`);if(a.length>1){let r=a.slice(0,10).map(n=>`- ${n.title} (${n.url??"no URL"}) [tabId: ${n.tabId}]`).join(`
`);throw new Error(`${a.length} tabs match "${e}". Ask the user which one they mean, then retry with its tabId:
${r}`)}return a[0]}var z=2e4,Y=5e4,Z=5e3,q=250,tt="Reading page contents requires Dia to allow JavaScript from AppleScript. Quit Dia, then reopen it from Terminal with: open -a Dia --args --enable-applescript-javascript";async function A(t){let o=Math.min(Math.max(Math.floor(t.maxLength??z),1),Y),e=await E(t),i=`tab id "${d(e.tabId)}" of window id "${d(e.windowId)}"`,s=await et(i).catch(n=>{throw T(n,e.title)}),l=`(() => {
    const text = document.body ? document.body.innerText : "";
    return {
      title: document.title,
      url: location.href,
      readyState: document.readyState,
      length: text.length,
      isBlank: text.trim().length === 0,
      text: text.slice(0, ${o}),
    };
  })()`,a;try{a=await(0,w.runAppleScript)(`tell application "Dia" to execute ${i} javascript "${d(l)}"`)}catch(n){let c=n instanceof Error?n.message:String(n);throw c.includes("enable-applescript-javascript")||c.includes("-10006")?new Error(tt):c.includes("-1743")||c.includes("-1728")?T(n,e.title):new Error(`Couldn't read this tab ("${e.title}"): ${c.trim()}`)}if(a.trim()==="missing value")throw new Error(`"${e.title}" is a Dia internal page, such as a new tab or settings. Dia internal pages cannot be read.`);let r;try{let n=JSON.parse(a);r=typeof n=="string"?JSON.parse(n):n}catch{throw new Error(`Couldn't read "${e.title}": the page returned no text. JavaScript may be blocked on this page.`)}if(!r||typeof r.text!="string")throw new Error(`Couldn't read "${e.title}": the page returned no text. JavaScript may be blocked on this page.`);if(r.isBlank)throw s||r.readyState==="loading"?new Error(`"${r.title||e.title}" is still loading. Try again in a moment.`):new Error(`"${r.title||r.url}" has loaded, but the page has no readable text (it may contain only images or media). Its contents can't be summarized.`);return{tabId:e.tabId,title:r.title,url:r.url,loading:s||r.readyState==="loading",truncated:r.length>r.text.length,text:r.text}}function T(t,o){return t instanceof Error&&t.message.includes("-1728")?new Error(`"${o}" is no longer open.`):x(t)}async function et(t){let o=Date.now()+Z;for(;;){if((await(0,w.runAppleScript)(`tell application "Dia" to return loading of ${t}`)).trim()!=="true")return!1;if(Date.now()>=o)return!0;await(0,B.setTimeout)(q)}}
