# CLAUDE.md — VibeFlow AI Compliance Platform

## Project Overview
VibeFlow is an AI-powered compliance officer SaaS for small businesses. 
It uses multi-agent AI to scan businesses, identify applicable regulations 
(GDPR, CCPA, HIPAA, SOC 2, EU AI Act), generate compliant policies, 
perform gap analysis, and provide remediation steps — all at $49/month 
instead of the $15,000+/year that competitors charge.

## Tech Stack
- **IDE**: Claude Code + Antigravity Skills
- **Framework**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL + pgvector for AI)
- **Auth**: Supabase Auth (Email/Password + Google Social)
- **Payments**: Stripe Checkout
- **Hosting**: Vercel
- **UI/Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion (Clean, professional transitions)
- **AI Engine**: VoltAgent Framework + Groq (Llama 3) + Gemini Proase (PostgreSQL + Auth + Realtime)
- **Vector DB**: Qdrant Cloud (free tier) for regulation embeddings
- **Hosting**: Vercel (free tier)
- **Payments**: Stripe (free to setup, pay-per-transaction)

## Project Structure
```
vibeflow/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/          # User dashboard
│   │   ├── scan/               # Compliance scan interface
│   │   ├── policies/           # Generated policies
│   │   ├── reports/            # Gap analysis reports
│   │   └── api/                # API routes
│   │       ├── agents/         # VoltAgent endpoints
│   │       ├── scan/           # Scan API
│   │       ├── policies/       # Policy generation API
│   │       └── webhooks/       # Stripe webhooks
│   ├── agents/                 # VoltAgent agent definitions
│   │   ├── supervisor.ts       # Supervisor agent (orchestrator)
│   │   ├── scanner.ts          # Regulation Scanner agent
│   │   ├── policy-generator.ts # Policy Generator agent
│   │   ├── gap-analyzer.ts     # Gap Analysis agent
│   │   ├── remediation.ts      # Remediation agent
│   │   └── monitor.ts          # Regulatory Monitor agent
│   ├── tools/                  # VoltAgent tools
│   │   ├── web-scraper.ts      # Website analysis tool
│   │   ├── regulation-rag.ts   # RAG retrieval tool
│   │   ├── policy-template.ts  # Policy template tool
│   │   └── scoring.ts          # Compliance scoring tool
│   ├── lib/                    # Shared utilities
│   │   ├── supabase.ts         # Supabase client
│   │   ├── qdrant.ts           # Qdrant vector client
│   │   ├── embeddings.ts       # Embedding generation
│   │   └── regulations/        # Regulation data (JSON)
│   │       ├── gdpr.json
│   │       ├── ccpa.json
│   │       ├── hipaa.json
│   │       ├── soc2.json
│   │       └── eu-ai-act.json
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui base components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── scan/               # Scan UI components
│   │   └── landing/            # Landing page components
│   └── types/                  # TypeScript types
│       ├── regulations.ts
│       ├── scan-results.ts
│       └── policies.ts
├── .env.local                  # Environment variables (NEVER COMMIT)
├── CLAUDE.md                   # This file
└── package.json
```

## Code Style
- TypeScript strict mode, no `any` types ever
- Use named exports, not default exports
- Tailwind utility classes only, no custom CSS files
- Functional components with hooks only
- 2-space indentation
- camelCase for variables/functions, PascalCase for components/types
- Every component must have proper TypeScript interfaces

## Commands
- `npm run dev` — Start development server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npx supabase start` — Start local Supabase

## Critical Rules
- NEVER commit .env or .env.local files
- NEVER store API keys in code — always use environment variables
- NEVER use `any` type — always define proper interfaces
- ALL user data must go through Supabase Row Level Security (RLS)
- ALL API routes must validate authentication before processing
- ALL AI-generated policy text must include disclaimer: "This is not legal advice"
- Regulation data in /lib/regulations/ must cite specific articles/sections
- Every compliance score must show calculation methodology

## Agent Architecture (VoltAgent)
The system uses a Supervisor pattern:
1. **SupervisorAgent** — Routes user requests to specialized agents
2. **ScannerAgent** — Analyzes business type and identifies applicable regulations
3. **PolicyGeneratorAgent** — Creates compliant policy documents using RAG
4. **GapAnalyzerAgent** — Compares current state vs requirements, produces scored report
5. **RemediationAgent** — Generates step-by-step fixes with code snippets
6. **MonitorAgent** — Tracks regulatory changes and sends alerts

Each agent has:
- Specific system prompt defining its role
- Access to relevant tools only (principle of least privilege)
- RAG access to regulation embeddings in Qdrant

## Database Schema (Supabase)
- `users` — Auth users (managed by Supabase Auth)
- `organizations` — Business profiles
- `scans` — Scan results with compliance scores
- `policies` — Generated policy documents
- `gaps` — Identified compliance gaps
- `remediations` — Remediation steps and status
- `alerts` — Regulatory change alerts

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
GROQ_API_KEY=
QDRANT_URL=
QDRANT_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## When Building Features
1. Always start with the TypeScript types/interfaces
2. Build the agent tool first, then the agent, then the API route, then the UI
3. Use VoltAgent's Supervisor pattern for all multi-agent orchestration
4. Test each agent individually before connecting to supervisor
5. All regulation references must include article numbers and direct quotes
