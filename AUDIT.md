# Urologie Neuwied — Production Audit
**Date:** 2026-05-02  
**Scope:** website / backend / dashboard  
**Methodology:** Static code analysis, dependency review, env inspection, git history

---

## SEVERITY KEY
- 🔴 **CRITICAL** — Production blocker or active security breach
- 🟠 **HIGH** — Broken functionality or serious security gap
- 🟡 **MEDIUM** — Affects reliability or introduces risk
- 🔵 **LOW** — Minor issues with limited impact

---

## 1. SECURITY ISSUES

---

### [🔴 SEC-1] N8N webhook secret hardcoded and exposed in client bundle

**Location:** `dashboard/src/pages/cms/CMS.tsx:10`

```ts
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET ?? "urologie-n8n-secret-2026";
```

**Impact:** The fallback value `"urologie-n8n-secret-2026"` is compiled into the Vite JS bundle and visible to anyone in browser DevTools. This is the exact same secret that guards `/api/n8n/trigger` on the backend, meaning anyone can trigger arbitrary backend workflows (patient reminders, PSA recalls, no-show logs) without credentials.

**Minimal fix:** Remove the hardcoded fallback. Set `VITE_WEBHOOK_SECRET` as a Vercel env var for the dashboard. Rotate the current secret immediately.

```ts
// CMS.tsx line 10
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET; // no fallback
```

---

### [🔴 SEC-2] All internal backend API routes have zero authentication

**Location:** `backend/src/routes/patients.ts`, `appointments.ts`, `lab.ts`, `cms.ts`

**Impact:** Every sensitive endpoint is completely open:
- `GET /api/patients` — returns full list of all patients (name, DOB, insurance, phone, address, conditions)
- `POST /api/patients` — anyone can create patients
- `PUT /api/patients/:id` — anyone can modify any patient record
- `GET /api/lab` — returns all lab results for all patients
- `POST /api/lab` — anyone can inject lab results
- `GET/POST/PUT/DELETE /api/cms/*` — full CMS control without auth

`@fastify/jwt` is listed in `backend/package.json` but is **never registered** in `server.ts`. No `preHandler` auth hook exists on any route.

**Impact:** GDPR violation. Full patient dataset (including medical conditions, lab results) is readable by anyone who discovers the backend URL (`https://urologie-backend.onrender.com`).

**Minimal fix:** Register the JWT plugin and add a `preHandler` to all non-portal routes:

```ts
// server.ts — after cors registration
await fastify.register(import("@fastify/jwt"), { secret: process.env.JWT_SECRET! });

fastify.decorate("authenticate", async (request, reply) => {
  try { await request.jwtVerify(); }
  catch (e) { reply.status(401).send({ error: "Unauthorized" }); }
});
```

Then add `{ preHandler: [fastify.authenticate] }` to each sensitive route handler.

---

### [🔴 SEC-3] Portal patient data endpoints have no session token — any patientId returns medical data

**Location:** `backend/src/routes/portal.ts` — `GET /api/portal/results/:patientId` and `GET /api/portal/appointments/:patientId`

**Impact:** After OTP verification, the backend returns the `patient.id` (UUID) to the frontend but issues **no session token**. The frontend then calls `/api/portal/results/:patientId` with no authentication. Anyone who guesses or obtains any patient UUID can retrieve their lab results and appointments directly.

**Minimal fix:** Issue a short-lived signed JWT on successful OTP verification and require it as `Authorization: Bearer <token>` on the results and appointments endpoints.

```ts
// In verify-otp handler, after OTP validated:
const token = fastify.jwt.sign({ patientId: patient.id }, { expiresIn: "1h" });
return reply.send({ success: true, token, patient: { ... } });

// On results/appointments routes:
{ preHandler: [fastify.authenticate] }
// Then use request.user.patientId instead of request.params.patientId
```

---

### [🔴 SEC-4] Dashboard authentication is entirely client-side with hardcoded credentials in the JS bundle

**Location:** `dashboard/src/pages/auth/Login.tsx:4–9`

```ts
const DEMO_USERS = [
  { email: "dr.fomuki@urologie-neuwied.de", password: "praxis2024", ... },
  ...
];
```

**Impact:** All four staff credentials (`praxis2024` for every account) are bundled into the production Vite output and visible in DevTools. Auth state is only a Zustand store in `localStorage` — there is no backend session validation. Any user can log in by setting `praxis-auth` in localStorage directly or by reading the bundle.

**Minimal fix:** Implement a real `POST /api/auth/login` backend endpoint that validates credentials from the database and returns a JWT. Remove the `DEMO_USERS` array and the demo credential UI before production deployment.

