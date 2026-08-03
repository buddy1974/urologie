import type { Metadata } from "next";
import Image from "next/image";
import { Microscope } from "lucide-react";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Diagnostik",
  description:
    "Urologische Diagnostik in Neuwied — Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie.",
};

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

type Locale = "de" | "en" | "fr";

const content = {
  de: {
    label: "Leistungen",
    title: "Diagnostik",
    diagnostikHeading: "Diagnostik",
    diagnostikItems: [
      "Labor (Urindiagnostik, Mikrobiologie, PSA und Testosteronbestimmungen)",
      "Spermiogramme bei unerfülltem Kinderwunsch oder nach Vasektomie",
      "Ultraschall (Sonographie, Transrektale Sonographie, Dopplersonographie)",
      "Zystoskopie (Blasenspiegelung und ggf. Probenentnahme mit starren und flexiblen Instrumenten sowie Videoübertragung)",
      "Prostatabiopsie – TRUS gesteuert",
      "Uroflowmetrie (Harnflussmessung, wenn die Blasenentleerung gestört ist)",
      "Schwellkörper(auto)injektionstest (SKIT oder SKAT) bei Erektionsstörungen",
      "Kooperation mit dem Radiologischen Institut Koblenz",
    ],
    conditionsHeading: "Abklärung und Therapie bei",
    conditions: [
      "Blasen- oder Nierensteinen",
      "Entzündungen der Harnwege bei Frau (Harnblase, Nieren) und Mann (Harnblase, Nieren, Prostata, Hoden)",
      "Sexuell übertragbaren Erkrankungen",
      "Blut im Urin oder Ejakulat",
      "Abklärung bei Inkontinenz (Blasenschwäche) und Blasenentleerungsstörungen bei Frau und Mann auch mittels Urodynamik (Blasendruckmessung)",
      "Benigne Prostatahyperplasie (BPH, gutartige Vergrößerung der Prostata mit möglichen Miktionsbeschwerden/Problemen beim Wasserlassen): Medikamentöse Therapie sowie Behandlung mittels Urolift®",
    ],
    vorsorgeHeading: "Vorsorge",
    vorsorgeText: "Vorsorgeuntersuchung des Mannes, PSA-Messung.",
    machinesLabel: "Ausstattung",
    machinesHeading: "Modernste Geräteausstattung",
    machinesSubheading: "Zertifizierte Medizintechnik für präzise Diagnosen und schnelle Ergebnisse.",
    machines: [
      { name: "UriSed Mini", desc: "Automatisierte Urinanalyse — erkennt Zellen, Bakterien und Kristalle digital, vernetzt mit LabCONNECT für sofortige Ergebnisübertragung" },
      { name: "LabUReader Plus 2", desc: "Urinteststreifen-Auswertung — bis zu 10 Proben gleichzeitig, analysiert Glucose, Protein, Blut, pH und Nitrit automatisch" },
      { name: "Thermo Scientific Multiskan FC", desc: "PSA-Analyse — hochpräzise Messung des PSA-Wertes mittels ELISA-Verfahren, für Prostatakrebs-Früherkennung und Verlaufskontrolle" },
      { name: "Ultraschall-System", desc: "Hochauflösende Ultraschalldiagnostik — Niere, Blase, Prostata und Hoden, mehrere Schallköpfe für präzise Bildgebung bei Tumoren, Steinen und Vergrößerungen" },
    ],
    cta: "Termin via Doctolib",
    phoneNote: "Für eine Überweisung oder einen Termin erreichen Sie uns unter 02631 - 23351 oder buchen Sie online über Doctolib.",
  },
  en: {
    label: "Services",
    title: "Diagnostics",
    diagnostikHeading: "Diagnostics",
    diagnostikItems: [
      "Laboratory testing (urine diagnostics, microbiology, PSA and testosterone measurement)",
      "Sperm analysis for unfulfilled family planning or after vasectomy",
      "Ultrasound (sonography, transrectal sonography, Doppler sonography)",
      "Cystoscopy (bladder examination and, if needed, biopsy using rigid and flexible instruments with video transmission)",
      "Prostate biopsy – TRUS-guided",
      "Uroflowmetry (urine flow measurement for impaired bladder emptying)",
      "Cavernosal (self-)injection test (SKIT/SKAT) for erectile dysfunction",
      "Cooperation with the Radiological Institute Koblenz",
    ],
    conditionsHeading: "Diagnosis and Treatment of",
    conditions: [
      "Bladder or kidney stones",
      "Urinary tract infections in women (bladder, kidneys) and men (bladder, kidneys, prostate, testicles)",
      "Sexually transmitted infections",
      "Blood in urine or ejaculate",
      "Diagnosis of incontinence (bladder weakness) and bladder emptying disorders in women and men, including via urodynamics (bladder pressure measurement)",
      "Benign prostatic hyperplasia (BPH, benign enlargement of the prostate with possible voiding symptoms/urination problems): medicinal therapy as well as treatment via Urolift®",
    ],
    vorsorgeHeading: "Preventive Care",
    vorsorgeText: "Men's preventive check-up, PSA measurement.",
    machinesLabel: "Equipment",
    machinesHeading: "State-of-the-Art Equipment",
    machinesSubheading: "Certified medical technology for precise diagnoses and fast results.",
    machines: [
      { name: "UriSed Mini", desc: "Automated urinalysis — digitally detects cells, bacteria and crystals, networked with LabCONNECT for instant result transfer" },
      { name: "LabUReader Plus 2", desc: "Urine test strip evaluation — up to 10 samples simultaneously, automatically analyzes glucose, protein, blood, pH and nitrite" },
      { name: "Thermo Scientific Multiskan FC", desc: "PSA analysis — highly precise measurement of PSA levels via ELISA method, for prostate cancer screening and monitoring" },
      { name: "Ultrasound System", desc: "High-resolution ultrasound diagnostics — kidney, bladder, prostate and testicles, multiple transducers for precise imaging of tumors, stones and enlargements" },
    ],
    cta: "Book via Doctolib",
    phoneNote: "For a referral or appointment, reach us at 02631 - 23351 or book online via Doctolib.",
  },
  fr: {
    label: "Services",
    title: "Diagnostic",
    diagnostikHeading: "Diagnostic",
    diagnostikItems: [
      "Laboratoire (analyse d'urine, microbiologie, dosage du PSA et de la testostérone)",
      "Spermogramme en cas de désir d'enfant non satisfait ou après vasectomie",
      "Échographie (sonographie, échographie transrectale, échographie Doppler)",
      "Cystoscopie (examen de la vessie et, si nécessaire, prélèvement à l'aide d'instruments rigides et flexibles, avec transmission vidéo)",
      "Biopsie de la prostate guidée par échographie transrectale (TRUS)",
      "Débitmétrie urinaire (mesure du flux urinaire en cas de troubles de la vidange vésicale)",
      "Test d'injection intracaverneuse (SKIT/SKAT) en cas de troubles de l'érection",
      "Coopération avec l'Institut de radiologie de Coblence",
    ],
    conditionsHeading: "Diagnostic et traitement de",
    conditions: [
      "Calculs vésicaux ou rénaux",
      "Infections des voies urinaires chez la femme (vessie, reins) et chez l'homme (vessie, reins, prostate, testicules)",
      "Infections sexuellement transmissibles",
      "Sang dans les urines ou le sperme",
      "Diagnostic de l'incontinence et des troubles de la vidange vésicale chez la femme et l'homme, y compris par urodynamique (mesure de la pression vésicale)",
      "Hyperplasie bénigne de la prostate (HBP, augmentation bénigne du volume de la prostate pouvant entraîner des troubles mictionnels) : traitement médicamenteux ainsi que traitement par Urolift®",
    ],
    vorsorgeHeading: "Prévention",
    vorsorgeText: "Bilan de prévention masculin, dosage du PSA.",
    machinesLabel: "Équipement",
    machinesHeading: "Équipement médical de pointe",
    machinesSubheading: "Technologie médicale certifiée pour des diagnostics précis et des résultats rapides.",
    machines: [
      { name: "UriSed Mini", desc: "Analyse d'urine automatisée — détecte numériquement cellules, bactéries et cristaux, connectée à LabCONNECT pour un transfert immédiat des résultats" },
      { name: "LabUReader Plus 2", desc: "Analyse de bandelettes urinaires — jusqu'à 10 échantillons simultanément, analyse automatique du glucose, des protéines, du sang, du pH et des nitrites" },
      { name: "Thermo Scientific Multiskan FC", desc: "Analyse du PSA — mesure de haute précision du taux de PSA par méthode ELISA, pour le dépistage et le suivi du cancer de la prostate" },
      { name: "Système d'échographie", desc: "Diagnostic échographique haute résolution — rein, vessie, prostate et testicules, plusieurs sondes pour une imagerie précise des tumeurs, calculs et hypertrophies" },
    ],
    cta: "Rendez-vous via Doctolib",
    phoneNote: "Pour une orientation ou un rendez-vous, contactez-nous au 02631 - 23351 ou réservez en ligne via Doctolib.",
  },
} satisfies Record<Locale, unknown>;

