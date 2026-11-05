"use strict";var U=Object.create;var D=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var B=(t,r)=>{for(var e in r)D(t,e,{get:r[e],enumerable:!0})},h=(t,r,e,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of H(r))!J.call(t,a)&&a!==e&&D(t,a,{get:()=>r[a],enumerable:!(o=v(r,a))||o.enumerable});return t};var S=(t,r,e)=>(e=t!=null?U(W(t)):{},h(r||!t||!t.__esModule?D(e,"default",{value:t,enumerable:!0}):e,t)),q=t=>h(D({},"__esModule",{value:!0}),t);var gt={};B(gt,{default:()=>mt});module.exports=q(gt);var g=require("@raycast/api"),lt=S(require("query-string"));var A=require("@raycast/utils");var n=require("@raycast/api"),Q=S(require("dayjs")),Tt={inbox:{title:"Inbox",icon:{source:n.Icon.Tray,tintColor:n.Color.Blue}},today:{title:"Today",icon:{source:n.Icon.Star,tintColor:n.Color.Yellow}},evening:{title:"This Evening",icon:{source:n.Icon.Moon,tintColor:n.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:n.Icon.ArrowClockwise,tintColor:n.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:n.Icon.Calendar,tintColor:n.Color.Red}},anytime:{title:"Anytime",icon:{source:n.Icon.Layers,tintColor:n.Color.Green}},someday:{title:"Someday",icon:{source:n.Icon.Folder,tintColor:n.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:n.Icon.CheckCircle,tintColor:n.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:n.Icon.Folder,tintColor:n.Color.Green}:{source:n.Icon.Circle,tintColor:n.Color.Blue}})},Nt={open:n.Icon.Circle,completed:{source:n.Icon.CheckCircle,tintColor:n.Color.Blue},canceled:{source:n.Icon.XMarkCircle,tintColor:n.Color.SecondaryText}},Rt={open:n.Icon.Circle,completed:n.Icon.CheckCircle,canceled:n.Icon.XMarkCircle};var c=class extends Error{constructor(e,o,a,s){super(s?`${s}: ${e}`:e);this.type=o;this.originalError=a;this.operation=s;this.name="ThingsError"}type;originalError;operation},y=async(t,r)=>{try{let e=await(0,A.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return e?JSON.parse(e):void 0}catch(e){let a=(typeof e=="string"?e:e instanceof Error?e.message:String(e)).replace("execution error: Error: ","");throw a.match(/Application can't be found/i)?new c("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",a,r):a.match(/not allowed assistive access/i)||a.match(/permission/i)||a.match(/-1743/)?new c("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",a,r):a.match(/doesn't understand/i)||a.match(/can't get/i)?new c("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",a,r):a.match(/timed out/i)?new c("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",a,r):new c(`Unexpected error: ${a}`,"UNKNOWN_ERROR",a,r)}};function I(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var u=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,G="tag => tag.name()",K=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,X=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${u}(props.dueDate) : '',
    activationDate: props.activationDate ? ${u}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,z=`project => {
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
    dueDate: props.dueDate ? ${u}(props.dueDate) : '',
    activationDate: props.activationDate ? ${u}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${X})
  };
}`,V=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${u}(props.dueDate) : '',
    activationDate: props.activationDate ? ${u}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,Z=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${V})
  };
}`;async function j(t,r){let e=await y(`
  const things = Application('${t}');
  const matches = things.projects.whose({id: '${I(r)}'})();
  if (!matches.length) return null;
  const project = matches[0];
  const props = project.properties();
  const areaRef = props.area;
  const todoCount = project.toDos().filter(t => t.status() === 'open').length;
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: (project.tagNames() || '').split(', ').filter(t => t),
    dueDate: props.dueDate ? ${u}(props.dueDate) : undefined,
    activationDate: props.activationDate ? ${u}(props.activationDate) : undefined,
    areaId: areaRef ? areaRef.id() : undefined,
    areaName: areaRef ? areaRef.name() : undefined,
    todoCount,
  };
