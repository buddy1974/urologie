import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";

const metaTitles = {
  de: "Unsere Praxis",
  en: "Our Practice",
  fr: "Notre Cabinet",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: metaTitles[locale as keyof typeof metaTitles] ?? metaTitles.de,
    description:
      "Die Urologische Praxis Neuwied von Walters T. Fomuki — Philosophie, Ausstattung, Kooperationen und Standort.",
  };
}

const cooperations = [
  { name: "Marienhaus Klinikum Bendorf-Neuwied-Waldbreitbach", href: "http://www.marienhaus-klinikum.de/" },
  { name: "Bundeswehrzentralkrankenhaus Koblenz", href: "http://koblenz.bwkrankenhaus.de/" },
  { name: "Malteser Krankenhaus Bonn", href: "http://www.malteser-krankenhaus-bonn.de/" },
  { nameKey: "ukb", href: "http://www.ukb.uni-bonn.de/" },
  { nameKey: "mainz", href: "http://www.unimedizin-mainz.de/" },
  { name: "Krankenhaus der Barmherzigen Brüder Salzburg", href: "http://www.barmherzige-brueder.at/" },
] as const;

const ukbName = { de: "Universitätsklinik Bonn", en: "University Hospital Bonn", fr: "Hôpital universitaire de Bonn" };
const mainzName = { de: "Universitätsklinik Mainz", en: "University Hospital Mainz", fr: "Hôpital universitaire de Mayence" };

