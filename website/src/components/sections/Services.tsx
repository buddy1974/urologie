import Image from "next/image";
import Link from "next/link";

const content = {
  de: {
    heading: "Unsere Leistungen",
    subheading: "Kompetente Versorgung in allen Bereichen der Urologie",
    moreLabel: "Mehr erfahren →",
    services: [
      { key: "diagnostik", title: "Diagnostik", desc: "Labor, Sonographie, Zystoskopie und Prostatabiopsie für eine präzise Diagnose.", image: "/assets/header_leistungen_02.jpg" },
      { key: "onkologie", title: "Onkologie", desc: "Onkologische Betreuung und Nachsorge bei urologischen Tumoren.", image: "/assets/leistungen_007.jpg" },
      { key: "andrologie", title: "Andrologie", desc: "Männergesundheit, Vasektomie und Fruchtbarkeitsstörungen — kompetent und diskret.", image: "/assets/leistungen_005.jpg" },
      { key: "urolift", title: "UroLift®", desc: "Minimalinvasive Behandlung der gutartigen Prostatavergrößerung — ohne Gewebeentfernung.", image: "/assets/leistungen_003.jpg" },
      { key: "magnetstimulation", title: "Magnetstimulation", desc: "Stärkung der Beckenbodenmuskulatur bei Inkontinenz — nicht-invasiv.", image: "/assets/magnetstimulanz_01.jpg" },
      { key: "urodynamik", title: "Urodynamik & Ästhetik", desc: "Blasendruckmessung bei Harninkontinenz sowie ästhetische Medizin.", image: "/assets/urodynamik.jpg" },
    ],
  },
  en: {
    heading: "Our Services",
    subheading: "Expert care across all areas of urology",
    moreLabel: "Learn more →",
    services: [
      { key: "diagnostik", title: "Diagnostics", desc: "Lab, ultrasound, cystoscopy and prostate biopsy for precise diagnosis.", image: "/assets/header_leistungen_02.jpg" },
      { key: "onkologie", title: "Oncology", desc: "Oncological care and follow-up for urological tumors.", image: "/assets/leistungen_007.jpg" },
      { key: "andrologie", title: "Andrology", desc: "Men's health, vasectomy and fertility disorders — competent and discreet.", image: "/assets/leistungen_005.jpg" },
      { key: "urolift", title: "UroLift®", desc: "Minimally invasive treatment of benign prostate enlargement — without tissue removal.", image: "/assets/leistungen_003.jpg" },
      { key: "magnetstimulation", title: "Magnetic Stimulation", desc: "Pelvic floor strengthening for incontinence — non-invasive.", image: "/assets/magnetstimulanz_01.jpg" },
      { key: "urodynamik", title: "Urodynamics & Aesthetics", desc: "Bladder pressure measurement plus aesthetic medicine.", image: "/assets/urodynamik.jpg" },
    ],
  },
  fr: {
    heading: "Nos Prestations",
    subheading: "Des soins experts dans tous les domaines de l'urologie",
    moreLabel: "En savoir plus →",
    services: [
      { key: "diagnostik", title: "Diagnostic", desc: "Laboratoire, échographie, cystoscopie et biopsie de la prostate pour un diagnostic précis.", image: "/assets/header_leistungen_02.jpg" },
      { key: "onkologie", title: "Oncologie", desc: "Prise en charge oncologique et suivi des tumeurs urologiques.", image: "/assets/leistungen_007.jpg" },
      { key: "andrologie", title: "Andrologie", desc: "Santé masculine, vasectomie et troubles de la fertilité — compétence et discrétion.", image: "/assets/leistungen_005.jpg" },
      { key: "urolift", title: "UroLift®", desc: "Traitement peu invasif de l'hypertrophie bénigne de la prostate — sans ablation de tissu.", image: "/assets/leistungen_003.jpg" },
      { key: "magnetstimulation", title: "Stimulation Magnétique", desc: "Renforcement du plancher pelvien en cas d'incontinence — non invasif.", image: "/assets/magnetstimulanz_01.jpg" },
      { key: "urodynamik", title: "Urodynamique & Esthétique", desc: "Mesure de la pression vésicale et médecine esthétique.", image: "/assets/urodynamik.jpg" },
    ],
  },
} as const;

type Locale = keyof typeof content;

export default function Services({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? content.de;

  return (
    <section className="container py-20">
      <div className="text-center mb-14">
        <h2 className="mb-2">{c.heading}</h2>
        <div className="trenner" />
        <p className="text-body-text leading-[1.6] max-w-xl mx-auto">{c.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {c.services.map((service) => (
          <div
            key={service.key}
            className="rounded-xl overflow-hidden border border-[#e5e5e5] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          >
            <div className="relative w-full h-[200px]">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
            <div className="bg-white">
              <h3 className="text-primary-dark text-[18px] font-bold px-5 pt-4 pb-2">{service.title}</h3>
              <p className="text-body-text text-[15px] leading-[1.6] px-5 pb-4">{service.desc}</p>
              <Link
                href={`/${locale}/leistungen/${service.key}`}
                className="block text-primary font-bold px-5 pb-5 hover:text-primary-dark transition-colors"
              >
                {c.moreLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
