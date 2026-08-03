import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "UroLift® bei BPH",
  description:
    "UroLift® Behandlung bei benigner Prostatahyperplasie in Neuwied — ambulant, schonend, ohne Gewebsentfernung.",
};

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

const content = {
  de: {
    label: "BPH",
    title: "Urolift® bei benigner Prostatahyperplasie",
    intro:
      "Die benigne Prostatahyperplasie oder BPH ist eine Erkrankung, bei der sich die Prostata vergrößert. Sie tritt bei Männern mit steigendem Alter häufig auf. Mehr als 40 % der Männer ab 50 und über 70 % der Männer ab 60 sind von BPH betroffen. BPH ist zwar eine gutartige Erkrankung und hat nichts mit Prostatakrebs zu tun, kann sich aber erheblich auf die Lebensqualität eines Patienten auswirken.",
    footnote: "Berry, S.J., et al., J Urology 1984; 2018 US Census Bureau International Data Base",
    subheading1: "Was ist Prostatavergrößerung",
    body1:
      "Die Prostata ist eine walnussgroße männliche Fortpflanzungsdrüse, die Flüssigkeit für Samen produziert. Die Prostata umgibt die Harnröhre, d. h. die Röhre, die den Urin aus der Blase aus dem Körper leitet. Die vergrößerte Prostata drückt auf die Harnröhre und verengt diese, was unangenehme Harnsymptome verursacht.",
    contactLine: "Sprechen Sie uns einfach vertrauensvoll an!",
    contactRest: " Wir suchen gemeinsam mit Ihnen nach einem Weg, Ihre Beschwerden erfolgreich zu behandeln.",
    subheading2: "Vorteile",
    body2:
      "Angenehme und schonende Therapiemethode (nicht invasiv) — kurze ambulante Behandlungszeit (Dauer pro Sitzung ca. 15 Minuten) — in Alltagskleidung durchführbar.",
    stepsHeading: "Ablauf des Eingriffs",
    steps: [
      { title: "Einführung", desc: "Das UroLift®-System wird zystoskopisch in die Harnröhre eingeführt." },
      { title: "Positionierung", desc: "Das Prostatagewebe, das die Harnröhre einengt, wird identifiziert und angehoben." },
      { title: "Implantation", desc: "Kleine Implantate halten das Gewebe dauerhaft zur Seite und öffnen die Harnröhre." },
      { title: "Ergebnis", desc: "Die Harnröhre ist frei — verbesserter Harnfluss ohne Gewebsentfernung." },
    ],
    beforeAfterCaption: "Links: Eingeengte Harnröhre durch BPH · Rechts: Geöffnete Harnröhre nach UroLift®",
    ctaTitle: "UroLift® in Neuwied",
    ctaText: "Fomuki berät Sie gerne, ob UroLift® für Ihre Situation geeignet ist. Vereinbaren Sie jetzt einen Termin.",
    bookLabel: "Online buchen",
  },
  en: {
    label: "BPH",
    title: "Urolift® for Benign Prostatic Hyperplasia",
    intro:
      "Benign prostatic hyperplasia, or BPH, is a condition in which the prostate enlarges. It occurs frequently in men as they age. More than 40% of men aged 50 and over, and more than 70% of men aged 60 and over, are affected by BPH. Although BPH is a benign condition and has nothing to do with prostate cancer, it can significantly affect a patient's quality of life.",
    footnote: "Berry, S.J., et al., J Urology 1984; 2018 US Census Bureau International Data Base",
    subheading1: "What is Prostate Enlargement",
    body1:
      "The prostate is a walnut-sized male reproductive gland that produces fluid for semen. The prostate surrounds the urethra, the tube that carries urine out of the body from the bladder. The enlarged prostate presses on the urethra and narrows it, causing uncomfortable urinary symptoms.",
    contactLine: "Simply speak with us in confidence!",
    contactRest: " Together with you, we will look for a way to successfully treat your symptoms.",
    subheading2: "Advantages",
    body2:
      "Pleasant and gentle therapy method (non-invasive) — short outpatient treatment time (approx. 15 minutes per session) — can be performed while fully clothed.",
    stepsHeading: "Procedure",
    steps: [
      { title: "Introduction", desc: "The UroLift® system is inserted into the urethra cystoscopically." },
      { title: "Positioning", desc: "The prostate tissue narrowing the urethra is identified and lifted." },
      { title: "Implantation", desc: "Small implants permanently hold the tissue aside and open the urethra." },
      { title: "Result", desc: "The urethra is clear — improved urinary flow without tissue removal." },
    ],
    beforeAfterCaption: "Left: Urethra narrowed by BPH · Right: Urethra opened after UroLift®",
    ctaTitle: "UroLift® in Neuwied",
    ctaText: "Fomuki is happy to advise whether UroLift® is right for your situation. Book an appointment now.",
    bookLabel: "Book online",
  },
  fr: {
    label: "HBP",
    title: "Urolift® pour l'hyperplasie bénigne de la prostate",
    intro:
      "L'hyperplasie bénigne de la prostate, ou HBP, est une affection dans laquelle la prostate augmente de volume. Elle survient fréquemment chez les hommes à mesure qu'ils vieillissent. Plus de 40 % des hommes à partir de 50 ans et plus de 70 % des hommes à partir de 60 ans sont touchés par l'HBP. Bien que l'HBP soit une affection bénigne et n'ait rien à voir avec le cancer de la prostate, elle peut avoir un impact considérable sur la qualité de vie d'un patient.",
    footnote: "Berry, S.J., et al., J Urology 1984; 2018 US Census Bureau International Data Base",
    subheading1: "Qu'est-ce que l'augmentation de la prostate",
    body1:
      "La prostate est une glande reproductive masculine de la taille d'une noix qui produit le liquide séminal. La prostate entoure l'urètre, le canal qui évacue l'urine de la vessie hors du corps. La prostate hypertrophiée comprime l'urètre et le rétrécit, ce qui provoque des symptômes urinaires désagréables.",
    contactLine: "N'hésitez pas à nous en parler en toute confiance !",
    contactRest: " Ensemble, nous chercherons un moyen de traiter vos symptômes avec succès.",
    subheading2: "Avantages",
    body2:
      "Méthode de thérapie agréable et douce (non invasive) — courte durée de traitement ambulatoire (environ 15 minutes par séance) — réalisable en vêtements de tous les jours.",
    stepsHeading: "Déroulement de l'intervention",
    steps: [
      { title: "Introduction", desc: "Le système UroLift® est introduit dans l'urètre par cystoscopie." },
      { title: "Positionnement", desc: "Le tissu prostatique qui rétrécit l'urètre est identifié et soulevé." },
      { title: "Implantation", desc: "De petits implants maintiennent le tissu écarté en permanence et ouvrent l'urètre." },
      { title: "Résultat", desc: "L'urètre est dégagé — flux urinaire amélioré sans ablation de tissu." },
    ],
    beforeAfterCaption: "Gauche : urètre rétréci par l'HBP · Droite : urètre ouvert après UroLift®",
    ctaTitle: "UroLift® à Neuwied",
    ctaText: "Fomuki vous conseille volontiers si UroLift® convient à votre situation. Prenez rendez-vous dès maintenant.",
    bookLabel: "Réserver en ligne",
  },
} as const;

