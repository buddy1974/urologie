import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Urologischen Praxis Neuwied.",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-hero noise overflow-hidden pt-36 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-foreground">Impressum</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Angaben gemäß § 5 TMG</h2>
              <p><strong className="text-foreground">Walters T. Fomuki</strong><br />Facharzt für Urologie<br />Dierdorfer Str. 115–117<br />56564 Neuwied</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Kontakt</h2>
              <p>Telefon: 02631 - 23351<br />Fax: 02631 - 941845</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Berufsbezeichnung</h2>
              <p>Facharzt für Urologie (verliehen in Deutschland)<br />Zuständige Ärztekammer: Ärztekammer Rheinland-Pfalz</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Aufsichtsbehörde</h2>
              <p>Kassenärztliche Vereinigung Rheinland-Pfalz (KV RLP)</p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Haftungsausschluss</h2>
              <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
