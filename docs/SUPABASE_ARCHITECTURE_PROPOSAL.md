# S-01 amendment — Supabase persistence proposal

Date: 2026-11-02. **Proposed, pending Kaiwan review.** SQLite/D1 implementation is paused. No project, branch, billing, credentials, cloud migration or persistence integration was created in this review. Neo4j is excluded; no graph-specific requirement has been identified.

## Current evidence and preserved work

Read-only Supabase inventory found one visible organization, `kaiwanmirza-blip's Org` (`bcxqhabehcsayuwalemo`), reporting Free, and one visible project, **Elevated Finds Studio** (`iloiveofvljyctrodpyx`, us-east-1, ACTIVE_HEALTHY). Only project/organization metadata was read; no tables, customer data, keys, settings or migrations were accessed/changed. No dedicated You&Me project exists in this visible inventory. Visibility is not a guaranteed account-wide capacity reservation.

Recommend a new, separate **you-n-me-prototype** project. Current organization is a candidate, not an approved selection; confirm organization and region before eventual creation. Never reuse Elevated Finds Studio, its schemas, credentials, Auth users or backups. Do not upgrade its organization to obtain a feature for You&Me; billing is organization-wide.

The interrupted SQLite turn wrote `migrations/0001_sessions.sql`, `migrations/0002_resources.sql`, `server/database.ts` and `server/persistence.ts`. They are incomplete/unverified drafts, not wired into app/index or package scripts. The only SQLite operation run was an in-memory capability probe; no durable application database/migration was created/applied. Preserve drafts without continuing or treating them as Postgres migrations. YM-02A checkpoint acbe3d8 and YM-02B working changes remain intact. No new source code was written during this architecture review.

## One recommended architecture

**React → existing Hono application API → dedicated Supabase Auth/Postgres**, using Supabase anonymous Auth as technical identity, a thin Hono-owned browser session transport, and Postgres ownership/RLS with explicit lifecycle enforcement. Local development uses a separate local Supabase stack; hosted activation remains a later review. No evidence requires replacing Hono or moving provider logic into client code/Edge Functions.

Use HTTP Auth/Data API/RPC calls from Hono for user-scoped data access, retaining validated shared contracts and user JWT context. Do not use a service-role client for ordinary user CRUD. This avoids requiring direct Postgres TCP connectivity from a future Worker deployment; production origin/cookie routing still needs deployment verification. Secret/service-role/database credentials remain server-only. A publishable key is not a secret and does not bypass RLS; the proposed web BFF need not ship a Supabase client/key/token store to the browser.

### Architecture comparison

| Concern | Earlier SQLite/D1 direction | Supabase recommendation |
| --- | --- | --- |
| Local persistence | Lightweight SQLite file outside synced repo; incomplete draft adapter | Actual local Postgres + Auth/Data API using Supabase CLI and Docker-compatible runtime; heavier local tooling, closer local/hosted parity |
| Hosted persistence | D1 and compatible hosted Hono bindings | Dedicated managed Postgres/Auth project plus separately hosted Hono/frontend; Supabase does not automatically deploy the existing app |
| Identity | Custom API-owned opaque session, ownership and expiry logic | Anonymous Auth user UUID + user JWT/RLS; Hono cookie bridge and application expiry ledger still required |
| Migration strategy | SQLite SQL intended for D1, unverified there | Supabase/Postgres migrations, grants/RLS/RPC and fictional seeds; root SQLite SQL is not portable by assumption |
| Capacity/cost | No managed local SQLite charge; D1 allowances and host limits separate | Free candidate has 500 MB DB, 50,000 MAU, 5 GB egress and 1 GB object storage; two active free projects per eligibility rules. Only one visible existing project suggests a possible spare slot, not guaranteed availability. Pro advertised from $25/month with compute/usage considerations; no paid plan authorized |
| Availability/cleanup | Local service/cleanup must run; hosted D1 runtime scheduling needed | Free projects may pause after one week inactivity. Paused/offline infrastructure cannot prove a 24-hour physical-cleanup promise; hosted activation must establish a monitored always-executing cleanup arrangement or revisit plan/guarantee |
| Offline use | Local server works without Internet; no browser offline sync | After dependencies/images are obtained, local stack can run without Internet. A hosted-only client cannot read/save remotely while offline. No offline cache/sync or shared device identity is added |
| Backups/logs | D1 Time Travel assumptions were platform-specific | Use Supabase facts below; no D1 recovery period or deletion promise transfers |

