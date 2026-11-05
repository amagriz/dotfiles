"use strict";var T=Object.create;var d=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var v=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var P=(e,t)=>{for(var n in t)d(e,n,{get:t[n],enumerable:!0})},m=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of S(t))!k.call(e,i)&&i!==n&&d(e,i,{get:()=>t[i],enumerable:!(o=$(t,i))||o.enumerable});return e};var f=(e,t,n)=>(n=e!=null?T(v(e)):{},m(t||!e||!e.__esModule?d(n,"default",{value:e,enumerable:!0}):n,e)),C=e=>m(d({},"__esModule",{value:!0}),e);var L={};P(L,{default:()=>y});module.exports=C(L);var r=require("@raycast/api");var h=require("@raycast/utils");var w=require("@raycast/api"),I=f(require("fuse.js")),R=f(require("lodash")),E=f(require("osascript-tag"));var p=require("lru-cache"),u=class{langCache=new Map;langHandlers=new Map;formatStringWithLang(t,n,o,i){let s=this.langCache.get(i);if(s.has(t))return process.env.NODE_ENV==="development"&&console.log("cache hit",t),s.get(t);let l=this.langHandlers.get(i);if(l&&l.check(o,n)){let c=l.serialize(o);return s.set(t,c),c}return o}removeCache(t){this.langCache.has(t)&&(this.langCache.get(t)?.clear(),this.langCache.delete(t))}hasHandlers(){return this.langHandlers.size>0}registerLang(t,n){this.langHandlers.has(t)||(this.removeCache(t),this.langHandlers.set(t,n),this.langCache.set(t,new p.LRUCache({max:1e3})),console.log(`language adaptor for ${n.name} installed`))}formatString(t,n,o){let i=n;if(this.langHandlers.size>0){let{lang:s,id:l}=o;typeof s<"u"?i=this.formatStringWithLang(l,t,n,s):i=Array.from(this.langHandlers.keys()).reduce((c,x)=>this.formatStringWithLang(l,t,c,x),n)}return i}},g=new u;var{safariAppIdentifier:a,enableFuzzySearch:J}=(0,w.getPreferenceValues)();var O=new Intl.DateTimeFormat(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"});async function b(){return await(0,h.runAppleScript)(`
    on clickPrivateItem()
      -- AXMenuItemCmdModifiers is a bitmask over the modifiers joined with
      -- Command: 1 = Shift, 2 = Option, 4 = Control. So \u21E7\u2318N reads as 1.
      set shiftCommandMask to 1

      tell application "System Events"
        tell process "${a}"
          -- The File menu is always the 3rd menu bar item
          -- (Apple, Safari, File, Edit, View, History), regardless of locale.
          set fileMenu to menu 1 of menu bar item 3 of menu bar 1

          -- Match by English title, or by the \u21E7\u2318N key equivalent so the command
          -- still works on a localized system. Never fall back to a menu
          -- position: when private browsing is restricted the item is absent,
          -- and clicking that slot would silently open a non-private window.
          repeat with mi in menu items of fileMenu
            set n to name of mi
            set isPrivateItem to (n is not missing value and n is "New Private Window")
            if not isPrivateItem then
              try
                set cmdChar to value of attribute "AXMenuItemCmdChar" of mi
                set cmdMods to value of attribute "AXMenuItemCmdModifiers" of mi
                set isPrivateItem to (cmdChar is "N" and cmdMods is shiftCommandMask)
              on error
                set isPrivateItem to false
              end try
            end if
            if isPrivateItem then
              if enabled of mi then
                click mi
                return "ok"
              else
                return "disabled"
              end if
            end if
          end repeat

          return "not-found"
        end tell
      end tell
    end clickPrivateItem

    on run
      -- "launch" starts Safari without its initial start-page window, so no
      -- stray regular window is ever left behind.
      tell application "${a}" to launch

      tell application "System Events"
        repeat 100 times
          if exists process "${a}" then exit repeat
          delay 0.1
        end repeat
        if not (exists process "${a}") then error "${a} did not launch"

        tell process "${a}"
          repeat 100 times
            if exists menu bar 1 then exit repeat
            delay 0.1
          end repeat
          if not (exists menu bar 1) then error "${a} launched but its menu bar never appeared"
        end tell
      end tell

      set clickResult to clickPrivateItem()
      if clickResult is not "ok" then return clickResult

      tell application "${a}"
        repeat 10 times
          activate
          if frontmost then exit repeat
          delay 0.2
        end repeat
        if not frontmost then error "${a} did not take focus"
      end tell

      return "ok"
    end run
  `,{timeout:45e3})}async function y(){try{switch(await(0,r.closeMainWindow)(),(await b()).trim()){case"ok":break;case"disabled":await(0,r.showToast)({style:r.Toast.Style.Failure,title:"Private browsing is unavailable",message:"New Private Window is blocked by Screen Time or a configuration profile."});break;default:await(0,r.showToast)({style:r.Toast.Style.Failure,title:"Couldn't find the menu item",message:`${a}'s File menu has no \u201CNew Private Window\u201D entry \u2014 private browsing may be restricted by Screen Time or a configuration profile.`})}}catch(e){console.error(e),await(0,r.showToast)({style:r.Toast.Style.Failure,title:"Failed to open a new private window",message:e instanceof Error&&/not allowed assistive access|1002/i.test(e.message)?"Grant Raycast Accessibility access in System Settings \u2192 Privacy & Security.":e instanceof Error?e.message:void 0})}}
