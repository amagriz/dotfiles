"use strict";var $=Object.create;var c=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var I=(e,t)=>{for(var i in t)c(e,i,{get:t[i],enumerable:!0})},m=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of v(t))!k.call(e,a)&&a!==i&&c(e,a,{get:()=>t[a],enumerable:!(r=S(t,a))||r.enumerable});return e};var w=(e,t,i)=>(i=e!=null?$(C(e)):{},m(t||!e||!e.__esModule?c(i,"default",{value:e,enumerable:!0}):i,e)),P=e=>m(c({},"__esModule",{value:!0}),e);var N={};I(N,{default:()=>x});module.exports=P(N);var n=require("@raycast/api");var p=require("@raycast/utils");var u=require("@raycast/api"),L=w(require("fuse.js")),R=w(require("lodash")),A=w(require("osascript-tag"));var g=require("lru-cache"),d=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,i,r,a){let o=this.langCache.get(a);if(o.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),o.get(t);let s=this.langHandlers.get(a);if(s&&s.check(r,i)){let l=s.serialize(r);return o.set(t,l),l}return r}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,i){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,i),this.langCache.set(t,new g.LRUCache({max:1e3})),console.log(`language adaptor for ${i.name} installed`))}formatString(t,i,r){let a=i;if(this.langHandlers.size>0){let{lang:o,id:s}=r;typeof o<"u"?a=this.formatStringWithLang(s,t,i,o):a=Array.from(this.langHandlers.keys()).reduce((l,T)=>this.formatStringWithLang(s,t,l,T),i)}return a}},h=new d;var{safariAppIdentifier:f,enableFuzzySearch:_}=(0,u.getPreferenceValues)();var W=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function b(){return await(0,p.runAppleScript)(`tell application "${f}" to return name of current tab in window 1`)}async function y(){return await(0,p.runAppleScript)(`tell application "${f}" to return URL of current tab in window 1`)}var E=(0,n.getPreferenceValues)();async function U(e){return n.environment.canAccess(n.AI)?await n.AI.ask(`
    The user copies a link from the browser to put it in their notes. Clean up the title to make it more readable and remove unnecessary things.

    ## Examples
    - Title: "Building and Evaluating a Company Research Agent with LangChain | by Ankush k Singal | AI Artistry | Jan, 2025 | Medium"
    - Cleaned up title: "AI Artistry - Building and Evaluating a Company Research Agent with LangChain by Ankush k Singal"

    - Title: "Agents | Kaggle"
    - Cleaned up title:: "Kaggle - Agents"

    - Title: "Building effective agents  Anthropic"
    - Cleaned up title: "Anthropic - Building effective agents"

    - Title: "Linen | Front page for your Slack and Discord Communities"
    - Cleaned up title: "Linen - Front page for your Slack and Discord Communities"

    - Title: "LibSQL - SQLite for Modern Applications"
    - Cleaned up title: "LibSQL - SQLite for Modern Applications"

    - Title: "Product Hunt - Raycast - Product Information, Latest Updates, and Reviews 2025"
    - Cleaned up title: "Product Hunt - Raycast"

    - Title: "vscode-extension-samples/chat-sample/package.json at main \xB7 microsoft/vscode-extension-samples \xB7 GitHub"
    - Cleaned up title: "GitHub - chat-sample/package.json at main (microsoft/vscode-extension-samples)"

    Respond only with the cleaned up title.
    - Title: ${e}
    - Cleaned up title:
  `):e}async function x(){try{await(0,n.closeMainWindow)();let e=await b(),t=await y();E.cleanUpTitleWithAI&&(await(0,n.showToast)({style:n.Toast.Style.Animated,title:"Cleaning up title with AI"}),e=await U(e)),await n.Clipboard.copy({text:`[${e}](${t})`,html:`<a href="${t}">${e}</a>`}),await(0,n.showToast)({style:n.Toast.Style.Success,title:"Copied title as link to clipboard"})}catch(e){console.error(e),await(0,n.showToast)({style:n.Toast.Style.Failure,title:"Failed copying title as link to clipboard",message:e instanceof Error?e.message:void 0})}}
