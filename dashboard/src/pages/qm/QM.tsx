import { useState } from "react";
import { AlertTriangle, CheckCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const checklists = [
  { id:"1", title:"Hygiene Tagesprotokoll", category:"Hygiene", items:8, done:8, lastCheck:"Heute 07:45", status:"ok" },
  { id:"2", title:"Gerätewartung Magnetstimulator", category:"Geräte", items:5, done:5, lastCheck:"21.03.2026", status:"ok" },
  { id:"3", title:"Gerätewartung Ultraschall", category:"Geräte", items:5, done:3, lastCheck:"Heute", status:"partial" },
  { id:"4", title:"Notfallausrüstung Kontrolle", category:"Notfall", items:12, done:12, lastCheck:"01.03.2026", status:"ok" },
  { id:"5", title:"Datenschutz-Audit Q1", category:"DSGVO", items:15, done:10, lastCheck:"15.03.2026", status:"partial" },
  { id:"6", title:"KBV QEP Indikatoren", category:"KBV", items:20, done:14, lastCheck:"01.03.2026", status:"partial" },
];

const incidents = [
  { id:"1", title:"Beinahe-Fehler: Verwechslung Laborröhrchen", severity:"low", date:"20.03.2026", status:"resolved" },
  { id:"2", title:"IT-Ausfall 15 Min — Backup genutzt", severity:"low", date:"15.03.2026", status:"resolved" },
  { id:"3", title:"Patient Sturz Wartezimmer", severity:"high", date:"10.03.2026", status:"investigating" },
];

const severityCfg = {
  low:  { label:"Niedrig", color:"#d97706", bg:"rgba(217,119,6,0.1)" },
  high: { label:"Hoch",    color:"#dc2626", bg:"rgba(220,38,38,0.1)" },
};

const incidentStatusCfg = {
  resolved:      { label:"Abgeschlossen", color:"#16a34a" },
  investigating: { label:"In Bearbeitung", color:"#d97706" },
};

export default function QM() {
  const [tab, setTab] = useState<"checklists"|"incidents">("checklists");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Qualitätsmanagement</h1>
          <p className="text-slate-500 text-sm mt-0.5">KBV QEP · Hygiene · Zwischenfälle</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Plus size={15} /> Vorfall melden
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Checklisten OK", value:checklists.filter(c=>c.status==="ok").length, color:"#16a34a" },
          { label:"Unvollständig", value:checklists.filter(c=>c.status==="partial").length, color:"#d97706" },
          { label:"Offene Vorfälle", value:incidents.filter(i=>i.status==="investigating").length, color:"#dc2626" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-5">
        {[["checklists","Checklisten"],["incidents","Vorfälle"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "checklists"|"incidents")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>
      {tab === "checklists" && (
        <div className="space-y-3">
          {checklists.map(c => {
            const pct = Math.round((c.done/c.items)*100);
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{backgroundColor:c.status==="ok"?"rgba(22,163,74,0.1)":"rgba(217,119,6,0.1)"}}>
                      {c.status==="ok" ? <CheckCircle size={18} style={{color:"#16a34a"}} /> : <AlertTriangle size={18} style={{color:"#d97706"}} />}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{c.title}</div>
                      <div className="text-xs text-slate-400">{c.category} · {c.lastCheck}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold" style={{color:c.status==="ok"?"#16a34a":"#d97706"}}>{c.done}/{c.items}</div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{width:`${pct}%`, backgroundColor:c.status==="ok"?"#16a34a":"#d97706"}} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab === "incidents" && (
        <div className="space-y-3">
          {incidents.map(inc => {
            const sev = severityCfg[inc.severity as keyof typeof severityCfg];
            const ist = incidentStatusCfg[inc.status as keyof typeof incidentStatusCfg];
            return (
              <div key={inc.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:sev.bg}}>
                  <AlertTriangle size={18} style={{color:sev.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm mb-0.5">{inc.title}</div>
                  <div className="text-xs text-slate-400">{inc.date}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-xl font-semibold" style={{backgroundColor:sev.bg, color:sev.color}}>{sev.label}</span>
                <span className="text-xs px-2.5 py-1 rounded-xl font-semibold bg-slate-100" style={{color:ist.color}}>{ist.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
