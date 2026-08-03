# Decision Log

## 2026-08-03 — Merge brand tokens instead of replacing globals.css wholesale

**Context:** Phase 1 reskin spec called for replacing `website/src/app/globals.css`
entirely with a plain-CSS design system (no `@import "tailwindcss";`) and adding a
`theme.extend` block to a `tailwind.config.ts`.

**Discovery:** The project has no `tailwind.config.ts`/`.js` — it's on Tailwind v4's
CSS-first config, so that file wouldn't have been read anyway. Separately, 24
component files (Navbar, Footer, landing sections, chat widget, ui) depend on
Tailwind utility classes. A literal replacement of `globals.css` would have dropped
`@import "tailwindcss";`, silently disabling all Tailwind utility generation
app-wide — a full visual break, not a color/font reskin.

**Decision (confirmed with Marcel):** Keep `@import "tailwindcss";` and the existing
`@theme` variable structure; update the underlying `--background/--foreground/
--primary/--secondary/...` values to the original site's brand colors
(`#89c2ca` / `#2d5a71` / `#107aca`) and point `--font-sans`/`--font-display` at
Raleway. Added the new named tokens (`--color-primary-dark`, `--color-body-text`,
`--color-doctolib-blue`) plus the plain-CSS helper classes from the spec
(`.container`, `.btn-primary`, `.btn-doctolib`, `.trenner`, base `h1`–`h6` rules)
inside the same file so future component work can use either the plain classes
(matching the original static site) or existing Tailwind utilities.

**Why it matters:** Preserves a working build/visual baseline through Phase 1 while
still landing every brand value from the spec. Existing components (Navbar/Footer)
still use a dark-glassmorphism aesthetic designed for a dark hero background, so
they will look visually mismatched against the new white/teal palette until a later
phase rewrites their markup to match the static replica — this is expected and
tracked as follow-up work, not a Phase 1 regression.

**How to apply:** When touching `globals.css` or Tailwind config again, keep using
the `@theme` CSS-first pattern (no `tailwind.config.ts`) unless there's a specific
reason to switch Tailwind config styles — that would itself be a material
architecture decision requiring sign-off.

## 2026-08-03 — Phase 2 Navbar: kept all 9 existing Leistungen routes; linked to not-yet-built pages

**Context:** Phase 2's pasted Navbar dropdown spec mapped only 6 static-site labels
to hrefs, with two labels (`Individualleistungen`, `Urodynamik`) both pointing at
`/leistungen/urodynamik`, and no entries at all for the already-built Onkologie and
Kinderurologie pages. Separately, the spec's top-level nav wants "Walters T.
Fomuki" and "Links" items, matching the original site's `dr-walters.html`/
`links.html`, but no such pages exist yet in the Next app (Phase 3 is inner pages).

**Decision (confirmed with Marcel):** Keep the dropdown at all 9 existing routes
(diagnostik, onkologie, andrologie, urolift, magnetstimulation, urodynamik,
ambulante-op, kinderurologie, individuelle-leistungen) rather than trimming to the
static site's 6 labels — nothing already built becomes unreachable from nav.
Link "Walters T. Fomuki" → `/dr-walters` and "Links" → `/links` now, even though
neither page exists yet — they'll 404 until Phase 3 builds them, which is next in
this same sequence.

**Why it matters:** Avoids silently dropping two already-built content pages from
navigation because of a copy-paste mapping error, and keeps the nav's visual
structure matching the target design without blocking on Phase 3 being done first.

**How to apply:** Phase 3 must create `/dr-walters` and `/links` under
`src/app/[locale]/`. Until then, those two nav items are expected dead links, not a
regression.

## 2026-08-03 — Phase 2 Footer: minimal single bar, no PraxisOS/Kontakt links, no "Dr." title

**Context:** The prior Footer had a 4-column layout (contact info, hours, services
list, logo) plus a bottom bar with Impressum/Datenschutz/Kontakt/PraxisOS links.
Phase 2's spec asked for a minimal single-bar footer matching the static site,
listing only Impressum/Datenschutz, and used "Dr. Walters T. Fomuki" in the
copyright line.