export default async function UroliftPage() {
  const locale = await getLocale();
  const c = content[locale as keyof typeof content] ?? content.de;

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{c.label}</p>
          <h1 className="text-white text-[36px] font-bold">{c.title}</h1>
        </div>
      </section>

      <div className="container py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded-md overflow-hidden bg-muted col-span-2">
              <Image src="/assets/anatomie_prostate.png" alt="Anatomie Prostata" fill className="object-contain p-2" />
            </div>
            <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
              <Image src="/assets/implantat.png" alt="Implantat" fill className="object-contain p-2" />
            </div>
            <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
              <Image src="/assets/vor_und_nach.png" alt={c.beforeAfterCaption} fill className="object-contain p-2" />
            </div>
          </div>

          <div>
            <p className="text-body-text leading-[1.6] mb-2">{c.intro}</p>
            <p className="text-[11px] text-body-text/60 mb-6">{c.footnote}</p>

            <h3>{c.subheading1}</h3>
            <p className="text-body-text leading-[1.6] mt-2 mb-6">{c.body1}</p>

            <p className="text-body-text leading-[1.6] mb-6">
              <Link href="/kontakt" className="font-bold">{c.contactLine}</Link>
              {c.contactRest}
            </p>

            <h3>{c.subheading2}</h3>
            <p className="text-body-text leading-[1.6] mt-2">{c.body2}</p>
          </div>
        </div>

        <div className="trenner" />

        <h2 className="text-center mb-8">{c.stepsHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {c.steps.map((s, i) => (
            <div key={s.title} className="border border-[#e5e5e5] rounded-md overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={`/assets/schritt_${i + 1}.png`}
                  alt={`${c.stepsHeading} ${i + 1}: ${s.title}`}
                  fill
                  className="object-contain p-3"
                />
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{i + 1}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-body-text text-sm mb-1">{s.title}</p>
                <p className="text-xs text-body-text/80 leading-[1.6]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-body-text/70 text-sm text-center mb-16">{c.beforeAfterCaption}</p>

        <div className="trenner" />

        <div className="text-center">
          <h3 className="mb-3">{c.ctaTitle}</h3>
          <p className="text-body-text leading-[1.6] max-w-xl mx-auto mb-6">{c.ctaText}</p>
          <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="btn-doctolib">
            {c.bookLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
