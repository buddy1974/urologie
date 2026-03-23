"use client";

import { motion } from "framer-motion";
import { Calendar, MessageCircle, Phone, ArrowRight, Shield, Award, Users } from "lucide-react";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-hero";

const stats = [
  { icon: Users, value: "5.000+", label: "Patienten pro Jahr" },
  { icon: Award, value: "15+", label: "Jahre Erfahrung" },
  { icon: Shield, value: "6", label: "Fachleistungen" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Brand glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1E9FD4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#5ECFEB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left — Text */}
        <div>
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-[#1E9FD4]/10 border border-[#1E9FD4]/30 text-[#5ECFEB] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase"
          >
            <Shield size={12} />
            Facharzt für Urologie · Neuwied
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Moderne Urologie.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">
              Persönliche Betreuung.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl"
          >
            Dr. Walters T. Fomuki und sein Team bieten Ihnen modernste urologische Diagnostik und Therapie —
            von Vorsorge bis Onkologie, von Andrologie bis UroLift®.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1E9FD4] hover:bg-[#1480AB] text-white font-semibold px-6 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#1E9FD4]/30 hover:-translate-y-0.5"
            >
              <Calendar size={18} />
              Termin online buchen
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => {
                const chatEl = document.getElementById("ai-chat");
                if (chatEl) chatEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl transition-all backdrop-blur-sm"
            >
              <MessageCircle size={18} />
              KI-Assistent fragen
            </button>
            <a
              href="tel:+49263123351"
              className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 transition-colors"
            >
              <Phone size={16} />
              02631 - 23351
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-8"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1E9FD4]/20 rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-[#5ECFEB]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">{value}</div>
                  <div className="text-slate-400 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Info card */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="hidden lg:block"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-14 h-14 bg-[#1E9FD4] rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">WF</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Dr. Walters T. Fomuki</div>
                <div className="text-[#5ECFEB] text-sm">Facharzt für Urologie</div>
                <div className="text-slate-400 text-xs mt-0.5">Onkologisch qualifiziert · Konsiliararzt DRK Neuwied</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Sprechstunden</div>
              {[
                { day: "Mo & Di & Do", hours: "08:00–12:00 · 14:00–17:00" },
                { day: "Mi & Fr", hours: "08:00–12:00" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-slate-300 text-sm">{day}</span>
                  <span className="text-white text-sm font-medium">{hours}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Unsere Leistungen</div>
              {[
                "Diagnostik & Labor",
                "Onkologie & Nachsorge",
                "Andrologie & Vasektomie",
                "UroLift® bei BPH",
                "Magnetstimulation",
                "Urodynamik",
              ].map((service) => (
                <div key={service} className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-[#5ECFEB] rounded-full flex-shrink-0" />
                  {service}
                </div>
              ))}
            </div>

            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#1E9FD4] hover:bg-[#1480AB] text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Jetzt Termin buchen
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs tracking-widest uppercase">Mehr entdecken</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
