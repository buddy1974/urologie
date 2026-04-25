import type { Metadata } from "next";
import Image from "next/image";
import { Microscope, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Diagnostik",
  description: "Urologische Diagnostik in Neuwied — Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie.",
};

const items = [
  "Labor (Urindiagnostik, Mikrobiologie, PSA und Testosteronbestimmungen)",
  "Spermiogramme bei unerfülltem Kinderwunsch oder nach Vasektomie",
  "Ultraschall (Sonographie, Transrektale Sonographie, Dopplersonographie)",
  "Zystoskopie (Blasenspiegelung mit Video)",
  "Prostatabiopsie — TRUS gesteuert",
  "Uroflowmetrie (Harnflussmessung)",
  "Schwellkörper(auto)injektionstest (SKIT/SKAT) bei Erektionsstörungen",
  "Kooperation mit dem Radiologischen Institut Koblenz",
];

const conditions = [
  "Blasen- oder Nierensteine",
  "Entzündungen der Harnwege",
  "Sexuell übertragbare Erkrankungen",
  "Blut im Urin oder Ejakulat",
  "Inkontinenz und Blasenentleerungsstörungen",
  "Benigne Prostatahyperplasie (BPH)",
];

const machines = [
  { name: "UriSed Mini", desc: "Automatisierte Urinanalyse — erkennt Zellen, Bakterien und Kristalle digital, vernetzt mit LabCONNECT für sofortige Ergebnisübertragung" },
  { name: "LabUReader Plus 2", desc: "Urinteststreifen-Auswertung — bis zu 10 Proben gleichzeitig, analysiert Glucose, Protein, Blut, pH und Nitrit automatisch" },
  { name: "Thermo Scientific Multiskan FC", desc: "PSA-Analyse — hochpräzise Messung des PSA-Wertes mittels ELISA-Verfahren, für Prostatakrebs-Früherkennung und Verlaufskontrolle" },
  { name: "Ultraschall-System", desc: "Hochauflösende Ultraschalldiagnostik — Niere, Blase, Prostata und Hoden, mehrere Schallköpfe für präzise Bildgebung bei Tumoren, Steinen und Vergrößerungen" },
];

export default function DiagnostikPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/header_leistungen_01.jpg"
          alt="Diagnostik Urologie Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
              <Microscope size={30} className="text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-widest text-accent mb-4">Leistungen</div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Diagnostik</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Präzise Diagnosen mit modernster Technik.</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services list */}
            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-2xl text-foreground mb-6">Diagnostische Leistungen</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-5">
              <div className="glass rounded-3xl p-8">
                <h2 className="font-display text-2xl text-foreground mb-6">Abklärung &amp; Therapie bei</h2>
                <div className="space-y-3">
                  {conditions.map((c) => (
                    <div key={c} className="flex items-start gap-3">
                      <Check size={16} className="flex-shrink-0 mt-0.5 text-primary" />
                      <span className="text-muted-foreground text-sm">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-6 border-accent/20">
                <p className="text-accent text-sm font-medium leading-relaxed">
                  Für eine Überweisung oder einen Termin erreichen Sie uns unter <strong>02631 - 23351</strong> oder buchen Sie online über Doctolib.
                </p>
              </div>
            </div>
          </div>

          {/* Machines */}
          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-2">Ausstattung</div>
            <h2 className="font-display text-3xl text-foreground mb-2">Modernste Geräteausstattung</h2>
            <p className="text-muted-foreground text-sm mb-8">Zertifizierte Medizintechnik für präzise Diagnosen und schnelle Ergebnisse.</p>
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
