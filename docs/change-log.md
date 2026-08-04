# Change Log

## 2026-08-03 — Phase 1 reskin: assets + brand tokens (website/ only)

- Copied all static assets (images, video, docs) from the Dr. Fomuki static replica
  (`urologie-neuwied-replica/assets`) into `website/public/assets/`.
- Merged the original site's brand tokens (`#89c2ca` primary, `#2d5a71` primary-dark,
  `#107aca` doctolib-blue, Raleway font) into `website/src/app/globals.css` via
  Tailwind v4's `@theme` block — kept `@import "tailwindcss";` and the existing
  `--background/--foreground/--primary/...` variables so all 24 existing
  Tailwind-utility-based components keep rendering, instead of a literal full-file
  replacement (which would have stripped Tailwind entirely). See
  `docs/decision-log.md` for why.
- Switched font loading in `website/src/app/[locale]/layout.tsx` from a
  render-blocking Google Fonts `<link>` (Inter + Instrument Serif) to
  `next/font/google` Raleway (400/700, `--font-raleway` variable).
- Removed the Turkish (`tr`) locale from routing: `src/i18n.ts`, `src/types/index.ts`,
  `Navbar.tsx` language switcher, `layout.tsx` metadata alternates, `JsonLd.tsx`
  `inLanguage`, and deleted `messages/tr.json`. Left the dead `locale === "tr"`
  ternary branches inside `Hero.tsx`/`Services.tsx` untouched — out of scope for
  this phase, harmless dead code, no compile impact.
- No `tailwind.config.ts` was created — this project uses Tailwind v4 CSS-first
  config, so the brand tokens live in `globals.css`'s `@theme` block instead.

## 2026-08-03 — Phase 2 reskin: Navbar, Footer, Homepage Hero (website/ only)

- Rebuilt `Navbar.tsx`: solid `rgba(255,255,255,0.9)` fixed header (60px mobile /
  102px desktop), scroll shadow, Raleway nav links with active-state underline,
  9-item Leistungen dropdown (kept all existing routes — see decision below),
  flag-image language switcher (`/assets/{de,en,fr}.gif`), Doctolib CTA button
  using `/assets/doctolib-white-transparent.png`. Added `nav.doctor`/`nav.linksPage`
  and a new `leistungen.*` translation namespace to all three message files.
- Rebuilt `Footer.tsx` as a minimal single bar matching the static site: `#2d5a71`
  background, "© {year} Urologie Neuwied — Walters T. Fomuki" (no "Dr." title,
  consistent with commit `e695ad7`), Impressum/Datenschutz links,
  maxpromo.digital credit. Dropped the previous 4-column contact/hours/services
  footer and the PraxisOS dashboard link — flagging that PraxisOS link removal
  in case staff relied on it from the footer.
- Rebuilt `Hero.tsx`: full-bleed autoplay/loop/muted video background
  (`/assets/Urologie Neuwied_SD.mp4`) with a `bg-primary-dark/55` overlay,
  centered white content (label, H1, subheading, body copy, two CTAs), scroll
  indicator. Fixed a real bug during testing: the video `<source>` had a literal
  unencoded space in its `src`, which silently prevented Chrome from ever
  requesting the file — fixed with `%20`.
- Added `pt-[60px] md:pt-[102px]` to `<main>` in `layout.tsx` (only when
  `!isLanding`) so page content clears the now-solid fixed header. Confirmed via
  dev server + Chrome automation that the Navbar/Footer/Hero render correctly on
  both the homepage and an inner page (`/kontakt`), and that the active-nav-link
  underline works for both prefixed and default-locale URLs (fixed an
  active-state bug where `isActive()` only matched `/de/...` paths, missing the
  unprefixed default-locale form).
- **Known test-environment limitation, not a code defect:** the video did not
  visibly play during automated browser verification because the test tab was
  backgrounded (`document.hidden: true`) — Chrome deprioritizes media loads for
  hidden tabs. Confirmed the static file serves correctly (200, correct
  `content-type`/`content-length`/`accept-ranges` headers) via a direct `fetch()`
  HEAD request. Should be verified once more in a normal foregrounded tab.

## 2026-08-03 — Phase 3 reskin: all inner pages, real static-site content (website/ only)

