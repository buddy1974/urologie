import type { Metadata } from "next";
import { Calendar, Clock, Phone, Check, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-hero noise overflow-hidden pt-36 pb-24 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
            <Calendar size={30} className="text-primary-foreground" />
          </div>
          <div className="text-xs uppercase tracking-widest text-accent mb-4">Terminbuchung</div>
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Termin buchen</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Buchen Sie Ihren Termin bequem online — rund um die Uhr, ohne Wartezeit in der Telefonleitung.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — Doctolib embed + types */}
            <div className="lg:col-span-2 space-y-6">

              {/* Main booking */}
              <div className="glass rounded-3xl overflow-hidden">
                <div className="h-1 w-full bg-primary-gradient" />
                <div className="p-8">
                  <h2 className="font-display text-2xl text-foreground mb-2">Online-Termin via Doctolib</h2>
                  <p className="text-muted-foreground mb-8">
                    Wählen Sie einen freien Termin direkt in unserem Kalender.
                    24/7 verfügbar — sofortige Bestätigung per SMS und E-Mail.
                  </p>

                  <div className="rounded-2xl overflow-hidden border border-white/10 mb-6" style={{ height: "500px" }}>
                    <iframe
                      src="https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-iframe"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      title="Termin buchen — Urologie Neuwied"
                      allow="payment"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground text-center mb-3">Falls das Formular nicht lädt:</p>
                  <a
                    href={DOCTOLIB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-primary-gradient py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] text-base"
                  >
                    <Calendar size={18} />
                    Auf Doctolib buchen
                  </a>
                </div>
              </div>

              {/* Appointment types */}
              <div className="glass rounded-3xl p-8">
                <h2 className="font-display text-2xl text-foreground mb-6">Terminarten</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {appointmentTypes.map((apt) => (
                    <div
                      key={apt.title}
                      className="glass rounded-2xl p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-gradient shadow-glow flex-shrink-0">
                          <Clock size={14} className="text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{apt.title}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">{apt.desc}</p>
                          <p className="text-accent text-xs font-medium mt-1">{apt.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">

              {/* Phone */}
              <div className="glass rounded-3xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone size={16} className="text-accent" />
                  Telefonisch buchen
                </h3>
                <a
                  href="tel:+49263123351"
                  className="block font-display text-2xl text-gradient mb-1 hover:opacity-80 transition-opacity"
                >
                  02631 - 23351
                </a>
                <p className="text-muted-foreground text-sm mb-4">Wir sind zu den Sprechzeiten für Sie erreichbar</p>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Mo, Di, Do", hours: "08–12 & 14–17 Uhr" },
                    { day: "Mi, Fr", hours: "08–12 Uhr" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-muted-foreground">{day}</span>
                      <span className="font-medium text-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="glass rounded-3xl p-6 border-accent/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Check size={16} className="text-accent" />
                  Bitte mitbringen
                </h3>
                <div className="space-y-2.5">
                  {tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div className="glass rounded-3xl p-5 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-400 text-sm mb-1">Notfall?</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Bei akuten Beschwerden rufen Sie bitte sofort <strong className="text-foreground">112</strong> oder besuchen Sie die nächste Notaufnahme.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
