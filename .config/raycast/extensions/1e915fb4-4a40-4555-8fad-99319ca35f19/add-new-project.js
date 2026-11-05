"use strict";var dt=Object.create;var C=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var lt=Object.getOwnPropertyNames;var mt=Object.getPrototypeOf,gt=Object.prototype.hasOwnProperty;var Dt=(t,n)=>{for(var a in n)C(t,a,{get:n[a],enumerable:!0})},v=(t,n,a,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of lt(n))!gt.call(t,r)&&r!==a&&C(t,r,{get:()=>n[r],enumerable:!(i=pt(n,r))||i.enumerable});return t};var O=(t,n,a)=>(a=t!=null?dt(mt(t)):{},v(n||!t||!t.__esModule?C(a,"default",{value:t,enumerable:!0}):a,t)),ft=t=>v(C({},"__esModule",{value:!0}),t);var Ft={};Dt(Ft,{AddNewProject:()=>it,default:()=>ct});module.exports=ft(Ft);var e=require("@raycast/api"),S=require("@raycast/utils");var et=require("child_process"),at=require("util"),L=require("@raycast/api"),rt=O(require("query-string"));var H=require("@raycast/utils");var d=require("@raycast/api"),Tt=O(require("dayjs")),f={inbox:{title:"Inbox",icon:{source:d.Icon.Tray,tintColor:d.Color.Blue}},today:{title:"Today",icon:{source:d.Icon.Star,tintColor:d.Color.Yellow}},evening:{title:"This Evening",icon:{source:d.Icon.Moon,tintColor:d.Color.Purple}},tomorrow:{title:"Tomorrow",icon:{source:d.Icon.ArrowClockwise,tintColor:d.Color.Orange}},upcoming:{title:"Upcoming",icon:{source:d.Icon.Calendar,tintColor:d.Color.Red}},anytime:{title:"Anytime",icon:{source:d.Icon.Layers,tintColor:d.Color.Green}},someday:{title:"Someday",icon:{source:d.Icon.Folder,tintColor:d.Color.SecondaryText}},logbook:{title:"Logbook",icon:{source:d.Icon.CheckCircle,tintColor:d.Color.Green}},list:t=>({title:t.name,icon:t.type==="area"?{source:d.Icon.Folder,tintColor:d.Color.Green}:{source:d.Icon.Circle,tintColor:d.Color.Blue}})},vt={open:d.Icon.Circle,completed:{source:d.Icon.CheckCircle,tintColor:d.Color.Blue},canceled:{source:d.Icon.XMarkCircle,tintColor:d.Color.SecondaryText}},Ht={open:d.Icon.Circle,completed:d.Icon.CheckCircle,canceled:d.Icon.XMarkCircle};function P(t=[],n=[]){let a=t.filter(r=>!r.area).map(r=>({...r,type:"project"})),i=[];return n.forEach(r=>{i.push({...r,type:"area"});let s=t.filter(c=>c.area&&c.area.id===r.id).map(c=>({...c,type:"project"}));i.push(...s)}),[...a,...i]}var l=class extends Error{constructor(a,i,r,s){super(s?`${s}: ${a}`:a);this.type=i;this.originalError=r;this.operation=s;this.name="ThingsError"}type;originalError;operation},W=async(t,n)=>{try{let a=await(0,H.runAppleScript)(`JSON.stringify((function(){${t}})())`,{language:"JavaScript",timeout:6e4});return a?JSON.parse(a):void 0}catch(a){let r=(typeof a=="string"?a:a instanceof Error?a.message:String(a)).replace("execution error: Error: ","");throw r.match(/Application can't be found/i)?new l("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",r,n):r.match(/not allowed assistive access/i)||r.match(/permission/i)||r.match(/-1743/)?new l("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",r,n):r.match(/doesn't understand/i)||r.match(/can't get/i)?new l("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",r,n):r.match(/timed out/i)?new l("Command timed out. Things may be unresponsive or not running.","EXECUTION_ERROR",r,n):new l(`Unexpected error: ${r}`,"UNKNOWN_ERROR",r,n)}};var N=`(d => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
})`,ht="tag => tag.name()",Nt=`tag => {
  const props = tag.properties();
  const parentRef = props.parentTag;
  return {
    name: props.name,
    parent: parentRef ? parentRef.name() : null
  };
}`,Et=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${N}(props.dueDate) : '',
    activationDate: props.activationDate ? ${N}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
  };
}`,Rt=`project => {
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
    dueDate: props.dueDate ? ${N}(props.dueDate) : '',
    activationDate: props.activationDate ? ${N}(props.activationDate) : '',
    area,
    todos: project.toDos().map(${Et})
  };
}`,yt=`todo => {
  const props = todo.properties();
  return {
    id: props.id,
    name: props.name,
    status: props.status,
    notes: props.notes || '',
    tags: todo.tagNames(),
    areaTags: null,
    dueDate: props.dueDate ? ${N}(props.dueDate) : '',
    activationDate: props.activationDate ? ${N}(props.activationDate) : '',
    creationDate: props.creationDate ? props.creationDate.toISOString() : '',
    isProject: props.pcls === "project",
  };
}`,At=`area => {
  const props = area.properties();
  return {
    id: props.id,
    name: props.name,
    tags: area.tagNames(),
    todos: area.toDos().map(${yt})
  };
}`;var St=[{name:"tags",needs:["tags"],expr:`things.tags().map(${ht})`},{name:"tagsWithHierarchy",needs:["tagsWithHierarchy"],expr:`things.tags().map(${Nt})`},{name:"projects",needs:["projects","lists"],expr:`things.projects().map(${Rt})`},{name:"areas",needs:["areas","lists"],expr:`things.areas().map(${At})`}];async function B(t,...n){let a=new Set(n),i=[`const things = Application('${t}');`,"const result = {};",...St.filter(({needs:s})=>s.some(c=>a.has(c))).map(({name:s,expr:c})=>`result.${s} = ${c};`),"return result;"].join(`
`),r=await W(i,`Get ${n.join(", ")}`);return Object.fromEntries(n.map(s=>[s,s==="lists"?P(r.projects,r.areas):r[s]]))}var y=require("fs"),z=require("os"),w=require("path"),T=require("@raycast/utils");var k={TMTask:["uuid","title","notes","status","trashed","type","start","startDate","deadline","rt1_recurrenceRule","rt1_nextInstanceStartDate","rt1_repeatingTemplate","project","area","index","creationDate","stopDate","userModificationDate","todayIndex"],TMArea:["uuid","title","index"],TMChecklistItem:["uuid","title","status","task","index"],TMTag:["uuid","title","parent"],TMTaskTag:["tasks","tags"],TMAreaTag:["areas","tags"]},J=16,q=12,Q=7,It=15,jt=31,Y=262213760,D=69760;function E(t){if(!t||t===Y||t===D)return null;let n=t>>J,a=t>>q&It,i=t>>Q&jt;return n<=0||a<1||a>12||i<1||i>31?null:`${n.toString().padStart(4,"0")}-${a.toString().padStart(2,"0")}-${i.toString().padStart(2,"0")}`}function G(t,n,a){return t<<J|n<<q|a<<Q}function Lt(t,n){let a=E(t);if(!a)return null;let[i,r,s]=a.split("-").map(Number),c=new Date(i,r-1,s);return c.setDate(c.getDate()+n),G(c.getFullYear(),c.getMonth()+1,c.getDate())}function K(){let t=G(2026,6,11),n=E(t),a="2026-06-11";if(n!==a)throw new Error(`Things date calculation has changed \u2014 dates may be incorrect. Expected "${a}", got "${n}".`)}function Ct(t){if(!t||typeof t!="string")return null;let n=t.match(/<key>ts<\/key>\s*<integer>(-?\d+)<\/integer>/);return n?parseInt(n[1],10):null}function b(t,n,a,i){let r=null;if(t?r=E(t):a&&a!==D&&(r=E(a)),n===Y){let s=Ct(i);if(s!==null&&a){let c=Lt(a,s);return{effectiveDeadline:c!==null?E(c):null,effectiveStartDate:r,dueDateIsRecurring:!0}}return{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!0}}return n?{effectiveDeadline:E(n),effectiveStartDate:r,dueDateIsRecurring:!1}:{effectiveDeadline:null,effectiveStartDate:r,dueDateIsRecurring:!1}}function Pt(){let t=(0,w.join)((0,z.homedir)(),"Library","Group Containers","JLMPQHK86H.com.culturedcode.ThingsMac"),n=new Error("Things database not found. Make sure Things is installed and Raycast has Full Disk Access in System Settings \u2192 Privacy & Security \u2192 Full Disk Access.");if(!(0,y.existsSync)(t))throw n;let a=[],i=(0,y.readdirSync)(t).find(s=>s.startsWith("ThingsData-"));i&&a.push((0,w.join)(t,i,"Things Database.thingsdatabase","main.sqlite")),a.push((0,w.join)(t,"Things Database.thingsSQLite"));let r=a.find(y.existsSync);if(r)return r;throw n}var j;async function wt(){if(j&&(0,y.existsSync)(j))return j;let t=Pt();return K(),await xt(t),j=t,j}async function xt(t){let n=Object.keys(k).map(s=>`'${s}'`).join(", "),a=await(0,T.executeSQL)(t,`SELECT m.name AS table_name, p.name AS column_name
     FROM sqlite_master m
     JOIN pragma_table_info(m.name) p
     WHERE m.type = 'table' AND m.name IN (${n})`),i={};for(let s of a)i[s.table_name]||(i[s.table_name]=new Set),i[s.table_name].add(s.column_name);let r=s=>new Error(`Things updated and changed its internal database schema \u2014 please check for an extension update. ${s}`);for(let[s,c]of Object.entries(k)){if(!i[s])throw r(`Table "${s}" not found.`);let o=c.filter(m=>!i[s].has(m));if(o.length)throw r(`Missing column(s) in "${s}": ${o.join(", ")}.`)}}var M=t=>`CASE ${t} WHEN 2 THEN 'canceled' WHEN 3 THEN 'completed' ELSE 'open' END`,R=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMTaskTag tt JOIN TMTag tg ON tg.uuid = tt.tags WHERE tt.tasks = ${t}.uuid)`,V=t=>`(SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = ${t}.uuid)`;var $t=`
  t.uuid as id,
  t.title as name,
  t.deadline,
  t.startDate,
  NULLIF(t.rt1_nextInstanceStartDate, ${D}) as nextInstanceStartDate,
  t.rt1_recurrenceRule as recurrenceRule,
  (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
  p.title as projectName,
  p.uuid as projectId,
  COALESCE(a.title, pa.title) as areaName,
  COALESCE(a.uuid, pa.uuid) as areaId`,Kt=`${$t},
  t.status,
  COALESCE(t.notes, '') as notes,
  ${R("t")} as tagList`,Ot="COALESCE(p.trashed, 0) = 0",Vt=`t.type = 0 AND t.trashed = 0 AND t.status = 0 AND ${Ot}`;function X(t){let{effectiveDeadline:n,effectiveStartDate:a}=b(t.startDate??0,t.deadline??0,t.nextInstanceStartDate??0,t.recurrenceRule);return{id:t.id,name:t.name,status:t.status,notes:t.notes,tags:t.tags??"",areaTags:null,dueDate:n??"",activationDate:a??"",creationDate:t.creationDate??""}}var Xt=`
    SELECT
      t.uuid as id,
      t.title as name,
      t.deadline,
      t.startDate,
      NULLIF(t.rt1_nextInstanceStartDate, ${D}) as nextInstanceStartDate,
      t.rt1_recurrenceRule as recurrenceRule,
      (t.rt1_recurrenceRule IS NOT NULL OR t.rt1_repeatingTemplate IS NOT NULL) as isRecurring,
      t.type,
      t.status,
      COALESCE(t.notes, '') as notes,
      ${R("t")} as tagList,
      p.uuid as projectId,
      p.title as projectName,
      p.status as projectStatus,
      NULLIF(p.deadline, 0) as projectDeadline,
      NULLIF(p.startDate, 0) as projectStartDate,
      NULLIF(p.rt1_nextInstanceStartDate, ${D}) as projectNextInstanceStartDate,
      p.rt1_recurrenceRule as projectRecurrenceRule,
      COALESCE(p.notes, '') as projectNotes,
      ${R("p")} as projectTagList,
      pa.uuid as projectAreaId,
      pa.title as projectAreaName,
      a.uuid as areaId,
      a.title as areaName,
      (SELECT GROUP_CONCAT(tg.title, ', ') FROM TMAreaTag at2 JOIN TMTag tg ON tg.uuid = at2.tags WHERE at2.areas = COALESCE(a.uuid, pa.uuid)) as areaTagList,
      t.creationDate as creationDateRaw
    FROM TMTask t
    LEFT JOIN TMTask p ON t.project = p.uuid
    LEFT JOIN TMArea pa ON p.area = pa.uuid
    LEFT JOIN TMArea a ON t.area = a.uuid`,kt=`
    EXISTS (
      SELECT 1 FROM TMTask i
      WHERE i.rt1_repeatingTemplate = t.uuid
        AND i.trashed = 0
        AND i.status = 0
    )`,zt=`
  AND NOT (
    t.rt1_repeatingTemplate IS NULL
    AND t.rt1_recurrenceRule IS NOT NULL
    AND ${kt}
  )`;async function Z(...t){let n=await wt(),a=new Set(t),i={};if(a.has("tags")||a.has("tagsWithHierarchy")){let r=await(0,T.executeSQL)(n,"SELECT t.title, p.title as parentTitle FROM TMTag t LEFT JOIN TMTag p ON p.uuid = t.parent ORDER BY t.title COLLATE NOCASE");a.has("tags")&&(i.tags=r.map(s=>s.title)),a.has("tagsWithHierarchy")&&(i.tagsWithHierarchy=r.map(s=>({name:s.title,parent:s.parentTitle??null})))}if(a.has("projects")||a.has("lists")){let[r,s]=await Promise.all([(0,T.executeSQL)(n,`SELECT p.uuid as id, p.title as name,
          ${M("p.status")} as status,
          COALESCE(p.notes, '') as notes,
          ${R("p")} as tags,
          p.deadline, p.startDate,
          NULLIF(p.rt1_nextInstanceStartDate, ${D}) as nextInstanceStartDate,
          p.rt1_recurrenceRule as recurrenceRule,
          a.uuid as areaId, a.title as areaName,
          ${V("a")} as areaTags
        FROM TMTask p
        LEFT JOIN TMArea a ON a.uuid = p.area
        WHERE p.type = 1 AND p.trashed = 0 AND p.status = 0
        ORDER BY p."index" ASC`),(0,T.executeSQL)(n,`SELECT t.uuid as id, t.title as name,
          ${M("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${R("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${D}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.project as projectId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0
        ORDER BY t."index" ASC`)]),c={};for(let o of s)o.projectId&&(c[o.projectId]||(c[o.projectId]=[]),c[o.projectId].push(X(o)));i.projects=r.map(o=>{let{effectiveDeadline:m,effectiveStartDate:h}=b(o.startDate??0,o.deadline??0,o.nextInstanceStartDate??0,o.recurrenceRule);return{id:o.id,name:o.name,status:o.status,notes:o.notes,tags:o.tags??"",dueDate:m??"",activationDate:h??"",area:o.areaId?{id:o.areaId,name:o.areaName??"",tags:o.areaTags??""}:void 0,todos:c[o.id]??[]}})}if(a.has("areas")||a.has("lists")){let[r,s]=await Promise.all([(0,T.executeSQL)(n,`SELECT a.uuid as id, a.title as name,
          ${V("a")} as tags
        FROM TMArea a
        ORDER BY a."index" ASC`),(0,T.executeSQL)(n,`SELECT t.uuid as id, t.title as name,
          ${M("t.status")} as status,
          COALESCE(t.notes, '') as notes,
          ${R("t")} as tags,
          t.deadline, t.startDate,
          NULLIF(t.rt1_nextInstanceStartDate, ${D}) as nextInstanceStartDate,
          t.rt1_recurrenceRule as recurrenceRule,
          datetime(t.creationDate, 'unixepoch') as creationDate,
          t.area as areaId
        FROM TMTask t
        WHERE t.type = 0 AND t.trashed = 0 AND t.status = 0 AND t.project IS NULL AND t.area IS NOT NULL
        ORDER BY t."index" ASC`)]),c={};for(let o of s)o.areaId&&(c[o.areaId]||(c[o.areaId]=[]),c[o.areaId].push(X(o)));i.areas=r.map(o=>({id:o.id,name:o.name,tags:o.tags??"",todos:c[o.id]??[]}))}return a.has("lists")&&(i.lists=P(i.projects,i.areas)),Object.fromEntries(t.map(r=>[r,i[r]]))}var tt=(0,L.getPreferenceValues)();async function nt(...t){return tt.useUnofficialApi?Z(...t):B(tt.thingsAppIdentifier,...t)}async function bt(t){await(0,at.promisify)(et.exec)(`open -g "${t}"`)}function Mt(t){return rt.default.stringify(t,{skipNull:!0,skipEmptyString:!0})}async function ot(t){await bt(`things:///add-project?${Mt(t)}`)}var A=require("@raycast/api");var x=require("react/jsx-runtime");function F({error:t,onRetry:n}){let a=c=>{if(c instanceof l)switch(c.type){case"APP_NOT_FOUND":return{title:"Application Not Found",description:"The Things app is not running or not installed.",solutions:["**Start Things**: Open the Things app and make sure it's running","**Check Installation**: Verify Things is properly installed","**Restart**: Try quitting and restarting both Things and Raycast"],errorType:"Application Not Found"};case"PERMISSION_DENIED":return{title:"Permission Denied",description:"Raycast doesn't have permission to control Things.",solutions:["Open **System Settings** \u2192 **Privacy & Security** \u2192 **Automation**","Find **Raycast** in the list","Make sure **Things** is checked \u2705"],errorType:"Permission Denied"};case"EXECUTION_ERROR":return{title:"Things Communication Error",description:"There was an error communicating with Things.",solutions:["**Restart Things**: Quit and restart the Things app","**Wait and Retry**: If Things was just started, wait a moment and try again"],errorType:"Execution Error"};case"UNKNOWN_ERROR":return{title:"Unknown Error",description:"An unexpected error occurred while trying to communicate with Things.",solutions:["**Restart Both Apps**: Quit and restart both Things and Raycast","**Update**: Make sure both Things and Raycast are up to date"],errorType:"Unknown Error"}}return{title:"Error",description:"An error occurred while loading data from Things.",solutions:["Make sure Things is running","Check that Raycast has automation permissions","Try restarting both applications"],errorType:c.constructor.name}},i=(c,o)=>{let m=o instanceof l?o.originalError:o.message,h=o instanceof l?o.operation:void 0;return`# ${c.title}

${c.description}

## Solutions

${c.solutions.map((g,$)=>`${$+1}. ${g}`).join(`
`)}

## Technical Details

- Error Type: \`${c.errorType}\`${h?`
- Operation: \`${h}\``:""}
- Original Error: \`${m||"N/A"}\``},r=a(t),s=i(r,t);return(0,x.jsx)(A.Detail,{markdown:s,actions:n?(0,x.jsx)(A.ActionPanel,{children:(0,x.jsx)(A.Action,{title:"Try Again",onAction:n})}):void 0})}var st=O(require("dayjs"));var _=t=>(0,st.default)(t).format("YYYY-MM-DD");var u=require("react/jsx-runtime");function it({draftValues:t}){let{data:n,isLoading:a,error:i}=(0,S.useCachedPromise)(()=>nt("tags","areas")),r=n?.tags,s=n?.areas,{handleSubmit:c,itemProps:o,values:m,reset:h,focus:g,setValue:$}=(0,S.useForm)({async onSubmit(p){let I={title:p.title,notes:p.notes,when:p.when==="upcoming"&&p.date?_(p.date):p.when,"area-id":p.areaId,deadline:p.deadline?_(p.deadline):"",...p.tags.length>0&&{tags:p.tags.join(",")},"to-dos":p.toDos};await ot(I),await(0,e.showToast)({style:e.Toast.Style.Success,title:"Added new project",message:p.title}),h({title:"",notes:"",tags:[],when:"",areaId:"",toDos:"",deadline:null}),g("title")},initialValues:{title:t?.title??"",notes:t?.notes??"",tags:t?.tags??[],when:t?.when??null,toDos:t?.toDos??"",deadline:t?.deadline??null},validation:{title:S.FormValidation.Required}});async function ut(){try{if(!m.title){await(0,e.showToast)({style:e.Toast.Style.Failure,title:"The project should have a title"});return}let p=await(0,e.showToast)({style:e.Toast.Style.Animated,title:"Generating to-dos"}),I=await e.AI.ask(`Break down a project into tasks. The tasks should be actionable. Each item should be separated by a new line. Return the tasks in the same language than the projects's title (e.g if the project title is written in French, the tasks should be written in French as well).

For example, for a project named "Vacation in Rome", you could write:
Research hotels in Rome and book one
Book flights
Find the best activities to do in Rome
...

Note that each task doesn't start with a hyphen or a number. This is important.
Here's the project you need to break-down: "${m.title}"
${m.notes.length>0?`For additional context, here are the task's notes: "${m.notes}"`:""}

Tasks:`);await p.hide(),$("toDos",I.trim()),g("toDos")}catch(p){let I=typeof p=="string"?p:p instanceof Error?p.message:String(p);await(0,e.showToast)({style:e.Toast.Style.Failure,title:"Failed to generate to-dos",message:I})}}if(i)return(0,u.jsx)(F,{error:i});let U=new Date;return(0,u.jsxs)(e.Form,{isLoading:a,enableDrafts:!0,actions:(0,u.jsxs)(e.ActionPanel,{children:[(0,u.jsx)(e.Action.SubmitForm,{title:"Add New Project",onSubmit:c,icon:e.Icon.Plus}),e.environment.canAccess(e.AI)&&(0,u.jsx)(e.Action,{title:"Generate To-Dos with AI",icon:e.Icon.BulletPoints,onAction:ut}),(0,u.jsxs)(e.ActionPanel.Section,{children:[(0,u.jsx)(e.Action,{title:"Focus Title",icon:e.Icon.TextInput,onAction:()=>g("title"),shortcut:{modifiers:["cmd"],key:"1"}}),(0,u.jsx)(e.Action,{title:"Focus Notes",icon:e.Icon.TextInput,onAction:()=>g("notes"),shortcut:{modifiers:["cmd"],key:"2"}}),(0,u.jsx)(e.Action,{title:"Focus When",icon:e.Icon.TextInput,onAction:()=>g("when"),shortcut:e.Keyboard.Shortcut.Common.Save}),(0,u.jsx)(e.Action,{title:"Focus List",icon:e.Icon.TextInput,onAction:()=>g("areaId"),shortcut:{modifiers:["cmd","shift"],key:"m"}}),(0,u.jsx)(e.Action,{title:"Focus Tags",icon:e.Icon.TextInput,onAction:()=>g("tags"),shortcut:{modifiers:["cmd","shift"],key:"t"}}),(0,u.jsx)(e.Action,{title:"Focus Checklist",icon:e.Icon.TextInput,onAction:()=>g("toDos"),shortcut:e.Keyboard.Shortcut.Common.Copy}),(0,u.jsx)(e.Action,{title:"Focus Deadline",icon:e.Icon.TextInput,onAction:()=>g("deadline"),shortcut:{modifiers:["cmd","shift"],key:"d"}})]})]}),children:[(0,u.jsx)(e.Form.TextField,{...o.title,title:"Title",placeholder:"New project"}),(0,u.jsx)(e.Form.TextArea,{...o.notes,title:"Notes",placeholder:"Write some notes (Markdown enabled)",enableMarkdown:!0}),(0,u.jsx)(e.Form.Separator,{}),(0,u.jsxs)(e.Form.Dropdown,{...o.when,title:"When",children:[(0,u.jsx)(e.Form.Dropdown.Item,{value:"",title:"No date"}),(0,u.jsx)(e.Form.Dropdown.Item,{value:"today",...f.today}),(0,u.jsx)(e.Form.Dropdown.Item,{value:"evening",...f.evening}),(0,u.jsx)(e.Form.Dropdown.Item,{value:"tomorrow",...f.tomorrow}),(0,u.jsx)(e.Form.Dropdown.Item,{value:"upcoming",...f.upcoming}),(0,u.jsx)(e.Form.Dropdown.Item,{value:"anytime",...f.anytime}),(0,u.jsx)(e.Form.Dropdown.Item,{value:"someday",...f.someday})]}),m.when==="upcoming"&&(0,u.jsx)(e.Form.DatePicker,{...o.date,title:"Start Date",min:U}),s&&s.length>0?(0,u.jsxs)(e.Form.Dropdown,{...o.areaId,title:"Area",children:[(0,u.jsx)(e.Form.Dropdown.Item,{value:"",title:"No area"}),s.map(p=>(0,u.jsx)(e.Form.Dropdown.Item,{value:p.id,title:p.name,icon:{source:e.Icon.Folder,tintColor:e.Color.Green}},p.id))]}):null,r&&r.length>0?(0,u.jsx)(e.Form.TagPicker,{...o.tags,title:"Tags",children:r.map(p=>(0,u.jsx)(e.Form.TagPicker.Item,{value:p,title:p},p))}):null,(0,u.jsx)(e.Form.TextArea,{...o.toDos,title:"To-Dos",placeholder:"To-Dos separated by new lines"}),(0,u.jsx)(e.Form.DatePicker,{...o.deadline,title:"Deadline",type:e.Form.DatePicker.Type.Date,min:U})]})}function ct({draftValues:t}){return(0,u.jsx)(it,{draftValues:t})}0&&(module.exports={AddNewProject});
