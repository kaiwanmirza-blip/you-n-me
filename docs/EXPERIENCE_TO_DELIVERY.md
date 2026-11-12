# Experience-to-delivery reconciliation

> Current amendment — 2026-11-04: APP:YM-PREVIEW-01 is authorized and implemented as a NEW design proposal with an in-memory Fitness sample. This bounded exception supersedes earlier blanket UI pauses; it does not approve final visuals, persistence or live AI. See [preview evidence](YM-PREVIEW-01_VERIFICATION.md). Earlier dated entries remain history.


Date: 2026-11-02. Documentation only. Further application implementation is paused by Kaiwan. YM-02A/B remain complete locally; scaffold appearance is not approved product design. All screen acceptance below is specified, not executed.

## Sources and authority

- **S1 — Current user baseline:** message beginning “Pause further application implementation. Reconcile the approved You&Me experience with the current plan before YM-02C.” This is explicit authority for recovered phone portrait/tablet landscape approvals, Exercise Dashboard option 1, fixed small Jane bubble, guide intent, full vision and review gates. The original images were not available for inspection; reaffirming an approval is not recovering its pixels.
- **S2 — Approved YM-01 records:** PRODUCT_FOUNDATION_AND_ACCEPTANCE.md and DECISION_LOG.md; five-minute journeys, honest modes, account-free profile, constraints, simulated entitlements and privacy boundaries. Later S1 experience amendments take precedence over conflicting presentation-only wording.
- **S3 — Retrieved history:** “Business proposal PowerPoint,” chat 690a7c12-512c-832e-90b6-7733bddf9fa1, and “Build AI Demo,” chat 6ae7f0c9-372c-83e9-9506-a476713ad7f7. Retrieved text supports lifestyle-platform/paid-subscription vision and reflection discussions, but does not expose original Exercise option 1 or orientation-specific image assets. Earlier assistant recommendations on mood metrics, prices, production technology or animation are not approvals. “This is perfect” without the associated image does not establish exact visual details.
- **S4 — Implementation evidence:** YM-02A_VERIFICATION.md, YM-02B_VERIFICATION.md; checkpoint acbe3d8 and existing uncommitted API/contracts. Foundation checks do not establish approved screen fidelity or working journeys.
- **S5 — Dashboard read:** plans/main revision 15, updated 2026-11-02T15:41:56.138Z, read-only through Sites DB/plans. Body truncated; only initial scope/control tasks visible. Product repository link now present. No full task graph or visual asset recovered.

Status legend: **R** = approval reaffirmed by S1, original visual asset missing; **A** = already-approved local product scope; **P** = new operational/design proposal awaiting review. No matrix row marks application acceptance passed.

## Matrix

All UI tasks below require checkpoint **YM-UX-01** before screen implementation, then individual screen review before integration. APP prefixes identify the application namespace, not renumbered historical task IDs. Vision IDs are local proposed backlog references, not new dashboard records.

