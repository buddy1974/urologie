import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";

const metaTitles = {
  de: "Magnetstimulation",
  en: "Magnetic Stimulation",
  fr: "Stimulation Magnétique",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: metaTitles[locale as keyof typeof metaTitles] ?? metaTitles.de,
    description:
      "Magnetstimulation der Beckenbodenmuskulatur bei Inkontinenz in Neuwied.",
  };
}

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

const content = {
  de: {
    label: "Leistungen",
    title: "Magnetstimulation der Beckenbodenmuskulatur",
    ctaHeading: "Termin vereinbaren",
    ctaButton: "Termin via Doctolib",
    subheading: "Unsere Beckenbodenmuskulatur – oft unterschätzt und doch so wichtig",
    paragraphs: [
      "Ungewollter Urinabgang (eine sogenannte Inkontinenz, Blasenschwäche) bei Frauen und Männern kann als große Belastung wahrgenommen werden und im Alltag stark einschränken.",
      "Die Muskulatur des Beckenbodens wird im Alltag oft zu wenig wahrgenommen. Sie stützt die Organe im kleinen Becken, allen voran unsere Blase und die Harnröhre. Sie ist damit wichtig bei der Urinkontrolle und auch im Rahmen sexueller Funktionen, da die Beckenbodenmuskulatur auch einen Einfluss auf das sexuelle Empfinden hat. Durch Geburten, nach Operationen (z.B. nach Prostatektomie) oder allgemein im Laufe des Lebens kann die Beckenbodenmuskulatur schwächer werden und dann zu Störungen u.a. in den genannten Bereichen führen. Das Gute ist: Wir können unsere Beckenbodenmuskulatur trainieren und fördern und so in vielen Fällen zu einem Rückgang/Verschwinden der Beschwerden beitragen oder operative Eingriffe zur Behandlung der Inkontinenz vermeiden.",
      "Unter anderem mit der Therapiemethode der Magnetstimulation ist es möglich auf einfache Weise Probleme im Bereich der Beckenbodenmuskulatur wirkungsvoll zu behandeln. Wir freuen uns daher, dass wir Ihnen diese innovative Form der Therapie in unserer Praxis anbieten können! Mit Hilfe des Magnetfelds wird Ihre Muskulatur stimuliert und trainiert und Ihr Beckenboden wird gestärkt.",
    ],
    contactNote: "Sprechen Sie uns einfach vertrauensvoll an! Wir suchen gemeinsam mit Ihnen nach einem Weg, Ihre Beschwerden erfolgreich zu behandeln.",
    advantagesTitle: "Vorteile:",
    advantages: "Angenehme und schonende Therapiemethode (nicht invasiv) – kurze ambulante Behandlungszeit (Dauer pro Sitzung ca. 15 Minuten) – in Alltagskleidung durchführbar.",
    equipmentLabel: "Ausstattung",
    equipmentTitle: "Modernste Geräteausstattung",
    equipmentIntro: "Zertifizierte Medizintechnik für eine schonende und effektive Beckenbodentherapie.",
    machineName: "QRS Pelvi Center",
    machineDesc: "Magnetstimulationstherapie — nicht-invasive Behandlung von Blasenschwäche und Beckenbodendysfunktion, Patient sitzt bekleidet, schmerzfrei.",
  },
  en: {
    label: "Services",
    title: "Magnetic Stimulation of the Pelvic Floor Muscles",
    ctaHeading: "Book Appointment",
    ctaButton: "Book via Doctolib",
    subheading: "Our Pelvic Floor Muscles – often underestimated, yet so important",
    paragraphs: [
      "Involuntary loss of urine (so-called incontinence, bladder weakness) in women and men can be perceived as a great burden and can severely restrict everyday life.",
      "The pelvic floor muscles often receive too little attention in everyday life. They support the organs in the pelvis, above all our bladder and urethra. They are therefore important for urinary control and also for sexual function, as the pelvic floor muscles also influence sexual sensation. Due to childbirth, after operations (e.g. after prostatectomy), or generally over the course of life, the pelvic floor muscles can weaken and then lead to disorders in the areas mentioned. The good news is: we can train and strengthen our pelvic floor muscles, and in many cases this can help reduce or eliminate symptoms, or avoid surgical procedures to treat incontinence.",
      "Among other methods, magnetic stimulation therapy makes it possible to effectively treat problems in the pelvic floor area in a simple way. We are therefore pleased to be able to offer you this innovative form of therapy at our practice! With the help of the magnetic field, your muscles are stimulated and trained, and your pelvic floor is strengthened.",
    ],
    contactNote: "Simply speak with us in confidence! Together with you, we will look for a way to successfully treat your symptoms.",
    advantagesTitle: "Advantages:",
    advantages: "Pleasant and gentle therapy method (non-invasive) – short outpatient treatment time (approx. 15 minutes per session) – can be performed while fully clothed.",
    equipmentLabel: "Equipment",
    equipmentTitle: "State-of-the-Art Equipment",
    equipmentIntro: "Certified medical technology for gentle and effective pelvic floor therapy.",
    machineName: "QRS Pelvi Center",
    machineDesc: "Magnetic stimulation therapy — non-invasive treatment of bladder weakness and pelvic floor dysfunction, patient remains fully clothed, painless.",
  },
  fr: {
    label: "Prestations",
    title: "Stimulation magnétique des muscles du plancher pelvien",
    ctaHeading: "Prendre rendez-vous",
    ctaButton: "Rendez-vous via Doctolib",
    subheading: "Nos muscles du plancher pelvien – souvent sous-estimés, mais pourtant si importants",
    paragraphs: [
      "Les pertes d'urine involontaires (appelées incontinence, faiblesse vésicale) chez les femmes et les hommes peuvent être perçues comme un lourd fardeau et fortement restreindre la vie quotidienne.",
      "Les muscles du plancher pelvien sont souvent trop peu pris en compte au quotidien. Ils soutiennent les organes du petit bassin, en particulier notre vessie et l'urètre. Ils sont donc importants pour le contrôle urinaire ainsi que pour les fonctions sexuelles, car le plancher pelvien influence également la sensation sexuelle. En raison des accouchements, après des opérations (par exemple après une prostatectomie) ou plus généralement au cours de la vie, les muscles du plancher pelvien peuvent s'affaiblir et entraîner des troubles dans les domaines mentionnés. La bonne nouvelle est que nous pouvons entraîner et renforcer nos muscles du plancher pelvien et ainsi, dans de nombreux cas, contribuer à réduire ou faire disparaître les symptômes, ou éviter des interventions chirurgicales pour traiter l'incontinence.",
      "Entre autres méthodes, la thérapie par stimulation magnétique permet de traiter efficacement et simplement les problèmes du plancher pelvien. Nous sommes donc heureux de pouvoir vous proposer cette forme innovante de thérapie dans notre cabinet ! Grâce au champ magnétique, vos muscles sont stimulés et entraînés, et votre plancher pelvien est renforcé.",
    ],
    contactNote: "N'hésitez pas à nous en parler en toute confiance ! Ensemble, nous chercherons un moyen de traiter vos symptômes avec succès.",
    advantagesTitle: "Avantages :",
    advantages: "Méthode de thérapie agréable et douce (non invasive) – courte durée de traitement ambulatoire (environ 15 minutes par séance) – réalisable en vêtements de tous les jours.",
    equipmentLabel: "Équipement",
    equipmentTitle: "Équipement médical de pointe",
    equipmentIntro: "Technologie médicale certifiée pour une thérapie du plancher pelvien douce et efficace.",
    machineName: "QRS Pelvi Center",
    machineDesc: "Thérapie par stimulation magnétique — traitement non invasif de la faiblesse vésicale et du dysfonctionnement du plancher pelvien, le patient reste habillé, sans douleur.",
  },
} as const;

