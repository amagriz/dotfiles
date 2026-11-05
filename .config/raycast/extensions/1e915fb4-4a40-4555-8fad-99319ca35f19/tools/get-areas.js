"use strict";var J=Object.create;var N=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var Q=Object.getPrototypeOf,Y=Object.prototype.hasOwnProperty;var G=(t,r)=>{for(var e in r)N(t,e,{get:r[e],enumerable:!0})},I=(t,r,e,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of q(r))!Y.call(t,a)&&a!==e&&N(t,a,{get:()=>r[a],enumerable:!(s=B(r,a))||s.enumerable});return t};var j=(t,r,e)=>(e=t!=null?J(Q(t)):{},I(r||!t||!t.__esModule?N(e,"default",{value:t,enumerable:!0}):e,t)),K=t=>I(N({},"__esModule",{value:!0}),t);var ft={};G(ft,{default:()=>Dt});module.exports=K(ft);var T=require("@raycast/api"),gt=j(require("query-string"));var L=require("@raycast/utils");var i=require("@raycast/api"),X=j(require("dayjs")),Rt={inbox:{title:"Inbox",icon:{source:i.Icon.Tray,tintColor:i.Color.Blue}},today:{title:"Today",icon:{source:i.Icon.Star,tintColor:i.Color.Yellow}},evening:{title:"This Evening",icon:{source:i.Icon.Moon,tintColor:i.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:i.Icon.ArrowClockwise,tintColor:i.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:i.Icon.Calendar,tintColor:i.Color.Red}},anytime:{title:"Anytime",icon:{source:i.Icon.Layers,tintColor:i.Color.Green}},someday:{title:"Someday",icon:{source:i.Icon.Folder,tintColor:i.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:i.Icon.CheckCircle,tintColor:i.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:i.Icon.Folder,tintColor:i.Color.Green}:{source:i.Icon.Circle,tintColor:i.Color.Blue}})},Et={open:i.Icon.Circle,completed:{source:i.Icon.CheckCircle,tintColor:i.Color.Blue},canceled:{source:i.Icon.XMarkCircle,tintColor:i.Color.SecondaryText}},ht={open:i.Icon.Circle,completed:i.Icon.CheckCircle,canceled:i.Icon.XMarkCircle};function R(t=[],r=[]){let e=t.filter(a=>!a.area).map(a=>({...a,type:"project"})),s=[];return r.forEach(a=>{s.push({...a,type:"area"});let n=t.filter(c=>c.area&&c.area.id===a.id).map(c=>({...c,type:"project"}));s.push(...n)}),[...e,...s]}var p=class extends Error{constructor(e,s,a,n){super(n?`${n}: ${e}`:e);this.type=s;this.originalError=a;this.operation=n;this.name="ThingsError"}type;originalError;operation},C=async(t,r)=>{try{let e=await(0,L.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return e?JSON.parse(e):void 0}catch(e){let a=(typeof e=="string"?e:e instanceof Error?e.message:String(e)).replace("execution error: Error: ","");throw a.match(/Application can't be found/i)?new p("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",a,r):a.match(/not allowed assistive access/i)||a.match(/permission/i)||a.match(/-1743/)?new p("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",a,r):a.match(/doesn't understand/i)||a.match(/can't get/i)?new p("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",a,r):a.match(/timed out/i)?new p("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",a,r):new p(`Unexpected error: ${a}`,"UNKNOWN_ERROR",a,r)}};var l=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,z="tag => tag.name()",V=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,Z=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${l}(props.dueDate) : '',
    activationDate: props.activationDate ? ${l}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,tt=`project => {
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
    dueDate: props.dueDate ? ${l}(props.dueDate) : '',
    activationDate: props.activationDate ? ${l}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${Z})
  };
}`,et=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${l}(props.dueDate) : '',
    activationDate: props.activationDate ? ${l}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,at=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${et})
  };
}`;var rt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${z})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${V})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${tt})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${at})`}];async function x(t,...r){let e=new Set(r),s=[`const things = Application('${t}');`,"const result = {};",...rt.filter(({needs:n})=>n.some(c=>e.has(c))).map(({name:n,expr:c})=>`result.${n} = ${c};`),"return result;"].join(`
`),a=await C(s,`Get ${r.join(", ")}`);return Object.fromEntries(r.map(n=>[n,n==="lists"?R(a.projects,a.areas):a[n]]))}var D=require("fs"),_=require("os"),E=require("path"),d=require("@raycast/utils");var S={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},O=16,$=12,P=7,nt=15,st=31,w=262213760,u=69760;function m(t){if(!t||t===w||t===u)return null;let r=t>>O,e=t>>$&nt,s=t>>P&st;return r<=0||e<1||e>12||s<1||s>31?null:`${r.toString().padStart(4,"0")}-${e.toString().padStart(2,"0")}-${s.toString().padStart(2,"0")}`}function b(t,r,e){return t<<O|r<<$|e<<P}function ot(t,r){let e=m(t);if(!e)return null;let[s,a,n]=e.split("-").map(Number),c=new Date(s,a-1,n);return c.setDate(c.getDate()+r),b(c.getFullYear(),c.getMonth()+1,c.getDate())}function M(){let t=b(2026,6,11),r=m(t),e="2026-06-11";if(r!==e)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${e}", got "${r}".`)}function it(t){if(!t||typeof t!="string")return null;let r=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return r?parseInt(r[1],10):null}function A(t,r,e,s){let a=null;if(t?a=m(t):e&&e!==u&&(a=m(e)),r===w){let n=it(s);if(n!==null&&e){let c=ot(e,n);return{effectiveDeadline:c!==null?m(c):null,effectiveStartDate:a,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:a,dueDateIsRecurring:!0}}return r?{effectiveDeadline:m(r),effectiveStartDate:a,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:a,dueDateIsRecurring:!1}}function ct(){let t=(0,E.join)((0,_.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),r=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,D.existsSync)(t))throw r;let e=[],s=(0,D.readdirSync)(t).find(n=>n.startsWith("ThingsData-"));s&&e.push((0,E.join)(t,s,"Things Database.thingsdatabase","main.sqlite")),e.push((0,E.join)(t,"Things Database.thingsSQLite"));let a=e.find(D.existsSync);if(a)return a;throw r}var f;async function ut(){if(f&&(0,D.existsSync)(f))return f;let t=ct();return M(),await pt(t),f=t,f}async function pt(t){let r=Object.keys(S).map(n=>`'${n}'`).join(", "),e=await(0,d.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${r})`),s={};for(let n of e)s[n.table_name]||(s[n.table_name]=new Set),s[n.table_name].add(n.column_name);let a=n=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${n}`);for(let[n,c]of Object.entries(S)){if(!s[n])throw a(`Table "${n}" not found.`);let o=c.filter(h=>!s[n].has(h));if(o.length)throw a(`Missing column(s) in "${n}": ${o.join(", ")}.`)}}var y=t=>`CASE ${t} WHEN 2 THEN 'canceled' WHEN 3 THEN 'completed' ELSE 'open' END`,g=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`,k=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = ${t}.uuid)`;var dt=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${u}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,xt=`${dt},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${g("t")} as tagList`,lt="COALESCE(p.trashed, 0) = 0",Ot=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${lt}`;function F(t){let{effectiveDeadline:r,effectiveStartDate:e}=A(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,status:t.status,notes:t.notes,tags:t.tags??"",areaTags:null,dueDate:r??"",activationDate:e??"",creationDate:t.creationDate??""}}var $t=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${u}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${g("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${u}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${g("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,mt=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,Pt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${mt}
  )`;async function U(...t){let r=await ut(),e=new Set(t),s={};if(e.has("tags")||e.has("tagsWithHierarchy")){let a=await(0,d.executeSQL)(r,"SELECT t.title, p.title as parentTitle FROM TMTag t LEFT JOIN TMTag p ON p.uuid = t.parent ORDER BY t.title COLLATE NOCASE");e.has("tags")&&(s.tags=a.map(n=>n.title)),e.has("tagsWithHierarchy")&&(s.tagsWithHierarchy=a.map(n=>({name:n.title,parent:n.parentTitle??null})))}if(e.has("projects")||e.has("lists")){let[a,n]=await Promise.all([(0,d.executeSQL)(r,`SELECT p.uuid as id, p.title as name,
          ${y("p.status")} as status,
          COALESCE(p.notes, '') as notes,
          ${g("p")} as tags,
          p.deadline, p.startDate,
          NULLIF(p.rt1_nextInstanceStartDate, ${u}) as nextInstanceStartDate,
          p.rt1_recurrenceRule as recurrenceRule,
          a.uuid as areaId, a.title as areaName,
          ${k("a")} as areaTags
        FROM TMTask p
        LEFT JOIN TMArea a ON a.uuid = p.area
        WHERE p.type = 1 AND p.trashed = 0 AND p.status = 0
        ORDER BY p."index" ASC`),(0,d.executeSQL)(r,`SELECT t.uuid as id, t.title as name,
          ${y("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${g("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${u}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.project as projectId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0
        ORDER BY t."index" ASC`)]),c={};for(let o of n)o.projectId&&(c[o.projectId]||(c[o.projectId]=[]),c[o.projectId].push(F(o)));s.projects=a.map(o=>{let{effectiveDeadline:h,effectiveStartDate:W}=A(o.startDate??0,o.deadline??0,o.nextInstanceStartDate??0,o.recurrenceRule);return{id:o.id,name:o.name,status:o.status,notes:o.notes,tags:o.tags??"",dueDate:h??"",activationDate:W??"",area:o.areaId?{id:o.areaId,name:o.areaName??"",tags:o.areaTags??""}:void 0,todos:c[o.id]??[]}})}if(e.has("areas")||e.has("lists")){let[a,n]=await Promise.all([(0,d.executeSQL)(r,`SELECT a.uuid as id, a.title as name,
          ${k("a")} as tags
        FROM TMArea a
        ORDER BY a."index" ASC`),(0,d.executeSQL)(r,`SELECT t.uuid as id, t.title as name,
          ${y("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${g("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${u}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.area as areaId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0 AND t.project IS NULL AND t.area IS NOT NULL
        ORDER BY t."index" ASC`)]),c={};for(let o of n)o.areaId&&(c[o.areaId]||(c[o.areaId]=[]),c[o.areaId].push(F(o)));s.areas=a.map(o=>({id:o.id,name:o.name,tags:o.tags??"",todos:c[o.id]??[]}))}return e.has("lists")&&(s.lists=R(s.projects,s.areas)),Object.fromEntries(t.map(a=>[a,s[a]]))}var v=(0,T.getPreferenceValues)();async function H(...t){return v.useUnofficialApi?U(...t):x(v.thingsAppIdentifier,...t)}async function Dt(){let{areas:t}=await H("areas");return t}
