"use strict";var T=Object.create;var i=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty;var S=(e,a)=>{for(var r in a)i(e,r,{get:a[r],enumerable:!0})},p=(e,a,r,d)=>{if(a&&typeof a=="object"||typeof a=="function")for(let s of R(a))!h.call(e,s)&&s!==r&&i(e,s,{get:()=>a[s],enumerable:!(d=N(a,s))||d.enumerable});return e};var l=(e,a,r)=>(r=e!=null?T(E(e)):{},p(a||!e||!e.__esModule?i(r,"default",{value:e,enumerable:!0}):r,e)),A=e=>p(i({},"__esModule",{value:!0}),e);var v={};S(v,{default:()=>U});module.exports=A(v);var m=require("child_process"),g=require("util"),o=require("@raycast/api"),D=l(require("query-string"));var j=require("@raycast/utils");var t=require("@raycast/api"),y=l(require("dayjs")),J={inbox:{title:"Inbox",icon:{source:t.Icon.Tray,tintColor:t.Color.Blue}},today:{title:"Today",icon:{source:t.Icon.Star,tintColor:t.Color.Yellow}},evening:{title:"This Evening",icon:{source:t.Icon.Moon,tintColor:t.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:t.Icon.ArrowClockwise,tintColor:t.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:t.Icon.Calendar,tintColor:t.Color.Red}},anytime:{title:"Anytime",icon:{source:t.Icon.Layers,tintColor:t.Color.Green}},someday:{title:"Someday",icon:{source:t.Icon.Folder,tintColor:t.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:t.Icon.CheckCircle,tintColor:t.Color.Green}},list:e=>({title:e.name,icon:e.type==="area"?{source:t.Icon.Folder,tintColor:t.Color.Green}:{source:t.Icon.Circle,tintColor:t.Color.Blue}})},B={open:t.Icon.Circle,completed:{source:t.Icon.CheckCircle,tintColor:t.Color.Blue},canceled:{source:t.Icon.XMarkCircle,tintColor:t.Color.SecondaryText}},q={open:t.Icon.Circle,completed:t.Icon.CheckCircle,canceled:t.Icon.XMarkCircle};var n=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,L="tag => tag.name()",C=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,x=`todo => {
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
}`,P=`project => {
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
    todos: project.toDos().map(${x})
  };
}`,$=`todo => {
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
}`,O=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${$})
  };
}`;var G=[{name:"tags",needs:["tags"],expr:`things.tags().map(${L})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${C})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${P})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${O})`}];var w=require("@raycast/utils");var c=69760;var u=e=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${e}.uuid)`;var b=`
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
  COALESCE(a.uuid, pa.uuid) as areaId`,rt=`${b},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${u("t")} as tagList`,M="COALESCE(p.trashed, 0) = 0",nt=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${M}`;var st=`
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
    LEFT JOIN TMArea a ON t.area = a.uuid`,k=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,ot=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${k}
  )`;var $t=(0,o.getPreferenceValues)();async function F(e){await(0,g.promisify)(m.exec)(`open -g "${e}"`)}function _(e){return D.default.stringify(e,{skipNull:!0,skipEmptyString:!0})}async function f(e){await F(`things:///add?${_(e)}`)}async function U(e){return await f(e)}
