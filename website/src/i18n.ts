import { getRequestConfig } from "next-intl/server";

export const locales = ["de", "en", "fr", "tr"] as const;
export const defaultLocale = "de" as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    locale: locale ?? defaultLocale,
    messages: (await import(`../messages/${locale ?? defaultLocale}.json`)).default,
  };
});