| Requirement / source / status | Screen | Prototype / future scope | Delivery reference | Phone portrait acceptance | Tablet landscape acceptance |
| --- | --- | --- | --- | --- | --- |
| Primary mobile/tablet; orientations S1/R | Every screen and state | From prototype onward; desktop secondary | APP:YM-UX-01, YM-09, YM-10 | Reference-based portrait layout; no clipped content/horizontal overflow; controls and errors usable with touch/keyboard | Reference-based landscape composition, not simply enlarged phone; readable density, touch controls and no hidden content |
| Exercise Dashboard option 1: clean, scalable, small fixed Jane bubble S1/R | Exercise dashboard, workout detail | Working Fitness journey; precise mockup missing | APP:YM-UX-01 → YM-05 | Compare against actual approved option 1; bubble stays small/fixed without obscuring actions, keyboard or safe areas | Review approved landscape adaptation; bubble remains fixed and unobtrusive; preserve hierarchy, do not invent columns |
| Jane default/Kay selectable; friendly, empathetic, motivational, adaptive intent S1/R + S2/A | Guide selection, bubble, guidance, errors | Prototype guide identity/tone; deeper adaptation pending definition | APP:YM-UX-01, YM-03, YM-04, YM-05/06 | Jane starts selected; switching Kay preserves inputs/plans/progress; sample/provider labels visible; guide never blocks actions | Same behavior and tone; guide scale/position reviewed against tablet reference |
| First-time journey S2/A; onboarding in full vision S1/R | Welcome, eligibility, inputs, guide selection | Working support for Fitness/Nutrition; no real registration/payment | APP:YM-03 | Independently time welcome → saved plan + one action; review all fields/error/keyboard states against references | Equivalent journey in landscape with proper focus order and readable form layout; report timing separately |
| Home in full vision S1/R | Home/dashboard | Prototype entry to working journeys and clearly labelled previews | APP:YM-03 | Review hierarchy and entry points; don't mistake fixtures for actual progress | Review landscape grouping/reading order; no hidden preview labels or unapproved six-domain grid |
| Exercise/Fitness S1/R + S2/A | Dashboard, plan, action completion | Current working journey, AC-04/07/14/16 | APP:YM-05, YM-07 | Check time budget, equipment, excluded movement, complete/undo; original mode visible | Same outcomes and stable action identity with no bubble obstruction; review portrait-to-landscape navigation continuity |
| Nutrition/wellness S1/R + S2/A | Meal plan, recipe, shopping list | Nutrition working; broader wellness preview/future | APP:YM-06, YM-07; APP:YM-VISION-WELLNESS (P) | Review serving/ingredient consistency, exclusions, readable quantities, complete/undo and reset | Review recipe/list reading order and touch access; no loss of quantity/provenance information |
| Fashion S1/R | Fashion preview | Preview in prototype; proposed future working journey | APP:YM-VISION-FASHION (P) | Label preview; no simulated recommendation shown as live; reference review before UI | Landscape preview is intentional and labelled; no invented functional shopping workflow |
| Travel S1/R | Travel preview | Preview now; proposed future travel guidance | APP:YM-VISION-TRAVEL (P) | No real booking/payment or fake personalized itinerary claim | Same preview boundary; reference-based landscape layout |
| Etiquette S1/R | Etiquette preview | Preview now; proposed future learning/guidance | APP:YM-VISION-ETIQUETTE (P) | Clear preview and readable content; no invented working lesson workflow | Same boundary and reference-reviewed reading layout |
| Blog/community S1/R | Articles, community preview | Preview now; publishing, posting, sharing/moderation future | APP:YM-VISION-COMMUNITY (P) | Label sample content; no public post/share or invented members/activity | Review article/content layout; no false community activity or hidden preview status |
| Subscriptions/settings S1/R + S2/A | Simulated plan comparison, profile/settings | Prototype simulated Free/Plus and settings; public pricing/real billing deferred | APP:YM-08, YM-03, YM-07 | Simulation labels; comparison enables then reverses without deleting plans; edits/reset usable | Same state/reversal, readable dialogs, explicit session-reset scope |
| Weekly reflection S1/R, S3 supporting discussion | Reflection/insights | Retain in vision; prototype preview; proposed working reflection after core progress evidence | APP:YM-07 (underlying progress), APP:YM-VISION-REFLECTION (P) | Sample reflection labelled; no invented moods/streaks/health metrics; no real sharing | Same provenance; reference-reviewed insight hierarchy; no unapproved chart/storytelling design |
| Modes, saving/reopen and failure integrity S2/A | Results, progress, errors/reset | Core prototype acceptance; persistence still gated by S-01 | APP:YM-04–08, YM-09 | Retain original provenance on reopen; separate guided/live timing including provider latency; error/retry/reset unobscured | Same semantics across layout changes; forms/modal focus and original result labels survive navigation |
| Screen-by-screen approval S1/R | Every screen plus empty/loading/error/preview states | Before integration, not a final end-only review | APP:YM-UX-01 then owning task, YM-09 | Record reference ID/version, screenshot, discrepancies and Kaiwan review result for each screen | Separate landscape review evidence; phone approval never substitutes for tablet approval |
| Mobile packaging/distribution S1/R as roadmap requirement | Installed-app lifecycle, store/release artifacts | Proposed future milestone; separate from responsive web prototype | APP:YM-MOBILE-01 (P), launch readiness | Later device install/start/update verification for approved packaging choice | Later tablet installation/orientation testing; responsive screenshot does not prove app packaging |

## Guide reconciliation

Recovered intent: Jane/Kay are friendly, empathetic, motivational lifestyle guides, not emotionless skins. Retain approved identity separation: switching guides cannot alter user identity, stored plans, constraints or progress, grant entitlements, change provider/mode or relabel provenance. “Presentation-only” is narrowed to those data/functional invariants; it must not erase the earlier interpersonal intent.

**G-01 proposal:** express adaptation through wording, pacing and encouragement in response to explicit user preferences and the current journey/action state. Keep underlying capabilities and constraints equivalent for Jane/Kay. Review concrete guide-selection, success, setback and error copy before implementation. No inferred emotion, mood tracking, diagnostic claim, romantic companion behavior, voice/video or added personal-data collection is authorized. Exact tone differences, triggers and whether adaptive live copy is needed during the prototype remain unresolved. Do not retrofit contracts or prompts during this reconciliation.

