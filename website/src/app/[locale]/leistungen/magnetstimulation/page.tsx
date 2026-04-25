import type { Metadata } from "next";
import Image from "next/image";
import { Activity, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Magnetstimulation",
  description: "Magnetstimulation der Beckenbodenmuskulatur bei Inkontinenz in Neuwied.",
};

export default function MagnetstimulationPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/magnetstimulanz_01.jpg"
          alt="Magnetstimulation Beckenboden Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
              <Activity size={30} className="text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-widest text-accent mb-4">Leistungen</div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Magnetstimulation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Stärkung der Beckenbodenmuskulatur — nicht-invasiv und effektiv.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-4">Was ist Magnetstimulation?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die extrakorporale Magnetstimulation (EMS) stärkt die Beckenbodenmuskulatur durch magnetisch induzierte Muskelkontraktionen — ohne Ausziehen, ohne Schmerzen.
              </p>
              <h3 className="font-semibold text-foreground mb-3">Einsatzgebiete</h3>
              <div className="space-y-2">
                {[
                  "Blasenschwäche / Harninkontinenz",
                  "Nach Prostatektomie",
                  "Nach Entbindung",
                  "Beckenbodenschwäche bei Mann und Frau",
                ].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={15} className="text-accent flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8 border-accent/20">
              <h3 className="font-display text-2xl text-foreground mb-6">Vorteile der Behandlung</h3>
              <div className="space-y-3">
                {[
                  "Vollständig bekleidet während Behandlung",
                  "Schmerzfrei und nicht-invasiv",
                  "Keine Nebenwirkungen",
                  "Ambulant in der Praxis",
                  "Messbare Verbesserung der Kontinenz",
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
