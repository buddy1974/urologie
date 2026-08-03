"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

function t(locale: string | undefined, de: string, en: string, fr: string) {
  if (locale === "en") return en;
  if (locale === "fr") return fr;
  return de;
}

export default function Hero({ locale }: { locale?: string }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
      {!videoFailed && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/Urologie%20Neuwied_SD.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-primary-dark/55" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center flex flex-col items-center">
        <motion.span
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-primary text-[14px] font-bold tracking-[3px] uppercase mb-4"
        >
          {t(locale, "Facharztpraxis für Urologie · Neuwied", "Specialist Urology Practice · Neuwied", "Cabinet d'Urologie Spécialisé · Neuwied")}
        </motion.span>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-white text-[32px] md:text-[48px] font-bold leading-tight mb-4"
        >
          {t(locale, "Willkommen bei Urologie Neuwied", "Welcome to Urologie Neuwied", "Bienvenue à Urologie Neuwied")}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-primary text-[16px] font-bold uppercase mb-4"
        >
          {t(
            locale,
            "Urologe Walters T. Fomuki – Vasektomie-Experte in Neuwied",
            "Urologist Walters T. Fomuki – Vasectomy Expert in Neuwied",
            "Urologue Walters T. Fomuki – Expert en Vasectomie à Neuwied"
          )}
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-white/85 text-[18px] mb-8"
        >
          {t(
            locale,
            "Moderne Medizin mit persönlicher Betreuung seit über 15 Jahren.",
            "Modern medicine with personal care for over 15 years.",
            "Une médecine moderne avec un suivi personnalisé depuis plus de 15 ans."
          )}
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={DOCTOLIB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-doctolib-blue text-white font-bold text-[18px] px-9 py-4 rounded-md shadow-[0_4px_16px_rgba(16,122,202,0.4)] transition-all duration-200 hover:bg-[#0d6ab8] hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(16,122,202,0.5)]"
          >
            <Image src="/assets/doctolib-white-transparent.png" alt="" width={20} height={20} className="h-4 w-auto" />
            {t(locale, "Termin via Doctolib", "Book via Doctolib", "RDV via Doctolib")}
          </a>
          <a
            href={`/${locale ?? "de"}/patientenportal`}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary font-bold text-[18px] px-9 py-4 rounded-md transition-colors hover:bg-primary hover:text-white"
          >
            {t(locale, "Patientenportal", "Patient Portal", "Espace Patient")}
          </a>
        </motion.div>
      </div>

      {/* Neuwied landmark floating card — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hidden md:block absolute bottom-10 left-10 z-10 w-[200px]"
      >
        <div className="rounded-xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative aspect-[4/3]">
          <Image src="/assets/header_01.jpg" alt="Neuwied am Rhein" fill className="object-cover" />
        </div>
        <p className="text-primary text-[13px] font-bold text-center mt-2">Neuwied am Rhein</p>
      </motion.div>

      {/* Dr. Fomuki floating card — top-right, clear of the fixed navbar and the fixed chat widget */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="hidden md:block absolute top-32 right-10 z-10 w-40"
      >
        <div className="rounded-xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative aspect-[4/5]">
          <Image src="/assets/walters_fomuki_2023.jpg" alt="Walters T. Fomuki" fill className="object-cover" />
        </div>
        <p className="text-primary text-[13px] font-bold text-center mt-2">Walters T. Fomuki</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <ChevronDown size={24} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