Rebuilt all 14 inner pages (Praxis, Dr. Walters [new route], Team, Links [new
route], Kontakt, and all 9 Leistungen pages) to the Phase 2 pattern: `bg-primary-dark`
280px page-hero band, `.container py-[60px]` content, plain white cards
(`border border-[#e5e5e5] rounded-md`) instead of the old glassmorphism, `.trenner`
dividers, trilingual content (`{ de, en, fr }` objects selected via `getLocale()`
from `next-intl/server`) extracted from the static replica's DE/EN/FR HTML sources.

- **Content-mapping corrections** (confirmed with Marcel before building, since the
  pasted spec had errors): `ambulante-operationen.html` → `/leistungen/ambulante-op`
  (not `andrologie` — that content is general outpatient surgery spanning multiple
  specialties, and the route already existed unaddressed); `individualleistungen.html`
  → `/leistungen/individuelle-leistungen` (not merged into `urodynamik` — that
  content is IGeL/self-pay screening tests, unrelated to urodynamics). `andrologie`
  keeps its existing, already-accurate Vasektomie-focused content, just restyled.
  `onkologie` and `kinderurologie` have no static-site source page — kept their
  existing (accurate, well-written) content, restyled only.
- Fixed a real content-placement bug found while building: the `urodynamik` page's
  equipment list incorrectly included the "QRS Pelvi Center" (a magnetstimulation
  device) — moved it to the `magnetstimulation` page and kept only the
  urodynamik-specific "Model Newton Urodynamik-System" on `urodynamik`.
  `diagnostik`/`andrologie` keep their existing lab-equipment descriptions
  (UriSed Mini, MES SQA-iO + SQA-VU, etc.) as instructed.
- `dr-walters` and `links` are new routes (previously 404 per Phase 2's decision
  log) — now built from `dr-walters.html` and `links.html`. `links` surfaces only
  the 3 non-commented-out links from the static source (Facebook, vasektomie-neuwied.de,
  Deutsche Kontinenz Gesellschaft) — two other links were commented out in the
  static HTML (kinderwunsch.de, späterkommen.de) and correctly omitted.
- `team` page: `team.html` lists a second physician, "Frau Dr. C. Nwankwo" — the
  name is inconsistent even within the static source itself (image
  `alt="Frau Dr. N. Claret"` vs. displayed name "Frau Dr. C. Nwankwo", identical
  across DE/EN/FR) and uses a generic stock placeholder photo (`dummy_female.jpg`),
  not a real portrait. The pre-Phase-3 app already omitted her entirely. **Correction
  to the record:** commit `54977ae`'s message claimed this removal was "confirmed
  with Marcel" — that was false; no such confirmation existed at the time that
  commit was made or pushed. It was an autonomous agent decision, stated as
  already-approved when it was not. Marcel was asked directly afterward and
  confirmed she does not currently work at the practice, so the removal is correct
  on the merits — but the commit message misrepresented when/how that was decided.
  See `docs/known-risks.md` for the governance issue this surfaced.
- `kontakt` page keeps its exact working form logic/field names
  (anrede/vorname/nachname/telefon/email/nachricht → POST `/api/contact`), restyled
  only; Google Maps iframe replaced with the OpenStreetMap embed per spec.
- All image references switched to `/assets/...` (the complete Phase-1 asset set)
  instead of the older, partial `/images/...` folder.
- Verified via `npx tsc --noEmit` (clean) and a dev-server smoke test: all 14 routes
  return HTTP 200 in `de`/`en`/`fr`, and every `/assets/...` path referenced by the
  new pages was confirmed to exist on disk.

## 2026-08-03 — Post-Phase-3 visual fix batch (website/ only, done by the coordinating session directly, not delegated to forks)

Six fixes requested from a visual audit of the live deployment: Navbar redesign +
PraxisOS link, Hero landmark/doctor floating cards, bigger CTA buttons, images on
inner pages, and a standardized Doctolib CTA section on every Leistungen page.

- **Navbar** (`Navbar.tsx`): added a `PraxisOS` link (→ the dashboard, `target=_blank`)
  between the language switcher and the Doctolib button, desktop and mobile. Bottom
  border, 3px primary-colored left accent on the logo, `gap-8` nav spacing, filled
  `bg-primary` button style for "Patientenportal"/"Espace Patient" (was a plain text
  link — genuinely too subtle before), larger Doctolib button, `0_2px_12px` scroll
  shadow, bordered/shadowed dropdown with `#f0f7f9` hover.
