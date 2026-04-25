import { getLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <div>
      <Hero locale={locale} />
      <Services />
    </div>
  );
}
