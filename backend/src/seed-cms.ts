import dotenv from "dotenv";
dotenv.config();

import { db } from "./db";
import { pages } from "./db/schema";
import { eq } from "drizzle-orm";

const defaultPages = [
  {
    slug: "home",
    title: "Startseite",
    content: {
      heroBadge: "Facharztpraxis · Neuwied · seit 2009",
      heroHeadline: "Moderne Urologie.",
      heroHeadlineAccent: "Persönliche Betreuung.",
      heroSubtext: "Dr. Walters T. Fomuki und sein Team bieten modernste urologische Diagnostik und Therapie — von Vorsorge bis Onkologie, von Andrologie bis UroLift®.",
      stat1Value: "5.000+",
      stat1Label: "Patienten / Jahr",
      stat2Value: "15+",
      stat2Label: "Jahre Erfahrung",
      stat3Value: "4.9★",
      stat3Label: "Bewertungen",
    },
    metaTitle: "Urologie Neuwied | Dr. Walters T. Fomuki",
    metaDescription: "Urologische Facharztpraxis in Neuwied. Diagnostik, Onkologie, Andrologie, UroLift®, Magnetstimulation. Termin online via Doctolib.",
    metaKeywords: "Urologe Neuwied, Urologie Neuwied, Fomuki, Prostata, Vasektomie, UroLift, Andrologie",
  },
  {
    slug: "praxis",
    title: "Unsere Praxis",
    content: {
      headline: "Modern. Persönlich. Kompetent.",
      subtext: "Willkommen in der Urologischen Praxis Neuwied.",
      mainText: "Zur Philosophie unserer Praxis gehört es, dass wir uns für jeden einzelnen Patienten die Zeit nehmen, um die jeweiligen Krankheitsbeschwerden und medizinischen Fragestellungen ausführlich zu besprechen.",
      secondText: "Es ist uns besonders wichtig, medizinische Entscheidungen so zu treffen, dass Sie sich als Patient immer gut informiert und beraten fühlen. Unser Ziel ist eine partnerschaftliche Arzt-Patienten-Beziehung, die auf Vertrauen, Transparenz und gegenseitigem Respekt basiert.",
      feature1Title: "Modernste Ausstattung",
      feature1Text: "Hochmoderne Diagnostik- und Therapiegeräte für präzise Befunde.",
      feature2Title: "Erfahrenes Team",
      feature2Text: "Über 15 Jahre Erfahrung in der urologischen Facharztversorgung.",
      feature3Title: "Persönliche Betreuung",
      feature3Text: "Jeder Patient wird individuell und mit Zeit betreut.",
    },
    metaTitle: "Unsere Praxis | Urologie Neuwied",
    metaDescription: "Die Urologische Praxis Neuwied von Dr. Walters T. Fomuki — Philosophie, Ausstattung und Standort.",
    metaKeywords: "Urologie Praxis Neuwied, Facharzt Urologie, Dr. Fomuki",
  },
  {
    slug: "team",
    title: "Unser Team",
    content: {
      headline: "Erfahren. Engagiert. Persönlich.",
      subtext: "Unser eingespieltes Team sorgt dafür, dass Sie sich von der Anmeldung bis zur Behandlung gut aufgehoben fühlen.",
      ctaHeadline: "Wir stellen ein!",
      ctaText: "Wir suchen MFA, Ärztin/Arzt in Weiterbildung und Bürokauffrau/-mann. Werden Sie Teil unseres Teams.",
    },
    metaTitle: "Unser Team | Urologie Neuwied",
    metaDescription: "Das Team der Urologischen Praxis Neuwied — Dr. Walters T. Fomuki und seine erfahrenen Mitarbeiterinnen.",
    metaKeywords: "Team Urologie Neuwied, Dr. Fomuki, Dr. Nwankwo",
  },
  {
    slug: "diagnostik",
    title: "Diagnostik",
    content: {
      headline: "Diagnostik",
      subtext: "Präzise Diagnosen mit modernster Technik.",
      intro: "Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie und Spermiogramme für eine präzise Diagnose.",
    },
    metaTitle: "Diagnostik | Urologie Neuwied",
    metaDescription: "Urologische Diagnostik in Neuwied — Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie.",
    metaKeywords: "Diagnostik Urologie, PSA Test, Zystoskopie, Ultraschall Blase",
  },
  {
    slug: "onkologie",
    title: "Onkologie",
    content: {
      headline: "Onkologie",
      subtext: "Onkologisch qualifizierte Betreuung und Nachsorge.",
      intro: "Onkologische Betreuung und Nachsorge bei Tumoren der Nieren, Harnblase, Prostata, Hoden und des Penis.",
      qualificationText: "Dr. Fomuki ist onkologisch qualifizierter Arzt mit Spezialisierung auf medikamentöse Tumortherapie und ambulantes Operieren.",
    },
    metaTitle: "Onkologie | Urologie Neuwied",
    metaDescription: "Onkologische Betreuung und Nachsorge bei urologischen Tumoren in Neuwied.",
    metaKeywords: "Prostatakrebs Neuwied, Blasenkrebs, Nierenkrebs, Urologische Onkologie",
  },
  {
    slug: "andrologie",
    title: "Andrologie & Vasektomie",
    content: {
      headline: "Andrologie & Vasektomie",
      subtext: "Männergesundheit — kompetent und diskret.",
      intro: "Männergesundheit: Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch und Fruchtbarkeitsstörungen.",
      vasektomieText: "Dr. Fomuki ist zertifiziertes Mitglied im Netzwerk der Vasektomie-Experten.",
    },
    metaTitle: "Andrologie & Vasektomie | Urologie Neuwied",
    metaDescription: "Männergesundheit in Neuwied — Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch.",
    metaKeywords: "Vasektomie Neuwied, Andrologie, Erektionsstörungen, Kinderwunsch Mann",
  },
  {
    slug: "urolift",
    title: "UroLift® bei BPH",
    content: {
      headline: "UroLift® bei BPH",
      subtext: "Schonende Behandlung der Prostatavergrößerung — ambulant und schnell wirksam.",
      whatIsText: "UroLift® ist ein minimalinvasives Verfahren zur Behandlung der benignen Prostatahyperplasie (BPH) — einer gutartigen Vergrößerung der Prostata.",
      howText: "Kleine Implantate halten das Prostatagewebe dauerhaft zur Seite und öffnen so die Harnröhre — ohne Schnitt, ohne Wärme, ohne Entfernung von Gewebe.",
    },
    metaTitle: "UroLift® bei BPH | Urologie Neuwied",
    metaDescription: "UroLift® Behandlung bei benigner Prostatahyperplasie in Neuwied — ambulant, schonend, ohne Operation.",
    metaKeywords: "UroLift Neuwied, BPH Behandlung, Prostatavergrößerung, minimalinvasiv",
  },
  {
    slug: "magnetstimulation",
    title: "Magnetstimulation",
    content: {
      headline: "Magnetstimulation",
      subtext: "Stärkung der Beckenbodenmuskulatur — nicht-invasiv und effektiv.",
      whatIsText: "Die extrakorporale Magnetstimulation (EMS) stärkt die Beckenbodenmuskulatur durch magnetisch induzierte Muskelkontraktionen — ohne Ausziehen, ohne Schmerzen.",
    },
    metaTitle: "Magnetstimulation | Urologie Neuwied",
    metaDescription: "Magnetstimulation der Beckenbodenmuskulatur bei Inkontinenz in Neuwied.",
    metaKeywords: "Magnetstimulation Beckenboden, Inkontinenz Behandlung, EMS Urologie",
  },
  {
    slug: "urodynamik",
    title: "Urodynamik & Ästhetik",
    content: {
      headline: "Urodynamik & Ästhetik",
      subtext: "Blasendiagnostik und ästhetische Behandlungen aus einer Hand.",
      urodynamikText: "Die Urodynamik (Blasendruckmessung) ist die präziseste Methode zur Diagnose von Harninkontinenz und Blasenentleerungsstörungen.",
      aesthetikText: "Diskrete und professionelle ästhetische Behandlungen durch den erfahrenen Facharzt.",
    },
    metaTitle: "Urodynamik & Ästhetik | Urologie Neuwied",
    metaDescription: "Blasendruckmessung und ästhetische Medizin mit Botox und Filler in Neuwied.",
    metaKeywords: "Urodynamik Neuwied, Blasendruckmessung, Inkontinenz Diagnostik, Botox Arzt",
  },
  {
    slug: "kontakt",
    title: "Kontakt & Anfahrt",
    content: {
      headline: "Wir sind für Sie da",
      subtext: "Erreichen Sie uns telefonisch, per Fax oder buchen Sie Ihren Termin bequem online über Doctolib.",
      address: "Dierdorfer Str. 115–117, 56564 Neuwied",
      phone: "02631 - 23351",
      fax: "02631 - 941845",
      directionsAuto: "Parkplätze direkt vor der Praxis vorhanden",
      directionsBus: "Haltestelle Dierdorfer Straße (Linien 5, 12)",
      directionsBahn: "Bahnhof Neuwied — ca. 10 Min. mit dem Bus",
    },
    metaTitle: "Kontakt & Anfahrt | Urologie Neuwied",
    metaDescription: "Kontaktieren Sie die Urologische Praxis Neuwied. Adresse, Telefon, Öffnungszeiten und Anfahrt.",
    metaKeywords: "Urologie Neuwied Kontakt, Adresse Urologe Neuwied, Anfahrt Urologie",
  },
];

async function seedCms() {
  console.log("🌱 Seeding CMS pages…");
  let inserted = 0;
  let skipped = 0;

  for (const page of defaultPages) {
    const [existing] = await db.select().from(pages).where(eq(pages.slug, page.slug));
    if (existing) {
      console.log(`  ⏭  Skipping "${page.slug}" (already exists)`);
      skipped++;
      continue;
    }
    await db.insert(pages).values(page);
    console.log(`  ✅ Inserted "${page.slug}"`);
    inserted++;
  }

  console.log(`\nDone — ${inserted} inserted, ${skipped} skipped.`);
  process.exit(0);
}

seedCms().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
