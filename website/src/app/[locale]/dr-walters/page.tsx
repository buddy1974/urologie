import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { GraduationCap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Walters T. Fomuki",
  description:
    "Walters T. Fomuki, Facharzt für Urologie in Neuwied — Werdegang, Qualifikationen und Fachgesellschaften.",
};

const content = {
  de: {
    eyebrow: "Facharzt für Urologie",
    title: "Walters T. Fomuki",
    intro: "Gern stelle ich mich Ihnen näher vor.",
    qualifications: [
      "Facharzt für Urologie",
      "Onkologisch qualifizierter Arzt",
      "Medikamentöse Tumortherapie",
      "Ambulantes Operieren",
      "Konsiliararzt DRK Krankenhaus Neuwied",
      "Weiterbildungsermächtigung zur Weiterbildung zum Facharzt für Urologie für 12 Monate",
    ],
    career: "Seit 2006 arbeite ich als Arzt und seit 2013 als Facharzt für Urologie.",
    bio: "Gebürtig stamme ich aus dem westafrikanischen Kamerun. Dort wurde ich im Jahr 1972 geboren. Meine Schulausbildung im katholischen Sacred Heart College hat mich sehr geprägt. Nach dem Abitur bin ich zum Medizinstudium nach Heidelberg in Deutschland gekommen und habe anschließend meine Facharztweiterbildung im Nordwest Krankenhaus bei Professor E.W. Becht in Frankfurt am Main absolviert. Meine Frau ist ebenfalls Ärztin und gemeinsam haben wir drei Kinder.",
    community:
      "Neben meiner urologischen und ärztlichen Tätigkeit interessiere und engagiere ich mich für das Zusammenleben von Deutschen und Kamerunern in unserer Region. Mein Herz schlägt für Deutschland und Kamerun. Meiner kamerunischen Heimat fühle ich mich sehr verbunden. So unterstütze ich mit meiner Familie mehrere Projekte in meinem Dorf in Kamerun. Gerne können Sie sich darüber auch informieren.",
    membershipsTitle: "Mitglied in folgenden Fachgesellschaften",
    memberships: ["Deutsche Gesellschaft für Urologie", "Deutsche Gesellschaft für Andrologie", "Camfomedics e.V."],
    qualificationsTitle: "Qualifikationen",
  },
  en: {
    eyebrow: "Specialist in Urology",
    title: "Walters T. Fomuki",
    intro: "I would be happy to introduce myself in more detail.",
    qualifications: [
      "Specialist in Urology",
      "Oncologically Qualified Physician",
      "Medicinal Tumour Therapy",
      "Outpatient Surgery",
      "Consulting Physician, DRK Hospital Neuwied",
      "Authorised to provide 12 months of specialist training toward the Urology qualification",
    ],
    career: "I have worked as a physician since 2006, and as a specialist in Urology since 2013.",
    bio: "I was born in 1972 in Cameroon, West Africa. My schooling at the Catholic Sacred Heart College shaped me a great deal. After finishing school, I came to Heidelberg, Germany, to study medicine, and later completed my specialist training in Urology at the Nordwest Krankenhaus under Professor E.W. Becht in Frankfurt am Main. My wife is also a physician, and together we have three children.",
    community:
      "Beyond my work as a urologist and physician, I take a personal interest in, and am actively engaged with, the German-Cameroonian community in our region. My heart belongs to both Germany and Cameroon, and I feel a deep connection to my Cameroonian homeland. Together with my family, I support several projects in my home village in Cameroon. You are welcome to learn more about this as well.",
    membershipsTitle: "Member of the Following Professional Societies",
    memberships: ["German Society of Urology", "German Society of Andrology", "Camfomedics e.V."],
    qualificationsTitle: "Qualifications",
  },
  fr: {
    eyebrow: "Spécialiste en urologie",
    title: "Walters T. Fomuki",
    intro: "Je me permets de me présenter plus en détail.",
    qualifications: [
      "Spécialiste en urologie",
      "Médecin qualifié en oncologie",
      "Traitement médicamenteux des tumeurs",
      "Chirurgie ambulatoire",
      "Médecin consultant, hôpital DRK de Neuwied",
      "Habilité à assurer 12 mois de formation spécialisée en urologie",
    ],
    career: "J'exerce en tant que médecin depuis 2006, et en tant que spécialiste en urologie depuis 2013.",
    bio: "Je suis né en 1972 au Cameroun, en Afrique de l'Ouest. Ma scolarité au collège catholique Sacred Heart m'a profondément marqué. Après le baccalauréat, je suis venu à Heidelberg, en Allemagne, pour étudier la médecine, avant d'achever ma formation de spécialiste en urologie au Nordwest Krankenhaus, sous la direction du professeur E.W. Becht, à Francfort-sur-le-Main. Mon épouse est également médecin, et nous avons ensemble trois enfants.",
    community:
      "Au-delà de mon activité de médecin urologue, je m'intéresse et m'investis personnellement dans la vie commune des communautés allemande et camerounaise de notre région. Mon cœur est partagé entre l'Allemagne et le Cameroun, et je reste très attaché à ma terre natale camerounaise. Avec ma famille, je soutiens ainsi plusieurs projets dans mon village natal au Cameroun. N'hésitez pas à vous renseigner à ce sujet également.",
    membershipsTitle: "Membre des sociétés savantes suivantes",
    memberships: ["Société allemande d'urologie", "Société allemande d'andrologie", "Camfomedics e.V."],
    qualificationsTitle: "Qualifications",
  },
} as const;

export default async function DrWaltersPage() {
  const locale = await getLocale();
  const c = content[locale as keyof typeof content] ?? content.de;

  return (
    <div className="min-h-screen bg-white">
      {/* Page hero */}
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <span className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3 block">
            {c.eyebrow}
          </span>
          <h1 className="text-white text-[36px] font-bold">{c.title}</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-[60px]">
        <p className="text-body-text leading-[1.6] text-[16px] italic mb-10">{c.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left — bio content */}
          <div>
            <p className="text-body-text leading-[1.6] text-[16px] font-bold mb-4">{c.career}</p>
            <p className="text-body-text leading-[1.6] text-[16px] mb-6">{c.bio}</p>
            <p className="text-body-text leading-[1.6] text-[16px]">{c.community}</p>
          </div>

          {/* Right — photo */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm rounded-lg overflow-hidden relative aspect-[4/5]">
              <Image
                src="/assets/walters_fomuki_2023.jpg"
                alt="Walters T. Fomuki, Facharzt für Urologie"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="trenner" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Qualifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={18} className="text-primary" />
              <h2>{c.qualificationsTitle}</h2>
            </div>
            <ul className="space-y-2">
              {c.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-body-text text-[16px] leading-[1.6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Memberships */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-primary" />
              <h2>{c.membershipsTitle}</h2>
            </div>
            <ul className="space-y-2">
              {c.memberships.map((m) => (
                <li key={m} className="flex items-start gap-2.5 text-body-text text-[16px] leading-[1.6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
