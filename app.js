// =====================================================================
// Workshop Job Card – live app (Supabase)
// =====================================================================
const SB_URL="https://johrhczthangldtrakmr.supabase.co";
const SB_KEY="sb_publishable_-UMTRJ6z-L4qY6c7818nJw_z2rGfl-V";
const DEFAULT_FIRM="Ratna Auto"; // shown before login on a device that has never logged in

// ---------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------
const I18N={
 en:{
  title:"Job Card",
  login_h:"Sign in",email:"Email",password:"Password",signin:"Sign in",signing:"Signing in…",bad_login:"Wrong email or password",
  no_dealer:"This login is not linked to any dealer yet. Ask the admin.",logout:"Log out",net_err:"Could not reach the server. Check the internet.",
  nav_home:"Home",nav_jobs:"Active Jobs",nav_rem:"Reminders",nav_hist:"Completed",nav_set:"Settings",nav_rep:"Reports",rp_h:"Reports",p_today:"Today",p_7:"Last 7 days",p_month:"This month",p_last:"Last month",r_opened:"Job cards opened",r_closed:"Job cards closed",r_open_now:"Still open",r_income:"Service income (closed jobs)",r_parts:"Parts",r_labour:"Labour",r_outside:"Outside repair",r_markup:"Extra from markup",r_wty:"Warranty parts (not charged)",r_types:"By type of job",r_mech:"By mechanic (closed jobs)",r_jobs:"Jobs",r_avg:"Avg. time",r_top:"Top parts issued",r_entry:"Entries by staff",r_none:"No data in this period.",r_due:"Service due now",r_daily:"Per day",
  st_open:"Active jobs",st_today:"Completed today",st_due:"Service due",
  who:"Entry by",who_pick:"Please select your name (not the mechanic's name)",who_need:"Please select your name first",free:"Free",n_jobs:n=>n+(n===1?" job":" jobs"),change:"Change",
  search_h:"Find customer / tractor",search_ph:"Phone, engine, chassis, reg. no. or name…",min3:"Type at least 3 letters or numbers",
  not_found:"No customer found.",add_new:"+ Add new customer",new_cust_btn:"+ New customer",
  active_h:"Active job cards",closed_h:"Completed job cards (last 50)",no_jobs:"No job cards.",
  open:"Active",done:"Done",mech:"Mechanic",ago:"ago",parts_n:"part(s)",loading:"Loading…",saving:"Saving…",err:"Something went wrong",
  name:"Name",phone:"Phone",phone2:"Second phone",tractor:"Model",address:"Address",district:"District",engine:"Engine No.",chassis:"Tractor Sl. No.",reg:"Regn. No.",doi:"Date of Inst.",
  hours_run:"Hours run",last_srv:"Last service",next_srv:"Next service",
  cust_rec:"Customer & tractor",open_job:n=>"Open active job "+n,start_new:"▶ Start new job card",
  history:"Service history",back:"‹ Back",home_b:"‹ Home",
  slot_h:"Service",date:"Date",ws:"Job / WS No.",hrs:"Hours",note:"Note",
  date_in:"Date & time in",date_out:"Date & time out",type_job:"Type of job",prf:"Warranty PRF No.",
  problems:"Problems reported",observ:"Observations",action:"Action taken",remarks:"Workshop incharge remarks",entered_by:"Entered by",
  add_parts:"Parts issued (Material Issue Note)",search_prod:"Search part no. or description",prod_ph:"e.g. 2654408 or oil filter",
  qty:"Qty",foc:"Warranty (no charge)",wty:"Warranty",mrp:"MRP",min_mrp:x=>"Rate cannot be below MRP ("+x+")",edit_rate:"Change rate",markup:"Increase",new_rate:"New rate",manual:"+ Item not in list",
  selected:"Selected",rate:"Rate",add_part:"+ Add part",part:"Description",part_no:"Part No.",amount:"Value",
  no_parts:"No parts issued yet.",parts_tot:"Parts",total:"Total",
  labour_h:"Labour",lab_desc:"Work description",outside:"Outside repair",no_labour:"No labour added yet.",
  close_job:"✔ Work done – close job card",print:"🖨 Print",copy:"Copy",
  slip_h:"MSTW JOB CARD",job_no:"Job Card No.",
  mat_note:"INDENT / MATERIAL ISSUE NOTE",billing:"BILLING SUMMARY",work_order:"WORK ORDER",
  mat_stores:"Material from stores",lab_out:"Labour + outside labour",grand:"Total",
  next_date:"Next service due",not_bill:"* This is not a bill. Summary for entry into the billing system.",
  sign_cust:"Customer's signature",sign_ws:"Workshop incharge",
  due_h:"Service due (overdue up to 60 days, or due within 7 days)",
  due_note:"The WhatsApp button opens a pre-written message to the customer.",
  late:d=>d+" days overdue",today:"Today",tomorrow:"Tomorrow",in_days:d=>"in "+d+" days",open_b:"Open",
  none_due:"No service due right now.",upcoming:"Coming up (next 8–30 days)",
  msg:(n,m,slot,late,dt,firm,addr)=>`Namaste ${n} ji, your ${m} tractor ${late?"is overdue for":"is due for"} its ${slot} (${dt}). Please bring it to ${firm}${addr?", "+addr:""}. Thank you!`,
  nc_h:"New customer & tractor",model:"Tractor model",cancel:"Cancel",save:"Save",
  need_np:"Name and phone are required",cust_added:"Customer added",need_eng:"Engine No. is required",bad_phone:"Phone must be 10 digits starting with 9",dup_h:"Already in the system?",dup_phone:"Same phone number",dup_engine:"Same engine number",open_existing:"Open this",save_anyway:"Save as new anyway",
  nj_h:"New job card",hours_req:"Hour meter reading",compl_ph:"e.g. general service, brake noise",
  auto_time:"Date & time in is recorded automatically.",start:"▶ Start",job_started:"Job card started",
  pick_first:"Select a part first",part_added:"Part added",enter_desc:"Enter a description",
  nothing_added:"No parts or labour added",close_q:"Close job card",next_auto:"Next service due (worked out from hours)",
  close_b:"✔ Close",job_closed:"Job card closed",
  copied:"Copied",copy_fail:"Couldn't copy",
  mi_h:"Item not in parts list",mi_desc:"Description (e.g. Engine oil 15W40, 7 L)",add:"Add",
  min:"min",hr:"hr",day:"days",cur:"Rs",
  set_staff:"Staff (mechanics & sales)",set_rates:"Labour rates",role:"Role",mechanic:"Mechanic",sales:"Sales",active:"Active",inactive:"Inactive",
  add_staff:"+ Add staff",add_rate:"+ Add labour rate",name_en:"Name (English)",name_ne:"Name (Nepali)",saved:"Saved",admin_only:"Only the admin can change this.",
  edit:"Edit",admin:"Admin",staff_login:"Staff",
  jt:{PDI:"PDI",DSI:"DSI",FS1:"Free service 100 hrs",FS2:"Free service 300 hrs",FS3:"Free service 600 hrs",FS4:"Free service 1000 hrs",PAID:"Paid service",WTY:"Warranty",OTHERS:"Others"},
  slot:s=>!s?"—":s.startsWith("FS")?`Free service ${s[2]} (${SLOT_H[s]} hrs)`:s.startsWith("PAID")?`Paid service ${s[4]} (${SLOT_H[s]} hrs)`:`${parseInt(s)} hrs service`
 },
 ne:{
  title:"जब कार्ड",
  login_h:"लगइन",email:"इमेल",password:"पासवर्ड",signin:"लगइन गर्नुहोस्",signing:"लगइन हुँदैछ…",bad_login:"इमेल वा पासवर्ड मिलेन",
  no_dealer:"यो लगइन कुनै डिलरसँग जोडिएको छैन। एडमिनलाई सोध्नुहोस्।",logout:"लगआउट",net_err:"सर्भरसँग जोडिन सकिएन। इन्टरनेट जाँच्नुहोस्।",
  nav_home:"होम",nav_jobs:"चालु जब",nav_rem:"रिमाइन्डर",nav_hist:"सम्पन्न जब",nav_set:"सेटिङ",nav_rep:"रिपोर्ट",rp_h:"रिपोर्ट",p_today:"आज",p_7:"पछिल्ला ७ दिन",p_month:"यो महिना",p_last:"गत महिना",r_opened:"खोलिएका जब कार्ड",r_closed:"बन्द भएका जब कार्ड",r_open_now:"अझै चालु",r_income:"सर्भिस आम्दानी (बन्द भएका जब)",r_parts:"पार्ट्स",r_labour:"ज्याला",r_outside:"बाहिरी मर्मत",r_markup:"मार्कअपबाट थप",r_wty:"वारेन्टी पार्ट्स (शुल्क नलागेको)",r_types:"कामको प्रकार अनुसार",r_mech:"मेकानिक अनुसार (बन्द भएका जब)",r_jobs:"जब",r_avg:"औसत समय",r_top:"धेरै दिइएका पार्ट्स",r_entry:"कर्मचारी अनुसार इन्ट्री",r_none:"यो अवधिमा कुनै डाटा छैन।",r_due:"अहिले सर्भिस गर्नुपर्ने",r_daily:"दिन अनुसार",
  st_open:"चालु जब",st_today:"आज सम्पन्न",st_due:"सर्भिस गर्नुपर्ने",
  who:"इन्ट्री गर्ने",who_pick:"कृपया आफ्नो नाम छान्नुहोस् (मेकानिकको होइन)",who_need:"पहिले आफ्नो नाम छान्नुहोस्",free:"खाली",n_jobs:n=>n+" वटा जबमा",change:"बदल्नुहोस्",
  search_h:"ग्राहक / ट्र्याक्टर खोज्नुहोस्",search_ph:"फोन, इन्जिन, चेसिस, दर्ता नं. वा नाम…",min3:"कम्तीमा ३ अक्षर वा अंक लेख्नुहोस्",
  not_found:"कुनै ग्राहक भेटिएन।",add_new:"+ नयाँ ग्राहक थप्नुहोस्",new_cust_btn:"+ नयाँ ग्राहक",
  active_h:"चालु जब कार्डहरू",closed_h:"सम्पन्न जब कार्डहरू (पछिल्ला ५०)",no_jobs:"कुनै जब कार्ड छैन।",
  open:"चालु",done:"सम्पन्न",mech:"मेकानिक",ago:"अघि",parts_n:"वटा पार्ट",loading:"लोड हुँदैछ…",saving:"सेभ हुँदैछ…",err:"केही गडबड भयो",
  name:"नाम",phone:"फोन",phone2:"अर्को फोन",tractor:"मोडेल",address:"ठेगाना",district:"जिल्ला",engine:"इन्जिन नं.",chassis:"ट्र्याक्टर क्र.सं. (चेसिस)",reg:"दर्ता नं.",doi:"जडान मिति",
  hours_run:"चलेको घण्टा",last_srv:"पछिल्लो सर्भिस",next_srv:"अर्को सर्भिस",
  cust_rec:"ग्राहक र ट्र्याक्टर",open_job:n=>"चालु जब "+n+" खोल्नुहोस्",start_new:"▶ नयाँ जब कार्ड सुरु गर्नुहोस्",
  history:"सर्भिसको इतिहास",back:"‹ फिर्ता",home_b:"‹ होम",
  slot_h:"सर्भिस",date:"मिति",ws:"जब / WS नं.",hrs:"घण्टा",note:"टिप्पणी",
  date_in:"आएको मिति र समय",date_out:"गएको मिति र समय",type_job:"कामको प्रकार",prf:"वारेन्टी PRF नं.",
  problems:"भनिएका समस्या",observ:"जाँचमा देखिएको",action:"गरिएको काम",remarks:"वर्कसप इन्चार्जको टिप्पणी",entered_by:"इन्ट्री गर्ने",
  add_parts:"दिइएका पार्ट्स (सामान निकासा)",search_prod:"पार्ट नं. वा विवरण खोज्नुहोस्",prod_ph:"जस्तै: 2654408 वा oil filter",
  qty:"संख्या",foc:"वारेन्टी (शुल्क नलाग्ने)",wty:"वारेन्टी",mrp:"MRP",min_mrp:x=>"दर MRP ("+x+") भन्दा कम हुन सक्दैन",edit_rate:"दर बदल्नुहोस्",markup:"बढाउनुहोस्",new_rate:"नयाँ दर",manual:"+ सूचीमा नभएको सामान",
  selected:"छानिएको",rate:"दर",add_part:"+ पार्ट थप्नुहोस्",part:"विवरण",part_no:"पार्ट नं.",amount:"रकम",
  no_parts:"अहिलेसम्म कुनै पार्ट दिइएको छैन।",parts_tot:"पार्ट्स",total:"जम्मा",
  labour_h:"ज्याला",lab_desc:"कामको विवरण",outside:"बाहिरी मर्मत",no_labour:"अहिलेसम्म ज्याला थपिएको छैन।",
  close_job:"✔ काम सकियो – जब कार्ड बन्द गर्नुहोस्",print:"🖨 प्रिन्ट",copy:"कपी गर्नुहोस्",
  slip_h:"MSTW जब कार्ड",job_no:"जब कार्ड नं.",
  mat_note:"सामान माग / निकासा विवरण",billing:"बिलिङ सारांश",work_order:"कार्य आदेश",
  mat_stores:"स्टोरबाट सामान",lab_out:"ज्याला + बाहिरी ज्याला",grand:"कुल रकम",
  next_date:"अर्को सर्भिसको मिति",not_bill:"* यो बिल होइन। बिलिङ सफ्टवेयरमा चढाउनका लागि सारांश मात्र हो।",
  sign_cust:"ग्राहकको हस्ताक्षर",sign_ws:"वर्कसप इन्चार्ज",
  due_h:"सर्भिस गर्नुपर्ने (६० दिनसम्म नाघेका वा ७ दिनभित्र)",
  due_note:"WhatsApp बटन थिच्दा ग्राहकलाई पठाउने सन्देश पहिल्यै लेखिएर खुल्छ।",
  late:d=>d+" दिन नाघ्यो",today:"आज",tomorrow:"भोलि",in_days:d=>d+" दिनपछि",open_b:"हेर्नुहोस्",
  none_due:"अहिले कसैको सर्भिस गर्नुपर्ने छैन।",upcoming:"आउँदै गरेका (८–३० दिनभित्र)",
  msg:(n,m,slot,late,dt,firm,addr)=>`नमस्ते ${n} ज्यू, तपाईंको ${m} ट्र्याक्टरको ${slot} गर्ने समय ${late?"नाघिसकेको छ":"भएको छ"} (${dt})। कृपया आफ्नो ट्र्याक्टर लिएर ${firm}${addr?", "+addr:""} मा आउनुहोला। धन्यवाद!`,
  nc_h:"नयाँ ग्राहक र ट्र्याक्टर",model:"ट्र्याक्टरको मोडेल",cancel:"रद्द गर्नुहोस्",save:"सेभ गर्नुहोस्",
  need_np:"नाम र फोन नम्बर अनिवार्य छ",cust_added:"ग्राहक थपियो",need_eng:"इन्जिन नं. अनिवार्य छ",bad_phone:"फोन नम्बर ९ बाट सुरु हुने १० अंकको हुनुपर्छ",dup_h:"पहिले नै प्रणालीमा छ?",dup_phone:"उही फोन नम्बर",dup_engine:"उही इन्जिन नम्बर",open_existing:"यो खोल्नुहोस्",save_anyway:"तैपनि नयाँ सेभ गर्नुहोस्",
  nj_h:"नयाँ जब कार्ड",hours_req:"आवर मिटर रिडिङ",compl_ph:"जस्तै: जनरल सर्भिस, ब्रेकबाट आवाज आउने",
  auto_time:"आएको मिति र समय आफैँ दर्ता हुन्छ।",start:"▶ सुरु गर्नुहोस्",job_started:"जब कार्ड सुरु भयो",
  pick_first:"पहिले पार्ट छान्नुहोस्",part_added:"पार्ट थपियो",enter_desc:"विवरण लेख्नुहोस्",
  nothing_added:"कुनै पार्ट वा ज्याला थपिएको छैन",close_q:"जब कार्ड बन्द गर्नुहोस्",next_auto:"अर्को सर्भिसको मिति (घण्टाको आधारमा)",
  close_b:"✔ बन्द गर्नुहोस्",job_closed:"जब कार्ड बन्द भयो",
  copied:"कपी भयो",copy_fail:"कपी गर्न सकिएन",
  mi_h:"सूचीमा नभएको सामान",mi_desc:"विवरण (जस्तै: इन्जिन आयल 15W40, 7 लिटर)",add:"थप्नुहोस्",
  min:"मिनेट",hr:"घण्टा",day:"दिन",cur:"रु",
  set_staff:"कर्मचारी (मेकानिक र सेल्स)",set_rates:"ज्यालाका दर",role:"भूमिका",mechanic:"मेकानिक",sales:"सेल्स",active:"सक्रिय",inactive:"निष्क्रिय",
  add_staff:"+ कर्मचारी थप्नुहोस्",add_rate:"+ ज्याला दर थप्नुहोस्",name_en:"नाम (अंग्रेजी)",name_ne:"नाम (नेपाली)",saved:"सेभ भयो",admin_only:"यो एडमिनले मात्र बदल्न सक्छ।",
  edit:"बदल्नुहोस्",admin:"एडमिन",staff_login:"स्टाफ",
  jt:{PDI:"PDI",DSI:"DSI",FS1:"निःशुल्क सर्भिस 100 घण्टा",FS2:"निःशुल्क सर्भिस 300 घण्टा",FS3:"निःशुल्क सर्भिस 600 घण्टा",FS4:"निःशुल्क सर्भिस 1000 घण्टा",PAID:"सशुल्क सर्भिस",WTY:"वारेन्टी",OTHERS:"अन्य"},
  slot:s=>!s?"—":s.startsWith("FS")?`निःशुल्क सर्भिस ${s[2]} (${SLOT_H[s]} घण्टा)`:s.startsWith("PAID")?`सशुल्क सर्भिस ${s[4]} (${SLOT_H[s]} घण्टा)`:`${parseInt(s)} घण्टाको सर्भिस`
 }
};
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}};
let LANG=ls.get("jobcard_lang")||"en";
const t=k=>I18N[LANG][k];

