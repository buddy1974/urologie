import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import LandingPage from "@/components/landing/LandingPage";

const isLanding = process.env.NEXT_PUBLIC_SITE_MODE === "landing";

export const metadata: Metadata = isLanding
  ? {
      title: "Urologie Neuwied | Dr. Walters T. Fomuki",
      description:
        "Urologische Facharztpraxis in Neuwied. Facharzt Dr. Walters T. Fomuki. Termin online via Doctolib. ☎ 02631 – 23351. Diagnostik, Onkologie, UroLift®, Andrologie.",
      keywords: [
        "Urologe Neuwied",
        "Urologie Neuwied",
        "Dr. Fomuki",
        "Urologe Rheinland-Pfalz",
        "Prostata Neuwied",
        "UroLift Neuwied",
        "Vasektomie Neuwied",
        "Andrologie Neuwied",
        "Termin Urologe Neuwied",
      ],
      openGraph: {
        title: "Urologie Neuwied | Dr. Walters T. Fomuki",
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
            alt: "Urologie Neuwied – Dr. Walters T. Fomuki",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Urologie Neuwied | Dr. Walters T. Fomuki",
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
    }
  : {};

export default async function HomePage() {
  if (isLanding) {
    return <LandingPage />;
  }

  const locale = await getLocale();
  return (
    <div>
      <Hero locale={locale} />
      <Services />
    </div>
  );
}
