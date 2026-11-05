"use strict";var k=Object.create;var l=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var N=(t,e)=>{for(var n in e)l(t,n,{get:e[n],enumerable:!0})},h=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of R(e))!A.call(t,i)&&i!==n&&l(t,i,{get:()=>e[i],enumerable:!(r=P(e,i))||r.enumerable});return t};var w=(t,e,n)=>(n=t!=null?k(E(t)):{},h(e||!t||!t.__esModule?l(n,"default",{value:t,enumerable:!0}):n,t)),L=t=>h(l({},"__esModule",{value:!0}),t);var z={};N(z,{confirmation:()=>W,default:()=>I});module.exports=L(z);var s=require("@raycast/api");var m="Nothing was closed: there is no matching confirmation for this tab (it is missing, expired, or was given for another tab). Ask to close the tab again.",p=t=>JSON.stringify(t?[t.windowId,t.index]:"current");function y(t,e,n){if(!t)return{error:m};let r;try{r=JSON.parse(t)}catch{return{error:m}}return!(n-r.confirmedAt>=0&&n-r.confirmedAt<6e5)||r.target!==e?{error:m}:"tab"in r?{tab:r.tab}:{error:r.error}}var b=require("@raycast/utils");var u=require("@raycast/api"),O=w(require("fuse.js")),U=w(require("lodash")),D=w(require("osascript-tag"));var x=require("lru-cache"),d=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(e,n,r,i){let a=this.langCache.get(i);if(a.has(e))return process.env.NODE_ENV==="development"&&console.log("cache hit",e),a.get(e);let o=this.langHandlers.get(i);if(o&&o.check(r,n)){let c=o.serialize(r);return a.set(e,c),c}return r}removeCache(e){this.langCache.has(e)&&(this.langCache.get(e)?.clear(),this.langCache.delete(e))}hasHandlers(){return this.langHandlers.size>0}registerLang(e,n){this.langHandlers.has(e)||(this.removeCache(e),this.langHandlers.set(e,n),this.langCache.set(e,new x.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(e,n,r){let i=n;if(this.langHandlers.size>0){let{lang:a,id:o}=r;typeof a<"u"?i=this.formatStringWithLang(o,e,n,a):i=Array.from(this.langHandlers.keys()).reduce((c,C)=>this.formatStringWithLang(o,e,c,C),n)}return i}},T=new d;var{safariAppIdentifier:g,enableFuzzySearch:Y}=(0,u.getPreferenceValues)();var Q=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function M(t){let e=await(0,b.runAppleScript)(`(() => {
      const app = Application(${JSON.stringify(g)});
      const text = (value) => (typeof value === "string" ? value : "");
      ${t}
    })()`,{language:"JavaScript"});return JSON.parse(e)}function _(t){let{windowId:e,index:n}=t;if(!Number.isInteger(e)||e<1||!Number.isInteger(n)||n<1)throw new Error("windowId and index must be whole numbers starting at 1. Use get-all-tabs to list the open tabs.")}function J(t,e){if(t.status==="missing-window")throw new Error(e?`Safari has no window ${e.windowId} (${t.count} open). Use get-all-tabs to list the open tabs.`:"Safari has no open window.");if(t.status==="missing-tab")throw new Error(`Safari window ${e?.windowId} has no tab ${e?.index} (${t.count} open). Use get-all-tabs to list the open tabs.`)}async function $(t){t&&_(t);let e=await M(`
    const windows = app.windows();
    let win, tab;
    ${t?`if (windows.length < ${t.windowId}) return JSON.stringify({ status: "missing-window", count: windows.length });
    win = windows[${t.windowId-1}];
    const tabs = win.tabs();
    if (tabs.length < ${t.index}) return JSON.stringify({ status: "missing-tab", count: tabs.length });
    tab = tabs[${t.index-1}];`:`if (windows.length === 0) return JSON.stringify({ status: "missing-window", count: 0 });
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
  `);if(J(e,t),e.status!=="ok")throw new Error(`Unexpected response from Safari: ${e.status}`);let{windowRef:n,windowId:r,index:i,title:a,url:o}=e;return{windowRef:n,windowId:r,index:i,title:a,url:o}}var H=(t,e)=>new Error(`The tab "${t.title||t.url}" is no longer at position ${t.index} of its window, or it now shows another page. Nothing was ${e}. Use get-all-tabs to find it again.`),S=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,F=(t,{checkTitle:e})=>`
  if not (exists window id ${t.windowRef}) then return "changed"
  set targetWindow to window id ${t.windowRef}
  if (count of tabs of targetWindow) < ${t.index} then return "changed"
  set targetTab to tab ${t.index} of targetWindow
  set tabURL to URL of targetTab
  if tabURL is missing value then set tabURL to ""
  set tabTitle to name of targetTab
  if tabTitle is missing value then set tabTitle to ""
  considering case
    if tabURL is not ${S(t.url)} then return "changed"
    ${e?`if tabTitle is not ${S(t.title)} then return "changed"`:""}
  end considering
`;async function v(t){let e=await(0,b.runAppleScript)(`
    tell application "${g}"
      ${F(t,{checkTitle:!0})}
      set tabCount to count of tabs of targetWindow
      close targetTab
      delay 0.2
      if exists window id ${t.windowRef} then
        if (count of tabs of window id ${t.windowRef}) is not (tabCount - 1) then return "not-closed"
      end if
      return "ok"
    end tell
  `);if(e==="changed")throw H(t,"closed");if(e!=="ok")throw new Error(`Safari did not close "${t.title||t.url}".`);return{closedTab:{title:t.title,url:t.url}}}var f="close-tab:confirmed";async function I(t){let e=await s.LocalStorage.getItem(f);await s.LocalStorage.removeItem(f);let n=y(e,p(t.tab),Date.now());if("error"in n)throw new Error(n.error);return await v(n.tab)}var W=async t=>{let e=p(t.tab);try{let n=await $(t.tab),r={target:e,tab:n,confirmedAt:Date.now()};return await s.LocalStorage.setItem(f,JSON.stringify(r)),{style:s.Action.Style.Destructive,message:"Close this tab?",info:[{name:"Title",value:n.title},{name:"URL",value:n.url}]}}catch(n){let r=n instanceof Error?n.message:String(n),i={target:e,error:r,confirmedAt:Date.now()};await s.LocalStorage.setItem(f,JSON.stringify(i));return}};0&&(module.exports={confirmation});
