"use strict";var G=Object.create;var N=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames;var z=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var Z=(t,a)=>{for(var e in a)N(t,e,{get:a[e],enumerable:!0})},C=(t,a,e,i)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of X(a))!V.call(t,r)&&r!==e&&N(t,r,{get:()=>a[r],enumerable:!(i=K(a,r))||i.enumerable});return t};var S=(t,a,e)=>(e=t!=null?G(z(t)):{},C(a||!t||!t.__esModule?N(e,"default",{value:t,enumerable:!0}):e,t)),tt=t=>C(N({},"__esModule",{value:!0}),t);var Rt={};Z(Rt,{default:()=>q});module.exports=tt(Rt);var p=require("@raycast/api"),B=require("@raycast/utils"),J=require("react");var h=require("@raycast/api"),Nt=S(require("query-string"));var $=require("@raycast/utils");var n=require("@raycast/api"),et=S(require("dayjs")),At={inbox:{title:"Inbox",icon:{source:n.Icon.Tray,tintColor:n.Color.Blue}},today:{title:"Today",icon:{source:n.Icon.Star,tintColor:n.Color.Yellow}},evening:{title:"This Evening",icon:{source:n.Icon.Moon,tintColor:n.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:n.Icon.ArrowClockwise,tintColor:n.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:n.Icon.Calendar,tintColor:n.Color.Red}},anytime:{title:"Anytime",icon:{source:n.Icon.Layers,tintColor:n.Color.Green}},someday:{title:"Someday",icon:{source:n.Icon.Folder,tintColor:n.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:n.Icon.CheckCircle,tintColor:n.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:n.Icon.Folder,tintColor:n.Color.Green}:{source:n.Icon.Circle,tintColor:n.Color.Blue}})},It={open:n.Icon.Circle,completed:{source:n.Icon.CheckCircle,tintColor:n.Color.Blue},canceled:{source:n.Icon.XMarkCircle,tintColor:n.Color.SecondaryText}},jt={open:n.Icon.Circle,completed:n.Icon.CheckCircle,canceled:n.Icon.XMarkCircle};function x(t){switch(t){case"area":return{source:n.Icon.Box,tintColor:n.Color.Green};case"project":return{source:n.Icon.List,tintColor:n.Color.Blue};case"todo":return n.Icon.Circle}}var u=class extends Error{constructor(e,i,r,s){super(s?`${s}: ${e}`:e);this.type=i;this.originalError=r;this.operation=s;this.name="ThingsError"}type;originalError;operation},P=async(t,a)=>{try{let e=await(0,$.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return e?JSON.parse(e):void 0}catch(e){let r=(typeof e=="string"?e:e instanceof Error?e.message:String(e)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new u("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,a):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new u("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,a):r.match(/doesn't understand/i)||r.match(/can't get/i)?new u("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,a):r.match(/timed out/i)?new u("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,a):new u(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,a)}};var d=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,rt="tag => tag.name()",nt=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,st=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${d}(props.dueDate) : '',
    activationDate: props.activationDate ? ${d}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,ot=`project => {
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
    dueDate: props.dueDate ? ${d}(props.dueDate) : '',
    activationDate: props.activationDate ? ${d}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${st})
  };
}`,it=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${d}(props.dueDate) : '',
    activationDate: props.activationDate ? ${d}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,ct=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${it})
  };
}`;var xt=[{name:"tags",needs:["tags"],expr:`things.tags().map(${rt})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${nt})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${ot})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${ct})`}];var O=async t=>P(`
    const things = Application('${t}');
    const areas = things.areas().map(area => ({ id: area.id(), name: area.name() }));
    const projects = things.projects().map(project => ({
      id: project.id(), name: project.name(),
      areaName: project.area() ? project.area().name() : undefined,
    }));
    const todos = things.toDos().filter(t => t.status() === 'open').map(todo => ({
      id: todo.id(),
      name: todo.name(),
      status: 'open',
      projectName: todo.project() ? todo.project().name() : undefined,
      areaName: todo.area() ? todo.area().name() : (todo.project() ? todo.project().area()?.name() : undefined),
    }));
    return { areas, projects, todos };
  `,"Get quick find data");var l=require("fs"),F=require("os"),E=require("path"),T=require("@raycast/utils");var A={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},w=16,k=12,M=7,ut=15,pt=31,dt=262213760,f=69760;function lt(t){if(!t||t===dt||t===f)return null;let a=t>>w,e=t>>k&ut,i=t>>M&pt;return a<=0||e<1||e>12||i<1||i>31?null:`${a.toString().padStart(4,"0")}-${e.toString().padStart(2,"0")}-${i.toString().padStart(2,"0")}`}function mt(t,a,e){return t<<w|a<<k|e<<M}function b(){let t=mt(2026,6,11),a=lt(t),e="2026-06-11";if(a!==e)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${e}", got "${a}".`)}function gt(){let t=(0,E.join)((0,F.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),a=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,l.existsSync)(t))throw a;let e=[],i=(0,l.readdirSync)(t).find(s=>s.startsWith("ThingsData-"));i&&e.push((0,E.join)(t,i,"Things Database.thingsdatabase","main.sqlite")),e.push((0,E.join)(t,"Things Database.thingsSQLite"));let r=e.find(l.existsSync);if(r)return r;throw a}var D;async function ft(){if(D&&(0,l.existsSync)(D))return D;let t=gt();return b(),await Dt(t),D=t,D}async function Dt(t){let a=Object.keys(A).map(s=>`'${s}'`).join(", "),e=await(0,T.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${a})`),i={};for(let s of e)i[s.table_name]||(i[s.table_name]=new Set),i[s.table_name].add(s.column_name);let r=s=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${s}`);for(let[s,c]of Object.entries(A)){if(!i[s])throw r(`Table "${s}" not found.`);let o=c.filter(y=>!i[s].has(y));if(o.length)throw r(`Missing column(s) in "${s}": ${o.join(", ")}.`)}}var I=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`;var Tt=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${f}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,bt=`${Tt},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${I("t")} as tagList`,_="COALESCE(p.trashed, 0) = 0",Ft=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${_}`;var _t=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${f}) as nextInstanceStartDate,
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
      NULLIF(p.rt1_nextInstanceStartDate, ${f}) as projectNextInstanceStartDate,
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
    LEFT JOIN TMArea a ON t.area = a.uuid`,ht=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,Ut=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${ht}
  )`;var U=async()=>{let t=await ft(),[a,e,i]=await Promise.all([(0,T.executeSQL)(t,`SELECT a.uuid as id, a.title as name
      FROM TMArea a`),(0,T.executeSQL)(t,`SELECT p.uuid as id, p.title as name, a.title as areaName
      FROM TMTask p
      LEFT JOIN TMArea a ON a.uuid = p.area
      WHERE p.type = 1 AND p.trashed = 0 AND p.status = 0`),(0,T.executeSQL)(t,`SELECT t.uuid as id, t.title as name, 'open' as status,
        p.title as projectName,
        COALESCE(pa.title, da.title) as areaName
      FROM TMTask t
      LEFT JOIN TMTask p ON p.uuid = t.project
      LEFT JOIN TMArea da ON da.uuid = t.area
      LEFT JOIN TMArea pa ON pa.uuid = p.area
      WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${_}`)]);return{areas:a,projects:e.map(r=>({...r,areaName:r.areaName??void 0})),todos:i.map(r=>({...r,projectName:r.projectName??void 0,areaName:r.areaName??void 0}))}};var v=(0,h.getPreferenceValues)();var H=()=>v.useUnofficialApi?U():O(v.thingsAppIdentifier);var Et=S(require("dayjs"));var W=t=>t.charAt(0).toUpperCase()+t.slice(1);var m=require("@raycast/api");var R=require("react/jsx-runtime");function j({error:t,onRetry:a}){let e=c=>{if(c instanceof u)switch(c.type){case"APP_NOT_FOUND":return{title:"Application Not Found",description:"The Things app is not running or not installed.",solutions:["**Start Things**: Open the Things app and make sure it's running","**Check Installation**: Verify Things is properly installed","**Restart**: Try quitting and restarting both Things and Raycast"],errorType:"Application Not Found"};case"PERMISSION_DENIED":return{title:"Permission Denied",description:"Raycast doesn't have permission to control Things.",solutions:["Open **System Settings** \u2192 **Privacy & Security** \u2192 **Automation**","Find **Raycast** in the list","Make sure **Things** is checked \u2705"],errorType:"Permission Denied"};case"EXECUTION_ERROR":return{title:"Things Communication Error",description:"There was an error communicating with Things.",solutions:["**Restart Things**: Quit and restart the Things app","**Wait and Retry**: If Things was just started, wait a moment and try again"],errorType:"Execution Error"};case"UNKNOWN_ERROR":return{title:"Unknown Error",description:"An unexpected error occurred while trying to communicate with Things.",solutions:["**Restart Both Apps**: Quit and restart both Things and Raycast","**Update**: Make sure both Things and Raycast are up to date"],errorType:"Unknown Error"}}return{title:"Error",description:"An error occurred while loading data from Things.",solutions:["Make sure Things is running","Check that Raycast has automation permissions","Try restarting both applications"],errorType:c.constructor.name}},i=(c,o)=>{let y=o instanceof u?o.originalError:o.message,L=o instanceof u?o.operation:void 0;return`# ${c.title}

${c.description}

## Solutions

${c.solutions.map((Q,Y)=>`${Y+1}. ${Q}`).join(`
`)}

## Technical Details

- Error Type: \`${c.errorType}\`${L?`
- Operation: \`${L}\``:""}
- Original Error: \`${y||"N/A"}\``},r=e(t),s=i(r,t);return(0,R.jsx)(m.Detail,{markdown:s,actions:a?(0,R.jsx)(m.ActionPanel,{children:(0,R.jsx)(m.Action,{title:"Try Again",onAction:a})}):void 0})}var g=require("react/jsx-runtime");function q(){let{data:t,isLoading:a,error:e,revalidate:i}=(0,B.useCachedPromise)(H),r=(0,J.useMemo)(()=>{if(!t)return[];let s=[],c=new Set;for(let o of t.areas)c.has(o.id)||(c.add(o.id),s.push({id:o.id,name:o.name,type:"area"}));for(let o of t.projects)c.has(o.id)||(c.add(o.id),s.push({id:o.id,name:o.name,type:"project",area:o.areaName}));for(let o of t.todos)c.has(o.id)||(c.add(o.id),s.push({id:o.id,name:o.name,type:"todo",project:o.projectName,area:o.areaName}));return s},[t]);return e?(0,g.jsx)(j,{error:e,onRetry:i}):(0,g.jsx)(p.List,{isLoading:a,searchBarPlaceholder:"Search areas, projects, and to-dos...",children:r.map(s=>(0,g.jsx)(p.List.Item,{title:s.name,subtitle:s.project||s.area,icon:x(s.type),accessories:[{text:W(s.type)}],actions:(0,g.jsx)(p.ActionPanel,{children:(0,g.jsx)(p.Action.Open,{title:"Open in Things",target:`things:///show?id=${s.id}`,icon:p.Icon.AppWindow})})},s.id))})}
