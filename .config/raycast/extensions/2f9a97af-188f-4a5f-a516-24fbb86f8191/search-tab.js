"use strict";var I=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var ut=Object.prototype.hasOwnProperty;var Tt=(t,e)=>{for(var o in e)I(t,o,{get:e[o],enumerable:!0})},Et=(t,e,o,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of mt(e))!ut.call(t,n)&&n!==o&&I(t,n,{get:()=>e[n],enumerable:!(a=pt(e,n))||a.enumerable});return t};var wt=t=>Et(I({},"__esModule",{value:!0}),t);var Nt={};Tt(Nt,{default:()=>ct});module.exports=wt(Nt);var L=require("@raycast/api"),st=require("react");var Rt=require("@raycast/api");var St=require("@raycast/api"),X=require("react"),gt=require("@raycast/utils");var K="comet-icon.png",V="BOOKMARK_SORT_ORDER",z="AddedAsc",G={AddedAsc:"Date Added (ASC)",AddedDes:"Date Added (DES)"},R="Comet browser not installed";var c={HISTORY_RESULTS:30,BOOKMARK_RESULTS:100,TAB_RESULTS:50,SEARCH_ALL_RESULTS:50},Mt=c.HISTORY_RESULTS,Bt=c.BOOKMARK_RESULTS,k=c.TAB_RESULTS,Ht=c.SEARCH_ALL_RESULTS,b={DEBOUNCE_DELAY:300,CACHE_TTL:300*1e3,MAX_RETRY_ATTEMPTS:3,RETRY_DELAY:1e3},Ft=b.DEBOUNCE_DELAY,Yt=b.CACHE_TTL,Ut=b.MAX_RETRY_ATTEMPTS,Wt=b.RETRY_DELAY,x={WINDOW_INIT_RETRY_LIMIT:20,WINDOW_INIT_RETRY_DELAY:.1,WINDOW_ACTIVATION_DELAY:.2},P=x.WINDOW_INIT_RETRY_LIMIT,D=x.WINDOW_INIT_RETRY_DELAY,N=x.WINDOW_ACTIVATION_DELAY,yt=()=>{let t=[];return(c.BOOKMARK_RESULTS<1||c.BOOKMARK_RESULTS>1e3)&&t.push(`Bookmark result limit (${c.BOOKMARK_RESULTS}) outside recommended range (1-1000)`),(c.HISTORY_RESULTS<1||c.HISTORY_RESULTS>500)&&t.push(`History result limit (${c.HISTORY_RESULTS}) outside recommended range (1-500)`),(c.TAB_RESULTS<1||c.TAB_RESULTS>200)&&t.push(`Tab result limit (${c.TAB_RESULTS}) outside recommended range (1-200)`),(c.SEARCH_ALL_RESULTS<1||c.SEARCH_ALL_RESULTS>100)&&t.push(`Search all result limit (${c.SEARCH_ALL_RESULTS}) outside recommended range (1-100)`),t.length>0&&console.warn("Memory limit configuration warnings:",t),t};yt();var d=require("@raycast/api");async function ht(){return(await(0,d.getApplications)()).some(({bundleId:e})=>e==="ai.perplexity.comet")}async function E(){if(!await ht()){let t={style:d.Toast.Style.Failure,title:"Comet browser is not installed.",message:"Install it from: https://comet.perplexity.ai/",primaryAction:{title:"Go to https://comet.perplexity.ai/",onAction:e=>{(0,d.open)("https://comet.perplexity.ai/"),e.hide()}}};return await(0,d.showToast)(t),!1}return!0}var At=require("react/jsx-runtime");var bt=require("react/jsx-runtime");var p=require("@raycast/api"),h=require("react/jsx-runtime");function j(){return(0,h.jsx)(p.List,{children:(0,h.jsx)(p.List.EmptyView,{icon:"\u{1F6AB}",title:"Comet browser not installed",description:"This extension requires Comet browser to work. Please install it to continue.",actions:(0,h.jsx)(p.ActionPanel,{children:(0,h.jsx)(p.Action,{title:"Download Comet Browser",onAction:async()=>{await(0,p.open)("https://comet.perplexity.ai/")}})})})})}var l=require("@raycast/api"),w=require("react/jsx-runtime");function q(){return(0,w.jsx)(l.List,{children:(0,w.jsx)(l.List.EmptyView,{icon:"\u26A0\uFE0F",title:"Something went wrong",description:"An unexpected error occurred. Try again or check if Comet browser is properly installed and accessible.",actions:(0,w.jsxs)(l.ActionPanel,{children:[(0,w.jsx)(l.Action,{title:"Open Comet Browser",onAction:async()=>{await(0,l.open)("comet://")}}),(0,w.jsx)(l.Action,{title:"Download Comet Browser",onAction:async()=>{await(0,l.open)("https://comet.perplexity.ai/")}})]})})})}var r=require("@raycast/api");var J=require("@raycast/api");var Q=require("@raycast/utils"),m=class t{constructor(e,o,a,n,i,f){this.title=e;this.url=o;this.favicon=a;this.windowsId=n;this.tabIndex=i;this.sourceLine=f}title;url;favicon;windowsId;tabIndex;sourceLine;static TAB_CONTENTS_SEPARATOR="~~~";static parse(e){let o=e.split(this.TAB_CONTENTS_SEPARATOR);if(o.length<5)throw new Error(`Invalid tab data: expected at least 5 parts but got ${o.length}`);return new t(o[0],o[1],o[2],+o[3],+o[4],e)}key(){return`${this.windowsId}${t.TAB_CONTENTS_SEPARATOR}${this.tabIndex}`}urlWithoutScheme(){return this.url.replace(/(^\w+:|^)\/\//,"").replace("www.","")}realFavicon(){return new URL(this.favicon||"/favicon.ico",this.url).href}defaultFavicon(){return(0,Q.getFavicon)(this.url)}};var y=require("@raycast/utils");async function Z(t){let e=t?`execute t javascript \xAC
        "document.head.querySelector('link[rel~=icon]') ? document.head.querySelector('link[rel~=icon]').href : '';"`:'""';try{let o=Date.now(),n=(await(0,y.runAppleScript)(`
      set _output to ""
      tell application "Comet"
        repeat with w in windows
          set _w_id to get id of w as inches as string
          set _tab_index to 1
          repeat with t in tabs of w
            set _title to get title of t
            set _url to get URL of t
            set _favicon to ${e}
            set _output to (_output & _title & "${m.TAB_CONTENTS_SEPARATOR}" & _url & "${m.TAB_CONTENTS_SEPARATOR}" & _favicon & "${m.TAB_CONTENTS_SEPARATOR}" & _w_id & "${m.TAB_CONTENTS_SEPARATOR}" & _tab_index & "\\n")
            set _tab_index to _tab_index + 1
          end repeat
        end repeat
      end tell
      return _output
  `)).split(`
`).filter(i=>i.length!==0).map(i=>m.parse(i));return console.debug(`Tab extraction took ${Date.now()-o}ms for ${n.length} tabs`),n}catch(o){throw o.message.includes(`Can't get application "Comet"`)?(J.LocalStorage.removeItem("is-installed"),new Error(R)):o}}async function tt(t){await(0,y.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
    end tell
    return true
  `)}async function et(t){await(0,y.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
      close active tab of _wnd
    end tell
    return true
  `)}async function Ot(){await(0,y.runAppleScript)(`
    tell application "Comet"
      -- Check if at least one window exists
      if (count of windows) > 0 then
        make new tab at end of tabs of window 1
        activate
      else
        -- No windows exist, create a new window with a tab
        make new window
        
        -- Wait for window to be fully initialized
        repeat with i from 1 to ${P}
            if (count of windows) > 0 then
                exit repeat
            end if
            delay ${D}
        end repeat
        
        -- Additional small delay to ensure window is ready
        delay ${N}
        activate
      end if
    end tell
    return true
  `)}async function v(t){await(0,y.runAppleScript)(`
    tell application "Comet"
      activate
      open location "${t}"
    end tell
    return true
  `)}async function O(t){try{let e=t?t.replace(/"/g,'\\"').replace(/\\/g,"\\\\"):"";await(0,y.runAppleScript)(`
      tell application "Comet"
          set windowCount to count of windows
          
          if windowCount is 0 then
              -- Create new window and wait for initialization
              make new window
              repeat with i from 1 to ${P}
                  if (count of windows) > 0 then
                      exit repeat
                  end if
                  delay ${D}
              end repeat
              delay ${N}
          else
              activate
          end if

          -- Create tab in the first window
          tell window 1
              ${t?`set newTab to make new tab with properties {URL:"${e}"}`:"make new tab"}
          end tell
      end tell
      return true
    `)}catch(e){console.error("Failed to create tab with profile:",e);try{t?await v(t):await Ot()}catch(o){throw console.error("Fallback tab creation also failed:",o),new Error(`Failed to create tab: ${e instanceof Error?e.message:"Unknown error"}`)}}}var ot=require("@raycast/utils"),s=require("react/jsx-runtime"),S=class{static NewTab=Ct;static TabList=Lt;static TabHistory=It};function Ct({query:t,url:e}){let o="Open Empty Tab";return t?o=`Search "${t}"`:e&&(o=`Open URL "${e}"`),(0,s.jsx)(r.ActionPanel,{title:"New Tab",children:(0,s.jsx)(r.Action,{onAction:async()=>{if(await E())try{if(t){let i=`https://perplexity.ai/search?q=${encodeURIComponent(t)}`;await O(i)}else e?await O(e):await O()}catch(i){throw console.error("Error in NewTabActions:",i),i}},title:o})})}function Lt({tab:t,onTabClosed:e}){return(0,s.jsxs)(r.ActionPanel,{title:t.title,children:[(0,s.jsx)(kt,{tab:t}),(0,s.jsx)(r.Action.CopyToClipboard,{title:"Copy URL",content:t.url}),(0,s.jsx)(r.Action.CopyToClipboard,{title:"Copy Title",content:t.title,shortcut:{modifiers:["cmd","shift"],key:"enter"}}),(0,s.jsx)(xt,{tab:t,onTabClosed:e}),(0,s.jsx)(r.ActionPanel.Section,{children:(0,s.jsx)(r.Action.CreateQuicklink,{quicklink:{link:t.url,name:t.title,application:"Comet"},shortcut:{modifiers:["cmd"],key:"s"}})})]})}function It({title:t,url:e}){let[o,a]=(0,ot.useCachedState)(V,z);return(0,s.jsxs)(r.ActionPanel,{title:t,children:[(0,s.jsx)(r.Action,{icon:K,onAction:async()=>{await E()&&await v(e)},title:"Open"}),(0,s.jsx)(r.Action.CopyToClipboard,{title:"Copy URL",content:e,shortcut:{modifiers:["cmd"],key:"c"}}),(0,s.jsx)(r.ActionPanel.Submenu,{icon:r.Icon.NumberList,title:"Sort by",children:Object.entries(G).map(([i,f])=>(0,s.jsx)(r.Action,{icon:o===i?r.Icon.CheckCircle:r.Icon.Circle,title:f,onAction:()=>a(i)},i))})]})}function kt(t){async function e(){if(await E())try{await tt(t.tab),await(0,r.closeMainWindow)()}catch(a){throw a instanceof Error?new Error("Issue with tab: '"+t.tab.sourceLine+`'
`+a.message):a}}return(0,s.jsx)(r.ActionPanel.Item,{title:"Open Tab",icon:{source:r.Icon.Eye},onAction:e})}function xt(t){async function e(){await E()&&(await et(t.tab),await(0,r.closeMainWindow)(),t.onTabClosed?.())}return(0,s.jsx)(r.Action,{title:"Close Tab",icon:{source:r.Icon.XMarkCircle},onAction:e,shortcut:{modifiers:["cmd","shift"],key:"w"}})}var rt=require("@raycast/utils"),$=require("@raycast/api");var g=require("react/jsx-runtime"),C=class{static TabList=Dt;static TabHistory=Pt};function Pt({profile:t,entry:{url:e,title:o,id:a},type:n}){return(0,g.jsx)($.List.Item,{id:`${t}-${n}-${a}`,title:o,subtitle:e,icon:(0,rt.getFavicon)(e),actions:(0,g.jsx)(S.TabHistory,{title:o,url:e})})}function Dt(t){return(0,g.jsx)($.List.Item,{title:t.tab.title,subtitle:t.tab.urlWithoutScheme(),keywords:[t.tab.urlWithoutScheme()],actions:(0,g.jsx)(S.TabList,{tab:t.tab,onTabClosed:t.onTabClosed}),icon:t.useOriginalFavicon?t.tab.realFavicon():t.tab.defaultFavicon()})}var u=require("react");var nt=require("@raycast/api");var A=require("react");function it(){let[t,e]=(0,A.useState)(null),[o,a]=(0,A.useState)(!0);return(0,A.useEffect)(()=>{let n=!0;return(async()=>{try{let f=await E();n&&(e(f),a(!1))}catch{n&&(e(!1),a(!1))}})(),()=>{n=!1}},[]),{isInstalled:t,isChecking:o,isReady:!o&&t===!0}}var M=require("react/jsx-runtime");function at(t=""){let{useOriginalFavicon:e}=(0,nt.getPreferenceValues)(),[o,a]=(0,u.useState)([]),[n,i]=(0,u.useState)(!0),[f,H]=(0,u.useState)(),{isInstalled:F,isChecking:Y}=it(),U=t.toLowerCase().split(/\s+/),lt=(0,u.useMemo)(()=>o.map(T=>[T,`${T.title.toLowerCase()} ${T.urlWithoutScheme().toLowerCase()}`]).filter(([,T])=>U.reduce((dt,ft)=>dt&&T.includes(ft),!0)).map(([T])=>T).slice(0,k),[o,U]),W=async()=>{if(Y){i(!0);return}if(!F){i(!1);return}i(!0);try{let _=await Z(e);a(_.slice(0,k*2)),i(!1)}catch(_){_ instanceof Error&&_.message===R?H((0,M.jsx)(j,{})):H((0,M.jsx)(q,{})),i(!1)}};return(0,u.useEffect)(()=>{W()},[F,Y]),{data:lt,isLoading:n,errorView:f,revalidate:()=>{i(!0),W()}}}var B=require("react/jsx-runtime");function ct(){let{useOriginalFavicon:t}=(0,L.getPreferenceValues)(),[e,o]=(0,st.useState)(""),{data:a,errorView:n,isLoading:i}=at(e);return n??(0,B.jsx)(L.List,{isLoading:i,onSearchTextChange:o,children:a.map(f=>(0,B.jsx)(C.TabList,{tab:f,useOriginalFavicon:t},f.key()))})}