---

### [🟠 SEC-5] Internal error details leaked to clients in all API responses

**Location:** Every route in `backend/src/routes/*.ts`

```ts
return reply.status(500).send({ error: "Database error", details: String(error) });
```

**Impact:** Full database error messages (including table names, column names, constraint names, and query fragments) are returned to any client. This leaks schema information.

**Minimal fix:** Log the error internally and return a generic message in production:

```ts
fastify.log.error(error);
return reply.status(500).send({ error: "Internal server error" });
```

---

### [🟠 SEC-6] No rate limiting on OTP request or chat API endpoints

**Location:** `backend/src/routes/portal.ts` (`POST /api/portal/request-otp`), `website/src/app/api/chat/route.ts`

**Impact:** The OTP endpoint can be abused to flood any phone number with SMS at cost. The chat endpoint can be used to exhaust the Anthropic API quota with no per-IP throttle.

**Minimal fix:** Add `@fastify/rate-limit` to the backend with a restrictive config on `/api/portal/request-otp` (e.g. 3 requests/10 min per IP). Add a per-IP check or Vercel KV rate limit on the Next.js chat route.

---

### [🟡 SEC-7] Real database credentials present in backend/.env

**Location:** `backend/.env`

```
DATABASE_URL=postgresql://neondb_owner:npg_1tTlmJSf5dnR@ep-patient-dawn-amu7h472-pooler...
JWT_SECRET=urologie-praxis-neuwied-secret-2026
```

**Impact:** The `.env` file is excluded from git by `backend/.gitignore` (confirmed). However it is present on disk in the project workspace. The JWT secret is also weak (human-readable phrase). If the workspace is ever accidentally committed or shared, the production database and all patient data are compromised.

**Minimal fix:** Rotate the Neon database password and JWT secret. Use a randomly generated 256-bit value for `JWT_SECRET`. Ensure `backend/.env` is never committed (already in `.gitignore` — no action needed there, but verify on CI).

---

## 2. FUNCTIONAL GAPS (PRODUCTION BLOCKERS)

---

### [🔴 FUNC-1] OTP SMS is never delivered — SEVEN_API_KEY is not set anywhere

**Location:** `backend/src/routes/portal.ts:38`, `backend/.env`, `backend/render.yaml`

```ts
"X-Api-Key": process.env.SEVEN_API_KEY ?? "",  // always ""
```

**Impact:** `SEVEN_API_KEY` is missing from `backend/.env` and from `render.yaml`. The portal OTP request returns `{ success: true, message: "Code gesendet" }` regardless, but the SMS call to `gateway.seven.io` is made with an empty API key and silently fails. Patients see a success message but **never receive the SMS code**. The patient portal is completely non-functional in production.

**Minimal fix:**
1. Obtain API key from seven.io
2. Add to `backend/.env`: `SEVEN_API_KEY=<key>`
3. Add to `backend/render.yaml`:
```yaml
- key: SEVEN_API_KEY
  sync: false
```
4. Add error handling to fail the request if SMS delivery fails:
```ts
const smsRes = await fetch("https://gateway.seven.io/api/sms", { ... });
if (!smsRes.ok) return reply.status(500).send({ error: "SMS konnte nicht gesendet werden" });
```

---

### [🔴 FUNC-2] AIWriteButton calls a non-existent API route `/api/ai-write`

**Location:** `dashboard/src/components/ui/AIWriteButton.tsx:14`

```ts
const res = await fetch("/api/ai-write", { ... });
```

**Impact:** This route does not exist in the website (`/api/chat/route.ts` is the only API route). The `AIWriteButton` component is used in `KiAssistent.tsx` — clicking it silently does nothing (the `if (res.ok)` check swallows the 404). Any feature using this button is broken.

**Minimal fix:** Create `website/src/app/api/ai-write/route.ts` (similar to the existing chat route) that handles the `{ input, field }` body format. Or correct the fetch URL to `/api/chat` and adapt the payload format.

---

### [🔴 FUNC-3] Dashboard KiAssistent calls `/api/chat` as a relative path — wrong domain

**Location:** `dashboard/src/pages/ki-assistent/KiAssistent.tsx:103`

```ts
const response = await fetch("/api/chat", { ... });
```

**Impact:** The dashboard is a Vite SPA deployed separately (e.g. Vercel SPA). `/api/chat` is a Next.js API route on the website domain. A relative path from the dashboard domain resolves to the dashboard's own origin and 404s. The KI Assistent feature is non-functional.

