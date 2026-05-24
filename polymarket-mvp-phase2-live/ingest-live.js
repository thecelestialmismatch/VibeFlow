require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const feed = require('./data-live-feed')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function main() {
  const markets = await feed.fetchLiveMarkets()
  if (!markets || markets.length === 0) {
    console.log('No markets to ingest')
    return
  }
  for (const m of markets) {
    await supabase.from('polymarket_phase2_markets').upsert([{ market_id: m.market_id, name: m.name }])
  }
  const today = new Date().toISOString().slice(0, 10)
  const prices = markets.map(m => ({ market_id: m.market_id, date: today, yes_price: m.yesPrice, no_price: m.noPrice }))
  await supabase.from('polymarket_phase2_prices').insert(prices)
  console.log('Phase2 live ingestion complete for', today)
}

main().catch(console.error)
