---
project: You&Me
record_type: comprehensive_project_handoff
as_of: 2026-11-08
timezone: America/Chicago
repository: https://github.com/kaiwanmirza-blip/you-n-me
branch: feat/ym-preview-01
status: investor_prototype_in_progress
live_ai: unavailable
persistence: paused_pending_S-01_review
application_publication: not_verified
---

# You&Me — complete project handoff and tracker

## How humans, machines and cloud agents should use this file

This is a self-contained snapshot with the complete repository Markdown planning/evidence corpus and machine-readable project record appended. Read this current-state summary first. Dated amendments supersede older statements; historical documents are retained verbatim to preserve decisions and evidence. Source code is the implementation authority; acceptance documents describe the target and do not prove delivery. Do not treat planned, assigned, proposed, locally verified, committed, pushed, published or accepted as interchangeable states. Errors cannot be guaranteed eliminated; unresolved contradictions and verification limits are explicitly retained.

## Goal, scope and target experience

Deliver an investor prototype of an empathetic lifestyle companion, with Jane default and Kay selectable. Fitness and Nutrition must become independently usable working journeys. Fashion, travel, etiquette, community and other broader vision areas are previews. Phone portrait and tablet landscape are primary; native packaging is a separate delivery track. The target first five minutes takes each user from welcome through constraints, a useful plan, refinement, explicit save and one reversible completed action. Guide identity, fictional profile identity and output provenance remain separate.

Guided means scripted fictional walkthrough; demo means labelled sample exploration; live requires a real configured provider and validated response. Never relabel samples as AI. No real payments, clinical claims or automatic paid-service activation. Jarvis and the hosted tracker are separate projects.

## Current implementation and tracker

| Phase / task | Verified state or remaining work |
| --- | --- |
| YM-01 product foundation | Documentation gate approved; application AC-01–AC-18 still unexecuted as integrated acceptance. |
| YM-02A scaffold | Local verification complete; checkpoint acbe3d8. |
| YM-02B API/contracts | Local Hono and Zod foundation verified; health implemented; unsupported domain operations return explicit errors/501. |
| YM-02C persistence | Paused. Four inactive SQLite drafts exist. Supabase replacement is a proposal; no migration applied or cloud project created. |
| YM-02D CI/integration | Open; parent YM-02 must remain open. |
| YM-PREVIEW-01 | Fitness fictional in-memory preview checkpoint dcb2792; user visual acceptance pending. Reload resets state. |
| YM-MOBILE-01 | Capacitor Android/iOS scaffold present in working tree at inspection; foundation only, no native release or device acceptance established. |
| YM-03 through YM-10 | Broader onboarding, provider, Fitness, Nutrition, progress, subscriptions, quality and investor acceptance remain incomplete despite partial preview overlap. |
| YM-UX-01 / G-01 | Open: original approved assets missing, new proposal review and exact guide adaptation pending. |

Hosted project tracker: https://youme-build-command-center.newclay.chatgpt.site
Local tracker: docs/DELIVERY_MAP.md; task crosswalk: docs/EXPERIENCE_TO_DELIVERY.md.
APP and DASH task namespaces are distinct. Last recorded dashboard capture is revision 17, not a fresh synchronization. No tracker mutation is included in this documentation/Git task.

## Target architecture and AI integration

Current: React + TypeScript + Vite frontend; shared Zod contracts; Hono Node API; memory-only fictional Fitness flow. Capacitor wraps the web build for proposed Android/iOS development. A native sample build does not establish a live backend, installability, signed distribution or store acceptance.

Proposed target: frontend/native client -> Hono backend-for-frontend -> validated provider gateway and approved session-owned storage. Supabase Postgres with anonymous Auth and ownership/RLS is proposed, not approved. SQLite/D1 drafts are inactive historical work. Preserve approved lifecycle intent: seven-day inactivity, thirty-day absolute lifetime, expired active-record cleanup within twenty-four hours, installation/browser continuity only. Review platform-specific retention/backups and deployment feasibility before activation.

Provider credentials must remain server-only. Validate inputs and outputs, enforce duration/equipment/exclusions and Nutrition quantity/shopping consistency, preserve input snapshots and immutable provenance, expose latency/provider identity, and handle unavailable/invalid responses without fallback. Explicit provider/privacy authorization is required before the proposed APP:YM-04A Fitness gateway. Nutrition needs its own implementation and acceptance; a Fitness success cannot certify Nutrition. No provider or architecture is approved by this handoff.

## Delivery, publication and Git evidence

Historical commits: 74dca7f initial repository; acbe3d8 scaffold/documentation checkpoint; dcb2792 bounded Fitness preview. These are source checkpoints, not application releases. Replit handoff/configuration exists but import/publication is unverified. No successful You&Me application deployment, signed mobile release, store publication or public launch is evidenced. The separate dashboard has historical saved Site versions, including version 7; saved versions alone do not prove publication dates or release acceptance. The complete source records below retain all available publication/version evidence without inventing a release history.

This task authorizes preservation and Git synchronization of existing project work, including inactive drafts, but does not activate or approve that code. Network push outcome and current check results are recorded in the session log after execution. Older project.json fields describing uncommitted/no-push state are historical snapshot fields and must not override a later verified Git receipt.

## Backlog, decisions and risks

Outstanding: S-01 platform/identity approval; local storage runtime and isolation/reset/expiry tests; CI; live-provider/privacy choice; Nutrition; durable plan/version/progress semantics; simulated entitlement comparison; integrated AC-01–AC-18; screen review/accessibility and physical devices; native SDK/build/signing/distribution verification; original Jane/Kay artwork; guide adaptation; sixth lifestyle domain; final sample names; pricing/licensing; older hub retirement; full dashboard mapping/synchronization. Do not repeat exhausted reference searches without new assets or locations. No secrets, generated builds or dependencies should be committed.

Future phases are unscheduled proposals: private pilot, product beta, revenue validation, launch readiness, public distribution and ongoing releases. Each requires its own approved scope and evidence. Publication needs artifact URL/version, source commit, environment, actual executor, acceptance checks and rollback evidence; none should be inferred from a plan.

## Verification and operating instructions

Use Node >=22.12.0 and npm ci, npm run typecheck, npm test, npm run build. npm start serves the built preview; see the embedded runbook. Mobile commands and constraints are in package.json and scripts. This task changes documentation and preserves existing work; it does not independently certify UI or native behavior. Earlier browser evidence and its limits remain in the verification records below.

## Complete machine-readable project record
```json
{
  "schemaVersion": 1,
  "project": "You&Me",
  "updatedOn": "2026-11-04",
  "timezone": "America/Chicago",
  "applicationRepository": "https://github.com/kaiwanmirza-blip/you-n-me",
  "inspectedBranch": "feat/ym-preview-01",
  "inspectedCommit": "acbe3d8db3bc00b8761281bca0bdb7b00fe28525",
  "dashboardUrl": "https://youme-build-command-center.newclay.chatgpt.site",
  "dashboardSourceRepository": null,
  "dashboardSynchronization": "Authenticated capture available; task-status/source synchronization pending",
  "currentMilestone": "investor prototype",
  "delivery": {
    "requestedId": "YM-01",
    "title": "Product foundation and acceptance",
    "status": "complete — documentation gate only",
    "productApproval": "approved with explicit refinements and deferred decisions",
    "implementation": "YM-02A/B verified locally; APP:YM-PREVIEW-01 in-memory Fitness sample implemented; Nutrition/live/persistence unavailable",
    "acceptanceExecution": "AC-01–AC-18 specified; all unexecuted",
    "dashboardIdMapping": "unresolved: dashboard YM-01 has a different title and task structure",
    "experienceAmendment": "Open reconciliation; earlier YM-01 documentation sign-off preserved; no UI approval implied"
  },
  "scope": {
    "workingJourneys": [
      "Fitness",
      "Nutrition"
    ],
    "otherAreas": "preview-only",
    "defaultGuide": "Jane",
    "selectableGuide": "Kay",
    "modes": [
      "guided",
      "demo",
      "live"
    ],
    "subscriptions": "simulated",
    "realPayments": false,
    "jarvis": "separate project"
  },
  "records": {
    "masterPlan": "docs/MASTER_PLAN.md",
    "deliveryMap": "docs/DELIVERY_MAP.md",
    "acceptance": "docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md",
    "decisions": "docs/DECISION_LOG.md",
    "sessions": "docs/SESSION_LOG.md",
    "storage": "docs/STORAGE_AND_ISOLATION.md",
    "scaffoldVerification": "docs/YM-02A_VERIFICATION.md",
    "apiFoundation": "docs/API_FOUNDATION.md",
    "apiVerification": "docs/YM-02B_VERIFICATION.md",
    "experienceMatrix": "docs/EXPERIENCE_TO_DELIVERY.md",
    "referenceRegister": "docs/REFERENCE_REGISTER.md",
    "exerciseReview": "docs/EXERCISE_DASHBOARD_REVIEW.md",
    "dashboardSyncProposal": "docs/DASHBOARD_SYNC_PROPOSAL.md",
    "deckInspection": "docs/references/deck-inspection.json",
    "supabaseProposal": "docs/SUPABASE_ARCHITECTURE_PROPOSAL.md",
    "previewVerification": "docs/YM-PREVIEW-01_VERIFICATION.md",
    "previewRunbook": "docs/PREVIEW_RUNBOOK.md"
  },
  "recordProvenance": "Local implementation directly checked in this chat; dashboard receives reported evidence only",
  "futureMilestones": {
    "status": "proposed and unscheduled",
    "items": [
      "private pilot",
      "product beta",
      "revenue validation / commercial beta",
      "launch readiness",
      "public launch and distribution",
      "ongoing releases"
    ]
  },
  "storageDecision": {
    "id": "S-01",
    "recommendation": "Dedicated Supabase Postgres + anonymous Auth + Hono BFF; local stack first",
    "status": "Supabase replacement proposed pending review; historically approved SQLite/D1 implementation paused",
    "blocks": [
      "YM-02C"
    ],
    "doesNotBlock": [
      "YM-02A",
      "YM-02B"
    ],
    "productReview": {
      "status": "replacement platform/anonymous Auth pending approval",
      "implementation": "paused; local SQLite drafts inactive; no migrations applied"
    },
    "previousApprovedArchitecture": "SQLite locally / D1 intended; paused after inactive draft files",
    "approvedLifecycle": {
      "inactivityDays": 7,
      "absoluteDays": 30,
      "expiredActiveRecordCleanupHours": 24,
      "continuity": "browser/installation only",
      "hostedDemonstrations": "fictional only, activation/personal data deferred"
    },
    "proposalProject": {
      "name": "you-n-me-prototype",
      "created": false,
      "organizationCandidate": "bcxqhabehcsayuwalemo",
      "organizationSelection": "requires user confirmation",
      "region": "requires user confirmation",
      "excludedProject": "iloiveofvljyctrodpyx (Elevated Finds Studio)"
    }
  },
  "nextTask": "Screen review, then APP:YM-04A bounded Hono live Fitness provider gateway after provider/privacy authorization",
  "engineeringFoundation": {
    "id": "YM-02",
    "status": "In progress",
    "completionRule": "All subtasks accepted; scaffold alone is insufficient",
    "subtasks": [
      {
        "id": "YM-02A",
        "title": "Repository and frontend scaffold",
        "status": "Complete — local verification",
        "evidence": "docs/YM-02A_VERIFICATION.md",
        "executor": "Codex in this chat",
        "responsibility": "Engineering / frontend and repository foundation"
      },
      {
        "id": "YM-02B",
        "title": "API foundation and typed contracts",
        "status": "Complete — local verification",
        "evidence": "docs/YM-02B_VERIFICATION.md",
        "executor": "Codex in this chat",
        "responsibility": "Engineering / API foundation and typed contracts"
      },
      {
        "id": "YM-02C",
        "title": "Migrations and persistence foundation",
        "status": "Paused — Supabase replacement scope proposed pending review",
        "proposedScope": "Local Supabase/Postgres/Auth, ownership/RLS, lifecycle/reset/cleanup and fictional seeds; no cloud mutation",
        "evidence": "docs/SUPABASE_ARCHITECTURE_PROPOSAL.md",
        "interruptedDrafts": [
          "migrations/0001_sessions.sql",
          "migrations/0002_resources.sql",
          "server/database.ts",
          "server/persistence.ts"
        ]
      },
      {
        "id": "YM-02D",
        "title": "CI and foundation integration",
        "status": "To do"
      }
    ]
  },
  "repositoryState": {
    "branch": "feat/ym-preview-01",
    "baseCommit": "74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de",
    "newCommit": "acbe3d8db3bc00b8761281bca0bdb7b00fe28525",
    "githubSynchronization": "No push or PR; source remains local",
    "dashboardSynchronization": "not performed; change list prepared only",
    "checkpointCommit": "acbe3d8db3bc00b8761281bca0bdb7b00fe28525",
    "checkpointIdentity": "Codex <codex@localhost>; command-local identity, no global config",
    "implementationChanges": "Preview plus required YM-02B foundation; inactive SQLite drafts preserved and excluded from commit"
  },
  "executionPolicy": {
    "state": "Bounded preview authorized; persistence remains paused",
    "scope": "APP:YM-PREVIEW-01 only; stop for screen review",
    "resumeRequires": "Further deliverables require explicit authorization; S-01/provider review separate"
  },
  "experience": {
    "source": "Current user product-baseline reaffirmation; original visual assets not recovered",
    "primaryDevices": [
      "phone",
      "tablet"
    ],
    "referenceOrientations": [
      "phone portrait",
      "tablet landscape"
    ],
    "scaffoldDesignApproval": false,
    "exerciseReference": "Option 1: clean scalable interface, small fixed Jane bubble; asset missing",
    "fullVision": [
      "onboarding",
      "home",
      "exercise",
      "fashion",
      "travel",
      "etiquette",
      "nutrition/wellness",
      "blog/community",
      "subscription/settings",
      "weekly reflection"
    ],
    "guideIntent": "friendly, empathetic, motivational, adaptive; exact behavior G-01 pending",
    "designCheckpoint": {
      "id": "YM-UX-01",
      "namespace": "application",
      "status": "Open — reference recovery at current limit; screen approval remains pending",
      "requiredBefore": "Final screen acceptance; latest user authorizes a NEW implemented proposal without original references",
      "preparationEvidence": "docs/REFERENCE_REGISTER.md",
      "screenReviewStatus": "Agent browser-emulated review performed; user visual acceptance pending",
      "blockers": [
        "Original-reference fidelity unavailable",
        "New proposal awaits screen review; G-01 deeper behavior pending"
      ]
    },
    "referenceAssets": "Two historical proposal decks and one embedded cover located; approved screen references and identified Jane/Kay assets missing",
    "mobilePackaging": {
      "id": "YM-MOBILE-01",
      "status": "proposed and unscheduled",
      "separateFromResponsiveLayouts": true
    },
    "referencePreparation": {
      "located": [
        "REF-001",
        "REF-002",
        "REF-003"
      ],
      "approvalRecoveredImageMissing": [
        "REF-004",
        "REF-005",
        "REF-006",
        "REF-007"
      ],
      "newProposals": [
        "REF-P01",
        "REF-P02",
        "REF-P03"
      ],
      "status": "preparation complete; actual gate remains open",
      "searchBoundary": "current repository and two known proposal files in project parent only"
    },
    "guideDecision": {
      "id": "G-01",
      "status": "pending review"
    },
    "referenceRecovery": {
      "status": "current limit reached",
      "repeatSearches": false,
      "resumeOn": "new user-supplied asset or location",
      "blocksAllProjectWork": false,
      "originalExerciseImages": "unavailable",
      "tabletAndMissingStates": "may require new design review",
      "finalAvatarArtwork": "may remain pending; approved Jane/Kay concept unchanged",
      "reconstructions": "new proposal only; never original approved reference"
    }
  },
  "taskIdentity": {
    "applicationNamespace": "APP",
    "dashboardNamespace": "DASH",
    "rawIdsPreserved": true,
    "crosswalk": "docs/EXPERIENCE_TO_DELIVERY.md",
    "fullMapping": "Fresh revision17 application reconciliation supplies partial overlaps; no renumbering"
  },
  "dashboardObservation": {
    "revision": 17,
    "updatedAt": "2026-11-04T19:41:43.608Z",
    "readOnly": true,
    "source": "Authenticated get_project_plan and get_task YM-04.1",
    "taskStatus": "Historical before local preview; capture does not complete tasks"
  },
  "dashboardSourceAccess": {
    "metadata": "accessible; current saved Site version 7; owner role",
    "sourceRemoteAndContent": "not supplied by get_site; not retrieved or verified accessible",
    "mcpConnection": "advertised; installed/connected state not established",
    "sourceCredentialsMinted": false,
    "synchronizationPerformed": false
  },
  "supabaseReadOnlyInventory": {
    "organization": "bcxqhabehcsayuwalemo",
    "plan": "free",
    "visibleProjects": [
      {
        "id": "iloiveofvljyctrodpyx",
        "name": "Elevated Finds Studio",
        "status": "ACTIVE_HEALTHY",
        "region": "us-east-1"
      }
    ],
    "operations": "list projects/organizations and get organization metadata only; no table/data/key access",
    "capacity": "possible spare free slot inferred; not reserved or guaranteed"
  },
  "previewDelivery": {
    "id": "YM-PREVIEW-01",
    "namespace": "APP",
    "title": "Phone/tablet Fitness experience preview",
    "status": "Implemented locally; screen review pending",
    "responsiblePOD": "Engineering",
    "specialistRoles": [
      "Frontend/application",
      "QA verification",
      "Documentation"
    ],
    "actualExecutor": "Codex in this chat; no subagents",
    "design": "New implemented proposal; not original reference or final approval",
    "state": "In memory only; reload resets",
    "checks": "45 tests, typecheck, production frontend/API builds and clean install passed",
    "dashboardOverlap": [
      "YM-04.1",
      "YM-03.1",
      "YM-06.1",
      "YM-08.2"
    ]
  }
}

```

---

# Source record: docs/API_FOUNDATION.md

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


---

# Source record: docs/DASHBOARD_SYNC_PROPOSAL.md

# Dashboard synchronization change list — prepared, not applied

Date: 2026-11-02. No dashboard mutation occurred in this task. Basis: APP/DASH crosswalk in EXPERIENCE_TO_DELIVERY.md and last partial read of dashboard plans/main revision 15. That snapshot is historical, not a guarantee of current state; a fresh full ledger/export and revision are required before any write. No automatic synchronization exists here.

## Evidence levels

- **Inspected local artifact:** Git checkpoint acbe3d8 and source/docs can be inspected in this checkout. This task checked source preservation and checkpoint presence, not rerun every earlier check.
- **Reported local verification:** YM-02A/B verification files report build/browser results and 39 YM-02B tests. No independent reviewer or fresh CI run is established. No product journeys or reference-fidelity checks passed.
- **Conversation approval:** YM-01 decisions and current experience reaffirmations are user evidence, not code completion or recovered image files.
- **Dashboard snapshot:** visible statuses/IDs from revision 15 only; truncated body prevents full mapping. Never overwrite newer records from this proposal.

## Proposed changes for a later authorized sync

| ID | Application reference | Dashboard target | Proposed change / evidence | Completion handling |
| --- | --- | --- | --- | --- |
| SYNC-01 | APP:YM-01 experience amendment | DASH:YM-01.1 scope + discussion/decision record if supported | Append source-linked phone/tablet priorities, full vision, scaffold-not-final clarification and implementation pause | Preserve original scope completion/date; do not rewrite its historic approval as a new screen acceptance |
| SYNC-02 | APP:YM-02A | DASH:YM-01.3 repository setup | Append checkpoint acbe3d8, committed README/AGENTS/templates and local verification file | Record local evidence; verify target's complete criteria and repository reachability before changing status. No remote commit/push or CI result fabricated |
| SYNC-03 | APP:YM-01 | DASH:YM-01.4 acceptance | Append user sign-off plus later experience amendment and explicit remaining UX gate | Documentation approval is not application or visual acceptance; no automatic Completed status |
| SYNC-04 | APP:YM-02B | Exact dashboard task unknown | Link API/contracts source and reported local tests/builds, uncommitted status and limitations after full-ledger mapping | Do not assign by matching raw number; do not call independently verified or mark the parent complete |
| SYNC-05 | APP:YM-UX-01 | Existing design task if found, otherwise propose a new linked task | Reference register, Exercise checklist, missing assets and blockers; Product/UX responsibility, actual executor Codex | Keep Open; no visual approval or mockup generation; preserve all existing task histories |
| SYNC-06 | S-01 / G-01 | Matching decision/task records after full-ledger review | Explicitly pending; further app implementation paused; persistence still gated | Do not approve by synchronization or activate a worker |
| SYNC-07 | APP:YM-VISION-* / YM-MOBILE-01 | Full roadmap nodes after mapping | Preserve fashion/travel/etiquette/wellness/community/reflection; separate responsive layouts from proposed packaging/distribution | Proposed, unscheduled future work; no new release or store-delivery claim |
| SYNC-08 | No app equivalent | DASH:YM-01.2 delivery dashboard | Preserve dashboard-source completion/commit and separate repository identity | Never reuse this as proof of You&Me application completion |

Safe future procedure: obtain full current ledger/revision; identify exact target IDs and duplicate tasks; inspect evidence against target criteria; append source-linked notes or create proposed items only when authorized; use revision-aware writes; reread to verify changes; report actual synchronization separately. Do not delete, renumber or backdate records. This task only prepares the list.

## S-01 review preparation update

Remaining sync work: fresh full ledger/revision, exact APP/DASH target mapping and duplicate check; append local checkpoint/reported A/B evidence without claiming independent verification; capture experience recovery limit, open UX gate, pending S-01/G-01 and preserved future scope; verify writes only if separately authorized. No renumbering/history rewrites or parent completion.

