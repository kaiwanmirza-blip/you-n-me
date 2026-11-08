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
