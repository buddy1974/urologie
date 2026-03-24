import { useState } from "react";
import { Settings, Users, Link, Database, Bell, Shield, Save, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

const integrations = [
  { name:"Doctolib", status:"connected", desc:"Terminbuchung & Kalender synchronisiert", color:"#16a34a" },
  { name:"MediStar GDT Bridge", status:"connected", desc:"Patientendaten via GDT/LDT Import", color:"#16a34a" },
  { name:"Claude AI (Anthropic)", status:"connected", desc:"KI-Assistent aktiv", color:"#16a34a" },
  { name:"Twilio SMS", status:"connected", desc:"Patientenkommunikation aktiv", color:"#16a34a" },
  { name:"Resend Email", status:"connected", desc:"Transaktions-Emails aktiv", color:"#16a34a" },
  { name:"n8n Automation", status:"warning", desc:"2 von 14 Workflows aktiv", color:"#d97706" },
  { name:"Neon PostgreSQL", status:"connected", desc:"Datenbank verbunden", color:"#16a34a" },
  { name:"KIM (gematik TI)", status:"connected", desc:"Sichere Arzt-Kommunikation aktiv", color:"#16a34a" },
];

const roles = [
  { role:"Inhaber", desc:"Vollzugriff auf alle 16 Module", count:1, color:"#1E9FD4" },
  { role:"Arzt/Ärztin", desc:"Klinische Module + Patientenkartei", count:1, color:"#0d9488" },
  { role:"MFA", desc:"Rezeption, Labor, Formulare, Kommunikation", count:4, color:"#7c3aed" },
  { role:"Büro", desc:"Abrechnung, HR, Dokumente, Team", count:1, color:"#d97706" },
  { role:"Azubi", desc:"Lesezugriff + Trainingsmodule", count:2, color:"#94a3b8" },
];

export default function Einstellungen() {
  const [tab, setTab] = useState<"integrations"|"roles"|"backup">("integrations");
  const [saved, setSaved] = useState(false);
  const { user } = useAuthStore();

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Einstellungen</h1>
          <p className="text-slate-500 text-sm mt-0.5">System · Rollen · Integrationen · Backup</p>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all"
          style={{backgroundColor: saved ? "#16a34a" : "#1E9FD4"}}>
          {saved ? <><CheckCircle size={15} /> Gespeichert</> : <><Save size={15} /> Speichern</>}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {[["integrations","Integrationen"],["roles","Rollen & Berechtigungen"],["backup","Backup & Audit"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "integrations"|"roles"|"backup")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>

      {tab === "integrations" && (
        <div className="space-y-3">
          {integrations.map(int => (
            <div key={int.name} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{backgroundColor:int.status==="connected" ? "rgba(22,163,74,0.1)" : "rgba(217,119,6,0.1)"}}>
                <Link size={18} style={{color:int.color}} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800">{int.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{int.desc}</div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                style={{backgroundColor:int.status==="connected" ? "rgba(22,163,74,0.1)" : "rgba(217,119,6,0.1)", color:int.color}}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor:int.color}} />
                {int.status==="connected" ? "Verbunden" : "Teilweise"}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "roles" && (
        <div className="space-y-3">
          {roles.map(r => (
            <div key={r.role} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{backgroundColor:r.color}}>
                {r.role[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800">{r.role}</div>
                <div className="text-xs text-slate-400 mt-0.5">{r.desc}</div>
              </div>
              <div className="text-sm font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600">
                {r.count} {r.count===1 ? "Person" : "Personen"}
              </div>
            </div>
          ))}
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-4 text-center text-sm text-slate-400 hover:border-[#1E9FD4]/40 cursor-pointer transition-colors">
            + Neue Rolle erstellen
          </div>
        </div>
      )}

      {tab === "backup" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Backup Status</h3>
            <div className="space-y-3">
              {[
                { label:"Letztes automatisches Backup", value:"Heute 03:00 Uhr", status:"ok" },
                { label:"Backup-Intervall", value:"Täglich 03:00 Uhr", status:"ok" },
                { label:"Aufbewahrung", value:"90 Tage", status:"ok" },
                { label:"Recovery-Test", value:"Ausstehend (Q1 2026)", status:"warning" },
              ].map(b => (
                <div key={b.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-600">{b.label}</span>
                  <span className={cn("text-sm font-semibold", b.status==="ok" ? "text-green-600" : "text-amber-600")}>
                    {b.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-4">Letzter Audit-Log</h3>
            <div className="space-y-2 text-sm">
              {[
                { action:"Login", user:"Dr. Fomuki", time:"Heute 08:00" },
                { action:"Befund versendet", user:"Dr. Fomuki", time:"Heute 10:15" },
                { action:"Patient angelegt", user:"Theismann", time:"Heute 09:30" },
                { action:"Dokument signiert", user:"Dr. Fomuki", time:"Gestern 17:00" },
                { action:"KI-Assistent genutzt", user:"Dr. Fomuki", time:"Heute 14:21" },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{backgroundColor:"#1E9FD4"}} />
                  <span className="flex-1 text-slate-700">{log.action}</span>
                  <span className="text-slate-400 text-xs">{log.user}</span>
                  <span className="text-slate-300 text-xs">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
