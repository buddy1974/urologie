import type { Metadata } from "next";
import Image from "next/image";
import { Zap, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "UroLift® bei BPH",
  description: "UroLift® Behandlung bei benigner Prostatahyperplasie in Neuwied — ambulant, schonend, ohne Operation.",
};

export default function UroliftPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/Ambulante-Operationen1.jpg"
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
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Schonende Behandlung der Prostatavergrößerung — ambulant und schnell wirksam.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Was ist UroLift®?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                UroLift® ist ein minimalinvasives Verfahren zur Behandlung der benignen Prostatahyperplasie (BPH) — einer gutartigen Vergrößerung der Prostata.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Kleine Implantate halten das Prostatagewebe dauerhaft zur Seite und öffnen so die Harnröhre — ohne Schnitt, ohne Wärme, ohne Entfernung von Gewebe.
              </p>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Vorteile</h2>
              <div className="space-y-3">
                {[
                  "Ambulanter Eingriff",
                  "Keine Vollnarkose erforderlich",
                  "Schnelle Erholung",
                  "Erhalt der Sexualfunktion",
                  "Langanhaltende Wirkung",
                  "Keine tägliche Medikamenteneinnahme",
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
        </div>
      </section>
    </div>
  );
}
