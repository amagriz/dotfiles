"use strict";var v=Object.create;var f=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var q=(t,e)=>{for(var a in e)f(t,a,{get:e[a],enumerable:!0})},h=(t,e,a,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of W(e))!J.call(t,r)&&r!==a&&f(t,r,{get:()=>e[r],enumerable:!(o=H(e,r))||o.enumerable});return t};var S=(t,e,a)=>(a=t!=null?v(B(t)):{},h(e||!t||!t.__esModule?f(a,"default",{value:t,enumerable:!0}):a,t)),Q=t=>h(f({},"__esModule",{value:!0}),t);var Nt={};q(Nt,{default:()=>Tt});module.exports=Q(Nt);var g=require("@raycast/api"),ft=S(require("query-string"));var A=require("@raycast/utils");var n=require("@raycast/api"),Y=S(require("dayjs")),ht={inbox:{title:"Inbox",icon:{source:n.Icon.Tray,tintColor:n.Color.Blue}},today:{title:"Today",icon:{source:n.Icon.Star,tintColor:n.Color.Yellow}},evening:{title:"This Evening",icon:{source:n.Icon.Moon,tintColor:n.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:n.Icon.ArrowClockwise,tintColor:n.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:n.Icon.Calendar,tintColor:n.Color.Red}},anytime:{title:"Anytime",icon:{source:n.Icon.Layers,tintColor:n.Color.Green}},someday:{title:"Someday",icon:{source:n.Icon.Folder,tintColor:n.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:n.Icon.CheckCircle,tintColor:n.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:n.Icon.Folder,tintColor:n.Color.Green}:{source:n.Icon.Circle,tintColor:n.Color.Blue}})},St={open:n.Icon.Circle,completed:{source:n.Icon.CheckCircle,tintColor:n.Color.Blue},canceled:{source:n.Icon.XMarkCircle,tintColor:n.Color.SecondaryText}},At={open:n.Icon.Circle,completed:n.Icon.CheckCircle,canceled:n.Icon.XMarkCircle};var c=class extends Error{constructor(a,o,r,s){super(s?`${s}: ${a}`:a);this.type=o;this.originalError=r;this.operation=s;this.name="ThingsError"}type;originalError;operation},I=async(t,e)=>{try{let a=await(0,A.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let r=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new c("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,e):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new c("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,e):r.match(/doesn't understand/i)||r.match(/can't get/i)?new c("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,e):r.match(/timed out/i)?new c("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,e):new c(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,e)}};function y(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var u=`(d => {
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
}`;async function j(t,e){if(!e.length)return[];let a=e.map(r=>`'${y(r)}'`).join(", ");return await I(`
  const things = Application('${t}');
  const ids = [${a}];
  return ids.map(id => {
    const matches = things.toDos.whose({id: id})();
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
  }).filter(t => t !== null);
`,"Get todos details")??[]}var jt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${K})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${X})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${V})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${tt})`}];var l=require("fs"),b=require("os"),T=require("path"),N=require("@raycast/utils");var R={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},L=16,C=12,x=7,et=15,at=31,$=262213760,d=69760;function p(t){if(!t||t===$||t===d)return null;let e=t>>L,a=t>>C&et,o=t>>x&at;return e<=0||a<1||a>12||o<1||o>31?null:`${e.toString().padStart(4,"0")}-${a.toString().padStart(2,"0")}-${o.toString().padStart(2,"0")}`}function P(t,e,a){return t<<L|e<<C|a<<x}function rt(t,e){let a=p(t);if(!a)return null;let[o,r,s]=a.split("-").map(Number),i=new Date(o,r-1,s);return i.setDate(i.getDate()+e),P(i.getFullYear(),i.getMonth()+1,i.getDate())}function O(){let t=P(2026,6,11),e=p(t),a="2026-06-11";if(e!==a)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${a}", got "${e}".`)}function nt(t){if(!t||typeof t!="string")return null;let e=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return e?parseInt(e[1],10):null}function w(t,e,a,o){let r=null;if(t?r=p(t):a&&a!==d&&(r=p(a)),e===$){let s=nt(o);if(s!==null&&a){let i=rt(a,s);return{effectiveDeadline:i!==null?p(i):null,effectiveStartDate:r,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!0}}return e?{effectiveDeadline:p(e),effectiveStartDate:r,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!1}}function st(){let t=(0,T.join)((0,b.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),e=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,l.existsSync)(t))throw e;let a=[],o=(0,l.readdirSync)(t).find(s=>s.startsWith("ThingsData-"));o&&a.push((0,T.join)(t,o,"Things Database.thingsdatabase","main.sqlite")),a.push((0,T.join)(t,"Things Database.thingsSQLite"));let r=a.find(l.existsSync);if(r)return r;throw e}var m;async function ot(){if(m&&(0,l.existsSync)(m))return m;let t=st();return O(),await it(t),m=t,m}async function it(t){let e=Object.keys(R).map(s=>`'${s}'`).join(", "),a=await(0,N.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${e})`),o={};for(let s of a)o[s.table_name]||(o[s.table_name]=new Set),o[s.table_name].add(s.column_name);let r=s=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${s}`);for(let[s,i]of Object.entries(R)){if(!o[s])throw r(`Table "${s}" not found.`);let D=i.filter(U=>!o[s].has(U));if(D.length)throw r(`Missing column(s) in "${s}": ${D.join(", ")}.`)}}function M(t){return t.replace(/'/g,"''")}function ct(t){return t===2?"canceled":t===3?"completed":"open"}var E=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var ut=`
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
  ${E("t")} as tagList`,lt="COALESCE(p.trashed, 0) = 0",Ot=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${lt}`;function mt(t){let{effectiveDeadline:e,effectiveStartDate:a,dueDateIsRecurring:o}=w(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,dueDate:e??void 0,dueDateIsRecurring:o,activationDate:a??void 0,isRecurring:!!t.isRecurring,projectName:t.projectName??void 0,projectId:t.projectId??void 0,areaName:t.areaName??void 0,areaId:t.areaId??void 0}}async function k(t){if(!t.length)return[];let e=await ot(),a=t.map(i=>`'${M(i)}'`).join(", "),o=`SELECT ${dt} ${ut}
    WHERE t.uuid IN (${a}) AND t.type = 0 AND t.trashed = 0`,[r,s]=await Promise.all([(0,N.executeSQL)(e,o),gt(e,t)]);return r.map(i=>({...mt(i),status:ct(i.status),notes:i.notes,tags:i.tagList?i.tagList.split(", ").filter(Boolean):[],checklistItems:s[i.id]??[]}))}async function gt(t,e){if(!e.length)return{};let o=`SELECT uuid as id, task, title, status FROM TMChecklistItem WHERE task IN (${e.map(i=>`'${M(i)}'`).join(", ")}) ORDER BY task, "index"`,r=await(0,N.executeSQL)(t,o),s={};for(let i of r)s[i.task]||(s[i.task]=[]),s[i.task].push({id:i.id,title:i.title,completed:i.status===3});return s}var wt=`
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
  )`;var F=(0,g.getPreferenceValues)();async function _(t){return F.useUnofficialApi?k(t):j(F.thingsAppIdentifier,t)}async function Tt({todoIds:t}){if(!t?.trim())throw new Error("todoIds is required (comma-separated list of IDs).");let e=t.split(",").map(a=>a.trim()).filter(Boolean);if(!e.length)throw new Error("No valid IDs found in todoIds.");return await _(e)}
