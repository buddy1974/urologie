import { useAuthStore } from "@/store/auth";
import {
  Calendar, Users, CreditCard, Bot, FlaskConical,
  FolderOpen, MessageSquare, UserCheck, ClipboardCheck,
  FileText, Video, BarChart3, Briefcase, Shield, Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  { label: "Terminplan", icon: Calendar, href: "/terminplan", color: "#1E9FD4", desc: "Doctolib-Sync · Warteraum" },
  { label: "Patienten", icon: Users, href: "/patienten", color: "#0d9488", desc: "Kartei · Anamnese" },
  { label: "KI-Assistent", icon: Bot, href: "/ki-assistent", color: "#7c3aed", desc: "Claude AI · Arztbriefe" },
  { label: "Labor & Befunde", icon: FlaskConical, href: "/labor", color: "#d97706", desc: "LDT Import · PSA-Trends" },
  { label: "Dokumente", icon: FolderOpen, href: "/dokumente", color: "#16a34a", desc: "DSGVO · e-Signatur" },
  { label: "Abrechnung", icon: CreditCard, href: "/abrechnung", color: "#dc2626", desc: "GOÄ · EBM · IGeL" },
  { label: "Kommunikation", icon: MessageSquare, href: "/kommunikation", color: "#0284c7", desc: "SMS · Email · Recall" },
  { label: "Team & Dienst", icon: UserCheck, href: "/team", color: "#059669", desc: "Dienstplan · Urlaub" },
  { label: "QM", icon: ClipboardCheck, href: "/qm", color: "#ea580c", desc: "KBV QEP · Hygiene" },
  { label: "Formulare", icon: FileText, href: "/formulare", color: "#8b5cf6", desc: "Anamnese · Konsent" },
  { label: "Video", icon: Video, href: "/video", color: "#0891b2", desc: "Videosprechstunde" },
  { label: "Analytics", icon: BarChart3, href: "/analytics", color: "#1E9FD4", desc: "KPIs · Statistiken" },
  { label: "HR", icon: Briefcase, href: "/hr", color: "#7c3aed", desc: "Stellen · Bewerbungen" },
  { label: "Compliance", icon: Shield, href: "/compliance", color: "#dc2626", desc: "DSGVO · BSI" },
  { label: "Einstellungen", icon: Settings, href: "/einstellungen", color: "#475569", desc: "Rollen · API · Backup" },
];

const stats = [
  { label: "Termine heute", value: "12", sub: "3 noch offen", color: "#1E9FD4" },
  { label: "Patienten heute", value: "9", sub: "2 in Behandlung", color: "#0d9488" },
  { label: "Offene Befunde", value: "4", sub: "Laborergebnisse", color: "#d97706" },
  { label: "Nachrichten", value: "2", sub: "Ungelesen", color: "#7c3aed" },
];

export default function Overview() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">
          Guten Tag, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Willkommen im PraxisOS — Urologie Neuwied
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
        {stats.map((stat) => (
          <div key={stat.label}
            className="bg-white rounded-2xl p-3 lg:p-5 border border-slate-100 shadow-sm">
            <div className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs lg:text-sm font-semibold text-slate-700">{stat.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <h2 className="text-xs lg:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 lg:mb-4">
        Alle Module
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.label}
              onClick={() => navigate(mod.href)}
              className="group bg-white rounded-2xl p-3 lg:p-4 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all text-left"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center mb-2 lg:mb-3"
                style={{ backgroundColor: `${mod.color}15` }}>
                <Icon size={16} className="lg:hidden" style={{ color: mod.color }} />
                <Icon size={20} className="hidden lg:block" style={{ color: mod.color }} />
              </div>
              <div className="text-xs lg:text-sm font-semibold text-slate-800 group-hover:text-slate-900 leading-tight mb-0.5 lg:mb-1">
                {mod.label}
              </div>
              <div className="text-xs text-slate-400 leading-tight hidden sm:block">{mod.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
