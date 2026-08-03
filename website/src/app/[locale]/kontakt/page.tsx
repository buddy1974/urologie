"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Phone,
  Printer,
  MapPin,
  Clock,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Accessibility,
} from "lucide-react";

const DOCTOLIB_URL = "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking";

type Locale = "de" | "en" | "fr";

type Day = { day: string; hours: string };

type Content = {
  heroLabel: string;
  heroTitle: string;
  heroText: string;
  kontaktdaten: string;
  adresse: string;
  telefonLabel: string;
  faxLabel: string;
  barrierefreiheit: string;
  barrierefreiheitText: string;
  onlineBuchen: string;
  jetztBuchen: string;
  sprechstunden: string;
  ausserhalb: string;
  anfahrtTitle: string;
  anfahrtBahn: string;
  anfahrtAuto: string;
  formTitle: string;
  formSubtitle: string;
  labelAnrede: string;
  labelVorname: string;
  labelNachname: string;
  labelTelefon: string;
  labelEmail: string;
  labelNachricht: string;
  placeholderVorname: string;
  placeholderNachname: string;
  placeholderTelefon: string;
  placeholderEmail: string;
  placeholderNachricht: string;
  requiredNote: string;
  privacyNote: string;
  consentPrefix: string;
  consentLinkLabel: string;
  consentSuffix: string;
  sending: string;
  send: string;
  successTitle: string;
  successText: string;
  sendAnother: string;
  errorGeneric: string;
  errorNetwork: string;
  days: Day[];
  optionKeine: string;
  optionHerr: string;
  optionFrau: string;
  optionDr: string;
  optionProf: string;
};

