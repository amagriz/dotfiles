"use strict";var rt=Object.create;var g=Object.defineProperty;var ot=Object.getOwnPropertyDescriptor;var it=Object.getOwnPropertyNames;var at=Object.getPrototypeOf,st=Object.prototype.hasOwnProperty;var ct=(t,e)=>{for(var n in e)g(t,n,{get:e[n],enumerable:!0})},R=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of it(e))!st.call(t,o)&&o!==n&&g(t,o,{get:()=>e[o],enumerable:!(r=ot(e,o))||r.enumerable});return t};var lt=(t,e,n)=>(n=t!=null?rt(at(t)):{},R(e||!t||!t.__esModule?g(n,"default",{value:t,enumerable:!0}):n,t)),ut=t=>R(g({},"__esModule",{value:!0}),t);var Ut={};ct(Ut,{default:()=>Ot});module.exports=ut(Ut);var et=require("react"),nt=require("@raycast/api");var c=require("react"),w=require("@raycast/utils");var S=require("url");var s=require("@raycast/api"),I=require("@raycast/utils"),dt=require("tldts");var Et=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});function m(){return(0,s.getPreferenceValues)()["orion-rc"]?"Orion RC":"Orion"}var b=async(t,e)=>{try{return await(0,I.runAppleScript)(t,{language:"JavaScript",humanReadableOutput:!1})}catch(n){if(console.log(n),e?.silent)return;if(typeof n=="string"){let r=n.replace("execution error: Error: ","");r.match(/Application can't be found/)?(0,s.showToast)({style:s.Toast.Style.Failure,title:"Application not found",message:"Things must be running"}):(0,s.showToast)({style:s.Toast.Style.Failure,title:"Something went wrong",message:r})}}},L=t=>t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();function A(t){return`tab-${t.window_id}-${t.tab_index}`}function P(t){let e=t.title.substring(0,75);return e.length<t.title.length&&(e+="..."),e}var O=t=>{let e=ft(t);if(e&&e.hostname)return e.hostname.replace(/^www\./,"")},ft=t=>{try{return new S.URL(t)}catch{return null}};async function U(){(0,s.getPreferenceValues)().autoCloseLauncherTabs!==!1&&await b(`
    const orion = Application("${m()}");
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
  `)}async function mt(){try{let e=(await(0,w.runAppleScript)(`
        tell application "${m()}"
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
      `,{language:"AppleScript"})).trim().match(/^(\d+):(\d+)$/);return e?{windowId:Number(e[1]),tabIndex:Number(e[2])-1}:void 0}catch(t){console.log("Could not resolve the exact current Orion tab",t);return}}async function _(t){let e=await b(`
    const orion = Application("${m()}");
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
  `,t);if(!e)return;let n=JSON.parse(e);if(!n.needsCurrentTabResolution)return n.tabs;let r=await mt();return r?n.tabs.map(o=>({...o,is_current:o.window_id===r.windowId&&o.tab_index===r.tabIndex})):n.tabs}async function ht(){return await _()??[]}var bt=1e3;function pt(t,e){return t!==void 0&&t.length===e.length&&t.every((n,r)=>n.window_id===e[r].window_id&&n.url===e[r].url&&n.title===e[r].title&&n.tab_index===e[r].tab_index&&n.is_current===e[r].is_current)}var gt=({refreshWhileOpen:t=!1}={})=>{let e=(0,w.useCachedPromise)(ht,[],{keepPreviousData:!0}),n=(0,c.useRef)(!1),r=(0,c.useRef)(void 0),o=(0,c.useRef)(0);(0,c.useEffect)(()=>{r.current=e.data},[e.data]);let p=(0,c.useCallback)(async()=>{if(n.current)return;n.current=!0;let f=o.current;try{let d=await _({silent:!0});if(d===void 0||o.current!==f||pt(r.current,d))return;await e.mutate(Promise.resolve(d),{optimisticUpdate:()=>d,rollbackOnError:!1,shouldRevalidateAfter:!1})}finally{n.current=!1}},[e.mutate]),k=(0,c.useCallback)(f=>{let d=r.current;if(!d)return;o.current+=1;let C=d.map(x=>({...x,is_current:x.window_id===f.window_id&&x.tab_index===f.tab_index}));e.mutate(Promise.resolve(C),{optimisticUpdate:()=>C,rollbackOnError:!1,shouldRevalidateAfter:!1})},[e.mutate]);(0,c.useEffect)(()=>{if(!t)return;let f=setInterval(()=>{p()},bt);return()=>clearInterval(f)},[p,t]);let l=(0,c.useCallback)(async()=>{o.current+=1,await e.revalidate()},[e.revalidate]);return{...e,refresh:l,markTabActive:k}},wt=t=>{let e=gt(t);return{tabs:e.data,refresh:e.refresh,markTabActive:e.markTabActive}},E=wt;var a=require("@raycast/api"),Q=require("@raycast/utils");var T=require("@raycast/api");var N=require("react/jsx-runtime"),Tt=async t=>b(`
    const orion = Application("${m()}");
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
`),yt=t=>(0,N.jsx)(T.Action,{title:"Close Tab",icon:T.Icon.XMarkCircle,shortcut:{modifiers:["ctrl"],key:"x"},onAction:async()=>{await Tt(t.tab),t.refresh()}}),F=yt;var $=require("@raycast/api"),M=require("react/jsx-runtime"),xt=t=>(0,M.jsx)($.Action.CopyToClipboard,{title:"Copy Markdown",content:`[${t.title??"Untitled"}](${t.url})`,shortcut:{modifiers:["cmd","ctrl"],key:"."}}),D=xt;var q=require("@raycast/api"),J=require("react/jsx-runtime"),At=t=>t.title?(0,J.jsx)(q.Action.CopyToClipboard,{title:"Copy Title",content:t.title,shortcut:{modifiers:["cmd","shift"],key:"."}}):null,W=At;var B=require("@raycast/api"),z=require("react/jsx-runtime"),vt=t=>(0,z.jsx)(B.Action.CopyToClipboard,{title:"Copy URL",content:t.url,shortcut:{modifiers:["cmd"],key:"."}}),H=vt;var h=require("@raycast/api");var j=require("react/jsx-runtime"),kt=async t=>b(`
    const orion = Application("${m()}");
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
  `),Ct=t=>{let{tab:e,closeLaunchers:n,immediatePopToRoot:r,onActivate:o}=t;return(0,j.jsx)(h.Action,{title:"Open in Browser",icon:h.Icon.Globe,onAction:async()=>{n&&await U(),await kt(e),o?.(e),await(0,h.closeMainWindow)({clearRootSearch:!0,...r?{popToRootType:h.PopToRootType.Immediate}:{}})}})},G=Ct;var u=require("@raycast/api"),V=require("react/jsx-runtime"),Rt=t=>(0,V.jsx)(u.Action,{title:t.title??"Open in Default Browser",icon:u.Icon.Globe,onAction:async()=>{await(0,u.open)(t.url),await(0,u.closeMainWindow)({clearRootSearch:!0,...t.immediatePopToRoot?{popToRootType:u.PopToRootType.Immediate}:{}})}}),K=Rt;var i=require("react/jsx-runtime"),St=t=>(0,i.jsxs)(a.ActionPanel,{children:[(0,i.jsxs)(a.ActionPanel.Section,{children:[(0,i.jsx)(G,{tab:t.tab,closeLaunchers:t.closeLaunchers,immediatePopToRoot:t.immediatePopToRoot,onActivate:t.onActivate}),(0,i.jsx)(K,{url:t.tab.url,immediatePopToRoot:t.immediatePopToRoot})]}),(0,i.jsxs)(a.ActionPanel.Section,{children:[(0,i.jsx)(H,{url:t.tab.url}),(0,i.jsx)(W,{title:t.tab.title}),(0,i.jsx)(D,{title:t.tab.title,url:t.tab.url})]}),(0,i.jsx)(a.ActionPanel.Section,{children:(0,i.jsx)(a.Action.CreateQuicklink,{quicklink:{link:t.tab.url,name:t.tab.title},shortcut:{modifiers:["cmd"],key:"s"}})}),(0,i.jsxs)(a.ActionPanel.Section,{children:[(0,i.jsx)(F,{tab:t.tab,refresh:t.refresh}),(0,i.jsx)(a.Action,{title:"Refresh Open Tabs",icon:a.Icon.ArrowClockwise,shortcut:{modifiers:["cmd"],key:"r"},onAction:()=>t.refresh()})]})]}),It=t=>{let e=t.tab.url,n=[{text:O(e),tooltip:t.tab.url}];return t.tab.is_current&&n.push({text:"Current Tab",tooltip:"Currently active in Orion"}),(0,i.jsx)(a.List.Item,{id:t.id,title:P(t.tab),icon:(0,Q.getFavicon)(t.tab.url),actions:(0,i.jsx)(St,{tab:t.tab,refresh:t.refresh,closeLaunchers:t.closeLaunchers,immediatePopToRoot:t.immediatePopToRoot,onActivate:t.onActivate}),accessories:n})},X=It;var Y=lt(require("fuse.js")),Z=require("pinyin-pro");var y=t=>L(t.trim());function Lt(t){return(0,Z.pinyin)(t,{toneType:"none"}).replace(/\s+/g,"").toLocaleLowerCase()}function tt(t,e,n){let r=y(e);if(!r)return t;let o=t.filter(l=>{let f=y(l.title),d=y(l.url);return f.includes(r)||d.includes(r)});if(o.length>0)return n?o.slice(0,n):o;let p=t.map(l=>({...l,titlePinyin:Lt(l.title),titleFolded:y(l.title)}));return new Y.default(p,{keys:[{name:"title",weight:.3},{name:"titleFolded",weight:.3},{name:"titlePinyin",weight:.25},{name:"url",weight:.15}],threshold:.3,includeScore:!0,shouldSort:!0,minMatchCharLength:1,ignoreLocation:!0}).search(r).slice(0,n).map(l=>l.item)}var v=require("react/jsx-runtime"),Pt=()=>{let{tabs:t,refresh:e}=E(),[n,r]=(0,et.useState)("");return(0,v.jsx)(nt.List,{isLoading:!t,onSearchTextChange:r,children:tt(t??[],n).map(o=>(0,v.jsx)(X,{id:A(o),tab:o,refresh:e},A(o)))})},Ot=Pt;
