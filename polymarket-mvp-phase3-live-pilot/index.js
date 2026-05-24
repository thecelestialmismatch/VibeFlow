require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const edge = require('../polymarket-mvp-phase2-live/edge')
const signerMod = require('../polymarket-mvp-phase2-live/wallet-signer')
const feedLive = require('../polymarket-mvp-phase2-live/data-live-feed')
const llm = require('../polymarket-mvp-phase2-live/llm-live')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const LIVE = true

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function main() {
  // Phase 3: fully armed live-pilot scaffolding (sandbox-first)
  const markets = await feedLive.fetchLiveMarkets()
  for (const m of markets) {
    // get a signal from LLM (live path using existing MVP llm-live)
    const prompt = `Phase3 live prompt for ${m.market_id}`
    const llmRaw = await llm.callLLM(prompt)
    const sig = llm.parseSignalOutput ? llm.parseSignalOutput(llmRaw) : { signal: 'HOLD', confidence: 50, reasoning: 'default' }
    await supabase.from('polymarket_signals').insert([{ market_id: m.market_id, signal: sig.signal, confidence: sig.confidence, reasoning: sig.reasoning, timestamp: new Date().toISOString() }])
  }
  console.log('Phase 3 pilot signals emitted')
}

main().catch(console.error)
