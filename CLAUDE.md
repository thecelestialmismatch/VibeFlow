# CLAUDE.md — VibeFlow Polymarket Bot (Phase 2+)

Overview
- This document describes the Phase 2+ architecture for a zero-cost Polymarket MVP that ingests live data, generates signals, and simulates trades in a sandboxed environment prior to any live money.
- All data and bets are sandboxed; live money path requires explicit compliance gating.

Project Scope and Roadmap (concise)
- Phase 0/Phase 1: Foundation and data ingestion scaffolding (Phase 1 patch already in repo)
- Phase 2: Live data path + sandboxed trading loop; edge-based bet sizing; gated live wallet integration scaffolds; CI workflows
- Phase 3: Fully gated live pilot with formal compliance review and wallet onboarding; phased rollout toward live trading with risk controls

Key Tech Stack (2026):
- Hosting: Free tiers (Replit/Render/Railway) for cloud deployments
- Backend: Supabase (PostgreSQL + Auth + RLS) – FREE tier
- Data: Live Polymarket data adapter (Phase 2) with Phase 1 as fallback mock data
- Orchestration: Inngest (free tier) for background jobs (Phase 3 gating when enabling live path)
- ML/LLM: Free-tier LLM (OpenRouter or equivalent) in sandbox; deterministic prompts for Phase 2+ until real API is wired
- Wallet: Wallet signer scaffolds with gated live integration; no private keys committed

Architecture Overview (high-level analogy)
- Data Ingest: Like a rain gauge—collects market data regularly and stores it.
- Signal Engine: The weather predictor—uses a small model to decide BUY/SELL/HOLD with a confidence score.
- Ledger: Paper wallet—simulates balances and PnL.
- Executor: Sandbox trading engine—executes simulated bets, logs results, and tracks risk.
- Orchestrator: A scheduler (Inngest later) that stitches data, signals, and ledger updates together.
- LLM: The market whisperer—returns structured signals that the engine validates before applying them.
- Secrets: All keys live in environment variables; never exposed in the browser or repo.

Security & Compliance Guardrails
- Phase 2 live path is opt-in; a kill switch (PHASE2_KILL_SWITCH) gates any live bets.
- Wallet onboarding must be explicit, with keys stored in a secrets manager or env vars; never in code.
- All data is sandboxed; avoid any PII in prompts/logs; record only audit logs and non-sensitive metrics.

How to Read this Document
- Start with Phase 2: Live Data & Sandbox Path; Phase 3 adds live pilots and governance.
- Section references link to actual code changes in the repo.

Environment and Secrets
- Keys live in environment variables (SUPABASE_URL, SUPABASE_ANON_KEY, PHASE2_LIVE_MODE, PHASE2_LIVE_WALLET_CONFIGURED, PHASE2_KILL_SWITCH, etc).
- No keys should be committed to Git or exposed in UI logs.

This doc is the single source of truth for governance about the Phase 2+ rollout. It will be updated as we implement changes and reach new stages.