// ---------------------------------------------------------------------
// Service schedule
// ---------------------------------------------------------------------
const SLOTS=[["FS1",100],["FS2",300],["FS3",600],["FS4",1000],["PAID1",1300],["PAID2",1600],["PAID3",1900],["PAID4",2200]];
for(let h=2500;h<=30000;h+=300)SLOTS.push([h+"HRS",h]);
const SLOT_H=Object.fromEntries(SLOTS);
const nextSlot=h=>SLOTS.find(s=>s[1]>h)||SLOTS[SLOTS.length-1];
const JOB_TYPES=["PDI","DSI","FS1","FS2","FS3","FS4","PAID","WTY","OTHERS"];
const MODELS=["MF 7250 DI","MF 7250 Power Up","MF 7250 NS","MF 7250 PS","MF 1035 DI","MF 8055 MagnaTrak","MF 9000 DI","MF 241 DI","MF 9500","MF 4250 DI"];
const DAY=86400000;

// Next service: slot after the hours just done; date from average running per day (3 months if unknown)
function planNext(tr,hoursNow,slotDoneHours){
  const base=Math.max(hoursNow||0,slotDoneHours||0,tr.last_service_hours||0);
  const ns=nextSlot(base);
  let days=90;
  if(hoursNow&&tr.date_of_installation){const age=(Date.now()-pd(tr.date_of_installation))/DAY;if(age>20){const r=hoursNow/age;if(r>0.2)days=Math.round((ns[1]-base)/r)}}
  days=Math.min(Math.max(days,30),365);
  return {slot:ns[0],hours:ns[1],due:ymd(new Date(Date.now()+days*DAY))};
}

