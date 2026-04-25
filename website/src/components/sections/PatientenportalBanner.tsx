"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

const benefits = [
  "Befunde sofort online",
  "Keine Anrufe nötig",
  "Sicher per SMS-Code geschützt",
];

export default function PatientenportalBanner() {
  const locale = useLocale();

  return (
    <section className="py-16 px-6" style={{ backgroundColor: "#2D3748" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left — text + CTA */}
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block text-[#5ECFEB] text-xs font-bold uppercase tracking-widest mb-3">
            Für Patienten
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Ihre Befunde.<br />Jederzeit. Sicher.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-7">
            Keine Warteschleife mehr. Loggen Sie sich ein und sehen Sie Ihre Laborergebnisse
            und Termine direkt online — geschützt durch SMS-Verifizierung.
          </p>
          <Link
            href={`/${locale}/patientenportal`}
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#1E9FD4]/40 hover:-translate-y-0.5"
            style={{ backgroundColor: "#1E9FD4" }}
          >
            Zum Patientenportal
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Right — benefit pills */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 rounded-xl px-5 py-3.5 border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            >
              <span className="text-lg leading-none">✅</span>
              <span className="text-white font-medium text-sm">{benefit}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
