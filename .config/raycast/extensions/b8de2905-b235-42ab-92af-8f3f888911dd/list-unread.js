"use strict";var p=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var S=Object.prototype.hasOwnProperty;var T=(o,t)=>{for(var r in t)p(o,r,{get:t[r],enumerable:!0})},R=(o,t,r,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let e of I(t))!S.call(o,e)&&e!==r&&p(o,e,{get:()=>t[e],enumerable:!(l=h(t,e))||l.enumerable});return o};var b=o=>R(p({},"__esModule",{value:!0}),o);var N={};T(N,{default:()=>x});module.exports=b(N);var n=require("@raycast/api"),s=require("@raycast/utils");var d=require("@raycast/utils");async function m(o){let t=await(0,d.runAppleScript)(`(function(){${o}})()`,{humanReadableOutput:!1,language:"JavaScript",timeout:2e4});return t?JSON.parse(t):null}async function f(){return await m(`
const app = Application("GoodLinks");

const links = app.links().map((l) => {
  return {
    id: l.id(),
    url: l.url(),
    title: l.title(),
    tagNames: l.tagNames(),
    read: l.read(),
    starred: l.starred(),
  };
});

return links;

    `)}var k=require("@raycast/api"),g=require("@raycast/utils");async function L(){try{return!!(await(0,k.getApplications)()).find(r=>r.name.toLowerCase()==="goodlinks")}catch{return!1}}async function y(){await(0,g.showFailureToast)("GoodLinks is not installed on your computer.")}var C="goodlinks://x-callback-url";function w(o){return`${C}/open?url=${encodeURIComponent(o)}`}var a=require("react/jsx-runtime");function x(){let{data:o,isLoading:t,error:r}=(0,s.usePromise)(L),{data:l,isLoading:e,error:c}=(0,s.usePromise)(f,[],{execute:o});if(r||c)return r?y():(0,s.showFailureToast)(c),null;let u=l?.filter(i=>!i.read);return(0,a.jsxs)(n.List,{isLoading:e||t,children:[u?.length===0&&(0,a.jsx)(n.List.EmptyView,{}),u?.map(i=>(0,a.jsx)(n.List.Item,{icon:i.starred?n.Icon.Star:n.Icon.Circle,accessories:i.tagNames.map(A=>({tag:A})),title:i.title,subtitle:i.url,actions:(0,a.jsx)(n.ActionPanel,{children:(0,a.jsx)(n.Action,{title:"Open",onAction:()=>(0,n.open)(w(i.url)),shortcut:n.Keyboard.Shortcut.Common.Open})})},i.id))]})}
