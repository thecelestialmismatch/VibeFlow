Polymarket MVP Phase 2: Live Data & Safe Live Path

- What this patch does:
  - Introduces live data path scaffolding for Phase 2, wiring Phase 1 ingestion to live data sources and a live-mode trading loop that remains sandboxed by default.
  - Adds live data adapters, an LLM live integration scaffold (mocked for safety), a live ingestion script, and explicit gating for enabling live mode via PHASE2_LIVE_MODE.
  - Includes CI workflow to run ingestion on a schedule using free-tier GitHub Actions runners.
  - Updates PR and documentation to reflect a careful, auditable move toward a real-money path only after regulatory review and explicit opt-in.

- How to run (Phase 2, sandbox by default):
  1) Ensure you have a free Supabase project and GitHub repo configured as in Phase 1.
  2) Set environment variables in the host (SUPABASE_URL, SUPABASE_ANON_KEY) and optionally POLYMARKET_LIVE_FEED_ENDPOINT if you have a live feed.
  3) Start the Phase 2 live scaffold from the new branch (feat/polymarket-mvp-phase2-live):
     - cd polymarket-mvp-phase2-live
     - npm install
     - PHASE2_LIVE_MODE=true node index.js or npm run start
  4) If you want to schedule automated ingestion, rely on workflows/polymarket-mvp-phase2-live.yaml which triggers on cron (15-minute cadence) in GitHub Actions (requires enabling in your repository).

- Safety & governance:
  - This phase keeps a hard kill switch to disable live trading and uses a sandboxed wallet path. No real funds will be transacted without explicit compliance checks and regulatory approvals.
  - All secrets must be stored in environment variables or secret managers; never commit private keys or credentials.

- What to monitor:
  - Data ingestion success/failures, environment variable health, signal generation counts, PnL simulation, and kill-switch status.
