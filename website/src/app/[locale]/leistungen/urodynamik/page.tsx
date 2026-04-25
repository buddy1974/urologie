import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Check, Microscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Urodynamik & Ästhetische Medizin",
  description: "Blasendruckmessung und ästhetische Medizin mit Botox und Filler in Neuwied.",
};

const machines = [
  { name: "Model Newton Urodynamik-System", desc: "Mehrkanalige urodynamische Messung — Blasendruck, Harnfluss und Sphinkteraktivität gleichzeitig erfasst, für präzise Inkontinenz- und Obstruktionsdiagnostik" },
  { name: "QRS Pelvi Center", desc: "Magnetstimulationstherapie — nicht-invasive Behandlung von Blasenschwäche und Beckenbodendysfunktion, Patient sitzt bekleidet, schmerzfrei" },
];

export default function UrodynamikPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/urodynamik.jpg"
          alt="Urodynamik Blasendruckmessung Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
              <Sparkles size={30} className="text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-widest text-accent mb-4">Leistungen</div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Urodynamik &amp; Ästhetik</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Blasendiagnostik und ästhetische Behandlungen aus einer Hand.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-4">Urodynamik</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Die Urodynamik (Blasendruckmessung) ist die präziseste Methode zur Diagnose von Harninkontinenz und Blasenentleerungsstörungen.
              </p>
              <div className="space-y-2">
                {[
                  "Harninkontinenz-Diagnostik",
                  "Blasenentleerungsstörungen",
                  "Überaktive Blase (OAB)",
                  "Therapieplanung Inkontinenz",
                ].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={15} className="text-accent flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-4">Ästhetische Medizin</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Diskrete und professionelle ästhetische Behandlungen durch den erfahrenen Facharzt.
              </p>
              <div className="space-y-2">
                {[
                  "Botox-Behandlungen",
                  "Filler-Injektionen",
                  "Faltenbehandlung",
                  "Individuelle Beratung",
                ].map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <Check size={15} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Machines */}
          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-2">Ausstattung</div>
            <h2 className="font-display text-3xl text-foreground mb-2">Modernste Geräteausstattung</h2>
            <p className="text-muted-foreground text-sm mb-6">Spezialisierte Medizintechnik für präzise Urodynamik und Beckenbodentherapie.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {machines.map((m) => (
                <div key={m.name} className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 transition-all duration-500">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow mb-4">
                    <Microscope size={18} className="text-primary-foreground" />
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-2">{m.name}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
