import type { Metadata } from "next";
import Image from "next/image";
import { HeartPulse, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Onkologie",
  description: "Onkologische Betreuung und Nachsorge bei urologischen Tumoren in Neuwied.",
};

const tumors = [
  "Nierenzellkarzinom (Nierenkrebs)",
  "Harnleitertumoren",
  "Harnblasenkarzinom (Blasenkrebs)",
  "Harnröhrenkarzinom",
  "Prostatakarzinom (Prostatakrebs)",
  "Hodentumoren",
  "Peniskarzinom",
];

export default function OnkologiePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
        <Image
          src="/images/leistung/leistungen_002.jpg"
          alt="Onkologie Urologie Neuwied"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/90 via-[#2D3748]/85 to-[#1A202C]/90" />
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(244,63,94,0.15)" }}>
              <HeartPulse size={32} style={{ color: "#f43f5e" }} />
            </div>
            <span className="inline-block text-[#5ECFEB] text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Onkologie</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Onkologisch qualifizierte Betreuung und Nachsorge.</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl border-2 border-slate-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6">Tumore &amp; Nachsorge</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tumors.map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle size={18} className="flex-shrink-0" style={{ color: "#f43f5e" }} />
                <span className="text-slate-600 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(30,159,212,0.08)" }}>
          <p className="text-[#1480AB] font-medium mb-2">Dr. Fomuki ist onkologisch qualifizierter Arzt</p>
          <p className="text-slate-500 text-sm">mit Spezialisierung auf medikamentöse Tumortherapie und ambulantes Operieren.</p>
        </div>
      </div>
    </div>
  );
}
