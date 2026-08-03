const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

const content = {
  de: {
    heading: "Bereit für Ihren Termin?",
    subtext: "Buchen Sie direkt online oder rufen Sie uns an.",
    book: "Termin buchen",
  },
  en: {
    heading: "Ready to book your appointment?",
    subtext: "Book directly online or give us a call.",
    book: "Book Appointment",
  },
  fr: {
    heading: "Prêt pour votre rendez-vous?",
    subtext: "Réservez directement en ligne ou appelez-nous.",
    book: "Prendre rendez-vous",
  },
} as const;

type Locale = keyof typeof content;

export default function FinalCtaStrip({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? content.de;

  return (
    <section className="w-full bg-primary-dark py-16 px-5 text-center">
      <h2 className="text-white mb-3">{c.heading}</h2>
      <p className="text-white/75 mb-8">{c.subtext}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={DOCTOLIB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-doctolib-blue text-white font-bold px-8 py-3.5 rounded-md hover:bg-[#0d6ab8] transition-colors"
        >
          {c.book}
        </a>
        <a
          href="tel:+49263123351"
          className="bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-md hover:bg-white hover:text-primary-dark transition-colors"
        >
          02631 - 23351
        </a>
      </div>
    </section>
  );
}
