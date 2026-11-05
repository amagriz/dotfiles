"use strict";var y=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var U=Object.prototype.hasOwnProperty;var L=(e,t)=>{for(var n in t)y(e,n,{get:t[n],enumerable:!0})},M=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of R(t))!U.call(e,o)&&o!==n&&y(e,o,{get:()=>t[o],enumerable:!(s=D(t,o))||s.enumerable});return e};var j=e=>M(y({},"__esModule",{value:!0}),e);var $={};L($,{default:()=>v});module.exports=j($);var f=require("react"),r=require("@raycast/api");function h(e){return e instanceof Error?e.message:String(e)}var w=`# Error \u{1F616}

The server returned status \` 400 \` (that's not good!).

This error indicates that most likely something went wrong with your **User ID**.

## How to obtain the User ID

1. Go to your \`Administrator Dashboard\` -> \`Users\` -> Select your user
2. The URL of this page should look like this: https://jellyfin.example/web/index.html#!/useredit.html?userId=6ca1985577a843fd9949d811f6af9248
3. Copy the User ID from the URL (the part after \`userId\` -> \`6ca1985577a843fd9949d811f6af9248\`) 
and update it in the extension's preferences (\`Cmd\` + \`Enter\`)

## Didn't work?

If you're sure you got the right User ID, please submit an issue.`,P=`# Error \u{1F616}

The server returned status \` 401 \` (that's not good!).

This error indicates that most likely something went wrong with your **API Key**.

## How to obtain an API Key

1. Go to your \`Administrator Dashboard\` -> \`API Keys\` -> And click on the button with the plus \` [+] \`
2. You can give the API Key a name, like \`Raycast\`
3. Copy the API Token 
and update it in the extension's preferences (\`Cmd\` + \`Enter\`)

## Didn't work?

If you're sure you got the right API Token, please submit an issue.`;var T=require("@raycast/api");function A(){return(0,T.getPreferenceValues)()}var g=A();function b(e,t){let n=new URLSearchParams;t||(t={ApiKey:g.jellyfinApiKey});for(let[s,o]of Object.entries(t))if(Array.isArray(o))for(let u of o)n.append(s,u);else n.append(s,o);return`${g.jellyfinBase}/${e.join("/")}?${n.toString()}`}var d=class extends Error{constructor(n,s){super(n);this.message=n;this.helpMessage=s}};function k(e){let t=`Server returned ${e.status}`;switch(e.status){case 400:throw new d(t,w);case 401:throw new d(t,P)}throw new Error(t)}async function N(){let e=b(["Sessions"],{ActiveWithinSeconds:"960",ApiKey:g.jellyfinApiKey}),t=await fetch(e);t.ok||k(t);let n=await t.json(),s=new Date;return n.filter(o=>o.UserName&&(s.getTime()-Date.parse(o.LastActivityDate))/1e3<=960)}async function x(e,t){let n=b(["Sessions",e,"Command"]),s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Name:t,ControllingUserId:g.jellyfinUserID,Arguments:{}})});s.ok||k(s)}var c=require("@raycast/api"),p=require("react/jsx-runtime");function S({children:e,errorMessage:t}){return t?(0,p.jsx)(c.Detail,{markdown:t,actions:(0,p.jsx)(c.ActionPanel,{title:"Actions",children:(0,p.jsx)(c.Action,{title:"Open Preferences",icon:c.Icon.Gear,onAction:()=>(0,c.openExtensionPreferences)()})})}):e}var E=require("@raycast/api");function I(e,t,n=E.Toast.Style.Failure){e.message=t,e.style=n}var l=require("react/jsx-runtime");function K({session:e,refresh:t}){let n=e.NowPlayingItem?{source:r.Icon.Play,tintColor:r.Color.Green}:{source:r.Icon.Stop,tintColor:r.Color.SecondaryText};e.PlayState.IsPaused&&(n={source:r.Icon.PauseFilled,tintColor:r.Color.Orange});let s="";if(e.NowPlayingItem){let a=e.NowPlayingItem;s=`${a.Name} (${a.ProductionYear}) ${Math.round(a.CommunityRating*100)/100}\u2605`}let o=[{tag:{value:`${e.Client} ${e.ApplicationVersion}`,color:r.Color.Green}},{tag:{value:e.DeviceName,color:r.Color.SecondaryText}}];e.PlayState.IsMuted&&o.push({icon:r.Icon.SpeakerOff}),o.push({text:e.RemoteEndPoint}),e.NowPlayingItem?.Type=="Episode"&&e.NowPlayingItem.SeriesName&&o.unshift({text:e.NowPlayingItem.SeriesName});let u=[];for(let a of e.SupportedCommands)u.push((0,l.jsx)(r.Action,{title:a,icon:r.Icon.Circle,onAction:async()=>{let m=await(0,r.showToast)({title:a,message:`Sending to ${e.UserName}`,style:r.Toast.Style.Animated});try{await x(e.Id,a),I(m,`Successfully sent ${a} to ${e.UserName}`,r.Toast.Style.Success),t()}catch(i){I(m,h(i),r.Toast.Style.Failure)}}}));return(0,l.jsx)(r.List.Item,{title:e.UserName??"unknown",icon:n,subtitle:s,accessories:o,actions:(0,l.jsxs)(r.ActionPanel,{title:"Session Action",children:[...u]})})}function v(){let[e,t]=(0,f.useState)(!0),[n,s]=(0,f.useState)([]),[o,u]=(0,f.useState)("");async function a(){try{let i=await N();s(i)}catch(i){i instanceof d&&u(i.helpMessage),(0,r.showToast)({title:"Error",message:h(i),style:r.Toast.Style.Failure})}}function m(){t(!0),a().then(()=>t(!1))}return(0,f.useEffect)(()=>{m();let i=setInterval(()=>{m()},1e3);return()=>clearInterval(i)},[]),(0,l.jsx)(S,{errorMessage:o,children:(0,l.jsxs)(r.List,{isLoading:e,children:[n.map((i,C)=>(0,l.jsx)(K,{session:i,refresh:m},C)),(0,l.jsx)(r.List.EmptyView,{title:"No Recent Sessions found on Jellyfin"})]})})}
