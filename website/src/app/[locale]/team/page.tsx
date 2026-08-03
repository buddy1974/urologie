import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Unser Team",
  description:
    "Das Team der Urologischen Praxis Neuwied — Walters T. Fomuki und seine erfahrenen Mitarbeiterinnen.",
};

type Locale = "de" | "en" | "fr";

const memberships = [
  "Deutsche Gesellschaft für Urologie (DGU)",
  "Deutsche Gesellschaft für Andrologie (DGA)",
  "Camfomedics e.V.",
];

const content = {
  de: {
    label: "Team",
    title: "Das Team der Urologie Neuwied",
    doctorsHeading: "Ärztliches Team",
    membershipsLabel: "Fachgesellschaften",
    staffHeading: "Medizinisches Fachpersonal",
    hiringTitle: "Wir stellen ein!",
    hiringText:
      "Wir suchen MFA, Ärztin/Arzt in Weiterbildung und Bürokauffrau/-mann. Werden Sie Teil unseres Teams.",
    hiringCta: "Jetzt Kontakt aufnehmen",
    doctors: [
      {
        name: "Walters T. Fomuki",
        role: "Facharzt für Urologie",
        image: "/assets/walters_fomuki_2023.jpg",
        qualifications: [
          "Onkologisch qualifizierter Arzt",
          "Medikamentöse Tumortherapie",
          "Ambulantes Operieren",
          "Konsiliararzt DRK Krankenhaus Neuwied",
        ],
      },
      {
        name: "Frau Dr. C. Nwankwo",
        role: "Fachärztin für Urologie",
        image: "/assets/dummy_female.jpg",
        qualifications: ["Angestellte Ärztin"],
      },
    ],
    staff: [
      { name: "Bettina Theismann", role: "MFA", image: "/assets/theismann_bettina.jpg", focus: ["Praxisorganisation", "Qualitätsbeauftragte"] },
      { name: "Jacqueline Elinger", role: "MFA", image: "/assets/ellinger_jaqueline_2021.jpg", focus: ["Zusatzqualifikation Onkologie", "Anmeldung"] },
      { name: "Johanna Sikora", role: "MFA", image: "/assets/sikora_johanna_02.jpg", focus: ["Zusatzqualifikation Onkologie", "OP-Assistenz"] },
      { name: "Frau Jakoby", role: "Büroassistenz", image: "/assets/jakoby_2023.jpg", focus: [] as string[] },
      { name: "Birgit Erhan", role: "MFA", image: "/assets/erhan_birgit.jpg", focus: ["Zusatzqualifikation Onkologie", "Labor"] },
      { name: "Vivien Urmersbach", role: "Auszubildende", image: "/assets/vivien_urmersbach_2023.jpg", focus: [] as string[] },
      { name: "Shau Wen Wang", role: "Auszubildende", image: "/assets/shau_wen_wang_2023.jpg", focus: [] as string[] },
    ],
  },
  en: {
    label: "Team",
    title: "The Team at Urologie Neuwied",
    doctorsHeading: "Medical Team",
    membershipsLabel: "Professional Associations",
    staffHeading: "Medical Support Staff",
    hiringTitle: "We're hiring!",
    hiringText:
      "We are looking for medical assistants, physicians in training, and office staff. Become part of our team.",
    hiringCta: "Get in touch",
    doctors: [
      {
        name: "Walters T. Fomuki",
        role: "Specialist in Urology",
        image: "/assets/walters_fomuki_2023.jpg",
        qualifications: [
          "Oncology-qualified physician",
          "Drug-based tumor therapy",
          "Outpatient surgery",
          "Consulting physician, DRK Hospital Neuwied",
        ],
      },
      {
        name: "Frau Dr. C. Nwankwo",
        role: "Specialist in Urology",
        image: "/assets/dummy_female.jpg",
        qualifications: ["Employed physician"],
      },
    ],
    staff: [
      { name: "Bettina Theismann", role: "Medical Assistant", image: "/assets/theismann_bettina.jpg", focus: ["Practice organization", "Quality officer"] },
      { name: "Jacqueline Elinger", role: "Medical Assistant", image: "/assets/ellinger_jaqueline_2021.jpg", focus: ["Additional qualification in oncology", "Reception"] },
      { name: "Johanna Sikora", role: "Medical Assistant", image: "/assets/sikora_johanna_02.jpg", focus: ["Additional qualification in oncology", "Surgical assistance"] },
      { name: "Frau Jakoby", role: "Office assistance", image: "/assets/jakoby_2023.jpg", focus: [] as string[] },
      { name: "Birgit Erhan", role: "Medical Assistant", image: "/assets/erhan_birgit.jpg", focus: ["Additional qualification in oncology", "Laboratory"] },
      { name: "Vivien Urmersbach", role: "Trainee", image: "/assets/vivien_urmersbach_2023.jpg", focus: [] as string[] },
      { name: "Shau Wen Wang", role: "Trainee", image: "/assets/shau_wen_wang_2023.jpg", focus: [] as string[] },
    ],
  },
  fr: {
    label: "Équipe",
    title: "L'équipe d'Urologie Neuwied",
    doctorsHeading: "Équipe médicale",
    membershipsLabel: "Sociétés savantes",
    staffHeading: "Personnel médical",
    hiringTitle: "Nous recrutons !",
    hiringText:
      "Nous recherchons des assistant(e)s médicaux/ales, des médecins en formation et du personnel administratif. Rejoignez notre équipe.",
    hiringCta: "Nous contacter",
    doctors: [
      {
        name: "Walters T. Fomuki",
        role: "Spécialiste en urologie",
        image: "/assets/walters_fomuki_2023.jpg",
        qualifications: [
          "Médecin qualifié en oncologie",
          "Thérapie médicamenteuse des tumeurs",
          "Chirurgie ambulatoire",
          "Médecin consultant, Hôpital DRK Neuwied",
        ],
      },
      {
        name: "Frau Dr. C. Nwankwo",
        role: "Spécialiste en urologie",
        image: "/assets/dummy_female.jpg",
        qualifications: ["Médecin salariée"],
      },
    ],
    staff: [
      { name: "Bettina Theismann", role: "Assistante médicale", image: "/assets/theismann_bettina.jpg", focus: ["Organisation du cabinet", "Responsable qualité"] },
      { name: "Jacqueline Elinger", role: "Assistante médicale", image: "/assets/ellinger_jaqueline_2021.jpg", focus: ["Qualification complémentaire en oncologie", "Accueil"] },
      { name: "Johanna Sikora", role: "Assistante médicale", image: "/assets/sikora_johanna_02.jpg", focus: ["Qualification complémentaire en oncologie", "Assistance chirurgicale"] },
      { name: "Frau Jakoby", role: "Assistance administrative", image: "/assets/jakoby_2023.jpg", focus: [] as string[] },
      { name: "Birgit Erhan", role: "Assistante médicale", image: "/assets/erhan_birgit.jpg", focus: ["Qualification complémentaire en oncologie", "Laboratoire"] },
      { name: "Vivien Urmersbach", role: "Apprentie", image: "/assets/vivien_urmersbach_2023.jpg", focus: [] as string[] },
      { name: "Shau Wen Wang", role: "Apprentie", image: "/assets/shau_wen_wang_2023.jpg", focus: [] as string[] },
    ],
  },
} as const satisfies Record<Locale, unknown>;

