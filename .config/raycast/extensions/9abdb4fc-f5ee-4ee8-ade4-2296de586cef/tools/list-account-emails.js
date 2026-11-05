"use strict";var U=Object.create;var l=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var F=(e,t)=>{for(var r in t)l(e,r,{get:t[r],enumerable:!0})},v=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of j(t))!_.call(e,n)&&n!==r&&l(e,n,{get:()=>t[n],enumerable:!(s=D(t,n))||s.enumerable});return e};var B=(e,t,r)=>(r=e!=null?U(J(e)):{},v(t||!e||!e.__esModule?l(r,"default",{value:e,enumerable:!0}):r,e)),X=e=>v(l({},"__esModule",{value:!0}),e);var ge={};F(ge,{default:()=>de});module.exports=X(ge);var h=require("@raycast/utils");var d=require("@raycast/api");var A=require("@raycast/api");var{messageLimit:H}=(0,A.getPreferenceValues)(),C=parseInt(H);var g=1,T=(e,t=864e5)=>Date.now()-e>t,m=new d.Cache,$=()=>{m.clear()},M=()=>{if(m.has("accounts")){let e=m.get("accounts");if(e){let{time:t,data:r,version:s}=JSON.parse(e);if(!T(t)&&s===g)return r}}},q=e=>M()?.find(t=>t.id===e||t.name===e),E=e=>{m.set("accounts",JSON.stringify({time:Date.now(),data:e,version:g}))},p=new d.Cache,V=()=>{p.clear()},x=(e,t)=>{let r=`${e}-${t}`;if(p.has(r)){let s=p.get(r);if(s){let{time:n,data:a,version:c}=JSON.parse(s);if(!T(n)&&c===g)return a.slice(0,C)}}return[]},f=(e,t,r)=>{let s=`${t}-${r}`;p.set(s,JSON.stringify({time:Date.now(),data:e,version:g}))},z=(e,t,r)=>{let n=[...x(t,r),e];f(n,t,r)},K=(e,t,r,s)=>{let a=x(r,s).map(c=>c.id===e?{...c,...t}:c);f(a,r,s)},W=(e,t,r)=>{let n=x(t,r).filter(a=>a.id!==e);f(n,t,r)},S=new d.Cache,G=()=>{let e=M();if(!e||e.length===0)return;let t=S.get("default-account-id");if(t){let r=e.find(s=>s.id===t);if(r)return r}return e[0]},Q=e=>{S.set("default-account-id",e)},b=Object.freeze({getAccounts:M,setAccounts:E,getDefaultAccount:G,setDefaultAccount:Q,getAccount:q,invalidateAccounts:$,getMessages:x,setMessages:f,addMessage:z,updateMessage:K,deleteMessage:W,invalidateMessages:V});var u=require("@raycast/api");var o=require("@raycast/api");var Y=o.environment.appearance==="dark"?"#0983ff":"#007aff",Z=o.environment.appearance==="dark"?"#a7a7a7":"#757575",ee={Envelope:{source:"../assets/icons/envelope.svg",tintColor:o.Color.PrimaryText},Important:{source:"../assets/icons/flagged.svg",tintColor:o.Color.PrimaryText},Inbox:{source:"../assets/icons/inbox.svg",tintColor:o.Color.PrimaryText},Junk:{source:"../assets/icons/junk.svg",tintColor:o.Color.PrimaryText},MailApp:{source:"../assets/icons/mail.png"},Read:{source:o.Icon.CheckCircle,tintColor:Z},Recent:{source:"../assets/icons/recent.svg",tintColor:o.Color.PrimaryText},Save:{source:"../assets/icons/save.png",tintColor:o.Color.PrimaryText},SaveAs:{source:"../assets/icons/save-as.png",tintColor:o.Color.PrimaryText},Sent:{source:"../assets/icons/sent.svg",tintColor:o.Color.PrimaryText},Trash:{source:"../assets/icons/trash.svg",tintColor:o.Color.PrimaryText},TrashRed:{source:"../assets/icons/trash.svg",tintColor:o.Color.Red},Unread:{source:o.Icon.CircleProgress100,tintColor:Y},Drafts:{source:o.Icon.Document,tintColor:o.Color.PrimaryText},Archive:{source:"../assets/icons/archive.svg",tintColor:o.Color.PrimaryText},Mailbox:{source:"../assets/icons/folder.svg",tintColor:o.Color.PrimaryText},Starred:{source:o.Icon.Star,tintColor:o.Color.PrimaryText}},i=ee,Te={"Send Message":i.Sent,Reply:o.Icon.Reply,"Reply All":o.Icon.Reply,Forward:o.Icon.ArrowUpCircle,Redirect:o.Icon.ArrowRightCircle};var te=B(require("json2md"));var w=(e,t)=>{if(!e)return t;try{return JSON.parse(e)}catch{return t}};var R=Object.freeze(["inbox","important","starred","drafts","other","outbox","junk","trash","archive"]),Le={inbox:i.Inbox,important:i.Important,starred:i.Starred,drafts:i.Drafts,outbox:i.Sent,junk:i.Junk,trash:i.Trash,archive:i.Archive,other:i.Mailbox},re=["inbox","\u6536\u4EF6\u7BB1","\u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0435"],se=["important","\u91CD\u8981","\u91CD\u8981\u90AE\u4EF6","\u0432\u0430\u0436\u043D\u044B\u0435"],oe=["starred","flagged","\u661F\u6807","\u661F\u6807\u90AE\u4EF6","\u5DF2\u52A0\u661F\u6807","\u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"],ne=["drafts","\u8349\u7A3F","\u8349\u7A3F\u7BB1","\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438"],ae=["outbox","sent","sent items","sent mail","sent messages","\u5DF2\u53D1\u9001","\u53D1\u4EF6\u7BB1","\u5DF2\u53D1\u90AE\u4EF6","\u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435"],ie=["junk","spam","junk email","\u5783\u573E\u90AE\u4EF6","\u0441\u043F\u0430\u043C","\u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430"],ce=["trash","bin","deleted items","deleted mail","deleted messages","\u5E9F\u7EB8\u7BD3","\u5783\u573E\u7BB1","\u56DE\u6536\u7AD9","\u5DF2\u5220\u9664","\u5DF2\u5220\u9664\u90AE\u4EF6","\u043A\u043E\u0440\u0437\u0438\u043D\u0430","\u0443\u0434\u0430\u043B\u0435\u043D\u043D\u044B\u0435"],ue=["archive","[gmail]","\u5F52\u6863","\u5B58\u6863","\u0430\u0440\u0445\u0438\u0432","\u0432\u0441\u044F \u043F\u043E\u0447\u0442\u0430"],I=new u.Cache;u.LocalStorage.getItem("mailbox-overrides").then(e=>{I.set("mailbox-overrides",e??"{}"),I.subscribe((t,r)=>{t==="mailbox-overrides"&&u.LocalStorage.setItem(t,r??"{}")})});var le=e=>w(I.get("mailbox-overrides"),{})[e];var me=e=>{let t=le(e);if(t)return t;e=e.toLowerCase().trim();function r(s,n){return s.includes(n)}return r(re,e)?"inbox":r(se,e)?"important":r(oe,e)?"starred":r(ne,e)?"drafts":r(ae,e)?"outbox":r(ie,e)?"junk":r(ce,e)?"trash":r(ue,e)?"archive":"other"},P=me,N=(e,t)=>{let r=R.indexOf(e.type),s=R.indexOf(t.type);return r-s};var k=async()=>{let e=`
    set output to ""
    tell application "Mail"
      set mailAccounts to every account
      repeat with mailAcc in mailAccounts
        repeat 1 times
          if (count of every mailbox of mailAcc) is 0 then exit repeat
          set accId to id of mailAcc
          set accName to name of mailAcc
          set accUser to user name of mailAcc
          set fullName to full name of mailAcc
          set accEmail to email addresses of mailAcc
          set {TID, AppleScript's text item delimiters} to {AppleScript's text item delimiters, " | "}
          try
            set mainMailbox to (first mailbox of mailAcc whose name is "All Mail")
            set numUnread to unread count of mainMailbox
          on error
            try
              set mainMailbox to (first mailbox of mailAcc whose name is "INBOX")
              set numUnread to unread count of mainMailbox
            on error
              set numUnread to 0
            end try
          end try
          set output to output & accId & "," & accName & "," & accUser & "," & fullName & "," & accEmail & "," & numUnread & "
"
        end repeat
      end repeat
    end tell
    return output
  `,t=b.getAccounts();if(!t)try{let r=(await(0,h.runAppleScript)(e)).split(`
`);r.pop(),t=await Promise.all(r.map(async s=>{let[n,a,c,y,L,O]=s.split(",");return{id:n,name:a,userName:c,fullName:y,emails:L.split(" | "),numUnread:parseInt(O),mailboxes:await pe(a)}})),t&&b.setAccounts(t)}catch(r){console.error(r);return}return t},pe=async e=>{let t=`
    set output to ""
    tell application "Mail"
      set mailAcc to account "${e}"
      set mbs to every mailbox of mailAcc
      repeat with mb in mbs
        tell mb 
          set output to output & name & "," & unread count & "
"
        end tell
      end repeat
    end tell
    return output
  `;try{let r=(await(0,h.runAppleScript)(t)).split(`
`);return r.pop(),r.map(n=>{let a=n.lastIndexOf(","),c=n.substring(0,a),y=n.substring(a+1);return{name:c,type:P(c),unreadCount:parseInt(y)}}).sort(N)}catch(r){return console.error(r),[]}};async function de(e){let t=await k();if(!t||t.length===0)return[];let r=t.flatMap(s=>s.emails.map(n=>({email:n,accountName:s.name,accountId:s.id})));if(e.query){let s=e.query.toLowerCase();return r.filter(n=>n.email.toLowerCase().includes(s)||n.accountName.toLowerCase().includes(s))}return r}
