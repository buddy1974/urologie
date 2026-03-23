import type { Metadata } from "next";
import { Microscope, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Diagnostik",
  description: "Urologische Diagnostik in Neuwied — Labor, Sonographie, Zystoskopie, Prostatabiopsie, Uroflowmetrie.",
};

const items = [
  "Labor (Urindiagnostik, Mikrobiologie, PSA und Testosteronbestimmungen)",
  "Spermiogramme bei unerfülltem Kinderwunsch oder nach Vasektomie",
  "Ultraschall (Sonographie, Transrektale Sonographie, Dopplersonographie)",
  "Zystoskopie (Blasenspiegelung mit Video)",
  "Prostatabiopsie — TRUS gesteuert",
  "Uroflowmetrie (Harnflussmessung)",
  "Schwellkörper(auto)injektionstest (SKIT/SKAT) bei Erektionsstörungen",
  "Kooperation mit dem Radiologischen Institut Koblenz",
];

const conditions = [
  "Blasen- oder Nierensteine",
  "Entzündungen der Harnwege",
  "Sexuell übertragbare Erkrankungen",
  "Blut im Urin oder Ejakulat",
  "Inkontinenz und Blasenentleerungsstörungen",
  "Benigne Prostatahyperplasie (BPH)",
];

export default function DiagnostikPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(30,159,212,0.2)" }}>
            <Microscope size={32} style={{ color: "#1E9FD4" }} />
          </div>
          <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Diagnostik</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Präzise Diagnosen mit modernster Technik.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6">Diagnostische Leistungen</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#1E9FD4" }} />
                <span className="text-slate-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6">Abklärung &amp; Therapie bei</h2>
          <div className="space-y-3">
            {conditions.map((c) => (
              <div key={c} className="flex items-start gap-3">
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#5ECFEB" }} />
                <span className="text-slate-600 text-sm">{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-2xl" style={{ backgroundColor: "rgba(30,159,212,0.08)" }}>
            <p className="text-[#1480AB] text-sm font-medium">
              Für eine Überweisung oder einen Termin erreichen Sie uns unter <strong>02631 - 23351</strong> oder buchen Sie online über Doctolib.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
