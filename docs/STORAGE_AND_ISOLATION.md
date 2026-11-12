# S-01 — Storage and isolation reconciliation

Status: architecture reassessment. Supabase replacement proposed, pending review; prior SQLite/D1 implementation paused. No operational persistence is integrated. Date: 2026-11-02.

Original architecture reported in prior planning: local SQLite / hosted Cloudflare D1. The subsequent YM-01 draft instead proposed browser-local durable saving. These are different data-handling contracts; neither is implemented in the inspected baseline.


## Current S-01 decision state

Kaiwan approved the preceding SQLite-local/D1-intended direction with 7-day inactivity/30-day maximum expiry, expired active-record cleanup within 24 hours, browser/installation-only continuity and fictional initial hosted demos. That approval is historical fact, not retroactively removed. Implementation was then interrupted and explicitly paused for a Supabase replacement evaluation. **Supabase Postgres + anonymous Auth + existing Hono is now proposed, not approved.** Current comparison, project inventory, access/deletion design, setup requirements and conditional implementation prompt: [Supabase architecture proposal](SUPABASE_ARCHITECTURE_PROPOSAL.md).

Lifecycle/identity product boundaries are retained. Hosted activation, personal data, billing and permanent-account/mobile features remain outside current scope. S-01's platform/anonymous-Auth amendment awaits review before any persistence resumes. Prior D1-specific cost/backup assumptions below are historical and must not be applied to Supabase.

Interrupted work wrote only inactive drafts: migrations/0001_sessions.sql, migrations/0002_resources.sql, server/database.ts, server/persistence.ts. They are preserved, not applied, imported by API entry points or validated as completed persistence. No database project or durable application database was created. Do not use these SQLite migrations as Postgres migrations.

## Historical SQLite/D1 recommendation

Retain the original SQLite/D1 direction, with one API-owned persistence contract and anonymous session isolation. This is the simplest consistent approach that preserves the original architecture: no dual browser/server source of truth, no sync and no accounts. SQLite runs behind the local API; D1 runs behind the hosted API. Both use migrations and equivalent typed contracts. Browser cookies establish session access; they are not user profiles or account recovery.

**Material change requiring review:** hosted profiles, plans and progress would leave the browser and persist in server-managed D1, rather than only on the device. Approve S-01 before YM-02C implements persistence or any hosted personal-data trial. Public access, cross-device login and provider retention are separate future gates. If S-01 is declined, revise the architecture and acceptance contracts explicitly; do not quietly implement browser-only storage or dual writes. YM-02A can proceed without implementing either storage option.

## Data locations

| Data | Local environment | Hosted environment | Isolation / lifetime |
| --- | --- | --- | --- |
| Anonymous session identifier | Opaque unguessable cookie in browser; server-side hashed lookup in SQLite | Secure HttpOnly SameSite cookie; hashed lookup in D1 | Separate origin/browser cookie jars; not shared with dashboard or Jarvis. Server derives session from cookie, never client-supplied owner ID. No recovery after cookie loss; new session cannot access old records. |
| Profile and guide preferences | SQLite session-owned rows, only when explicitly saved | D1 session-owned rows, only when explicitly saved | All reads/writes/deletes scoped to session; absent values remain absent. |
| Saved plans and input/provenance snapshots | SQLite session-owned versioned rows | D1 session-owned versioned rows | Explicit save; immutable historical input snapshot; no public listing or cross-session IDs granting access. |
| Progress and simulated entitlement | SQLite session-owned completion/entitlement records | D1 equivalent | Stable action IDs; idempotent completion/undo; no real billing. |
| Unsaved forms/results and guided walkthrough position | Browser memory; cleared on reload/restart | Browser memory; same behavior | No durable personal drafts in localStorage/IndexedDB. Guided fixtures shipped as public sample assets, not private user records. |
| Provider credentials | Server environment only | Server secret binding only | Never in cookie, browser bundle, plan snapshots, logs or repository. No credential provisioning in YM-02A. |

