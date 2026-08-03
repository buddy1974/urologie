import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const content = {
  de: {
    label: "Ihr Spezialist",
    name: "Walters T. Fomuki",
    subtitle: "Facharzt für Urologie · Onkologisch qualifiziert · Vasektomie-Experte",
    paragraphs: [
      "Seit 2006 arbeite ich als Arzt und seit 2013 als Facharzt für Urologie.",
      "Gebürtig stamme ich aus dem westafrikanischen Kamerun. Dort wurde ich im Jahr 1972 geboren. Meine Schulausbildung im katholischen Sacred Heart College hat mich sehr geprägt. Nach dem Abitur bin ich zum Medizinstudium nach Heidelberg in Deutschland gekommen und habe anschließend meine Facharztweiterbildung im Nordwest Krankenhaus bei Professor E.W. Becht in Frankfurt am Main absolviert.",
    ],
    badges: ["15+ Jahre Erfahrung", "5.000+ Patienten/Jahr", "Vasektomie-Experte"],
    linkLabel: "Mehr über Walters T. Fomuki →",
  },
  en: {
    label: "Your Specialist",
    name: "Walters T. Fomuki",
    subtitle: "Specialist in Urology · Oncology certified · Vasectomy expert",
    paragraphs: [
      "I have worked as a physician since 2006, and as a specialist in Urology since 2013.",
      "I was born in 1972 in Cameroon, West Africa. My schooling at the Catholic Sacred Heart College shaped me a great deal. After finishing school, I came to Heidelberg, Germany, to study medicine, and later completed my specialist training in Urology at the Nordwest Krankenhaus under Professor E.W. Becht in Frankfurt am Main.",
    ],
    badges: ["15+ Years Experience", "5,000+ Patients/Year", "Vasectomy Expert"],
    linkLabel: "More about Walters T. Fomuki →",
  },
  fr: {
    label: "Votre Spécialiste",
    name: "Walters T. Fomuki",
    subtitle: "Spécialiste en urologie · Certifié en oncologie · Expert en vasectomie",
    paragraphs: [
      "J'exerce en tant que médecin depuis 2006, et en tant que spécialiste en urologie depuis 2013.",
      "Je suis né en 1972 au Cameroun, en Afrique de l'Ouest. Ma scolarité au collège catholique Sacred Heart m'a profondément marqué. Après le baccalauréat, je suis venu à Heidelberg, en Allemagne, pour étudier la médecine, avant d'achever ma formation de spécialiste en urologie au Nordwest Krankenhaus, sous la direction du professeur E.W. Becht, à Francfort-sur-le-Main.",
    ],
    badges: ["15+ ans d'expérience", "5 000+ patients/an", "Expert en vasectomie"],
    linkLabel: "En savoir plus sur Walters T. Fomuki →",
  },
} as const;

type Locale = keyof typeof content;

export default function DoctorProfile({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? content.de;

  return (
    <section className="bg-[#f9fafb]">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-start">
          <div className="order-1">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src="/assets/walters_fomuki_2023.jpg" alt={c.name} fill className="object-cover" priority={false} />
            </div>
          </div>

          <div className="order-2">
            <p className="text-primary text-[12px] font-bold uppercase tracking-widest mb-3">{c.label}</p>
            <h2 className="text-primary-dark mb-2">{c.name}</h2>
            <p className="text-body-text font-bold mb-6">{c.subtitle}</p>
            <div className="space-y-4 mb-8">
              {c.paragraphs.map((p) => (
                <p key={p} className="text-body-text leading-[1.6]">
                  {p}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {c.badges.map((b) => (
                <div key={b} className="flex items-center gap-2 bg-[#f0f7f9] rounded-md px-4 py-3">
                  <Check size={16} className="text-primary flex-shrink-0" />
                  <span className="text-primary-dark text-[14px] font-bold">{b}</span>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/dr-walters`} className="text-primary font-bold hover:text-primary-dark transition-colors">
              {c.linkLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
