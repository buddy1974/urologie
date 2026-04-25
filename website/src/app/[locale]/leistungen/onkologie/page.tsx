import type { Metadata } from "next";
import Image from "next/image";
import { HeartPulse, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Onkologie",
  description: "Onkologische Betreuung und Nachsorge bei urologischen Tumoren in Neuwied.",
};

const tumors = [
  "Nierenzellkarzinom (Nierenkrebs)",
  "Harnleitertumoren",
  "Harnblasenkarzinom (Blasenkrebs)",
  "Harnröhrenkarzinom",
  "Prostatakarzinom (Prostatakrebs)",
  "Hodentumoren",
  "Peniskarzinom",
];

export default function OnkologiePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/leistung/leistungen_002.jpg"
          alt="Onkologie Urologie Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mx-auto mb-6">
              <HeartPulse size={30} className="text-primary-foreground" />
            </div>
            <div className="text-xs uppercase tracking-widest text-accent mb-4">Leistungen</div>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-6">Onkologie</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Onkologisch qualifizierte Betreuung und Nachsorge.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">

          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="font-display text-3xl text-foreground mb-8">Tumore &amp; Nachsorge</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tumors.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Check size={16} className="flex-shrink-0 text-accent" />
                  <span className="text-muted-foreground text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border-accent/20">
            <p className="text-accent font-semibold mb-2">Dr. Fomuki ist onkologisch qualifizierter Arzt</p>
            <p className="text-muted-foreground text-sm">mit Spezialisierung auf medikamentöse Tumortherapie und ambulantes Operieren.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