Read-only Sites metadata is accessible: the Command Center currently reports saved version 7 and owner access; MCP connection details are advertised. This does not establish that the site plugin is connected in this chat. The dashboard source Git remote/content is not in the application checkout; get_site did not supply source repository metadata. Source-content accessibility has not been verified. No source credential was minted and no dashboard source or database was edited. Source-code retrieval is separate from obtaining the ledger and synchronizing task data. Last ledger observation remains partial revision 15; saved Site version 7 is a different counter.

Synchronization not performed. This task prepared a storage recommendation, not an authorization for dashboard mutation or application execution.

## Preview synchronization change — 2026-11-04

Fresh authenticated plan revision17 and DASH:YM-04.1 read. Prepare capture of APP:YM-PREVIEW-01 related to DASH:YM-04.1/03.1/06.1/08.2, with local commit, 45 tests and proposal screenshots. This is partial Fitness sample evidence, not live/persistence completion. Available connector writes review captures, not task-status/source changes. Existing history/access settings untouched; final receipt distinguishes capture from full synchronization. Earlier unavailable-source statements are historical; this session has connector access but no mounted dashboard source or task-status write API.


---

# Source record: docs/DECISION_LOG.md

# Decision log

Date: 2026-11-02. Approval authority: Kaiwan's explicit instruction to finalize YM-01, approving the latest review subject to six refinements. Earlier proposals are resolved below; deferred decisions are not inferred approvals.

## Approved decisions

| ID | Resolution | Effect |
| --- | --- | --- |
| C-01–C-04 | Retained | Investor prototype; Fitness/Nutrition working, others preview-only; Jane default/Kay selectable; explicit modes; simulated subscriptions; no payments; Jarvis separate; application repo you-n-me. |
| P-01 | Approved with refinement | Account-free; each journey measured independently welcome → saved plan + one completed action. Five minutes is a usability target. Guided/live and provider latency reported separately. |
| P-02 | Approved except names | Fictional samples with editable summaries; guide switching preserves profile/history and capabilities. Friendly/empathetic/motivational/adaptive intent reaffirmed in E-03; precise adaptation remains G-01. Final sample names deferred. |
| P-03 | Approved | Scripted guided, fixture demo, explicitly selected live; immutable saved provenance; no silent provider/sample fallback. |
| P-04 | Approved | Minimal editable journey fields; 18+ personal-live acknowledgement; unknown allergies get generic preview; no body metrics/account details. Visible initial Fitness/Nutrition defaults and US customary with metric selection. Intensity optional. |
| P-05 | Approved with refinement | One nonclinical Fitness session; supported 15–60 whole minutes. Sum warm-up/exercises/transitions/rests/cooldown; estimate must fit budget, replacing previous ±5-minute tolerance. Stable blocks are completable actions. |
| P-06 | Approved with refinement | One-day meals/shopping list, no calorie prescription. Serving/ingredient/substitution consistency and prep-budget validation; individual meals are completable actions. |
| P-07 | Approved shell only | Home/Fitness/Nutrition/Progress/Explore; utility Settings. Sixth lifestyle category remains unresolved; More is not an approved domain. |
| P-08 | Behavior approved; storage revised as proposal S-01 | Explicit save, versions, reversible completion, distinct walkthrough/full-session reset. Previous browser-only architecture recommendation superseded by S-01 for review; no persistence implementation authorized. |
| P-09 | Record roles approved | Repository acceptance baseline; Command Center delivery ledger. Preserve existing IDs/history; crosswalk when full ledger available. Older hub retirement deferred. |
| P-10 | Direction approved, milestones remain proposed | Pilot through launch/distribution/ongoing releases unscheduled; You&Me business model distinct from planner/code sales. Pricing/licensing deferred. |
| R-01 | Acceptance-gap closure documented | AC-01–AC-18 specify timing, duration, quantities, negative cases, transitions, optional intensity, action semantics, storage isolation and simulated Free→Plus comparison→Free reversal. All unexecuted. |
| R-02 | YM-02 scope preserved and split | YM-02A scaffold only; API/contracts, migrations/storage, CI remain YM-02B/C/D. Parent stays To do, not completed by scaffolding. |

## Remaining proposals and deferred decisions

| ID | Status | Gate |
| --- | --- | --- |
| S-01 | Recommend SQLite locally / D1 hosted via anonymous-session API. Hosted server persistence is a material change from browser-only saving; Kaiwan review required. | Before YM-02C persistence implementation; not YM-02A. See STORAGE_AND_ISOLATION.md. |
| D-01 | Sixth lifestyle domain unresolved; full-vision screen areas reaffirmed in E-05 do not establish a six-domain taxonomy. | Before a fixed six-domain UI. |
| D-02 | Final sample names deferred; Sample A/B temporary fixture identifiers only. | Before final investor content. |
| D-03 | Public pricing and source licensing deferred. | Before commercialization or source distribution. |
| D-04 | Older hub retirement deferred. | Before retiring/migrating that hub. |
| O-01 | Provider/deployment and provider data-retention controls unresolved; no paid service authorized. | Before live activation. |
| O-02 | Dashboard source/full ledger and unavailable original documents not recovered. | Before dashboard ID migration or claims of dashboard alignment; local application IDs remain explicitly scoped. |
| O-03 | Hosted session expiry, retention/backup policy and deletion disclosures require verification. | Before hosted personal-data use. |

YM-01 documentation gate is complete: decisions and explicit deferrals, testable acceptance contracts, storage recommendation/material-change gate and bounded next work are recorded. This does not approve S-01, mark application checks passed, or update the hosted dashboard.

## Experience reconciliation amendment — 2026-11-02

Source: Kaiwan's current explicit product baseline and pause instruction. See EXPERIENCE_TO_DELIVERY.md for source register, matrix and missing references. These entries amend conflicting wording above; earlier decisions/IDs and execution records are retained.

| ID | Status | Decision and effect |
| --- | --- | --- |
| E-01 | Reaffirmed approval | Mobile and tablet primary from prototype; phone portrait and tablet landscape approved orientations. Exact reference dimensions unavailable. |
| E-02 | Reaffirmed approval; asset missing | Exercise Dashboard option 1: clean/scalable interface, small fixed Jane avatar bubble. No pixel-level design claims until original reference recovered. Scaffold is not final approved visual design. |
| E-03 | Reaffirmed intent; operational details open | Jane default, Kay selectable; friendly, empathetic, motivational and adaptive. Guide switching preserves profile/plan/progress, capabilities, constraints and provenance; presentation-only cannot mean no warmth/adaptation. |
| E-04 | Approved checkpoint requirement | YM-UX-01 before UI implementation, screen-by-screen phone/tablet review against approved references before integration. No invented or redesigned missing mockups. |
| E-05 | Reaffirmed full vision | Onboarding, home, exercise, fashion, travel, etiquette, nutrition/wellness, blog/community, subscription/settings, weekly reflection. Working Fitness/Nutrition only now; other areas may be previews. |
| E-06 | Approved roadmap separation | Retain mobile packaging/distribution as a separate proposed/unscheduled track; responsive layouts do not imply an installed app or app-store delivery. |
| E-07 | Explicit pause | Further application implementation paused, including YM-02C. Preserve A/B; S-01 remains pending. No new commit/push/dashboard update requested. |
| G-01 | New proposal, not approved behavior rules | Adapt wording, pacing and encouragement using explicit preferences/current journey state; no inferred mood, new data collection or automatic plan/provider changes. Review concrete copy and triggers before implementation. |
| UX-Q-01 | New verification proposal | Use 390x844 portrait and 1024x768 landscape plus adjacent widths until original canvas dimensions recovered; real-device review at investor readiness. Viewport sizes are not recovered approvals. |

Open conflicts: original approved reference images/versions; precise guide adaptation; navigation labels versus full section ecosystem; reflection layout choice. Full APP/DASH mapping remains unresolved beyond documented overlaps. Keep sample names, sixth category, pricing, licensing and older-hub retirement deferred. Historical assistant suggestions are not product approvals.

## YM-UX-01 preparation record — 2026-11-02

| ID | Status | Evidence / effect |
| --- | --- | --- |
| REF-R01 | Original proposal artifacts located; not UI approval | Two existing AI_Life_Coach proposal decks at known project-parent paths; inventory and hashes in references/deck-inspection.json. Embedded image is a cover portrait, not an exercise mockup or an identified Jane/Kay source. |
| REF-R02 | Approval recovered, images missing | Existing E-01/E-02/E-03 reaffirmations stand; exact Exercise phone/tablet images and approved avatar files not recovered. See REFERENCE_REGISTER.md for intake names and limitations. |
| REF-P01 | Proposal awaiting review | Loading/empty/error cases and proposed touch-target threshold in EXERCISE_DASHBOARD_REVIEW.md have no recovered visual reference. No final treatment or copy selected. |
| REF-R03 | Preparation only; gate open | Register/checklist/sync change list prepared; YM-UX-01 not accepted. S-01/G-01 remain pending; no implementation, commit, push, publication or dashboard synchronization. |

Historical deck audience, Coach Ava name, prices, technology and timeline are contextual proposals, not amendments to the approved prototype. The sixth category and other deferred decisions remain unresolved. No new product approval is inferred from asset discovery.

## Reference recovery limit and parallel planning — 2026-11-02

Kaiwan confirms reference recovery has reached its current limit. Do not repeat the same asset searches without a newly supplied location or asset. Original approved Exercise Dashboard images remain unavailable. Tablet adaptation and loading/empty/error treatments may need new design review. Final avatar artwork may remain pending while the approved Jane/Kay concept stays intact. Any later reconstruction must be labelled a new proposal, never an original approved reference.

YM-UX-01 remains Open. Missing images restrict visual fidelity claims and screen design/integration approval; they are not a blocker for all project work. Storage product review and other reference-independent planning can proceed. Further application implementation still requires separate authorization; S-01 and G-01 remain pending.

## S-01 approved boundaries, then replacement proposal — 2026-11-02

| ID | Status | Decision / consequence |
| --- | --- | --- |
| S-01-L | Historically approved, implementation now paused | User approved SQLite local/D1 intended, 7-day inactivity/30-day absolute lifetime, cleanup within 24 hours, browser/installation continuity and fictional initial hosted demos. Hosted activation/personal data remained deferred. Four inactive draft files landed before interruption; no applied migration or operational persistence. |
| S-01-S | Proposed, pending review | Dedicated You&Me Supabase Postgres/Auth, retaining Hono; local Supabase stack first. Current platform recommendation in SUPABASE_ARCHITECTURE_PROPOSAL.md supersedes the old recommendation only if approved. No project created. |
| S-01-AUTH | Proposed, material identity choice | Supabase anonymous Auth creates technical Auth users, plus a thin Hono-owned opaque-cookie/encrypted refresh transport; preserve no permanent accounts/recovery/cross-device sync. Keep existing seven/thirty-day limits in app/RLS rather than rely on paid/default Auth timeouts. |
| S-01-PROJECT | Proposed setup | Name you-n-me-prototype; confirm org/region and current slot/cost before separate creation approval. Elevated Finds Studio explicitly excluded from reuse, queries and changes. |
| S-01-OPS | Pending hosted review | Supabase-specific backup/log/expiry behavior replaces D1 assumptions. Free inactivity pause means physical cleanup SLA needs a verified always-running arrangement or separate plan/budget review. No billing or paused-project workaround authorized. |
| S-01-GRAPH | Excluded | No actual graph requirement; Neo4j outside YM-02C. |

Read-only organization/project metadata shows one Free organization and one visible active project (Elevated Finds Studio). Available-slot estimate is inference, not a reservation. Current local Supabase CLI/Docker commands were not found on PATH; no install/start attempt. UX gate and G-01 remain open, experience requirements unchanged. Implementation pause remains until replacement approval and explicit local implementation authorization. No provider, screen or database implementation during this evaluation.

## Preview authorization — 2026-11-04

- PREVIEW-A01 User approved implementation of a bounded phone/tablet NEW design proposal and one Fitness sample loop, without persistence/provider prerequisites. Earlier pause is lifted for APP:YM-PREVIEW-01 only.
- PREVIEW-A02 User approved in-memory fallback, explicit sample provenance, session-selection wording and unavailable Live. Jane default/Kay selectable affect wording only in this delivery. G-01 deeper adaptation stays open.
- PREVIEW-P01 Proposed visuals: reused scaffold palette/typography, placeholder initials, stacked phone/split tablet cards, reserved guide rail, loading/error/empty and inline reset treatments. Await screen review; YM-UX-01 remains open.
- PREVIEW-D01 Discovery only: inspiration/photo journals, clinician-goal organization, fashion/color guidance, calm routines and destination travel. No clinical/image-analysis scope added.
- S-01 remains Supabase replacement proposed; no persistence authorization inferred. Native distribution remains separately proposed.


---

# Source record: docs/DELIVERY_MAP.md

# Delivery map

> Current amendment — 2026-11-04: APP:YM-PREVIEW-01 is authorized and implemented as a NEW design proposal with an in-memory Fitness sample. This bounded exception supersedes earlier blanket UI pauses; it does not approve final visuals, persistence or live AI. See [preview evidence](YM-PREVIEW-01_VERIFICATION.md). Earlier dated entries remain history.


Date: 2026-11-02. Application implementation paused by Kaiwan; YM-02A/B preserved; application acceptance unexecuted.

## ID reconciliation

The user's YM-01 title is “Product foundation and acceptance.” Live dashboard revision 7 uses YM-01 “Scope & delivery controls” and YM-10 “POD execution & automation infrastructure.” Earlier chat guidance used YM-10 for investor demonstration. Do not renumber or overwrite dashboard items automatically. Proposed application delivery namespace is listed below; mapping to existing dashboard IDs requires the full ledger and a non-destructive crosswalk. Local application IDs below do not overwrite dashboard IDs. These are not claims that task dependencies have been validated against unseen records.

| Proposed application delivery | Dependencies | Current evidence/status |
| --- | --- | --- |
| YM-01 Product foundation and acceptance | Verified scope and repository identity | Documentation complete with approved refinements; S-01 explicitly deferred; AC-01–AC-18 unexecuted. |
| YM-02 Repository and engineering foundation | YM-01 documentation gate; preserve local/dashboard ID distinction | In progress: YM-02A checkpointed, YM-02B complete locally; migrations/persistence and CI/integration remain open. Remote inspected main still contains README only. |
| YM-03 Onboarding and home | YM-02 and approved UX defaults | Planned, not implemented. |
| YM-04 Provider gateway and mode integrity | YM-02; provider/privacy decision | Planned; guided fixtures may proceed independently of live provider availability. |
| YM-05 Fitness | YM-03, YM-04 for live behavior | Planned. |
| YM-06 Nutrition | YM-03, YM-04 for live behavior | Planned. |
| YM-07 Progress and persistence | Shared storage contract; YM-05 and YM-06 for integrated acceptance | Planned. Storage must be designed before journey save behavior is implemented. |
| YM-08 Simulated subscriptions and measurement | Working core journeys and progress | Planned; no real payments. |
| YM-09 Quality, accessibility and privacy acceptance | Integrated prototype and reviewed live-data handling | Planned; checks accompany earlier deliveries too. |
| YM-10 Investor demonstration | All required checks and product approval | Planned; ID collides with current dashboard usage. |

YM-02A is complete locally; evidence: [verification](YM-02A_VERIFICATION.md). YM-02B is also complete locally; evidence: [API verification](YM-02B_VERIFICATION.md). Next step is S-01 product review; YM-UX-01 stays open and reference recovery is at its current limit; implementation remains paused. S-01 review is additionally required before any YM-02C authorization. S-01 review blocks YM-02C, not YM-02A/B. No autonomous queue is enabled.

Dashboard task YM-01.3 must not be completed solely because the GitHub repository exists: repository-side README/instructions/build/issue-template criteria now have local evidence, but the dashboard task has not been reconciled or updated. The local YM-01 documentation gate now has user approval evidence, but dashboard YM-01.4 has not been updated or declared aligned. Keep dashboard-source releases separate from You&Me application releases.

## YM-02 retained requirements and bounded subtasks

| Task | Outcome / acceptance | Dependencies | Status |
| --- | --- | --- | --- |
| YM-02A Repository and frontend scaffold | Preserve local documentation in the correct checkout; README/AGENTS/issue and PR templates; React/TypeScript/Vite minimal nonfunctional shell; reproducible install, dev/typecheck/test/build commands; frontend checks and local review evidence. | YM-01 documentation gate; fresh repository and change inspection. | Complete locally; see verification |
| YM-02B API foundation and typed contracts | Local API skeleton; typed request/response/error contracts and validation; session authorization contract; meaningful contract/API checks; no provider integration. | YM-02A; approved product contracts. | Complete locally; see API verification |
| YM-02C Migrations and persistence foundation | Proposed local Supabase/Postgres/Auth migrations, ownership/RLS, lifecycle, deletion and fictional seeds; see Supabase proposal. Preserve interrupted inactive SQLite drafts; no cloud mutation. | YM-02B; approval of S-01 replacement; local runtime ready. | Paused; replacement scope proposed pending review |
| YM-02D CI and foundation integration | CI installs/checks/tests/builds frontend and API; verifies migrations/contracts using isolated data; no deploy or paid credentials; fresh checkout instructions verified. | YM-02A/B/C. | To do |

Parent YM-02 completion requires all four subtasks and their evidence. Scaffolding alone cannot satisfy API foundation, typed contracts, migrations or CI. Hosted personal-data use additionally requires O-03 retention/session controls; YM-02 completion does not authorize deployment. Later journeys, provider generation and real payments remain outside YM-02.

## Experience checkpoint and task identity

[EXPERIENCE_TO_DELIVERY.md](EXPERIENCE_TO_DELIVERY.md) supplies the source/screen/scope/task/device-check matrix and non-destructive task crosswalk. Use APP and DASH namespaces while preserving all existing raw IDs and histories. Dashboard revision 15 confirms repository linkage and the first scope/control tasks; full downstream mapping is unavailable from the truncated read. Do not merge APP:YM-01 with DASH:YM-01 or transfer dashboard-source completion to application journeys.

| Local task / checkpoint | Scope and dependency | Current status |
| --- | --- | --- |
| APP:YM-UX-01 Experience/design reconciliation | Recover approved references and guide assets, resolve G-01/navigation conflicts, register phone portrait/tablet landscape screens. Required before UI implementation; screen-specific review required before integration. | Open; missing visual references and review decisions |
| APP:YM-02C | Existing migrations/persistence scope unchanged; requires S-01 approval and a new authorization after current implementation pause. Do not absorb UI implementation into it. | To do; paused, no implementation |
| APP:YM-03/05/06/07/08/09 | Existing owning deliveries remain; add YM-UX-01 and screen-specific reference review to UI readiness. Phone/tablet primary; scaffold not approved final design. | Planned; implementation paused |
| APP:YM-VISION-FASHION/TRAVEL/ETIQUETTE/WELLNESS/COMMUNITY/REFLECTION | Proposed local backlog references for full-vision areas; previews now, future working journeys unscheduled. Never invent a sixth domain or mockups. | Proposed, not dashboard task records |
| APP:YM-MOBILE-01 | Packaging/distribution strategy, device install/update acceptance, beta channels and later public release; separate from responsive layouts. No platform/packaging technology selected. | Proposed, unscheduled |

YM-02 remains open with A/B complete locally and C/D still To do. YM-01's earlier documentation sign-off remains historical; the new experience amendment and guide proposal require reconciliation, not retroactive claims that reference review already passed. No CI, persistence or UI work is authorized in this reconciliation.

## YM-UX-01 preparation evidence

- Completed preparation: restricted project-asset search, reference register, exact intake request, Exercise option 1 review checklist and proposed dashboard changes. See REFERENCE_REGISTER.md and EXERCISE_DASHBOARD_REVIEW.md.
- Gate not passed: original phone/tablet Exercise images and identified guide assets missing; no screen-fidelity review executed; G-01/navigation/state proposals remain for review. YM-UX-01 remains Open, not completed by documentation preparation.
- Proposed local subtask YM-UX-01A: recover and identify the original Exercise option 1 reference bundle and avatar sources, register approval context and whether a tablet original exists. No new mockup/design/UI implementation.
- DASHBOARD_SYNC_PROPOSAL.md uses the existing APP/DASH crosswalk and last partial revision 15; no write occurred. Reported local A/B verification is distinct from fresh independent review. No parent completion, ID renumbering or history rewrite.

## Reference recovery limit and parallel planning — 2026-11-02

Kaiwan confirms reference recovery has reached its current limit. Do not repeat the same asset searches without a newly supplied location or asset. Original approved Exercise Dashboard images remain unavailable. Tablet adaptation and loading/empty/error treatments may need new design review. Final avatar artwork may remain pending while the approved Jane/Kay concept stays intact. Any later reconstruction must be labelled a new proposal, never an original approved reference.

YM-UX-01 remains Open. Missing images restrict visual fidelity claims and screen design/integration approval; they are not a blocker for all project work. Storage product review and other reference-independent planning can proceed. Further application implementation still requires separate authorization; S-01 and G-01 remain pending.

## Current next step: S-01 Supabase amendment review

SQLite/D1 implementation authorization was paused after four inactive draft files; no migration was applied or persistence endpoint integrated. Preserve prior approved lifecycle boundaries and draft history. SUPABASE_ARCHITECTURE_PROPOSAL.md now defines the conditional YM-02C implementation prompt and tests. Supabase is not approved by being investigated. Proposed sequence: architecture/identity review; local runtime readiness; separately authorize local YM-02C; later consider a dedicated hosted project only with organization/region/cost approval. Never use Elevated Finds Studio as a test target. No cloud project is required for local-only implementation. No Neo4j requirement identified; keep it outside this delivery. Parent YM-02 remains open until C and D actually pass.

## Current bounded delivery

