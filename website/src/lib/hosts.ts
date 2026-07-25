/**
 * Hostnames that serve the PUBLIC production website.
 *
 * While the site is in pre-launch ("landing") mode, ONLY these hosts show the
 * under-construction landing page. Every OTHER host — the *.vercel.app review
 * URL, Vercel preview deployments, localhost — always renders the FULL site,
 * so work in progress can be reviewed without ever touching the public domain.
 *
 * Kept in its own module (no next/headers import) so it can be safely imported
 * from BOTH server components and edge middleware.
 */
export const PUBLIC_HOSTS = new Set<string>([
  "urologie-neuwied.de",
  "www.urologie-neuwied.de",
]);

/** Normalise a raw Host header ("www.Example.com:443") to a bare lowercase hostname. */
export function normalizeHost(rawHost: string | null | undefined): string {
  return (rawHost ?? "").split(":")[0].toLowerCase();
}

/** True when the request is hitting the real public production domain. */
export function isPublicHost(rawHost: string | null | undefined): boolean {
  return PUBLIC_HOSTS.has(normalizeHost(rawHost));
}
