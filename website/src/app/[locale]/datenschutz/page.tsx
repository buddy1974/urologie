import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Urologischen Praxis Neuwied gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Datenschutzerklärung</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16 prose prose-slate">
        <h2>1. Datenschutz auf einen Blick</h2>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
        <h2>2. Verantwortlicher</h2>
        <p><strong>Walters T. Fomuki</strong><br />Dierdorfer Str. 115–117, 56564 Neuwied<br />Tel: 02631 - 23351</p>
        <h2>3. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>Beim Besuch unserer Website werden automatisch Informationen in Server-Log-Dateien gespeichert. Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt.</p>
        <h2>4. KI-Assistent</h2>
        <p>Der KI-Assistent auf dieser Website speichert keine personenbezogenen Daten. Chatnachrichten werden nicht dauerhaft gespeichert oder an Dritte weitergegeben.</p>
        <h2>5. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit gemäß DSGVO.</p>
        <h2>6. Terminbuchung via Doctolib</h2>
        <p>Die Online-Terminbuchung erfolgt über Doctolib. Es gelten die Datenschutzbestimmungen von Doctolib. Weitere Informationen: <a href="https://www.doctolib.de/datenschutz" target="_blank" rel="noopener noreferrer">www.doctolib.de/datenschutz</a></p>
      </div>
    </div>
  );
}