APP:YM-PREVIEW-01 Phone/tablet Fitness experience preview — implemented locally, screen review pending; evidence YM-PREVIEW-01_VERIFICATION.md. Dependencies verified from A/B source and passing checks; deliberately bypasses unimplemented persistence via explicit memory-only boundary authorized by user. Partial overlaps APP:YM-03/04/05/07/09, never completes those broader deliveries. DASH:YM-04.1 is related Fitness flow, with YM-03.1/06.1/08.2 supporting overlaps from revision 17. Parent YM-02 open; C paused; D unstarted. Next after screen review/provider gates: APP:YM-04A bounded live Fitness provider gateway.


---

# Source record: docs/EXERCISE_DASHBOARD_REVIEW.md

# Exercise Dashboard option 1 — first screen review

Revision 1, 2026-11-02. Scope: reference preparation only. Phone portrait and tablet landscape are primary. **All rows are Not reviewed / blocked where visual evidence is missing.** No UI or mockup was created; the current scaffold is excluded as a reference.

## Required inputs

REF-004 approved phone image, REF-005 tablet reference or explicit confirmation none exists, REF-006 avatar sources, and original approval/version context. Register them before comparing. Preserve the original pixel dimensions; viewport proposals are not proof of fidelity. Attach a reference and review result separately for each orientation.

## Checklist

| ID / authority | Phone portrait review | Tablet landscape review | Evidence needed / current result |
| --- | --- | --- | --- |
| EX-01 Reaffirmed orientation/reference requirement | Verify selected option 1, version and portrait canvas | Verify actual approved landscape adaptation/version; don't stretch phone by assumption | Original images + approval context; blocked |
| EX-02 Reaffirmed clean/scalable hierarchy | Compare heading, plan summary, content grouping and primary action hierarchy | Compare intended landscape density, grouping and reading order without inventing columns | Side-by-side reference review; blocked |
| EX-03 Reaffirmed small fixed Jane bubble | Confirm approved size, anchor and crop; Jane default | Confirm landscape size/anchor and consistent visual priority | Approved avatar and both references; blocked. No numeric bubble size/position is invented |
| EX-04 Required unobstructed actions | Check bubble does not cover primary/secondary actions, navigation, scrolling or keyboard/safe areas | Check fixed bubble across landscape content and dialogs | Interaction/state review evidence; not run |
| EX-05 Required navigation | Review labels, selected section, back/home behavior against reference; preserve preview labels | Review equivalent access and focus/reading order; no unapproved navigation rail | Original navigation reference; blocked. Sixth category stays unresolved |
| EX-06 Required touch controls | Check reachability, spacing and visible feedback; proposed minimum target 44x44 CSS pixels where applicable | Check the same for touch in landscape; avoid small desktop-only controls | Numeric threshold is a new review proposal, not recovered visual approval; not run |
| EX-07 Required readability | Check content sizes, line wrapping, contrast, long workout titles and visible mode labels | Check readable line lengths/density and quantities without relying on zoom | Visual comparison + adjacent-width review; not run. No font/color tokens inferred from deck cover |
| EX-08 Approved functional invariants | Selecting Kay must preserve profile/plan/progress and provenance; bubble interaction semantics require review | Same invariants with reviewed guide positioning | G-01 copy/triggers still pending; no working selection or guide behavior claimed |
| EX-09 Approved Fitness boundary | Review budget, component totals, equipment/exclusions and action states for eventual journey | Same content and state semantics in landscape | Existing AC-04/07/14/16 apply later; no product acceptance run here |
| EX-10 Mode disclosure requirement | Show sample/live source correctly; no unlabeled sample progress | Same disclosure without crowding navigation/actions | Future screen review; no generated plan implied |
| EX-11 Loading state — NEW PROPOSAL | Identify waiting operation honestly; prevent duplicate action; keep bubble/actions unobstructed | Same semantics in intended landscape layout | No approved state image found. Spinner/skeleton/copy/layout not selected; proposal needs review |
| EX-12 Empty state — NEW PROPOSAL | Clearly explain no saved/current plan; propose an appropriate next step without fake activity | Same content and action priority in landscape | No approved image/copy found. Do not turn this into a working onboarding/planning flow in this task |
| EX-13 Error state — NEW PROPOSAL | Recoverable explanation/retry with inputs retained; no provider/sample fallback or fake success | Same clarity, focus and reachable controls | No approved state image/copy found; API 501 is not an implemented exercise error screen |
| EX-14 Completion review process | Record reference version, screen screenshot, discrepancies and Kaiwan's accept/revise decision | Independent landscape comparison and accept/revise decision | Both orientation reviews required before integration; none completed |

## Gate and next actions

Preparation artifacts exist, but YM-UX-01 does not pass until actual references and approval context are registered, missing/adaptation states and G-01/navigation conflicts are reviewed, and reference fidelity requirements can be checked. No screen integration approval is claimed. Later implementation still requires separate authorization, followed by screen-specific review before integration.

Can proceed without images: refine asset provenance, capture exact approval excerpts, resolve whether a tablet original exists, review the behavioral checklist/proposed states and G-01 copy requirements, and prepare the dashboard change list. Cannot proceed: choose replacement layouts, derive design tokens, crop an unapproved avatar, implement UI/persistence/providers/packaging, or call screen fidelity accepted.


---

# Source record: docs/EXPERIENCE_TO_DELIVERY.md

# Experience-to-delivery reconciliation

> Current amendment — 2026-11-04: APP:YM-PREVIEW-01 is authorized and implemented as a NEW design proposal with an in-memory Fitness sample. This bounded exception supersedes earlier blanket UI pauses; it does not approve final visuals, persistence or live AI. See [preview evidence](YM-PREVIEW-01_VERIFICATION.md). Earlier dated entries remain history.


Date: 2026-11-02. Documentation only. Further application implementation is paused by Kaiwan. YM-02A/B remain complete locally; scaffold appearance is not approved product design. All screen acceptance below is specified, not executed.

## Sources and authority

- **S1 — Current user baseline:** message beginning “Pause further application implementation. Reconcile the approved You&Me experience with the current plan before YM-02C.” This is explicit authority for recovered phone portrait/tablet landscape approvals, Exercise Dashboard option 1, fixed small Jane bubble, guide intent, full vision and review gates. The original images were not available for inspection; reaffirming an approval is not recovering its pixels.
- **S2 — Approved YM-01 records:** PRODUCT_FOUNDATION_AND_ACCEPTANCE.md and DECISION_LOG.md; five-minute journeys, honest modes, account-free profile, constraints, simulated entitlements and privacy boundaries. Later S1 experience amendments take precedence over conflicting presentation-only wording.
- **S3 — Retrieved history:** “Business proposal PowerPoint,” chat 690a7c12-512c-832e-90b6-7733bddf9fa1, and “Build AI Demo,” chat 6ae7f0c9-372c-83e9-9506-a476713ad7f7. Retrieved text supports lifestyle-platform/paid-subscription vision and reflection discussions, but does not expose original Exercise option 1 or orientation-specific image assets. Earlier assistant recommendations on mood metrics, prices, production technology or animation are not approvals. “This is perfect” without the associated image does not establish exact visual details.
- **S4 — Implementation evidence:** YM-02A_VERIFICATION.md, YM-02B_VERIFICATION.md; checkpoint acbe3d8 and existing uncommitted API/contracts. Foundation checks do not establish approved screen fidelity or working journeys.
- **S5 — Dashboard read:** plans/main revision 15, updated 2026-11-02T15:41:56.138Z, read-only through Sites DB/plans. Body truncated; only initial scope/control tasks visible. Product repository link now present. No full task graph or visual asset recovered.

Status legend: **R** = approval reaffirmed by S1, original visual asset missing; **A** = already-approved local product scope; **P** = new operational/design proposal awaiting review. No matrix row marks application acceptance passed.

## Matrix

All UI tasks below require checkpoint **YM-UX-01** before screen implementation, then individual screen review before integration. APP prefixes identify the application namespace, not renumbered historical task IDs. Vision IDs are local proposed backlog references, not new dashboard records.

| Requirement / source / status | Screen | Prototype / future scope | Delivery reference | Phone portrait acceptance | Tablet landscape acceptance |
| --- | --- | --- | --- | --- | --- |
| Primary mobile/tablet; orientations S1/R | Every screen and state | From prototype onward; desktop secondary | APP:YM-UX-01, YM-09, YM-10 | Reference-based portrait layout; no clipped content/horizontal overflow; controls and errors usable with touch/keyboard | Reference-based landscape composition, not simply enlarged phone; readable density, touch controls and no hidden content |
| Exercise Dashboard option 1: clean, scalable, small fixed Jane bubble S1/R | Exercise dashboard, workout detail | Working Fitness journey; precise mockup missing | APP:YM-UX-01 → YM-05 | Compare against actual approved option 1; bubble stays small/fixed without obscuring actions, keyboard or safe areas | Review approved landscape adaptation; bubble remains fixed and unobtrusive; preserve hierarchy, do not invent columns |
| Jane default/Kay selectable; friendly, empathetic, motivational, adaptive intent S1/R + S2/A | Guide selection, bubble, guidance, errors | Prototype guide identity/tone; deeper adaptation pending definition | APP:YM-UX-01, YM-03, YM-04, YM-05/06 | Jane starts selected; switching Kay preserves inputs/plans/progress; sample/provider labels visible; guide never blocks actions | Same behavior and tone; guide scale/position reviewed against tablet reference |
| First-time journey S2/A; onboarding in full vision S1/R | Welcome, eligibility, inputs, guide selection | Working support for Fitness/Nutrition; no real registration/payment | APP:YM-03 | Independently time welcome → saved plan + one action; review all fields/error/keyboard states against references | Equivalent journey in landscape with proper focus order and readable form layout; report timing separately |
| Home in full vision S1/R | Home/dashboard | Prototype entry to working journeys and clearly labelled previews | APP:YM-03 | Review hierarchy and entry points; don't mistake fixtures for actual progress | Review landscape grouping/reading order; no hidden preview labels or unapproved six-domain grid |
| Exercise/Fitness S1/R + S2/A | Dashboard, plan, action completion | Current working journey, AC-04/07/14/16 | APP:YM-05, YM-07 | Check time budget, equipment, excluded movement, complete/undo; original mode visible | Same outcomes and stable action identity with no bubble obstruction; review portrait-to-landscape navigation continuity |
| Nutrition/wellness S1/R + S2/A | Meal plan, recipe, shopping list | Nutrition working; broader wellness preview/future | APP:YM-06, YM-07; APP:YM-VISION-WELLNESS (P) | Review serving/ingredient consistency, exclusions, readable quantities, complete/undo and reset | Review recipe/list reading order and touch access; no loss of quantity/provenance information |
| Fashion S1/R | Fashion preview | Preview in prototype; proposed future working journey | APP:YM-VISION-FASHION (P) | Label preview; no simulated recommendation shown as live; reference review before UI | Landscape preview is intentional and labelled; no invented functional shopping workflow |
| Travel S1/R | Travel preview | Preview now; proposed future travel guidance | APP:YM-VISION-TRAVEL (P) | No real booking/payment or fake personalized itinerary claim | Same preview boundary; reference-based landscape layout |
| Etiquette S1/R | Etiquette preview | Preview now; proposed future learning/guidance | APP:YM-VISION-ETIQUETTE (P) | Clear preview and readable content; no invented working lesson workflow | Same boundary and reference-reviewed reading layout |
| Blog/community S1/R | Articles, community preview | Preview now; publishing, posting, sharing/moderation future | APP:YM-VISION-COMMUNITY (P) | Label sample content; no public post/share or invented members/activity | Review article/content layout; no false community activity or hidden preview status |
| Subscriptions/settings S1/R + S2/A | Simulated plan comparison, profile/settings | Prototype simulated Free/Plus and settings; public pricing/real billing deferred | APP:YM-08, YM-03, YM-07 | Simulation labels; comparison enables then reverses without deleting plans; edits/reset usable | Same state/reversal, readable dialogs, explicit session-reset scope |
| Weekly reflection S1/R, S3 supporting discussion | Reflection/insights | Retain in vision; prototype preview; proposed working reflection after core progress evidence | APP:YM-07 (underlying progress), APP:YM-VISION-REFLECTION (P) | Sample reflection labelled; no invented moods/streaks/health metrics; no real sharing | Same provenance; reference-reviewed insight hierarchy; no unapproved chart/storytelling design |
| Modes, saving/reopen and failure integrity S2/A | Results, progress, errors/reset | Core prototype acceptance; persistence still gated by S-01 | APP:YM-04–08, YM-09 | Retain original provenance on reopen; separate guided/live timing including provider latency; error/retry/reset unobscured | Same semantics across layout changes; forms/modal focus and original result labels survive navigation |
| Screen-by-screen approval S1/R | Every screen plus empty/loading/error/preview states | Before integration, not a final end-only review | APP:YM-UX-01 then owning task, YM-09 | Record reference ID/version, screenshot, discrepancies and Kaiwan review result for each screen | Separate landscape review evidence; phone approval never substitutes for tablet approval |
| Mobile packaging/distribution S1/R as roadmap requirement | Installed-app lifecycle, store/release artifacts | Proposed future milestone; separate from responsive web prototype | APP:YM-MOBILE-01 (P), launch readiness | Later device install/start/update verification for approved packaging choice | Later tablet installation/orientation testing; responsive screenshot does not prove app packaging |

## Guide reconciliation

Recovered intent: Jane/Kay are friendly, empathetic, motivational lifestyle guides, not emotionless skins. Retain approved identity separation: switching guides cannot alter user identity, stored plans, constraints or progress, grant entitlements, change provider/mode or relabel provenance. “Presentation-only” is narrowed to those data/functional invariants; it must not erase the earlier interpersonal intent.

**G-01 proposal:** express adaptation through wording, pacing and encouragement in response to explicit user preferences and the current journey/action state. Keep underlying capabilities and constraints equivalent for Jane/Kay. Review concrete guide-selection, success, setback and error copy before implementation. No inferred emotion, mood tracking, diagnostic claim, romantic companion behavior, voice/video or added personal-data collection is authorized. Exact tone differences, triggers and whether adaptive live copy is needed during the prototype remain unresolved. Do not retrofit contracts or prompts during this reconciliation.

## YM-UX-01 — Required design-reconciliation checkpoint

Status: open, blocked on missing references and guide-behavior review. Requirement to have this checkpoint is approved in S1; detailed process below operationalizes it. Responsibility: Product/UX & Design; actual documentation executor: Codex in this chat. Named specialist assignments are not execution evidence.

1. Recover and register approved assets by screen, option, original approval message, version, orientation and file/link; mark unavailable references explicitly. Never substitute the scaffold, a new generated mockup or an earlier assistant description for an approved image.
2. Reconcile the matrix, G-01 and the Home/Explore labels versus original section taxonomy. Sixth lifestyle category stays unresolved; the full screen list is not a six-category taxonomy. Final sample names remain deferred.
3. Build a screen review checklist from recovered references, including bubble behavior, type/spacing/density, interaction and all relevant states. No UI implementation under this checkpoint without new authorization.
4. Before each screen is integrated, present phone portrait and tablet landscape comparisons with the approved references, list discrepancies, and obtain screen-specific review. A functioning API, passing scaffold tests or a desktop screenshot does not satisfy this gate.

Proposed test viewports (P, not original approved dimensions): phone 390×844 and tablet 1024×768 CSS pixels, plus adjacent widths. Confirm the original canvas sizes when references return. Check touch operation, readable text, focus order, keyboard/safe-area behavior and fixed-bubble collisions. Physical phone/tablet review remains required at investor readiness; viewport emulation alone is limited evidence. Other orientations may degrade gracefully but do not replace the two primary acceptance orientations.

## Missing reference register and conflicts

| Item | Known approval / missing evidence | Required next action |
| --- | --- | --- |
| Exercise option 1 | S1 affirms approval and small fixed Jane bubble; image, version, dimensions and detailed states absent | Recover original approved phone image and tablet adaptation, plus approval context |
| Jane/Kay assets | Selection approved; actual likeness/avatar files, crop/scale and usage rights not established locally | Recover existing approved assets and usage basis; no new avatar generation |
| Phone/tablet reference set | Orientations approved; canvas dimensions, spacing, typography, colors and component details unavailable | Register exact references, screen names and versions; identify screens lacking references |
| Onboarding/home and remaining screens | Full vision reaffirmed; actual approved visual assets not recovered | Recover screen-by-screen assets, including guide interaction and reflection if approved |
| Reflection format | History discusses both data-led and storytelling alternatives; no unambiguous chosen layout recovered | Keep visual choice unresolved; do not adopt charts/badges/confetti or collect mood data by implication |
| Adaptive guide rules | Intent reaffirmed, recent presentation-only sentence too restrictive if read as no empathy/adaptation | Review G-01 and sample copy; preserve functional/data invariants |
| Navigation taxonomy | Local shell labels approved as defaults, but original full sections now explicitly restored | Map sections to navigation after reference recovery; do not erase fashion/travel/etiquette/community/reflection |

## Non-destructive task-ID crosswalk

Use `(namespace, raw ID)` identity. Existing raw IDs, dates, commits and titles are preserved; relationships are overlaps, not renaming or automatic status transfers.

| Application identity | Dashboard identity / evidence | Relationship and status |
| --- | --- | --- |
| APP:YM-01 Product foundation and acceptance | DASH:YM-01 Scope & delivery controls, visible in revision 15 | Different parent scopes; share product-boundary/acceptance concerns, not the same deliverable |
| APP:YM-01 scope evidence | DASH:YM-01.1 Confirm prototype boundaries (Completed) | Related scope; new experience amendments still require capture, not automatic completion |
| APP:YM-02A repository/frontend scaffold, checkpoint acbe3d8 | DASH:YM-01.3 Create You&Me GitHub repository (To do) | Repository instructions/templates locally committed provide partial reconciliation evidence. Frontend task is broader; no remote completion asserted or history rewritten |
| APP:YM-01 documentation sign-off | DASH:YM-01.4 Approve acceptance baseline (To do visible; body then truncates) | Local approval plus this amendment are evidence candidates, not a remote status update |
| No application release equivalent | DASH:YM-01.2 Establish delivery dashboard (Completed, b48968af…) | Dashboard implementation only; never proof of Fitness/Nutrition delivery |
| APP:YM-02B/C/D, YM-03–10, YM-UX-01 and vision IDs | Not visible in current truncated revision 15 read | Mapping unresolved; never infer matching raw numbers |
| APP:YM-10 investor demonstration | Historical revision 7 DASH:YM-10 automation infrastructure | Historical collision retained; current downstream dashboard item not reverified |

Full mapping remains blocked on a complete dashboard export/read. Revision 15 now links the application repository, correcting the old empty-repo observation. No dashboard mutations or synchronization were performed in this reconciliation.

## Revised next step

Remain paused on application implementation, including YM-02C. Reference recovery has reached its current limit. Next planning action is S-01 product review; no repeated asset search. UI work still needs its own reference/new-proposal review before implementation/integration. S-01 still needs independent approval before persistence. Mobile packaging strategy, app-store/distribution channels and installer/release validation stay proposed and unscheduled on a separate roadmap track; responsive layouts do not establish a native app or select React Native/Expo/PWA/wrapper technology.

## YM-UX-01 reference preparation update — 2026-11-02

Preparation artifacts: [reference register](REFERENCE_REGISTER.md), [Exercise option 1 checklist](EXERCISE_DASHBOARD_REVIEW.md), [dashboard sync proposal](DASHBOARD_SYNC_PROPOSAL.md), and [deck inspection inventory](references/deck-inspection.json).

Availability correction: the two known historical proposal decks in the project parent folder are now located and inspected. REF-001 has 13 text-only slides; REF-002 has 14 slides and a single cover PNG reused on slides 1/14. The PNG was visually inspected and extracted unchanged as REF-003; it is not an Exercise mockup or an identified approved Jane/Kay asset. Original decks were not edited. The register distinguishes file discovery from approval recovery and from new state/viewport/guide proposals. No original phone/tablet Exercise image or standalone approved guide asset was found within the restricted project search boundary. Earlier missing-asset observations above are historical; use the register for current availability.

Matrix rows for Exercise, devices, guides and screen review now reference REF-004/005/006 and EX-01–EX-14. Full-vision rows reference REF-007. Loading/empty/error treatments remain REF-P01 proposals; UX-Q-01 and G-01 remain pending. Every screen check remains unexecuted; the scaffold is excluded as a design reference.

YM-UX-01 stays Open: blocked on original screen/avatar references, approval context and G-01/navigation/state review. Reference preparation does not satisfy reference fidelity or authorize UI implementation. Earlier proposed YM-UX-01A intake is on hold until new assets/locations arrive; it is not the next required action. S-01 product review can proceed without those assets. This is a proposed local subtask, not a synchronized dashboard record. S-01 remains pending, A/B preserved, application implementation paused. Dashboard change list prepared only; no synchronization performed.

## Reference recovery limit and parallel planning — 2026-11-02

Kaiwan confirms reference recovery has reached its current limit. Do not repeat the same asset searches without a newly supplied location or asset. Original approved Exercise Dashboard images remain unavailable. Tablet adaptation and loading/empty/error treatments may need new design review. Final avatar artwork may remain pending while the approved Jane/Kay concept stays intact. Any later reconstruction must be labelled a new proposal, never an original approved reference.

YM-UX-01 remains Open. Missing images restrict visual fidelity claims and screen design/integration approval; they are not a blocker for all project work. Storage product review and other reference-independent planning can proceed. Further application implementation still requires separate authorization; S-01 and G-01 remain pending.

## APP:YM-PREVIEW-01 implemented proposal matrix — 2026-11-04