`,"Get project details");return e||null}var St=[{name:"tags",needs:["tags"],expr:`things.tags().map(${G})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${K})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${z})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${Z})`}];var l=require("fs"),b=require("os"),f=require("path"),E=require("@raycast/utils");var R={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},L=16,C=12,x=7,tt=15,et=31,$=262213760,p=69760;function d(t){if(!t||t===$||t===p)return null;let r=t>>L,e=t>>C&tt,o=t>>x&et;return r<=0||e<1||e>12||o<1||o>31?null:`${r.toString().padStart(4,"0")}-${e.toString().padStart(2,"0")}-${o.toString().padStart(2,"0")}`}function P(t,r,e){return t<<L|r<<C|e<<x}function at(t,r){let e=d(t);if(!e)return null;let[o,a,s]=e.split("-").map(Number),i=new Date(o,a-1,s);return i.setDate(i.getDate()+r),P(i.getFullYear(),i.getMonth()+1,i.getDate())}function O(){let t=P(2026,6,11),r=d(t),e="2026-06-11";if(r!==e)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${e}", got "${r}".`)}function rt(t){if(!t||typeof t!="string")return null;let r=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return r?parseInt(r[1],10):null}function w(t,r,e,o){let a=null;if(t?a=d(t):e&&e!==p&&(a=d(e)),r===$){let s=rt(o);if(s!==null&&e){let i=at(e,s);return{effectiveDeadline:i!==null?d(i):null,effectiveStartDate:a,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:a,dueDateIsRecurring:!0}}return r?{effectiveDeadline:d(r),effectiveStartDate:a,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:a,dueDateIsRecurring:!1}}function nt(){let t=(0,f.join)((0,b.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),r=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,l.existsSync)(t))throw r;let e=[],o=(0,l.readdirSync)(t).find(s=>s.startsWith("ThingsData-"));o&&e.push((0,f.join)(t,o,"Things Database.thingsdatabase","main.sqlite")),e.push((0,f.join)(t,"Things Database.thingsSQLite"));let a=e.find(l.existsSync);if(a)return a;throw r}var m;async function st(){if(m&&(0,l.existsSync)(m))return m;let t=nt();return O(),await ot(t),m=t,m}async function ot(t){let r=Object.keys(R).map(s=>`'${s}'`).join(", "),e=await(0,E.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${r})`),o={};for(let s of e)o[s.table_name]||(o[s.table_name]=new Set),o[s.table_name].add(s.column_name);let a=s=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${s}`);for(let[s,i]of Object.entries(R)){if(!o[s])throw a(`Table "${s}" not found.`);let N=i.filter(_=>!o[s].has(_));if(N.length)throw a(`Missing column(s) in "${s}": ${N.join(", ")}.`)}}function it(t){return t.replace(/'/g,"''")}function ct(t){return t===2?"canceled":t===3?"completed":"open"}var T=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var ut=`
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
  COALESCE(a.uuid, pa.uuid) as areaId`,Ct=`${ut},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${T("t")} as tagList`,pt="COALESCE(p.trashed, 0) = 0",xt=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${pt}`;async function M(t){let r=await st(),e=`
    SELECT
      p.uuid as id, p.title as name, p.status,
      COALESCE(p.notes, '') as notes,
      p.deadline, p.startDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${p}) as nextInstanceStartDate,
      p.rt1_recurrenceRule as recurrenceRule,
      a.uuid as areaId, a.title as areaName,
      ${T("p")} as tagList,
      (SELECT COUNT(*) FROM TMTask t WHERE t.project = p.uuid AND t.type = 0 AND t.trashed = 0 AND t.status = 0) as todoCount
    FROM TMTask p
    LEFT JOIN TMArea a ON a.uuid = p.area
    WHERE p.uuid = '${it(t)}' AND p.type = 1 AND p.trashed = 0 LIMIT 1`,o=await(0,E.executeSQL)(r,e);if(!o.length)return null;let a=o[0],{effectiveDeadline:s,effectiveStartDate:i}=w(a.startDate??0,a.deadline??0,a.nextInstanceStartDate??0,a.recurrenceRule);return{id:a.id,name:a.name,status:ct(a.status),notes:a.notes,tags:a.tagList?a.tagList.split(", ").filter(Boolean):[],dueDate:s??void 0,activationDate:i??void 0,areaId:a.areaId??void 0,areaName:a.areaName??void 0,todoCount:a.todoCount}}var $t=`
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
      ${T("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${p}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${T("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,dt=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,Pt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${dt}
  )`;var k=(0,g.getPreferenceValues)();async function F(t){return k.useUnofficialApi?M(t):j(k.thingsAppIdentifier,t)}async function mt({projectId:t}){if(!t?.trim())throw new Error("projectId is required.");let r=await F(t.trim());if(!r)throw new Error(`Project with ID "${t}" not found.`);return r}
