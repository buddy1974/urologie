# Known Risks

## `npm run build` fails without `RESEND_API_KEY` (pre-existing, not caused by Phase 1 reskin)

`website/src/app/api/contact/route.ts` constructs `new Resend(...)` at module load
time. If `RESEND_API_KEY` isn't set in the build environment (local `.env.local` or
Vercel project env), `next build` fails at the "Collecting page data" step for
`/api/contact` with `Error: Missing API key`.

**Confirmed:** reproduces identically on a clean `main` (verified via `git stash`
before the Phase 1 asset/token changes), so it is unrelated to this reskin.
`npx tsc --noEmit` passes clean regardless.

**How to apply:** don't treat a failing `npm run build` as a regression from
whatever change is under review unless `RESEND_API_KEY` is confirmed present in the
environment first. Fixing this (e.g. lazy-instantiating `Resend` inside the handler)
is out of scope for the reskin and hasn't been done here.
