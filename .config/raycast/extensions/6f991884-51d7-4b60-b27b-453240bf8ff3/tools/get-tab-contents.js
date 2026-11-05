"use strict";var v=Object.create;var c=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var L=(e,t)=>{for(var n in t)c(e,n,{get:t[n],enumerable:!0})},f=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of C(t))!P.call(e,r)&&r!==n&&c(e,r,{get:()=>t[r],enumerable:!(a=I(t,r))||a.enumerable});return e};var w=(e,t,n)=>(n=e!=null?v(k(e)):{},f(t||!e||!e.__esModule?c(n,"default",{value:e,enumerable:!0}):n,e)),R=e=>f(c({},"__esModule",{value:!0}),e);var F={};L(F,{default:()=>$});module.exports=R(F);var T=require("timers/promises");var h=require("@raycast/utils");var u=require("@raycast/api"),E=w(require("fuse.js")),N=w(require("lodash")),U=w(require("osascript-tag"));var m=require("lru-cache"),d=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,n,a,r){let i=this.langCache.get(r);if(i.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),i.get(t);let o=this.langHandlers.get(r);if(o&&o.check(a,n)){let s=o.serialize(a);return i.set(t,s),s}return a}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,n){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,n),this.langCache.set(t,new m.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(t,n,a){let r=n;if(this.langHandlers.size>0){let{lang:i,id:o}=a;typeof i<"u"?r=this.formatStringWithLang(o,t,n,i):r=Array.from(this.langHandlers.keys()).reduce((s,l)=>this.formatStringWithLang(o,t,s,l),n)}return r}},p=new d;var{safariAppIdentifier:g,enableFuzzySearch:K}=(0,u.getPreferenceValues)();var q=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function b(e){let t=await(0,h.runAppleScript)(`(() => {
      const app = Application(${JSON.stringify(g)});
      const text = (value) => (typeof value === "string" ? value : "");
      ${e}
    })()`,{language:"JavaScript"});return JSON.parse(t)}function A(e){let{windowId:t,index:n}=e;if(!Number.isInteger(t)||t<1||!Number.isInteger(n)||n<1)throw new Error("windowId and index must be whole numbers starting at 1. Use get-all-tabs to list the open tabs.")}function M(e,t){if(e.status==="missing-window")throw new Error(t?`Safari has no window ${t.windowId} (${e.count} open). Use get-all-tabs to list the open tabs.`:"Safari has no open window.");if(e.status==="missing-tab")throw new Error(`Safari window ${t?.windowId} has no tab ${t?.index} (${e.count} open). Use get-all-tabs to list the open tabs.`)}async function y(e){e&&A(e);let t=await b(`
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
  `);if(M(t,e),t.status!=="ok")throw new Error(`Unexpected response from Safari: ${t.status}`);let{windowRef:n,windowId:a,index:r,title:i,url:o}=t;return{windowRef:n,windowId:a,index:r,title:i,url:o}}var D=(e,t)=>new Error(`The tab "${e.title||e.url}" is no longer at position ${e.index} of its window, or it now shows another page. Nothing was ${t}. Use get-all-tabs to find it again.`);async function x(e,t,n){let a=await b(`
    const win = app.windows.byId(${e.windowRef});
    if (!win.exists()) return JSON.stringify({ status: "changed" });
    const tabs = win.tabs();
    if (tabs.length < ${e.index}) return JSON.stringify({ status: "changed" });
    const tab = tabs[${e.index-1}];
    if (text(tab.url()) !== ${JSON.stringify(e.url)}) return JSON.stringify({ status: "changed" });
    // Needs "Allow JavaScript from Apple Events", which is off by default; a missing value stays "unknown"
    let readyState = "unknown";
    try {
      readyState = text(app.doJavaScript("document.readyState", { in: tab })) || "unknown";
    } catch (error) {}
    const content = text(tab.${t==="text"?"text":"source"}());
    return JSON.stringify({
      status: "ok",
      windowId: win.index(),
      title: text(tab.name()),
      readyState,
      length: content.length,
      hasContent: content.trim().length > 0,
      content: content.slice(0, ${n}),
    });
  `);if(a.status==="changed")throw D(e,"read");if(a.status!=="ok")throw new Error(`Unexpected response from Safari: ${a.status}`);let{windowId:r,title:i,readyState:o,length:s,hasContent:l,content:S}=a;return{windowId:r,title:i,readyState:o,length:s,hasContent:l,content:S}}var O=2e4,_=5e4,H=5e3,J=250;async function $(e){let{type:t="text"}=e,n=Number.isFinite(e.maxLength)?Math.min(Math.max(Math.floor(e.maxLength),1),_):O,a=await y(e.tab),r=Date.now()+H,i;for(;i=await x(a,t,n),!(!(i.readyState==="loading"||i.readyState==="unknown"&&!i.hasContent)||Date.now()>=r);)await(0,T.setTimeout)(J);let o=i.readyState==="loading";if(!i.hasContent)throw o?new Error(`"${i.title||a.url}" is still loading. Try again in a moment.`):new Error(`Couldn't read "${i.title||a.url}": the page has no ${t==="text"?"visible text":"source"}. It may still be loading, need JavaScript that is turned off in Safari, or be a Safari page such as the Start Page, which can't be read.`);let s=i.length>n;return{title:i.title,url:a.url,...Number.isInteger(i.windowId)&&i.windowId>0&&{windowId:i.windowId,index:a.index},type:t,loading:o,truncated:s,length:i.length,...s&&{note:`Only the first ${n} of ${i.length} characters are included. Say that the answer is based on the beginning of the page.`},content:i.content}}