// ---------------------------------------------------------------------
// Supabase (Auth + REST) without any library
// ---------------------------------------------------------------------
let SESS=null;try{SESS=JSON.parse(ls.get("jobcard_session"))}catch(e){}
function saveSess(s){SESS=s?{access_token:s.access_token,refresh_token:s.refresh_token,expires_at:s.expires_at||Math.floor(Date.now()/1000)+(s.expires_in||3600),email:(s.user&&s.user.email)||(SESS&&SESS.email)}:null;ls.set("jobcard_session",SESS?JSON.stringify(SESS):null)}
async function authCall(grant,body){
  const r=await fetch(`${SB_URL}/auth/v1/token?grant_type=${grant}`,{method:"POST",headers:{apikey:SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(body)});
  const j=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(j.error_description||j.msg||j.message||"auth"),{auth:true});return j;
}
let refreshing=null;
async function refreshSess(){
  if(!SESS)throw new Error("no session");
  refreshing=refreshing||authCall("refresh_token",{refresh_token:SESS.refresh_token}).then(saveSess).finally(()=>refreshing=null);
  return refreshing;
}
async function api(path,{method="GET",body,prefer}={},retry=true){
  if(!SESS)throw new Error("no session");
  if(SESS.expires_at-Date.now()/1000<60){try{await refreshSess()}catch(e){if(e.auth){logout();throw e}}}
  const h={apikey:SB_KEY,Authorization:"Bearer "+SESS.access_token,"Content-Type":"application/json"};if(prefer)h.Prefer=prefer;
  let r;
  try{r=await fetch(`${SB_URL}/rest/v1/${path}`,{method,headers:h,body:body!==undefined?JSON.stringify(body):undefined})}
  catch(e){throw new Error(t("net_err"))}
  if(r.status===401&&retry){try{await refreshSess()}catch(e){logout();throw e}return api(path,{method,body,prefer},false)}
  if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.message||("HTTP "+r.status))}
  if(r.status===204)return null;const txt=await r.text();return txt?JSON.parse(txt):null;
}
const get=p=>api(p);
const post=(p,b)=>api(p,{method:"POST",body:b,prefer:"return=representation"});
const patch=(p,b)=>api(p,{method:"PATCH",body:b,prefer:"return=representation"});
const del=p=>api(p,{method:"DELETE"});
const rpc=(fn,b={})=>api("rpc/"+fn,{method:"POST",body:b});
const enc=encodeURIComponent;
const clean=q=>q.replace(/[^\p{L}\p{N} .\-\/]/gu,"").trim();

async function logout(){
  try{if(SESS)fetch(`${SB_URL}/auth/v1/logout`,{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SESS.access_token}})}catch(e){}
  saveSess(null);CTX=null;showLogin();
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const rs=n=>t("cur")+" "+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2});
const pd=d=>typeof d==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(d)?new Date(+d.slice(0,4),+d.slice(5,7)-1,+d.slice(8,10)):new Date(d);
const fDate=d=>d?pd(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"—";
const fTime=d=>new Date(d).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
const fDT=d=>d?fDate(d)+", "+fTime(d):"—";
function ymd(d){const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`}
const daysTo=d=>Math.round((pd(d).setHours(0,0,0,0)-new Date().setHours(0,0,0,0))/DAY);
function ago(d){const m=Math.max(0,Math.round((Date.now()-new Date(d))/60000));if(m<60)return m+" "+t("min");const h=Math.floor(m/60);if(h<24)return h+" "+t("hr")+" "+(m%60)+" "+t("min");return Math.floor(h/24)+" "+t("day")}
function toast(x){const el=document.createElement("div");el.className="toast";el.textContent=x;document.body.appendChild(el);setTimeout(()=>el.remove(),2600)}
function closeModal(){$("#modal").innerHTML=""}
function modal(html){$("#modal").innerHTML=`<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal">${html}</div></div>`}
const partsTotal=ps=>ps.reduce((a,p)=>a+(p.is_foc?0:Number(p.qty)*Number(p.rate)),0);
const labTotal=ls_=>ls_.reduce((a,l)=>a+Number(l.amount||0),0);
const rateName=r=>LANG==="ne"&&r.name_ne?r.name_ne:r.name_en;
function busy(btn,on){if(!btn)return;btn.disabled=on;if(on){btn.dataset.l=btn.textContent;btn.textContent=t("saving")}else if(btn.dataset.l)btn.textContent=btn.dataset.l}
async function guard(fn,btn){busy(btn,true);try{return await fn()}catch(e){console.error(e);toast(t("err")+": "+e.message)}finally{busy(btn,false)}}

// ---------------------------------------------------------------------
// Context: role, dealer, staff, labour rates, who is working
// ---------------------------------------------------------------------
let CTX=null;
const WHO=()=>ls.get("jobcard_who");
async function loadCtx(){
  const [role,dealers,staff,rates]=await Promise.all([rpc("my_role"),get("dealers?select=id,name,address,phone"),get("mechanics?select=*&order=name"),get("labour_rates?select=*&order=id")]);
  if(!role||!dealers.length)throw Object.assign(new Error(t("no_dealer")),{nodealer:true});
  CTX={role,dealer:dealers[0],staff,rates};ls.set("jobcard_dealer",JSON.stringify({name:CTX.dealer.name,address:CTX.dealer.address||""}));
}
const isAdmin=()=>CTX&&CTX.role==="owner";
const mechanics=()=>CTX.staff.filter(s=>s.active&&s.role==="mechanic");

function pickWho(after){
  const act=CTX.staff.filter(s=>s.active),sales=act.filter(s=>s.role==="sales");const list=sales.length?sales:act;
  modal(`<h2>${t("who_pick")}</h2><div class="chips">${list.map(s=>`<button class="chip ${WHO()===s.name?"on":""}" data-n="${esc(s.name)}" onclick="setWho(this.dataset.n)">${esc(s.name)}</button>`).join("")}</div>
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button></div>`);
  window._afterWho=after;
}
function setWho(n){ls.set("jobcard_who",n);closeModal();chrome();if(window._afterWho){const f=window._afterWho;window._afterWho=null;f()}else render()}
function needWho(fn){if(WHO())return fn();toast(t("who_need"));pickWho(fn)}

// ---------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------
let view="home",param=null,searchQ="",rtok=0;
function go(v,p){view=v;param=p??null;render();window.scrollTo(0,0)}
function chrome(){
  document.documentElement.lang=LANG;
  let saved=null;try{saved=JSON.parse(ls.get("jobcard_dealer"))}catch(e){}
  const D=CTX?CTX.dealer:(saved||{name:DEFAULT_FIRM,address:""});
  document.title=D.name+" – "+t("title");
  $("#h-title").textContent=D.name+" – "+t("title");
  $("#h-sub").textContent=D.address||"";
  document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("on",b.dataset.l===LANG));
  const nav=$("#nav");
  if(!CTX){nav.style.display="none";$("#bar").style.display="none";return}
  nav.style.display="flex";$("#bar").style.display="flex";
  const items=[["home","nav_home"],["jobs","nav_jobs"],["reminders","nav_rem"],["history","nav_hist"]];if(isAdmin())items.push(["reports","nav_rep"],["settings","nav_set"]);
  nav.innerHTML=items.map(([v,k])=>`<button class="${v===view?"on":""}" onclick="go('${v}')">${t(k)}</button>`).join("");
  $("#bar").innerHTML=`<span>👤 ${t("who")}: <b>${esc(WHO()||"—")}</b> <button class="btn ghost sm" onclick="pickWho()">${t("change")}</button></span>
    <span class="mut">${esc(SESS&&SESS.email||"")} · ${isAdmin()?t("admin"):t("staff_login")} · <a href="#" onclick="logout();return false">${t("logout")}</a></span>`;
}
async function render(){
  chrome();
  if(!CTX)return;
  const my=++rtok;const app=$("#app");
  const V={home:vHome,jobs:vJobs,job:vJob,slip:vSlip,reminders:vReminders,history:vHistory,customer:vCustomer,settings:vSettings,reports:vReports};
  app.innerHTML=`<div class="empty">${t("loading")}</div>`;
  try{const html=await V[view](param);if(my!==rtok)return;app.innerHTML=html;after()}
  catch(e){if(my!==rtok)return;console.error(e);app.innerHTML=`<div class="card empty">${t("err")}: ${esc(e.message)}<br><br><button class="btn" onclick="render()">↻</button></div>`}
}
function after(){
  if(view==="home"){const i=$("#q");if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);if(searchQ)doSearch()}}
}

// ---------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------
function showLogin(msg){
  chrome();
  $("#app").innerHTML=`<div class="card" style="max-width:380px;margin:30px auto">
    <h2 style="margin-bottom:2px">${esc($("#h-title").textContent)}</h2><p class="mut" style="margin:0 0 8px">${t("login_h")}</p>
    <form onsubmit="doLogin(event)">
      <label>${t("email")}</label><input id="li-e" type="email" autocomplete="username" value="${esc(ls.get("jobcard_last_email")||"")}" required>
      <label>${t("password")}</label><input id="li-p" type="password" autocomplete="current-password" required>
      <p id="li-msg" style="color:var(--red);min-height:1em">${esc(msg||"")}</p>
      <button class="btn block" id="li-b">${t("signin")}</button>
    </form></div>`;
  ($("#li-e").value?$("#li-p"):$("#li-e")).focus();
}
async function doLogin(e){
  e.preventDefault();const b=$("#li-b");b.disabled=true;b.textContent=t("signing");
  const email=$("#li-e").value.trim();ls.set("jobcard_last_email",email);
  try{
    saveSess(await authCall("password",{email,password:$("#li-p").value}));
    await loadCtx();view="home";render();
  }catch(err){
    const m=err.auth?t("bad_login"):err.nodealer?t("no_dealer"):err.message;if(err.nodealer)saveSess(null);
    showLogin(m);
  }
}

