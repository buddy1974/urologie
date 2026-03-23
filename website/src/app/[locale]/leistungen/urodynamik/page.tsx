import type { Metadata } from "next";
import { Sparkles, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Urodynamik & Ästhetische Medizin",
  description: "Blasendruckmessung und ästhetische Medizin mit Botox und Filler in Neuwied.",
};

export default function UrodynamikPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(94,207,235,0.15)" }}>
            <Sparkles size={32} style={{ color: "#5ECFEB" }} />
          </div>
          <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Urodynamik &amp; Ästhetik</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Blasendiagnostik und ästhetische Behandlungen aus einer Hand.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-4">Urodynamik</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Die Urodynamik (Blasendruckmessung) ist die präziseste Methode zur Diagnose von Harninkontinenz und Blasenentleerungsstörungen.</p>
          <div className="space-y-2">
            {["Harninkontinenz-Diagnostik", "Blasenentleerungsstörungen", "Überaktive Blase (OAB)", "Therapieplanung Inkontinenz"].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={16} style={{ color: "#1E9FD4" }} />
                <span className="text-slate-600 text-sm">{i}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-4">Ästhetische Medizin</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Diskrete und professionelle ästhetische Behandlungen durch den erfahrenen Facharzt.</p>
          <div className="space-y-2">
            {["Botox-Behandlungen", "Filler-Injektionen", "Faltenbehandlung", "Individuelle Beratung"].map((a) => (
              <div key={a} className="flex items-center gap-3">
                <CheckCircle size={16} style={{ color: "#5ECFEB" }} />
                <span className="text-slate-600 text-sm">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
