import type { Metadata } from "next";
import Image from "next/image";
import { Scissors, CheckCircle, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ambulante Operationen",
  description:
    "Ambulante urologische Operationen in der Praxis Neuwied — Vasektomie, Zirkumzision, UroLift®, Botox der Blase, Meatotomie, Frenulumplastik und mehr.",
};

const procedures = [
  {
    title: "Vasektomie",
    subtitle: "Sterilisation des Mannes",
    desc: "Sowohl konventionell als auch ohne Skalpell (No-Scalpel-Vasektomie). Fomuki ist Mitglied im Vasektomie-Experten-Netzwerk.",
    link: "/leistungen/andrologie",
  },
  {
    title: "UroLift®",
    subtitle: "Bei benigner Prostatahyperplasie (BPH)",
    desc: "Minimalinvasive Behandlung der gutartigen Prostatavergrößerung zur Verbesserung des Harnflusses — ohne Resektion, ohne Implantate.",
    link: "/leistungen/urolift",
  },
  {
    title: "Zirkumzision",
    subtitle: "Beschneidung",
    desc: "Operative Behandlung bei Vorhautverengung (Phimose) sowie bei medizinischer Indikation.",
    link: null,
  },
  {
    title: "Botox-Injektionen der Blase",
    subtitle: "Bei Blasenschwäche / überaktiver Blase",
    desc: "Injektion von Botulinumtoxin A in die Blasenwand zur Behandlung der überaktiven Blase — ggf. auch ohne Narkose möglich.",
    link: null,
  },
  {
    title: "Meatotomie",
    subtitle: "Harnröhreneingangserweiterung",
    desc: "Kleine operative Erweiterung des Harnröhrenausgangs bei Verengung (Meatusstenose) mit anschließend verbessertem Harnstrahl.",
    link: null,
  },
  {
    title: "Frenulumplastik",
    subtitle: "Bei verkürztem Vorhautbändchen",
    desc: "Operative Korrektur des Frenulum praeputii bei Beschwerden durch ein zu kurzes Vorhautbändchen.",
    link: null,
  },
  {
    title: "Operationen am äußeren Genitale",
    subtitle: "Hydrocele, Varikocele, Condylome",
    desc: "Alle gängigen Eingriffe am äußeren Genitale des Mannes — darunter Hydrocelen- und Varicocelenoperationen sowie die Entfernung von Feigwarzen (Condylome).",
    link: null,
  },
];

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website";

export default function AmbulantePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/Ambulante-Operationen1.jpg"
          alt="Ambulante Operationen Urologie Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-accent mb-6">
              Leistungen
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight text-foreground mb-6">
              Ambulante <span className="text-gradient italic">Operationen</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Viele urologische Eingriffe führen wir direkt in unserer Praxis durch —
              schonend, zuverlässig und ohne stationären Krankenhausaufenthalt.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 flex gap-6 items-start">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow flex-shrink-0 mt-1">
              <Scissors size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">
                Sicher. Minimal-invasiv. In der Praxis.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ambulante Operationen bieten den Vorteil, dass Sie denselben Tag noch nach
                Hause gehen können. Unsere Praxis verfügt über modernste Ausstattung für
                ambulante Eingriffe im urologischen Bereich.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Vor jedem Eingriff erfolgt ein ausführliches Aufklärungs- und
                Beratungsgespräch mit Fomuki. Bei Bedarf koordinieren wir auch
                Eingriffe, die eine Vollnarkose in einer Kooperationsklinik erfordern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow">
              <CheckCircle size={18} className="text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl text-foreground">Unsere ambulanten Eingriffe</h2>
          </div>

          <div className="space-y-4">
            {procedures.map((proc) => (
              <div
                key={proc.title}
                className="glass rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="font-display text-lg text-foreground">{proc.title}</h3>
                      <span className="text-xs text-accent font-medium">{proc.subtitle}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{proc.desc}</p>
                  </div>
                  {proc.link && (
                    <Link
                      href={proc.link}
                      className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-foreground transition-colors mt-1"
                    >
                      Mehr erfahren <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info box */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-6 flex gap-4 items-start border-accent/20">
            <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Kassenleistung & Selbstzahler</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Die meisten ambulanten Operationen werden von den gesetzlichen Krankenkassen übernommen.
                Einige Eingriffe können auch als Selbstzahlerleistung (IGeL) durchgeführt werden.
                Ihr konkreter Versicherungsstatus wird im Vorgespräch mit Ihnen besprochen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden glass-strong rounded-[2rem] p-10 text-center shadow-elegant">
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
            <div className="relative">
              <h3 className="font-display text-3xl text-foreground mb-3">Termin vereinbaren</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Für ein Erstgespräch oder zur Terminvereinbarung vor einem geplanten Eingriff
                kontaktieren Sie uns telefonisch oder buchen Sie direkt online.
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
