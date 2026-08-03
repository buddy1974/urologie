import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

const metaTitles = {
  de: "Impressum",
  en: "Legal Notice",
  fr: "Mentions Légales",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: metaTitles[locale as keyof typeof metaTitles] ?? metaTitles.de,
    description: "Impressum der Urologischen Praxis Neuwied.",
  };
}

const content = {
  de: {
    title: "Impressum",
    langNote: null,
  },
  en: {
    title: "Impressum",
    langNote:
      "This Impressum (legal notice) is provided in German as required by German law (§ 5 TMG/DDG).",
  },
  fr: {
    title: "Impressum",
    langNote:
      "Cet Impressum (mentions légales) est fourni en allemand conformément au droit allemand (§ 5 TMG/DDG).",
  },
} as const;

type Locale = keyof typeof content;

export default async function ImpressumPage() {
  const locale = (await getLocale()) as Locale;
  const c = content[locale] ?? content.de;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <h1 className="text-white text-[36px] font-bold">{c.title}</h1>
      </section>

      <div className="container py-[60px] max-w-3xl">
        {c.langNote && (
          <p className="text-body-text leading-[1.6] italic mb-10 border-l-[3px] border-primary pl-4">
            {c.langNote}
          </p>
        )}

        <div className="space-y-10">
          <div>
            <h2 className="mb-3">Angaben gemäß § 5 TMG / § 5 DDG</h2>
            <p className="text-body-text leading-[1.6]">
              Walters T. Fomuki
              <br />
              Facharzt für Urologie
              <br />
              Dierdorfer Str. 115–117
              <br />
              56564 Neuwied
            </p>
          </div>

          <div>
            <h2 className="mb-3">Kontakt</h2>
            <p className="text-body-text leading-[1.6]">
              Telefon: 02631 - 23351
              <br />
              Fax: 02631 - 941845
              <br />
              E-Mail: info@urologie-neuwied.de
            </p>
          </div>

          <div>
            <h2 className="mb-3">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p className="text-body-text leading-[1.6]">
              Berufsbezeichnung: Facharzt für Urologie (verliehen in Deutschland)
              <br />
              Zuständige Kammer: Ärztekammer Rheinland-Pfalz
              <br />
              Zuständige Aufsichtsbehörde: Kassenärztliche Vereinigung Rheinland-Pfalz (KV RLP)
              <br />
              Anwendbare berufsrechtliche Regelungen: Berufsordnung der Ärzte Rheinland-Pfalz
            </p>
          </div>

          <div>
            <h2 className="mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p className="text-body-text leading-[1.6]">
              Walters T. Fomuki
              <br />
              Dierdorfer Str. 115–117
              <br />
              56564 Neuwied
            </p>
          </div>

          <div>
            <h2 className="mb-3">Website Entwicklung</h2>
            <p className="text-body-text leading-[1.6]">
              Diese Website wurde entwickelt von:
              <br />
              maxpromo.digital – Marcel Tabit Akwe
              <br />
              Körnerstr. 8, 45143 Essen
              <br />
              info@maxpromo.digital
            </p>
          </div>

          <div className="trenner" />

          <div>
            <h2 className="mb-3">Haftungsausschluss</h2>
            <p className="text-body-text leading-[1.6]">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
