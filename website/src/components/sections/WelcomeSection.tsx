import Image from "next/image";
import Link from "next/link";

const content = {
  de: {
    label: "Unsere Praxis",
    heading: "Moderne Urologie — persönlich und kompetent",
    paragraphs: [
      "Zwischen den Flüssen Rhein und Wied betreiben wir unsere urologische Praxis unter der Leitung von Facharzt Walters T. Fomuki. In unserer Praxis bieten wir vielfältige ambulante Operationen aus dem urologischen Fachbereich an und haben uns dabei insbesondere auf die Sterilisation des Mannes spezialisiert. Diese auch als Vasektomie bezeichnete Operation führen wir klassisch nach dem bewährten Verfahren durch.",
      "Zu unserer Praxisphilosophie gehören eine ausführliche Beratung und eine verständliche Erklärung im Zuge der Untersuchung sowie Behandlung. Diese individuelle und gewissenhafte Betreuung bieten wir selbstverständlich auch unseren Vasektomie-Patienten. Zum allgemeinen Wohlbefinden unserer Patienten tragen außerdem die moderne Einrichtung unserer Räume und unser freundliches Praxisteam bei.",
    ],
    linkLabel: "Mehr über unsere Praxis →",
    caption: "Neuwied am Rhein · Eine Stadt am Rhein",
  },
  en: {
    label: "Our Practice",
    heading: "Modern urology — personal and expert",
    paragraphs: [
      "Between the Rhine and Wied rivers, we run our urology practice under the direction of specialist Walters T. Fomuki. Our practice offers a wide range of outpatient surgical procedures in urology, with a particular focus on male sterilisation. We carry out this procedure, also known as a vasectomy, using the well established classic technique.",
      "Our practice philosophy includes thorough consultations and clear explanations throughout every examination and treatment. We naturally extend this same individual and conscientious care to our vasectomy patients too. The modern setup of our rooms and our friendly team also contribute to our patients' overall wellbeing.",
    ],
    linkLabel: "More about our practice →",
    caption: "Neuwied am Rhein · A city on the Rhine",
  },
  fr: {
    label: "Notre Cabinet",
    heading: "Urologie moderne — personnelle et experte",
    paragraphs: [
      "Entre le Rhin et la Wied, nous dirigeons notre cabinet d'urologie sous la direction du spécialiste Walters T. Fomuki. Notre cabinet propose un large éventail d'interventions chirurgicales ambulatoires en urologie, avec une spécialisation particulière dans la stérilisation masculine. Nous réalisons cette intervention, également appelée vasectomie, selon la méthode classique éprouvée.",
      "Notre philosophie de cabinet repose sur des conseils approfondis et des explications claires tout au long de l'examen et du traitement. Nous offrons naturellement le même accompagnement individuel et attentif à nos patients pour la vasectomie. L'aménagement moderne de nos locaux et la convivialité de notre équipe contribuent également au bien-être général de nos patients.",
    ],
    linkLabel: "En savoir plus sur notre cabinet →",
    caption: "Neuwied am Rhein · Une ville au bord du Rhin",
  },
} as const;

type Locale = keyof typeof content;

export default function WelcomeSection({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? content.de;

  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-start">
        <div className="order-1">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
            <Image src="/assets/header_01.jpg" alt="Neuwied am Rhein" fill className="object-cover" />
          </div>
          <p className="text-primary-dark text-[13px] mt-3">{c.caption}</p>
        </div>

        <div className="order-2">
          <p className="text-primary text-[12px] font-bold uppercase tracking-widest mb-3">{c.label}</p>
          <h2 className="mb-6">{c.heading}</h2>
          <div className="space-y-4 mb-6">
            {c.paragraphs.map((p) => (
              <p key={p} className="text-body-text leading-[1.6]">
                {p}
              </p>
            ))}
          </div>
          <div className="trenner !mx-0 !my-8" />
          <Link href={`/${locale}/praxis`} className="text-primary font-bold hover:text-primary-dark transition-colors">
            {c.linkLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
