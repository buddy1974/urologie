import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Ambulante Operationen",
  description:
    "Ambulante urologische Operationen in der Praxis Neuwied — Vasektomie, Zirkumzision, UroLift®, Botox der Blase, Meatotomie, Frenulumplastik und mehr.",
};

type Procedure = {
  title: string;
  subtitle: string;
  desc: string;
  link: string | null;
  linkLabel?: string;
};

const content = {
  de: {
    label: "Leistungen",
    title: "Ambulante Operationen",
    intro:
      "Ambulantes Operieren (einschl. Narkoseeingriffe) — viele urologische Eingriffe führen wir direkt in unserer Praxis durch.",
    heading: "Unsere ambulanten Eingriffe",
    membershipNote:
      "Wir sind Mitglied im Netzwerk Vasektomie-Experten: ",
    procedures: [
      {
        title: "Vasektomie",
        subtitle: "Sterilisation des Mannes",
        desc: "Konservativ und non-skalpell.",
        link: "/leistungen/andrologie",
        linkLabel: "Mehr erfahren",
      },
      {
        title: "UroLift®",
        subtitle: "Bei benigner Prostatahyperplasie (BPH)",
        desc: "Behandlung der gutartigen Vergrößerung der Prostata mit möglichen Miktionsbeschwerden/Problemen beim Wasserlassen.",
        link: "/leistungen/urolift",
        linkLabel: "Mehr erfahren",
      },
      {
        title: "Zirkumzision",
        subtitle: "Beschneidung",
        desc: "Z. B. bei Vorhautverengung.",
        link: null,
      },
      {
        title: "Botox-Injektionen der Blase",
        subtitle: "Bei Blasenschwäche",
        desc: "Ggf. auch ohne Narkose.",
        link: null,
      },
      {
        title: "Meatotomie",
        subtitle: "Harnröhreneingangserweiterung",
        desc: "",
        link: null,
      },
      {
        title: "Frenulumplastik",
        subtitle: "Bei verkürztem Frenulum/Bändchen",
        desc: "",
        link: null,
      },
      {
        title: "Operationen des äußeren Genitals des Mannes",
        subtitle: "Hydrocele, Varikocele, Condylome",
        desc: "U. a. Hydrocele-, Varikocele-Operationen, Feigwarzen (Condylom)-Entfernung.",
        link: null,
      },
    ] as Procedure[],
  },
  en: {
    label: "Services",
    title: "Outpatient Surgery",
    intro:
      "Outpatient surgery (including procedures under anaesthesia) — many urological procedures are carried out directly at our practice.",
    heading: "Our outpatient procedures",
    membershipNote: "We are a member of the Vasectomy Experts network: ",
    procedures: [
      {
        title: "Vasectomy",
        subtitle: "Male sterilisation",
        desc: "Conservative and no-scalpel.",
        link: "/leistungen/andrologie",
        linkLabel: "Learn more",
      },
      {
        title: "UroLift®",
        subtitle: "For benign prostatic hyperplasia (BPH)",
        desc: "Treatment of benign enlargement of the prostate with possible voiding symptoms/urination problems.",
        link: "/leistungen/urolift",
        linkLabel: "Learn more",
      },
      {
        title: "Circumcision",
        subtitle: "",
        desc: "E.g. for foreskin constriction.",
        link: null,
      },
      {
        title: "Botox injections of the bladder",
        subtitle: "For bladder weakness",
        desc: "If needed, also without anaesthesia.",
        link: null,
      },
      {
        title: "Meatotomy",
        subtitle: "Widening of the urethral opening",
        desc: "",
        link: null,
      },
      {
        title: "Frenuloplasty",
        subtitle: "For a shortened frenulum",
        desc: "",
        link: null,
      },
      {
        title: "Surgery on the male external genitalia",
        subtitle: "Hydrocele, varicocele, condylomas",
        desc: "Including hydrocele and varicocele surgery, and removal of genital warts (condylomas).",
        link: null,
      },
    ] as Procedure[],
  },
  fr: {
    label: "Prestations",
    title: "Opérations ambulatoires",
    intro:
      "Chirurgie ambulatoire (y compris les interventions sous anesthésie) — de nombreuses interventions urologiques sont réalisées directement dans notre cabinet.",
    heading: "Nos interventions ambulatoires",
    membershipNote: "Nous sommes membres du réseau Vasektomie-Experten : ",
    procedures: [
      {
        title: "Vasectomie",
        subtitle: "Stérilisation masculine",
        desc: "Classique et sans bistouri.",
        link: "/leistungen/andrologie",
        linkLabel: "En savoir plus",
      },
      {
        title: "Urolift®",
        subtitle: "Pour l'hyperplasie bénigne de la prostate (HBP)",
        desc: "Traitement de l'augmentation bénigne du volume de la prostate pouvant entraîner des troubles mictionnels.",
        link: "/leistungen/urolift",
        linkLabel: "En savoir plus",
      },
      {
        title: "Circoncision",
        subtitle: "",
        desc: "Par exemple en cas de phimosis.",
        link: null,
      },
      {
        title: "Injections de Botox dans la vessie",
        subtitle: "En cas d'incontinence",
        desc: "Si nécessaire, également sans anesthésie.",
        link: null,
      },
      {
        title: "Méatotomie",
        subtitle: "Élargissement du méat urétral",
        desc: "",
        link: null,
      },
      {
        title: "Frénuloplastie",
        subtitle: "En cas de frein court",
        desc: "",
        link: null,
      },
      {
        title: "Interventions sur les organes génitaux externes masculins",
        subtitle: "Hydrocèle, varicocèle, condylomes",
        desc: "Notamment chirurgie de l'hydrocèle, de la varicocèle, et ablation des condylomes (verrues génitales).",
        link: null,
      },
    ] as Procedure[],
  },
};

export default async function AmbulanteOpPage() {
  const locale = await getLocale();
  const t = content[locale as keyof typeof content] ?? content.de;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold">{t.title}</h1>
        </div>
      </section>

      <div className="container py-[60px]">
        <p className="text-body-text leading-[1.6] max-w-3xl mx-auto text-center mb-4">{t.intro}</p>

        <div className="trenner" />

        <h2 className="mb-6 text-center">{t.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.procedures.map((proc) => (
            <div key={proc.title} className="border border-[#e5e5e5] rounded-md p-6">
              <h3 className="mb-1">{proc.title}</h3>
              {proc.subtitle && <p className="text-primary text-sm font-bold mb-2">{proc.subtitle}</p>}
              {proc.desc && <p className="text-body-text leading-[1.6] text-sm">{proc.desc}</p>}
              {proc.link && (
                <Link
                  href={`/${locale}${proc.link}`}
                  className="inline-block mt-3 text-primary text-sm font-bold hover:text-primary-dark transition-colors"
                >
                  {proc.linkLabel} →
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="trenner" />

        <p className="text-body-text leading-[1.6] text-center">
          {t.membershipNote}
          <a
            href="https://www.vasektomie-neuwied.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold hover:text-primary-dark transition-colors"
          >
            www.vasektomie-neuwied.de
          </a>
        </p>

        <div className="flex justify-center mt-8">
          <a
            href="https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-doctolib"
          >
            Termin via Doctolib
          </a>
        </div>
      </div>
    </div>
  );
}
