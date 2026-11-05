"use strict";var h=Object.create;var u=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var j=(t,n)=>{for(var a in n)u(t,a,{get:n[a],enumerable:!0})},D=(t,n,a,c)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of A(n))!I.call(t,r)&&r!==a&&u(t,r,{get:()=>n[r],enumerable:!(c=S(n,r))||c.enumerable});return t};var f=(t,n,a)=>(a=t!=null?h(y(t)):{},D(n||!t||!t.__esModule?u(a,"default",{value:t,enumerable:!0}):a,t)),L=t=>D(u({},"__esModule",{value:!0}),t);var J={};j(J,{confirmation:()=>W,default:()=>H});module.exports=L(J);var i=require("@raycast/api"),v=f(require("query-string"));var T=require("@raycast/utils");var e=require("@raycast/api"),C=f(require("dayjs")),Q={inbox:{title:"Inbox",icon:{source:e.Icon.Tray,tintColor:e.Color.Blue}},today:{title:"Today",icon:{source:e.Icon.Star,tintColor:e.Color.Yellow}},evening:{title:"This Evening",icon:{source:e.Icon.Moon,tintColor:e.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:e.Icon.ArrowClockwise,tintColor:e.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:e.Icon.Calendar,tintColor:e.Color.Red}},anytime:{title:"Anytime",icon:{source:e.Icon.Layers,tintColor:e.Color.Green}},someday:{title:"Someday",icon:{source:e.Icon.Folder,tintColor:e.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:e.Icon.CheckCircle,tintColor:e.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:e.Icon.Folder,tintColor:e.Color.Green}:{source:e.Icon.Circle,tintColor:e.Color.Blue}})},Y={open:e.Icon.Circle,completed:{source:e.Icon.CheckCircle,tintColor:e.Color.Blue},canceled:{source:e.Icon.XMarkCircle,tintColor:e.Color.SecondaryText}},G={open:e.Icon.Circle,completed:e.Icon.CheckCircle,canceled:e.Icon.XMarkCircle};var s=class extends Error{constructor(a,c,r,g){super(g?`${g}: ${a}`:a);this.type=c;this.originalError=r;this.operation=g;this.name="ThingsError"}type;originalError;operation},d=async(t,n)=>{try{let a=await(0,T.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let r=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new s("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,n):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new s("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,n):r.match(/doesn't understand/i)||r.match(/can't get/i)?new s("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,n):r.match(/timed out/i)?new s("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,n):new s(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,n)}};function l(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}var o=`(d => {
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
    dueDate: props.dueDate ? ${o}(props.dueDate) : '',
    activationDate: props.activationDate ? ${o}(props.activationDate) : '',
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
    dueDate: props.dueDate ? ${o}(props.dueDate) : '',
    activationDate: props.activationDate ? ${o}(props.activationDate) : '',
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
    dueDate: props.dueDate ? ${o}(props.dueDate) : '',
    activationDate: props.activationDate ? ${o}(props.activationDate) : '',
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
}`;var z=[{name:"tags",needs:["tags"],expr:`things.tags().map(${P})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${$})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${w})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${M})`}];var k=require("@raycast/utils");var p=69760;var m=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var F=`
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
  COALESCE(a.uuid, pa.uuid) as areaId`,ot=`${F},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${m("t")} as tagList`,_="COALESCE(p.trashed, 0) = 0",it=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${_}`;var ct=`
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
      ${m("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${p}) as projectNextInstanceStartDate,
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
    )`,ut=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${U}
  )`;var N=(0,i.getPreferenceValues)();var R=t=>d(`
  const things = Application('${N.thingsAppIdentifier}');
  const project = things.projects.byId('${l(t)}')

  return project.name();
`,"Get project name");var E=t=>d(`
  const things = Application('${N.thingsAppIdentifier}');
  things.delete(things.projects.byId('${l(t)}'));
`,"Delete project");async function H({projectId:t}){return await E(t)}var W=async({projectId:t})=>({message:"Are you sure you want to delete the project?",info:[{name:"Project",value:await R(t)}]});0&&(module.exports={confirmation});
