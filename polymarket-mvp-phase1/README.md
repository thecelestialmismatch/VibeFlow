# Polymarket MVP Phase 1 – Data Ingestion

Goal: Introduce a zero‑cost, cloud‑hosted data ingestion path that seeds a Phase 1 market list and daily prices into Supabase, enabling a downstream signal loop in Phase 2.

What this patch adds:
- A small Node.js app (polymarket-mvp-phase1) that upserts mock Polymarket markets and ingests daily prices into Supabase.
- A mock data feed (feed.js) for Phase 1 to stand in for live Polymarket data during MVP validation.
- A minimal ingest script (ingest.js) to show how to seed data programmatically.
- An Ingest workflow skeleton (workflows/polymarket-mvp-phase1.yaml) to schedule ingestion in CI (GitHub Actions) for free hosting scenarios.

Run locally (optional, for testing):
- npm i in polymarket-mvp-phase1 directory
- Copy .env.local.example to .env.local and fill in real values when you’re ready
- node index.js to seed markets and prices for the day

Note: This is Phase 1 of a multi‑phase MVP. Do not rely on this for trading; it’s for data ingestion testing and architecture validation only.
