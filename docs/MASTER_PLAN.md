# You&Me master plan — reconciled baseline

Date: 2026-11-02. Status: YM-01 documentation gate complete; approved defaults and explicit deferrals recorded.

## Source and ownership

Application repository designated by Kaiwan: https://github.com/kaiwanmirza-blip/you-n-me (private, main).
Inspected remote baseline: 74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de; remote main tree still contains README.md only. YM-02A now exists locally as uncommitted work; see YM-02A_VERIFICATION.md.
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

YM-02 remains in progress and incomplete; YM-02A is complete locally with recorded checks. Its subtasks are YM-02A repository/frontend scaffold, YM-02B API foundation and typed contracts, YM-02C SQLite/D1 migrations and session-scoped persistence, and YM-02D CI and foundation integration. Do not mark the parent complete after scaffold. S-01 recommends restoring the original SQLite/D1 architecture; hosted server retention is a material change from the browser-only draft and awaits review. YM-02A does not implement persistence.
