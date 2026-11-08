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