// ---------------------------------------------------------------------
// Home + search
// ---------------------------------------------------------------------
async function openJobs(){
  const jobs=await get("job_cards?select=id,job_no,job_type,date_in,status,mechanic_id,customers(name),tractors(model),mechanics(name)&status=eq.open&order=date_in.desc");
  return withTotals(jobs);
}
async function withTotals(jobs){
  if(!jobs.length)return jobs;
  const tot=await get(`job_card_totals?job_card_id=in.(${jobs.map(j=>j.id).join(",")})`);
  const m=Object.fromEntries(tot.map(x=>[x.job_card_id,x]));
  const cnt=await get(`job_card_parts?select=job_card_id&job_card_id=in.(${jobs.map(j=>j.id).join(",")})`);
  jobs.forEach(j=>{const x=m[j.id]||{};j.total=Number(x.parts_total||0)+Number(x.labour_total||0)+Number(x.outside_total||0);j.nparts=cnt.filter(c=>c.job_card_id===j.id).length});
  return jobs;
}
function jobRows(list){
  if(!list.length)return `<div class="empty">${t("no_jobs")}</div>`;
  return list.map(j=>`
    <div class="list-item clickable" onclick="go('${j.status==="open"?"job":"slip"}',${j.id})">
      <div><b>${esc(j.job_no)}</b> · ${esc(j.customers&&j.customers.name)} <span class="tag ${j.status}">${j.status==="open"?t("open"):t("done")}</span> <span class="tag type">${t("jt")[j.job_type]}</span>
        <div class="mut">${esc(j.tractors&&j.tractors.model)} · ${t("mech")}: ${esc(j.mechanics?j.mechanics.name:"—")} · ${j.status==="open"?ago(j.date_in)+" "+t("ago"):fDate(j.date_out)}</div></div>
      <div style="text-align:right"><b>${rs(j.total)}</b><div class="mut">${j.nparts||0} ${t("parts_n")}</div></div>
    </div>`).join("");
}
async function vHome(){
  const today0=new Date();today0.setHours(0,0,0,0);
  const [jobs,closedToday,due]=await Promise.all([openJobs(),get(`job_cards?select=id&status=eq.closed&date_out=gte.${enc(today0.toISOString())}`),get("service_due?select=tractor_id")]);
  return `
  <div class="stats">
    <div class="stat" onclick="go('jobs')"><b>${jobs.length}</b><span>${t("st_open")}</span></div>
    <div class="stat" onclick="go('history')"><b>${closedToday.length}</b><span>${t("st_today")}</span></div>
    <div class="stat" onclick="go('reminders')"><b>${due.length}</b><span>${t("st_due")}</span></div>
  </div>
  <div class="card">
    <h2>${t("search_h")}</h2>
    <input id="q" placeholder="${t("search_ph")}" value="${esc(searchQ)}" oninput="searchQ=this.value;clearTimeout(window._st);window._st=setTimeout(doSearch,350)">
    <div id="sres" style="margin-top:6px"></div>
    <button class="btn ghost block" style="margin-top:8px" onclick="newCustomer()">${t("new_cust_btn")}</button>
  </div>
  <div class="card"><h2>${t("active_h")}</h2>${jobRows(jobs)}</div>`;
}
let stok=0;
async function doSearch(){
  const box=$("#sres");if(!box)return;
  const q=clean(searchQ);
  if(q.length<3){box.innerHTML=q?`<p class="mut">${t("min3")}</p>`:"";return}
  const my=++stok;box.innerHTML=`<p class="mut">${t("loading")}</p>`;
  try{
    const like=enc(`*${q}*`);
    const cs=await get(`customers?select=id&or=(phone.ilike.${like},phone_alt.ilike.${like},name.ilike.${like})&limit=60`);
    const ids=cs.map(c=>c.id);
    const orq=[`engine_no.ilike.${like}`,`chassis_no.ilike.${like}`,`reg_no.ilike.${like}`];if(ids.length)orq.push(`customer_id.in.(${ids.join(",")})`);
    const trs=await get(`tractors?select=id,model,engine_no,chassis_no,reg_no,next_service_due,customers(name,phone)&or=(${orq.join(",")})&limit=25`);
    if(my!==stok)return;
    box.innerHTML=trs.length?trs.map(tr=>`
      <div class="list-item clickable" onclick="go('customer',${tr.id})">
        <div><b>${esc(tr.customers.name)}</b> · ${esc(tr.model)}<div class="mut">📞 ${esc(tr.customers.phone||"—")} · ${t("engine")} ${esc(tr.engine_no||"—")} · ${t("chassis")} ${esc(tr.chassis_no||"—")}${tr.reg_no?" · "+t("reg")+" "+esc(tr.reg_no):""}</div></div><span>›</span>
      </div>`).join(""):`<div class="empty">${t("not_found")}<br><br><button class="btn" onclick="newCustomer()">${t("add_new")}</button></div>`;
  }catch(e){if(my===stok)box.innerHTML=`<p class="mut">${t("err")}: ${esc(e.message)}</p>`}
}
async function vJobs(){return `<div class="card"><h2>${t("active_h")}</h2>${jobRows(await openJobs())}</div>`}
async function vHistory(){
  const jobs=await withTotals(await get("job_cards?select=id,job_no,job_type,date_in,date_out,status,customers(name),tractors(model),mechanics(name)&status=eq.closed&order=date_out.desc&limit=50"));
  return `<div class="card"><h2>${t("closed_h")}</h2>${jobRows(jobs)}</div>`;
}

// ---------------------------------------------------------------------
// Customer / tractor
// ---------------------------------------------------------------------
function custBlock(c,tr,extra=""){return `
  <div class="grid2">
    <div><span class="mut">${t("name")}</span><br><b>${esc(c.name)}</b></div>
    <div><span class="mut">${t("phone")}</span><br>${esc(c.phone||"—")}${c.phone_alt?"<br>"+esc(c.phone_alt):""}</div>
    <div><span class="mut">${t("address")}</span><br>${esc(c.address||"—")}${c.district?", "+esc(c.district):""}</div>
    <div><span class="mut">${t("tractor")}</span><br><b>${esc(tr.model)}</b></div>
    <div><span class="mut">${t("chassis")}</span><br>${esc(tr.chassis_no||"—")}</div>
    <div><span class="mut">${t("engine")}</span><br>${esc(tr.engine_no||"—")}</div>
    <div><span class="mut">${t("reg")}</span><br>${esc(tr.reg_no||"—")}</div>
    <div><span class="mut">${t("doi")}</span><br>${fDate(tr.date_of_installation)}</div>
    ${extra}
  </div>`}
async function vCustomer(id){
  const [[tr],hist,open]=await Promise.all([get(`tractors?select=*,customers(*)&id=eq.${id}`),get(`service_history?select=*&tractor_id=eq.${id}&order=service_date.desc.nullslast,id.desc`),get(`job_cards?select=id,job_no&tractor_id=eq.${id}&status=eq.open`)]);
  const c=tr.customers,d=tr.next_service_due?daysTo(tr.next_service_due):null;
  return `<button class="back" onclick="go('home')">${t("back")}</button>
  <div class="card"><h2>${t("cust_rec")}</h2>${custBlock(c,tr,`
    <div><span class="mut">${t("last_srv")}</span><br>${tr.last_service_date?fDate(tr.last_service_date)+(tr.last_service_hours?" · "+tr.last_service_hours+" "+t("hrs"):""):"—"}</div>
    <div><span class="mut">${t("next_srv")}</span><br><b>${t("slot")(tr.next_service_slot)}</b><br>${fDate(tr.next_service_due)} ${d!=null&&d<0?`<span class="tag due">${t("late")(-d)}</span>`:""}</div>`)}
    <div style="margin-top:12px">${open.length?`<button class="btn block" onclick="go('job',${open[0].id})">${t("open_job")(open[0].job_no)}</button>`
      :`<button class="btn block" onclick="startJob(${tr.id})">${t("start_new")}</button>`}</div>
  </div>
  <div class="card"><h2>${t("history")}</h2>
    ${hist.length?`<table><tr><th>${t("slot_h")}</th><th>${t("date")}</th><th>${t("ws")}</th><th class="num">${t("hrs")}</th></tr>
      ${hist.map(h=>h.kind==="note"?`<tr><td colspan="4" class="mut">${t("note")}: ${esc(h.raw_text)}</td></tr>`
        :`<tr><td>${t("slot")(h.slot)}</td><td>${fDate(h.service_date)}</td><td>${esc(h.ws_no||"—")}</td><td class="num">${h.hours||"—"}</td></tr>`).join("")}</table>`:`<div class="empty">—</div>`}
  </div>`;
}
function newCustomer(){
  const q=clean(searchQ);
  modal(`<h2>${t("nc_h")}</h2>
    <label>${t("name")} *</label><input id="nc-name">
    <div class="row"><div><label>${t("phone")} *</label><input id="nc-phone" inputmode="tel" maxlength="10" value="${/^\d+$/.test(q)?esc(q):""}"></div><div><label>${t("phone2")}</label><input id="nc-phone2" inputmode="tel" maxlength="10"></div></div>
    <div class="row"><div><label>${t("address")}</label><input id="nc-addr"></div><div><label>${t("district")}</label><input id="nc-dist"></div></div>
    <label>${t("model")}</label><select id="nc-model">${MODELS.map(m=>`<option>${m}</option>`).join("")}</select>
    <div class="row"><div><label>${t("engine")} *</label><input id="nc-eng" style="text-transform:uppercase"></div><div><label>${t("chassis")}</label><input id="nc-ch"></div></div>
    <div class="row"><div><label>${t("reg")}</label><input id="nc-reg"></div><div><label>${t("doi")}</label><input id="nc-doi" type="date" value="${ymd(new Date())}"></div></div>
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" id="nc-b" onclick="saveCustomer(this)">${t("save")}</button></div>`);
  $("#nc-name").focus();
}
const okPhone=p=>/^9\d{9}$/.test(p);
const digits=p=>p.replace(/\D/g,"");
let NC=null; // form values kept while the duplicate warning is open
function saveCustomer(btn){
  const v=k=>$("#nc-"+k).value.trim();
  const f={name:v("name"),phone:digits(v("phone")),phone2:digits(v("phone2")),addr:v("addr"),dist:v("dist"),model:v("model"),eng:v("eng").toUpperCase(),ch:v("ch").toUpperCase(),reg:v("reg"),doi:v("doi")};
  if(!f.name||!f.phone){toast(t("need_np"));return}
  if(!okPhone(f.phone)||(f.phone2&&!okPhone(f.phone2))){toast(t("bad_phone"));return}
  if(!f.eng){toast(t("need_eng"));$("#nc-eng").focus();return}
  guard(async()=>{
    const ph=[f.phone,f.phone2].filter(Boolean);
    const [byPhone,byEng]=await Promise.all([
      get(`customers?select=id,name,phone,tractors(id,model,engine_no)&or=(${ph.map(p=>`phone.eq.${p},phone_alt.eq.${p}`).join(",")})&limit=10`),
      get(`tractors?select=id,model,engine_no,customers(name,phone)&engine_no=ilike.${enc(f.eng)}&limit=10`)]);
    if(byPhone.length||byEng.length){NC=f;return dupWarn(byPhone,byEng)}
    await createCustomer(f);
  },btn);
}
function dupWarn(byPhone,byEng){
  const rows=[...byEng.map(x=>({tid:x.id,name:x.customers.name,phone:x.customers.phone,model:x.model,eng:x.engine_no,why:t("dup_engine")})),
    ...byPhone.flatMap(c=>(c.tractors.length?c.tractors:[{}]).map(x=>({tid:x.id,name:c.name,phone:c.phone,model:x.model||"",eng:x.engine_no||"",why:t("dup_phone")})))];
  const seen=new Set();
  modal(`<h2>⚠️ ${t("dup_h")}</h2>
    ${rows.filter(r=>{const k=r.tid+r.why;if(seen.has(k))return false;seen.add(k);return true}).map(r=>`<div class="list-item"><div><span class="tag due">${r.why}</span><br><b>${esc(r.name)}</b> · ${esc(r.model)}<div class="mut">📞 ${esc(r.phone||"—")} · ${t("engine")} ${esc(r.eng||"—")}</div></div>
      ${r.tid?`<button class="btn ghost sm" onclick="closeModal();searchQ='';go('customer',${r.tid})">${t("open_existing")}</button>`:""}</div>`).join("")}
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" onclick="guard(()=>createCustomer(NC),this)">${t("save_anyway")}</button></div>`);
}
async function createCustomer(f){
  const [c]=await post("customers",{name:f.name,phone:f.phone,phone_alt:f.phone2||null,address:f.addr||null,district:f.dist||null});
  const doi=f.doi||ymd(new Date());
  const [tr]=await post("tractors",{customer_id:c.id,model:f.model,engine_no:f.eng,chassis_no:f.ch||null,reg_no:f.reg||null,date_of_installation:doi,next_service_slot:"FS1",next_service_hours:100,next_service_due:ymd(new Date(pd(doi).getTime()+35*DAY))});
  closeModal();searchQ="";NC=null;toast(t("cust_added"));go("customer",tr.id);
}

