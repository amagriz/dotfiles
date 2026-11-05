"use strict";var d=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var s=Object.prototype.hasOwnProperty;var u=(n,t)=>{for(var i in t)d(n,i,{get:t[i],enumerable:!0})},p=(n,t,i,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of m(t))!s.call(n,a)&&a!==i&&d(n,a,{get:()=>t[a],enumerable:!(c=l(t,a))||c.enumerable});return n};var h=n=>p(d({},"__esModule",{value:!0}),n);var v={};u(v,{default:()=>r});module.exports=h(v);var e=require("@raycast/api"),o=require("react/jsx-runtime"),y=`# Command Replaced

The **Customize Order** command has been removed.

The old priority-ordering system (where you ranked multiple devices as fallbacks) has been replaced by a simpler single-default model.

## What to do instead

1. Open **Set Output Device** or **Set Input Device**
2. Press **Cmd+Shift+D** on the device you want to select as default
3. That device will be automatically restored on the next background refresh (roughly every minute) if macOS switches away
`;function r(){return(0,o.jsx)(e.Detail,{markdown:y,actions:(0,o.jsxs)(e.ActionPanel,{children:[(0,o.jsx)(e.Action,{title:"Open Set Output Device",onAction:()=>(0,e.launchCommand)({name:"set-output-device",type:e.LaunchType.UserInitiated})}),(0,o.jsx)(e.Action,{title:"Open Set Input Device",onAction:()=>(0,e.launchCommand)({name:"set-input-device",type:e.LaunchType.UserInitiated})}),(0,o.jsx)(e.Action,{title:"Disable This Command",onAction:e.openCommandPreferences})]})})}
