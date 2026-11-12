# Delivery map

## APP:YM-PREVIEW-02 — v0.7.4 integration closeout (2026-11-11 Central)

Current evidence supersedes earlier statements that Nutrition is unavailable **for sample preview scope only**. The integrated source existed before this synchronization task. It contains working in-memory Fitness and Nutrition samples, a demo-controlled 48-hour guest trial state machine, six bundle offerings with simulated Basic/Plus/Pro AI recall tiers, proposed 70/20/10 Habit Stars, Jane/Kay GuideAvatar SVG personas with six task wardrobes, and Explore previews for Fashion, Local Date Night, Instagram share, Friends & Challenges, and FAQs/45-Day Pilot table. Recall tiers, trial timing controls, prices and scoring examples are simulations/proposals, not actual AI memory, elapsed-time entitlement enforcement, paid subscriptions or approved commercial terms.

Fresh checks: `npm run typecheck` passed; `npm test` passed **55/55 across 8 files**; `npm run mobile:verify` passed against existing dist and both synced platform bundles. `npm run build` passed per Kaiwan's incoming report, not rerun here. No npm ci, build, native sync, UI edits or process restart in this task; port 5174 is left untouched. Native asset verification does not prove native compilation/runtime, physical-device or screen acceptance. The full AC-01–AC-18 gate remains open, especially live generation, durable save/reload, identity/isolation and deletion.

Parent YM-02 stays **In progress** (A/B accepted locally, C paused pending S-01 replacement review, D To do). YM-UX-01 stays **Open**; this is a new design proposal, not a recovered approved reference. G-01 remains **pending review**; SVG wardrobes do not close adaptive-guide behavior. S-01 remains **Supabase replacement proposed / SQLite implementation paused**. No persistence, provider calls, real accounts/payments, deployment, native distribution or pilot launch is delivered by this closeout.

Responsibility: Engineering POD / repository integration verification and documentation. Actual executor this task: Codex in this chat, no subagents. Existing integration is user-reported prior work, not code authored by this synchronization executor.

Dashboard evidence capture succeeded at **revision 23**, record `UPD-32d57677-097a-45a3-8257-4fe4c595917c`. This is reported local evidence captured for review, not independent dashboard testing or task/release completion. Connector writes support captures only; dashboard UI requires sign-in. Canonical task-card and release-record reconciliation remains pending. Preserve APP/DASH IDs and the planned private-pilot release; do not mark it released.

> Earlier snapshots below are preserved as dated history; the closeout above is the current preview status.

## Current reconciliation — 2026-11-11

- APP:YM-PREVIEW-01: implemented sample loop; screen acceptance pending. Committed and pushed in dcb2792.
- APP:YM-MOBILE-01: Capacitor Android/iOS development foundation committed and pushed in be1f11a; native compilation/runtime and store gates remain open. Responsive checks do not certify native devices.
- YM-02A/B retain recorded completion; parent YM-02 stays open, C paused pending S-01 and D unstarted. No inactive SQLite draft is accepted persistence.
- Pilot target: November 11–December 25, minimum 25 activated invitees. TRACKER_RECONCILIATION.md contains checkpoints, requested expanded scope and APP/DASH reconciliation; not proof of delivery or enrollment.
- Prior session records hosted planned-release revision 22. Canonical task-card reconciliation remains pending; this repository synchronization does not update dashboard cards.

Earlier dated statuses below are preserved as history. No new implementation is authorized by this update.

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
