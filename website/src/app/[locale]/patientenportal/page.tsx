"use client";

import { useState } from "react";
import { User, Calendar, FlaskConical, LogOut, Lock, ChevronRight, AlertCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://urologie-backend.onrender.com";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  insurance: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  conditions: string[] | null;
  doctor: string | null;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: string;
  room: string | null;
}

interface LabResult {
  id: string;
  test: string;
  value: string;
  unit: string | null;
  refMin: string | null;
  refMax: string | null;
  status: string;
  resultDate: string;
}

type Tab = "termine" | "labor" | "profil";

const statusLabel: Record<string, string> = {
  scheduled: "Geplant",
  confirmed: "Bestätigt",
  completed: "Abgeschlossen",
  cancelled: "Abgesagt",
  "no-show": "Nicht erschienen",
};

const statusColor: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-600",
  "no-show": "bg-orange-100 text-orange-600",
};

const labStatusColor: Record<string, string> = {
  normal: "bg-green-100 text-green-700",
  high: "bg-red-100 text-red-700",
  low: "bg-orange-100 text-orange-700",
  critical: "bg-red-200 text-red-800",
};

export default function PatientenportalPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("termine");

  // Login form state
  const [birthDate, setBirthDate] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/patients/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, insuranceNumber }),
      });

      if (!res.ok) {
        setLoginError("Geburtsdatum oder Versicherungsnummer nicht gefunden.");
        setLoginLoading(false);
        return;
      }

      const data = await res.json();
      setPatient(data.patient);

      // Fetch appointments and lab results filtered by patientId
      const pid = data.patient.id;
      const [apptRes, labRes] = await Promise.all([
        fetch(`${API_BASE}/api/appointments?patientId=${encodeURIComponent(pid)}`),
        fetch(`${API_BASE}/api/lab?patientId=${encodeURIComponent(pid)}`),
      ]);

      setAppointments(apptRes.ok ? await apptRes.json() : []);
      setLabResults(labRes.ok ? await labRes.json() : []);
    } catch {
      setLoginError("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es erneut.");
    }

    setLoginLoading(false);
  }

  function handleLogout() {
    setPatient(null);
    setAppointments([]);
    setLabResults([]);
    setBirthDate("");
    setInsuranceNumber("");
    setLoginError("");
    setActiveTab("termine");
  }

  // ── STATE 1: Login ──────────────────────────────────────────────
  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(30,159,212,0.2)" }}>
              <Lock size={28} style={{ color: "#1E9FD4" }} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Patientenportal</h1>
            <p className="text-slate-400 text-sm">Urologie Neuwied — sicherer Zugang</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-lg font-bold text-[#2D3748] mb-1">Anmelden</h2>
            <p className="text-slate-500 text-sm mb-6">
              Bitte geben Sie Ihr Geburtsdatum und Ihre Versicherungsnummer ein.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Geburtsdatum
                </label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{ "--tw-ring-color": "#1E9FD4" } as React.CSSProperties}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Versicherungsnummer
                </label>
                <input
                  type="text"
                  required
                  placeholder="z. B. A123456789"
                  value={insuranceNumber}
                  onChange={(e) => setInsuranceNumber(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:border-transparent text-sm uppercase"
                  style={{ "--tw-ring-color": "#1E9FD4" } as React.CSSProperties}
                />
              </div>

              {loginError && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded-xl text-white font-semibold transition-opacity disabled:opacity-60"
                style={{ backgroundColor: "#1E9FD4" }}
              >
                {loginLoading ? "Wird geprüft…" : "Anmelden"}
              </button>
            </form>

            <p className="text-xs text-slate-400 text-center mt-6 leading-relaxed">
              Probleme beim Login? Kontaktieren Sie uns unter{" "}
              <a href="tel:+49263123351" className="underline" style={{ color: "#1E9FD4" }}>
                02631 - 23351
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── STATE 2: Dashboard ─────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "termine", label: "Termine", icon: <Calendar size={16} /> },
    { id: "labor", label: "Laborwerte", icon: <FlaskConical size={16} /> },
    { id: "profil", label: "Mein Profil", icon: <User size={16} /> },
  ];

  const upcomingAppts = appointments
    .filter((a) => a.date >= new Date().toISOString().split("T")[0])
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  const pastAppts = appointments
    .filter((a) => a.date < new Date().toISOString().split("T")[0])
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Patientenportal</p>
            <h1 className="text-lg font-bold text-[#2D3748]">
              {patient.firstName} {patient.lastName}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut size={15} />
            Abmelden
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-slate-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              style={activeTab === tab.id ? { backgroundColor: "#1E9FD4" } : {}}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── TERMINE ── */}
        {activeTab === "termine" && (
          <div className="space-y-6">
            {upcomingAppts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Bevorstehende Termine
                </h2>
                <div className="space-y-3">
                  {upcomingAppts.map((a) => (
                    <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
                          <Calendar size={18} style={{ color: "#1E9FD4" }} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D3748] text-sm">{a.type}</p>
                          <p className="text-slate-400 text-xs mt-0.5">
                            {new Date(a.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · {a.time} Uhr · {a.doctor}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${statusColor[a.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {statusLabel[a.status] ?? a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pastAppts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Vergangene Termine
                </h2>
                <div className="space-y-3">
                  {pastAppts.map((a) => (
                    <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4 opacity-70">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-100">
                          <Calendar size={18} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D3748] text-sm">{a.type}</p>
                          <p className="text-slate-400 text-xs mt-0.5">
                            {new Date(a.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · {a.time} Uhr · {a.doctor}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${statusColor[a.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {statusLabel[a.status] ?? a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {appointments.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Keine Termine gefunden</p>
                <p className="text-slate-400 text-sm mt-1">Buchen Sie Ihren nächsten Termin online oder telefonisch.</p>
              </div>
            )}
          </div>
        )}

        {/* ── LABORWERTE ── */}
        {activeTab === "labor" && (
          <div>
            {labResults.length > 0 ? (
              <div className="space-y-3">
                {labResults
                  .sort((a, b) => b.resultDate.localeCompare(a.resultDate))
                  .map((l) => (
                    <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "rgba(30,159,212,0.08)" }}>
                          <FlaskConical size={18} style={{ color: "#1E9FD4" }} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D3748] text-sm">{l.test}</p>
                          <p className="text-slate-400 text-xs mt-0.5">
                            {new Date(l.resultDate).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                            {l.refMin && l.refMax ? ` · Ref: ${l.refMin}–${l.refMax} ${l.unit ?? ""}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-bold text-[#2D3748] text-sm">
                          {l.value} {l.unit}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${labStatusColor[l.status] ?? "bg-slate-100 text-slate-600"}`}>
                          {l.status === "normal" ? "Normal" : l.status === "high" ? "Erhöht" : l.status === "low" ? "Erniedrigt" : "Kritisch"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <FlaskConical size={32} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Keine Laborwerte verfügbar</p>
                <p className="text-slate-400 text-sm mt-1">Befunde werden nach der Auswertung hier angezeigt.</p>
              </div>
            )}
          </div>
        )}

        {/* ── PROFIL ── */}
        {activeTab === "profil" && (
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {[
              { label: "Name", value: `${patient.firstName} ${patient.lastName}` },
              { label: "Geburtsdatum", value: patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString("de-DE") : "—" },
              { label: "Versicherung", value: patient.insurance === "GKV" ? "Gesetzlich (GKV)" : "Privat (PKV)" },
              { label: "Telefon", value: patient.phone ?? "—" },
              { label: "E-Mail", value: patient.email ?? "—" },
              { label: "Adresse", value: patient.address ?? "—" },
              { label: "Behandelnder Arzt", value: patient.doctor ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-4 gap-4">
                <span className="text-sm text-slate-500 flex-shrink-0 w-36">{label}</span>
                <span className="text-sm font-medium text-[#2D3748] text-right">{value}</span>
              </div>
            ))}

            {patient.conditions && patient.conditions.length > 0 && (
              <div className="px-5 py-4">
                <span className="text-sm text-slate-500 block mb-2">Diagnosen</span>
                <div className="flex flex-wrap gap-2">
                  {patient.conditions.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: "rgba(30,159,212,0.1)", color: "#1E9FD4" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="px-5 py-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Für Änderungen Ihrer Daten kontaktieren Sie bitte die Praxis unter{" "}
                <a href="tel:+49263123351" className="underline" style={{ color: "#1E9FD4" }}>02631 - 23351</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
