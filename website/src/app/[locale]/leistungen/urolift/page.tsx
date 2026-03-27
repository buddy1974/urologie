import type { Metadata } from "next";
import Image from "next/image";
import { Zap, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "UroLift® bei BPH",
  description: "UroLift® Behandlung bei benigner Prostatahyperplasie in Neuwied — ambulant, schonend, ohne Operation.",
};

export default function UroliftPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <Image
          src="/images/leistung/leistungen_004.jpg"
          alt="UroLift BPH Behandlung Neuwied"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/90 via-[#2D3748]/85 to-[#1A202C]/90" />
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(245,158,11,0.15)" }}>
              <Zap size={32} style={{ color: "#f59e0b" }} />
            </div>
            <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">UroLift® bei BPH</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Schonende Behandlung der Prostatavergrößerung — ambulant und schnell wirksam.</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6">Was ist UroLift®?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">UroLift® ist ein minimalinvasives Verfahren zur Behandlung der benignen Prostatahyperplasie (BPH) — einer gutartigen Vergrößerung der Prostata.</p>
          <p className="text-slate-600 leading-relaxed">Kleine Implantate halten das Prostatagewebe dauerhaft zur Seite und öffnen so die Harnröhre — ohne Schnitt, ohne Wärme, ohne Entfernung von Gewebe.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6">Vorteile</h2>
          <div className="space-y-3">
            {["Ambulanter Eingriff", "Keine Vollnarkose erforderlich", "Schnelle Erholung", "Erhalt der Sexualfunktion", "Langanhaltende Wirkung", "Keine tägliche Medikamenteneinnahme"].map((v) => (
              <div key={v} className="flex items-center gap-3">
                <CheckCircle size={18} className="flex-shrink-0" style={{ color: "#f59e0b" }} />
                <span className="text-slate-600 text-sm">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
