import type { Metadata } from "next";
import Image from "next/image";
import { Zap, Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "UroLift® bei BPH",
  description:
    "UroLift® Behandlung bei benigner Prostatahyperplasie in Neuwied — ambulant, schonend, ohne Gewebsentfernung.",
};

const steps = [
  {
    step: "1",
    title: "Einführung",
    desc: "Das UroLift®-System wird zystoskopisch in die Harnröhre eingeführt.",
    img: "/images/leistung/urolift_schritt_1.png",
  },
  {
    step: "2",
    title: "Positionierung",
    desc: "Das Prostatagewebe, das die Harnröhre einengt, wird identifiziert und angehoben.",
    img: "/images/leistung/urolift_schritt_2.png",
  },
  {
    step: "3",
    title: "Implantation",
    desc: "Kleine Implantate halten das Gewebe dauerhaft zur Seite und öffnen die Harnröhre.",
    img: "/images/leistung/urolift_schritt_3.png",
  },
  {
    step: "4",
    title: "Ergebnis",
    desc: "Die Harnröhre ist frei — verbesserter Harnfluss ohne Gewebsentfernung.",
    img: "/images/leistung/urolift_schritt_4.png",
  },
];

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website";

export default function UroliftPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/pics/header_leistungen_01.jpg"
          alt="UroLift BPH Behandlung Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
              <Zap size={30} className="text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-widest text-accent mb-4">Leistungen</div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">UroLift® bei BPH</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Schonende, ambulante Behandlung der gutartigen Prostatavergrößerung — ohne Schnitt, ohne Wärme.
            </p>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Was ist UroLift®?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                UroLift® ist ein minimalinvasives Verfahren zur Behandlung der benignen
                Prostatahyperplasie (BPH) — einer gutartigen Vergrößerung der Prostata, die
                zu Problemen beim Wasserlassen führen kann.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Kleine Implantate halten das Prostatagewebe dauerhaft zur Seite und öffnen
                so die Harnröhre — ohne Schnitt, ohne Wärme, ohne Entfernung von Gewebe.
                Der Eingriff wird ambulant in unserer Praxis durchgeführt.
              </p>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Vorteile</h2>
              <div className="space-y-3">
                {[
                  "Ambulanter Eingriff — kein Krankenhausaufenthalt",
                  "Keine Vollnarkose erforderlich",
                  "Schnelle Erholung — meist gleicher Tag",
                  "Erhalt der Sexualfunktion",
                  "Langanhaltende Wirkung",
                  "Keine tägliche Medikamenteneinnahme",
                  "Kein Gewebsverlust — umkehrbar",
                ].map((v) => (
                  <div key={v} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-gradient shadow-glow flex-shrink-0">
                      <Check size={11} className="text-primary-foreground" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Before / After */}
          <div className="glass rounded-3xl p-8 mb-10">
            <h2 className="font-display text-2xl text-foreground mb-6">Vorher / Nachher</h2>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
              <Image
                src="/images/leistung/urolift_vor_nach.png"
                alt="UroLift Vorher Nachher Vergleich"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm text-center mt-4">
              Links: Eingeengte Harnröhre durch BPH · Rechts: Geöffnete Harnröhre nach UroLift®
            </p>
          </div>

          {/* Anatomy */}
          <div className="glass rounded-3xl p-8 mb-10">
            <h2 className="font-display text-2xl text-foreground mb-6">Anatomie &amp; Implantat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden bg-white/5" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/leistung/anatomie_prostate.png"
                  alt="Anatomie Prostata bei BPH"
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-white/5" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/leistung/implantat.png"
                  alt="UroLift Implantat"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Steps */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-foreground mb-8 text-center">
            Ablauf des Eingriffs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.step} className="glass rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={s.img}
                    alt={`UroLift Schritt ${s.step}: ${s.title}`}
                    fill
                    className="object-contain bg-white/5 p-3"
                  />
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-primary-gradient flex items-center justify-center shadow-glow">
                    <span className="text-xs font-bold text-primary-foreground">{s.step}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden glass-strong rounded-[2rem] p-10 text-center shadow-elegant">
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
            <div className="relative">
              <h3 className="font-display text-3xl text-foreground mb-3">UroLift® in Neuwied</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Dr. Fomuki berät Sie gerne, ob UroLift® für Ihre Situation geeignet ist.
                Vereinbaren Sie jetzt einen Termin.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={DOCTOLIB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  Online buchen
                  <ArrowRight size={14} />
                </a>
                <a
                  href="tel:+49263123351"
                  className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-white/10 transition-all"
                >
                  02631 - 23351
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
