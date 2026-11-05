"use strict";var v=Object.create;var D=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,B=Object.prototype.hasOwnProperty;var q=(t,a)=>{for(var e in a)D(t,e,{get:a[e],enumerable:!0})},h=(t,a,e,o)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of W(a))!B.call(t,r)&&r!==e&&D(t,r,{get:()=>a[r],enumerable:!(o=H(a,r))||o.enumerable});return t};var S=(t,a,e)=>(e=t!=null?v(J(t)):{},h(a||!t||!t.__esModule?D(e,"default",{value:t,enumerable:!0}):e,t)),Q=t=>h(D({},"__esModule",{value:!0}),t);var Nt={};q(Nt,{default:()=>Tt});module.exports=Q(Nt);var g=require("@raycast/api"),ft=S(require("query-string"));var A=require("@raycast/utils");var n=require("@raycast/api"),Y=S(require("dayjs")),ht={inbox:{title:"Inbox",icon:{source:n.Icon.Tray,tintColor:n.Color.Blue}},today:{title:"Today",icon:{source:n.Icon.Star,tintColor:n.Color.Yellow}},evening:{title:"This Evening",icon:{source:n.Icon.Moon,tintColor:n.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:n.Icon.ArrowClockwise,tintColor:n.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:n.Icon.Calendar,tintColor:n.Color.Red}},anytime:{title:"Anytime",icon:{source:n.Icon.Layers,tintColor:n.Color.Green}},someday:{title:"Someday",icon:{source:n.Icon.Folder,tintColor:n.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:n.Icon.CheckCircle,tintColor:n.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:n.Icon.Folder,tintColor:n.Color.Green}:{source:n.Icon.Circle,tintColor:n.Color.Blue}})},St={open:n.Icon.Circle,completed:{source:n.Icon.CheckCircle,tintColor:n.Color.Blue},canceled:{source:n.Icon.XMarkCircle,tintColor:n.Color.SecondaryText}},At={open:n.Icon.Circle,completed:n.Icon.CheckCircle,canceled:n.Icon.XMarkCircle};var c=class extends Error{constructor(e,o,r,s){super(s?`${s}: ${e}`:e);this.type=o;this.originalError=r;this.operation=s;this.name="ThingsError"}type;originalError;operation},y=async(t,a)=>{try{let e=await(0,A.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return e?JSON.parse(e):void 0}catch(e){let r=(typeof e=="string"?e:e instanceof Error?e.message:String(e)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new c("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,a):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new c("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,a):r.match(/doesn't understand/i)||r.match(/can't get/i)?new c("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,a):r.match(/timed out/i)?new c("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,a):new c(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,a)}};function I(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var u=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,K="tag => tag.name()",X=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,z=`todo => {
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
}`,V=`project => {
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
    todos: project.toDos().map(${z})
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
    dueDate: props.dueDate ? ${u}(props.dueDate) : '',
    activationDate: props.activationDate ? ${u}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,tt=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${Z})
  };
}`;async function j(t,a){let e=await y(`
  const things = Application('${t}');
  const matches = things.toDos.whose({id: '${I(a)}'})();
  if (!matches.length) return null;
  const todo = matches[0];
  const props = todo.properties();
  const projectRef = props.project;
  const areaRef = props.area;
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: (todo.tagNames() || '').split(', ').filter(t => t),
    dueDate: props.dueDate ? ${u}(props.dueDate) : undefined,
    dueDateIsRecurring: false,
    activationDate: props.activationDate ? ${u}(props.activationDate) : undefined,
    isRecurring: false,
    projectName: projectRef ? projectRef.name() : undefined,
    projectId: projectRef ? projectRef.id() : undefined,
    areaName: areaRef ? areaRef.name() : undefined,
    areaId: areaRef ? areaRef.id() : undefined,
    checklistItems: null,
  };
`,"Get todo details");return e||null}var jt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${K})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${X})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${V})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${tt})`}];var l=require("fs"),b=require("os"),f=require("path"),T=require("@raycast/utils");var R={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},L=16,C=12,x=7,et=15,at=31,$=262213760,d=69760;function p(t){if(!t||t===$||t===d)return null;let a=t>>L,e=t>>C&et,o=t>>x&at;return a<=0||e<1||e>12||o<1||o>31?null:`${a.toString().padStart(4,"0")}-${e.toString().padStart(2,"0")}-${o.toString().padStart(2,"0")}`}function P(t,a,e){return t<<L|a<<C|e<<x}function rt(t,a){let e=p(t);if(!e)return null;let[o,r,s]=e.split("-").map(Number),i=new Date(o,r-1,s);return i.setDate(i.getDate()+a),P(i.getFullYear(),i.getMonth()+1,i.getDate())}function O(){let t=P(2026,6,11),a=p(t),e="2026-06-11";if(a!==e)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${e}", got "${a}".`)}function nt(t){if(!t||typeof t!="string")return null;let a=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return a?parseInt(a[1],10):null}function w(t,a,e,o){let r=null;if(t?r=p(t):e&&e!==d&&(r=p(e)),a===$){let s=nt(o);if(s!==null&&e){let i=rt(e,s);return{effectiveDeadline:i!==null?p(i):null,effectiveStartDate:r,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!0}}return a?{effectiveDeadline:p(a),effectiveStartDate:r,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!1}}function st(){let t=(0,f.join)((0,b.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),a=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,l.existsSync)(t))throw a;let e=[],o=(0,l.readdirSync)(t).find(s=>s.startsWith("ThingsData-"));o&&e.push((0,f.join)(t,o,"Things Database.thingsdatabase","main.sqlite")),e.push((0,f.join)(t,"Things Database.thingsSQLite"));let r=e.find(l.existsSync);if(r)return r;throw a}var m;async function ot(){if(m&&(0,l.existsSync)(m))return m;let t=st();return O(),await it(t),m=t,m}async function it(t){let a=Object.keys(R).map(s=>`'${s}'`).join(", "),e=await(0,T.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${a})`),o={};for(let s of e)o[s.table_name]||(o[s.table_name]=new Set),o[s.table_name].add(s.column_name);let r=s=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${s}`);for(let[s,i]of Object.entries(R)){if(!o[s])throw r(`Table "${s}" not found.`);let N=i.filter(U=>!o[s].has(U));if(N.length)throw r(`Missing column(s) in "${s}": ${N.join(", ")}.`)}}function M(t){return t.replace(/'/g,"''")}function ct(t){return t===2?"canceled":t===3?"completed":"open"}var E=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var ut=`
  FROM TMTask t
  LEFT JOIN TMTask p ON t.project = p.uuid
  LEFT JOIN TMArea pa ON p.area = pa.uuid
  LEFT JOIN TMArea a ON t.area = a.uuid`,pt=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${d}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,dt=`${pt},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${E("t")} as tagList`,lt="COALESCE(p.trashed, 0) = 0",Ot=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${lt}`;function mt(t){let{effectiveDeadline:a,effectiveStartDate:e,dueDateIsRecurring:o}=w(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,dueDate:a??void 0,dueDateIsRecurring:o,activationDate:e??void 0,isRecurring:!!t.isRecurring,projectName:t.projectName??void 0,projectId:t.projectId??void 0,areaName:t.areaName??void 0,areaId:t.areaId??void 0}}async function k(t){let a=await ot(),e=`SELECT ${dt} ${ut}
    WHERE t.uuid = '${M(t)}' AND t.type = 0 AND t.trashed = 0 LIMIT 1`,[o,r]=await Promise.all([(0,T.executeSQL)(a,e),gt(a,t)]);if(!o.length)return null;let s=o[0];return{...mt(s),status:ct(s.status),notes:s.notes,tags:s.tagList?s.tagList.split(", ").filter(Boolean):[],checklistItems:r}}async function gt(t,a){let e=`SELECT uuid as id, title, status FROM TMChecklistItem WHERE task = '${M(a)}' ORDER BY "index"`;return(await(0,T.executeSQL)(t,e)).map(r=>({id:r.id,title:r.title,completed:r.status===3}))}var wt=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${d}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${E("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${d}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${E("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,Dt=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,bt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${Dt}
  )`;var F=(0,g.getPreferenceValues)();async function _(t){return F.useUnofficialApi?k(t):j(F.thingsAppIdentifier,t)}async function Tt({todoId:t}){if(!t?.trim())throw new Error("todoId is required.");let a=await _(t.trim());if(!a)throw new Error(`To-do with ID "${t}" not found.`);return a}