Local SQLite databases, hosted D1 and dashboard databases are separate; no automatic copying between them. A shared local API is still session-isolated. No names/emails/passwords are required. UI must disclose server location and lack of cross-device recovery before save, especially on shared devices. API authorization, CSRF protection and non-cacheable private responses are implementation requirements, not additional product approvals.

## Reset contract

- Restart walkthrough: clears in-memory guided position/completion only; restores fictional fixture defaults; preserves saved personal profiles, plans, progress and simulated entitlement.
- Clear this session's prototype data: after confirmation, atomically deletes its saved profile/preferences, all plan versions/snapshots, completion records, simulated entitlement and server session lookup. Clear matching browser cookie and transient app state only after acknowledged deletion; next visit starts a fresh session with Jane and Free defaults. Do not delete other sessions, migrations, shared sample fixtures or other applications' data.
- On deletion failure: report failure; keep session access for retry; never falsely claim deletion. Cancelling does nothing. Closing a tab or losing a cookie is not deletion.
- Reset deletes active application records, not provider records, hosting logs or retained backups. Do not log request bodies, profiles or plan contents. Hosted retention/backup policies and deletion disclosures must be verified before hosted personal-data use; no claim of universal erasure.

Automatic expiry/retention and orphan cleanup remain an operational gate before hosted personal-data use. A concrete retention policy must be recorded before that gate passes; no indefinite retention is approved. These open operational details do not block the frontend scaffold.

## S-01 product review — recommendation, not approval

Prepared 2026-11-02. No persistence, database connection, migration, persistent session or deployment was implemented. The following makes the existing recommendation concrete for product review; it does not imply approval of server retention or authorize YM-02C. Missing original UI references do not block this storage decision.

| Topic | Local development | Hosted demonstration | Product consequence / proposed default |
| --- | --- | --- | --- |
| Stored data | Explicitly saved minimal profile/guide preferences, versioned Fitness/Nutrition plans with input and provenance snapshots, action completion/undo state, simulated entitlement and anonymous session lookup in a durable SQLite file | Equivalent session-owned records in a separate D1 database behind the API | No email/password, payment data, diagnoses or body metrics. Store only explicit saves and required progress/entitlement state. |
| Data location | SQLite on the development computer, outside Git/build artifacts and automatic cloud-sync folders; exact protected path is an engineering choice | Operator-managed Cloudflare D1, not browser-only storage; production hosting/bindings not provisioned | Material decision: hosted profile/plan/progress data leaves the visitor's device. No local↔hosted database synchronization. |
| Browser state | Opaque session cookie; unsaved forms/results/walkthrough state in memory only | Persistent opaque Secure/HttpOnly/SameSite cookie; transient drafts in memory | No duplicate durable profile/plan store in localStorage or IndexedDB. No secrets or profile fields in cookie. |
| Isolation | Every API read/write/delete scoped to the server-derived anonymous session; shared local server still isolates cookie jars | Same scope on D1; guessed record IDs or submitted owner IDs never grant access | This is browser-session isolation, not proof of a distinct human. People sharing one browser profile can share its session. Use full reset/private browsing on shared demo devices; no identity recovery. |
| Reload and browser closure | Saved rows survive reload/closure if the persistent cookie remains valid; unsaved drafts are not promised to survive | Same behavior; browser privacy settings/incognito may discard the cookie | Losing/clearing a cookie loses access, not immediate server deletion. Old rows expire on schedule; new sessions cannot reclaim them. |
| Server restart | Saved rows survive with the same SQLite file and session/security configuration; deleting/resetting the file loses them | D1 rows survive API process restarts; continued access requires same database and valid cookie/session configuration | No claim that temporary/in-memory DBs persist. API outage prevents access until service returns, not automatic offline saving. |
| Restart walkthrough | Clears in-memory guided position/completion; restores fictional fixture defaults | Same | Preserves saved personal plans/profile/progress and simulated entitlement. |
| Clear this session's prototype data | Confirmed deletion removes all session-owned active rows, plan versions/snapshots, profile/preferences, completion events/state, entitlement and lookup; then clears local app cookie/transient state | Same scope in D1 and browser | Does not affect other sessions, schema/migrations or common sample fixtures. New session starts with Jane/Free defaults. Failed deletion is reported; cookie remains usable for retry. |
| Deletion limits | Does not remove earlier filesystem/cloud-sync/manual backup copies or third-party provider data | Does not selectively erase recovery history, host logs or provider-held data | Disclose active-data deletion separately from backup expiry. Do not promise universal or immediate forensic erasure. No personal data in test fixtures or request-body logs. |
| Retention/expiry — NEW PROPOSAL | Same logical rules for realistic tests, using fictional data by default | Session access expires after 7 days without meaningful app use, with a 30-day absolute lifetime from creation | Apply to saved profiles/plans/progress/entitlements together; do not reset maximum age with background health checks. Expired sessions inaccessible immediately; physical active-row cleanup within 24 hours. Cookie expires no later than server session. |
| Orphans, logs and backups — NEW PROPOSAL | Cookie-loss orphans follow the same expiry. No personal demo exports/backups by default; keep database outside synced source folder | Daily cleanup for expired/orphaned records; no manual personal-data exports. Recommend at most 7 days minimal operational logs, no bodies/cookies/tokens | Platform recovery retention is plan-specific, outside per-session deletion. Verify actual plan and logs before hosted personal-data use; purge/reapply deletions before serving any restored backup. No persistent identifiers in access logs where avoidable. |
| Future phone/tablet clients | Web browsers use the same API/contracts; each origin/browser profile has its own anonymous session | Future packaged clients can implement compatible secure credential transport without changing the domain contracts | No cross-device identity, shared phone/tablet history, account login or offline sync exists. Each installation/browser starts separate unless identity/linking is separately designed and approved. Packaging remains a separate roadmap decision. |
| Costs/dependencies | SQLite requires a local persistence adapter/migrations, isolation tests and file lifecycle; no separate managed database subscription | Requires D1, compatible hosted API binding, cleanup execution, usage limits/observability, retention/deletion disclosures and platform access | Prefer available free capacity, but do not promise zero total cost or enable a paid plan. Exact Sites/Cloudflare allocation, billing responsibility, region and operating limits remain to verify. No provider/API spend is included or enabled. |

