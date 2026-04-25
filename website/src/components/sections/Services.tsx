"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Microscope, HeartPulse, Baby, Zap, Activity, Sparkles, ArrowRight,
} from "lucide-react";

const getServices = (locale: string) => [
  {
    icon: Microscope,
    title: locale === "en" ? "Diagnostics" : locale === "fr" ? "Diagnostique" : locale === "tr" ? "Tanı" : "Diagnostik",
    description: locale === "en" ? "Lab, ultrasound, cystoscopy, prostate biopsy, uroflowmetry and sperm analysis for precise diagnosis." :
      locale === "fr" ? "Laboratoire, échographie, cystoscopie, biopsie prostatique et analyse spermatique pour un diagnostic précis." :
      locale === "tr" ? "Kesin tanı için laboratuvar, ultrason, sistoskopi, prostat biyopsisi ve spermiyogram." :
      "Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie und Spermiogramme für eine präzise Diagnose.",
    href: "/leistungen/diagnostik",
    tags: locale === "en" ? ["Lab", "Ultrasound", "Cystoscopy"] : locale === "fr" ? ["Laboratoire", "Échographie", "Cystoscopie"] : locale === "tr" ? ["Laboratuvar", "Ultrason", "Sistoskopi"] : ["Labor", "Ultraschall", "Blasenspiegelung"],
    gradient: "from-[#1E9FD4] to-[#5ECFEB]",
    bg: "from-[#E8F7FD] to-[#F0FBFF]",
    iconBg: "bg-[#1E9FD4]",
    tagColor: "bg-[#1E9FD4]/10 text-[#1480AB] border border-[#1E9FD4]/20",
    hoverBorder: "hover:border-[#1E9FD4]/40",
  },
  {
    icon: HeartPulse,
    title: locale === "en" ? "Oncology" : locale === "fr" ? "Oncologie" : locale === "tr" ? "Onkoloji" : "Onkologie",
    description: locale === "en" ? "Oncological care and follow-up for kidney, bladder, prostate, testicular and penile tumors." :
      locale === "fr" ? "Soins oncologiques et suivi pour tumeurs des reins, de la vessie, de la prostate, des testicules." :
      locale === "tr" ? "Böbrek, mesane, prostat ve testis tümörlerinde onkolojik bakım ve takip." :
      "Onkologische Betreuung und Nachsorge bei Tumoren der Nieren, Harnblase, Prostata, Hoden und des Penis.",
    href: "/leistungen/onkologie",
    tags: locale === "en" ? ["Prostate Cancer", "Kidney Tumor", "Follow-up"] : locale === "fr" ? ["Cancer Prostate", "Tumeur Rein", "Suivi"] : locale === "tr" ? ["Prostat Kanseri", "Böbrek Tümörü", "Takip"] : ["Prostatakrebs", "Nierentumor", "Nachsorge"],
    gradient: "from-rose-500 to-pink-400",
    bg: "from-rose-50 to-pink-50",
    iconBg: "bg-rose-500",
    tagColor: "bg-rose-100 text-rose-700 border border-rose-200",
    hoverBorder: "hover:border-rose-200",
  },
  {
    icon: Baby,
    title: locale === "en" ? "Andrology" : locale === "fr" ? "Andrologie" : locale === "tr" ? "Androloji" : "Andrologie",
    description: locale === "en" ? "Men's health: vasectomy, erectile dysfunction, testosterone deficiency, fertility and family planning." :
      locale === "fr" ? "Santé masculine: vasectomie, dysfonction érectile, déficit en testostérone, fertilité." :
      locale === "tr" ? "Erkek sağlığı: vazektomi, erektil disfonksiyon, testosteron eksikliği, kısırlık." :
      "Männergesundheit: Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch und Fruchtbarkeitsstörungen.",
    href: "/leistungen/andrologie",
    tags: locale === "en" ? ["Vasectomy", "Erectile Dysfunction", "Fertility"] : locale === "fr" ? ["Vasectomie", "Dysfonction Érectile", "Fertilité"] : locale === "tr" ? ["Vazektomi", "Erektil Disfonksiyon", "Fertilite"] : ["Vasektomie", "Erektionsstörungen", "Fertilität"],
    gradient: "from-teal-500 to-emerald-400",
    bg: "from-teal-50 to-emerald-50",
    iconBg: "bg-teal-500",
    tagColor: "bg-teal-100 text-teal-700 border border-teal-200",
    hoverBorder: "hover:border-teal-200",
  },
  {
    icon: Zap,
    title: "UroLift®",
    description: locale === "en" ? "Minimally invasive treatment of benign prostatic hyperplasia (BPH) without surgery — outpatient and fast." :
      locale === "fr" ? "Traitement mini-invasif de l'hyperplasie bénigne de la prostate (HBP) sans opération — ambulatoire." :
      locale === "tr" ? "Ameliyatsız iyi huylu prostat hiperplazisi (BPH) tedavisi — ayakta, hızlı etkili." :
      "Schonende Behandlung der benignen Prostatahyperplasie (BPH) ohne Operation — ambulant und schnell wirksam.",
    href: "/leistungen/urolift",
    tags: locale === "en" ? ["BPH", "Prostate", "Outpatient"] : locale === "fr" ? ["HBP", "Prostate", "Ambulatoire"] : locale === "tr" ? ["BPH", "Prostat", "Ayakta"] : ["BPH", "Prostata", "Ambulant"],
    gradient: "from-amber-500 to-orange-400",
    bg: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-500",
    tagColor: "bg-amber-100 text-amber-700 border border-amber-200",
    hoverBorder: "hover:border-amber-200",
  },
  {
    icon: Activity,
    title: locale === "en" ? "Magnetic Stimulation" : locale === "fr" ? "Stimulation Magnétique" : locale === "tr" ? "Manyetik Stimülasyon" : "Magnetstimulation",
    description: locale === "en" ? "Pelvic floor strengthening for incontinence — in men and women, including after prostatectomy." :
      locale === "fr" ? "Renforcement du plancher pelvien pour l'incontinence — pour hommes et femmes." :
      locale === "tr" ? "İdrar kaçırma için pelvik taban güçlendirme — erkek ve kadınlarda, prostatektomi sonrası dahil." :
      "Stärkung der Beckenbodenmuskulatur bei Inkontinenz — bei Frau und Mann, auch nach Prostatektomie.",
    href: "/leistungen/magnetstimulation",
    tags: locale === "en" ? ["Incontinence", "Pelvic Floor", "Non-invasive"] : locale === "fr" ? ["Incontinence", "Plancher Pelvien", "Non-invasif"] : locale === "tr" ? ["İdrar Kaçırma", "Pelvik Taban", "Invazif Değil"] : ["Inkontinenz", "Beckenboden", "Nicht-invasiv"],
    gradient: "from-violet-500 to-purple-400",
    bg: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-500",
    tagColor: "bg-violet-100 text-violet-700 border border-violet-200",
    hoverBorder: "hover:border-violet-200",
  },
  {
    icon: Sparkles,
    title: locale === "en" ? "Urodynamics & Aesthetics" : locale === "fr" ? "Urodynamique & Esthétique" : locale === "tr" ? "Ürodinamik & Estetik" : "Urodynamik & Ästhetik",
    description: locale === "en" ? "Bladder pressure measurement for urinary incontinence plus aesthetic medicine with Botox and filler treatments." :
      locale === "fr" ? "Mesure de la pression vésicale pour l'incontinence urinaire et médecine esthétique Botox/fillers." :
      locale === "tr" ? "İdrar kaçırma için mesane basınç ölçümü ve Botox/dolgu maddeleri ile estetik tıp." :
      "Blasendruckmessung bei Harninkontinenz sowie ästhetische Medizin mit Botox- und Fillerbehandlungen.",
    href: "/leistungen/urodynamik",
    tags: locale === "en" ? ["Urodynamics", "Botox", "Filler"] : locale === "fr" ? ["Urodynamique", "Botox", "Filler"] : locale === "tr" ? ["Ürodinamik", "Botoks", "Dolgu"] : ["Urodynamik", "Botox", "Filler"],
    gradient: "from-[#5ECFEB] to-cyan-300",
    bg: "from-cyan-50 to-sky-50",
    iconBg: "bg-[#5ECFEB]",
    tagColor: "bg-cyan-100 text-cyan-700 border border-cyan-200",
    hoverBorder: "hover:border-cyan-200",
  },
];

