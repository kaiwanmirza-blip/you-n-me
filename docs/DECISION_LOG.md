# Decision log

Date: 2026-11-02. Approval authority: Kaiwan's explicit instruction to finalize YM-01, approving the latest review subject to six refinements. Earlier proposals are resolved below; deferred decisions are not inferred approvals.

## Approved decisions

| ID | Resolution | Effect |
| --- | --- | --- |
| C-01–C-04 | Retained | Investor prototype; Fitness/Nutrition working, others preview-only; Jane default/Kay selectable; explicit modes; simulated subscriptions; no payments; Jarvis separate; application repo you-n-me. |
| P-01 | Approved with refinement | Account-free; each journey measured independently welcome → saved plan + one completed action. Five minutes is a usability target. Guided/live and provider latency reported separately. |
| P-02 | Approved except names | Fictional samples with editable summaries; guides alter presentation, not profile/history. Final sample names deferred. |
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
| D-01 | Sixth lifestyle domain unresolved; original remaining labels unavailable. | Before a fixed six-domain UI. |
| D-02 | Final sample names deferred; Sample A/B temporary fixture identifiers only. | Before final investor content. |
| D-03 | Public pricing and source licensing deferred. | Before commercialization or source distribution. |
| D-04 | Older hub retirement deferred. | Before retiring/migrating that hub. |
| O-01 | Provider/deployment and provider data-retention controls unresolved; no paid service authorized. | Before live activation. |
| O-02 | Dashboard source/full ledger and unavailable original documents not recovered. | Before dashboard ID migration or claims of dashboard alignment; local application IDs remain explicitly scoped. |
| O-03 | Hosted session expiry, retention/backup policy and deletion disclosures require verification. | Before hosted personal-data use. |

YM-01 documentation gate is complete: decisions and explicit deferrals, testable acceptance contracts, storage recommendation/material-change gate and bounded next work are recorded. This does not approve S-01, mark application checks passed, or update the hosted dashboard.
