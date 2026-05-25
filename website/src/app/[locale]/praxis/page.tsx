import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Award, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsere Praxis",
  description:
    "Die Urologische Praxis Neuwied von Dr. Walters T. Fomuki — Philosophie, Ausstattung, Kooperationen und Standort.",
};

const cooperations = [
  "Marienhaus Klinikum Bendorf-Neuwied-Waldbreitbach",
  "Bundeswehrzentralkrankenhaus Koblenz",
  "Malteser Krankenhaus Bonn",
  "Universitätsklinik Bonn",
  "Universitätsklinik Mainz",
  "Krankenhaus der Barmherzigen Brüder Salzburg",
];

export default function PraxisPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/header_praxis_01.jpg"
          alt="Urologische Praxis Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-accent mb-6">
            Unsere Praxis
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight text-foreground mb-6">
            Modern. <span className="text-gradient italic">Persönlich.</span> Kompetent.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Willkommen in der Urologischen Praxis Neuwied.
          </p>
        </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Philosophy */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="text-xl text-foreground leading-relaxed mb-6">
              Zur Philosophie unserer Praxis gehört es, dass wir uns für jeden einzelnen Patienten die Zeit nehmen,
              um die jeweiligen Krankheitsbeschwerden und medizinischen Fragestellungen ausführlich zu besprechen.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dabei nimmt Vertrauen einen besonderen Stellenwert ein — sind doch Fragen zu Gesundheit,
              Sexualität oder Kinderwunsch immer auch sehr persönlicher Art. Es ist uns besonders wichtig,
              medizinische Entscheidungen so zu treffen, dass Sie sich als Patient immer gut informiert
              und beraten fühlen.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In unserer urologischen Praxis betreuen wir Männer und Frauen mit Beschwerden und Erkrankungen
              der Niere und der ableitenden Harnwege (Blase, Harnleiter, Harnröhre). Wir kümmern uns außerdem
              um Störungen der Prostata und der männlichen Genitalorgane.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Weitere Schwerpunkte stellen die medikamentöse Tumortherapie sowie die Vor- und Nachsorge
              onkologisch-urologischer Erkrankungen dar. So haben Sie die Möglichkeit, Termine bei uns
              möglichst zeitnah und an mehreren Tagen in der Woche zu vereinbaren. Für Notfälle nehmen
              wir uns natürlich kurzfristig Zeit.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Modernste Ausstattung", text: "Hochmoderne Diagnostik- und Therapiegeräte für präzise Befunde, inkl. Kooperation mit dem Radiologischen Institut Koblenz." },
              { title: "Erfahrenes Team", text: "Über 15 Jahre Erfahrung in der urologischen Facharztversorgung, zertifiziert nach DIN EN ISO 9001:2015." },
              { title: "Persönliche Betreuung", text: "Jeder Patient wird individuell und mit Zeit betreut — von der Anmeldung bis zur Nachsorge." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative glass rounded-3xl p-8 hover:-translate-y-2 hover:shadow-glow hover:border-primary/40 transition-all duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-3xl bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative">
                  <div className="w-1.5 h-10 rounded-full bg-primary-gradient mb-5" />
                  <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ISO Cert */}
          <div className="glass rounded-3xl p-8 flex gap-5 items-start">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow flex-shrink-0">
              <ShieldCheck size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground mb-2">
                Zertifiziertes Qualitätsmanagement
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Unsere Praxis besitzt ein Zertifikat über ein Qualitätsmanagementsystem
                nach <span className="font-semibold text-foreground">DIN EN ISO 9001:2015</span>.
                Das Zertifikat steht für strukturierte Abläufe, dokumentierte Qualitätsstandards
                und kontinuierliche Verbesserung — zum Wohl unserer Patienten.
              </p>
            </div>
          </div>

          {/* Cooperations */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow">
                <Building2 size={18} className="text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl text-foreground">Kooperationskliniken</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Für Eingriffe und Behandlungen, die eine stationäre Aufnahme erfordern,
              arbeiten wir mit folgenden Kliniken der Region zusammen:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cooperations.map((coop) => (
                <div
                  key={coop}
                  className="glass rounded-2xl px-6 py-4 flex items-center gap-3 hover:border-primary/30 transition-all"
                >
                  <Award size={16} className="text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{coop}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
