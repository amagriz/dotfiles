"use strict";var E=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var ee=Object.prototype.hasOwnProperty;var te=(e,t)=>{for(var n in t)E(e,n,{get:t[n],enumerable:!0})},ne=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Z(t))!ee.call(e,a)&&a!==n&&E(e,a,{get:()=>t[a],enumerable:!(r=Q(t,a))||r.enumerable});return e};var re=e=>ne(E({},"__esModule",{value:!0}),e);var _e={};te(_e,{default:()=>z});module.exports=re(_e);var h=require("@raycast/api");var w=require("@raycast/api"),G=require("node:dns/promises"),O=e=>{let{origin:t,pathname:n}=new URL(e);return t+n},ae="raycast-steam (+https://www.raycast.com/KevinBatdorf/steam)",l=class extends Error{},se=new Set(["ENETUNREACH","ENETDOWN"]),ie=new Set(["ENOTFOUND","EAI_AGAIN"]);async function oe(e){let t=e?.cause?.code;if(!t)return!1;if(se.has(t))return!0;if(!ie.has(t))return!1;let n,r=new Promise(a=>{n=setTimeout(()=>a(!0),3e3)});try{return await Promise.race([(0,G.lookup)("one.one.one.one").then(()=>!1,()=>!0),r])}finally{clearTimeout(n)}}async function p(e,t){let n;try{n=await fetch(e,{...t,headers:{"User-Agent":ae,...t?.headers}})}catch(r){if(await oe(r))throw new l("You're offline. Check your connection and try again.");let a=r instanceof Error?r.message:String(r);throw(0,w.captureException)(new Error(`${a}: ${O(e)}`)),new l("Couldn't reach Steam. Try again in a moment.")}if(n.status>=500){let r=[n.status,n.statusText].filter(Boolean).join(" ");(0,w.captureException)(new Error(`${r}: ${O(e)}`))}return n}var b=require("@raycast/api");var T=require("@raycast/api");var xe=new T.Cache({namespace:"steam-id"});function P(e){if(e)return new Date(e*1e3).toISOString().slice(0,10)}var Pe=1440*60*1e3,ve=new b.Cache({namespace:"store-country"});var u=require("@raycast/api"),U=require("fs"),M=require("node:sqlite"),D=require("path");var v=8;var Me=new u.Cache({namespace:"game-list"});var f;var ce=e=>e.normalize("NFD").replace(new RegExp("\\p{M}","gu"),"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();function _(){if(f)return f;(0,U.mkdirSync)(u.environment.supportPath,{recursive:!0});let e=new M.DatabaseSync((0,D.join)(u.environment.supportPath,"apps.sqlite"));try{e.exec("PRAGMA busy_timeout = 5000"),e.exec("PRAGMA journal_mode = WAL"),e.exec("BEGIN IMMEDIATE");try{let{user_version:t}=e.prepare("PRAGMA user_version").get();t!==v&&e.exec(`
          DROP TABLE IF EXISTS name_fts;
          DROP TABLE IF EXISTS name;
          DROP TABLE IF EXISTS app_fts;
          DROP TABLE IF EXISTS app;
          DROP TABLE IF EXISTS meta;
          CREATE TABLE app (
            appid INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            compact_name TEXT NOT NULL COLLATE NOCASE,
            padded_name TEXT NOT NULL,
            kind TEXT NOT NULL,
            generation INTEGER NOT NULL,
            first_seen INTEGER NOT NULL DEFAULT 0,
            last_modified INTEGER NOT NULL DEFAULT 0
          );
          -- Every name an app has had, so a game stays findable by its old title after a rename
          CREATE TABLE name (
            id INTEGER PRIMARY KEY,
            appid INTEGER NOT NULL,
            compact_name TEXT NOT NULL COLLATE NOCASE,
            padded_name TEXT NOT NULL,
            UNIQUE (appid, compact_name)
          );
          CREATE INDEX name_compact_name ON name (compact_name);
          CREATE VIRTUAL TABLE name_fts USING fts5(
            compact_name, content = 'name', content_rowid = 'id', tokenize = 'trigram', detail = 'none'
          );
          CREATE TRIGGER name_insert AFTER INSERT ON name BEGIN
            INSERT INTO name_fts (rowid, compact_name) VALUES (new.id, new.compact_name);
          END;
          CREATE TRIGGER name_delete AFTER DELETE ON name BEGIN
            INSERT INTO name_fts (name_fts, rowid, compact_name) VALUES ('delete', old.id, old.compact_name);
          END;
          CREATE TRIGGER app_insert AFTER INSERT ON app BEGIN
            INSERT OR IGNORE INTO name (appid, compact_name, padded_name)
            VALUES (new.appid, new.compact_name, new.padded_name);
          END;
          CREATE TRIGGER app_rename AFTER UPDATE OF compact_name ON app
          WHEN old.compact_name IS NOT new.compact_name BEGIN
            INSERT OR IGNORE INTO name (appid, compact_name, padded_name)
            VALUES (new.appid, new.compact_name, new.padded_name);
          END;
          CREATE TRIGGER app_delete AFTER DELETE ON app BEGIN
            DELETE FROM name WHERE appid = old.appid;
          END;
          CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
          PRAGMA user_version = ${v};
        `),e.exec(`
        CREATE TABLE IF NOT EXISTS library (
          owner TEXT NOT NULL,
          appid INTEGER NOT NULL,
          first_seen INTEGER NOT NULL,
          baseline INTEGER NOT NULL DEFAULT 0,
          PRIMARY KEY (owner, appid)
        );
      `),e.prepare("PRAGMA table_info(library)").all().some(a=>a.name==="baseline")||e.exec(`
          ALTER TABLE library ADD COLUMN baseline INTEGER NOT NULL DEFAULT 0;
          UPDATE library SET baseline = 1, first_seen = unixepoch() WHERE first_seen = 0;
        `),e.prepare("PRAGMA table_info(app)").all().some(a=>a.name==="first_seen")||e.exec(`
          ALTER TABLE app ADD COLUMN first_seen INTEGER NOT NULL DEFAULT 0;
          ALTER TABLE app ADD COLUMN last_modified INTEGER NOT NULL DEFAULT 0;
        `),e.exec(`
        CREATE INDEX IF NOT EXISTS app_first_seen ON app (first_seen);
        CREATE INDEX IF NOT EXISTS app_last_modified ON app (last_modified);
      `),e.exec("COMMIT")}catch(t){throw e.exec("ROLLBACK"),t}}catch(t){throw e.close(),t}return f=e,f}function k(){let e=_().prepare("SELECT value FROM meta WHERE key = 'synced_at'").get();return Number(e?.value??0)}function A(){try{return k()>0}catch{return!1}}function I(){return(Date.now()/1e3-k())/86400}var B=()=>Math.min(Number((0,u.getPreferenceValues)().indexRefresh)||1,7);function F(e){return I()>e}var N=e=>ce(e).split(" ").filter(Boolean),pe=e=>N(e).join(""),ue=e=>N(e).map(t=>`  ${t} `).join(""),R=e=>{let t=new Set;for(let n=0;n+3<=e.length;n++)t.add(e.slice(n,n+3));return t},$=["game","software","dlc","video","hardware"];function de(){let e=(0,u.getPreferenceValues)(),t={game:e.showGames,software:e.showSoftware,dlc:e.showDlc,video:e.showVideos,hardware:e.showHardware};return $.filter(n=>t[n]!==!1)}var le=e=>e.map(t=>`'${t}'`).join(", ")||"''",C=()=>{let e=de();return e.length===$.length?"":` AND app.kind IN (${le(e)})`};function j(e,t=50){let n=N(e);if(!n.length)return[];if(n.join("").length<3)return _().prepare(`SELECT DISTINCT app.appid, app.name FROM name JOIN app ON app.appid = name.appid WHERE name.compact_name LIKE ?${C()} ORDER BY length(app.name) LIMIT ${t}`).all(`${n.join("")}%`);let r=new Set(n.flatMap(s=>[...R(s)]));r.size||r.add(n.join("").slice(0,3));let a=_().prepare(`SELECT app.appid, app.name, name.compact_name, name.padded_name
       FROM name_fts JOIN name ON name.id = name_fts.rowid JOIN app ON app.appid = name.appid
       WHERE name_fts MATCH ?${C()}`).all([...r].map(s=>`"${s}"`).join(" OR ")),o=R(ue(e)),c=R(pe(e)),i=(s,m)=>{let d=0;for(let S of s)m.includes(S)&&d++;return d},J=a.map(s=>{let m=i(o,s.padded_name),d=m/o.size+.25*i(c,s.compact_name)/c.size,S=s.padded_name.replaceAll(" ","").length+s.padded_name.split("  ").length-1;return{row:s,shared:m,score:d,similarity:m/(o.size+S-m)}}).filter(({shared:s})=>s>=Math.ceil(o.size/2)).sort((s,m)=>m.score-s.score||m.similarity-s.similarity),L=new Set,y=[];for(let{row:s}of J)if(!L.has(s.appid)&&(L.add(s.appid),y.push({appid:s.appid,name:s.name}),y.length===t))break;return y}var H=require("@raycast/api");var fe="https://store.steampowered.com",ge="https://steamcommunity.com",he="https://steam-search.vercel.app/api/games",g=class extends Error{status;constructor(t,n={}){super(t),this.name="SteamGameError",this.status=n.status}};function x(e){let t=e.trim(),n=[/^tell me about (?:the )?(?:steam )?(?:game|app)\s+/i,/^tell me about\s+/i,/^what is (?:the )?(?:steam )?(?:game|app)\s+/i,/^search (?:for )?(?:the )?(?:steam )?(?:game|app)\s+/i,/^find (?:the )?(?:steam )?(?:game|app)\s+/i,/^look up (?:the )?(?:steam )?(?:game|app)\s+/i];for(let r of n)t=t.replace(r,"");return t.replace(/^["'`]+|["'`.,!?]+$/g,"").trim()}function ye(e){return`${fe}/app/${e}`}function Se(e,t=0){let n=new URL(he);return n.searchParams.set("cacheKey",t.toString()),n.searchParams.set("search",e),n.toString()}function W(e){let t=e.match(/store\.steampowered\.com\/app\/(\d+)/i);if(t?.[1])return Number(t[1]);let n=e.match(/\b(?:steam\s+)?app(?:id)?\s*#?:?\s*(\d{1,10})\b/i);if(n?.[1])return Number(n[1]);let r=e.trim();if(/^\d{1,10}$/.test(r))return Number(r)}async function Ee(e){let t=await p(e);if(!t.ok)throw new g(`${t.status} ${t.statusText}`,{status:t.status});return(await t.json())?.filter(Re).map(r=>({appid:r.appid,name:r.name??`Steam App ${r.appid}`}))??[]}async function we(e){let t=await p(`${ge}/actions/SearchApps/${encodeURIComponent(e)}`);if(!t.ok)throw new g(`${t.status} ${t.statusText}`,{status:t.status});return(await t.json()??[]).map(r=>({appid:Number(r.appid),name:r.name,icon:r.icon})).filter(r=>r.appid>0&&r.name)}async function Te(e){let t=await Promise.allSettled([we(e),Ee(Se(e))]),n=t.flatMap(a=>a.status==="fulfilled"?[a.value]:[]);if(!n.length)throw t[0].reason;let r=new Map;for(let a of n)for(let o of a){let c=r.get(o.appid);r.set(o.appid,{...o,...c,icon:c?.icon??o.icon})}return[...r.values()]}function V(){try{if(!A()||!F(B()))return;let e=Math.floor(I());return`The local Steam game list is ${e} day${e===1?"":"s"} old, so recent releases may be missing. The user can update it with Refresh Game List in Search Games, or by asking you to.`}catch{return}}function be(e,t){try{return j(e,t)}catch(n){return(0,h.captureException)(n),[]}}async function q(e,t={}){let n=x(e);if(!n)return[];let r=t.maxResults??20;if((0,h.getPreferenceValues)().token?.trim()){if(!A())throw new Error("The Steam game list hasn't downloaded yet. Open Search Games once to download it.");return be(n,r).map(K)}return(await Te(n)).slice(0,r).map(K)}function K(e){return{appid:e.appid,name:e.name??`Steam App ${e.appid}`,storeUrl:ye(e.appid)}}function Re(e){return!!e?.appid}async function X(e,t={}){let n=new URL("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/");n.searchParams.set("appid",String(e)),n.searchParams.set("count",String(t.count??10)),n.searchParams.set("maxlength","500"),n.searchParams.set("format","json"),t.officialOnly&&n.searchParams.set("feeds","steam_community_announcements");let r=await p(n);if(!r.ok)throw new Error(`Steam could not load news for app ${e} (${r.status}).`);return(await r.json()).appnews?.newsitems??[]}function Y(e){return(e??"").replace(/<[^>]*>/g," ").replace(/\[\/?[a-z0-9*]+(?:=[^\]]*)?\]/gi," ").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/\s+/g," ").trim()}async function z(e){let t=x(e.query??""),n,r=e.appid??(t?W(t):void 0);r?n={appid:r}:t&&([n]=await q(t,{maxResults:1}));let a=!r&&t?V():void 0;if(!n)return{news:[],warnings:[t?`No Steam game matched "${t}".`:"Name the game or give its app ID.",a].filter(i=>!!i)};let o=Math.min(Math.max(e.count??5,1),10),c=await X(n.appid,{count:o,officialOnly:e.officialOnly});return{game:n,news:c.map(i=>({title:i.title,date:P(i.date),source:i.feedlabel,url:i.url,summary:Y(i.contents)})),warnings:[c.length?void 0:"Steam has no news for this game.",a].filter(i=>!!i)}}
