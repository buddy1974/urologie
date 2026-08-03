import { Calendar, Phone, UserRound } from "lucide-react";

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

function t(locale: string, de: string, en: string, fr: string) {
  if (locale === "en") return en;
  if (locale === "fr") return fr;
  return de;
}

export default function QuickActionStrip({ locale }: { locale: string }) {
  const items = [
    {
      icon: Calendar,
      label: t(locale, "Termin buchen", "Book Appointment", "Prendre rendez-vous"),
      href: DOCTOLIB_URL,
      external: true,
    },
    {
      icon: Phone,
      label: "02631 - 23351",
      href: "tel:+49263123351",
      external: false,
    },
    {
      icon: UserRound,
      label: t(locale, "Patientenportal", "Patient Portal", "Espace Patient"),
      href: `/${locale}/patientenportal`,
      external: false,
    },
  ];

  return (
    <div className="w-full bg-primary-dark flex flex-col sm:flex-row">
      {items.map((item, i) => {
        const Icon = item.icon;
        const content = (
          <div className="flex flex-col items-center justify-center gap-2 text-white px-10 py-6 transition-colors hover:bg-white/[0.08]">
            <Icon size={22} />
            <span className="font-bold text-[15px]">{item.label}</span>
          </div>
        );
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={`flex-1 ${i < items.length - 1 ? "sm:border-r border-white/15 border-b sm:border-b-0" : ""}`}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
