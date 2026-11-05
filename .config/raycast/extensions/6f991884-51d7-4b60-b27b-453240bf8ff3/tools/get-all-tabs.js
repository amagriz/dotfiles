"use strict";var S=Object.create;var l=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var C=(n,t)=>{for(var e in t)l(n,e,{get:t[e],enumerable:!0})},g=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of k(t))!I.call(n,r)&&r!==e&&l(n,r,{get:()=>t[r],enumerable:!(i=v(t,r))||i.enumerable});return n};var w=(n,t,e)=>(e=n!=null?S(P(n)):{},g(t||!n||!n.__esModule?l(e,"default",{value:n,enumerable:!0}):e,n)),R=n=>g(l({},"__esModule",{value:!0}),n);var N={};C(N,{default:()=>x});module.exports=R(N);var p=require("@raycast/utils");var d=require("@raycast/api"),L=w(require("fuse.js")),E=w(require("lodash")),U=w(require("osascript-tag"));var h=require("lru-cache"),c=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,e,i,r){let a=this.langCache.get(r);if(a.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),a.get(t);let o=this.langHandlers.get(r);if(o&&o.check(i,e)){let s=o.serialize(i);return a.set(t,s),s}return i}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,e){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,e),this.langCache.set(t,new h.LRUCache({max:1e3})),console.log(`language adaptor for ${e.name} installed`))}formatString(t,e,i){let r=e;if(this.langHandlers.size>0){let{lang:a,id:o}=i;typeof a<"u"?r=this.formatStringWithLang(o,t,e,a):r=Array.from(this.langHandlers.keys()).reduce((s,u)=>this.formatStringWithLang(o,t,s,u),e)}return r}},b=new c;var{safariAppIdentifier:f,enableFuzzySearch:_}=(0,d.getPreferenceValues)();var F=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function y(){let n=`tell application "${f}" to return count of windows`,t=parseInt(await(0,p.runAppleScript)(n),10),e=[];for(let i=1;i<=t;i++){let r=`
      tell application "${f}"
        set tabData to ""
        set windowTabs to tabs of window ${i}
        repeat with i from 1 to count of windowTabs
          set currentTab to item i of windowTabs
          set tabData to tabData & name of currentTab & ":::" & URL of currentTab
          if i < count of windowTabs then
            set tabData to tabData & "|||"
          end if
        end repeat
        return tabData
      end tell
    `,a=await(0,p.runAppleScript)(r);a&&a.length>0&&a.split("|||").forEach((s,u)=>{let[T,$]=s.split(":::"),m=u+1;e.push({uuid:`${i}-${m}`,title:T,url:$||"",window_id:i,index:m,is_local:!0})})}return e}async function x(){return await y()}
