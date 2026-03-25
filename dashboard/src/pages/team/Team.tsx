import { useState } from "react";
import { Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const staff = [
  { id:"1", name:"Dr. Walters T. Fomuki", role:"Inhaber", color:"#1E9FD4", initials:"WF", status:"present", today:"08:00–17:00" },
  { id:"2", name:"Dr. C. Nwankwo", role:"Ärztin", color:"#5ECFEB", initials:"CN", status:"present", today:"08:00–14:00" },
  { id:"3", name:"Bettina Theismann", role:"MFA · QM", color:"#16a34a", initials:"BT", status:"present", today:"08:00–16:00" },
  { id:"4", name:"Jacqueline Elinger", role:"MFA · Anmeldung", color:"#7c3aed", initials:"JE", status:"present", today:"08:00–16:00" },
  { id:"5", name:"Johanna Sikora", role:"MFA · OP-Assistenz", color:"#d97706", initials:"JS", status:"absent", today:"Urlaub" },
  { id:"6", name:"Birgit Erhan", role:"MFA · Labor", color:"#dc2626", initials:"BE", status:"present", today:"08:00–14:00" },
  { id:"7", name:"Frau Jakoby", role:"Büroassistenz", color:"#0891b2", initials:"FJ", status:"present", today:"09:00–15:00" },
  { id:"8", name:"Vivien Urmersbach", role:"Auszubildende", color:"#94a3b8", initials:"VU", status:"present", today:"08:00–16:00" },
  { id:"9", name:"Shau Wen Wang", role:"Auszubildende", color:"#94a3b8", initials:"SW", status:"late", today:"Kommt 09:30" },
];

const schedule = [
  { day:"Mo", slots:["WF 08-17","CN 08-14","BT 08-16","JE 08-16","BE 08-14","FJ 09-15","VU 08-16","SW 08-16"] },
  { day:"Di", slots:["WF 08-17","CN 08-14","BT 08-16","JE 08-16","BE 08-14","FJ 09-15","VU 08-16","SW 08-16"] },
  { day:"Mi", slots:["WF 08-12","BT 08-12","JE 08-12","VU 08-12"] },
  { day:"Do", slots:["WF 08-17","CN 08-14","BT 08-16","JE 08-16","BE 08-14","FJ 09-15","VU 08-16","SW 08-16"] },
  { day:"Fr", slots:["WF 08-12","BT 08-12","JE 08-12","VU 08-12"] },
];

const statusCfg = {
  present: { label:"Anwesend",  color:"#16a34a", bg:"rgba(22,163,74,0.1)",  icon:CheckCircle },
  absent:  { label:"Abwesend",  color:"#dc2626", bg:"rgba(220,38,38,0.1)",  icon:XCircle },
  late:    { label:"Verspätet", color:"#d97706", bg:"rgba(217,119,6,0.1)",  icon:AlertCircle },
};

export default function Team() {
  const [tab, setTab] = useState<"today"|"schedule">("today");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team & Dienstplan</h1>
          <p className="text-slate-500 text-sm mt-0.5">{staff.filter(s=>s.status==="present").length} von {staff.length} anwesend heute</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Plus size={15} /> Schicht hinzufügen
        </button>
      </div>
      <div className="flex gap-2 mb-6">
        {[["today","Heute"],["schedule","Wochenplan"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "today"|"schedule")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>
      {tab === "today" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map(s => {
            const cfg = statusCfg[s.status as keyof typeof statusCfg];
            const Icon = cfg.icon;
            return (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{backgroundColor:s.color}}>{s.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 text-sm truncate">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.role}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500"><Clock size={12} />{s.today}</div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold" style={{backgroundColor:cfg.bg, color:cfg.color}}>
                    <Icon size={11} />{cfg.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {tab === "schedule" && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-6 border-b border-slate-100">
            <div className="p-3 text-xs font-semibold text-slate-400 uppercase">Mitarbeiter</div>
            {schedule.map(d => (
              <div key={d.day} className="p-3 text-xs font-semibold text-center" style={{color:"#1E9FD4"}}>{d.day}</div>
            ))}
          </div>
          {staff.map((s,i) => (
            <div key={s.id} className={cn("grid grid-cols-6 items-center", i<staff.length-1 && "border-b border-slate-50")}>
              <div className="p-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{backgroundColor:s.color}}>{s.initials}</div>
                <span className="text-xs font-medium text-slate-700 truncate">{s.name.split(" ").slice(-1)[0]}</span>
              </div>
              {schedule.map(d => (
                <div key={d.day} className="p-3 text-center">
                  <span className="text-xs px-2 py-1 rounded-lg font-medium bg-slate-50 text-slate-500">
                    {d.slots.find(sl=>sl.startsWith(s.initials))?.split(" ")[1] ?? "–"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