// ---------------------------------------------------------------------
// Job card
// ---------------------------------------------------------------------
let pickedType="PAID";
async function startJob(tid){
  needWho(async()=>{
    const [[tr],openJ]=await Promise.all([get(`tractors?select=*,customers(name)&id=eq.${tid}`),get("job_cards?select=mechanic_id&status=eq.open")]);
    const busyMap={};openJ.forEach(x=>{if(x.mechanic_id)busyMap[x.mechanic_id]=(busyMap[x.mechanic_id]||0)+1});
    pickedType=tr.next_service_slot&&tr.next_service_slot.startsWith("FS")?tr.next_service_slot:"PAID";
    modal(`<h2>${t("nj_h")}</h2>
      <p class="mut">${esc(tr.customers.name)} · ${esc(tr.model)} · ${t("next_srv")}: ${t("slot")(tr.next_service_slot)}</p>
      <label>${t("type_job")}</label>
      <div class="chips" id="jt">${JOB_TYPES.map(k=>`<button class="chip ${k===pickedType?"on":""}" data-k="${k}" onclick="pickType('${k}')">${t("jt")[k]}</button>`).join("")}</div>
      <div id="prfbox" style="display:${pickedType==="WTY"?"block":"none"}"><label>${t("prf")}</label><input id="sj-prf"></div>
      <label>${t("mech")}</label><div class="chips" id="mk">${mechChips(busyMap)}</div><input type="hidden" id="sj-m" value="">
      <div class="row"><div><label>${t("hours_req")}</label><input id="sj-h" type="number" inputmode="numeric" placeholder="${tr.last_service_hours?"> "+tr.last_service_hours:""}"></div></div>
      <label>${t("problems")}</label><textarea id="sj-c" rows="2" placeholder="${t("compl_ph")}"></textarea>
      <p class="mut">${t("auto_time")} · ${t("entered_by")}: <b>${esc(WHO())}</b></p>
      <div class="row"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" onclick="doStartJob(${tid},${tr.customer_id},this)">${t("start")}</button></div>`);
  });
}
function mechChips(busy){
  return mechanics().map(m=>({m,n:busy[m.id]||0})).sort((a,b)=>a.n-b.n||a.m.name.localeCompare(b.m.name))
    .map(({m,n})=>`<button class="chip mech ${n===0?"m0":n===1?"m1":"m2"}" data-id="${m.id}" onclick="pickMech(${m.id})">${esc(m.name)} <small>· ${n===0?t("free"):t("n_jobs")(n)}</small></button>`).join("");
}
function pickMech(id){const cur=$("#sj-m");cur.value=cur.value==String(id)?"":id;document.querySelectorAll("#mk .chip").forEach(b=>b.classList.toggle("on",b.dataset.id===String(cur.value)))}
function pickType(k){pickedType=k;document.querySelectorAll("#jt .chip").forEach(b=>b.classList.toggle("on",b.dataset.k===k));$("#prfbox").style.display=k==="WTY"?"block":"none"}
function doStartJob(tid,cid,btn){
  guard(async()=>{
    const h=parseInt($("#sj-h").value);
    const [j]=await post("job_cards",{tractor_id:tid,customer_id:cid,mechanic_id:$("#sj-m").value?+$("#sj-m").value:null,job_type:pickedType,
      warranty_prf_no:pickedType==="WTY"?($("#sj-prf").value.trim()||null):null,hours_run:isNaN(h)?null:h,problems_reported:$("#sj-c").value.trim()||null,entered_by_name:WHO()});
    closeModal();toast(t("job_started")+" "+j.job_no);go("job",j.id);
  },btn);
}
async function loadJob(id){
  const [[j],parts,lab]=await Promise.all([
    get(`job_cards?select=*,customers(*),tractors(*),mechanics(name)&id=eq.${id}`),
    get(`job_card_parts?select=*&job_card_id=eq.${id}&order=issued_at`),
    get(`job_card_labour?select=*&job_card_id=eq.${id}&order=id`)]);
  return {j,parts,lab};
}
async function vJob(id){
  const {j,parts,lab}=await loadJob(id);
  if(j.status!=="open"){view="slip";return vSlip(id)}
  const c=j.customers,tr=j.tractors;
  return `<button class="back" onclick="go('home')">${t("back")}</button>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h2 style="margin:0">${esc(j.job_no)}</h2><span><span class="tag type">${t("jt")[j.job_type]}</span> <span class="tag open">${t("open")}</span></span></div>
    <p class="mut" style="margin:6px 0 10px">${t("mech")}: <b>${esc(j.mechanics?j.mechanics.name:"—")}</b> · ${t("date_in")}: ${fDT(j.date_in)} (${ago(j.date_in)} ${t("ago")}) · ${t("hours_run")}: <b>${j.hours_run??"—"}</b>${j.warranty_prf_no?` · ${t("prf")}: ${esc(j.warranty_prf_no)}`:""}${j.entered_by_name?` · ${t("entered_by")}: ${esc(j.entered_by_name)}`:""}</p>
    ${custBlock(c,tr)}
    ${j.problems_reported?`<p style="margin-bottom:0"><span class="mut">${t("problems")}:</span> ${esc(j.problems_reported)}</p>`:""}
  </div>
  <div class="card">
    <h2>${t("add_parts")}</h2>
    <div class="dd">
      <label>${t("search_prod")}</label>
      <input id="ps" placeholder="${t("prod_ph")}" autocomplete="off" oninput="clearTimeout(window._pt);window._pt=setTimeout(psSearch,300)" onkeydown="psKey(event)">
      <div id="psl"></div>
    </div>
    <div id="psel" class="mut" style="margin:8px 0"></div>
    <div class="row">
      <div style="flex:0 0 80px"><label>${t("qty")}</label><input id="pq" type="number" min="0.01" step="any" value="1"></div>
      <div><label>${t("rate")} (${t("cur")})</label><input id="pr" type="number" step="any" disabled></div>
    </div>
    <div class="chips" id="mkup" style="margin-top:6px;display:none"><span class="mut" style="align-self:center">${t("markup")}:</span>
      ${[5,10,15,20].map(x=>`<button class="chip" onclick="markup(${x})">+${x}%</button>`).join("")}<button class="chip" onclick="markup(0)">MRP</button></div>
    <div class="row" style="align-items:center;margin-top:8px">
      <label class="chk" style="flex:0 0 auto"><input type="checkbox" id="pfoc" ${j.job_type==="WTY"?"checked":""}> ${t("foc")}</label>
      <button class="btn" onclick="addPart(${j.id},this)">${t("add_part")}</button>
    </div>
    <button class="btn ghost sm" style="margin-top:8px" onclick="manualItem(${j.id})">${t("manual")}</button>
    <table style="margin-top:12px">
      <tr><th>${t("part")}</th><th class="num">${t("qty")}</th><th class="num">${t("rate")}</th><th class="num">${t("amount")}</th><th></th></tr>
      ${parts.length?parts.map(p=>`<tr><td>${esc(p.description)}<div class="mut">${esc(p.part_no||"—")} · ${fTime(p.issued_at)}${p.issued_by_name?" · "+esc(p.issued_by_name):""}${p.is_foc?" · "+t("wty"):""}</div></td><td class="num">${Number(p.qty)}</td><td class="num"><a href="#" onclick="editRate_(${p.id},${p.rate},${p.mrp_at_issue??"null"});return false" title="${t("edit_rate")}">${rs(p.rate)} ✎</a>${p.mrp_at_issue!=null&&Number(p.rate)>Number(p.mrp_at_issue)?`<div class="mut">${t("mrp")} ${rs(p.mrp_at_issue)}</div>`:""}</td><td class="num">${p.is_foc?t("wty"):rs(p.qty*p.rate)}</td><td><button class="btn gray sm" onclick="delRow('job_card_parts',${p.id},this)">✕</button></td></tr>`).join("")
        :`<tr><td colspan="5" class="empty">${t("no_parts")}</td></tr>`}
    </table>
    <div class="total">${t("parts_tot")}: ${rs(partsTotal(parts))}</div>
  </div>
  <div class="card">
    <h2>${t("labour_h")}</h2>
    <div class="chips" style="margin-bottom:8px">
      ${CTX.rates.filter(r=>r.active).map(r=>`<button class="btn ghost sm" onclick="addLabour(${j.id},${r.id},this)">${esc(rateName(r))} ${Number(r.amount)?rs(r.amount):""}</button>`).join("")}
    </div>
    <div class="row">
      <div style="flex:2"><input id="ld" placeholder="${t("lab_desc")}"></div>
      <div><input id="la" type="number" placeholder="${t("amount")}"></div>
      <button class="btn" style="flex:0 0 auto" onclick="addLabour(${j.id},null,this)">+</button>
    </div>
    <label class="chk" style="margin-top:6px"><input type="checkbox" id="lout"> ${t("outside")}</label>
    <table style="margin-top:10px">
      ${lab.length?lab.map(l=>`<tr><td>${esc(l.description)}${l.is_outside?` <span class="tag">${t("outside")}</span>`:""}</td><td class="num">${rs(l.amount)}</td><td style="width:40px"><button class="btn gray sm" onclick="delRow('job_card_labour',${l.id},this)">✕</button></td></tr>`).join("")
        :`<tr><td class="empty">${t("no_labour")}</td></tr>`}
    </table>
    <div class="total">${t("total")}: ${rs(partsTotal(parts)+labTotal(lab))}</div>
  </div>
  <button class="btn ok block" style="padding:14px" onclick="closeJobDlg(${j.id})">${t("close_job")}</button>`;
}

