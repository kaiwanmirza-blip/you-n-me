# You&Me master plan — reconciled baseline

## Current repository and delivery status — 2026-11-11

Application preview and Capacitor development foundation are committed in be1f11a on feat/ym-preview-01, verified on GitHub before this documentation closeout. Main remains 74dca7f (README-only); use the feature branch for import. Earlier no-push/uncommitted statements below are dated history. Draft PR #1 is the review boundary, not a deployment or merge.

The November 11 pilot and product amendments are in TRACKER_RECONCILIATION.md and GOOGLE_AI_STUDIO_BUILD_PROMPT.md. They describe requested scope, not completed features. Fitness remains an in-memory sample; Nutrition/live/persistence remain unavailable. Native projects are source preparation, not verified installable builds. Parent YM-02, YM-UX-01 and G-01 remain open; S-01 replacement remains proposed. The historical comprehensive handoff is a November 8 snapshot.

> November 11, 2026 planning update: Kaiwan set a 45-day private web pilot through December 25, 2026 Central, with a minimum of 25 unique activated users. See the [dated pilot checkpoints and activation criteria](TRACKER_RECONCILIATION.md#45-day-private-pilot-schedule). The investor prototype is the first delivery toward that target. Pilot implementation and release gates still apply.

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
| Private pilot | Target December 25, 2026 Central. At least 25 unique activated invitees. Product eligibility is 16+. Initial 18+ recruitment is proposed until teen safeguards and provider terms are reviewed. See the tracker for the updated experience scope and delivery gates. |
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
