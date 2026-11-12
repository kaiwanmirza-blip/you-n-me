# YM-02B — API foundation and typed contracts evidence

Date: 2026-11-02 (America/Chicago). Status: complete locally; ready for review. Parent YM-02 remains In progress. Executor: Codex in this chat; Engineering POD responsibility, API/contracts specialist role. No subagents executed work.

## Prerequisites and checkpoint

Read AGENTS.md, current plans, product/decision/storage records, latest session notes and YM-02A evidence. Initial working changes matched the previously reviewed YM-02A scaffold and finalized planning files; no unrelated changes were removed. Staged 26 explicitly selected files and reviewed staged paths/content: no dependencies, build output, private .env files or credential-pattern matches. The first commit attempt failed because no Git author was configured. Retried with command-local `Codex <codex@localhost>` identity, without changing global settings or impersonating the user.

Created local checkpoint **acbe3d8db3bc00b8761281bca0bdb7b00fe28525**, parent `74dca7f36e0ae6e4ae31ef55f3ed457a1b36e6de`, before YM-02B source changes. No push, PR, publication or dashboard update. Current YM-02B changes remain uncommitted. Product specification, decision log and S-01 remain unchanged against that checkpoint.

## Acceptance criteria → evidence

| # | Evidence |
| --- | --- |
| 1. Runnable frontend/API connection | `dev:api` starts Hono on loopback 8787; Vite dev proxy forwards /api. Live HTTP checks passed for both direct 8787 and frontend 5174 health URLs. Browser reload showed “Local API connected · health only. Working capabilities remain unavailable.” Offline state was also observed before startup; reload retries. |
| 2. Minimal typed health | Health schema returns exactly status/service, no environment/versions/secrets/cookies. Unit and live HTTP checks passed. |
| 3. Shared validated contracts | shared/contracts.ts exports profile, inputs, Fitness/Nutrition plan, provenance, saved-envelope, event, entitlement, health/error schemas and inferred types. Tests include budgets, exclusions, quantities and invalid fields. No storage import/dependency. |
| 4. Mode/original provenance | Discriminated guided/demo sample versus live provider metadata; strict payloads; readonly/frozen provenance. Reopen helper validates/deserializes original envelope with no active-screen mode. Tests preserve demo provenance under a live screen context and reject mutation/snapshot mismatch. No persistent retrieval claim. |
| 5. Honest errors/unavailable capabilities | Unit tests and live HTTP requests verify 400 validation and 501 valid-but-unavailable. Malformed JSON 400, media type 415, body limit 413, unknown route/method 404 and sanitized unexpected 500 tested. No success or data echo for domain operations. |
| 6. Meaningful tests | 39 tests across four files: existing frontend scaffold, frontend health client, shared contracts and Hono request/error behavior. Fixtures are fictional, test-only and never API responses. |
| 7. Checks/builds | Clean npm ci passed (53 packages audited; no vulnerabilities reported); typecheck passed; all 39 tests passed; npm run build passed for frontend and API. Compiled Hono app served health over real loopback HTTP; start:api also started successfully. Existing frontend tests still pass. |
| 8. Records/commands/boundaries | README and API_FOUNDATION.md give two-terminal commands, PowerShell walkthrough, error/route map, contract conventions and deferred work. Project/master/delivery/session records updated, S-01 pending and YM-02C/D To do. |

## Resolved verification issues

First clean-install retry failed with Windows EPERM unlinking a running esbuild executable. Stopped only this project's known API/frontend/preview processes, retried npm ci successfully, reran checks/build and restarted frontend plus compiled API. Browser bindings initially failed; refreshed browser inventory and used the existing tab. No security settings changed. Earlier provider-free API-unavailable display was honest, not a fabricated connected state.

## Scope and limitations

No database connections, migrations, persistent sessions, provider calls, API keys, generation, onboarding, working journeys, payments, deployment, CI, Jarvis or universal-planner work. API resource bodies validate then return 501; event application, ownership/CSRF enforcement, idempotency and stored retrieval remain unimplemented. Future stateful code must enforce session isolation after S-01 review. Structural validation cannot certify clinical safety, interpret every dietary alias or authenticate provider-origin claims. See API_FOUNDATION.md for exact contract limits.

AC-01–AC-18 remain unexecuted product scenarios; contract tests do not mark them passed. Production assets compile, but hosted frontend/API routing and production operations are not implemented. Local review services are loopback-only; no public artifact exists.

## Synchronization and next action

- Local checkpoint: acbe3d8 (YM-02A + finalized planning records).
- Local working changes: YM-02B source, tests and documentation; no YM-02B implementation commit.
- GitHub: no push, PR or remote file change.
- Dashboard: unchanged; full ledger/ID mapping remains unresolved.
- Next recommended action: review S-01, then separately authorize YM-02C if accepted. Do not start persistence or YM-02D automatically. Parent YM-02 remains open until C/D are accepted too.
