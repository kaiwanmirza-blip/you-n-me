# YM-02B — Local API and shared contracts

Scope: local Hono/TypeScript API, Zod runtime contracts and a frontend health connection. No database, persistent session, provider, credential, generation or working journey is implemented. S-01 remains pending. Port 8787 is loopback-only; no deployment configuration is supplied.

## Run and inspect

Use Node 24 LTS and npm. From the repository root, run `npm ci` with local watchers stopped (Windows may lock dependency executables).

Terminal 1:

```powershell
npm run dev:api
```

Terminal 2:

```powershell
npm run dev -- --port 5174 --strictPort
```

Open http://127.0.0.1:5174/ and reload after API startup. Expect “Local API connected · health only. Working capabilities remain unavailable.” The frontend checks once on mount; reload to retry after starting/stopping the API. Failed or malformed health never becomes a connected state. Vite forwards `/api` to port 8787; no broad CORS policy or external proxy is enabled.

API walkthrough (PowerShell 7):

```powershell
Invoke-RestMethod http://127.0.0.1:8787/api/health
Invoke-RestMethod http://127.0.0.1:5174/api/health
$bad = Invoke-WebRequest http://127.0.0.1:8787/api/profiles -Method Post -ContentType 'application/json' -Body '{}' -SkipHttpErrorCheck
$bad.StatusCode
$bad.Content
$unavailable = Invoke-WebRequest http://127.0.0.1:8787/api/entitlements -Method Post -ContentType 'application/json' -Body '{"simulated":true,"tier":"Free","comparisonEnabled":false}' -SkipHttpErrorCheck
$unavailable.StatusCode
$unavailable.Content
```

Expected: both health calls return only `status: ok` and `service: you-n-me-api`; invalid profile is HTTP 400 / VALIDATION_ERROR; valid entitlement is HTTP 501 / CAPABILITY_UNAVAILABLE. The latter validates a proposed command, but does not apply it. No request body is echoed in errors or logged by this app.

```powershell
npm run typecheck
npm test
npm run build
# Stop dev:api first; then verify the compiled API:
npm run start:api
```

Build produces frontend `dist/` and API/shared ESM `dist-api/`, both ignored. `build:web` and `build:api` can be run separately. `preview` previews frontend assets only; its default setup does not proxy API traffic. Use the Vite dev server for the integrated connection test. A production routing integration is future work; no deployment is implied. Ctrl+C stops each process. No environment variables, keys or accounts are needed.

## Routes and error contract

| Route | Body contract | Implemented result |
| --- | --- | --- |
| GET /api/health | None | 200, validated minimal health response; no cookie, environment, versions or configuration. |
| POST /api/profiles | profileSchema | Validate, then 501; no profile saved. |
| POST /api/plan-requests | planRequestSchema | Validate eligibility/mode/inputs, then 501; no generation, including samples. |
| POST /api/plans | savedPlanSchema | Validate original envelope, then 501; no save. |
| POST /api/progress-events | progressEventSchema | Validate, then 501; no completion/undo applied. |
| POST /api/entitlements | entitlementSchema | Validate, then 501; no entitlement changed. |
| GET /api/profiles, GET /api/plans/:id | None | 501; no retrieval/session implementation. |

Unknown routes/methods return JSON 404 / NOT_FOUND. POST bodies require application/json (415 / UNSUPPORTED_MEDIA_TYPE otherwise). Malformed JSON returns 400 / INVALID_JSON; schema mismatches return 400 / VALIDATION_ERROR; over 64 KiB returns 413 / PAYLOAD_TOO_LARGE. Unexpected errors return sanitized 500 / INTERNAL_ERROR. All use `apiErrorSchema`: `{error:{code,message,issues?}}`. Validation issues contain only paths and issue codes, not submitted values. API responses use no-store. Error structures and health are parsed against shared schemas before returning. No cookies are issued; access control and CSRF protection for future persisted resources are not implemented or claimed.

## Contract conventions

`shared/contracts.ts` is storage-independent: no database IDs, owner/session tokens, Node environment or provider implementation. Exported TypeScript types are inferred from Zod schemas. Strict objects reject unknown keys, avoiding accidental collection of account/body-metric/credential fields. Inputs are not numerically coerced; optional preferences remain unspecified. Bounded string/array limits and Nutrition input ranges (1–6 meals, 1–12 servings, 1–180 prep minutes) are initial resource-validation limits, not clinical guidance; field-specific UI arrives later.

- Profiles discriminate Fitness versus Nutrition; guide is separate from fictional sample identity. Personal live requires adult eligibility. Unknown/prefer-not-to-say allergies cannot enter live Nutrition; guided/demo requires fictional inputs. Browsing is not implemented.
- Fitness contains positive-duration ordered blocks with stable IDs, explicit total work/rest/transition seconds, sets and optional repetitions. Work seconds represents the entire block including sets. Totals include warm-up, exercise and cooldown, equal the declared sum and fit the approved 15–60-minute budget. Equipment/movement identifiers are checked against inputs.
- Nutrition quantities are normalized **per recipe**, with canonical g/ml/count wire units and declared servings/portion. The future UI may display US customary/metric; normalization avoids ambiguous shopping sums. Shopping amounts must equal all recipe quantities, consolidated by ingredient ID, unit and pantry flag; no ingredient may be omitted. Substitutions describe already-applied recipe/list changes, not an alternate hidden ingredient list. Preparation and servings must agree with inputs.
- Natural-language dietary pattern, exclusion aliases, medical intent and exercise suitability cannot be fully certified by these structural checks. Exact identifier exclusions are enforced; clinical/semantic safeguards and any generation checks belong to later journey/provider work. No endpoint returns a plan on the strength of schema validation.
- Provenance discriminates guided/demo sample fixture IDs from live provider name/latency; all include original creation time. Parsed provenance is readonly/frozen. The saved envelope holds the profile snapshot, original provenance, plan/version and stable ID; input snapshots and journey must agree. `reopenSavedPlan` validates/deserializes that envelope with no current-mode parameter and cannot relabel it. This is an in-memory contract utility, not persisted retrieval or proof that a provider actually ran.
- Progress events identify plan/version/action, completion versus undo, event ID and time. Event application, ownership checks, idempotency and action-membership checks require future state and are not claimed here.
- Entitlements only allow simulated Free (comparison off) or simulated Plus (comparison on); no price, billing or real tier. Round-trip contract tests cover Free→Plus→Free; no working subscription journey is implemented.

No material product decision is changed. These wire-format conventions are engineering details within the approved specification. S-01, public pricing, licensing, sixth category and older hub retirement remain unresolved/deferred as recorded.

Implementation references consulted: [Hono Node adapter](https://hono.dev/docs/getting-started/nodejs), [Zod schema API](https://zod.dev/api). Actual installed versions are locked in package-lock.json.
