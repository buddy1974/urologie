import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Urologischen Praxis Neuwied gemäß DSGVO.",
};

type Processor = {
  name: string;
  address: string;
  purpose: string;
  note?: string;
  transfer: string;
  privacyUrl: string;
  privacyLabel: string;
  avv: string;
};

const processors: Processor[] = [
  {
    name: "Vercel Inc.",
    address: "340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    purpose: "Hosting der Website und des Patientenportals",
    transfer: "USA – Grundlage: Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
    privacyLabel: "vercel.com/legal/privacy-policy",
    avv: "wird abgeschlossen gemäß Art. 28 DSGVO",
  },
  {
    name: "Neon Inc.",
    address: "USA",
    purpose: "Datenbankhosting (PostgreSQL)",
    transfer: "USA – Grundlage: Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO",
    privacyUrl: "https://neon.tech/privacy",
    privacyLabel: "neon.tech/privacy",
    avv: "wird abgeschlossen gemäß Art. 28 DSGVO",
  },
  {
    name: "Render Services Inc.",
    address: "525 Brannan Street, Suite 300, San Francisco, CA 94107, USA",
    purpose: "Backend-API (Verarbeitung von Patientenportal-Anfragen)",
    transfer: "USA – Grundlage: Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO",
    privacyUrl: "https://render.com/privacy",
    privacyLabel: "render.com/privacy",
    avv: "wird abgeschlossen gemäß Art. 28 DSGVO",
  },
  {
    name: "Anthropic PBC",
    address: "548 Market Street, PMB 90375, San Francisco, CA 94104, USA",
    purpose: "KI-gestützte Patientenanfragen (Chat-Assistent auf der Website)",
    note: "Der KI-Assistent verarbeitet ausschließlich allgemeine Fragen. Es werden keine personenbezogenen Patientendaten an Anthropic übermittelt.",
    transfer: "USA – Grundlage: Standardvertragsklauseln (SCC) gemäß Art. 46 DSGVO",
    privacyUrl: "https://anthropic.com/privacy",
    privacyLabel: "anthropic.com/privacy",
    avv: "wird abgeschlossen gemäß Art. 28 DSGVO",
  },
  {
    name: "seven communications GmbH & Co. KG",
    address: "Gerwigstraße 53, 76131 Karlsruhe, Deutschland",
    purpose: "SMS-Versand von Einmalcodes (OTP) für das Patientenportal",
    transfer: "Deutschland – DSGVO-konform",
    privacyUrl: "https://www.seven.io/de/datenschutz/",
    privacyLabel: "seven.io/de/datenschutz",
    avv: "wird abgeschlossen gemäß Art. 28 DSGVO",
  },
  {
    name: "Doctolib GmbH",
    address: "Karl-Liebknecht-Straße 5, 10178 Berlin, Deutschland",
    purpose: "Online-Terminbuchung",
    note: "Doctolib betreibt ein eigenes datenschutzkonformes System. Für die Datenverarbeitung durch Doctolib gilt deren eigene Datenschutzerklärung.",
    transfer: "Deutschland",
    privacyUrl: "https://www.doctolib.de/datenschutz",
    privacyLabel: "doctolib.de/datenschutz",
    avv: "",
  },
];

const content = {
  de: {
    title: "Datenschutzerklärung",
    langNote: null as string | null,
  },
  en: {
    title: "Datenschutzerklärung",
    langNote:
      "This privacy policy is provided in German as required by German law. An English summary is provided below for informational purposes.",
  },
  fr: {
    title: "Datenschutzerklärung",
    langNote:
      "Cette politique de confidentialité est fournie en allemand conformément au droit allemand. Un résumé en français est proposé ci-dessous à titre informatif.",
  },
} as const;

type Locale = keyof typeof content;

const enSummary = [
  "This website and patient portal are operated by Walters T. Fomuki, specialist in urology, based in Neuwied, Germany. We process contact details you submit through our contact form, technical data such as IP address and browser information, and, for registered patients, portal data including date of birth, insurance number, mobile number, lab results and appointments.",
  "Your data is processed to answer enquiries, to provide the patient portal under German medical record-keeping law, and to run the website technically.",
  "We rely on several service providers to host and operate this site: Vercel for website and portal hosting, Neon for database hosting, Render for backend processing, Anthropic for the AI chat assistant (which only receives the text you type into the chat, never your name, phone number, or portal data), and seven communications for sending one-time SMS codes for portal login. Vercel, Neon, Render and Anthropic are based in the United States; data transfers to them rely on the EU Standard Contractual Clauses. Data processing agreements with all of these providers are currently being finalised. Doctolib, used for online appointment booking, operates under its own German privacy policy.",
  "We use only cookies that are technically necessary for the site to function, such as session handling and your language preference. We do not use Google Analytics, Facebook Pixel, or any advertising or tracking services.",
  "Under the GDPR, you have the right to access, correct, delete, restrict or transfer your data, and to object to its processing. To exercise these rights, contact us at info@urologie-neuwied.de. You may also lodge a complaint with the data protection authority for Rhineland-Palatinate (LfDI RLP).",
  "This is a summary for your convenience. The German version above is the legally binding text.",
];

