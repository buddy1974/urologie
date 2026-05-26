import type { Metadata } from "next";
import Image from "next/image";
import { Baby, Heart, ArrowRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Kinderurologie",
  description:
    "Kinderurologie in der Urologischen Praxis Neuwied — Behandlung von Phimose, Hodenhochstand, Hypospadie, Epispadie und Bettnässen (Enuresis).",
};

const conditions = [
  {
    title: "Vorhautverengung (Phimose)",
    desc: "Die Phimose ist eine der häufigsten urologischen Erkrankungen im Kindesalter. Wir differenzieren zwischen physiologischer (altersentsprechender) und pathologischer Phimose und bieten je nach Befund konservative (Steroidcreme) oder operative Therapie (Zirkumzision oder plastische Erweiterung).",
    icon: "🩺",
  },
  {
    title: "Hodenhochstand (Kryptorchismus)",
    desc: "Beim Hodenhochstand liegt ein oder beide Hoden nicht im Hodensack. Frühzeitige Behandlung ist wichtig für die spätere Fertilität. Wir koordinieren Diagnostik und ggf. operative Einlage in Kooperation mit Kinderkliniken der Region.",
    icon: "🔍",
  },
  {
    title: "Fehlbildungen (Hypospadie & Epispadie)",
    desc: "Hypospadie (Harnröhrenöffnung an der Unterseite des Penis) und Epispadie (an der Oberseite) erfordern individuelle Planung. Wir übernehmen Diagnose, Beratung und Koordination der spezialisierten Korrektur.",
    icon: "⚕️",
  },
  {
    title: "Bettnässen (Enuresis nocturna / diurna)",
    desc: "Enuresis ist eine häufige und behandelbare Erkrankung. Die nächtliche (Enuresis nocturna) und tageszeitliche (Enuresis diurna) Form werden durch Anamnese, Miktionsprotokoll und Sonographie abgeklärt. Therapieoptionen umfassen Verhaltenstherapie, Alarmapparate und medikamentöse Behandlung.",
    icon: "🌙",
  },
];

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website";

export default function KindeurologiePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/header_leistungen_01.jpg"
          alt="Kinderurologie Neuwied"
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
              Kinder<span className="text-gradient italic">urologie</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Einfühlsame, kompetente Versorgung bei urologischen Erkrankungen im Kindes-
              und Jugendalter — für kleine Patienten und ihre Familien.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 flex gap-6 items-start">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow flex-shrink-0 mt-1">
              <Baby size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">
                Urologische Versorgung für Kinder & Jugendliche
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Urologische Erkrankungen bei Kindern erfordern besondere Sorgfalt und
                Einfühlungsvermögen — sowohl gegenüber den kleinen Patienten als auch
                gegenüber den Eltern. Fomuki nimmt sich die Zeit für ein ausführliches
                Gespräch und erklärt Diagnose und Therapie verständlich.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Für Eingriffe, die eine Vollnarkose erfordern, arbeiten wir eng mit
                spezialisierten Kinderkliniken der Region zusammen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow">
              <Heart size={18} className="text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl text-foreground">Behandlungsschwerpunkte</h2>
          </div>

          <div className="space-y-5">
            {conditions.map((cond, i) => (
              <div
                key={cond.title}
                className="group glass rounded-2xl p-7 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-5 items-start">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{cond.icon}</span>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">{cond.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cond.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note for parents */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-6 flex gap-4 items-start border-accent/20">
            <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Hinweis für Eltern</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bitte bringen Sie zur Erstvorstellung alle vorhandenen Vorbefunde, Ultraschallbilder
                und ärztliche Überweisungen mit. Manche Befunde (z. B. beim Hodenhochstand) sind
                zeitkritisch — zögern Sie nicht, frühzeitig einen Termin zu vereinbaren.
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
                Rufen Sie uns an oder buchen Sie online. Wir nehmen uns die Zeit für Ihr Kind.
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