**Minimal fix:** Replace the relative path with the absolute website URL:
```ts
const response = await fetch("https://urologie-neuwied.de/api/chat", { ... });
```
Add the dashboard domain to CORS if needed on the website.

---

### [🟠 FUNC-4] Website chat widget will fail in production — ANTHROPIC_API_KEY is a placeholder

**Location:** `website/.env.local`

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Impact:** `website/.env.local` is correctly excluded from git, but it contains only a placeholder value. The deployed website on Vercel needs this env var set in the Vercel project settings. If not set, every chat request returns a 500 error.

**Minimal fix:** Set `ANTHROPIC_API_KEY` in Vercel project settings → Environment Variables for the website.

---

### [🟠 FUNC-5] Google Maps embed uses a placeholder/fake Place ID

**Location:** `website/src/app/[locale]/kontakt/page.tsx:131`

```
0x47be6b4e4e4e4e4e%3A0x1
```

**Impact:** This is a synthetic/fake Google Maps place ID (the repeated `4e` pattern is a placeholder). The embedded map may fail to load or show a wrong/generic location rather than the actual practice address.

**Minimal fix:** Get the real embed URL from Google Maps by searching for "Dierdorfer Str. 115-117, 56564 Neuwied", clicking Share → Embed a map, and replacing the current `src` value.

---

## 3. BUILD ISSUES

---

### [🟠 BUILD-1] `@types/react-router-dom@^5.3.3` conflicts with `react-router-dom@^7.13.2`

**Location:** `dashboard/package.json:20,30`

```json
"react-router-dom": "^7.13.2",
"@types/react-router-dom": "^5.3.3"
```

**Impact:** React Router v7 ships its own TypeScript types. The `@types/react-router-dom` v5 package is incompatible and will cause type conflicts (`Navigate`, `useNavigate`, `Outlet` type shapes differ between v5 and v7). Currently TypeScript is passing only because `skipLibCheck: true` masks the collision — it will surface as a runtime type mismatch if any typed imports from the `@types` package are used.

**Minimal fix:** Remove the stale types package:
```
npm remove @types/react-router-dom --save-dev
```

---

### [🟡 BUILD-2] `@neondatabase/serverless` is a dependency of the dashboard but never imported

**Location:** `dashboard/package.json:13`

```json
"@neondatabase/serverless": "^1.0.2"
```

**Impact:** Dead dependency that adds ~200KB to the build output unnecessarily. The dashboard only communicates with the backend via REST — direct DB access from the browser would be a security violation.

**Minimal fix:**
```
npm remove @neondatabase/serverless
```

---

### [🟡 BUILD-3] Backend `tsconfig.json` uses `ignoreDeprecations: "6.0"` — non-standard version flag

**Location:** `backend/tsconfig.json:6`

```json
"ignoreDeprecations": "6.0"
```

**Impact:** This flag is only recognized for the TypeScript version it targets. It suppresses deprecation warnings that may surface as hard errors when the TypeScript version changes. Currently suppressed warnings may represent real compilation issues.

**Minimal fix:** Remove `"ignoreDeprecations": "6.0"` and resolve the underlying deprecation warnings explicitly.

---

## 4. MISSING ENVIRONMENT VARIABLES IN DEPLOYMENT CONFIG

---

### [🔴 ENV-1] `render.yaml` is missing critical env vars — backend will malfunction in production

**Location:** `backend/render.yaml`

Currently defined: `DATABASE_URL`, `NODE_ENV`  
**Missing from render.yaml:**

| Variable | Used in | Effect if missing |
|---|---|---|
| `ANTHROPIC_API_KEY` | `cms.ts` AI enhance | CMS AI feature fails silently |
| `JWT_SECRET` | (intended for auth) | No JWT signing possible |
| `N8N_WEBHOOK_SECRET` | `n8n.ts`, `cms.ts` | n8n trigger and CMS AI enhance both return 401 |
| `SEVEN_API_KEY` | `portal.ts` | OTP SMS never delivered (see FUNC-1) |
| `BACKEND_URL` | `cms.ts` media upload URL | Uploaded media URLs point to `localhost:3002` |

**Minimal fix:** Add all five to `render.yaml`:
```yaml
- key: ANTHROPIC_API_KEY
  sync: false
- key: JWT_SECRET
  sync: false
- key: N8N_WEBHOOK_SECRET
  sync: false
- key: SEVEN_API_KEY
  sync: false
- key: BACKEND_URL
  value: https://urologie-backend.onrender.com
```

---

## 5. RUNTIME ISSUES

---

### [🟠 RUNTIME-1] `dashboard/.env.development` and `.env.production` are committed to git

