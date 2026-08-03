import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function Footer() {
  const locale = await getLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
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
