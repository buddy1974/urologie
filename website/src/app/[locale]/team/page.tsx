import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { GraduationCap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Unser Team",
  description:
    "Das Team der Urologischen Praxis Neuwied — Walters T. Fomuki und seine erfahrenen Mitarbeiterinnen.",
};

type Locale = "de" | "en" | "fr";

const doctorImage = "/assets/fomuki_walters_002.jpg";
const badgeImage = "/assets/Siegel_Vasektomie_Experten.jpg";

const staffImages: Record<string, string> = {
  theismann: "/assets/theismann_bettina.jpg",
  elinger: "/assets/ellinger_jaqueline_2021.jpg",
  sikora: "/assets/sikora_johanna_02.jpg",
  erhan: "/assets/erhan_birgit.jpg",
  jakoby: "/assets/jakoby_2023.jpg",
  urmersbach: "/assets/vivien_urmersbach_2023.jpg",
  wang: "/assets/shau_wen_wang_2023.jpg",
};

const content = {
  de: {
    label: "Team",
    title: "Unser Team",
    intro:
      "Unser eingespieltes Team sorgt dafür, dass Sie sich von der Anmeldung bis zur Behandlung gut aufgehoben fühlen.",
    doctorsHeading: "Ärztliches Team",
    staffHeading: "Medizinisches Fachpersonal",
    qualificationsLabel: "Qualifikationen & Schwerpunkte",
    membershipsLabel: "Fachgesellschaften",
    doctor: {
      name: "Walters T. Fomuki",
      role: "Facharzt für Urologie · Praxisinhaber",
      qualifications: [
        "Facharzt für Urologie seit 2013",
        "Onkologisch qualifizierter Arzt",
        "Medikamentöse Tumortherapie",
        "Ambulantes Operieren",
        "Konsiliararzt DRK Krankenhaus Neuwied",
        "Weiterbildungsermächtigung zum Facharzt für Urologie (12 Monate)",
        "Mitglied Vasektomie-Experten-Netzwerk",
      ],
      memberships: [
        "Deutsche Gesellschaft für Urologie (DGU)",
        "Deutsche Gesellschaft für Andrologie (DGA)",
        "Camfomedics e.V.",
      ],
      bio: "Gebürtig aus dem westafrikanischen Kamerun (geboren 1972) kam Fomuki nach dem Abitur am Sacred Heart College zum Medizinstudium nach Heidelberg. Seine Facharztweiterbildung absolvierte er im Nordwest Krankenhaus Frankfurt am Main bei Professor E. W. Becht. Seit 2006 ist er als Arzt tätig, seit 2013 als Facharzt für Urologie — seit 2014 in seiner eigenen Praxis in Neuwied.",
    },
    staff: [
      { key: "theismann", name: "Bettina Theismann", role: "MFA", focus: ["Praxisorganisation", "Qualitätsbeauftragte"] },
      { key: "elinger", name: "Jacqueline Elinger", role: "MFA", focus: ["Zusatzqualifikation Onkologie", "Anmeldung"] },
      { key: "sikora", name: "Johanna Sikora", role: "MFA", focus: ["Zusatzqualifikation Onkologie", "OP-Assistenz"] },
      { key: "erhan", name: "Birgit Erhan", role: "MFA", focus: ["Zusatzqualifikation Onkologie", "Labor"] },
      { key: "jakoby", name: "Frau Jakoby", role: "Büroassistenz", focus: [] },
      { key: "urmersbach", name: "Vivien Urmersbach", role: "Auszubildende MFA", focus: [] },
      { key: "wang", name: "Shau Wen Wang", role: "Auszubildende MFA", focus: [] },
    ],
    hiringTitle: "Wir stellen ein!",
    hiringText: "Wir suchen MFA, Ärztin/Arzt in Weiterbildung und Bürokauffrau/-mann. Werden Sie Teil unseres Teams.",
    hiringCta: "Jetzt Kontakt aufnehmen",
  },
  en: {
    label: "Team",
    title: "Our Team",
    intro:
      "Our well-coordinated team makes sure you feel well looked after — from reception to treatment.",
    doctorsHeading: "Medical Team",
    staffHeading: "Medical Support Staff",
    qualificationsLabel: "Qualifications & Focus Areas",
    membershipsLabel: "Professional Societies",
    doctor: {
      name: "Walters T. Fomuki",
      role: "Specialist in Urology · Practice Owner",
      qualifications: [
        "Specialist in Urology since 2013",
        "Oncologically qualified physician",
        "Medicinal tumour therapy",
        "Outpatient surgery",
        "Consulting physician, DRK Hospital Neuwied",
        "Authorised to provide 12 months of specialist training toward the Urology qualification",
        "Member of the Vasectomy Experts Network",
      ],
      memberships: [
        "German Society of Urology (DGU)",
        "German Society of Andrology (DGA)",
        "Camfomedics e.V.",
      ],
      bio: "Born in 1972 in Cameroon, West Africa, Fomuki came to Heidelberg, Germany, to study medicine after finishing school at Sacred Heart College. He completed his specialist training at the Nordwest Krankenhaus in Frankfurt am Main under Professor E. W. Becht. He has worked as a physician since 2006, as a specialist in Urology since 2013 — and in his own practice in Neuwied since 2014.",
    },
    staff: [
      { key: "theismann", name: "Bettina Theismann", role: "Medical Assistant", focus: ["Practice organization", "Quality officer"] },
      { key: "elinger", name: "Jacqueline Elinger", role: "Medical Assistant", focus: ["Additional qualification in oncology", "Reception"] },
      { key: "sikora", name: "Johanna Sikora", role: "Medical Assistant", focus: ["Additional qualification in oncology", "Surgical assistance"] },
      { key: "erhan", name: "Birgit Erhan", role: "Medical Assistant", focus: ["Additional qualification in oncology", "Laboratory"] },
      { key: "jakoby", name: "Frau Jakoby", role: "Office assistance", focus: [] },
      { key: "urmersbach", name: "Vivien Urmersbach", role: "Trainee", focus: [] },
      { key: "wang", name: "Shau Wen Wang", role: "Trainee", focus: [] },
    ],
    hiringTitle: "We're hiring!",
    hiringText: "We're looking for medical assistants, a physician in specialist training, and office staff. Join our team.",
    hiringCta: "Get in touch",
  },
  fr: {
    label: "Équipe",
    title: "Notre Équipe",
    intro:
      "Notre équipe bien rodée veille à ce que vous vous sentiez bien pris en charge, de l'accueil au traitement.",
    doctorsHeading: "Équipe médicale",
    staffHeading: "Personnel médical spécialisé",
    qualificationsLabel: "Qualifications & domaines de spécialisation",
    membershipsLabel: "Sociétés savantes",
    doctor: {
      name: "Walters T. Fomuki",
      role: "Spécialiste en urologie · Titulaire du cabinet",
      qualifications: [
        "Spécialiste en urologie depuis 2013",
        "Médecin qualifié en oncologie",
        "Traitement médicamenteux des tumeurs",
        "Chirurgie ambulatoire",
        "Médecin consultant, hôpital DRK de Neuwied",
        "Habilité à assurer 12 mois de formation spécialisée en urologie",
        "Membre du réseau des experts en vasectomie",
      ],
      memberships: [
        "Société allemande d'urologie (DGU)",
        "Société allemande d'andrologie (DGA)",
        "Camfomedics e.V.",
      ],
      bio: "Né en 1972 au Cameroun, en Afrique de l'Ouest, Fomuki est venu à Heidelberg, en Allemagne, pour étudier la médecine après le baccalauréat au Sacred Heart College. Il a achevé sa formation de spécialiste au Nordwest Krankenhaus de Francfort-sur-le-Main sous la direction du professeur E. W. Becht. Il exerce en tant que médecin depuis 2006, en tant que spécialiste en urologie depuis 2013 — et dans son propre cabinet à Neuwied depuis 2014.",
    },
    staff: [
      { key: "theismann", name: "Bettina Theismann", role: "Assistante médicale", focus: ["Organisation du cabinet", "Responsable qualité"] },
      { key: "elinger", name: "Jacqueline Elinger", role: "Assistante médicale", focus: ["Qualification complémentaire en oncologie", "Accueil"] },
      { key: "sikora", name: "Johanna Sikora", role: "Assistante médicale", focus: ["Qualification complémentaire en oncologie", "Assistance chirurgicale"] },
      { key: "erhan", name: "Birgit Erhan", role: "Assistante médicale", focus: ["Qualification complémentaire en oncologie", "Laboratoire"] },
      { key: "jakoby", name: "Frau Jakoby", role: "Assistance administrative", focus: [] },
      { key: "urmersbach", name: "Vivien Urmersbach", role: "Apprentie", focus: [] },
      { key: "wang", name: "Shau Wen Wang", role: "Apprentie", focus: [] },
    ],
    hiringTitle: "Nous recrutons !",
    hiringText: "Nous recherchons des assistantes médicales, un médecin en formation spécialisée et du personnel administratif. Rejoignez notre équipe.",
    hiringCta: "Nous contacter",
  },
} satisfies Record<Locale, unknown>;

