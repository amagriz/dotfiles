"use strict";var y=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var H=Object.prototype.hasOwnProperty;var j=(e,n)=>{for(var t in n)y(e,t,{get:n[t],enumerable:!0})},K=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of F(n))!H.call(e,a)&&a!==t&&y(e,a,{get:()=>n[a],enumerable:!(r=$(n,a))||r.enumerable});return e};var W=e=>K(y({},"__esModule",{value:!0}),e);var ce={};j(ce,{default:()=>B});module.exports=W(ce);var D=require("@raycast/api");var S=require("@raycast/api"),A=require("node:dns/promises"),_=e=>{let{origin:n,pathname:t}=new URL(e);return n+t},V="raycast-steam (+https://www.raycast.com/KevinBatdorf/steam)",f=class extends Error{},X=new Set(["ENETUNREACH","ENETDOWN"]),q=new Set(["ENOTFOUND","EAI_AGAIN"]);async function Y(e){let n=e?.cause?.code;if(!n)return!1;if(X.has(n))return!0;if(!q.has(n))return!1;let t,r=new Promise(a=>{t=setTimeout(()=>a(!0),3e3)});try{return await Promise.race([(0,A.lookup)("one.one.one.one").then(()=>!1,()=>!0),r])}finally{clearTimeout(t)}}async function c(e,n){let t;try{t=await fetch(e,{...n,headers:{"User-Agent":V,...n?.headers}})}catch(r){if(await Y(r))throw new f("You're offline. Check your connection and try again.");let a=r instanceof Error?r.message:String(r);throw(0,S.captureException)(new Error(`${a}: ${_(e)}`)),new f("Couldn't reach Steam. Try again in a moment.")}if(t.status>=500){let r=[t.status,t.statusText].filter(Boolean).join(" ");(0,S.captureException)(new Error(`${r}: ${_(e)}`))}return t}var T=require("@raycast/api");var E=require("@raycast/api");var o=class extends Error{status;constructor(n,t={}){super(n),this.name="SteamApiError",this.status=t.status}},z="https://api.steampowered.com";var I=new E.Cache({namespace:"steam-id"});async function w(e,n){let t=e.trim(),r=ee(t);if(r)return r;let a=te(t);if(!a)throw new o("Steam ID should be a 17-digit ID, a profile URL, or your custom URL name.");let s=I.get(a.toLowerCase());if(s)return s;let m=await J(a,n);if(!m)throw new o(`No Steam profile found for "${a}".`);return I.set(a.toLowerCase(),m),m}function g(e){if(e)return new Date(e*1e3).toISOString().slice(0,10)}function x(e){if(!e)return;let n=e/60;return n<1?`${e}m`:`${Math.round(n).toLocaleString()}h`}async function J(e,n){let t=await Q("ISteamUser/ResolveVanityURL/v1/",n,{vanityurl:e});if(t.response.success===1)return t.response.steamid}async function Q(e,n,t){let r=new URL(`${z}/${e}`);r.searchParams.set("key",n);for(let[a,s]of Object.entries(t))s!==void 0&&r.searchParams.set(a,String(s));return Z(r,{headers:{Accept:"application/json"}}).catch(a=>{throw ae(a)?se(a):a})}async function Z(e,n){let t=await c(e,n);if(!t.ok){let r=await t.text();throw new o(`${t.status} ${t.statusText}: ${re(r)}`,{status:t.status})}return await t.json()}function ee(e){let n=e.match(/^\d{17}$/)?.[0];return n||(e.match(/steamcommunity\.com\/profiles\/(\d{17})/i)?.[1]??e.match(/\/profiles\/(\d{17})/i)?.[1])}function te(e){let n=ne(e);if(n)return n;if(/^[a-zA-Z0-9_-]{2,64}$/.test(e)&&!/^\d+$/.test(e))return e}function ne(e){return e.match(/steamcommunity\.com\/id\/([^/?#]+)/i)?.[1]??e.match(/\/id\/([^/?#]+)/i)?.[1]}function re(e){return e.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,240)}function ae(e){return e instanceof o&&(e.status===401||e.status===403)}function se(e){return new o("Steam rejected the Web API Key",{status:e.status})}var he=1440*60*1e3,ye=new T.Cache({namespace:"store-country"});var p=require("@raycast/api"),L=require("fs"),O=require("node:sqlite"),G=require("path");var N=8;var we=new p.Cache({namespace:"game-list"});var h;function v(){if(h)return h;(0,L.mkdirSync)(p.environment.supportPath,{recursive:!0});let e=new O.DatabaseSync((0,G.join)(p.environment.supportPath,"apps.sqlite"));try{e.exec("PRAGMA busy_timeout = 5000"),e.exec("PRAGMA journal_mode = WAL"),e.exec("BEGIN IMMEDIATE");try{let{user_version:n}=e.prepare("PRAGMA user_version").get();n!==N&&e.exec(`
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
          PRAGMA user_version = ${N};
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
      `),e.exec("COMMIT")}catch(n){throw e.exec("ROLLBACK"),n}}catch(n){throw e.close(),n}return h=e,h}function P(e,n){let t=v();t.exec("BEGIN");try{let{count:r}=t.prepare("SELECT count(*) AS count FROM library WHERE owner = ?").get(e),a=t.prepare("INSERT OR IGNORE INTO library (owner, appid, first_seen, baseline) VALUES (?, ?, ?, ?)");for(let s of n)a.run(e,s,Math.floor(Date.now()/1e3),r?0:1);t.prepare("DELETE FROM library WHERE owner = ? AND appid NOT IN (SELECT value FROM json_each(?))").run(e,JSON.stringify(n)),t.exec("COMMIT")}catch(r){throw t.exec("ROLLBACK"),r}}function C(e){let n=v().prepare("SELECT appid, first_seen, baseline FROM library WHERE owner = ?").all(e);return new Map(n.map(t=>[t.appid,{firstSeen:t.first_seen,baseline:!!t.baseline}]))}var u=require("@raycast/api");async function ie(){let{token:e,steamid:n}=(0,u.getPreferenceValues)(),t=e?.trim(),r=n?.trim();if(!t||!r)throw new Error("Set your Web API Key and Steam ID in the Steam extension preferences to read your library.");return{key:t,steamid:await w(r,t)}}async function oe(e){let{key:n,steamid:t}=await ie(),r=new URL(`https://api.steampowered.com/IPlayerService/${e}/v1/`);r.searchParams.set("key",n),r.searchParams.set("steamid",t),r.searchParams.set("include_appinfo","1"),r.searchParams.set("include_played_free_games","1"),r.searchParams.set("format","json");let a=await c(r);if(a.status===401||a.status===403)throw new Error("Steam rejected the Web API Key. Check it in the Steam extension preferences.");if(!a.ok)throw new Error(`Steam could not load your library (${a.status}).`);let s=await a.json();return{count:s.response?.game_count??s.response?.total_count,games:s.response?.games??[]}}var U=()=>(0,u.getPreferenceValues)().steamid?.trim()??"";async function R(){let e=await oe("GetOwnedGames");if(!e.games.length)return e;try{P(U(),e.games.map(n=>n.appid))}catch(n){(0,u.captureException)(n)}return e}function M(){try{let e=[...C(U()).entries()],n=e.filter(([,t])=>t.baseline).map(([,t])=>t.firstSeen);return{since:n.length?Math.min(...n):void 0,dates:new Map(e.filter(([,t])=>!t.baseline).map(([t,r])=>[t,r.firstSeen]))}}catch(e){return(0,u.captureException)(e),{since:void 0,dates:new Map}}}var me="https://store.steampowered.com";function k(e){return`${me}/app/${e}`}async function B(e){let{count:n,games:t}=await R(),r=e.query?.trim().toLowerCase(),a=Math.min(Math.max(e.maxResults??25,1),100),s=e.sortBy??"playtime",{since:m,dates:d}=M(),b=t.filter(i=>!r||i.name?.toLowerCase().includes(r)).filter(i=>s!=="added"||d.has(i.appid)).sort((i,l)=>s==="name"?(i.name??"").localeCompare(l.name??""):s==="added"?(d.get(l.appid)??0)-(d.get(i.appid)??0):s==="recent"?(l.rtime_last_played??0)-(i.rtime_last_played??0):l.playtime_forever-i.playtime_forever);return{totalOwned:n??t.length,matched:b.length,games:b.slice(0,a).map(i=>({appid:i.appid,name:i.name,playtime:x(i.playtime_forever)??"never played",playtimeMinutes:i.playtime_forever,lastPlayed:g(i.rtime_last_played),added:g(d.get(i.appid)),storeUrl:k(i.appid)})),warnings:[...t.length?[]:["Steam returned no games. The profile's game details may be private, or the library is empty."],...s==="added"&&t.length?[m?`Added dates start ${g(m)}, when the extension first read this library. Games added before then are left out.`:"Added dates aren't available yet."]:[]]}}
