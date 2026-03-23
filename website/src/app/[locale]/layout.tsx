import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import type { Locale } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Urologie Neuwied | Dr. Walters T. Fomuki",
    template: "%s | Urologie Neuwied",
  },
  description:
    "Urologische Facharztpraxis in Neuwied. Diagnostik, Onkologie, Andrologie, UroLift®, Magnetstimulation. Termin online via Doctolib.",
  keywords: [
    "Urologe Neuwied",
    "Urologie Neuwied",
    "Fomuki",
    "Prostata",
    "Vasektomie",
    "UroLift",
    "Andrologie",
    "Urologe Rheinland-Pfalz",
  ],
  openGraph: {
    title: "Urologie Neuwied | Dr. Walters T. Fomuki",
    description: "Moderne Urologie mit persönlicher Betreuung in Neuwied.",
    locale: "de_DE",
    type: "website",
    url: "https://urologie-neuwied.de",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
