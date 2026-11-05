"use strict";var d=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var B=Object.prototype.hasOwnProperty;var I=(e,t)=>{for(var r in t)d(e,r,{get:t[r],enumerable:!0})},T=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of E(t))!B.call(e,n)&&n!==r&&d(e,n,{get:()=>t[n],enumerable:!(o=x(t,n))||o.enumerable});return e};var A=e=>T(d({},"__esModule",{value:!0}),e);var U={};I(U,{default:()=>b});module.exports=A(U);var a=require("@raycast/utils");var k=require("child_process");var f=require("@raycast/api"),D=require("@raycast/utils");function m(e,t){return!t||!e?e:e.filter(r=>r.title.toLowerCase().includes(t.toLowerCase())||r.url?.toLowerCase().includes(t.toLowerCase()))}var h=require("react"),$=require("@raycast/api"),F=require("@raycast/utils");var K=require("react/jsx-runtime");function j(e){let t=!1,r=!1,o=!1,n="{",s="";for(let c=0;c<e.length;c++){let i=e[c];if(o){s+=i,o=!1;continue}if(i==="\\"){s+=i,o=!0;continue}if(!t&&(i==="{"||i===","||i===":"||i==="}"||i==="]")&&(n=i),i==='"'){if(t){let l=c+1;for(;l<e.length&&e[l]===" ";)l++;let u=e[l],S=r&&u===":",_=!r&&(u===","||u==="}"||u==="]"||l>=e.length);S||_?(s+=i,t=!1):s+="\\"+i}else s+=i,t=!0,r=n==="{"||n===",";continue}s+=i}return s}async function p(){try{let{tabs:e,windowCount:t}=await Q();if(e.length===0&&t>0)try{let r=await g();if(r.length>0)return r}catch{}return e}catch{try{return await g()}catch{return[]}}}async function Q(){let t=(0,k.execSync)(`osascript -l JavaScript -e '${`
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
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),r=JSON.parse(t);return{tabs:r.tabs.map(o=>({...o,url:o.url||void 0})),windowCount:r.windowCount}}async function g(){let e=await(0,a.runAppleScript)(`
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
    `);if(!e||e.trim()==="[]")return[];let t=e.split("").map(o=>o.charCodeAt(0)<=31?" ":o).join("");return t=j(t),JSON.parse(t).map(o=>({...o,url:o.url||void 0}))}var y="Raycast needs permission to control Dia. Enable Dia under Raycast in System Settings \u2192 Privacy & Security \u2192 Automation, then try again.";async function b(e){let t=await p();if(t.length===0)throw new Error(`No open tabs found in Dia. Make sure Dia is open. ${y}`);return e.query?.trim()?m(t,e.query.trim())??[]:t}