### What Kaiwan needs to decide

1. Accept API-owned SQLite locally / D1 hosted, including server-side retention of hosted demonstration data rather than device-only saving. Recommend yes, with fictional data as the demo default and explicit informed saving of personal inputs only after hosted privacy/operations gates pass.
2. Accept the proposed 7-day inactivity / 30-day maximum session lifetime, daily active-row cleanup and unavoidable backup-expiry caveat. Recommend yes for an investor prototype; any longer research/pilot retention is a separate decision.
3. Accept browser/installation-only continuity with no account or cross-device recovery. Recommend yes now; do not present phone/tablet layout compatibility as shared identity or offline sync.

These remain pending. The existing ban on paid services is unchanged; a later paid-plan decision would require separate authorization. S-01 approval alone would not authorize implementation or public hosting.

### Routine engineering choices

Resolve schema/index names, SQLite adapter, migrations, opaque token generation/hash lookup, cookie configuration, request authorization/CSRF, atomic reset, expiry enforcement, cleanup/retry mechanics and automated isolation tests within the approved contract. Do not ask for approval of each. Return to product review if those choices alter collected data, retention, sharing, identity, costs or user-visible deletion guarantees.

Before hosted personal-data use, verify operator access, storage-region suitability, actual host logging/backups, restoration/deletion procedure, free-tier availability and cleanup execution. These are readiness checks, not implied legal/privacy certification or a deployment approval.

### Current platform facts checked for this review

Cloudflare's [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) lists free allowances of 5 million rows read/day, 100,000 written/day and 5 GB total storage; quotas are not an entitlement verified for this project's Sites hosting. Free-plan limit exhaustion can cause query errors. Workers/hosting have separate charging/plan considerations. [D1 limits](https://developers.cloudflare.com/d1/platform/limits/) state Time Travel history is 7 days on Free and 30 days on Paid. [Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) is automatic. Thus active-row deletion must not be described as immediate removal from all recovery history. Actual deployment plan remains unverified; no paid service enabled.
