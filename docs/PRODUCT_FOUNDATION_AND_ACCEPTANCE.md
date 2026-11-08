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