// parts search (server side, over the dealer's own price list)
let selProd=null,hiIdx=0,psMatches=[],ptok=0;
async function psSearch(){
  const q=clean($("#ps").value);selProd=null;$("#psel").innerHTML="";{const pr=$("#pr");pr.value="";pr.disabled=true;$("#mkup").style.display="none"}
  const box=$("#psl");if(q.length<2){box.innerHTML="";psMatches=[];return}
  const my=++ptok;
  try{
    const words=q.split(/\s+/).filter(Boolean);
    const f=words.length===1?`or=(part_no.ilike.${enc(q+"*")},description.ilike.${enc("*"+q+"*")})`
      :`and=(${words.map(w=>`description.ilike.${enc("*"+w+"*")}`).join(",")})`;
    const r=await get(`parts?select=part_no,description,mrp&active=eq.true&${f}&order=part_no&limit=30`);
    if(my!==ptok)return;
    psMatches=r.sort((a,b)=>(b.part_no.toLowerCase().startsWith(q.toLowerCase()))-(a.part_no.toLowerCase().startsWith(q.toLowerCase())));hiIdx=0;
    box.innerHTML=psMatches.length?`<div class="dd-list">${psMatches.map((p,i)=>`<div class="${i===0?"hi":""}" onmousedown="pickProd(${i})"><b>${esc(p.description)}</b><br><span class="mut">${esc(p.part_no)} · MRP ${rs(p.mrp)}</span></div>`).join("")}</div>`:`<div class="dd-list"><div class="mut">${t("not_found").replace(/customer|ग्राहक/,"part")}</div></div>`;
  }catch(e){toast(t("err")+": "+e.message)}
}
function psKey(e){
  if(!psMatches.length)return;
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();hiIdx=(hiIdx+(e.key==="ArrowDown"?1:-1)+psMatches.length)%psMatches.length;document.querySelectorAll(".dd-list div").forEach((d,i)=>d.classList.toggle("hi",i===hiIdx))}
  if(e.key==="Enter"){e.preventDefault();pickProd(hiIdx)}
}
function pickProd(i){
  const p=psMatches[i];selProd=p;psMatches=[];
  $("#ps").value=p.description;$("#psl").innerHTML="";
  $("#psel").innerHTML=`${t("selected")}: <b>${esc(p.description)}</b> · ${esc(p.part_no)} · MRP ${rs(p.mrp)}`;
  const r=$("#pr");r.disabled=false;r.value=Number(p.mrp);r.min=Number(p.mrp);$("#mkup").style.display="flex";
  $("#pq").focus();$("#pq").select();
}
function markup(pct){if(!selProd)return;$("#pr").value=Math.round(Number(selProd.mrp)*(1+pct/100)*100)/100}
function editRate_(id,rate,mrp){
  modal(`<h2>${t("edit_rate")}</h2>${mrp!=null?`<p class="mut">${t("mrp")}: <b>${rs(mrp)}</b></p>`:""}
    <label>${t("new_rate")} (${t("cur")})</label><input id="er" type="number" step="any" value="${rate}" ${mrp!=null?`min="${mrp}"`:""}>
    ${mrp!=null?`<div class="chips" style="margin-top:6px">${[5,10,15,20].map(x=>`<button class="chip" onclick="erMark(${mrp},${x})">+${x}%</button>`).join("")}<button class="chip" onclick="erMark(${mrp},0)">MRP</button></div>`:""}
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" onclick="saveRate_(${id},${mrp},this)">${t("save")}</button></div>`);
  $("#er").select();
}
function erMark(m,x){$("#er").value=Math.round(m*(1+x/100)*100)/100}
function saveRate_(id,mrp,btn){
  const r=parseFloat($("#er").value);if(isNaN(r)||(mrp!=null&&r<mrp)){toast(t("min_mrp")(rs(mrp)));return}
  guard(async()=>{await patch(`job_card_parts?id=eq.${id}`,{rate:Math.round(r*100)/100});closeModal();render()},btn);
}
function addPart(jid,btn){
  if(!selProd){toast(t("pick_first"));$("#ps").focus();return}
  needWho(()=>guard(async()=>{
    const q=parseFloat($("#pq").value);
    const mrp=Number(selProd.mrp)||0,rate=parseFloat($("#pr").value);
    if(isNaN(rate)||rate<mrp){toast(t("min_mrp")(rs(mrp)));$("#pr").value=mrp;return}
    await post("job_card_parts",{job_card_id:jid,part_no:selProd.part_no,description:selProd.description,qty:q>0?q:1,rate:Math.round(rate*100)/100,is_foc:$("#pfoc").checked,issued_by_name:WHO()});
    selProd=null;toast(t("part_added"));await render();const ps=$("#ps");if(ps)ps.focus();
  },btn));
}
function manualItem(jid){
  modal(`<h2>${t("mi_h")}</h2>
    <label>${t("mi_desc")}</label><input id="mi-d">
    <div class="row"><div><label>${t("qty")}</label><input id="mi-q" type="number" step="any" value="1"></div><div><label>${t("rate")}</label><input id="mi-r" type="number" step="any"></div></div>
    <label class="chk" style="margin-top:8px"><input type="checkbox" id="mi-foc"> ${t("foc")}</label>
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" onclick="doManual(${jid},this)">${t("add")}</button></div>`);
  $("#mi-d").focus();
}
function doManual(jid,btn){
  const d=$("#mi-d").value.trim();if(!d){toast(t("enter_desc"));return}
  needWho(()=>guard(async()=>{
    await post("job_card_parts",{job_card_id:jid,part_no:null,description:d,qty:parseFloat($("#mi-q").value)||1,rate:parseFloat($("#mi-r").value)||0,is_foc:$("#mi-foc").checked,issued_by_name:WHO()});
    closeModal();toast(t("part_added"));render();
  },btn));
}
function addLabour(jid,rateId,btn){
  let row;
  if(rateId){const r=CTX.rates.find(x=>x.id===rateId);row={description:rateName(r),amount:Number(r.amount)||0,is_outside:false}}
  else{const d=$("#ld").value.trim();if(!d){toast(t("enter_desc"));return}row={description:d,amount:Number($("#la").value)||0,is_outside:$("#lout").checked}}
  guard(async()=>{await post("job_card_labour",{job_card_id:jid,...row});render()},btn);
}
function delRow(table,id,btn){guard(async()=>{await del(`${table}?id=eq.${id}`);render()},btn)}

async function closeJobDlg(jid){
  const {j,parts,lab}=await loadJob(jid);
  if(!parts.length&&!lab.length){toast(t("nothing_added"));return}
  const tr=j.tractors;
  let slotDone=SLOT_H[j.job_type]?j.job_type:null;
  if(!slotDone&&j.job_type==="PAID")slotDone=j.hours_run?([...SLOTS].reverse().find(s=>s[1]<=j.hours_run+150)||[null])[0]:(tr.next_service_slot||null);
  const plan=planNext(tr,j.hours_run,slotDone?SLOT_H[slotDone]:0);
  window._close={j,plan,slotDone};
  modal(`<h2>${t("close_q")} ${esc(j.job_no)}</h2>
    <p>${parts.length} ${t("parts_n")} · ${t("total")} <b>${rs(partsTotal(parts)+labTotal(lab))}</b></p>
    <label>${t("observ")}</label><textarea id="cj-o" rows="2"></textarea>
    <label>${t("action")}</label><textarea id="cj-a" rows="2"></textarea>
    <label>${t("remarks")}</label><input id="cj-r">
    <label>${t("next_auto")} – ${t("slot")(plan.slot)}</label><input id="cj-next" type="date" value="${plan.due}">
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn ok" onclick="doCloseJob(this)">${t("close_b")}</button></div>`);
}
function doCloseJob(btn){
  const {j,plan,slotDone}=window._close;
  guard(async()=>{
    await patch(`job_cards?id=eq.${j.id}`,{observations:$("#cj-o").value.trim()||null,action_taken:$("#cj-a").value.trim()||null,remarks:$("#cj-r").value.trim()||null});
    if(slotDone)await post("service_history",{tractor_id:j.tractor_id,slot:slotDone,slot_hours:SLOT_H[slotDone]||null,service_date:ymd(new Date()),ws_no:j.job_no,hours:j.hours_run,kind:"service",raw_text:"Job card "+j.job_no});
    await rpc("close_job_card",{p_job_card_id:j.id,p_next_slot:plan.slot,p_next_due:$("#cj-next").value||plan.due});
    closeModal();toast(t("job_closed"));go("slip",j.id);
  },btn);
}

