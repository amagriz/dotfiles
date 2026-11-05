"use strict";var s=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var f=(e,t)=>{for(var i in t)s(e,i,{get:t[i],enumerable:!0})},u=(e,t,i,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of A(t))!h.call(e,a)&&a!==i&&s(e,a,{get:()=>t[a],enumerable:!(l=d(t,a))||l.enumerable});return e};var w=e=>u(s({},"__esModule",{value:!0}),e);var y={};f(y,{default:()=>c});module.exports=w(y);var n=require("@raycast/api"),o=require("run-applescript");var m=require("@raycast/api");async function p(){return!!(await(0,m.getApplications)()).find(i=>i.bundleId==="com.if.Amphetamine")}var r="https://apps.apple.com/br/app/amphetamine/id937984704";async function c(){let e=new n.Toast({title:"Ending current session...",style:n.Toast.Style.Animated});if(e.show(),!await p()){e.title="Amphetamine is no installed",e.message="Press Command + D to download",e.primaryAction={title:"Download",shortcut:{modifiers:["cmd"],key:"d"},onAction:async()=>await(0,n.open)(r)},e.style=n.Toast.Style.Failure;return}if(await(0,o.runAppleScript)(`
    tell application "Amphetamine"
        return session is active
    end tell
  `)==="false"){e.title="No Amphetamine session is running.",e.style=n.Toast.Style.Failure;return}await(0,o.runAppleScript)(`
    tell application "Amphetamine"
        end session
    end tell
  `),await(0,n.showHUD)("Ended current session.")}
