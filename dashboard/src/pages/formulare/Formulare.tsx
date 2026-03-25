import { useState } from "react";
import { FileText, Plus, Send, CheckCircle, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const forms = [
  { id:"1", name:"Online-Anamnese Erstvorstellung", type:"anamnese", patient:"Hoffmann, Peter", sent:"22.03.2026", filled:true, due:"23.03.2026" },
  { id:"2", name:"UroLift® Einwilligungserklärung", type:"konsent", patient:"Müller, Hans", sent:"23.03.2026", filled:false, due:"23.03.2026" },
  { id:"3", name:"Vasektomie Aufklärung + Konsent", type:"konsent", patient:"Schmidt, Thomas", sent:"23.03.2026", filled:false, due:"23.03.2026" },
  { id:"4", name:"DSGVO Einwilligung", type:"dsgvo", patient:"Yilmaz, Mehmet", sent:"23.03.2026", filled:true, due:"23.03.2026" },
  { id:"5", name:"Zufriedenheitsumfrage Post-Visit", type:"survey", patient:"Weber, Klaus", sent:"22.03.2026", filled:true, due:"24.03.2026" },
  { id:"6", name:"Anamnese Andrologie", type:"anamnese", patient:"Wagner, Stefan", sent:"23.03.2026", filled:true, due:"23.03.2026" },
];

const templates = [
  { name:"Online-Anamnese Erstvorstellung", category:"Anamnese", uses:124 },
  { name:"Anamnese Andrologie", category:"Anamnese", uses:45 },
  { name:"UroLift® Einwilligung", category:"Konsent", uses:28 },
  { name:"Vasektomie Aufklärung", category:"Konsent", uses:67 },
  { name:"Zufriedenheitsumfrage", category:"Umfrage", uses:203 },
  { name:"DSGVO Einwilligung", category:"Datenschutz", uses:341 },
];

const typeCfg: Record<string,{label:string,color:string,bg:string}> = {
  anamnese: { label:"Anamnese", color:"#1E9FD4", bg:"rgba(30,159,212,0.08)" },
  konsent:  { label:"Konsent",  color:"#7c3aed", bg:"rgba(124,58,237,0.08)" },
  dsgvo:    { label:"DSGVO",    color:"#dc2626", bg:"rgba(220,38,38,0.08)" },
  survey:   { label:"Umfrage",  color:"#16a34a", bg:"rgba(22,163,74,0.08)" },
};

export default function Formulare() {
  const [tab, setTab] = useState<"active"|"templates">("active");
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Formulare & Anamnese</h1>
          <p className="text-slate-500 text-sm mt-0.5">Digitale Formulare · e-Signatur · DSGVO-konform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Send size={15} /> Formular senden
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Versendet heute", value:forms.length, color:"#1E9FD4" },
          { label:"Ausgefüllt", value:forms.filter(f=>f.filled).length, color:"#16a34a" },
          { label:"Ausstehend", value:forms.filter(f=>!f.filled).length, color:"#d97706" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-5">
        {[["active","Aktive Formulare"],["templates","Vorlagen"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "active"|"templates")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>
      {tab === "active" && (
        <div className="space-y-2">
          {forms.map(f => {
            const cfg = typeCfg[f.type];
            return (
              <div key={f.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:cfg.bg}}>
                  <FileText size={18} style={{color:cfg.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm mb-0.5">{f.name}</div>
                  <div className="text-xs text-slate-400">{f.patient} · {f.sent} · Fällig: {f.due}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-xl font-semibold" style={{backgroundColor:cfg.bg, color:cfg.color}}>{cfg.label}</span>
                <div className={cn("flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl",
                  f.filled ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600")}>
                  {f.filled ? <><CheckCircle size={12} /> Ausgefüllt</> : <><Clock size={12} /> Ausstehend</>}
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                  <Eye size={15} className="text-slate-400" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {tab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-[#1E9FD4]/30 hover:shadow-md transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{backgroundColor:"rgba(30,159,212,0.08)"}}>
                <FileText size={18} style={{color:"#1E9FD4"}} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1 text-sm group-hover:text-[#1E9FD4] transition-colors">{t.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-500">{t.category}</span>
                <span className="text-xs text-slate-400">{t.uses}× verwendet</span>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-5 flex items-center justify-center hover:border-[#1E9FD4]/40 transition-all cursor-pointer">
            <div className="text-center">
              <Plus size={24} className="mx-auto mb-2 text-slate-300" />
              <p className="text-sm text-slate-400">Neue Vorlage</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
