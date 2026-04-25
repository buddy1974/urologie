"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website";

const locales = [
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
];

const navLinks = [
  { key: "practice", href: "/praxis" },
  { key: "team", href: "/team" },
  {
    key: "services",
    href: "/leistungen",
    children: [
      { label: "Diagnostik", href: "/leistungen/diagnostik" },
      { label: "Onkologie", href: "/leistungen/onkologie" },
      { label: "Andrologie", href: "/leistungen/andrologie" },
      { label: "UroLift®", href: "/leistungen/urolift" },
      { label: "Magnetstimulation", href: "/leistungen/magnetstimulation" },
      { label: "Urodynamik", href: "/leistungen/urodynamik" },
    ],
  },
  { key: "contact", href: "/kontakt" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elegant" : "glass"
          }`}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Urologie Neuwied"
              width={180}
              height={48}
              className="h-9 w-auto rounded-md bg-white/95 p-1 object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.key} className="relative group">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors py-1">
                    {t(link.key)}
                    <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 mt-3 w-56 glass-strong rounded-2xl shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2 px-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={`/${locale}${child.href}`}
                          className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.key)}
                </Link>
              )
            )}

            {/* Language switcher */}
            <div className="flex items-center gap-0.5 border-l border-white/10 pl-4">
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}`}
                  title={loc.label}
                  className={cn(
                    "flex items-center px-1.5 py-1 rounded-lg text-base transition-all",
                    locale === loc.code
                      ? "bg-white/10"
                      : "opacity-50 hover:opacity-100"
                  )}
                >
                  {loc.flag}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/patientenportal`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-foreground hover:bg-white/10 transition-all"
            >
              Patientenportal
            </Link>
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              {t("appointment")}
              <ArrowRight size={14} />
            </a>
            <button
              className="lg:hidden p-2 rounded-xl glass text-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl px-4 py-4 space-y-1 shadow-elegant">
            {navLinks.map((link) => (
              <div key={link.key}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(link.key)}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                href={`/${locale}/patientenportal`}
                className="block w-full text-center glass rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-white/10 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Patientenportal
              </Link>
              <a
                href={DOCTOLIB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-xl bg-primary-gradient px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                {t("appointment")}
              </a>
            </div>

            {/* Language switcher mobile */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}`}
                  title={loc.label}
                  className={cn(
                    "px-2 py-1 rounded-lg text-base transition-all",
                    locale === loc.code ? "bg-white/10" : "opacity-50 hover:opacity-100"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {loc.flag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
