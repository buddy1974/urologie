import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import type { Locale } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { isLandingMode } from "@/lib/site-mode";
import "../globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Urologie Neuwied | Walters T. Fomuki",
    template: "%s | Urologie Neuwied",
  },
  description:
    "Urologische Facharztpraxis in Neuwied. Facharzt Walters T. Fomuki. Diagnostik, Onkologie, Andrologie, UroLift®, Magnetstimulation. Termin online via Doctolib.",
  keywords: [
    "Urologe Neuwied",
    "Urologie Neuwied",
    "Fomuki",
    "Prostata",
    "Vasektomie",
    "UroLift",
    "Andrologie",
    "Urologe Rheinland-Pfalz",
    "Onkologie Neuwied",
    "Magnetstimulation",
    "Urodynamik",
  ],
  authors: [{ name: "Walters T. Fomuki" }],
  creator: "Urologie Neuwied",
  publisher: "Walters T. Fomuki",
  openGraph: {
    title: "Urologie Neuwied | Walters T. Fomuki",
    description:
      "Moderne Urologie mit persönlicher Betreuung in Neuwied. Diagnostik, Onkologie, Andrologie, UroLift® und mehr.",
    locale: "de_DE",
    alternateLocale: ["en_GB", "fr_FR"],
    type: "website",
    url: "https://urologie-neuwied.de",
    siteName: "Urologie Neuwied",
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
    languages: {
      de: "https://urologie-neuwied.de/de",
      en: "https://urologie-neuwied.de/en",
      fr: "https://urologie-neuwied.de/fr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isLanding = await isLandingMode();

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
      </head>
      <body className={`${raleway.variable} font-sans antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          {!isLanding && <Navbar />}
          <main className="flex-1">
            {children}
          </main>
          {!isLanding && <Footer />}
          {!isLanding && <ChatWidget />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
