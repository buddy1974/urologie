import { headers } from "next/headers";
import { isPublicHost } from "@/lib/hosts";

/**
 * Decide, PER REQUEST, whether to render the landing / under-construction page
 * instead of the full website.
 *
 * Controlled by the server-side `SITE_MODE` env var. It is intentionally NOT
 * prefixed `NEXT_PUBLIC_`, so it is read at request time on the server and is
 * never inlined into the client bundle. (That build-time inlining is exactly
 * what caused the review URL to flip to the landing page after a redeploy.)
 *
 *   SITE_MODE=landing        → public domain shows landing; review hosts show full site
 *   SITE_MODE=live  | unset  → every host shows the full site   ← flip this to go live
 */
export async function isLandingMode(): Promise<boolean> {
  if (process.env.SITE_MODE !== "landing") return false;

  const host = (await headers()).get("host");
  return isPublicHost(host);
}
