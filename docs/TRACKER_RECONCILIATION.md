# You&Me application tracker reconciliation

Tracker snapshot at revision 20. The hosted ledger reports 72 tasks and 7 completed. The two repository evidence captures are in review. The rows below describe application status and supply candidate card details. APP and DASH identifiers retain their original meanings. Source baseline is be1f11a on feat/ym-preview-01. Historical verification is from the linked evidence.

## 45-day private pilot schedule

Kaiwan set a 45-day timebox and a minimum of 25 users. The schedule counts November 11, 2026 as day 1 and ends December 25, 2026 at 11:59 p.m. Central. The planned release is an invite-only web pilot for Fitness and Nutrition, tested on Apple and Android phones/tablets. The product target is **16+**. Proposed pilot recruitment is 18+ until age assurance, teen safety and provider terms are reviewed for 16–17-year-olds. Native beta and paid subscriptions are separate release decisions.

| Due (Central) | Checkpoint | Evidence required |
| --- | --- | --- |
| Nov 17 · Day 7 | Scope and owners | Record the pilot data and retention decision (S-01 review for real accounts), teen safety/eligibility decision, provider terms for the intended audience, provider/privacy and cost decision, device list, and responsible people for pilot delivery, recruitment and support. Identify prospective users without putting contact details in the tracker. |
| Dec 1 · Day 21 | Core flows in test | Exercise invite sign-in, both planning journeys, private save and undo, feedback triage and server AI validation in a test environment. Record a dated build and actual checks. |
| Dec 10 · Day 30 | Staff pilot and readiness | Verify sign-in, account deletion, access isolation with two accounts, AI failure and spending controls, and the core flows on physical phones and tablets. Record a go/no-go decision before outside invitations. Staff accounts are excluded from the enrollment target. |
| Dec 17 · Day 37 | First cohort | Verify at least 15 unique activated pilot users as a pacing target. Check any onboarding bottlenecks and the path to 25. |
| Dec 25 · Day 45 | Minimum reached | Verify at least **25 unique activated pilot users**. Each must accept an invitation, verify sign-in and complete at least one action in Fitness or Nutrition. Exclude staff, tests, duplicates and invite-only signups. |

Pilot progress evidence should be dated and aggregate: accepted invites, verified sign-ins, unique activated users and blockers, with a reference to the underlying check or report. Starting activated count is **unverified**. Notify Kaiwan when a checkpoint is overdue without evidence, a blocker is forecast to delay it, or activation falls short of a due target. Include the checkpoint, observed count or missing evidence, gap, blocker, and next recovery action with an owner where known. Missing evidence is a schedule risk, not evidence of zero users. Keep the original deadline unless Kaiwan explicitly changes it.

This schedule records scope and timing. Real accounts, storage, provider activation, external invitations, spend and release require the corresponding project decisions. See the [AI Studio Build prompt](GOOGLE_AI_STUDIO_BUILD_PROMPT.md) for the sample-data preview and the pilot handoff.

Hosted record: `REL-9e495bf7-45c9-4b77-83f9-4c204553e916`, saved as **Planned** at revision 21 and updated with the scope below at revision 22. The revised record, state and target date were verified in Roadmap → Delivery history. Codex schedule alert `you-me-pilot-schedule-alerts` is active and reads dated project evidence. Record checkpoint results and aggregate counts in the project records so the alert can assess progress.

## Experience and product scope update

Kaiwan requested the following target scope. The immediate Build Studio deliverable uses fictional data, with working sample Fitness and Nutrition journeys and clearly marked upcoming experiences. The day-45 release target applies to the two core journeys. Treat additional integrations as follow-on work with their own acceptance checks. These rows are delivery groupings, not replacements for APP or DASH task IDs.

| Delivery area | Preview and acceptance evidence | Pilot or later gate |
| --- | --- | --- |
| Onboarding and faster repeat use | Show 48-hour standard guidance trial, near-expiry and expiry, mock email registration, confirmed display name, age screen and tier choice. Measure five-minute first use and a faster returning flow with editable remembered inputs. | Verify inbox control and separately establish age assurance. Review teen consent, privacy, social restrictions and payment controls. S-01 must cover cross-device accounts, expiry and deletion. |
| Fitness and Nutrition | Multi-select home/gym equipment and exclusions. Choose pantry items, kitchen appliances, servings and 15/30/60/180-minute elapsed cooking budgets. Show constraint changes, substitutions and complete/undo. | Core journeys for day 45. Later add 4/8/12/16-week phases, equipment substitutions, rest, rescheduling and real personalized memory. |
| Guide system and themes | Jane/Kay remain visible beside the task, with selectable apparent age, complexion and facial features, and outfits for gym partner, Nutrition guide, chef, stylist and event planner. Verify System-default, Light and Dark on phone/tablet. | Clearly label AI guide role, review avatar proposals and never infer age or identity from user images. |
| Paid tier and bundle matrix | Simulate Basic / Plus / Pro with proposed 1 / 2 / 3-month recall. Show Fitness, Nutrition, Fashion, Fitness + Nutrition, Nutrition + Fashion and all three, with distinct configurable prices and Fashion offers labelled upcoming. | Review margins, entitlements, quotas, price points, billing and terms. Use server-held credentials. Review the three-month proposed AI recall cap separately from account and plan retention. |
| FAQs, analytics and support | Show FAQs, private weekly/monthly/quarterly habit stars with explanations, and separate app feedback/experience ratings. Give completion and consistency priority. Show the in-app feedback queue and human review of email drafts in the handoff. | Review scoring weights, accessibility, low-data states and moderation. Conduct violations may result in suspension or termination after review. Refund treatment requires channel and terms review. |
| Pairing, challenges and weight | Simulate participant-ID request/accept, unilateral unlink, up to 50 active pairs per user, private relationship labels, reporting/blocking, shared fitness/meal challenges and a linked partner's private date-plan rating. | Small invite challenge first. Review teen contact and consent controls before real pairing. Optional private adult weight tracking is later. Review any competitive weight-loss feature separately. Teen challenges are based on actions rather than weight. |
| Fashion, Local Plans and Instagram | Prototype closet entry by text, sample voice and garment images. Show game/dinner styling and accessories, local date plans, takeaway/delivery with Nutrition context, and an editable share preview with optional hashtag. | Evaluate Google Places/Yelp terms and server-side keys, current listing source attribution, media privacy and Instagram share capability. The first target is a user-confirmed native share handoff with a fallback. Confirm supported account types and platform permissions before offering direct publishing. |

