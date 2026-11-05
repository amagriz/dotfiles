"use strict";var B=Object.defineProperty;var qe=Object.getOwnPropertyDescriptor;var Je=Object.getOwnPropertyNames;var Xe=Object.prototype.hasOwnProperty;var ze=(e,t)=>{for(var i in t)B(e,i,{get:t[i],enumerable:!0})},Ve=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Je(t))!Xe.call(e,o)&&o!==i&&B(e,o,{get:()=>t[o],enumerable:!(r=qe(t,o))||r.enumerable});return e};var Ye=e=>Ve(B({},"__esModule",{value:!0}),e);var ft={};ze(ft,{default:()=>Qe});module.exports=Ye(ft);var m=require("@raycast/api"),Ge=require("@raycast/utils"),C=require("react");var ve=require("@raycast/utils"),U=require("react");var Se=require("@chrismessina/raycast-kit"),P=require("@raycast/api");var L=require("@raycast/api"),K=require("child_process"),x=require("fs"),N=require("os"),h=require("path");function Ze(e){try{return(0,x.statSync)(e).isFile()}catch{return!1}}var w=process.platform==="win32",et="net.imput.helium",tt=[(0,h.join)("imput","Helium"),"Helium"],rt=["chrome.exe","helium.exe"],it=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function _(){let{heliumPath:e}=(0,L.getPreferenceValues)(),t=e?.trim();return t||void 0}function D(){return(0,L.getPreferenceValues)().userDataPath?.trim()||void 0}function G(e=process.env,t=(0,N.homedir)()){return Q([e.LOCALAPPDATA,(0,h.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function ot(e=process.env,t=(0,N.homedir)()){return Q([(0,h.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function Q(e){let t=e.filter(i=>!!i).flatMap(i=>tt.map(r=>(0,h.join)(i,r)));return[...new Set(t)]}function j(e=nt){for(let t of it)for(let i of st(e(t)))if((0,x.existsSync)(i))return i}function nt(e){try{return(0,K.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function st(e){let t=[],i=!1;for(let r of e.split(/\r?\n/)){if(/^HKEY_/.test(r)){i=/StartMenuInternet\\Helium/i.test(r)&&/\\shell\\open\\command$/i.test(r);continue}if(!i)continue;let o=r.split(/REG_SZ\s+/)[1]?.trim();if(!o)continue;let s=o.match(/^"([^"]+)"/);t.push(s?s[1]:o.split(/\s+/)[0])}return t}function q(e={}){let t="override"in e?e.override:_();if(t&&Ze(t))return t;for(let r of G(e.env,e.home))for(let o of rt){let s=(0,h.join)(r,"Application",o);if((0,x.existsSync)(s))return s}return(e.registryLookup??(()=>j()))()}var O;function F(){return O||(O={value:q()}),O.value}function H(){let e=F();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:_(),localAppData:process.env.LOCALAPPDATA,roots:G(),registry:j()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function J(){return w?F():_()??et}function X(e={}){let t="userDataPath"in e?e.userDataPath?.trim():D();if(t){try{if((0,x.statSync)(t).isDirectory())return t}catch{}throw new Error("The User Data Directory preference must point to an existing Helium User Data folder.")}let i=e.env??process.env,r="override"in e||e.env?q(e):F(),o=[];r&&o.push((0,h.join)((0,h.dirname)((0,h.dirname)(r)),"User Data"));for(let a of ot(i,e.home))o.push((0,h.join)(a,"User Data"));let s=o.find(a=>(0,x.existsSync)(a));return s||o[0]}var A=require("@raycast/utils");function z(e){return!e||e.trim()===""||e.trim()==="not_running"?[]:e.split("").map(t=>t.split("")).filter(t=>t.length>=2&&t[0]).map(([t,i,r=""])=>({heliumId:t,url:i,title:r}))}function V(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async function Y(){let t=await(0,A.runAppleScript)(`
    set fieldSep to character id 31
    set recordSep to character id 30
    tell application "Helium"
      if not running then return ""
      set output to {}
      repeat with w in windows
        try
          set tabIds to id of tabs of w
          set tabUrls to URL of tabs of w
          set tabTitles to title of tabs of w
          repeat with i from 1 to count of tabIds
            set end of output to (item i of tabIds as text) & fieldSep & (item i of tabUrls as text) & fieldSep & (item i of tabTitles as text)
          end repeat
        end try
      end repeat
      set AppleScript's text item delimiters to recordSep
      set s to output as text
      set AppleScript's text item delimiters to ""
      return s
    end tell
  `,{timeout:5e3});return z(t)}async function Z(e){let i=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${V(e)}" then
              select t
              set foundTab to true
              exit repeat
            end if
          end try
        end repeat
        if foundTab then exit repeat
      end repeat
      if foundTab then
        return "success"
      else
        return "not_found"
      end if
    end tell
  `;try{return(await(0,A.runAppleScript)(i,{timeout:5e3})).trim()==="success"}catch(r){return console.error("switchToHeliumTabById error:",r),!1}}async function ee(e){let i=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${V(e)}" then
              close t
              set foundTab to true
              exit repeat
            end if
          end try
        end repeat
        if foundTab then exit repeat
      end repeat
      if foundTab then
        return "success"
      else
        return "not_found"
      end if
    end tell
  `;try{return(await(0,A.runAppleScript)(i,{timeout:5e3})).trim()==="success"}catch(r){return console.error("closeHeliumTabById error:",r),!1}}async function te(){await(0,A.runAppleScript)(`
    tell application "Helium"
      if not running then
        activate
        delay 1
      end if

      if (count of windows) is 0 then
        make new window
      else
        tell window 1 to make new tab
      end if

      activate
    end tell
    return true
  `)}async function re(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),i=`
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
  `;await(0,A.runAppleScript)(i)}var de=require("child_process"),pe=require("fs");var oe=require("@raycast/api"),ne=require("path"),se=require("fs/promises"),ae=require("child_process");async function ie(e,...t){if(process.platform!=="win32")return Promise.reject(new Error("Rust functions are not supported on macOS"));let i=(0,ne.join)(oe.environment.assetsPath,"compiled_raycast_rust","helium-windows.exe");return await(0,se.chmod)(i,"755"),new Promise((r,o)=>{let s=(0,ae.spawn)(i,[e],{stdio:["pipe","pipe","pipe"]}),a=[],c=[];s.stdout?.on("data",d=>{a.push(d.toString())}),s.stderr?.on("data",d=>{c.push(d.toString())}),s.on("exit",d=>{if(d===0)try{let u=a.join("").trim();u.length!=0?r(JSON.parse(u)):r(null)}catch(u){let l=new v("Failed to deserialize result from JSON: "+u.message);l.stdout=a.join("").trim(),l.stderr=c.join("").trim(),o(l)}else{let u=new v(c.join("").trim()||a.join("").trim()||"Could not get any data");u.stdout=a.join("").trim(),u.stderr=c.join("").trim(),o(u)}}),s.on("error",d=>{o(d)});try{let d=JSON.stringify(t);s.stdin.write(d),s.stdin.end()}catch(d){o(new v("Failed to serialize input to JSON: "+d.message))}})}var ce={switch_tab:async(e,t)=>await ie("switch_tab",e,t),new_tab:async e=>await ie("new_tab",e)},le=ce.switch_tab,ue=ce.new_tab;var v=class extends Error{constructor(t){super(t),this.name="RustError"}};var ct="chrome://new-tab-page/";function fe(e){let t=H(),i=X(),r=i&&(0,pe.existsSync)(i)?[`--user-data-dir=${i}`]:[];return new Promise((o,s)=>{let a=(0,de.spawn)(t,[...r,...e],{detached:!0,stdio:"ignore",windowsHide:!1});a.once("error",c=>s(new Error(`Could not start Helium at ${t}: ${c.message}`))),a.once("spawn",()=>{a.unref(),o()})})}async function me(e){await fe([e])}async function we(e){return await le(H(),e),!0}async function be(){!D()&&await ue(H())||await fe([ct])}var S=!w,ut="Closing Helium tabs is only available on macOS";async function he(e){return w?me(e):re(e)}async function Te(){return w?be():te()}async function ye(){return w?[]:Y()}async function ge(e){return w?we(e.title):Z(e.id)}async function M(e){if(w)throw new Error(ut);return ee(e)}function xe(e){return e.map(t=>({id:String(t.id),url:t.url,title:t.title||"",favicon:t.favicon}))}function Pe(e,t){let i=new Map;for(let r of t)r.favicon&&!i.has(r.url)&&i.set(r.url,r.favicon);return e.map(r=>({id:r.heliumId,url:r.url,title:r.title||"",favicon:i.get(r.url)}))}function Ae(){return P.environment.canAccess(P.BrowserExtension)}async function E(){if(w)return Ae()?xe(await P.BrowserExtension.getTabs()):[];let[e,t]=await Promise.all([ye(),Ae()?dt(P.BrowserExtension.getTabs(),250,[]).catch(()=>[]):Promise.resolve([])]);return Pe(e,t)}async function Ce(){try{return await E()}catch(e){return await(0,Se.showError)(e,{title:"Failed to Get Tabs"}),[]}}async function dt(e,t,i){let r;try{return await Promise.race([e,new Promise(o=>{r=setTimeout(()=>o(i),t)})])}finally{r&&clearTimeout(r)}}function ke(){let[e,t]=(0,U.useState)(),i=(0,ve.useCachedPromise)(E,[],{initialData:[],keepPreviousData:!0,failureToastOptions:{title:"Failed to Get Tabs"},onData:t}),r=(0,U.useCallback)(async()=>{let o=await E();return t(o),await i.mutate(Promise.resolve(o),{optimisticUpdate:()=>o,rollbackOnError:!1,shouldRevalidateAfter:!1}),o},[i.mutate]);return{data:i.data??[],freshTabs:e,isLoading:i.isLoading,mutate:i.mutate,revalidate:r}}var T=require("@chrismessina/raycast-kit"),k=require("@chrismessina/raycast-kit/plural"),n=require("@raycast/api");var Re=new Set;function Ie(e,t){return t.size===0?e:e.filter(i=>!t.has(i.id))}function He(e,t){let i=new Set(t.map(o=>o.id)),r=[];for(let o of e)i.has(o)||(e.delete(o),r.push(o));return r}function Ee(e,t){let i=new Set(t.map(r=>r.id));return[...e].filter(r=>i.has(r))}function y(e,t,i){return{macOS:{modifiers:e,key:i},Windows:{modifiers:t,key:i}}}var g={newTab:y(["cmd"],["ctrl"],"n"),closeTab:y(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:y(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:y(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:y(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:y(["cmd","shift"],["ctrl","shift"],"c"),copyTitle:y(["cmd","opt"],["ctrl","alt"],"c"),copyQuery:y(["cmd","opt"],["ctrl","alt"],"c"),copyAsMarkdown:y(["cmd","ctrl"],["alt","shift"],"c"),createQuicklink:y(["cmd","shift"],["ctrl","shift"],"q")};var b=require("react/jsx-runtime");function W({title:e,url:t,icon:i,shortcut:r}){return w?(0,b.jsx)(n.Action,{title:e,icon:i??n.Icon.Globe,shortcut:r,onAction:async()=>{try{await he(t),await(0,n.closeMainWindow)()}catch(o){await(0,T.showError)(o,{title:"Failed to open in Helium"})}}}):(0,b.jsx)(n.Action.Open,{title:e,target:t,application:J(),icon:i,shortcut:r})}function Ue({tab:e}){return(0,b.jsx)(n.Action,{title:"Switch to Tab",icon:n.Icon.ArrowRight,onAction:async()=>{try{if(await ge(e)){await(0,n.closeMainWindow)();return}await(0,T.showError)(new Error("The tab may have been closed. Refresh the list and try again."),{title:"Tab not found"})}catch(t){await(0,T.showError)(t,{title:"Failed to switch to tab"})}}})}function Be(){return(0,b.jsx)(n.Action,{title:"Open New Tab",icon:n.Icon.PlusCircle,shortcut:g.newTab,onAction:async()=>{try{await Te(),await(0,n.closeMainWindow)()}catch(e){await(0,T.showError)(e,{title:"Failed to open new tab"})}}})}function Oe({subject:e="List",revalidate:t}){return(0,b.jsx)(n.Action,{title:`Reload ${e}`,icon:n.Icon.ArrowClockwise,shortcut:n.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{let i=await(0,n.showToast)({style:n.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,n.showToast)({style:n.Toast.Style.Success,title:`${e} reloaded`})}catch(r){(0,T.failToast)(i,r,{title:`Failed to reload ${e.toLowerCase()}`})}}})}function Le({tab:e,mutate:t,revalidate:i,pendingCloseIdsRef:r}){return S?(0,b.jsx)(n.Action,{title:"Close Tab",icon:n.Icon.XMarkCircle,shortcut:g.closeTab,onAction:async()=>{r.current.add(e.id);let o=await(0,n.showToast)({style:n.Toast.Style.Animated,title:"Closing tab"});try{if(await t(void 0,{optimisticUpdate(c){return c?c.filter(d=>d.id!==e.id):[]},rollbackOnError:!1,shouldRevalidateAfter:!1}),!await M(e.id))throw new Error("Tab not found or failed to close");let a=await We(i,[e.id]);a&&r.current.delete(e.id),await(0,n.showToast)({style:n.Toast.Style.Success,title:a?"Tab closed":"Tab close pending"})}catch(s){r.current.delete(e.id);try{await Promise.resolve(i())}catch{await t(void 0,{optimisticUpdate(a){return a?a.some(c=>c.id===e.id)?a:[e,...a]:[e]},rollbackOnError:!1,shouldRevalidateAfter:!1})}(0,T.failToast)(o,s,{title:"Failed to close tab"})}}}):null}function Ne({tab:e}){return(0,b.jsx)(W,{title:"Open in New Tab",url:e.url,icon:n.Icon.PlusCircle,shortcut:g.openInNewTab})}function _e({tab:e}){return(0,b.jsx)(n.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:g.copyUrl})}function De({tab:e}){return(0,b.jsx)(n.Action.CopyToClipboard,{title:"Copy Title",content:e.title||"",shortcut:g.copyTitle})}function Fe({tabs:e,mutate:t,revalidate:i,pendingCloseIdsRef:r}={}){return S?(0,b.jsx)(n.Action,{title:"Deduplicate Tabs",icon:n.Icon.Filter,shortcut:g.deduplicateTabs,onAction:async()=>{let o;try{let s=e??await Ce(),a=new Set,c=[];for(let f of s)a.has(f.url)?c.push(f):a.add(f.url);if(c.length===0){await(0,n.showToast)({style:n.Toast.Style.Success,title:"No duplicate tabs"});return}o=await(0,n.showToast)({style:n.Toast.Style.Animated,title:`Closing ${(0,k.countOf)(c.length,"duplicate tab")}`});let d=c.map(f=>f.id),u=t&&i&&r?{mutate:t,revalidate:i,pendingCloseIdsRef:r}:void 0;if(u)for(let f of d)u.pendingCloseIdsRef.current.add(f);let l=[];try{u&&await u.mutate(void 0,{optimisticUpdate(f){if(!f)return[];let I=new Set(d);return f.filter(je=>!I.has(je.id))},rollbackOnError:!1,shouldRevalidateAfter:!1});for(let f of c)try{await M(f.id)?l.push(f.id):u&&u.pendingCloseIdsRef.current.delete(f.id)}catch{u&&u.pendingCloseIdsRef.current.delete(f.id)}}finally{if(u&&await We(u.revalidate,l))for(let I of l)u.pendingCloseIdsRef.current.delete(I)}let R=l.length,$=`Closed ${R}/${c.length} duplicate ${(0,k.plural)(c.length,"tab")}`;R===c.length?(o.style=n.Toast.Style.Success,o.title=$):(0,T.failToast)(o,new Error(`${(0,k.countOf)(c.length-R,"tab")} could not be closed. Refresh and try again.`),{title:R>0?$:"Failed to close duplicates"})}catch(s){o?(0,T.failToast)(o,s,{title:"Failed to deduplicate tabs"}):await(0,T.showError)(s,{title:"Failed to deduplicate tabs"})}}}):null}function Me({url:e,name:t}){return(0,b.jsx)(n.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:g.createQuicklink})}async function We(e,t,i=3,r=150){if(t.length===0)return!0;for(let o=0;o<i;o+=1){try{let s=await Promise.resolve(e());if(Array.isArray(s)&&Ee(t,s).length===0)return!0}catch{return!1}o<i-1&&await pt(r)}return!1}function pt(e){return new Promise(t=>setTimeout(t,e))}function $e(e,t){if(!t)return e;let i=t.toLowerCase().split(/\s+/).filter(r=>r.length>0);return i.length===0?e:e.filter(r=>{let o=r.title?.toLowerCase(),s=r.url.toLowerCase();return i.every(a=>o&&o.includes(a)||s.includes(a))})}var p=require("react/jsx-runtime"),Ke="https://www.raycast.com/browser-extension";function Qe(){let[e,t]=(0,C.useState)(""),{data:i,freshTabs:r,isLoading:o,mutate:s,revalidate:a}=ke(),c=(0,C.useRef)(Re);(0,C.useEffect)(()=>{r&&He(c.current,r)},[r]);let d=Ie(i,c.current),u=d?$e(d,e):[];return(0,p.jsxs)(m.List,{isLoading:o,searchBarPlaceholder:"Search tabs by title or URL...",searchText:e,onSearchTextChange:t,children:[u.length===0&&!o&&(0,p.jsx)(m.List.EmptyView,{icon:m.Icon.Window,title:"No Tabs Found",description:S?"Make sure your browser is running with open tabs":"On Windows, tabs come from Raycast's browser extension \u2014 install it in Helium and make sure Helium is running. It reports tabs from every browser it is installed in, so tabs from other browsers can appear here too.",actions:S?void 0:(0,p.jsxs)(m.ActionPanel,{children:[(0,p.jsx)(W,{title:"Get Raycast Browser Extension",icon:m.Icon.Download,url:Ke}),(0,p.jsx)(m.Action.CopyToClipboard,{title:"Copy Link",content:Ke})]})}),u.map(l=>(0,p.jsx)(m.List.Item,{id:l.id,title:l.title||"Untitled",subtitle:l.url,keywords:[l.url,l.title||""],icon:l.favicon||(0,Ge.getFavicon)(l.url,{fallback:m.Icon.Globe}),actions:(0,p.jsxs)(m.ActionPanel,{children:[(0,p.jsxs)(m.ActionPanel.Section,{children:[(0,p.jsx)(Ue,{tab:l}),(0,p.jsx)(Be,{}),(0,p.jsx)(Le,{tab:l,mutate:s,revalidate:a,pendingCloseIdsRef:c}),(0,p.jsx)(Ne,{tab:l})]}),(0,p.jsx)(_e,{tab:l}),(0,p.jsx)(De,{tab:l}),(0,p.jsx)(Me,{url:l.url,name:l.title||"Untitled"}),(0,p.jsx)(Fe,{tabs:d,mutate:s,revalidate:a,pendingCloseIdsRef:c}),(0,p.jsx)(Oe,{subject:"Tabs",revalidate:a})]})},l.id))]})}
