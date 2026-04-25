"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, AlertCircle, LogOut, Calendar, FlaskConical, User, ChevronLeft, Timer, MessageSquare } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://urologie-backend.onrender.com";

type Step = 1 | 2 | 3;
type DashTab = "befunde" | "termine" | "daten";

interface PatientSession {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  insurance: string;
  insuranceNumber: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  doctor: string | null;
}

interface LabResult {
  id: string;
  test: string;
  value: string;
  unit: string | null;
  status: string;
  resultDate: string;
  sent: boolean;
  doctorComment: string | null;
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

const labStatusColor: Record<string, string> = {
  normal: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  high: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  low: "bg-blue-400/20 text-blue-300 border border-blue-400/30",
  critical: "bg-red-500/20 text-red-300 border border-red-500/30",
};

const labStatusLabel: Record<string, string> = {
  normal: "Normal",
  high: "Erhöht",
  low: "Erniedrigt",
  critical: "Kritisch",
};

const apptStatusColor: Record<string, string> = {
  scheduled: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  confirmed: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  completed: "bg-white/10 text-muted-foreground border border-white/10",
  cancelled: "bg-red-500/20 text-red-300 border border-red-500/30",
  "no-show": "bg-orange-500/20 text-orange-300 border border-orange-500/30",
};

const apptStatusLabel: Record<string, string> = {
  scheduled: "Geplant",
  confirmed: "Bestätigt",
  completed: "Abgeschlossen",
  cancelled: "Abgesagt",
  "no-show": "Nicht erschienen",
};

export default function PatientenportalPage() {
  const [step, setStep] = useState<Step>(1);
  const [activeTab, setActiveTab] = useState<DashTab>("befunde");

  const [birthDate, setBirthDate] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [step1Error, setStep1Error] = useState("");
  const [step1Loading, setStep1Loading] = useState(false);

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [step2Error, setStep2Error] = useState("");
  const [step2Loading, setStep2Loading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [patient, setPatient] = useState<PatientSession | null>(null);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dashLoading, setDashLoading] = useState(false);

  useEffect(() => {
    if (step !== 2) return;
    setSecondsLeft(600);
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const countdownDisplay = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const otpCode = otpDigits.join("");

  function handleOtpDigit(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otpDigits];
    next[index] = value.slice(-1);
    setOtpDigits(next);
    if (value && index < 5) otpRefs[index + 1].current?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = [...otpDigits];
    for (let i = 0; i < 6; i++) next[i] = text[i] ?? "";
    setOtpDigits(next);
    const focusIdx = Math.min(text.length, 5);
    otpRefs[focusIdx].current?.focus();
  }

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setStep1Error("");
    setStep1Loading(true);
    try {
      const res = await fetch(`${API_BASE}/api/portal/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, insuranceNumber, phone }),
      });
      if (!res.ok) {
        const data = await res.json();
        setStep1Error(data.error ?? "Zugangsdaten nicht gefunden.");
        setStep1Loading(false);
        return;
      }
      setStep(2);
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    } catch {
      setStep1Error("Verbindung zum Server fehlgeschlagen.");
    }
    setStep1Loading(false);
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setStep2Error("");
    if (otpCode.length < 6) {
      setStep2Error("Bitte alle 6 Ziffern eingeben.");
      return;
    }
    setStep2Loading(true);
    try {
      const res = await fetch(`${API_BASE}/api/portal/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, insuranceNumber, otp: otpCode }),
      });
      if (!res.ok) {
        setStep2Error("Code ungültig oder abgelaufen.");
        setOtpDigits(["", "", "", "", "", ""]);
        otpRefs[0].current?.focus();
        setStep2Loading(false);
        return;
      }
      const data = await res.json();
      setPatient(data.patient);
      setDashLoading(true);
      setStep(3);
      const pid = data.patient.id;
      const [labRes, apptRes] = await Promise.all([
        fetch(`${API_BASE}/api/portal/results/${encodeURIComponent(pid)}`),
        fetch(`${API_BASE}/api/portal/appointments/${encodeURIComponent(pid)}`),
      ]);
      setLabResults(labRes.ok ? await labRes.json() : []);
      setAppointments(apptRes.ok ? await apptRes.json() : []);
      setDashLoading(false);
    } catch {
      setStep2Error("Verbindung zum Server fehlgeschlagen.");
    }
    setStep2Loading(false);
  }

  function handleLogout() {
    setStep(1);
    setPatient(null);
    setBirthDate("");
    setInsuranceNumber("");
    setPhone("");
    setOtpDigits(["", "", "", "", "", ""]);
    setLabResults([]);
    setAppointments([]);
    setStep1Error("");
    setStep2Error("");
    setActiveTab("befunde");
  }

  const today = new Date().toISOString().split("T")[0];
  const upcomingAppts = appointments
    .filter((a) => a.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  const pastAppts = appointments
    .filter((a) => a.date < today)
    .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`));

  const inputClass = "w-full px-4 py-3 glass rounded-xl text-foreground placeholder:text-muted-foreground bg-transparent outline-none focus:border-primary/50 transition-all text-sm";
  const labelClass = "block text-sm font-medium text-muted-foreground mb-1.5";

  // ── STEP 1 ──
  if (step === 1) {
    return (
      <div className="min-h-screen bg-hero noise flex items-center justify-center px-4 py-20">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-4">
              <Lock size={28} className="text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-1">Patientenportal</h1>
            <p className="text-muted-foreground text-sm">Urologie Neuwied — sicherer Zugang</p>
          </div>

          <div className="glass-strong rounded-3xl shadow-elegant p-8">
            <h2 className="font-display text-xl text-foreground mb-1">Identitätsprüfung</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Geben Sie Ihre Daten ein. Ein Einmalcode wird an Ihr Telefon gesendet.
            </p>

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className={labelClass}>Geburtsdatum</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Versicherungsnummer</label>
                <input
                  type="text"
                  required
                  placeholder="z. B. A123456789"
                  value={insuranceNumber}
                  onChange={(e) => setInsuranceNumber(e.target.value.toUpperCase())}
                  className={inputClass + " uppercase"}
                />
              </div>
              <div>
                <label className={labelClass}>Mobilnummer</label>
                <input
                  type="tel"
                  required
                  placeholder="+49 151 12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>

              {step1Error && (
                <div className="flex items-start gap-2.5 glass rounded-xl p-3 border-red-500/30">
                  <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{step1Error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={step1Loading}
                className="w-full py-3.5 rounded-full bg-primary-gradient text-primary-foreground font-semibold shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 mt-2"
              >
                {step1Loading ? "Wird geprüft…" : "Code anfordern"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
              Probleme beim Zugang? Rufen Sie uns an:{" "}
              <a href="tel:+492631233510" className="text-accent hover:text-foreground transition-colors underline underline-offset-2">
                02631 - 23351
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 2 ──
  if (step === 2) {
    return (
      <div className="min-h-screen bg-hero noise flex items-center justify-center px-4 py-20">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-4">
              <Lock size={28} className="text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-1">Patientenportal</h1>
            <p className="text-muted-foreground text-sm">Urologie Neuwied — sicherer Zugang</p>
          </div>

          <div className="glass-strong rounded-3xl shadow-elegant p-8">
            <h2 className="font-display text-xl text-foreground mb-1">SMS-Verifizierung</h2>
            <p className="text-muted-foreground text-sm mb-3">
              Ein Einmalcode wurde an Ihr Telefon gesendet.
            </p>
            <div className="flex items-center gap-1.5 mb-6">
              <Timer size={14} className={secondsLeft <= 60 ? "text-red-400" : "text-accent"} />
              <span className={`text-sm font-medium ${secondsLeft <= 60 ? "text-red-400" : "text-accent"}`}>
                Code läuft ab in: {countdownDisplay}
              </span>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">6-stelliger Code</label>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigit(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-12 h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all text-foreground glass ${
                        digit ? "border-primary/60 bg-primary/10" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {step2Error && (
                <div className="flex items-start gap-2.5 glass rounded-xl p-3 border-red-500/30">
                  <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{step2Error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={step2Loading || secondsLeft === 0 || otpCode.length < 6}
                className="w-full py-3.5 rounded-full bg-primary-gradient text-primary-foreground font-semibold shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-50"
              >
                {step2Loading ? "Wird geprüft…" : "Bestätigen"}
              </button>
            </form>

            <p className="text-center mt-5">
              <button
                onClick={() => { setStep(1); setOtpDigits(["", "", "", "", "", ""]); setStep2Error(""); }}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft size={14} />
                Keinen Code erhalten? Zurück
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 3: Dashboard ──
  if (!patient) return null;

  const tabs: { id: DashTab; label: string; icon: React.ReactNode }[] = [
    { id: "befunde", label: "Meine Befunde", icon: <FlaskConical size={16} /> },
    { id: "termine", label: "Meine Termine", icon: <Calendar size={16} /> },
    { id: "daten", label: "Meine Daten", icon: <User size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Dashboard header */}
      <div className="glass-strong border-b border-white/5 px-4 sm:px-6 py-4 sticky top-[4.5rem] z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Patientenportal</p>
            <h1 className="font-display text-xl text-foreground">
              Willkommen, {patient.firstName}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-400 transition-colors px-3 py-2 rounded-xl hover:bg-red-500/10"
          >
            <LogOut size={15} />
            Abmelden
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab bar */}
        <div className="flex gap-1 glass rounded-2xl p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-gradient text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {dashLoading && (
          <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">Laden…</div>
        )}

        {/* ── BEFUNDE ── */}
        {!dashLoading && activeTab === "befunde" && (
          <div>
            {labResults.length > 0 ? (
              <div className="space-y-3">
                {labResults
                  .sort((a, b) => b.resultDate.localeCompare(a.resultDate))
                  .map((l) => (
                    <div key={l.id} className="glass rounded-2xl p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow flex-shrink-0">
                            <FlaskConical size={16} className="text-primary-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground text-sm truncate">{l.test}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {new Date(l.resultDate).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-bold text-foreground text-sm">
                            {l.value}{l.unit ? ` ${l.unit}` : ""}
                          </span>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${labStatusColor[l.status] ?? "bg-white/10 text-muted-foreground"}`}>
                            {labStatusLabel[l.status] ?? l.status}
                          </span>
                        </div>
                      </div>
                      {l.doctorComment && (
                        <div className="mt-3 flex items-start gap-2 px-1">
                          <MessageSquare size={13} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{l.doctorComment}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="glass rounded-3xl p-10 text-center">
                <FlaskConical size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">Keine Befunde verfügbar</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Befunde werden nach der Auswertung hier angezeigt.</p>
              </div>
            )}
          </div>
        )}

        {/* ── TERMINE ── */}
        {!dashLoading && activeTab === "termine" && (
          <div className="space-y-6">
            {upcomingAppts.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Bevorstehende Termine</h2>
                <div className="space-y-3">
                  {upcomingAppts.map((a) => (
                    <div key={a.id} className="glass rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow flex-shrink-0">
                          <Calendar size={16} className="text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{a.type}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {new Date(a.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · {a.time} Uhr · {a.doctor}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${apptStatusColor[a.status] ?? "bg-white/10 text-muted-foreground"}`}>
                        {apptStatusLabel[a.status] ?? a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {pastAppts.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Vergangene Termine</h2>
                <div className="space-y-3 opacity-60">
                  {pastAppts.map((a) => (
                    <div key={a.id} className="glass rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass flex-shrink-0">
                          <Calendar size={16} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{a.type}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">
                            {new Date(a.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · {a.time} Uhr · {a.doctor}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${apptStatusColor[a.status] ?? "bg-white/10 text-muted-foreground"}`}>
                        {apptStatusLabel[a.status] ?? a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {appointments.length === 0 && (
              <div className="glass rounded-3xl p-10 text-center">
                <Calendar size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">Keine Termine gefunden</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Buchen Sie Ihren nächsten Termin telefonisch.</p>
              </div>
            )}
          </div>
        )}

        {/* ── DATEN ── */}
        {!dashLoading && activeTab === "daten" && (
          <div className="glass rounded-2xl divide-y divide-white/5">
            {[
              { label: "Name", value: `${patient.firstName} ${patient.lastName}` },
              { label: "Geburtsdatum", value: patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString("de-DE") : "—" },
              { label: "Versicherung", value: patient.insurance === "GKV" ? "Gesetzlich (GKV)" : "Privat (PKV)" },
              { label: "Versicherungsnummer", value: patient.insuranceNumber ?? "—" },
              { label: "Telefon", value: patient.phone ?? "—" },
              { label: "E-Mail", value: patient.email ?? "—" },
              { label: "Adresse", value: patient.address ?? "—" },
              { label: "Behandelnder Arzt", value: patient.doctor ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-5 py-4 gap-4">
                <span className="text-sm text-muted-foreground flex-shrink-0 w-40">{label}</span>
                <span className="text-sm font-medium text-foreground text-right">{value}</span>
              </div>
            ))}
            <div className="px-5 py-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Für Änderungen Ihrer Daten kontaktieren Sie bitte die Praxis unter{" "}
                <a href="tel:+492631233510" className="text-accent hover:text-foreground transition-colors underline underline-offset-2">
                  02631 - 23351
                </a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