// ---------------------------------------------------------------------
// Slip (printable MSTW job card)
// ---------------------------------------------------------------------
async function vSlip(id){
  const {j,parts,lab}=await loadJob(id);window._slip={j,parts,lab};
  const c=j.customers,tr=j.tractors,D=CTX.dealer;
  const inn=labTotal(lab.filter(l=>!l.is_outside)),out=labTotal(lab.filter(l=>l.is_outside));
  return `<div class="noprint" style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">
      <button class="back" style="margin:0" onclick="go('home')">${t("home_b")}</button><span style="flex:1"></span>
      <button class="btn sm" onclick="window.print()">${t("print")}</button>
      <button class="btn ghost sm" onclick="copySlip()">${t("copy")}</button>
    </div>
  <div class="slip">
    <div class="hd">
      <div><b style="font-size:15px">${t("slip_h")}</b></div>
      <div style="text-align:center"><h3>${esc(D.name)}</h3><div>${esc(D.address||"")}</div></div>
      <div style="text-align:right"><span class="mut">${t("job_no")}</span><br><b style="font-size:15px">${esc(j.job_no)}</b></div>
    </div>
    <table>
      <tr><td rowspan="4" style="width:46%"><b>${esc(c.name)}</b><br>${esc(c.address||"")}${c.district?", "+esc(c.district):""}<br>📞 ${esc(c.phone||"—")}</td><td class="mut">${t("tractor")}</td><td><b>${esc(tr.model)}</b></td></tr>
      <tr><td class="mut">${t("chassis")}</td><td>${esc(tr.chassis_no||"—")}</td></tr>
      <tr><td class="mut">${t("engine")}</td><td>${esc(tr.engine_no||"—")}</td></tr>
      <tr><td class="mut">${t("reg")}</td><td>${esc(tr.reg_no||"—")}</td></tr>
      <tr><td><span class="mut">${t("date_in")}:</span> ${fDT(j.date_in)}</td><td class="mut">${t("doi")}</td><td>${fDate(tr.date_of_installation)}</td></tr>
      <tr><td><span class="mut">${t("date_out")}:</span> ${fDT(j.date_out)}</td><td class="mut">${t("hours_run")}</td><td>${j.hours_run??"—"}</td></tr>
      <tr><td><span class="mut">${t("type_job")}:</span> <b>${t("jt")[j.job_type]}</b>${j.warranty_prf_no?` · PRF ${esc(j.warranty_prf_no)}`:""}</td><td class="mut">${t("mech")}</td><td>${esc(j.mechanics?j.mechanics.name:"—")}</td></tr>
    </table>
    <div class="sec">${t("work_order")}</div>
    <table><tr><th>${t("problems")}</th><th>${t("observ")}</th><th>${t("action")}</th></tr>
      <tr><td>${esc(j.problems_reported||"—")}</td><td>${esc(j.observations||"—")}</td><td>${esc(j.action_taken||"—")}</td></tr></table>
    <div class="sec">${t("mat_note")}</div>
    <table>
      <tr><th>#</th><th>${t("part")}</th><th>${t("part_no")}</th><th class="num">${t("qty")}</th><th class="num">${t("amount")}</th></tr>
      ${parts.map((p,i)=>`<tr><td>${i+1}</td><td>${esc(p.description)}</td><td>${esc(p.part_no||"—")}</td><td class="num">${Number(p.qty)}</td><td class="num">${p.is_foc?t("wty"):rs(p.qty*p.rate)}</td></tr>`).join("")||`<tr><td colspan="5">—</td></tr>`}
      ${lab.map(l=>`<tr><td></td><td colspan="3">${l.is_outside?t("outside"):t("labour_h")}: ${esc(l.description)}</td><td class="num">${rs(l.amount)}</td></tr>`).join("")}
    </table>
    <div class="sec">${t("billing")}</div>
    <table>
      <tr><td>${t("mat_stores")}</td><td class="num">${rs(partsTotal(parts))}</td></tr>
      <tr><td>${t("lab_out")}</td><td class="num">${rs(inn+out)}</td></tr>
      <tr><td><b>${t("grand")}</b></td><td class="num"><b>${rs(partsTotal(parts)+inn+out)}</b></td></tr>
    </table>
    ${j.remarks?`<p><span class="mut">${t("remarks")}:</span> ${esc(j.remarks)}</p>`:""}
    ${j.status==="closed"?`<p>${t("next_date")}: <b>${t("slot")(j.next_service_slot)} · ${fDate(j.next_service_due)}</b></p>`:""}
    <div style="display:flex;justify-content:space-between;margin-top:34px"><span>____________________<br>${t("sign_ws")}</span><span style="text-align:right">____________________<br>${t("sign_cust")}</span></div>
    <p class="mut" style="font-size:11px">${t("not_bill")}</p>
  </div>`;
}
function copySlip(){
  const {j,parts,lab}=window._slip,c=j.customers,tr=j.tractors;
  const txt=[`${CTX.dealer.name} – ${t("slip_h")} ${j.job_no}`,`${t("name")}: ${c.name} (${c.phone||"-"})`,`${t("tractor")}: ${tr.model} | ${t("engine")}: ${tr.engine_no||"-"} | ${t("chassis")}: ${tr.chassis_no||"-"}`,
    `${t("type_job")}: ${t("jt")[j.job_type]} | ${t("hours_run")}: ${j.hours_run??"-"} | ${t("mech")}: ${j.mechanics?j.mechanics.name:"-"}`,`${t("date_in")}: ${fDT(j.date_in)} | ${t("date_out")}: ${fDT(j.date_out)}`,"",
    ...parts.map((p,i)=>`${i+1}. ${p.description} [${p.part_no||"-"}] x${Number(p.qty)} @ ${p.rate} = ${p.is_foc?t("wty"):Number(p.qty)*Number(p.rate)}`),
    ...lab.map(l=>`${t("labour_h")}: ${l.description} = ${l.amount}`),"",`${t("grand")}: ${partsTotal(parts)+labTotal(lab)}`,
    j.status==="closed"?`${t("next_date")}: ${t("slot")(j.next_service_slot)} – ${fDate(j.next_service_due)}`:""].join("\n");
  navigator.clipboard.writeText(txt).then(()=>toast(t("copied"))).catch(()=>toast(t("copy_fail")));
}

// ---------------------------------------------------------------------
// Reminders
// ---------------------------------------------------------------------
async function vReminders(){
  const a=ymd(new Date(Date.now()+8*DAY)),b=ymd(new Date(Date.now()+30*DAY));
  const [due,later]=await Promise.all([get("service_due?select=*&order=next_service_due"),
    get(`tractors?select=id,model,next_service_slot,next_service_due,customers(name,phone)&next_service_due=gte.${a}&next_service_due=lte.${b}&order=next_service_due`)]);
  const D=CTX.dealer;
  const row=x=>{const d=daysTo(x.next_service_due),name=x.name||x.customers.name,phone=x.phone||(x.customers&&x.customers.phone)||"";
    const msg=t("msg")(name,x.model,t("slot")(x.next_service_slot),d<0,fDate(x.next_service_due),D.name,D.address);
    const wa=phone.replace(/\D/g,"").slice(-10);
    return `<div class="list-item">
      <div><b>${esc(name)}</b> <span class="tag ${d<0?"due":"open"}">${d<0?t("late")(-d):d===0?t("today"):d===1?t("tomorrow"):t("in_days")(d)}</span>
        <div class="mut">${esc(x.model)} · ${t("slot")(x.next_service_slot)} · ${fDate(x.next_service_due)}<br>📞 ${esc(phone||"—")}</div></div>
      <div style="display:flex;gap:6px;flex-shrink:0">
        ${wa.length===10?`<a class="btn ok sm" style="text-decoration:none" href="https://wa.me/977${wa}?text=${enc(msg)}" target="_blank" rel="noopener">WhatsApp</a>`:""}
        <button class="btn ghost sm" onclick="go('customer',${x.tractor_id||x.id})">${t("open_b")}</button>
      </div></div>`};
  return `<div class="card"><h2>${t("due_h")}</h2><p class="mut">${t("due_note")}</p>
    ${due.length?due.map(row).join(""):`<div class="empty">${t("none_due")}</div>`}</div>
  <div class="card"><h2>${t("upcoming")}</h2>${later.length?later.map(row).join(""):`<div class="empty">—</div>`}</div>`;
}


