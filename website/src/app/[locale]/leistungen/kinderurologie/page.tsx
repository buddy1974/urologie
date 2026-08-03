import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Baby, Heart, ArrowRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Kinderurologie",
  description:
    "Kinderurologie in der Urologischen Praxis Neuwied — Behandlung von Phimose, Hodenhochstand, Hypospadie, Epispadie und Bettnässen (Enuresis).",
};

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

type Locale = "de" | "en" | "fr";

const content = {
  de: {
    heroLabel: "Leistungen",
    heroTitle: "Kinderurologie",
    heroSubtitle:
      "Einfühlsame, kompetente Versorgung bei urologischen Erkrankungen im Kindes- und Jugendalter — für kleine Patienten und ihre Familien.",
    introTitle: "Urologische Versorgung für Kinder & Jugendliche",
    introParagraphs: [
      "Urologische Erkrankungen bei Kindern erfordern besondere Sorgfalt und Einfühlungsvermögen — sowohl gegenüber den kleinen Patienten als auch gegenüber den Eltern. Fomuki nimmt sich die Zeit für ein ausführliches Gespräch und erklärt Diagnose und Therapie verständlich.",
      "Für Eingriffe, die eine Vollnarkose erfordern, arbeiten wir eng mit spezialisierten Kinderkliniken der Region zusammen.",
    ],
    focusTitle: "Behandlungsschwerpunkte",
    conditions: [
      {
        title: "Vorhautverengung (Phimose)",
        desc: "Die Phimose ist eine der häufigsten urologischen Erkrankungen im Kindesalter. Wir differenzieren zwischen physiologischer (altersentsprechender) und pathologischer Phimose und bieten je nach Befund konservative (Steroidcreme) oder operative Therapie (Zirkumzision oder plastische Erweiterung).",
        icon: "🩺",
      },
      {
        title: "Hodenhochstand (Kryptorchismus)",
        desc: "Beim Hodenhochstand liegt ein oder beide Hoden nicht im Hodensack. Frühzeitige Behandlung ist wichtig für die spätere Fertilität. Wir koordinieren Diagnostik und ggf. operative Einlage in Kooperation mit Kinderkliniken der Region.",
        icon: "🔍",
      },
      {
        title: "Fehlbildungen (Hypospadie & Epispadie)",
        desc: "Hypospadie (Harnröhrenöffnung an der Unterseite des Penis) und Epispadie (an der Oberseite) erfordern individuelle Planung. Wir übernehmen Diagnose, Beratung und Koordination der spezialisierten Korrektur.",
        icon: "⚕️",
      },
      {
        title: "Bettnässen (Enuresis nocturna / diurna)",
        desc: "Enuresis ist eine häufige und behandelbare Erkrankung. Die nächtliche (Enuresis nocturna) und tageszeitliche (Enuresis diurna) Form werden durch Anamnese, Miktionsprotokoll und Sonographie abgeklärt. Therapieoptionen umfassen Verhaltenstherapie, Alarmapparate und medikamentöse Behandlung.",
        icon: "🌙",
      },
    ],
    parentNoteTitle: "Hinweis für Eltern",
    parentNote:
      "Bitte bringen Sie zur Erstvorstellung alle vorhandenen Vorbefunde, Ultraschallbilder und ärztliche Überweisungen mit. Manche Befunde (z. B. beim Hodenhochstand) sind zeitkritisch — zögern Sie nicht, frühzeitig einen Termin zu vereinbaren.",
    ctaTitle: "Termin vereinbaren",
    ctaText: "Rufen Sie uns an oder buchen Sie online. Wir nehmen uns die Zeit für Ihr Kind.",
    ctaBook: "Online buchen",
    ctaPhone: "02631 - 23351",
  },
  en: {
    heroLabel: "Services",
    heroTitle: "Pediatric Urology",
    heroSubtitle:
      "Compassionate, expert care for urological conditions in children and adolescents — for our smallest patients and their families.",
    introTitle: "Urological Care for Children & Adolescents",
    introParagraphs: [
      "Urological conditions in children require particular care and empathy — both towards the young patients and their parents. Fomuki takes the time for a thorough conversation and explains diagnosis and therapy in an understandable way.",
      "For procedures requiring general anesthesia, we work closely with specialized pediatric hospitals in the region.",
    ],
    focusTitle: "Areas of Focus",
    conditions: [
      {
        title: "Phimosis (Foreskin Narrowing)",
        desc: "Phimosis is one of the most common urological conditions in childhood. We differentiate between physiological (age-appropriate) and pathological phimosis and offer conservative (steroid cream) or surgical therapy (circumcision or plastic widening) depending on findings.",
        icon: "🩺",
      },
      {
        title: "Undescended Testicle (Cryptorchidism)",
        desc: "In cryptorchidism, one or both testicles are not located in the scrotum. Early treatment is important for later fertility. We coordinate diagnostics and, if needed, surgical placement in cooperation with regional pediatric hospitals.",
        icon: "🔍",
      },
      {
        title: "Malformations (Hypospadias & Epispadias)",
        desc: "Hypospadias (urethral opening on the underside of the penis) and epispadias (on the upper side) require individual planning. We handle diagnosis, counseling, and coordination of the specialized correction.",
        icon: "⚕️",
      },
      {
        title: "Bedwetting (Nocturnal / Diurnal Enuresis)",
        desc: "Enuresis is a common and treatable condition. The nocturnal (enuresis nocturna) and daytime (enuresis diurna) forms are assessed through history, voiding diary, and ultrasound. Treatment options include behavioral therapy, alarm devices, and medication.",
        icon: "🌙",
      },
    ],
    parentNoteTitle: "Note for Parents",
    parentNote:
      "Please bring all existing findings, ultrasound images, and medical referrals to the first appointment. Some findings (e.g. undescended testicle) are time-sensitive — don't hesitate to schedule an appointment early.",
    ctaTitle: "Schedule an Appointment",
    ctaText: "Call us or book online. We take the time your child needs.",
    ctaBook: "Book online",
    ctaPhone: "+49 2631 - 23351",
  },
  fr: {
    heroLabel: "Prestations",
    heroTitle: "Urologie Pédiatrique",
    heroSubtitle:
      "Une prise en charge attentionnée et compétente des affections urologiques chez l'enfant et l'adolescent — pour nos plus jeunes patients et leurs familles.",
    introTitle: "Soins urologiques pour enfants et adolescents",
    introParagraphs: [
      "Les affections urologiques chez l'enfant nécessitent une attention et une empathie particulières — tant envers les jeunes patients qu'envers leurs parents. Fomuki prend le temps d'un entretien approfondi et explique le diagnostic et le traitement de manière compréhensible.",
      "Pour les interventions nécessitant une anesthésie générale, nous travaillons en étroite collaboration avec des cliniques pédiatriques spécialisées de la région.",
    ],
    focusTitle: "Domaines de compétence",
    conditions: [
      {
        title: "Phimosis (rétrécissement du prépuce)",
        desc: "Le phimosis est l'une des affections urologiques les plus fréquentes chez l'enfant. Nous distinguons le phimosis physiologique (lié à l'âge) du phimosis pathologique et proposons, selon les résultats, un traitement conservateur (crème stéroïdienne) ou chirurgical (circoncision ou élargissement plastique).",
        icon: "🩺",
      },
      {
        title: "Cryptorchidie (testicule non descendu)",
        desc: "En cas de cryptorchidie, un ou les deux testicules ne se trouvent pas dans le scrotum. Un traitement précoce est important pour la fertilité future. Nous coordonnons le diagnostic et, si nécessaire, la mise en place chirurgicale en coopération avec les cliniques pédiatriques de la région.",
        icon: "🔍",
      },
      {
        title: "Malformations (hypospadias et épispadias)",
        desc: "L'hypospadias (ouverture urétrale sur la face inférieure du pénis) et l'épispadias (sur la face supérieure) nécessitent une planification individuelle. Nous assurons le diagnostic, le conseil et la coordination de la correction spécialisée.",
        icon: "⚕️",
      },
      {
        title: "Énurésie (nocturne / diurne)",
        desc: "L'énurésie est une affection fréquente et traitable. Les formes nocturne (enuresis nocturna) et diurne (enuresis diurna) sont évaluées par anamnèse, calendrier mictionnel et échographie. Les options thérapeutiques incluent la thérapie comportementale, les dispositifs d'alarme et le traitement médicamenteux.",
        icon: "🌙",
      },
    ],
    parentNoteTitle: "Remarque pour les parents",
    parentNote:
      "Merci d'apporter lors de la première consultation tous les résultats existants, images échographiques et courriers d'adressage médicaux. Certains résultats (par ex. testicule non descendu) sont urgents — n'hésitez pas à prendre rendez-vous rapidement.",
    ctaTitle: "Prendre rendez-vous",
    ctaText: "Appelez-nous ou réservez en ligne. Nous prenons le temps nécessaire pour votre enfant.",
    ctaBook: "Réserver en ligne",
    ctaPhone: "02631 - 23351",
  },
} as const;