## YM-UX-01 — Required design-reconciliation checkpoint

Status: open, blocked on missing references and guide-behavior review. Requirement to have this checkpoint is approved in S1; detailed process below operationalizes it. Responsibility: Product/UX & Design; actual documentation executor: Codex in this chat. Named specialist assignments are not execution evidence.

1. Recover and register approved assets by screen, option, original approval message, version, orientation and file/link; mark unavailable references explicitly. Never substitute the scaffold, a new generated mockup or an earlier assistant description for an approved image.
2. Reconcile the matrix, G-01 and the Home/Explore labels versus original section taxonomy. Sixth lifestyle category stays unresolved; the full screen list is not a six-category taxonomy. Final sample names remain deferred.
3. Build a screen review checklist from recovered references, including bubble behavior, type/spacing/density, interaction and all relevant states. No UI implementation under this checkpoint without new authorization.
4. Before each screen is integrated, present phone portrait and tablet landscape comparisons with the approved references, list discrepancies, and obtain screen-specific review. A functioning API, passing scaffold tests or a desktop screenshot does not satisfy this gate.

Proposed test viewports (P, not original approved dimensions): phone 390×844 and tablet 1024×768 CSS pixels, plus adjacent widths. Confirm the original canvas sizes when references return. Check touch operation, readable text, focus order, keyboard/safe-area behavior and fixed-bubble collisions. Physical phone/tablet review remains required at investor readiness; viewport emulation alone is limited evidence. Other orientations may degrade gracefully but do not replace the two primary acceptance orientations.

## Missing reference register and conflicts

| Item | Known approval / missing evidence | Required next action |
| --- | --- | --- |
| Exercise option 1 | S1 affirms approval and small fixed Jane bubble; image, version, dimensions and detailed states absent | Recover original approved phone image and tablet adaptation, plus approval context |
| Jane/Kay assets | Selection approved; actual likeness/avatar files, crop/scale and usage rights not established locally | Recover existing approved assets and usage basis; no new avatar generation |
| Phone/tablet reference set | Orientations approved; canvas dimensions, spacing, typography, colors and component details unavailable | Register exact references, screen names and versions; identify screens lacking references |
| Onboarding/home and remaining screens | Full vision reaffirmed; actual approved visual assets not recovered | Recover screen-by-screen assets, including guide interaction and reflection if approved |
| Reflection format | History discusses both data-led and storytelling alternatives; no unambiguous chosen layout recovered | Keep visual choice unresolved; do not adopt charts/badges/confetti or collect mood data by implication |
| Adaptive guide rules | Intent reaffirmed, recent presentation-only sentence too restrictive if read as no empathy/adaptation | Review G-01 and sample copy; preserve functional/data invariants |
| Navigation taxonomy | Local shell labels approved as defaults, but original full sections now explicitly restored | Map sections to navigation after reference recovery; do not erase fashion/travel/etiquette/community/reflection |

## Non-destructive task-ID crosswalk

Use `(namespace, raw ID)` identity. Existing raw IDs, dates, commits and titles are preserved; relationships are overlaps, not renaming or automatic status transfers.

| Application identity | Dashboard identity / evidence | Relationship and status |
| --- | --- | --- |
| APP:YM-01 Product foundation and acceptance | DASH:YM-01 Scope & delivery controls, visible in revision 15 | Different parent scopes; share product-boundary/acceptance concerns, not the same deliverable |
| APP:YM-01 scope evidence | DASH:YM-01.1 Confirm prototype boundaries (Completed) | Related scope; new experience amendments still require capture, not automatic completion |
| APP:YM-02A repository/frontend scaffold, checkpoint acbe3d8 | DASH:YM-01.3 Create You&Me GitHub repository (To do) | Repository instructions/templates locally committed provide partial reconciliation evidence. Frontend task is broader; no remote completion asserted or history rewritten |
| APP:YM-01 documentation sign-off | DASH:YM-01.4 Approve acceptance baseline (To do visible; body then truncates) | Local approval plus this amendment are evidence candidates, not a remote status update |
| No application release equivalent | DASH:YM-01.2 Establish delivery dashboard (Completed, b48968af…) | Dashboard implementation only; never proof of Fitness/Nutrition delivery |
| APP:YM-02B/C/D, YM-03–10, YM-UX-01 and vision IDs | Not visible in current truncated revision 15 read | Mapping unresolved; never infer matching raw numbers |
| APP:YM-10 investor demonstration | Historical revision 7 DASH:YM-10 automation infrastructure | Historical collision retained; current downstream dashboard item not reverified |