const content = {
  de: {
    heroLabel: "Unsere Praxis",
    title: "Die Praxis der Urologie Neuwied",
    intro: [
      "Zur Philosophie unserer Praxis gehört es, dass wir uns für jeden einzelnen Patienten die Zeit nehmen, um die jeweiligen Krankheitsbeschwerden und medizinischen Fragestellungen ausführlich zu besprechen.",
      "Dabei nimmt Vertrauen einen besonderen Stellenwert ein, sind doch Fragen zu Gesundheit, Sexualität oder Kinderwunsch immer auch sehr persönlicher Art. Es ist mir besonders wichtig, medizinische Entscheidungen so zu treffen, dass Sie sich als Patient immer gut informiert und beraten fühlen.",
      "In unserer urologischen Praxis betreuen wir Männer und Frauen mit Beschwerden und Erkrankungen der Niere und der ableitenden Harnwege, also Blase, Harnleiter und Harnröhre. Wir kümmern uns außerdem um Störungen der Prostata und der männlichen Genitalorgane. Die Sexualmedizin des Mannes (u.a. sexuelle Funktionsstörungen, ein unerfüllter Kinderwunsch oder die Sterilisation) gehören ebenso zu unserem Behandlungsschwerpunkt wie die Harninkontinenz (Blasenschwäche) der Frau. Weitere Schwerpunkte stellen die medikamentöse Tumortherapie und sowie die Vor- und Nachsorge onkologisch urologischer Erkrankungen dar.",
    ],
    coopHeading: "Kooperationen u.a. mit:",
    midHeading: "Wir möchten Ihrem jeweiligen Anliegen immer kompetent entsprechen können:",
    midParagraphs: [
      "So haben Sie die Möglichkeit Termine bei uns möglichst zeitnah und an mehreren Tagen in der Woche bis in den frühen Abend hinein zu vereinbaren. Für Notfälle nehmen wir uns natürlich kurzfristig Zeit.",
      "Fachlich erfolgt die Behandlung auf Basis meiner langjährigen Tätigkeit in verschiedenen Krankenhäusern. Über meinen Werdegang und meine Qualifikationen können Sie sich gerne auf den Seiten unserer Homepage informieren. Unsere Praxis besitzt ein Zertifikat über ein Qualitätsmanagementsystem (DIN EN ISO 9001:2015).",
    ],
    closing: "Gerne können Sie sich auf den Seiten unserer Homepage umschauen und informieren.",
    signoff: "Mein Team und ich freuen uns auf Sie in unserer Praxis!",
    signature: "Ihr Walters T. Fomuki",
    partnersHeading: "Unsere Partner",
    addressName: "Urologische Praxis\nWalters T. Fomuki",
    addressRole: "Facharzt für Urologie",
    telLabel: "Tel:",
    faxLabel: "Fax:",
    hoursTitle: "Sprechstunden",
    hours: [
      { day: "Montag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
      { day: "Dienstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
      { day: "Mittwoch", hours: "08:00–12:00 Uhr" },
      { day: "Donnerstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
      { day: "Freitag", hours: "08:00–12:00 Uhr" },
    ],
  },
  en: {
    heroLabel: "Our Practice",
    title: "Our Practice at Urologie Neuwied",
    intro: [
      "Our practice philosophy is to take the time with every single patient to discuss their symptoms and medical questions in detail.",
      "Trust plays a particularly important role here, since questions about health, sexuality or family planning are always very personal in nature. It is especially important to me that medical decisions are made in a way that leaves you, as a patient, always feeling well informed and well advised.",
      "In our urology practice we treat men and women with symptoms and conditions of the kidneys and the urinary tract, meaning the bladder, ureters and urethra. We also care for disorders of the prostate and the male genital organs. Male sexual medicine (including sexual dysfunction, unfulfilled family planning wishes or sterilisation) is one of our treatment focuses, as is urinary incontinence (bladder weakness) in women. Further focus areas include medicinal tumour therapy as well as the pre- and post-treatment care of oncological urological conditions.",
    ],
    coopHeading: "We cooperate with, among others:",
    midHeading: "We want to respond to every concern of yours with full competence:",
    midParagraphs: [
      "This means you have the option to book appointments with us at short notice, on several days of the week and into the early evening. For emergencies, we naturally make time at short notice.",
      "Treatment is based on my many years of professional experience at various hospitals. You are welcome to learn more about my background and qualifications on our website. Our practice holds a certified quality management system (DIN EN ISO 9001:2015).",
    ],
    closing: "You are welcome to browse our website and find out more.",
    signoff: "My team and I look forward to welcoming you to our practice!",
    signature: "Sincerely, Walters T. Fomuki",
    partnersHeading: "Our Partners",
    addressName: "Urology Practice\nWalters T. Fomuki",
    addressRole: "Specialist in Urology",
    telLabel: "Phone:",
    faxLabel: "Fax:",
    hoursTitle: "Opening Hours",
    hours: [
      { day: "Monday", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Tuesday", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Wednesday", hours: "08:00–12:00" },
      { day: "Thursday", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Friday", hours: "08:00–12:00" },
    ],
  },
  fr: {
    heroLabel: "Notre Cabinet",
    title: "Notre cabinet d'Urologie Neuwied",
    intro: [
      "Notre philosophie de cabinet consiste à prendre le temps, pour chaque patient, de discuter en détail des symptômes et des questions médicales.",
      "La confiance y occupe une place particulièrement importante, les questions de santé, de sexualité ou de désir d'enfant étant toujours très personnelles. Il m'importe particulièrement que les décisions médicales soient prises de manière à ce que vous vous sentiez, en tant que patient, toujours bien informé et bien conseillé.",
      "Dans notre cabinet d'urologie, nous prenons en charge les hommes et les femmes présentant des troubles et affections des reins et des voies urinaires, à savoir la vessie, les uretères et l'urètre. Nous nous occupons également des troubles de la prostate et des organes génitaux masculins. La médecine sexuelle masculine (troubles de la fonction sexuelle, désir d'enfant non satisfait ou stérilisation, entre autres) fait partie de nos domaines de traitement prioritaires, tout comme l'incontinence urinaire chez la femme. Parmi nos autres domaines prioritaires figurent le traitement médicamenteux des tumeurs ainsi que le suivi pré- et post-thérapeutique des affections urologiques oncologiques.",
    ],
    coopHeading: "Nous coopérons, entre autres, avec :",
    midHeading: "Nous souhaitons toujours répondre à vos préoccupations avec compétence :",
    midParagraphs: [
      "Vous avez ainsi la possibilité de prendre rendez-vous rapidement, plusieurs jours par semaine et jusqu'en début de soirée. Pour les urgences, nous nous rendons bien sûr disponibles à court terme.",
      "Sur le plan professionnel, le traitement s'appuie sur ma longue expérience dans différents hôpitaux. Vous pouvez vous informer sur mon parcours et mes qualifications sur les pages de notre site. Notre cabinet dispose d'une certification de système de management de la qualité (DIN EN ISO 9001:2015).",
    ],
    closing: "N'hésitez pas à parcourir notre site pour en savoir plus.",
    signoff: "Mon équipe et moi-même nous réjouissons de vous accueillir dans notre cabinet !",
    signature: "Bien à vous, Walters T. Fomuki",
    partnersHeading: "Nos partenaires",
    addressName: "Cabinet d'urologie\nWalters T. Fomuki",
    addressRole: "Spécialiste en urologie",
    telLabel: "Tél. :",
    faxLabel: "Fax :",
    hoursTitle: "Heures de consultation",
    hours: [
      { day: "Lundi", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Mardi", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Mercredi", hours: "08:00–12:00" },
      { day: "Jeudi", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Vendredi", hours: "08:00–12:00" },
    ],
  },
} as const;

type Locale = keyof typeof content;

export default async function PraxisPage() {
  const locale = (await getLocale()) as Locale;
  const c = content[locale] ?? content.de;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <div className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{c.heroLabel}</div>
          <h1 className="text-white text-[36px] font-bold">{c.title}</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            {c.intro.map((p) => (
              <p key={p} className="text-body-text leading-[1.6]">
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Image src="/assets/praxis_001.jpg" alt="Wartezimmer" width={280} height={200} className="w-full h-auto object-cover" />
              <Image src="/assets/praxis_005.jpg" alt="Empfang" width={280} height={200} className="w-full h-auto object-cover" />
              <Image src="/assets/praxis_003.jpg" alt="Flur" width={280} height={200} className="w-full h-auto object-cover" />
              <Image src="/assets/praxis_004.jpg" alt="Empfang" width={280} height={200} className="w-full h-auto object-cover" />
            </div>

            <div className="bg-primary text-white p-6">
              <h2 className="text-white mb-3">{c.coopHeading}</h2>
              <ul className="space-y-1.5 text-sm">
                {cooperations.map((coop) => (
                  <li key={coop.href}>
                    <a href={coop.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-dark underline">
                      {"name" in coop ? coop.name : coop.nameKey === "ukb" ? ukbName[locale] : mainzName[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="trenner" />

        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2>{c.midHeading}</h2>
          {c.midParagraphs.map((p) => (
            <p key={p} className="text-body-text leading-[1.6] text-left">
              {p}
            </p>
          ))}
          <p className="text-body-text leading-[1.6]">{c.closing}</p>
          <p className="text-body-text leading-[1.6]">
            {c.signoff}
            <br />
            <strong>{c.signature}</strong>
          </p>
        </div>

        <div className="trenner" />

        <div className="text-center">
          <h2 className="mb-8">{c.partnersHeading}</h2>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <a href="https://www.urologenportal.de/" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/urologenportal-logo.png" alt="urologenportal.de" width={160} height={90} className="max-h-[90px] w-auto object-contain" />
            </a>
            <a href="https://dga-online.org/" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/dga-logo.gif" alt="DGA - Deutsche Gesellschaft für Andrologie e.V." width={160} height={90} unoptimized className="max-h-[90px] w-auto object-contain" />
            </a>
            <Image src="/assets/camfomedics.png" alt="Camfomedics" width={160} height={90} className="max-h-[90px] w-auto object-contain" />
          </div>
        </div>

        <div className="trenner" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto text-center">
          <address className="not-italic text-body-text leading-[1.6]">
            <strong className="text-primary whitespace-pre-line">{c.addressName}</strong>
            <br />
            {c.addressRole}
            <br />
            Dierdorfer Str. 115-117
            <br />
            56564 Neuwied
            <br />
            <br />
            <strong className="text-primary">{c.telLabel}</strong> 02631 - 23351
            <br />
            <strong className="text-primary">{c.faxLabel}</strong> 02631 - 941845
          </address>

          <div>
            <h2 className="sr-only">{c.hoursTitle}</h2>
            <p className="text-body-text leading-[1.6]">
              {c.hours.map(({ day, hours }) => (
                <span key={day}>
                  <strong className="text-primary">{day}</strong>
                  <br />
                  {hours}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
