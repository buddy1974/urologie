"use client";

import { useState } from "react";
import { ChevronDown, Bot } from "lucide-react";

const content = {
  de: {
    heading: "Häufige Fragen",
    subheading: "Antworten auf die wichtigsten Fragen unserer Patienten",
    faqs: [
      { q: "Wie bekomme ich einen Termin?", a: "Sie können direkt über Doctolib online buchen oder uns telefonisch erreichen unter 02631 - 23351." },
      { q: "Wie lange dauert eine PSA-Untersuchung?", a: "Eine PSA-Blutuntersuchung dauert nur wenige Minuten. Das Ergebnis erhalten Sie über unser Patientenportal, ohne dass Sie anrufen müssen." },
      { q: "Was ist eine Vasektomie?", a: "Eine Vasektomie ist ein kleiner ambulanter Eingriff zur dauerhaften Empfängnisverhütung beim Mann. Der Eingriff dauert ca. 20-30 Minuten." },
      { q: "Was ist UroLift?", a: "UroLift ist ein minimalinvasives Verfahren zur Behandlung der gutartigen Prostatavergrößerung (BPH). Es gibt keine Schnitte, keine Narkose, schnelle Erholung." },
      { q: "Wie erhalte ich meine Befunde?", a: "Ihre Laborergebnisse stehen im Patientenportal bereit. Sie erhalten eine SMS, wenn Ihre Befunde verfügbar sind. Kein Anruf nötig." },
      { q: "Welche Kassen werden akzeptiert?", a: "Wir behandeln gesetzlich und privat versicherte Patienten sowie Selbstzahler." },
      { q: "Was ist Magnetstimulation?", a: "Die Magnetstimulation stärkt die Beckenbodenmuskulatur nicht-invasiv. Patienten sitzen bekleidet im Behandlungsstuhl — schmerzfrei und effektiv." },
      { q: "Gibt es einen Dolmetscher?", a: "Wir sprechen Deutsch, Englisch und Französisch. Für weitere Sprachen können wir auf Anfrage Unterstützung organisieren." },
    ],
    chatHeading: "Weitere Fragen? Unser KI-Assistent antwortet sofort.",
    chatSubtext: "Stellen Sie Ihre Frage direkt — 24 Stunden, 7 Tage die Woche.",
    chatButton: "KI-Assistent starten",
  },
  en: {
    heading: "Frequently Asked Questions",
    subheading: "Answers to the questions our patients ask most",
    faqs: [
      { q: "How do I book an appointment?", a: "You can book online via Doctolib or call us on 02631 - 23351." },
      { q: "How long does a PSA test take?", a: "A PSA blood test takes just a few minutes. Results are available in your patient portal — no need to call." },
      { q: "What is a vasectomy?", a: "A vasectomy is a small outpatient procedure for permanent contraception in men. It takes around 20 to 30 minutes." },
      { q: "What is UroLift?", a: "UroLift is a minimally invasive treatment for benign prostate enlargement (BPH). No cuts, no general anaesthetic, fast recovery." },
      { q: "How do I get my results?", a: "Your lab results are available in the patient portal. You will receive an SMS when they are ready. No need to call." },
      { q: "Which insurance do you accept?", a: "We treat patients with statutory and private health insurance, as well as self-paying patients." },
      { q: "What is magnetic stimulation?", a: "Magnetic stimulation strengthens the pelvic floor muscles non-invasively. Patients sit fully clothed in the treatment chair. Painless and effective." },
      { q: "Is there an interpreter?", a: "We speak German, English and French. For other languages, we can arrange support on request." },
    ],
    chatHeading: "More questions? Our AI assistant answers instantly.",
    chatSubtext: "Ask your question directly, 24 hours a day, 7 days a week.",
    chatButton: "Start AI Assistant",
  },
  fr: {
    heading: "Questions Fréquentes",
    subheading: "Réponses aux questions les plus fréquentes de nos patients",
    faqs: [
      { q: "Comment prendre rendez-vous?", a: "Vous pouvez réserver en ligne via Doctolib ou nous appeler au 02631 - 23351." },
      { q: "Combien de temps dure un test PSA?", a: "Un test sanguin PSA ne prend que quelques minutes. Les résultats sont disponibles dans votre espace patient." },
      { q: "Qu'est-ce qu'une vasectomie?", a: "Une vasectomie est une petite intervention ambulatoire pour la contraception permanente masculine. Elle dure environ 20 à 30 minutes." },
      { q: "Qu'est-ce qu'UroLift?", a: "UroLift est un traitement mini-invasif pour l'hypertrophie bénigne de la prostate. Pas d'incision, pas d'anesthésie générale, récupération rapide." },
      { q: "Comment obtenir mes résultats?", a: "Vos résultats sont disponibles dans votre espace patient. Vous recevrez un SMS quand ils seront prêts." },
      { q: "Quelles assurances acceptez-vous?", a: "Nous traitons les patients avec une assurance maladie légale ou privée, ainsi que les patients payants." },
      { q: "Qu'est-ce que la stimulation magnétique?", a: "La stimulation magnétique renforce les muscles du plancher pelvien de manière non invasive. Les patients s'assoient habillés dans le fauteuil de traitement." },
      { q: "Y a-t-il un interprète?", a: "Nous parlons allemand, anglais et français. Pour d'autres langues, nous pouvons organiser un soutien sur demande." },
    ],
    chatHeading: "D'autres questions? Notre assistant IA répond immédiatement.",
    chatSubtext: "Posez votre question directement, 24 heures sur 24, 7 jours sur 7.",
    chatButton: "Démarrer l'assistant IA",
  },
} as const;

type Locale = keyof typeof content;

export default function FaqSection({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? content.de;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <div className="container py-20">
        <div className="text-center mb-14">
          <h2 className="mb-2">{c.heading}</h2>
          <div className="trenner" />
          <p className="text-body-text leading-[1.6] max-w-xl mx-auto">{c.subheading}</p>
        </div>

        <div className="max-w-[760px] mx-auto">
          {c.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-[#e5e5e5] py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-primary-dark font-bold text-[16px]">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <p className="text-body-text text-[15px] leading-[1.6] pt-3">{faq.a}</p>}
              </div>
            );
          })}
        </div>

        <div className="bg-[#f0f7f9] rounded-2xl p-10 max-w-[700px] mx-auto mt-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-5">
            <Bot size={30} className="text-white" />
          </div>
          <h3 className="text-primary-dark mb-2">{c.chatHeading}</h3>
          <p className="text-body-text leading-[1.6] mb-6">{c.chatSubtext}</p>
          <button
            onClick={() => window.dispatchEvent(new Event("open-chat-widget"))}
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-md hover:bg-primary-dark transition-colors"
          >
            {c.chatButton}
          </button>
        </div>
      </div>
    </section>
  );
}