const frSummary = [
  "Ce site et le portail patient sont exploités par Walters T. Fomuki, spécialiste en urologie, basé à Neuwied, en Allemagne. Nous traitons les coordonnées que vous saisissez dans notre formulaire de contact, des données techniques telles que l'adresse IP et les informations sur le navigateur, ainsi que, pour les patients inscrits, les données du portail : date de naissance, numéro d'assurance, numéro de mobile, résultats de laboratoire et rendez-vous.",
  "Vos données sont traitées pour répondre à vos demandes, pour fournir le portail patient conformément au droit allemand relatif à la tenue des dossiers médicaux, et pour assurer le fonctionnement technique du site.",
  "Nous faisons appel à plusieurs prestataires pour héberger et exploiter ce site : Vercel pour l'hébergement du site et du portail, Neon pour l'hébergement de la base de données, Render pour le traitement côté serveur, Anthropic pour l'assistant de conversation par IA (qui ne reçoit que le texte que vous saisissez dans le chat, jamais votre nom, numéro de téléphone ou données du portail), et seven communications pour l'envoi des codes à usage unique par SMS lors de la connexion au portail. Vercel, Neon, Render et Anthropic sont basés aux États-Unis ; les transferts de données vers ces prestataires reposent sur les clauses contractuelles types de l'UE. Les accords de sous-traitance avec l'ensemble de ces prestataires sont actuellement en cours de finalisation. Doctolib, utilisé pour la prise de rendez-vous en ligne, applique sa propre politique de confidentialité allemande.",
  "Nous n'utilisons que des cookies techniquement nécessaires au fonctionnement du site, tels que la gestion de session et votre préférence de langue. Nous n'utilisons ni Google Analytics, ni Facebook Pixel, ni aucun service publicitaire ou de suivi.",
  "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données, ainsi que d'un droit d'opposition à leur traitement. Pour exercer ces droits, contactez-nous à info@urologie-neuwied.de. Vous pouvez également déposer une réclamation auprès de l'autorité de protection des données de Rhénanie-Palatinat (LfDI RLP).",
  "Ceci est un résumé fourni à titre informatif. La version allemande ci-dessus fait foi sur le plan juridique.",
];

