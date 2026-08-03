import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Urodynamik & Ästhetische Medizin",
  description: "Blasendruckmessung und ästhetische Medizin mit Botox und Filler in Neuwied.",
};

type Locale = "de" | "en" | "fr";

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

const content = {
  de: {
    label: "Leistungen",
    title: "Urodynamik & Ästhetische Medizin",
    intro: "Blasendiagnostik und ästhetische Behandlungen aus einer Hand.",
    ctaHeading: "Termin vereinbaren",
    ctaButton: "Termin via Doctolib",
    urodynamikTitle: "Urodynamik",
    urodynamikText:
      "Die Urodynamik (Blasendruckmessung) ist die präziseste Methode zur Diagnose von Harninkontinenz und Blasenentleerungsstörungen.",
    urodynamikItems: [
      "Harninkontinenz-Diagnostik",
      "Blasenentleerungsstörungen",
      "Überaktive Blase (OAB)",
      "Therapieplanung Inkontinenz",
    ],
    aestheticTitle: "Ästhetische Medizin",
    aestheticText: "Diskrete und professionelle ästhetische Behandlungen durch den erfahrenen Facharzt.",
    aestheticItems: ["Botox-Behandlungen", "Filler-Injektionen", "Faltenbehandlung", "Individuelle Beratung"],
    equipmentLabel: "Ausstattung",
    equipmentTitle: "Modernste Geräteausstattung",
    equipmentIntro: "Spezialisierte Medizintechnik für präzise Urodynamik.",
    machineName: "Model Newton Urodynamik-System",
    machineDesc:
      "Mehrkanalige urodynamische Messung — Blasendruck, Harnfluss und Sphinkteraktivität gleichzeitig erfasst, für präzise Inkontinenz- und Obstruktionsdiagnostik.",
  },
  en: {
    label: "Services",
    title: "Urodynamics & Aesthetic Medicine",
    intro: "Bladder diagnostics and aesthetic treatments from a single source.",
    ctaHeading: "Book Appointment",
    ctaButton: "Book via Doctolib",
    urodynamikTitle: "Urodynamics",
    urodynamikText:
      "Urodynamics (bladder pressure measurement) is the most precise method for diagnosing urinary incontinence and bladder-emptying disorders.",
    urodynamikItems: [
      "Urinary incontinence diagnostics",
      "Bladder-emptying disorders",
      "Overactive bladder (OAB)",
      "Incontinence treatment planning",
    ],
    aestheticTitle: "Aesthetic Medicine",
    aestheticText: "Discreet and professional aesthetic treatments by the experienced specialist.",
    aestheticItems: ["Botox treatments", "Filler injections", "Wrinkle treatment", "Individual consultation"],
    equipmentLabel: "Equipment",
    equipmentTitle: "State-of-the-Art Equipment",
    equipmentIntro: "Specialized medical technology for precise urodynamics.",
    machineName: "Model Newton Urodynamic System",
    machineDesc:
      "Multi-channel urodynamic measurement — bladder pressure, urine flow and sphincter activity captured simultaneously for precise incontinence and obstruction diagnostics.",
  },
  fr: {
    label: "Prestations",
    title: "Urodynamique & Médecine Esthétique",
    intro: "Diagnostic vésical et traitements esthétiques réunis.",
    ctaHeading: "Prendre rendez-vous",
    ctaButton: "Rendez-vous via Doctolib",
    urodynamikTitle: "Urodynamique",
    urodynamikText:
      "L'urodynamique (mesure de la pression vésicale) est la méthode la plus précise pour diagnostiquer l'incontinence urinaire et les troubles de la vidange vésicale.",
    urodynamikItems: [
      "Diagnostic de l'incontinence urinaire",
      "Troubles de la vidange vésicale",
      "Vessie hyperactive (VH)",
      "Planification du traitement de l'incontinence",
    ],
    aestheticTitle: "Médecine Esthétique",
    aestheticText: "Traitements esthétiques discrets et professionnels par un spécialiste expérimenté.",
    aestheticItems: ["Traitements Botox", "Injections d'acide hyaluronique", "Traitement des rides", "Conseil individuel"],
    equipmentLabel: "Équipement",
    equipmentTitle: "Équipement Médical de Pointe",
    equipmentIntro: "Technologie médicale spécialisée pour une urodynamique précise.",
    machineName: "Système urodynamique Model Newton",
    machineDesc:
      "Mesure urodynamique multicanal — pression vésicale, débit urinaire et activité sphinctérienne enregistrés simultanément, pour un diagnostic précis de l'incontinence et de l'obstruction.",
  },
} satisfies Record<Locale, unknown>;

export default async function UrodynamikPage() {
  const locale = (await getLocale()) as Locale;
  const t = content[locale] ?? content.de;

  return (
    <div>
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold">{t.title}</h1>
        </div>
      </section>

      <div className="container py-[60px]">
        <p className="text-body-text leading-[1.6] mb-8 max-w-2xl">{t.intro}</p>

        <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden mb-8">
          <Image src="/assets/urodynamik.jpg" alt="Urodynamik" fill className="object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#e5e5e5] rounded-md p-8">
            <h2>{t.urodynamikTitle}</h2>
            <p className="text-body-text leading-[1.6] my-4">{t.urodynamikText}</p>
            <ul className="space-y-2">
              {t.urodynamikItems.map((item) => (
                <li key={item} className="text-body-text text-sm">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#e5e5e5] rounded-md p-8">
            <h2>{t.aestheticTitle}</h2>
            <p className="text-body-text leading-[1.6] my-4">{t.aestheticText}</p>
            <ul className="space-y-2">
              {t.aestheticItems.map((item) => (
                <li key={item} className="text-body-text text-sm">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trenner" />

        <div>
          <p className="text-primary text-[14px] font-bold uppercase tracking-wide mb-2">{t.equipmentLabel}</p>
          <h2 className="mb-2">{t.equipmentTitle}</h2>
          <p className="text-body-text text-sm mb-6">{t.equipmentIntro}</p>
          <div className="border border-[#e5e5e5] rounded-md p-6 max-w-md">
            <p className="font-bold text-body-text text-sm mb-2">{t.machineName}</p>
            <p className="text-body-text text-xs leading-[1.6]">{t.machineDesc}</p>
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