export default async function KinderurologiePage() {
  const locale = (await getLocale()) as Locale;
  const c = content[locale] ?? content.de;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px] overflow-hidden">
        <Image
          src="/assets/header_leistungen_01.jpg"
          alt={c.heroTitle}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10">
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{c.heroLabel}</p>
          <h1 className="text-white text-[36px] font-bold">{c.heroTitle}</h1>
          <p className="text-white/80 text-base mt-3 max-w-2xl mx-auto">{c.heroSubtitle}</p>
        </div>
      </section>

      <div className="container py-[60px]">
        {/* Intro */}
        <div className="border border-[#e5e5e5] rounded-md p-6 md:p-8 flex gap-5 items-start">
          <Baby size={28} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="mb-4">{c.introTitle}</h2>
            {c.introParagraphs.map((p, i) => (
              <p key={i} className="text-body-text leading-[1.6] mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="trenner" />

        {/* Conditions */}
        <div className="flex items-center gap-3 mb-8">
          <Heart size={22} className="text-primary" />
          <h2>{c.focusTitle}</h2>
        </div>
        <div className="space-y-5">
          {c.conditions.map((cond) => (
            <div key={cond.title} className="border border-[#e5e5e5] rounded-md p-6">
              <div className="flex gap-5 items-start">
                <span className="text-2xl flex-shrink-0 mt-0.5">{cond.icon}</span>
                <div>
                  <h3 className="mb-2">{cond.title}</h3>
                  <p className="text-body-text leading-[1.6]">{cond.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="trenner" />

        {/* Parent note */}
        <div className="border border-[#e5e5e5] rounded-md p-6 flex gap-4 items-start">
          <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-body-text text-sm mb-1">{c.parentNoteTitle}</p>
            <p className="text-body-text leading-[1.6] text-sm">{c.parentNote}</p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <section className="bg-[#f0f7f9] py-[60px] px-5 text-center">
        <h3 className="mb-3">{c.ctaTitle}</h3>
        <p className="text-body-text leading-[1.6] mb-8 max-w-xl mx-auto">{c.ctaText}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="btn-doctolib inline-flex items-center gap-2">
            {c.ctaBook}
            <ArrowRight size={14} />
          </a>
          <a href="tel:+49263123351" className="btn-primary inline-flex items-center gap-2">
            {c.ctaPhone}
          </a>
        </div>
      </section>
    </div>
  );
}
