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
  },
  {
    name: "Jacqueline Elinger",
    role: "MFA",
    image: "/images/team/ellinger_jaqueline_2021.jpg",
    initials: "JE",
    focus: ["Zusatzqualifikation Onkologie", "Anmeldung"],
  },
  {
    name: "Johanna Sikora",
    role: "MFA",
    image: "/images/team/sikora_johanna_02.jpg",
    initials: "JS",
    focus: ["Zusatzqualifikation Onkologie", "OP-Assistenz"],
  },
  {
    name: "Birgit Erhan",
    role: "MFA",
    image: "/images/team/erhan_birgit.jpg",
    initials: "BE",
    focus: ["Zusatzqualifikation Onkologie", "Labor"],
  },
  {
    name: "Frau Jakoby",
    role: "Büroassistenz",
    image: "/images/team/jakoby_2023.jpg",
    initials: "FJ",
    focus: ["Büroorganisation", "Administration"],
  },
  {
    name: "Vivien Urmersbach",
    role: "Auszubildende MFA",
    image: "/images/team/vivien_urmersbach_2023.jpg",
    initials: "VU",
    focus: ["In Ausbildung zur MFA"],
  },
  {
    name: "Shau Wen Wang",
    role: "Auszubildende MFA",
    image: "/images/team/shau_wen_wang_2023.jpg",
    initials: "SW",
    focus: ["In Ausbildung zur MFA"],
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/team/header-team.jpg"
          alt="Team Urologie Neuwied"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 bg-hero noise pt-36 pb-24 px-6" style={{ minHeight: "380px" }}>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-accent mb-6">
              Unser Team
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight text-foreground mb-6">
              Erfahren. <span className="text-gradient italic">Engagiert.</span> Persönlich.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Unser eingespieltes Team sorgt dafür, dass Sie sich von der Anmeldung
              bis zur Behandlung gut aufgehoben fühlen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">

          {/* Doctors */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow">
                <Stethoscope size={20} className="text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl text-foreground">Ärztliches Team</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doc) => (
                <div
                  key={doc.name}
                  className="group glass rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 transition-all duration-500"
                >
                  <div className="h-1 w-full bg-primary-gradient" />
                  <div className="p-8">
                    <div className="flex items-center gap-5 mb-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-glow ring-2 ring-primary/30">
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-foreground">{doc.name}</h3>
                        <p className="text-sm text-accent mt-1">{doc.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                        <GraduationCap size={13} />
                        Qualifikationen & Schwerpunkte
                      </p>
                      {doc.qualifications.map((q) => (
                        <div key={q} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-gradient shadow-glow">
                <Award size={20} className="text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl text-foreground">Medizinisches Fachpersonal</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {staff.map((member) => (
                <div
                  key={member.name}
                  className="glass rounded-3xl p-6 hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 ring-1 ring-white/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm leading-tight">{member.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {member.focus.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="relative overflow-hidden glass-strong rounded-[2rem] p-10 text-center shadow-elegant">
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
            <div className="relative">
              <h3 className="font-display text-3xl text-foreground mb-3">Wir stellen ein!</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Wir suchen MFA, Ärztin/Arzt in Weiterbildung und Bürokauffrau/-mann.
                Werden Sie Teil unseres Teams.
              </p>
              <a
                href="/stellenangebote"
                className="inline-flex items-center gap-3 rounded-full bg-primary-gradient px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Stellenangebote ansehen →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
