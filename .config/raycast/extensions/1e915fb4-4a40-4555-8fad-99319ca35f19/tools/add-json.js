"use strict";var f=Object.create;var i=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var h=(e,a)=>{for(var r in a)i(e,r,{get:a[r],enumerable:!0})},d=(e,a,r,p)=>{if(a&&typeof a=="object"||typeof a=="function")for(let o of N(a))!E.call(e,o)&&o!==r&&i(e,o,{get:()=>a[o],enumerable:!(p=T(a,o))||p.enumerable});return e};var l=(e,a,r)=>(r=e!=null?f(R(e)):{},d(a||!e||!e.__esModule?i(r,"default",{value:e,enumerable:!0}):r,e)),S=e=>d(i({},"__esModule",{value:!0}),e);var U={};h(U,{default:()=>_});module.exports=S(U);var m=require("child_process"),g=require("util"),s=require("@raycast/api"),k=l(require("query-string"));var I=require("@raycast/utils");var t=require("@raycast/api"),A=l(require("dayjs")),J={inbox:{title:"Inbox",icon:{source:t.Icon.Tray,tintColor:t.Color.Blue}},today:{title:"Today",icon:{source:t.Icon.Star,tintColor:t.Color.Yellow}},evening:{title:"This Evening",icon:{source:t.Icon.Moon,tintColor:t.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:t.Icon.ArrowClockwise,tintColor:t.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:t.Icon.Calendar,tintColor:t.Color.Red}},anytime:{title:"Anytime",icon:{source:t.Icon.Layers,tintColor:t.Color.Green}},someday:{title:"Someday",icon:{source:t.Icon.Folder,tintColor:t.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:t.Icon.CheckCircle,tintColor:t.Color.Green}},list:e=>({title:e.name,icon:e.type==="area"?{source:t.Icon.Folder,tintColor:t.Color.Green}:{source:t.Icon.Circle,tintColor:t.Color.Blue}})},W={open:t.Icon.Circle,completed:{source:t.Icon.CheckCircle,tintColor:t.Color.Blue},canceled:{source:t.Icon.XMarkCircle,tintColor:t.Color.SecondaryText}},B={open:t.Icon.Circle,completed:t.Icon.CheckCircle,canceled:t.Icon.XMarkCircle};var n=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,j="tag => tag.name()",L=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,C=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${n}(props.dueDate) : '',
    activationDate: props.activationDate ? ${n}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,x=`project => {
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
    dueDate: props.dueDate ? ${n}(props.dueDate) : '',
    activationDate: props.activationDate ? ${n}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${C})
  };
}`,O=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${n}(props.dueDate) : '',
    activationDate: props.activationDate ? ${n}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,$=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${O})
  };
}`;var Y=[{name:"tags",needs:["tags"],expr:`things.tags().map(${j})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${L})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${x})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${$})`}];var P=require("@raycast/utils");var c=69760;var u=e=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${e}.uuid)`;var w=`
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
  COALESCE(a.uuid, pa.uuid) as areaId`,at=`${w},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${u("t")} as tagList`,b="COALESCE(p.trashed, 0) = 0",rt=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${b}`;var nt=`
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
      ${u("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${c}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${u("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,M=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,st=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${M}
  )`;var Ot=(0,s.getPreferenceValues)();async function F(e){await(0,g.promisify)(m.exec)(`open -g "${e}"`)}async function D(e){let{authToken:a}=(0,s.getPreferenceValues)();if(!a)throw new Error("unauthorized");let r=encodeURIComponent(JSON.stringify(e));await F(`things:///json?auth-token=${encodeURIComponent(a)}&data=${r}`)}async function _({jsonData:e}){let a;try{a=JSON.parse(e)}catch{throw new Error("jsonData must be valid JSON.")}if(!Array.isArray(a))throw new Error("jsonData must be a JSON array.");try{return await D(a),{success:!0}}catch(r){if(r instanceof Error&&r.message==="unauthorized")return{error:"No token provided",message:"Add your Things token in the extension settings. You can find your unique token in Things settings. go to Things \u2192 Settings \u2192 General \u2192 Enable Things URLs \u2192 Manage"};throw r}}
