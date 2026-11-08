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