export default async function DatenschutzPage() {
  const locale = (await getLocale()) as Locale;
  const c = content[locale] ?? content.de;
  const summary = locale === "en" ? enSummary : locale === "fr" ? frSummary : null;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <h1 className="text-white text-[36px] font-bold">{c.title}</h1>
      </section>

      <div className="container py-[60px] max-w-3xl">
        {c.langNote && summary && (
          <div className="mb-12">
            <p className="text-body-text leading-[1.6] italic mb-6 border-l-[3px] border-primary pl-4">
              {c.langNote}
            </p>
            <div className="space-y-4">
              {summary.map((p) => (
                <p key={p} className="text-body-text leading-[1.6]">
                  {p}
                </p>
              ))}
            </div>
            <div className="trenner" />
          </div>
        )}

        <div className="space-y-10">
          <div>
            <h2 className="mb-3">1. Verantwortlicher</h2>
            <p className="text-body-text leading-[1.6]">
              Walters T. Fomuki
              <br />
              Facharzt für Urologie
              <br />
              Dierdorfer Str. 115–117
              <br />
              56564 Neuwied
              <br />
              Telefon: 02631 - 23351
              <br />
              E-Mail: info@urologie-neuwied.de
            </p>
          </div>

          <div>
            <h2 className="mb-3">2. Arten der verarbeiteten Daten</h2>
            <ul className="list-disc list-inside text-body-text leading-[1.6] space-y-1">
              <li>Kontaktdaten (Name, E-Mail, Telefonnummer)</li>
              <li>Inhaltsdaten (Texteingaben im Kontaktformular)</li>
              <li>Technische Daten (IP-Adresse, Browser, Zugriffszeiten)</li>
              <li>Patientendaten im Patientenportal (Geburtsdatum, Versicherungsnummer, Mobilnummer, Laborbefunde, Termine)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3">3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc list-inside text-body-text leading-[1.6] space-y-1">
              <li>Beantwortung von Anfragen über das Kontaktformular (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>Bereitstellung des Patientenportals (§ 630g BGB, Art. 9 Abs. 2 lit. h DSGVO)</li>
              <li>Technischer Betrieb der Website</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4">4. Hosting und technische Dienstleister</h2>
            <p className="text-body-text leading-[1.6] mb-5">
              Diese Website und das Patientenportal nutzen folgende Dienstleister:
            </p>
            <div className="space-y-4">
              {processors.map((p) => (
                <div key={p.name} className="border border-[#e5e5e5] rounded-md p-5">
                  <p className="text-primary-dark font-bold mb-1">{p.name}</p>
                  <p className="text-body-text/70 text-[14px] mb-2">{p.address}</p>
                  <p className="text-body-text text-[15px] leading-[1.6]">
                    <strong>Zweck:</strong> {p.purpose}
                  </p>
                  {p.note && (
                    <p className="text-body-text text-[15px] leading-[1.6] mt-1">
                      <strong>Hinweis:</strong> {p.note}
                    </p>
                  )}
                  <p className="text-body-text text-[15px] leading-[1.6] mt-1">
                    <strong>Datentransfer:</strong> {p.transfer}
                  </p>
                  <p className="text-[15px] leading-[1.6] mt-1">
                    <strong className="text-body-text">Datenschutz:</strong>{" "}
                    <a
                      href={p.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      {p.privacyLabel}
                    </a>
                  </p>
                  {p.avv && (
                    <p className="text-body-text text-[15px] leading-[1.6] mt-1">
                      <strong>Auftragsverarbeitungsvertrag (AVV):</strong> {p.avv}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3">5. Patientenportal</h2>
            <p className="text-body-text leading-[1.6] mb-4">
              Das Patientenportal ermöglicht Patienten den Zugriff auf eigene Laborergebnisse und Termine.
            </p>
            <p className="text-body-text leading-[1.6] mb-2">Zur Authentifizierung werden verarbeitet:</p>
            <ul className="list-disc list-inside text-body-text leading-[1.6] space-y-1 mb-4">
              <li>Geburtsdatum</li>
              <li>Krankenversicherungsnummer</li>
              <li>Mobiltelefonnummer (für OTP-Versand)</li>
            </ul>
            <p className="text-body-text leading-[1.6] mb-2">
              Rechtsgrundlage: Art. 9 Abs. 2 lit. h DSGVO in Verbindung mit § 630g BGB
              <br />
              Aufbewahrung: gemäß § 630f Abs. 3 BGB mindestens 10 Jahre nach Abschluss der Behandlung
            </p>
            <p className="text-body-text leading-[1.6]">
              Hinweis: Die Daten werden über einen verschlüsselten Server (TLS 1.3) verarbeitet. Befunde
              erscheinen erst nach aktiver Freigabe durch Walters T. Fomuki im Portal.
            </p>
          </div>

          <div>
            <h2 className="mb-3">6. Kontaktformular</h2>
            <p className="text-body-text leading-[1.6] mb-2">
              Bei Nutzung des Kontaktformulars werden Name, E-Mail-Adresse, Telefonnummer und Ihre
              Nachricht verarbeitet.
            </p>
            <p className="text-body-text leading-[1.6] mb-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanfrage) oder Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse).
            </p>
            <p className="text-body-text leading-[1.6]">
              Löschung: Anfragen werden nach vollständiger Bearbeitung gelöscht, spätestens nach 6 Monaten.
            </p>
          </div>

          <div>
            <h2 className="mb-3">7. Cookies und Tracking</h2>
            <p className="text-body-text leading-[1.6] mb-2">
              Diese Website verwendet ausschließlich technisch notwendige Cookies (Session-Verwaltung,
              Spracheinstellung).
            </p>
            <p className="text-body-text leading-[1.6] mb-2">
              Es werden keine Analyse-, Marketing- oder Tracking-Cookies eingesetzt.
            </p>
            <p className="text-body-text leading-[1.6] mb-2">
              Es werden keine Daten an Werbedienste übermittelt.
            </p>
            <p className="text-body-text leading-[1.6]">
              Google Analytics, Facebook Pixel oder vergleichbare Dienste sind nicht im Einsatz.
            </p>
          </div>

          <div>
            <h2 className="mb-3">8. Ihre Rechte</h2>
            <p className="text-body-text leading-[1.6] mb-2">Sie haben folgende Rechte:</p>
            <ul className="list-disc list-inside text-body-text leading-[1.6] space-y-1 mb-4">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO), soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="text-body-text leading-[1.6]">
              Zur Ausübung Ihrer Rechte wenden Sie sich an: info@urologie-neuwied.de
            </p>
          </div>

          <div>
            <h2 className="mb-3">9. Beschwerderecht</h2>
            <p className="text-body-text leading-[1.6] mb-2">
              Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
            </p>
            <p className="text-body-text leading-[1.6]">
              Landesbeauftragter für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz (LfDI RLP)
              <br />
              Hintere Bleiche 34, 55116 Mainz
              <br />
              <a
                href="https://www.datenschutz.rlp.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                datenschutz.rlp.de
              </a>
            </p>
          </div>

          <div className="trenner" />

          <div>
            <h2 className="mb-3">10. Aktualität</h2>
            <p className="text-body-text leading-[1.6] mb-2">
              Diese Datenschutzerklärung wurde zuletzt aktualisiert am: August 2026
            </p>
            <p className="text-body-text leading-[1.6]">
              Auftragsverarbeitungsverträge mit den genannten Dienstleistern befinden sich derzeit im
              Abschlussverfahren.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
