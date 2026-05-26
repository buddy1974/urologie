"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone, ArrowRight, Shield, Award, Users } from "lucide-react";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-hero";

const heroImages = [
  "/images/pics/header_01.jpg",
  "/images/pics/praxis_003.jpg",
  "/images/pics/praxis_004.jpg",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const hours = [
  { key: "monday",    de: "Montag",     en: "Monday",    fr: "Lundi",    tr: "Pazartesi", hours: "08:00–12:00, 14:00–17:00" },
  { key: "tuesday",   de: "Dienstag",   en: "Tuesday",   fr: "Mardi",    tr: "Sal\u0131",      hours: "08:00–12:00, 14:00–17:00" },
  { key: "wednesday", de: "Mittwoch",   en: "Wednesday", fr: "Mercredi", tr: "\u00c7ar\u015famba",  hours: "08:00–12:00" },
  { key: "thursday",  de: "Donnerstag", en: "Thursday",  fr: "Jeudi",    tr: "Per\u015fembe",  hours: "08:00–12:00, 14:00–17:00" },
  { key: "friday",    de: "Freitag",    en: "Friday",    fr: "Vendredi", tr: "Cuma",      hours: "08:00–12:00" },
];

export default function Hero({ locale }: { locale?: string }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getDayName = (h: typeof hours[0]) => {
    if (locale === "en") return h.en;
    if (locale === "fr") return h.fr;
    if (locale === "tr") return h.tr;
    return h.de;
  };

  const hoursLabel = locale === "en" ? "Opening Hours" : locale === "fr" ? "Horaires" : locale === "tr" ? "Muayene Saatleri" : "Sprechstunden";
  const servicesLabel = locale === "en" ? "Our Services" : locale === "fr" ? "Nos Prestations" : locale === "tr" ? "Hizmetlerimiz" : "Unsere Leistungen";
  const bookLabel = locale === "en" ? "Book Appointment" : locale === "fr" ? "Prendre RDV" : locale === "tr" ? "Randevu Al" : "Termin buchen";
  const reviewsLabel = locale === "en" ? "Reviews" : locale === "fr" ? "Avis" : locale === "tr" ? "De\u011flendirmeler" : "Bewertungen";
  const perYearLabel = locale === "en" ? "Patients / Year" : locale === "fr" ? "Patients / An" : locale === "tr" ? "Hasta / Y\u0131l" : "Patienten / Jahr";
  const experienceLabel = locale === "en" ? "Years Experience" : locale === "fr" ? "Ans d'exp\u00e9rience" : locale === "tr" ? "Y\u0131l Deneyim" : "Jahre Erfahrung";

  const services = [
    locale === "en" ? "Diagnostics & Lab" : locale === "fr" ? "Diagnostique & Labo" : locale === "tr" ? "Tan\u0131 & Laboratuvar" : "Diagnostik & Labor",
    locale === "en" ? "Oncology & Follow-up" : locale === "fr" ? "Oncologie & Suivi" : locale === "tr" ? "Onkoloji & Takip" : "Onkologie & Nachsorge",
    locale === "en" ? "Andrology & Vasectomy" : locale === "fr" ? "Andrologie & Vasectomie" : locale === "tr" ? "Androloji & Vazektomi" : "Andrologie & Vasektomie",
    "UroLift\u00ae bei BPH",
    locale === "en" ? "Magnetic Stimulation" : locale === "fr" ? "Stimulation Magn\u00e9tique" : locale === "tr" ? "Manyetik Stim\u00fclasyon" : "Magnetstimulation",
    locale === "en" ? "Urodynamics" : locale === "fr" ? "Urodynamique" : locale === "tr" ? "\u00dcrodinamik" : "Urodynamik",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">

      {/* Crossfade image slider */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentImage]}
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.15 }}
            priority={currentImage === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase">
            <Shield size={12} />
            {locale === "en" ? "Specialist Urology \u00b7 Neuwied" : locale === "fr" ? "Urologue Sp\u00e9cialiste \u00b7 Neuwied" : locale === "tr" ? "\u00dcroloji Uzman\u0131 \u00b7 Neuwied" : "Facharzt f\u00fcr Urologie \u00b7 Neuwied"}
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {locale === "en" ? <><span>Modern Urology.</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Personal Care.</span></> :
             locale === "fr" ? <><span>Urologie Moderne.</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Suivi Personnalis\u00e9.</span></> :
             locale === "tr" ? <><span>Modern \u00dcroloji.</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Ki\u015fisel Bak\u0131m.</span></> :
             <><span>Moderne Urologie.</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Pers\u00f6nliche Betreuung.</span></>}
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
            {locale === "en" ? "Walters T. Fomuki and his team offer state-of-the-art urological diagnostics and therapy — from prevention to oncology, andrology to UroLift\u00ae." :
             locale === "fr" ? "Walters T. Fomuki et son \u00e9quipe offrent des diagnostics et th\u00e9rapies urologiques de pointe — de la pr\u00e9vention \u00e0 l'oncologie." :
             locale === "tr" ? "Walters T. Fomuki ve ekibi, \u00f6nlemden onkolojiye, androlojiden UroLift\u00ae'e kadar en modern \u00fcrolojik tan\u0131 ve tedavi hizmetleri sunar." :
             "Walters T. Fomuki und sein Team bieten Ihnen modernste urologische Diagnostik und Therapie — von Vorsorge bis Onkologie, von Andrologie bis UroLift\u00ae."}
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: "#1E9FD4" }}>
              <Calendar size={18} />
              {bookLabel}
              <ArrowRight size={16} />
            </a>
            <a href={`/${locale ?? "de"}/patientenportal`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl transition-all backdrop-blur-sm">
              <Users size={18} />
              {locale === "en" ? "View Results" : locale === "fr" ? "Voir R\u00e9sultats" : locale === "tr" ? "Sonu\u00e7lar\u0131 G\u00f6r" : "Befunde einsehen"}
            </a>
            <a href="tel:+49263123351"
              className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white font-medium px-4 py-4 transition-colors">
              <Phone size={16} />
              02631 - 23351
            </a>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-wrap gap-8">
            {[
              { icon: Users, value: "5.000+", label: perYearLabel },
              { icon: Award, value: "15+", label: experienceLabel },
              { icon: Shield, value: "4.9\u2605", label: reviewsLabel },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(30,159,212,0.2)" }}>
                  <Icon size={18} style={{ color: "#1E9FD4" }} />
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
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#1E9FD4" }}>
                <span className="text-white font-bold text-xl">WF</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Walters T. Fomuki</div>
                <div className="text-sm mt-0.5" style={{ color: "#5ECFEB" }}>
                  {locale === "en" ? "Specialist in Urology" : locale === "fr" ? "Sp\u00e9cialiste en Urologie" : locale === "tr" ? "\u00dcroloji Uzman\u0131" : "Facharzt f\u00fcr Urologie"}
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  {locale === "en" ? "Oncology certified \u00b7 DRK Hospital Consultant" : locale === "fr" ? "Certifi\u00e9 Oncologie \u00b7 M\u00e9decin consultant DRK" : locale === "tr" ? "Onkoloji sertifikal\u0131 \u00b7 DRK Dan\u0131\u015fman\u0131" : "Onkologisch qualifiziert \u00b7 Konsiliararzt DRK Neuwied"}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">{hoursLabel}</div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.key} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-slate-300 text-sm w-28 flex-shrink-0">{getDayName(h)}</span>
                    <span className="text-white text-sm font-medium text-right whitespace-nowrap">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">{servicesLabel}</div>
              <div className="space-y-1.5">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#1E9FD4" }} />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center text-white font-semibold py-3.5 rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1E9FD4" }}>
              {bookLabel}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs tracking-widest uppercase">
          {locale === "en" ? "Discover more" : locale === "fr" ? "D\u00e9couvrir" : locale === "tr" ? "Ke\u015ffet" : "Mehr entdecken"}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}
