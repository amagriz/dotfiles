"use strict";var S=Object.create;var m=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,C=Object.prototype.hasOwnProperty;var E=(t,e)=>{for(var n in e)m(t,n,{get:e[n],enumerable:!0})},h=(t,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of H(e))!C.call(t,r)&&r!==n&&m(t,r,{get:()=>e[r],enumerable:!(o=x(e,r))||o.enumerable});return t};var p=(t,e,n)=>(n=t!=null?S(k(t)):{},h(e||!t||!t.__esModule?m(n,"default",{value:t,enumerable:!0}):n,t)),L=t=>h(m({},"__esModule",{value:!0}),t);var T={};E(T,{default:()=>w});module.exports=L(T);var s=require("@raycast/api"),d=require("@raycast/utils");var f=require("@raycast/api"),v=p(require("fuse.js")),A=p(require("lodash")),R=p(require("osascript-tag"));var g=require("lru-cache"),u=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(e,n,o,r){let a=this.langCache.get(r);if(a.has(e))return process.env.NODE_ENV==="development"&&console.log("cache hit",e),a.get(e);let l=this.langHandlers.get(r);if(l&&l.check(o,n)){let c=l.serialize(o);return a.set(e,c),c}return o}removeCache(e){this.langCache.has(e)&&(this.langCache.get(e)?.clear(),this.langCache.delete(e))}hasHandlers(){return this.langHandlers.size>0}registerLang(e,n){this.langHandlers.has(e)||(this.removeCache(e),this.langHandlers.set(e,n),this.langCache.set(e,new g.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(e,n,o){let r=n;if(this.langHandlers.size>0){let{lang:a,id:l}=o;typeof a<"u"?r=this.formatStringWithLang(l,e,n,a):r=Array.from(this.langHandlers.keys()).reduce((c,b)=>this.formatStringWithLang(l,e,c,b),n)}return r}},y=new u;var{safariAppIdentifier:i,enableFuzzySearch:U}=(0,f.getPreferenceValues)();var W=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});var $=`
on clickReopenItem()
  tell application "System Events"
    tell process "${i}"
      -- The History menu is always the 6th menu bar item
      -- (Apple, Safari, File, Edit, View, History), regardless of locale.
      set historyMenu to menu 1 of menu bar item 6 of menu bar 1

      -- 1) Match the menu item by its English title.
      repeat with mi in menu items of historyMenu
        set n to name of mi
        if n is not missing value and n is "Reopen All Windows from Last Session" then
          if enabled of mi then
            click mi
            return "ok"
          else
            return "disabled"
          end if
        end if
      end repeat

      -- 2) Locale-independent structural lookup for non-English systems: the
      -- target sits two items below "Recently Closed", the first submenu item
      -- in the History menu.
      set historyItems to menu items of historyMenu
      repeat with i from 1 to (count of historyItems)
        if exists menu 1 of (item i of historyItems) then
          set target to item (i + 2) of historyItems
          if name of target is not missing value then
            if enabled of target then
              click target
              return "ok"
            else
              return "disabled"
            end if
          end if
          exit repeat
        end if
      end repeat

      return "not-found"
    end tell
  end tell
end clickReopenItem

on run
  -- "launch" starts Safari without its initial start-page window, so the
  -- restored session windows are the only ones that ever appear.
  tell application "${i}" to launch

  tell application "System Events"
    repeat 100 times
      if exists process "${i}" then exit repeat
      delay 0.1
    end repeat
    tell process "${i}"
      repeat 100 times
        if exists menu bar 1 then exit repeat
        delay 0.1
      end repeat
    end tell
  end tell

  tell application "${i}" to set windowCountBefore to count of windows

  set clickResult to clickReopenItem()
  if clickResult is not "ok" then
    -- Still bring Safari forward so the user isn't left with an invisible app.
    tell application "${i}" to activate
    return clickResult
  end if

  -- Wait for the restored windows to appear, then bring them to the front.
  repeat 50 times
    tell application "${i}"
      if (count of windows) > windowCountBefore then exit repeat
    end tell
    delay 0.1
  end repeat

  tell application "${i}" to activate

  return "ok"
end run
`,P=`
tell application "${i}"
  if it is running then activate
end tell
`;async function w(){await(0,s.closeMainWindow)();try{switch((await(0,d.runAppleScript)($,{timeout:45e3})).trim()){case"ok":await(0,s.showHUD)("\u2713 Reopened all windows from last session"),await(0,d.runAppleScript)(P,{timeout:5e3});break;case"disabled":await(0,s.showHUD)("Nothing to reopen \u2014 the last session may already be restored");break;default:await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Couldn't find the menu item",message:`${i}'s History menu has no \u201CReopen All Windows from Last Session\u201D entry.`})}}catch(t){console.error(t),await(0,s.showToast)({style:s.Toast.Style.Failure,title:"Failed to reopen last session",message:t instanceof Error&&/not allowed assistive access|1002/i.test(t.message)?"Grant Raycast Accessibility access in System Settings \u2192 Privacy & Security.":t instanceof Error?t.message:void 0})}}
