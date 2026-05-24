Audit and Fix Plan — Polymarket MVP Phase 2 Live Path

Scope: Review all Phase 2 live-path changes, unify data paths, ensure safety gates, and prepare a clean, auditable path toward Phase 3 live pilot.

Summary of issues found (high level):
- Unused/legacy imports in Phase 2 live index (ingest-live import not used in runtime path).
- Inconsistent wallet/config gating across modules; added PHASE2_KILL_SWITCH and wallet-config checks, but some paths may still bypass gates.
- Live-bet path currently relies on sandbox logic but still retains a live bet call in some patches; ensure all live bets are gated behind edge checks and kill switches.
- Phase 2 live data ingestion tables in Supabase may not align with Phase 2 DB migrations; ensure table naming is consistent (polymarket_phase2_prices, polymarket_phase2_markets, polymarket_trades).
- Tests exist for edge logic but CI smoke tests are not fully wired; need CI to run a sandbox ingest + edge-run with no money.
- Wallet signer scaffolds are in place but not wired for a real wallet; ensure configuration guards are explicit and secure for future live path usage.
- Documentation gaps: Phase 2 gating protocol, how to enable live mode, and what to test in sandbox should be documented clearly in AUDIT and PR bodies.

Proposed fixes (high-level):
- Remove unused imports and dead code paths; ensure a clean baseline in main Phase 2 index.
- Strengthen gating: ensure PHASE2_KILL_SWITCH, PHASE2_LIVE_MODE, PHASE2_LIVE_WALLET_CONFIGURED are all checked in every live path, and log when a path is skipped.
- Align DB schema expectations with existing migrations and ensure the Phase 2 patch creates/uses the expected tables consistently.
- Add a robust, minimal test harness for Phase 2 edge logic with deterministic scenarios.
- Document Phase 2 live gating clearly in a single place (FIX_PLAN.md and PR body templates).
- Prepare Phase 3 Phase PR body with onboarding, compliance steps, and a test plan.

Acceptance criteria: 
- [ ] Phase 2 index.js has no unused imports and all live paths are gated by a kill switch and wallet config check.
- [ ] All Phase 2 data ingestion and signal generation flows are auditable in Supabase with clear log entries.
- [ ] Phase 2 tests pass locally or in CI for edge logic; no money is involved.
- [ ] Phase 3 gating checklist exists in PR and Phase 3 patch is ready for review.

Owner: You (fintech development strategist) and the patching agent.