## Anonymous-session decision

| Option | Benefits | Tradeoffs / future impact |
| --- | --- | --- |
| API-owned sessions only, Postgres storage | Closest to previous plan; no Auth-user lifecycle or MAU identity bookkeeping | Must build/authenticate ownership context and enforce it correctly in Hono/Postgres; later permanent accounts need identity mapping/migration; ordinary service-role queries can silently bypass RLS |
| **Supabase anonymous Auth + Hono web bridge (recommended)** | Native user UUID/JWT/RLS model, future identity linking and mobile SDK compatibility | Creates a technical auth.users record per anonymous identity, despite no email/password signup UI; not anonymous/de-identified data. Adds refresh/revocation/cleanup/abuse work; native session expiry is not the approved product expiry |

Supabase anonymous sign-in is different from an unauthenticated publishable/anon-key request: it uses the `authenticated` database role. Clearing browser data/signing out loses recoverability. Future permanent accounts can link an identity, but existing-account merging needs its own product rules; no conversion/login/recovery/cross-device feature is included now. Future mobile clients could use compatible native token storage and Hono bearer authentication; do not implement packaging or native clients in YM-02C.

For the web, propose a custom backend-for-frontend bridge: browser stores an opaque HttpOnly SameSite cookie, while Hono privately stores an encrypted Auth refresh credential mapped to its hash and Auth user/session. Refresh occurs server-side; browser does not call Supabase directly or store refresh tokens in localStorage. This is extra application transport code, not a claim Supabase's browser SDK automatically supports an HttpOnly-cookie SPA. Apply CSRF/origin checks and refresh concurrency handling. Encryption keys stay in server environment, not DB alongside plaintext credentials. No credentials are retrieved/generated in this review.

### Ownership and policy design

- All profiles/preferences, immutable plan versions/input/provenance snapshots, completion events/state and simulated entitlements carry `owner_id` referencing the Auth user. Composite keys/foreign keys include owner so plan/version/action records cannot cross owners.
- A server-controlled private lifecycle ledger records Auth user/session, creation, last meaningful use, absolute/idle expiry and revocation. Do not trust client owner IDs, editable user_metadata, health traffic or token refresh as meaningful activity. One anonymous identity per browser/installation is the prototype model.
- Explicit grants restrict reachable tables/functions; RLS restricts rows. Policy predicates require authenticated subject ownership **and** a live, unexpired application lifecycle/Auth session. SELECT is required for updates; UPDATE requires USING and WITH CHECK; forbid owner reassignment. Immutable plan envelopes cannot be overwritten; store a new version instead. Anonymous and permanent users share a database role, so role membership alone is insufficient authorization.
- Do not expose lifecycle/token tables. A narrow private policy helper may need privileged read of lifecycle/auth session existence, but must derive caller UID/session from verified claims, return only a boolean, pin search_path, and have tightly scoped grants. Do not add broad public SECURITY DEFINER functions or grant authenticated users direct access to auth.sessions. Ordinary mutation RPCs should use invoker context; any necessary privileged helper must be separately reviewed/tested.
- Hono preserves provider/domain validation and updates the ledger only after successful meaningful work. Database/RLS must also deny expired/deleted sessions through direct Data API attempts, not merely at Hono. No views bypassing RLS; if needed later, use security-invoker semantics and explicit grants.

## Retention, deletion and operational limits

Retain already approved **7 days inactivity, 30 days absolute lifetime**, access denial at expiry, expired active records removed within 24 hours. These are app rules. Supabase sessions otherwise default to indefinite lifetime; native timebox/inactivity controls are Pro-and-up and enforced around refresh, not an exact substitute. Automatic anonymous-user cleanup is not provided. Keep local test time injectable; production time must be trusted server/database time.

