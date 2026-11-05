"use strict";var Bt=Object.create;var M=Object.defineProperty;var Mt=Object.getOwnPropertyDescriptor;var vt=Object.getOwnPropertyNames;var $t=Object.getPrototypeOf,Ht=Object.prototype.hasOwnProperty;var Kt=(t,e)=>{for(var r in e)M(t,r,{get:e[r],enumerable:!0})},lt=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of vt(e))!Ht.call(t,n)&&n!==r&&M(t,n,{get:()=>e[n],enumerable:!(o=Mt(e,n))||o.enumerable});return t};var X=(t,e,r)=>(r=t!=null?Bt($t(t)):{},lt(e||!t||!t.__esModule?M(r,"default",{value:t,enumerable:!0}):r,t)),Ft=t=>lt(M({},"__esModule",{value:!0}),t);var ie={};Kt(ie,{default:()=>Dt});module.exports=Ft(ie);var It=require("@raycast/api"),R=require("react");var it=require("@raycast/api");var ot=require("@raycast/api"),I=require("react"),St=require("@raycast/utils");var S=X(require("fs")),h=X(require("path"));var j=["Application Support","Comet"],dt=["Application Support","Comet","Local State"],y="Default",v="COMET_PROFILE_KEY",ft="comet-icon.png",$="BOOKMARK_SORT_ORDER",H="AddedAsc",pt={AddedAsc:"Date Added (ASC)",AddedDes:"Date Added (DES)"},q="Comet browser not installed",k="No bookmarks found in this profile",l={HISTORY_RESULTS:30,BOOKMARK_RESULTS:100,TAB_RESULTS:50,SEARCH_ALL_RESULTS:50},ae=l.HISTORY_RESULTS,mt=l.BOOKMARK_RESULTS,se=l.TAB_RESULTS,ce=l.SEARCH_ALL_RESULTS,K={DEBOUNCE_DELAY:300,CACHE_TTL:300*1e3,MAX_RETRY_ATTEMPTS:3,RETRY_DELAY:1e3},le=K.DEBOUNCE_DELAY,de=K.CACHE_TTL,fe=K.MAX_RETRY_ATTEMPTS,pe=K.RETRY_DELAY,Q={WINDOW_INIT_RETRY_LIMIT:20,WINDOW_INIT_RETRY_DELAY:.1,WINDOW_ACTIVATION_DELAY:.2},J=Q.WINDOW_INIT_RETRY_LIMIT,Z=Q.WINDOW_INIT_RETRY_DELAY,tt=Q.WINDOW_ACTIVATION_DELAY,Ut=()=>{let t=[];return(l.BOOKMARK_RESULTS<1||l.BOOKMARK_RESULTS>1e3)&&t.push(`Bookmark result limit (${l.BOOKMARK_RESULTS}) outside recommended range (1-1000)`),(l.HISTORY_RESULTS<1||l.HISTORY_RESULTS>500)&&t.push(`History result limit (${l.HISTORY_RESULTS}) outside recommended range (1-500)`),(l.TAB_RESULTS<1||l.TAB_RESULTS>200)&&t.push(`Tab result limit (${l.TAB_RESULTS}) outside recommended range (1-200)`),(l.SEARCH_ALL_RESULTS<1||l.SEARCH_ALL_RESULTS>100)&&t.push(`Search all result limit (${l.SEARCH_ALL_RESULTS}) outside recommended range (1-100)`),t.length>0&&console.warn("Memory limit configuration warnings:",t),t};Ut();var d=require("@raycast/api"),et=()=>{if(!process.env.HOME)throw new Error("$HOME environment variable is not set.");return h.default.join(process.env.HOME,"Library")},Yt=(t,e)=>{let{profilePath:r}=(0,d.getPreferenceValues)(),o;return r?o=h.default.join(r,e??y,t):o=h.default.join(et(),...j,e??y,t),o};var ut=()=>h.default.join(et(),...dt),Et=()=>{let{profilePath:t}=(0,d.getPreferenceValues)();return t||h.default.join(et(),...j)},Wt=()=>{try{let t=Et();return S.default.existsSync(t)}catch{return!1}},Tt=()=>{try{let t=Et();if(!S.default.existsSync(t))return[];let e=S.default.readdirSync(t),r=[];return e.includes("Default")&&r.push("Default"),e.filter(o=>{try{let n=h.default.join(t,o);return S.default.statSync(n).isDirectory()&&(o.startsWith("Profile ")||o==="Default")}catch{return!1}}).forEach(o=>{o!=="Default"&&r.push(o)}),r}catch{return[]}};var Vt=t=>Yt("Bookmarks",t);function wt(t,e,r={count:0}){if(e!==void 0&&r.count>=e)return[];if(t.type==="url"&&t.url){let o={id:t.id,url:t.url,title:t.name,dateAdded:t.date_added};return r.count++,[o]}if(t.type==="folder"){let o=[];for(let n of t.children){if(e!==void 0&&r.count>=e)break;let i=wt(n,e,r);o.push(...i)}return o}return[]}var Gt=(t,e)=>{let r=[],o=0;for(let n of Object.keys(t.roots)){if(e!==void 0&&o>=e)break;let i=t.roots[n],s=wt(i,e,{count:o});r.push(...s),o+=s.length}return r},_t=async(t,e)=>{let r=Date.now();try{let o=Vt(t);if(!S.default.existsSync(o))throw new Error(k);let n=await S.default.promises.readFile(o,{encoding:"utf-8"}),i=Gt(JSON.parse(n),e);if(i.length===0)throw new Error(k);return console.debug(`Bookmark extraction took ${Date.now()-r}ms for ${i.length} items`),i}catch(o){throw console.error(`Bookmark extraction failed after ${Date.now()-r}ms:`,o),o instanceof SyntaxError?console.error("Invalid bookmark file format:",o):o&&typeof o=="object"&&"code"in o&&o.code==="ENOENT"?console.error("Bookmark file not found:",o):o&&typeof o=="object"&&"code"in o&&o.code==="EACCES"&&console.error("Permission denied accessing bookmark file:",o),new Error(k)}};async function zt(){return(await(0,d.getApplications)()).some(({bundleId:e})=>e==="ai.perplexity.comet")}async function yt(){let{profilePath:t}=(0,d.getPreferenceValues)();if(t&&!Wt()){let e={style:d.Toast.Style.Failure,title:"Comet profile directory not found.",message:"Please check your profile path in extension settings.",primaryAction:{title:"Open Extension Settings",onAction:r=>{(0,d.openExtensionPreferences)(),r.hide()}}};return await(0,d.showToast)(e),!1}return!0}async function A(){if(!await zt()){let t={style:d.Toast.Style.Failure,title:"Comet browser is not installed.",message:"Install it from: https://comet.perplexity.ai/",primaryAction:{title:"Go to https://comet.perplexity.ai/",onAction:e=>{(0,d.open)("https://comet.perplexity.ai/"),e.hide()}}};return await(0,d.showToast)(t),!1}return!0}var F=X(require("fs")),rt=require("react/jsx-runtime");function D({onProfileSelected:t}){let[e,r]=(0,St.useCachedState)(v,y),[o,n]=(0,I.useState)([]);return(0,I.useEffect)(()=>{let i=Tt(),s=[];try{let p=ut();if(F.existsSync(p)){let O=F.readFileSync(p,"utf-8"),E=JSON.parse(O);if(E.profile?.info_cache){let C=E.profile.info_cache;s=i.map(f=>{let _=C[f];return{id:f,name:_?.name||(f==="Default"?"Default":f)}})}}}catch{}s.length===0&&(s=i.map(p=>({name:p==="Default"?"Default":p.startsWith("Profile ")?p:`Profile ${p}`,id:p}))),s.length===0&&s.push({id:y,name:"Default"}),n(s),!e&&s.length>0&&r(s[0].id)},[]),(0,I.useEffect)(()=>{e&&o.length>0&&t?.(e)},[e,o]),(0,rt.jsx)(ot.List.Dropdown,{tooltip:"Select Comet Profile",value:e,onChange:r,children:o.map(i=>(0,rt.jsx)(ot.List.Dropdown.Item,{value:i.id,title:i.name},i.id))})}var U=require("react/jsx-runtime");function ht({onProfileSelected:t}){return(0,U.jsx)(it.List,{searchBarAccessory:(0,U.jsx)(D,{onProfileSelected:t}),children:(0,U.jsx)(it.List.EmptyView,{icon:"\u{1F4C2}",title:"No bookmarks found",description:"This profile doesn't have any bookmarks yet. You can add some bookmarks in Comet browser or select a different profile."})})}var T=require("@raycast/api"),P=require("react/jsx-runtime");function At(){return(0,P.jsx)(T.List,{children:(0,P.jsx)(T.List.EmptyView,{icon:"\u{1F6AB}",title:"Comet browser not installed",description:"This extension requires Comet browser to work. Please install it to continue.",actions:(0,P.jsx)(T.ActionPanel,{children:(0,P.jsx)(T.Action,{title:"Download Comet Browser",onAction:async()=>{await(0,T.open)("https://comet.perplexity.ai/")}})})})})}var m=require("@raycast/api"),g=require("react/jsx-runtime");function gt(){return(0,g.jsx)(m.List,{children:(0,g.jsx)(m.List.EmptyView,{icon:"\u26A0\uFE0F",title:"Something went wrong",description:"An unexpected error occurred. Try again or check if Comet browser is properly installed and accessible.",actions:(0,g.jsxs)(m.ActionPanel,{children:[(0,g.jsx)(m.Action,{title:"Open Comet Browser",onAction:async()=>{await(0,m.open)("comet://")}}),(0,g.jsx)(m.Action,{title:"Download Comet Browser",onAction:async()=>{await(0,m.open)("https://comet.perplexity.ai/")}})]})})})}var a=require("@raycast/api");var jt=require("@raycast/api");var Xt=require("@raycast/utils");var b=require("@raycast/utils");async function Rt(t){await(0,b.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
    end tell
    return true
  `)}async function Ot(t){await(0,b.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
      close active tab of _wnd
    end tell
    return true
  `)}async function qt(){await(0,b.runAppleScript)(`
    tell application "Comet"
      -- Check if at least one window exists
      if (count of windows) > 0 then
        make new tab at end of tabs of window 1
        activate
      else
        -- No windows exist, create a new window with a tab
        make new window
        
        -- Wait for window to be fully initialized
        repeat with i from 1 to ${J}
            if (count of windows) > 0 then
                exit repeat
            end if
            delay ${Z}
        end repeat
        
        -- Additional small delay to ensure window is ready
        delay ${tt}
        activate
      end if
    end tell
    return true
  `)}async function nt(t){await(0,b.runAppleScript)(`
    tell application "Comet"
      activate
      open location "${t}"
    end tell
    return true
  `)}async function Y(t){try{let e=t?t.replace(/"/g,'\\"').replace(/\\/g,"\\\\"):"";await(0,b.runAppleScript)(`
      tell application "Comet"
          set windowCount to count of windows
          
          if windowCount is 0 then
              -- Create new window and wait for initialization
              make new window
              repeat with i from 1 to ${J}
                  if (count of windows) > 0 then
                      exit repeat
                  end if
                  delay ${Z}
              end repeat
              delay ${tt}
          else
              activate
          end if

          -- Create tab in the first window
          tell window 1
              ${t?`set newTab to make new tab with properties {URL:"${e}"}`:"make new tab"}
          end tell
      end tell
      return true
    `)}catch(e){console.error("Failed to create tab with profile:",e);try{t?await nt(t):await qt()}catch(r){throw console.error("Fallback tab creation also failed:",r),new Error(`Failed to create tab: ${e instanceof Error?e.message:"Unknown error"}`)}}}var Ct=require("@raycast/utils"),c=require("react/jsx-runtime"),x=class{static NewTab=Qt;static TabList=Jt;static TabHistory=Zt};function Qt({query:t,url:e}){let r="Open Empty Tab";return t?r=`Search "${t}"`:e&&(r=`Open URL "${e}"`),(0,c.jsx)(a.ActionPanel,{title:"New Tab",children:(0,c.jsx)(a.Action,{onAction:async()=>{if(await A())try{if(t){let i=`https://perplexity.ai/search?q=${encodeURIComponent(t)}`;await Y(i)}else e?await Y(e):await Y()}catch(i){throw console.error("Error in NewTabActions:",i),i}},title:r})})}function Jt({tab:t,onTabClosed:e}){return(0,c.jsxs)(a.ActionPanel,{title:t.title,children:[(0,c.jsx)(te,{tab:t}),(0,c.jsx)(a.Action.CopyToClipboard,{title:"Copy URL",content:t.url}),(0,c.jsx)(a.Action.CopyToClipboard,{title:"Copy Title",content:t.title,shortcut:{modifiers:["cmd","shift"],key:"enter"}}),(0,c.jsx)(ee,{tab:t,onTabClosed:e}),(0,c.jsx)(a.ActionPanel.Section,{children:(0,c.jsx)(a.Action.CreateQuicklink,{quicklink:{link:t.url,name:t.title,application:"Comet"},shortcut:{modifiers:["cmd"],key:"s"}})})]})}function Zt({title:t,url:e}){let[r,o]=(0,Ct.useCachedState)($,H);return(0,c.jsxs)(a.ActionPanel,{title:t,children:[(0,c.jsx)(a.Action,{icon:ft,onAction:async()=>{await A()&&await nt(e)},title:"Open"}),(0,c.jsx)(a.Action.CopyToClipboard,{title:"Copy URL",content:e,shortcut:{modifiers:["cmd"],key:"c"}}),(0,c.jsx)(a.ActionPanel.Submenu,{icon:a.Icon.NumberList,title:"Sort by",children:Object.entries(pt).map(([i,s])=>(0,c.jsx)(a.Action,{icon:r===i?a.Icon.CheckCircle:a.Icon.Circle,title:s,onAction:()=>o(i)},i))})]})}function te(t){async function e(){if(await A())try{await Rt(t.tab),await(0,a.closeMainWindow)()}catch(o){throw o instanceof Error?new Error("Issue with tab: '"+t.tab.sourceLine+`'
`+o.message):o}}return(0,c.jsx)(a.ActionPanel.Item,{title:"Open Tab",icon:{source:a.Icon.Eye},onAction:e})}function ee(t){async function e(){await A()&&(await Ot(t.tab),await(0,a.closeMainWindow)(),t.onTabClosed?.())}return(0,c.jsx)(a.Action,{title:"Close Tab",icon:{source:a.Icon.XMarkCircle},onAction:e,shortcut:{modifiers:["cmd","shift"],key:"w"}})}var kt=require("@raycast/utils"),at=require("@raycast/api");var N=require("react/jsx-runtime"),W=class{static TabList=re;static TabHistory=oe};function oe({profile:t,entry:{url:e,title:r,id:o},type:n}){return(0,N.jsx)(at.List.Item,{id:`${t}-${n}-${o}`,title:r,subtitle:e,icon:(0,kt.getFavicon)(e),actions:(0,N.jsx)(x.TabHistory,{title:r,url:e})})}function re(t){return(0,N.jsx)(at.List.Item,{title:t.tab.title,subtitle:t.tab.urlWithoutScheme(),keywords:[t.tab.urlWithoutScheme()],actions:(0,N.jsx)(x.TabList,{tab:t.tab,onTabClosed:t.onTabClosed}),icon:t.useOriginalFavicon?t.tab.realFavicon():t.tab.defaultFavicon()})}var w=require("react");var B=require("react");function bt(){let[t,e]=(0,B.useState)(null),[r,o]=(0,B.useState)(!0);return(0,B.useEffect)(()=>{let n=!0;return(async()=>{try{let s=await A();n&&(e(s),o(!1))}catch{n&&(e(!1),o(!1))}})(),()=>{n=!1}},[]),{isInstalled:t,isChecking:r,isReady:!r&&t===!0}}var V=require("react/jsx-runtime");function Lt(t,e){let[r,o]=(0,w.useState)([]),[n,i]=(0,w.useState)(!0),[s,p]=(0,w.useState)(e),[O,E]=(0,w.useState)(),{isInstalled:C,isChecking:f}=bt(),_=(0,w.useCallback)(L=>{p(L)},[]);return(0,w.useEffect)(()=>{(async()=>{if(E(void 0),f){i(!0);return}if(!C){i(!1);return}i(!0);try{let u=await _t(s,mt),z=t?.toLowerCase()||"",Pt=z?u.filter(ct=>{let xt=ct.title.toLowerCase(),Nt=ct.url.toLowerCase();return xt.includes(z)||Nt.includes(z)}):u;o(Pt),i(!1)}catch(u){u instanceof Error&&u.message===q?E((0,V.jsx)(At,{})):u instanceof Error&&u.message===k?E((0,V.jsx)(ht,{onProfileSelected:_})):E((0,V.jsx)(gt,{})),i(!1)}})()},[s,t,C,f]),{errorView:O,isLoading:n,data:r,revalidate:_}}var st=require("@raycast/utils");var G=require("react/jsx-runtime");function Dt(){let[t,e]=(0,R.useState)(null),[r,o]=(0,R.useState)(""),[n]=(0,st.useCachedState)(v,y),[i]=(0,st.useCachedState)($,H);(0,R.useEffect)(()=>{(async()=>{let _=await yt();e(_)})()},[]);let{data:s,isLoading:p,errorView:O,revalidate:E}=Lt(r,n),C=(0,R.useMemo)(()=>(s??[]).sort((f,_)=>{let L=parseInt(f.dateAdded,10),u=parseInt(_.dateAdded,10);switch(i){case"AddedAsc":return L-u;case"AddedDes":return u-L}}),[s,i]);return t===null||!t?null:O||(0,G.jsx)(It.List,{onSearchTextChange:o,isLoading:p,throttle:!0,searchBarAccessory:(0,G.jsx)(D,{onProfileSelected:E}),children:C.map(f=>(0,G.jsx)(W.TabHistory,{entry:f,profile:n,type:"Bookmark"},f.id))})}
