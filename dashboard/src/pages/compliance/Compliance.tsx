import { Shield, CheckCircle, AlertCircle, XCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { category:"DSGVO", law:"Art. 30 Verarbeitungsverzeichnis", status:"ok", detail:"Zuletzt aktualisiert: 01.03.2026" },
  { category:"DSGVO", law:"Auftragsverarbeitungsverträge (AVV)", status:"ok", detail:"Doctolib, Anthropic, Twilio — alle unterzeichnet" },
  { category:"DSGVO", law:"Datenschutzbeauftragter", status:"ok", detail:"Dr. Fomuki als verantwortliche Person benannt" },
  { category:"DSGVO", law:"Einwilligungs-Audit-Log", status:"ok", detail:"Automatisch erfasst via PraxisOS" },
  { category:"DSGVO", law:"72h Meldepflicht bei Datenpanne", status:"ok", detail:"Prozess dokumentiert" },
  { category:"BSI", law:"Zugangskontrolle (RBAC)", status:"ok", detail:"Rollen: Inhaber, Arzt, MFA, Büro, Azubi" },
  { category:"BSI", law:"Verschlüsselung (AES-256 at rest)", status:"ok", detail:"Neon DB + Supabase Storage" },
  { category:"BSI", law:"TLS 1.3 in transit", status:"ok", detail:"Vercel + Cloudflare" },
  { category:"BSI", law:"Backup & Recovery Plan", status:"warning", detail:"Backup täglich — Recovery-Test ausstehend" },
  { category:"BSI", law:"Incident Response Dokumentation", status:"ok", detail:"Verfahren dokumentiert" },
  { category:"KBV", law:"IT-Sicherheitsrichtlinie KBV", status:"warning", detail:"Jährliche Überprüfung fällig: 01.04.2026" },
  { category:"KBV", law:"TI-Connector gematik", status:"ok", detail:"Aktiv via MediStar" },
  { category:"KBV", law:"ePA / eAU / eRezept", status:"ok", detail:"Aktiv via MediStar" },
  { category:"MBO", law:"KI nur unterstützend (§10 MBO-Ä)", status:"ok", detail:"Alle KI-Vorschläge erfordern Arztfreigabe" },
  { category:"MPG", law:"UroLift Gerätewartungsprotokoll", status:"ok", detail:"Zuletzt: 01.03.2026" },
  { category:"MPG", law:"Magnetstimulator Wartungsprotokoll", status:"warning", detail:"Nächste Wartung fällig: 01.04.2026" },
];

const statusCfg = {
  ok:      { icon:CheckCircle, color:"#16a34a", bg:"rgba(22,163,74,0.1)",    label:"Konform" },
  warning: { icon:AlertCircle, color:"#d97706", bg:"rgba(217,119,6,0.1)",    label:"Prüfen" },
  fail:    { icon:XCircle,     color:"#dc2626", bg:"rgba(220,38,38,0.1)",    label:"Kritisch" },
};

const categories = [...new Set(items.map(i => i.category))];

export default function Compliance() {
  const okCount = items.filter(i=>i.status==="ok").length;
  const warnCount = items.filter(i=>i.status==="warning").length;
  const failCount = items.filter(i=>i.status==="fail").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance & Datenschutz</h1>
          <p className="text-slate-500 text-sm mt-0.5">DSGVO · BSI · KBV · MBO-Ä · MPG</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{backgroundColor:"rgba(22,163,74,0.1)", color:"#16a34a"}}>
          <Shield size={16} />
          {Math.round((okCount/items.length)*100)}% Konform
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Konform", value:okCount, color:"#16a34a", bg:"rgba(22,163,74,0.08)" },
          { label:"Prüfung nötig", value:warnCount, color:"#d97706", bg:"rgba(217,119,6,0.08)" },
          { label:"Kritisch", value:failCount, color:"#dc2626", bg:"rgba(220,38,38,0.08)" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 border border-slate-100" style={{backgroundColor:s.bg}}>
            <div className="text-3xl font-bold mb-1" style={{color:s.color}}>{s.value}</div>
            <div className="text-sm text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      {categories.map(cat => (
        <div key={cat} className="mb-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">{cat}</h3>
          <div className="space-y-2">
            {items.filter(i=>i.category===cat).map(item => {
              const cfg = statusCfg[item.status as keyof typeof statusCfg];
              const Icon = cfg.icon;
              return (
                <div key={item.law} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3 hover:shadow-sm transition-all">
                  <Icon size={18} style={{color:cfg.color}} className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 text-sm">{item.law}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.detail}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg font-semibold flex-shrink-0" style={{backgroundColor:cfg.bg, color:cfg.color}}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
