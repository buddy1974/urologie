import { useState } from "react";
import {
  Calendar, User, Phone, Plus, Search,
  CheckCircle, XCircle, AlertCircle, Circle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AppointmentStatus = "scheduled" | "arrived" | "in-progress" | "done" | "no-show";

interface Appointment {
  id: string;
  time: string;
  duration: number;
  patient: string;
  type: string;
  doctor: string;
  status: AppointmentStatus;
  phone: string;
  insurance: "GKV" | "PKV" | "Selbstzahler";
  room?: string;
}

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", time: "08:00", duration: 30, patient: "Hans Müller", type: "Erstvorstellung", doctor: "Dr. Fomuki", status: "done", phone: "0172-1234567", insurance: "GKV", room: "1" },
  { id: "2", time: "08:30", duration: 15, patient: "Klaus Weber", type: "PSA-Kontrolle", doctor: "Dr. Fomuki", status: "done", phone: "0163-2345678", insurance: "PKV", room: "1" },
  { id: "3", time: "09:00", duration: 30, patient: "Thomas Schmidt", type: "Vasektomie-Beratung", doctor: "Dr. Fomuki", status: "in-progress", phone: "0151-3456789", insurance: "GKV", room: "2" },
  { id: "4", time: "09:30", duration: 20, patient: "Mehmet Yilmaz", type: "Kontrolltermin", doctor: "Dr. Nwankwo", status: "arrived", phone: "0176-4567890", insurance: "GKV", room: "3" },
  { id: "5", time: "10:00", duration: 30, patient: "Peter Hoffmann", type: "UroLift Nachsorge", doctor: "Dr. Fomuki", status: "scheduled", phone: "0170-5678901", insurance: "PKV" },
  { id: "6", time: "10:30", duration: 15, patient: "Andreas Klein", type: "Laborergebnis", doctor: "Dr. Nwankwo", status: "scheduled", phone: "0152-6789012", insurance: "GKV" },
  { id: "7", time: "11:00", duration: 30, patient: "Stefan Wagner", type: "Andrologie", doctor: "Dr. Fomuki", status: "scheduled", phone: "0178-7890123", insurance: "Selbstzahler" },
  { id: "8", time: "11:30", duration: 20, patient: "Frank Becker", type: "Vorsorge Mann", doctor: "Dr. Nwankwo", status: "scheduled", phone: "0164-8901234", insurance: "GKV" },
  { id: "9", time: "14:00", duration: 30, patient: "Jürgen Fischer", type: "Zystoskopie", doctor: "Dr. Fomuki", status: "scheduled", phone: "0172-9012345", insurance: "PKV" },
  { id: "10", time: "14:30", duration: 15, patient: "Martin Schulz", type: "Kontrolltermin", doctor: "Dr. Fomuki", status: "no-show", phone: "0163-0123456", insurance: "GKV" },
  { id: "11", time: "15:00", duration: 30, patient: "Dimitri Papadopoulos", type: "Prostatabiopsie", doctor: "Dr. Fomuki", status: "scheduled", phone: "0151-1234560", insurance: "GKV" },
  { id: "12", time: "15:30", duration: 20, patient: "Robert Zimmermann", type: "Magnetstimulation", doctor: "Dr. Nwankwo", status: "scheduled", phone: "0176-2345601", insurance: "PKV" },
];

const statusConfig: Record<AppointmentStatus, { label: string; color: string; bg: string; icon: typeof Circle }> = {
  scheduled: { label: "Geplant", color: "#64748b", bg: "rgba(100,116,139,0.1)", icon: Circle },
  arrived: { label: "Anwesend", color: "#1E9FD4", bg: "rgba(30,159,212,0.1)", icon: CheckCircle },
  "in-progress": { label: "In Behandlung", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: AlertCircle },
  done: { label: "Fertig", color: "#16a34a", bg: "rgba(22,163,74,0.1)", icon: CheckCircle },
  "no-show": { label: "Nicht erschienen", color: "#dc2626", bg: "rgba(220,38,38,0.1)", icon: XCircle },
};

const insuranceColors: Record<string, string> = {
  GKV: "#0d9488",
  PKV: "#7c3aed",
  Selbstzahler: "#d97706",
};

const days = ["Mo 23", "Di 24", "Mi 25", "Do 26", "Fr 27"];

export default function Terminplan() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");

  const filtered = MOCK_APPOINTMENTS.filter((a) => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const statusCounts = {
    done: MOCK_APPOINTMENTS.filter((a) => a.status === "done").length,
    "in-progress": MOCK_APPOINTMENTS.filter((a) => a.status === "in-progress").length,
    arrived: MOCK_APPOINTMENTS.filter((a) => a.status === "arrived").length,
    "no-show": MOCK_APPOINTMENTS.filter((a) => a.status === "no-show").length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Terminplan</h1>
          <p className="text-slate-500 text-sm mt-0.5">Montag, 23. März 2026 · 12 Termine</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-colors"
          style={{ backgroundColor: "#1E9FD4" }}>
          <Plus size={16} />
          Neuer Termin
        </button>
      </div>

      {/* Day selector */}
      <div className="flex items-center gap-2 mb-6">
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <ChevronLeft size={16} className="text-slate-400" />
        </button>
        <div className="flex gap-2">
          {days.map((day, i) => (
            <button key={day} onClick={() => setSelectedDay(i)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
                selectedDay === i ? "text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              )}
              style={selectedDay === i ? { backgroundColor: "#1E9FD4" } : {}}>
              {day}
            </button>
          ))}
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(Object.entries(statusCounts) as [AppointmentStatus, number][]).map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <button key={status} onClick={() => setFilter(filter === status ? "all" : status)}
              className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                filter === status ? "border-current" : "border-slate-100 bg-white hover:border-slate-200"
              )}
              style={filter === status ? { backgroundColor: cfg.bg, borderColor: cfg.color } : {}}>
              <Icon size={18} style={{ color: cfg.color }} />
              <div>
                <div className="text-lg font-bold" style={{ color: cfg.color }}>{count}</div>
                <div className="text-xs text-slate-500">{cfg.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Patient oder Terminart suchen..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#1E9FD4] transition-colors bg-white"
        />
      </div>

      {/* Appointments list */}
      <div className="space-y-2">
        {filtered.map((apt) => {
          const cfg = statusConfig[apt.status];
          const Icon = cfg.icon;
          return (
            <div key={apt.id}
              className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all overflow-hidden">
              <div className="flex items-center gap-4 p-4">

                {/* Time */}
                <div className="text-center w-14 flex-shrink-0">
                  <div className="text-sm font-bold text-slate-800">{apt.time}</div>
                  <div className="text-xs text-slate-400">{apt.duration} Min.</div>
                </div>

                {/* Color bar */}
                <div className="w-1 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cfg.color }} />

                {/* Patient info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-slate-800 text-sm">{apt.patient}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${insuranceColors[apt.insurance]}15`, color: insuranceColors[apt.insurance] }}>
                      {apt.insurance}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {apt.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={11} />
                      {apt.doctor}
                    </span>
                    {apt.room && (
                      <span className="flex items-center gap-1">
                        Zimmer {apt.room}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
                  <Phone size={12} />
                  {apt.phone}
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                  <Icon size={13} />
                  {cfg.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p>Keine Termine gefunden</p>
        </div>
      )}
    </div>
  );
}
