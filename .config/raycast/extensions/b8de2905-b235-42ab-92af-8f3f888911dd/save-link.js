"use strict";var e=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var L=(t,o)=>{for(var n in o)e(t,n,{get:o[n],enumerable:!0})},h=(t,o,n,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of k(o))!g.call(t,i)&&i!==n&&e(t,i,{get:()=>o[i],enumerable:!(s=y(o,i))||s.enumerable});return t};var T=t=>h(e({},"__esModule",{value:!0}),t);var x={};L(x,{default:()=>w});module.exports=T(x);var a=require("@raycast/api");var l=require("@raycast/utils");async function c(t){let o=await(0,l.runAppleScript)(`(function(){${t}})()`,{humanReadableOutput:!1,language:"JavaScript",timeout:2e4});return o?JSON.parse(o):null}async function p(t){return await c(`
const goodlinks = Application("GoodLinks");
goodlinks.make({
  new: "link",
  withProperties: {
    url: "${t}",
  },
});
`)}var u=require("@raycast/api"),d=require("@raycast/utils");async function m(){try{return!!(await(0,u.getApplications)()).find(n=>n.name.toLowerCase()==="goodlinks")}catch{return!1}}async function f(){await(0,d.showFailureToast)("GoodLinks is not installed on your computer.")}var r=require("@raycast/utils");async function R(){let t=await a.Clipboard.readText();if(!t)return await(0,r.showFailureToast)("Your clipboard is empty."),null;try{return new URL(t),encodeURI(t)}catch{return await(0,r.showFailureToast)("Your clipboard does not contain a valid URL"),null}}async function w(){try{if(!await m()){await f();return}let o=await R();if(!o)return;await p(o),await(0,a.showToast)({title:"Link saved!",style:a.Toast.Style.Success})}catch(t){await(0,r.showFailureToast)(t)}}
