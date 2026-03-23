import type { Metadata } from "next";
import { Calendar, Clock, Phone, CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Termin buchen",
  description: "Termin online buchen bei Urologie Neuwied — via Doctolib oder telefonisch.",
};

const appointmentTypes = [
  { title: "Erstvorstellung", desc: "Erstes Gespräch und Untersuchung", duration: "30 Min." },
  { title: "Kontrolltermin", desc: "Nachsorge und Befundbesprechung", duration: "15 Min." },
  { title: "Vorsorge (PSA)", desc: "PSA-Messung und Krebsvorsorge", duration: "20 Min." },
  { title: "UroLift® Beratung", desc: "Beratung zur BPH-Behandlung", duration: "30 Min." },
  { title: "Vasektomie-Beratung", desc: "Aufklärungsgespräch Vasektomie", duration: "30 Min." },
  { title: "Andrologie", desc: "Männergesundheit & Fruchtbarkeit", duration: "30 Min." },
];

const tips = [
  "Bringen Sie Ihre Krankenversicherungskarte mit",
  "Überweisungsschein (bei gesetzl. Versicherung) falls vorhanden",
  "Liste aktueller Medikamente",
  "Frühere Befunde und Arztbriefe falls relevant",
  "Kommen Sie 5 Minuten vor dem Termin",
];

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-termin";

export default function TerminPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(30,159,212,0.2)" }}>
            <Calendar size={32} style={{ color: "#1E9FD4" }} />
          </div>
          <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">
            Terminbuchung
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Termin buchen
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Buchen Sie Ihren Termin bequem online — rund um die Uhr, ohne Wartezeit in der Telefonleitung.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — Doctolib embed + CTA */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main booking CTA */}
            <div className="rounded-2xl border-2 overflow-hidden"
              style={{ borderColor: "rgba(30,159,212,0.3)" }}>
              <div className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, #1E9FD4, #5ECFEB)" }} />
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#2D3748] mb-2">
                  Online-Termin via Doctolib
                </h2>
                <p className="text-slate-500 mb-8">
                  Wählen Sie einen freien Termin direkt in unserem Kalender.
                  24/7 verfügbar — sofortige Bestätigung per SMS und E-Mail.
                </p>

                {/* Doctolib iframe */}
                <div className="rounded-xl overflow-hidden border border-slate-200 mb-6"
                  style={{ height: "500px" }}>
                  <iframe
                    src="https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-iframe"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    title="Termin buchen — Urologie Neuwied"
                    allow="payment"
                  />
                </div>

                {/* Fallback button */}
                <p className="text-xs text-slate-400 text-center mb-3">
                  Falls das Formular nicht lädt:
                </p>
                <a
                  href={DOCTOLIB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-white font-semibold py-4 rounded-xl transition-colors text-lg"
                  style={{ backgroundColor: "#1E9FD4" }}
                >
                  <Calendar size={20} />
                  Auf Doctolib buchen
                </a>
              </div>
            </div>

            {/* Appointment types */}
            <div className="rounded-2xl border-2 border-slate-100 p-8">
              <h2 className="text-xl font-bold text-[#2D3748] mb-6">
                Terminarten
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appointmentTypes.map((apt) => (
                  <div key={apt.title}
                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-[#1E9FD4]/30 transition-colors"
                    style={{ backgroundColor: "rgba(30,159,212,0.03)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
                      <Clock size={15} style={{ color: "#1E9FD4" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D3748] text-sm">{apt.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{apt.desc}</p>
                      <p className="text-[#1E9FD4] text-xs font-medium mt-1">{apt.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">

            {/* Phone booking */}
            <div className="rounded-2xl border-2 border-slate-100 p-6">
              <h3 className="font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                <Phone size={18} style={{ color: "#1E9FD4" }} />
                Telefonisch buchen
              </h3>
              <a href="tel:+49263123351"
                className="block text-2xl font-bold mb-1 hover:opacity-80 transition-opacity"
                style={{ color: "#1E9FD4" }}>
                02631 - 23351
              </a>
              <p className="text-slate-400 text-sm mb-4">Wir sind zu den Sprechzeiten für Sie erreichbar</p>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Mo, Di, Do", hours: "08–12 & 14–17 Uhr" },
                  { day: "Mi, Fr", hours: "08–12 Uhr" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-slate-400">{day}</span>
                    <span className="font-medium text-[#2D3748]">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-2xl p-6"
              style={{ backgroundColor: "rgba(30,159,212,0.06)", border: "2px solid rgba(30,159,212,0.15)" }}>
              <h3 className="font-bold text-[#2D3748] mb-4 flex items-center gap-2">
                <CheckCircle size={18} style={{ color: "#1E9FD4" }} />
                Bitte mitbringen
              </h3>
              <div className="space-y-2.5">
                {tips.map((tip) => (
                  <div key={tip} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: "#1E9FD4" }} />
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency notice */}
            <div className="rounded-2xl p-5 border-2"
              style={{ borderColor: "rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.04)" }}>
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-700 text-sm mb-1">Notfall?</p>
                  <p className="text-red-600 text-xs leading-relaxed">
                    Bei akuten Beschwerden rufen Sie bitte sofort <strong>112</strong> oder besuchen Sie die nächste Notaufnahme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
