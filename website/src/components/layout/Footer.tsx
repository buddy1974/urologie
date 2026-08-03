import Link from "next/link";
import { getLocale } from "next-intl/server";

const complianceNotice = {
  de: "Nur technisch notwendige Cookies · Kein Tracking · Keine Werbung",
  en: "Technically necessary cookies only · No tracking · No advertising",
  fr: "Cookies techniquement nécessaires uniquement · Pas de suivi · Pas de publicité",
} as const;

export default async function Footer() {
  const locale = await getLocale();
  const currentYear = new Date().getFullYear();
  const notice = complianceNotice[locale as keyof typeof complianceNotice] ?? complianceNotice.de;

  return (
    <footer className="bg-primary-dark text-white">
      <p className="text-center text-[11px] text-white/45 pt-4 mb-2">{notice}</p>

      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 py-5 min-h-[70px] text-center sm:text-left">
        <span className="text-[16px]">
          © {currentYear} Urologie Neuwied — Walters T. Fomuki
        </span>

        <div className="flex items-center gap-5 text-[16px]">
          <Link href={`/${locale}/impressum`} className="hover:text-primary transition-colors">
            Impressum
          </Link>
          <Link href={`/${locale}/datenschutz`} className="hover:text-primary transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>

      <div className="text-center pb-3 text-xs text-white/50">
        <a href="https://maxpromo.digital" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
          maxpromo.digital
        </a>
      </div>
    </footer>
  );
}
