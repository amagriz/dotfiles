"use strict";var Xt=Object.create;var G=Object.defineProperty;var zt=Object.getOwnPropertyDescriptor;var Gt=Object.getOwnPropertyNames;var qt=Object.getPrototypeOf,jt=Object.prototype.hasOwnProperty;var Qt=(t,e)=>{for(var o in e)G(t,o,{get:e[o],enumerable:!0})},Tt=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Gt(e))!jt.call(t,n)&&n!==o&&G(t,n,{get:()=>e[n],enumerable:!(r=zt(e,n))||r.enumerable});return t};var F=(t,e,o)=>(o=t!=null?Xt(qt(t)):{},Tt(e||!t||!t.__esModule?G(o,"default",{value:t,enumerable:!0}):o,t)),Jt=t=>Tt(G({},"__esModule",{value:!0}),t);var Ee={};Qt(Ee,{default:()=>Kt});module.exports=Jt(Ee);var M=require("react"),h=require("@raycast/api");var W=F(require("fs")),Lt=require("child_process"),I=F(require("@raycast/api")),It=require("@raycast/utils"),kt=require("@raycast/utils/dist/handle-error-toast-action"),L=require("react");var Y=F(require("fs")),x=F(require("path"));var ot=["Application Support","Comet"],Et=["Application Support","Comet","Local State"],C="Default",q="COMET_PROFILE_KEY",yt="comet-icon.png",wt="BOOKMARK_SORT_ORDER",ht="AddedAsc",St={AddedAsc:"Date Added (ASC)",AddedDes:"Date Added (DES)"},j="Comet browser not installed";var m={HISTORY_RESULTS:30,BOOKMARK_RESULTS:100,TAB_RESULTS:50,SEARCH_ALL_RESULTS:50},gt=m.HISTORY_RESULTS,he=m.BOOKMARK_RESULTS,rt=m.TAB_RESULTS,Se=m.SEARCH_ALL_RESULTS,Q={DEBOUNCE_DELAY:300,CACHE_TTL:300*1e3,MAX_RETRY_ATTEMPTS:3,RETRY_DELAY:1e3},ge=Q.DEBOUNCE_DELAY,_e=Q.CACHE_TTL,Ae=Q.MAX_RETRY_ATTEMPTS,Re=Q.RETRY_DELAY,it={WINDOW_INIT_RETRY_LIMIT:20,WINDOW_INIT_RETRY_DELAY:.1,WINDOW_ACTIVATION_DELAY:.2},nt=it.WINDOW_INIT_RETRY_LIMIT,st=it.WINDOW_INIT_RETRY_DELAY,at=it.WINDOW_ACTIVATION_DELAY,Zt=()=>{let t=[];return(m.BOOKMARK_RESULTS<1||m.BOOKMARK_RESULTS>1e3)&&t.push(`Bookmark result limit (${m.BOOKMARK_RESULTS}) outside recommended range (1-1000)`),(m.HISTORY_RESULTS<1||m.HISTORY_RESULTS>500)&&t.push(`History result limit (${m.HISTORY_RESULTS}) outside recommended range (1-500)`),(m.TAB_RESULTS<1||m.TAB_RESULTS>200)&&t.push(`Tab result limit (${m.TAB_RESULTS}) outside recommended range (1-200)`),(m.SEARCH_ALL_RESULTS<1||m.SEARCH_ALL_RESULTS>100)&&t.push(`Search all result limit (${m.SEARCH_ALL_RESULTS}) outside recommended range (1-100)`),t.length>0&&console.warn("Memory limit configuration warnings:",t),t};Zt();var p=require("@raycast/api"),lt=()=>{if(!process.env.HOME)throw new Error("$HOME environment variable is not set.");return x.default.join(process.env.HOME,"Library")},te=(t,e)=>{let{profilePath:o}=(0,p.getPreferenceValues)(),r;return o?r=x.default.join(o,e??C,t):r=x.default.join(lt(),...ot,e??C,t),r},_t=t=>te("History",t),At=()=>x.default.join(lt(),...Et),Rt=()=>{let{profilePath:t}=(0,p.getPreferenceValues)();return t||x.default.join(lt(),...ot)},ee=()=>{try{let t=Rt();return Y.default.existsSync(t)}catch{return!1}},bt=()=>{try{let t=Rt();if(!Y.default.existsSync(t))return[];let e=Y.default.readdirSync(t),o=[];return e.includes("Default")&&o.push("Default"),e.filter(r=>{try{let n=x.default.join(t,r);return Y.default.statSync(n).isDirectory()&&(r.startsWith("Profile ")||r==="Default")}catch{return!1}}).forEach(r=>{r!=="Default"&&o.push(r)}),o}catch{return[]}};async function oe(){return(await(0,p.getApplications)()).some(({bundleId:e})=>e==="ai.perplexity.comet")}async function Ot(){let{profilePath:t}=(0,p.getPreferenceValues)();if(t&&!ee()){let e={style:p.Toast.Style.Failure,title:"Comet profile directory not found.",message:"Please check your profile path in extension settings.",primaryAction:{title:"Open Extension Settings",onAction:o=>{(0,p.openExtensionPreferences)(),o.hide()}}};return await(0,p.showToast)(e),!1}return!0}async function D(){if(!await oe()){let t={style:p.Toast.Style.Failure,title:"Comet browser is not installed.",message:"Install it from: https://comet.perplexity.ai/",primaryAction:{title:"Go to https://comet.perplexity.ai/",onAction:e=>{(0,p.open)("https://comet.perplexity.ai/"),e.hide()}}};return await(0,p.showToast)(t),!1}return!0}var Ct=(t,e,o)=>{if(o.length===0||o.length===1&&o[0]==="")return`SELECT id, url, title FROM ${t} WHERE last_visit_time > 0 ORDER BY ${e} DESC LIMIT 30;`;let n=o.map(i=>i.replace(/'/g,"''").replace(/"/g,'""').replace(/\\/g,"\\\\").replace(/%/g,"\\%").replace(/_/g,"\\_")).map(i=>`(title LIKE '%${i}%' OR url LIKE '%${i}%')`).join(" AND ");return`SELECT id, url, title FROM ${t} WHERE ${n} AND last_visit_time > 0 ORDER BY ${e} DESC LIMIT 30;`};var U=require("react");function J(){let[t,e]=(0,U.useState)(null),[o,r]=(0,U.useState)(!0);return(0,U.useEffect)(()=>{let n=!0;return(async()=>{try{let l=await D();n&&(e(l),r(!1))}catch{n&&(e(!1),r(!1))}})(),()=>{n=!1}},[]),{isInstalled:t,isChecking:o,isReady:!o&&t===!0}}var $="/tmp/comet-raycast-empty.db",re=()=>{if(!W.existsSync($))try{(0,Lt.execSync)(`sqlite3 "${$}" "CREATE TABLE IF NOT EXISTS urls (id TEXT, url TEXT, title TEXT, last_visit_time INTEGER);"`)}catch{W.writeFileSync($,"")}};re();var ie=(t,e,o=!0)=>{let r=e?e.trim().split(" ").filter(H=>H.length>0):[""],n=Ct("urls","last_visit_time",r),i=_t(t),{isInstalled:l,isChecking:c}=J(),[O,S]=(0,L.useState)(!1),[A,u]=(0,L.useState)(0),[d,g]=(0,L.useState)(null);(0,L.useEffect)(()=>()=>{d&&(clearTimeout(d),g(null))},[d]);let E=(0,L.useMemo)(()=>o&&W.existsSync(i)?i:$,[o,i]),{data:T,isLoading:s,permissionView:y,revalidate:B}=(0,It.useSQL)(E,n,{onData(){S(!1),u(0),d&&(clearTimeout(d),g(null))},onError(H){if(A<1){S(!0),u(A+1);let Vt=setTimeout(()=>{B(),d&&clearTimeout(d),g(null)},1e3);g(Vt)}else S(!1),u(0),d&&(clearTimeout(d),g(null)),I.environment.launchType!==I.LaunchType.Background&&I.showToast({style:I.Toast.Style.Failure,title:"Failed to load history",message:H.message,primaryAction:(0,kt.handleErrorToastAction)(H)})}});return o?c?{isLoading:!0,data:[],errorView:void 0,revalidate:B}:l?E===$&&o?{isLoading:!1,data:[],errorView:void 0,revalidate:B}:{data:(T||[]).slice(0,gt),isLoading:s||O,errorView:y,revalidate:B}:{isLoading:!1,data:[],errorView:void 0,revalidate:B}:{data:[],isLoading:!1,errorView:void 0,revalidate:()=>{}}};function Pt(t,e,o=!0){return ie(t,e,o)}var ne=require("@raycast/api");var ct=require("@raycast/api"),K=require("react"),xt=require("@raycast/utils");var Z=F(require("fs")),ft=require("react/jsx-runtime");function tt({onProfileSelected:t}){let[e,o]=(0,xt.useCachedState)(q,C),[r,n]=(0,K.useState)([]);return(0,K.useEffect)(()=>{let i=bt(),l=[];try{let c=At();if(Z.existsSync(c)){let O=Z.readFileSync(c,"utf-8"),S=JSON.parse(O);if(S.profile?.info_cache){let A=S.profile.info_cache;l=i.map(u=>{let d=A[u];return{id:u,name:d?.name||(u==="Default"?"Default":u)}})}}}catch{}l.length===0&&(l=i.map(c=>({name:c==="Default"?"Default":c.startsWith("Profile ")?c:`Profile ${c}`,id:c}))),l.length===0&&l.push({id:C,name:"Default"}),n(l),!e&&l.length>0&&o(l[0].id)},[]),(0,K.useEffect)(()=>{e&&r.length>0&&t?.(e)},[e,r]),(0,ft.jsx)(ct.List.Dropdown,{tooltip:"Select Comet Profile",value:e,onChange:o,children:r.map(i=>(0,ft.jsx)(ct.List.Dropdown.Item,{value:i.id,title:i.name},i.id))})}var se=require("react/jsx-runtime");var R=require("@raycast/api"),V=require("react/jsx-runtime");function Dt(){return(0,V.jsx)(R.List,{children:(0,V.jsx)(R.List.EmptyView,{icon:"\u{1F6AB}",title:"Comet browser not installed",description:"This extension requires Comet browser to work. Please install it to continue.",actions:(0,V.jsx)(R.ActionPanel,{children:(0,V.jsx)(R.Action,{title:"Download Comet Browser",onAction:async()=>{await(0,R.open)("https://comet.perplexity.ai/")}})})})})}var _=require("@raycast/api"),N=require("react/jsx-runtime");function Nt(){return(0,N.jsx)(_.List,{children:(0,N.jsx)(_.List.EmptyView,{icon:"\u26A0\uFE0F",title:"Something went wrong",description:"An unexpected error occurred. Try again or check if Comet browser is properly installed and accessible.",actions:(0,N.jsxs)(_.ActionPanel,{children:[(0,N.jsx)(_.Action,{title:"Open Comet Browser",onAction:async()=>{await(0,_.open)("comet://")}}),(0,N.jsx)(_.Action,{title:"Download Comet Browser",onAction:async()=>{await(0,_.open)("https://comet.perplexity.ai/")}})]})})})}var a=require("@raycast/api");var Mt=require("@raycast/api");var vt=require("@raycast/utils"),k=class t{constructor(e,o,r,n,i,l){this.title=e;this.url=o;this.favicon=r;this.windowsId=n;this.tabIndex=i;this.sourceLine=l}title;url;favicon;windowsId;tabIndex;sourceLine;static TAB_CONTENTS_SEPARATOR="~~~";static parse(e){let o=e.split(this.TAB_CONTENTS_SEPARATOR);if(o.length<5)throw new Error(`Invalid tab data: expected at least 5 parts but got ${o.length}`);return new t(o[0],o[1],o[2],+o[3],+o[4],e)}key(){return`${this.windowsId}${t.TAB_CONTENTS_SEPARATOR}${this.tabIndex}`}urlWithoutScheme(){return this.url.replace(/(^\w+:|^)\/\//,"").replace("www.","")}realFavicon(){return new URL(this.favicon||"/favicon.ico",this.url).href}defaultFavicon(){return(0,vt.getFavicon)(this.url)}};var v=require("@raycast/utils");async function $t(t){let e=t?`execute t javascript \xAC
        "document.head.querySelector('link[rel~=icon]') ? document.head.querySelector('link[rel~=icon]').href : '';"`:'""';try{let o=Date.now(),n=(await(0,v.runAppleScript)(`
      set _output to ""
      tell application "Comet"
        repeat with w in windows
          set _w_id to get id of w as inches as string
          set _tab_index to 1
          repeat with t in tabs of w
            set _title to get title of t
            set _url to get URL of t
            set _favicon to ${e}
            set _output to (_output & _title & "${k.TAB_CONTENTS_SEPARATOR}" & _url & "${k.TAB_CONTENTS_SEPARATOR}" & _favicon & "${k.TAB_CONTENTS_SEPARATOR}" & _w_id & "${k.TAB_CONTENTS_SEPARATOR}" & _tab_index & "\\n")
            set _tab_index to _tab_index + 1
          end repeat
        end repeat
      end tell
      return _output
  `)).split(`
`).filter(i=>i.length!==0).map(i=>k.parse(i));return console.debug(`Tab extraction took ${Date.now()-o}ms for ${n.length} tabs`),n}catch(o){throw o.message.includes(`Can't get application "Comet"`)?(Mt.LocalStorage.removeItem("is-installed"),new Error(j)):o}}async function Bt(t){await(0,v.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
    end tell
    return true
  `)}async function Ht(t){await(0,v.runAppleScript)(`
    tell application "Comet"
      activate
      set _wnd to first window where id is ${t.windowsId}
      set index of _wnd to 1
      set active tab index of _wnd to ${t.tabIndex}
      close active tab of _wnd
    end tell
    return true
  `)}async function ae(){await(0,v.runAppleScript)(`
    tell application "Comet"
      -- Check if at least one window exists
      if (count of windows) > 0 then
        make new tab at end of tabs of window 1
        activate
      else
        -- No windows exist, create a new window with a tab
        make new window
        
        -- Wait for window to be fully initialized
        repeat with i from 1 to ${nt}
            if (count of windows) > 0 then
                exit repeat
            end if
            delay ${st}
        end repeat
        
        -- Additional small delay to ensure window is ready
        delay ${at}
        activate
      end if
    end tell
    return true
  `)}async function dt(t){await(0,v.runAppleScript)(`
    tell application "Comet"
      activate
      open location "${t}"
    end tell
    return true
  `)}async function et(t){try{let e=t?t.replace(/"/g,'\\"').replace(/\\/g,"\\\\"):"";await(0,v.runAppleScript)(`
      tell application "Comet"
          set windowCount to count of windows
          
          if windowCount is 0 then
              -- Create new window and wait for initialization
              make new window
              repeat with i from 1 to ${nt}
                  if (count of windows) > 0 then
                      exit repeat
                  end if
                  delay ${st}
              end repeat
              delay ${at}
          else
              activate
          end if

          -- Create tab in the first window
          tell window 1
              ${t?`set newTab to make new tab with properties {URL:"${e}"}`:"make new tab"}
          end tell
      end tell
      return true
    `)}catch(e){console.error("Failed to create tab with profile:",e);try{t?await dt(t):await ae()}catch(o){throw console.error("Fallback tab creation also failed:",o),new Error(`Failed to create tab: ${e instanceof Error?e.message:"Unknown error"}`)}}}var Ft=require("@raycast/utils"),f=require("react/jsx-runtime"),b=class{static NewTab=le;static TabList=ce;static TabHistory=fe};function le({query:t,url:e}){let o="Open Empty Tab";return t?o=`Search "${t}"`:e&&(o=`Open URL "${e}"`),(0,f.jsx)(a.ActionPanel,{title:"New Tab",children:(0,f.jsx)(a.Action,{onAction:async()=>{if(await D())try{if(t){let i=`https://perplexity.ai/search?q=${encodeURIComponent(t)}`;await et(i)}else e?await et(e):await et()}catch(i){throw console.error("Error in NewTabActions:",i),i}},title:o})})}function ce({tab:t,onTabClosed:e}){return(0,f.jsxs)(a.ActionPanel,{title:t.title,children:[(0,f.jsx)(de,{tab:t}),(0,f.jsx)(a.Action.CopyToClipboard,{title:"Copy URL",content:t.url}),(0,f.jsx)(a.Action.CopyToClipboard,{title:"Copy Title",content:t.title,shortcut:{modifiers:["cmd","shift"],key:"enter"}}),(0,f.jsx)(me,{tab:t,onTabClosed:e}),(0,f.jsx)(a.ActionPanel.Section,{children:(0,f.jsx)(a.Action.CreateQuicklink,{quicklink:{link:t.url,name:t.title,application:"Comet"},shortcut:{modifiers:["cmd"],key:"s"}})})]})}function fe({title:t,url:e}){let[o,r]=(0,Ft.useCachedState)(wt,ht);return(0,f.jsxs)(a.ActionPanel,{title:t,children:[(0,f.jsx)(a.Action,{icon:yt,onAction:async()=>{await D()&&await dt(e)},title:"Open"}),(0,f.jsx)(a.Action.CopyToClipboard,{title:"Copy URL",content:e,shortcut:{modifiers:["cmd"],key:"c"}}),(0,f.jsx)(a.ActionPanel.Submenu,{icon:a.Icon.NumberList,title:"Sort by",children:Object.entries(St).map(([i,l])=>(0,f.jsx)(a.Action,{icon:o===i?a.Icon.CheckCircle:a.Icon.Circle,title:l,onAction:()=>r(i)},i))})]})}function de(t){async function e(){if(await D())try{await Bt(t.tab),await(0,a.closeMainWindow)()}catch(r){throw r instanceof Error?new Error("Issue with tab: '"+t.tab.sourceLine+`'
`+r.message):r}}return(0,f.jsx)(a.ActionPanel.Item,{title:"Open Tab",icon:{source:a.Icon.Eye},onAction:e})}function me(t){async function e(){await D()&&(await Ht(t.tab),await(0,a.closeMainWindow)(),t.onTabClosed?.())}return(0,f.jsx)(a.Action,{title:"Close Tab",icon:{source:a.Icon.XMarkCircle},onAction:e,shortcut:{modifiers:["cmd","shift"],key:"w"}})}var Yt=require("@raycast/utils"),mt=require("@raycast/api");var z=require("react/jsx-runtime"),X=class{static TabList=ue;static TabHistory=pe};function pe({profile:t,entry:{url:e,title:o,id:r},type:n}){return(0,z.jsx)(mt.List.Item,{id:`${t}-${n}-${r}`,title:o,subtitle:e,icon:(0,Yt.getFavicon)(e),actions:(0,z.jsx)(b.TabHistory,{title:o,url:e})})}function ue(t){return(0,z.jsx)(mt.List.Item,{title:t.tab.title,subtitle:t.tab.urlWithoutScheme(),keywords:[t.tab.urlWithoutScheme()],actions:(0,z.jsx)(b.TabList,{tab:t.tab,onTabClosed:t.onTabClosed}),icon:t.useOriginalFavicon?t.tab.realFavicon():t.tab.defaultFavicon()})}var P=require("react");var Ut=require("@raycast/api");var pt=require("react/jsx-runtime");function Wt(t=""){let{useOriginalFavicon:e}=(0,Ut.getPreferenceValues)(),[o,r]=(0,P.useState)([]),[n,i]=(0,P.useState)(!0),[l,c]=(0,P.useState)(),{isInstalled:O,isChecking:S}=J(),A=t.toLowerCase().split(/\s+/),u=(0,P.useMemo)(()=>o.map(T=>[T,`${T.title.toLowerCase()} ${T.urlWithoutScheme().toLowerCase()}`]).filter(([,T])=>A.reduce((s,y)=>s&&T.includes(y),!0)).map(([T])=>T).slice(0,rt),[o,A]),d=async()=>{if(S){i(!0);return}if(!O){i(!1);return}i(!0);try{let E=await $t(e);r(E.slice(0,rt*2)),i(!1)}catch(E){E instanceof Error&&E.message===j?c((0,pt.jsx)(Dt,{})):c((0,pt.jsx)(Nt,{})),i(!1)}};return(0,P.useEffect)(()=>{d()},[O,S]),{data:u,isLoading:n,errorView:l,revalidate:()=>{i(!0),d()}}}var ut=require("@raycast/utils");var w=require("react/jsx-runtime");function Te(t,e){if(!e||e.length===0)return[];let o=e.findIndex(r=>r?.profile?.id===t);if(o>0){let[r]=e.splice(o,1);e.unshift(r)}return e}function Kt(){let{useOriginalFavicon:t}=(0,h.getPreferenceValues)(),[e,o]=(0,M.useState)(null),[r,n]=(0,M.useState)(""),[i]=(0,ut.useCachedState)("COMET_PROFILES",[]),[l]=(0,ut.useCachedState)(q,C);(0,M.useEffect)(()=>{(async()=>{let y=await Ot();o(y)})()},[]);let c=Pt(l,r,!0),{data:O,isLoading:S,errorView:A}=Wt(),u=(0,M.useMemo)(()=>{if(!i||!l||!c)return[];let s=i.find(y=>y?.id===l);return s?[{data:c.data,isLoading:c.isLoading,errorView:c.errorView,revalidate:c.revalidate||(()=>{}),profile:s}]:[]},[i,l,c]);if(e===null||!e)return null;let d=s=>/^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i.test(s.trim()),g,E,T;if(!r||r.trim()==="")g="Open Empty Tab",T=h.Icon.Plus,E=(0,w.jsx)(b.NewTab,{});else if(d(r)){let s=r.startsWith("http")?r:`https://${r}`;g=`Open "${r}"`,T=h.Icon.Globe,E=(0,w.jsx)(b.NewTab,{url:s})}else g=`Search "${r}" with Perplexity`,T=h.Icon.MagnifyingGlass,E=(0,w.jsx)(b.NewTab,{query:r});if(A||u?.some(s=>s.errorView)){let s=u?.find(y=>y.errorView)?.errorView;return A||s}return(0,w.jsxs)(h.List,{onSearchTextChange:n,isLoading:S||u?.find(s=>s.isLoading)?.isLoading,searchBarAccessory:(0,w.jsx)(tt,{}),children:[(0,w.jsx)(h.List.Section,{title:"New Tab",children:(0,w.jsx)(h.List.Item,{title:g,icon:T,actions:E})},"new-tab"),(0,w.jsx)(h.List.Section,{title:"Open Tabs - All",children:O?.map(s=>(0,w.jsx)(X.TabList,{tab:s,useOriginalFavicon:t},s.key()))},"open-tabs"),Te(l,u).filter(s=>s?.profile?.id).map(s=>(0,w.jsx)(h.List.Section,{title:`History - ${s.profile.name}`,children:s.data?.map(y=>(0,w.jsx)(X.TabHistory,{entry:y,profile:s.profile.id,type:"History"},`${s.profile.id}-${y.id}`))},s.profile.id))]})}
