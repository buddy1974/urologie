import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

const metaTitles = {
  de: "Patientenportal",
  en: "Patient Portal",
  fr: "Espace Patient",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: metaTitles[locale as keyof typeof metaTitles] ?? metaTitles.de,
    description: "Sicherer Zugang zu Ihren Laborergebnissen und Terminen — Urologie Neuwied.",
  };
}

export default function PatientenportalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
