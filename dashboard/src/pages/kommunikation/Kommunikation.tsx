import { useState } from "react";
import { MessageSquare, Send, Phone, Mail, Users, Bell, CheckCheck, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const messages = [
  { id:"1", patient:"Müller, Hans", channel:"sms", content:"Erinnerung: Ihr Termin morgen um 08:00 Uhr bei Dr. Fomuki. Bitte bringen Sie Ihre Krankenversicherungskarte mit.", date:"23.03.2026 09:00", status:"delivered", type:"reminder" },
  { id:"2", patient:"Papadopoulos, Dimitri", channel:"sms", content:"Ihr PSA-Wert liegt vor. Bitte kontaktieren Sie uns für ein Gespräch: 02631-23351", date:"23.03.2026 10:15", status:"delivered", type:"result" },
  { id:"3", patient:"Weber, Klaus", channel:"email", content:"Ihre Befunde sind in Ihrem Patientenportal verfügbar. Bitte loggen Sie sich ein.", date:"23.03.2026 10:30", status:"delivered", type:"result" },
  { id:"4", patient:"Schmidt, Thomas", channel:"sms", content:"Bitte denken Sie an Ihre Spermiogramm-Kontrolle in 3 Monaten (Juni 2026).", date:"23.03.2026 11:00", status:"pending", type:"recall" },
  { id:"5", patient:"Hoffmann, Peter", channel:"email", content:"Nachsorgebrief UroLift-Behandlung im Anhang.", date:"22.03.2026 15:00", status:"delivered", type:"letter" },
  { id:"6", patient:"Alle Patienten", channel:"broadcast", content:"Unsere Praxis ist am 07.04.2026 (Ostermontag) geschlossen.", date:"21.03.2026 08:00", status:"delivered", type:"broadcast" },
];

const channelCfg = {
  sms:       { label:"SMS",       color:"#16a34a", bg:"rgba(22,163,74,0.1)",   icon:Phone },
  email:     { label:"E-Mail",    color:"#1E9FD4", bg:"rgba(30,159,212,0.1)", icon:Mail },
  broadcast: { label:"Broadcast", color:"#7c3aed", bg:"rgba(124,58,237,0.1)", icon:Users },
};

const typeCfg = {
  reminder:  { label:"Erinnerung",  color:"#1E9FD4" },
  result:    { label:"Befund",      color:"#d97706" },
  recall:    { label:"Recall",      color:"#7c3aed" },
  letter:    { label:"Arztbrief",   color:"#0d9488" },
  broadcast: { label:"Broadcast",   color:"#dc2626" },
};

const templates = [
  { title:"Terminerinnerung",  desc:"24h vor Termin automatisch" },
  { title:"Befund verfügbar",  desc:"Bei neuem Laborergebnis" },
  { title:"PSA-Recall",        desc:"Nach 6 oder 12 Monaten" },
  { title:"Vasektomie-Check",  desc:"3 Monate nach Eingriff" },
  { title:"Praxis geschlossen", desc:"Feiertage & Urlaub" },
];

export default function Kommunikation() {
  const [tab, setTab] = useState<"messages"|"templates">("messages");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kommunikation</h1>
          <p className="text-slate-500 text-sm mt-0.5">SMS · E-Mail · Recall-Kampagnen</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:"#1E9FD4"}}>
          <Plus size={15} /> Neue Nachricht
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Versendet heute", value:"6", color:"#1E9FD4" },
          { label:"Ausstehend", value:"1", color:"#d97706" },
          { label:"Recall aktiv", value:"3", color:"#7c3aed" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {[["messages","Nachrichten"],["templates","Vorlagen & Automationen"]].map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key as "messages"|"templates")}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              tab===key ? "text-white" : "bg-white border border-slate-200 text-slate-500")}
            style={tab===key ? {backgroundColor:"#1E9FD4"} : {}}>
            {label}
          </button>
        ))}
      </div>

      {tab === "messages" && (
        <div className="space-y-2">
          {messages.map(msg => {
            const ch = channelCfg[msg.channel as keyof typeof channelCfg];
            const tp = typeCfg[msg.type as keyof typeof typeCfg];
            const ChIcon = ch.icon;
            return (
              <div key={msg.id} className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:ch.bg}}>
                    <ChIcon size={16} style={{color:ch.color}} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-slate-800 text-sm">{msg.patient}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{backgroundColor:ch.bg, color:ch.color}}>{ch.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100" style={{color:tp.color}}>{tp.label}</span>
                      <span className="text-xs text-slate-400 ml-auto">{msg.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{msg.content}</p>
                  </div>
                  <div className={cn("flex-shrink-0 mt-1", msg.status==="delivered" ? "text-green-500" : "text-slate-300")}>
                    {msg.status === "delivered" ? <CheckCheck size={16} /> : <Clock size={16} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.title} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-[#1E9FD4]/30 hover:shadow-md transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{backgroundColor:"rgba(30,159,212,0.08)"}}>
                <Bell size={18} style={{color:"#1E9FD4"}} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{t.title}</h3>
              <p className="text-xs text-slate-400">{t.desc}</p>
              <div className="mt-3 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Aktiv</span>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-5 hover:border-[#1E9FD4]/50 transition-all cursor-pointer flex items-center justify-center">
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
