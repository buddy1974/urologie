"use client";

import { motion } from "framer-motion";
import { Calendar, Phone, ArrowRight, Shield, Award, Users } from "lucide-react";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-hero";

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
  { key: "tuesday",   de: "Dienstag",   en: "Tuesday",   fr: "Mardi",    tr: "Salı",      hours: "08:00–12:00, 14:00–17:00" },
  { key: "wednesday", de: "Mittwoch",   en: "Wednesday", fr: "Mercredi", tr: "Çarşamba",  hours: "08:00–12:00" },
  { key: "thursday",  de: "Donnerstag", en: "Thursday",  fr: "Jeudi",    tr: "Perşembe",  hours: "08:00–12:00, 14:00–17:00" },
  { key: "friday",    de: "Freitag",    en: "Friday",    fr: "Vendredi", tr: "Cuma",      hours: "08:00–12:00" },
];

export default function Hero({ locale }: { locale?: string }) {
  const getDayName = (h: typeof hours[0]) => {
    if (locale === "en") return h.en;
    if (locale === "fr") return h.fr;
    if (locale === "tr") return h.tr;
    return h.de;
  };

  const hoursLabel = locale === "en" ? "Opening Hours" : locale === "fr" ? "Horaires" : locale === "tr" ? "Muayene Saatleri" : "Sprechstunden";
  const servicesLabel = locale === "en" ? "Our Services" : locale === "fr" ? "Nos Prestations" : locale === "tr" ? "Hizmetlerimiz" : "Unsere Leistungen";
  const bookLabel = locale === "en" ? "Book Appointment" : locale === "fr" ? "Prendre RDV" : locale === "tr" ? "Randevu Al" : "Termin buchen";
  const reviewsLabel = locale === "en" ? "Reviews" : locale === "fr" ? "Avis" : locale === "tr" ? "Değerlendirmeler" : "Bewertungen";
  const perYearLabel = locale === "en" ? "Patients / Year" : locale === "fr" ? "Patients / An" : locale === "tr" ? "Hasta / Yıl" : "Patienten / Jahr";
  const experienceLabel = locale === "en" ? "Years Experience" : locale === "fr" ? "Ans d'expérience" : locale === "tr" ? "Yıl Deneyim" : "Jahre Erfahrung";

  const services = [
    locale === "en" ? "Diagnostics & Lab" : locale === "fr" ? "Diagnostique & Labo" : locale === "tr" ? "Tanı & Laboratuvar" : "Diagnostik & Labor",
    locale === "en" ? "Oncology & Follow-up" : locale === "fr" ? "Oncologie & Suivi" : locale === "tr" ? "Onkoloji & Takip" : "Onkologie & Nachsorge",
    locale === "en" ? "Andrology & Vasectomy" : locale === "fr" ? "Andrologie & Vasectomie" : locale === "tr" ? "Androloji & Vazektomi" : "Andrologie & Vasektomie",
    "UroLift® bei BPH",
    locale === "en" ? "Magnetic Stimulation" : locale === "fr" ? "Stimulation Magnétique" : locale === "tr" ? "Manyetik Stimülasyon" : "Magnetstimulation",
    locale === "en" ? "Urodynamics" : locale === "fr" ? "Urodynamique" : locale === "tr" ? "Ürodinamik" : "Urodynamik",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div
        className="absolute inset-0 opacity-20"
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
            {locale === "en" ? "Specialist Urology · Neuwied" : locale === "fr" ? "Urologue Spécialiste · Neuwied" : locale === "tr" ? "Üroloji Uzmanı · Neuwied" : "Facharzt für Urologie · Neuwied"}
          </motion.div>

          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {locale === "en" ? <>Modern Urology.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Personal Care.</span></> :
             locale === "fr" ? <>Urologie Moderne.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Suivi Personnalisé.</span></> :
             locale === "tr" ? <>Modern Üroloji.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Kişisel Bakım.</span></> :
             <>Moderne Urologie.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9FD4] to-[#5ECFEB]">Persönliche Betreuung.</span></>}
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
            {locale === "en" ? "Dr. Walters T. Fomuki and his team offer state-of-the-art urological diagnostics and therapy — from prevention to oncology, andrology to UroLift®." :
             locale === "fr" ? "Dr. Walters T. Fomuki et son équipe offrent des diagnostics et thérapies urologiques de pointe — de la prévention à l'oncologie." :
             locale === "tr" ? "Dr. Walters T. Fomuki ve ekibi, önlemden onkolojiye, androlojiden UroLift®'e kadar en modern ürolojik tanı ve tedavi hizmetleri sunar." :
             "Dr. Walters T. Fomuki und sein Team bieten Ihnen modernste urologische Diagnostik und Therapie — von Vorsorge bis Onkologie, von Andrologie bis UroLift®."}
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
              {locale === "en" ? "View Results" : locale === "fr" ? "Voir Résultats" : locale === "tr" ? "Sonuçları Gör" : "Befunde einsehen"}
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
              { icon: Shield, value: "4.9★", label: reviewsLabel },
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

        {/* Right — Info card only, no overlapping elements */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}
          className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#1E9FD4" }}>
                <span className="text-white font-bold text-xl">WF</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Dr. Walters T. Fomuki</div>
                <div className="text-sm mt-0.5" style={{ color: "#5ECFEB" }}>
                  {locale === "en" ? "Specialist in Urology" : locale === "fr" ? "Spécialiste en Urologie" : locale === "tr" ? "Üroloji Uzmanı" : "Facharzt für Urologie"}
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  {locale === "en" ? "Oncology certified · DRK Hospital Consultant" : locale === "fr" ? "Certifié Oncologie · Médecin consultant DRK" : locale === "tr" ? "Onkoloji sertifikalı · DRK Danışmanı" : "Onkologisch qualifiziert · Konsiliararzt DRK Neuwied"}
                </div>
              </div>
            </div>

            {/* Opening hours */}
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

            {/* Services */}
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
          {locale === "en" ? "Discover more" : locale === "fr" ? "Découvrir" : locale === "tr" ? "Keşfet" : "Mehr entdecken"}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}