**Location:** `dashboard/.env.development`, `dashboard/.env.production` (confirmed via `git ls-files`)

**Impact:** These files are tracked in the repository. Currently they only contain `VITE_API_URL` (not secrets), but any future addition of secret values to these files will be committed immediately. This is contrary to `.env` best practice.

**Minimal fix:** Add to `dashboard/.gitignore`:
```
.env.development
.env.production
```
Then remove from tracking:
```
git rm --cached dashboard/.env.development dashboard/.env.production
```

---

### [🟡 RUNTIME-2] Uploaded media URLs hardcode `localhost:3002` if `BACKEND_URL` is unset

**Location:** `backend/src/routes/cms.ts` media upload handler

```ts
const baseUrl = (process.env.BACKEND_URL ?? `http://localhost:${process.env.PORT ?? 3002}`).replace(/\/$/, "");
const url = `${baseUrl}/uploads/${safeName}`;
```

**Impact:** If `BACKEND_URL` is not set in the Render environment, all uploaded CMS media records are stored with `http://localhost:3002/uploads/...` as their URL. These URLs are unusable in production and will result in broken images on the website.

**Minimal fix:** Set `BACKEND_URL=https://urologie-backend.onrender.com` in `render.yaml` (covered in ENV-1).

---

## SUMMARY TABLE

| ID | Severity | Area | One-line description |
|---|---|---|---|
| SEC-1 | 🔴 CRITICAL | Dashboard | Webhook secret hardcoded in client JS bundle |
| SEC-2 | 🔴 CRITICAL | Backend | Zero auth on all patient/medical data routes |
| SEC-3 | 🔴 CRITICAL | Backend | Portal results/appointments accessible with only a patientId |
| SEC-4 | 🔴 CRITICAL | Dashboard | Credentials hardcoded in bundle, auth is localStorage-only |
| SEC-5 | 🟠 HIGH | Backend | Full DB error details returned to clients |
| SEC-6 | 🟠 HIGH | Backend/Website | No rate limiting on OTP or chat endpoints |
| SEC-7 | 🟡 MEDIUM | Backend | Weak JWT secret and real DB credentials in .env file |
| FUNC-1 | 🔴 CRITICAL | Backend | SEVEN_API_KEY not set — OTP SMS never delivered, portal broken |
| FUNC-2 | 🔴 CRITICAL | Dashboard | `/api/ai-write` route does not exist — AIWriteButton broken |
| FUNC-3 | 🔴 CRITICAL | Dashboard | KiAssistent chat calls `/api/chat` relative — wrong domain, 404 |
| FUNC-4 | 🟠 HIGH | Website | `ANTHROPIC_API_KEY` is a placeholder in `.env.local` |
| FUNC-5 | 🟠 HIGH | Website | Google Maps embed uses fake/placeholder place ID |
| BUILD-1 | 🟠 HIGH | Dashboard | `@types/react-router-dom` v5 conflicts with react-router-dom v7 |
| BUILD-2 | 🟡 MEDIUM | Dashboard | `@neondatabase/serverless` unused dependency in dashboard |
| BUILD-3 | 🟡 MEDIUM | Backend | `ignoreDeprecations: "6.0"` in tsconfig suppresses real errors |
| ENV-1 | 🔴 CRITICAL | Backend | `render.yaml` missing 5 required env vars |
| RUNTIME-1 | 🟠 HIGH | Dashboard | `.env.development` + `.env.production` committed to git |
| RUNTIME-2 | 🟡 MEDIUM | Backend | Media upload URLs will be localhost if `BACKEND_URL` unset |

---

## RECOMMENDED RESOLUTION ORDER

1. **SEC-2** — Add JWT auth to all backend routes (unlocks SEC-3 fix path)
2. **FUNC-1 + ENV-1** — Set `SEVEN_API_KEY` and all missing env vars in `render.yaml`
3. **SEC-1** — Rotate webhook secret, remove hardcoded fallback
4. **SEC-3** — Issue session token on OTP verify, validate on portal data routes
5. **SEC-4** — Replace frontend-only auth with real backend login endpoint
6. **FUNC-2 + FUNC-3** — Create `/api/ai-write` route; fix KiAssistent to call correct domain
7. **FUNC-4** — Set `ANTHROPIC_API_KEY` in Vercel project settings
8. **FUNC-5** — Replace placeholder Google Maps embed URL
9. **SEC-5** — Strip error details from API responses
10. **BUILD-1** — Remove `@types/react-router-dom`
11. **RUNTIME-1** — Untrack env files from git
