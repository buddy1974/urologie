import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Urologischen Praxis Neuwied gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-hero noise overflow-hidden pt-36 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-foreground">Datenschutzerklärung</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">1. Datenschutz auf einen Blick</h2>
              <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">2. Verantwortlicher</h2>
              <p><strong className="text-foreground">Walters T. Fomuki</strong><br />Dierdorfer Str. 115–117, 56564 Neuwied<br />Tel: 02631 - 23351</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">3. Erhebung und Speicherung personenbezogener Daten</h2>
              <p>Beim Besuch unserer Website werden automatisch Informationen in Server-Log-Dateien gespeichert. Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">4. KI-Assistent</h2>
              <p>Der KI-Assistent auf dieser Website speichert keine personenbezogenen Daten. Chatnachrichten werden nicht dauerhaft gespeichert oder an Dritte weitergegeben.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">5. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit gemäß DSGVO.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">6. Terminbuchung via Doctolib</h2>
              <p>
                Die Online-Terminbuchung erfolgt über Doctolib. Es gelten die Datenschutzbestimmungen von Doctolib. Weitere Informationen:{" "}
                <a href="https://www.doctolib.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors underline underline-offset-2">
                  www.doctolib.de/datenschutz
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
