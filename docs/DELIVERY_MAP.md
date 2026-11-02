# Delivery map

Date: 2026-11-02. YM-01 documentation complete; application acceptance unexecuted.

## ID reconciliation

The user's YM-01 title is “Product foundation and acceptance.” Live dashboard revision 7 uses YM-01 “Scope & delivery controls” and YM-10 “POD execution & automation infrastructure.” Earlier chat guidance used YM-10 for investor demonstration. Do not renumber or overwrite dashboard items automatically. Proposed application delivery namespace is listed below; mapping to existing dashboard IDs requires the full ledger and a non-destructive crosswalk. Local application IDs below do not overwrite dashboard IDs. These are not claims that task dependencies have been validated against unseen records.

| Proposed application delivery | Dependencies | Current evidence/status |
| --- | --- | --- |
| YM-01 Product foundation and acceptance | Verified scope and repository identity | Documentation complete with approved refinements; S-01 explicitly deferred; AC-01–AC-18 unexecuted. |
| YM-02 Repository and engineering foundation | YM-01 documentation gate; preserve local/dashboard ID distinction | In progress: YM-02A complete locally; API/contracts, migrations/persistence and CI/integration remain open. Remote inspected main still contains README only. |
| YM-03 Onboarding and home | YM-02 and approved UX defaults | Planned, not implemented. |
| YM-04 Provider gateway and mode integrity | YM-02; provider/privacy decision | Planned; guided fixtures may proceed independently of live provider availability. |
| YM-05 Fitness | YM-03, YM-04 for live behavior | Planned. |
| YM-06 Nutrition | YM-03, YM-04 for live behavior | Planned. |
| YM-07 Progress and persistence | Shared storage contract; YM-05 and YM-06 for integrated acceptance | Planned. Storage must be designed before journey save behavior is implemented. |
| YM-08 Simulated subscriptions and measurement | Working core journeys and progress | Planned; no real payments. |
| YM-09 Quality, accessibility and privacy acceptance | Integrated prototype and reviewed live-data handling | Planned; checks accompany earlier deliveries too. |
| YM-10 Investor demonstration | All required checks and product approval | Planned; ID collides with current dashboard usage. |

YM-02A is complete locally; evidence: [verification](YM-02A_VERIFICATION.md). Next bounded task is YM-02B, only after separate authorization. S-01 review blocks YM-02C, not YM-02A. No autonomous queue is enabled.

Dashboard task YM-01.3 must not be completed solely because the GitHub repository exists: its README/instructions/build/issue-template criteria remain unfulfilled. The local YM-01 documentation gate now has user approval evidence, but dashboard YM-01.4 has not been updated or declared aligned. Keep dashboard-source releases separate from You&Me application releases.

## YM-02 retained requirements and bounded subtasks

| Task | Outcome / acceptance | Dependencies | Status |
| --- | --- | --- | --- |
| YM-02A Repository and frontend scaffold | Preserve local documentation in the correct checkout; README/AGENTS/issue and PR templates; React/TypeScript/Vite minimal nonfunctional shell; reproducible install, dev/typecheck/test/build commands; frontend checks and local review evidence. | YM-01 documentation gate; fresh repository and change inspection. | Complete locally; see verification |
| YM-02B API foundation and typed contracts | Local API skeleton; typed request/response/error contracts and validation; session authorization contract; meaningful contract/API checks; no provider integration. | YM-02A; approved product contracts. | To do |
| YM-02C Migrations and persistence foundation | Versioned SQLite/D1-compatible migrations; scoped sessions/profiles/plans/progress/entitlements; reset and isolation checks against both execution paths. | YM-02B; explicit S-01 approval before implementation. | To do |
| YM-02D CI and foundation integration | CI installs/checks/tests/builds frontend and API; verifies migrations/contracts using isolated data; no deploy or paid credentials; fresh checkout instructions verified. | YM-02A/B/C. | To do |

Parent YM-02 completion requires all four subtasks and their evidence. Scaffolding alone cannot satisfy API foundation, typed contracts, migrations or CI. Hosted personal-data use additionally requires O-03 retention/session controls; YM-02 completion does not authorize deployment. Later journeys, provider generation and real payments remain outside YM-02.
