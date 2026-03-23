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
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">
            Kontakt &amp; Anfahrt
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Wir sind für Sie da
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Erreichen Sie uns telefonisch, per Fax oder buchen Sie Ihren Termin
            bequem online über Doctolib.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
          <div className="space-y-8">

            {/* Contact card */}
            <div className="rounded-2xl border-2 border-slate-100 overflow-hidden">
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #1E9FD4, #5ECFEB)" }} />
              <div className="p-8">
                <h2 className="text-xl font-bold text-[#2D3748] mb-6">Kontaktdaten</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
                      <MapPin size={18} style={{ color: "#1E9FD4" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Adresse</p>
                      <p className="text-[#2D3748] font-medium">Dierdorfer Str. 115–117</p>
                      <p className="text-[#2D3748] font-medium">56564 Neuwied</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
                      <Phone size={18} style={{ color: "#1E9FD4" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Telefon</p>
                      <a href="tel:+49263123351" className="text-[#2D3748] font-medium hover:text-[#1E9FD4] transition-colors text-lg">
                        02631 - 23351
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(30,159,212,0.1)" }}>
                      <Printer size={18} style={{ color: "#1E9FD4" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fax</p>
                      <p className="text-[#2D3748] font-medium">02631 - 941845</p>
                    </div>
                  </div>
                </div>

                {/* Doctolib CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-3">Termin bequem online buchen:</p>
                  <a
                    href="https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
                    style={{ backgroundColor: "#1E9FD4" }}
                  >
                    Jetzt Termin buchen
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="rounded-2xl border-2 border-slate-100 overflow-hidden">
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #1E9FD4, #5ECFEB)" }} />
              <div className="p-8">
                <h2 className="text-xl font-bold text-[#2D3748] mb-6 flex items-center gap-2">
                  <Clock size={20} style={{ color: "#1E9FD4" }} />
                  Sprechstunden
                </h2>
                <div className="space-y-3">
                  {hours.map(({ day, hours: h }) => (
                    <div key={day} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                      <span className="font-medium text-[#2D3748] w-28">{day}</span>
                      <span className="text-slate-500 text-sm text-right">{h}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl text-sm" style={{ backgroundColor: "rgba(30,159,212,0.08)" }}>
                  <p className="text-[#1480AB] font-medium">
                    📞 Außerhalb der Sprechzeiten: Bitte rufen Sie uns an oder buchen Sie online.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Map */}
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-slate-100 overflow-hidden h-96 lg:h-full min-h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.8!2d7.4698!3d50.4267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be6b4e4e4e4e4e%3A0x1!2sDierdorfer+Str.+115%2C+56564+Neuwied!5e0!3m2!1sde!2sde!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Urologie Neuwied Standort"
              />
            </div>

            {/* Directions */}
            <div className="rounded-2xl border-2 border-slate-100 p-6">
              <h3 className="font-bold text-[#2D3748] mb-4">Anfahrt</h3>
              <div className="space-y-3 text-sm text-slate-500">
                <p><span className="font-semibold text-[#2D3748]">🚗 Auto:</span> Parkplätze direkt vor der Praxis vorhanden</p>
                <p><span className="font-semibold text-[#2D3748]">🚌 Bus:</span> Haltestelle Dierdorfer Straße (Linien 5, 12)</p>
                <p><span className="font-semibold text-[#2D3748]">🚂 Bahn:</span> Bahnhof Neuwied — ca. 10 Min. mit dem Bus</p>
              </div>
              <a
                href="https://maps.google.com/?q=Dierdorfer+Str.+115,+56564+Neuwied"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
                style={{ color: "#1E9FD4" }}
              >
                In Google Maps öffnen
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
