"use strict";var x=Object.create;var l=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var k=(e,t)=>{for(var n in t)l(e,n,{get:t[n],enumerable:!0})},w=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of $(t))!v.call(e,i)&&i!==n&&l(e,i,{get:()=>t[i],enumerable:!(r=T(t,i))||r.enumerable});return e};var u=(e,t,n)=>(n=e!=null?x(S(e)):{},w(t||!e||!e.__esModule?l(n,"default",{value:e,enumerable:!0}):n,e)),P=e=>w(l({},"__esModule",{value:!0}),e);var A={};k(A,{default:()=>b});module.exports=P(A);var g=require("@raycast/utils");var d=require("@raycast/api"),I=u(require("fuse.js")),C=u(require("lodash")),R=u(require("osascript-tag"));var f=require("lru-cache"),c=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,n,r,i){let a=this.langCache.get(i);if(a.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),a.get(t);let o=this.langHandlers.get(i);if(o&&o.check(r,n)){let s=o.serialize(r);return a.set(t,s),s}return r}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,n){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,n),this.langCache.set(t,new f.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(t,n,r){let i=n;if(this.langHandlers.size>0){let{lang:a,id:o}=r;typeof a<"u"?i=this.formatStringWithLang(o,t,n,a):i=Array.from(this.langHandlers.keys()).reduce((s,y)=>this.formatStringWithLang(o,t,s,y),n)}return i}},p=new c;var{safariAppIdentifier:m,enableFuzzySearch:F}=(0,d.getPreferenceValues)();var W=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function L(e){let t=await(0,g.runAppleScript)(`(() => {
      const app = Application(${JSON.stringify(m)});
      const text = (value) => (typeof value === "string" ? value : "");
      ${e}
    })()`,{language:"JavaScript"});return JSON.parse(t)}function E(e){let{windowId:t,index:n}=e;if(!Number.isInteger(t)||t<1||!Number.isInteger(n)||n<1)throw new Error("windowId and index must be whole numbers starting at 1. Use get-all-tabs to list the open tabs.")}function U(e,t){if(e.status==="missing-window")throw new Error(t?`Safari has no window ${t.windowId} (${e.count} open). Use get-all-tabs to list the open tabs.`:"Safari has no open window.");if(e.status==="missing-tab")throw new Error(`Safari window ${t?.windowId} has no tab ${t?.index} (${e.count} open). Use get-all-tabs to list the open tabs.`)}async function N(e){e&&E(e);let t=await L(`
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
  `);if(U(t,e),t.status!=="ok")throw new Error(`Unexpected response from Safari: ${t.status}`);let{windowRef:n,windowId:r,index:i,title:a,url:o}=t;return{windowRef:n,windowId:r,index:i,title:a,url:o}}async function h(){let e=await N();return{uuid:`${e.windowId}-${e.index}`,title:e.title,url:e.url,window_id:e.windowId,index:e.index,is_local:!0}}async function b(){return await h()}
