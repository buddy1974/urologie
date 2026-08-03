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
  normal: "bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]",
  high: "bg-[#fffbeb] text-[#d97706] border border-[#fde68a]",
  low: "bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]",
  critical: "bg-[#fff1f2] text-[#dc2626] border border-[#fecaca]",
};

const labStatusLabel: Record<string, string> = {
  normal: "Normal",
  high: "Erhöht",
  low: "Erniedrigt",
  critical: "Kritisch",
};

const apptStatusColor: Record<string, string> = {
  scheduled: "bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]",
  confirmed: "bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]",
  completed: "bg-[#f9fafb] text-[#666] border border-[#e5e5e5]",
  cancelled: "bg-[#fff1f2] text-[#dc2626] border border-[#fecaca]",
  "no-show": "bg-[#fffbeb] text-[#d97706] border border-[#fde68a]",
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

  const [portalToken, setPortalToken] = useState<string | null>(null);
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
      setPortalToken(data.token);
      setPatient(data.patient);
      setDashLoading(true);
      setStep(3);
      const [labRes, apptRes] = await Promise.all([
        fetch(`${API_BASE}/api/portal/results`, {
          headers: { Authorization: `Bearer ${portalToken ?? data.token}` },
        }),
        fetch(`${API_BASE}/api/portal/appointments`, {
          headers: { Authorization: `Bearer ${portalToken ?? data.token}` },
        }),
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
    setPortalToken(null);
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

  const inputClass =
    "w-full px-4 py-3 border border-[#e5e5e5] rounded-lg text-body-text placeholder:text-[#999] bg-white outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(137,194,202,0.15)] transition-all text-[15px]";
  const labelClass = "block text-[14px] font-bold text-body-text mb-1.5";

  // ── STEP 1 ──
  if (step === 1) {
    return (
      <div className="min-h-screen bg-white">
        <section className="bg-primary-dark flex items-center justify-center text-center px-4 h-[200px]">
          <div>
            <h1 className="text-white text-[36px] font-bold mb-2">Patientenportal</h1>
            <p className="text-primary text-[16px] font-bold uppercase tracking-[2px]">Sicher. Persönlich. Jederzeit.</p>
          </div>
        </section>

        <div className="flex items-start justify-center px-4">
          <div className="w-full max-w-[480px] my-[60px] bg-white border border-[#e5e5e5] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-10 py-12">
            <Lock size={40} className="text-primary mx-auto mb-4" />
            <h2 className="text-primary-dark text-[22px] font-bold text-center mb-2">Identitätsprüfung</h2>
            <p className="text-[#666] text-[14px] text-center mb-8">
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
                <div className="flex items-start gap-2.5 bg-[#fff5f5] border border-[#fecaca] rounded-lg p-3">
                  <AlertCircle size={15} className="text-[#dc2626] flex-shrink-0 mt-0.5" />
                  <p className="text-[#dc2626] text-[14px]">{step1Error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={step1Loading}
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-[16px] border-none cursor-pointer transition-colors disabled:opacity-70 mt-2"
              >
                {step1Loading ? "Wird geprüft..." : "Code anfordern"}
              </button>
            </form>

            <p className="text-[13px] text-center mt-6">
              <a href="tel:+492631233510" className="text-primary hover:text-primary-dark transition-colors">
                Probleme beim Zugang?
              </a>
            </p>

            <p className="text-[12px] text-[#999] text-center mt-6">
              Ihre Daten werden nicht gespeichert · DSGVO-konform
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 2 ──
  if (step === 2) {
    return (
      <div className="min-h-screen bg-white">
        <section className="bg-primary-dark flex items-center justify-center text-center px-4 h-[200px]">
          <div>
            <h1 className="text-white text-[36px] font-bold mb-2">Patientenportal</h1>
            <p className="text-primary text-[16px] font-bold uppercase tracking-[2px]">Sicher. Persönlich. Jederzeit.</p>
          </div>
        </section>

        <div className="flex items-start justify-center px-4">
          <div className="w-full max-w-[480px] my-[60px] bg-white border border-[#e5e5e5] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-10 py-12">
            <Lock size={40} className="text-primary mx-auto mb-4" />
            <h2 className="text-primary-dark text-[22px] font-bold text-center mb-2">SMS-Verifizierung</h2>
            <p className="text-[#666] text-[14px] text-center mb-3">
              Ein Einmalcode wurde an Ihr Telefon gesendet.
            </p>
            <div className="flex items-center justify-center gap-1.5 mb-8">
              <Timer size={14} className={secondsLeft <= 60 ? "text-[#dc2626]" : "text-primary"} />
              <span className={`text-[14px] font-bold ${secondsLeft <= 60 ? "text-[#dc2626]" : "text-primary"}`}>
                Code läuft ab in: {countdownDisplay}
              </span>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-[14px] font-bold text-body-text mb-3 text-center">6-stelliger Code</label>
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
                      className={`w-[52px] h-[60px] text-center text-[24px] font-bold rounded-lg outline-none transition-all text-primary-dark border-2 ${
                        digit ? "border-primary bg-[#f0f7f9]" : "border-[#e5e5e5]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {step2Error && (
                <div className="flex items-start gap-2.5 bg-[#fff5f5] border border-[#fecaca] rounded-lg p-3">
                  <AlertCircle size={15} className="text-[#dc2626] flex-shrink-0 mt-0.5" />
                  <p className="text-[#dc2626] text-[14px]">{step2Error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={step2Loading || secondsLeft === 0 || otpCode.length < 6}
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-[16px] border-none cursor-pointer transition-colors disabled:opacity-50"
              >
                {step2Loading ? "Wird geprüft..." : "Bestätigen"}
              </button>
            </form>

            <p className="text-center mt-4">
              <button
                onClick={() => { setStep(1); setOtpDigits(["", "", "", "", "", ""]); setStep2Error(""); }}
                className="inline-flex items-center gap-1 text-[14px] text-primary hover:text-primary-dark transition-colors"
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
    <div className="min-h-screen bg-white">
      {/* Dashboard header */}
      <div className="bg-primary-dark px-4 sm:px-6 py-4 sticky top-[60px] md:top-[102px] z-40">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-primary text-[12px] uppercase tracking-widest mb-0.5">Patientenportal</p>
            <h1 className="text-white text-[20px] font-bold">
              Willkommen, {patient.firstName}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[14px] text-white/70 hover:text-white transition-colors px-3 py-2"
          >
            <LogOut size={15} />
            Abmelden
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto">
        {/* Tab bar */}
        <div className="flex border-b-2 border-[#e5e5e5]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[15px] font-bold transition-all border-b-2 -mb-[2px] ${
                activeTab === tab.id
                  ? "border-primary text-primary-dark"
                  : "border-transparent text-[#666] hover:text-primary-dark"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="px-5 py-8">
          {dashLoading && (
            <div className="flex items-center justify-center py-16 text-[#666] text-[14px]">Laden…</div>
          )}

          {/* ── BEFUNDE ── */}
          {!dashLoading && activeTab === "befunde" && (
            <div>
              {labResults.length > 0 ? (
                <div className="space-y-3">
                  {labResults
                    .sort((a, b) => b.resultDate.localeCompare(a.resultDate))
                    .map((l) => (
                      <div key={l.id} className="bg-white border border-[#e5e5e5] rounded-xl p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f7f9] flex-shrink-0">
                              <FlaskConical size={16} className="text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-primary-dark text-[15px] truncate">{l.test}</p>
                              <p className="text-[#666] text-[13px] mt-0.5">
                                {new Date(l.resultDate).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="font-bold text-primary-dark text-[15px]">
                              {l.value}{l.unit ? ` ${l.unit}` : ""}
                            </span>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${labStatusColor[l.status] ?? "bg-[#f9fafb] text-[#666] border border-[#e5e5e5]"}`}>
                              {labStatusLabel[l.status] ?? l.status}
                            </span>
                          </div>
                        </div>
                        {l.doctorComment && (
                          <div className="mt-3 flex items-start gap-2 bg-[#f9fafb] border-l-[3px] border-primary px-3.5 py-2.5">
                            <MessageSquare size={13} className="text-[#666] flex-shrink-0 mt-0.5" />
                            <p className="text-[14px] text-body-text leading-relaxed">{l.doctorComment}</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-[#f9fafb] rounded-xl py-[60px] text-center">
                  <FlaskConical size={32} className="text-[#e5e5e5] mx-auto mb-3" />
                  <p className="text-[#999] font-medium">Keine Befunde verfügbar</p>
                  <p className="text-[#999] text-[14px] mt-1">Befunde werden nach der Auswertung hier angezeigt.</p>
                </div>
              )}
            </div>
          )}

          {/* ── TERMINE ── */}
          {!dashLoading && activeTab === "termine" && (
            <div className="space-y-6">
              {upcomingAppts.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-3">Bevorstehende Termine</h2>
                  <div className="space-y-3">
                    {upcomingAppts.map((a) => (
                      <div key={a.id} className="bg-white border border-[#e5e5e5] rounded-xl p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f7f9] flex-shrink-0">
                            <Calendar size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-primary-dark text-[15px]">{a.type}</p>
                            <p className="text-[#666] text-[13px] mt-0.5">
                              {new Date(a.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · {a.time} Uhr · {a.doctor}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium flex-shrink-0 ${apptStatusColor[a.status] ?? "bg-[#f9fafb] text-[#666] border border-[#e5e5e5]"}`}>
                          {apptStatusLabel[a.status] ?? a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {pastAppts.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-3">Vergangene Termine</h2>
                  <div className="space-y-3 opacity-60">
                    {pastAppts.map((a) => (
                      <div key={a.id} className="bg-white border border-[#e5e5e5] rounded-xl p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f9fafb] flex-shrink-0">
                            <Calendar size={16} className="text-[#666]" />
                          </div>
                          <div>
                            <p className="font-bold text-primary-dark text-[15px]">{a.type}</p>
                            <p className="text-[#666] text-[13px] mt-0.5">
                              {new Date(a.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · {a.time} Uhr · {a.doctor}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium flex-shrink-0 ${apptStatusColor[a.status] ?? "bg-[#f9fafb] text-[#666] border border-[#e5e5e5]"}`}>
                          {apptStatusLabel[a.status] ?? a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {appointments.length === 0 && (
                <div className="bg-[#f9fafb] rounded-xl py-[60px] text-center">
                  <Calendar size={32} className="text-[#e5e5e5] mx-auto mb-3" />
                  <p className="text-[#999] font-medium">Keine Termine gefunden</p>
                  <p className="text-[#999] text-[14px] mt-1">Buchen Sie Ihren nächsten Termin telefonisch.</p>
                </div>
              )}
            </div>
          )}

          {/* ── DATEN ── */}
          {!dashLoading && activeTab === "daten" && (
            <div>
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
                <div key={label} className="flex items-center justify-between gap-4 border-b border-[#f5f5f5] py-3.5">
                  <span className="text-[14px] text-[#666] flex-shrink-0 w-[180px]">{label}</span>
                  <span className="text-[14px] font-semibold text-primary-dark text-right">{value}</span>
                </div>
              ))}
              <p className="text-[13px] text-[#666] leading-relaxed pt-4">
                Für Änderungen Ihrer Daten kontaktieren Sie bitte die Praxis unter{" "}
                <a href="tel:+492631233510" className="text-primary hover:text-primary-dark transition-colors underline underline-offset-2">
                  02631 - 23351
                </a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
