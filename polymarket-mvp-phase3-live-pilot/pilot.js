// Simple pilot script for Phase 3: call LLM to generate signals on live data in sandbox
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const llm = require('../polymarket-mvp-phase2-live/llm-live')
const feedLive = require('../polymarket-mvp-phase2-live/data-live-feed')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function main() {
  const markets = await feedLive.fetchLiveMarkets()
  for (const m of markets) {
    const prompt = `Phase3 live prompt for ${m.market_id}`
    const llmRaw = await llm.callLLM(prompt)
    const data = (typeof llmRaw === 'string') ? JSON.parse(llmRaw) : llmRaw
    // Persist
    await supabase.from('polymarket_signals').insert([{ market_id: m.market_id, signal: data?.signal ?? 'HOLD', confidence: data?.confidence ?? 0, reasoning: data?.reasoning ?? 'n/a', timestamp: new Date().toISOString() }])
  }
  console.log('Phase 3 pilot completed')
}

main().catch(console.error)
