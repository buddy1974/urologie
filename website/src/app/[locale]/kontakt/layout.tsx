import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "Kontaktieren Sie die Urologische Praxis Neuwied. Adresse, Telefon, Öffnungszeiten, Anfahrt und direktes Kontaktformular.",
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
