# Polymarket MVP Phase 2 – Live Data + Phase 2 Live Path

Goal: Move Phase 1 ingestion scaffolding toward real data and a live-able trading loop, while keeping a safe, audited sandbox for testing. Phase 2 adds a live data adapter with a toggle for a live-mode that remains off by default and guarded by a kill switch.

What’s included:
- Live data ingestion path (data-live-feed.js) with a fallback to Phase 1 mock data
- Live trading scaffolding with a toggle (LIVE_MODE) to enable simulated live-execution pathways
- Live adapter stubs for wallet/signing (live-adapter.js) to show how real execution would map to a wallet
- Ingest and data routing hooks to Supabase Phase 2 tables

How to run:
- Set PHASE2_LIVE_MODE=true to enable live mode (requires wallet details and governance checks)
- Configure SUPABASE_* env vars and POLYMARKET_LIVE_FEED_ENDPOINT if you have a live feed
- Run: node index.js or npm run start in the phase 2 live folder

Safety: This is still sandboxed; money is not real unless you explicitly enable live mode with all compliance checks.