Google's [Gemini API terms](https://aistudio.google.com/docs/terms#age-requirements) restrict API clients directed toward or likely to be accessed by under-18s. Google AI Studio can generate the fictional experience. Select a provider whose terms permit the 16+ app before enabling live AI for that product. Approval of the new audience and feature direction does not authorize provisioning, billing or storing pilot data.

| Status | Application work | Evidence or exit condition |
| --- | --- | --- |
| Completed | YM-01 product documentation gate | Approved scope, defaults, timing and acceptance specification. |
| Completed | YM-02A reproducible web scaffold | React/Vite/TypeScript, lockfile, README, templates and scaffold checks at acbe3d8. |
| Completed | YM-02B API bootstrap | Local Hono server, health route, Vite proxy, typed Zod contracts and validated 400/501 paths. |
| Completed | Preview onboarding | Welcome, Jane/Kay choice, fictional profile and editable goal. |
| Completed | Preview Fitness constraints | Time, equipment and movement exclusions; constrained sample refinement. |
| Completed | Preview plan and provenance | Sample labels, plan selection and in-memory state. |
| Completed | Preview progress | Per-action completion, undo and count shown in Progress. |
| Completed | Preview settings | Mode visibility, unavailable live state and confirmed/cancelled restart. |
| Completed | Preview browser checks | Phone/tablet emulator captures and preview-server runbook. |
| Completed | Preview branch sync | dcb2792 pushed and PR #1 ref observed. |
| Completed | Handoff and mobile source sync | be1f11a pushed, 49 tests plus typecheck/build/mobile configuration passed. |
| Completed | Capacitor foundation | Android/iOS source scaffolds, native navigation handling and public HTTPS configuration boundary. |
| Completed | UX reference investigation | Register, proposal deck inspection and Exercise checklist; original artwork still unavailable. |
| Completed | Storage architecture evaluation | Replacement proposal recorded, inactive drafts preserved. |
| In progress | YM-02 engineering foundation | A/B complete; C/D outstanding. |
| Awaiting review | YM-UX-01 | Review new phone/tablet proposal, guide bubble and loading/empty/error states. |
| Awaiting decision | G-01 | Approve adaptation behavior and separation of guide/profile identity. |
| Paused | S-01 / YM-02C | Approve replacement storage platform, identity, retention and implementation scope. |
| Backlog | Storage schema and isolation | Session ownership, row-level access, anonymous session transport and cross-session rejection. |
| Backlog | Storage lifecycle | Expiry, 24-hour cleanup, scoped deletion, failure recovery and fictional seeds. |
| Backlog | YM-02D CI | Clean install/check/test/build, isolated migration tests and fresh checkout verification. |
| Backlog | YM-03 onboarding and home | Final navigation, adult eligibility, minimal profile and independent journey starts. |
| Backlog | YM-04A provider gateway | Provider/privacy approval, server-only credentials and validated named live responses. |
| Backlog | Provider failures and provenance | Timeout/retry, invalid output, latency, stable mode provenance and no silent fallback. |
| Backlog | YM-05 Fitness working journey | Validate component timing, equipment/exclusions, conservative alternatives and live refinement. |
| Backlog | YM-06 Nutrition inputs | Dietary pattern, allergy acknowledgement, preparation limits and servings. |
| Backlog | Nutrition output | Meal outline, quantity basis, unit consolidation, substitutions and shopping list. |
| Backlog | YM-07 durable plans | Explicit save, immutable input snapshots, versioning, reload and recoverable write failure. |
| Backlog | YM-07 durable progress | Stable action IDs, idempotent completion, undo and accurate persisted totals. |
| Backlog | YM-08 simulated entitlement | Prototype the 48-hour guest trial, Basic/Plus/Pro choices, bundle comparison, expiry and reset. Retain the older Free/Plus behavior as historical acceptance scope. |
| Backlog | YM-09 accessibility and privacy | Keyboard, screen reader, physical device, provider retention and hosted controls. |
| Backlog | YM-10 investor demonstration | Run both journeys and record timing, failures and acceptance evidence. |
| Backlog | Mobile compilation | Build Android and iOS using respective SDKs; verify installation and runtime. |
| Backlog | Mobile device acceptance | Physical phone/tablet, safe areas, back navigation, lifecycle and offline behavior. |
| Deferred | Mobile distribution | Signing, beta channels and store publication approval. |
| Deferred | Product decisions | Final avatars, sample names, sixth domain, pricing, licensing and older hub retirement. |
| Planned | Private pilot | 45-day schedule above; minimum 25 unique activated users. |
| Deferred | Future milestones | Product beta, commercial validation, launch and ongoing releases. |
| Deferred | Wider lifestyle journeys | Fashion, travel, etiquette, community and reflection remain preview scope. |

Every acceptance scenario below remains backlog for integrated execution. Preview evidence supports only the narrower scenarios documented in [preview verification](YM-PREVIEW-01_VERIFICATION.md).

| Acceptance ID | Steps | Expected result |
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
