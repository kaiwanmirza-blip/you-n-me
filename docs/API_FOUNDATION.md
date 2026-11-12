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


## Additive next-generation deterministic preview API

The new contracts and endpoints supplement, rather than widen, the existing schemas. Legacy profiles still accept Jane/Kay only; existing Fitness/Nutrition plans, saved envelopes, provenance, entitlements, errors and unavailable routes retain their contracts. `Both`, measurements and Fashion are separate exported contracts. The frontend/native files are not integrated with these routes.

Start locally with `npm run dev:api` (http://127.0.0.1:8787). In a second PowerShell terminal:

```powershell
$intake = @{
  guideSelection = 'Both'
  mode = 'demo'
  journey = 'fitness'
  userMessage = 'motivation: Build consistency; equipment: dumbbells; exclusions: none; I have 30 minutes'
} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8787/api/intake/converse -ContentType 'application/json' -Body $intake

$baseline = @{
  dayIndex = 0; recordedAt = '2026-01-01T00:00:00Z'; photoCheckInCompleted = $true
  measurements = @{waistCm=90; chestCm=100; shouldersCm=110; hipsCm=100; armCm=30; thighCm=55; calfCm=35; scaleWeightKg=80}
}
$latest = @{
  dayIndex = 14; recordedAt = '2026-01-15T00:00:00Z'; photoCheckInCompleted = $true
  measurements = @{waistCm=88; chestCm=100; shouldersCm=110; hipsCm=100; armCm=30; thighCm=55; calfCm=35; scaleWeightKg=80}
}
$assessment = @{baseline=$baseline; latest=$latest; checkInDay=14; checkInDue=$true; mode='demo'} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8787/api/recomp/assess -ContentType 'application/json' -Body $assessment
```

Intake returns `userMessage`, `guideSelection`, `journey`, `memoryChips`, `readiness`, `guideResponses` and explicit sample provenance. Jane/Kay solo means exactly one matching response; Both means one distinct response from each. Default journey is fitness, default mode demo. Only guided/demo are accepted; live returns a validation error, never a silent sample fallback.

Extraction is a limited deterministic parser, not natural-language AI: semicolon/newline-separated `key: value` clauses recognize occasion, motivation, equipment, exclusions, dietaryPattern, pantryItems, dressCode and scentPreference. Array values are comma-separated, with explicit `none` represented by an empty array. One unambiguous whole-minute phrase (1–180 minutes) supplies duration; invalid/multiple duration phrases clear a previous duration chip. Other prose remains only in userMessage. Optional `memoryChips` can carry caller-reviewed fields forward; the server retains nothing. Unsupported/oversized clauses are not extracted. Explicit client chips are strictly validated.

Intake readiness means fields are present for review, **not** program generation or medical/allergy/eligibility clearance. Required chip sets: Fitness motivation/duration/equipment/exclusions; Nutrition motivation/duration/dietaryPattern/pantryItems/exclusions; Fashion occasion/dressCode. These deterministic preview defaults do not replace the legacy journey input validators. Optional preference chips do not block readiness. Broader conversational/guide behavior acceptance remains G-01.

Recomposition request requires a Day Zero baseline, assessed positive `checkInDay`, explicit `checkInDue`, and optional latest measurement entry. All seven circumference values must be positive; scale weight is optional. Latest must follow baseline in day index and timestamp, and cannot be after checkInDay. Missing latest is valid for a missed measurement check-in; malformed/partial entries are invalid. Dates and schedule are supplied by the caller: this endpoint is not a scheduler or an ownership/persistence boundary. Use fictional local examples pending personal-data review.

Illustrative heuristic: waist change <= -1 cm and weight change within +/-0.5 kg flags `possible-recomposition`. Missing entry/weight produces `insufficient-data`; otherwise the result is `no-pattern-detected`. This does **not** establish fat loss or lean muscle gain, estimate tissue masses, analyze photographs or provide a clinical assessment. Thresholds are documented engineering defaults for this sample, not medically validated product rules. Output includes input snapshots, waist/weight deltas, interpretation and sample provenance. Output validation checks computed fields against inputs.

For one due periodic check-in, missing current-day measurements or an incomplete photo flag yields `checkInStarImpact: -1` exactly once, even if both are missing. A complete or not-yet-due check-in yields 0. A missing Day Zero photo alone does not penalize a later completed check-in. No cumulative deduction, star-score mutation or change to the existing 70/20/10 frontend occurs; callers must not accumulate repeated assessments as separate penalties. No photos, URLs or image data are accepted.

Fashion is a schema only: occasion, venueType, weather, primaryOutfit and alternateOutfit are strings; accessories and fragrance notes are string arrays; fragranceProfile includes scentFamily/notes/applicationTip. groomingChecklist requires deodorantAntiperspirantTiming, garmentCare and hygieneReminders. No fashion generation endpoint or live scent/grooming advice was added. `muscleGroupSchema` lists twelve groups but does not alter legacy exercise/plan payloads or render a map.

Both new routes use the existing 64 KiB limit, no-store response headers and sanitized JSON/media/validation/internal errors. They return no session cookie, make no provider calls and save no data. Existing `/api/plan-requests`, `/api/plans`, profiles, progress and entitlement capabilities still return 501 after validation. No persistence, paid services or cloud synchronization is included.


## v0.8 Persona Studio token evaluation

`globalHeritageSchema` enumerates south_asian, latin_american, african, mediterranean, east_asian, southeast_asian, swana, pacific_islander, indigenous and central_asian. `personaWardrobeSelectionSchema` validates the requested top/bottom categories, nonempty item/accessory labels and head/full shot selection. These contracts do not modify legacy profiles or represent a live image-generation service.

`POST /api/persona/token-eval` accepts action (`evaluate`, `claim-initial-set`, `restyle`, `animate`), firstSetClaimed, studioTokens, dailyAdsWatched, weeklyAdsWatched and optional guided/demo mode (demo default). All counters are nonnegative safe integers; dailyAdsWatched is capped at 10. Unsafe resulting token sums are rejected. Live/unknown modes are invalid, never sample fallback.

```powershell
# Start API in another terminal: npm run dev:api
$payload = @{ action='claim-initial-set'; firstSetClaimed=$false; studioTokens=0; dailyAdsWatched=0; weeklyAdsWatched=0; mode='demo' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8787/api/persona/token-eval -ContentType 'application/json' -Body $payload
```

Result: action, allowed, reason, firstSetClaimed, studioTokens (next balance), tokenCost, tokensMinted, dailyAdsWatched, remainingWeeklyAds, and `{mode, source:'sample', engine:'local-deterministic-v1', persisted:false}` provenance. Claiming an unclaimed initial set costs zero and sets the flag; repeated claims are denied. Restyle/animate spends one token or returns allowed=false without a negative balance. A successful evaluation does not mean an image was changed or animated.

Redemption occurs before the requested action: `floor(weeklyAdsWatched/60)` tokens are added, then a permitted restyle/animate may spend one. `weeklyAdsWatched % 60` is returned. Caller must carry the returned balance, claim flag and remainder forward and add only new watches; resubmitting historical cumulative totals would replay a reward. `evaluate` redeems without a studio action. Counts are unredeemed carry-forward totals, so tests include multiple 60-watch groups; the evaluator does not assert they occurred in a single seven-day calendar window. Daily/weekly rollover and verified ad completion are not implemented. A denied action can still return an independently redeemed balance.

This endpoint is stateless arithmetic over caller-supplied preview data. It is not an authoritative wallet, does not verify real ad viewing, and has no replay protection or persistent claim ownership. Real reward enforcement requires separately approved storage/identity and ad-provider work. No frontend token-wallet wiring was added by Codex; Antigravity's existing simulation is preserved. Requests receive the same JSON/media/size/error boundaries as the other preview routes (400 invalid request, 415 non-JSON, 413 oversized). Valid but unaffordable/repeated actions return 200 with allowed=false and a reason, not fabricated execution success.
