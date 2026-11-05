"use strict";var B=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var J=Object.prototype.hasOwnProperty;var q=(e,t)=>{for(var r in t)B(e,r,{get:t[r],enumerable:!0})},X=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of W(t))!J.call(e,n)&&n!==r&&B(e,n,{get:()=>t[n],enumerable:!(i=H(t,n))||i.enumerable});return e};var Y=e=>X(B({},"__esModule",{value:!0}),e);var ge={};q(ge,{default:()=>he});module.exports=Y(ge);var V=require("@raycast/api");var o=require("@raycast/api"),w=require("@raycast/utils");var l=require("@raycast/utils");var _=require("child_process");var b=require("@raycast/api"),z=require("@raycast/utils");function h(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function L(e){try{let{hostname:t}=new URL(e);return t.replace(/^www\./,"")}catch{return e}}function D(e){let t=[];return e.isFocused&&t.push({icon:{source:b.Icon.Dot,tintColor:b.Color.Blue},tooltip:"Focused tab"}),t}var P=require("react"),ae=require("@raycast/api"),ce=require("@raycast/utils");var le=require("react/jsx-runtime");function ue(e){let t=!1,r=!1,i=!1,n="{",c="";for(let m=0;m<e.length;m++){let s=e[m];if(i){c+=s,i=!1;continue}if(s==="\\"){c+=s,i=!0;continue}if(!t&&(s==="{"||s===","||s===":"||s==="}"||s==="]")&&(n=s),s==='"'){if(t){let p=m+1;for(;p<e.length&&e[p]===" ";)p++;let f=e[p],d=r&&f===":",S=!r&&(f===","||f==="}"||f==="]"||p>=e.length);d||S?(c+=s,t=!1):c+="\\"+s}else c+=s,t=!0,r=n==="{"||n===",";continue}c+=s}return c}async function de(){try{let{tabs:e,windowCount:t}=await me();if(e.length===0&&t>0)try{let r=await O();if(r.length>0)return r}catch{}return e}catch{try{return await O()}catch{return[]}}}async function me(){let t=(0,_.execSync)(`osascript -l JavaScript -e '${`
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
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),r=JSON.parse(t);return{tabs:r.tabs.map(i=>({...i,url:i.url||void 0})),windowCount:r.windowCount}}async function O(){let e=await(0,l.runAppleScript)(`
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
    `);if(!e||e.trim()==="[]")return[];let t=e.split("").map(i=>i.charCodeAt(0)<=31?" ":i).join("");return t=ue(t),JSON.parse(t).map(i=>({...i,url:i.url||void 0}))}function R(){return(0,l.useCachedPromise)(de)}async function N(e){try{let t=`
      (() => {
        const dia = Application("Dia");
        dia.activate();
        const wins = dia.windows();
        for (let i = 0; i < wins.length; i++) {
          if (String(wins[i].id()) === '${e.windowId.replace(/'/g,"\\'")}') {
            const tabs = wins[i].tabs();
            for (let j = 0; j < tabs.length; j++) {
              if (String(tabs[j].id()) === '${e.tabId.replace(/'/g,"\\'")}') {
                tabs[j].focus();
                return "ok";
              }
            }
          }
        }
        return "not_found";
      })()
    `;(0,_.execSync)(`osascript -l JavaScript -e '${t.replace(/'/g,"'\\''")}'`,{timeout:3e3,encoding:"utf-8"})}catch{let t=h(e.windowId),r=h(e.tabId);await(0,l.runAppleScript)(`tell application "Dia"
        activate
        repeat with w in every window
          if id of w is "${t}" then
            repeat with t in every tab of w
              if id of t is "${r}" then
                focus t
                exit repeat
              end if
            end repeat
            exit repeat
          end if
        end repeat
      end tell`)}}var g=class extends Error{constructor(){super("Tab not found; it may have already been closed."),this.name="TabNotFoundError"}};async function T(e){let t=h(e.windowId),r=h(e.tabId),i;try{let n=`
      (() => {
        const dia = Application("Dia");
        const wins = dia.windows();
        for (let i = 0; i < wins.length; i++) {
          if (String(wins[i].id()) === '${e.windowId.replace(/'/g,"\\'")}') {
            const tabs = wins[i].tabs();
            for (let j = 0; j < tabs.length; j++) {
              if (String(tabs[j].id()) === '${e.tabId.replace(/'/g,"\\'")}') {
                tabs[j].close();
                return "ok";
              }
            }
          }
        }
        return "not_found";
      })()
    `;i=(0,_.execSync)(`osascript -l JavaScript -e '${n.replace(/'/g,"'\\''")}'`,{timeout:3e3,encoding:"utf-8"}).trim()}catch{i=(await(0,l.runAppleScript)(`set _result to "not_found"
        tell application "Dia"
          repeat with w in every window
            if id of w is "${t}" then
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
        return _result`)).trim()}if(i!=="ok")throw new g}async function F(){return await(0,l.runAppleScript)(`
    set _output to ""

    tell application "Dia"
      return version
    end tell
  `)}var U=require("@raycast/api"),M={google:{id:"google",name:"Google",searchUrl:"https://www.google.com/search?q="},kagi:{id:"kagi",name:"Kagi",searchUrl:"https://kagi.com/search?q="},duckduckgo:{id:"duckduckgo",name:"DuckDuckGo",searchUrl:"https://duckduckgo.com/?q="},brave:{id:"brave",name:"Brave Search",searchUrl:"https://search.brave.com/search?q="},bing:{id:"bing",name:"Bing",searchUrl:"https://www.bing.com/search?q="}};function x(){let{searchEngine:e="google"}=(0,U.getPreferenceValues)();return M[e]??M.google}function $(e,t=x()){return`${t.searchUrl}${encodeURIComponent(e)}`}function K(e=x()){return`Search ${e.name}`}var a=require("react/jsx-runtime");function j({tab:e,searchText:t,onTabAction:r,mutateTabs:i}){let{defaultTabAction:n}=(0,o.getPreferenceValues)(),c=t?x():void 0,m=(0,a.jsx)(o.Action,{icon:o.Icon.ArrowRight,title:"Focus Existing Tab",shortcut:n==="focus"?void 0:{modifiers:["cmd"],key:"return"},onAction:async()=>{try{await N(e),await(0,o.closeMainWindow)(),r?.()}catch(d){await(0,w.showFailureToast)(d,{title:"Failed focusing tab"})}}}),s=e.url?(0,a.jsx)(o.Action.Open,{icon:o.Icon.Globe,title:"Open in New Tab",target:e.url,application:"company.thebrowser.dia",shortcut:n==="open"?void 0:{modifiers:["cmd"],key:"return"},onOpen:()=>{r?.()}}):null,p=n==="focus"?m:s,f=n==="focus"?s:m;return(0,a.jsx)(o.List.Item,{icon:e.url?(0,w.getFavicon)(e.url,{mask:o.Image.Mask.Circle}):o.Icon.Globe,title:e.title,subtitle:e.url?{value:L(e.url),tooltip:e.url}:void 0,accessories:D(e),actions:(0,a.jsxs)(o.ActionPanel,{children:[p,f,t&&(0,a.jsx)(o.Action.OpenInBrowser,{title:K(c),url:$(t,c),icon:o.Icon.MagnifyingGlass,shortcut:{modifiers:["cmd","shift"],key:"return"},onOpen:()=>{r?.()}}),(0,a.jsx)(o.ActionPanel.Section,{children:(0,a.jsx)(o.Action,{icon:o.Icon.XMarkCircle,title:"Close Tab",style:o.Action.Style.Destructive,shortcut:{modifiers:["cmd","shift"],key:"w"},onAction:async()=>{try{i?await i(T(e),{optimisticUpdate:d=>d?.filter(S=>!(S.windowId===e.windowId&&S.tabId===e.tabId)),rollbackOnError:!0,shouldRevalidateAfter:!1}):(await T(e),r?.())}catch(d){d instanceof g?r?.():await(0,w.showFailureToast)(d,{title:"Failed closing tab"})}}})}),(0,a.jsxs)(o.ActionPanel.Section,{children:[e.url&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.Action.CopyToClipboard,{content:e.url,title:"Copy URL",shortcut:o.Keyboard.Shortcut.Common.Copy}),(0,a.jsx)(o.Action.CopyToClipboard,{content:{html:`<a href="${e.url}">${e.title||"Untitled"}</a>`},title:"Copy Formatted URL",shortcut:o.Keyboard.Shortcut.Common.CopyPath})]}),(0,a.jsx)(o.Action.CopyToClipboard,{content:e.title||"Untitled",title:"Copy Title",shortcut:o.Keyboard.Shortcut.Common.CopyName}),e.url&&(0,a.jsx)(o.Action.CopyToClipboard,{content:`[${e.title||"Untitled"}](${e.url})`,title:"Copy as Markdown"})]})]})})}var u=require("@raycast/api"),Q=require("@raycast/utils"),G=require("path"),I=require("semver"),E=require("react");var y=require("react/jsx-runtime"),k="1.7.0";function pe(e){let{data:t,isLoading:r}=(0,Q.useCachedPromise)(F),i=(0,E.useRef)(!1);if((0,E.useEffect)(()=>{!r&&t&&(0,I.lt)(t,k)&&!i.current&&(i.current=!0,(0,u.showToast)({style:u.Toast.Style.Failure,title:"Dia Update Required",message:`This extension requires Dia v${k}+. Please update via Dia \u2192 Check for Updates.`}))},[t,r]),t&&!(0,I.lt)(t,k)||r&&!t)return e.children;if(!r&&t&&(0,I.lt)(t,k)){let n=(0,G.join)(u.environment.assetsPath,"check-for-updates.png"),c=`## Version conflict

The extension requires Dia v${k}. Please update the app via Dia \u2192 Check for Updates.

![Check for Updates](${n})`;return(0,y.jsx)(u.Detail,{markdown:c})}return!r&&!t?(0,y.jsx)(u.Detail,{markdown:`## Something went wrong

We are unable to fetch the version of Dia. Please make sure Dia is correctly installed and try again.`}):e.children}function A(e){return function(r){return(0,y.jsx)(pe,{children:(0,y.jsx)(e,{...r})})}}var C=require("react/jsx-runtime");function fe(){let{isLoading:e,data:t,revalidate:r,mutate:i}=R();return(0,C.jsx)(V.List,{isLoading:e,searchBarPlaceholder:"Search tabs...",children:t?.map((n,c)=>(0,C.jsx)(j,{tab:n,onTabAction:r,mutateTabs:i},`${n.windowId}-${n.tabId}-${c}`))})}var he=A(fe);
