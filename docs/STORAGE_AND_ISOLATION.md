# S-01 — Storage and isolation reconciliation

Status: recommended architecture; material hosted data handling pending Kaiwan review. No storage implementation exists. Date: 2026-11-02.

Original architecture reported in prior planning: local SQLite / hosted Cloudflare D1. The subsequent YM-01 draft instead proposed browser-local durable saving. These are different data-handling contracts; neither is implemented in the inspected baseline.

## Recommendation

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
