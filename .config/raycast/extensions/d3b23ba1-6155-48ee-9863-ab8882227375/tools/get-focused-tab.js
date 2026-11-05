"use strict";var d=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var B=Object.prototype.hasOwnProperty;var T=(t,e)=>{for(var r in e)d(t,r,{get:e[r],enumerable:!0})},I=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of E(e))!B.call(t,n)&&n!==r&&d(t,n,{get:()=>e[n],enumerable:!(o=x(e,n))||o.enumerable});return t};var A=t=>I(d({},"__esModule",{value:!0}),t);var U={};T(U,{default:()=>b});module.exports=A(U);var s=require("@raycast/utils");var g=require("child_process");var p=require("@raycast/api"),D=require("@raycast/utils");var w=require("react"),F=require("@raycast/api"),$=require("@raycast/utils");var K=require("react/jsx-runtime");function j(t){let e=!1,r=!1,o=!1,n="{",a="";for(let c=0;c<t.length;c++){let i=t[c];if(o){a+=i,o=!1;continue}if(i==="\\"){a+=i,o=!0;continue}if(!e&&(i==="{"||i===","||i===":"||i==="}"||i==="]")&&(n=i),i==='"'){if(e){let l=c+1;for(;l<t.length&&t[l]===" ";)l++;let u=t[l],S=r&&u===":",_=!r&&(u===","||u==="}"||u==="]"||l>=t.length);S||_?(a+=i,e=!1):a+="\\"+i}else a+=i,e=!0,r=n==="{"||n===",";continue}a+=i}return a}async function k(){try{let{tabs:t,windowCount:e}=await Q();if(t.length===0&&e>0)try{let r=await h();if(r.length>0)return r}catch{}return t}catch{try{return await h()}catch{return[]}}}async function Q(){let e=(0,g.execSync)(`osascript -l JavaScript -e '${`
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
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),r=JSON.parse(e);return{tabs:r.tabs.map(o=>({...o,url:o.url||void 0})),windowCount:r.windowCount}}async function h(){let t=await(0,s.runAppleScript)(`
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
    `);if(!t||t.trim()==="[]")return[];let e=t.split("").map(o=>o.charCodeAt(0)<=31?" ":o).join("");return e=j(e),JSON.parse(e).map(o=>({...o,url:o.url||void 0}))}async function m(){let t=(await k()).filter(r=>r.isFocused);if(t.length<=1)return t[0];let e=(await(0,s.runAppleScript)('tell application "Dia" to return id of window 1')).trim();return t.find(r=>r.windowId===e)??t[0]}var y="Raycast needs permission to control Dia. Enable Dia under Raycast in System Settings \u2192 Privacy & Security \u2192 Automation, then try again.";async function b(){let t=await m();if(!t)throw new Error(`No focused tab found. Make sure Dia is open with at least one window. ${y}`);return t}
