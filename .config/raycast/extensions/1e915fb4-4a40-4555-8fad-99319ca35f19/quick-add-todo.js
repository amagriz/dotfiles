"use strict";var A=Object.create;var p=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var C=(t,a)=>{for(var n in a)p(t,n,{get:a[n],enumerable:!0})},f=(t,a,n,s)=>{if(a&&typeof a=="object"||typeof a=="function")for(let i of I(a))!L.call(t,i)&&i!==n&&p(t,i,{get:()=>a[i],enumerable:!(s=S(a,i))||s.enumerable});return t};var m=(t,a,n)=>(n=t!=null?A(j(t)):{},f(a||!t||!t.__esModule?p(n,"default",{value:t,enumerable:!0}):n,t)),x=t=>f(p({},"__esModule",{value:!0}),t);var Q={};C(Q,{default:()=>y});module.exports=x(Q);var r=require("@raycast/api");var D=require("child_process"),T=require("util"),o=require("@raycast/api"),h=m(require("query-string"));var O=require("@raycast/utils");var e=require("@raycast/api"),P=m(require("dayjs")),K={inbox:{title:"Inbox",icon:{source:e.Icon.Tray,tintColor:e.Color.Blue}},today:{title:"Today",icon:{source:e.Icon.Star,tintColor:e.Color.Yellow}},evening:{title:"This Evening",icon:{source:e.Icon.Moon,tintColor:e.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:e.Icon.ArrowClockwise,tintColor:e.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:e.Icon.Calendar,tintColor:e.Color.Red}},anytime:{title:"Anytime",icon:{source:e.Icon.Layers,tintColor:e.Color.Green}},someday:{title:"Someday",icon:{source:e.Icon.Folder,tintColor:e.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:e.Icon.CheckCircle,tintColor:e.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:e.Icon.Folder,tintColor:e.Color.Green}:{source:e.Icon.Circle,tintColor:e.Color.Blue}})},X={open:e.Icon.Circle,completed:{source:e.Icon.CheckCircle,tintColor:e.Color.Blue},canceled:{source:e.Icon.XMarkCircle,tintColor:e.Color.SecondaryText}},z={open:e.Icon.Circle,completed:e.Icon.CheckCircle,canceled:e.Icon.XMarkCircle};var u=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,w="tag => tag.name()",b=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,k=`todo => {
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
}`,M=`project => {
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
    todos: project.toDos().map(${k})
  };
}`,F=`todo => {
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
}`,_=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${F})
  };
}`;var tt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${w})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${b})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${M})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${_})`}];var v=require("@raycast/utils");var l=69760;var g=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var U=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${l}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,ut=`${U},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${g("t")} as tagList`,H="COALESCE(p.trashed, 0) = 0",dt=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${H}`;var pt=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${l}) as nextInstanceStartDate,
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
      NULLIF(p.rt1_nextInstanceStartDate, ${l}) as projectNextInstanceStartDate,
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
    LEFT JOIN TMArea a ON t.area = a.uuid`,W=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,lt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${W}
  )`;var Ft=(0,o.getPreferenceValues)();async function B(t){await(0,T.promisify)(D.exec)(`open -g "${t}"`)}function J(t){return h.default.stringify(t,{skipNull:!0,skipEmptyString:!0})}async function N(t){await B(`things:///add?${J(t)}`)}async function R(t,a){if(t instanceof Error&&t.message==="unauthorized"){await(0,o.showToast)({style:o.Toast.Style.Failure,title:"This action needs an authentication token.",message:`Please set it in the extension preferences.
You can find your unique token in Things' settings. go to Things \u2192 Settings \u2192 General \u2192 Enable Things URLs \u2192 Manage`,primaryAction:{title:"Open Extension Preferences",onAction(n){(0,o.openExtensionPreferences)(),n.hide()}}});return}await(0,o.showToast)({style:o.Toast.Style.Failure,title:a??"Something went wrong",message:t instanceof Error?t.message:String(t)})}var q=m(require("dayjs"));var E=t=>t.charAt(0).toUpperCase()+t.slice(1);async function y(t){try{let{shouldCloseMainWindow:a,dontUseAI:n}=(0,r.getPreferenceValues)(),s;if(a?await(0,r.closeMainWindow)():await(0,r.showToast)({style:r.Toast.Style.Animated,title:"Adding to-do"}),n||!r.environment.canAccess(r.AI)){let{text:d}=t.arguments;s={title:d}}else{let d=await r.AI.ask(`Act as a task manager. I'll give you a task in a natural language. Your job is to return me only a parsable and minified JSON object. Do not wrap it in a code block or add any other text.

Here are the possible keys of the JSON object with their respective values:
- title: The title of the to-do.
- when: Possible values: "today", "tomorrow", "evening", "anytime", "someday", natural language dates such as "in 3 days" or "next tuesday", or a date time string (natural language dates followed by the @ symbol and then followed by a time string. E.g. "this friday@14:00".).
- deadline: The deadline to apply to the to-do. Only can be a date string (yyyy-mm-dd).
- tags: Comma separated strings corresponding to the titles of tags.
- list: The title of a project or area to add to.
- heading: The title of a heading within a project to add to.
- completed: Whether or not the to-do should be set to complete.
- canceled: Whether or not the to-do should be set to canceled.

Please make sure to follow these rules:
- You should return a valid, parsable JSON object.
- Don't add a key if the user didn't specify it.

Here are some examples to help you out:
- Book flights today in my Trips list: {"title":"Book flights","when":"today","list":"Trips"}
- Add milk to my groceries list for tomorrow with Errand tag: {"title":"Milk","when":"tomorrow","list":"Groceries","tags":"Errand"}
- Respond to mails: {"title":"Respond to mails"}
- Buy a new car by the end of the year: {"title":"Buy a new car","deadline":"2023-12-31"}
- Collect dry cleaning this evening at 7PM: {"title":"Collect dry cleaning","when":"evening@19:00"}
- Fix landing page this Friday in bugs heading of Revamp Homepage project: {"title":"Fix landing page","when":"this friday","list":"Revamp Homepage","heading":"Bugs"}
- Add a completed task called "Ship feature" to my Work list: {"title":"Ship feature","list":"Work","completed":"true"}
- Answer to mails by this week-end: {"title":"Answer to mails","deadline":"2023-09-08"}

Here's the task: "${t.fallbackText??t.arguments.text}"`),c=JSON.parse(d.trim());if(typeof c!="object"||c===null||Array.isArray(c))throw new Error("AI returned an unexpected format. Please try again.");if(typeof c.title!="string"||!c.title)throw new Error("AI returned a response without a title. Please try again.");s=c}t.arguments.notes&&(s.notes=t.arguments.notes),t.arguments.checklist&&(s["checklist-items"]=t.arguments.checklist.split(",").map(d=>d.trim()).join(`
`)),await N(s);let i=s.list??(s.when?E(s.when):"Inbox");await(0,r.showToast)({style:r.Toast.Style.Success,title:"Added to-do",message:`Added "${s.title}" to '${i}'`})}catch(a){await R(a,"Unable to add to-do")}}
