# Polymarket Paper Trading Bot (Zero-Cost Stack, MVP)

Overview: A cloud-hosted, fully free stack that runs a paper trading bot on Polymarket markets using a deterministic, learnable loop. Balance starts at 10; goal is to learn a repeatable edge in a sandbox.

How to run (quick):
- Copy the repo to a cloud host (Replit/Render/Railway).
- Setup environment variables in a .env.local file (Supabase URL, keys, and Polymarket keys).
- Install: npm i
- Run: npm run start

What you’re building: a learning engine that ingests data, generates signals with a mock LLM, and updates a simulated balance. No live bets or real money are involved in MVP.

Next steps: expand data sources, replace mock data with real Polymarket feeds, add Inngest automation, and implement richer risk controls.
