"use strict";var Ar=Object.create;var lt=Object.defineProperty;var Ir=Object.getOwnPropertyDescriptor;var Lr=Object.getOwnPropertyNames;var Rr=Object.getPrototypeOf,Pr=Object.prototype.hasOwnProperty;var xr=(t,e)=>{for(var r in e)lt(t,r,{get:e[r],enumerable:!0})},Zt=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Lr(e))!Pr.call(t,o)&&o!==r&&lt(t,o,{get:()=>e[o],enumerable:!(i=Ir(e,o))||i.enumerable});return t};var vr=(t,e,r)=>(r=t!=null?Ar(Rr(t)):{},Zt(e||!t||!t.__esModule?lt(r,"default",{value:t,enumerable:!0}):r,t)),Cr=t=>Zt(lt({},"__esModule",{value:!0}),t);var In={};xr(In,{default:()=>ar});module.exports=Cr(In);var P=require("react"),h=require("@raycast/api");var C=require("react"),pt=require("@raycast/utils");var te=require("os"),ee=require("net"),Nt=require("url"),B=require("path"),I=require("@raycast/api"),re=require("@raycast/utils"),ne=require("tldts");function ut(t){try{return new Nt.URL(t).host.replace("www.","")}catch{return""}}function ie(t){return t.filter((e,r)=>t.indexOf(e)===r)}var Pn=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});function U(){return(0,B.join)((0,te.homedir)(),"Library","Application Support",A())}function A(){return(0,I.getPreferenceValues)()["orion-rc"]?"Orion RC":"Orion"}function oe(t){let e=t;return(0,B.join)(U(),e,"favourites.plist")}function se(t){let e=t;return(0,B.join)(U(),e,"history")}function ae(t){let e=t;return(0,B.join)(U(),e,"reading_list.plist")}function ce(){return(0,B.join)(U(),"profiles")}var M=async(t,e)=>{try{return await(0,re.runAppleScript)(t,{language:"JavaScript",humanReadableOutput:!1})}catch(r){if(console.log(r),e?.silent)return;if(typeof r=="string"){let i=r.replace("execution error: Error: ","");i.match(/Application can't be found/)?(0,I.showToast)({style:I.Toast.Style.Failure,title:"Application not found",message:"Things must be running"}):(0,I.showToast)({style:I.Toast.Style.Failure,title:"Something went wrong",message:i})}}},le=t=>t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();function Y(t){return t.trim().toLowerCase().split(/\s+/).filter(Boolean)}function ue(t){return`tab-${t.window_id}-${t.tab_index}`}function de(t){let e=t.title.substring(0,75);return e.length<t.title.length&&(e+="..."),e}var fe=t=>{let e=me(t);if(e&&e.hostname)return e.hostname.replace(/^www\./,"")},me=t=>{try{return new Nt.URL(t)}catch{return null}},ge=t=>{switch(t){case 0:return"#98989D";case 1:return"#CC66FF";case 2:return"#F7509E";case 3:return"#FF5045";case 4:return"#FFA915";case 5:return"#FFE018";case 6:return"#3EFD56";case 7:return"#A2A2A7"}return I.Color.PrimaryText},dt={duckduckgo:{name:"DuckDuckGo",search:"https://duckduckgo.com/?q=",suggest:"https://duckduckgo.com/ac/?type=list&q="},google:{name:"Google",search:"https://www.google.com/search?q=",suggest:"https://suggestqueries.google.com/complete/search?client=firefox&q="},brave:{name:"Brave",search:"https://search.brave.com/search?q=",suggest:"https://search.brave.com/api/suggest?source=web&q="},kagi:{name:"Kagi",search:"https://kagi.com/search?q=",suggest:null}};function X(){let t=(0,I.getPreferenceValues)().searchEngine;return t in dt?t:"duckduckgo"}function ft(t=X()){return dt[t].name}function mt(t,e=X()){return dt[e].search+encodeURIComponent(t)}function Or(t){let e=t.replace(/^https?:\/\//i,"").split(/[/?#]/,1)[0];if(!e||e.includes("@"))return;let r=e.match(/^\[([^\]]+)\](?::\d*)?$/);return r?r[1]:e.match(/^([^:]+)(?::\d*)?$/)?.[1]?.toLowerCase()}function Er(t){let e=t.split(".");return e.length===4&&e.every(r=>/^(?:0|[1-9]\d{0,2})$/.test(r)&&Number(r)<=255)}function pe(t){let e=t.trim();if(!e||/\s/.test(e))return!1;let r=/^https?:\/\//i.test(e),i=me(r?e:`https://${e}`);if(!i||i.protocol!=="http:"&&i.protocol!=="https:")return!1;if(r)return!!i.hostname;let o=Or(e);if(!o)return!1;if(o==="localhost"||Er(o)||(0,ee.isIP)(o)===6)return!0;let{isIcann:a,isPrivate:l,domain:d}=(0,ne.parse)(o,{allowPrivateDomains:!0});return d!==null&&(a===!0||l===!0)}function he(t){let e=t.trim();return/^https?:\/\//i.test(e)?e:`https://${e}`}function be(t,e=X()){let r=dt[e].suggest;return r?r+encodeURIComponent(t):null}async function Te(t){await(0,I.open)(t,A())}function ye(t){return t.startsWith("raycast://")}async function gt(){(0,I.getPreferenceValues)().autoCloseLauncherTabs!==!1&&await M(`
    const orion = Application("${A()}");
    orion.windows().forEach((w) => {
      let urls;
      try { urls = w.tabs.url(); } catch (e) { return; }
      const idx = [];
      for (let i = 0; i < urls.length; i++) {
        if (typeof urls[i] === "string" && urls[i].indexOf("raycast://") === 0) idx.push(i);
      }
      if (idx.length === 0) return;
      const blankLauncher = (i) => { try { w.tabs[i].url = "about:blank"; } catch (e) {} };
      // Every tab is a launcher tab: close extras but keep one window tab, navigated
      // away from the deeplink so it can't re-fire the palette.
      if (idx.length >= urls.length) {
        for (let j = idx.length - 2; j >= 0; j--) {
          try { w.tabs[idx[j]].close(); } catch (e) {}
        }
        blankLauncher(idx[idx.length - 1]);
        return;
      }
      // Close highest index first so earlier closes don't shift later indices.
      for (let j = idx.length - 1; j >= 0; j--) {
        try { w.tabs[idx[j]].close(); } catch (e) {}
      }
    });
  `)}async function Hr(){try{let e=(await(0,pt.runAppleScript)(`
        tell application "${A()}"
          if (count of windows) is 0 then return ""
          set currentWindow to window 1
          set currentTab to current tab of currentWindow
          set tabCount to count of tabs of currentWindow
          repeat with i from 1 to tabCount
            if tab i of currentWindow is currentTab then
              return (id of currentWindow as text) & ":" & (i as text)
            end if
          end repeat
        end tell
        return ""
      `,{language:"AppleScript"})).trim().match(/^(\d+):(\d+)$/);return e?{windowId:Number(e[1]),tabIndex:Number(e[2])-1}:void 0}catch(t){console.log("Could not resolve the exact current Orion tab",t);return}}async function we(t){let e=await M(`
    const orion = Application("${A()}");
    const result = { tabs: [], needsCurrentTabResolution: false };
    // \`orion.running()\` never launches the app - unlike any property or
    // method that actually talks to it (e.g. \`.windows()\`), which macOS
    // launches the target application for if it isn't already running. A
    // background poll must never bring back an application the user just
    // quit, so this has to be checked before touching anything else on it.
    if (orion.running()) {
      orion.windows().forEach(window => {
        const windowId = window.id();
        // Orion's scripting bridge fails when reading 'URL'/'name' from the tab
        // objects returned by window.tabs(), but bulk property access on the tab
        // collection (window.tabs.url() / .name()) works, so read them that way.
        let urls, names;
        try {
          urls = window.tabs.url();
          names = window.tabs.name();
        } catch (e) {
          return;
        }
        const count = Math.min(urls.length, names.length);
        let currentUrl = '';
        let currentName = '';
        try {
          const currentTab = window.currentTab();
          currentUrl = currentTab.url() || '';
          currentName = currentTab.name() || '';
        } catch (e) {
          // Keep every tab available even when Orion does not expose its active
          // tab while a page is in flight.
        }

        // A tab has no JXA-exposed persistent identifier. If the current URL and
        // title point to exactly one tab in the frontmost window, we can safely
        // mark it. Otherwise, ask the AppleScript bridge for the exact instance
        // after this fast bulk snapshot is returned.
        const currentMatches = [];
        if (window.index() === 1) {
          for (let i = 0; i < count; i++) {
            if ((urls[i] || '') === currentUrl && (names[i] || '') === currentName) {
              currentMatches.push(i);
            }
          }
        }
        const currentIndex = currentMatches.length === 1 ? currentMatches[0] : -1;
        if (window.index() === 1 && currentIndex === -1) {
          result.needsCurrentTabResolution = true;
        }

        for (let i = 0; i < count; i++) {
          const url = urls[i] || '';
          result.tabs.push({
            title: names[i],
            url: url,
            window_id: windowId,
            tab_index: i,
            is_current: i === currentIndex,
          });
        }
      });
    }
    result
  `,t);if(!e)return;let r=JSON.parse(e);if(!r.needsCurrentTabResolution)return r.tabs;let i=await Hr();return i?r.tabs.map(o=>({...o,is_current:o.window_id===i.windowId&&o.tab_index===i.tabIndex})):r.tabs}async function Nr(){return await we()??[]}var _r=1e3;function $r(t,e){return t!==void 0&&t.length===e.length&&t.every((r,i)=>r.window_id===e[i].window_id&&r.url===e[i].url&&r.title===e[i].title&&r.tab_index===e[i].tab_index&&r.is_current===e[i].is_current)}var Fr=({refreshWhileOpen:t=!1}={})=>{let e=(0,pt.useCachedPromise)(Nr,[],{keepPreviousData:!0}),r=(0,C.useRef)(!1),i=(0,C.useRef)(void 0),o=(0,C.useRef)(0);(0,C.useEffect)(()=>{i.current=e.data},[e.data]);let a=(0,C.useCallback)(async()=>{if(r.current)return;r.current=!0;let u=o.current;try{let c=await we({silent:!0});if(c===void 0||o.current!==u||$r(i.current,c))return;await e.mutate(Promise.resolve(c),{optimisticUpdate:()=>c,rollbackOnError:!1,shouldRevalidateAfter:!1})}finally{r.current=!1}},[e.mutate]),l=(0,C.useCallback)(u=>{let c=i.current;if(!c)return;o.current+=1;let T=c.map(b=>({...b,is_current:b.window_id===u.window_id&&b.tab_index===u.tab_index}));e.mutate(Promise.resolve(T),{optimisticUpdate:()=>T,rollbackOnError:!1,shouldRevalidateAfter:!1})},[e.mutate]);(0,C.useEffect)(()=>{if(!t)return;let u=setInterval(()=>{a()},_r);return()=>clearInterval(u)},[a,t]);let d=(0,C.useCallback)(async()=>{o.current+=1,await e.revalidate()},[e.revalidate]);return{...e,refresh:d,markTabActive:l}},Dr=t=>{let e=Fr(t);return{tabs:e.data,refresh:e.refresh,markTabActive:e.markTabActive}},ke=Dr;var V=require("react"),Se=require("bplist-parser");var ht=require("@raycast/api"),Ur=t=>{let[e,r]=(0,V.useState)([]),[i,o]=(0,V.useState)([]),[a,l]=(0,V.useState)(!0);return(0,V.useEffect)(()=>{let d=oe(t);l(!0);try{let u=(0,Se.parseFileSync)(d),c=Object.values(u[0]),T=Mr(Object.values(u[0])),b=Br(c,T);r(b),o(Array.from(T.values())),l(!1)}catch{(0,ht.showToast)(ht.Toast.Style.Failure,"Error loading bookmarks","Be sure to run Orion at least once.")}finally{l(!1)}},[t]),{folders:i,bookmarks:e,isLoading:a}};function Mr(t){return t.filter(e=>e.type==="folder").reduce((e,r)=>(r.title&&e.set(r.id,r.title),e),new Map)}function Br(t,e){return t.filter(r=>r.type==="bookmark").filter(r=>!!r.url).map(r=>{let i=e.get(r.parentId);return{uuid:r.id,title:r.title,url:r.url,folders:i?[i]:[],dateAdded:r.dateAdded}}).reduce((r,i)=>{let o=r.find(a=>a.title===i.title&&a.url===i.url);return o?o.folders=ie(o.folders.concat(i.folders)):r.push(i),r},[])}var Ae=Ur;var bt=require("react"),Ie=require("bplist-parser");var Vr=t=>{let[e,r]=(0,bt.useState)(),i=ae(t);return(0,bt.useEffect)(()=>{try{let a=(0,Ie.parseFileSync)(i)[0],l=Kr(a);r(l)}catch{r([])}},[t]),{readingList:e}};function Kr(t){return t.filter(e=>!!e.url).map(e=>({uuid:e.id,title:e.title,url:e.url.relative,dateAdded:e.dateAdded,imageUrl:e.imageUrl?.relative,folders:[]}))}var Le=Vr;var Pe=require("@raycast/utils"),K=require("react"),Wr=100,qr=978307200;function zr(t){let e=new Date(t);if(!Number.isNaN(e.getTime())&&e.getFullYear()>1990)return e;let r=typeof t=="number"?t:Number(t);return Number.isFinite(r)?new Date((r+qr)*1e3):new Date(0)}function Qr(t){let e=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${r}-${i}`}var Jr=t=>t.replace(/\\/g,"\\\\").replace(/'/g,"''").replace(/[%_]/g,e=>`\\${e}`),Re=(t,e)=>`${t} LIKE '%${e}%' ESCAPE '\\'`,Gr=t=>{let e=t?Y(t).map(r=>{let i=Jr(r);return`(${Re("URL",i)} OR ${Re("TITLE",i)})`}).join(" AND "):void 0;return`
      SELECT ID as id,
             TITLE as title,
             URL as url,
             LAST_VISIT_TIME as lastVisitTime,
             COALESCE(VISIT_COUNT, 0) as visitCount
      FROM history_items
      ${e?`WHERE ${e}`:""}
      ORDER BY LAST_VISIT_TIME DESC
      LIMIT ${Wr}
  `},jr=(t,e)=>{let r=se(t),i=`${t}\0${e??""}`,o=(0,K.useRef)(i),[a,l]=(0,K.useState)(),d=(0,Pe.useSQL)(r,Gr(e),{onWillExecute:()=>{o.current=i},onData:()=>{l(o.current)}}),u=(0,K.useMemo)(()=>d.data?.map(c=>{let T=zr(c.lastVisitTime);return{...c,lastVisitTime:T.toISOString(),lastVisitDate:Qr(T)}}),[d.data]);return{...d,data:u,queryKey:i,completedQueryKey:a}},xe=jr;var ve=require("@raycast/api"),Ce=require("@raycast/utils");var Yr=6;function Xr(){let t=Number((0,ve.getPreferenceValues)().suggestionLimit);return Number.isInteger(t)&&t>=0&&t<=12?t:Yr}var Zr=t=>{let e=X(),r=Xr(),i=t.trim(),o=r>0&&i.length>0?be(i,e):null,{data:a,isLoading:l}=(0,Ce.useFetch)(o??"",{execute:!!o,headers:{"User-Agent":"Mozilla/5.0"},parseResponse:async d=>{if(!d.ok)return[];try{let u=JSON.parse(await d.text());return(Array.isArray(u)&&Array.isArray(u[1])?u[1]:[]).filter(T=>typeof T=="string").slice(0,r)}catch{return[]}}});return{suggestions:o&&!l?a??[]:[],isLoading:!!o&&l}},Oe=Zr;var yt=require("react"),Ee=require("bplist-parser"),Tt=require("path");var He=require("os"),Ne=require("@raycast/utils"),tn=()=>{let[t,e]=(0,yt.useState)(),r=ce();return(0,yt.useEffect)(()=>{let i=(0,Ee.parseFileSync)(r),o=en(i[0]);e(o)},[]),{profiles:t}},_e=t=>{let[e,r]=(0,Ne.useCachedState)("ORION_SELECTED_PROFILE_ID",t);return{selectedProfileId:e,setSelectedProfileId:r}};function en(t){return{default:{name:t.defaults.name,id:"Defaults",color:t.defaults.color,dataPath:(0,Tt.join)(U(),"Defaults"),appPath:`/Applications/${A()}.app`},profiles:t.profiles.map(e=>({name:e.name,id:e.identifier,color:e.color,dataPath:(0,Tt.join)(U(),e.identifier),appPath:(0,Tt.join)((0,He.homedir)(),"Applications",A(),`${A()} Profiles`,e.identifier,`${A()} - ${e.name}.app`)}))}}var $e=tn;var Z=require("@raycast/api"),De=require("react");var W=require("react/jsx-runtime");function Fe(t){return(0,W.jsx)(Z.List.Dropdown.Item,{value:t.profile.id,title:t.profile.name,icon:{source:Z.Icon.PersonCircle,tintColor:ge(t.profile.color)}})}function _t(t){let{profiles:e,selectedProfileId:r,onProfileSelected:i}=t;return(0,De.useEffect)(()=>{r&&i?.(r)},[r]),e?(0,W.jsxs)(Z.List.Dropdown,{tooltip:"Select Profile",value:r,onChange:i,children:[(0,W.jsx)(Fe,{profile:e.default}),e.profiles.map(o=>(0,W.jsx)(Fe,{profile:o}))]}):null}var L=require("@raycast/api"),je=require("@raycast/utils");var wt=require("@raycast/api");var Me=require("react/jsx-runtime"),rn=async t=>M(`
    const orion = Application("${A()}");
    const window = orion.windows.byId(${t.window_id});
    const urls = window.tabs.url();
    const names = window.tabs.name();
    const targetUrl = ${JSON.stringify(t.url)};
    const targetName = ${JSON.stringify(t.title)};
    let index = ${t.tab_index};
    // The index preserves duplicate URL instances. If a tab changed or closed
    // between refresh and action, retain the previous title/URL fallback -
    // but only when exactly one tab still matches. Two identical tabs could
    // have swapped positions since the last refresh, and closing the wrong
    // one is unrecoverable, so an ambiguous match closes nothing.
    if (urls[index] !== targetUrl || names[index] !== targetName) {
      const matches = [];
      for (let i = 0; i < urls.length; i++) {
        if (urls[i] === targetUrl && names[i] === targetName) matches.push(i);
      }
      index = matches.length === 1 ? matches[0] : -1;
    }
    if (index !== -1) {
      window.tabs[index].close();
    }
`),nn=t=>(0,Me.jsx)(wt.Action,{title:"Close Tab",icon:wt.Icon.XMarkCircle,shortcut:{modifiers:["ctrl"],key:"x"},onAction:async()=>{await rn(t.tab),t.refresh()}}),Ue=nn;var Be=require("@raycast/api"),Ve=require("react/jsx-runtime"),on=t=>(0,Ve.jsx)(Be.Action.CopyToClipboard,{title:"Copy Markdown",content:`[${t.title??"Untitled"}](${t.url})`,shortcut:{modifiers:["cmd","ctrl"],key:"."}}),kt=on;var Ke=require("@raycast/api"),We=require("react/jsx-runtime"),sn=t=>t.title?(0,We.jsx)(Ke.Action.CopyToClipboard,{title:"Copy Title",content:t.title,shortcut:{modifiers:["cmd","shift"],key:"."}}):null,St=sn;var qe=require("@raycast/api"),ze=require("react/jsx-runtime"),an=t=>(0,ze.jsx)(qe.Action.CopyToClipboard,{title:"Copy URL",content:t.url,shortcut:{modifiers:["cmd"],key:"."}}),At=an;var _=require("@raycast/api");var Je=require("react/jsx-runtime"),cn=async t=>M(`
    const orion = Application("${A()}");
    const window = orion.windows.byId(${t.window_id});
    const urls = window.tabs.url();
    const names = window.tabs.name();
    const targetUrl = ${JSON.stringify(t.url)};
    const targetName = ${JSON.stringify(t.title)};
    let index = ${t.tab_index};
    // The index preserves duplicate URL instances. If a tab changed or closed
    // between refresh and action, retain the previous title/URL fallback -
    // but only when exactly one tab still matches. Two identical tabs could
    // have swapped positions since the last refresh, so an ambiguous match
    // activates nothing rather than guessing the wrong instance.
    if (urls[index] !== targetUrl || names[index] !== targetName) {
      const matches = [];
      for (let i = 0; i < urls.length; i++) {
        if (urls[i] === targetUrl && names[i] === targetName) matches.push(i);
      }
      index = matches.length === 1 ? matches[0] : -1;
    }
    if (index !== -1) {
      window.index = 1;
      window.currentTab = window.tabs[index];
      orion.activate();
    }
  `),ln=t=>{let{tab:e,closeLaunchers:r,immediatePopToRoot:i,onActivate:o}=t;return(0,Je.jsx)(_.Action,{title:"Open in Browser",icon:_.Icon.Globe,onAction:async()=>{r&&await gt(),await cn(e),o?.(e),await(0,_.closeMainWindow)({clearRootSearch:!0,...i?{popToRootType:_.PopToRootType.Immediate}:{}})}})},Qe=ln;var E=require("@raycast/api"),Ge=require("react/jsx-runtime"),un=t=>(0,Ge.jsx)(E.Action,{title:t.title??"Open in Default Browser",icon:E.Icon.Globe,onAction:async()=>{await(0,E.open)(t.url),await(0,E.closeMainWindow)({clearRootSearch:!0,...t.immediatePopToRoot?{popToRootType:E.PopToRootType.Immediate}:{}})}}),q=un;var w=require("react/jsx-runtime"),dn=t=>(0,w.jsxs)(L.ActionPanel,{children:[(0,w.jsxs)(L.ActionPanel.Section,{children:[(0,w.jsx)(Qe,{tab:t.tab,closeLaunchers:t.closeLaunchers,immediatePopToRoot:t.immediatePopToRoot,onActivate:t.onActivate}),(0,w.jsx)(q,{url:t.tab.url,immediatePopToRoot:t.immediatePopToRoot})]}),(0,w.jsxs)(L.ActionPanel.Section,{children:[(0,w.jsx)(At,{url:t.tab.url}),(0,w.jsx)(St,{title:t.tab.title}),(0,w.jsx)(kt,{title:t.tab.title,url:t.tab.url})]}),(0,w.jsx)(L.ActionPanel.Section,{children:(0,w.jsx)(L.Action.CreateQuicklink,{quicklink:{link:t.tab.url,name:t.tab.title},shortcut:{modifiers:["cmd"],key:"s"}})}),(0,w.jsxs)(L.ActionPanel.Section,{children:[(0,w.jsx)(Ue,{tab:t.tab,refresh:t.refresh}),(0,w.jsx)(L.Action,{title:"Refresh Open Tabs",icon:L.Icon.ArrowClockwise,shortcut:{modifiers:["cmd"],key:"r"},onAction:()=>t.refresh()})]})]}),fn=t=>{let e=t.tab.url,r=[{text:fe(e),tooltip:t.tab.url}];return t.tab.is_current&&r.push({text:"Current Tab",tooltip:"Currently active in Orion"}),(0,w.jsx)(L.List.Item,{id:t.id,title:de(t.tab),icon:(0,je.getFavicon)(t.tab.url),actions:(0,w.jsx)(dn,{tab:t.tab,refresh:t.refresh,closeLaunchers:t.closeLaunchers,immediatePopToRoot:t.immediatePopToRoot,onActivate:t.onActivate}),accessories:r})},It=fn;var Q=require("@raycast/api"),Xe=require("@raycast/utils");var $=require("@raycast/api");var Ye=require("react/jsx-runtime"),mn=t=>(0,Ye.jsx)($.Action,{title:t.title??"Open in Orion",icon:$.Icon.Globe,onAction:async()=>{await gt(),await Te(t.url),await(0,$.closeMainWindow)({clearRootSearch:!0,...t.immediatePopToRoot?{popToRootType:$.PopToRootType.Immediate}:{}})}}),z=mn;var O=require("react/jsx-runtime"),gn=t=>{let{item:e,accessory:r,id:i}=t;return(0,O.jsx)(Q.List.Item,{id:i,icon:(0,Xe.getFavicon)(e.url),title:e.title||e.url,subtitle:ut(e.url),accessories:r?[{text:r}]:void 0,actions:(0,O.jsxs)(Q.ActionPanel,{children:[(0,O.jsxs)(Q.ActionPanel.Section,{children:[(0,O.jsx)(z,{url:e.url,immediatePopToRoot:!0}),(0,O.jsx)(q,{url:e.url,immediatePopToRoot:!0})]}),(0,O.jsxs)(Q.ActionPanel.Section,{children:[(0,O.jsx)(At,{url:e.url}),(0,O.jsx)(St,{title:e.title}),(0,O.jsx)(kt,{title:e.title,url:e.url})]})]})})},tt=gn;var F=require("@raycast/api");var J=require("react/jsx-runtime"),pn=t=>{let{suggestion:e,id:r}=t;return(0,J.jsx)(F.List.Item,{id:r,icon:F.Icon.MagnifyingGlass,title:e,accessories:[{text:ft()}],actions:(0,J.jsxs)(F.ActionPanel,{children:[(0,J.jsx)(z,{url:mt(e),title:"Search in Orion",immediatePopToRoot:!0}),(0,J.jsx)(F.Action.CopyToClipboard,{title:"Copy Suggestion",content:e,shortcut:{modifiers:["cmd"],key:"."}})]})})},Ze=pn;var tr=vr(require("fuse.js")),er=require("pinyin-pro");var Lt=t=>le(t.trim());function hn(t){return(0,er.pinyin)(t,{toneType:"none"}).replace(/\s+/g,"").toLocaleLowerCase()}function rr(t,e,r){let i=Lt(e);if(!i)return t;let o=t.filter(d=>{let u=Lt(d.title),c=Lt(d.url);return u.includes(i)||c.includes(i)});if(o.length>0)return r?o.slice(0,r):o;let a=t.map(d=>({...d,titlePinyin:hn(d.title),titleFolded:Lt(d.title)}));return new tr.default(a,{keys:[{name:"title",weight:.3},{name:"titleFolded",weight:.3},{name:"titlePinyin",weight:.25},{name:"url",weight:.15}],threshold:.3,includeScore:!0,shouldSort:!0,minMatchCharLength:1,ignoreLocation:!0}).search(i).slice(0,r).map(d=>d.item)}var g=require("react/jsx-runtime"),et={tabs:6,bookmarks:6,reading:4,history:8},bn="top-hit",Tn="open-address",yn=50,wn=150,kn=100;function nr(t,e,r,i){return r===t||i===t?7:r.startsWith(t)?6:e.startsWith(t)?5:e.includes(t)||r.includes(t)?3:i.includes(t)?1:0}function ir(t){return t.trim().toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/\/$/,"")}function H(t,e,r){let i=(e??"").toLowerCase(),o=ut(r).toLowerCase(),a=ir(r),l=ir(t),d=nr(l,i,o,a);if(d>0)return d;let u=Y(t);if(u.length<=1)return 0;let c=u.map(T=>nr(T,i,o,a));return c.some(T=>T===0)?0:Math.min(...c)}function Sn(t,e){let r=e.toLowerCase();return Y(t).every(i=>r.includes(i))}var rt=ue;function Rt(t){return t.kind==="tab"?4:t.source==="Bookmark"?3:t.source==="Reading List"?2:1}function or(t){if(t.kind!=="url"||t.source!=="History")return 0;let e=Math.min(.45,Math.log2((t.visitCount??0)+1)*.07),r=t.lastVisitTime?new Date(t.lastVisitTime).getTime():0,i=r>0?Math.max(0,(Date.now()-r)/864e5):Number.POSITIVE_INFINITY,o=Number.isFinite(i)?.35*Math.exp(-i/14):0;return e+o}function D(t){let e=t.trim();try{let r=new URL(e);return r.hostname=r.hostname.toLowerCase(),r.toString()}catch{return e}}function sr(t,e){if(t.tier!==e.tier)return e.tier-t.tier;let r=Rt(t.hit),i=Rt(e.hit);if(r!==i)return i-r;if(t.hit.kind==="tab"&&e.hit.kind==="tab"&&t.hit.tab.is_current!==e.hit.tab.is_current)return Number(e.hit.tab.is_current)-Number(t.hit.tab.is_current);let o=or(t.hit),a=or(e.hit);if(o!==a)return a-o;let l=t.hit.kind==="url"?t.hit.lastVisitTime??"":"",d=e.hit.kind==="url"?e.hit.lastVisitTime??"":"";if(l!==d){let u=Date.parse(l),c=Date.parse(d);return!Number.isNaN(u)&&!Number.isNaN(c)?c-u:d.localeCompare(l)}return t.hit.key.localeCompare(e.hit.key)}function An(t){let e=new Map;return t.forEach(r=>{let i=r.hit.kind==="tab"?r.hit.tab.url:r.hit.item.url,o=D(i),a=e.get(o)??[];a.push(r),e.set(o,a)}),Array.from(e.values()).map(r=>{let i=Math.max(...r.map(a=>a.tier));return{...[...r].sort((a,l)=>Rt(l.hit)-Rt(a.hit)||sr(a,l))[0],tier:i}})}function $t(t,e,r){let i=[];for(let o of t){if(i.length>=r)break;let a=D(o.url);e.has(a)||(e.add(a),i.push(o))}return i}function ar(){let[t,e]=(0,P.useState)(""),[r,i]=(0,P.useState)(),[,o]=(0,P.useState)(0),a=(0,P.useRef)(void 0),l=(0,P.useRef)(null),d=(0,P.useRef)(void 0),u=t.trim().toLowerCase(),c=u.length>0,{profiles:T}=$e(),{selectedProfileId:b,setSelectedProfileId:cr}=_e("Defaults"),{tabs:Pt,refresh:nt,markTabActive:xt}=ke({refreshWhileOpen:!0}),{bookmarks:lr,isLoading:ur}=Ae(b),{readingList:dr}=Le(b),{data:fr,permissionView:mr,completedQueryKey:gr}=xe(b,c?t:void 0),{suggestions:pr}=Oe(t),hr=`${b}\0${c?t:""}`,Ft=!c||gr===hr,Dt=(n,s)=>{a.current={key:`${n}\0${s}`,target:void 0,awaitingTarget:!1,userNavigated:!1},i(void 0)},br=!T||Pt===void 0||ur,vt=(Pt??[]).filter(n=>!ye(n.url)),it=vt.filter(n=>!c||H(u,n.title,n.url)>0),Ut=c?lr.filter(n=>H(u,n.title,n.url)>0||n.folders.some(s=>Sn(u,s))):[],Mt=c?(dr??[]).filter(n=>H(u,n.title,n.url)>0):[],Bt=c?(fr??[]).filter(n=>H(u,n.title,n.url)>0):[],Tr=Ft?Bt:[],Vt=c?pr:[],p;if(c){let n=[];it.forEach(s=>n.push({hit:{kind:"tab",tab:s,key:rt(s)},tier:H(u,s.title,s.url)})),Ut.forEach(s=>n.push({hit:{kind:"url",item:s,source:"Bookmark",key:`bm-${s.uuid}`},tier:H(u,s.title,s.url)})),Mt.forEach(s=>n.push({hit:{kind:"url",item:s,source:"Reading List",key:`rl-${s.uuid}`},tier:H(u,s.title,s.url)})),Tr.forEach(s=>n.push({hit:{kind:"url",item:s,source:"History",key:`hist-${s.id}`,visitCount:s.visitCount,lastVisitTime:s.lastVisitTime},tier:H(u,s.title,s.url)})),p=An(n).sort(sr)[0]?.hit}if(Ft)d.current=p?.kind==="url"&&p.source==="History"?{profileId:b,hit:p}:void 0;else{let n=d.current;n&&n.profileId===b&&n.hit.kind==="url"&&H(u,n.hit.item.title,n.hit.item.url)>0&&(p=n.hit)}let yr=p?.kind==="tab"?p.key:void 0,Ct=p?.kind==="url"?p.key:void 0,Kt=p?.kind==="tab"?p.tab.url:p?.item.url,N=new Set(p?.kind==="url"&&Kt?[D(Kt)]:[]),Ot=it.filter(n=>rt(n)!==yr&&!N.has(D(n.url))).slice(0,c?et.tabs:it.length);p?.kind==="tab"&&N.add(D(p.tab.url)),Ot.forEach(n=>N.add(D(n.url)));let Et=c&&it.length===0?rr(vt,t,et.tabs).filter(n=>!N.has(D(n.url))):[];Et.forEach(n=>N.add(D(n.url)));let Wt=Ot.length>0?Ot:Et,qt=$t(Ut.filter(n=>`bm-${n.uuid}`!==Ct),N,et.bookmarks),zt=$t(Mt.filter(n=>`rl-${n.uuid}`!==Ct),N,et.reading),Qt=$t(Bt.filter(n=>`hist-${n.id}`!==Ct),N,et.history),G=pe(t)?he(t):void 0,ot=p?`${bn}\0${p.key}`:void 0,Ht=G?`${Tn}\0${G}`:void 0,st=c?void 0:vt.find(n=>n.is_current),k=st?rt(st):void 0,Jt=k?`${k}\0current-tab-handoff`:void 0,x=ot??Ht??k,Gt=a.current,wr=!c&&k&&!Gt?.userNavigated&&!Gt?.currentTabSelectionReleased?k:void 0,jt=r??wr,kr=`${b}\0${c?t:k??"current-tab-pending"}\0${c?"query":"current"}`,Yt=(n,s,y=0)=>{if(n.currentTabSelectionReleased||n.currentTabSelectionReleaseScheduled)return;let R=n.key;n.currentTabSelectionReleaseScheduled=!0,setTimeout(()=>{let m=a.current;!m||m.key!==R||m.target!==s||m.userNavigated||m.awaitingTarget||m.postHandoffTarget||m.awaitingFinalTargetAcknowledgement||(m.currentTabSelectionReleased=!0,m.currentTabSelectionReleaseScheduled=!1,l.current=s,i(void 0),o(f=>f+1))},y)};(0,P.useLayoutEffect)(()=>{let n=`${b}\0${t}`,s=a.current,y=s?.key!==n,R=(m,f,S=!1)=>{let j=!c&&f===k&&!!Jt,ct=j?Jt:f;if(m.target=ct,m.postHandoffTarget=j?f:void 0,m.currentTabHandoffConfirmed=!1,m.awaitingFinalTargetAcknowledgement=!1,j&&(m.currentTabSelectionReleased=!1,m.currentTabSelectionReleaseScheduled=!1),!ct){m.awaitingTarget=!1,m.awaitingFinalTargetAcknowledgement=!1,l.current=null,i(void 0);return}let Xt=S||l.current!==ct;m.awaitingTarget=Xt,i(ct),Xt&&o(Sr=>Sr+1)};if(y){let m={key:n,currentTabId:k,awaitingTarget:!1,userNavigated:!1};a.current=m,R(m,x,!0),nt();return}if(!c&&k&&s.currentTabId!==k){s.userNavigated=!1,s.currentTabId=k,R(s,k,!0);return}!s.userNavigated&&s.target!==x&&(c||s.target===void 0)&&R(s,x)},[t,b,x]);let at=a.current,v=!!x&&at?.awaitingTarget&&(at.target===x||at.postHandoffTarget===x);return(0,P.useEffect)(()=>{if(!v)return;let n=a.current,s=n?.key,y=n?.target,R=n?.postHandoffTarget?wn:0,m=setTimeout(()=>{let f=a.current;if(!f||f.key!==s||f.target!==y||!f.awaitingTarget||f.currentTabHandoffConfirmed)return;let S=f.postHandoffTarget??y;f.awaitingTarget=!1,f.target=S,f.postHandoffTarget=void 0,f.currentTabHandoffConfirmed=!1,f.awaitingFinalTargetAcknowledgement=!1,l.current=S??null,i(S),o(j=>j+1),!c&&S&&S===k&&Yt(f,S)},R);return()=>clearTimeout(m)},[x,v]),(0,g.jsxs)(h.List,{isLoading:br,filtering:!1,throttle:!0,searchText:t,onSearchTextChange:n=>{n!==t&&Dt(b,n),e(n)},...jt?{selectedItemId:jt}:{},onSelectionChange:n=>{let s=a.current;if(!s){l.current=n;return}if(s?.awaitingTarget){if(n!==s.target)return;let y=s.postHandoffTarget??n;if(s.postHandoffTarget){let R=s.key,m=s.target;s.currentTabHandoffConfirmed=!0,setTimeout(()=>{let f=a.current;!f||f.key!==R||f.target!==m||!f.awaitingTarget||!f.currentTabHandoffConfirmed||(f.awaitingTarget=!1,f.target=y,f.postHandoffTarget=void 0,f.currentTabHandoffConfirmed=!1,f.awaitingFinalTargetAcknowledgement=!0,l.current=y,i(y??void 0),o(S=>S+1),setTimeout(()=>{let S=a.current;S?.key===R&&S.target===y&&S.awaitingFinalTargetAcknowledgement&&(S.awaitingFinalTargetAcknowledgement=!1,!c&&y===k&&y&&Yt(S,y))},kn))},yn);return}s.awaitingTarget=!1,s.target=y,s.postHandoffTarget=void 0,s.currentTabHandoffConfirmed=!1,s.awaitingFinalTargetAcknowledgement=!1,l.current=y,i(y??void 0),o(R=>R+1);return}if(!n){l.current=null;return}if(s.awaitingFinalTargetAcknowledgement){n===s.target&&(s.awaitingFinalTargetAcknowledgement=!1,l.current=n);return}if(n===s.target){l.current=n;return}if(!c&&Pt===void 0&&!s.target&&!s.userNavigated){l.current=n;return}if(!s.target&&!s.userNavigated&&n==="web-search"){l.current=n;return}l.current=n,s.userNavigated=!0,i(void 0)},searchBarPlaceholder:"Search tabs, bookmarks, history, or the web",searchBarAccessory:(0,g.jsx)(_t,{profiles:T,selectedProfileId:b,onProfileSelected:n=>{n!==b&&Dt(n,t),cr(n)}}),children:[p&&(!v||x===ot)&&(0,g.jsx)(h.List.Section,{title:"Top Hit",children:p.kind==="tab"?(0,g.jsx)(It,{id:ot,tab:p.tab,refresh:nt,closeLaunchers:!0,immediatePopToRoot:!0,onActivate:xt}):(0,g.jsx)(tt,{id:ot,item:p.item,accessory:p.source})}),G&&(!v||x===Ht)&&(0,g.jsx)(h.List.Section,{title:"Open Address",children:(0,g.jsx)(h.List.Item,{id:Ht,icon:h.Icon.Globe,title:`Open \u201C${t.trim()}\u201D in Default Browser`,subtitle:G,actions:(0,g.jsx)(h.ActionPanel,{children:(0,g.jsx)(q,{url:G,immediatePopToRoot:!0})})})}),st&&v&&x===k&&(0,g.jsx)(h.List.Section,{title:"Open Tabs",children:(0,g.jsx)(It,{id:at?.target,tab:st,refresh:nt,closeLaunchers:!0,immediatePopToRoot:!0,onActivate:xt})}),!v&&c&&(0,g.jsx)(h.List.Section,{title:"Search the Web",children:(0,g.jsx)(h.List.Item,{id:"web-search",icon:h.Icon.MagnifyingGlass,title:`Search ${ft()} for \u201C${t}\u201D`,actions:(0,g.jsx)(h.ActionPanel,{children:(0,g.jsx)(z,{url:mt(t),title:"Search in Orion",immediatePopToRoot:!0})})})}),!v&&Vt.length>0&&(0,g.jsx)(h.List.Section,{title:"Suggestions",children:Vt.map((n,s)=>(0,g.jsx)(Ze,{id:`suggestion-${s}-${n}`,suggestion:n},`sugg-${s}-${n}`))}),!v&&Wt.length>0&&(0,g.jsx)(h.List.Section,{title:Et.length>0?"Open Tabs (Fuzzy Matches)":"Open Tabs",children:Wt.map(n=>(0,g.jsx)(It,{id:n.is_current&&!c?k:rt(n),tab:n,refresh:nt,closeLaunchers:!0,immediatePopToRoot:!0,onActivate:xt},rt(n)))}),!v&&qt.length>0&&(0,g.jsx)(h.List.Section,{title:"Bookmarks",children:qt.map(n=>(0,g.jsx)(tt,{id:`bm-${n.uuid}`,item:n},`bm-${n.uuid}`))}),!v&&zt.length>0&&(0,g.jsx)(h.List.Section,{title:"Reading List",children:zt.map(n=>(0,g.jsx)(tt,{id:`rl-${n.uuid}`,item:n},`rl-${n.uuid}`))}),!v&&!mr&&Qt.length>0&&(0,g.jsx)(h.List.Section,{title:"History",children:Qt.map(n=>(0,g.jsx)(tt,{id:`hist-${n.id}`,item:n},`hist-${n.id}`))})]},kr)}
