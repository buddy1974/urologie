import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";
import { isPublicHost } from "@/lib/hosts";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
});

export default function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  // Keep the in-progress review build (urologie-six.vercel.app, previews,
  // localhost) OUT of search engines. Only the real public domain is indexable.
  if (!isPublicHost(req.headers.get("host"))) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
