import type { Metadata } from "next";
import Image from "next/image";
import { CreditCard, Info, ArrowRight, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Individuelle Gesundheitsleistungen (IGeL)",
  description:
    "Individuelle Gesundheitsleistungen (IGeL) der Urologie Neuwied — Vasektomie, Potenz- und Hormonstörungen, PSA/Testosteron, NMP22 Blasenkrebstest, EMDA-Therapie, StroVac und mehr.",
};

const services = [
  {
    title: "Vasektomie",
    subtitle: "Sterilisation des Mannes",
    desc: "Konventionell und ohne Skalpell (No-Scalpel-Technik). Fomuki ist Mitglied im Vasektomie-Experten-Netzwerk. Weitere Informationen unter vasektomie-neuwied.de.",
    link: "https://www.vasektomie-neuwied.de",
    external: true,
  },
  {
    title: "Potenz- und Hormonstörungen",
    subtitle: "Andrologie & Männergesundheit",
    desc: "Umfassende Diagnostik und Behandlung von Erektionsstörungen, Testosteronmangel (Hypogonadismus) und verwandten Beschwerden des Mannes.",
    link: "/leistungen/andrologie",
    external: false,
  },
  {
    title: "PSA & Testosteron-Messung",
    subtitle: "Ergänzende Vorsorge",
    desc: "PSA (Prostata-spezifisches Antigen) und Testosteronbestimmung als Ergänzung im Rahmen der Vorsorge oder bei Abklärung von Potenzstörungen — auf Wunsch des Patienten.",
    link: null,
    external: false,
  },
  {
    title: "NMP22 BladderCheck",
    subtitle: "Früherkennung Blasenkrebs",
    desc: "Schnelltest auf NMP22 (Nuclear Matrix Protein 22) zur zuverlässigen Früherkennung von Blasenkarzinomen — ergänzend zur Standarddiagnostik.",
    link: null,
    external: false,
  },
  {
    title: "ScheBo M2-PK Quick",
    subtitle: "Früherkennung Darmkrebs",
    desc: "Direkttest im Stuhl zur Früherkennung von Darmkrebs — einfach in der Durchführung, laborunabhängig.",
    link: null,
    external: false,
  },
  {
    title: "EMDA-Therapie",
    subtitle: "Induratio Penis Plastica (IPP)",
    desc: "Elektromotive Medikamenten-Applikation (EMDA) — eine nicht-chirurgische Behandlungsmethode bei Penisabknickung / Peyronie-Erkrankung.",
    link: null,
    external: false,
  },
  {
    title: "StroVac®-Impfung",
    subtitle: "Vorbeugung bei häufigen Harnwegsinfekten",
    desc: "Immunisierung mit StroVac® (OM-89) für Patientinnen und Patienten mit rezidivierenden Harnblasenentzündungen zur Vorbeugung weiterer Infekte.",
    link: null,
    external: false,
  },
  {
    title: "Urovaxom",
    subtitle: "Schluckimpfung bei Harnwegsinfekten",
    desc: "Orale Immuntherapie mit Urovaxom zur Prophylaxe häufig wiederkehrender Harnblasenentzündungen — bequem als Tablette einzunehmen.",
    link: null,
    external: false,
  },
];

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website";

export default function IndividuelleLeistungenPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/IndividuelleGesundheitsleistungen-header.jpg"
          alt="Individuelle Gesundheitsleistungen Urologie Neuwied"
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
              Individuelle <span className="text-gradient italic">Gesundheitsleistungen</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Investieren Sie in Ihre Gesundheit — mit IGeL-Leistungen, die über den
              gesetzlichen Leistungskatalog hinausgehen.
            </p>
          </div>
        </div>
      </section>

      {/* What is IGeL */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 flex gap-6 items-start">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow flex-shrink-0 mt-1">
              <Stethoscope size={22} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground mb-4">Was sind IGeL?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Individuelle Gesundheitsleistungen (IGeL) sind ärztliche Leistungen, die nicht
                im Leistungskatalog der gesetzlichen Krankenversicherung enthalten sind —
                häufig weil der gesetzliche Nutzennachweis fehlt, obwohl die Leistung
                medizinisch sinnvoll sein kann.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Wir bieten Ihnen transparente Beratung, welche IGeL-Leistungen für Ihre
                individuelle Situation empfehlenswert sind. Die Abrechnung erfolgt gemäß GOÄ
                (Gebührenordnung für Ärzte). Vor jeder Leistungserbringung erhalten Sie eine
                schriftliche Vereinbarung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow">
              <CreditCard size={18} className="text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl text-foreground">Unsere IGeL-Angebote</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="glass rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="font-display text-lg text-foreground mb-0.5">{svc.title}</h3>
                  <p className="text-xs text-accent font-medium mb-3">{svc.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                </div>
                {svc.link && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    {svc.external ? (
                      <a
                        href={svc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-foreground transition-colors"
                      >
                        {svc.link.replace("https://www.", "")} <ArrowRight size={12} />
                      </a>
                    ) : (
                      <a
                        href={svc.link}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-foreground transition-colors"
                      >
                        Mehr erfahren <ArrowRight size={12} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-6 flex gap-4 items-start border-accent/20">
            <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Transparenz & Freiwilligkeit</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                IGeL-Leistungen sind freiwillig. Sie können jede Leistung ablehnen, ohne
                Nachteile für Ihre weitere Behandlung befürchten zu müssen. Bei Interesse
                sprechen Sie uns an — wir beraten Sie gerne.
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
              <h3 className="font-display text-3xl text-foreground mb-3">Interesse an einer IGeL?</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Sprechen Sie uns bei Ihrem nächsten Besuch an oder vereinbaren Sie einen
                Beratungstermin.
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