const content: Record<Locale, Content> = {
  de: {
    heroLabel: "Kontakt & Anfahrt",
    heroTitle: "Kontakt zur Urologischen Praxis Neuwied",
    heroText:
      "Sie haben Fragen oder wünschen weitere Informationen? Dann rufen Sie uns an oder schreiben Sie uns über unser Kontaktformular. Wir freuen uns auf Sie!",
    kontaktdaten: "Kontaktdaten",
    adresse: "Adresse",
    telefonLabel: "Telefon",
    faxLabel: "Fax",
    barrierefreiheit: "Barrierefreiheit",
    barrierefreiheitText: "Rollstuhlgerecht · Aufzug vorhanden",
    onlineBuchen: "Termin bequem online buchen:",
    jetztBuchen: "Jetzt Termin buchen",
    sprechstunden: "Sprechstunden",
    ausserhalb: "Außerhalb der Sprechzeiten: Bitte rufen Sie uns an oder buchen Sie online.",
    anfahrtTitle: "So finden Sie den Weg zu uns nach Neuwied",
    anfahrtBahn:
      "Die Urologie Neuwied liegt etwa 2 km vom Neuwieder Bahnhof entfernt. Dort bestehen Anbindungen der Regionalbahnen, und das Bahnhofsgelände ist zugleich Haltepunkt diverser lokaler und regionaler Buslinien. Vom Bahnhof aus erreichen Sie uns beispielsweise mit dem Taxi in wenigen Minuten.",
    anfahrtAuto:
      "Natürlich können Sie auch mit dem eigenen Fahrzeug anreisen. Sie erreichen uns in der Dierdorfer Straße 115–117 über die Andernacher Straße. Kostenfreie Parkplätze befinden sich hinter dem Haus, an der Straße vor der Praxis sowie in den Nebenstraßen in unmittelbarer Nähe.",
    formTitle: "Kontaktformular",
    formSubtitle: "Schreiben Sie uns — wir antworten schnellstmöglich.",
    labelAnrede: "Anrede",
    labelVorname: "Vorname",
    labelNachname: "Nachname",
    labelTelefon: "Telefonnummer",
    labelEmail: "E-Mail-Adresse",
    labelNachricht: "Ihre Nachricht",
    placeholderVorname: "Max",
    placeholderNachname: "Mustermann",
    placeholderTelefon: "02631 12345",
    placeholderEmail: "max@beispiel.de",
    placeholderNachricht: "Ihr Anliegen...",
    requiredNote: "Mit * gekennzeichnete Felder sind Pflichtangaben",
    privacyNote:
      "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.",
    consentPrefix: "Ich habe die ",
    consentLinkLabel: "Datenschutzerklärung",
    consentSuffix: " gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.",
    sending: "Wird gesendet…",
    send: "Nachricht abschicken",
    successTitle: "Nachricht gesendet!",
    successText: "Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen.",
    sendAnother: "Weitere Nachricht senden",
    errorGeneric: "Ein Fehler ist aufgetreten.",
    errorNetwork: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
    days: [
      { day: "Montag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
      { day: "Dienstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
      { day: "Mittwoch", hours: "08:00–12:00 Uhr" },
      { day: "Donnerstag", hours: "08:00–12:00 Uhr, 14:00–17:00 Uhr" },
      { day: "Freitag", hours: "08:00–12:00 Uhr" },
    ],
    optionKeine: "–",
    optionHerr: "Herr",
    optionFrau: "Frau",
    optionDr: "Dr.",
    optionProf: "Prof.",
  },
  en: {
    heroLabel: "Contact & Directions",
    heroTitle: "Contact the Urology Practice Neuwied",
    heroText:
      "Do you have questions or would you like more information? Then call us or write to us via our Contact Form. We look forward to seeing you!",
    kontaktdaten: "Contact Details",
    adresse: "Address",
    telefonLabel: "Phone",
    faxLabel: "Fax",
    barrierefreiheit: "Accessibility",
    barrierefreiheitText: "Wheelchair-accessible · Elevator available",
    onlineBuchen: "Book your appointment conveniently online:",
    jetztBuchen: "Book Appointment Now",
    sprechstunden: "Office Hours",
    ausserhalb: "Outside office hours: please call us or book online.",
    anfahrtTitle: "How to find your way to us in Neuwied",
    anfahrtBahn:
      "Urologie Neuwied is located around 2 km from Neuwied train station, which has regional rail connections and is also served by various local and regional bus lines. From the station, you can reach us by taxi in just a few minutes.",
    anfahrtAuto:
      "Of course, you're also welcome to arrive by car. You can reach us at Dierdorfer Straße 115–117 via Andernacher Straße. Free parking is available behind the building, on the street in front of the practice, and on the side streets nearby.",
    formTitle: "Contact Form",
    formSubtitle: "Write to us — we'll reply as soon as possible.",
    labelAnrede: "Salutation",
    labelVorname: "First Name",
    labelNachname: "Last Name",
    labelTelefon: "Phone Number",
    labelEmail: "Email Address",
    labelNachricht: "Your Message",
    placeholderVorname: "John",
    placeholderNachname: "Doe",
    placeholderTelefon: "02631 12345",
    placeholderEmail: "john@example.com",
    placeholderNachricht: "Your message...",
    requiredNote: "Fields marked with * are required",
    privacyNote:
      "Your data will only be used to process your request and will not be shared with third parties.",
    consentPrefix: "I have read the ",
    consentLinkLabel: "privacy policy",
    consentSuffix: " and consent to my data being processed to handle my enquiry.",
    sending: "Sending…",
    send: "Send Message",
    successTitle: "Message sent!",
    successText: "Thank you for your inquiry. We will get back to you shortly.",
    sendAnother: "Send another message",
    errorGeneric: "An error occurred.",
    errorNetwork: "Network error. Please try again.",
    days: [
      { day: "Monday", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Tuesday", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Wednesday", hours: "08:00–12:00" },
      { day: "Thursday", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Friday", hours: "08:00–12:00" },
    ],
    optionKeine: "–",
    optionHerr: "Mr.",
    optionFrau: "Mrs.",
    optionDr: "Dr.",
    optionProf: "Prof.",
  },
  fr: {
    heroLabel: "Contact & Accès",
    heroTitle: "Contact avec le Cabinet d'urologie de Neuwied",
    heroText:
      "Vous avez des questions ou souhaitez plus d'informations ? Appelez-nous ou écrivez-nous via notre formulaire de contact. Nous nous réjouissons de vous accueillir !",
    kontaktdaten: "Coordonnées",
    adresse: "Adresse",
    telefonLabel: "Téléphone",
    faxLabel: "Fax",
    barrierefreiheit: "Accessibilité",
    barrierefreiheitText: "Accès fauteuil roulant · Ascenseur disponible",
    onlineBuchen: "Prenez rendez-vous facilement en ligne :",
    jetztBuchen: "Prendre rendez-vous",
    sprechstunden: "Heures de consultation",
    ausserhalb: "En dehors des heures de consultation : appelez-nous ou réservez en ligne.",
    anfahrtTitle: "Comment nous trouver à Neuwied",
    anfahrtBahn:
      "Urologie Neuwied se trouve à environ 2 km de la gare de Neuwied, desservie par les trains régionaux et par plusieurs lignes de bus locales et régionales. Depuis la gare, vous pouvez nous rejoindre en taxi en quelques minutes seulement.",
    anfahrtAuto:
      "Vous pouvez bien sûr venir également en voiture. Vous nous trouverez au Dierdorfer Straße 115–117, accessible via l'Andernacher Straße. Des places de stationnement gratuites sont disponibles derrière le bâtiment, dans la rue devant le cabinet, ainsi que dans les rues avoisinantes.",
    formTitle: "Formulaire de contact",
    formSubtitle: "Écrivez-nous — nous répondrons le plus rapidement possible.",
    labelAnrede: "Civilité",
    labelVorname: "Prénom",
    labelNachname: "Nom",
    labelTelefon: "Numéro de téléphone",
    labelEmail: "Adresse e-mail",
    labelNachricht: "Votre message",
    placeholderVorname: "Jean",
    placeholderNachname: "Dupont",
    placeholderTelefon: "02631 12345",
    placeholderEmail: "jean@exemple.fr",
    placeholderNachricht: "Votre message...",
    requiredNote: "Les champs marqués d'un * sont obligatoires",
    privacyNote:
      "Vos données seront utilisées uniquement pour traiter votre demande et ne seront pas transmises à des tiers.",
    consentPrefix: "J'ai lu la ",
    consentLinkLabel: "politique de confidentialité",
    consentSuffix: " et consens au traitement de mes données pour le traitement de ma demande.",
    sending: "Envoi en cours…",
    send: "Envoyer le message",
    successTitle: "Message envoyé !",
    successText: "Merci pour votre demande. Nous vous répondrons sous peu.",
    sendAnother: "Envoyer un autre message",
    errorGeneric: "Une erreur est survenue.",
    errorNetwork: "Erreur réseau. Veuillez réessayer.",
    days: [
      { day: "Lundi", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Mardi", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Mercredi", hours: "08:00–12:00" },
      { day: "Jeudi", hours: "08:00–12:00, 14:00–17:00" },
      { day: "Vendredi", hours: "08:00–12:00" },
    ],
    optionKeine: "–",
    optionHerr: "M.",
    optionFrau: "Mme",
    optionDr: "Dr.",
    optionProf: "Prof.",
  },
};

type FormState = {
  anrede: string;
  vorname: string;
  nachname: string;
  telefon: string;
  email: string;
  nachricht: string;
};

const INITIAL: FormState = {
  anrede: "keine",
  vorname: "",
  nachname: "",
  telefon: "",
  email: "",
  nachricht: "",
};

export default function KontaktPage() {
  const locale = useLocale() as Locale;
  const c = content[locale] ?? content.de;

  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [consent, setConsent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? c.errorGeneric);
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(INITIAL);
      setConsent(false);
    } catch {
      setErrorMsg(c.errorNetwork);
      setStatus("error");
    }
  }

  const charCount = form.nachricht.length;
  const inputClass =
    "w-full rounded-md px-4 py-3 text-sm text-body-text bg-white border border-[#e5e5e5] focus:border-primary focus:outline-none transition-colors placeholder:text-body-text/40";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-dark flex items-center justify-center text-center px-4 py-16 md:h-[280px]">
        <div className="max-w-2xl">
          <div className="text-primary text-[14px] font-bold uppercase tracking-[2px] mb-3">
            {c.heroLabel}
          </div>
          <h1 className="text-white text-[36px] font-bold leading-tight mb-3">{c.heroTitle}</h1>
          <p className="text-white/85 text-[16px]">{c.heroText}</p>
        </div>
      </section>

      {/* Content */}
      <div className="container py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Contact Info + Hours */}
          <div className="space-y-6">
            <div className="border border-[#e5e5e5] rounded-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-body-text mb-8">{c.kontaktdaten}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary flex-shrink-0">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-1">
                        {c.adresse}
                      </p>
                      <p className="text-body-text font-medium">Dierdorfer Str. 115–117</p>
                      <p className="text-body-text font-medium">56564 Neuwied</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary flex-shrink-0">
                      <Phone size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-1">
                        {c.telefonLabel}
                      </p>
                      <a href="tel:+49263123351" className="text-body-text font-medium hover:text-primary transition-colors text-lg">
                        02631 - 23351
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary flex-shrink-0">
                      <Printer size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-1">{c.faxLabel}</p>
                      <p className="text-body-text font-medium">02631 - 941845</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary flex-shrink-0">
                      <Accessibility size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-1">
                        {c.barrierefreiheit}
                      </p>
                      <p className="text-body-text font-medium">{c.barrierefreiheitText}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
                  <p className="text-sm text-body-text/70 mb-4">{c.onlineBuchen}</p>
                  <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="btn-doctolib inline-flex items-center gap-2">
                    {c.jetztBuchen}
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-[#e5e5e5] rounded-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-body-text mb-6 flex items-center gap-3">
                  <Clock size={18} className="text-primary" />
                  {c.sprechstunden}
                </h2>
                <div className="space-y-3">
                  {c.days.map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center py-2.5 border-b border-[#e5e5e5] last:border-0">
                      <span className="font-medium text-body-text w-28">{day}</span>
                      <span className="text-body-text/70 text-sm text-right">{hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-muted rounded-md px-4 py-3 text-sm">
                  <p className="text-primary-dark font-medium">📞 {c.ausserhalb}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Map + Directions */}
          <div className="space-y-6">
            <div className="border border-[#e5e5e5] rounded-md overflow-hidden" style={{ minHeight: "400px" }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.4602%2C50.4236%2C7.4702%2C50.4336&layer=mapnik&marker=50.4286%2C7.4652"
                style={{ width: "100%", height: "400px", border: 0 }}
                loading="lazy"
                title="Urologie Neuwied Standort"
              />
            </div>

            <div className="border border-[#e5e5e5] rounded-md p-8">
              <h3 className="text-body-text mb-5">{c.anfahrtTitle}</h3>
              <div className="space-y-3 text-sm text-body-text/80 leading-relaxed">
                <p>{c.anfahrtBahn}</p>
                <p>{c.anfahrtAuto}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="trenner" />

        {/* Contact Form */}
        <div className="border border-[#e5e5e5] rounded-md overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-body-text mb-2">{c.formTitle}</h2>
            <p className="text-body-text/70 text-sm mb-8">{c.formSubtitle}</p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={56} className="text-primary mb-6" />
                <h3 className="text-body-text mb-3">{c.successTitle}</h3>
                <p className="text-body-text/70 max-w-sm mb-8">{c.successText}</p>
                <button onClick={() => setStatus("idle")} className="btn-primary">
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {status === "error" && (
                  <div className="flex items-start gap-3 rounded-md px-4 py-3 border border-red-300 bg-red-50 text-red-600">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-2">
                      {c.labelAnrede}
                    </label>
                    <select name="anrede" value={form.anrede} onChange={handleChange} className={inputClass}>
                      <option value="keine">{c.optionKeine}</option>
                      <option value="Herr">{c.optionHerr}</option>
                      <option value="Frau">{c.optionFrau}</option>
                      <option value="Dr.">{c.optionDr}</option>
                      <option value="Prof.">{c.optionProf}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-2">
                      {c.labelVorname} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vorname"
                      value={form.vorname}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                      placeholder={c.placeholderVorname}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-2">
                      {c.labelNachname} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nachname"
                      value={form.nachname}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                      placeholder={c.placeholderNachname}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-2">
                      {c.labelTelefon} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefon"
                      value={form.telefon}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      placeholder={c.placeholderTelefon}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-body-text/60 uppercase tracking-wider mb-2">
                      {c.labelEmail} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder={c.placeholderEmail}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-body-text/60 uppercase tracking-wider">
                      {c.labelNachricht} <span className="text-red-500">*</span>
                    </label>
                    <span className={`text-xs ${charCount > 1800 ? "text-red-500" : "text-body-text/60"}`}>
                      {charCount}/2000
                    </span>
                  </div>
                  <textarea
                    name="nachricht"
                    value={form.nachricht}
                    onChange={handleChange}
                    required
                    rows={6}
                    maxLength={2000}
                    placeholder={c.placeholderNachricht}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <label className="flex items-start gap-2.5 text-[14px] text-body-text">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-primary flex-shrink-0"
                  />
                  <span>
                    {c.consentPrefix}
                    <Link href={`/${locale}/datenschutz`} className="text-primary hover:text-primary-dark underline underline-offset-2">
                      {c.consentLinkLabel}
                    </Link>
                    {c.consentSuffix}
                    {" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-body-text/60 max-w-sm">
                    {c.requiredNote} — {c.privacyNote}
                  </p>
                  <button type="submit" disabled={status === "sending" || !consent} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0">
                    {status === "sending" ? (
                      <>
                        <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        {c.sending}
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        {c.send}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
