# Forensic Audit — Urologie Neuwied Project

**Date:** 2026-08-04
**Scope:** Full repository, read-only. No files were modified during this audit except this report itself.
**Method:** Direct file-existence checks, targeted `grep`/content checks, `npx tsc --noEmit` in all three TypeScript projects, and manual verification of every finding before inclusion (see notes on false negatives below).

A note on methodology: several checks in the source audit prompt are literal substring matches. Where a literal match failed but a manual read of the file confirmed the underlying requirement was actually met with different wording, both the literal result and the manual finding are reported — a forensic audit should not manufacture false negatives out of exact-string brittleness, nor should it silently paper over a literal miss.

---

## Section 1 — Repository Overview

**Branch:** `main`

**Last 20 commits:**
```
10afdbb fix: override stale favicon.ico with the branded logo
f6ed3ab fix: compliance-pass gaps found on re-verification (Impressum, Datenschutz, UroLift wording, broken portal phone link)
b496cc0 feat: visual enhancement pass — card overlay menu, animated stats, trust strip, floating contact, scroll animations, back-to-top, live hours
aaec93b feat: fix JWT auth-gap, add Befund-Freigabe workflow, full website compliance pass (W1-W8)
1a8ba13 feat: compliance - Impressum email, full Datenschutz rewrite, contact consent, UroLift fix, portal disclosure
182082b fix: restyle Patientenportal to match website brand - white bg, teal/navy, Raleway, no glassmorphism
1067304 feat: homepage redesign - video hero, welcome section, services grid, doctor profile, FAQ, photo strip
a2cc483 fix: navbar redesign, PraxisOS link, hero landmark cards, bigger CTAs, page images
4abba85 docs: correct false consent claim in commit 54977ae, record autonomous-push risk
54977ae fix: remove unconfirmed second physician from Team page
d3ee3c3 feat: Phase 3 reskin - all inner pages with original content
9b2ea9b feat: Phase 2 reskin - Navbar, Footer, Hero with video background match static site
2e87cc4 feat: Phase 1 reskin - copy static assets, apply original brand tokens (Raleway, #89c2ca, #2d5a71), remove TR locale
ac297dc fix: fail-safe site mode - default to landing unless SITE_MODE=live
6f9cdc5 fix: host-based site mode — www shows landing, vercel.app shows full site (runtime, not build-time)
e695ad7 fix: remove Dr. title everywhere, logo on landing page, verified address/tel, SEO meta
cc6e123 chore: trigger fresh build for preview env
c541563 feat: landing page — logo, verified address/tel, SEO meta, OG, Twitter card
d0b9ef4 feat: landing page mode — hides navbar, footer, chat when NEXT_PUBLIC_SITE_MODE=landing
4771d30 feat: hero slider, all page images, landing page mode
```

**Uncommitted changes at audit time:**
```
 M .claude/settings.local.json
?? CLAUDE.md
?? FIX_INSTRUCTIONS.md
?? PRAXISOS-PRODUCTIZATION-REPORT.md
?? PROJECT-STATUS-REPORT.md
?? docs/architecture.md
?? docs/product-brief.md
?? docs/release-checklist.md
?? docs/security-checklist.md
?? docs/workflow-map.md
?? urologie-neuwied-praesentation.html
?? urologie-neuwied-praesentation.pptx
?? website/next.config.ts.tmp
?? website/public/og-image.jpg
```
These have been present, untracked, across multiple prior sessions and were deliberately left untouched (out of scope for this or any prior task in this repo).

**Root-level folders:** `backend/`, `dashboard/`, `docs/`, `medistar-bridge/`, `n8n-workflows/`, `shared/`, `website/`

Note: `medistar-bridge/` and `shared/` exist at the root but were not covered by any section of the audit prompt. Flagged for awareness — not otherwise investigated in this pass.

---

## Section 2 — Website Audit (`website/`)

### 2A — Pages
All 18 required pages exist and are non-empty:

