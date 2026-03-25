import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Users, Bot, FlaskConical,
  FolderOpen, CreditCard, MessageSquare, UserCheck, ClipboardCheck,
  FileText, Video, BarChart3, Briefcase, Shield, Settings,
  LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

const modules = [
  { id: "overview", label: "Übersicht", icon: LayoutDashboard, href: "/", roles: ["inhaber", "arzt", "mfa", "buero"] },
  { id: "terminplan", label: "Terminplan", icon: Calendar, href: "/terminplan", roles: ["inhaber", "arzt", "mfa", "buero"] },
  { id: "patienten", label: "Patienten", icon: Users, href: "/patienten", roles: ["inhaber", "arzt", "mfa"] },
  { id: "ki", label: "KI-Assistent", icon: Bot, href: "/ki-assistent", roles: ["inhaber", "arzt"] },
  { id: "labor", label: "Labor & Befunde", icon: FlaskConical, href: "/labor", roles: ["inhaber", "arzt", "mfa"] },
  { id: "dokumente", label: "Dokumente", icon: FolderOpen, href: "/dokumente", roles: ["inhaber", "arzt", "mfa", "buero"] },
  { id: "abrechnung", label: "Abrechnung", icon: CreditCard, href: "/abrechnung", roles: ["inhaber", "buero"] },
  { id: "kommunikation", label: "Kommunikation", icon: MessageSquare, href: "/kommunikation", roles: ["inhaber", "arzt", "mfa", "buero"] },
  { id: "team", label: "Team & Dienst", icon: UserCheck, href: "/team", roles: ["inhaber", "buero"] },
  { id: "qm", label: "Qualität (QM)", icon: ClipboardCheck, href: "/qm", roles: ["inhaber", "mfa"] },
  { id: "formulare", label: "Formulare", icon: FileText, href: "/formulare", roles: ["inhaber", "arzt", "mfa"] },
  { id: "video", label: "Videosprechstunde", icon: Video, href: "/video", roles: ["inhaber", "arzt"] },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics", roles: ["inhaber"] },
  { id: "hr", label: "Stellen & HR", icon: Briefcase, href: "/hr", roles: ["inhaber", "buero"] },
  { id: "compliance", label: "Compliance", icon: Shield, href: "/compliance", roles: ["inhaber"] },
  { id: "einstellungen", label: "Einstellungen", icon: Settings, href: "/einstellungen", roles: ["inhaber"] },
];

const roleColors: Record<string, string> = {
  inhaber: "#1E9FD4",
  arzt: "#14b8a6",
  mfa: "#8b5cf6",
  buero: "#f59e0b",
  azubi: "#94a3b8",
};

const roleLabels: Record<string, string> = {
  inhaber: "Inhaber",
  arzt: "Ärztin/Arzt",
  mfa: "MFA",
  buero: "Büro",
  azubi: "Azubi",
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const visibleModules = modules.filter(
    (m) => user && m.roles.includes(user.role)
  );

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
      style={{ backgroundColor: "#1A202C", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#1E9FD4" }}>
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-sm leading-tight truncate">PraxisOS</div>
              <div className="text-xs truncate" style={{ color: "#5ECFEB" }}>Urologie Neuwied</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: "#64748b" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#64748b"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visibleModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <NavLink
              key={mod.id}
              to={mod.href}
              end={mod.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                )
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(30,159,212,0.15)" : "transparent",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (!el.classList.contains("active")) {
                  el.style.backgroundColor = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                if (!el.classList.contains("active")) {
                  el.style.backgroundColor = "transparent";
                }
              }}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{mod.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="flex-shrink-0 p-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl mb-2"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
              style={{ backgroundColor: roleColors[user.role] ?? "#1E9FD4" }}>
              {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">{user.name}</div>
              <div className="text-xs" style={{ color: roleColors[user.role] ?? "#1E9FD4" }}>
                {roleLabels[user.role] ?? user.role}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm transition-colors",
            collapsed ? "justify-center" : ""
          )}
          style={{ color: "#64748b" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <LogOut size={16} />
          {!collapsed && <span>Abmelden</span>}
        </button>
        {!collapsed && (
          <div className="text-center mt-2 text-xs" style={{ color: "#334155" }}>
            © 2026 Urologie Neuwied · <a href="https://maxpromo.digital" target="_blank" rel="noopener noreferrer" style={{ color: "#5ECFEB" }}>maxpromo.digital</a>
          </div>
        )}
      </div>
    </aside>
  );
}
