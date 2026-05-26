"use client";

import { Calendar, Phone, MapPin, Clock } from "lucide-react";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-landing";

const hours = [
  { day: "Montag",     hours: "08:00–12:00, 14:00–17:00" },
  { day: "Dienstag",   hours: "08:00–12:00, 14:00–17:00" },
  { day: "Mittwoch",   hours: "08:00–12:00" },
  { day: "Donnerstag", hours: "08:00–12:00, 14:00–17:00" },
  { day: "Freitag",    hours: "08:00–12:00" },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero noise">
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-10 flex flex-col items-center gap-8">

        {/* Logo / Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-glow"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-display)" }}>WF</span>
          </div>
          <div className="text-center">
            <h1
              className="text-4xl sm:text-5xl font-bold text-gradient leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Urologie Neuwied
            </h1>
            <p className="text-muted-foreground text-sm mt-1 tracking-wide">
              Dr. Walters T. Fomuki · Facharzt für Urologie
            </p>
          </div>
        </div>

        {/* Notice card */}
        <div className="glass rounded-2xl px-6 py-5 w-full text-center">
          <p className="text-foreground text-base leading-relaxed">
            Unsere Website wird derzeit aktualisiert.
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Wir sind weiterhin für Sie erreichbar — rufen Sie uns an oder buchen Sie online.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <a
            href={DOCTOLIB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-gradient px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            <Calendar size={16} />
            Termin buchen
          </a>
          <a
            href="tel:+492631233510"
            className="flex-1 inline-flex items-center justify-center gap-2 glass rounded-xl px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-white/10 transition-all"
          >
            <Phone size={16} />
            02631 – 23351
          </a>
        </div>

        {/* Info grid */}
        <div className="glass-strong rounded-2xl w-full divide-y divide-white/5 overflow-hidden">
          {/* Address */}
          <div className="flex items-start gap-3 px-5 py-4">
            <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Adresse</p>
              <p className="text-sm text-foreground">Urologische Praxis Neuwied</p>
              <p className="text-sm text-muted-foreground">Heddesdorfer Str. 15 · 56564 Neuwied</p>
            </div>
          </div>

          {/* Hours */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Sprechstunden</p>
            </div>
            <div className="space-y-1.5">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground w-28">{h.day}</span>
                  <span className="text-foreground font-medium text-right">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-xs text-center">
          © {new Date().getFullYear()} Urologie Neuwied · Dr. Walters T. Fomuki
        </p>
      </div>
    </div>
  );
}
