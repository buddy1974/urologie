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
