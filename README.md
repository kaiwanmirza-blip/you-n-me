# you-n-me

**Current planning state:** further application implementation is paused by Kaiwan. Read the [experience-to-delivery reconciliation](docs/EXPERIENCE_TO_DELIVERY.md) before resuming work. Mobile/tablet references and YM-UX-01 review are required before UI implementation/integration; the scaffold is not approved final visual design. YM-02A/B remain preserved; S-01 remains pending. Earlier run instructions and verification below are engineering evidence, not product-screen approval.

You&Me investor prototype planning workspace. Application repository: https://github.com/kaiwanmirza-blip/you-n-me.

Start with the [master plan](docs/MASTER_PLAN.md) and [YM-01 product acceptance specification](docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md). See [delivery map](docs/DELIVERY_MAP.md), [decisions](docs/DECISION_LOG.md), [session log](docs/SESSION_LOG.md) and [project index](project.json).

YM-01 documentation gate is complete; approved refinements and explicit deferrals are recorded. Storage recommendation S-01 awaits review before persistence implementation. YM-02A is complete locally: a minimal frontend scaffold is available. YM-02B now supplies the local Hono API and shared contracts. Parent YM-02 remains in progress, retaining migrations/persistence and CI/integration requirements. Product journeys and AC-01–AC-18 are not implemented/executed. Reviewed YM-02A work was checkpointed locally at acbe3d8. YM-02B changes remain uncommitted; neither task has been pushed or synchronized to the hosted dashboard.

## Run locally (PowerShell)

Use Node.js 24 LTS and npm (verified here with Node 24.12.0 / npm 11.6.2). No credentials or environment variables are required. The lockfile determines dependency versions. Stop local watchers before npm ci on Windows to avoid locked dependency executables.

```powershell
Set-Location -LiteralPath 'C:\Users\kaiwa\OneDrive\ALGDGADU\You&Me'
npm ci
npm run dev -- --port 5174 --strictPort
```

Open http://127.0.0.1:5174/ . If the review server is still running, open it directly; stop it with Ctrl+C before starting another on the same port. The server binds only to loopback. In a different checkout, use that checkout's literal path.

Expected: You&Me branding, Investor prototype label and Frontend foundation notice explicitly saying journeys are not implemented. No forms, navigation flows, AI or payments. YM-02B adds a truthful local API health indicator only. Review at desktop and narrow mobile widths; reload should show the same static shell.

```powershell
npm run typecheck
npm test
npm run build
npm run preview -- --port 4173 --strictPort
```

Production preview: http://127.0.0.1:4173/ . Ctrl+C stops the preview. `dist/`, dependencies and local secrets are ignored by Git. `npm test` runs frontend, contract and API tests, not investor journey acceptance.

Scripts invoke Node entry points directly to avoid Windows command-shim parsing errors in paths containing `&`. Do not replace them with unquoted Windows `.cmd` shims. Environment guidance is in `.env.example`; never put credentials in browser-exposed `VITE_*` values. API foundation is YM-02B; storage S-01 remains pending, and CI is YM-02D.

See [YM-02A verification](docs/YM-02A_VERIFICATION.md) for criterion-by-criterion evidence and synchronization status.

## Local API (YM-02B)

Start `npm run dev:api` in a separate terminal before reloading the frontend. The API listens only at http://127.0.0.1:8787; Vite proxies `/api`. Check `Invoke-RestMethod http://127.0.0.1:8787/api/health` and expect only `status: ok`, `service: you-n-me-api`. The page should show “Local API connected · health only.” Reload after API startup to retry its health check.

The only implemented successful endpoint is health. POST profile/plan/progress/entitlement routes validate their shared contracts, then return HTTP 501; invalid bodies return typed HTTP 400 errors. No data is persisted or generated. See [API commands, walkthrough and contracts](docs/API_FOUNDATION.md) and [YM-02B verification](docs/YM-02B_VERIFICATION.md).

`npm run build` builds frontend and API; `npm run start:api` runs the compiled API (stop dev:api first). `npm run preview` is static frontend-only and does not provide the development API proxy. There is no deployment wiring. No API keys or environment setup are needed.

## Persistence architecture under review

SQLite/D1 work is paused; four interrupted draft files are preserved but not wired into the API or applied. Read [the Supabase replacement proposal](docs/SUPABASE_ARCHITECTURE_PROPOSAL.md) before future persistence work. Supabase Postgres/anonymous Auth is proposed pending approval; no dedicated cloud project exists. Do not reuse Elevated Finds Studio or apply the root SQLite migrations to Postgres. Existing frontend/API validation-only runtime remains unchanged by this review.

## Current runnable preview — 2026-11-04

APP:YM-PREVIEW-01 delivers a new phone/tablet design proposal and bounded Fitness sample journey. Run `npm ci`, `npm run build`, `npm start`, then open http://127.0.0.1:5174/. Full [commands, walkthrough and Replit handoff](docs/PREVIEW_RUNBOOK.md); [checks and screen-review evidence](docs/YM-PREVIEW-01_VERIFICATION.md). Memory only: refresh resets; no live AI or durable save. The older scaffold-only descriptions above are historical. Supabase/S-01 remains proposed; no cloud setup or persistence. The app and mobile foundation are pushed on `feat/ym-preview-01`; no application deployment/publication is verified.

## Current planning and review

Use `feat/ym-preview-01` for the application; `main` remains the initial README-only baseline pending PR review. See [draft PR #1](https://github.com/kaiwanmirza-blip/you-n-me/pull/1), [pilot and tracker reconciliation](docs/TRACKER_RECONCILIATION.md), and [AI Studio Build brief](docs/GOOGLE_AI_STUDIO_BUILD_PROMPT.md). The [comprehensive handoff](docs/PROJECT_COMPLETE_HANDOFF.md) is a historical November 8 snapshot; newer dated planning records take precedence. Build briefs and pilot targets do not establish implemented capability.
