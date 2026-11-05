"use strict";var Ce=Object.create;var ft=Object.defineProperty;var we=Object.getOwnPropertyDescriptor;var je=Object.getOwnPropertyNames;var Pe=Object.getPrototypeOf,xe=Object.prototype.hasOwnProperty;var $e=(t,e)=>{for(var a in e)ft(t,a,{get:e[a],enumerable:!0})},Vt=(t,e,a,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of je(e))!xe.call(t,s)&&s!==a&&ft(t,s,{get:()=>e[s],enumerable:!(i=we(e,s))||i.enumerable});return t};var rt=(t,e,a)=>(a=t!=null?Ce(Pe(t)):{},Vt(e||!t||!t.__esModule?ft(a,"default",{value:t,enumerable:!0}):a,t)),ke=t=>Vt(ft({},"__esModule",{value:!0}),t);var la={};$e(la,{default:()=>da});module.exports=ke(la);var x=require("@raycast/api"),Kt=require("@raycast/utils"),_=require("react");var fe=require("child_process"),he=require("util"),O=require("@raycast/api"),Te=rt(require("query-string"));var Zt=require("@raycast/utils");var p=require("@raycast/api"),Ot=rt(require("dayjs")),j={inbox:{title:"Inbox",icon:{source:p.Icon.Tray,tintColor:p.Color.Blue}},today:{title:"Today",icon:{source:p.Icon.Star,tintColor:p.Color.Yellow}},evening:{title:"This Evening",icon:{source:p.Icon.Moon,tintColor:p.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:p.Icon.ArrowClockwise,tintColor:p.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:p.Icon.Calendar,tintColor:p.Color.Red}},anytime:{title:"Anytime",icon:{source:p.Icon.Layers,tintColor:p.Color.Green}},someday:{title:"Someday",icon:{source:p.Icon.Folder,tintColor:p.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:p.Icon.CheckCircle,tintColor:p.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:p.Icon.Folder,tintColor:p.Color.Green}:{source:p.Icon.Circle,tintColor:p.Color.Blue}})},X={open:p.Icon.Circle,completed:{source:p.Icon.CheckCircle,tintColor:p.Color.Blue},canceled:{source:p.Icon.XMarkCircle,tintColor:p.Color.SecondaryText}},ma={open:p.Icon.Circle,completed:p.Icon.CheckCircle,canceled:p.Icon.XMarkCircle};function Xt(t){return t.isProject?{source:p.Icon.List,tintColor:p.Color.Blue}:X[t.status]}function zt(t){switch(t){case"area":return{source:p.Icon.Box,tintColor:p.Color.Green};case"project":return{source:p.Icon.List,tintColor:p.Color.Blue};case"todo":return p.Icon.Circle}}function bt(){let t=new Date;return(0,Ot.default)(new Date(t.getFullYear(),t.getMonth(),t.getDate()))}function ht(t){let e=(0,Ot.default)(t).diff(bt(),"day");if(!(Math.abs(e)>=15))return e<=0?p.Color.Red:p.Color.Orange}function Tt(t=[],e=[]){let a=t.filter(s=>!s.area).map(s=>({...s,type:"project"})),i=[];return e.forEach(s=>{i.push({...s,type:"area"});let r=t.filter(d=>d.area&&d.area.id===s.id).map(d=>({...d,type:"project"}));i.push(...r)}),[...a,...i]}function Dt(t,e){return p.AI.ask(`Break down a task into sub-tasks. The sub-tasks should be actionable. Each item should be separated by a new line. Return the sub-tasks in the same language as the task's title language.

Note that each task doesn't start with a hyphen or a number. This is important.

For example, for a task named "Fix bug", you could write:
Find the root cause
Fix the bug
Write tests to prevent regressions
Ship the fix.

Here's the task you need to break-down: "${t}"
${e.length>0?`For additional context, here are the task's notes: "${e}"`:""}

Sub-tasks:`)}var $=class extends Error{constructor(a,i,s,r){super(r?`${r}: ${a}`:a);this.type=i;this.originalError=s;this.operation=r;this.name="ThingsError"}type;originalError;operation},z=async(t,e)=>{try{let a=await(0,Zt.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let s=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw s.match(/Application can't be found/i)?new $("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",s,e):s.match(/not allowed assistive access/i)||s.match(/permission/i)||s.match(/-1743/)?new $("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",s,e):s.match(/doesn't understand/i)||s.match(/can't get/i)?new $("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",s,e):s.match(/timed out/i)?new $("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",s,e):new $(`Unexpected error: ${s}`,"UNKNOWN_ERROR",s,e)}},Oe={inbox:"TMInboxListSource",today:"TMTodayListSource",anytime:"TMNextListSource",upcoming:"TMCalendarListSource",someday:"TMSomedayListSource",logbook:"TMLogbookListSource",trash:"TMTrashListSource"};function st(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var M=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,be="tag => tag.name()",Me=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,Fe=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${M}(props.dueDate) : '',
    activationDate: props.activationDate ? ${M}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,ve=`project => {
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
    dueDate: props.dueDate ? ${M}(props.dueDate) : '',
    activationDate: props.activationDate ? ${M}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${Fe})
  };
}`,_e=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${M}(props.dueDate) : '',
    activationDate: props.activationDate ? ${M}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,Ue=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${_e})
  };
}`;var te=(t,e)=>z(`
  const things = Application('${t}');
  const todos = things.lists.byId('${Oe[e]}').toDos();

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
        dueDate: projectProps.dueDate ? ${M}(projectProps.dueDate) : '',
        activationDate: projectProps.activationDate ? ${M}(projectProps.activationDate) : '',
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
      dueDate: props.dueDate ? ${M}(props.dueDate) : '',
      activationDate: props.activationDate ? ${M}(props.activationDate) : '',
      creationDate: props.creationDate ? props.creationDate.toISOString() : '',
      isProject: props.pcls === "project",
      areaTags: areaTags || null,
      project,
      area,
    };
  });
`,`Get ${e} list`),He=[{name:"tags",needs:["tags"],expr:`things.tags().map(${be})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${Me})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${ve})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${Ue})`}];async function ee(t,...e){let a=new Set(e),i=[`const things = Application('${t}');`,"const result = {};",...He.filter(({needs:r})=>r.some(d=>a.has(d))).map(({name:r,expr:d})=>`result.${r} = ${d};`),"return result;"].join(`
`),s=await z(i,`Get ${e.join(", ")}`);return Object.fromEntries(e.map(r=>[r,r==="lists"?Tt(s.projects,s.areas):s[r]]))}var et=require("fs"),le=require("os"),At=require("path"),H=require("@raycast/utils");var Mt={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},ae=16,oe=12,ne=7,We=15,Be=31,re=262213760,k=69760;function Z(t){if(!t||t===re||t===k)return null;let e=t>>ae,a=t>>oe&We,i=t>>ne&Be;return e<=0||a<1||a>12||i<1||i>31?null:`${e.toString().padStart(4,"0")}-${a.toString().padStart(2,"0")}-${i.toString().padStart(2,"0")}`}function Ft(t,e,a){return t<<ae|e<<oe|a<<ne}function yt(){let t=new Date;return Ft(t.getFullYear(),t.getMonth()+1,t.getDate())+127}function Je(t,e){let a=Z(t);if(!a)return null;let[i,s,r]=a.split("-").map(Number),d=new Date(i,s-1,r);return d.setDate(d.getDate()+e),Ft(d.getFullYear(),d.getMonth()+1,d.getDate())}function se(){let t=Ft(2026,6,11),e=Z(t),a="2026-06-11";if(e!==a)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${a}", got "${e}".`)}function qe(t){if(!t||typeof t!="string")return null;let e=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return e?parseInt(e[1],10):null}function it(t,e,a,i){let s=null;if(t?s=Z(t):a&&a!==k&&(s=Z(a)),e===re){let r=qe(i);if(r!==null&&a){let d=Je(a,r);return{effectiveDeadline:d!==null?Z(d):null,effectiveStartDate:s,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:s,dueDateIsRecurring:!0}}return e?{effectiveDeadline:Z(e),effectiveStartDate:s,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:s,dueDateIsRecurring:!1}}function Ye(){let t=(0,At.join)((0,le.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),e=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,et.existsSync)(t))throw e;let a=[],i=(0,et.readdirSync)(t).find(r=>r.startsWith("ThingsData-"));i&&a.push((0,At.join)(t,i,"Things Database.thingsdatabase","main.sqlite")),a.push((0,At.join)(t,"Things Database.thingsSQLite"));let s=a.find(et.existsSync);if(s)return s;throw e}var ct;async function ue(){if(ct&&(0,et.existsSync)(ct))return ct;let t=Ye();return se(),await Qe(t),ct=t,ct}async function Qe(t){let e=Object.keys(Mt).map(r=>`'${r}'`).join(", "),a=await(0,H.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${e})`),i={};for(let r of a)i[r.table_name]||(i[r.table_name]=new Set),i[r.table_name].add(r.column_name);let s=r=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${r}`);for(let[r,d]of Object.entries(Mt)){if(!i[r])throw s(`Table "${r}" not found.`);let n=d.filter(h=>!i[r].has(h));if(n.length)throw s(`Missing column(s) in "${r}": ${n.join(", ")}.`)}}function ie(t){return t===2?"canceled":t===3?"completed":"open"}var vt=t=>`CASE ${t} WHEN 2 THEN 'canceled' WHEN 3 THEN 'completed' ELSE 'open' END`,tt=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`,ce=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = ${t}.uuid)`;var Ge=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${k}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,Aa=`${Ge},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${tt("t")} as tagList`,W="COALESCE(p.trashed, 0) = 0",Sa=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${W}`;function de(t){let{effectiveDeadline:e,effectiveStartDate:a}=it(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,status:t.status,notes:t.notes,tags:t.tags??"",areaTags:null,dueDate:e??"",activationDate:a??"",creationDate:t.creationDate??""}}var B=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${k}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${tt("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${k}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${tt("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,pe=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,_t=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${pe}
  )`;function Ke(t){let{effectiveDeadline:e,effectiveStartDate:a,dueDateIsRecurring:i}=it(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule),s,r,d=null;if(t.projectId){let h;t.projectAreaId&&(h={id:t.projectAreaId,name:t.projectAreaName??""},d=t.areaTagList??null);let{effectiveDeadline:S,effectiveStartDate:T}=it(t.projectStartDate??0,t.projectDeadline??0,t.projectNextInstanceStartDate??0,t.projectRecurrenceRule);s={id:t.projectId,name:t.projectName??"",status:ie(t.projectStatus),notes:t.projectNotes??"",tags:t.projectTagList??"",dueDate:S??"",activationDate:T??"",area:h}}else t.areaId&&(r={id:t.areaId,name:t.areaName??""},d=t.areaTagList??null);let n=t.creationDateRaw?new Date(t.creationDateRaw*1e3).toISOString():null;return{id:t.id,name:t.name,status:ie(t.status),notes:t.notes,tags:t.tagList??"",dueDate:e??"",activationDate:a??"",creationDate:n??"",isProject:t.type===1,isRecurring:!!t.isRecurring,dueDateIsRecurring:i,areaTags:d,project:s,area:r}}async function J(t,e){return(await(0,H.executeSQL)(t,e)).map(Ke)}async function Ve(t){return J(t,`
    ${B}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 0
      AND ${W}
    ORDER BY t."index" ASC
  `)}async function Xe(t){let e=yt();return J(t,`
    ${B}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start IN (1, 2)
      AND t.startDate IS NOT NULL
      AND t.startDate <= ${e}
      AND ${W}
      ${_t}
    ORDER BY t.todayIndex ASC, t."index" ASC
  `)}async function ze(t){let e=yt(),[a,i]=await Promise.all([J(t,`
      ${B}
      WHERE
        t.type = 0
        AND t.trashed = 0
        AND t.status = 0
        AND t.start IN (1, 2)
        AND t.startDate IS NOT NULL
        AND t.startDate <= ${e}
        AND ${W}
        AND (t.project IS NULL OR (SELECT p.start FROM TMTask p WHERE p.uuid = t.project) = 1)
        ${_t}
      ORDER BY
        CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
        p."index" ASC,
        t."index" DESC
    `),J(t,`
      ${B}
      WHERE
        t.type = 0
        AND t.trashed = 0
        AND t.status = 0
        AND t.start = 1
        AND (t.startDate IS NULL OR t.startDate > ${e})
        AND ${W}
        AND (t.project IS NULL OR (SELECT p.start FROM TMTask p WHERE p.uuid = t.project) = 1)
        ${_t}
      ORDER BY
        CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
        p."index" ASC,
        t."index" ASC
    `)]),s=new Set(a.map(r=>r.id));return[...a,...i.filter(r=>!s.has(r.id))]}async function Ze(t){let e=yt();return J(t,`
    ${B}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 2
      AND ${W}
      AND (
        (t.startDate IS NOT NULL AND t.startDate > ${e})
        OR (
          t.rt1_recurrenceRule IS NOT NULL
          AND t.rt1_repeatingTemplate IS NULL
          AND (
            (
              t.rt1_nextInstanceStartDate IS NOT NULL
              AND t.rt1_nextInstanceStartDate != ${k}
            )
            OR ${pe}
          )
        )
      )
    ORDER BY
      COALESCE(t.startDate, NULLIF(t.rt1_nextInstanceStartDate, ${k})) IS NULL ASC,
      COALESCE(t.startDate, NULLIF(t.rt1_nextInstanceStartDate, ${k})) ASC,
      CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
      p."index" ASC,
      CASE WHEN t.startDate IS NULL THEN 0 ELSE 1 END ASC,
      CASE WHEN t.todayIndex IS NULL OR t.todayIndex = 0 THEN 1 ELSE 0 END ASC,
      t.todayIndex ASC,
      t."index" DESC
  `)}async function ta(t){return J(t,`
    ${B}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 2
      AND t.startDate IS NULL
      AND t.rt1_recurrenceRule IS NULL
      AND t.rt1_repeatingTemplate IS NULL
      AND ${W}
    ORDER BY t.type ASC, t."index" ASC
  `)}async function ea(t){return J(t,`
    ${B}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status IN (2, 3)
      AND t.stopDate IS NOT NULL
      AND ${W}
    ORDER BY t.stopDate DESC
  `)}async function aa(t){return J(t,`
    ${B}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 1
    ORDER BY t.userModificationDate DESC
  `)}async function me(t){let e=await ue();switch(t){case"inbox":return Ve(e);case"today":return Xe(e);case"anytime":return ze(e);case"upcoming":return Ze(e);case"someday":return ta(e);case"logbook":return ea(e);case"trash":return aa(e);default:return[]}}async function ge(...t){let e=await ue(),a=new Set(t),i={};if(a.has("tags")||a.has("tagsWithHierarchy")){let s=await(0,H.executeSQL)(e,"SELECT t.title, p.title as parentTitle FROM TMTag t LEFT JOIN TMTag p ON p.uuid = t.parent ORDER BY t.title COLLATE NOCASE");a.has("tags")&&(i.tags=s.map(r=>r.title)),a.has("tagsWithHierarchy")&&(i.tagsWithHierarchy=s.map(r=>({name:r.title,parent:r.parentTitle??null})))}if(a.has("projects")||a.has("lists")){let[s,r]=await Promise.all([(0,H.executeSQL)(e,`SELECT p.uuid as id, p.title as name,
          ${vt("p.status")} as status,
          COALESCE(p.notes, '') as notes,
          ${tt("p")} as tags,
          p.deadline, p.startDate,
          NULLIF(p.rt1_nextInstanceStartDate, ${k}) as nextInstanceStartDate,
          p.rt1_recurrenceRule as recurrenceRule,
          a.uuid as areaId, a.title as areaName,
          ${ce("a")} as areaTags
        FROM TMTask p
        LEFT JOIN TMArea a ON a.uuid = p.area
        WHERE p.type = 1 AND p.trashed = 0 AND p.status = 0
        ORDER BY p."index" ASC`),(0,H.executeSQL)(e,`SELECT t.uuid as id, t.title as name,
          ${vt("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${tt("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${k}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.project as projectId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0
        ORDER BY t."index" ASC`)]),d={};for(let n of r)n.projectId&&(d[n.projectId]||(d[n.projectId]=[]),d[n.projectId].push(de(n)));i.projects=s.map(n=>{let{effectiveDeadline:h,effectiveStartDate:S}=it(n.startDate??0,n.deadline??0,n.nextInstanceStartDate??0,n.recurrenceRule);return{id:n.id,name:n.name,status:n.status,notes:n.notes,tags:n.tags??"",dueDate:h??"",activationDate:S??"",area:n.areaId?{id:n.areaId,name:n.areaName??"",tags:n.areaTags??""}:void 0,todos:d[n.id]??[]}})}if(a.has("areas")||a.has("lists")){let[s,r]=await Promise.all([(0,H.executeSQL)(e,`SELECT a.uuid as id, a.title as name,
          ${ce("a")} as tags
        FROM TMArea a
        ORDER BY a."index" ASC`),(0,H.executeSQL)(e,`SELECT t.uuid as id, t.title as name,
          ${vt("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${tt("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${k}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.area as areaId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0 AND t.project IS NULL AND t.area IS NOT NULL
        ORDER BY t."index" ASC`)]),d={};for(let n of r)n.areaId&&(d[n.areaId]||(d[n.areaId]=[]),d[n.areaId].push(de(n)));i.areas=s.map(n=>({id:n.id,name:n.name,tags:n.tags??"",todos:d[n.id]??[]}))}return a.has("lists")&&(i.lists=Tt(i.projects,i.areas)),Object.fromEntries(t.map(s=>[s,i[s]]))}var Y=(0,O.getPreferenceValues)();var St=async t=>Y.useUnofficialApi?me(t):te(Y.thingsAppIdentifier,t);async function Nt(...t){return Y.useUnofficialApi?ge(...t):ee(Y.thingsAppIdentifier,...t)}var oa=["dueDate","activationDate","completionDate","cancellationDate"],Ut=(t,e,a)=>{let i;if(oa.includes(e)){let[r,d,n]=a.split("-").map(Number);i=`new Date(${r}, ${d-1}, ${n})`}else i=`'${st(a)}'`;let s=e==="status"?`
  if (todo.status() !== ${i}) {
    throw new Error("Things ignored the status change. If this is a repeating to-do, complete or cancel its scheduled occurrence instead.");
  }`:"";return z(`
  const things = Application('${Y.thingsAppIdentifier}');
  const todo = things.toDos.byId('${st(t)}');
  todo.${e} = ${i};${s}
`,"Set todo property")},De=t=>z(`
  const things = Application('${Y.thingsAppIdentifier}');
  things.delete(things.toDos.byId('${st(t)}'));
`,"Delete todo"),ye=t=>z(`
  const things = Application('${Y.thingsAppIdentifier}');
  things.delete(things.projects.byId('${st(t)}'));
`,"Delete project");async function Ht(t){await(0,he.promisify)(fe.exec)(`open -g "${t}"`)}function Wt(t){return Te.default.stringify(t,{skipNull:!0,skipEmptyString:!0})}async function Rt(t,e){let{authToken:a}=(0,O.getPreferenceValues)();if(!a)throw new Error("unauthorized");await Ht(`things:///update?${Wt({"auth-token":a,id:t,...e})}`)}async function Et(t,e){let{authToken:a}=(0,O.getPreferenceValues)();if(!a)throw new Error("unauthorized");await Ht(`things:///update-project?${Wt({"auth-token":a,id:t,...e})}`)}async function Ae(t){await Ht(`things:///add?${Wt(t)}`)}async function dt(t,e){if(t instanceof Error&&t.message==="unauthorized"){await(0,O.showToast)({style:O.Toast.Style.Failure,title:"This action needs an authentication token.",message:`Please set it in the extension preferences.
You can find your unique token in Things' settings. go to Things \u2192 Settings \u2192 General \u2192 Enable Things URLs \u2192 Manage`,primaryAction:{title:"Open Extension Preferences",onAction(a){(0,O.openExtensionPreferences)(),a.hide()}}});return}await(0,O.showToast)({style:O.Toast.Style.Failure,title:e??"Something went wrong",message:t instanceof Error?t.message:String(t)})}var Se=rt(require("dayjs")),Ne=(t,e)=>`${t} ${e}${t>1?"s":""}`,Bt=t=>t.charAt(0).toUpperCase()+t.slice(1),lt=t=>(0,Se.default)(t).format("YYYY-MM-DD");var F=require("@raycast/api");var c=require("@raycast/api"),ot=require("@raycast/utils");var at=require("@raycast/api");var Lt=require("react/jsx-runtime");function ut({error:t,onRetry:e}){let a=d=>{if(d instanceof $)switch(d.type){case"APP_NOT_FOUND":return{title:"Application Not Found",description:"The Things app is not running or not installed.",solutions:["**Start Things**: Open the Things app and make sure it's running","**Check Installation**: Verify Things is properly installed","**Restart**: Try quitting and restarting both Things and Raycast"],errorType:"Application Not Found"};case"PERMISSION_DENIED":return{title:"Permission Denied",description:"Raycast doesn't have permission to control Things.",solutions:["Open **System Settings** \u2192 **Privacy & Security** \u2192 **Automation**","Find **Raycast** in the list","Make sure **Things** is checked \u2705"],errorType:"Permission Denied"};case"EXECUTION_ERROR":return{title:"Things Communication Error",description:"There was an error communicating with Things.",solutions:["**Restart Things**: Quit and restart the Things app","**Wait and Retry**: If Things was just started, wait a moment and try again"],errorType:"Execution Error"};case"UNKNOWN_ERROR":return{title:"Unknown Error",description:"An unexpected error occurred while trying to communicate with Things.",solutions:["**Restart Both Apps**: Quit and restart both Things and Raycast","**Update**: Make sure both Things and Raycast are up to date"],errorType:"Unknown Error"}}return{title:"Error",description:"An error occurred while loading data from Things.",solutions:["Make sure Things is running","Check that Raycast has automation permissions","Try restarting both applications"],errorType:d.constructor.name}},i=(d,n)=>{let h=n instanceof $?n.originalError:n.message,S=n instanceof $?n.operation:void 0;return`# ${d.title}

${d.description}

## Solutions

${d.solutions.map((T,f)=>`${f+1}. ${T}`).join(`
`)}

## Technical Details

- Error Type: \`${d.errorType}\`${S?`
- Operation: \`${S}\``:""}
- Original Error: \`${h||"N/A"}\``},s=a(t),r=i(s,t);return(0,Lt.jsx)(at.Detail,{markdown:r,actions:e?(0,Lt.jsx)(at.ActionPanel,{children:(0,Lt.jsx)(at.Action,{title:"Try Again",onAction:e})}):void 0})}var g=require("react/jsx-runtime");function It({title:t,commandListName:e,draftValues:a}){let{push:i}=(0,c.useNavigation)(),{data:s,isLoading:r,error:d}=(0,ot.useCachedPromise)(()=>Nt("tags","lists")),n=s?.tags,h=s?.lists,{handleSubmit:S,itemProps:T,values:f,reset:E,focus:D,setValue:L}=(0,ot.useForm)({async onSubmit(){let y={title:f.title,notes:f.notes,when:f.when==="upcoming"&&f.date?lt(f.date):f.when,"list-id":f.listId,deadline:f.deadline?lt(f.deadline):"",...f.tags.length>0&&{tags:f.tags.join(",")},"checklist-items":f["checklist-items"]};await Ae(y),await(0,c.showToast)({style:c.Toast.Style.Success,title:"Added new to-do",primaryAction:{title:"Go to list",shortcut:{modifiers:["cmd"],key:"g"},onAction(){let C;f.when==="today"||f.when==="evening"?C="today":f.when==="tomorrow"||f.when==="upcoming"?C="upcoming":f.when==="anytime"?C="anytime":f.when==="someday"?C="someday":C="inbox",i((0,g.jsx)(pt,{commandListName:C}))}}}),E({title:"",notes:"",tags:[],when:"",listId:"","checklist-items":"",deadline:null}),D("title")},initialValues:{title:t??a?.title??"",notes:a?.notes??"",tags:a?.tags??[],when:e??a?.when??null,"checklist-items":a?.["checklist-items"]??"",deadline:a?.deadline??null},validation:{title:ot.FormValidation.Required}});async function K(){try{if(!f.title){await(0,c.showToast)({style:c.Toast.Style.Failure,title:"The to-do should have a title"});return}let y=await(0,c.showToast)({style:c.Toast.Style.Animated,title:"Generating checklist"}),C=await Dt(f.title,f.notes);L("checklist-items",C.trim()),D("checklist-items"),await y.hide()}catch(y){let C=typeof y=="string"?y:y instanceof Error?y.message:String(y);await(0,c.showToast)({style:c.Toast.Style.Failure,title:"Failed to generate check-list",message:C})}}if(d)return(0,g.jsx)(ut,{error:d});let V=new Date;return(0,g.jsxs)(c.Form,{isLoading:r,actions:(0,g.jsxs)(c.ActionPanel,{children:[(0,g.jsx)(c.Action.SubmitForm,{title:"Add New To-Do",onSubmit:S,icon:c.Icon.Plus}),c.environment.canAccess(c.AI)&&(0,g.jsx)(c.Action,{title:"Generate Checklist with AI",icon:c.Icon.BulletPoints,onAction:K}),(0,g.jsxs)(c.ActionPanel.Section,{children:[(0,g.jsx)(c.Action,{title:"Focus Title",icon:c.Icon.TextInput,onAction:()=>D("title"),shortcut:{modifiers:["cmd"],key:"1"}}),(0,g.jsx)(c.Action,{title:"Focus Notes",icon:c.Icon.TextInput,onAction:()=>D("notes"),shortcut:{modifiers:["cmd"],key:"2"}}),(0,g.jsx)(c.Action,{title:"Focus When",icon:c.Icon.TextInput,onAction:()=>D("when"),shortcut:c.Keyboard.Shortcut.Common.Save}),(0,g.jsx)(c.Action,{title:"Focus List",icon:c.Icon.TextInput,onAction:()=>D("listId"),shortcut:{modifiers:["cmd","shift"],key:"m"}}),(0,g.jsx)(c.Action,{title:"Focus Tags",icon:c.Icon.TextInput,onAction:()=>D("tags"),shortcut:{modifiers:["cmd","shift"],key:"t"}}),(0,g.jsx)(c.Action,{title:"Focus Checklist",icon:c.Icon.TextInput,onAction:()=>D("checklist-items"),shortcut:c.Keyboard.Shortcut.Common.Copy}),(0,g.jsx)(c.Action,{title:"Focus Deadline",icon:c.Icon.TextInput,onAction:()=>D("deadline"),shortcut:{modifiers:["cmd","shift"],key:"d"}})]})]}),enableDrafts:!t&&!e,children:[(0,g.jsx)(c.Form.TextField,{...T.title,title:"Title",placeholder:"New to-do"}),(0,g.jsx)(c.Form.TextArea,{...T.notes,title:"Notes",placeholder:"Write some notes (Markdown enabled)",enableMarkdown:!0}),(0,g.jsx)(c.Form.Separator,{}),(0,g.jsxs)(c.Form.Dropdown,{...T.when,title:"When",children:[(0,g.jsx)(c.Form.Dropdown.Item,{value:"",title:"No date"}),(0,g.jsx)(c.Form.Dropdown.Item,{value:"today",...j.today}),(0,g.jsx)(c.Form.Dropdown.Item,{value:"evening",...j.evening}),(0,g.jsx)(c.Form.Dropdown.Item,{value:"tomorrow",...j.tomorrow}),(0,g.jsx)(c.Form.Dropdown.Item,{value:"upcoming",...j.upcoming}),(0,g.jsx)(c.Form.Dropdown.Item,{value:"anytime",...j.anytime}),(0,g.jsx)(c.Form.Dropdown.Item,{value:"someday",...j.someday})]}),f.when==="upcoming"&&(0,g.jsx)(c.Form.DatePicker,{...T.date,title:"Start Date",min:V}),h&&h.length>0?(0,g.jsxs)(c.Form.Dropdown,{...T.listId,title:"List",children:[(0,g.jsx)(c.Form.Dropdown.Item,{value:"",title:"Inbox",icon:{source:c.Icon.Tray,tintColor:c.Color.Blue}}),h.map(y=>(0,g.jsx)(c.Form.Dropdown.Item,{value:y.id,...j.list(y)},y.id))]}):null,n&&n.length>0?(0,g.jsx)(c.Form.TagPicker,{...T.tags,title:"Tags",children:n.map(y=>(0,g.jsx)(c.Form.TagPicker.Item,{value:y,title:y},y))}):null,(0,g.jsx)(c.Form.TextArea,{...T["checklist-items"],title:"Checklist Items",placeholder:"Items separated by new lines"}),(0,g.jsx)(c.Form.DatePicker,{...T.deadline,title:"Deadline",type:c.Form.DatePicker.Type.Date,min:V})]})}var Q=require("react/jsx-runtime");function Jt({searchText:t,commandListName:e}){return(0,Q.jsx)(F.List.EmptyView,{title:"No to-dos found.",description:"Press \u2318 + K to create a new to-do or search in Things",actions:(0,Q.jsxs)(F.ActionPanel,{children:[(0,Q.jsx)(F.Action.Push,{icon:F.Icon.Plus,title:"Add New To-Do",target:(0,Q.jsx)(It,{title:t,commandListName:e})}),(0,Q.jsx)(F.Action.OpenInBrowser,{title:"Search in Things",icon:F.Icon.MagnifyingGlass,url:`things:///search?query=${t}`})]})})}var gt=require("@raycast/api"),mt=rt(require("dayjs"));var o=require("@raycast/api");var v=require("@raycast/api"),Ct=require("@raycast/utils");var G=require("react/jsx-runtime");function qt({todo:t,refreshTodos:e}){let{pop:a}=(0,v.useNavigation)(),{handleSubmit:i,itemProps:s}=(0,Ct.useForm)({async onSubmit(r){try{t.isProject?await Et(t.id,{notes:r.notes,title:r.title}):await Rt(t.id,{notes:r.notes,title:r.title}),await e(),a()}catch(d){await dt(d)}},initialValues:{title:t.name,notes:t.notes},validation:{title:Ct.FormValidation.Required}});return(0,G.jsxs)(v.Form,{navigationTitle:`Edit "${t.name}"`,actions:(0,G.jsx)(v.ActionPanel,{children:(0,G.jsx)(v.Action.SubmitForm,{title:"Edit To-Do",onSubmit:i})}),children:[(0,G.jsx)(v.Form.TextField,{...s.title,title:"Title",placeholder:"New to-do"}),(0,G.jsx)(v.Form.TextArea,{...s.notes,title:"Notes",placeholder:"Write some notes (Markdown enabled)",enableMarkdown:!0})]})}var wt=require("@raycast/api"),Re=require("react/jsx-runtime");function jt({id:t,title:e}){return(0,Re.jsx)(wt.Action.Open,{title:e,icon:"things-flat.png",target:`things:///show?id=${t}`,shortcut:wt.Keyboard.Shortcut.Common.Open})}var I=require("@raycast/api"),Ee=require("@raycast/utils"),Le=rt(require("dayjs"));var P=require("react/jsx-runtime"),na={open:"Open",completed:"Completed",canceled:"Canceled"},Pt=t=>(0,Le.default)(t).format("MMM D, YYYY");function Yt({todoId:t,initialTodo:e,commandListName:a,parentRefresh:i,renderActions:s}){let{data:r,mutate:d}=(0,Ee.useCachedPromise)(D=>St(D),[a]),n=r?.find(D=>D.id===t)??e;async function h(){await i(),await d()}let S=n.area||n.project?.area,T=n.tags?.split(", ").filter(Boolean)??[],f=`# ${n.name}

${n.notes?.trim()||"_No notes_"}`,E=n.dueDate?ht(n.dueDate):void 0;return(0,P.jsx)(I.Detail,{markdown:f,metadata:(0,P.jsxs)(I.Detail.Metadata,{children:[(0,P.jsx)(I.Detail.Metadata.Label,{title:"Status",icon:X[n.status],text:na[n.status]}),n.creationDate&&(0,P.jsx)(I.Detail.Metadata.Label,{title:"Created",icon:I.Icon.Plus,text:Pt(n.creationDate)}),n.activationDate&&(0,P.jsx)(I.Detail.Metadata.Label,{title:"Start Date",icon:I.Icon.Calendar,text:Pt(n.activationDate)}),n.dueDate&&(0,P.jsx)(I.Detail.Metadata.Label,{title:"Deadline",icon:E?{source:I.Icon.Flag,tintColor:E}:I.Icon.Flag,text:E?{value:Pt(n.dueDate),color:E}:Pt(n.dueDate)}),T.length>0&&(0,P.jsx)(I.Detail.Metadata.TagList,{title:"Tags",children:T.map(D=>(0,P.jsx)(I.Detail.Metadata.TagList.Item,{text:D,icon:I.Icon.Tag},D))}),(n.project||S)&&(0,P.jsx)(I.Detail.Metadata.Separator,{}),n.project&&(0,P.jsx)(I.Detail.Metadata.Link,{title:"Project",text:n.project.name,target:`things:///show?id=${n.project.id}`}),S&&(0,P.jsx)(I.Detail.Metadata.Link,{title:"Area",text:S.name,target:`things:///show?id=${S.id.replace("THMAreaParentSource/","")}`})]}),actions:s(n,h)})}var u=require("react/jsx-runtime"),ra=/([a-zA-Z][a-zA-Z0-9.+-]+):(?:\/\/\S+|%\S+)/;function xt({todo:t,refreshTodos:e,commandListName:a,tags:i,lists:s,fromDetail:r=!1}){let{pop:d}=(0,o.useNavigation)(),n=i?.filter(l=>!t.tags?.includes(l))??[],h=t.area||t.project?.area,S=t.notes.match(ra)?.[0];async function T(l,N){try{t.isProject?await Et(t.id,l):await Rt(t.id,l),await(0,o.showToast)({style:o.Toast.Style.Success,title:N.title,message:N.message??t.name}),await e()}catch(b){await dt(b)}}async function f(l,N){try{await l(),await(0,o.showToast)({style:o.Toast.Style.Success,title:N,message:t.name}),r&&d(),await e()}catch(b){await dt(b)}}async function E(){let l=await(0,o.showToast)({style:o.Toast.Style.Animated,title:"Generating checklist",message:t.name}),N=await Dt(t.name,t.notes);await(0,o.confirmAlert)({title:"Add these items to the checklist?",message:N.trim(),icon:{source:o.Icon.Stars,tintColor:o.Color.Yellow}})?await T({"append-checklist-items":N.trim()},{title:"Added checklist items"}):await l.hide()}async function D(){let l=await(0,o.showToast)({style:o.Toast.Style.Animated,title:"Making to-do actionable",message:t.name}),N=(await o.AI.ask(`Make a task title more actionable. Here are some examples:
Yoga \u2192 Do a yoga session
Fix bug \u2192 Investigate and fix the bug
Write post \u2192 Write a blog post about \u2026

Return the result in the same language than the task's title (e.g if the task title is written in French, the checklist should be written in French as well)
Here's the task title you need to make actionable: "${t.name}
${t.notes?`For additional context, here are the task's notes: "${t.notes}"`:""}

New title:
        `,{creativity:.2})).trim();await(0,o.confirmAlert)({title:"Change to-do's title?",message:`The new title will be: "${N}"`,icon:{source:o.Icon.Stars,tintColor:o.Color.Yellow}})?await T({title:N},{title:"Made to-do title actionable",message:N}):await l.hide()}async function L(l){await T({when:l},{title:l==="anytime"?"Removed date":"Scheduled to-do"})}async function K(l){t.isProject?await T({"area-id":l},{title:"Moved project"}):await T({"list-id":l},{title:"Moved to-do"})}async function V(l){await T({"add-tags":l},{title:"Added tag"})}async function y(l){await T({deadline:l===null?"":l},{title:l===null?"Removed deadline":"Set deadline"})}async function C(){let l=t.isProject;if(!await(0,o.confirmAlert)({title:l?"Delete Project":"Delete To-Do",message:l?"Are you sure you want to delete this project?":"Are you sure you want to delete this to-do?",icon:{source:o.Icon.Trash,tintColor:o.Color.Red}}))return;let b=l?ye:De;await f(()=>b(t.id),l?"Deleted project":"Deleted to-do")}function nt(l){let N=lt(l);if(o.Action.PickDate.isFullDay(l))return N;let b=String(l.getHours()).padStart(2,"0"),m=String(l.getMinutes()).padStart(2,"0");return`${N}@${b}:${m}`}return(0,u.jsxs)(o.ActionPanel,{children:[(0,u.jsxs)(o.ActionPanel.Section,{title:t.name,children:[r?(0,u.jsx)(jt,{id:t.id,title:"Open in Things"}):(0,u.jsx)(o.Action.Push,{title:"Show Details",icon:o.Icon.Sidebar,target:(0,u.jsx)(Yt,{todoId:t.id,initialTodo:t,commandListName:a,parentRefresh:e,renderActions:(l,N)=>(0,u.jsx)(xt,{todo:l,refreshTodos:N,commandListName:a,lists:s,tags:i,fromDetail:!0})})}),t.status!=="completed"&&(0,u.jsx)(o.Action,{title:"Mark as Completed",icon:X.completed,onAction:()=>f(()=>Ut(t.id,"status","completed"),"Marked as Completed")}),t.status!=="canceled"&&(0,u.jsx)(o.Action,{title:"Mark as Canceled",icon:X.canceled,shortcut:{modifiers:["opt","cmd"],key:"k"},onAction:()=>f(()=>Ut(t.id,"status","canceled"),"Marked as Canceled")}),!r&&(0,u.jsx)(jt,{id:t.id,title:"Open in Things"})]}),(0,u.jsxs)(o.ActionPanel.Section,{children:[(0,u.jsxs)(o.ActionPanel.Submenu,{title:"Schedule",icon:o.Icon.Calendar,shortcut:o.Keyboard.Shortcut.Common.Save,children:[(0,u.jsx)(o.Action,{...j.today,onAction:()=>L("today")}),(0,u.jsx)(o.Action,{...j.evening,onAction:()=>L("evening")}),(0,u.jsx)(o.Action,{...j.tomorrow,onAction:()=>L("tomorrow")}),(0,u.jsx)(o.Action.PickDate,{title:"Date\u2026",icon:o.Icon.Calendar,min:new Date,onChange:l=>L(l?nt(l):"anytime"),type:o.Action.PickDate.Type.DateTime}),(0,u.jsx)(o.Action,{...j.someday,onAction:()=>L("someday")})]}),s&&s.length>0?(0,u.jsx)(o.ActionPanel.Submenu,{title:"Move to",icon:o.Icon.ArrowRight,shortcut:{modifiers:["cmd","shift"],key:"m"},children:s.filter(l=>!t.isProject||l.type==="area").map(l=>(0,u.jsx)(o.Action,{title:l.name,icon:zt(l.type),onAction:()=>K(l.id)},l.id))}):null,(0,u.jsx)(o.Action.Push,{title:"Edit To-Do",icon:o.Icon.Pencil,shortcut:o.Keyboard.Shortcut.Common.Edit,target:(0,u.jsx)(qt,{todo:t,refreshTodos:e})}),n&&n.length>0?(0,u.jsx)(o.ActionPanel.Submenu,{title:"Add Tag",icon:o.Icon.Tag,shortcut:{modifiers:["cmd","shift"],key:"t"},children:n.map(l=>(0,u.jsx)(o.Action,{title:l,onAction:()=>V(l)},l))}):null,(0,u.jsx)(o.Action.PickDate,{title:"Set Deadline",icon:o.Icon.Flag,shortcut:{modifiers:["cmd","shift"],key:"d"},min:new Date,onChange:l=>y(l?nt(l):null),type:o.Action.PickDate.Type.Date}),o.environment.canAccess(o.AI)&&(0,u.jsx)(o.Action,{title:"Generate Checklist with AI",icon:o.Icon.BulletPoints,shortcut:o.Keyboard.Shortcut.Common.Copy,onAction:E}),o.environment.canAccess(o.AI)&&(0,u.jsx)(o.Action,{title:"Make To-Do Actionable with AI",icon:o.Icon.Text,shortcut:{modifiers:["cmd","shift"],key:"a"},onAction:D}),(0,u.jsx)(o.Action,{title:"Delete",icon:o.Icon.Trash,style:o.Action.Style.Destructive,shortcut:o.Keyboard.Shortcut.Common.Remove,onAction:C})]}),S&&(0,u.jsxs)(o.ActionPanel.Section,{children:[(0,u.jsx)(o.Action.OpenInBrowser,{title:"Open URL from Notes",url:S,shortcut:o.Keyboard.Shortcut.Common.OpenWith}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy URL from Notes",content:S})]}),(0,u.jsxs)(o.ActionPanel.Section,{children:[(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy Formatted To-Do URL",content:{html:`<a href="things:///show?id=${t.id}" title="${t.name}">${t.name}</a>`,text:t.name},shortcut:o.Keyboard.Shortcut.Common.CopyPath}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy To-Do URL",content:`things:///show?id=${t.id}`}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy To-Do Title",content:t.name,shortcut:o.Keyboard.Shortcut.Common.CopyName}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy To-Do Notes",content:t.notes})]}),t.project&&(0,u.jsxs)(o.ActionPanel.Section,{title:t.project.name,children:[(0,u.jsx)(o.Action.Open,{title:"Open Project in Things",icon:"things-flat.png",target:`things:///show?id=${t.project.id}`}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy Project URL",content:`things:///show?id=${t.project.id}`})]}),h&&(0,u.jsxs)(o.ActionPanel.Section,{title:h.name,children:[(0,u.jsx)(o.Action.Open,{title:"Open Area in Things",icon:"things-flat.png",shortcut:{modifiers:["opt"],key:"o"},target:`things:///show?id=${h.id.replace("THMAreaParentSource/","")}`}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy Area URL",content:`things:///show?id=${h.id.replace("THMAreaParentSource/","")}`})]}),(0,u.jsxs)(o.ActionPanel.Section,{title:`${Bt(a)} List`,children:[(0,u.jsx)(o.Action.Open,{title:`Open ${Bt(a)} List in Things`,icon:"things-flat.png",shortcut:o.Keyboard.Shortcut.Common.Open,target:`things:///show?id=${a.toLowerCase()}`}),(0,u.jsx)(o.Action.Push,{title:"Add New To-Do",icon:o.Icon.Plus,shortcut:o.Keyboard.Shortcut.Common.New,target:(0,u.jsx)(It,{commandListName:a})}),(0,u.jsx)(o.Action.CopyToClipboard,{title:"Copy List URL",content:`things:///show?id=${a.toLowerCase()}`})]}),(0,u.jsx)(o.ActionPanel.Section,{children:(0,u.jsx)(o.Action,{title:"Refresh",icon:o.Icon.ArrowClockwise,shortcut:o.Keyboard.Shortcut.Common.Refresh,onAction:e})})]})}var Qt=require("react/jsx-runtime"),sa=t=>{let e=(0,mt.default)(t).diff(bt(),"day"),a=ht(t),i;return Math.abs(e)>=15?i=(0,mt.default)(t).format("MMM D"):e===0?i="Due today":e>0?i=`${e} day${e===1?"":"s"} left`:i=`${-e} day${e===-1?"":"s"} ago`,{text:{value:i,color:a},icon:{source:gt.Icon.Flag,tintColor:a},tooltip:`Due date: ${(0,mt.default)(t).format("dddd, MMMM D, YYYY")}`}};function $t({todo:t,refreshTodos:e,commandListName:a,displayActivationDates:i,tags:s,lists:r}){let d=[t.name,...t.notes.split(" "),t.tags,t.project?.name??"",t.project?.tags??"",t.area?.name??"",t.project?.area?.name??""],n=[];if(t.tags)for(let h of t.tags.split(", ").filter(Boolean))n.push({tag:h,tooltip:`Tags: ${t.tags}`});if(t.activationDate&&i){let h=new Date(t.activationDate);n.push({icon:gt.Icon.Calendar,date:h,tooltip:`Start date: ${(0,mt.default)(t.activationDate).format("dddd, MMMM D, YYYY")}`})}return t.dueDate&&n.push(sa(t.dueDate)),(0,Qt.jsx)(gt.List.Item,{title:t.name,subtitle:t.notes,icon:Xt(t),keywords:d,accessories:n,actions:(0,Qt.jsx)(xt,{todo:t,refreshTodos:e,commandListName:a,lists:r,tags:s})},t.id)}var w=require("react/jsx-runtime"),kt="all",Gt="none";function U(t){return t?.split(", ").filter(Boolean)??[]}function ia(t){let e={},a={};for(let r of t)r.parent&&(e[r.parent]??=[],e[r.parent].push(r.name));function i(r){if(a[r])return a[r];let d=t.find(h=>h.name===r);if(!d?.parent)return a[r]=[],[];let n=i(d.parent);return a[r]=[...n,d.parent],a[r]}function s(r){let d=e[r]||[],n=[...d];for(let h of d)n.push(...s(h));return n}for(let r of t)i(r.name);return{ancestorPath:a,getDescendants:s}}function pt({commandListName:t,displayActivationDates:e}){let a=(0,x.getPreferenceValues)(),[i,s]=(0,_.useState)(""),[r,d]=(0,_.useState)(kt),{data:n,isLoading:h,error:S,mutate:T}=(0,Kt.useCachedPromise)(m=>St(m),[t]),{data:f}=(0,Kt.useCachedPromise)(()=>Nt("tagsWithHierarchy","lists"),[],{execute:!!n}),E=f?.tagsWithHierarchy,D=f?.lists,L=(0,_.useMemo)(()=>E?ia(E):null,[E]),K=(0,_.useMemo)(()=>{if(!n||!L)return new Set;let m=new Set;for(let R of n){for(let q of U(R.tags))m.add(q);for(let q of U(R.project?.tags))m.add(q);for(let q of U(R.areaTags))m.add(q)}let A=new Set;for(let R of m){A.add(R);for(let q of L.ancestorPath[R]||[])A.add(q)}return A},[n,L]),V=(0,_.useMemo)(()=>E?E.filter(m=>K.has(m.name)):[],[E,K]),y=(0,_.useMemo)(()=>{if(!E||!L)return{};let m={};for(let A of E){let R=L.ancestorPath[A.name];m[A.name]=R.length>0?`${R.join(" \u203A ")} \u203A ${A.name}`:A.name}return m},[E,L]),C=(0,_.useMemo)(()=>{if(r===kt||r===Gt||!L)return null;let m=L.getDescendants(r);return new Set([r,...m])},[r,L]),nt=(0,_.useMemo)(()=>r===kt?n:r===Gt?n?.filter(m=>[...U(m.tags),...U(m.project?.tags),...U(m.areaTags)].length===0):C?n?.filter(m=>[...U(m.tags),...U(m.project?.tags),...U(m.areaTags)].some(R=>C.has(R))):n,[r,n,C]);if(S)return(0,w.jsx)(ut,{error:S,onRetry:()=>T()});let N=a.groupByProjectOrArea!==!1?nt?.reduce((m,A)=>{let R=A.project?.id||A.area?.id||"no-project-or-area";return m[R]??={title:A.project?.name||A.area?.name,todos:[]},m[R].todos.push(A),m},{})??{}:{"no-project-or-area":{title:void 0,todos:nt??[]}},b=E?.map(m=>m.name);return(0,w.jsxs)(x.List,{isLoading:h,searchBarPlaceholder:"Filter by name, notes, project or area",onSearchTextChange:s,filtering:!0,searchBarAccessory:(0,w.jsxs)(x.List.Dropdown,{tooltip:"Filter by Tag",value:r,onChange:d,placeholder:"Tag",children:[(0,w.jsxs)(x.List.Dropdown.Section,{children:[(0,w.jsx)(x.List.Dropdown.Item,{title:"All Tags",value:kt}),(0,w.jsx)(x.List.Dropdown.Item,{title:"No Tag",value:Gt})]}),(0,w.jsx)(x.List.Dropdown.Section,{children:V.map(m=>(0,w.jsx)(x.List.Dropdown.Item,{title:y[m.name]||m.name,value:m.name,icon:x.Icon.Tag},m.name))})]}),children:[Object.entries(N).map(([m,A])=>m==="no-project-or-area"?A.todos.map(R=>(0,w.jsx)($t,{todo:R,refreshTodos:T,commandListName:t,displayActivationDates:e,tags:b,lists:D},R.id)):(0,w.jsx)(x.List.Section,{title:A.title,subtitle:Ne(A.todos.length,"to-do"),children:A.todos.map(R=>(0,w.jsx)($t,{todo:R,refreshTodos:T,commandListName:t,displayActivationDates:e,tags:b,lists:D},R.id))},m)),(0,w.jsx)(Jt,{searchText:i,commandListName:t})]})}var Ie=require("react/jsx-runtime"),ca=()=>(0,Ie.jsx)(pt,{commandListName:"today"}),da=ca;
