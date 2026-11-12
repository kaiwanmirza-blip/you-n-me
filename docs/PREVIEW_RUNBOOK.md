# Local preview and Replit handoff

Use Node 24 (existing package minimum >=22.12), npm, and this repository root.

```powershell
Set-Location 'C:\Users\kaiwa\OneDrive\ALGDGADU\You&Me'
npm ci
npm run typecheck
npm test
npm run build
npm start
```

Open http://127.0.0.1:5174/. Stop the existing You&Me process first if the port is occupied. The current review server already uses this address. Ctrl+C stops it. Do not stop unrelated Node applications.

For hot reload, terminal 1: `npm run dev:api`; terminal 2: `npm run dev -- --port 5174 --strictPort`. Stop npm start first. Vite proxies /api to 8787. Static `npm run preview` is not the recommended integrated server.

Five-minute review (not a measured saved-plan usability acceptance):
1. Welcome: Jane selected; try Kay. Read sample/memory disclosures.
2. Continue; retain fictional goal, beginner, 20 minutes, no equipment. Prepare sample.
3. Home: view Fitness. Review inputs, source, three blocks and total time.
4. Choose “I have less time today”; set 15 and dumbbells, optionally exclude squats. Prepare and open the new plan. Total is 15, with curl replacing squat.
5. “Use this plan for this session.” Mark warm-up complete; observe 1/3. Undo; observe 0/3.
6. Settings: try Demo and unavailable Live; old plan remains Guided. Change guide; state stays. Restart can be cancelled or confirmed. Reload resets everything.

Health: `Invoke-RestMethod http://127.0.0.1:5174/api/health` returns status=ok/service=you-n-me-api. GET /api/plans/example remains 501. No database or provider required.

## Replit import preparation, not an import or deployment

The focused local branch is `feat/ym-preview-01`. November 4 stopped before commit. November 8 authorizes feature-branch push; use the actual reported commit/push receipt. To make it importable later, verify the reported branch exists on origin, then Git-import https://github.com/kaiwanmirza-blip/you-n-me and select the branch. Do not import the remote initial README and claim this preview is present. No parallel Replit implementation was created.

Install `npm ci`; build `npm run build`; start `npm start`. `.replit` Run builds then starts, with HOST=0.0.0.0 and PORT=5174 and one external port mapping. Same Hono process serves static frontend and /api; no Vite proxy or second exposed port needed in this mode. Local default stays 127.0.0.1. HOST/PORT handling and routing verified locally; Replit platform import, runtime version availability and hosting remain unverified. No secrets are needed. Future privileged keys remain server-only, never VITE_*.

Do not enable billing or publish from this handoff. A paid Replit plan does not imply provider credits or unlimited deployments. See official [configuration](https://docs.replit.com/features/project-setup/configuration) and [ports](https://docs.replit.com/features/project-setup/ports) documentation. Hono static serving follows its [Node adapter guidance](https://hono.dev/docs/getting-started/nodejs).
