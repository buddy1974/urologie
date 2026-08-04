type Locale = "de" | "en" | "fr";

const content: Record<Locale, string[]> = {
  de: [
    "Ärztekammer Rheinland-Pfalz",
    "Kassenärztliche Vereinigung RLP",
    "Doctolib Partner",
    "Onkologisch qualifiziert",
    "Vasektomie-Experte",
    "GKV & PKV zugelassen",
  ],
  en: [
    "Ärztekammer Rheinland-Pfalz",
    "Kassenärztliche Vereinigung RLP",
    "Doctolib Partner",
    "Oncology qualified",
    "Vasectomy expert",
    "Statutory & private insurance",
  ],
  fr: [
    "Ärztekammer Rheinland-Pfalz",
    "Kassenärztliche Vereinigung RLP",
    "Doctolib Partner",
    "Qualifié en oncologie",
    "Expert en vasectomie",
    "Assurance légale et privée",
  ],
};

export default function TrustStrip({ locale }: { locale: string }) {
  const badges = content[(locale as Locale) in content ? (locale as Locale) : "de"];
  const doubled = [...badges, ...badges];

  return (
    <div className="w-full bg-white border-t border-b border-[#e5e5e5] py-4 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {doubled.map((badge, i) => (
          <span
            key={`${badge}-${i}`}
            className="flex items-center gap-2 text-primary-dark text-[13px] font-bold px-8 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