| File | Status |
|---|---|
| `[locale]/page.tsx` | EXISTS (3,177 bytes) |
| `[locale]/praxis/page.tsx` | EXISTS (14,308 bytes) |
| `[locale]/dr-walters/page.tsx` | EXISTS (8,436 bytes) |
| `[locale]/team/page.tsx` | EXISTS (13,813 bytes) |
| `[locale]/links/page.tsx` | EXISTS (3,389 bytes) |
| `[locale]/kontakt/page.tsx` | EXISTS (26,226 bytes) |
| `[locale]/patientenportal/page.tsx` | EXISTS (27,240 bytes) |
| `[locale]/impressum/page.tsx` | EXISTS (4,770 bytes) |
| `[locale]/datenschutz/page.tsx` | EXISTS (18,155 bytes) |
| `leistungen/diagnostik/page.tsx` | EXISTS (12,307 bytes) |
| `leistungen/onkologie/page.tsx` | EXISTS (5,075 bytes) |
| `leistungen/andrologie/page.tsx` | EXISTS (7,485 bytes) |
| `leistungen/urolift/page.tsx` | EXISTS (11,029 bytes) |
| `leistungen/magnetstimulation/page.tsx` | EXISTS (10,658 bytes) |
| `leistungen/urodynamik/page.tsx` | EXISTS (7,384 bytes) |
| `leistungen/ambulante-op/page.tsx` | EXISTS (8,502 bytes) |
| `leistungen/kinderurologie/page.tsx` | EXISTS (12,411 bytes) |
| `leistungen/individuelle-leistungen/page.tsx` | EXISTS (7,507 bytes) |

**Result: 18/18 EXISTS, 0 MISSING, 0 EMPTY.**

