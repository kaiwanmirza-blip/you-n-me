# you-n-me

You&Me investor prototype planning workspace. Application repository: https://github.com/kaiwanmirza-blip/you-n-me.

Start with the [master plan](docs/MASTER_PLAN.md) and [YM-01 product acceptance specification](docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md). See [delivery map](docs/DELIVERY_MAP.md), [decisions](docs/DECISION_LOG.md), [session log](docs/SESSION_LOG.md) and [project index](project.json).

YM-01 documentation gate is complete; approved refinements and explicit deferrals are recorded. Storage recommendation S-01 awaits review before persistence implementation. YM-02A is complete locally: a minimal frontend scaffold is available. Parent YM-02 remains in progress, retaining API/contracts, migrations and CI requirements. Product journeys and AC-01–AC-18 are not implemented/executed. Local changes have not been committed or synchronized to GitHub or the hosted dashboard.

## Run locally (PowerShell)

Use Node.js 24 LTS and npm (verified here with Node 24.12.0 / npm 11.6.2). No credentials or environment variables are required. The committed lockfile will determine dependency versions; this working copy is not yet committed.

```powershell
Set-Location -LiteralPath 'C:\Users\kaiwa\OneDrive\ALGDGADU\You&Me'
npm ci
npm run dev -- --port 5174 --strictPort
```

Open http://127.0.0.1:5174/ . If the review server is still running, open it directly; stop it with Ctrl+C before starting another on the same port. The server binds only to loopback. In a different checkout, use that checkout's literal path.

Expected: You&Me branding, Investor prototype label and Frontend foundation notice explicitly saying journeys are not implemented. No forms, navigation flows, AI or payments. Review at desktop and narrow mobile widths; reload should show the same static shell.

```powershell
npm run typecheck
npm test
npm run build
npm run preview -- --port 4173 --strictPort
```

Production preview: http://127.0.0.1:4173/ . Ctrl+C stops the preview. `dist/`, dependencies and local secrets are ignored by Git. `npm test` runs two server-rendered scaffold boundary tests, not investor journey acceptance.

Scripts invoke Node entry points directly to avoid Windows command-shim parsing errors in paths containing `&`. Do not replace them with unquoted Windows `.cmd` shims. Environment guidance is in `.env.example`; never put credentials in browser-exposed `VITE_*` values. Future API integration is YM-02B, storage S-01 is pending, and CI is YM-02D.

See [YM-02A verification](docs/YM-02A_VERIFICATION.md) for criterion-by-criterion evidence and synchronization status.