export default function Services() {
  const locale = useLocale();
  const services = getServices(locale);

  const heading = locale === "en" ? "Comprehensive Urological Care" : locale === "fr" ? "Soins Urologiques Complets" : locale === "tr" ? "Kapsamlı Ürolojik Bakım" : "Umfassende urologische Versorgung";
  const subheading = locale === "en" ? "From early detection to specialised therapy — we accompany you throughout your entire treatment journey." : locale === "fr" ? "Du dépistage précoce à la thérapie spécialisée — nous vous accompagnons tout au long de votre parcours." : locale === "tr" ? "Erken teşhisten özel tedaviye — tüm tedavi sürecinizde yanınızdayız." : "Von der Früherkennung bis zur spezialisierten Therapie — wir begleiten Sie auf Ihrem gesamten Behandlungsweg.";
  const sectionLabel = locale === "en" ? "Our Services" : locale === "fr" ? "Nos Prestations" : locale === "tr" ? "Hizmetlerimiz" : "Unsere Leistungen";
  const moreLabel = locale === "en" ? "Learn more" : locale === "fr" ? "En savoir plus" : locale === "tr" ? "Daha fazla" : "Mehr erfahren";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="inline-block text-[#1E9FD4] text-sm font-semibold uppercase tracking-widest mb-3">{sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-4">{heading}</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">{subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.href} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Link href={`/${locale}${service.href}`}
                  className={`group relative block rounded-2xl border-2 border-slate-100 ${service.hoverBorder} overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bg} opacity-100`} />
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />
                  <div className="relative p-6">
                    <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-sm`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2D3748] mb-2.5 group-hover:text-[#1E9FD4] transition-colors">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`text-xs font-medium px-2.5 py-1 rounded-full ${service.tagColor}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 group-hover:text-[#1E9FD4] transition-colors">
                      {moreLabel}
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