Full reset must first atomically revoke the application lifecycle access and delete that owner's active profile/plans/events/entitlement plus web credential mapping in Postgres. With no active ownership grant, even a still-valid JWT must fail every exposed app operation, including INSERT. Then revoke sessions/hard-delete the anonymous Auth user with a server-only administrative cleanup worker. Auth API deletion and app SQL are not one distributed transaction: persist a retryable cleanup job/tombstone and report pending administrative cleanup truthfully if it fails. Bound the job's minimal identifiers/retention; remove after confirmed completion. A deleted Auth user or sign-out does not by itself immediately invalidate all already-issued access JWTs; test the policy gate with captured old tokens.

Walkthrough restart remains memory-only and never resets database records. Dev-stack reset is a separate explicitly destructive local-only command. Sign-out/cookie loss is not a verified application-data delete. No user-owned file uploads are in scope; later Storage objects would need separate deletion handling.

Propose hourly bounded cleanup with retries/observed runs, not only once per day, to meet the 24-hour target. Supabase Cron/pg_cron can invoke database jobs or a secure administrative worker; no job/extension is enabled now. Deny access immediately at expiry even if cleanup is delayed. A sleeping development computer or paused Free project cannot guarantee wall-clock deletion while unavailable: run overdue cleanup before serving on restart and report missed deadlines. Hosted fictional demonstrations still need a verified availability/cleanup plan; personal data and any changed guarantee need deployment review. Do not claim a schedule is active from a SQL file alone.

### Supabase-specific backup/log findings

- Free: managed daily-backup access is not included; manual exports are the documented recommendation. Do not treat this as D1 Free seven-day Time Travel. No exports are made here; use disposable fictional local/demo data initially.
- Pro: daily backup access for seven days; Team 14, Enterprise up to 30. PITR is a paid add-on with compute requirements, not enabled/free. Database backups do not include uploaded Storage object contents.
- Pricing lists API/database log retention Free 1 day, Pro 7 days, Team 28, Enterprise 90. Auth audit events have external log storage and optional database storage (`auth.audit_log_entries`); the guide does not establish that the API-log window automatically purges those DB rows. Verify configuration and an explicit policy before hosted activation. Do not log request bodies/cookies/tokens; no promise to erase platform logs per visitor.
- Reset removes active application data, not earlier exports, backups, vendor logs or provider records. A restore must reapply expiry/revocation/deletion before serving visitors. Current project-specific backup/log guarantees are not inspected because no You&Me project exists.

## Setup requirements and product decisions

**Decisions for Kaiwan:** approve replacing local SQLite/intended D1 with Supabase Postgres; approve technical anonymous Auth-user creation plus the Hono bridge; confirm organization/region for a future dedicated project; accept Free's operational limits for fictional development/demo use or separately review a nonzero budget before hosted activation. Keep lifecycle rules and browser-only continuity, no accounts/recovery/cross-device sync. Do not weaken deletion/expiry promises silently to fit Free.

**Engineering setup:** Node 24/current TypeScript already present; Supabase CLI and Docker command were not found on PATH during this review. A compatible running container engine, disk/memory capacity and loopback-only stack ports must be verified. Docker data volumes must live outside the OneDrive repo; metadata/migrations may be versioned, credentials/generated state may not. Native no-Docker local runtime is not the supported Windows path identified in current docs. Pin SDK/CLI versions and lockfiles. Current Hono is retained. Confirm allowed CORS/origin/cookie routes and session-transport key management before future deployment.

No cloud resource is required for the next local-only implementation task. Eventual hosted setup must create a dedicated project only after separate organization/region/cost approval, verify available slot/quote at that time, enable anonymous Auth only there, configure abuse prevention and usage monitoring, apply reviewed grants/RLS/migrations, test cross-user denial, and verify cleanup/backups/logging. Never link this repository to Elevated Finds Studio to shortcut setup. Do not add Storage, Realtime, vectors, Neo4j or paid branching without a requirement.

## Fully populated next implementation instruction — use only after approval

Implement only **YM-02C — Local Supabase migrations and persistence** after Kaiwan approves this S-01 amendment. Outcome: durable local Postgres/Auth persistence through existing Hono/shared contracts, with no cloud mutation or UI implementation.