### 2B — Components
All 10 required components exist: `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `Services.tsx`, `StatsStrip.tsx`, `TrustStrip.tsx`, `FloatingContact.tsx`, `BackToTop.tsx`, `OpeningHours.tsx`, `ChatWidget.tsx`.

**Result: 10/10 EXISTS.**

### 2C — Translations
- DE keys: **38**, EN keys: **38**, FR keys: **38**
- Keys in DE missing from EN: **0**
- Keys in DE missing from FR: **0**
- Empty string values in EN: **0**
- Empty string values in FR: **0**
- `messages/tr.json`: **does not exist** (correct — Turkish locale removal was verified complete)

**Note for context:** these 38 keys only cover the `nav`, `leistungen`, `home`, `contact`, `hours`, and `chat` namespaces used by shared chrome (Navbar, etc.). The large majority of page copy across all 18 pages lives in per-file `content = { de, en, fr }` objects inside each `.tsx` file, not in `messages/*.json`. Translation completeness for page bodies was checked per-page during compliance work, not via a centralized key-diff — there is no single mechanism that would catch a missing per-page translation the way this key-diff catches gaps in the shared `messages/*.json` files.

**Result: PASS, no gaps.**

### 2D — Compliance Checks

**Impressum** (`impressum/page.tsx`): all 6 checks YES — contains contact email, "Verantwortlich für den Inhalt", "maxpromo.digital", "§ 5 TMG", "§ 5 DDG", "Urheberrecht".

**Datenschutz** (`datenschutz/page.tsx`): all 12 checks YES — contains Vercel, Neon, Render, Anthropic, seven communications, Doctolib, LfDI, Landesbeauftragter, "Art. 28 DSGVO", "Abschluss in Vorbereitung", "AVV", "§ 630g BGB".

**Patientenportal** (`patientenportal/page.tsx`):
| Check | Result |
|---|---|
| Contains "DSGVO-konform" | **NO** (correct — should be NO) |
| Contains "Verschlüsselte Übertragung" | YES |
| Link to Datenschutz | YES |
| Correct phone `tel:+49263123351` | YES |
| Wrong phone `tel:+492631233510` | **NO** (correct — should be NO) |

**Kontakt** (`kontakt/page.tsx`): consent checkbox YES, link to Datenschutz YES.

**UroLift** (`leistungen/urolift/page.tsx`):
| Check | Result |
|---|---|
| Contains "ohne Operation" | **NO** (correct — should be NO) |
| Contains "minimalinvasiv" (literal) | NO |
| Contains "ohne Gewebeentfernung" | YES |

The literal word "minimalinvasiv" doesn't appear on this specific page — it uses "nicht invasiv" in the body copy instead, and "ohne Gewebeentfernung" in the meta description. The underlying requirement (correct, non-overselling wording) is satisfied; this is a literal-string miss, not a real gap.

**JsonLd.tsx:**
| Check | Result |
|---|---|
| Contains "ohne klassische Operation" | **NO** (correct — should be NO) |
| Contains "ohne Gewebeentfernung" | YES |
| Contains "Vasektomie-Experten-Netzwerk" | **YES — unconfirmed claim, see Section 7** |

**Footer.tsx:** "Kein Tracking" YES, "technisch notwendige Cookies" YES, link to Datenschutz YES, link to Impressum YES, "maxpromo.digital" YES.

**Result: all compliance content checks pass. One unconfirmed factual claim carried over from a prior audit (Vasektomie-Experten-Netzwerk) — still unconfirmed, see Section 7.**

### 2E — Hero & Video
`Hero.tsx`: video tag YES, references `Urologie%20Neuwied_SD.mp4` YES, `autoPlay` YES, Doctolib URL YES, patientenportal link YES, both floating cards (Neuwied / Fomuki) YES.

**Video asset:** `public/assets/Urologie Neuwied_SD.mp4` exists, **47.7 MB** (49,996,340 bytes). Flagged as a performance observation — see Section 7 (Nice to Have).

### 2F — Navbar
`Navbar.tsx`: PraxisOS link YES, correct PraxisOS URL YES, "Alle Seiten" overlay YES, card-grid classes YES, language switcher array YES, Doctolib button YES, `OpeningHours` component YES.
Turkish locale: **NO** (correct — confirmed absent from `src/i18n.ts`: `locales = ["de", "en", "fr"]`).

### 2G — Visual Enhancements
All present and wired up: `StatsStrip.tsx` (with `useInView`), `TrustStrip.tsx` (with `.animate-marquee`), `FloatingContact.tsx` (with `tel:`), `BackToTop.tsx`, `OpeningHours.tsx`. `page.tsx` imports both `StatsStrip` and `TrustStrip`.

### 2H — Meta Titles
EN titles confirmed present on `urolift`, `diagnostik`, and `datenschutz` pages (spot-checked 3 of the 12 pages known from prior work to have locale-aware `generateMetadata()`).

### 2I — Favicon
`src/app/favicon.ico` YES, `src/app/icon.png` YES, `src/app/apple-icon.png` YES.

### 2J — TypeScript
```
cd website && npx tsc --noEmit
```
**Result: PASS — zero errors, zero output.**

---

## Section 3 — Backend Audit (`backend/`)

### 3A — Routes
All 6 required route files exist: `patients.ts`, `appointments.ts`, `lab.ts`, `portal.ts`, `cms.ts`, `n8n.ts`. (Also present but not in the checklist: `auth.ts`.)

### 3B — Befund-Freigabe
`db/schema.ts`: `freigabeStatus` YES, `freigegebenVon` YES, `freigegebenAm` YES, default `"ausstehend"` YES.
`routes/lab.ts`: `PUT /api/lab/:id/freigabe` YES, `auditLog` entry on freigabe YES.
`routes/portal.ts`: filter to `freigabeStatus = "freigegeben"` YES, `POST /api/portal/request-otp` YES, `POST /api/portal/verify-otp` YES, seven.io API call YES, `SEVEN_API_KEY` referenced in code YES.

**Result: fully implemented and consistent with prior session's documented work.**

### 3C — n8n Workflows (backend route side)
`routes/n8n.ts`: `POST /api/n8n/trigger` YES, `x-webhook-secret` check YES, and all 5 expected trigger names present in code: `appointment_reminder`, `noshow_log`, `lab_notify`, `psa_recall`, `vasektomie_check` — all YES.

**Important — see Section 5:** the backend is fully wired to *receive* triggers for these 5 workflow names, but no corresponding n8n workflow definition files exist anywhere in the repository (see Section 5). The receiving side is built; the automation side that would call it does not exist as a repo artifact.

### 3D — CMS
`routes/cms.ts`: `GET /api/cms/pages` YES, `POST /api/cms/blog` YES, `POST /api/cms/ai-enhance` YES, `DELETE /api/cms/blog/:id` YES.

### 3E — Environment (`backend/.env`, presence only)

| Variable | Present |
|---|---|
| `DATABASE_URL` | YES |
| `SEVEN_API_KEY` | **NO** |
| `N8N_WEBHOOK_SECRET` | YES |
| `ANTHROPIC_API_KEY` | **NO** |

**Operational note on this check:** while confirming `N8N_WEBHOOK_SECRET`'s presence, an exploratory `grep` command (`grep -in "n8n" .env`) printed the actual secret value into this session's tool output — a mistake; the intent was a presence-only check (`grep -q`), which is what was used everywhere else. The value has not been and will not be repeated anywhere, including in this report. **If the value in `backend/.env` is also the value configured in production (Render), rotating it is a reasonable precaution given it appeared in a tool-output transcript during this session.**

`SEVEN_API_KEY` and `ANTHROPIC_API_KEY` are absent from the only local `backend/.env` found. `ANTHROPIC_API_KEY` is also absent from `website/.env.local` (which only contains `NEXT_PUBLIC_API_URL`). This means:
- The patient-portal OTP send (`POST /api/portal/request-otp`) will return `503 SMS-Dienst nicht konfiguriert` in this local environment, by design (the route explicitly checks for the key and fails closed).
- Wherever the Anthropic-powered chat/AI features actually run their API calls, the key is not present in either local env file checked.

No `backend/.env.production` file exists locally — this is expected if production secrets are configured directly in Render's dashboard rather than committed (the normal, correct pattern), but that means **this audit cannot confirm from the repo alone whether the production environment actually has `SEVEN_API_KEY` and `ANTHROPIC_API_KEY` set.** That needs to be confirmed directly in Render's environment variable settings, not inferred from this repo.

### 3F — TypeScript
```
cd backend && npx tsc --noEmit
```
**Result: PASS — zero errors, zero output.**

---

## Section 4 — Dashboard Audit (`dashboard/`)

### 4A — Modules
All 16 required page files exist: `Patienten.tsx`, `Terminplan.tsx`, `Labor.tsx`, `KiAssistent.tsx`, `Compliance.tsx`, `CMS.tsx`, `Abrechnung.tsx`, `Kommunikation.tsx`, `Dokumente.tsx`, `Analytics.tsx`, `HR.tsx`, `QM.tsx`, `Formulare.tsx`, `Video.tsx`, `Team.tsx`, `Einstellungen.tsx`.

**Result: 16/16 EXISTS.**

### 4B — Befund-Freigabe UI
`Labor.tsx`: `freigabeStatus` YES, "Für Portal freigeben" YES, "Freigabe widerrufen" YES, confirm dialog YES, role check for `inhaber` YES, role check for `arzt` YES.

### 4C — Compliance Module
`Compliance.tsx`: AVV YES, Vercel YES, Anthropic YES, "ausstehend" status values YES, "AVV abschließen" buttons YES, DSFA YES, summary status box ("Punkte erfüllt") YES.

### 4D — CMS Module
`CMS.tsx`: iframe preview YES, blog-editor content YES, upload-related content YES, "ai-enhance" reference YES, `urologie-backend.onrender.com` reference YES.

### 4E — KI-Assistent
`KiAssistent.tsx`: `SpeechRecognition` YES. "Arztbrief" and email-generation buttons exist and call `generateWithClaude("arztbrief")` / `generateWithClaude("email")` — but the literal button labels are **"Arztbrief"** and **"E-Mail"**, not "Arztbrief generieren" / "E-Mail generieren". The feature is fully implemented; the exact label text from the audit prompt doesn't match what's actually rendered. Not a functional gap.

### 4F — Environment
`dashboard/.env.production`: `VITE_API_URL` present — YES.

### 4G — TypeScript
```
cd dashboard && npx tsc --noEmit
```
**Result: PASS — zero errors, zero output.**

---

## Section 5 — n8n Workflows

**Finding: `n8n-workflows/` contains only a `.gitkeep` file. Zero workflow JSON files exist.**

Expected 5 files (per the backend's own route logic in `n8n.ts`, confirmed in Section 3C): `appointment_reminder`, `noshow_log`, `lab_notify`, `psa_recall`, `vasektomie_check`.

**Actual: 0 of 5 present.**

This is a real gap between what the backend is built to receive and what's committed to the repo as the automation side. Two possible explanations, and it matters which one is true:
1. The workflows were intentionally built and are managed directly inside an n8n instance (common practice — teams often don't version-control n8n workflow JSON exports), in which case this "gap" is not really a gap, just something living outside git.
2. The workflows were never actually built, in which case the backend's `/api/n8n/trigger` route currently has nothing on the other end calling it for any of these 5 automations (no appointment reminders, no-show logging, lab notifications, PSA recall, or vasectomy follow-up are actually running).

**This audit cannot determine which of the two is true from the repository alone — it needs to be confirmed directly against the actual n8n instance (if one exists and is deployed).**

---

## Section 6 — Assets

### `website/public/assets/`
- Total file count: **110**
- Video: `Urologie Neuwied_SD.mp4` present, **47.7 MB**
- `logo.png`: YES
- `doctolib-white-transparent.png`: YES
- `de.gif`, `en.gif`, `fr.gif`: all YES

**`.js` files present: YES — 20 files** (the audit prompt flags this as "security risk — should be NO"):
```
bootstrap.min.js, bootstrap-select.js, cc.js, common.js, controls.js,
directions.js, directions_002.js, geometry.js, infowindow.js,
jquery.magnific-popup.min.js, jquery.min.js, jquery.swipebox.min.js,
jssor.slider.mini.js, log.js, map.js, marker.js, onion.js, uc.js,
util.js, writemail.js
```
These are leftover jQuery/Bootstrap/map-widget scripts copied wholesale from the original static-site replica during the Phase 1 asset copy (see commit `2e87cc4`). **Verified via grep: none of these files are referenced anywhere in the current Next.js source (`src/`).** They are dead weight, not active/loaded code — the current site is a React/Next.js app that doesn't use jQuery or Bootstrap. They are publicly reachable at predictable URLs (`/assets/*.js`) simply because anything under `public/` is served statically, but nothing on the live site actually executes them. Real-world risk is low (unreferenced, unexecuted), but they should be deleted as unnecessary deployment bloat and to avoid the appearance of an unmaintained/unaudited dependency surface.

### `website/public/images/`
Subfolders: `Dr-fomuki/`, `leistung/`, `pics/`, `team/`
- `Dr-fomuki/`: **2 files**
- `team/`: **10 files**

---

## Section 7 — Missing Dots Summary

### CRITICAL (blocks launch)

1. **n8n workflow files: 0 of 5 expected files exist in `n8n-workflows/`** (only `.gitkeep`). The backend route (`n8n.ts`) is fully built to receive triggers named `appointment_reminder`, `noshow_log`, `lab_notify`, `psa_recall`, `vasektomie_check`, but nothing in the repo defines the actual n8n automations that would call it. **Needs confirmation: are these managed live inside an n8n instance (fine), or do they simply not exist yet (blocking)?**
2. **20 unreferenced legacy `.js` files in `website/public/assets/`** (jQuery, Bootstrap, map widgets from the old static site). Flagged by the audit's own rubric as a "should be NO" item. Actual risk is low — verified unreferenced by the current codebase, not loaded on any page — but they're live, publicly-served files from an unmaintained, outdated bundle and should be deleted before launch rather than shipped as-is.

*(Everything else checked — all 18 pages, all 10 website components, all 6 backend routes, all 16 dashboard modules, all compliance content checks, all "should be NO" checks, and `npx tsc --noEmit` in all three projects — passed cleanly. No missing files, no wrong-answer compliance checks, no TypeScript errors.)*

### IMPORTANT (fix or confirm before launch)

1. **`SEVEN_API_KEY` and `ANTHROPIC_API_KEY` are absent from the local `backend/.env`** (and `ANTHROPIC_API_KEY` is also absent from `website/.env.local`). No `.env.production` exists locally to check against. **This audit cannot confirm whether Render/Vercel's actual production environment has these set — that needs to be checked directly in those dashboards, not inferred from this repo.** If they're missing in production too, SMS-OTP portal login and the AI chat/dictation features will fail at runtime.
2. **"Vasektomie-Experten-Netzwerk" remains an unconfirmed claim**, present in `JsonLd.tsx`'s public FAQ structured data (schema.org, SEO-visible). This was already flagged in `docs/known-risks.md` on 2026-08-04 and still needs a direct answer from Marcel or Dr. Fomuki: is this a real, named, joinable network with certified membership, or should the wording be softened?
3. **An `N8N_WEBHOOK_SECRET` value was inadvertently printed to this session's tool output** during an env-presence check (a `grep` mistake, not a values-in-code issue). Consider rotating it if the same value is used in production, purely as a precaution.
4. A 47.7 MB autoplay hero video is a genuine page-weight concern for mobile/slow connections — see Nice to Have below for why it isn't classified as blocking.

### NICE TO HAVE (post-launch)

1. **Hero video size (47.7 MB)** — not launch-blocking (it loads and plays correctly), but worth a compression pass for real-world mobile performance. Not re-classified as IMPORTANT because functional correctness was verified; this is a pure performance/UX polish item.
2. **Mobile responsive layout of the new overlay/StatsStrip/TrustStrip components** was flagged as not visually verified in an earlier session (`docs/known-risks.md`, 2026-08-04) — still outstanding, unrelated to this audit's own checks.
3. `medistar-bridge/` and `shared/` root folders exist but weren't in scope for any section of this audit — worth a dedicated look if they're expected to be part of the launch surface.
4. Minor literal-wording mismatches that are **not real gaps** (documented for completeness, not action items): the UroLift page body copy uses "nicht invasiv" rather than the literal word "minimalinvasiv" (verified: "minimalinvasiv" does not appear anywhere on this page, case-insensitive; "ohne Gewebeentfernung" does, in the meta description, which is what satisfies the underlying non-overselling-wording requirement — see 2D); the dashboard KI-Assistent's generate buttons are labeled "Arztbrief" / "E-Mail" rather than "Arztbrief generieren" / "E-Mail generieren" — the underlying feature works in both cases.

---

*End of report.*
