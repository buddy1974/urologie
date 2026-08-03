"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";
const PRAXISOS_URL = "https://urologie-dashboard-one.vercel.app";

const languages = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const leistungenLinks = [
  { key: "diagnostik", href: "/leistungen/diagnostik" },
  { key: "onkologie", href: "/leistungen/onkologie" },
  { key: "andrologie", href: "/leistungen/andrologie" },
  { key: "urolift", href: "/leistungen/urolift" },
  { key: "magnetstimulation", href: "/leistungen/magnetstimulation" },
  { key: "urodynamik", href: "/leistungen/urodynamik" },
  { key: "ambulanteOp", href: "/leistungen/ambulante-op" },
  { key: "kinderurologie", href: "/leistungen/kinderurologie" },
  { key: "individuelleLeistungen", href: "/leistungen/individuelle-leistungen" },
];

const navLinks = [
  { key: "home", href: "" },
  { key: "practice", href: "/praxis" },
  { key: "doctor", href: "/dr-walters" },
  { key: "team", href: "/team" },
  { key: "linksPage", href: "/links" },
  { key: "contact", href: "/kontakt" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const tLeistungen = useTranslations("leistungen");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href !== "" && (pathname === href || pathname === `/${locale}${href}`);

  const linkClass = (active: boolean) =>
    cn(
      "text-[16px] font-bold text-body-text border-b-2 border-transparent transition-colors duration-200 hover:text-primary hover:border-primary py-1",
      active && "text-primary border-primary"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] bg-[rgba(255,255,255,0.9)] h-[60px] md:h-[102px] border-b border-[rgba(45,90,113,0.15)] transition-shadow duration-300",
        scrolled && "shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className="container h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center flex-shrink-0 border-l-[3px] border-primary pl-3">
          <Image
            src="/assets/logo.png"
            alt="Urologie Neuwied"
            width={170}
            height={60}
            className="h-[44px] md:h-[60px] w-auto max-w-[170px] object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link key={link.key} href={`/${locale}${link.href}`} className={linkClass(isActive(link.href))}>
              {t(link.key)}
            </Link>
          ))}

          <div className="relative group">
            <button className={cn(linkClass(pathname?.includes("/leistungen")), "flex items-center gap-1")}>
              {t("services")}
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="min-w-[200px] bg-white border border-[#e5e5e5] rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.1)] py-2">
                {leistungenLinks.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className="flex items-center py-3 px-5 text-[15px] text-body-text hover:bg-[#f0f7f9] hover:text-primary transition-colors"
                  >
                    {tLeistungen(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
            <Link key={link.key} href={`/${locale}${link.href}`} className={linkClass(isActive(link.href))}>
              {t(link.key)}
            </Link>
          ))}

          <Link
            href={`/${locale}/patientenportal`}
            className="text-[14px] font-bold text-white bg-primary hover:bg-primary-dark transition-colors duration-200 px-[14px] py-[6px] rounded"
          >
            {t("portal")}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1.5 border-l border-black/10 pl-4">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code}`}
                title={lang.label}
                className={cn(
                  "rounded-sm overflow-hidden transition-all",
                  locale === lang.code ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                )}
              >
                <Image src={`/assets/${lang.code}.gif`} alt={lang.label} width={26} height={20} unoptimized />
              </Link>
            ))}
          </div>

          {/* PraxisOS */}
          <a
            href={PRAXISOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-bold text-primary-dark hover:text-primary transition-colors duration-200"
          >
            PraxisOS
          </a>

          {/* Doctolib CTA */}
          <a
            href={DOCTOLIB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-doctolib-blue hover:bg-[#0d6ab8] px-[22px] py-[10px] rounded transition-colors"
          >
            <Image src="/assets/doctolib-white-transparent.png" alt="Doctolib" width={100} height={22} className="h-[22px] w-auto" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-body-text"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.key} href={`/${locale}${link.href}`} className="py-2.5 text-[16px] font-bold text-body-text">
                {t(link.key)}
              </Link>
            ))}

            <div className="py-2.5 text-[13px] font-bold uppercase tracking-widest text-primary-dark/70">
              {t("services")}
            </div>
            <div className="flex flex-col gap-1 pl-3">
              {leistungenLinks.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="py-2 text-[15px] text-body-text"
                >
                  {tLeistungen(item.key)}
                </Link>
              ))}
            </div>

            {navLinks.slice(3).map((link) => (
              <Link key={link.key} href={`/${locale}${link.href}`} className="py-2.5 text-[16px] font-bold text-body-text">
                {t(link.key)}
              </Link>
            ))}

            <Link
              href={`/${locale}/patientenportal`}
              className="inline-block w-fit mt-1 text-[14px] font-bold text-white bg-primary px-[14px] py-[6px] rounded"
            >
              {t("portal")}
            </Link>

            <div className="flex items-center gap-3 py-3">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/${lang.code}`}
                  title={lang.label}
                  className={cn(
                    "rounded-sm overflow-hidden",
                    locale === lang.code ? "ring-2 ring-primary" : "opacity-70"
                  )}
                >
                  <Image src={`/assets/${lang.code}.gif`} alt={lang.label} width={26} height={20} unoptimized />
                </Link>
              ))}
            </div>

            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-doctolib-blue px-4 py-3 rounded mt-1"
            >
              <Image src="/assets/doctolib-white-transparent.png" alt="Doctolib" width={100} height={22} className="h-[22px] w-auto" />
            </a>

            <a
              href={PRAXISOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold text-primary-dark text-center mt-2 py-2"
            >
              PraxisOS
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
