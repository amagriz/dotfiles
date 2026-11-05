"use strict";var Z=Object.create;var h=Object.defineProperty;var tt=Object.getOwnPropertyDescriptor;var et=Object.getOwnPropertyNames;var at=Object.getPrototypeOf,rt=Object.prototype.hasOwnProperty;var nt=(t,e)=>{for(var a in e)h(t,a,{get:e[a],enumerable:!0})},P=(t,e,a,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of et(e))!rt.call(t,r)&&r!==a&&h(t,r,{get:()=>e[r],enumerable:!(o=tt(e,r))||o.enumerable});return t};var O=(t,e,a)=>(a=t!=null?Z(at(t)):{},P(e||!t||!t.__esModule?h(a,"default",{value:t,enumerable:!0}):a,t)),st=t=>P(h({},"__esModule",{value:!0}),t);var kt={};nt(kt,{default:()=>Mt});module.exports=st(kt);var R=require("@raycast/api"),bt=O(require("query-string"));var w=require("@raycast/utils");var s=require("@raycast/api"),ot=O(require("dayjs")),Ut={inbox:{title:"Inbox",icon:{source:s.Icon.Tray,tintColor:s.Color.Blue}},today:{title:"Today",icon:{source:s.Icon.Star,tintColor:s.Color.Yellow}},evening:{title:"This Evening",icon:{source:s.Icon.Moon,tintColor:s.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:s.Icon.ArrowClockwise,tintColor:s.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:s.Icon.Calendar,tintColor:s.Color.Red}},anytime:{title:"Anytime",icon:{source:s.Icon.Layers,tintColor:s.Color.Green}},someday:{title:"Someday",icon:{source:s.Icon.Folder,tintColor:s.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:s.Icon.CheckCircle,tintColor:s.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:s.Icon.Folder,tintColor:s.Color.Green}:{source:s.Icon.Circle,tintColor:s.Color.Blue}})},vt={open:s.Icon.Circle,completed:{source:s.Icon.CheckCircle,tintColor:s.Color.Blue},canceled:{source:s.Icon.XMarkCircle,tintColor:s.Color.SecondaryText}},Ht={open:s.Icon.Circle,completed:s.Icon.CheckCircle,canceled:s.Icon.XMarkCircle};var u=class extends Error{constructor(a,o,r,n){super(n?`${n}: ${a}`:a);this.type=o;this.originalError=r;this.operation=n;this.name="ThingsError"}type;originalError;operation},b=async(t,e)=>{try{let a=await(0,w.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let r=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new u("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,e):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new u("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,e):r.match(/doesn't understand/i)||r.match(/can't get/i)?new u("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,e):r.match(/timed out/i)?new u("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,e):new u(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,e)}},ct={inbox:"TMInboxListSource",today:"TMTodayListSource",anytime:"TMNextListSource",upcoming:"TMCalendarListSource",someday:"TMSomedayListSource",logbook:"TMLogbookListSource",trash:"TMTrashListSource"};function S(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var p=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,ut="tag => tag.name()",pt=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,dt=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${p}(props.dueDate) : '',
    activationDate: props.activationDate ? ${p}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,lt=`project => {
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
    dueDate: props.dueDate ? ${p}(props.dueDate) : '',
    activationDate: props.activationDate ? ${p}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${dt})
  };
}`,mt=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${p}(props.dueDate) : '',
    activationDate: props.activationDate ? ${p}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,gt=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${mt})
  };
}`;function Dt(t){return t.projectId?`const projectMatches = things.projects.whose({id: '${S(t.projectId)}'})();
  const todos = projectMatches.length ? projectMatches[0].toDos() : [];`:t.areaId?`const areaMatches = things.areas.whose({id: '${S(t.areaId)}'})();
  const todos = areaMatches.length ? areaMatches[0].toDos() : [];`:t.listName?`const todos = things.lists.byId('${ct[t.listName]??S(t.listName)}').toDos();`:"const todos = things.toDos();"}async function M(t,e={}){return b(`
  const things = Application('${t}');
  ${Dt(e)}
  return todos.map(todo => {
    const props = todo.properties();
    const projectRef = props.project;
    const areaRef = props.area;
    const s = props.status;
    return {
      id: props.id,
      name: props.name,
      status: s !== 'open' ? s : undefined,
      dueDate: props.dueDate ? ${p}(props.dueDate) : undefined,
      dueDateIsRecurring: false,
      activationDate: props.activationDate ? ${p}(props.activationDate) : undefined,
      isRecurring: false,
      projectName: projectRef ? projectRef.name() : undefined,
      projectId: projectRef ? projectRef.id() : undefined,
      areaName: areaRef ? areaRef.name() : undefined,
      areaId: areaRef ? areaRef.id() : undefined,
    };
  });
