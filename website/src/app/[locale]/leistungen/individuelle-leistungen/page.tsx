import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Individuelle Gesundheitsleistungen (IGeL)",
  description:
    "Individuelle Gesundheitsleistungen (IGeL) der Urologie Neuwied — Vasektomie, Potenz- und Hormonstörungen, PSA/Testosteron, NMP22 Blasenkrebstest, EMDA-Therapie, StroVac und mehr.",
};

type Locale = "de" | "en" | "fr";

const content = {
  de: {
    label: "Leistungen",
    title: "Individuelle Leistungen",
    intro: "Individuelle Gesundheitsleistungen der Urologie Neuwied",
    services: [
      { title: "Vasektomie", desc: "Sterilisation des Mannes, konventionell und ohne Skalpell.", link: "https://www.vasektomie-neuwied.de/", linkLabel: "Vasektomie-Neuwied.de" },
      { title: "Potenz- und Hormonstörungen des Mannes", desc: "" },
      { title: "PSA und Testosteron-Messung", desc: "als Ergänzung im Rahmen der Vorsorge oder bei Potenzstörungen." },
      { title: "NMP22 BladderCheck Test", desc: "Zuverlässiger Test zur Blasenkrebsfrüherkennung." },
      { title: "ScheBo M2-PK Quick", desc: "Direkttest zur Früherkennung von Darmkrebs." },
      { title: "EMDA Therapie", desc: "Elektromotive Medikamenten-Applikation (EMDA) bei Induratio Penis Plastica (Penisabknickung)." },
      { title: "StroVac®-Impfung", desc: "Bei häufiger Harnblasenentzündung." },
      { title: "Urovaxom", desc: "Schluckimpfung bei häufiger Harnblasenentzündung." },
    ],
    disclaimerTitle: "Transparenz & Freiwilligkeit",
    disclaimer:
      "IGeL-Leistungen sind freiwillig. Sie können jede Leistung ablehnen, ohne Nachteile für Ihre weitere Behandlung befürchten zu müssen. Bei Interesse sprechen Sie uns an — wir beraten Sie gerne. Die Abrechnung erfolgt gemäß GOÄ (Gebührenordnung für Ärzte); vor jeder Leistungserbringung erhalten Sie eine schriftliche Vereinbarung.",
    cta: "Termin via Doctolib",
    ctaHeading: "Termin vereinbaren",
  },
  en: {
    label: "Services",
    title: "Individual Health Services",
    intro: "Individual Health Services at Urologie Neuwied",
    services: [
      { title: "Vasectomy", desc: "Male sterilisation, conventional and no-scalpel.", link: "https://www.vasektomie-neuwied.de/", linkLabel: "Vasectomy-Neuwied.de" },
      { title: "Potency and Hormonal Disorders in Men", desc: "" },
      { title: "PSA and Testosterone Measurement", desc: "As a complement to preventive care or in cases of potency disorders." },
      { title: "NMP22 BladderCheck Test", desc: "A reliable test for early bladder cancer detection." },
      { title: "ScheBo M2-PK Quick", desc: "A direct test for early colorectal cancer detection." },
      { title: "EMDA Therapy", desc: "Electromotive Drug Administration (EMDA) for Peyronie's disease (penile curvature)." },
      { title: "StroVac® Vaccination", desc: "For recurrent bladder infections." },
      { title: "Urovaxom", desc: "Oral vaccine for recurrent bladder infections." },
    ],
    disclaimerTitle: "Transparency & Voluntary Choice",
    disclaimer:
      "IGeL services are voluntary. You may decline any service without any disadvantage to your further treatment. If you're interested, just ask us — we're happy to advise. Billing follows the GOÄ (German medical fee schedule); you'll receive a written agreement before any service is provided.",
    cta: "Book via Doctolib",
    ctaHeading: "Book Appointment",
  },
  fr: {
    label: "Prestations",
    title: "Prestations Individuelles",
    intro: "Prestations individuelles d'Urologie Neuwied",
    services: [
      { title: "Vasectomie", desc: "Stérilisation masculine, méthode classique et sans bistouri.", link: "https://www.vasektomie-neuwied.de/", linkLabel: "Vasectomie-Neuwied.de" },
      { title: "Troubles de la puissance sexuelle et hormonaux chez l'homme", desc: "" },
      { title: "Dosage du PSA et de la testostérone", desc: "En complément d'un bilan de prévention ou en cas de troubles de la puissance sexuelle." },
      { title: "Test NMP22 BladderCheck", desc: "Un test fiable de dépistage précoce du cancer de la vessie." },
      { title: "ScheBo M2-PK Quick", desc: "Test direct de dépistage précoce du cancer colorectal." },
      { title: "Thérapie EMDA", desc: "Administration électromotrice de médicaments (EMDA) pour la maladie de La Peyronie (courbure du pénis)." },
      { title: "Vaccination StroVac®", desc: "En cas de cystites récidivantes." },
      { title: "Urovaxom", desc: "Vaccin oral en cas de cystites récidivantes." },
    ],
    disclaimerTitle: "Transparence & Libre Choix",
    disclaimer:
      "Les prestations IGeL sont facultatives. Vous pouvez refuser toute prestation sans aucun désavantage pour la suite de votre traitement. Si vous êtes intéressé, parlez-en avec nous — nous vous conseillons volontiers. La facturation se fait selon la GOÄ (barème allemand des honoraires médicaux) ; vous recevrez un accord écrit avant toute prestation.",
    cta: "RDV via Doctolib",
    ctaHeading: "Prendre rendez-vous",
  },
} as const satisfies Record<Locale, unknown>;

export default async function IndividuelleLeistungenPage() {
  const locale = (await getLocale()) as Locale;
  const t = content[locale] ?? content.de;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold">{t.title}</h1>
        </div>
      </section>

      <div className="container py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-10 items-start">
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
            <Image src="/assets/leistungen_007.jpg" alt="" fill className="object-cover" />
          </div>

          <div>
            <h2 className="mb-6">{t.intro}</h2>
            <ul className="space-y-4">
              {t.services.map((s) => (
                <li key={s.title} className="text-body-text leading-[1.6]">
                  <strong className="text-primary">{s.title}</strong>
                  {s.desc && <><br />{s.desc}</>}
                  {"link" in s && s.link && (
                    <>
                      <br />
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark underline">
                        {s.linkLabel}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trenner" />

        <div className="border border-[#e5e5e5] rounded-md p-6 max-w-3xl mx-auto text-center">
          <h3 className="mb-2">{t.disclaimerTitle}</h3>
          <p className="text-body-text leading-[1.6]">{t.disclaimer}</p>
        </div>

      </div>

      <section className="bg-[#f0f7f9] py-[60px] px-5 text-center">
        <p className="text-body-text text-[20px] font-bold mb-6">{t.ctaHeading}</p>
        <a
          href="https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-doctolib"
        >
          {t.cta}
        </a>
      </section>
    </div>
  );
}
