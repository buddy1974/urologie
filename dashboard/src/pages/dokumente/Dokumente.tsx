import { useState } from "react";
import { FolderOpen, FileText, File, Search, Upload, Eye, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface Doc {
  id: string;
  name: string;
  type: "arztbrief" | "befund" | "konsent" | "ueberweisung" | "formular";
  patient: string;
  date: string;
  size: string;
  signed: boolean;
}

const DOCS: Doc[] = [
  { id:"1", name:"Arztbrief Müller Hans - BPH", type:"arztbrief", patient:"Müller, Hans", date:"23.03.2026", size:"124 KB", signed:true },
  { id:"2", name:"PSA-Befund Weber Klaus", type:"befund", patient:"Weber, Klaus", date:"23.03.2026", size:"89 KB", signed:true },
  { id:"3", name:"UroLift Einwilligung Hoffmann", type:"konsent", patient:"Hoffmann, Peter", date:"22.03.2026", size:"210 KB", signed:true },
  { id:"4", name:"Überweisung Radiologie Papadopoulos", type:"ueberweisung", patient:"Papadopoulos, Dimitri", date:"23.03.2026", size:"45 KB", signed:false },
  { id:"5", name:"Vasektomie Aufklärung Schmidt", type:"konsent", patient:"Schmidt, Thomas", date:"23.03.2026", size:"180 KB", signed:false },
  { id:"6", name:"Anamnese Wagner Stefan", type:"formular", patient:"Wagner, Stefan", date:"23.03.2026", size:"67 KB", signed:true },
  { id:"7", name:"Arztbrief Fischer Blasenkrebs NachsorgE", type:"arztbrief", patient:"Fischer, Jürgen", date:"20.03.2026", size:"156 KB", signed:true },
  { id:"8", name:"Labor Befund Klein Andreas", type:"befund", patient:"Klein, Andreas", date:"22.03.2026", size:"92 KB", signed:true },
];

const typeConfig = {
  arztbrief:    { label:"Arztbrief",     color:"#1E9FD4", bg:"rgba(30,159,212,0.08)" },
  befund:       { label:"Befund",        color:"#16a34a", bg:"rgba(22,163,74,0.08)" },
  konsent:      { label:"Einwilligung",  color:"#7c3aed", bg:"rgba(124,58,237,0.08)" },
  ueberweisung: { label:"Überweisung",   color:"#d97706", bg:"rgba(217,119,6,0.08)" },
  formular:     { label:"Formular",      color:"#0891b2", bg:"rgba(8,145,178,0.08)" },
};

export default function Dokumente() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = DOCS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.patient.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dokumente</h1>
          <p className="text-slate-500 text-sm mt-0.5">{DOCS.length} Dokumente · DSGVO-konform verschlüsselt</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Upload size={15} /> Hochladen
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Dokument oder Patient suchen..."
            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#1E9FD4] bg-white" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["all", ...Object.keys(typeConfig)].map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className={cn("px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                filter===f ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
              style={filter===f ? {backgroundColor:"#1E9FD4"} : {}}>
              {f==="all" ? "Alle" : typeConfig[f as keyof typeof typeConfig]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-50">
          <div className="col-span-5">Dokument</div>
          <div className="col-span-2">Patient</div>
          <div className="col-span-1">Typ</div>
          <div className="col-span-1">Datum</div>
          <div className="col-span-1">Größe</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Aktionen</div>
        </div>
        {filtered.map((doc, i) => {
          const cfg = typeConfig[doc.type];
          return (
            <div key={doc.id} className={cn("grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-slate-50 transition-colors text-sm",
              i < filtered.length-1 && "border-b border-slate-50")}>
              <div className="col-span-5 flex items-center gap-3">
                <FileText size={16} style={{color:cfg.color, flexShrink:0}} />
                <span className="font-medium text-slate-700 truncate">{doc.name}</span>
              </div>
              <div className="col-span-2 text-slate-500 text-xs truncate">{doc.patient}</div>
              <div className="col-span-1">
                <span className="text-xs px-2 py-1 rounded-lg font-medium" style={{backgroundColor:cfg.bg, color:cfg.color}}>{cfg.label}</span>
              </div>
              <div className="col-span-1 text-slate-400 text-xs">{doc.date}</div>
              <div className="col-span-1 text-slate-400 text-xs">{doc.size}</div>
              <div className="col-span-1">
                <span className={cn("text-xs px-2 py-1 rounded-lg font-medium",
                  doc.signed ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600")}>
                  {doc.signed ? "Signiert" : "Ausstehend"}
                </span>
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"><Eye size={13} className="text-slate-400" /></button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"><Download size={13} className="text-slate-400" /></button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((doc) => {
          const cfg = typeConfig[doc.type];
          return (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-100 p-4">
              <div className="flex items-start gap-3 mb-3">
                <FileText size={18} style={{color:cfg.color, flexShrink:0}} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm leading-tight mb-0.5">{doc.name}</p>
                  <p className="text-xs text-slate-400">{doc.patient} · {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-lg font-medium" style={{backgroundColor:cfg.bg, color:cfg.color}}>{cfg.label}</span>
                  <span className={cn("text-xs px-2 py-1 rounded-lg font-medium",
                    doc.signed ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600")}>
                    {doc.signed ? "Signiert" : "Ausstehend"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Eye size={15} className="text-slate-400" /></button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Download size={15} className="text-slate-400" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
