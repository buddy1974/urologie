"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export default function FloatingContact() {
  const pathname = usePathname();

  if (pathname?.includes("/patientenportal")) return null;

  return (
    <a
      href="tel:+49263123351"
      aria-label="02631 - 23351"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 bg-primary text-white font-bold rounded-full shadow-[0_4px_16px_rgba(137,194,202,0.5)] transition-all duration-200 hover:bg-primary-dark hover:scale-105 px-3 py-3 sm:px-5 sm:py-3"
    >
      <Phone size={18} className="flex-shrink-0" />
      <span className="hidden sm:inline text-[15px]">02631 - 23351</span>
    </a>
  );
}
