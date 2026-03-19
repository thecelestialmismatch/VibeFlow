require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const ingestLive = require('./ingest-live')
const liveFeed = require('./data-live-feed')
const llmLive = require('./llm-live')
const promptModule = require('./prompt-live')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

let LIVE = (process.env.PHASE2_LIVE_MODE === 'true') || process.argv.includes('--live')
if (!LIVE) {
  console.log('Phase 2 live mode is OFF. Running in paper/sandbox mode with live data as available.')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function runCycle() {
  // 1) fetch live markets (or fallback to Phase 1 mock)
  let markets = await liveFeed.fetchLiveMarkets()
  if (!markets || markets.length === 0) {
    console.log('No live markets fetched; aborting cycle')
    return
  }
  // 2) for each market, fetch live data and generate a signal via LLM
  for (const m of markets) {
    // Build a minimal prompt from market data
    const prompt = promptModule.buildSignalPrompt ? promptModule.buildSignalPrompt(m, new Date(), { yesPrice: m.yesPrice, noPrice: m.noPrice }) : ''
    const llmRaw = await llmLive.callLLM(prompt)
    const signal = llmLive.parseSignalOutput(llmRaw)
    if (signal) {
      // Persist signal to Supabase
      try {
        await supabase.from('polymarket_signals').insert([{ market_id: m.market_id, signal: signal.signal, confidence: signal.confidence, reasoning: signal.reasoning, timestamp: new Date().toISOString() }])
      } catch (e) {
        console.error('DB write failed', e)
      }
    } else {
      console.log('LLM output invalid for market', m.market_id)
    }
  }
}

async function main() {
  await runCycle()
  if (LIVE) {
    console.log('Live phase executed; to automate, configure CI to trigger this script on schedule')
  } else {
    console.log('Phase 2 sandbox cycle complete')
  }
}

main().catch(console.error)
