import type { Metadata } from "next";
import { Phone, Printer, MapPin, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description: "Kontaktieren Sie die Urologische Praxis Neuwied. Adresse, Telefon, Öffnungszeiten und Anfahrt.",
};

const hours = [
  { day: "Montag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
  { day: "Dienstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
  { day: "Mittwoch", hours: "08:00–12:00 Uhr" },
  { day: "Donnerstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
  { day: "Freitag", hours: "08:00–12:00 Uhr" },
];

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-hero noise overflow-hidden pt-36 pb-24 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-accent mb-6">
            Kontakt &amp; Anfahrt
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight text-foreground mb-6">
            Wir sind <span className="text-gradient italic">für Sie da</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Erreichen Sie uns telefonisch, per Fax oder buchen Sie Ihren Termin
            bequem online über Doctolib.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left — Contact Info */}
            <div className="space-y-6">

              {/* Contact card */}
              <div className="glass rounded-3xl overflow-hidden">
                <div className="h-1 w-full bg-primary-gradient" />
                <div className="p-8">
                  <h2 className="font-display text-2xl text-foreground mb-8">Kontaktdaten</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow flex-shrink-0">
                        <MapPin size={16} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Adresse</p>
                        <p className="text-foreground font-medium">Dierdorfer Str. 115–117</p>
                        <p className="text-foreground font-medium">56564 Neuwied</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow flex-shrink-0">
                        <Phone size={16} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Telefon</p>
                        <a href="tel:+49263123351" className="text-foreground font-medium hover:text-accent transition-colors text-lg">
                          02631 - 23351
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow flex-shrink-0">
                        <Printer size={16} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Fax</p>
                        <p className="text-foreground font-medium">02631 - 941845</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-sm text-muted-foreground mb-4">Termin bequem online buchen:</p>
                    <a
                      href="https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                    >
                      Jetzt Termin buchen
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="glass rounded-3xl overflow-hidden">
                <div className="h-1 w-full bg-primary-gradient" />
                <div className="p-8">
                  <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
                    <Clock size={20} className="text-accent" />
                    Sprechstunden
                  </h2>
                  <div className="space-y-3">
                    {hours.map(({ day, hours: h }) => (
                      <div key={day} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                        <span className="font-medium text-foreground w-28">{day}</span>
                        <span className="text-muted-foreground text-sm text-right">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 glass rounded-2xl px-4 py-3 text-sm border-accent/20">
                    <p className="text-accent font-medium">
                      📞 Außerhalb der Sprechzeiten: Bitte rufen Sie uns an oder buchen Sie online.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Map + Directions */}
            <div className="space-y-6">
              <div className="glass rounded-3xl overflow-hidden" style={{ minHeight: "400px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.8!2d7.4698!3d50.4267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be6b4e4e4e4e4e%3A0x1!2sDierdorfer+Str.+115%2C+56564+Neuwied!5e0!3m2!1sde!2sde!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Urologie Neuwied Standort"
                  className="opacity-90"
                />
              </div>

              <div className="glass rounded-3xl p-8">
                <h3 className="font-display text-xl text-foreground mb-5">Anfahrt</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><span className="font-semibold text-foreground">🚗 Auto:</span> Parkplätze direkt vor der Praxis vorhanden</p>
                  <p><span className="font-semibold text-foreground">🚌 Bus:</span> Haltestelle Dierdorfer Straße (Linien 5, 12)</p>
                  <p><span className="font-semibold text-foreground">🚂 Bahn:</span> Bahnhof Neuwied — ca. 10 Min. mit dem Bus</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Dierdorfer+Str.+115,+56564+Neuwied"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-accent hover:text-foreground transition-colors"
                >
                  In Google Maps öffnen
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