export default async function TeamPage() {
  const locale = (await getLocale()) as Locale;
  const t = content[locale] ?? content.de;

  return (
    <div>
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div className="max-w-2xl">
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold mb-3">{t.title}</h1>
          <p className="text-white/85 text-[16px]">{t.intro}</p>
        </div>
      </section>

      <div className="container py-[60px]">
        {/* Doctor */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <h2>{t.doctorsHeading}</h2>
          </div>

          <div className="border border-[#e5e5e5] rounded-md p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <div className="w-28 h-28 rounded-md overflow-hidden relative">
                  <Image src={doctorImage} alt={t.doctor.name} fill className="object-cover" />
                </div>
                <div className="w-20 h-20 rounded-md overflow-hidden relative">
                  <Image src={badgeImage} alt="Vasektomie-Experten-Netzwerk" fill className="object-contain" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-body-text text-xl font-bold mb-1">{t.doctor.name}</h3>
                <p className="text-primary text-sm font-bold mb-5">{t.doctor.role}</p>
                <p className="text-body-text text-sm leading-[1.6] mb-7">{t.doctor.bio}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-bold text-body-text/60 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <GraduationCap size={13} />
                      {t.qualificationsLabel}
                    </p>
                    <div className="space-y-2">
                      {t.doctor.qualifications.map((q) => (
                        <div key={q} className="flex items-start gap-2.5 text-sm text-body-text">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-body-text/60 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <Users size={13} />
                      {t.membershipsLabel}
                    </p>
                    <div className="space-y-2">
                      {t.doctor.memberships.map((m) => (
                        <div key={m} className="flex items-start gap-2.5 text-sm text-body-text">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-dark flex-shrink-0 mt-1.5" />
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="trenner" />

        {/* Staff */}
        <div>
          <h2 className="mb-6">{t.staffHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {t.staff.map((member) => (
              <div key={member.key} className="border border-[#e5e5e5] rounded-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden relative flex-shrink-0">
                    <Image src={staffImages[member.key]} alt={member.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-body-text text-sm leading-tight">{member.name}</p>
                    <p className="text-xs text-primary mt-0.5">{member.role}</p>
                  </div>
                </div>
                {member.focus.length > 0 && (
                  <div className="space-y-1">
                    {member.focus.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-body-text/70">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="trenner" />

        {/* Hiring CTA */}
        <div className="border border-[#e5e5e5] rounded-md p-10 text-center">
          <h3 className="text-body-text text-2xl font-bold mb-3">{t.hiringTitle}</h3>
          <p className="text-body-text/80 mb-8 max-w-xl mx-auto">{t.hiringText}</p>
          <a href="/kontakt" className="btn-primary">
            {t.hiringCta} →
          </a>
        </div>
      </div>
    </div>
  );
}
