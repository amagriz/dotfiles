"use strict";var I=Object.defineProperty;var We=Object.getOwnPropertyDescriptor;var $e=Object.getOwnPropertyNames;var Ke=Object.prototype.hasOwnProperty;var je=(e,t)=>{for(var n in t)I(e,n,{get:t[n],enumerable:!0})},Ge=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of $e(t))!Ke.call(e,o)&&o!==n&&I(e,o,{get:()=>t[o],enumerable:!(r=We(t,o))||r.enumerable});return e};var Je=e=>Ge(I({},"__esModule",{value:!0}),e);var yt={};je(yt,{default:()=>Fe});module.exports=Je(yt);var d=require("@raycast/api"),B=require("@raycast/utils"),De=require("react");var z=require("fs");var g=require("fs"),V=require("os"),x=require("path");var O=require("@raycast/api"),K=require("child_process"),A=require("fs"),L=require("os"),h=require("path");function qe(e){try{return(0,A.statSync)(e).isFile()}catch{return!1}}var m=process.platform==="win32",Qe="net.imput.helium",Ve=[(0,h.join)("imput","Helium"),"Helium"],Xe=["chrome.exe","helium.exe"],Ye=["HKCU\\Software\\Clients\\StartMenuInternet","HKLM\\Software\\Clients\\StartMenuInternet"];function N(){let{heliumPath:e}=(0,O.getPreferenceValues)(),t=e?.trim();return t||void 0}function _(){return(0,O.getPreferenceValues)().userDataPath?.trim()||void 0}function j(e=process.env,t=(0,L.homedir)()){return G([e.LOCALAPPDATA,(0,h.join)(t,"AppData","Local"),e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function ze(e=process.env,t=(0,L.homedir)()){return G([(0,h.join)(t,"AppData","Local"),e.LOCALAPPDATA,e.PROGRAMFILES,e["PROGRAMFILES(X86)"]])}function G(e){let t=e.filter(n=>!!n).flatMap(n=>Ve.map(r=>(0,h.join)(n,r)));return[...new Set(t)]}function J(e=Ze){for(let t of Ye)for(let n of et(e(t)))if((0,A.existsSync)(n))return n}function Ze(e){try{return(0,K.execFileSync)("reg",["query",e,"/s"],{encoding:"utf8",stdio:["ignore","pipe","ignore"],timeout:3e3})}catch{return""}}function et(e){let t=[],n=!1;for(let r of e.split(/\r?\n/)){if(/^HKEY_/.test(r)){n=/StartMenuInternet\\Helium/i.test(r)&&/\\shell\\open\\command$/i.test(r);continue}if(!n)continue;let o=r.split(/REG_SZ\s+/)[1]?.trim();if(!o)continue;let s=o.match(/^"([^"]+)"/);t.push(s?s[1]:o.split(/\s+/)[0])}return t}function q(e={}){let t="override"in e?e.override:N();if(t&&qe(t))return t;for(let r of j(e.env,e.home))for(let o of Xe){let s=(0,h.join)(r,"Application",o);if((0,A.existsSync)(s))return s}return(e.registryLookup??(()=>J()))()}var U;function D(){return U||(U={value:q()}),U.value}function F(){let e=D();if(!e)throw console.error("[Helium] Executable not found. Probed:",{preference:N(),localAppData:process.env.LOCALAPPDATA,roots:j(),registry:J()}),new Error("Helium was not found. Checked the standard install locations and the Windows registry. If Helium is installed elsewhere (for example a portable build), set its full path to chrome.exe in this extension's preferences.");return e}function Q(){return m?D():N()??Qe}function E(e={}){let t="userDataPath"in e?e.userDataPath?.trim():_();if(t){try{if((0,A.statSync)(t).isDirectory())return t}catch{}throw new Error("The User Data Directory preference must point to an existing Helium User Data folder.")}let n=e.env??process.env,r="override"in e||e.env?q(e):D(),o=[];r&&o.push((0,h.join)((0,h.dirname)((0,h.dirname)(r)),"User Data"));for(let a of ze(n,e.home))o.push((0,h.join)(a,"User Data"));let s=o.find(a=>(0,A.existsSync)(a));return s||o[0]}var tt=(0,x.join)("Library","Application Support","net.imput.helium");function X(e=(0,V.homedir)()){return m?E()??(0,x.join)(e,"AppData","Local","imput","Helium","User Data"):(0,x.join)(e,tt)}function Y(e,t=X()){for(let n of rt(t)){let r=(0,x.join)(t,n,e);if((0,g.existsSync)(r))return r}}function rt(e=X()){let t=new Set,n=nt((0,x.join)(e,"Local State")),r=M(M(n)?.profile),o=ot(r?.last_used);o&&t.add(o);for(let a of it(r?.last_active_profiles))t.add(a);let s=M(r?.info_cache);if(s)for(let a of Object.keys(s))t.add(a);t.add("Default");try{for(let a of(0,g.readdirSync)(e)){let c=(0,x.join)(e,a);(0,g.statSync)(c).isDirectory()&&(0,g.existsSync)((0,x.join)(c,"Preferences"))&&t.add(a)}}catch{}return[...t]}function nt(e){if(!(!e||!(0,g.existsSync)(e)))try{return JSON.parse((0,g.readFileSync)(e,"utf8"))}catch{return}}function M(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:void 0}function ot(e){return typeof e=="string"?e:void 0}function it(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Z(e,t,n){if(e.type==="url"&&e.url){n.push({id:e.guid??e.id??e.url,url:e.url,title:e.name?.trim()||"Untitled",folder:t||void 0});return}if(Array.isArray(e.children))for(let r of e.children){let o=r.type==="folder"&&r.name?t?`${t}/${r.name}`:r.name:t;Z(r,o,n)}}function st(e){let t=e?.roots;if(!t||typeof t!="object")return[];let n=[];for(let r of Object.values(t))r&&typeof r=="object"&&Z(r,"",n);return n}async function ee(){let e=Y("Bookmarks");if(!e)return[];try{let t=await z.promises.readFile(e,"utf8");return st(JSON.parse(t))}catch(t){throw console.error("Error reading Helium bookmarks file:",t),new Error("Failed to read bookmarks from the Helium profile")}}var T=require("@chrismessina/raycast-kit"),H=require("@chrismessina/raycast-kit/plural"),i=require("@raycast/api");var S=require("@raycast/utils");function te(e){return!e||e.trim()===""||e.trim()==="not_running"?[]:e.split("").map(t=>t.split("")).filter(t=>t.length>=2&&t[0]).map(([t,n,r=""])=>({heliumId:t,url:n,title:r}))}function at(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async function re(){let t=await(0,S.runAppleScript)(`
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
  `,{timeout:5e3});return te(t)}async function ne(e){let n=`
    tell application "Helium"
      if not running then return "not_running"
      set foundTab to false
      repeat with w in windows
        repeat with t in tabs of w
          try
            if (id of t as text) is "${at(e)}" then
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
  `;try{return(await(0,S.runAppleScript)(n,{timeout:5e3})).trim()==="success"}catch(r){return console.error("closeHeliumTabById error:",r),!1}}async function oe(){await(0,S.runAppleScript)(`
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
  `)}async function ie(e){let t=e.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),n=`
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
  `;await(0,S.runAppleScript)(n)}var pe=require("child_process"),me=require("fs");var ae=require("@raycast/api"),ce=require("path"),le=require("fs/promises"),ue=require("child_process");async function se(e,...t){if(process.platform!=="win32")return Promise.reject(new Error("Rust functions are not supported on macOS"));let n=(0,ce.join)(ae.environment.assetsPath,"compiled_raycast_rust","helium-windows.exe");return await(0,le.chmod)(n,"755"),new Promise((r,o)=>{let s=(0,ue.spawn)(n,[e],{stdio:["pipe","pipe","pipe"]}),a=[],c=[];s.stdout?.on("data",p=>{a.push(p.toString())}),s.stderr?.on("data",p=>{c.push(p.toString())}),s.on("exit",p=>{if(p===0)try{let l=a.join("").trim();l.length!=0?r(JSON.parse(l)):r(null)}catch(l){let k=new v("Failed to deserialize result from JSON: "+l.message);k.stdout=a.join("").trim(),k.stderr=c.join("").trim(),o(k)}else{let l=new v(c.join("").trim()||a.join("").trim()||"Could not get any data");l.stdout=a.join("").trim(),l.stderr=c.join("").trim(),o(l)}}),s.on("error",p=>{o(p)});try{let p=JSON.stringify(t);s.stdin.write(p),s.stdin.end()}catch(p){o(new v("Failed to serialize input to JSON: "+p.message))}})}var de={switch_tab:async(e,t)=>await se("switch_tab",e,t),new_tab:async e=>await se("new_tab",e)},lt=de.switch_tab,fe=de.new_tab;var v=class extends Error{constructor(t){super(t),this.name="RustError"}};var ut="chrome://new-tab-page/";function we(e){let t=F(),n=E(),r=n&&(0,me.existsSync)(n)?[`--user-data-dir=${n}`]:[];return new Promise((o,s)=>{let a=(0,pe.spawn)(t,[...r,...e],{detached:!0,stdio:"ignore",windowsHide:!1});a.once("error",c=>s(new Error(`Could not start Helium at ${t}: ${c.message}`))),a.once("spawn",()=>{a.unref(),o()})})}async function he(e){await we([e])}async function ge(){!_()&&await fe(F())||await we([ut])}var be=!m,ft="Closing Helium tabs is only available on macOS";async function W(e){return m?he(e):ie(e)}async function ye(){return m?ge():oe()}async function Te(){return m?[]:re()}async function ke(e){if(m)throw new Error(ft);return ne(e)}var Se=require("@chrismessina/raycast-kit"),P=require("@raycast/api");function xe(e){return e.map(t=>({id:String(t.id),url:t.url,title:t.title||"",favicon:t.favicon}))}function Ae(e,t){let n=new Map;for(let r of t)r.favicon&&!n.has(r.url)&&n.set(r.url,r.favicon);return e.map(r=>({id:r.heliumId,url:r.url,title:r.title||"",favicon:n.get(r.url)}))}function Pe(){return P.environment.canAccess(P.BrowserExtension)}async function pt(){if(m)return Pe()?xe(await P.BrowserExtension.getTabs()):[];let[e,t]=await Promise.all([Te(),Pe()?mt(P.BrowserExtension.getTabs(),250,[]).catch(()=>[]):Promise.resolve([])]);return Ae(e,t)}async function ve(){try{return await pt()}catch(e){return await(0,Se.showError)(e,{title:"Failed to Get Tabs"}),[]}}async function mt(e,t,n){let r;try{return await Promise.race([e,new Promise(o=>{r=setTimeout(()=>o(n),t)})])}finally{r&&clearTimeout(r)}}function He(e,t){let n=new Set(t.map(r=>r.id));return[...e].filter(r=>n.has(r))}function b(e,t,n){return{macOS:{modifiers:e,key:n},Windows:{modifiers:t,key:n}}}var y={newTab:b(["cmd"],["ctrl"],"n"),closeTab:b(["cmd","shift"],["ctrl","shift"],"w"),deduplicateTabs:b(["cmd","shift","ctrl"],["ctrl","shift","alt"],"w"),openInNewTab:b(["cmd","shift"],["ctrl","shift"],"o"),openInDefaultBrowser:b(["cmd","opt"],["ctrl","alt"],"o"),copyUrl:b(["cmd","shift"],["ctrl","shift"],"c"),copyTitle:b(["cmd","opt"],["ctrl","alt"],"c"),copyQuery:b(["cmd","opt"],["ctrl","alt"],"c"),copyAsMarkdown:b(["cmd","ctrl"],["alt","shift"],"c"),createQuicklink:b(["cmd","shift"],["ctrl","shift"],"q")};var w=require("react/jsx-runtime");function wt({title:e,url:t,icon:n,shortcut:r}){return m?(0,w.jsx)(i.Action,{title:e,icon:n??i.Icon.Globe,shortcut:r,onAction:async()=>{try{await W(t),await(0,i.closeMainWindow)()}catch(o){await(0,T.showError)(o,{title:"Failed to open in Helium"})}}}):(0,w.jsx)(i.Action.Open,{title:e,target:t,application:Q(),icon:n,shortcut:r})}function Re(){return(0,w.jsx)(i.Action,{title:"Open New Tab",icon:i.Icon.PlusCircle,shortcut:y.newTab,onAction:async()=>{try{await ye(),await(0,i.closeMainWindow)()}catch(e){await(0,T.showError)(e,{title:"Failed to open new tab"})}}})}function Ce({subject:e="List",revalidate:t}){return(0,w.jsx)(i.Action,{title:`Reload ${e}`,icon:i.Icon.ArrowClockwise,shortcut:i.Keyboard.Shortcut.Common.Refresh,onAction:async()=>{let n=await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Reloading ${e.toLowerCase()}\u2026`});try{await Promise.resolve(t()),await(0,i.showToast)({style:i.Toast.Style.Success,title:`${e} reloaded`})}catch(r){(0,T.failToast)(n,r,{title:`Failed to reload ${e.toLowerCase()}`})}}})}function Ee({tabs:e,mutate:t,revalidate:n,pendingCloseIdsRef:r}={}){return be?(0,w.jsx)(i.Action,{title:"Deduplicate Tabs",icon:i.Icon.Filter,shortcut:y.deduplicateTabs,onAction:async()=>{let o;try{let s=e??await ve(),a=new Set,c=[];for(let f of s)a.has(f.url)?c.push(f):a.add(f.url);if(c.length===0){await(0,i.showToast)({style:i.Toast.Style.Success,title:"No duplicate tabs"});return}o=await(0,i.showToast)({style:i.Toast.Style.Animated,title:`Closing ${(0,H.countOf)(c.length,"duplicate tab")}`});let p=c.map(f=>f.id),l=t&&n&&r?{mutate:t,revalidate:n,pendingCloseIdsRef:r}:void 0;if(l)for(let f of p)l.pendingCloseIdsRef.current.add(f);let k=[];try{l&&await l.mutate(void 0,{optimisticUpdate(f){if(!f)return[];let C=new Set(p);return f.filter(Me=>!C.has(Me.id))},rollbackOnError:!1,shouldRevalidateAfter:!1});for(let f of c)try{await ke(f.id)?k.push(f.id):l&&l.pendingCloseIdsRef.current.delete(f.id)}catch{l&&l.pendingCloseIdsRef.current.delete(f.id)}}finally{if(l&&await ht(l.revalidate,k))for(let C of k)l.pendingCloseIdsRef.current.delete(C)}let R=k.length,$=`Closed ${R}/${c.length} duplicate ${(0,H.plural)(c.length,"tab")}`;R===c.length?(o.style=i.Toast.Style.Success,o.title=$):(0,T.failToast)(o,new Error(`${(0,H.countOf)(c.length-R,"tab")} could not be closed. Refresh and try again.`),{title:R>0?$:"Failed to close duplicates"})}catch(s){o?(0,T.failToast)(o,s,{title:"Failed to deduplicate tabs"}):await(0,T.showError)(s,{title:"Failed to deduplicate tabs"})}}}):null}function Be({bookmark:e}){return(0,w.jsx)(i.Action,{title:"Open Bookmark",icon:i.Icon.ArrowRight,onAction:async()=>{try{await W(e.url),await(0,i.closeMainWindow)()}catch(t){await(0,T.showError)(t,{title:"Failed to open bookmark"})}}})}function Ie({bookmark:e}){return(0,w.jsx)(wt,{title:"Open in New Tab",url:e.url,icon:i.Icon.PlusCircle,shortcut:y.openInNewTab})}function Ue({bookmark:e}){return(0,w.jsx)(i.Action.CopyToClipboard,{title:"Copy URL",content:e.url,shortcut:y.copyUrl})}function Oe({bookmark:e}){return(0,w.jsx)(i.Action.CopyToClipboard,{title:"Copy Title",content:e.title,shortcut:y.copyTitle})}function Le({bookmark:e}){return(0,w.jsx)(i.Action.CopyToClipboard,{title:"Copy as Markdown",content:`[${e.title}](${e.url})`,shortcut:y.copyAsMarkdown})}function Ne({url:e,name:t}){return(0,w.jsx)(i.Action.CreateQuicklink,{quicklink:{link:e,name:t},shortcut:y.createQuicklink})}async function ht(e,t,n=3,r=150){if(t.length===0)return!0;for(let o=0;o<n;o+=1){try{let s=await Promise.resolve(e());if(Array.isArray(s)&&He(t,s).length===0)return!0}catch{return!1}o<n-1&&await gt(r)}return!1}function gt(e){return new Promise(t=>setTimeout(t,e))}function _e(e,t){if(!t)return e;let n=t.toLowerCase().split(/\s+/).filter(r=>r.length>0);return n.length===0?e:e.filter(r=>{let o=r.title?.toLowerCase(),s=r.url.toLowerCase();return n.every(a=>o&&o.includes(a)||s.includes(a))})}var u=require("react/jsx-runtime");function Fe(){let[e,t]=(0,De.useState)(""),{data:n,isLoading:r,error:o,revalidate:s}=(0,B.usePromise)(ee),a=n?_e(n,e):[];return o?(0,u.jsx)(d.List,{children:(0,u.jsx)(d.List.EmptyView,{icon:d.Icon.XMarkCircle,title:"Failed to Load Bookmarks",description:"There was an error reading your bookmarks file. Make sure Helium is installed and you have bookmarks saved."})}):(0,u.jsxs)(d.List,{isLoading:r,searchBarPlaceholder:"Search bookmarks by title or URL...",onSearchTextChange:t,throttle:!0,children:[a.length===0&&!r&&(0,u.jsx)(d.List.EmptyView,{icon:d.Icon.Bookmark,title:e?"No Bookmarks Found":"No Bookmarks",description:e?"Try a different search query":"You don't have any bookmarks yet. Start bookmarking pages in Helium!"}),a.map(c=>(0,u.jsx)(bt,{bookmark:c,revalidate:s},c.id))]})}function bt({bookmark:e,revalidate:t}){let n=[];return e.folder&&n.push({text:e.folder,icon:d.Icon.Folder}),(0,u.jsx)(d.List.Item,{title:e.title||"Untitled",subtitle:e.url,keywords:[e.url,e.title],icon:(0,B.getFavicon)(e.url,{fallback:d.Icon.Bookmark}),accessories:n,actions:(0,u.jsxs)(d.ActionPanel,{children:[(0,u.jsxs)(d.ActionPanel.Section,{children:[(0,u.jsx)(Be,{bookmark:e}),(0,u.jsx)(Ie,{bookmark:e}),(0,u.jsx)(Re,{})]}),(0,u.jsx)(Ue,{bookmark:e}),(0,u.jsx)(Oe,{bookmark:e}),(0,u.jsx)(Le,{bookmark:e}),(0,u.jsx)(Ne,{url:e.url,name:e.title||"Untitled"}),(0,u.jsx)(d.Action.Open,{title:"Open in Default Browser",target:e.url,icon:d.Icon.Globe,shortcut:y.openInDefaultBrowser}),(0,u.jsx)(Ee,{}),(0,u.jsx)(Ce,{subject:"Bookmarks",revalidate:t})]})})}
