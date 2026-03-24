import { useState } from "react";
import { Briefcase, Plus, User, CheckCircle, Clock, XCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  { id:"1", title:"MFA Vollzeit/Teilzeit", status:"active", applications:4, posted:"01.03.2026" },
  { id:"2", title:"Ärztin/Arzt in Weiterbildung (Urologie)", status:"active", applications:2, posted:"15.02.2026" },
  { id:"3", title:"Bürokauffrau/-mann (Teilzeit/Homeoffice)", status:"active", applications:6, posted:"01.03.2026" },
  { id:"4", title:"Auszubildende MFA", status:"filled", applications:8, posted:"01.01.2026" },
];

const applications = [
  { id:"1", name:"Sandra Hoffmann", job:"MFA Vollzeit", date:"22.03.2026", status:"new", note:"Sehr gute Bewerbung" },
  { id:"2", name:"Dr. Amara Diallo", job:"Ärztin in Weiterbildung", date:"20.03.2026", status:"interview", note:"Interview Di 26.03 14:00" },
  { id:"3", name:"Klaus Berger", job:"Bürokaufmann", date:"19.03.2026", status:"new", note:"" },
  { id:"4", name:"Fatima Al-Rashid", job:"MFA Vollzeit", date:"18.03.2026", status:"rejected", note:"Keine Erfahrung" },
  { id:"5", name:"Marie Schulze", job:"Bürokauffrau", date:"17.03.2026", status:"interview", note:"Interview Mo 25.03 10:00" },
  { id:"6", name:"Tom Weber", job:"Bürokaufmann", date:"15.03.2026", status:"new", note:"" },
];

const statusCfg = {
  new:      { label:"Neu",           color:"#1E9FD4", bg:"rgba(30,159,212,0.1)", icon:Mail },
  interview:{ label:"Eingeladen",    color:"#7c3aed", bg:"rgba(124,58,237,0.1)", icon:Clock },
  rejected: { label:"Abgelehnt",     color:"#dc2626", bg:"rgba(220,38,38,0.1)",  icon:XCircle },
  hired:    { label:"Eingestellt",   color:"#16a34a", bg:"rgba(22,163,74,0.1)",  icon:CheckCircle },
};

export default function HR() {
  const [tab, setTab] = useState<"jobs"|"applications">("jobs");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stellen & HR</h1>
          <p className="text-slate-500 text-sm mt-0.5">Offene Stellen · Bewerbungen · Onboarding</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Plus size={15} /> Stelle ausschreiben
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Offene Stellen", value:jobs.filter(j=>j.status==="active").length, color:"#1E9FD4" },
          { label:"Neue Bewerbungen", value:applications.filter(a=>a.status==="new").length, color:"#d97706" },
          { label:"In Interview", value:applications.filter(a=>a.status==="interview").length, color:"#7c3aed" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {[["jobs","Stellenangebote"],["applications","Bewerbungen"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "jobs"|"applications")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>

      {tab === "jobs" && (
        <div className="space-y-3">
          {jobs.map(j => (
            <div key={j.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:"rgba(30,159,212,0.1)"}}>
                <Briefcase size={18} style={{color:"#1E9FD4"}} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 mb-0.5">{j.title}</div>
                <div className="text-xs text-slate-400">Ausgeschrieben: {j.posted} · {j.applications} Bewerbungen</div>
              </div>
              <span className={cn("text-xs px-3 py-1.5 rounded-xl font-semibold",
                j.status==="active" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400")}>
                {j.status==="active" ? "Aktiv" : "Besetzt"}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === "applications" && (
        <div className="space-y-2">
          {applications.map(a => {
            const cfg = statusCfg[a.status as keyof typeof statusCfg];
            const Icon = cfg.icon;
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:cfg.bg}}>
                  <Icon size={18} style={{color:cfg.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm">{a.name}</div>
                  <div className="text-xs text-slate-400">{a.job} · {a.date}</div>
                  {a.note && <div className="text-xs text-slate-500 mt-0.5 italic">{a.note}</div>}
                </div>
                <span className="text-xs px-3 py-1.5 rounded-xl font-semibold" style={{backgroundColor:cfg.bg, color:cfg.color}}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
