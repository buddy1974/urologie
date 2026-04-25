import type { Metadata } from "next";
import Image from "next/image";
import { Baby, Check, ExternalLink, Microscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Andrologie & Vasektomie",
  description: "Männergesundheit in Neuwied — Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch.",
};

const services = [
  "Männliche Sterilisation — Vasektomie (konservativ und non-skalpell)",
  "Erektionsstörungen (impotentia coeundi)",
  "Vorzeitiger Samenerguss",
  "Testosteronmangel",
  "Unerfüllter Kinderwunsch / Fruchtbarkeitsstörungen",
  "Penisverkrümmung — Induratio Penis plastica (IPP)",
  "Varikozele",
  "Hodenhochstand",
];

export default function AndrologiePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/leistungen_004.jpg"
          alt="Andrologie & Vasektomie Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
              <Baby size={30} className="text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-widest text-accent mb-4">Leistungen</div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Andrologie &amp; Vasektomie</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Männergesundheit — kompetent und diskret.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">

          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="font-display text-3xl text-foreground mb-8">Unsere andrologischen Leistungen</h2>
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s} className="flex items-start gap-3">
                  <Check size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                  <span className="text-muted-foreground text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border-accent/20">
            <p className="font-semibold text-foreground mb-2">Vasektomie-Experten Netzwerk</p>
            <p className="text-muted-foreground text-sm mb-4">Dr. Fomuki ist zertifiziertes Mitglied im Netzwerk der Vasektomie-Experten.</p>
            <a
              href="http://www.vasektomie-neuwied.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors"
            >
              www.vasektomie-neuwied.de <ExternalLink size={13} />
            </a>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-2">Ausstattung</div>
            <h2 className="font-display text-3xl text-foreground mb-2">Modernste Geräteausstattung</h2>
            <p className="text-muted-foreground text-sm mb-6">Zertifizierte Analysetechnik für objektive Fertilitätsdiagnostik.</p>
            <div className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 transition-all duration-500">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow mb-4">
                <Microscope size={18} className="text-primary-foreground" />
              </div>
              <p className="font-semibold text-foreground text-sm mb-2">MES SQA-iO + SQA-VU</p>
              <p className="text-muted-foreground text-xs leading-relaxed">Spermienqualitätsanalyse — vollautomatische Messung von Konzentration, Motilität und Morphologie, mit visueller Mikroskopie-Komponente</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