export default async function MagnetstimulationPage() {
  const locale = await getLocale();
  const c = content[locale as keyof typeof content] ?? content.de;

  return (
    <div>
      {/* Page hero */}
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{c.label}</p>
          <h1 className="text-white text-[36px] font-bold">{c.title}</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
              <Image src="/assets/magnetstimulanz_01.jpg" alt="Magnetstimulation der Beckenbodenmuskulatur" fill className="object-cover" />
            </div>
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
              <Image src="/assets/magnetstimulanz_02.jpg" alt="Magnetstimulation der Beckenbodenmuskulatur" fill className="object-cover" />
            </div>
          </div>

          <div>
            <h2 className="mb-4">{c.subheading}</h2>
            {c.paragraphs.map((p, i) => (
              <p key={i} className="text-body-text leading-[1.6] mb-4">
                {p}
              </p>
            ))}
            <p className="text-body-text leading-[1.6] mb-4">
              <a href="/kontakt" className="text-primary hover:text-primary-dark font-bold">
                {c.contactNote}
              </a>
            </p>
            <h3 className="mb-2">{c.advantagesTitle}</h3>
            <p className="text-body-text leading-[1.6]">{c.advantages}</p>
          </div>
        </div>

        <div className="trenner" />

        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-2">{c.equipmentLabel}</p>
          <h2 className="mb-2">{c.equipmentTitle}</h2>
          <p className="text-body-text leading-[1.6] mb-6">{c.equipmentIntro}</p>
          <div className="border border-[#e5e5e5] rounded-md p-6 max-w-md">
            <p className="font-bold text-body-text mb-2">{c.machineName}</p>
            <p className="text-body-text text-sm leading-[1.6]">{c.machineDesc}</p>
          </div>
        </div>
      </div>

      <section className="bg-[#f0f7f9] py-[60px] px-5 text-center">
        <p className="text-body-text text-[20px] font-bold mb-6">{c.ctaHeading}</p>
        <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="btn-doctolib">
          {c.ctaButton}
        </a>
      </section>
    </div>
  );
}
