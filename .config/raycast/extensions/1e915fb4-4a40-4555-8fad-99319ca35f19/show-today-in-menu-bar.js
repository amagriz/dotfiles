"use strict";var yt=Object.create;var w=Object.defineProperty;var At=Object.getOwnPropertyDescriptor;var It=Object.getOwnPropertyNames;var jt=Object.getPrototypeOf,Lt=Object.prototype.hasOwnProperty;var Ct=(t,e)=>{for(var a in e)w(t,a,{get:e[a],enumerable:!0})},Y=(t,e,a,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of It(e))!Lt.call(t,n)&&n!==a&&w(t,n,{get:()=>e[n],enumerable:!(s=At(e,n))||s.enumerable});return t};var G=(t,e,a)=>(a=t!=null?yt(jt(t)):{},Y(e||!t||!t.__esModule?w(a,"default",{value:t,enumerable:!0}):a,t)),xt=t=>Y(w({},"__esModule",{value:!0}),t);var ee={};Ct(ee,{default:()=>Rt});module.exports=xt(ee);var r=require("@raycast/api"),Q=require("@raycast/utils");var lt=require("child_process"),mt=require("util"),f=require("@raycast/api"),gt=G(require("query-string"));var X=require("@raycast/utils");var p=require("@raycast/api"),Pt=G(require("dayjs")),m={inbox:{title:"Inbox",icon:{source:p.Icon.Tray,tintColor:p.Color.Blue}},today:{title:"Today",icon:{source:p.Icon.Star,tintColor:p.Color.Yellow}},evening:{title:"This Evening",icon:{source:p.Icon.Moon,tintColor:p.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:p.Icon.ArrowClockwise,tintColor:p.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:p.Icon.Calendar,tintColor:p.Color.Red}},anytime:{title:"Anytime",icon:{source:p.Icon.Layers,tintColor:p.Color.Green}},someday:{title:"Someday",icon:{source:p.Icon.Folder,tintColor:p.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:p.Icon.CheckCircle,tintColor:p.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:p.Icon.Folder,tintColor:p.Color.Green}:{source:p.Icon.Circle,tintColor:p.Color.Blue}})},re={open:p.Icon.Circle,completed:{source:p.Icon.CheckCircle,tintColor:p.Color.Blue},canceled:{source:p.Icon.XMarkCircle,tintColor:p.Color.SecondaryText}},K={open:p.Icon.Circle,completed:p.Icon.CheckCircle,canceled:p.Icon.XMarkCircle};function M(t=[],e=[]){let a=t.filter(n=>!n.area).map(n=>({...n,type:"project"})),s=[];return e.forEach(n=>{s.push({...n,type:"area"});let o=t.filter(i=>i.area&&i.area.id===n.id).map(i=>({...i,type:"project"}));s.push(...o)}),[...a,...s]}var h=class extends Error{constructor(a,s,n,o){super(o?`${o}: ${a}`:a);this.type=s;this.originalError=n;this.operation=o;this.name="ThingsError"}type;originalError;operation},b=async(t,e)=>{try{let a=await(0,X.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let n=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw n.match(/Application can't be found/i)?new h("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",n,e):n.match(/not allowed assistive access/i)||n.match(/permission/i)||n.match(/-1743/)?new h("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",n,e):n.match(/doesn't understand/i)||n.match(/can't get/i)?new h("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",n,e):n.match(/timed out/i)?new h("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",n,e):new h(`Unexpected error: ${n}`,"UNKNOWN_ERROR",n,e)}},$t={inbox:"TMInboxListSource",today:"TMTodayListSource",anytime:"TMNextListSource",upcoming:"TMCalendarListSource",someday:"TMSomedayListSource",logbook:"TMLogbookListSource",trash:"TMTrashListSource"};function U(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var T=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,Ot="tag => tag.name()",wt=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,Mt=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${T}(props.dueDate) : '',
    activationDate: props.activationDate ? ${T}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,bt=`project => {
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
    dueDate: props.dueDate ? ${T}(props.dueDate) : '',
    activationDate: props.activationDate ? ${T}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${Mt})
  };
}`,kt=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${T}(props.dueDate) : '',
    activationDate: props.activationDate ? ${T}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,_t=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${kt})
  };
}`;var z=(t,e)=>b(`
  const things = Application('${t}');
  const todos = things.lists.byId('${$t[e]}').toDos();

  return todos.map(todo => {
    const props = todo.properties();

    let areaTags = '';
    const areaRef = props.area;

    let project = null;
    const projectRef = props.project;
    if (projectRef) {
      const projectProps = projectRef.properties();
      let projectArea = null;
      const projectAreaRef = projectProps.area;
      if (projectAreaRef) {
        const areaProps = projectAreaRef.properties();
        projectArea = { id: areaProps.id, name: areaProps.name };
        areaTags = projectAreaRef.tagNames() || '';
      }
      project = {
        id: projectProps.id,
        name: projectProps.name,
        status: projectProps.status,
        notes: projectProps.notes || '',
        tags: projectRef.tagNames(),
        dueDate: projectProps.dueDate ? ${T}(projectProps.dueDate) : '',
        activationDate: projectProps.activationDate ? ${T}(projectProps.activationDate) : '',
        area: projectArea,
      };
    }

    let area = null;
    if (areaRef && !projectRef) {
      const areaProps = areaRef.properties();
      area = { id: areaProps.id, name: areaProps.name };
      areaTags = areaRef.tagNames() || '';
    }

    return {
      id: props.id,
      name: props.name,
      status: props.status,
      notes: props.notes || '',
      tags: todo.tagNames(),
      dueDate: props.dueDate ? ${T}(props.dueDate) : '',
      activationDate: props.activationDate ? ${T}(props.activationDate) : '',
      creationDate: props.creationDate ? props.creationDate.toISOString() : '',
      isProject: props.pcls === "project",
      areaTags: areaTags || null,
      project,
      area,
    };
  });
`,`Get ${e} list`),Ft=[{name:"tags",needs:["tags"],expr:`things.tags().map(${Ot})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${wt})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${bt})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${_t})`}];async function V(t,...e){let a=new Set(e),s=[`const things = Application('${t}');`,"const result = {};",...Ft.filter(({needs:o})=>o.some(i=>a.has(i))).map(({name:o,expr:i})=>`result.${o} = ${i};`),"return result;"].join(`
`),n=await b(s,`Get ${e.join(", ")}`);return Object.fromEntries(e.map(o=>[o,o==="lists"?M(n.projects,n.areas):n[o]]))}var j=require("fs"),it=require("os"),_=require("path"),N=require("@raycast/utils");var v={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},Z=16,tt=12,et=7,Ut=15,vt=31,at=262213760,g=69760;function A(t){if(!t||t===at||t===g)return null;let e=t>>Z,a=t>>tt&Ut,s=t>>et&vt;return e<=0||a<1||a>12||s<1||s>31?null:`${e.toString().padStart(4,"0")}-${a.toString().padStart(2,"0")}-${s.toString().padStart(2,"0")}`}function H(t,e,a){return t<<Z|e<<tt|a<<et}function k(){let t=new Date;return H(t.getFullYear(),t.getMonth()+1,t.getDate())+127}function Ht(t,e){let a=A(t);if(!a)return null;let[s,n,o]=a.split("-").map(Number),i=new Date(s,n-1,o);return i.setDate(i.getDate()+e),H(i.getFullYear(),i.getMonth()+1,i.getDate())}function nt(){let t=H(2026,6,11),e=A(t),a="2026-06-11";if(e!==a)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${a}", got "${e}".`)}function Bt(t){if(!t||typeof t!="string")return null;let e=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return e?parseInt(e[1],10):null}function x(t,e,a,s){let n=null;if(t?n=A(t):a&&a!==g&&(n=A(a)),e===at){let o=Bt(s);if(o!==null&&a){let i=Ht(a,o);return{effectiveDeadline:i!==null?A(i):null,effectiveStartDate:n,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:n,dueDateIsRecurring:!0}}return e?{effectiveDeadline:A(e),effectiveStartDate:n,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:n,dueDateIsRecurring:!1}}function Wt(){let t=(0,_.join)((0,it.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),e=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,j.existsSync)(t))throw e;let a=[],s=(0,j.readdirSync)(t).find(o=>o.startsWith("ThingsData-"));s&&a.push((0,_.join)(t,s,"Things Database.thingsdatabase","main.sqlite")),a.push((0,_.join)(t,"Things Database.thingsSQLite"));let n=a.find(j.existsSync);if(n)return n;throw e}var P;async function ct(){if(P&&(0,j.existsSync)(P))return P;let t=Wt();return nt(),await Jt(t),P=t,P}async function Jt(t){let e=Object.keys(v).map(o=>`'${o}'`).join(", "),a=await(0,N.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${e})`),s={};for(let o of a)s[o.table_name]||(s[o.table_name]=new Set),s[o.table_name].add(o.column_name);let n=o=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${o}`);for(let[o,i]of Object.entries(v)){if(!s[o])throw n(`Table "${o}" not found.`);let c=i.filter(D=>!s[o].has(D));if(c.length)throw n(`Missing column(s) in "${o}": ${c.join(", ")}.`)}}function rt(t){return t===2?"canceled":t===3?"completed":"open"}var B=t=>`CASE ${t} WHEN 2 THEN 'canceled' WHEN 3 THEN 'completed' ELSE 'open' END`,I=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`,ot=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = ${t}.uuid)`;var qt=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${g}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,pe=`${qt},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${I("t")} as tagList`,E="COALESCE(p.trashed, 0) = 0",le=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${E}`;function st(t){let{effectiveDeadline:e,effectiveStartDate:a}=x(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,status:t.status,notes:t.notes,tags:t.tags??"",areaTags:null,dueDate:e??"",activationDate:a??"",creationDate:t.creationDate??""}}var R=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${g}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${I("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${g}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${I("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,ut=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,W=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${ut}
  )`;function Qt(t){let{effectiveDeadline:e,effectiveStartDate:a,dueDateIsRecurring:s}=x(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule),n,o,i=null;if(t.projectId){let D;t.projectAreaId&&(D={id:t.projectAreaId,name:t.projectAreaName??""},i=t.areaTagList??null);let{effectiveDeadline:y,effectiveStartDate:O}=x(t.projectStartDate??0,t.projectDeadline??0,t.projectNextInstanceStartDate??0,t.projectRecurrenceRule);n={id:t.projectId,name:t.projectName??"",status:rt(t.projectStatus),notes:t.projectNotes??"",tags:t.projectTagList??"",dueDate:y??"",activationDate:O??"",area:D}}else t.areaId&&(o={id:t.areaId,name:t.areaName??""},i=t.areaTagList??null);let c=t.creationDateRaw?new Date(t.creationDateRaw*1e3).toISOString():null;return{id:t.id,name:t.name,status:rt(t.status),notes:t.notes,tags:t.tagList??"",dueDate:e??"",activationDate:a??"",creationDate:c??"",isProject:t.type===1,isRecurring:!!t.isRecurring,dueDateIsRecurring:s,areaTags:i,project:n,area:o}}async function S(t,e){return(await(0,N.executeSQL)(t,e)).map(Qt)}async function Yt(t){return S(t,`
    ${R}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 0
      AND ${E}
    ORDER BY t."index" ASC
  `)}async function Gt(t){let e=k();return S(t,`
    ${R}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start IN (1, 2)
      AND t.startDate IS NOT NULL
      AND t.startDate <= ${e}
      AND ${E}
      ${W}
    ORDER BY t.todayIndex ASC, t."index" ASC
  `)}async function Kt(t){let e=k(),[a,s]=await Promise.all([S(t,`
      ${R}
      WHERE
        t.type = 0
        AND t.trashed = 0
        AND t.status = 0
        AND t.start IN (1, 2)
        AND t.startDate IS NOT NULL
        AND t.startDate <= ${e}
        AND ${E}
        AND (t.project IS NULL OR (SELECT p.start FROM TMTask p WHERE p.uuid = t.project) = 1)
        ${W}
      ORDER BY
        CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
        p."index" ASC,
        t."index" DESC
    `),S(t,`
      ${R}
      WHERE
        t.type = 0
        AND t.trashed = 0
        AND t.status = 0
        AND t.start = 1
        AND (t.startDate IS NULL OR t.startDate > ${e})
        AND ${E}
        AND (t.project IS NULL OR (SELECT p.start FROM TMTask p WHERE p.uuid = t.project) = 1)
        ${W}
      ORDER BY
        CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
        p."index" ASC,
        t."index" ASC
    `)]),n=new Set(a.map(o=>o.id));return[...a,...s.filter(o=>!n.has(o.id))]}async function Xt(t){let e=k();return S(t,`
    ${R}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 2
      AND ${E}
      AND (
        (t.startDate IS NOT NULL AND t.startDate > ${e})
        OR (
          t.rt1_recurrenceRule IS NOT NULL
          AND t.rt1_repeatingTemplate IS NULL
          AND (
            (
              t.rt1_nextInstanceStartDate IS NOT NULL
              AND t.rt1_nextInstanceStartDate != ${g}
            )
            OR ${ut}
          )
        )
      )
    ORDER BY
      COALESCE(t.startDate, NULLIF(t.rt1_nextInstanceStartDate, ${g})) IS NULL ASC,
      COALESCE(t.startDate, NULLIF(t.rt1_nextInstanceStartDate, ${g})) ASC,
      CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
      p."index" ASC,
      CASE WHEN t.startDate IS NULL THEN 0 ELSE 1 END ASC,
      CASE WHEN t.todayIndex IS NULL OR t.todayIndex = 0 THEN 1 ELSE 0 END ASC,
      t.todayIndex ASC,
      t."index" DESC
  `)}async function zt(t){return S(t,`
    ${R}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 2
      AND t.startDate IS NULL
      AND t.rt1_recurrenceRule IS NULL
      AND t.rt1_repeatingTemplate IS NULL
      AND ${E}
    ORDER BY t.type ASC, t."index" ASC
  `)}async function Vt(t){return S(t,`
    ${R}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status IN (2, 3)
      AND t.stopDate IS NOT NULL
      AND ${E}
    ORDER BY t.stopDate DESC
  `)}async function Zt(t){return S(t,`
    ${R}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 1
    ORDER BY t.userModificationDate DESC
  `)}async function dt(t){let e=await ct();switch(t){case"inbox":return Yt(e);case"today":return Gt(e);case"anytime":return Kt(e);case"upcoming":return Xt(e);case"someday":return zt(e);case"logbook":return Vt(e);case"trash":return Zt(e);default:return[]}}async function pt(...t){let e=await ct(),a=new Set(t),s={};if(a.has("tags")||a.has("tagsWithHierarchy")){let n=await(0,N.executeSQL)(e,"SELECT t.title, p.title as parentTitle FROM TMTag t LEFT JOIN TMTag p ON p.uuid = t.parent ORDER BY t.title COLLATE NOCASE");a.has("tags")&&(s.tags=n.map(o=>o.title)),a.has("tagsWithHierarchy")&&(s.tagsWithHierarchy=n.map(o=>({name:o.title,parent:o.parentTitle??null})))}if(a.has("projects")||a.has("lists")){let[n,o]=await Promise.all([(0,N.executeSQL)(e,`SELECT p.uuid as id, p.title as name,
          ${B("p.status")} as status,
          COALESCE(p.notes, '') as notes,
          ${I("p")} as tags,
          p.deadline, p.startDate,
          NULLIF(p.rt1_nextInstanceStartDate, ${g}) as nextInstanceStartDate,
          p.rt1_recurrenceRule as recurrenceRule,
          a.uuid as areaId, a.title as areaName,
          ${ot("a")} as areaTags
        FROM TMTask p
        LEFT JOIN TMArea a ON a.uuid = p.area
        WHERE p.type = 1 AND p.trashed = 0 AND p.status = 0
        ORDER BY p."index" ASC`),(0,N.executeSQL)(e,`SELECT t.uuid as id, t.title as name,
          ${B("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${I("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${g}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.project as projectId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0
        ORDER BY t."index" ASC`)]),i={};for(let c of o)c.projectId&&(i[c.projectId]||(i[c.projectId]=[]),i[c.projectId].push(st(c)));s.projects=n.map(c=>{let{effectiveDeadline:D,effectiveStartDate:y}=x(c.startDate??0,c.deadline??0,c.nextInstanceStartDate??0,c.recurrenceRule);return{id:c.id,name:c.name,status:c.status,notes:c.notes,tags:c.tags??"",dueDate:D??"",activationDate:y??"",area:c.areaId?{id:c.areaId,name:c.areaName??"",tags:c.areaTags??""}:void 0,todos:i[c.id]??[]}})}if(a.has("areas")||a.has("lists")){let[n,o]=await Promise.all([(0,N.executeSQL)(e,`SELECT a.uuid as id, a.title as name,
          ${ot("a")} as tags
        FROM TMArea a
        ORDER BY a."index" ASC`),(0,N.executeSQL)(e,`SELECT t.uuid as id, t.title as name,
          ${B("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${I("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${g}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.area as areaId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0 AND t.project IS NULL AND t.area IS NOT NULL
        ORDER BY t."index" ASC`)]),i={};for(let c of o)c.areaId&&(i[c.areaId]||(i[c.areaId]=[]),i[c.areaId].push(st(c)));s.areas=n.map(c=>({id:c.id,name:c.name,tags:c.tags??"",todos:i[c.id]??[]}))}return a.has("lists")&&(s.lists=M(s.projects,s.areas)),Object.fromEntries(t.map(n=>[n,s[n]]))}var $=(0,f.getPreferenceValues)();var ft=async t=>$.useUnofficialApi?dt(t):z($.thingsAppIdentifier,t);async function Dt(...t){return $.useUnofficialApi?pt(...t):V($.thingsAppIdentifier,...t)}var te=["dueDate","activationDate","completionDate","cancellationDate"],Tt=(t,e,a)=>{let s;if(te.includes(e)){let[o,i,c]=a.split("-").map(Number);s=`new Date(${o}, ${i-1}, ${c})`}else s=`'${U(a)}'`;let n=e==="status"?`
  if (todo.status() !== ${s}) {
    throw new Error("Things ignored the status change. If this is a repeating to-do, complete or cancel its scheduled occurrence instead.");
  }`:"";return b(`
  const things = Application('${$.thingsAppIdentifier}');
  const todo = things.toDos.byId('${U(t)}');
  todo.${e} = ${s};${n}
`,"Set todo property")};async function ht(t){await(0,mt.promisify)(lt.exec)(`open -g "${t}"`)}function Nt(t){return gt.default.stringify(t,{skipNull:!0,skipEmptyString:!0})}async function J(t,e){let{authToken:a}=(0,f.getPreferenceValues)();if(!a)throw new Error("unauthorized");await ht(`things:///update?${Nt({"auth-token":a,id:t,...e})}`)}async function q(t,e){let{authToken:a}=(0,f.getPreferenceValues)();if(!a)throw new Error("unauthorized");await ht(`things:///update-project?${Nt({"auth-token":a,id:t,...e})}`)}async function F(t,e){if(t instanceof Error&&t.message==="unauthorized"){await(0,f.showToast)({style:f.Toast.Style.Failure,title:"This action needs an authentication token.",message:`Please set it in the extension preferences.
You can find your unique token in Things' settings. go to Things \u2192 Settings \u2192 General \u2192 Enable Things URLs \u2192 Manage`,primaryAction:{title:"Open Extension Preferences",onAction(a){(0,f.openExtensionPreferences)(),a.hide()}}});return}await(0,f.showToast)({style:f.Toast.Style.Failure,title:e??"Something went wrong",message:t instanceof Error?t.message:String(t)})}var u=require("react/jsx-runtime"),Et=30;function Rt(){let{shouldShowShortcuts:t,displayTodo:e}=(0,r.getPreferenceValues)(),{data:a,isLoading:s,mutate:n}=(0,Q.useCachedPromise)(()=>ft("today")),{data:o}=(0,Q.useCachedPromise)(()=>Dt("lists")),i=o?.lists,c=a?.find(d=>d.status==="open"),D=c?.name||"",y="";e&&(y=D.length>Et?D.substring(0,Et)+"\u2026":D);async function O(d){try{await n(Tt(d.id,"status","completed"),{optimisticUpdate(l){if(l)return l.filter(C=>C.id!==d.id)},shouldRevalidateAfter:!1}),await(0,r.showToast)({style:r.Toast.Style.Success,title:"Marked as Completed"})}catch(l){await F(l)}}async function L(d,l){try{d.isProject?await q(d.id,{when:l}):await J(d.id,{when:l}),await n(),await(0,r.showToast)({style:r.Toast.Style.Success,title:"Scheduled to-do"})}catch(C){await F(C)}}async function St(d,l){try{d.isProject?await q(d.id,{"area-id":l}):await J(d.id,{"list-id":l}),await n(),await(0,r.showToast)({style:r.Toast.Style.Success,title:"Moved to-do"})}catch(C){await F(C)}}return(0,u.jsxs)(r.MenuBarExtra,{icon:"things-flat.png",title:y,tooltip:D,isLoading:s,children:[a&&a.length>0?(0,u.jsxs)(u.Fragment,{children:[e&&c?(0,u.jsx)(r.MenuBarExtra.Item,{title:"Complete",icon:r.Icon.CheckCircle,onAction:()=>O(c)}):null,(0,u.jsxs)(r.MenuBarExtra.Section,{children:[(0,u.jsx)(r.MenuBarExtra.Item,{title:"Today"}),a.map(d=>(0,u.jsxs)(r.MenuBarExtra.Submenu,{title:d.name,icon:K[d.status],children:[(0,u.jsx)(r.MenuBarExtra.Item,{title:"Complete",icon:r.Icon.CheckCircle,onAction:()=>O(d)}),(0,u.jsx)(r.MenuBarExtra.Item,{title:"Show in Things",icon:"things-flat.png",onAction:()=>{(0,r.open)(`things:///show?id=${d.id}`)}}),(0,u.jsxs)(r.MenuBarExtra.Submenu,{title:"Schedule",icon:r.Icon.Calendar,children:[(0,u.jsx)(r.MenuBarExtra.Item,{...m.today,onAction:()=>L(d,"today")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.evening,onAction:()=>L(d,"evening")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.tomorrow,onAction:()=>L(d,"tomorrow")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.anytime,onAction:()=>L(d,"anytime")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.someday,onAction:()=>L(d,"someday")})]}),i&&i.length>0?(0,u.jsx)(r.MenuBarExtra.Submenu,{title:"Move To",icon:r.Icon.ArrowRight,children:i.filter(l=>d.isProject?l.type==="area":!0).map(l=>(0,u.jsx)(r.MenuBarExtra.Item,{...m.list(l),onAction:()=>St(d,l.id)},l.id))}):null]},d.id))]})]}):(0,u.jsx)(r.MenuBarExtra.Item,{title:"No to-dos for today."}),t?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(r.MenuBarExtra.Section,{children:[(0,u.jsx)(r.MenuBarExtra.Item,{...m.inbox,shortcut:{modifiers:["cmd","alt"],key:"i"},onAction:()=>(0,r.open)("things:///show?id=inbox")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.today,shortcut:{modifiers:["cmd","alt"],key:"t"},onAction:()=>(0,r.open)("things:///show?id=today")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.upcoming,shortcut:{modifiers:["cmd","alt"],key:"u"},onAction:()=>(0,r.open)("things:///show?id=upcoming")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.anytime,shortcut:{modifiers:["cmd","alt"],key:"a"},onAction:()=>(0,r.open)("things:///show?id=anytime")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.someday,shortcut:{modifiers:["cmd","alt"],key:"s"},onAction:()=>(0,r.open)("things:///show?id=someday")}),(0,u.jsx)(r.MenuBarExtra.Item,{...m.logbook,shortcut:{modifiers:["cmd","alt"],key:"l"},onAction:()=>(0,r.open)("things:///show?id=logbook")})]}),i&&i.length>0?(0,u.jsxs)(r.MenuBarExtra.Section,{children:[i.slice(0,6).map(d=>(0,u.jsx)(r.MenuBarExtra.Item,{...m.list(d),onAction:()=>(0,r.open)(`things:///show?id=${encodeURIComponent(d.id)}`)},d.id)),i.length>6?(0,u.jsx)(r.MenuBarExtra.Submenu,{title:"More",icon:r.Icon.Ellipsis,children:i.slice(6).map(d=>(0,u.jsx)(r.MenuBarExtra.Item,{...m.list(d),onAction:()=>(0,r.open)(`things:///show?id=${encodeURIComponent(d.id)}`)},d.id))}):null]}):null]}):null,(0,u.jsxs)(r.MenuBarExtra.Section,{children:[(0,u.jsx)(r.MenuBarExtra.Item,{title:"Add New To-Do",icon:r.Icon.Plus,shortcut:r.Keyboard.Shortcut.Common.New,onAction:()=>{(0,r.launchCommand)({name:"add-new-todo",type:r.LaunchType.UserInitiated,context:{list:"today"}})}}),(0,u.jsx)(r.MenuBarExtra.Item,{title:"Configure Command",icon:r.Icon.Gear,shortcut:{modifiers:["cmd","shift"],key:","},onAction:r.openCommandPreferences})]})]})}
