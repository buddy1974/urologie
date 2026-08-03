import { Shield, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

type Status = "erfüllt" | "ausstehend" | "progress";

interface ChecklistItem {
  label: string;
  status: Status;
  detail?: string;
  url?: string;
}

const avvItems: ChecklistItem[] = [
  { label: "AVV mit Vercel Inc. (USA) — Website-Hosting", status: "ausstehend", url: "https://vercel.com/legal/dpa" },
  { label: "AVV mit Neon Inc. (USA) — Datenbankhosting", status: "ausstehend", url: "https://neon.tech/dpa" },
  { label: "AVV mit Render Services Inc. (USA) — Backend-API", status: "ausstehend", url: "https://render.com/privacy" },
  { label: "AVV mit Anthropic PBC (USA) — KI-Assistent", status: "ausstehend", url: "https://anthropic.com/legal/dpa" },
  { label: "AVV mit seven communications GmbH — SMS-OTP", status: "ausstehend", url: "https://www.seven.io/de/avv/" },
];

const tomItems: ChecklistItem[] = [
  { label: "TLS 1.3 Verschlüsselung", status: "erfüllt", detail: "aktiv" },
  { label: "Rollenbasierter Zugriff (RBAC)", status: "erfüllt", detail: "implementiert" },
  { label: "Audit-Log", status: "erfüllt", detail: "aktiv" },
  { label: "Datenbankzugriff nur über verschlüsselte Verbindung", status: "erfüllt", detail: "aktiv" },
  { label: "Zwei-Faktor-Authentifizierung (Patientenportal)", status: "erfüllt", detail: "implementiert" },
  { label: "Befund-Freigabe-Workflow", status: "progress", detail: "in Implementierung" },
  { label: "DSFA (Datenschutz-Folgenabschätzung)", status: "ausstehend", detail: "vor Portal-Launch erforderlich" },
  { label: "Mitarbeiterschulung KI-Nutzung (EU AI Act)", status: "ausstehend" },
];

const portalItems: ChecklistItem[] = [
  { label: "AVV alle Dienstleister", status: "ausstehend" },
  { label: "DSFA erstellen", status: "ausstehend" },
  { label: "Befund-Freigabe aktiv", status: "progress", detail: "in Implementierung" },
  { label: "Datenschutzerklärung aktualisiert", status: "erfüllt", detail: "diese Version" },
  { label: "Impressum vollständig", status: "erfüllt" },
];

const kbvItems: ChecklistItem[] = [
  { label: "Zugriffsprotokollierung (Audit-Log)", status: "erfüllt", detail: "aktiv" },
  { label: "Verschlüsselung aller Verbindungen", status: "erfüllt", detail: "aktiv" },
  { label: "Rollenbasierter Zugriff", status: "erfüllt", detail: "implementiert" },
  { label: "Tägliches Backup-Protokoll", status: "ausstehend" },
  { label: "Incident-Response-Plan", status: "ausstehend" },
];

const statusCfg: Record<Status, { icon: typeof CheckCircle; color: string; bg: string; label: string }> = {
  "erfüllt":    { icon: CheckCircle, color: "#16a34a", bg: "rgba(22,163,74,0.1)", label: "Erfüllt" },
  "ausstehend": { icon: AlertCircle, color: "#d97706", bg: "rgba(217,119,6,0.1)", label: "Ausstehend" },
  "progress":   { icon: AlertCircle, color: "#2563eb", bg: "rgba(37,99,235,0.1)", label: "In Umsetzung" },
};

function Row({ item }: { item: ChecklistItem }) {
  const cfg = statusCfg[item.status];
  const Icon = cfg.icon;
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3 hover:shadow-sm transition-all">
      <Icon size={18} style={{ color: cfg.color }} className="flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
        {item.detail && <div className="text-xs text-slate-400 mt-0.5">{item.detail}</div>}
      </div>
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold flex-shrink-0 text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2d5a71" }}
        >
          AVV abschließen
          <ExternalLink size={12} />
        </a>
      )}
      <span className="text-xs px-2.5 py-1 rounded-lg font-semibold flex-shrink-0" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  );
}

function Section({ title, items }: { title: string; items: ChecklistItem[] }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <Row key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Compliance() {
  const allItems = [...avvItems, ...tomItems, ...portalItems, ...kbvItems];
  const erfuelltCount = allItems.filter((i) => i.status === "erfüllt").length;
  const ausstehendCount = allItems.filter((i) => i.status === "ausstehend" || i.status === "progress").length;
  const kritischCount = 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance & Datenschutz</h1>
          <p className="text-slate-500 text-sm mt-0.5">DSGVO · KBV IT-Sicherheitsrichtlinie · Stand: August 2026</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: "rgba(217,119,6,0.1)", color: "#d97706" }}>
          <Shield size={16} />
          Vor Portal-Launch: {ausstehendCount} Punkte offen
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Punkte erfüllt", value: erfuelltCount, color: "#16a34a", bg: "rgba(22,163,74,0.08)" },
          { label: "Punkte ausstehend", value: ausstehendCount, color: "#d97706", bg: "rgba(217,119,6,0.08)" },
          { label: "Kritische Punkte", value: kritischCount, color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 border border-slate-100" style={{ backgroundColor: s.bg }}>
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      <Section title="DSGVO — Auftragsverarbeitungsverträge (AVV)" items={avvItems} />
      <Section title="DSGVO — Technische Maßnahmen (TOMs)" items={tomItems} />
      <Section title="Patientenportal — Vor Launch erforderlich" items={portalItems} />
      <Section title="KBV IT-Sicherheitsrichtlinie" items={kbvItems} />
    </div>
  );
}
