import { useState } from "react";
import { Video as VideoIcon, Plus, Clock, User, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const sessions = [
  { id:"1", patient:"Hoffmann, Peter", time:"10:00", duration:"30 Min.", type:"UroLift Nachsorge", doctor:"Dr. Fomuki", status:"upcoming", link:"https://whereby.com/urologie-neuwied-1" },
  { id:"2", patient:"Wagner, Stefan", time:"11:00", duration:"30 Min.", type:"Andrologie Beratung", doctor:"Dr. Fomuki", status:"upcoming", link:"https://whereby.com/urologie-neuwied-2" },
  { id:"3", patient:"Weber, Klaus", time:"09:00", duration:"20 Min.", type:"PSA-Befund Besprechung", doctor:"Dr. Fomuki", status:"completed", link:"" },
];

const statusCfg = {
  upcoming:  { label:"Geplant",  color:"#1E9FD4", bg:"rgba(30,159,212,0.1)" },
  live:      { label:"Live",     color:"#16a34a", bg:"rgba(22,163,74,0.1)" },
  completed: { label:"Beendet", color:"#64748b", bg:"rgba(100,116,139,0.1)" },
};

export default function Video() {
  const [tab, setTab] = useState<"sessions"|"setup">("sessions");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Videosprechstunde</h1>
          <p className="text-slate-500 text-sm mt-0.5">DSGVO-konform · Server Deutschland · GOÄ §5a</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Plus size={15} /> Neue Sitzung
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Heute geplant", value:"2", color:"#1E9FD4" },
          { label:"Diese Woche",   value:"8", color:"#7c3aed" },
          { label:"Abgeschlossen", value:"1", color:"#16a34a" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-5">
        {[["sessions","Sitzungen"],["setup","Einrichtung & Info"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "sessions"|"setup")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>
      {tab === "sessions" && (
        <div className="space-y-3">
          {sessions.map(s => {
            const cfg = statusCfg[s.status as keyof typeof statusCfg];
            return (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:cfg.bg}}>
                  <VideoIcon size={20} style={{color:cfg.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800">{s.patient}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{backgroundColor:cfg.bg, color:cfg.color}}>{cfg.label}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock size={11} />{s.time} · {s.duration}</span>
                    <span className="flex items-center gap-1"><User size={11} />{s.doctor}</span>
                    <span>{s.type}</span>
                  </div>
                </div>
                {s.status === "upcoming" && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                    style={{backgroundColor:"#1E9FD4"}}>
                    <VideoIcon size={14} /> Beitreten
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
      {tab === "setup" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle size={18} style={{color:"#16a34a"}} /> Technische Anforderungen
            </h3>
            <div className="space-y-3">
              {["Kamera & Mikrofon aktiviert","Stabile Internetverbindung","Aktueller Browser","Ruhige helle Umgebung","Patient hat Link erhalten"].map(r => (
                <div key={r} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={14} style={{color:"#16a34a"}} />{r}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle size={18} style={{color:"#d97706"}} /> Abrechnung
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p><span className="font-semibold">GOÄ §5a:</span> Telemedizinischer Zuschlag</p>
              <p><span className="font-semibold">GKV:</span> Nach KBV-Richtlinie</p>
              <p><span className="font-semibold">PKV:</span> GOÄ mit Begründung</p>
              <div className="mt-4 p-3 rounded-xl text-xs" style={{backgroundColor:"rgba(30,159,212,0.06)", color:"#1480AB"}}>
                Nur für bestehende Patienten zulässig (§7 Abs. 4 MBO-Ä).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
