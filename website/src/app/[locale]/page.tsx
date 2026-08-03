import type { Metadata } from "next";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import LandingPage from "@/components/landing/LandingPage";
import { isLandingMode } from "@/lib/site-mode";

const stripImages = ["/assets/leistungen_001.jpg", "/assets/header_praxis_01.jpg", "/assets/gruppenbild_2023.jpg"];

export async function generateMetadata(): Promise<Metadata> {
  if (!(await isLandingMode())) return {};

  return {
    title: "Urologie Neuwied | Walters T. Fomuki",
    description:
      "Urologische Facharztpraxis in Neuwied. Facharzt Walters T. Fomuki. Termin online via Doctolib. ☎ 02631 – 23351. Diagnostik, Onkologie, UroLift®, Andrologie.",
    keywords: [
      "Urologe Neuwied",
      "Urologie Neuwied",
      "Fomuki",
      "Urologe Rheinland-Pfalz",
      "Prostata Neuwied",
      "UroLift Neuwied",
      "Vasektomie Neuwied",
      "Andrologie Neuwied",
      "Termin Urologe Neuwied",
    ],
    openGraph: {
      title: "Urologie Neuwied | Walters T. Fomuki",
      description:
        "Ihre urologische Facharztpraxis in Neuwied. Modernste Diagnostik und Therapie — von Vorsorge bis Onkologie.",
      url: "https://urologie-neuwied.de",
      siteName: "Urologie Neuwied",
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: "https://urologie-neuwied.de/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Urologie Neuwied – Walters T. Fomuki",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Urologie Neuwied | Walters T. Fomuki",
      description:
        "Urologische Facharztpraxis in Neuwied. Termin online via Doctolib.",
      images: ["https://urologie-neuwied.de/og-image.jpg"],
    },
    alternates: {
      canonical: "https://urologie-neuwied.de",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function HomePage() {
  if (await isLandingMode()) {
    return <LandingPage />;
  }

  const locale = await getLocale();
  return (
    <div>
      <Hero locale={locale} />

      <div className="flex gap-1 h-[300px]">
        {stripImages.map((src) => (
          <div key={src} className="relative flex-1">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      <Services />
    </div>
  );
}
