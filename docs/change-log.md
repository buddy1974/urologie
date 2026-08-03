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
