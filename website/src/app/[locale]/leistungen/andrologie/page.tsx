import type { Metadata } from "next";
import Image from "next/image";
import { Baby, CheckCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Andrologie & Vasektomie",
  description: "Männergesundheit in Neuwied — Vasektomie, Erektionsstörungen, Testosteronmangel, Kinderwunsch.",
};

const services = [
  "Männliche Sterilisation — Vasektomie (konservativ und non-skalpell)",
  "Erektionsstörungen (impotentia coeundi)",
  "Vorzeitiger Samenerguss",
  "Testosteronmangel",
  "Unerfüllter Kinderwunsch / Fruchtbarkeitsstörungen",
  "Penisverkrümmung — Induratio Penis plastica (IPP)",
  "Varikozele",
  "Hodenhochstand",
];

export default function AndrologiePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <Image
          src="/images/leistung/leistungen_004.jpg"
          alt="Andrologie & Vasektomie Neuwied"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/90 via-[#2D3748]/85 to-[#1A202C]/90" />
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(20,184,166,0.15)" }}>
              <Baby size={32} style={{ color: "#14b8a6" }} />
            </div>
            <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Andrologie &amp; Vasektomie</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Männergesundheit — kompetent und diskret.</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl border-2 border-slate-100 p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6">Unsere andrologischen Leistungen</h2>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s} className="flex items-start gap-3">
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#14b8a6" }} />
                <span className="text-slate-600 text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 p-6" style={{ borderColor: "rgba(20,184,166,0.3)", backgroundColor: "rgba(20,184,166,0.05)" }}>
          <p className="font-bold text-[#2D3748] mb-2">Vasektomie-Experten Netzwerk</p>
          <p className="text-slate-500 text-sm mb-3">Dr. Fomuki ist zertifiziertes Mitglied im Netzwerk der Vasektomie-Experten.</p>
          <a href="http://www.vasektomie-neuwied.de" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#14b8a6" }}>
            www.vasektomie-neuwied.de <ExternalLink size={13} />
          </a>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1E9FD4" }}>Modernste Geräteausstattung</h2>
          <p className="text-slate-500 text-sm mb-6">Zertifizierte Analysetechnik für objektive Fertilitätsdiagnostik.</p>
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: "MES SQA-iO + SQA-VU", desc: "Spermienqualitätsanalyse — vollautomatische Messung von Konzentration, Motilität und Morphologie, mit visueller Mikroskopie-Komponente" },
            ].map((m) => (
              <div key={m.name} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">🔬</div>
                <p className="font-bold text-[#2D3748] text-sm mb-2">{m.name}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
