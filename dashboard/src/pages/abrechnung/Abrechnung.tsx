import { useState } from "react";
import { CreditCard, TrendingUp, Euro, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label:"Umsatz März", value:"€ 18.420", sub:"+12% vs Vormonat", color:"#1E9FD4" },
  { label:"Offene Rechnungen", value:"€ 3.240", sub:"8 Rechnungen", color:"#d97706" },
  { label:"GKV Quartal", value:"€ 42.100", sub:"Q1 2026", color:"#16a34a" },
  { label:"IGeL Umsatz", value:"€ 2.800", sub:"März 2026", color:"#7c3aed" },
];

const invoices = [
  { id:"1", patient:"Weber, Klaus", type:"PKV", amount:"€ 380", date:"23.03.2026", status:"paid", codes:"GOÄ 410, 5, 26" },
  { id:"2", patient:"Hoffmann, Peter", type:"PKV", amount:"€ 520", date:"23.03.2026", status:"pending", codes:"GOÄ 1800, 410, 5" },
  { id:"3", patient:"Wagner, Stefan", type:"IGeL", amount:"€ 250", date:"23.03.2026", status:"pending", codes:"GOÄ 255, 5, 26" },
  { id:"4", patient:"Müller, Hans", type:"GKV", amount:"EBM", date:"23.03.2026", status:"submitted", codes:"EBM 03000, 32360" },
  { id:"5", patient:"Fischer, Jürgen", type:"PKV", amount:"€ 460", date:"20.03.2026", status:"paid", codes:"GOÄ 1801, 410, 26" },
  { id:"6", patient:"Zimmermann, Robert", type:"PKV", amount:"€ 180", date:"23.03.2026", status:"overdue", codes:"GOÄ 505, 26" },
];

const statusCfg = {
  paid:      { label:"Bezahlt",    color:"#16a34a", bg:"rgba(22,163,74,0.1)",    icon:CheckCircle },
  pending:   { label:"Ausstehend", color:"#d97706", bg:"rgba(217,119,6,0.1)",    icon:Clock },
  submitted: { label:"Eingereicht",color:"#1E9FD4", bg:"rgba(30,159,212,0.1)",   icon:FileText },
  overdue:   { label:"Überfällig", color:"#dc2626", bg:"rgba(220,38,38,0.1)",    icon:AlertCircle },
};

const typeCfg: Record<string,{color:string,bg:string}> = {
  PKV:  { color:"#7c3aed", bg:"rgba(124,58,237,0.1)" },
  GKV:  { color:"#0d9488", bg:"rgba(13,148,136,0.1)" },
  IGeL: { color:"#d97706", bg:"rgba(217,119,6,0.1)" },
};

export default function Abrechnung() {
  const [tab, setTab] = useState<"invoices"|"codes">("invoices");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Abrechnung</h1>
          <p className="text-slate-500 text-sm mt-0.5">GOÄ · EBM · IGeL — März 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <FileText size={15} /> Neue Rechnung
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-2xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm font-semibold text-slate-700">{s.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {[["invoices","Rechnungen"],["codes","EBM/GOÄ Codes"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "invoices"|"codes")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>

      {tab === "invoices" && (
        <div className="space-y-2">
          {invoices.map(inv => {
            const cfg = statusCfg[inv.status as keyof typeof statusCfg];
            const Icon = cfg.icon;
            const tCfg = typeCfg[inv.type];
            return (
              <div key={inv.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:cfg.bg}}>
                  <Icon size={18} style={{color:cfg.color}} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-slate-800 text-sm">{inv.patient}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{backgroundColor:tCfg.bg, color:tCfg.color}}>{inv.type}</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">{inv.date}</div>
                  <div className="text-xs text-slate-300 hidden sm:block truncate">{inv.codes}</div>
                </div>
                <div className="text-sm md:text-lg font-bold text-slate-800 flex-shrink-0">{inv.amount}</div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0" style={{backgroundColor:cfg.bg, color:cfg.color}}>
                  <Icon size={12} />{cfg.label}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "codes" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-bold text-slate-700 mb-4">Häufige Abrechnungsziffern</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { code:"EBM 03000", desc:"Hausärztliche Versichertenpauschale", type:"EBM" },
              { code:"GOÄ 5", desc:"Symptombezogene Untersuchung", type:"GOÄ" },
              { code:"GOÄ 26", desc:"Beratung (mind. 10 Min.)", type:"GOÄ" },
              { code:"GOÄ 410", desc:"Sonographie eines Organs", type:"GOÄ" },
              { code:"GOÄ 1800", desc:"Zystoskopie", type:"GOÄ" },
              { code:"GOÄ 1801", desc:"Zystoskopie mit Probenentnahme", type:"GOÄ" },
              { code:"EBM 32360", desc:"PSA-Bestimmung", type:"EBM" },
              { code:"GOÄ 255", desc:"Injektion subkutan/intramuskulär", type:"GOÄ" },
            ].map(c => (
              <div key={c.code} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50">
                <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{backgroundColor:c.type==="GOÄ" ? "rgba(124,58,237,0.1)" : "rgba(13,148,136,0.1)", color:c.type==="GOÄ" ? "#7c3aed" : "#0d9488"}}>{c.type}</span>
                <div>
                  <div className="font-semibold text-slate-700 text-sm">{c.code}</div>
                  <div className="text-xs text-slate-400">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
