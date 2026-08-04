"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Building2,
  Stethoscope,
  Users,
  Link2,
  Phone,
  Microscope,
  Ribbon,
  User,
  Zap,
  Magnet,
  BarChart3,
  Hospital,
  Baby,
  Gem,
  UserRound,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import OpeningHours from "@/components/ui/OpeningHours";

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";
const PRAXISOS_URL = "https://urologie-dashboard-one.vercel.app";

const languages = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const leistungenLinks = [
  { key: "diagnostik", href: "/leistungen/diagnostik", icon: Microscope },
  { key: "onkologie", href: "/leistungen/onkologie", icon: Ribbon },
  { key: "andrologie", href: "/leistungen/andrologie", icon: User },
  { key: "urolift", href: "/leistungen/urolift", icon: Zap },
  { key: "magnetstimulation", href: "/leistungen/magnetstimulation", icon: Magnet },
  { key: "urodynamik", href: "/leistungen/urodynamik", icon: BarChart3 },
  { key: "ambulanteOp", href: "/leistungen/ambulante-op", icon: Hospital },
  { key: "kinderurologie", href: "/leistungen/kinderurologie", icon: Baby },
  { key: "individuelleLeistungen", href: "/leistungen/individuelle-leistungen", icon: Gem },
];

const overlayLinks = [
  { key: "home", href: "", icon: Home },
  { key: "practice", href: "/praxis", icon: Building2 },
  { key: "doctor", href: "/dr-walters", icon: Stethoscope },
  { key: "team", href: "/team", icon: Users },
  { key: "linksPage", href: "/links", icon: Link2 },
  { key: "contact", href: "/kontakt", icon: Phone },
];

const legalLinks = [
  { key: "portal", href: "/patientenportal", icon: UserRound, label: null },
  { key: "impressum", href: "/impressum", icon: FileText, label: "Impressum" },
  { key: "datenschutz", href: "/datenschutz", icon: ShieldCheck, label: "Datenschutz" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const tLeistungen = useTranslations("leistungen");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

        {/* Desktop nav — simplified: Leistungen, Kontakt, flags, PraxisOS, Doctolib, menu */}
        <nav className="hidden lg:flex items-center gap-8">
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

          <Link href={`/${locale}/kontakt`} className={linkClass(isActive("/kontakt"))}>
            {t("contact")}
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

          {/* PraxisOS — subtle */}
          <a
            href={PRAXISOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-bold text-primary-dark opacity-60 hover:opacity-100 transition-opacity duration-200"
          >
            PraxisOS
          </a>

          <OpeningHours locale={locale} variant="compact" />

          <Link
            href={`/${locale}/patientenportal`}
            className="text-[14px] font-bold text-white bg-primary hover:bg-primary-dark transition-colors duration-200 px-[14px] py-[6px] rounded"
          >
            {t("portal")}
          </Link>

          {/* Doctolib CTA */}
          <a
            href={DOCTOLIB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-doctolib-blue hover:bg-[#0d6ab8] px-[22px] py-[10px] rounded transition-colors"
          >
            <Image src="/assets/doctolib-white-transparent.png" alt="Doctolib" width={100} height={22} className="h-[22px] w-auto" />
          </a>

          {/* Alle Seiten */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-[14px] font-bold text-body-text hover:text-primary transition-colors"
          >
            <Menu size={18} />
            {t("allPages")}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-body-text"
          onClick={() => setMenuOpen(true)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
          <div className="container flex items-center justify-between h-[60px] md:h-[102px] border-b border-[#e5e5e5]">
            <Link href={`/${locale}`} className="flex items-center">
              <Image src="/assets/logo.png" alt="Urologie Neuwied" width={170} height={60} className="h-[44px] w-auto object-contain" />
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 text-body-text hover:text-primary transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="container px-6 py-8 md:px-[60px] md:py-12 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Column 1 — Unsere Praxis */}
              <div>
                <p className="text-primary text-[12px] font-bold uppercase tracking-widest mb-4">{t("practice")}</p>
                <div className="flex flex-col gap-2.5">
                  {overlayLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={`/${locale}${link.href}`}
                      className={cn(
                        "group flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-5 py-4 transition-all duration-200 hover:border-primary hover:shadow-[0_4px_16px_rgba(137,194,202,0.25)] hover:-translate-y-0.5",
                        isActive(link.href) && "border-primary"
                      )}
                    >
                      <link.icon size={19} className="text-primary flex-shrink-0" />
                      <span className="text-primary-dark font-bold text-[15px]">{t(link.key)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2 — Leistungen */}
              <div>
                <p className="text-primary text-[12px] font-bold uppercase tracking-widest mb-4">{t("services")}</p>
                <div className="flex flex-col gap-2.5">
                  {leistungenLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "group flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-5 py-4 transition-all duration-200 hover:border-primary hover:shadow-[0_4px_16px_rgba(137,194,202,0.25)] hover:-translate-y-0.5",
                        isActive(item.href) && "border-primary"
                      )}
                    >
                      <item.icon size={19} className="text-primary flex-shrink-0" />
                      <span className="text-primary-dark font-bold text-[15px]">{tLeistungen(item.key)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3 — Patienten & Rechtliches */}
              <div>
                <p className="text-primary text-[12px] font-bold uppercase tracking-widest mb-4">
                  {t("overlayCategoryLegal")}
                </p>
                <div className="flex flex-col gap-2.5">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={`/${locale}${link.href}`}
                      className={cn(
                        "group flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-5 py-4 transition-all duration-200 hover:border-primary hover:shadow-[0_4px_16px_rgba(137,194,202,0.25)] hover:-translate-y-0.5",
                        isActive(link.href) && "border-primary"
                      )}
                    >
                      <link.icon size={19} className="text-primary flex-shrink-0" />
                      <span className="text-primary-dark font-bold text-[15px]">{link.label ?? t(link.key)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA strip */}
            <div className="mt-10 bg-[#f0f7f9] rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
              <span className="text-primary-dark font-bold text-[16px]">{t("overlayCtaBook")}</span>
              <a
                href={DOCTOLIB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-doctolib-blue hover:bg-[#0d6ab8] px-[22px] py-[10px] rounded transition-colors"
              >
                <Image src="/assets/doctolib-white-transparent.png" alt="Doctolib" width={100} height={22} className="h-[22px] w-auto" />
              </a>
            </div>

            {/* Utility row: PraxisOS + languages */}
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mt-8 pt-6 border-t border-[#e5e5e5]">
              <a
                href={PRAXISOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-bold text-primary-dark opacity-60 hover:opacity-100 transition-opacity"
              >
                PraxisOS
              </a>
              <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
