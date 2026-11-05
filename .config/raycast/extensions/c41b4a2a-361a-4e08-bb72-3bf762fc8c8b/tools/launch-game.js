"use strict";var h=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var H=(e,t)=>{for(var n in t)h(e,n,{get:t[n],enumerable:!0})},j=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of B(t))!F.call(e,a)&&a!==n&&h(e,a,{get:()=>t[a],enumerable:!(r=$(t,a))||r.enumerable});return e};var K=e=>j(h({},"__esModule",{value:!0}),e);var ye={};H(ye,{confirmation:()=>he,default:()=>D});module.exports=K(ye);var M=require("@raycast/api");var C=require("@raycast/api");var y=require("@raycast/api"),R=require("node:dns/promises"),T=e=>{let{origin:t,pathname:n}=new URL(e);return t+n},W="raycast-steam (+https://www.raycast.com/KevinBatdorf/steam)",u=class extends Error{},V=new Set(["ENETUNREACH","ENETDOWN"]),X=new Set(["ENOTFOUND","EAI_AGAIN"]);async function Y(e){let t=e?.cause?.code;if(!t)return!1;if(V.has(t))return!0;if(!X.has(t))return!1;let n,r=new Promise(a=>{n=setTimeout(()=>a(!0),3e3)});try{return await Promise.race([(0,R.lookup)("one.one.one.one").then(()=>!1,()=>!0),r])}finally{clearTimeout(n)}}async function o(e,t){let n;try{n=await fetch(e,{...t,headers:{"User-Agent":W,...t?.headers}})}catch(r){if(await Y(r))throw new u("You're offline. Check your connection and try again.");let a=r instanceof Error?r.message:String(r);throw(0,y.captureException)(new Error(`${a}: ${T(e)}`)),new u("Couldn't reach Steam. Try again in a moment.")}if(n.status>=500){let r=[n.status,n.statusText].filter(Boolean).join(" ");(0,y.captureException)(new Error(`${r}: ${T(e)}`))}return n}var l=require("@raycast/api");var S=require("@raycast/api");var m=class extends Error{status;constructor(t,n={}){super(t),this.name="SteamApiError",this.status=n.status}},q="https://api.steampowered.com";var b=new S.Cache({namespace:"steam-id"});async function d(e,t){let n=e.trim(),r=ee(n);if(r)return r;let a=te(n);if(!a)throw new m("Steam ID should be a 17-digit ID, a profile URL, or your custom URL name.");let s=b.get(a.toLowerCase());if(s)return s;let i=await z(a,t);if(!i)throw new m(`No Steam profile found for "${a}".`);return b.set(a.toLowerCase(),i),i}async function z(e,t){let n=await A("ISteamUser/ResolveVanityURL/v1/",t,{vanityurl:e});if(n.response.success===1)return n.response.steamid}async function _(e,t){return(await J(e,t))?.loccountrycode}async function J(e,t){return(await Q([e],t))[0]}async function Q(e,t){return e.length?(await A("ISteamUser/GetPlayerSummaries/v2/",t,{steamids:e.join(",")})).response.players??[]:[]}async function A(e,t,n){let r=new URL(`${q}/${e}`);r.searchParams.set("key",t);for(let[a,s]of Object.entries(n))s!==void 0&&r.searchParams.set(a,String(s));return Z(r,{headers:{Accept:"application/json"}}).catch(a=>{throw ae(a)?se(a):a})}async function Z(e,t){let n=await o(e,t);if(!n.ok){let r=await n.text();throw new m(`${n.status} ${n.statusText}: ${re(r)}`,{status:n.status})}return await n.json()}function ee(e){let t=e.match(/^\d{17}$/)?.[0];return t||(e.match(/steamcommunity\.com\/profiles\/(\d{17})/i)?.[1]??e.match(/\/profiles\/(\d{17})/i)?.[1])}function te(e){let t=ne(e);if(t)return t;if(/^[a-zA-Z0-9_-]{2,64}$/.test(e)&&!/^\d+$/.test(e))return e}function ne(e){return e.match(/steamcommunity\.com\/id\/([^/?#]+)/i)?.[1]??e.match(/\/id\/([^/?#]+)/i)?.[1]}function re(e){return e.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,240)}function ae(e){return e instanceof m&&(e.status===401||e.status===403)}function se(e){return new m("Steam rejected the Web API Key",{status:e.status})}var ie=1440*60*1e3,I=new l.Cache({namespace:"store-country"});function oe(){try{return new Intl.Locale(Intl.DateTimeFormat().resolvedOptions().locale).region}catch{return}}async function x(){let{token:e,steamid:t}=(0,l.getPreferenceValues)(),n=e?.trim(),r=t?.trim();if(n&&r){let a=I.get(r),s=a?JSON.parse(a):void 0;if(s&&Date.now()-s.fetchedAt<ie){if(s.country)return s.country}else{let i=await d(r,n).then(k=>_(k,n)).catch(()=>{});if(I.set(r,JSON.stringify({country:i??"",fetchedAt:Date.now()})),i)return i}}return oe()??"US"}var c=require("@raycast/api"),L=require("fs"),O=require("node:sqlite"),G=require("path");var N=8;var Ae=new c.Cache({namespace:"game-list"});var f;function me(){if(f)return f;(0,L.mkdirSync)(c.environment.supportPath,{recursive:!0});let e=new O.DatabaseSync((0,G.join)(c.environment.supportPath,"apps.sqlite"));try{e.exec("PRAGMA busy_timeout = 5000"),e.exec("PRAGMA journal_mode = WAL"),e.exec("BEGIN IMMEDIATE");try{let{user_version:t}=e.prepare("PRAGMA user_version").get();t!==N&&e.exec(`
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
      `),e.exec("COMMIT")}catch(t){throw e.exec("ROLLBACK"),t}}catch(t){throw e.close(),t}return f=e,f}function P(e,t){let n=me();n.exec("BEGIN");try{let{count:r}=n.prepare("SELECT count(*) AS count FROM library WHERE owner = ?").get(e),a=n.prepare("INSERT OR IGNORE INTO library (owner, appid, first_seen, baseline) VALUES (?, ?, ?, ?)");for(let s of t)a.run(e,s,Math.floor(Date.now()/1e3),r?0:1);n.prepare("DELETE FROM library WHERE owner = ? AND appid NOT IN (SELECT value FROM json_each(?))").run(e,JSON.stringify(t)),n.exec("COMMIT")}catch(r){throw n.exec("ROLLBACK"),r}}var p=require("@raycast/api");async function ce(){let{token:e,steamid:t}=(0,p.getPreferenceValues)(),n=e?.trim(),r=t?.trim();if(!n||!r)throw new Error("Set your Web API Key and Steam ID in the Steam extension preferences to read your library.");return{key:n,steamid:await d(r,n)}}async function pe(e){let{key:t,steamid:n}=await ce(),r=new URL(`https://api.steampowered.com/IPlayerService/${e}/v1/`);r.searchParams.set("key",t),r.searchParams.set("steamid",n),r.searchParams.set("include_appinfo","1"),r.searchParams.set("include_played_free_games","1"),r.searchParams.set("format","json");let a=await o(r);if(a.status===401||a.status===403)throw new Error("Steam rejected the Web API Key. Check it in the Steam extension preferences.");if(!a.ok)throw new Error(`Steam could not load your library (${a.status}).`);let s=await a.json();return{count:s.response?.game_count??s.response?.total_count,games:s.response?.games??[]}}var ue=()=>(0,p.getPreferenceValues)().steamid?.trim()??"";async function v(){let e=await pe("GetOwnedGames");if(!e.games.length)return e;try{P(ue(),e.games.map(t=>t.appid))}catch(t){(0,p.captureException)(t)}return e}var de="https://store.steampowered.com";var g=class extends Error{status;constructor(t,n={}){super(t),this.name="SteamGameError",this.status=n.status}};function le(e){let t=new URL(`${de}/api/appdetails`);return t.searchParams.set("appids",e.toString()),t.searchParams.set("l","english"),t.toString()}async function fe({url:e}){let t=await o(e);if(!t.ok)throw new g(`${t.status} ${t.statusText}`,{status:t.status});let n=await t.json(),[r]=Object.values(n??{});if(!r?.success||!r.data)throw new g("Game not found",{status:404});return r.data}async function ge(e){let t=new URL(le(e));return t.searchParams.set("cc",await x()),fe({appid:e,url:t.toString()})}async function E(e){let t=await ge(e).then(n=>n.name).catch(async()=>(await v().catch(()=>{}))?.games.find(n=>n.appid===e)?.name);if(!t)throw new Error(`Steam has no game with app ID ${e}.`);return{appid:e,name:t}}var U=require("@raycast/api");async function w(){if(!(await(0,U.getApplications)()).some(t=>t.bundleId==="com.valvesoftware.steam"||/^steam$/i.test(t.name)))throw new Error("Steam isn't installed on this computer.")}var he=async e=>{await w();let t=await E(e.appid);return{message:`Launch ${t.name} in Steam?`,info:[{name:"App ID",value:String(t.appid)}]}};async function D(e){await w();let t=await E(e.appid);return await(0,M.open)(`steam://rungameid/${t.appid}`),{game:t,opened:!0}}0&&(module.exports={confirmation});
