"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Locale = "de" | "en" | "fr";

// weekday index: 0 = Sunday ... 6 = Saturday
const SCHEDULE: Record<number, { start: number; end: number }[]> = {
  0: [],
  1: [
    { start: 8 * 60, end: 12 * 60 },
    { start: 14 * 60, end: 17 * 60 },
  ],
  2: [
    { start: 8 * 60, end: 12 * 60 },
    { start: 14 * 60, end: 17 * 60 },
  ],
  3: [{ start: 8 * 60, end: 12 * 60 }],
  4: [
    { start: 8 * 60, end: 12 * 60 },
    { start: 14 * 60, end: 17 * 60 },
  ],
  5: [{ start: 8 * 60, end: 12 * 60 }],
  6: [],
};

const labels: Record<Locale, { open: string; closed: string; closedHours: string }> = {
  de: { open: "Jetzt geöffnet", closed: "Aktuell geschlossen", closedHours: "Geschlossen" },
  en: { open: "Open now", closed: "Currently closed", closedHours: "Closed" },
  fr: { open: "Ouvert maintenant", closed: "Actuellement fermé", closedHours: "Fermé" },
};

function formatRange(r: { start: number; end: number }) {
  const fmt = (mins: number) => {
    const h = Math.floor(mins / 60)
      .toString()
      .padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };
  return `${fmt(r.start)}–${fmt(r.end)}`;
}

function getBerlinNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const weekday = weekdayMap[parts.find((p) => p.type === "weekday")?.value ?? "Sun"] ?? 0;
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);

  return { weekday, minutesOfDay: hour * 60 + minute };
}

function getStatus() {
  const { weekday, minutesOfDay } = getBerlinNow();
  const ranges = SCHEDULE[weekday] ?? [];
  const isOpen = ranges.some((r) => minutesOfDay >= r.start && minutesOfDay < r.end);
  return { isOpen, ranges };
}

export default function OpeningHours({
  locale,
  variant = "compact",
  dark = false,
  className,
}: {
  locale: string;
  variant?: "compact" | "prominent";
  dark?: boolean;
  className?: string;
}) {
  const l = (["de", "en", "fr"].includes(locale) ? locale : "de") as Locale;
  const t = labels[l];
  const [status, setStatus] = useState<{ isOpen: boolean; ranges: { start: number; end: number }[] } | null>(null);

  useEffect(() => {
    setStatus(getStatus());
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  const hoursText = status.ranges.length > 0 ? status.ranges.map(formatRange).join(", ") : t.closedHours;

  const dotClass = cn(
    "inline-block rounded-full flex-shrink-0",
    variant === "prominent" ? "w-2.5 h-2.5" : "w-2 h-2",
    status.isOpen ? "bg-green-500 animate-pulse" : dark ? "bg-white/40" : "bg-gray-400"
  );

  const statusTextClass = cn(
    "font-bold",
    status.isOpen ? "text-green-500" : dark ? "text-white/80" : "text-gray-500"
  );

  const hoursTextClass = dark ? "text-white/60" : "text-body-text/60";

  if (variant === "prominent") {
    return (
      <div className={cn("inline-flex items-center gap-2 bg-muted rounded-md px-4 py-2.5", className)}>
        <span className={dotClass} />
        <span className={cn(statusTextClass, "text-[15px]")}>{status.isOpen ? t.open : t.closed}</span>
        <span className={cn(hoursTextClass, "text-[14px]")}>· {hoursText}</span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 text-[12px]", className)}>
      <span className={dotClass} />
      <span className={statusTextClass}>{status.isOpen ? t.open : t.closed}</span>
      <span className={hoursTextClass}>· {hoursText}</span>
    </div>
  );
}
