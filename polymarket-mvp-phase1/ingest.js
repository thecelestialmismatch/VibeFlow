require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const feed = require('./feed')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function main() {
  const markets = feed.generateSampleMarkets()
  for (const m of markets) {
    await supabase.from('polymarket_phase1_markets').upsert([{ market_id: m.market_id, name: m.name }])
  }
  const today = new Date().toISOString().slice(0, 10)
  const prices = markets.map(m => ({ market_id: m.market_id, date: today, yes_price: m.yesPrice, no_price: m.noPrice }))
  await supabase.from('polymarket_phase1_prices').insert(prices)
  console.log('Phase1 ingest script executed for', today)
}

main().catch(console.error)