**Decision:** Followed the minimal single-bar spec literally (this was an explicit,
unambiguous instruction, not a mapping error like the dropdown above) — dropped the
contact/hours/services columns and the Kontakt/PraxisOS bottom-bar links. Dropped
the "Dr." title from the copyright line ("Walters T. Fomuki", not "Dr. Walters T.
Fomuki") to stay consistent with commit `e695ad7` ("remove Dr. title everywhere"),
which the pasted spec's literal text would have silently reintroduced.

**Why it matters:** The PraxisOS dashboard login link (`urologie-dashboard-one
.vercel.app/login`) is no longer reachable from the footer. If staff relied on that
link to reach the dashboard, it needs a new home (e.g. a separate staff-only
bookmark or a different in-app location) — flagging this rather than silently
losing that access point.

**How to apply:** Don't reintroduce "Dr." in patient-facing copy without an
explicit new instruction overriding `e695ad7`. If the PraxisOS link needs to come
back, it belongs somewhere other than the public footer given the minimal-footer
direction.

## 2026-08-04 — Fixed the JWT role-check gap on every staff route, not just the Freigabe route

**Context:** The Befund-Freigabe task (B1-B3) only asked for a new
`PUT /api/lab/:id/freigabe` route restricted to `inhaber`/`arzt`. While building
its access control, `fastify.authenticate` turned out to only verify JWT
*validity*, not payload shape — a patient portal token (`{patientId}`) and a
staff token (`{staffId, role}`) were interchangeable at every route using
`authenticate`, including `patients`, `appointments`, `cms`, and `auth`
change-password/me. Asked Marcel (via AskUserQuestion) whether to fix only the
new route or the systemic gap; he chose to fix the systemic gap first.

**Decision:** Added `requireStaff`, `requireFreigabeRole`, and `requirePatient`
decorators (payload-shape + role checks after `jwtVerify()`) and applied the
correct one to every existing route that had been using the bare `authenticate`
decorator, not just the new Freigabe route.

**Why it matters:** Building the new route's access control on top of an
insecure base (where any authenticated patient could already reach staff-only
endpoints) would have been misleading — it would look like the release workflow
was protected while the rest of the API stayed open to role confusion.

**How to apply:** Any new route needing staff-only or patient-only access should
use `requireStaff`/`requireFreigabeRole`/`requirePatient`, never the bare
`authenticate` decorator, which still exists but only confirms a token is valid,
not who it belongs to.

## 2026-08-04 — Replaced Compliance.tsx's checklist instead of patching it

**Context:** The compliance-pass spec (D2) gave exact new AVV/TOM/Patientenportal/
KBV sections with specific status wording for `dashboard/src/pages/compliance/
Compliance.tsx`. The existing page's content conflicted with this and with known
facts: it claimed all AVVs were already signed (spec says "ausstehend" for all
five), named "Twilio" as the SMS provider (the actual provider is seven
communications, established in the Datenschutz rewrite), and marked an
incident-response item "ok" that the spec marks "ausstehend."

**Decision:** Replaced the page's content wholesale with the four new sections
from the spec, rather than patching individual fields. This dropped older
checklist content the new spec didn't mention and that couldn't be verified
against code: MBO-Ä (KI nur unterstützend), MPG/UroLift & Magnetstimulation
device-maintenance protocol, and KBV TI-Connector/ePA/eAU/eRezept/MediStar items.

**Why it matters:** Patching field-by-field would have left stale, contradictory,
or unverifiable claims sitting next to the new accurate content in a page whose
entire purpose is tracking real compliance status. A full replacement is more
honest about what's actually known, but it does mean real (if unverified)
tracked items are gone from the page, not just corrected.

**How to apply:** If the MBO-Ä/MPG/KBV items are still relevant, they should be
re-added as verified, sourced content (confirm against actual device maintenance
records / KBV integration status) rather than restored as-is from the old page.
