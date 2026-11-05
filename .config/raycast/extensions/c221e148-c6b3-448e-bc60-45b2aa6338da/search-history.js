"use strict";var k=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var ce=Object.getOwnPropertyNames;var le=Object.prototype.hasOwnProperty;var ue=(e,t)=>{for(var r in t)k(e,r,{get:t[r],enumerable:!0})},de=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ce(t))!le.call(e,n)&&n!==r&&k(e,n,{get:()=>t[n],enumerable:!(i=ae(t,n))||i.enumerable});return e};var fe=e=>de(k({},"__esModule",{value:!0}),e);var De={};ue(De,{default:()=>se});module.exports=fe(De);var c=require("@raycast/api"),ne=require("@raycast/utils"),oe=require("react");var P=require("@chrismessina/raycast-kit"),J=require("@chrismessina/raycast-kit/plural"),a=require("@raycast/api");var R=require("@raycast/api"),O=require("child_process"),h=require("fs"),v=require("os"),u=require("path");function pe(e){try{return(0,h.statSync)(e).isFile()}catch{return!1}}var m=process.platform==="win32",me="net.imput.helium",we=[(0,u.join)("imput","Helium"),"Helium"],ge=["chrome.exe","helium.exe"],he=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function E(){let{heliumPath:e}=(0,R.getPreferenceValues)(),t=e?.trim();return t||void 0}function _(){return(0,R.getPreferenceValues)().userDataPath?.trim()||void 0}function B(e=process.env,t=(0,v.homedir)()){return N([e.LOCALAPPDATA,(0,u.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function be(e=process.env,t=(0,v.homedir)()){return N([(0,u.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function N(e){let t=e.filter(r=>!!r).flatMap(r=>we.map(i=>(0,u.join)(r,i)));return[...new Set(t)]}function M(e=ye){for(let t of he)for(let r of Te(e(t)))if((0,h.existsSync)(r))return r}function ye(e){try{return(0,O.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function Te(e){let t=[],r=!1;for(let i of e.split(/\r?\n/)){if(/^HKEY_/.test(i)){r=/StartMenuInternet\\Helium/i.test(i)&&/\\shell\\open\\command$/i.test(i);continue}if(!r)continue;let n=i.split(/REG_SZ\s+/)[1]?.trim();if(!n)continue;let o=n.match(/^"([^"]+)"/);t.push(o?o[1]:n.split(/\s+/)[0])}return t}function F(e={}){let t="override"in e?e.override:E();if(t&&pe(t))return t;for(let i of B(e.env,e.home))for(let n of ge){let o=(0,u.join)(i,"Application",n);if((0,h.existsSync)(o))return o}return(e.registryLookup??(()=>M()))()}var H;function C(){return H||(H={value:F()}),H.value}function $(){let e=C();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:E(),localAppData:process.env.LOCALAPPDATA,roots:B(),registry:M()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function W(){return m?C():E()??me}function x(e={}){let t="userDataPath"in e?e.userDataPath?.trim():_();if(t){try{if((0,h.statSync)(t).isDirectory())return t}catch{}throw new Error("The User Data Directory preference must point to an existing Helium User Data folder.")}let r=e.env??process.env,i="override"in e||e.env?F(e):C(),n=[];i&&n.push((0,u.join)((0,u.dirname)((0,u.dirname)(i)),"User Data"));for(let s of be(r,e.home))n.push((0,u.join)(s,"User Data"));let o=n.find(s=>(0,h.existsSync)(s));return o||n[0]}var K=require("@raycast/utils");async function q(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),r=`
    tell application "Helium"
      if not running then
        activate
        delay 1
      end if

      set winExists to false
      repeat with w in every window
        if index of w is 1 then
          set winExists to true
          exit repeat
        end if
      end repeat

      if not winExists then
        make new window
        activate
        try
          set URL of active tab of window 1 to "${t}"
        on error
          tell window 1
            set newTab to make new tab with properties {URL:"${t}"}
          end tell
        end try
      else
        activate

        tell window 1
          set newTab to make new tab with properties {URL:"${t}"}
        end tell
      end if
    end tell
    return true
  `;await(0,K.runAppleScript)(r)}var V=require("child_process"),G=require("fs");function xe(e){let t=$(),r=x(),i=r&&(0,G.existsSync)(r)?[`--user-data-dir=${r}`]:[];return new Promise((n,o)=>{let s=(0,V.spawn)(t,[...i,...e],{detached:!0,stdio:"ignore",windowsHide:!1});s.once("error",p=>o(new Error(`Could not start Helium at ${t}: ${p.message}`))),s.once("spawn",()=>{s.unref(),n()})})}async function Q(e){await xe([e])}async function j(e){return m?Q(e):q(e)}var Se=require("@chrismessina/raycast-kit"),I=require("@raycast/api");function d(e,t,r){return{macOS:{modifiers:e,key:r},Windows:{modifiers:t,key:r}}}var y={newTab:d(["cmd"],["ctrl"],"n"),closeTab:d(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:d(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:d(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:d(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:d(["cmd","shift"],["ctrl","shift"],"c"),copyTitle:d(["cmd","opt"],["ctrl","alt"],"c"),copyQuery:d(["cmd","opt"],["ctrl","alt"],"c"),copyAsMarkdown:d(["cmd","ctrl"],["alt","shift"],"c"),createQuicklink:d(["cmd","shift"],["ctrl","shift"],"q")};var T=require("react/jsx-runtime");function Y({title:e,url:t,icon:r,shortcut:i}){return m?(0,T.jsx)(a.Action,{title:e,icon:r??a.Icon.Globe,shortcut:i,onAction:async()=>{try{await j(t),await(0,a.closeMainWindow)()}catch(n){await(0,P.showError)(n,{title:"Failed to open in Helium"})}}}):(0,T.jsx)(a.Action.Open,{title:e,target:t,application:W(),icon:r,shortcut:i})}function X({subject:e="List",revalidate:t}){return(0,T.jsx)(a.Action,{title:`Reload ${e}`,icon:a.Icon.ArrowClockwise,shortcut:a.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{let r=await(0,a.showToast)({style:a.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,a.showToast)({style:a.Toast.Style.Success,title:`${e} reloaded`})}catch(i){(0,P.failToast)(r,i,{title:`Failed to reload ${e.toLowerCase()}`})}}})}function z({url:e,name:t}){return(0,T.jsx)(a.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:y.createQuicklink})}var te=require("@raycast/utils"),S=require("react");var f=require("fs"),Z=require("os"),w=require("path");var ke=(0,w.join)("Library","Application Support","net.imput.helium");function L(e=(0,Z.homedir)()){return m?x()??(0,w.join)(e,"AppData","Local","imput","Helium","User Data"):(0,w.join)(e,ke)}function He(e,t=L()){for(let r of Re(t)){let i=(0,w.join)(t,r,e);if((0,f.existsSync)(i))return i}}function Re(e=L()){let t=new Set,r=ve((0,w.join)(e,"Local State")),i=U(U(r)?.profile),n=Ee(i?.last_used);n&&t.add(n);for(let s of Ce(i?.last_active_profiles))t.add(s);let o=U(i?.info_cache);if(o)for(let s of Object.keys(o))t.add(s);t.add("Default");try{for(let s of(0,f.readdirSync)(e)){let p=(0,w.join)(e,s);(0,f.statSync)(p).isDirectory()&&(0,f.existsSync)((0,w.join)(p,"Preferences"))&&t.add(s)}}catch{}return[...t]}function ee(e=L()){return He("History",e)}function ve(e){if(!(!e||!(0,f.existsSync)(e)))try{return JSON.parse((0,f.readFileSync)(e,"utf8"))}catch{return}}function U(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:void 0}function Ee(e){return typeof e=="string"?e:void 0}function Ce(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ie(e=10){return`
    SELECT
      id,
      url,
      title,
      datetime(last_visit_time / 1000000 + (strftime('%s', '1601-01-01')), 'unixepoch', 'localtime') AS lastVisitedAt
    FROM urls
    ORDER BY last_visit_time DESC
    LIMIT ${e};
  `}function Ue(e,t=25){let r=e.trim().split(/\s+/).filter(o=>o.length>0).map(o=>o.replace(/'/g,"''")),i="";return r.length>0&&(i=`WHERE ${r.map(s=>`(url LIKE '%${s}%' OR title LIKE '%${s}%')`).join(" AND ")}`),`
    SELECT
      id,
      url,
      title,
      datetime(last_visit_time / 1000000 + (strftime('%s', '1601-01-01')), 'unixepoch', 'localtime') AS lastVisitedAt
    FROM urls
    ${i}
    GROUP BY url
    ORDER BY last_visit_time DESC
    LIMIT ${t};
  `}function re(e,t=25){let r=(0,S.useMemo)(()=>ee(),[]),i=!!r,n=r??__filename,o=(0,S.useMemo)(()=>i?!e||e.trim().length===0?Ie(t):Ue(e,t):"",[e,t,i]),{data:s,isLoading:p,permissionView:b,revalidate:A}=(0,te.useSQL)(n,o,{execute:i&&o.trim().length>0,onError(g){console.error("[Helium] History search unavailable:",g)}});return{data:(0,S.useMemo)(()=>s?s.map(g=>({id:`history-${g.id}`,url:g.url,title:g.title||g.url,lastVisitedAt:g.lastVisitedAt})):[],[s]),isLoading:i?p:!1,isAvailable:i,permissionView:b,revalidate:A}}function D(e){let t=e.trim();return/^\S+?:\/\//i.test(t)?t:`https://${t}`}function ie(e){try{let t=D(e);return new URL(t).hostname}catch{return e}}var l=require("react/jsx-runtime");function se(e){let[t,r]=(0,oe.useState)(e.fallbackText??""),{data:i,isAvailable:n,isLoading:o,permissionView:s,revalidate:p}=re(t,25);if(s)return s;let b=t.trim().length>0;return(0,l.jsxs)(c.List,{isLoading:o,searchText:t,onSearchTextChange:r,searchBarPlaceholder:"Search browsing history...",throttle:!0,children:[!n&&!o&&(0,l.jsx)(c.List.EmptyView,{icon:c.Icon.Clock,title:"History unavailable",description:"No readable Helium History database was found"}),n&&i.length===0&&!o&&b&&(0,l.jsx)(c.List.EmptyView,{icon:c.Icon.Clock,title:"No history found"}),n&&i.length===0&&!o&&!b&&(0,l.jsx)(c.List.EmptyView,{icon:c.Icon.Clock,title:"No recent history"}),i.length>0&&(0,l.jsx)(c.List.Section,{title:b?"History":"Recent History",subtitle:`${i.length} entr${i.length!==1?"ies":"y"}`,children:i.map(A=>(0,l.jsx)(Le,{entry:A,revalidate:p},A.id))})]})}function Le({entry:e,revalidate:t}){let r=ie(e.url);return(0,l.jsx)(c.List.Item,{title:e.title,subtitle:r,keywords:[e.url,e.title],icon:(0,ne.getFavicon)(e.url,{fallback:c.Icon.Globe}),accessories:[{text:new Date(e.lastVisitedAt).toLocaleDateString()}],actions:(0,l.jsxs)(c.ActionPanel,{children:[(0,l.jsx)(Y,{title:"Open in Helium",url:D(e.url)}),(0,l.jsx)(c.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:y.copyUrl}),(0,l.jsx)(c.Action.CopyToClipboard,{title:"Copy as Markdown",content:`[${e.title}](${e.url})`,shortcut:y.copyAsMarkdown}),(0,l.jsx)(z,{url:e.url,name:e.title}),(0,l.jsx)(X,{subject:"History",revalidate:t})]})})}