| Source / requirement | Screen | Scope / task | Phone/tablet check and status |
| --- | --- | --- | --- |
| Latest explicit new-proposal authorization; recovered Jane/Kay concept | Welcome, Settings | APP:YM-PREVIEW-01; overlap DASH:YM-03.1 | Default/selection, state invariance and initial-art disclosure checked; visual review pending |
| Goal and constraint-aware sample | Goal form, Home | Same task; partial APP:YM-03 | 320/390 phone and landscape tablet, validation/loading/long text reviewed; goal semantics remain displayed only |
| Clean card hierarchy, fixed unobtrusive guide | Fitness | Partial APP:YM-05; DASH:YM-04.1 | Narrow stacked cards, landscape split cards, reserved guide rail; new proposed design, no original fidelity claim |
| Honest provenance, completion/undo | Fitness, Progress, Settings | Partial APP:YM-04/07; DASH:YM-06.1/08.2 overlap | Local sample timing/equipment/exclusions and idempotent events verified; no durable save or provider proof |
| Broader experience | Nutrition, Explore, preview cards | Future proposed | Vision retained, unavailable labels; no extra working domain or sixth category decision |

New source: user attachment 64a04bcf-9cc9-4819-9145-47c0beaa4787, 2026-11-04. This permits a new proposal now without finding missing original assets. YM-UX-01 remains open for screen acceptance. Dashboard revision 17 supplies the newer crosswalk; raw IDs/history preserved.


---

# Source record: docs/MASTER_PLAN.md

# You&Me master plan — reconciled baseline

> Current amendment — 2026-11-04: APP:YM-PREVIEW-01 is authorized and implemented as a NEW design proposal with an in-memory Fitness sample. This bounded exception supersedes earlier blanket UI pauses; it does not approve final visuals, persistence or live AI. See [preview evidence](YM-PREVIEW-01_VERIFICATION.md). Earlier dated entries remain history.


Date: 2026-11-02. Status: application implementation paused by Kaiwan; YM-02A/B preserved; experience reconciliation open before further work.

## Source and ownership

Application repository designated by Kaiwan: https://github.com/kaiwanmirza-blip/you-n-me (private, main).
Inspected remote baseline: 74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de; last inspected remote main tree contained README.md only (historical inspection, not refreshed in this reconciliation). YM-02A is checkpointed locally at acbe3d8; YM-02B API/contracts now exist as uncommitted local changes. Neither is pushed; see YM-02A_VERIFICATION.md and YM-02B_VERIFICATION.md.
Dashboard: https://youme-build-command-center.newclay.chatgpt.site ; separate Sites project, version 5, recorded source c37c9cb85959501074a0e0732fbb097e85ceb09e. Its Git remote was not inspected. Older Project Hub also exists; supersession is proposed, not verified.

The original Library master-plan link was located but not readable. Original delivery map, project.json, decision/session logs and application AGENTS.md were absent from the inspected application main branch and local workspace. This document and its companion records are new; they do not assert the unavailable documents' contents.

Dashboard revision 7 was partially read: YM-01.1 boundaries and YM-01.2 dashboard marked completed; YM-01.3 repository setup and YM-01.4 acceptance approval marked To do. Its body was truncated. Dashboard work and reported dashboard checks are not application verification. Repository creation is now verified, but the broader setup task remains incomplete.

## Current milestone

Investor prototype: Fitness and Nutrition working journeys, Jane default/Kay selectable, all other domains preview-only, explicit guided/demo/live modes, simulated subscriptions, no real payments; Jarvis separate. Details and measurable scenarios: [product foundation](PRODUCT_FOUNDATION_AND_ACCEPTANCE.md).

Current delivery: YM-01 Product foundation and acceptance, using the user's task title. Documentation gate is complete following Kaiwan’s approval with refinements. Storage proposal S-01 remains gated for review before persistence implementation. The subsequent YM-02A authorization covered frontend/repository scaffold only; it does not authorize live-provider setup.

## Delivery and evidence

See [delivery map](DELIVERY_MAP.md), [decision log](DECISION_LOG.md), [session log](SESSION_LOG.md) and [project record](../project.json) and [storage reconciliation](STORAGE_AND_ISOLATION.md). These are repository-side records pending synchronization with the hosted dashboard. Do not maintain two contradictory approved task hierarchies; preserve local application IDs and record a crosswalk before any dashboard migration. This did not block YM-02A; dashboard synchronization remains pending.

## Proposed longer-term roadmap

All milestones below are proposed and unscheduled, not delivery commitments or releases.

| Milestone | Proposed exit evidence |
| --- | --- |
| Private pilot | Consented adult cohort completes core journeys; usability, failures and return usage reviewed; privacy/storage choices approved. |
| Product beta | Repeated useful journeys and retention evidence; operational support and data lifecycle tested. |
| Revenue validation / commercial beta | Test You&Me willingness to pay, pricing and cost-to-serve; define recurring value. Real billing requires a separate approval and implementation scope. |
| Launch readiness | Quality, accessibility, privacy, support, observability and rollback gates pass; distribution and commercial model approved. |
| Public launch and distribution | Approved public artifact and release evidence; measured acquisition experiments, including LinkedIn build stories and demonstrations. Source sharing is an explicit licensing decision. |
| Ongoing releases | Feedback drives bounded deliveries; verified fixes link to commits, checks and releases; draft notes become released notes only with artifact evidence. |

You&Me's consumer lifestyle business model is distinct from selling a universal planner, reusable code or a one-time download. Those are separate hypotheses with separate users, licensing, packaging, support and revenue validation. Neither download revenue nor recurring revenue is established. Release size and version numbering are separate decisions; no product release is recorded here.

## Foundation scope retained

YM-02 remains in progress and incomplete; YM-02A/B are complete locally with recorded checks; migrations/persistence and CI/integration remain open. Its subtasks are YM-02A repository/frontend scaffold, YM-02B API foundation and typed contracts, YM-02C SQLite/D1 migrations and session-scoped persistence, and YM-02D CI and foundation integration. Do not mark the parent complete after scaffold. S-01 recommends restoring the original SQLite/D1 architecture; hosted server retention is a material change from the browser-only draft and awaits review. YM-02A does not implement persistence.

## API foundation boundary

YM-02B provides runnable local Hono API, typed Zod contracts and the frontend health connection. Valid requests to unimplemented domain capabilities return 501; no provider, storage or persistent session exists. See [API foundation](API_FOUNDATION.md). S-01 remains pending review; no YM-02C work has started. Earlier remote inspections and dashboard evidence are historical, not a claim of fresh synchronization.

## Experience baseline amendment — 2026-11-02

Current authoritative reconciliation: [experience-to-delivery matrix](EXPERIENCE_TO_DELIVERY.md). Kaiwan reaffirms mobile and tablet as primary from the prototype, with phone portrait and tablet landscape reference orientations. Exercise Dashboard option 1's clean/scalable interface and small fixed Jane bubble are reaffirmed approvals, but actual visual assets are missing. The YM-02A/B scaffold is engineering evidence, not final visual design approval.

Preserve the full vision: onboarding, home, exercise, fashion, travel, etiquette, nutrition/wellness, blog/community, subscription/settings and weekly reflection. Fitness and Nutrition remain the only current working domain journeys; other areas may be labelled previews, with future working expansion proposed. The screen list does not resolve the sixth lifestyle category. Keep modes explicit, subscriptions simulated, payments absent and Jarvis separate.

Jane remains default, Kay selectable. Friendly/empathetic/motivational/adaptive intent is restored alongside invariant profile/plan/progress and mode/provenance behavior when guides switch. G-01's precise adaptation rules remain a proposal; no mood inference or new data collection is authorized. Current user requirements amend earlier overly narrow presentation-only wording without changing completed engineering evidence.

YM-UX-01 is an open design-reconciliation checkpoint, required before UI implementation; every screen also needs phone/tablet review against its actual approved references before integration. Missing references block visual-fidelity claims. Physical device review is required at investor readiness; proposed viewport sizes do not establish original mockup dimensions. All further application implementation, including YM-02C, is paused; S-01 remains separately pending.

Dashboard plans revision 15 was read partially, read-only. It now links kaiwanmirza-blip/you-n-me and retains its own scope/control task IDs. See the non-destructive APP/DASH crosswalk in the matrix; full mapping is unresolved because the body is truncated. No dashboard write occurred. Earlier revision 7/version 5 observations above are historical.

## Separate proposed mobile packaging and distribution track

APP:YM-MOBILE-01 tracks packaging/distribution strategy after responsive experience validation, independently of layout implementation. Proposed sequence: choose delivery form and supported platforms, define install/start/update lifecycle and real-device acceptance, plan beta distribution and signing/release ownership, then evaluate public store/distribution readiness. Dates, technology and channels remain unapproved. Responsive web screens do not prove installability, native-app completion or store release. Retain pilot, revenue validation, public launch, distribution and ongoing releases; You&Me subscriptions remain distinct from planner/code-download monetization.

## Reference preparation status

YM-UX-01 remains open. [REFERENCE_REGISTER.md](REFERENCE_REGISTER.md) records the two located historical proposal decks and unmodified extracted cover image; no approved Exercise option 1 phone/tablet image or identified Jane/Kay asset is recovered. Deck discovery does not restore historical Coach Ava naming, technology, pricing or projections as current product decisions. [EXERCISE_DASHBOARD_REVIEW.md](EXERCISE_DASHBOARD_REVIEW.md) is the first screen checklist; unsupported loading/empty/error treatments remain proposals. [DASHBOARD_SYNC_PROPOSAL.md](DASHBOARD_SYNC_PROPOSAL.md) is prepared, not applied. Reference recovery is at its current limit; next action is S-01 product review without implementation. S-01/G-01 remain pending; parent YM-02 stays open. No commit/push/publication in this task.

## Reference recovery limit and parallel planning — 2026-11-02

Kaiwan confirms reference recovery has reached its current limit. Do not repeat the same asset searches without a newly supplied location or asset. Original approved Exercise Dashboard images remain unavailable. Tablet adaptation and loading/empty/error treatments may need new design review. Final avatar artwork may remain pending while the approved Jane/Kay concept stays intact. Any later reconstruction must be labelled a new proposal, never an original approved reference.

YM-UX-01 remains Open. Missing images restrict visual fidelity claims and screen design/integration approval; they are not a blocker for all project work. Storage product review and other reference-independent planning can proceed. Further application implementation still requires separate authorization; S-01 and G-01 remain pending.

## S-01 reassessment after interrupted YM-02C

Current architecture reference: [SUPABASE_ARCHITECTURE_PROPOSAL.md](SUPABASE_ARCHITECTURE_PROPOSAL.md). Kaiwan approved SQLite/D1 lifecycle boundaries, then paused that implementation for Supabase evaluation. Four inactive SQLite/migration drafts exist; no migration/database or API integration was completed. Preserve them and A/B work. Supabase replacement remains proposed pending review; lifecycle rules are retained, not automatically mapped to Supabase defaults.

Recommend dedicated you-n-me-prototype (not created), existing Hono, Supabase Postgres and anonymous Auth with private Hono session transport. Read-only inventory exposes only Elevated Finds Studio in a Free organization; do not reuse it. No cloud schema/settings/data/key access or mutation. Free-slot availability is tentative until checked at creation. Project organization/region and hosted cleanup/backup/availability budget require separate review.

YM-02C is now a proposed local Supabase/Auth/Postgres scope pending approval, not a completed deliverable. YM-02D remains To do, YM-02 remains open, YM-UX-01/G-01 open. No UI redesign, providers, packaging, Neo4j, deployment or public/personal-data demo activation. Reference recovery remains at current limit. No persistence implementation authorized by this research task.

## Visible preview delivered — 2026-11-04

APP:YM-PREVIEW-01 implements the authorized sample journey and new phone/tablet proposal. Evidence and review: YM-PREVIEW-01_VERIFICATION.md; runbook PREVIEW_RUNBOOK.md. No full investor acceptance, durable saving, live generation or physical/native device acceptance asserted. Screens require review. Persistence S-01/02C and G-01 remain pending; parent02 open. Proposed pilot/public launch/distribution/revenue/ongoing release vision remains intact.


---

# Source record: docs/PREVIEW_RUNBOOK.md

# Local preview and Replit handoff

Use Node 24 (existing package minimum >=22.12), npm, and this repository root.

```powershell
Set-Location 'C:\Users\kaiwa\OneDrive\ALGDGADU\You&Me'
npm ci
npm run typecheck
npm test
npm run build
npm start
```

Open http://127.0.0.1:5174/. Stop the existing You&Me process first if the port is occupied. The current review server already uses this address. Ctrl+C stops it. Do not stop unrelated Node applications.

For hot reload, terminal 1: `npm run dev:api`; terminal 2: `npm run dev -- --port 5174 --strictPort`. Stop npm start first. Vite proxies /api to 8787. Static `npm run preview` is not the recommended integrated server.

Five-minute review (not a measured saved-plan usability acceptance):
1. Welcome: Jane selected; try Kay. Read sample/memory disclosures.
2. Continue; retain fictional goal, beginner, 20 minutes, no equipment. Prepare sample.
3. Home: view Fitness. Review inputs, source, three blocks and total time.
4. Choose “I have less time today”; set 15 and dumbbells, optionally exclude squats. Prepare and open the new plan. Total is 15, with curl replacing squat.
5. “Use this plan for this session.” Mark warm-up complete; observe 1/3. Undo; observe 0/3.
6. Settings: try Demo and unavailable Live; old plan remains Guided. Change guide; state stays. Restart can be cancelled or confirmed. Reload resets everything.

Health: `Invoke-RestMethod http://127.0.0.1:5174/api/health` returns status=ok/service=you-n-me-api. GET /api/plans/example remains 501. No database or provider required.

## Replit import preparation, not an import or deployment

The focused local branch is `feat/ym-preview-01`. November 4 stopped before commit. November 8 authorizes feature-branch push; use the actual reported commit/push receipt. To make it importable later, verify the reported branch exists on origin, then Git-import https://github.com/kaiwanmirza-blip/you-n-me and select the branch. Do not import the remote initial README and claim this preview is present. No parallel Replit implementation was created.

Install `npm ci`; build `npm run build`; start `npm start`. `.replit` Run builds then starts, with HOST=0.0.0.0 and PORT=5174 and one external port mapping. Same Hono process serves static frontend and /api; no Vite proxy or second exposed port needed in this mode. Local default stays 127.0.0.1. HOST/PORT handling and routing verified locally; Replit platform import, runtime version availability and hosting remain unverified. No secrets are needed. Future privileged keys remain server-only, never VITE_*.

