"use strict";var T=Object.create;var l=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var v=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var k=(e,t)=>{for(var n in t)l(e,n,{get:t[n],enumerable:!0})},p=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of S(t))!I.call(e,i)&&i!==n&&l(e,i,{get:()=>t[i],enumerable:!(r=$(t,i))||r.enumerable});return e};var u=(e,t,n)=>(n=e!=null?T(v(e)):{},p(t||!e||!e.__esModule?l(n,"default",{value:e,enumerable:!0}):n,e)),P=e=>p(l({},"__esModule",{value:!0}),e);var H={};k(H,{default:()=>x});module.exports=P(H);var f=require("@raycast/utils");var d=require("@raycast/api"),C=u(require("fuse.js")),R=u(require("lodash")),L=u(require("osascript-tag"));var m=require("lru-cache"),c=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,n,r,i){let a=this.langCache.get(i);if(a.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),a.get(t);let o=this.langHandlers.get(i);if(o&&o.check(r,n)){let s=o.serialize(r);return a.set(t,s),s}return r}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,n){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,n),this.langCache.set(t,new m.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(t,n,r){let i=n;if(this.langHandlers.size>0){let{lang:a,id:o}=r;typeof a<"u"?i=this.formatStringWithLang(o,t,n,a):i=Array.from(this.langHandlers.keys()).reduce((s,y)=>this.formatStringWithLang(o,t,s,y),n)}return i}},g=new c;var{safariAppIdentifier:w,enableFuzzySearch:V}=(0,d.getPreferenceValues)();var X=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function E(e){let t=await(0,f.runAppleScript)(`(() => {
      const app = Application(${JSON.stringify(w)});
      const text = (value) => (typeof value === "string" ? value : "");
      ${e}
    })()`,{language:"JavaScript"});return JSON.parse(t)}function U(e){let{windowId:t,index:n}=e;if(!Number.isInteger(t)||t<1||!Number.isInteger(n)||n<1)throw new Error("windowId and index must be whole numbers starting at 1. Use get-all-tabs to list the open tabs.")}function N(e,t){if(e.status==="missing-window")throw new Error(t?`Safari has no window ${t.windowId} (${e.count} open). Use get-all-tabs to list the open tabs.`:"Safari has no open window.");if(e.status==="missing-tab")throw new Error(`Safari window ${t?.windowId} has no tab ${t?.index} (${e.count} open). Use get-all-tabs to list the open tabs.`)}async function A(e){e&&U(e);let t=await E(`
    const windows = app.windows();
    let win, tab;
    ${e?`if (windows.length < ${e.windowId}) return JSON.stringify({ status: "missing-window", count: windows.length });
    win = windows[${e.windowId-1}];
    const tabs = win.tabs();
    if (tabs.length < ${e.index}) return JSON.stringify({ status: "missing-tab", count: tabs.length });
    tab = tabs[${e.index-1}];`:`if (windows.length === 0) return JSON.stringify({ status: "missing-window", count: 0 });
    win = windows[0];
    tab = win.currentTab();`}
    return JSON.stringify({
      status: "ok",
      windowRef: win.id(),
      windowId: win.index(),
      index: tab.index(),
      title: text(tab.name()),
      url: text(tab.url()),
    });
  `);if(N(t,e),t.status!=="ok")throw new Error(`Unexpected response from Safari: ${t.status}`);let{windowRef:n,windowId:r,index:i,title:a,url:o}=t;return{windowRef:n,windowId:r,index:i,title:a,url:o}}var D=(e,t)=>new Error(`The tab "${e.title||e.url}" is no longer at position ${e.index} of its window, or it now shows another page. Nothing was ${t}. Use get-all-tabs to find it again.`),h=e=>`"${e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,M=(e,{checkTitle:t})=>`
  if not (exists window id ${e.windowRef}) then return "changed"
  set targetWindow to window id ${e.windowRef}
  if (count of tabs of targetWindow) < ${e.index} then return "changed"
  set targetTab to tab ${e.index} of targetWindow
  set tabURL to URL of targetTab
  if tabURL is missing value then set tabURL to ""
  set tabTitle to name of targetTab
  if tabTitle is missing value then set tabTitle to ""
  considering case
    if tabURL is not ${h(e.url)} then return "changed"
    ${t?`if tabTitle is not ${h(e.title)} then return "changed"`:""}
  end considering
`;async function b(e){let t=await A(e),n=await(0,f.runAppleScript)(`
    tell application "${w}"
      ${M(t,{checkTitle:!1})}
      set current tab of targetWindow to targetTab
      set index of targetWindow to 1
      activate
      if index of current tab of front window is not ${t.index} then return "not-selected"
      return "ok"
    end tell
  `);if(n==="changed")throw D(t,"selected");if(n!=="ok")throw new Error(`Safari did not switch to tab ${t.index} of window ${t.windowId}.`);return{uuid:`1-${t.index}`,title:t.title,url:t.url,window_id:1,index:t.index,is_local:!0}}async function x(e){return await b({windowId:e.windowId,index:e.index})}