Full mapping remains blocked on a complete dashboard export/read. Revision 15 now links the application repository, correcting the old empty-repo observation. No dashboard mutations or synchronization were performed in this reconciliation.

## Revised next step

Remain paused on application implementation, including YM-02C. Reference recovery has reached its current limit. Next planning action is S-01 product review; no repeated asset search. UI work still needs its own reference/new-proposal review before implementation/integration. S-01 still needs independent approval before persistence. Mobile packaging strategy, app-store/distribution channels and installer/release validation stay proposed and unscheduled on a separate roadmap track; responsive layouts do not establish a native app or select React Native/Expo/PWA/wrapper technology.

## YM-UX-01 reference preparation update — 2026-11-02

Preparation artifacts: [reference register](REFERENCE_REGISTER.md), [Exercise option 1 checklist](EXERCISE_DASHBOARD_REVIEW.md), [dashboard sync proposal](DASHBOARD_SYNC_PROPOSAL.md), and [deck inspection inventory](references/deck-inspection.json).

Availability correction: the two known historical proposal decks in the project parent folder are now located and inspected. REF-001 has 13 text-only slides; REF-002 has 14 slides and a single cover PNG reused on slides 1/14. The PNG was visually inspected and extracted unchanged as REF-003; it is not an Exercise mockup or an identified approved Jane/Kay asset. Original decks were not edited. The register distinguishes file discovery from approval recovery and from new state/viewport/guide proposals. No original phone/tablet Exercise image or standalone approved guide asset was found within the restricted project search boundary. Earlier missing-asset observations above are historical; use the register for current availability.

Matrix rows for Exercise, devices, guides and screen review now reference REF-004/005/006 and EX-01–EX-14. Full-vision rows reference REF-007. Loading/empty/error treatments remain REF-P01 proposals; UX-Q-01 and G-01 remain pending. Every screen check remains unexecuted; the scaffold is excluded as a design reference.

YM-UX-01 stays Open: blocked on original screen/avatar references, approval context and G-01/navigation/state review. Reference preparation does not satisfy reference fidelity or authorize UI implementation. Earlier proposed YM-UX-01A intake is on hold until new assets/locations arrive; it is not the next required action. S-01 product review can proceed without those assets. This is a proposed local subtask, not a synchronized dashboard record. S-01 remains pending, A/B preserved, application implementation paused. Dashboard change list prepared only; no synchronization performed.

## Reference recovery limit and parallel planning — 2026-11-02

Kaiwan confirms reference recovery has reached its current limit. Do not repeat the same asset searches without a newly supplied location or asset. Original approved Exercise Dashboard images remain unavailable. Tablet adaptation and loading/empty/error treatments may need new design review. Final avatar artwork may remain pending while the approved Jane/Kay concept stays intact. Any later reconstruction must be labelled a new proposal, never an original approved reference.

YM-UX-01 remains Open. Missing images restrict visual fidelity claims and screen design/integration approval; they are not a blocker for all project work. Storage product review and other reference-independent planning can proceed. Further application implementation still requires separate authorization; S-01 and G-01 remain pending.

## APP:YM-PREVIEW-01 implemented proposal matrix — 2026-11-04

| Source / requirement | Screen | Scope / task | Phone/tablet check and status |
| --- | --- | --- | --- |
| Latest explicit new-proposal authorization; recovered Jane/Kay concept | Welcome, Settings | APP:YM-PREVIEW-01; overlap DASH:YM-03.1 | Default/selection, state invariance and initial-art disclosure checked; visual review pending |
| Goal and constraint-aware sample | Goal form, Home | Same task; partial APP:YM-03 | 320/390 phone and landscape tablet, validation/loading/long text reviewed; goal semantics remain displayed only |
| Clean card hierarchy, fixed unobtrusive guide | Fitness | Partial APP:YM-05; DASH:YM-04.1 | Narrow stacked cards, landscape split cards, reserved guide rail; new proposed design, no original fidelity claim |
| Honest provenance, completion/undo | Fitness, Progress, Settings | Partial APP:YM-04/07; DASH:YM-06.1/08.2 overlap | Local sample timing/equipment/exclusions and idempotent events verified; no durable save or provider proof |
| Broader experience | Nutrition, Explore, preview cards | Future proposed | Vision retained, unavailable labels; no extra working domain or sixth category decision |

New source: user attachment 64a04bcf-9cc9-4819-9145-47c0beaa4787, 2026-11-04. This permits a new proposal now without finding missing original assets. YM-UX-01 remains open for screen acceptance. Dashboard revision 17 supplies the newer crosswalk; raw IDs/history preserved.
