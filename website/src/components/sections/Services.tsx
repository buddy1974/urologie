"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Microscope, HeartPulse, Baby, Zap, Activity, Sparkles, ArrowRight, User,
} from "lucide-react";

const services = [
  {
    icon: Microscope,
    title: "Diagnostik",
    description: "Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie und Spermiogramme für eine präzise Diagnose.",
    href: "/leistungen/diagnostik",
    tags: ["Labor", "Ultraschall", "Blasenspiegelung"],
  },
  {
    icon: HeartPulse,
    title: "Onkologie",
    description: "Onkologische Betreuung und Nachsorge bei Tumoren der Nieren, Harnblase, Prostata, Hoden und des Penis.",
    href: "/leistungen/onkologie",
    tags: ["Prostatakrebs", "Nierentumor", "Nachsorge"],
  },
  {
    icon: Baby,
    title: "Andrologie",
    description: "Männergesundheit: Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch und Fruchtbarkeitsstörungen.",
    href: "/leistungen/andrologie",
    tags: ["Vasektomie", "Erektionsstörungen", "Fertilität"],
  },
  {
    icon: Zap,
    title: "UroLift®",
    description: "Schonende Behandlung der benignen Prostatahyperplasie (BPH) ohne Operation — ambulant und schnell wirksam.",
    href: "/leistungen/urolift",
    tags: ["BPH", "Prostata", "Ambulant"],
  },
  {
    icon: Activity,
    title: "Magnetstimulation",
    description: "Stärkung der Beckenbodenmuskulatur bei Inkontinenz — bei Frau und Mann, auch nach Prostatektomie.",
    href: "/leistungen/magnetstimulation",
    tags: ["Inkontinenz", "Beckenboden", "Nicht-invasiv"],
  },
  {
    icon: Sparkles,
    title: "Urodynamik & Ästhetik",
    description: "Blasendruckmessung bei Harninkontinenz sowie ästhetische Medizin mit Botox- und Fillerbehandlungen.",
    href: "/leistungen/urodynamik",
    tags: ["Urodynamik", "Botox", "Filler"],
  },
  {
    icon: User,
    title: "Patientenportal",
    description: "Befunde & Termine online einsehen — sicher, jederzeit, ohne Wartezeit am Telefon.",
    href: "/patientenportal",
    tags: ["Befunde", "Termine", "Sicher"],
  },
];

export default function Services() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background orb */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-accent mb-4">Unsere Leistungen</div>
          <h2 className="font-display text-5xl md:text-6xl leading-tight text-foreground">
            Umfassende <span className="text-gradient italic">urologische</span> Versorgung.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Von der Früherkennung bis zur spezialisierten Therapie — wir begleiten Sie
            auf Ihrem gesamten Behandlungsweg.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={service.href}
                  className="group relative block glass rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow hover:border-primary/40 h-full"
                >
                  <div className="absolute inset-0 rounded-3xl bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="relative">
                    {/* Icon */}
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient shadow-glow mb-6">
                      <Icon size={26} className="text-primary-foreground" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl text-foreground mb-3">{service.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-full glass text-accent border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Mehr erfahren <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