// ---------------------------------------------------------------------
// Reports (admin only)
// ---------------------------------------------------------------------
function periodRange(p){
  const n=new Date(),d0=new Date(n.getFullYear(),n.getMonth(),n.getDate());
  if(p==="today")return [d0,new Date(d0.getTime()+DAY)];
  if(p==="7")return [new Date(d0.getTime()-6*DAY),new Date(d0.getTime()+DAY)];
  if(p==="last")return [new Date(n.getFullYear(),n.getMonth()-1,1),new Date(n.getFullYear(),n.getMonth(),1)];
  return [new Date(n.getFullYear(),n.getMonth(),1),new Date(d0.getTime()+DAY)];
}
const fDur=ms=>{const h=ms/3600000;return h<24?h.toFixed(1)+" "+t("hr"):(h/24).toFixed(1)+" "+t("day")};
async function vReports(p){
  if(!isAdmin())return `<div class="card empty">${t("admin_only")}</div>`;
  p=p||"month";const [a,b]=periodRange(p),A=enc(a.toISOString()),B=enc(b.toISOString());
  const [opened,closed,openNow,due]=await Promise.all([
    get(`job_cards?select=id,job_type,date_in,entered_by_name&date_in=gte.${A}&date_in=lt.${B}&status=neq.cancelled&order=date_in`),
    get(`job_cards?select=id,job_type,date_in,date_out,mechanic_id,mechanics(name)&status=eq.closed&date_out=gte.${A}&date_out=lt.${B}`),
    get("job_cards?select=id&status=eq.open"),get("service_due?select=tractor_id")]);
  const ids=closed.map(j=>j.id);
  let tot=[],lines=[];
  if(ids.length){
    for(let i=0;i<ids.length;i+=150){const part=ids.slice(i,i+150).join(",");
      const [t1,l1]=await Promise.all([get(`job_card_totals?job_card_id=in.(${part})`),get(`job_card_parts?select=part_no,description,qty,rate,mrp_at_issue,is_foc&job_card_id=in.(${part})`)]);
      tot=tot.concat(t1);lines=lines.concat(l1)}
  }
  const sum=(arr,f)=>arr.reduce((x,y)=>x+Number(f(y)||0),0);
  const P=sum(tot,x=>x.parts_total),L=sum(tot,x=>x.labour_total),O=sum(tot,x=>x.outside_total);
  const markup=sum(lines.filter(l=>!l.is_foc&&l.mrp_at_issue!=null),l=>(l.rate-l.mrp_at_issue)*l.qty);
  const wty=sum(lines.filter(l=>l.is_foc),l=>l.qty*l.rate);
  const count=(arr,key)=>{const m={};arr.forEach(x=>{const k=key(x);m[k]=(m[k]||0)+1});return Object.entries(m).sort((x,y)=>y[1]-x[1])};
  const mech={};closed.forEach(j=>{const k=j.mechanics?j.mechanics.name:"—";(mech[k]=mech[k]||{n:0,ms:0}).n++;mech[k].ms+=new Date(j.date_out)-new Date(j.date_in)});
  const top={};lines.forEach(l=>{const k=l.part_no||l.description;(top[k]=top[k]||{d:l.description,pn:l.part_no,q:0,v:0}).q+=Number(l.qty);if(!l.is_foc)top[k].v+=l.qty*l.rate});
  const daily=count(opened,j=>ymd(j.date_in)).sort((x,y)=>x[0]<y[0]?-1:1);
  const tile=(n,l)=>`<div class="stat"><b>${n}</b><span>${l}</span></div>`;
  const table=(head,rows)=>rows.length?`<table><tr>${head.map((h,i)=>`<th class="${i?"num":""}">${h}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map((c,i)=>`<td class="${i?"num":""}">${c}</td>`).join("")}</tr>`).join("")}</table>`:`<div class="empty">${t("r_none")}</div>`;
  return `<div class="chips" style="margin-bottom:12px">${[["today","p_today"],["7","p_7"],["month","p_month"],["last","p_last"]].map(([k,l])=>`<button class="chip ${k===p?"on":""}" onclick="go('reports','${k}')">${t(l)}</button>`).join("")}</div>
  <p class="mut" style="margin-top:-4px">${fDate(a)} – ${fDate(new Date(b.getTime()-1))}</p>
  <div class="stats">${tile(opened.length,t("r_opened"))}${tile(closed.length,t("r_closed"))}${tile(openNow.length,t("r_open_now"))}</div>
  <div class="card"><h2>${t("r_income")}</h2>
    <div class="total" style="text-align:left;font-size:24px;margin:0 0 8px">${rs(P+L+O)}</div>
    ${table(["",t("amount")],[[t("r_parts"),rs(P)],[t("r_labour"),rs(L)],[t("r_outside"),rs(O)],[`<span class="mut">${t("r_markup")}</span>`,`<span class="mut">${rs(markup)}</span>`],[`<span class="mut">${t("r_wty")}</span>`,`<span class="mut">${rs(wty)}</span>`]])}
  </div>
  <div class="card"><h2>${t("r_mech")}</h2>${table([t("mech"),t("r_jobs"),t("r_avg")],Object.entries(mech).sort((x,y)=>y[1].n-x[1].n).map(([k,v])=>[esc(k),v.n,fDur(v.ms/v.n)]))}</div>
  <div class="card"><h2>${t("r_types")}</h2>${table([t("type_job"),t("r_jobs")],count(opened,j=>j.job_type).map(([k,n])=>[t("jt")[k],n]))}</div>
  <div class="card"><h2>${t("r_top")}</h2>${table([t("part"),t("qty"),t("amount")],Object.values(top).sort((x,y)=>y.q-x.q).slice(0,15).map(x=>[`${esc(x.d)}<div class="mut">${esc(x.pn||"—")}</div>`,x.q,rs(x.v)]))}</div>
  <div class="card"><h2>${t("r_daily")}</h2>${table([t("date"),t("r_opened")],daily.map(([d,n])=>[fDate(d),n]))}</div>
  <div class="card"><h2>${t("r_entry")}</h2>${table([t("name"),t("r_jobs")],count(opened,j=>j.entered_by_name||"—").map(([k,n])=>[esc(k),n]))}</div>
  <div class="card" style="display:flex;justify-content:space-between;align-items:center"><span>${t("r_due")}: <b>${due.length}</b></span><button class="btn ghost sm" onclick="go('reminders')">${t("open_b")}</button></div>`;
}
// ---------------------------------------------------------------------
// Settings (admin only): staff list and labour rates
// ---------------------------------------------------------------------
async function vSettings(){
  if(!isAdmin())return `<div class="card empty">${t("admin_only")}</div>`;
  const [staff,rates]=await Promise.all([get("mechanics?select=*&order=active.desc,role,name"),get("labour_rates?select=*&order=active.desc,id")]);
  CTX.staff=staff;CTX.rates=rates;
  return `<div class="card"><h2>${t("set_staff")}</h2>
    <table><tr><th>${t("name")}</th><th>${t("phone")}</th><th>${t("role")}</th><th></th></tr>
    ${staff.map(s=>`<tr style="${s.active?"":"opacity:.5"}"><td>${esc(s.name)}</td><td>${esc(s.phone||"—")}</td><td>${t(s.role)}</td>
      <td><div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-end"><button class="btn ghost sm" onclick="editStaff(${s.id})">${t("edit")}</button> <button class="btn gray sm" onclick="toggleRow('mechanics',${s.id},${!s.active},this)">${s.active?t("inactive"):t("active")}</button></div></td></tr>`).join("")}
    </table><button class="btn ghost" style="margin-top:10px" onclick="editStaff()">${t("add_staff")}</button></div>
  <div class="card"><h2>${t("set_rates")}</h2>
    <table><tr><th>${t("name_en")}</th><th>${t("name_ne")}</th><th class="num">${t("amount")}</th><th></th></tr>
    ${rates.map(r=>`<tr style="${r.active?"":"opacity:.5"}"><td>${esc(r.name_en)}</td><td>${esc(r.name_ne||"—")}</td><td class="num">${rs(r.amount)}</td>
      <td><div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-end"><button class="btn ghost sm" onclick="editRate(${r.id})">${t("edit")}</button> <button class="btn gray sm" onclick="toggleRow('labour_rates',${r.id},${!r.active},this)">${r.active?t("inactive"):t("active")}</button></div></td></tr>`).join("")}
    </table><button class="btn ghost" style="margin-top:10px" onclick="editRate()">${t("add_rate")}</button></div>`;
}
function editStaff(id){
  const s=id?CTX.staff.find(x=>x.id===id):{name:"",phone:"",role:"mechanic"};
  modal(`<h2>${id?t("edit"):t("add_staff")}</h2>
    <label>${t("name")}</label><input id="sf-n" value="${esc(s.name)}">
    <label>${t("phone")}</label><input id="sf-p" inputmode="tel" value="${esc(s.phone||"")}">
    <label>${t("role")}</label><select id="sf-r"><option value="mechanic" ${s.role==="mechanic"?"selected":""}>${t("mechanic")}</option><option value="sales" ${s.role==="sales"?"selected":""}>${t("sales")}</option></select>
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" onclick="saveStaff(${id||0},this)">${t("save")}</button></div>`);
}
function saveStaff(id,btn){
  const row={name:$("#sf-n").value.trim(),phone:$("#sf-p").value.trim()||null,role:$("#sf-r").value};if(!row.name){toast(t("enter_desc"));return}
  guard(async()=>{id?await patch(`mechanics?id=eq.${id}`,row):await post("mechanics",row);closeModal();toast(t("saved"));render()},btn);
}
function editRate(id){
  const r=id?CTX.rates.find(x=>x.id===id):{name_en:"",name_ne:"",amount:0};
  modal(`<h2>${id?t("edit"):t("add_rate")}</h2>
    <label>${t("name_en")}</label><input id="lr-e" value="${esc(r.name_en)}">
    <label>${t("name_ne")}</label><input id="lr-n" value="${esc(r.name_ne||"")}">
    <label>${t("amount")}</label><input id="lr-a" type="number" value="${Number(r.amount)}">
    <div class="row" style="margin-top:14px"><button class="btn gray" onclick="closeModal()">${t("cancel")}</button><button class="btn" onclick="saveRate(${id||0},this)">${t("save")}</button></div>`);
}
function saveRate(id,btn){
  const row={name_en:$("#lr-e").value.trim(),name_ne:$("#lr-n").value.trim()||null,amount:Number($("#lr-a").value)||0};if(!row.name_en){toast(t("enter_desc"));return}
  guard(async()=>{id?await patch(`labour_rates?id=eq.${id}`,row):await post("labour_rates",row);closeModal();toast(t("saved"));render()},btn);
}
function toggleRow(table,id,val,btn){guard(async()=>{await patch(`${table}?id=eq.${id}`,{active:val});render()},btn)}

// ---------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>{LANG=b.dataset.l;ls.set("jobcard_lang",LANG);closeModal();CTX?render():showLogin()});
(async()=>{
  if(!SESS)return showLogin();
  try{await loadCtx();render()}catch(e){if(e.auth||e.nodealer){saveSess(null);showLogin(e.nodealer?t("no_dealer"):"")}else{chrome();$("#app").innerHTML=`<div class="card empty">${esc(e.message)}<br><br><button class="btn" onclick="location.reload()">↻</button></div>`}}
})();
if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js").catch(()=>{})}
