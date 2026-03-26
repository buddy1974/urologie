import { useState, useEffect } from "react";
import {
  Search, Plus, User, Phone, Calendar, Shield,
  ChevronRight, FileText, FlaskConical, Clock, X,
} from "lucide-react";
import AddressAutocomplete from "@/components/ui/AddressAutocomplete";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
  insurance: "GKV" | "PKV" | "Selbstzahler";
  phone: string;
  email?: string;
  lastVisit: string;
  nextVisit?: string;
  conditions: string[];
  doctor: string;
}

type APIPatient = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  insurance: string;
  phone: string | null;
  email: string | null;
  conditions: string[] | null;
  doctor: string | null;
};

type PatientForm = {
  anrede: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  insurance: "GKV" | "PKV" | "Selbstzahler";
  insuranceNumber: string;
};

const EMPTY_FORM: PatientForm = {
  anrede: "Herr",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  insurance: "GKV",
  insuranceNumber: "",
};

const MOCK_PATIENTS: Patient[] = [
  { id: "1", firstName: "Hans", lastName: "Müller", dob: "15.03.1958", age: 68, insurance: "GKV", phone: "0172-1234567", email: "h.mueller@email.de", lastVisit: "23.03.2026", conditions: ["BPH", "PSA erhöht"], doctor: "Dr. Fomuki" },
  { id: "2", firstName: "Klaus", lastName: "Weber", dob: "22.07.1952", age: 73, insurance: "PKV", phone: "0163-2345678", lastVisit: "23.03.2026", conditions: ["Prostatakarzinom Nachsorge"], doctor: "Dr. Fomuki" },
  { id: "3", firstName: "Thomas", lastName: "Schmidt", dob: "08.11.1975", age: 50, insurance: "GKV", phone: "0151-3456789", lastVisit: "23.03.2026", nextVisit: "15.04.2026", conditions: ["Vasektomie geplant"], doctor: "Dr. Fomuki" },
  { id: "4", firstName: "Mehmet", lastName: "Yilmaz", dob: "03.05.1968", age: 57, insurance: "GKV", phone: "0176-4567890", lastVisit: "23.03.2026", conditions: ["Harnwegsinfekt", "Diabetes"], doctor: "Dr. Nwankwo" },
  { id: "5", firstName: "Peter", lastName: "Hoffmann", dob: "19.09.1955", age: 70, insurance: "PKV", phone: "0170-5678901", lastVisit: "10.03.2026", nextVisit: "23.03.2026", conditions: ["UroLift post-OP"], doctor: "Dr. Fomuki" },
  { id: "6", firstName: "Andreas", lastName: "Klein", dob: "14.02.1971", age: 55, insurance: "GKV", phone: "0152-6789012", lastVisit: "23.03.2026", conditions: ["Harnsteine"], doctor: "Dr. Nwankwo" },
  { id: "7", firstName: "Stefan", lastName: "Wagner", dob: "30.06.1983", age: 42, insurance: "Selbstzahler", phone: "0178-7890123", lastVisit: "23.03.2026", conditions: ["Erektionsstörung", "Andrologie"], doctor: "Dr. Fomuki" },
  { id: "8", firstName: "Jürgen", lastName: "Fischer", dob: "11.12.1949", age: 76, insurance: "PKV", phone: "0172-9012345", lastVisit: "05.03.2026", nextVisit: "23.03.2026", conditions: ["Blasenkarzinom Nachsorge"], doctor: "Dr. Fomuki" },
  { id: "9", firstName: "Dimitri", lastName: "Papadopoulos", dob: "25.08.1961", age: 64, insurance: "GKV", phone: "0151-1234560", lastVisit: "15.02.2026", nextVisit: "23.03.2026", conditions: ["PSA 6.2 — Biopsie"], doctor: "Dr. Fomuki" },
  { id: "10", firstName: "Robert", lastName: "Zimmermann", dob: "07.04.1978", age: 47, insurance: "PKV", phone: "0176-2345601", lastVisit: "23.03.2026", conditions: ["Inkontinenz", "Magnetstimulation"], doctor: "Dr. Nwankwo" },
  { id: "11", firstName: "Frank", lastName: "Becker", dob: "18.10.1965", age: 60, insurance: "GKV", phone: "0164-8901234", lastVisit: "01.03.2026", conditions: ["Vorsorge", "PSA normal"], doctor: "Dr. Nwankwo" },
  { id: "12", firstName: "Martin", lastName: "Schulz", dob: "29.01.1970", age: 56, insurance: "GKV", phone: "0163-0123456", lastVisit: "23.03.2026", conditions: ["Kontrolltermin"], doctor: "Dr. Fomuki" },
];

