"use strict";var Nt=Object.create;var M=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var Mt=Object.getOwnPropertyNames;var Bt=Object.getPrototypeOf,$t=Object.prototype.hasOwnProperty;var Ht=(t,e)=>{for(var o in e)M(t,o,{get:e[o],enumerable:!0})},rt=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Mt(e))!$t.call(t,n)&&n!==o&&M(t,n,{get:()=>e[n],enumerable:!(r=vt(e,n))||r.enumerable});return t};var b=(t,e,o)=>(o=t!=null?Nt(Bt(t)):{},rt(e||!t||!t.__esModule?M(o,"default",{value:t,enumerable:!0}):o,t)),Ft=t=>rt(M({},"__esModule",{value:!0}),t);var se={};Ht(se,{default:()=>It,groupEntriesByDate:()=>Lt});module.exports=Ft(se);var et=require("@raycast/api"),v=require("react");var k=b(require("fs")),yt=require("child_process"),w=b(require("@raycast/api")),wt=require("@raycast/utils"),ht=require("@raycast/utils/dist/handle-error-toast-action"),y=require("react");var L=b(require("fs")),_=b(require("path"));var V=["Application Support","Comet"],it=["Application Support","Comet","Local State"],T="Default",B="COMET_PROFILE_KEY",nt="comet-icon.png",st="BOOKMARK_SORT_ORDER",at="AddedAsc",lt={AddedAsc:"Date Added (ASC)",AddedDes:"Date Added (DES)"};var f={HISTORY_RESULTS:30,BOOKMARK_RESULTS:100,TAB_RESULTS:50,SEARCH_ALL_RESULTS:50},ct=f.HISTORY_RESULTS,ce=f.BOOKMARK_RESULTS,fe=f.TAB_RESULTS,de=f.SEARCH_ALL_RESULTS,$={DEBOUNCE_DELAY:300,CACHE_TTL:300*1e3,MAX_RETRY_ATTEMPTS:3,RETRY_DELAY:1e3},pe=$.DEBOUNCE_DELAY,me=$.CACHE_TTL,ue=$.MAX_RETRY_ATTEMPTS,Ee=$.RETRY_DELAY,X={WINDOW_INIT_RETRY_LIMIT:20,WINDOW_INIT_RETRY_DELAY:.1,WINDOW_ACTIVATION_DELAY:.2},G=X.WINDOW_INIT_RETRY_LIMIT,z=X.WINDOW_INIT_RETRY_DELAY,j=X.WINDOW_ACTIVATION_DELAY,Yt=()=>{let t=[];return(f.BOOKMARK_RESULTS<1||f.BOOKMARK_RESULTS>1e3)&&t.push(`Bookmark result limit (${f.BOOKMARK_RESULTS}) outside recommended range (1-1000)`),(f.HISTORY_RESULTS<1||f.HISTORY_RESULTS>500)&&t.push(`History result limit (${f.HISTORY_RESULTS}) outside recommended range (1-500)`),(f.TAB_RESULTS<1||f.TAB_RESULTS>200)&&t.push(`Tab result limit (${f.TAB_RESULTS}) outside recommended range (1-200)`),(f.SEARCH_ALL_RESULTS<1||f.SEARCH_ALL_RESULTS>100)&&t.push(`Search all result limit (${f.SEARCH_ALL_RESULTS}) outside recommended range (1-100)`),t.length>0&&console.warn("Memory limit configuration warnings:",t),t};Yt();var d=require("@raycast/api"),q=()=>{if(!process.env.HOME)throw new Error("$HOME environment variable is not set.");return _.default.join(process.env.HOME,"Library")},Wt=(t,e)=>{let{profilePath:o}=(0,d.getPreferenceValues)(),r;return o?r=_.default.join(o,e??T,t):r=_.default.join(q(),...V,e??T,t),r},ft=t=>Wt("History",t),dt=()=>_.default.join(q(),...it),pt=()=>{let{profilePath:t}=(0,d.getPreferenceValues)();return t||_.default.join(q(),...V)},Ut=()=>{try{let t=pt();return L.default.existsSync(t)}catch{return!1}},mt=()=>{try{let t=pt();if(!L.default.existsSync(t))return[];let e=L.default.readdirSync(t),o=[];return e.includes("Default")&&o.push("Default"),e.filter(r=>{try{let n=_.default.join(t,r);return L.default.statSync(n).isDirectory()&&(r.startsWith("Profile ")||r==="Default")}catch{return!1}}).forEach(r=>{r!=="Default"&&o.push(r)}),o}catch{return[]}};async function Kt(){return(await(0,d.getApplications)()).some(({bundleId:e})=>e==="ai.perplexity.comet")}async function ut(){let{profilePath:t}=(0,d.getPreferenceValues)();if(t&&!Ut()){let e={style:d.Toast.Style.Failure,title:"Comet profile directory not found.",message:"Please check your profile path in extension settings.",primaryAction:{title:"Open Extension Settings",onAction:o=>{(0,d.openExtensionPreferences)(),o.hide()}}};return await(0,d.showToast)(e),!1}return!0}async function g(){if(!await Kt()){let t={style:d.Toast.Style.Failure,title:"Comet browser is not installed.",message:"Install it from: https://comet.perplexity.ai/",primaryAction:{title:"Go to https://comet.perplexity.ai/",onAction:e=>{(0,d.open)("https://comet.perplexity.ai/"),e.hide()}}};return await(0,d.showToast)(t),!1}return!0}var Et=(t,e,o)=>{if(o.length===0||o.length===1&&o[0]==="")return`SELECT id, url, title FROM ${t} WHERE last_visit_time > 0 ORDER BY ${e} DESC LIMIT 30;`;let n=o.map(i=>i.replace(/'/g,"''").replace(/"/g,'""').replace(/\\/g,"\\\\").replace(/%/g,"\\%").replace(/_/g,"\\_")).map(i=>`(title LIKE '%${i}%' OR url LIKE '%${i}%')`).join(" AND ");return`SELECT id, url, title FROM ${t} WHERE ${n} AND last_visit_time > 0 ORDER BY ${e} DESC LIMIT 30;`};var I=require("react");function Tt(){let[t,e]=(0,I.useState)(null),[o,r]=(0,I.useState)(!0);return(0,I.useEffect)(()=>{let n=!0;return(async()=>{try{let c=await g();n&&(e(c),r(!1))}catch{n&&(e(!1),r(!1))}})(),()=>{n=!1}},[]),{isInstalled:t,isChecking:o,isReady:!o&&t===!0}}var R="/tmp/comet-raycast-empty.db",Vt=()=>{if(!k.existsSync(R))try{(0,yt.execSync)(`sqlite3 "${R}" "CREATE TABLE IF NOT EXISTS urls (id TEXT, url TEXT, title TEXT, last_visit_time INTEGER);"`)}catch{k.writeFileSync(R,"")}};Vt();var Xt=(t,e,o=!0)=>{let r=e?e.trim().split(" ").filter(C=>C.length>0):[""],n=Et("urls","last_visit_time",r),i=ft(t),{isInstalled:c,isChecking:p}=Tt(),[S,E]=(0,y.useState)(!1),[h,m]=(0,y.useState)(0),[a,u]=(0,y.useState)(null);(0,y.useEffect)(()=>()=>{a&&(clearTimeout(a),u(null))},[a]);let ot=(0,y.useMemo)(()=>o&&k.existsSync(i)?i:R,[o,i]),{data:kt,isLoading:xt,permissionView:Pt,revalidate:O}=(0,wt.useSQL)(ot,n,{onData(){E(!1),m(0),a&&(clearTimeout(a),u(null))},onError(C){if(h<1){E(!0),m(h+1);let Dt=setTimeout(()=>{O(),a&&clearTimeout(a),u(null)},1e3);u(Dt)}else E(!1),m(0),a&&(clearTimeout(a),u(null)),w.environment.launchType!==w.LaunchType.Background&&w.showToast({style:w.Toast.Style.Failure,title:"Failed to load history",message:C.message,primaryAction:(0,ht.handleErrorToastAction)(C)})}});return o?p?{isLoading:!0,data:[],errorView:void 0,revalidate:O}:c?ot===R&&o?{isLoading:!1,data:[],errorView:void 0,revalidate:O}:{data:(kt||[]).slice(0,ct),isLoading:xt||S,errorView:Pt,revalidate:O}:{isLoading:!1,data:[],errorView:void 0,revalidate:O}:{data:[],isLoading:!1,errorView:void 0,revalidate:()=>{}}};function _t(t,e,o=!0){return Xt(t,e,o)}var Gt=require("@raycast/api");var Q=require("@raycast/api"),x=require("react"),gt=require("@raycast/utils");var H=b(require("fs")),J=require("react/jsx-runtime");function F({onProfileSelected:t}){let[e,o]=(0,gt.useCachedState)(B,T),[r,n]=(0,x.useState)([]);return(0,x.useEffect)(()=>{let i=mt(),c=[];try{let p=dt();if(H.existsSync(p)){let S=H.readFileSync(p,"utf-8"),E=JSON.parse(S);if(E.profile?.info_cache){let h=E.profile.info_cache;c=i.map(m=>{let a=h[m];return{id:m,name:a?.name||(m==="Default"?"Default":m)}})}}}catch{}c.length===0&&(c=i.map(p=>({name:p==="Default"?"Default":p.startsWith("Profile ")?p:`Profile ${p}`,id:p}))),c.length===0&&c.push({id:T,name:"Default"}),n(c),!e&&c.length>0&&o(c[0].id)},[]),(0,x.useEffect)(()=>{e&&r.length>0&&t?.(e)},[e,r]),(0,J.jsx)(Q.List.Dropdown,{tooltip:"Select Comet Profile",value:e,onChange:o,children:r.map(i=>(0,J.jsx)(Q.List.Dropdown.Item,{value:i.id,title:i.name},i.id))})}var zt=require("react/jsx-runtime");var Y=require("@raycast/api"),jt=require("react/jsx-runtime");var W=require("@raycast/api"),St=require("react/jsx-runtime");var s=require("@raycast/api");var Qt=require("@raycast/api");var qt=require("@raycast/utils");var A=require("@raycast/utils");async function Rt(t){await(0,A.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
    end tell
    return true
  `)}async function At(t){await(0,A.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
      close active tab of _wnd
    end tell
    return true
  `)}async function Jt(){await(0,A.runAppleScript)(`
    tell application "Comet"
      -- Check if at least one window exists
      if (count of windows) > 0 then
        make new tab at end of tabs of window 1
        activate
      else
        -- No windows exist, create a new window with a tab
        make new window
        
        -- Wait for window to be fully initialized
        repeat with i from 1 to ${G}
            if (count of windows) > 0 then
                exit repeat
            end if
            delay ${z}
        end repeat
        
        -- Additional small delay to ensure window is ready
        delay ${j}
        activate
      end if
    end tell
    return true
  `)}async function Z(t){await(0,A.runAppleScript)(`
    tell application "Comet"
      activate
      open location "${t}"
    end tell
    return true
  `)}async function U(t){try{let e=t?t.replace(/"/g,'\\"').replace(/\\/g,"\\\\"):"";await(0,A.runAppleScript)(`
      tell application "Comet"
          set windowCount to count of windows
          
          if windowCount is 0 then
              -- Create new window and wait for initialization
              make new window
              repeat with i from 1 to ${G}
                  if (count of windows) > 0 then
                      exit repeat
                  end if
                  delay ${z}
              end repeat
              delay ${j}
          else
              activate
          end if

          -- Create tab in the first window
          tell window 1
              ${t?`set newTab to make new tab with properties {URL:"${e}"}`:"make new tab"}
          end tell
      end tell
      return true
    `)}catch(e){console.error("Failed to create tab with profile:",e);try{t?await Z(t):await Jt()}catch(o){throw console.error("Fallback tab creation also failed:",o),new Error(`Failed to create tab: ${e instanceof Error?e.message:"Unknown error"}`)}}}var Ot=require("@raycast/utils"),l=require("react/jsx-runtime"),P=class{static NewTab=Zt;static TabList=te;static TabHistory=ee};function Zt({query:t,url:e}){let o="Open Empty Tab";return t?o=`Search "${t}"`:e&&(o=`Open URL "${e}"`),(0,l.jsx)(s.ActionPanel,{title:"New Tab",children:(0,l.jsx)(s.Action,{onAction:async()=>{if(await g())try{if(t){let i=`https://perplexity.ai/search?q=${encodeURIComponent(t)}`;await U(i)}else e?await U(e):await U()}catch(i){throw console.error("Error in NewTabActions:",i),i}},title:o})})}function te({tab:t,onTabClosed:e}){return(0,l.jsxs)(s.ActionPanel,{title:t.title,children:[(0,l.jsx)(oe,{tab:t}),(0,l.jsx)(s.Action.CopyToClipboard,{title:"Copy URL",content:t.url}),(0,l.jsx)(s.Action.CopyToClipboard,{title:"Copy Title",content:t.title,shortcut:{modifiers:["cmd","shift"],key:"enter"}}),(0,l.jsx)(re,{tab:t,onTabClosed:e}),(0,l.jsx)(s.ActionPanel.Section,{children:(0,l.jsx)(s.Action.CreateQuicklink,{quicklink:{link:t.url,name:t.title,application:"Comet"},shortcut:{modifiers:["cmd"],key:"s"}})})]})}function ee({title:t,url:e}){let[o,r]=(0,Ot.useCachedState)(st,at);return(0,l.jsxs)(s.ActionPanel,{title:t,children:[(0,l.jsx)(s.Action,{icon:nt,onAction:async()=>{await g()&&await Z(e)},title:"Open"}),(0,l.jsx)(s.Action.CopyToClipboard,{title:"Copy URL",content:e,shortcut:{modifiers:["cmd"],key:"c"}}),(0,l.jsx)(s.ActionPanel.Submenu,{icon:s.Icon.NumberList,title:"Sort by",children:Object.entries(lt).map(([i,c])=>(0,l.jsx)(s.Action,{icon:o===i?s.Icon.CheckCircle:s.Icon.Circle,title:c,onAction:()=>r(i)},i))})]})}function oe(t){async function e(){if(await g())try{await Rt(t.tab),await(0,s.closeMainWindow)()}catch(r){throw r instanceof Error?new Error("Issue with tab: '"+t.tab.sourceLine+`'
`+r.message):r}}return(0,l.jsx)(s.ActionPanel.Item,{title:"Open Tab",icon:{source:s.Icon.Eye},onAction:e})}function re(t){async function e(){await g()&&(await At(t.tab),await(0,s.closeMainWindow)(),t.onTabClosed?.())}return(0,l.jsx)(s.Action,{title:"Close Tab",icon:{source:s.Icon.XMarkCircle},onAction:e,shortcut:{modifiers:["cmd","shift"],key:"w"}})}var Ct=require("@raycast/utils"),tt=require("@raycast/api");var D=require("react/jsx-runtime"),K=class{static TabList=ne;static TabHistory=ie};function ie({profile:t,entry:{url:e,title:o,id:r},type:n}){return(0,D.jsx)(tt.List.Item,{id:`${t}-${n}-${r}`,title:o,subtitle:e,icon:(0,Ct.getFavicon)(e),actions:(0,D.jsx)(P.TabHistory,{title:o,url:e})})}function ne(t){return(0,D.jsx)(tt.List.Item,{title:t.tab.title,subtitle:t.tab.urlWithoutScheme(),keywords:[t.tab.urlWithoutScheme()],actions:(0,D.jsx)(P.TabList,{tab:t.tab,onTabClosed:t.onTabClosed}),icon:t.useOriginalFavicon?t.tab.realFavicon():t.tab.defaultFavicon()})}var bt=require("@raycast/utils");var N=require("react/jsx-runtime"),Lt=t=>t?t.reduce((e,o)=>{let r="Results",n=e.get(r)??[];return n.push(o),e.set(r,n),e},new Map):new Map;function It(){let[t,e]=(0,v.useState)(null),[o,r]=(0,v.useState)(""),[n,i]=(0,bt.useCachedState)(B,T);(0,v.useEffect)(()=>{(async()=>{let u=await ut();e(u)})()},[]);let{data:c,isLoading:p,errorView:S}=_t(n,o,!0);if(t===null||!t)return null;let E=a=>{i(a)},h=Lt(c),m=Array.from(h.keys());return S||(0,N.jsx)(et.List,{onSearchTextChange:r,isLoading:p,throttle:!0,searchBarAccessory:(0,N.jsx)(F,{onProfileSelected:E}),children:m?.map(a=>(0,N.jsx)(et.List.Section,{title:a,children:h?.get(a)?.map(u=>(0,N.jsx)(K.TabHistory,{entry:u,profile:n,type:"History"},u.id))},a))})}0&&(module.exports={groupEntriesByDate});
