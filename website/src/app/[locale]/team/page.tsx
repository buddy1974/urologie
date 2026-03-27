import Image from "next/image";
import { Award, Stethoscope, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unser Team",
  description: "Das Team der Urologischen Praxis Neuwied — Dr. Walters T. Fomuki und seine erfahrenen Mitarbeiterinnen.",
};

const doctors = [
  {
    name: "Dr. Walters T. Fomuki",
    role: "Facharzt für Urologie · Praxisinhaber",
    image: "/images/Dr-fomuki/fomuki_walters_002.jpg",
    initials: "WF",
    color: "#1E9FD4",
    qualifications: [
      "Onkologisch qualifizierter Arzt",
      "Medikamentöse Tumortherapie",
      "Ambulantes Operieren",
      "Konsiliararzt DRK Krankenhaus Neuwied",
      "Mitglied Vasektomie-Experten Netzwerk",
    ],
  },
  {
    name: "Dr. C. Nwankwo",
    role: "Fachärztin für Urologie · Angestellte Ärztin",
    image: "/images/team/frau-dr-nwanko.jpg",
    initials: "CN",
    color: "#5ECFEB",
    qualifications: [
      "Fachärztin für Urologie",
      "Angestellte Ärztin",
    ],
  },
];

const staff = [
  {
    name: "Bettina Theismann",
    role: "MFA",
    image: "/images/team/theismann_bettina.jpg",
    initials: "BT",
    focus: ["Praxisorganisation", "Qualitätsbeauftragte"],
    color: "#1E9FD4",
  },
  {
    name: "Jacqueline Elinger",
    role: "MFA",
    image: "/images/team/ellinger_jaqueline_2021.jpg",
    initials: "JE",
    focus: ["Zusatzqualifikation Onkologie", "Anmeldung"],
    color: "#5ECFEB",
  },
  {
    name: "Johanna Sikora",
    role: "MFA",
    image: "/images/team/sikora_johanna_02.jpg",
    initials: "JS",
    focus: ["Zusatzqualifikation Onkologie", "OP-Assistenz"],
    color: "#14b8a6",
  },
  {
    name: "Birgit Erhan",
    role: "MFA",
    image: "/images/team/erhan_birgit.jpg",
    initials: "BE",
    focus: ["Zusatzqualifikation Onkologie", "Labor"],
    color: "#8b5cf6",
  },
  {
    name: "Frau Jakoby",
    role: "Büroassistenz",
    image: "/images/team/jakoby_2023.jpg",
    initials: "FJ",
    focus: ["Büroorganisation", "Administration"],
    color: "#f59e0b",
  },
  {
    name: "Vivien Urmersbach",
    role: "Auszubildende MFA",
    image: "/images/team/vivien_urmersbach_2023.jpg",
    initials: "VU",
    focus: ["In Ausbildung zur MFA"],
    color: "#1E9FD4",
  },
  {
    name: "Shau Wen Wang",
    role: "Auszubildende MFA",
    image: "/images/team/shau_wen_wang_2023.jpg",
    initials: "SW",
    focus: ["In Ausbildung zur MFA"],
    color: "#5ECFEB",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero with background image */}
      <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <Image
          src="/images/team/header-team.jpg"
          alt="Team Urologie Neuwied"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/90 via-[#2D3748]/85 to-[#1A202C]/90" />
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">
              Unser Team
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Erfahren. Engagiert. Persönlich.
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Unser eingespieltes Team sorgt dafür, dass Sie sich von der Anmeldung
              bis zur Behandlung gut aufgehoben fühlen.
            </p>
          </div>
        </div>
      </div>

      {/* Doctors */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-[#2D3748] mb-10 flex items-center gap-3">
          <Stethoscope size={24} style={{ color: "#1E9FD4" }} />
          Ärztliches Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-[#1E9FD4]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Top color bar */}
              <div className="h-2 w-full" style={{ backgroundColor: doc.color }} />

              <div className="p-8">
                <div className="flex items-center gap-5 mb-6">
                  {/* Photo */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-lg">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2D3748]">{doc.name}</h3>
                    <p className="text-sm mt-1" style={{ color: doc.color }}>{doc.role}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap size={14} />
                    Qualifikationen & Schwerpunkte
                  </p>
                  {doc.qualifications.map((q) => (
                    <div key={q} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: doc.color }} />
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Staff */}
        <h2 className="text-2xl font-bold text-[#2D3748] mb-10 flex items-center gap-3">
          <Award size={24} style={{ color: "#1E9FD4" }} />
          Medizinisches Fachpersonal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {staff.map((member) => (
            <div
              key={member.name}
              className="group rounded-2xl border-2 border-slate-100 p-5 hover:border-[#1E9FD4]/30 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#2D3748] text-sm leading-tight">{member.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {member.focus.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: member.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center" style={{ backgroundColor: "#1E9FD4" }}>
          <h3 className="text-2xl font-bold text-white mb-2">Wir stellen ein!</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Wir suchen MFA, Ärztin/Arzt in Weiterbildung und Bürokauffrau/-mann.
            Werden Sie Teil unseres Teams.
          </p>
          <a
            href="/stellenangebote"
            className="inline-block bg-white font-semibold px-6 py-3 rounded-xl transition-colors hover:bg-blue-50"
            style={{ color: "#1E9FD4" }}
          >
            Stellenangebote ansehen →
          </a>
        </div>
      </div>
    </div>
  );
}
