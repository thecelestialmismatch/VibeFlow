Phase 2 Live Patch Fix Plan (auditable, incremental)

1) Phase 2 – Gate enforcement
- Ensure PHASE2_KILL_SWITCH, PHASE2_LIVE_MODE, PHASE2_LIVE_WALLET_CONFIGURED are checked on every live path
- Add logs when gates block progress

2) Phase 2 – Code Hygiene
- Remove unused imports (ingest-live) from polymarket-mvp-phase2-live/index.js
- Normalize environment variable handling; convert string booleans to booleans robustly

3) Phase 2 – Data path alignment
- Align live ingestion tables to existing naming conventions: polymarket_phase2_markets, polymarket_phase2_prices, polymarket_trades
- Ensure ingestion writes to these tables consistently

4) Phase 2 – Edge logic robustness
- Ensure edge and betFraction from edge.js are always numeric and clamped
- Add a small unit test to validate edge outputs (Yes/No) for a couple of market scenarios

5) Phase 2 – Tests and CI
- Add a small CI smoke test that runs ingestion and a single signal generation in sandbox mode
- Ensure tests don’t perform any live bets or external API calls

6) Phase 3 readiness
- Add Phase 3 governance checklist in PR body (privacy, compliance, wallet onboarding)
- Add a Phase 3 pilot plan with a safe, auditable live path gated behind compliance

Acceptance criteria for Phase 2 fixes:
- All gating variables defined and used consistently; no bypass paths
- No unused imports anywhere in Phase 2
- Data ingestion and signals are persisted in a stable schema
- Tests pass and CI can verify sandbox end-to-end
- Phase 3 patch will be ready for governance review
