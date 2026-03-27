import type { Metadata } from "next";
import Image from "next/image";
import { Activity, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Magnetstimulation",
  description: "Magnetstimulation der Beckenbodenmuskulatur bei Inkontinenz in Neuwied.",
};

export default function MagnetstimulationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <Image
          src="/images/leistung/magnetstimulanz_01.jpg"
          alt="Magnetstimulation Beckenboden Neuwied"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/90 via-[#2D3748]/85 to-[#1A202C]/90" />
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(139,92,246,0.15)" }}>
              <Activity size={32} style={{ color: "#8b5cf6" }} />
            </div>
            <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Magnetstimulation</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Stärkung der Beckenbodenmuskulatur — nicht-invasiv und effektiv.</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-4">Was ist Magnetstimulation?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Die extrakorporale Magnetstimulation (EMS) stärkt die Beckenbodenmuskulatur durch magnetisch induzierte Muskelkontraktionen — ohne Ausziehen, ohne Schmerzen.</p>
          <h3 className="font-bold text-[#2D3748] mb-3 mt-6">Einsatzgebiete</h3>
          <div className="space-y-2">
            {["Blasenschwäche / Harninkontinenz", "Nach Prostatektomie", "Nach Entbindung", "Beckenbodenschwäche bei Mann und Frau"].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={16} style={{ color: "#8b5cf6" }} />
                <span className="text-slate-600 text-sm">{i}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 p-6" style={{ borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.05)" }}>
          <h3 className="font-bold text-[#2D3748] mb-4">Vorteile der Behandlung</h3>
          <div className="space-y-2">
            {["Vollständig bekleidet während Behandlung", "Schmerzfrei und nicht-invasiv", "Keine Nebenwirkungen", "Ambulant in der Praxis", "Messbare Verbesserung der Kontinenz"].map((v) => (
              <div key={v} className="flex items-center gap-3">
                <CheckCircle size={16} style={{ color: "#8b5cf6" }} />
                <span className="text-slate-600 text-sm">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
