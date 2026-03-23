import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsere Praxis",
  description: "Die Urologische Praxis Neuwied von Dr. Walters T. Fomuki — Philosophie, Ausstattung und Standort.",
};

export default function PraxisPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Unsere Praxis</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Modern. Persönlich. Kompetent.</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Willkommen in der Urologischen Praxis Neuwied.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none text-slate-600">
          <p className="text-xl leading-relaxed mb-6">
            Zur Philosophie unserer Praxis gehört es, dass wir uns für jeden einzelnen Patienten die Zeit nehmen,
            um die jeweiligen Krankheitsbeschwerden und medizinischen Fragestellungen ausführlich zu besprechen.
          </p>
          <p className="leading-relaxed mb-6">
            Es ist uns besonders wichtig, medizinische Entscheidungen so zu treffen, dass Sie sich als Patient
            immer gut informiert und beraten fühlen. Unser Ziel ist eine partnerschaftliche Arzt-Patienten-Beziehung,
            die auf Vertrauen, Transparenz und gegenseitigem Respekt basiert.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Modernste Ausstattung", text: "Hochmoderne Diagnostik- und Therapiegeräte für präzise Befunde." },
              { title: "Erfahrenes Team", text: "Über 15 Jahre Erfahrung in der urologischen Facharztversorgung." },
              { title: "Persönliche Betreuung", text: "Jeder Patient wird individuell und mit Zeit betreut." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border-2 border-slate-100 p-6 hover:border-[#1E9FD4]/30 transition-colors">
                <div className="w-2 h-8 rounded-full mb-4" style={{ backgroundColor: "#1E9FD4" }} />
                <h3 className="font-bold text-[#2D3748] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