Prerequisites: read AGENTS/current plans/session notes/approval; preserve YM-02A/B and unrelated edits; inspect the interrupted SQLite files and retain them as clearly inactive legacy drafts rather than apply/port automatically. Confirm local CLI/runtime versions via help and check Docker readiness. If unavailable, report that blocker; never fall back to Elevated Finds Studio or any cloud database. Discover current Supabase migration commands and use the installed skill's local migration workflow; do not invent filenames. Bind local stack to loopback and keep persistent volumes/secrets outside Git/build/OneDrive. No cloud link/push/remote reset.

Acceptance criteria:

1. Repeatable local Postgres migrations and labelled fictional seed/reset commands; dev reset separate from visitor deletion; verified restart durability and no unsaved-draft promise.
2. Local anonymous Auth + Hono opaque-cookie bridge with encrypted server-side refresh storage, explicit expiry/revocation ledger, safe refresh concurrency, no secrets/service-role/JWTs in client bundles or logs. No permanent account/link/recovery features.
3. Persist approved profiles/preferences, immutable plan versions/original provenance, progress/undo/idempotent event records and simulated entitlements under owner-aware keys/foreign keys. No provider calls or fabricated generated success.
4. Explicit grants and RLS with subject/session/expiry checks; test two users and unauthenticated callers against Hono **and direct local Data API**, including reads, forged owner IDs, updates, inserts, deletes, RPCs and record-ID attacks. Do not use broad service-role CRUD as a substitute for RLS tests.
5. Full session deletion atomically denies app access/removes app records; retry administrative Auth cleanup safely. Test captured old JWTs, delete failures, retries and restart. Walkthrough restart cannot erase persisted data.
6. Test 7-day inactivity/30-day absolute expiry with controllable test time; health and refresh do not extend meaningful-activity retention. Provide and exercise cleanup, counts/retries and overdue startup behavior. Document active scheduler evidence and offline/paused limitations; never claim unobserved 24-hour scheduling guarantees.
7. Test migrations/reapplication, seed repeatability, plan immutability, duplicate complete/undo, isolation, expiry/deletion failure recovery, refresh isolation and API restart. Existing frontend/API contracts/tests/typechecks and frontend/API builds remain passing. Run local database/security advisors and review findings.
8. Document exact local setup/start/review/reset/cleanup commands, volume location, migration/verification evidence and what is not cloud-tested. Update task status only against passed checks; keep YM-02 open until YM-02D passes, YM-UX-01/G-01 open.

Exclusions: project/organization creation, billing, cloud SQL/migrations/settings/keys, changes to Elevated Finds Studio, hosted activation/personal-data trials, provider calls, AI generation, product screens, mobile packaging, accounts/identity linking, payments, CI, Neo4j, Jarvis, planner work, push/publication. Stop before YM-02D. Report local changes/commits/remote/dashboard status separately and all not-run checks. Do not proceed merely because this prompt exists.

## Sources checked

- [Changelog](https://supabase.com/changelog): scan included Node 20 support removal (current Node 24 meets it), public-table grant changes, and local/runtime changes; exact versions/configuration must be rechecked at implementation.
- [Data API exposure change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) and [API security](https://supabase.com/docs/guides/api/securing-your-api): explicit grants plus RLS, never assume new tables are exposed automatically.
- [Anonymous Auth](https://supabase.com/docs/guides/auth/auth-anonymous), [sessions](https://supabase.com/docs/guides/auth/sessions), [user deletion](https://supabase.com/docs/guides/auth/managing-user-data), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
- [Local development](https://supabase.com/docs/guides/local-development), [Cron](https://supabase.com/docs/guides/cron), [billing/eligibility](https://supabase.com/docs/guides/platform/billing-on-supabase), [pricing](https://supabase.com/pricing).
- [Backups](https://supabase.com/docs/guides/platform/backups), [logs](https://supabase.com/docs/guides/observability/logs), [Auth audit logs](https://supabase.com/docs/guides/auth/audit-logs). Organization/project facts above come from read-only connector metadata, not these public pages.
