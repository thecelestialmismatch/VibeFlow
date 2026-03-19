require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
// ingestLive is no longer required at runtime in Phase 2 live path; ingestion is driven by data-live-feed and CI
const liveFeed = require('./data-live-feed')
const llmLive = require('./llm-live')
const promptModule = require('./prompt-live')
const liveAdapter = require('./live-adapter')
// Configure wallet for the live path if a wallet is provided in env (Phase 2 advance)
try {
  require('./live-adapter').configureWalletFromEnvironment()
} catch (e) {
  // ignore if not configured yet
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

let LIVE = (process.env.PHASE2_LIVE_MODE === 'true') || process.argv.includes('--live')
let balance = 10
const edgeModule = require('./edge')
const PHASE2_KILL_SWITCH = (process.env.PHASE2_KILL_SWITCH === 'ON')
const walletConfigured = (() => {
  try {
    const w = require('./wallet-signer').getWallet()
    return !!w
  } catch {
    return (process.env.PHASE2_LIVE_WALLET_CONFIGURED === 'true')
  }
})()
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
      // Phase 2 live logic: compute edge and optionally place a sandbox live bet
      const pModel = ((signal.confidence !== undefined ? signal.confidence : 50) / 100)
      const edgeInfo = edgeModule.computeEdge(m, pModel, signal.signal)
      if (LIVE && walletConfigured && edgeInfo && edgeInfo.edge > 0 && balance > 0 && !PHASE2_KILL_SWITCH) {
        const betSize = Math.min(balance * edgeInfo.betFraction, balance)
        let net = 0
        if (signal.signal === 'Yes') {
          const eventOccurs = Math.random() < pModel
          const payout = betSize / m.yesPrice
          net = eventOccurs ? payout - betSize : -betSize
        } else if (signal.signal === 'No') {
          const eventFalse = Math.random() < (1 - pModel)
          const payout = betSize / (1 - m.yesPrice)
          net = eventFalse ? payout - betSize : -betSize
        }
        balance += net
        console.log(`[Phase2 Live Sandbox] market=${m.market_id} side=${signal.signal} bet=${betSize.toFixed(4)} net=${net.toFixed(4)} balance=${balance.toFixed(4)}`)
        try {
          await supabase.from('polymarket_trades').insert([{ market_id: m.market_id, side: signal.signal, bet: betSize, balance: balance, time: new Date().toISOString(), edge: edgeInfo.edge, bet_fraction: edgeInfo.betFraction }])
        } catch (e) {
          console.error('DB trade log failed', e)
        }
      } else if (LIVE && !walletConfigured) {
        console.log('Live mode enabled but wallet not configured; skipping live bet for', m.market_id)
      } else if (LIVE && PHASE2_KILL_SWITCH) {
        console.log('Kill switch active; skipping live bets for', m.market_id)
      } else if (LIVE) {
        console.log('Edge not favorable or balance zero; skipping live bet for', m.market_id)
      }
      // Live bets are executed via the edge-based sandbox logic above when edge > 0.
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
