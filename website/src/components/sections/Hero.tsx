"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Calendar, MessageCircle, Phone, ArrowRight, Award, Users,
  ChevronLeft, ChevronRight, User, Star, Sparkles,
} from "lucide-react";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-hero";

const slides = [
  "/images/header.jpg",
  "/images/header2.jpg",
  "/images/header_praxis_01.jpg",
  "/images/praxis_001.jpg",
  "/images/praxis_005.jpg",
  "/images/praxis_0012.jpg",
];

const stats = [
  { icon: Users, value: "5.000+", label: "Patienten / Jahr" },
  { icon: Award, value: "15+", label: "Jahre Erfahrung" },
  { icon: Star, value: "4.9★", label: "Bewertungen" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero noise">
      {/* Slider images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current]}
            alt=""
            fill
            className="object-cover opacity-20"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-float" />
      <div
        className="pointer-events-none absolute top-40 -right-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[140px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass hover:bg-white/15 flex items-center justify-center text-foreground transition-colors"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass hover:bg-white/15 flex items-center justify-center text-foreground transition-colors"
        aria-label="Nächstes Bild"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-primary-gradient"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24 md:pt-44 md:pb-32 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left — Text */}
        <div>
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-accent mb-8"
          >
            <Sparkles size={12} />
            Facharztpraxis · Neuwied · seit 2009
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground"
          >
            Moderne Urologie.
            <br />
            <span className="text-gradient italic">Persönliche</span> Betreuung.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl"
          >
            Dr. Walters T. Fomuki und sein Team bieten modernste urologische Diagnostik und Therapie —
            von Vorsorge bis Onkologie, von Andrologie bis UroLift®.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-primary-gradient px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 animate-pulse-glow"
            >
              <Calendar size={18} />
              Termin online buchen
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href={`/${locale}/patientenportal`}
              className="inline-flex items-center gap-3 rounded-full glass-strong px-7 py-4 text-base font-semibold transition-all hover:bg-white/10"
            >
              <User size={18} />
              Befunde einsehen
            </Link>
            <button
              onClick={() => {
                const chatEl = document.getElementById("ai-chat");
                if (chatEl) chatEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 glass px-5 py-4 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full transition-all"
            >
              <MessageCircle size={16} />
              KI-Assistent
            </button>
            <a
              href="tel:+49263123351"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium px-4 py-4 transition-colors text-sm"
            >
              <Phone size={15} />
              02631 - 23351
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-6 max-w-sm"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <div className="font-display text-3xl md:text-4xl text-gradient">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
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
          className="hidden lg:block relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-primary-gradient opacity-25 blur-3xl" />
          <div className="relative glass-strong rounded-[2rem] p-3 shadow-elegant">
            <div className="rounded-[1.5rem] overflow-hidden relative">
              <Image
                src="/images/Dr-fomuki/fomuki_walters_002.jpg"
                alt="Dr. Walters T. Fomuki"
                width={600}
                height={520}
                className="h-[480px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-display text-2xl text-foreground">Dr. Walters T. Fomuki</div>
                <div className="text-sm text-accent">Facharzt für Urologie · Onkologisch qualifiziert</div>
              </div>
            </div>

            {/* Floating availability badge */}
            <div className="absolute bottom-3 left-3 z-10 glass-strong rounded-2xl p-4 shadow-elegant animate-float">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Heute verfügbar</div>
                  <div className="text-sm font-semibold text-foreground">Termin buchen</div>
                </div>
              </div>
            </div>

            {/* Rating badge */}
            <div className="absolute top-3 right-3 z-10 glass-strong rounded-2xl px-4 py-3 shadow-elegant">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold text-sm text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground">· 312 Reviews</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
