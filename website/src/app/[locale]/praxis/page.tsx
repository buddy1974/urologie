import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsere Praxis",
  description: "Die Urologische Praxis Neuwied von Dr. Walters T. Fomuki — Philosophie, Ausstattung und Standort.",
};

export default function PraxisPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-hero noise overflow-hidden pt-36 pb-24 px-6">
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
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Main text */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="text-xl text-foreground leading-relaxed mb-6">
              Zur Philosophie unserer Praxis gehört es, dass wir uns für jeden einzelnen Patienten die Zeit nehmen,
              um die jeweiligen Krankheitsbeschwerden und medizinischen Fragestellungen ausführlich zu besprechen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Es ist uns besonders wichtig, medizinische Entscheidungen so zu treffen, dass Sie sich als Patient
              immer gut informiert und beraten fühlen. Unser Ziel ist eine partnerschaftliche Arzt-Patienten-Beziehung,
              die auf Vertrauen, Transparenz und gegenseitigem Respekt basiert.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Modernste Ausstattung", text: "Hochmoderne Diagnostik- und Therapiegeräte für präzise Befunde." },
              { title: "Erfahrenes Team", text: "Über 15 Jahre Erfahrung in der urologischen Facharztversorgung." },
              { title: "Persönliche Betreuung", text: "Jeder Patient wird individuell und mit Zeit betreut." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group glass rounded-3xl p-8 hover:-translate-y-2 hover:shadow-glow hover:border-primary/40 transition-all duration-500"
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
        </div>
      </section>
    </div>
  );
}