const insuranceColors: Record<string, { color: string; bg: string }> = {
  GKV: { color: "#0d9488", bg: "rgba(13,148,136,0.1)" },
  PKV: { color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  Selbstzahler: { color: "#d97706", bg: "rgba(217,119,6,0.1)" },
};

function calcAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function formatDob(iso: string): string {
  if (!iso) return "";
  const [y, mo, d] = iso.split("-");
  return `${d}.${mo}.${y}`;
}

function mapAPIPatient(p: APIPatient): Patient {
  const today = new Date().toLocaleDateString("de-DE");
  return {
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    dob: p.dateOfBirth ? formatDob(p.dateOfBirth) : "–",
    age: p.dateOfBirth ? calcAge(p.dateOfBirth) : 0,
    insurance: (p.insurance as "GKV" | "PKV" | "Selbstzahler") ?? "GKV",
    phone: p.phone ?? "–",
    email: p.email ?? undefined,
    lastVisit: today,
    conditions: p.conditions ?? [],
    doctor: p.doctor ?? "Dr. Fomuki",
  };
}

const API = import.meta.env.VITE_API_URL as string;

export default function Patienten() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [filterInsurance, setFilterInsurance] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<PatientForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function fetchPatients() {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`${API}/api/patients`);
      if (!res.ok) throw new Error(`Serverfehler ${res.status}`);
      const data: APIPatient[] = await res.json();
      if (data.length > 0) setPatients(data.map(mapAPIPatient));
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPatients(); }, []);

  const filtered = patients.filter((p) => {
    const name = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) ||
      p.conditions.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchInsurance = filterInsurance === "all" || p.insurance === filterInsurance;
    return matchSearch && matchInsurance;
  });

  function setField<K extends keyof PatientForm>(key: K, value: PatientForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.dateOfBirth) {
      setFormError("Bitte Vorname, Nachname und Geburtsdatum ausfüllen.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch(`${API}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          dateOfBirth: form.dateOfBirth,
          phone: form.phone || null,
          email: form.email || null,
          address: form.address || null,
          insurance: form.insurance,
          notes: form.insuranceNumber ? `Vers.Nr.: ${form.insuranceNumber}` : null,
        }),
      });
      if (!res.ok) {
        const err: { error?: string } = await res.json();
        setFormError(err.error ?? "Fehler beim Speichern.");
        return;
      }
      setShowModal(false);
      setForm(EMPTY_FORM);
      await fetchPatients();
    } catch {
      setFormError("Server nicht erreichbar. Bitte Backend starten.");
    } finally {
      setSubmitting(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  const inputCls = "w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#1E9FD4] transition-colors bg-white";
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1";

  return (
    <div className="flex h-full">

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Neuer Patient</h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Anrede */}
              <div>
                <label className={labelCls}>Anrede</label>
                <select value={form.anrede} onChange={(e) => setField("anrede", e.target.value)} className={inputCls}>
                  <option>Herr</option>
                  <option>Frau</option>
                  <option>Divers</option>
                </select>
              </div>

              {/* Vorname / Nachname */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Vorname *</label>
                  <input required value={form.firstName} onChange={(e) => setField("firstName", e.target.value)}
                    placeholder="Max" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nachname *</label>
                  <input required value={form.lastName} onChange={(e) => setField("lastName", e.target.value)}
                    placeholder="Mustermann" className={inputCls} />
                </div>
              </div>

              {/* Geburtsdatum */}
              <div>
                <label className={labelCls}>Geburtsdatum *</label>
                <input required type="date" value={form.dateOfBirth} onChange={(e) => setField("dateOfBirth", e.target.value)}
                  className={inputCls} />
              </div>

              {/* Telefon / Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Telefon</label>
                  <input type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)}
                    placeholder="0172-1234567" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>E-Mail</label>
                  <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)}
                    placeholder="max@email.de" className={inputCls} />
                </div>
              </div>

              {/* Adresse */}
              <div>
                <label className={labelCls}>Adresse</label>
                <AddressAutocomplete
                  value={form.address}
                  onChange={(val) => setField("address", val)}
                  onSelect={(result) => setField("address", [result.street, result.zip, result.city].filter(Boolean).join(", "))}
                  placeholder="Straße und Hausnummer..."
                />
              </div>

              {/* Versicherung / Versicherungsnummer */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Versicherung</label>
                  <select value={form.insurance}
                    onChange={(e) => setField("insurance", e.target.value as "GKV" | "PKV" | "Selbstzahler")}
                    className={inputCls}>
                    <option value="GKV">GKV</option>
                    <option value="PKV">PKV</option>
                    <option value="Selbstzahler">Selbstzahler</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Versicherungsnummer</label>
                  <input value={form.insuranceNumber} onChange={(e) => setField("insuranceNumber", e.target.value)}
                    placeholder="A123456789" className={inputCls} />
                </div>
              </div>

              {/* Error */}
              {formError && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{formError}</p>
              )}

              {/* Submit */}
              <button type="submit" disabled={submitting}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-60"
                style={{ backgroundColor: "#1E9FD4" }}>
                {submitting ? "Wird gespeichert..." : "Patient speichern"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Left — Patient list */}
      <div className={cn("flex flex-col border-r border-slate-200 bg-white transition-all",
        selected ? "w-96 flex-shrink-0" : "flex-1"
      )}>
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Patienten</h1>
              <p className="text-slate-400 text-xs mt-0.5">{patients.length} Patienten gesamt</p>
            </div>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold"
              style={{ backgroundColor: "#1E9FD4" }}>
              <Plus size={14} />
              Neuer Patient
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name oder Diagnose suchen..."
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1E9FD4] transition-colors"
            />
          </div>

          {/* Insurance filter */}
          <div className="flex gap-1.5">
            {["all", "GKV", "PKV", "Selbstzahler"].map((ins) => (
              <button key={ins}
                onClick={() => setFilterInsurance(ins)}
                className={cn("px-2.5 py-1 rounded-lg text-xs font-medium transition-all",
                  filterInsurance === ins ? "text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
                style={filterInsurance === ins ? { backgroundColor: "#1E9FD4" } : {}}>
                {ins === "all" ? "Alle" : ins}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {loading && (
            <div className="flex items-center justify-center py-16 text-slate-400 text-sm">
              Laden...
            </div>
          )}
          {!loading && fetchError && (
            <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {fetchError}
            </div>
          )}
          {!loading && !fetchError && filtered.map((patient) => {
            const ins = insuranceColors[patient.insurance] ?? insuranceColors["GKV"];
            return (
              <button key={patient.id}
                onClick={() => setSelected(selected?.id === patient.id ? null : patient)}
                className={cn("w-full text-left px-5 py-3.5 hover:bg-slate-50 transition-colors",
                  selected?.id === patient.id ? "bg-blue-50 border-r-2" : ""
                )}
                style={selected?.id === patient.id ? { borderRightColor: "#1E9FD4" } : {}}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                    style={{ backgroundColor: "#1E9FD4" }}>
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-800 truncate">
                        {patient.lastName}, {patient.firstName}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                        style={{ backgroundColor: ins.bg, color: ins.color }}>
                        {patient.insurance}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{patient.age} Jahre</span>
                      <span>·</span>
                      <span className="truncate">{patient.conditions[0] ?? "–"}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right — Patient detail */}
      {selected && (
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {/* Patient header */}
          <div className="bg-white rounded-2xl p-6 mb-4 border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: "#1E9FD4" }}>
                  {selected.firstName[0]}{selected.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    *{selected.dob} · {selected.age} Jahre
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: insuranceColors[selected.insurance]?.bg, color: insuranceColors[selected.insurance]?.color }}>
                      {selected.insurance}
                    </span>
                    <span className="text-xs text-slate-400">{selected.doctor}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <FileText size={18} className="text-slate-400" />
              </button>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} style={{ color: "#1E9FD4" }} />
                <span className="text-slate-600">{selected.phone}</span>
              </div>
              {selected.email && (
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} style={{ color: "#1E9FD4" }} />
                  <span className="text-slate-600 truncate">{selected.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Diagnoses */}
          <div className="bg-white rounded-2xl p-5 mb-4 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Shield size={14} style={{ color: "#1E9FD4" }} />
              Diagnosen / Anliegen
            </h3>
            <div className="flex flex-wrap gap-2">
              {selected.conditions.length > 0 ? selected.conditions.map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: "rgba(30,159,212,0.08)", color: "#1480AB" }}>
                  {c}
                </span>
              )) : <span className="text-slate-400 text-sm">Keine Diagnosen</span>}
            </div>
          </div>

          {/* Visits */}
          <div className="bg-white rounded-2xl p-5 mb-4 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock size={14} style={{ color: "#1E9FD4" }} />
              Termine
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Letzter Besuch</span>
                <span className="font-semibold text-slate-800">{selected.lastVisit}</span>
              </div>
              {selected.nextVisit && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Nächster Termin</span>
                  <span className="font-semibold" style={{ color: "#1E9FD4" }}>{selected.nextVisit}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Befunde anzeigen", icon: FlaskConical, color: "#d97706" },
              { label: "Dokumente", icon: FileText, color: "#16a34a" },
              { label: "Termin buchen", icon: Calendar, color: "#1E9FD4" },
              { label: "Nachricht senden", icon: Phone, color: "#7c3aed" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label}
                  className="flex items-center gap-2.5 p-3.5 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all text-sm font-medium text-slate-700">
                  <Icon size={16} style={{ color: action.color }} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!selected && (
        <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50">
          <div className="text-center text-slate-300">
            <User size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Patient auswählen</p>
          </div>
        </div>
      )}
    </div>
  );
}