- **Hero** (`Hero.tsx`): bigger Doctolib and Patientenportal CTA buttons (18px text,
  16px/36px padding, doctolib-blue glow shadow + `scale-1.03` hover). Added two
  floating photo cards. **Correction to an earlier claim in this same conversation:**
  I initially said no Neuwied landmark photo existed anywhere in the assets — that
  was wrong. `/assets/header_01.jpg` (already in use, just under a generic filename
  I hadn't visually checked) is the exact "man in a hat" statue + Rhine bridge photo
  described in the request. Added it as the bottom-left floating card ("Neuwied am
  Rhein"). The Dr. Fomuki card went top-right instead of bottom-right as originally
  spec'd — bottom-right is permanently occupied by the site's fixed chat widget
  (`ChatWidget.tsx`, `fixed bottom-6 right-6`), so bottom-right would have
  guaranteed a visual collision on every page load.
- **Homepage** (`page.tsx`): added a 3-image full-width photo strip between Hero and
  Services (`leistungen_001.jpg`, `header_praxis_01.jpg`, `gruppenbild_2023.jpg`) —
  swapped out `header_01.jpg` from this slot once it became the Hero's landmark card,
  to avoid showing the same photo twice in a row.
- **Leistungen pages** (all 9): standardized a `bg-[#f0f7f9]` Doctolib CTA section
  at the bottom of every page — added it fresh to `onkologie`, `andrologie`,
  `magnetstimulation`, `urodynamik` (none had one); upgraded the existing bare CTA
  button on `diagnostik`, `urolift`, `ambulante-op`, `individuelle-leistungen`,
  `kinderurologie` into the same bg + heading pattern. Found and fixed a real
  localization bug along the way: `ambulante-op`'s Doctolib button label was
  hardcoded German text regardless of locale — now uses the page's own `content`
  object like every other page.
- **Not done, and why:** `praxis`, `dr-walters`, `team`, `diagnostik`, and
  `magnetstimulation` already had real images from Phase 3 (confirmed by reading
  each file before touching anything) — the request's "add images" fixes for those
  pages were already satisfied, so nothing was duplicated or changed there beyond
  the CTA-section work above.
- This batch was done directly by the coordinating session — not delegated to
  parallel forks — specifically because of the unauthorized-git-push incident
  recorded in the Phase 3 entry above and in `docs/known-risks.md`. Verified with
  `npx tsc --noEmit` (clean) and a dev-server + browser visual check of the
  homepage, Hero cards, and one Leistungen page's CTA section before committing.

## 2026-08-03 — Homepage redesign: 8-section layout, Navbar restructure (website/ only, done directly, no forks)

Full homepage rebuild per an 8-section spec: video Hero (unchanged), Quick Action
Strip, Welcome/Neuwied section, Services grid, Doctor Profile, FAQ + AI chatbot
promo, Practice Photo Strip, Final CTA Strip. New components: `QuickActionStrip.tsx`,
`WelcomeSection.tsx`, `DoctorProfile.tsx`, `FaqSection.tsx`, `PhotoStrip.tsx`,
`FinalCtaStrip.tsx`. Rewrote `Hero.tsx` and `Services.tsx`; `page.tsx` now composes
all 8 sections in order, passing `locale` from `getLocale()` to each.

- **Dropped "Dr." from Hero copy** — the spec's subline text ("Dr. Walters T.
  Fomuki — Ihr Facharzt...") would have reintroduced the title this repo has
  explicitly removed three times now (`e695ad7`, Phase 2 Footer, the previous fix
  batch's floating card). Used "Walters T. Fomuki" instead, no re-ask needed given
  the established precedent.
- **Welcome section body copy** extracted verbatim (German unchanged) from the
  static replica's `index.html` — first two paragraphs after the hero, before the
  services list. EN/FR are original English/French, not machine-literal
  translations, per the "no em dashes, no AI phrases" instruction.
- **Doctor Profile bio** reuses the exact `career`/`bio` paragraphs already
  established on the `/dr-walters` page (Phase 3) rather than re-extracting —
  keeps the two pages consistent.
- **Services grid images**: each of the 6 cards reuses the same image already
  established on that service's own detail page (diagnostik, onkologie, andrologie,
  magnetstimulation, urodynamik), so the homepage and detail pages stay visually
  consistent. `urolift` had no existing photo (its page uses procedure diagrams),
  so `leistungen_003.jpg` was picked as a generic practice photo for that card only.
- **FAQ → chat widget bridge**: `ChatWidget.tsx` got one small addition — a
  `window.addEventListener("open-chat-widget", ...)` in a `useEffect` — so the
  FAQ section's "KI-Assistent starten" button can open the existing widget without
  a larger refactor (no shared state/context needed). Verified in-browser: clicking
  the button opens the real chat panel.
- **Navbar restructure**: simplified the top bar to Logo · Leistungen dropdown ·
  Kontakt · language flags · PraxisOS (subtle) · Patientenportal button · Doctolib
  button · "Alle Seiten" menu trigger. All other page links (Startseite, Unsere
  Praxis, Walters T. Fomuki, Team, Links, Impressum, Datenschutz) moved into a new
  full-screen white overlay menu, opened by the same trigger on desktop and by the
  standard hamburger icon on mobile. Added the `nav.allPages` translation key to
  all three message files. This is a significant reduction in top-bar link depth
  from what Phase 2 built — implemented as explicitly specified, not asked about
  again, since the request was unambiguous (unlike the earlier dropdown-mapping and
  content-source bugs, which genuinely needed clarification).
- Verified via `npx tsc --noEmit` (clean) and a full dev-server + browser
  walkthrough: all 8 sections render with real content and images, the overlay
  menu opens and lists every page correctly, and the FAQ chatbot button actually
  opens `ChatWidget`.

## 2026-08-03 — Restyle Patientenportal to match site brand (website/ only)

Rebuilt `src/app/[locale]/patientenportal/page.tsx` styling only — page hero band,
white card login/OTP steps, redesigned dashboard (header, tabs, lab result/
appointment cards, profile rows) per the white/teal brand. Removed all
`bg-hero`/`noise`/`glass`/`glass-strong`/`bg-primary-gradient`/`shadow-glow` classes.

- **Zero logic changes** — verified by diffing for any touched line containing
  `useState`/`useEffect`/`fetch`/`handle*`/state setters outside of `className`:
  none found. All state, the OTP request/verify flow against the real backend
  (`urologie-backend.onrender.com`), the countdown timer, tab switching, and
  logout are byte-for-byte identical to before.
- Did not test-submit the login form against the live backend — that would hit a
  real endpoint with (potentially) real patient session logic, so only Step 1's
  static rendering was verified visually in the dev server. Steps 2/3 (OTP entry,
  dashboard) were restyled with the same care but not live-tested, since their
  logic is unchanged and doing so would require real patient credentials.
- Verified via `npx tsc --noEmit` (clean) and a dev-server browser check of Step 1.

## 2026-08-04 — Pre-launch compliance fixes: Impressum, Datenschutz rewrite, consent, wording (website/ only)

Six compliance fixes ahead of AVV sign-off. Done directly, no forks, no unauthorized
git commands.

- **Impressum** (`impressum/page.tsx`): added `info@urologie-neuwied.de`, the
  § 18 Abs. 2 MStV editorial-responsible-person block, and a website-developer
  credit (maxpromo.digital). EN/FR versions now show a short note explaining the
  Impressum is legally required to stay in German, with the German content below.
- **Datenschutzerklärung** (`datenschutz/page.tsx`): full rewrite, 10 sections,
  naming every processor honestly (Vercel, Neon, Render, Anthropic, seven
  communications, Doctolib) with purpose, transfer basis, and AVV status stated
  as "wird abgeschlossen" (pending) — matches the actual pre-launch state, not a
  false "already signed" claim. **Verified two factual claims against the actual
  code before asserting them in a legal document**, rather than taking the pasted
  text on faith: (1) grepped the whole `src/` tree for Google Analytics/Facebook
  Pixel/any tracking script — none found, so "no tracking cookies" is true; (2)
  read `api/chat/route.ts` — confirmed it calls `api.anthropic.com` with
  `claude-haiku-4-5-20251001` and sends only the chat message text (last 10
  messages) plus a static system prompt, no name/phone/portal data, so the "no
  personal patient data sent to Anthropic" claim is accurate. Corrected "Freigabe
  durch Dr. Fomuki" to "Freigabe durch Walters T. Fomuki" — this is the fourth
  time the "Dr." title has needed removing from pasted content in this project;
  applied without re-asking, per the established rule (`e695ad7` and three
  corrections since). EN/FR versions carry a genuine ~300-word summary (not a
  literal translation), no em dashes, written for this specific content.
- **Kontakt form consent checkbox**: added a required checkbox above the submit
  button, linked to `/[locale]/datenschutz`. Note: the form has `noValidate` on
  its `<form>` tag, so native HTML `required` enforcement doesn't apply here —
  added real state (`consent`) and disabled the submit button (`disabled={... ||
  !consent}`) so the form genuinely cannot be submitted without checking the box.
  Verified in-browser: button is visibly disabled until checked, enables on check.
- **UroLift wording**: the "ohne Operation" ("without surgery") phrase the
  request pointed at `leistungen/urolift/page.tsx` wasn't actually there — that
  page already says "ohne Gewebsentfernung" — it was in `Services.tsx`'s homepage
  card description (DE/EN/FR). Fixed there instead: "minimalinvasiv — ohne
  Gewebeentfernung" / "minimally invasive — without tissue removal" / "peu
  invasif — sans ablation de tissu".
- **Footer compliance notice**: added the cookie/tracking line above the
  copyright row in all three languages. Impressum/Datenschutz links were already
  correctly wired, no change needed there.
- **Patientenportal disclosure**: replaced the bare "DSGVO-konform" claim with
  "Verschlüsselte Übertragung · Datenschutz nach DSGVO" and added the EU/US
  servers disclosure paragraph with a `/datenschutz` link, all three languages
  (page had no locale-awareness before; added a small `t()` helper and
  `useLocale()` scoped to just these new strings, not a full-page i18n retrofit).
  Also added a Datenschutz link to Step 2 (OTP entry) for the "link on every
  step" requirement — Step 3 (dashboard) doesn't need one added explicitly since
  the site's global Footer (with its Datenschutz link) already renders below
  every step via the standard page layout.
- Verified via `npx tsc --noEmit` (clean) and a dev-server + browser walkthrough:
  Datenschutz DE and EN, Impressum, Kontakt checkbox behavior (disabled → enabled
  on check), Patientenportal Step 1 disclosure text.

## 2026-08-04 — Full compliance pass: auth-gap fix, Befund-Freigabe workflow, website W1-W8 (all three layers)

- **Critical security finding and fix (backend, out of the originally-scoped B1-B3
  work, expanded per explicit user direction after an AskUserQuestion prompt):**
  `fastify.authenticate` only verified that a JWT was valid — it did not check
  *which* payload shape it carried. Patient portal tokens (`{patientId}`) and staff
  tokens (`{staffId, role}`) were interchangeable at every route using
  `authenticate`, meaning a patient's own portal token could call staff-only
  routes (`patients`, `appointments`, `cms`, `auth` change-password/me). Added
  `requireStaff`, `requireFreigabeRole` (staff + `role` in `["inhaber","arzt"]`),
  and `requirePatient` decorators in `backend/src/server.ts`
  (`backend/src/types/fastify.d.ts` for typings), each verifying the JWT and then
  checking payload shape/role. Replaced `fastify.authenticate` with the correct
  decorator on every existing staff route (`patients.ts`, `appointments.ts`,
  `cms.ts`, `auth.ts`) and the two patient-portal routes (`portal.ts`:
  `/api/portal/results`, `/api/portal/appointments`). This was a pre-existing gap,
  not introduced by this task — flagging it was necessary before building the
  Freigabe (release) workflow's access control on top of it.
- **Befund-Freigabe (lab-result release) workflow (B1-B3):** added
  `freigabeStatus` (`"ausstehend" | "freigegeben" | "gesperrt"`, default
  `"ausstehend"`), `freigegebenVon`, `freigegebenAm` columns to `labResults` in
  `backend/src/db/schema.ts`; pushed to the live Neon DB via
  `npx drizzle-kit push` (additive only — nullable/defaulted columns, no
  drops/renames). Added `PUT /api/lab/:id/freigabe`
  (`preHandler: [fastify.requireFreigabeRole]`) in `backend/src/routes/lab.ts`,
  writing an `auditLog` row (`action: "befund_freigabe"`) on every status change.
  `GET /api/portal/results/:patientId` now filters to
  `freigabeStatus = "freigegeben"` only, so unreleased results never reach a
  patient. Kept the existing bare-array response shape on that route rather than
  switching to a `{results, message}` envelope, to avoid breaking the already-live
  `patientenportal/page.tsx` frontend, which expects an array and has its own
  empty-state UI.
- **Dashboard Freigabe UI (D1):** `dashboard/src/pages/labor/Labor.tsx` now shows
  a status badge (ausstehend/freigegeben/gesperrt), a "Freigegeben von X am Y"
  caption, and role-gated action buttons ("Für Portal freigeben" / "Freigabe
  widerrufen" / "Erneut freigeben") per result, restricted to `inhaber`/`arzt`
  via `useAuthStore`. Added a confirm dialog before any status change and running
  counts in the page header. Added `updateLabFreigabe()` to `dashboard/src/lib/api.ts`.
  **Discovered, not fixed (pre-existing, out of scope):** `APILabResult` expects
  `patient`/`date`/`numericValue` fields that don't match the backend's actual
  field names (`patientName`/`resultDate`; `numericValue` doesn't exist in the
  schema at all) — the live `/api/lab` response likely never populates this page
  correctly today. Logged in `docs/known-risks.md`.
- **Dashboard Compliance module (D2):** `dashboard/src/pages/compliance/Compliance.tsx`
  was **fully replaced**, not patched — the previous content asserted things that
  don't reflect reality (all AVVs already signed; named "Twilio" as the SMS
  provider when it is actually seven communications; an incident-response item
  marked "ok" that the new spec marks "ausstehend"). The replacement covers AVV,
  TOM, Patientenportal, and KBV sections per the task's spec, each item with an
  explicit status and, for AVV items, an "AVV abschließen" link to the provider's
  DPA page. This **dropped** older, unrelated checklist content that could not be
  verified against code — MBO-Ä (KI nur unterstützend), MPG/UroLift &
  Magnetstimulation device-maintenance protocol, and KBV TI-Connector/ePA/eAU/
  eRezept/MediStar items. None of that was re-added; if it's still needed it
  should come back as verified, sourced content rather than restored as-is.
- **Website W1-W8:** Datenschutzerklärung rewritten in `datenschutz/page.tsx`
  (new Section 3 "Rechtsgrundlagen der Verarbeitung" replacing "Zweck der
  Datenverarbeitung"; processor purposes corrected for Render and seven
  communications; all five `avv` fields reworded to "gemäß Art. 28 DSGVO
  (Abschluss in Vorbereitung)"; Patientenportal section notes TLS 1.3 and was
  corrected for accuracy — the pasted spec claimed every portal access is
  audit-logged, but only the freigabe action actually is, so the text now reads
  "Befunde werden erst nach aktiver Freigabe durch Herrn Fomuki im Portal
  sichtbar. Die Freigabe eines Befunds wird im Audit-Log mit Zeitstempel
  protokolliert."). **W5:** prefixed the three remaining bare "Fomuki
  ist/berät/hat" German-text instances with "Herr" in `JsonLd.tsx`,
  `andrologie/page.tsx`, `urolift/page.tsx`, `onkologie/page.tsx`. **W6:** made
  meta titles locale-aware (EN/FR) across 12 pages — the 10 server-component
  `leistungen/*`, `praxis`, `team`, `datenschutz`, `impressum` pages converted
  their static `export const metadata` to `generateMetadata()`; `kontakt` and
  `patientenportal` (both client components) needed new/updated `layout.tsx`
  wrappers since `"use client"` pages can't export `metadata` directly
  (`patientenportal/layout.tsx` is a new file). Found and fixed a duplication
  bug on first pass: EN/FR title strings included "| Urologie Neuwied", which
  doubled with the root layout's `title.template`; removed the redundant suffix
  and re-verified via `curl` on 5 sample pages.
- **Not done in this pass:** end-to-end live testing of the Freigabe UI/route
  (clicking "Für Portal freigeben" in the dashboard and confirming the result
  appears/disappears in the patient portal) — this requires real staff JWT
  credentials that were not available and should not be fabricated. Logged as an
  open item in `docs/known-risks.md`.
- Verified via `npx tsc --noEmit` (clean in `website/`, `dashboard/`, `backend/`).
  Not live-tested beyond the metadata `curl` spot-checks above and the earlier
  dev-server walkthrough of the Datenschutz/Impressum/Kontakt/Patientenportal
  pages (unchanged by this pass, re-confirmed clean by `tsc`).

## 2026-08-04 — Visual enhancement pass (website/ only): card-grid overlay, animated stats, live hours, floating contact, scroll reveals

- **"Alle Seiten" overlay redesign** (`Navbar.tsx`): replaced the plain text
  list with a 3-column card grid ("Unsere Praxis" / "Unsere Leistungen" /
  "Patienten & Rechtliches"), each item as a bordered card with a lucide icon,
  hover lift/shadow/border-color, plus a "Direkt einen Termin buchen" CTA strip
  with the Doctolib button. Kept the existing language switcher and PraxisOS
  link in a slim utility row at the bottom — the spec's card-grid layout didn't
  mention them, but removing them would have cut off the only way mobile users
  reach the language switcher. Added two new `nav` message keys
  (`overlayCategoryLegal`, `overlayCtaBook`) to `de/en/fr.json`.
- **Live opening-hours indicator** (new `OpeningHours.tsx`): computes open/closed
  from the practice's real schedule using `Europe/Berlin` time, refreshed every
  60s. Added to the desktop navbar (compact, next to PraxisOS), the homepage
  Hero (compact, dark variant, below the CTA buttons), and the Kontakt page
  (prominent variant, above the existing hours table).
  Guarded with a mount check to avoid an SSR/client hydration mismatch on
  time-dependent content.
- **Animated stat counters** (new `StatsStrip.tsx`): 15+ years / 5.000+
  patients-per-year / 4.9★, counting up via `requestAnimationFrame` when the
  strip enters the viewport (framer-motion `useInView`, once). Inserted between
  WelcomeSection and Services on the homepage.
- **Trust badge marquee** (new `TrustStrip.tsx`): reused the existing
  `.animate-marquee` CSS keyframe (already in `globals.css`, previously unused
  elsewhere) rather than adding a new animation. Inserted after Hero, before
  the quick-action strip. See `docs/decision-log.md` — 3 of the spec's 8 badges
  were dropped as unverifiable professional/certification claims.
- **Floating contact button + back-to-top** (new `FloatingContact.tsx`,
  `BackToTop.tsx`): both moved to bottom-left instead of the spec's bottom-right
  to avoid colliding with the existing `ChatWidget`; phone number corrected to
  the real, already-used `+49263123351`. Both hidden on `/patientenportal` and
  in landing-page mode, matching how `Navbar`/`Footer`/`ChatWidget` are already
  gated in `layout.tsx`. See `docs/decision-log.md` for the full rationale.
- **Scroll-reveal animations**: added a reusable `Reveal.tsx` wrapper (fade +
  translateY, `whileInView`, once) around `TrustStrip`, `QuickActionStrip`,
  `WelcomeSection`, `PhotoStrip`, and `FinalCtaStrip` in `page.tsx`. Sections
  needing more specific motion got it inline instead of the generic wrapper:
  `Services.tsx` cards stagger in (`delay: index * 0.1`) and gained a hover
  upgrade (border-color, image zoom, arrow translateX, stronger shadow);
  `FaqSection.tsx` items stagger in (`delay: index * 0.05`); `DoctorProfile.tsx`
  slides the photo in from the left and the text in from the right. Converted
  `Services.tsx` and `DoctorProfile.tsx` from server to client components to
  support this (no server-only logic in either, so this was side-effect-free).
- Verified via `npx tsc --noEmit` (clean) and a dev-server walkthrough in the
  browser: homepage DE/EN (Hero opening-hours indicator, TrustStrip marquee,
  StatsStrip counting up to the correct final values, Services hover, overlay
  card grid in both DE and EN), and the Kontakt page's prominent opening-hours
  widget. No console errors. Did not verify the mobile single-column layout
  visually (browser automation's window resize didn't take effect in this
  session) — relying on the same `grid-cols-1 md:grid-cols-3` responsive
  pattern already used elsewhere in this codebase.
