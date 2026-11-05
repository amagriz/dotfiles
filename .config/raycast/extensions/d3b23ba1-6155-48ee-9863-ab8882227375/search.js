"use strict";var Qt=Object.create;var V=Object.defineProperty;var Wt=Object.getOwnPropertyDescriptor;var qt=Object.getOwnPropertyNames;var jt=Object.getPrototypeOf,Jt=Object.prototype.hasOwnProperty;var Yt=(t,e)=>{for(var o in e)V(t,o,{get:e[o],enumerable:!0})},st=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of qt(e))!Jt.call(t,i)&&i!==o&&V(t,i,{get:()=>e[i],enumerable:!(r=Wt(e,i))||r.enumerable});return t};var at=(t,e,o)=>(o=t!=null?Qt(jt(t)):{},st(e||!t||!t.__esModule?V(o,"default",{value:t,enumerable:!0}):o,t)),Xt=t=>st(V({},"__esModule",{value:!0}),t);var Ce={};Yt(Ce,{default:()=>be});module.exports=Xt(Ce);var h=require("@raycast/api"),Nt=require("@raycast/utils"),L=require("react");var At=require("react"),u=require("@raycast/api");var D=require("@raycast/api"),ct=require("@raycast/utils");function $(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function lt(t){return t.replace(/\\/g,"\\\\").replace(/%/g,"\\%").replace(/_/g,"\\_").replace(/'/g,"''")}function ut(t){let e=["javascript:","data:","about:","chrome:","file:"],o=t.toLowerCase().trim();return e.some(r=>o.startsWith(r))?{source:D.Icon.Link,tintColor:D.Color.SecondaryText}:(0,ct.getFavicon)(t)}function E(t){try{let{hostname:e}=new URL(t);return e.replace(/^www\./,"")}catch{return t}}function pt(t){let e=[];return t.isFocused&&e.push({icon:{source:D.Icon.Dot,tintColor:D.Color.Blue},tooltip:"Focused tab"}),e}function dt(t){let e=t.trim();return!e||e.includes(" ")?!1:/^\S+:\/\//.test(e)||/^localhost(:\d+)?/.test(e)?!0:/^[\w-]+(\.[\w-]+)+/.test(e)}function mt(t,e){return!e||!t?t:t.filter(o=>o.title.toLowerCase().includes(e.toLowerCase())||o.url?.toLowerCase().includes(e.toLowerCase()))}function ft(t,e){if(!t||!e||e.length===0)return t;let o=new Set(e.map(r=>r.url?.toLowerCase()).filter(Boolean));return t.filter(r=>!o.has(r.url.toLowerCase()))}var Z=at(require("fs"));var k=require("@raycast/utils"),v=require("path"),Q=require("os"),W=require("fs"),q=require("child_process");var X="Bookmarks file not found";var gt=require("react"),te=require("@raycast/api"),ee=require("@raycast/utils");var oe=require("react/jsx-runtime");function yt(){let t=(0,v.resolve)((0,Q.homedir)(),"Library/Application Support/Dia/User Data/Local State");try{let e=(0,W.readFileSync)(t,"utf-8"),r=JSON.parse(e).profile.last_used||"Default";return(0,v.resolve)((0,Q.homedir)(),`Library/Application Support/Dia/User Data/${r}`)}catch(e){return console.error("Error reading Local State:",e),(0,v.resolve)((0,Q.homedir)(),"Library/Application Support/Dia/User Data/Default")}}function ce(){return(0,v.resolve)(yt(),"History")}function wt(){return(0,v.resolve)(yt(),"Bookmarks")}async function le(t){if(!t||t.trim().length===0)return[];try{let n=function(l,a=[]){if(l.children)for(let d of l.children)d.type==="url"&&d.url?`${d.name.toLowerCase()} ${d.url.toLowerCase()}`.includes(i)&&r.push({id:d.id,name:d.name,url:d.url,path:a.length>0?a.join(" \u203A "):"Bookmarks"}):d.type==="folder"&&n(d,[...a,d.name])};var e=n;let o=await H(),r=[],i=t.toLowerCase();return n(o),r}catch(o){return console.error("Error searching bookmarks:",o),[]}}function ue(t,e=100,o=2){let r=t&&t.trim().length>=o?t:void 0,i=r?r.split(" ").filter(n=>n.length>0).map(n=>{let l=lt(n);return`(url LIKE '%${l}%' ESCAPE '\\' OR title LIKE '%${l}%' ESCAPE '\\')`}).join(" AND "):void 0;return`
    SELECT id,
          url,
          title,
          datetime(last_visit_time / 1000000 + (strftime('%s', '1601-01-01')), 'unixepoch', 'localtime') AS lastVisitedAt
    FROM urls
    ${i?`WHERE ${i}`:""}
    GROUP BY url
    ORDER BY last_visit_time DESC
    LIMIT ${e};
  `}function kt(t,e={}){let o=ce(),r=ue(t,e?.limit),i=(0,W.existsSync)(o),n=(0,k.useSQL)(i?o:__filename,r,{permissionPriming:"This extension needs access to read your Dia browser history.",execute:i});if(!i){let l=new Error("The database does not exist");return(0,k.showFailureToast)(l),{isLoading:!1,error:l,data:[],permissionView:null,revalidate:()=>{}}}return n}function pe(t){let e=!1,o=!1,r=!1,i="{",n="";for(let l=0;l<t.length;l++){let a=t[l];if(r){n+=a,r=!1;continue}if(a==="\\"){n+=a,r=!0;continue}if(!e&&(a==="{"||a===","||a===":"||a==="}"||a==="]")&&(i=a),a==='"'){if(e){let d=l+1;for(;d<t.length&&t[d]===" ";)d++;let A=t[d],I=o&&A===":",x=!o&&(A===","||A==="}"||A==="]"||d>=t.length);I||x?(n+=a,e=!1):n+="\\"+a}else n+=a,e=!0,o=i==="{"||i===",";continue}n+=a}return n}async function de(){try{let{tabs:t,windowCount:e}=await me();if(t.length===0&&e>0)try{let o=await ht();if(o.length>0)return o}catch{}return t}catch{try{return await ht()}catch{return[]}}}async function me(){let e=(0,q.execSync)(`osascript -l JavaScript -e '${`
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
  `.replace(/'/g,"'\\''")}'`,{timeout:5e3,encoding:"utf-8"}).trim(),o=JSON.parse(e);return{tabs:o.tabs.map(r=>({...r,url:r.url||void 0})),windowCount:o.windowCount}}async function ht(){let t=await(0,k.runAppleScript)(`
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
    `);if(!t||t.trim()==="[]")return[];let e=t.split("").map(r=>r.charCodeAt(0)<=31?" ":r).join("");return e=pe(e),JSON.parse(e).map(r=>({...r,url:r.url||void 0}))}function St(){return(0,k.useCachedPromise)(de)}function bt(t){return(0,k.usePromise)(async e=>le(e),[t||""],{execute:!!t&&t.trim().length>0})}async function Ct(t){try{let e=`
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
    `;(0,q.execSync)(`osascript -l JavaScript -e '${e.replace(/'/g,"'\\''")}'`,{timeout:3e3,encoding:"utf-8"})}catch{let e=$(t.windowId),o=$(t.tabId);await(0,k.runAppleScript)(`tell application "Dia"
        activate
        repeat with w in every window
          if id of w is "${e}" then
            repeat with t in every tab of w
              if id of t is "${o}" then
                focus t
                exit repeat
              end if
            end repeat
            exit repeat
          end if
        end repeat
      end tell`)}}var F=class extends Error{constructor(){super("Tab not found; it may have already been closed."),this.name="TabNotFoundError"}};async function z(t){let e=$(t.windowId),o=$(t.tabId),r;try{let i=`
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
    `;r=(0,q.execSync)(`osascript -l JavaScript -e '${i.replace(/'/g,"'\\''")}'`,{timeout:3e3,encoding:"utf-8"}).trim()}catch{r=(await(0,k.runAppleScript)(`set _result to "not_found"
        tell application "Dia"
          repeat with w in every window
            if id of w is "${e}" then
              repeat with t in every tab of w
                if id of t is "${o}" then
                  close t
                  set _result to "ok"
                  exit repeat
                end if
              end repeat
              exit repeat
            end if
          end repeat
        end tell
        return _result`)).trim()}if(r!=="ok")throw new F}async function It(){return await(0,k.runAppleScript)(`
    set _output to ""

    tell application "Dia"
      return version
    end tell
  `)}async function H(){let t=wt();if(!Z.default.existsSync(t))throw new Error(X);let e=await Z.default.promises.readFile(t,{encoding:"utf-8"}),o=JSON.parse(e),r={id:"root",name:"Bookmarks",type:"folder",date_added:"0",children:[]};return o.roots&&Object.entries(o.roots).forEach(([i,n])=>{if(n&&typeof n=="object"&&"children"in n){let l=n,a=i==="bookmark_bar"?"Bookmarks Bar":i==="other"?"Other Bookmarks":i==="synced"?"Mobile Bookmarks":l.name||i;r.children.push({...l,name:a})}}),r}function tt(t){let e=[];for(let o of t)o.type==="url"&&o.url?e.push(o.url):o.type==="folder"&&o.children&&e.push(...tt(o.children));return e}var C=require("react/jsx-runtime"),Tt="company.thebrowser.dia";async function fe(t){await(0,u.open)(t,Tt),await(0,u.closeMainWindow)()}function Lt({item:t,onNavigate:e}){if(t.type==="folder"){if(!e)return null;let o=t.children??[],r=o.length,i=(0,At.useMemo)(()=>tt(o),[o]),n=i.length;return(0,C.jsx)(u.List.Item,{id:t.id,title:t.name,icon:{source:u.Icon.Folder,tintColor:u.Color.Blue},accessories:[{text:`${r} item${r!==1?"s":""}`}],actions:(0,C.jsxs)(u.ActionPanel,{title:t.name,children:[(0,C.jsx)(u.Action,{title:"Open Folder",icon:u.Icon.ArrowRight,onAction:()=>e(t.idPath)}),n>0&&(0,C.jsx)(u.Action,{title:`Open All ${n} in Dia`,icon:u.Icon.Globe,shortcut:{modifiers:["cmd"],key:"o"},onAction:async()=>{for(let l of i)await(0,u.open)(l,Tt);await(0,u.closeMainWindow)()}})]})})}if(t.url){let o=t.url,r=t.path.length>1?t.path.slice(0,-1).join(" \u203A "):void 0;return(0,C.jsx)(u.List.Item,{id:t.id,title:t.name,subtitle:r,icon:ut(t.url),actions:(0,C.jsxs)(u.ActionPanel,{title:t.name,children:[(0,C.jsx)(u.Action,{title:"Open in Dia",icon:u.Icon.Globe,onAction:()=>fe(o)}),(0,C.jsx)(u.Action.OpenInBrowser,{url:o,shortcut:{modifiers:["cmd"],key:"o"}}),(0,C.jsx)(u.Action.CopyToClipboard,{title:"Copy URL",content:o,shortcut:{modifiers:["cmd"],key:"c"}}),(0,C.jsx)(u.Action.CopyToClipboard,{title:"Copy Title",content:t.name,shortcut:{modifiers:["cmd","shift"],key:"c"}})]})})}return null}var p=require("@raycast/api"),Pt=require("@raycast/utils");var Et=require("@raycast/api"),_t={google:{id:"google",name:"Google",searchUrl:"https://www.google.com/search?q="},kagi:{id:"kagi",name:"Kagi",searchUrl:"https://kagi.com/search?q="},duckduckgo:{id:"duckduckgo",name:"DuckDuckGo",searchUrl:"https://duckduckgo.com/?q="},brave:{id:"brave",name:"Brave Search",searchUrl:"https://search.brave.com/search?q="},bing:{id:"bing",name:"Bing",searchUrl:"https://www.bing.com/search?q="}};function T(){let{searchEngine:t="google"}=(0,Et.getPreferenceValues)();return _t[t]??_t.google}function b(t,e=T()){return`${e.searchUrl}${encodeURIComponent(t)}`}function O(t=T()){return`Search ${t.name}`}var w=require("react/jsx-runtime");function Bt({item:t,searchText:e,onHistoryAction:o}){let r=e?T():void 0;return(0,w.jsx)(p.List.Item,{icon:(0,Pt.getFavicon)(t.url,{mask:p.Image.Mask.Circle}),title:t.title??"Untitled",subtitle:{value:E(t.url),tooltip:t.url},accessories:[{date:new Date(t.lastVisitedAt)}],actions:(0,w.jsxs)(p.ActionPanel,{children:[(0,w.jsxs)(p.ActionPanel.Section,{children:[(0,w.jsx)(p.Action.Open,{icon:p.Icon.Globe,title:"Open Tab",target:t.url,application:"company.thebrowser.dia",onOpen:()=>{o?.()}}),(0,w.jsx)(p.Action.OpenWith,{icon:p.Icon.AppWindow,path:t.url,onOpen:()=>{o?.()}}),e&&(0,w.jsx)(p.Action.OpenInBrowser,{title:O(r),url:b(e,r),icon:p.Icon.MagnifyingGlass,shortcut:{modifiers:["cmd","shift"],key:"return"},onOpen:()=>{o?.()}})]}),(0,w.jsxs)(p.ActionPanel.Section,{children:[(0,w.jsx)(p.Action.CopyToClipboard,{content:t.url,title:"Copy URL",shortcut:p.Keyboard.Shortcut.Common.Copy}),(0,w.jsx)(p.Action.CopyToClipboard,{content:{html:`<a href="${t.url}">${t.title}</a>`},title:"Copy Formatted URL",shortcut:p.Keyboard.Shortcut.Common.CopyPath}),t.title&&(0,w.jsx)(p.Action.CopyToClipboard,{content:t.title,title:"Copy Title",shortcut:p.Keyboard.Shortcut.Common.CopyName}),(0,w.jsx)(p.Action.CopyToClipboard,{content:`[${t.title??"Untitled"}](${t.url})`,title:"Copy as Markdown"})]}),(0,w.jsx)(p.ActionPanel.Section,{children:(0,w.jsx)(p.Action.CreateQuicklink,{quicklink:{link:t.url,name:t.title},shortcut:{modifiers:["cmd"],key:"s"}})})]})})}var m=require("@raycast/api"),xt=require("@raycast/utils");var S=require("react/jsx-runtime");function Dt({suggestion:t,onSuggestionAction:e}){return(0,S.jsx)(m.List.Item,{icon:(0,xt.getFavicon)(t.url,{mask:m.Image.Mask.Circle}),title:t.query,subtitle:{value:E(t.url),tooltip:t.url},actions:(0,S.jsxs)(m.ActionPanel,{children:[(0,S.jsxs)(m.ActionPanel.Section,{children:[(0,S.jsx)(m.Action.Open,{icon:m.Icon.Globe,title:"Open Tab",target:t.url,application:"company.thebrowser.dia",onOpen:()=>{e?.()}}),(0,S.jsx)(m.Action.OpenWith,{icon:m.Icon.AppWindow,path:t.url,onOpen:()=>{e?.()}})]}),(0,S.jsxs)(m.ActionPanel.Section,{children:[(0,S.jsx)(m.Action.CopyToClipboard,{content:t.url,title:"Copy URL",shortcut:m.Keyboard.Shortcut.Common.Copy}),(0,S.jsx)(m.Action.CopyToClipboard,{content:{html:`<a href="${t.url}">${t.query}</a>`},title:"Copy Formatted URL",shortcut:m.Keyboard.Shortcut.Common.CopyPath}),(0,S.jsx)(m.Action.CopyToClipboard,{content:t.query,title:"Copy Query",shortcut:m.Keyboard.Shortcut.Common.CopyName}),(0,S.jsx)(m.Action.CopyToClipboard,{content:`[${t.query}](${t.url})`,title:"Copy as Markdown"})]}),(0,S.jsx)(m.ActionPanel.Section,{children:(0,S.jsx)(m.Action.CreateQuicklink,{quicklink:{link:t.url,name:t.query},shortcut:{modifiers:["cmd"],key:"s"}})})]})})}var s=require("@raycast/api"),N=require("@raycast/utils");var g=require("react/jsx-runtime");function et({tab:t,searchText:e,onTabAction:o,mutateTabs:r}){let{defaultTabAction:i}=(0,s.getPreferenceValues)(),n=e?T():void 0,l=(0,g.jsx)(s.Action,{icon:s.Icon.ArrowRight,title:"Focus Existing Tab",shortcut:i==="focus"?void 0:{modifiers:["cmd"],key:"return"},onAction:async()=>{try{await Ct(t),await(0,s.closeMainWindow)(),o?.()}catch(I){await(0,N.showFailureToast)(I,{title:"Failed focusing tab"})}}}),a=t.url?(0,g.jsx)(s.Action.Open,{icon:s.Icon.Globe,title:"Open in New Tab",target:t.url,application:"company.thebrowser.dia",shortcut:i==="open"?void 0:{modifiers:["cmd"],key:"return"},onOpen:()=>{o?.()}}):null,d=i==="focus"?l:a,A=i==="focus"?a:l;return(0,g.jsx)(s.List.Item,{icon:t.url?(0,N.getFavicon)(t.url,{mask:s.Image.Mask.Circle}):s.Icon.Globe,title:t.title,subtitle:t.url?{value:E(t.url),tooltip:t.url}:void 0,accessories:pt(t),actions:(0,g.jsxs)(s.ActionPanel,{children:[d,A,e&&(0,g.jsx)(s.Action.OpenInBrowser,{title:O(n),url:b(e,n),icon:s.Icon.MagnifyingGlass,shortcut:{modifiers:["cmd","shift"],key:"return"},onOpen:()=>{o?.()}}),(0,g.jsx)(s.ActionPanel.Section,{children:(0,g.jsx)(s.Action,{icon:s.Icon.XMarkCircle,title:"Close Tab",style:s.Action.Style.Destructive,shortcut:{modifiers:["cmd","shift"],key:"w"},onAction:async()=>{try{r?await r(z(t),{optimisticUpdate:I=>I?.filter(x=>!(x.windowId===t.windowId&&x.tabId===t.tabId)),rollbackOnError:!0,shouldRevalidateAfter:!1}):(await z(t),o?.())}catch(I){I instanceof F?o?.():await(0,N.showFailureToast)(I,{title:"Failed closing tab"})}}})}),(0,g.jsxs)(s.ActionPanel.Section,{children:[t.url&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s.Action.CopyToClipboard,{content:t.url,title:"Copy URL",shortcut:s.Keyboard.Shortcut.Common.Copy}),(0,g.jsx)(s.Action.CopyToClipboard,{content:{html:`<a href="${t.url}">${t.title||"Untitled"}</a>`},title:"Copy Formatted URL",shortcut:s.Keyboard.Shortcut.Common.CopyPath})]}),(0,g.jsx)(s.Action.CopyToClipboard,{content:t.title||"Untitled",title:"Copy Title",shortcut:s.Keyboard.Shortcut.Common.CopyName}),t.url&&(0,g.jsx)(s.Action.CopyToClipboard,{content:`[${t.title||"Untitled"}](${t.url})`,title:"Copy as Markdown"})]})]})})}var y=require("@raycast/api"),vt=require("@raycast/utils");var P=require("react/jsx-runtime"),ge="company.thebrowser.dia";function Ot({url:t,searchText:e}){let o=/^\S+:\/\//.test(t)?t:`https://${t}`,r=T();return(0,P.jsx)(y.List.Item,{icon:(0,vt.getFavicon)(o),title:`Open ${t}`,subtitle:E(o),actions:(0,P.jsxs)(y.ActionPanel,{children:[(0,P.jsx)(y.Action.Open,{icon:y.Icon.Globe,title:"Open in Dia",target:o,application:ge,onOpen:async()=>{await(0,y.closeMainWindow)()}}),(0,P.jsx)(y.Action.OpenInBrowser,{title:`${O(r)} Instead`,url:b(e,r),icon:y.Icon.MagnifyingGlass,shortcut:{modifiers:["cmd","shift"],key:"return"}}),(0,P.jsx)(y.ActionPanel.Section,{children:(0,P.jsx)(y.Action.CopyToClipboard,{content:o,title:"Copy URL",shortcut:y.Keyboard.Shortcut.Common.Copy})})]})})}var _=require("@raycast/api"),Rt=require("@raycast/utils"),Ut=require("path"),j=require("semver"),J=require("react");var G=require("react/jsx-runtime"),K="1.7.0";function he(t){let{data:e,isLoading:o}=(0,Rt.useCachedPromise)(It),r=(0,J.useRef)(!1);if((0,J.useEffect)(()=>{!o&&e&&(0,j.lt)(e,K)&&!r.current&&(r.current=!0,(0,_.showToast)({style:_.Toast.Style.Failure,title:"Dia Update Required",message:`This extension requires Dia v${K}+. Please update via Dia \u2192 Check for Updates.`}))},[e,o]),e&&!(0,j.lt)(e,K)||o&&!e)return t.children;if(!o&&e&&(0,j.lt)(e,K)){let i=(0,Ut.join)(_.environment.assetsPath,"check-for-updates.png"),n=`## Version conflict

The extension requires Dia v${K}. Please update the app via Dia \u2192 Check for Updates.

![Check for Updates](${i})`;return(0,G.jsx)(_.Detail,{markdown:n})}return!o&&!e?(0,G.jsx)(_.Detail,{markdown:`## Something went wrong

We are unable to fetch the version of Dia. Please make sure Dia is correctly installed and try again.`}):t.children}function ot(t){return function(o){return(0,G.jsx)(he,{children:(0,G.jsx)(t,{...o})})}}var $t=require("@raycast/utils");var rt=at(require("crypto"),1);var Mt="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var ye=128,B,R,we=t=>{if(t<0)throw new RangeError("Wrong ID size");try{!B||B.length<t?(B=Buffer.allocUnsafe(t*ye),rt.default.randomFillSync(B),R=0):R+t>B.length&&(rt.default.randomFillSync(B),R=0)}catch(e){throw B=void 0,e}R+=t};var U=(t=21)=>{we(t|=0);let e="";for(let o=R-t;o<R;o++)e+=Mt[B[o]&63];return e};function Ft(t,e=!0){return(0,$t.useFetch)(`https://suggestqueries.google.com/complete/search?hl=en-us&output=chrome&q=${encodeURIComponent(t)}`,{headers:{"Content-Type":"text/plain; charset=UTF-8"},execute:e&&!!t&&t.trim().length>=2,keepPreviousData:!0,parseResponse:async o=>{try{let r=await o.json();if(!Array.isArray(r)||r.length<5||!Array.isArray(r[1])||!r[4])return console.warn("Invalid Google suggestions response structure"),[{id:U(),query:t,url:b(t)}];let i=[{id:U(),query:t,url:b(t)}];return r[1].forEach((n,l)=>{if(!n)return;let a=r[4]["google:suggesttype"]?.[l],d=r[2]?.[l];n.toLowerCase()!==t.toLowerCase()&&(a==="NAVIGATION"?i.push({id:U(),query:d||n,url:n}):a==="QUERY"&&i.push({id:U(),query:n,url:b(n)}))}),i}catch(r){return console.error("Error parsing Google suggestions:",r),[{id:U(),query:t,url:b(t)}]}}})}var f=require("react/jsx-runtime");function ke(t,e){let[o,r]=(0,L.useState)(t),i=(0,L.useRef)(void 0);return(0,L.useEffect)(()=>(i.current=setTimeout(()=>r(t),e),()=>clearTimeout(i.current)),[t,e]),o}function Se(){let[t,e]=(0,L.useState)(""),[o,r]=(0,Nt.useCachedState)("view-mode","all"),i=ke(t,200),n=T(),{isLoading:l,data:a,revalidate:d,mutate:A}=St(),{data:I,permissionView:x}=kt(i),{data:Kt}=bt(i),{data:Gt}=Ft(i,n.id==="google"),Vt=n.id==="google"?Gt:i?[{id:`search-${n.id}-${i}`,query:i,url:b(i,n)}]:[];if(x)return x;let it=(0,L.useMemo)(()=>mt(a,t),[a,t]),Ht=(0,L.useMemo)(()=>ft(I,a),[I,a]),M=c=>o==="all"||o===c,nt=t&&dt(t)?t.trim():null;return(0,f.jsxs)(h.List,{isLoading:l,searchBarPlaceholder:"Search tabs, bookmarks and browsing history...",searchText:t,onSearchTextChange:e,searchBarAccessory:(0,f.jsxs)(h.List.Dropdown,{tooltip:"Filter View",value:o,onChange:c=>r(c),children:[(0,f.jsx)(h.List.Dropdown.Section,{children:(0,f.jsx)(h.List.Dropdown.Item,{title:"All",value:"all"})}),(0,f.jsxs)(h.List.Dropdown.Section,{children:[(0,f.jsx)(h.List.Dropdown.Item,{title:"Pinned Tabs",value:"pinned-tabs"}),(0,f.jsx)(h.List.Dropdown.Item,{title:"Open Tabs",value:"open-tabs"}),(0,f.jsx)(h.List.Dropdown.Item,{title:"Bookmarks",value:"bookmarks"}),(0,f.jsx)(h.List.Dropdown.Item,{title:"History",value:"history"}),(0,f.jsx)(h.List.Dropdown.Item,{title:"Suggestions",value:"suggestions"})]})]}),children:[nt&&(0,f.jsx)(h.List.Section,{title:"Open URL",children:(0,f.jsx)(Ot,{url:nt,searchText:t})}),M("pinned-tabs")&&(0,f.jsx)(h.List.Section,{title:"Pinned Tabs",children:it?.filter(c=>c.isPinned)?.map((c,Y)=>(0,f.jsx)(et,{tab:c,searchText:t,onTabAction:d,mutateTabs:A},`pinned-tab-${c.windowId}-${c.tabId}-${Y}`))}),M("open-tabs")&&(0,f.jsx)(h.List.Section,{title:"Open Tabs",children:it?.filter(c=>!c.isPinned)?.map((c,Y)=>(0,f.jsx)(et,{tab:c,searchText:t,onTabAction:d,mutateTabs:A},`open-tab-${c.windowId}-${c.tabId}-${Y}`))}),M("bookmarks")&&i&&(0,f.jsx)(h.List.Section,{title:"Bookmarks",children:Kt?.map(c=>(0,f.jsx)(Lt,{item:{id:c.id,name:c.name,type:"url",url:c.url,path:c.path.split(" \u203A "),idPath:[]}},`bookmark-${c.id}`))}),M("history")&&(0,f.jsx)(h.List.Section,{title:"History",children:Ht?.map(c=>(0,f.jsx)(Bt,{item:c,searchText:t,onHistoryAction:d},`history-${c.id}`))}),M("suggestions")&&i&&(0,f.jsx)(h.List.Section,{title:n.id==="google"?"Google Suggestions":`${n.name} Search`,children:Vt?.map(c=>(0,f.jsx)(Dt,{suggestion:c,onSuggestionAction:d},c.id))})]})}var be=ot(Se);
