"use client";

import { useState, FormEvent } from "react";
import {
  Phone,
  Printer,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Accessibility,
} from "lucide-react";

const hours = [
  { day: "Montag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
  { day: "Dienstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
  { day: "Mittwoch", hours: "08:00–12:00 Uhr" },
  { day: "Donnerstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
  { day: "Freitag", hours: "08:00–12:00 Uhr" },
];

type FormState = {
  anrede: string;
  vorname: string;
  nachname: string;
  telefon: string;
  email: string;
  nachricht: string;
};

const INITIAL: FormState = {
  anrede: "keine",
  vorname: "",
  nachname: "",
  telefon: "",
  email: "",
  nachricht: "",
};

export default function KontaktPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Ein Fehler ist aufgetreten.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setErrorMsg("Netzwerkfehler. Bitte versuchen Sie es erneut.");
      setStatus("error");
    }
  }

  const charCount = form.nachricht.length;

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
            Erreichen Sie uns telefonisch, per Fax, über das Kontaktformular oder buchen Sie
            Ihren Termin bequem online über Doctolib.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Top grid: contact info + hours + map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left — Contact Info + Hours */}
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

                    {/* Accessibility */}
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow flex-shrink-0">
                        <Accessibility size={16} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Barrierefreiheit</p>
                        <p className="text-foreground font-medium">Rollstuhlgerecht · Aufzug vorhanden</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.0419331261096!2d7.470150976828824!3d50.440319588092734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be8a0ab01c0a65%3A0xc9a8fa9d6dcf0e64!2sDierdorfer%20Str.%20115%2C%2056564%20Neuwied!5e0!3m2!1sen!2sde!4v1777716475779!5m2!1sen!2sde"
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
                  <p><span className="font-semibold text-foreground">♿ Zugang:</span> Rollstuhlgerechter Eingang · Aufzug im Gebäude</p>
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

          {/* Contact Form */}
          <div className="glass rounded-3xl overflow-hidden">
            <div className="h-1 w-full bg-primary-gradient" />
            <div className="p-8 md:p-12">
              <h2 className="font-display text-2xl text-foreground mb-2">Kontaktformular</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Schreiben Sie uns — wir antworten schnellstmöglich.
              </p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} className="text-accent mb-6" />
                  <h3 className="font-display text-2xl text-foreground mb-3">
                    Nachricht gesendet!
                  </h3>
                  <p className="text-muted-foreground max-w-sm mb-8">
                    Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="rounded-full glass px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/10 transition-all"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">

                  {/* Error banner */}
                  {status === "error" && (
                    <div className="flex items-start gap-3 glass rounded-2xl px-4 py-3 border border-red-400/30 text-red-400">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{errorMsg}</p>
                    </div>
                  )}

                  {/* Row 1: Anrede + Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Anrede
                      </label>
                      <select
                        name="anrede"
                        value={form.anrede}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground bg-transparent border border-white/10 focus:border-accent/50 focus:outline-none transition-colors"
                      >
                        <option value="keine">–</option>
                        <option value="Herr">Herr</option>
                        <option value="Frau">Frau</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Vorname <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="vorname"
                        value={form.vorname}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                        placeholder="Max"
                        className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground bg-transparent border border-white/10 focus:border-accent/50 focus:outline-none transition-colors placeholder:text-muted-foreground/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Nachname <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="nachname"
                        value={form.nachname}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                        placeholder="Mustermann"
                        className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground bg-transparent border border-white/10 focus:border-accent/50 focus:outline-none transition-colors placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Row 2: Telefon + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Telefon <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefon"
                        value={form.telefon}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        placeholder="02631 12345"
                        className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground bg-transparent border border-white/10 focus:border-accent/50 focus:outline-none transition-colors placeholder:text-muted-foreground/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        E-Mail <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="max@beispiel.de"
                        className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground bg-transparent border border-white/10 focus:border-accent/50 focus:outline-none transition-colors placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Nachricht */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Nachricht <span className="text-red-400">*</span>
                      </label>
                      <span className={`text-xs ${charCount > 1800 ? "text-red-400" : "text-muted-foreground"}`}>
                        {charCount}/2000
                      </span>
                    </div>
                    <textarea
                      name="nachricht"
                      value={form.nachricht}
                      onChange={handleChange}
                      required
                      rows={6}
                      maxLength={2000}
                      placeholder="Ihr Anliegen..."
                      className="w-full glass rounded-xl px-4 py-3 text-sm text-foreground bg-transparent border border-white/10 focus:border-accent/50 focus:outline-none transition-colors placeholder:text-muted-foreground/40 resize-none"
                    />
                  </div>

                  {/* Privacy note + Submit */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet
                      und nicht an Dritte weitergegeben.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Wird gesendet…
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Nachricht senden
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
