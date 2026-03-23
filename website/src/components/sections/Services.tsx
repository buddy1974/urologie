"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Microscope, HeartPulse, Baby, Zap, Activity, Sparkles, ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Microscope,
    title: "Diagnostik",
    description: "Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie und Spermiogramme für eine präzise Diagnose.",
    href: "/leistungen/diagnostik",
    tags: ["Labor", "Ultraschall", "Blasenspiegelung"],
    gradient: "from-[#1E9FD4] to-[#5ECFEB]",
    bg: "from-[#E8F7FD] to-[#F0FBFF]",
    iconBg: "bg-[#1E9FD4]",
    tagColor: "bg-[#1E9FD4]/10 text-[#1480AB] border border-[#1E9FD4]/20",
    hoverBorder: "hover:border-[#1E9FD4]/40",
    accent: "#1E9FD4",
  },
  {
    icon: HeartPulse,
    title: "Onkologie",
    description: "Onkologische Betreuung und Nachsorge bei Tumoren der Nieren, Harnblase, Prostata, Hoden und des Penis.",
    href: "/leistungen/onkologie",
    tags: ["Prostatakrebs", "Nierentumor", "Nachsorge"],
    gradient: "from-rose-500 to-pink-400",
    bg: "from-rose-50 to-pink-50",
    iconBg: "bg-rose-500",
    tagColor: "bg-rose-100 text-rose-700 border border-rose-200",
    hoverBorder: "hover:border-rose-200",
    accent: "#f43f5e",
  },
  {
    icon: Baby,
    title: "Andrologie",
    description: "Männergesundheit: Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch und Fruchtbarkeitsstörungen.",
    href: "/leistungen/andrologie",
    tags: ["Vasektomie", "Erektionsstörungen", "Fertilität"],
    gradient: "from-teal-500 to-emerald-400",
    bg: "from-teal-50 to-emerald-50",
    iconBg: "bg-teal-500",
    tagColor: "bg-teal-100 text-teal-700 border border-teal-200",
    hoverBorder: "hover:border-teal-200",
    accent: "#14b8a6",
  },
  {
    icon: Zap,
    title: "UroLift®",
    description: "Schonende Behandlung der benignen Prostatahyperplasie (BPH) ohne Operation — ambulant und schnell wirksam.",
    href: "/leistungen/urolift",
    tags: ["BPH", "Prostata", "Ambulant"],
    gradient: "from-amber-500 to-orange-400",
    bg: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-500",
    tagColor: "bg-amber-100 text-amber-700 border border-amber-200",
    hoverBorder: "hover:border-amber-200",
    accent: "#f59e0b",
  },
  {
    icon: Activity,
    title: "Magnetstimulation",
    description: "Stärkung der Beckenbodenmuskulatur bei Inkontinenz — bei Frau und Mann, auch nach Prostatektomie.",
    href: "/leistungen/magnetstimulation",
    tags: ["Inkontinenz", "Beckenboden", "Nicht-invasiv"],
    gradient: "from-violet-500 to-purple-400",
    bg: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-500",
    tagColor: "bg-violet-100 text-violet-700 border border-violet-200",
    hoverBorder: "hover:border-violet-200",
    accent: "#8b5cf6",
  },
  {
    icon: Sparkles,
    title: "Urodynamik & Ästhetik",
    description: "Blasendruckmessung bei Harninkontinenz sowie ästhetische Medizin mit Botox- und Fillerbehandlungen.",
    href: "/leistungen/urodynamik",
    tags: ["Urodynamik", "Botox", "Filler"],
    gradient: "from-[#5ECFEB] to-cyan-300",
    bg: "from-cyan-50 to-sky-50",
    iconBg: "bg-[#5ECFEB]",
    tagColor: "bg-cyan-100 text-cyan-700 border border-cyan-200",
    hoverBorder: "hover:border-cyan-200",
    accent: "#5ECFEB",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#1E9FD4] text-sm font-semibold uppercase tracking-widest mb-3">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-4">
            Umfassende urologische Versorgung
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Von der Früherkennung bis zur spezialisierten Therapie — wir begleiten Sie
            auf Ihrem gesamten Behandlungsweg.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className={`group relative block rounded-2xl border-2 border-slate-100 ${service.hoverBorder} overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bg} opacity-100`} />

                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-sm`}>
                      <Icon size={22} className="text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#2D3748] mb-2.5 group-hover:text-[#1E9FD4] transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`text-xs font-medium px-2.5 py-1 rounded-full ${service.tagColor}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Arrow link */}
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 group-hover:text-[#1E9FD4] transition-colors">
                      Mehr erfahren
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
