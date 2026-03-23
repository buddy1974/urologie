"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone, Clock, ChevronDown } from "lucide-react";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Top bar */}
      <div className="text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-between max-w-7xl mx-auto" style={{ backgroundColor: "#2D3748" }}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone size={11} />
            02631 - 23351
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            Mo–Di, Do: 08–12 &amp; 14–17 | Mi, Fr: 08–12
          </span>
        </div>
        {/* Language switcher */}
        <div className="flex items-center gap-1">
          {locales.map((loc) => (
            <Link
              key={loc.code}
              href={`/${loc.code}`}
              title={loc.label}
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-all",
                locale === loc.code
                  ? "bg-white/20 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              )}
            >
              <span className="text-base leading-none">{loc.flag}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Urologie Neuwied"
            width={180}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.key} className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#2D3748] hover:text-[#1E9FD4] rounded-md hover:bg-sky-50 transition-colors">
                  {t(link.key)}
                  <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        className="block px-4 py-2.5 text-sm text-[#2D3748] hover:text-[#1E9FD4] hover:bg-sky-50 transition-colors"
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
                className="px-3 py-2 text-sm font-medium text-[#2D3748] hover:text-[#1E9FD4] rounded-md hover:bg-sky-50 transition-colors"
              >
                {t(link.key)}
              </Link>
            )
          )}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={DOCTOLIB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "#1E9FD4" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1480AB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1E9FD4")}
          >
            {t("appointment")}
          </a>
          <button
            className="lg:hidden p-2 rounded-md text-[#2D3748] hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.key}>
              <Link
                href={`/${locale}${link.href}`}
                className="block px-3 py-2.5 text-sm font-medium text-[#2D3748] hover:text-[#1E9FD4] hover:bg-sky-50 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
              {link.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={`/${locale}${child.href}`}
                      className="block px-3 py-2 text-sm text-slate-600 hover:text-[#1E9FD4] hover:bg-sky-50 rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-white text-sm font-semibold px-4 py-3 rounded-lg"
              style={{ backgroundColor: "#1E9FD4" }}
            >
              {t("appointment")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
