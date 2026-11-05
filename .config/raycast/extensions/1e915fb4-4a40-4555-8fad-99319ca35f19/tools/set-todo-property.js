"use strict";var h=Object.create;var p=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var j=(e,r)=>{for(var a in r)p(e,a,{get:r[a],enumerable:!0})},g=(e,r,a,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of A(r))!I.call(e,n)&&n!==a&&p(e,n,{get:()=>r[n],enumerable:!(s=S(r,n))||s.enumerable});return e};var D=(e,r,a)=>(a=e!=null?h(y(e)):{},g(r||!e||!e.__esModule?p(a,"default",{value:e,enumerable:!0}):a,e)),L=e=>g(p({},"__esModule",{value:!0}),e);var B={};j(B,{default:()=>J});module.exports=L(B);var c=require("@raycast/api"),v=D(require("query-string"));var f=require("@raycast/utils");var t=require("@raycast/api"),C=D(require("dayjs")),Y={inbox:{title:"Inbox",icon:{source:t.Icon.Tray,tintColor:t.Color.Blue}},today:{title:"Today",icon:{source:t.Icon.Star,tintColor:t.Color.Yellow}},evening:{title:"This Evening",icon:{source:t.Icon.Moon,tintColor:t.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:t.Icon.ArrowClockwise,tintColor:t.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:t.Icon.Calendar,tintColor:t.Color.Red}},anytime:{title:"Anytime",icon:{source:t.Icon.Layers,tintColor:t.Color.Green}},someday:{title:"Someday",icon:{source:t.Icon.Folder,tintColor:t.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:t.Icon.CheckCircle,tintColor:t.Color.Green}},list:e=>({title:e.name,icon:e.type==="area"?{source:t.Icon.Folder,tintColor:t.Color.Green}:{source:t.Icon.Circle,tintColor:t.Color.Blue}})},G={open:t.Icon.Circle,completed:{source:t.Icon.CheckCircle,tintColor:t.Color.Blue},canceled:{source:t.Icon.XMarkCircle,tintColor:t.Color.SecondaryText}},K={open:t.Icon.Circle,completed:t.Icon.CheckCircle,canceled:t.Icon.XMarkCircle};var o=class extends Error{constructor(a,s,n,u){super(u?`${u}: ${a}`:a);this.type=s;this.originalError=n;this.operation=u;this.name="ThingsError"}type;originalError;operation},T=async(e,r)=>{try{let a=await(0,f.runAppleScript)(`JSON.stringify((function(){${e}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let n=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw n.match(/Application can't be found/i)?new o("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",n,r):n.match(/not allowed assistive access/i)||n.match(/permission/i)||n.match(/-1743/)?new o("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",n,r):n.match(/doesn't understand/i)||n.match(/can't get/i)?new o("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",n,r):n.match(/timed out/i)?new o("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",n,r):new o(`Unexpected error: ${n}`,"UNKNOWN_ERROR",n,r)}};function l(e){return e.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var i=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,P="tag => tag.name()",$=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
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
    dueDate: props.dueDate ? ${i}(props.dueDate) : '',
    activationDate: props.activationDate ? ${i}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,w=`project => {
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
    dueDate: props.dueDate ? ${i}(props.dueDate) : '',
    activationDate: props.activationDate ? ${i}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${O})
  };
}`,b=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${i}(props.dueDate) : '',
    activationDate: props.activationDate ? ${i}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,M=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${b})
  };
}`;var V=[{name:"tags",needs:["tags"],expr:`things.tags().map(${P})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${$})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${w})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${M})`}];var k=require("@raycast/utils");var d=69760;var m=e=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${e}.uuid)`;var F=`
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
  COALESCE(a.uuid, pa.uuid) as areaId`,it=`${F},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${m("t")} as tagList`,_="COALESCE(p.trashed, 0) = 0",ct=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${_}`;var ut=`
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
      ${m("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${d}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${m("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,U=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,pt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${U}
  )`;var H=(0,c.getPreferenceValues)();var W=["dueDate","activationDate","completionDate","cancellationDate"],N=(e,r,a)=>{let s;if(W.includes(r)){let[u,R,E]=a.split("-").map(Number);s=`new Date(${u}, ${R-1}, ${E})`}else s=`'${l(a)}'`;let n=r==="status"?`
  if (todo.status() !== ${s}) {
    throw new Error("Things ignored the status change. If this is a repeating to-do, complete or cancel its scheduled occurrence instead.");
  }`:"";return T(`
  const things = Application('${H.thingsAppIdentifier}');
  const todo = things.toDos.byId('${l(e)}');
  todo.${r} = ${s};${n}
`,"Set todo property")};async function J({todoId:e,key:r,value:a}){return await N(e,r,a)}