export default async function TeamPage() {
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
        <h2 className="mb-8">{t.doctorsHeading}</h2>
        <div className="grid grid-cols-1 gap-6 mb-16">
          {t.doctors.map((doc) => (
            <div key={doc.name} className="border border-[#e5e5e5] rounded-md p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-32 h-32 rounded-md overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                  <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{doc.name}</h3>
                  <p className="text-primary text-sm font-bold mb-4">{doc.role}</p>
                  <ul className="space-y-1.5 mb-4">
                    {doc.qualifications.map((q) => (
                      <li key={q} className="text-body-text leading-[1.6] text-[15px]">
                        {q}
                      </li>
                    ))}
                  </ul>
                  {doc.name === "Walters T. Fomuki" && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-body-text/70 mb-2">
                        {t.membershipsLabel}
                      </p>
                      <ul className="space-y-1">
                        {memberships.map((m) => (
                          <li key={m} className="text-body-text text-sm leading-[1.6]">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="trenner" />

        <h2 className="mb-8">{t.staffHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {t.staff.map((member) => (
            <div key={member.name} className="border border-[#e5e5e5] rounded-md p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-body-text text-sm leading-tight">{member.name}</p>
                  <p className="text-xs text-primary mt-0.5">{member.role}</p>
                </div>
              </div>
              {member.focus.length > 0 && (
                <ul className="space-y-1">
                  {member.focus.map((f) => (
                    <li key={f} className="text-xs text-body-text leading-[1.5]">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="trenner" />

        <div className="border border-[#e5e5e5] rounded-md p-10 text-center">
          <h3 className="mb-3">{t.hiringTitle}</h3>
          <p className="text-body-text leading-[1.6] mb-6 max-w-xl mx-auto">{t.hiringText}</p>
          <a href={`/${locale}/kontakt`} className="btn-primary">
            {t.hiringCta}
          </a>
        </div>
      </div>
    </div>
  );
}
