import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Links",
  description: "Empfohlene Links der Urologischen Praxis Neuwied — Walters T. Fomuki.",
};

type Locale = "de" | "en" | "fr";

const content = {
  de: {
    label: "Links",
    title: "Links",
    intro: "Die Urologische Praxis empfiehlt Ihnen folgende Links:",
    links: [
      {
        href: "https://www.facebook.com/people/Urologie-Neuwied/100063738823371/",
        label: "Urologie Neuwied | Neuwied | Facebook",
      },
      {
        href: "https://www.vasektomie-neuwied.de/",
        label: "Vasektomie in Neuwied: Experte Walters T. Fomuki - NEUWIED | vasektomie-neuwied.de",
      },
      {
        href: "http://www.kontinenz-gesellschaft.de/",
        label: "Deutsche Kontinenz Gesellschaft",
      },
    ],
  },
  en: {
    label: "Links",
    title: "Links",
    intro: "The Urology Practice recommends the following links:",
    links: [
      {
        href: "https://www.facebook.com/people/Urologie-Neuwied/100063738823371/",
        label: "Urologie Neuwied | Neuwied | Facebook",
      },
      {
        href: "https://www.vasektomie-neuwied.de/",
        label: "Vasectomy in Neuwied: Expert Walters T. Fomuki - NEUWIED | vasektomie-neuwied.de",
      },
      {
        href: "http://www.kontinenz-gesellschaft.de/",
        label: "German Continence Society",
      },
    ],
  },
  fr: {
    label: "Liens",
    title: "Liens",
    intro: "Le cabinet d'urologie vous recommande les liens suivants :",
    links: [
      {
        href: "https://www.facebook.com/people/Urologie-Neuwied/100063738823371/",
        label: "Urologie Neuwied | Neuwied | Facebook",
      },
      {
        href: "https://www.vasektomie-neuwied.de/",
        label: "Vasectomie à Neuwied : expert Walters T. Fomuki - NEUWIED | vasektomie-neuwied.de",
      },
      {
        href: "http://www.kontinenz-gesellschaft.de/",
        label: "Société allemande de la continence",
      },
    ],
  },
} satisfies Record<Locale, unknown>;

export default async function LinksPage() {
  const locale = (await getLocale()) as Locale;
  const t = content[locale] ?? content.de;

  return (
    <div>
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div>
          <p className="text-primary text-[16px] font-bold uppercase tracking-wide mb-3">{t.label}</p>
          <h1 className="text-white text-[36px] font-bold">{t.title}</h1>
        </div>
      </section>

      <div className="container py-[60px]">
        <p className="text-body-text text-[16px] leading-[1.6] mb-8">{t.intro}</p>

        <div className="space-y-4 max-w-2xl">
          {t.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 border border-[#e5e5e5] rounded-md p-4 hover:border-primary transition-colors"
            >
              <span className="text-primary font-bold text-[16px]">{link.label}</span>
              <ExternalLink size={16} className="flex-shrink-0 text-primary" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