Do not enable billing or publish from this handoff. A paid Replit plan does not imply provider credits or unlimited deployments. See official [configuration](https://docs.replit.com/features/project-setup/configuration) and [ports](https://docs.replit.com/features/project-setup/ports) documentation. Hono static serving follows its [Node adapter guidance](https://hono.dev/docs/getting-started/nodejs).


---

# Source record: docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md

# YM-01 — Product foundation and acceptance

> Current amendment — 2026-11-04: APP:YM-PREVIEW-01 is authorized and implemented as a NEW design proposal with an in-memory Fitness sample. This bounded exception supersedes earlier blanket UI pauses; it does not approve final visuals, persistence or live AI. See [preview evidence](YM-PREVIEW-01_VERIFICATION.md). Earlier dated entries remain history.


Status: YM-01 documentation gate complete on 2026-11-02 (America/Chicago). Product defaults approved by Kaiwan with the refinements below. Storage recommendation S-01 remains explicitly deferred for review before persistence implementation.
This document specifies intended behavior. No application behavior is implemented or verified by this document.

## Authority and scope

Confirmed by the user's instructions: investor prototype; Fitness and Nutrition are working journeys; every other area is preview-only; explicit guided/demo/live modes; simulated subscriptions; no real payments; Jane is the default guide and Kay is selectable; guide identity is separate from fictional sample profiles; Jarvis remains separate.

Detailed defaults below are approved except explicitly deferred choices and storage proposal S-01. The later [experience amendment](EXPERIENCE_TO_DELIVERY.md) governs device priorities, original visual-reference fidelity, guide reconciliation and the implementation pause. The scaffold is not approved final product design. This is a new baseline, not a reconstruction of the unavailable original master plan. Decision IDs refer to DECISION_LOG.md. Documentation completion is not application acceptance.

## First five minutes (P-01)

| Time budget | User action | Observable value |
| --- | --- | --- |
| 0:00–0:30 | Read the prototype/mode label; continue with Jane or select Kay. | Understand who guides the experience and whether outputs are sample or live. |
| 0:30–1:15 | Choose Fitness or Nutrition; use a fictional sample profile or enter a minimal personal profile. | Avoid a long registration flow; understand what information is being used. |
| 1:15–2:00 | Set a goal and practical constraints; review and edit them. | See that the plan reflects available time, equipment or food preferences. |
| 2:00–3:30 | Generate or reveal a clearly labelled plan. | Receive a feasible workout or one-day meal outline with concrete next actions. |
| 3:30–4:30 | Change one constraint and regenerate; compare the result. | Demonstrate meaningful personalization rather than only a static screen. |
| 4:30–5:00 | Save the selected plan, mark one action complete and view progress. | Leave with an actionable plan and visible, reversible progress. |

Onboarding is account-free. Measure Fitness and Nutrition independently, each starting at welcome and ending with a saved plan plus one completed action. Five minutes is a usability target, not a promise or hard provider timeout. Record guided and live timing separately, including end-to-end elapsed time, provider latency and non-provider time. Report failures and target misses; do not omit slow runs. A provider outage is an incomplete live run, never guided success. Guided generation needs no provider; durable save requires the local/hosted application storage service under S-01. The illustrative timings above are guidance, not five separate acceptance gates.

## Guides, profiles and modes (P-02, P-03)

- Jane is initially selected. Kay is selectable at onboarding and later in profile/settings. Changing guides preserves the user's profile, plan constraints and completion history. Friendly, empathetic, motivational and adaptive guide intent is reaffirmed; exact adaptation rules remain G-01 for review in EXPERIENCE_TO_DELIVERY.md.
- A guide is a product persona. Neither guide is a sample user, account owner, credentialed clinician or claim of a real person responding.
- Sample profiles are explicitly fictional, with visible summaries, editable inputs and sample-data badges. “Sample A/B” are temporary fixture identifiers; final names are deferred. Choosing a sample never implies the user supplied those details.
- Keep guide selection, profile identity and data origin as separate fields. Never infer a user's name or attributes from the guide.

| Mode | Input and output behavior | Required disclosure |
| --- | --- | --- |
| Guided | Step-by-step scripted walkthrough over a fictional fixture; no provider call. | “Guided demonstration · fictional sample data · sample response.” |
| Demo | Freely explore labelled fixtures; only supported fixture combinations may produce sample plans. | “Demo · sample response · not live AI.” Unsupported edits ask the user to select a supported sample or explicitly switch to live. |
| Live | Validate current inputs and call the explicitly configured provider; revalidate output before display. | “Live” plus provider name and response time. No configured provider means unavailable, not simulated success. |

Mode is visible on every planning/result screen and persisted with each saved result. Changing modes does not relabel or overwrite an existing result. Switching to live requires explicit action. No silent provider or sample fallback; retry preserves inputs. The detailed provider and zero-spend setup remain an engineering decision, not authorization to enable a paid service.

## Profile fields (P-04)

“Required” means required before generating the selected journey, not before browsing. Fields irrelevant to that journey are skippable. Every entered field is editable; changing a field does not silently regenerate or rewrite saved plans.

| Field | Requirement | Default / handling |
| --- | --- | --- |
| Guide | Required, preselected | Jane; Kay selectable; always editable. |
| Data source | Required, explicit choice | Fictional sample or personal inputs; clearly labelled. |
| Journey | Required | Fitness or Nutrition. |
| Display name | Optional, skippable | Blank allowed; no legal name needed. |
| Adult eligibility | Required for personal live journey | 18+ self-attestation; no birth date. Under-18 or unknown remains preview/demo-only. |
| Primary goal | Required per journey | Choose a practical goal; avoid diagnosis or treatment goals. |
| Fitness experience, available minutes, available equipment | Required for Fitness | Beginner / 20 minutes / none; visible and editable. Supported duration: 15–60 whole minutes inclusive. |
| Preferred intensity | Optional, skippable | Unspecified when skipped; use a conservative beginner-appropriate option and disclose it rather than inventing a preference. |
| Fitness limitations or movements to avoid | Optional, skippable | Explicit “none,” entered constraint or “prefer not to say”; blank never means medically cleared. |
| Dietary pattern, meals/servings, preparation time | Required for Nutrition | Balanced / three meals for one adult / 20 minutes per meal; visible, editable defaults. |
| Food allergies and exclusions | Required acknowledgement for Nutrition | Choose none, list exclusions, or unknown/prefer not to say. Unknown does not become “no allergies”; offer generic preview rather than claim a safe personalized plan. |
| Cuisine, dislikes, budget band | Optional, skippable | Generic choices when absent; do not invent a numeric budget or location. |
| Units | Optional, skippable | US customary initially; metric selectable, with consistent conversions. |
| Age beyond adult eligibility, height, weight, sex, diagnoses, medication | Not collected in this prototype | Not needed for the proposed nonclinical journeys. |
| Email, password, address, payment data | Not collected in this prototype | No account or checkout dependency. |

Show defaults before generation. Missing required values block generation with a field-specific explanation. Keep optional omissions visible as unspecified. Allow profile edits without erasing saved artifacts; identify which input snapshot produced each result.

## Fitness contract (P-05)

Inputs: practical goal (e.g. build a consistent routine), experience, session duration, equipment, optional movement exclusions and preferred intensity. Profile fields above define required versus optional status.

Outputs: one session with warm-up, ordered exercises, sets/repetitions or timed intervals, rests, cooldown, estimated total duration, accessible instructions and a lower-intensity alternative. Explain how time/equipment shaped the session. Save a versioned result and allow individual actions to be completed and undone.

Acceptance boundaries: no unavailable equipment or explicitly excluded movement. Supported duration is 15–60 whole minutes inclusive; reject unsupported values with an editable field error. Estimated total includes warm-up, exercises, transitions, all rests and cooldown, and must be positive and no greater than the selected budget. Show the component totals; reject an over-budget result rather than silently dropping components. Actual completion time may differ from the estimate. Validation rejects malformed, contradictory or incomplete results with a recoverable message. The prototype does not diagnose, prescribe rehabilitation, promise weight loss or certify exercise safety. Concerning symptoms or an unsupported medical request receive a scope message rather than a personalized exercise prescription. This is an acceptance boundary, not completed clinical review.

A completable Fitness action is one listed warm-up, exercise block or cooldown with a stable action ID. Completing a block means its displayed sets/intervals are complete; rests are included in its timing, not extra progress credits. Progress counts completed actionable blocks, not inferred workouts or calories.

## Nutrition contract (P-06)

Inputs: practical goal (e.g. simplify balanced meals), dietary pattern, explicit allergy/exclusion acknowledgement, number of meals/servings, preparation time and optional cuisine/dislikes/budget band.

Outputs: one-day meal outline with ingredients, approximate portions, preparation steps/time, substitutions and a consolidated shopping list. Explain how preferences shaped it. Save a versioned result; allow meal actions to be completed and undone.

Acceptance boundaries: honor explicit ingredient exclusions and dietary constraints; do not claim allergy certification or cross-contamination safety. Each meal states servings and whether quantities are per serving or per recipe. Scale ingredients and portions consistently when servings change. Consolidate shopping quantities across meals using compatible units; substitutions update both recipe and shopping list. Every required recipe ingredient must appear in the list, including explicitly labelled pantry items. Per-meal preparation estimates must fit the selected budget. Reject inconsistent or unsupported results. Omit calculated calorie targets and therapeutic diets. No diagnosis, disease treatment, eating-disorder coaching, supplement prescriptions, guaranteed outcomes, grocery checkout or clinical nutrition claims. Exact nutrition calculations and a reviewed nutrition data source are future decisions.

A completable Nutrition action is one meal with a stable action ID, marked eaten/completed by the user; shopping and individual ingredients do not count as meal progress. Completion is a user record, not proof of dietary adherence.

## Navigation and sixth-area recommendation (P-07)

Approved shell: **Home, Fitness, Nutrition, Progress, Explore**; Profile & Settings is a utility entry. Home summarizes the next action and current mode; Progress shows only recorded prototype activity. These are interface destinations, not six lifestyle domains.

The sixth lifestyle category remains unresolved, with no approved name or user job. “More” is not its resolution. The original remaining domain names were unavailable; do not invent an approved six-domain taxonomy. Explore may explain that additional areas are preview-only without naming a sixth domain. Obtain domain labels before implementing a fixed six-domain grid. Progress and Settings are not substitutes for the sixth domain.

## Persistence, completion and reset (P-08)

Storage is governed by S-01 in [STORAGE_AND_ISOLATION.md](STORAGE_AND_ISOLATION.md). The previous browser-only persistence proposal is superseded as a recommendation, not silently implemented. Recommended consistent architecture: application API with SQLite for local development and D1 when hosted; browser holds an anonymous session cookie, transient drafts and non-sensitive UI state, not a second durable plan store. Account-free remains approved; cross-device recovery is not promised. Hosted server retention is a material change from browser-only saving and needs Kaiwan's review before persistence implementation. Live requests transmit inputs to the named provider; provider retention and hosted session protection remain gates before live activation.

Save stores a plan ID/version, journey, input snapshot, guide, mode, provider/sample provenance, creation timestamp and completion state. Save explicitly; do not imply an unsaved result is stored. Regeneration creates an unsaved candidate and preserves the previously saved version. Reload restores saved artifacts and their provenance; optional profile preference saving must be explicit.

Completion updates only the selected saved action; repeating completion does not double-count. Undo restores that action and derived progress. Editing a profile never rewrites historic snapshots. Reset has two actions: **Restart walkthrough** resets only guided fixture state; **Clear this session's prototype data** confirms before deleting session-owned application records and clearing the browser cookie/cache as specified in S-01. This revised label accurately covers server storage. Neither claims deletion of provider data, backups or other sessions. Cancelling changes nothing. Failed deletion retains a recoverable session and reports failure; storage failures never show success.

## Simulated subscription acceptance

Use visibly simulated Free and Plus entitlements. Free and Plus both retain the core working journeys. Plus simulation enables an optional side-by-side comparison of two saved versions; switching back to Free disables that comparison control without deleting either version or progress. Persist the simulated choice under the same session boundary as plans, label it “Simulation · no charge,” and restore Free on full session reset. No price, billing data, paid API call or real subscription is created.

## Investor acceptance checklist

All scenarios below are **specified, not run**. Fixtures and runtime evidence do not exist yet. Each executed check must record date, app commit, environment, steps, observed result and evidence link; a dashboard completion card is insufficient.

| ID | Steps | Expected observable result |
| --- | --- | --- |
| AC-01 | Start independently at welcome for Fitness and Nutrition; run guided and live separately through saved plan plus one completed action. | Report each elapsed time, provider latency, failures and five-minute target result separately. Guided generation needs no provider; storage-service failures remain visible. |
| AC-02 | Select Kay; use Sample A; edit its goal; switch guides. | Guide identity and fictional profile remain distinct; edits and artifacts survive guide switching. |
| AC-03 | Skip optional fields; omit a required field; correct it. | Browsing works; generation explains the missing value; optional omission does not invent personal data. |
| AC-04 | In live Fitness, generate for no equipment/20 minutes; change to available dumbbells/30 minutes and regenerate. | Named provider receives changed inputs; validated output meaningfully changes and honors constraints; prior result is preserved. |
| AC-05 | In live Nutrition, change servings and add an ingredient exclusion; regenerate. | New result reflects servings, excludes that ingredient and updates the shopping list; no unsupported safety guarantee. |
| AC-06 | Save one plan from each journey; reload the app in the same session, locally and hosted. | Exact saved versions, input snapshots, provenance and completion state return under the documented session boundary; no cross-device recovery is implied. |
| AC-07 | Complete an action twice, reload, then undo and reload. | One completion is counted; undo restores the action and correct progress; other plans are unchanged. |
| AC-08 | Generate a new candidate without saving, then reload. | Saved plan remains intact; unsaved content was never represented as persisted. |
| AC-09 | Cancel full session reset, then confirm it; separately restart guided walkthrough; inject a delete failure. | Cancel preserves data; confirmed reset deletes exactly S-01 session records and browser state; other sessions remain intact. Walkthrough restart preserves personal plans. Failed deletion is reported and recoverable. |
| AC-10 | Make live provider unavailable or return an invalid response; retry. | Honest error, preserved inputs, no sample/provider fallback, no false completion; explicit mode switching remains possible. |
| AC-11 | Simulate a storage write failure during save. | Failure is visible; no false saved state; retry or recovery is available. |
| AC-12 | Inspect Explore; switch simulated Free to Plus, reload, compare saved versions, then return to Free. | Preview-only boundaries hold; comparison enables then disables; versions/progress remain intact; simulation labels persist; no price, payment, charge or Jarvis dependency. |
| AC-13 | Navigate onboarding and both journeys with keyboard and at narrow/mobile width. | Controls and labels remain usable, focus is visible and errors are associated with inputs; no inaccessible blocking overlay. |
| AC-14 | Test Fitness at 15 and 60 minutes; request 14/61; inspect component sums and an over-budget result. | Valid totals include all components and never exceed budget; unsupported inputs and invalid output get recoverable errors. Optional intensity can be skipped without fabricating a preference. |
| AC-15 | Double Nutrition servings; substitute an ingredient; inspect all recipes and shopping totals. | Quantities scale coherently with explicit portion basis; compatible units consolidate; substitutions propagate; prep estimates fit budget. |
| AC-16 | Try under-18/unknown eligibility, unknown allergies, excluded ingredients/movements and a medical-treatment request. | Personal live eligibility and Nutrition acknowledgement rules hold; excluded content is rejected; unsupported medical requests receive scope guidance, not a prescription. |
| AC-17 | Edit an unsupported demo combination; switch demo to live explicitly; open a saved sample while live is selected. | No silent call/fallback; unsupported edit is explained; saved sample retains original mode/provenance. |
| AC-18 | Create two isolated browser sessions; attempt cross-session reads/updates/deletes; clear one session; restart service and reload the other. | No cross-session access; remaining session persists; deleted session cannot recover old records. Exercise SQLite and D1-compatible paths. Inspect browser persistence for absence of durable profiles/plans. |

Release acceptance requires both journeys, honest modes, persistence/reversal checks and failures to pass. Guided checks alone cannot certify live capability. Product approval of this specification and implementation acceptance are separate gates.

## YM-01 documentation gate

Satisfied: approved defaults and exceptions recorded; inputs/outputs and mode boundaries specified; timing, duration, quantities, negative cases, actions, entitlement reversal and storage/reset contracts documented; material storage change visibly deferred with an implementation gate; YM-02 split preserves its parent scope. All AC-01–AC-18 remain unexecuted. Remaining architecture approval does not prevent YM-02A's frontend scaffold; it blocks persistence implementation, not documentation completion.

## Experience amendment and UI gate

Phone portrait and tablet landscape are primary prototype reference orientations. Preserve the full screen ecosystem in EXPERIENCE_TO_DELIVERY.md, even when other domains are previews. Exercise Dashboard option 1 and its small fixed Jane bubble are reaffirmed by Kaiwan; original assets are missing, so no visual fidelity has been verified. YM-UX-01 must reconcile references before UI implementation and each screen must be reviewed against phone/tablet references before integration. Guide adaptation details remain a proposal with data/functional invariants retained. AC-01–AC-18 remain unexecuted; AC-13's earlier generic mobile check is supplemented by the matrix's phone/tablet/reference checks. Further implementation is paused. Original YM-01 documentation sign-off is retained, not a claim that these new experience checks passed.


---

# Source record: docs/REFERENCE_REGISTER.md

# YM-UX-01 reference register

> Current amendment — 2026-11-04: APP:YM-PREVIEW-01 is authorized and implemented as a NEW design proposal with an in-memory Fitness sample. This bounded exception supersedes earlier blanket UI pauses; it does not approve final visuals, persistence or live AI. See [preview evidence](YM-PREVIEW-01_VERIFICATION.md). Earlier dated entries remain history.


Date: 2026-11-02. Status: preparation complete; YM-UX-01 remains open. No image is promoted to approved UI reference merely because its file exists.

## Inspection boundary and method

Inspected the current repository recursively, excluding dependencies, Git internals and generated builds, plus the two previously identified proposal files in `C:\Users\kaiwa\OneDrive\ALGDGADU`. Parent-directory listing was filtered to AI_Life_Coach/You&Me names; no unrelated personal folders or sibling projects were searched. No other dedicated asset folder is known. If another project asset location exists, it remains outside this inspection until identified.

Read both PPTX packages without changing them: slide text, slide dimensions, relationships and embedded-media inventory. Visually inspected the original embedded PNG after extracting an unchanged copy. No deck re-render, slide editing, new mockup or avatar generation. Package text inspection is not a visual review of every slide. Evidence: [deck inventory](references/deck-inspection.json). Approval evidence refers to current user reaffirmations and the conversation sources in EXPERIENCE_TO_DELIVERY.md, not unavailable original image approvals.

## Located original references

| ID / classification | Original path and version | Screen / device-orientation | Approval evidence | Limitations |
| --- | --- | --- | --- | --- |
| REF-001 Original reference located; historical proposal candidate | `C:\Users\kaiwa\OneDrive\ALGDGADU\AI_Life_Coach_Proposal_Presentation.pptx`; unversioned filename, 40,277 bytes; SHA-256 2f0584da0f7123b6b2ca2141923ef32b7a565dbfa3189838da06b6743ec2ec0f | 13 proposal slides; 4:3 landscape slide canvas; no embedded media or recoverable screen screenshots | Filename/project context establishes a proposal artifact; no version-specific design approval recovered | Historical Coach Ava naming, architecture/pricing/financial assumptions are not approved current requirements. Does not supply phone/tablet mocks or Jane/Kay assets. “Original” means existing source artifact, not verified earliest/authoritative final proposal. |
| REF-002 Original reference located; historical proposal candidate | `C:\Users\kaiwa\OneDrive\ALGDGADU\AI_Life_Coach_Proposal_Presentation_v2.pptx`; filename v2, 2,579,702 bytes; SHA-256 11b68b87bd4cce270482279222f5317fd1ee69352645a5cb026800819ed00472 | 14 slides; 4:3 landscape slide canvas. Slide 14 titled Web & Mobile App Mock UI Concepts contains descriptive text and the reused cover image | Existing v2 file located; no approval establishing it as current design source | No embedded Exercise option 1 screen. Text about homepage/chat/weekly plans/media hub is conceptual. v2 naming does not prove approval or precedence over later decisions. |
| REF-003 Original embedded image located; identity unconfirmed | REF-002 member `ppt/media/image1.png`; unchanged extracted copy [proposal-v2-image1.png](references/proposal-v2-image1.png); member hash/pixel data in inventory | 1536x1024 cover portrait with title/byline/domain, referenced by slides 1 and 14; neither phone portrait nor approved tablet canvas | None tying this image to Jane/Kay, approved likeness or usage rights | Visual inspection confirms cover artwork, not a dashboard mockup. Do not crop/adopt it as Jane/Kay or infer brand tokens from it without identification/approval. Original deck remains untouched. |

## Recovered approvals, image missing

| ID / classification | Path / version / screen | Device-orientation | Approval evidence | Limitation / next action |
| --- | --- | --- | --- | --- |
| REF-004 Approval recovered from conversation, image missing | No file; Exercise Dashboard option 1; exact version unknown | Phone portrait | Kaiwan's explicit experience baseline reaffirms clean/scalable interface and small fixed Jane bubble | Need full original approved screenshot and associated approval message; no pixel-fidelity decision possible |
| REF-005 Approval recovered from conversation, image missing | No file; tablet Exercise Dashboard adaptation/version unknown | Tablet landscape | Primary orientation reaffirmed; actual separate tablet mockup approval not recovered | Supply original tablet reference if it exists; otherwise explicitly mark adaptation as not yet designed/approved rather than call it recovered |
| REF-006 Approval recovered from conversation, image missing | No standalone Jane/Kay source assets; versions unknown | Both targets; Jane default/Kay selectable | Selection and identity intent approved in YM-01 and reaffirmed experience baseline | Need approved avatar sources, crop/size variant and approval context; REF-003 is not identified as either guide |
| REF-007 Approval recovered from conversation, image missing | No screen assets for onboarding, home, nutrition/wellness, fashion, travel, etiquette, blog/community, subscriptions/settings, weekly reflection | Phone portrait and tablet landscape | Full vision reaffirmed; individual layout approval not established by screen inclusion | Provide existing approved references screen by screen. Reflection chart/storytelling selection remains unresolved. No invented layouts. |

## New proposals awaiting review

| ID / classification | Path / version / screen | Target | Evidence / limitation |
| --- | --- | --- | --- |
| REF-P01 New proposal awaiting review | [Exercise review checklist](EXERCISE_DASHBOARD_REVIEW.md), revision 1; loading/empty/error states | Both orientations | Behavioral review cases only; no images, selected visual treatment or approved state copy |
| REF-P02 New proposal awaiting review | UX-Q-01 in experience matrix; 390x844 and 1024x768 CSS pixels | Phone portrait / tablet landscape | Test viewports, not recovered original image sizes; use original dimensions when supplied |
| REF-P03 New proposal awaiting review | G-01 guide adaptation rules in experience matrix | Guide messaging on both devices | Friendly/empathetic/motivational intent approved; operational triggers/copy remain pending. No new behavior implementation |

## Exact intake request

Original filenames are unknown. The following are **suggested intake names**, not claims these files exist. Supply the original image/export where possible, without restyling; include its original filename, version/date, source chat/approval excerpt and whether it was the chosen option.

1. `exercise-option1-phone-portrait-approved.png` — complete approved screen at its original resolution, including all navigation and the Jane bubble. Include any additional scrolled view needed to show all actions.
2. `exercise-option1-tablet-landscape-approved.png` — actual existing approved tablet screen. If none exists, say so; a new adaptation would require separate design authorization/review.
3. `jane-avatar-approved.png` and `kay-avatar-approved.png` (or original SVG/JPG/WebP) — existing source artwork and approved bubble crop/variant, if separate. Confirm whether REF-003 depicts either guide; do not assume that it does.
4. `exercise-option1-approval-context.png` or a source-message link/text export — chosen option, orientation and any comments on placement/scale. For other approved screens, provide `screen-name-device-orientation-approved.png` plus the same context.
5. Existing loading/empty/error state references, if any. Their absence is acceptable to record; new states remain proposals. Do not create screenshots of the scaffold as replacements.

No need to resend the two located proposal decks unless a different later version is the approved source. Final sample names, sixth category, pricing/licensing, older hub retirement, S-01 and G-01 remain deferred/pending as previously recorded.

## Reference recovery limit and parallel planning — 2026-11-02

Kaiwan confirms reference recovery has reached its current limit. Do not repeat the same asset searches without a newly supplied location or asset. Original approved Exercise Dashboard images remain unavailable. Tablet adaptation and loading/empty/error treatments may need new design review. Final avatar artwork may remain pending while the approved Jane/Kay concept stays intact. Any later reconstruction must be labelled a new proposal, never an original approved reference.

YM-UX-01 remains Open. Missing images restrict visual fidelity claims and screen design/integration approval; they are not a blocker for all project work. Storage product review and other reference-independent planning can proceed. Further application implementation still requires separate authorization; S-01 and G-01 remain pending.

## REF-P04 — New implemented proposal, 2026-11-04

Source: latest user implementation attachment. Files: src/App.tsx, src/styles.css; review captures references/preview-01/phone-fitness.jpg and tablet-fitness.jpg. Phone portrait and tablet landscape browser emulation. No original approval claimed. Reuses scaffold palette as a proposal, not verified brand tokens/Option B. Placeholder J/K initials, no historical portrait. Final screen/guide artwork acceptance pending.


---

# Source record: docs/SESSION_LOG.md

# Session log

## 2026-11-02 — YM-01 documentation

Requested by Kaiwan: complete Product foundation and acceptance documentation; preserve prototype scope; stop before application implementation.

Executed by: Codex in this chat. Responsibility: product definition and documentation. No specialist agents were spawned; dashboard specialist assignments do not establish execution by those agents.

Read-only verification: GitHub main tree at 74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de contains README.md only; README says “# you-n-me.” The local project folder had no files or repository. No application instructions were available. Prior baseline includes partial dashboard revision 7 and saved dashboard version 5; not freshly verified in this session.

Clone attempt failed: GitHub hostname resolution/getaddrinfo failure. New documentation was saved locally for review. No Git commit, push, pull request or dashboard update was made. GitHub and the hosted dashboard therefore do not contain these local changes.

Created: product foundation/acceptance specification, reconciled master plan, proposed delivery map, decision log, session log and project.json index. Added README linking the local records. These replace no original planning documents: originals were unavailable.

Verification: documentation link, JSON and acceptance-ID checks recorded after authoring. Application tests, browser journeys, provider calls and investor acceptance were not run; no application exists in the inspected baseline. Product approval remains pending; no implementation started.

Next: Kaiwan reviews proposals P-01 through P-10; retrieve missing originals and reconcile dashboard IDs before engineering setup. Preserve the verified original README content when synchronizing this local README addition.

## 2026-11-02 — YM-01 finalization

Kaiwan approved the latest product review subject to six explicit refinements. Codex executed documentation work only in the Product/Documentation responsibility; no specialist agents ran. Updated the product specification, decision log, master plan, delivery map, project index and README; added storage reconciliation. Earlier pending statuses above are historical and superseded by this entry.

YM-01 documentation gate complete: independent usability timing, provider latency reporting, 15–60-minute Fitness estimates within budget, quantity/serving rules, negative cases, mode transitions, optional intensity, stable completable actions and reversible simulated entitlement specified. All 18 application scenarios remain unexecuted.

S-01 recommends original SQLite/D1 storage with anonymous session isolation, explicit data locations and deletion semantics. Hosted server persistence is a material change from the browser-only draft and awaits Kaiwan review before YM-02C. Sixth category, final sample names, pricing, licensing and older hub retirement remain deferred. Provider retention and hosted operational privacy controls gate later activation.

YM-02A/B/C/D preserve repository/frontend, API/contracts, migrations/persistence and CI/integration scope. Parent YM-02 remains To do. No app files, dependencies, provider calls, Git commits/pushes or dashboard updates were made. Local documentation remains unsynchronized. GitHub baseline was not refreshed during finalization. Next: YM-02A only after fresh repository/instruction/change inspection; no automatic implementation.

Validation: JSON/index/link and 18 unique acceptance-ID checks performed after authoring; application checks not run. See current product specification documentation gate for the completion boundary.

## 2026-11-02 — YM-02A repository and frontend scaffold

Authorization: Kaiwan requested YM-02A only, preserving finalized documents and unrelated work, leaving S-01 pending and parent YM-02 open. Executed by Codex in this chat; Engineering POD responsibility / frontend and repository foundation specialist role. No subagents executed work.

Prerequisites verified: YM-01 approved documentation gate and latest records read; no ancestor repository instructions found. Remote GitHub tree and Git fetch confirmed main at 74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de with README only. Initialized this local workspace as that checkout without overwriting the modified local README or untracked planning documents. No prior local index/staging existed.

Added React/TypeScript/Vite static shell, two scaffold-boundary tests, reproducible lockfile/scripts, README run/check instructions, AGENTS.md, environment/ignore guidance and task/bug/PR templates. Corrected Windows command-shim failure in the ampersand-containing path by invoking package Node entry points directly. No API, typed API contracts, persistence, migrations, CI or product journeys were implemented.

Evidence: docs/YM-02A_VERIFICATION.md. npm ci passed (47 packages audited; zero vulnerabilities reported); typecheck passed; two Vitest tests passed; production build passed. Development shell inspected in browser at desktop and 390x844; no horizontal overflow; dev warning/error log empty. Built production preview loaded locally. Browser access to the sandbox preview failed; outside-sandbox loopback preview succeeded. Documentation JSON/links and protected document SHA-256 checks passed; git diff --check passed with only a line-ending normalization warning. Product spec, decision log and S-01 document are byte-for-byte unchanged. AC-01–AC-18 remain unexecuted.

Local YM-02A complete; parent YM-02 In progress; B/C/D To do. S-01 remains pending review. GitHub synchronization: fetch/read only, no push or PR. Commits: none created; HEAD still initial commit. Dashboard synchronization: not performed; no remote status claims. All changes are local working files. Next task is YM-02B only on separate authorization. Stopped before YM-02B.

## 2026-11-02 — YM-02B API foundation and typed contracts

Kaiwan authorized only YM-02B and required a local YM-02A checkpoint first. Read current instructions/plans, approved product specification, S-01 and YM-02A evidence; inspected existing files/diff. Staged and scanned 26 reviewed files for credential patterns/generated artifacts; created checkpoint acbe3d8db3bc00b8761281bca0bdb7b00fe28525 before implementation. Initial commit failed for missing identity; command-local Codex <codex@localhost> identity succeeded without global Git configuration changes. No push.

Executed by Codex in this chat, Engineering POD responsibility / API foundation and typed contracts specialist role. No subagents executed work. Added local Hono/TypeScript API, shared Zod schemas/inferred types, frontend validated health client and development proxy, API build/run commands and tests. Only health returns implemented success; valid domain requests return 501; invalid requests return consistent JSON errors. No persistence, sessions, provider calls, credentials or product journeys.

Evidence: docs/YM-02B_VERIFICATION.md and docs/API_FOUNDATION.md. Final clean npm ci, typecheck, 39 tests (including existing scaffold tests), frontend/API builds passed. Direct/proxied live health, live 400/501 responses and compiled API HTTP behavior verified; compiled start:api started. Frontend browser reload showed connected health-only status; offline state also observed before startup. Clean-install EPERM from a running watcher resolved by stopping this project's known review processes, reinstalling and restarting. Browser binding recovery did not change application behavior.

Product spec, decision log and S-01 remain unchanged against checkpoint; no material product changes. Snapshot provenance is readonly and reopened without current-mode relabeling. Structural checks are not clinical/semantic certification or provider authentication. AC-01–AC-18 remain unexecuted. Contracts remain independent of unresolved storage implementation.

Local YM-02B complete; parent YM-02 In progress; C/D To do. Checkpoint acbe3d8 exists locally; YM-02B changes remain uncommitted for review. No GitHub push/PR, dashboard update, deployment or publication. Next: review S-01 before separately authorizing YM-02C; stop here.

## 2026-11-02 — Experience reconciliation; implementation paused

Kaiwan explicitly paused further application implementation and reaffirmed device priorities, orientations, Exercise option 1 with small fixed Jane bubble, adaptive/friendly/empathetic/motivational guide intent, screen-by-screen review and full lifestyle vision. Codex performed Product/UX planning documentation only; no subagents executed work. YM-02A/B and all existing uncommitted source work preserved; no application/API/contracts/configuration/dependency files changed.

Created EXPERIENCE_TO_DELIVERY.md with source/status distinctions, screen/task/phone/tablet matrix, missing asset register, conflicts, guide proposal G-01, design checkpoint YM-UX-01 and APP/DASH crosswalk. Updated master/delivery/decision/project records and a product-spec amendment to avoid contradictory presentation-only/device wording. Original approvals are reaffirmed through current user instruction, not claimed as recovered image files. No reference/mockup/avatar asset found in workspace. Retrieved Business proposal PowerPoint and Build AI Demo text supports historical vision but supplied no original Exercise image or attachment; reflection format remains ambiguous. No new mockups or visual redesign.

Read-only Sites DB/plans observation: revision 15, updated 2026-11-02T15:41:56.138Z, product repository linked, body truncated after initial scope/control tasks. Recorded partial crosswalk without renaming or changing IDs/history; full mapping still needs complete ledger/export. No dashboard synchronization/write, GitHub push or local commit. Mobile packaging/distribution preserved as a separate proposed track; no technology selected. S-01 stays pending; YM-02 remains open with A/B complete and C/D To do. Next action is reference recovery/design reconciliation, not implementation.

Verification: documentation JSON/links/status consistency and application-source preservation checks run. No application tests rerun for documentation-only work; existing YM-02B 39-test result remains historical evidence. All product and screen-reference acceptance checks remain unexecuted.

## 2026-11-02 — YM-UX-01 reference preparation only

Kaiwan authorized restricted project reference inspection, register, Exercise checklist and a proposed dashboard sync list; no commits, push, publication or implementation. Codex executed Product/UX reference documentation; no subagents executed work. Read repository instructions/current records and preserved pre-existing A/B code/config/dependency changes. Current repository has no approved screen/guide assets. Inspected only the two previously identified AI_Life_Coach proposal decks in the project parent, without searching unrelated personal folders.

Located unversioned 13-slide text-only proposal and filename-v2 14-slide proposal with one PNG reused on slides 1/14. Read PPTX text/relationships and visually inspected the unchanged extracted cover PNG; it is not Exercise option 1 or an identified approved Jane/Kay source. Original decks remain untouched. Full decks were not rendered or reviewed in PowerPoint. JSON console encoding was corrected after initial output failure; extraction succeeded despite optional Pillow metadata import being unavailable; PNG dimensions obtained from its standard header. No tool/library installation or design recreation.

Created REFERENCE_REGISTER.md, EXERCISE_DASHBOARD_REVIEW.md, DASHBOARD_SYNC_PROPOSAL.md and read-only inspection evidence under docs/references; updated master/delivery/decision/matrix/project records. Exact intake filenames are suggestions because original screenshot names are unknown. All screen checks remain unexecuted. Preparation complete, YM-UX-01 Open; S-01 and G-01 pending. Application implementation remains paused; mobile packaging untouched. No dashboard call/write in this task: sync list uses last observed partial revision 15 and requires a fresh full ledger before any future write. No local commit or GitHub push/publication.

Verification: documentation links/JSON, open task gates, original deck hashes and 19 application/config/dependency preservation hashes checked. No application tests rerun for documentation-only work; prior 39-test result remains reported historical evidence, not independent review. Next proposed bounded task is YM-UX-01A reference intake/identification; stop for user review.

## 2026-11-02 — Reference limit recorded; S-01 product review prepared

Kaiwan directed no repeated asset searches and no persistence/redesign. Recorded the recovery limit across reference/experience/planning records: original Exercise images unavailable, tablet/states may need new review, final artwork can remain pending without changing Jane/Kay, reconstruction never labelled original. UX gate Open, not a blocker for all planning.

Read STORAGE_AND_ISOLATION.md and prepared plain-language S-01 recommendation: API-owned SQLite local/D1 hosted, session-scoped data, lifecycle/reset limits, proposed 7-day inactivity/30-day maximum and daily cleanup, future device compatibility without cross-device identity, and unresolved cost/host gates. New retention choices and material hosted data handling remain pending product approval; no persistence code or schema created. Routine engineering decisions separated from user decisions. G-01 stays pending.

Read-only Sites metadata accessible, saved version 7/owner/MCP connection advertised. Source repository metadata/content not supplied or retrieved, source-content access unverified; no credentials minted. Ledger not reread; last partial revision 15 remains distinct from Site version 7. No synchronization. Consulted official D1 pricing/limits/Time Travel docs for cost/backup caveats, without enabling services or spending. No asset search, UI changes, provider calls, commit, push or publication. Application implementation remains paused. Executor Codex, Product/architecture planning responsibility; no subagents. Validation checks documentation JSON/links and preservation hashes; no runtime tests needed for documentation-only work. Stop at S-01 recommendation.

## 2026-11-02 — Interrupted SQLite work paused; Supabase architecture evaluation only

User first approved S-01 lifecycle/local SQLite boundaries and authorized YM-02C; interruption landed two SQL migration files and database.ts/persistence.ts drafts. No migration, durable app DB or API persistence integration was completed; only an in-memory SQLite capability probe ran. User then explicitly paused SQLite/D1 and requested Supabase evaluation. These files and all A/B/unrelated work preserved unchanged, no cleanup/removal or continued implementation.

Applied Supabase skill; reviewed changelog/current primary documentation, anonymous Auth/sessions, RLS/grants, local stack, billing/capacity, backup/log/audit behavior and cleanup. Markdown changelog retrieval failed on content type, HTML index and relevant linked Data API breaking change were read instead. Current Node/TS fit documented SDK minimums; runtime versions still need pinning at implementation.

Read-only connector operations: list_projects, list_organizations, get_organization. One visible Free organization and only Elevated Finds Studio, us-east-1 ACTIVE_HEALTHY. No existing project tables, keys, Auth data/settings, SQL, migrations or logs read/changed. No credentials requested, project/branch created, billing changed or cloud resource provisioned. CLI/Docker not found on PATH; no installation or container startup attempted.

Prepared SUPABASE_ARCHITECTURE_PROPOSAL.md and current S-01 amendment with comparison, dedicated-project recommendation, anonymous Auth + Hono session transport proposal, ownership/RLS/revocation/expiry/cleanup, Supabase-specific retention caveats, setup requirements and conditional local-only implementation prompt. Old SQLite/D1 approval recorded as history, replacement pending review. Preserve 7/30-day and 24-hour cleanup boundaries; flag Free-pause scheduling limitation for deployment review. No permanent accounts/mobile implementation, UI, provider, paid services or Neo4j work. Parent YM-02 open; C paused/proposed, D To do; UX/G-01 open; reference recovery not repeated.

Executor Codex, architecture/product planning responsibility; no subagents. Validation: source/config/dependency/draft preservation hashes plus docs JSON/links/status checks. Runtime tests not rerun for documentation-only evaluation; prior 39-test result is historical and does not verify the new SQLite drafts or proposed Supabase system. No commit/push/publication or dashboard synchronization. Stop for review.

## 2026-11-04 — APP:YM-PREVIEW-01 bounded Fitness preview

Read the attached implementation request, AGENTS/current plans/specification/references/decision/session/API evidence and actual main checkout. Existing checkpoint acbe3d8, origin you-n-me; uncommitted B and planning records present, four inactive SQLite drafts untouched (all four hashes match architecture-review manifest). No repeated reference search. Authorized new proposal supersedes blanket UI pause only for this task. No subagents: Codex executed frontend/application, verification and documentation responsibilities.

Implemented Welcome/guide, fictional goal and constraints, Home, Fitness sample/refinement, session selection, completion/undo, Progress, Settings/modes/restart and broader preview cards. Reused shared contracts and API; no provider/persistence/cloud change. Refreshed runtime checks: clean npm ci (53 audited, no vulnerabilities reported), typecheck, 45 tests and production frontend/API build passed. Fixed shared test default mutation, guide overlap (reserved bottom rail), and replaced native confirm with inline confirmation. Browser checked phone/narrow/tablet/desktop, validation/loading, long text, selected-plan invariants, completion/undo, reload and confirmed/cancelled reset. Physical devices, screen-reader certification, native packaging and original live/saved-plan acceptance not run. Screenshot capture intermittent; two successful phone/tablet proposal captures retained. See YM-PREVIEW-01_VERIFICATION.md.

Single Hono preview server: npm start on loopback5174, actual HTTP200 frontend/minimal health verified. Replit configuration/handoff prepared, not imported or published. Source includes required previously uncommitted B dependencies for a coherent runnable commit; paused storage draft files excluded. No GitHub push. Dashboard read revision17 provides newer APP/DASH mappings; authenticated capture supports reported evidence only, not task-status approval. Local source independently checked here, not by dashboard agent. Parent02 open, C paused/D unstarted; UX/G01 open. Stop for screen review; next proposed implementation is bounded live Fitness gateway APP:YM-04A after provider/privacy approval.

## 2026-11-08 — Preview closeout before mobile foundation

Recovered stopping point: branch feat/ym-preview-01 existed at acbe3d8, index empty; November 4 git add never executed because automatic approval review exhausted usage. No preview commit or tracker capture existed. Corrected App.tsx trailing blank line and premature capture wording. Fresh typecheck, 45 tests / 6 files, frontend/API builds and git diff --check passed. Browser-emulated final journey rerun: Jane/Kay, defaults, 20-to-15 minute/dumbbell/squat-exclusion refinement, sample provenance, complete 1/3, undo 0/3, cancel and confirm reset. Current phone and compact-tablet captures: references/preview-01/*-closeout-20261108.jpg; 1025x768 DOM inspection also performed, screenshot tool intermittent. No native-device proof. No journey rebuild. Reviewed source/dependencies/planning records will be committed; four inactive SQLite files excluded. Actual commit/push/capture outcomes follow successful operations only. User now explicitly authorizes feature-branch push/draft PR and a separate Capacitor mobile foundation; no merge, release or provider/persistence scope. Executor Codex, Engineering/frontend/mobile and QA/documentation responsibilities; no subagents.


---

# Source record: docs/STORAGE_AND_ISOLATION.md

# S-01 — Storage and isolation reconciliation

Status: architecture reassessment. Supabase replacement proposed, pending review; prior SQLite/D1 implementation paused. No operational persistence is integrated. Date: 2026-11-02.

Original architecture reported in prior planning: local SQLite / hosted Cloudflare D1. The subsequent YM-01 draft instead proposed browser-local durable saving. These are different data-handling contracts; neither is implemented in the inspected baseline.


## Current S-01 decision state

Kaiwan approved the preceding SQLite-local/D1-intended direction with 7-day inactivity/30-day maximum expiry, expired active-record cleanup within 24 hours, browser/installation-only continuity and fictional initial hosted demos. That approval is historical fact, not retroactively removed. Implementation was then interrupted and explicitly paused for a Supabase replacement evaluation. **Supabase Postgres + anonymous Auth + existing Hono is now proposed, not approved.** Current comparison, project inventory, access/deletion design, setup requirements and conditional implementation prompt: [Supabase architecture proposal](SUPABASE_ARCHITECTURE_PROPOSAL.md).

Lifecycle/identity product boundaries are retained. Hosted activation, personal data, billing and permanent-account/mobile features remain outside current scope. S-01's platform/anonymous-Auth amendment awaits review before any persistence resumes. Prior D1-specific cost/backup assumptions below are historical and must not be applied to Supabase.

Interrupted work wrote only inactive drafts: migrations/0001_sessions.sql, migrations/0002_resources.sql, server/database.ts, server/persistence.ts. They are preserved, not applied, imported by API entry points or validated as completed persistence. No database project or durable application database was created. Do not use these SQLite migrations as Postgres migrations.

## Historical SQLite/D1 recommendation

Retain the original SQLite/D1 direction, with one API-owned persistence contract and anonymous session isolation. This is the simplest consistent approach that preserves the original architecture: no dual browser/server source of truth, no sync and no accounts. SQLite runs behind the local API; D1 runs behind the hosted API. Both use migrations and equivalent typed contracts. Browser cookies establish session access; they are not user profiles or account recovery.

**Material change requiring review:** hosted profiles, plans and progress would leave the browser and persist in server-managed D1, rather than only on the device. Approve S-01 before YM-02C implements persistence or any hosted personal-data trial. Public access, cross-device login and provider retention are separate future gates. If S-01 is declined, revise the architecture and acceptance contracts explicitly; do not quietly implement browser-only storage or dual writes. YM-02A can proceed without implementing either storage option.

## Data locations

| Data | Local environment | Hosted environment | Isolation / lifetime |
| --- | --- | --- | --- |
| Anonymous session identifier | Opaque unguessable cookie in browser; server-side hashed lookup in SQLite | Secure HttpOnly SameSite cookie; hashed lookup in D1 | Separate origin/browser cookie jars; not shared with dashboard or Jarvis. Server derives session from cookie, never client-supplied owner ID. No recovery after cookie loss; new session cannot access old records. |
| Profile and guide preferences | SQLite session-owned rows, only when explicitly saved | D1 session-owned rows, only when explicitly saved | All reads/writes/deletes scoped to session; absent values remain absent. |
| Saved plans and input/provenance snapshots | SQLite session-owned versioned rows | D1 session-owned versioned rows | Explicit save; immutable historical input snapshot; no public listing or cross-session IDs granting access. |
| Progress and simulated entitlement | SQLite session-owned completion/entitlement records | D1 equivalent | Stable action IDs; idempotent completion/undo; no real billing. |
| Unsaved forms/results and guided walkthrough position | Browser memory; cleared on reload/restart | Browser memory; same behavior | No durable personal drafts in localStorage/IndexedDB. Guided fixtures shipped as public sample assets, not private user records. |
| Provider credentials | Server environment only | Server secret binding only | Never in cookie, browser bundle, plan snapshots, logs or repository. No credential provisioning in YM-02A. |

Local SQLite databases, hosted D1 and dashboard databases are separate; no automatic copying between them. A shared local API is still session-isolated. No names/emails/passwords are required. UI must disclose server location and lack of cross-device recovery before save, especially on shared devices. API authorization, CSRF protection and non-cacheable private responses are implementation requirements, not additional product approvals.

## Reset contract

- Restart walkthrough: clears in-memory guided position/completion only; restores fictional fixture defaults; preserves saved personal profiles, plans, progress and simulated entitlement.
- Clear this session's prototype data: after confirmation, atomically deletes its saved profile/preferences, all plan versions/snapshots, completion records, simulated entitlement and server session lookup. Clear matching browser cookie and transient app state only after acknowledged deletion; next visit starts a fresh session with Jane and Free defaults. Do not delete other sessions, migrations, shared sample fixtures or other applications' data.
- On deletion failure: report failure; keep session access for retry; never falsely claim deletion. Cancelling does nothing. Closing a tab or losing a cookie is not deletion.
- Reset deletes active application records, not provider records, hosting logs or retained backups. Do not log request bodies, profiles or plan contents. Hosted retention/backup policies and deletion disclosures must be verified before hosted personal-data use; no claim of universal erasure.

Automatic expiry/retention and orphan cleanup remain an operational gate before hosted personal-data use. A concrete retention policy must be recorded before that gate passes; no indefinite retention is approved. These open operational details do not block the frontend scaffold.

## S-01 product review — recommendation, not approval

Prepared 2026-11-02. No persistence, database connection, migration, persistent session or deployment was implemented. The following makes the existing recommendation concrete for product review; it does not imply approval of server retention or authorize YM-02C. Missing original UI references do not block this storage decision.

| Topic | Local development | Hosted demonstration | Product consequence / proposed default |
| --- | --- | --- | --- |
| Stored data | Explicitly saved minimal profile/guide preferences, versioned Fitness/Nutrition plans with input and provenance snapshots, action completion/undo state, simulated entitlement and anonymous session lookup in a durable SQLite file | Equivalent session-owned records in a separate D1 database behind the API | No email/password, payment data, diagnoses or body metrics. Store only explicit saves and required progress/entitlement state. |
| Data location | SQLite on the development computer, outside Git/build artifacts and automatic cloud-sync folders; exact protected path is an engineering choice | Operator-managed Cloudflare D1, not browser-only storage; production hosting/bindings not provisioned | Material decision: hosted profile/plan/progress data leaves the visitor's device. No local↔hosted database synchronization. |
| Browser state | Opaque session cookie; unsaved forms/results/walkthrough state in memory only | Persistent opaque Secure/HttpOnly/SameSite cookie; transient drafts in memory | No duplicate durable profile/plan store in localStorage or IndexedDB. No secrets or profile fields in cookie. |
| Isolation | Every API read/write/delete scoped to the server-derived anonymous session; shared local server still isolates cookie jars | Same scope on D1; guessed record IDs or submitted owner IDs never grant access | This is browser-session isolation, not proof of a distinct human. People sharing one browser profile can share its session. Use full reset/private browsing on shared demo devices; no identity recovery. |
| Reload and browser closure | Saved rows survive reload/closure if the persistent cookie remains valid; unsaved drafts are not promised to survive | Same behavior; browser privacy settings/incognito may discard the cookie | Losing/clearing a cookie loses access, not immediate server deletion. Old rows expire on schedule; new sessions cannot reclaim them. |
| Server restart | Saved rows survive with the same SQLite file and session/security configuration; deleting/resetting the file loses them | D1 rows survive API process restarts; continued access requires same database and valid cookie/session configuration | No claim that temporary/in-memory DBs persist. API outage prevents access until service returns, not automatic offline saving. |
| Restart walkthrough | Clears in-memory guided position/completion; restores fictional fixture defaults | Same | Preserves saved personal plans/profile/progress and simulated entitlement. |
| Clear this session's prototype data | Confirmed deletion removes all session-owned active rows, plan versions/snapshots, profile/preferences, completion events/state, entitlement and lookup; then clears local app cookie/transient state | Same scope in D1 and browser | Does not affect other sessions, schema/migrations or common sample fixtures. New session starts with Jane/Free defaults. Failed deletion is reported; cookie remains usable for retry. |
| Deletion limits | Does not remove earlier filesystem/cloud-sync/manual backup copies or third-party provider data | Does not selectively erase recovery history, host logs or provider-held data | Disclose active-data deletion separately from backup expiry. Do not promise universal or immediate forensic erasure. No personal data in test fixtures or request-body logs. |
| Retention/expiry — NEW PROPOSAL | Same logical rules for realistic tests, using fictional data by default | Session access expires after 7 days without meaningful app use, with a 30-day absolute lifetime from creation | Apply to saved profiles/plans/progress/entitlements together; do not reset maximum age with background health checks. Expired sessions inaccessible immediately; physical active-row cleanup within 24 hours. Cookie expires no later than server session. |
| Orphans, logs and backups — NEW PROPOSAL | Cookie-loss orphans follow the same expiry. No personal demo exports/backups by default; keep database outside synced source folder | Daily cleanup for expired/orphaned records; no manual personal-data exports. Recommend at most 7 days minimal operational logs, no bodies/cookies/tokens | Platform recovery retention is plan-specific, outside per-session deletion. Verify actual plan and logs before hosted personal-data use; purge/reapply deletions before serving any restored backup. No persistent identifiers in access logs where avoidable. |
| Future phone/tablet clients | Web browsers use the same API/contracts; each origin/browser profile has its own anonymous session | Future packaged clients can implement compatible secure credential transport without changing the domain contracts | No cross-device identity, shared phone/tablet history, account login or offline sync exists. Each installation/browser starts separate unless identity/linking is separately designed and approved. Packaging remains a separate roadmap decision. |
| Costs/dependencies | SQLite requires a local persistence adapter/migrations, isolation tests and file lifecycle; no separate managed database subscription | Requires D1, compatible hosted API binding, cleanup execution, usage limits/observability, retention/deletion disclosures and platform access | Prefer available free capacity, but do not promise zero total cost or enable a paid plan. Exact Sites/Cloudflare allocation, billing responsibility, region and operating limits remain to verify. No provider/API spend is included or enabled. |

### What Kaiwan needs to decide

1. Accept API-owned SQLite locally / D1 hosted, including server-side retention of hosted demonstration data rather than device-only saving. Recommend yes, with fictional data as the demo default and explicit informed saving of personal inputs only after hosted privacy/operations gates pass.
2. Accept the proposed 7-day inactivity / 30-day maximum session lifetime, daily active-row cleanup and unavoidable backup-expiry caveat. Recommend yes for an investor prototype; any longer research/pilot retention is a separate decision.
3. Accept browser/installation-only continuity with no account or cross-device recovery. Recommend yes now; do not present phone/tablet layout compatibility as shared identity or offline sync.

These remain pending. The existing ban on paid services is unchanged; a later paid-plan decision would require separate authorization. S-01 approval alone would not authorize implementation or public hosting.

### Routine engineering choices

Resolve schema/index names, SQLite adapter, migrations, opaque token generation/hash lookup, cookie configuration, request authorization/CSRF, atomic reset, expiry enforcement, cleanup/retry mechanics and automated isolation tests within the approved contract. Do not ask for approval of each. Return to product review if those choices alter collected data, retention, sharing, identity, costs or user-visible deletion guarantees.

Before hosted personal-data use, verify operator access, storage-region suitability, actual host logging/backups, restoration/deletion procedure, free-tier availability and cleanup execution. These are readiness checks, not implied legal/privacy certification or a deployment approval.

### Current platform facts checked for this review

Cloudflare's [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) lists free allowances of 5 million rows read/day, 100,000 written/day and 5 GB total storage; quotas are not an entitlement verified for this project's Sites hosting. Free-plan limit exhaustion can cause query errors. Workers/hosting have separate charging/plan considerations. [D1 limits](https://developers.cloudflare.com/d1/platform/limits/) state Time Travel history is 7 days on Free and 30 days on Paid. [Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) is automatic. Thus active-row deletion must not be described as immediate removal from all recovery history. Actual deployment plan remains unverified; no paid service enabled.


---

# Source record: docs/SUPABASE_ARCHITECTURE_PROPOSAL.md

# S-01 amendment — Supabase persistence proposal

Date: 2026-11-02. **Proposed, pending Kaiwan review.** SQLite/D1 implementation is paused. No project, branch, billing, credentials, cloud migration or persistence integration was created in this review. Neo4j is excluded; no graph-specific requirement has been identified.

## Current evidence and preserved work

Read-only Supabase inventory found one visible organization, `kaiwanmirza-blip's Org` (`bcxqhabehcsayuwalemo`), reporting Free, and one visible project, **Elevated Finds Studio** (`iloiveofvljyctrodpyx`, us-east-1, ACTIVE_HEALTHY). Only project/organization metadata was read; no tables, customer data, keys, settings or migrations were accessed/changed. No dedicated You&Me project exists in this visible inventory. Visibility is not a guaranteed account-wide capacity reservation.

Recommend a new, separate **you-n-me-prototype** project. Current organization is a candidate, not an approved selection; confirm organization and region before eventual creation. Never reuse Elevated Finds Studio, its schemas, credentials, Auth users or backups. Do not upgrade its organization to obtain a feature for You&Me; billing is organization-wide.

The interrupted SQLite turn wrote `migrations/0001_sessions.sql`, `migrations/0002_resources.sql`, `server/database.ts` and `server/persistence.ts`. They are incomplete/unverified drafts, not wired into app/index or package scripts. The only SQLite operation run was an in-memory capability probe; no durable application database/migration was created/applied. Preserve drafts without continuing or treating them as Postgres migrations. YM-02A checkpoint acbe3d8 and YM-02B working changes remain intact. No new source code was written during this architecture review.

## One recommended architecture

**React → existing Hono application API → dedicated Supabase Auth/Postgres**, using Supabase anonymous Auth as technical identity, a thin Hono-owned browser session transport, and Postgres ownership/RLS with explicit lifecycle enforcement. Local development uses a separate local Supabase stack; hosted activation remains a later review. No evidence requires replacing Hono or moving provider logic into client code/Edge Functions.

Use HTTP Auth/Data API/RPC calls from Hono for user-scoped data access, retaining validated shared contracts and user JWT context. Do not use a service-role client for ordinary user CRUD. This avoids requiring direct Postgres TCP connectivity from a future Worker deployment; production origin/cookie routing still needs deployment verification. Secret/service-role/database credentials remain server-only. A publishable key is not a secret and does not bypass RLS; the proposed web BFF need not ship a Supabase client/key/token store to the browser.

### Architecture comparison

| Concern | Earlier SQLite/D1 direction | Supabase recommendation |
| --- | --- | --- |
| Local persistence | Lightweight SQLite file outside synced repo; incomplete draft adapter | Actual local Postgres + Auth/Data API using Supabase CLI and Docker-compatible runtime; heavier local tooling, closer local/hosted parity |
| Hosted persistence | D1 and compatible hosted Hono bindings | Dedicated managed Postgres/Auth project plus separately hosted Hono/frontend; Supabase does not automatically deploy the existing app |
| Identity | Custom API-owned opaque session, ownership and expiry logic | Anonymous Auth user UUID + user JWT/RLS; Hono cookie bridge and application expiry ledger still required |
| Migration strategy | SQLite SQL intended for D1, unverified there | Supabase/Postgres migrations, grants/RLS/RPC and fictional seeds; root SQLite SQL is not portable by assumption |
| Capacity/cost | No managed local SQLite charge; D1 allowances and host limits separate | Free candidate has 500 MB DB, 50,000 MAU, 5 GB egress and 1 GB object storage; two active free projects per eligibility rules. Only one visible existing project suggests a possible spare slot, not guaranteed availability. Pro advertised from $25/month with compute/usage considerations; no paid plan authorized |
| Availability/cleanup | Local service/cleanup must run; hosted D1 runtime scheduling needed | Free projects may pause after one week inactivity. Paused/offline infrastructure cannot prove a 24-hour physical-cleanup promise; hosted activation must establish a monitored always-executing cleanup arrangement or revisit plan/guarantee |
| Offline use | Local server works without Internet; no browser offline sync | After dependencies/images are obtained, local stack can run without Internet. A hosted-only client cannot read/save remotely while offline. No offline cache/sync or shared device identity is added |
| Backups/logs | D1 Time Travel assumptions were platform-specific | Use Supabase facts below; no D1 recovery period or deletion promise transfers |

## Anonymous-session decision

| Option | Benefits | Tradeoffs / future impact |
| --- | --- | --- |
| API-owned sessions only, Postgres storage | Closest to previous plan; no Auth-user lifecycle or MAU identity bookkeeping | Must build/authenticate ownership context and enforce it correctly in Hono/Postgres; later permanent accounts need identity mapping/migration; ordinary service-role queries can silently bypass RLS |
| **Supabase anonymous Auth + Hono web bridge (recommended)** | Native user UUID/JWT/RLS model, future identity linking and mobile SDK compatibility | Creates a technical auth.users record per anonymous identity, despite no email/password signup UI; not anonymous/de-identified data. Adds refresh/revocation/cleanup/abuse work; native session expiry is not the approved product expiry |

Supabase anonymous sign-in is different from an unauthenticated publishable/anon-key request: it uses the `authenticated` database role. Clearing browser data/signing out loses recoverability. Future permanent accounts can link an identity, but existing-account merging needs its own product rules; no conversion/login/recovery/cross-device feature is included now. Future mobile clients could use compatible native token storage and Hono bearer authentication; do not implement packaging or native clients in YM-02C.

For the web, propose a custom backend-for-frontend bridge: browser stores an opaque HttpOnly SameSite cookie, while Hono privately stores an encrypted Auth refresh credential mapped to its hash and Auth user/session. Refresh occurs server-side; browser does not call Supabase directly or store refresh tokens in localStorage. This is extra application transport code, not a claim Supabase's browser SDK automatically supports an HttpOnly-cookie SPA. Apply CSRF/origin checks and refresh concurrency handling. Encryption keys stay in server environment, not DB alongside plaintext credentials. No credentials are retrieved/generated in this review.

### Ownership and policy design

- All profiles/preferences, immutable plan versions/input/provenance snapshots, completion events/state and simulated entitlements carry `owner_id` referencing the Auth user. Composite keys/foreign keys include owner so plan/version/action records cannot cross owners.
- A server-controlled private lifecycle ledger records Auth user/session, creation, last meaningful use, absolute/idle expiry and revocation. Do not trust client owner IDs, editable user_metadata, health traffic or token refresh as meaningful activity. One anonymous identity per browser/installation is the prototype model.
- Explicit grants restrict reachable tables/functions; RLS restricts rows. Policy predicates require authenticated subject ownership **and** a live, unexpired application lifecycle/Auth session. SELECT is required for updates; UPDATE requires USING and WITH CHECK; forbid owner reassignment. Immutable plan envelopes cannot be overwritten; store a new version instead. Anonymous and permanent users share a database role, so role membership alone is insufficient authorization.
- Do not expose lifecycle/token tables. A narrow private policy helper may need privileged read of lifecycle/auth session existence, but must derive caller UID/session from verified claims, return only a boolean, pin search_path, and have tightly scoped grants. Do not add broad public SECURITY DEFINER functions or grant authenticated users direct access to auth.sessions. Ordinary mutation RPCs should use invoker context; any necessary privileged helper must be separately reviewed/tested.
- Hono preserves provider/domain validation and updates the ledger only after successful meaningful work. Database/RLS must also deny expired/deleted sessions through direct Data API attempts, not merely at Hono. No views bypassing RLS; if needed later, use security-invoker semantics and explicit grants.

## Retention, deletion and operational limits

Retain already approved **7 days inactivity, 30 days absolute lifetime**, access denial at expiry, expired active records removed within 24 hours. These are app rules. Supabase sessions otherwise default to indefinite lifetime; native timebox/inactivity controls are Pro-and-up and enforced around refresh, not an exact substitute. Automatic anonymous-user cleanup is not provided. Keep local test time injectable; production time must be trusted server/database time.

Full reset must first atomically revoke the application lifecycle access and delete that owner's active profile/plans/events/entitlement plus web credential mapping in Postgres. With no active ownership grant, even a still-valid JWT must fail every exposed app operation, including INSERT. Then revoke sessions/hard-delete the anonymous Auth user with a server-only administrative cleanup worker. Auth API deletion and app SQL are not one distributed transaction: persist a retryable cleanup job/tombstone and report pending administrative cleanup truthfully if it fails. Bound the job's minimal identifiers/retention; remove after confirmed completion. A deleted Auth user or sign-out does not by itself immediately invalidate all already-issued access JWTs; test the policy gate with captured old tokens.

Walkthrough restart remains memory-only and never resets database records. Dev-stack reset is a separate explicitly destructive local-only command. Sign-out/cookie loss is not a verified application-data delete. No user-owned file uploads are in scope; later Storage objects would need separate deletion handling.

Propose hourly bounded cleanup with retries/observed runs, not only once per day, to meet the 24-hour target. Supabase Cron/pg_cron can invoke database jobs or a secure administrative worker; no job/extension is enabled now. Deny access immediately at expiry even if cleanup is delayed. A sleeping development computer or paused Free project cannot guarantee wall-clock deletion while unavailable: run overdue cleanup before serving on restart and report missed deadlines. Hosted fictional demonstrations still need a verified availability/cleanup plan; personal data and any changed guarantee need deployment review. Do not claim a schedule is active from a SQL file alone.

### Supabase-specific backup/log findings

- Free: managed daily-backup access is not included; manual exports are the documented recommendation. Do not treat this as D1 Free seven-day Time Travel. No exports are made here; use disposable fictional local/demo data initially.
- Pro: daily backup access for seven days; Team 14, Enterprise up to 30. PITR is a paid add-on with compute requirements, not enabled/free. Database backups do not include uploaded Storage object contents.
- Pricing lists API/database log retention Free 1 day, Pro 7 days, Team 28, Enterprise 90. Auth audit events have external log storage and optional database storage (`auth.audit_log_entries`); the guide does not establish that the API-log window automatically purges those DB rows. Verify configuration and an explicit policy before hosted activation. Do not log request bodies/cookies/tokens; no promise to erase platform logs per visitor.
- Reset removes active application data, not earlier exports, backups, vendor logs or provider records. A restore must reapply expiry/revocation/deletion before serving visitors. Current project-specific backup/log guarantees are not inspected because no You&Me project exists.

## Setup requirements and product decisions

**Decisions for Kaiwan:** approve replacing local SQLite/intended D1 with Supabase Postgres; approve technical anonymous Auth-user creation plus the Hono bridge; confirm organization/region for a future dedicated project; accept Free's operational limits for fictional development/demo use or separately review a nonzero budget before hosted activation. Keep lifecycle rules and browser-only continuity, no accounts/recovery/cross-device sync. Do not weaken deletion/expiry promises silently to fit Free.

**Engineering setup:** Node 24/current TypeScript already present; Supabase CLI and Docker command were not found on PATH during this review. A compatible running container engine, disk/memory capacity and loopback-only stack ports must be verified. Docker data volumes must live outside the OneDrive repo; metadata/migrations may be versioned, credentials/generated state may not. Native no-Docker local runtime is not the supported Windows path identified in current docs. Pin SDK/CLI versions and lockfiles. Current Hono is retained. Confirm allowed CORS/origin/cookie routes and session-transport key management before future deployment.

No cloud resource is required for the next local-only implementation task. Eventual hosted setup must create a dedicated project only after separate organization/region/cost approval, verify available slot/quote at that time, enable anonymous Auth only there, configure abuse prevention and usage monitoring, apply reviewed grants/RLS/migrations, test cross-user denial, and verify cleanup/backups/logging. Never link this repository to Elevated Finds Studio to shortcut setup. Do not add Storage, Realtime, vectors, Neo4j or paid branching without a requirement.

## Fully populated next implementation instruction — use only after approval

Implement only **YM-02C — Local Supabase migrations and persistence** after Kaiwan approves this S-01 amendment. Outcome: durable local Postgres/Auth persistence through existing Hono/shared contracts, with no cloud mutation or UI implementation.

Prerequisites: read AGENTS/current plans/session notes/approval; preserve YM-02A/B and unrelated edits; inspect the interrupted SQLite files and retain them as clearly inactive legacy drafts rather than apply/port automatically. Confirm local CLI/runtime versions via help and check Docker readiness. If unavailable, report that blocker; never fall back to Elevated Finds Studio or any cloud database. Discover current Supabase migration commands and use the installed skill's local migration workflow; do not invent filenames. Bind local stack to loopback and keep persistent volumes/secrets outside Git/build/OneDrive. No cloud link/push/remote reset.

Acceptance criteria:

1. Repeatable local Postgres migrations and labelled fictional seed/reset commands; dev reset separate from visitor deletion; verified restart durability and no unsaved-draft promise.
2. Local anonymous Auth + Hono opaque-cookie bridge with encrypted server-side refresh storage, explicit expiry/revocation ledger, safe refresh concurrency, no secrets/service-role/JWTs in client bundles or logs. No permanent account/link/recovery features.
3. Persist approved profiles/preferences, immutable plan versions/original provenance, progress/undo/idempotent event records and simulated entitlements under owner-aware keys/foreign keys. No provider calls or fabricated generated success.
4. Explicit grants and RLS with subject/session/expiry checks; test two users and unauthenticated callers against Hono **and direct local Data API**, including reads, forged owner IDs, updates, inserts, deletes, RPCs and record-ID attacks. Do not use broad service-role CRUD as a substitute for RLS tests.
5. Full session deletion atomically denies app access/removes app records; retry administrative Auth cleanup safely. Test captured old JWTs, delete failures, retries and restart. Walkthrough restart cannot erase persisted data.
6. Test 7-day inactivity/30-day absolute expiry with controllable test time; health and refresh do not extend meaningful-activity retention. Provide and exercise cleanup, counts/retries and overdue startup behavior. Document active scheduler evidence and offline/paused limitations; never claim unobserved 24-hour scheduling guarantees.
7. Test migrations/reapplication, seed repeatability, plan immutability, duplicate complete/undo, isolation, expiry/deletion failure recovery, refresh isolation and API restart. Existing frontend/API contracts/tests/typechecks and frontend/API builds remain passing. Run local database/security advisors and review findings.
8. Document exact local setup/start/review/reset/cleanup commands, volume location, migration/verification evidence and what is not cloud-tested. Update task status only against passed checks; keep YM-02 open until YM-02D passes, YM-UX-01/G-01 open.

Exclusions: project/organization creation, billing, cloud SQL/migrations/settings/keys, changes to Elevated Finds Studio, hosted activation/personal-data trials, provider calls, AI generation, product screens, mobile packaging, accounts/identity linking, payments, CI, Neo4j, Jarvis, planner work, push/publication. Stop before YM-02D. Report local changes/commits/remote/dashboard status separately and all not-run checks. Do not proceed merely because this prompt exists.

## Sources checked

- [Changelog](https://supabase.com/changelog): scan included Node 20 support removal (current Node 24 meets it), public-table grant changes, and local/runtime changes; exact versions/configuration must be rechecked at implementation.
- [Data API exposure change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) and [API security](https://supabase.com/docs/guides/api/securing-your-api): explicit grants plus RLS, never assume new tables are exposed automatically.
- [Anonymous Auth](https://supabase.com/docs/guides/auth/auth-anonymous), [sessions](https://supabase.com/docs/guides/auth/sessions), [user deletion](https://supabase.com/docs/guides/auth/managing-user-data), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
- [Local development](https://supabase.com/docs/guides/local-development), [Cron](https://supabase.com/docs/guides/cron), [billing/eligibility](https://supabase.com/docs/guides/platform/billing-on-supabase), [pricing](https://supabase.com/pricing).
- [Backups](https://supabase.com/docs/guides/platform/backups), [logs](https://supabase.com/docs/guides/observability/logs), [Auth audit logs](https://supabase.com/docs/guides/auth/audit-logs). Organization/project facts above come from read-only connector metadata, not these public pages.


---

# Source record: docs/YM-02A_VERIFICATION.md

# YM-02A — Repository and frontend scaffold

Date: 2026-11-02 (America/Chicago). Status: complete locally; ready for user review.
Executor: Codex in this chat. POD responsibility: Engineering; specialist role: frontend and repository foundation. No named specialist agents were spawned or credited with execution.

## Prerequisites and preserved work

- Read current planning records and latest session notes; YM-01 documentation gate is complete with Kaiwan's approval. All 18 investor acceptance scenarios remain unexecuted.
- No local Git repository existed initially. No ancestor AGENTS.md was found. GitHub connector tree inspection and Git ls-remote/fetch independently confirmed main at `74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de`, containing only README.md. No remote application implementation was assumed.
- Initialized local main, added the designated origin, fetched main and established its existing commit/index without overwriting working files. Initial differences: modified local README.md, untracked finalized docs/ and project.json. Those were preserved; no unrelated work was removed. New AGENTS.md now governs this checkout.
- S-01 remains pending review; the product specification, decision log and storage reconciliation are byte-for-byte unchanged (SHA-256 verification). Planning index, master plan, delivery map and session log received scoped status/evidence updates.

## Acceptance evidence

| Criterion | Actual evidence |
| --- | --- |
| Correct checkout, baseline and changes | main at the existing initial commit; origin `https://github.com/kaiwanmirza-blip/you-n-me.git`; git status/diff reviewed. No new commit. |
| Preserve YM-01 records | Product spec hash `0D12380583C9839F25C28C44ABA5FA0531D48F85E9C61625F8E1C6F1534D9626`; decision log `B8FFA14460F176D123133443C2D945828DCB454853DE5B8A7563B09C3EE1D885`; S-01 `6CD0AD8C531B87648B9958CEFC7575AEFDD49CF428430C411CDBD5324D907DDB`. |
| Repository guidance/templates | AGENTS.md, README run/check instructions, .gitignore, .gitattributes, .env.example, task/bug issue templates and PR template. No workflow added. |
| Minimal frontend | src/App.tsx, main.tsx, styles.css, index.html; React 19.3.1, Vite 8.3.5, strict TypeScript configuration. Static, truthful scaffold; no journey controls or provider calls. |
| Reproducible commands | npm ci passed with package-lock.json; dev/typecheck/test/build/preview scripts verified. Node 24.12.0 / npm 11.6.2. No credentials required. |
| Checks and UI | Typecheck passed; 2 Vitest tests passed; production build passed (16 modules). Dev browser review at desktop (1280 viewport) and 390×844: readable page and no horizontal overflow. Browser warning/error log empty on dev page. Built production preview loaded the same labelled shell on port 4173. |
| Evidence and scope tracking | This file, session log, project.json, delivery map and master plan updated. YM-02 stays In progress; YM-02B/C/D stay To do; S-01 pending. |

## Failures encountered and resolved

Restricted Git/network calls failed with getaddrinfo/socket access errors; approved outside-sandbox Git fetch and npm install succeeded. Initial npm scripts invoking Windows executable shims failed because the workspace path contains `&`; scripts now invoke package Node entry points directly. Typecheck/tests/build passed after correction. Initial sandbox preview was unreachable by the browser; an outside-sandbox loopback-only dev preview on port 5174 succeeded. No firewall/security settings were changed.

## Verification limits and exclusions

These are scaffold checks, not product journey acceptance. No onboarding, guides, domain navigation, API/contracts, migrations, persistence, CI, provider integration, subscriptions, payments, deployment, universal-planner or Jarvis work was performed. No live AI or real entitlement claim is made. No public publication occurred. The bootstrap package version `0.0.0` is not a product release.

## Synchronization and review

- Local: files and planning records updated; generated node_modules/ and dist/ ignored.
- Commits: none created. HEAD remains the existing initial commit, not a commit containing this scaffold.
- GitHub: main fetched/read; no push, PR or remote file update. Local work is not backed up to GitHub yet.
- Dashboard: not updated; full ledger/ID mapping remains unresolved. Do not infer dashboard completion from these local records.
- Run/review: follow README commands; local dev review URL is http://127.0.0.1:5174/ . Production preview is http://127.0.0.1:4173/ . Both are local-only, not deployed artifacts.
- Next: YM-02B API foundation and typed contracts, after separate authorization. Do not start it automatically. Parent YM-02 requires B/C/D completion; C additionally requires S-01 approval.


---

# Source record: docs/YM-02B_VERIFICATION.md

# YM-02B — API foundation and typed contracts evidence

Date: 2026-11-02 (America/Chicago). Status: complete locally; ready for review. Parent YM-02 remains In progress. Executor: Codex in this chat; Engineering POD responsibility, API/contracts specialist role. No subagents executed work.

## Prerequisites and checkpoint

Read AGENTS.md, current plans, product/decision/storage records, latest session notes and YM-02A evidence. Initial working changes matched the previously reviewed YM-02A scaffold and finalized planning files; no unrelated changes were removed. Staged 26 explicitly selected files and reviewed staged paths/content: no dependencies, build output, private .env files or credential-pattern matches. The first commit attempt failed because no Git author was configured. Retried with command-local `Codex <codex@localhost>` identity, without changing global settings or impersonating the user.

Created local checkpoint **acbe3d8db3bc00b8761281bca0bdb7b00fe28525**, parent `74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de`, before YM-02B source changes. No push, PR, publication or dashboard update. Current YM-02B changes remain uncommitted. Product specification, decision log and S-01 remain unchanged against that checkpoint.

## Acceptance criteria → evidence

| # | Evidence |
| --- | --- |
| 1. Runnable frontend/API connection | `dev:api` starts Hono on loopback 8787; Vite dev proxy forwards /api. Live HTTP checks passed for both direct 8787 and frontend 5174 health URLs. Browser reload showed “Local API connected · health only. Working capabilities remain unavailable.” Offline state was also observed before startup; reload retries. |
| 2. Minimal typed health | Health schema returns exactly status/service, no environment/versions/secrets/cookies. Unit and live HTTP checks passed. |
| 3. Shared validated contracts | shared/contracts.ts exports profile, inputs, Fitness/Nutrition plan, provenance, saved-envelope, event, entitlement, health/error schemas and inferred types. Tests include budgets, exclusions, quantities and invalid fields. No storage import/dependency. |
| 4. Mode/original provenance | Discriminated guided/demo sample versus live provider metadata; strict payloads; readonly/frozen provenance. Reopen helper validates/deserializes original envelope with no active-screen mode. Tests preserve demo provenance under a live screen context and reject mutation/snapshot mismatch. No persistent retrieval claim. |
| 5. Honest errors/unavailable capabilities | Unit tests and live HTTP requests verify 400 validation and 501 valid-but-unavailable. Malformed JSON 400, media type 415, body limit 413, unknown route/method 404 and sanitized unexpected 500 tested. No success or data echo for domain operations. |
| 6. Meaningful tests | 39 tests across four files: existing frontend scaffold, frontend health client, shared contracts and Hono request/error behavior. Fixtures are fictional, test-only and never API responses. |
| 7. Checks/builds | Clean npm ci passed (53 packages audited; no vulnerabilities reported); typecheck passed; all 39 tests passed; npm run build passed for frontend and API. Compiled Hono app served health over real loopback HTTP; start:api also started successfully. Existing frontend tests still pass. |
| 8. Records/commands/boundaries | README and API_FOUNDATION.md give two-terminal commands, PowerShell walkthrough, error/route map, contract conventions and deferred work. Project/master/delivery/session records updated, S-01 pending and YM-02C/D To do. |

## Resolved verification issues

First clean-install retry failed with Windows EPERM unlinking a running esbuild executable. Stopped only this project's known API/frontend/preview processes, retried npm ci successfully, reran checks/build and restarted frontend plus compiled API. Browser bindings initially failed; refreshed browser inventory and used the existing tab. No security settings changed. Earlier provider-free API-unavailable display was honest, not a fabricated connected state.

## Scope and limitations

No database connections, migrations, persistent sessions, provider calls, API keys, generation, onboarding, working journeys, payments, deployment, CI, Jarvis or universal-planner work. API resource bodies validate then return 501; event application, ownership/CSRF enforcement, idempotency and stored retrieval remain unimplemented. Future stateful code must enforce session isolation after S-01 review. Structural validation cannot certify clinical safety, interpret every dietary alias or authenticate provider-origin claims. See API_FOUNDATION.md for exact contract limits.

AC-01–AC-18 remain unexecuted product scenarios; contract tests do not mark them passed. Production assets compile, but hosted frontend/API routing and production operations are not implemented. Local review services are loopback-only; no public artifact exists.

## Synchronization and next action

- Local checkpoint: acbe3d8 (YM-02A + finalized planning records).
- Local working changes: YM-02B source, tests and documentation; no YM-02B implementation commit.
- GitHub: no push, PR or remote file change.
- Dashboard: unchanged; full ledger/ID mapping remains unresolved.
- Next recommended action: review S-01, then separately authorize YM-02C if accepted. Do not start persistence or YM-02D automatically. Parent YM-02 remains open until C/D are accepted too.


---

# Source record: docs/YM-PREVIEW-01_VERIFICATION.md

# APP:YM-PREVIEW-01 — Phone/tablet Fitness experience preview

Date: 2026-11-04 (America/Chicago). Implemented locally; screen review pending. New implemented design proposal, never a recovered original or approved final design.

## Authority and baseline

User request supplied in attachment 64a04bcf-9cc9-4819-9145-47c0beaa4787/Pasted text.txt explicitly authorizes implementation, in-memory sample fallback, new design proposal, local commit and dashboard capture. This supersedes the blanket UI pause only for this bounded delivery. S-01/Supabase and G-01 deeper adaptation remain pending; YM-UX-01 stays open. YM-02A/B reused; parent YM-02 open, C paused and D not started. Original assets were not searched again. Existing sage/cream/ink scaffold colors and serif/system typography are reused as proposed tokens, not verified Option B values. Initial J/K circles are placeholders, not original avatar artwork.

Executor: Codex in this chat. Assigned responsibilities: Engineering POD, frontend/application specialist; QA verification and documentation performed by the same executor. Dashboard roster roles are assignments, not evidence that Reed/Kernel/Sentinel or other agents executed. No subagents.

## Implemented behavior and boundaries

Welcome → fictional goal/constraints → Home → Fitness → edited constraints → session selection → completion → undo. Navigation includes Home, Fitness, Nutrition, Progress, Explore and Profile & Settings. Nutrition remains planned working scope, unavailable in this delivery. Fashion, travel, etiquette, community, reflection and subscriptions remain labelled previews; sixth domain is unresolved.

Jane default, Kay selectable at welcome/settings, wording only. No inferred mood, changed capabilities or state loss on guide changes. Guided and Demo use a deterministic local adapter. Existing results retain original provenance when the next-request mode changes. Live explicitly unavailable, no fallback or provider calls. All inputs in this preview edit a fictional adult profile. No personal live eligibility flow is claimed.

Supported sample inputs: 15–60 whole minutes, any approved experience label (same conservative sample, disclosed), no equipment/dumbbells, optional low intensity or unspecified. Moderate/high return an actionable unavailable message. Exclusions use the explicit march/side-step/squat/curl vocabulary. All excluded/no available movement combinations reject; no unrelated fixture. No arbitrary medical constraint interpretation. Goal text is a displayed practice wish, not semantic AI planning. No measurements, photos, diagnoses or clinical guidance.

Timing is exact across warm-up, movement, rests and cooldown; 3-minute warm-up, selected minutes minus 6 for intervals, 3-minute cooldown. Transitions have no additional allocation; rest blocks provide transition time. This is deliberately a small demonstration library, not a varied training program. Sets are timed rounds with easier alternatives. Selection says “Use this plan for this session”; memory only, reload resets. A new candidate preserves the selected session until chosen; selecting it starts fresh progress. Completion counts distinct action IDs; undo removes one count. Restart is confirmed separately and only clears local memory.

## Acceptance and evidence

| Criterion | Evidence / result |
| --- | --- |
| Runnable preview, same-origin API | npm start serves built assets and /api via Hono on loopback 5174; health stays minimal; unavailable domain endpoints stay 501. server/web.test.ts verifies routing/errors. |
| Constraint-consistent sample | src/fitnessPreview.test.ts enumerates 128 time/equipment/exclusion combinations, validating every supported result and rejecting impossible combinations; changed time/equipment and unsupported inputs tested. |
| Modes and progress | Tests verify explicit live rejection, original sample provenance, duplicate complete idempotency, undo and unknown action IDs. Browser mode/guide switches retain selected plan/progress. |
| Phone and tablet | Chrome-emulated phone widths 390/392 and narrow 320; tablet 1025x768 and compact 768x576; desktop 1440x900. DOM-measured dimensions used because viewport tool scaling was inconsistent. No physical device or native/orientation-lock claim. |
| Navigation/form/focus | Welcome, constraints, Home, Fitness, Progress, Settings and preview destinations available. Invalid 10-minute input focuses error; local preparation loading state observed; empty state available before selection; keyboard Tab reaches plan control. Long fictional goal wraps without horizontal overflow at narrow width. |
| Complete/undo | Browser selected plan, completed warm-up (1/3), undid (0/3), changed 20/no equipment to 15/dumbbells with squat excluded, observed curl and 3+9+3 timing. Tablet completion/undo and desktop completion/undo passed. |
| Bubble/touch/readability | Found overlap in initial design; fixed with a reserved 64px rail outside clipped scroll content. Narrow and desktop geometry confirm no intersection. Main controls >=44px; no physical touch/keyboard or screen-reader certification. |
| Build/checks | npm ci passed (53 packages audited, zero vulnerabilities reported); typecheck passed; 45 tests / 6 files passed; frontend and API production builds passed. Previous 39 tests retained except the two obsolete scaffold-only assertions updated for the authorized preview. |

Screenshots in references/preview-01 show the new proposal: phone-fitness.jpg (scrolled action/completion state), tablet-fitness.jpg (compact landscape). Screenshots are browser captures, not original references. Wider tablet functional checks used DOM evidence; full screenshot capture was intermittent. Final screen acceptance remains Kaiwan's review.

Resolved verification problems: test helper initially mutated a shared default, corrected to clone; clean install hit Windows lock and restricted-network stall, stopped only verified You&Me listeners and successfully retried; native confirm interrupted browser automation, replaced with an inline confirm/cancel panel. Console showed an unrelated browser-extension error, not an application error. No known unresolved functional defect in the bounded sample; device/assistive-technology coverage is incomplete.

Five-minute usability target is NOT claimed passed: no durable save, provider latency or live run exists. Sample flow review is separate from original AC-01–AC-18, which are not marked complete wholesale. No production persistence, live AI, Nutrition journey, native package, public deployment or subscription implementation is delivered.

## Proposed visual decisions for screen review

Review welcome hierarchy and placeholder guides; phone stacked cards versus tablet side rail/two-column composition; reused sage/cream/ink palette and Georgia headings; reserved guide rail; field/error/loading/empty treatments; summary density and action cards. All are new proposals. Approve/revise screen by screen before final visual acceptance. G-01 beyond wording remains pending.

## Discovery and next single implementation

Discovery only: inspiration images/optional weekly photo journals; organizing clinician-provided goals; fashion inspiration/outfit/color guidance; calmness/everyday routines; destination-led travel. No image analysis, body-shape scoring, lab interpretation, therapeutic planning or outcome predictions.

Next after screen review and provider/privacy approval: APP:YM-04A — bounded Hono provider gateway for live Fitness. Use existing PlanRequest, FitnessPlan and Provenance contracts; explicit configured provider, server-only credentials, validated input/output, timeout/error paths, provider identity/latency and no sample fallback. No provider enabled by this preview. Goal clarification and meaningful semantic adaptation are intended AI value, not demonstrated by the deterministic adapter. Supabase S-01 approval/local runtime and YM-02C remain separate persistence dependencies. Mobile packaging/distribution remains APP:YM-MOBILE-01, proposed.

## APP/DASH crosswalk and sync

Fresh connector read: revision 17, updated 2026-11-04T19:41:43.608Z. Its reconciliation has A/B as reported completion and journeys not delivered; these are historical before this preview. APP:YM-PREVIEW-01 overlaps DASH:YM-04.1 (Fitness flow), YM-03.1 (guide/experience), YM-08.2 (device/quality) and YM-06.1 (contracts/provider boundary). Not an ID rename or completion of these broader tasks. DASH:YM-04.1 exact read: “Goals and availability produce a structured, editable activity plan,” To do. Free-text goal semantics remain limited in this sample.

Connector provides authenticated review capture, not task-status/source editing. November 4 stopped before staging/commit/capture. Actual closeout receipts must be recorded only after successful operations. Do not claim task completion synchronization or publication. Existing hub/access settings/history remain intact. GitHub push and Replit import are not performed.


## November 8 closeout verification

Fresh typecheck, all 45 tests and production frontend/API builds passed. Whitespace check passed after correcting App.tsx EOF. The final sample journey, changed constraints, completion/undo and inline cancel/confirm reset were rerun in browser emulation. Current captures are phone-closeout-20261108.jpg and tablet-closeout-20261108.jpg under references/preview-01. Physical device and final visual acceptance remain pending. Historical November 4 results above are not relabelled as current. Feature-branch push/draft PR now authorized by the November 8 attachment; actual outcome is recorded separately, never inferred from intent.


---
# Repository operating instructions

# You&Me repository instructions

Read `project.json`, `docs/MASTER_PLAN.md`, `docs/DELIVERY_MAP.md`,
`docs/DECISION_LOG.md` and the latest `docs/SESSION_LOG.md` entry before work.
Use `docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md` for product acceptance.

- Execute only the authorized bounded task; preserve existing changes.
- Fitness and Nutrition are the planned working journeys; other domains preview-only.
- Keep guided/demo/live provenance explicit. Never substitute sample output for live AI.
- S-01 in `docs/STORAGE_AND_ISOLATION.md` is pending product review; do not implement persistence before approval.
- No paid services, real payments, deployment or publication without explicit scope.
- Never put secrets in `VITE_*`, frontend code, fixtures, logs or Git. Future provider credentials are server-only.
- Jarvis and the dashboard are separate projects. Do not rewrite their task IDs or histories.
- Run `npm ci`, `npm run typecheck`, `npm test` and `npm run build` as applicable. Inspect affected UI when available; report verification limits.
- Record actual evidence, executor and responsibility in local planning records. Assigned specialist labels are not evidence of execution.
- YM-02A is only the repository/frontend scaffold. API/contracts, migrations/persistence and CI/integration remain YM-02B/C/D. Keep parent YM-02 open until all are accepted.
- Report local changes, commits, GitHub synchronization and dashboard synchronization separately.

# you-n-me

**Current planning state:** further application implementation is paused by Kaiwan. Read the [experience-to-delivery reconciliation](docs/EXPERIENCE_TO_DELIVERY.md) before resuming work. Mobile/tablet references and YM-UX-01 review are required before UI implementation/integration; the scaffold is not approved final visual design. YM-02A/B remain preserved; S-01 remains pending. Earlier run instructions and verification below are engineering evidence, not product-screen approval.

You&Me investor prototype planning workspace. Application repository: https://github.com/kaiwanmirza-blip/you-n-me.

Start with the [master plan](docs/MASTER_PLAN.md) and [YM-01 product acceptance specification](docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md). See [delivery map](docs/DELIVERY_MAP.md), [decisions](docs/DECISION_LOG.md), [session log](docs/SESSION_LOG.md) and [project index](project.json).

YM-01 documentation gate is complete; approved refinements and explicit deferrals are recorded. Storage recommendation S-01 awaits review before persistence implementation. YM-02A is complete locally: a minimal frontend scaffold is available. YM-02B now supplies the local Hono API and shared contracts. Parent YM-02 remains in progress, retaining migrations/persistence and CI/integration requirements. Product journeys and AC-01–AC-18 are not implemented/executed. Reviewed YM-02A work was checkpointed locally at acbe3d8. YM-02B changes remain uncommitted; neither task has been pushed or synchronized to the hosted dashboard.

## Run locally (PowerShell)

Use Node.js 24 LTS and npm (verified here with Node 24.12.0 / npm 11.6.2). No credentials or environment variables are required. The lockfile determines dependency versions. Stop local watchers before npm ci on Windows to avoid locked dependency executables.

```powershell
Set-Location -LiteralPath 'C:\Users\kaiwa\OneDrive\ALGDGADU\You&Me'
npm ci
npm run dev -- --port 5174 --strictPort
```

Open http://127.0.0.1:5174/ . If the review server is still running, open it directly; stop it with Ctrl+C before starting another on the same port. The server binds only to loopback. In a different checkout, use that checkout's literal path.

Expected: You&Me branding, Investor prototype label and Frontend foundation notice explicitly saying journeys are not implemented. No forms, navigation flows, AI or payments. YM-02B adds a truthful local API health indicator only. Review at desktop and narrow mobile widths; reload should show the same static shell.

```powershell
npm run typecheck
npm test
npm run build
npm run preview -- --port 4173 --strictPort
```

Production preview: http://127.0.0.1:4173/ . Ctrl+C stops the preview. `dist/`, dependencies and local secrets are ignored by Git. `npm test` runs frontend, contract and API tests, not investor journey acceptance.

Scripts invoke Node entry points directly to avoid Windows command-shim parsing errors in paths containing `&`. Do not replace them with unquoted Windows `.cmd` shims. Environment guidance is in `.env.example`; never put credentials in browser-exposed `VITE_*` values. API foundation is YM-02B; storage S-01 remains pending, and CI is YM-02D.

See [YM-02A verification](docs/YM-02A_VERIFICATION.md) for criterion-by-criterion evidence and synchronization status.

## Local API (YM-02B)

Start `npm run dev:api` in a separate terminal before reloading the frontend. The API listens only at http://127.0.0.1:8787; Vite proxies `/api`. Check `Invoke-RestMethod http://127.0.0.1:8787/api/health` and expect only `status: ok`, `service: you-n-me-api`. The page should show “Local API connected · health only.” Reload after API startup to retry its health check.

The only implemented successful endpoint is health. POST profile/plan/progress/entitlement routes validate their shared contracts, then return HTTP 501; invalid bodies return typed HTTP 400 errors. No data is persisted or generated. See [API commands, walkthrough and contracts](docs/API_FOUNDATION.md) and [YM-02B verification](docs/YM-02B_VERIFICATION.md).

`npm run build` builds frontend and API; `npm run start:api` runs the compiled API (stop dev:api first). `npm run preview` is static frontend-only and does not provide the development API proxy. There is no deployment wiring. No API keys or environment setup are needed.

## Persistence architecture under review

SQLite/D1 work is paused; four interrupted draft files are preserved but not wired into the API or applied. Read [the Supabase replacement proposal](docs/SUPABASE_ARCHITECTURE_PROPOSAL.md) before future persistence work. Supabase Postgres/anonymous Auth is proposed pending approval; no dedicated cloud project exists. Do not reuse Elevated Finds Studio or apply the root SQLite migrations to Postgres. Existing frontend/API validation-only runtime remains unchanged by this review.

## Current runnable preview — 2026-11-04

APP:YM-PREVIEW-01 delivers a new phone/tablet design proposal and bounded Fitness sample journey. Run `npm ci`, `npm run build`, `npm start`, then open http://127.0.0.1:5174/. Full [commands, walkthrough and Replit handoff](docs/PREVIEW_RUNBOOK.md); [checks and screen-review evidence](docs/YM-PREVIEW-01_VERIFICATION.md). Memory only: refresh resets; no live AI or durable save. The older scaffold-only descriptions above are historical. Supabase/S-01 remains proposed; no cloud setup or persistence. No push/publication.


# Current verification addendum

## 2026-11-08 — Comprehensive handoff and repository preservation

User authorized a detailed downloadable Markdown handoff and Git synchronization of all existing project work. Executor: Codex in this chat; documentation/repository preservation responsibility; no subagents. Created docs/PROJECT_COMPLETE_HANDOFF.md with current summary, architecture/AI target, phased tracker, backlog, publication limitations and complete planning/evidence Markdown corpus plus project.json snapshot. Preserved existing mobile foundation and inactive SQLite drafts as source, without activating persistence or approving architecture.

Fresh verification: restricted npm ci failed with npm exit-handler error and missing dependencies; network-enabled retry succeeded (151 audited, zero reported vulnerabilities). Typecheck passed, 49 tests across seven files passed, frontend/API build passed, mobile:verify passed. Native compilation/runtime, physical devices and fresh UI inspection not performed. Git diff --check passed; credential-pattern scan found no matches (limited pattern check, not a security certification). Remote read confirmed preview dcb2792 on feat/ym-preview-01 and PR ref 1; main remained 74dca7f. No application deployment/publication verified. Dashboard not synchronized. This entry records pre-push evidence; the actual commit/push receipt is reported separately after success.
