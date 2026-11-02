# You&Me repository instructions

Read `project.json`, `docs/MASTER_PLAN.md`, `docs/DELIVERY_MAP.md`,
`docs/DECISION_LOG.md` and the latest `docs/SESSION_LOG.md` entry before work.
Use `docs/PRODUCT_FOUNDATION_AND_ACCEPTANCE.md` for product acceptance.

- Execute only the authorized bounded task; preserve existing changes.
- Fitness and Nutrition are the planned working journeys; other domains preview-only.
- Keep guided/demo/live provenance explicit. Never substitute sample output for live AI.
- S-01 in `docs/STORAGE_AND_ISOLATION.md` is pending product review; do not implement persistence before approval.
- No paid services, real payments, deployment or publication without explicit scope.
- Never put secrets in `VITE_*`, frontend code, fixtures, logs or Git. Future provider credentials are server-only.
- Jarvis and the dashboard are separate projects. Do not rewrite their task IDs or histories.
- Run `npm ci`, `npm run typecheck`, `npm test` and `npm run build` as applicable. Inspect affected UI when available; report verification limits.
- Record actual evidence, executor and responsibility in local planning records. Assigned specialist labels are not evidence of execution.
- YM-02A is only the repository/frontend scaffold. API/contracts, migrations/persistence and CI/integration remain YM-02B/C/D. Keep parent YM-02 open until all are accepted.
- Report local changes, commits, GitHub synchronization and dashboard synchronization separately.
