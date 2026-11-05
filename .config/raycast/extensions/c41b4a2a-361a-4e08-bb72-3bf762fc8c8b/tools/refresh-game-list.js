"use strict";var ue=Object.create;var x=Object.defineProperty;var le=Object.getOwnPropertyDescriptor;var de=Object.getOwnPropertyNames;var fe=Object.getPrototypeOf,me=Object.prototype.hasOwnProperty;var pe=(e,t)=>{for(var r in t)x(e,r,{get:t[r],enumerable:!0})},N=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of de(t))!me.call(e,a)&&a!==r&&x(e,a,{get:()=>t[a],enumerable:!(n=le(t,a))||n.enumerable});return e};var he=(e,t,r)=>(r=e!=null?ue(fe(e)):{},N(t||!e||!e.__esModule?x(r,"default",{value:e,enumerable:!0}):r,e)),ge=e=>N(x({},"__esModule",{value:!0}),e);var He={};pe(He,{confirmation:()=>Ke,default:()=>ce});module.exports=ge(He);var se=require("@raycast/api");var T=require("@raycast/api");var w=require("@raycast/api");var d=he(require("react")),s=require("@raycast/api");var D=require("react/jsx-runtime");var Ze=!!process.env.RAYCASTX;var M=require("react");var I="rejected-key",W=new Set;async function F(e){await w.LocalStorage.setItem(I,e),W.forEach(t=>t())}async function G(e){await w.LocalStorage.getItem(I)===e&&(await w.LocalStorage.removeItem(I),W.forEach(t=>t()))}var P=require("@raycast/api"),j=require("node:dns/promises"),V=e=>{let{origin:t,pathname:r}=new URL(e);return t+r},be="raycast-steam (+https://www.raycast.com/KevinBatdorf/steam)",h=class extends Error{},ye=new Set(["ENETUNREACH","ENETDOWN"]),$e=new Set(["ENOTFOUND","EAI_AGAIN"]);async function we(e){let t=e?.cause?.code;if(!t)return!1;if(ye.has(t))return!0;if(!$e.has(t))return!1;let r,n=new Promise(a=>{r=setTimeout(()=>a(!0),3e3)});try{return await Promise.race([(0,j.lookup)("one.one.one.one").then(()=>!1,()=>!0),n])}finally{clearTimeout(r)}}async function g(e,t){let r;try{r=await fetch(e,{...t,headers:{"User-Agent":be,...t?.headers}})}catch(n){if(await we(n))throw new h("You're offline. Check your connection and try again.");let a=n instanceof Error?n.message:String(n);throw(0,P.captureException)(new Error(`${a}: ${V(e)}`)),new h("Couldn't reach Steam. Try again in a moment.")}if(r.status>=500){let n=[r.status,r.statusText].filter(Boolean).join(" ");(0,P.captureException)(new Error(`${n}: ${V(e)}`))}return r}var E=require("@raycast/api");var b=require("@raycast/api"),B=require("fs"),K=require("node:sqlite"),H=require("path");var z=8,Ee=5e4,v=2e3,J=new b.Cache({namespace:"game-list"}),Se=()=>Number(J.get("app-count"))||2e5,f=class extends Error{constructor(r,n){super(r);this.status=n}status},ke=new Set;var R,C,xe=e=>e.normalize("NFD").replace(new RegExp("\\p{M}","gu"),"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();function c(){if(R)return R;(0,B.mkdirSync)(b.environment.supportPath,{recursive:!0});let e=new K.DatabaseSync((0,H.join)(b.environment.supportPath,"apps.sqlite"));try{e.exec("PRAGMA busy_timeout = 5000"),e.exec("PRAGMA journal_mode = WAL"),e.exec("BEGIN IMMEDIATE");try{let{user_version:t}=e.prepare("PRAGMA user_version").get();t!==z&&e.exec(`
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
          PRAGMA user_version = ${z};
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
      `),e.exec("COMMIT")}catch(t){throw e.exec("ROLLBACK"),t}}catch(t){throw e.close(),t}return R=e,R}function U(){let e=c().prepare("SELECT value FROM meta WHERE key = 'synced_at'").get();return Number(e?.value??0)}function q(){try{return U()>0}catch{return!1}}function Y(){return(Date.now()/1e3-U())/86400}var ve=new Set;function X(e){return C??=Re(e).then(()=>ve.forEach(t=>t())).finally(()=>{C=void 0}),C}async function Re(e){let t=Math.floor(Date.now()/1e3),r=U()?t:0,n=c().prepare(`INSERT INTO app (appid, name, compact_name, padded_name, kind, generation, first_seen, last_modified)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (appid) DO UPDATE SET name = excluded.name, compact_name = excluded.compact_name,
       padded_name = excluded.padded_name, kind = excluded.kind, generation = excluded.generation,
       last_modified = excluded.last_modified`),a=0,i=Se(),y=new Map(c().prepare("SELECT kind, count(*) AS count FROM app GROUP BY kind").all().map(u=>[u.kind,u.count])),A=new Map;for(let u of O){let _=0;for(;;){let $=new URL("https://api.steampowered.com/IStoreService/GetAppList/v1/");$.searchParams.set("key",e),$.searchParams.set("max_results",String(Ee));for(let l of O)$.searchParams.set(_e[l],String(l===u));_&&$.searchParams.set("last_appid",String(_));let p=await g($);if(!p.ok)throw new f(p.status===401||p.status===403?"Steam rejected the Web API Key":`Could not download the Steam game list (${p.status})`,p.status);let{response:S}=await p.json(),k=S?.apps??[];for(let l=0;l<k.length;l+=v){c().exec("BEGIN");try{for(let o of k.slice(l,l+v))o.appid&&o.name&&n.run(o.appid,o.name,Te(o.name),Ae(o.name),u,t,r,o.last_modified??0);c().exec("COMMIT")}catch(o){throw c().exec("ROLLBACK"),o}a+=Math.min(v,k.length-l),A.set(u,(A.get(u)??0)+Math.min(v,k.length-l)),ke.forEach(o=>o(Math.min(a/i,.99))),await new Promise(o=>setImmediate(o))}if(!S?.have_more_results||!S.last_appid)break;_=S.last_appid}}for(let u of O)if((A.get(u)??0)<(y.get(u)??0)/2)throw new f("Steam sent an incomplete game list. Try again later.",0);c().exec("BEGIN");try{c().prepare("DELETE FROM app WHERE generation != ?").run(t),c().prepare("INSERT INTO meta (key, value) VALUES ('synced_at', ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value").run(String(t)),c().exec("COMMIT")}catch(u){throw c().exec("ROLLBACK"),u}J.set("app-count",String(a))}var Z=e=>xe(e).split(" ").filter(Boolean),Te=e=>Z(e).join(""),Ae=e=>Z(e).map(t=>`  ${t} `).join("");var O=["game","software","dlc","video","hardware"],_e={game:"include_games",software:"include_software",dlc:"include_dlc",video:"include_videos",hardware:"include_hardware"};function Q(e){let t=r=>c().prepare(r).get(e).count;return{apps:t("SELECT count(*) AS count FROM app WHERE first_seen >= ?"),owned:t("SELECT count(*) AS count FROM library WHERE baseline = 0 AND first_seen >= ?")}}function ee(e,t){let r=c();r.exec("BEGIN");try{let{count:n}=r.prepare("SELECT count(*) AS count FROM library WHERE owner = ?").get(e),a=r.prepare("INSERT OR IGNORE INTO library (owner, appid, first_seen, baseline) VALUES (?, ?, ?, ?)");for(let i of t)a.run(e,i,Math.floor(Date.now()/1e3),n?0:1);r.prepare("DELETE FROM library WHERE owner = ? AND appid NOT IN (SELECT value FROM json_each(?))").run(e,JSON.stringify(t)),r.exec("COMMIT")}catch(n){throw r.exec("ROLLBACK"),n}}var L=require("@raycast/api");var m=class extends Error{status;constructor(t,r={}){super(t),this.name="SteamApiError",this.status=r.status}},Ie="https://api.steampowered.com";var te=new L.Cache({namespace:"steam-id"});async function re(e,t){let r=e.trim(),n=Ue(r);if(n)return n;let a=Le(r);if(!a)throw new m("Steam ID should be a 17-digit ID, a profile URL, or your custom URL name.");let i=te.get(a.toLowerCase());if(i)return i;let y=await Pe(a,t);if(!y)throw new m(`No Steam profile found for "${a}".`);return te.set(a.toLowerCase(),y),y}async function Pe(e,t){let r=await Ce("ISteamUser/ResolveVanityURL/v1/",t,{vanityurl:e});if(r.response.success===1)return r.response.steamid}async function Ce(e,t,r){let n=new URL(`${Ie}/${e}`);n.searchParams.set("key",t);for(let[a,i]of Object.entries(r))i!==void 0&&n.searchParams.set(a,String(i));return Oe(n,{headers:{Accept:"application/json"}}).catch(a=>{throw Me(a)?We(a):a})}async function Oe(e,t){let r=await g(e,t);if(!r.ok){let n=await r.text();throw new m(`${r.status} ${r.statusText}: ${De(n)}`,{status:r.status})}return await r.json()}function Ue(e){let t=e.match(/^\d{17}$/)?.[0];return t||(e.match(/steamcommunity\.com\/profiles\/(\d{17})/i)?.[1]??e.match(/\/profiles\/(\d{17})/i)?.[1])}function Le(e){let t=Ne(e);if(t)return t;if(/^[a-zA-Z0-9_-]{2,64}$/.test(e)&&!/^\d+$/.test(e))return e}function Ne(e){return e.match(/steamcommunity\.com\/id\/([^/?#]+)/i)?.[1]??e.match(/\/id\/([^/?#]+)/i)?.[1]}function De(e){return e.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,240)}function Me(e){return e instanceof m&&(e.status===401||e.status===403)}function We(e){return new m("Steam rejected the Web API Key",{status:e.status})}async function Fe(){let{token:e,steamid:t}=(0,E.getPreferenceValues)(),r=e?.trim(),n=t?.trim();if(!r||!n)throw new Error("Set your Web API Key and Steam ID in the Steam extension preferences to read your library.");return{key:r,steamid:await re(n,r)}}async function Ge(e){let{key:t,steamid:r}=await Fe(),n=new URL(`https://api.steampowered.com/IPlayerService/${e}/v1/`);n.searchParams.set("key",t),n.searchParams.set("steamid",r),n.searchParams.set("include_appinfo","1"),n.searchParams.set("include_played_free_games","1"),n.searchParams.set("format","json");let a=await g(n);if(a.status===401||a.status===403)throw new Error("Steam rejected the Web API Key. Check it in the Steam extension preferences.");if(!a.ok)throw new Error(`Steam could not load your library (${a.status}).`);let i=await a.json();return{count:i.response?.game_count??i.response?.total_count,games:i.response?.games??[]}}var Ve=()=>(0,E.getPreferenceValues)().steamid?.trim()??"";async function ne(){let e=await Ge("GetOwnedGames");if(!e.games.length)return e;try{ee(Ve(),e.games.map(t=>t.appid))}catch(t){(0,E.captureException)(t)}return e}var je=e=>e instanceof f&&(e.status===401||e.status===403);async function ze(e){try{await X(e)}catch(t){throw t instanceof h||t instanceof f&&t.status>=500||(0,T.captureException)(t),je(t)&&await F(e),t}await G(e)}async function ae(e){let t=Math.floor(Date.now()/1e3);return await ze(e),(0,T.getPreferenceValues)().steamid?.trim()&&await ne().catch(()=>{}),Q(t)}var ie="Updating the game list needs a Web API Key in the Steam extension preferences.",oe=()=>(0,se.getPreferenceValues)().token?.trim();function Be(){if(!q())return"Never";let e=Math.floor(Y());return e===0?"Today":`${e} day${e===1?"":"s"} ago`}var Ke=async()=>{if(!oe())throw new Error(ie);return{message:"Update the Steam game list now?",info:[{name:"Last updated",value:Be()}]}};async function ce(){let e=oe();if(!e)throw new Error(ie);let t=Date.now(),r=await ae(e);return{updated:!0,seconds:Math.round((Date.now()-t)/1e3),newOnSteam:r.apps,newInLibrary:r.owned}}0&&(module.exports={confirmation});
