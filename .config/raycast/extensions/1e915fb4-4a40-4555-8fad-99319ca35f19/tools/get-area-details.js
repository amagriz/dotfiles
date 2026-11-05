"use strict";var M=Object.create;var m=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty;var v=(t,a)=>{for(var e in a)m(t,e,{get:a[e],enumerable:!0})},R=(t,a,e,s)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of F(a))!U.call(t,r)&&r!==e&&m(t,r,{get:()=>a[r],enumerable:!(s=k(a,r))||s.enumerable});return t};var E=(t,a,e)=>(e=t!=null?M(_(t)):{},R(a||!t||!t.__esModule?m(e,"default",{value:t,enumerable:!0}):e,t)),H=t=>R(m({},"__esModule",{value:!0}),t);var dt={};v(dt,{default:()=>pt});module.exports=H(dt);var l=require("@raycast/api"),ut=E(require("query-string"));var h=require("@raycast/utils");var n=require("@raycast/api"),W=E(require("dayjs")),gt={inbox:{title:"Inbox",icon:{source:n.Icon.Tray,tintColor:n.Color.Blue}},today:{title:"Today",icon:{source:n.Icon.Star,tintColor:n.Color.Yellow}},evening:{title:"This Evening",icon:{source:n.Icon.Moon,tintColor:n.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:n.Icon.ArrowClockwise,tintColor:n.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:n.Icon.Calendar,tintColor:n.Color.Red}},anytime:{title:"Anytime",icon:{source:n.Icon.Layers,tintColor:n.Color.Green}},someday:{title:"Someday",icon:{source:n.Icon.Folder,tintColor:n.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:n.Icon.CheckCircle,tintColor:n.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:n.Icon.Folder,tintColor:n.Color.Green}:{source:n.Icon.Circle,tintColor:n.Color.Blue}})},Dt={open:n.Icon.Circle,completed:{source:n.Icon.CheckCircle,tintColor:n.Color.Blue},canceled:{source:n.Icon.XMarkCircle,tintColor:n.Color.SecondaryText}},ft={open:n.Icon.Circle,completed:n.Icon.CheckCircle,canceled:n.Icon.XMarkCircle};var i=class extends Error{constructor(e,s,r,o){super(o?`${o}: ${e}`:e);this.type=s;this.originalError=r;this.operation=o;this.name="ThingsError"}type;originalError;operation},S=async(t,a)=>{try{let e=await(0,h.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return e?JSON.parse(e):void 0}catch(e){let r=(typeof e=="string"?e:e instanceof Error?e.message:String(e)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new i("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,a):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new i("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,a):r.match(/doesn't understand/i)||r.match(/can't get/i)?new i("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,a):r.match(/timed out/i)?new i("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,a):new i(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,a)}};function A(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var c=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,B="tag => tag.name()",q=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,Q=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${c}(props.dueDate) : '',
    activationDate: props.activationDate ? ${c}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,Y=`project => {
  const props = project.properties();
  const areaRef = props.area;
  let area = null;
  if (areaRef) {
    const areaProps = areaRef.properties();
    area = { id: areaProps.id, name: areaProps.name, tags: areaRef.tagNames() };
  }
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: project.tagNames(),
    dueDate: props.dueDate ? ${c}(props.dueDate) : '',
    activationDate: props.activationDate ? ${c}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${Q})
  };
}`,G=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${c}(props.dueDate) : '',
    activationDate: props.activationDate ? ${c}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,K=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${G})
  };
}`;async function y(t,a){let e=await S(`
  const things = Application('${t}');
  const matches = things.areas.whose({id: '${A(a)}'})();
  if (!matches.length) return null;
  const area = matches[0];
  const props = area.properties();
  const todos = area.toDos().filter(t => t.status() === 'open' && !t.project());
  const projects = area.projects().filter(p => p.status() === 'open');
  return {
    id: props.id,
    name: props.name,
    tags: (area.tagNames() || '').split(', ').filter(t => t),
    projectCount: projects.length,
    todoCount: todos.length,
  };
`,"Get area details");return e||null}var Rt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${B})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${q})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${Y})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${K})`}];var u=require("fs"),x=require("os"),g=require("path"),T=require("@raycast/utils");var D={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},I=16,j=12,L=7,X=15,z=31,V=262213760,p=69760;function Z(t){if(!t||t===V||t===p)return null;let a=t>>I,e=t>>j&X,s=t>>L&z;return a<=0||e<1||e>12||s<1||s>31?null:`${a.toString().padStart(4,"0")}-${e.toString().padStart(2,"0")}-${s.toString().padStart(2,"0")}`}function tt(t,a,e){return t<<I|a<<j|e<<L}function C(){let t=tt(2026,6,11),a=Z(t),e="2026-06-11";if(a!==e)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${e}", got "${a}".`)}function et(){let t=(0,g.join)((0,x.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),a=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,u.existsSync)(t))throw a;let e=[],s=(0,u.readdirSync)(t).find(o=>o.startsWith("ThingsData-"));s&&e.push((0,g.join)(t,s,"Things Database.thingsdatabase","main.sqlite")),e.push((0,g.join)(t,"Things Database.thingsSQLite"));let r=e.find(u.existsSync);if(r)return r;throw a}var d;async function at(){if(d&&(0,u.existsSync)(d))return d;let t=et();return C(),await rt(t),d=t,d}async function rt(t){let a=Object.keys(D).map(o=>`'${o}'`).join(", "),e=await(0,T.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${a})`),s={};for(let o of e)s[o.table_name]||(s[o.table_name]=new Set),s[o.table_name].add(o.column_name);let r=o=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${o}`);for(let[o,w]of Object.entries(D)){if(!s[o])throw r(`Table "${o}" not found.`);let N=w.filter(b=>!s[o].has(b));if(N.length)throw r(`Missing column(s) in "${o}": ${N.join(", ")}.`)}}function nt(t){return t.replace(/'/g,"''")}var f=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`,st=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = ${t}.uuid)`;var ot=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${p}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,jt=`${ot},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${f("t")} as tagList`,it="COALESCE(p.trashed, 0) = 0",Lt=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${it}`;async function $(t){let a=await at(),e=`
    SELECT
      a.uuid as id, a.title as name,
      ${st("a")} as tagList,
      (SELECT COUNT(*) FROM TMTask p WHERE p.area = a.uuid AND p.type = 1 AND p.trashed = 0 AND p.status = 0) as projectCount,
      (SELECT COUNT(*) FROM TMTask t WHERE t.area = a.uuid AND t.type = 0 AND t.project IS NULL AND t.trashed = 0 AND t.status = 0) as todoCount
    FROM TMArea a
    WHERE a.uuid = '${nt(t)}' LIMIT 1`,s=await(0,T.executeSQL)(a,e);if(!s.length)return null;let r=s[0];return{id:r.id,name:r.name,tags:r.tagList?r.tagList.split(", ").filter(Boolean):[],projectCount:r.projectCount,todoCount:r.todoCount}}var Ct=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${p}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${f("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${p}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${f("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,ct=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,xt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${ct}
  )`;var P=(0,l.getPreferenceValues)();async function O(t){return P.useUnofficialApi?$(t):y(P.thingsAppIdentifier,t)}async function pt({areaId:t}){if(!t?.trim())throw new Error("areaId is required.");let a=await O(t.trim());if(!a)throw new Error(`Area with ID "${t}" not found.`);return a}
