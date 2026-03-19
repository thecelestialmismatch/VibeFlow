Polymarket MVP Phase 3: Live Pilot (Sandboxed, Compliance-Guarded)

- Objective: Move from sandbox edge trading to an auditable live pilot with a guarded wallet integration, to validate profitability potential in a controlled environment.
- What’s new:
  - Phase 3 live pilot scaffolding that reuses Phase 2 live data path and adds a live wallet signer scaffold for future real bets, guarded by a feature flag.
  - A Phase 3 pilot script that emits live-market signals to Supabase and records simple PnL projections in a sandbox ledger.
  - CI workflow to run Phase 3 pilot on push to main (or on a schedule) to demonstrate deployment readiness.
- How to run:
  - Ensure PHASE2_LIVE_MODE is true only in a compliant environment; Phase 3 sandbox runs without real bets
  - Use PHASE2_WALLET_CONFIGURED to guard wallet integration; keep false until compliance is complete
- Testing plan: monitor signal counts, latency, and simulated PnL; ensure no real API calls or real money usage
