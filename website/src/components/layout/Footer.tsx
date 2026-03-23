import Link from "next/link";
import Image from "next/image";
import { Phone, Printer, MapPin, Clock, ExternalLink } from "lucide-react";

const DOCTOLIB_URL =
  "https://www.doctolib.de/praxis/neuwied/urologie-neuwied/booking?speciality_id=1336&utm_source=website-footer";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1A202C" }} className="text-slate-300">

      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1E9FD4] via-[#5ECFEB] to-[#1E9FD4]" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 — Logo + Brand */}
        <div>
          <div className="mb-5">
            <Image
              src="/footer-logo.png"
              alt="Urologie Neuwied"
              width={180}
              height={50}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            Facharztpraxis für Urologie in Neuwied. Moderne Medizin mit persönlicher Betreuung seit über 15 Jahren.
          </p>
          <a
            href={DOCTOLIB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            style={{ backgroundColor: "#1E9FD4" }}
          >
            Termin buchen
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Column 2 — Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Kontakt</h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#1E9FD4" }} />
              <span>Dierdorfer Str. 115–117<br />56564 Neuwied</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="flex-shrink-0" style={{ color: "#1E9FD4" }} />
              <a href="tel:+49263123351" className="hover:text-white transition-colors">
                02631 - 23351
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Printer size={15} className="flex-shrink-0" style={{ color: "#1E9FD4" }} />
              <span>02631 - 941845</span>
            </li>
          </ul>
        </div>

        {/* Column 3 — Hours */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            <Clock size={14} className="inline mr-1.5" style={{ color: "#1E9FD4" }} />
            Sprechstunden
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { day: "Montag", hours: "08:00–12:00, 14:00–17:00" },
              { day: "Dienstag", hours: "08:00–12:00, 14:00–17:00" },
              { day: "Mittwoch", hours: "08:00–12:00" },
              { day: "Donnerstag", hours: "08:00–12:00, 14:00–17:00" },
              { day: "Freitag", hours: "08:00–12:00" },
            ].map(({ day, hours }) => (
              <li key={day} className="flex justify-between gap-4">
                <span className="text-slate-400 w-24 flex-shrink-0">{day}</span>
                <span className="text-slate-300">{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Services */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Leistungen</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Diagnostik", href: "/leistungen/diagnostik" },
              { label: "Onkologie", href: "/leistungen/onkologie" },
              { label: "Andrologie & Vasektomie", href: "/leistungen/andrologie" },
              { label: "UroLift®", href: "/leistungen/urolift" },
              { label: "Magnetstimulation", href: "/leistungen/magnetstimulation" },
              { label: "Urodynamik & Ästhetik", href: "/leistungen/urodynamik" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#1E9FD4] group-hover:w-2 transition-all" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {currentYear} Urologische Praxis Walters T. Fomuki · Neuwied. Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-5">
            <Link href="/impressum" className="hover:text-slate-300 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-slate-300 transition-colors">Datenschutz</Link>
            <Link href="/kontakt" className="hover:text-slate-300 transition-colors">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