export default async function DiagnostikPage() {
  const locale = (await getLocale()) as Locale;
  const t = content[locale] ?? content.de;

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold">{t.title}</h1>
        </div>
      </section>

      <div className="container py-[60px]">
        <div className="relative w-full h-64 md:h-80 mb-10 rounded-md overflow-hidden">
          <Image src="/assets/header_leistungen_02.jpg" alt={t.title} fill className="object-cover" priority />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="mb-4">{t.diagnostikHeading}</h2>
            <ul className="space-y-2">
              {t.diagnostikItems.map((item) => (
                <li key={item} className="text-body-text leading-[1.6] text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4">{t.conditionsHeading}</h3>
              <ul className="space-y-2">
                {t.conditions.map((c) => (
                  <li key={c} className="text-body-text leading-[1.6] text-[15px]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#e5e5e5] rounded-md p-6">
              <h3 className="mb-3">{t.vorsorgeHeading}</h3>
              <p className="text-body-text leading-[1.6]">{t.vorsorgeText}</p>
            </div>

            <div className="border border-[#e5e5e5] rounded-md p-6">
              <p className="text-primary text-[15px] font-semibold leading-[1.6]">{t.phoneNote}</p>
            </div>
          </div>
        </div>

        <div className="trenner" />

        <div>
          <p className="text-primary text-[14px] font-bold uppercase tracking-wide mb-2">{t.machinesLabel}</p>
          <h2 className="mb-2">{t.machinesHeading}</h2>
          <p className="text-body-text leading-[1.6] text-[15px] mb-8">{t.machinesSubheading}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.machines.map((m) => (
              <div key={m.name} className="border border-[#e5e5e5] rounded-md p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-doctolib-blue mb-4">
                  <Microscope size={18} className="text-white" />
                </div>
                <p className="font-bold text-body-text text-sm mb-2">{m.name}</p>
                <p className="text-body-text text-xs leading-[1.6]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="btn-doctolib">
            {t.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
