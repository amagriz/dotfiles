"use strict";var T=Object.create;var c=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var v=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var C=(e,t)=>{for(var n in t)c(e,n,{get:t[n],enumerable:!0})},p=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of S(t))!k.call(e,i)&&i!==n&&c(e,i,{get:()=>t[i],enumerable:!(a=$(t,i))||a.enumerable});return e};var w=(e,t,n)=>(n=e!=null?T(v(e)):{},p(t||!e||!e.__esModule?c(n,"default",{value:e,enumerable:!0}):n,e)),P=e=>p(c({},"__esModule",{value:!0}),e);var L={};C(L,{default:()=>y});module.exports=P(L);var r=require("@raycast/api");var h=require("@raycast/utils");var u=require("@raycast/api"),I=w(require("fuse.js")),R=w(require("lodash")),E=w(require("osascript-tag"));var m=require("lru-cache"),d=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,n,a,i){let o=this.langCache.get(i);if(o.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),o.get(t);let s=this.langHandlers.get(i);if(s&&s.check(a,n)){let l=s.serialize(a);return o.set(t,l),l}return a}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,n){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,n),this.langCache.set(t,new m.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(t,n,a){let i=n;if(this.langHandlers.size>0){let{lang:o,id:s}=a;typeof o<"u"?i=this.formatStringWithLang(s,t,n,o):i=Array.from(this.langHandlers.keys()).reduce((l,x)=>this.formatStringWithLang(s,t,l,x),n)}return i}},g=new d;var{safariAppIdentifier:f,enableFuzzySearch:J}=(0,u.getPreferenceValues)();var O=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function b(){await(0,h.runAppleScript)(`
    tell application "${f}"
      if (count of windows) is 0 then error "Safari has no open window."
      tell front window
        set curTab to current tab
        set tabUrl to URL of curTab
        if tabUrl is missing value or tabUrl is "" then
          set newTab to make new tab at after curTab
        else
          set newTab to make new tab at after curTab with properties {URL:tabUrl}
        end if
        set current tab to newTab
      end tell
      repeat 10 times
        activate
        if frontmost then exit repeat
        delay ${.2}
      end repeat
      if not frontmost then error "Tab duplicated, but ${f} did not take focus"
    end tell
  `)}async function y(){try{await(0,r.closeMainWindow)(),await b(),await(0,r.showHUD)("Duplicated tab")}catch(e){console.error(e),await(0,r.showToast)({style:r.Toast.Style.Failure,title:"Could not duplicate tab",message:e instanceof Error?e.message:String(e)})}}