`,"Query todos")}var Bt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${ut})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${pt})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${lt})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${gt})`}];var f=require("fs"),J=require("os"),y=require("path"),j=require("@raycast/utils");var L={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},k=16,F=12,_=7,ft=15,Tt=31,U=262213760,c=69760;function g(t){if(!t||t===U||t===c)return null;let e=t>>k,a=t>>F&ft,o=t>>_&Tt;return e<=0||a<1||a>12||o<1||o>31?null:`${e.toString().padStart(4,"0")}-${a.toString().padStart(2,"0")}-${o.toString().padStart(2,"0")}`}function C(t,e,a){return t<<k|e<<F|a<<_}function A(){let t=new Date;return C(t.getFullYear(),t.getMonth()+1,t.getDate())+127}function Nt(t,e){let a=g(t);if(!a)return null;let[o,r,n]=a.split("-").map(Number),i=new Date(o,r-1,n);return i.setDate(i.getDate()+e),C(i.getFullYear(),i.getMonth()+1,i.getDate())}function v(){let t=C(2026,6,11),e=g(t),a="2026-06-11";if(e!==a)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${a}", got "${e}".`)}function Rt(t){if(!t||typeof t!="string")return null;let e=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return e?parseInt(e[1],10):null}function I(t,e,a,o){let r=null;if(t?r=g(t):a&&a!==c&&(r=g(a)),e===U){let n=Rt(o);if(n!==null&&a){let i=Nt(a,n);return{effectiveDeadline:i!==null?g(i):null,effectiveStartDate:r,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!0}}return e?{effectiveDeadline:g(e),effectiveStartDate:r,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!1}}function Et(){let t=(0,y.join)((0,J.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),e=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,f.existsSync)(t))throw e;let a=[],o=(0,f.readdirSync)(t).find(n=>n.startsWith("ThingsData-"));o&&a.push((0,y.join)(t,o,"Things Database.thingsdatabase","main.sqlite")),a.push((0,y.join)(t,"Things Database.thingsSQLite"));let r=a.find(f.existsSync);if(r)return r;throw e}var N;async function B(){if(N&&(0,f.existsSync)(N))return N;let t=Et();return v(),await ht(t),N=t,N}async function ht(t){let e=Object.keys(L).map(n=>`'${n}'`).join(", "),a=await(0,j.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${e})`),o={};for(let n of a)o[n.table_name]||(o[n.table_name]=new Set),o[n.table_name].add(n.column_name);let r=n=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${n}`);for(let[n,i]of Object.entries(L)){if(!o[n])throw r(`Table "${n}" not found.`);let T=i.filter(E=>!o[n].has(E));if(T.length)throw r(`Missing column(s) in "${n}": ${T.join(", ")}.`)}}function H(t){return t.replace(/'/g,"''")}function W(t){return t===2?"canceled":t===3?"completed":"open"}var $=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var St=`
  FROM TMTask t
  LEFT JOIN TMTask p ON t.project = p.uuid
  LEFT JOIN TMArea pa ON p.area = pa.uuid
  LEFT JOIN TMArea a ON t.area = a.uuid`,q=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${c}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,Kt=`${q},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${$("t")} as tagList`,d="COALESCE(p.trashed, 0) = 0",x=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${d}`;function At(t,e){return t?`${x} AND t.project = '${H(t)}'${D}`:e?`${x} AND t.area = '${H(e)}' AND t.project IS NULL${D}`:`${x}${D}`}function It(t){let{effectiveDeadline:e,effectiveStartDate:a,dueDateIsRecurring:o}=I(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,dueDate:e??void 0,dueDateIsRecurring:o,activationDate:a??void 0,isRecurring:!!t.isRecurring,projectName:t.projectName??void 0,projectId:t.projectId??void 0,areaName:t.areaName??void 0,areaId:t.areaId??void 0}}async function Q(t={}){if(t.listName)return(await G(t.listName)).map(yt);let e=await B(),a=At(t.projectId,t.areaId),o=`SELECT ${q} ${St} WHERE ${a} ORDER BY t."index" ASC`;return(await(0,j.executeSQL)(e,o)).map(It)}function yt(t){return{id:t.id,name:t.name,status:t.status!=="open"?t.status:void 0,dueDate:t.dueDate||void 0,dueDateIsRecurring:t.dueDateIsRecurring??!1,activationDate:t.activationDate||void 0,isRecurring:t.isRecurring??!1,projectName:t.project?.name,projectId:t.project?.id,areaName:t.area?.name,areaId:t.area?.id}}var l=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${c}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${$("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${c}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${$("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,Y=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,D=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${Y}
  )`;function jt(t){let{effectiveDeadline:e,effectiveStartDate:a,dueDateIsRecurring:o}=I(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule),r,n,i=null;if(t.projectId){let E;t.projectAreaId&&(E={id:t.projectAreaId,name:t.projectAreaName??""},i=t.areaTagList??null);let{effectiveDeadline:z,effectiveStartDate:V}=I(t.projectStartDate??0,t.projectDeadline??0,t.projectNextInstanceStartDate??0,t.projectRecurrenceRule);r={id:t.projectId,name:t.projectName??"",status:W(t.projectStatus),notes:t.projectNotes??"",tags:t.projectTagList??"",dueDate:z??"",activationDate:V??"",area:E}}else t.areaId&&(n={id:t.areaId,name:t.areaName??""},i=t.areaTagList??null);let T=t.creationDateRaw?new Date(t.creationDateRaw*1e3).toISOString():null;return{id:t.id,name:t.name,status:W(t.status),notes:t.notes,tags:t.tagList??"",dueDate:e??"",activationDate:a??"",creationDate:T??"",isProject:t.type===1,isRecurring:!!t.isRecurring,dueDateIsRecurring:o,areaTags:i,project:r,area:n}}async function m(t,e){return(await(0,j.executeSQL)(t,e)).map(jt)}async function Lt(t){return m(t,`
    ${l}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 0
      AND ${d}
    ORDER BY t."index" ASC
  `)}async function Ct(t){let e=A();return m(t,`
    ${l}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start IN (1, 2)
      AND t.startDate IS NOT NULL
      AND t.startDate <= ${e}
      AND ${d}
      ${D}
    ORDER BY t.todayIndex ASC, t."index" ASC
  `)}async function xt(t){let e=A(),[a,o]=await Promise.all([m(t,`
      ${l}
      WHERE
        t.type = 0
        AND t.trashed = 0
        AND t.status = 0
        AND t.start IN (1, 2)
        AND t.startDate IS NOT NULL
        AND t.startDate <= ${e}
        AND ${d}
        AND (t.project IS NULL OR (SELECT p.start FROM TMTask p WHERE p.uuid = t.project) = 1)
        ${D}
      ORDER BY
        CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
        p."index" ASC,
        t."index" DESC
    `),m(t,`
      ${l}
      WHERE
        t.type = 0
        AND t.trashed = 0
        AND t.status = 0
        AND t.start = 1
        AND (t.startDate IS NULL OR t.startDate > ${e})
        AND ${d}
        AND (t.project IS NULL OR (SELECT p.start FROM TMTask p WHERE p.uuid = t.project) = 1)
        ${D}
      ORDER BY
        CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
        p."index" ASC,
        t."index" ASC
    `)]),r=new Set(a.map(n=>n.id));return[...a,...o.filter(n=>!r.has(n.id))]}async function $t(t){let e=A();return m(t,`
    ${l}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 2
      AND ${d}
      AND (
        (t.startDate IS NOT NULL AND t.startDate > ${e})
        OR (
          t.rt1_recurrenceRule IS NOT NULL
          AND t.rt1_repeatingTemplate IS NULL
          AND (
            (
              t.rt1_nextInstanceStartDate IS NOT NULL
              AND t.rt1_nextInstanceStartDate != ${c}
            )
            OR ${Y}
          )
        )
      )
    ORDER BY
      COALESCE(t.startDate, NULLIF(t.rt1_nextInstanceStartDate, ${c})) IS NULL ASC,
      COALESCE(t.startDate, NULLIF(t.rt1_nextInstanceStartDate, ${c})) ASC,
      CASE WHEN t.project IS NULL THEN 0 ELSE 1 END ASC,
      p."index" ASC,
      CASE WHEN t.startDate IS NULL THEN 0 ELSE 1 END ASC,
      CASE WHEN t.todayIndex IS NULL OR t.todayIndex = 0 THEN 1 ELSE 0 END ASC,
      t.todayIndex ASC,
      t."index" DESC
  `)}async function Pt(t){return m(t,`
    ${l}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status = 0
      AND t.start = 2
      AND t.startDate IS NULL
      AND t.rt1_recurrenceRule IS NULL
      AND t.rt1_repeatingTemplate IS NULL
      AND ${d}
    ORDER BY t.type ASC, t."index" ASC
  `)}async function Ot(t){return m(t,`
    ${l}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 0
      AND t.status IN (2, 3)
      AND t.stopDate IS NOT NULL
      AND ${d}
    ORDER BY t.stopDate DESC
  `)}async function wt(t){return m(t,`
    ${l}
    WHERE
      t.type IN (0, 1)
      AND t.trashed = 1
    ORDER BY t.userModificationDate DESC
  `)}async function G(t){let e=await B();switch(t){case"inbox":return Lt(e);case"today":return Ct(e);case"anytime":return xt(e);case"upcoming":return $t(e);case"someday":return Pt(e);case"logbook":return Ot(e);case"trash":return wt(e);default:return[]}}var K=(0,R.getPreferenceValues)();async function X(t={}){return K.useUnofficialApi?Q(t):M(K.thingsAppIdentifier,t)}async function Mt({listName:t,projectId:e,areaId:a}){return await X({listName:t,projectId:e,areaId:a})}
