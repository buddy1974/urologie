import type { Metadata } from "next";
import Image from "next/image";
import { Check, Microscope, ExternalLink } from "lucide-react";
import { getLocale } from "next-intl/server";

const metaTitles = {
  de: "Andrologie & Vasektomie",
  en: "Andrology",
  fr: "Andrologie",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: metaTitles[locale as keyof typeof metaTitles] ?? metaTitles.de,
    description: "Männergesundheit in Neuwied — Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch.",
  };
}

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

const content = {
  de: {
    label: "Leistungen",
    title: "Andrologie",
    subheading: "Männergesundheit & Vasektomie — kompetent und diskret",
    ctaHeading: "Termin vereinbaren",
    ctaButton: "Termin via Doctolib",
    servicesTitle: "Unsere andrologischen Leistungen",
    services: [
      "Männliche Sterilisation — Vasektomie (konservativ und non-skalpell)",
      "Erektionsstörungen (impotentia coeundi)",
      "Vorzeitiger Samenerguss",
      "Testosteronmangel",
      "Unerfüllter Kinderwunsch / Fruchtbarkeitsstörungen",
      "Penisverkrümmung — Induratio Penis plastica (IPP)",
      "Varikozele",
      "Hodenhochstand",
    ],
    networkTitle: "Vasektomie-Experten Netzwerk",
    networkText: "Herr Fomuki ist zertifiziertes Mitglied im Netzwerk der Vasektomie-Experten.",
    networkLinkLabel: "www.vasektomie-neuwied.de",
    equipmentLabel: "Ausstattung",
    equipmentTitle: "Modernste Geräteausstattung",
    equipmentText: "Zertifizierte Analysetechnik für objektive Fertilitätsdiagnostik.",
    machineName: "MES SQA-iO + SQA-VU",
    machineDesc: "Spermienqualitätsanalyse — vollautomatische Messung von Konzentration, Motilität und Morphologie, mit visueller Mikroskopie-Komponente",
  },
  en: {
    label: "Services",
    title: "Andrology",
    subheading: "Men's health & vasectomy — competent and discreet",
    ctaHeading: "Book Appointment",
    ctaButton: "Book via Doctolib",
    servicesTitle: "Our andrological services",
    services: [
      "Male sterilization — vasectomy (conventional and no-scalpel)",
      "Erectile dysfunction (impotentia coeundi)",
      "Premature ejaculation",
      "Testosterone deficiency",
      "Unfulfilled desire to have children / fertility disorders",
      "Penile curvature — Induratio Penis Plastica (IPP)",
      "Varicocele",
      "Undescended testicle",
    ],
    networkTitle: "Vasectomy Experts Network",
    networkText: "Fomuki is a certified member of the Vasectomy Experts network.",
    networkLinkLabel: "www.vasektomie-neuwied.de",
    equipmentLabel: "Equipment",
    equipmentTitle: "State-of-the-art equipment",
    equipmentText: "Certified analysis technology for objective fertility diagnostics.",
    machineName: "MES SQA-iO + SQA-VU",
    machineDesc: "Sperm quality analysis — fully automatic measurement of concentration, motility and morphology, with a visual microscopy component",
  },
  fr: {
    label: "Prestations",
    title: "Andrologie",
    subheading: "Santé masculine & vasectomie — compétence et discrétion",
    ctaHeading: "Prendre rendez-vous",
    ctaButton: "Rendez-vous via Doctolib",
    servicesTitle: "Nos prestations andrologiques",
    services: [
      "Stérilisation masculine — vasectomie (conventionnelle et sans scalpel)",
      "Troubles de l'érection (impotentia coeundi)",
      "Éjaculation précoce",
      "Déficit en testostérone",
      "Désir d'enfant non satisfait / troubles de la fertilité",
      "Courbure du pénis — Induratio Penis Plastica (IPP)",
      "Varicocèle",
      "Testicule non descendu",
    ],
    networkTitle: "Réseau Vasektomie-Experten",
    networkText: "Fomuki est membre certifié du réseau des experts en vasectomie.",
    networkLinkLabel: "www.vasektomie-neuwied.de",
    equipmentLabel: "Équipement",
    equipmentTitle: "Équipement médical de pointe",
    equipmentText: "Technologie d'analyse certifiée pour un diagnostic objectif de la fertilité.",
    machineName: "MES SQA-iO + SQA-VU",
    machineDesc: "Analyse de la qualité du sperme — mesure entièrement automatique de la concentration, de la motilité et de la morphologie, avec composante de microscopie visuelle",
  },
} as const;

export default async function AndrologiePage() {
  const locale = await getLocale();
  const t = content[locale as keyof typeof content] ?? content.de;

  return (
    <div>
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold mb-2">{t.title}</h1>
          <p className="text-primary text-[16px] font-bold uppercase">{t.subheading}</p>
        </div>
      </section>

      <div className="container py-[60px]">
        <div className="relative w-full aspect-[16/6] mb-10 overflow-hidden rounded-md">
          <Image src="/assets/leistungen_005.jpg" alt={t.title} fill className="object-cover" />
        </div>

        <div className="border border-[#e5e5e5] rounded-md p-8">
          <h2 className="mb-6">{t.servicesTitle}</h2>
          <div className="space-y-3">
            {t.services.map((s) => (
              <div key={s} className="flex items-start gap-3">
                <Check size={16} className="flex-shrink-0 mt-0.5 text-primary" />
                <span className="text-body-text leading-[1.6] text-[16px]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="trenner" />

        <div className="border border-[#e5e5e5] rounded-md p-8">
          <p className="font-bold text-body-text mb-2">{t.networkTitle}</p>
          <p className="text-body-text leading-[1.6] text-[16px] mb-4">{t.networkText}</p>
          <a
            href="https://www.vasektomie-neuwied.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-bold"
          >
            {t.networkLinkLabel} <ExternalLink size={14} />
          </a>
        </div>

        <div className="trenner" />

        <div>
          <p className="text-primary text-[14px] font-bold uppercase tracking-wide mb-2">{t.equipmentLabel}</p>
          <h2 className="mb-2">{t.equipmentTitle}</h2>
          <p className="text-body-text leading-[1.6] text-[16px] mb-6">{t.equipmentText}</p>
          <div className="border border-[#e5e5e5] rounded-md p-6 max-w-md">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary mb-4">
              <Microscope size={18} className="text-white" />
            </div>
            <p className="font-bold text-body-text mb-2">{t.machineName}</p>
            <p className="text-body-text leading-[1.6] text-sm">{t.machineDesc}</p>
          </div>
        </div>
      </div>

      <section className="bg-[#f0f7f9] py-[60px] px-5 text-center">
        <p className="text-body-text text-[20px] font-bold mb-6">{t.ctaHeading}</p>
        <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="btn-doctolib">
          {t.ctaButton}
        </a>
      </section>
    </div>
  );
}
