"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Locale = "de" | "en" | "fr";

const content: Record<Locale, { intl: string; stats: { value: number; decimals: number; suffix: string; label: string }[] }> = {
  de: {
    intl: "de-DE",
    stats: [
      { value: 15, decimals: 0, suffix: "+", label: "Jahre Erfahrung" },
      { value: 5000, decimals: 0, suffix: "+", label: "Patienten / Jahr" },
      { value: 4.9, decimals: 1, suffix: "★", label: "Bewertung" },
    ],
  },
  en: {
    intl: "en-US",
    stats: [
      { value: 15, decimals: 0, suffix: "+", label: "Years Experience" },
      { value: 5000, decimals: 0, suffix: "+", label: "Patients / Year" },
      { value: 4.9, decimals: 1, suffix: "★", label: "Rating" },
    ],
  },
  fr: {
    intl: "fr-FR",
    stats: [
      { value: 15, decimals: 0, suffix: "+", label: "Ans d'expérience" },
      { value: 5000, decimals: 0, suffix: "+", label: "Patients / An" },
      { value: 4.9, decimals: 1, suffix: "★", label: "Évaluation" },
    ],
  },
};

function useCountUp(target: number, decimals: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}

function Stat({
  value,
  decimals,
  suffix,
  label,
  numberFormat,
  active,
}: {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  numberFormat: string;
  active: boolean;
}) {
  const raw = useCountUp(value, decimals, active);
  const display = decimals > 0 ? raw : Number(raw).toLocaleString(numberFormat);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 sm:py-0">
      <span className="text-white font-bold text-[48px] leading-none">
        {display}
        {suffix}
      </span>
      <span className="text-primary text-[14px] uppercase tracking-[2px] mt-3">{label}</span>
    </div>
  );
}

export default function StatsStrip({ locale }: { locale: string }) {
  const c = content[(locale as Locale) in content ? (locale as Locale) : "de"];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full bg-primary-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15"
      >
        {c.stats.map((stat) => (
          <Stat key={stat.label} {...stat} numberFormat={c.intl} active={inView} />
        ))}
      </motion.div>
    </section>
  );
}
