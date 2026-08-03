import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { HeartPulse, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Onkologie",
  description: "Onkologische Betreuung und Nachsorge bei urologischen Tumoren in Neuwied.",
};

const content = {
  de: {
    label: "Leistungen",
    title: "Onkologie",
    subtitle: "Onkologisch qualifizierte Betreuung und Nachsorge.",
    tumorsHeading: "Tumore & Nachsorge",
    tumors: [
      "Nierenzellkarzinom (Nierenkrebs)",
      "Harnleitertumoren",
      "Harnblasenkarzinom (Blasenkrebs)",
      "Harnröhrenkarzinom",
      "Prostatakarzinom (Prostatakrebs)",
      "Hodentumoren",
      "Peniskarzinom",
    ],
    noteTitle: "Fomuki ist onkologisch qualifizierter Arzt",
    noteText: "mit Spezialisierung auf medikamentöse Tumortherapie und ambulantes Operieren.",
  },
  en: {
    label: "Services",
    title: "Oncology",
    subtitle: "Oncology-qualified care and follow-up.",
    tumorsHeading: "Tumors & Follow-up Care",
    tumors: [
      "Renal cell carcinoma (kidney cancer)",
      "Ureteral tumors",
      "Bladder carcinoma (bladder cancer)",
      "Urethral carcinoma",
      "Prostate carcinoma (prostate cancer)",
      "Testicular tumors",
      "Penile carcinoma",
    ],
    noteTitle: "Fomuki is an oncology-qualified physician",
    noteText: "specialized in drug-based tumor therapy and outpatient surgery.",
  },
  fr: {
    label: "Prestations",
    title: "Oncologie",
    subtitle: "Prise en charge et suivi oncologiques qualifiés.",
    tumorsHeading: "Tumeurs & Suivi",
    tumors: [
      "Carcinome à cellules rénales (cancer du rein)",
      "Tumeurs de l'uretère",
      "Carcinome de la vessie (cancer de la vessie)",
      "Carcinome de l'urètre",
      "Carcinome de la prostate (cancer de la prostate)",
      "Tumeurs testiculaires",
      "Carcinome du pénis",
    ],
    noteTitle: "Fomuki est médecin qualifié en oncologie",
    noteText: "spécialisé en thérapie médicamenteuse des tumeurs et chirurgie ambulatoire.",
  },
} as const;

export default async function OnkologiePage() {
  const locale = await getLocale();
  const t = content[locale as keyof typeof content] ?? content.de;

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 mx-auto mb-4">
            <HeartPulse size={30} className="text-white" />
          </div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold">{t.title}</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mt-3">{t.subtitle}</p>
        </div>
      </section>

      <section className="container py-[60px]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border border-[#e5e5e5] rounded-md p-8 md:p-12">
            <h2 className="text-3xl mb-8">{t.tumorsHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.tumors.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={16} className="flex-shrink-0 text-primary" />
                  <span className="text-body-text leading-[1.6] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="trenner" />

          <div className="border border-[#e5e5e5] rounded-md p-8 flex gap-5 items-center">
            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 hidden sm:block">
              <Image src="/assets/leistungen_007.jpg" alt="" fill className="object-cover" />
            </div>
            <div>
              <p className="text-primary font-bold mb-1">{t.noteTitle}</p>
              <p className="text-body-text leading-[1.6] text-sm">{t.noteText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
