"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Befunde sofort online",
  "Keine Anrufe nötig",
  "Sicher per SMS-Code geschützt",
];

export default function PatientenportalBanner() {
  const locale = useLocale();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-hero opacity-40" />
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="glass-strong rounded-[2rem] p-10 md:p-16 shadow-elegant">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text + CTA */}
            <div>
              <div className="text-xs uppercase tracking-widest text-accent mb-4">Für Patienten</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-6">
                Ihre Befunde.
                <br />
                <span className="text-gradient italic">Jederzeit. Sicher.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Keine Warteschleife mehr. Loggen Sie sich ein und sehen Sie Ihre Laborergebnisse
                und Termine direkt online — geschützt durch SMS-Verifizierung.
              </p>
              <Link
                href={`/${locale}/patientenportal`}
                className="inline-flex items-center gap-3 rounded-full bg-primary-gradient px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Zum Patientenportal
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right — benefit pills */}
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="glass rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-accent/30 transition-colors"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-gradient shadow-glow flex-shrink-0">
                    <Check size={13} className="text-primary-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
