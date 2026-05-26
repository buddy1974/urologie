import { getLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import LandingPage from "@/components/landing/LandingPage";

export default async function HomePage() {
  if (process.env.NEXT_PUBLIC_SITE_MODE === "landing") {
    return <LandingPage />;
  }

  const locale = await getLocale();
  return (
    <div>
      <Hero locale={locale} />
      <Services />
    </div>
  );
}
