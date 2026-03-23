import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Urologischen Praxis Neuwied.",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Impressum</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16 prose prose-slate">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p><strong>Walters T. Fomuki</strong><br />Facharzt für Urologie<br />Dierdorfer Str. 115–117<br />56564 Neuwied</p>
        <h2>Kontakt</h2>
        <p>Telefon: 02631 - 23351<br />Fax: 02631 - 941845</p>
        <h2>Berufsbezeichnung</h2>
        <p>Facharzt für Urologie (verliehen in Deutschland)<br />Zuständige Ärztekammer: Ärztekammer Rheinland-Pfalz</p>
        <h2>Aufsichtsbehörde</h2>
        <p>Kassenärztliche Vereinigung Rheinland-Pfalz (KV RLP)</p>
        <h2>Haftungsausschluss</h2>
        <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.</p>
      </div>
    </div>
  );
}
