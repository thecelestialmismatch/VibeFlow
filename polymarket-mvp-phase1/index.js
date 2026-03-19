require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const feed = require('./feed')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function main() {
  // Ensure markets exist
  const markets = feed.generateSampleMarkets()
  for (const m of markets) {
    try {
      await supabase.from('polymarket_phase1_markets').upsert([{ market_id: m.market_id, name: m.name }])
    } catch (e) {
      console.error('Failed to upsert market', m.market_id, e)
    }
  }
  // Ingest today's prices for each market
  const today = new Date().toISOString().slice(0, 10)
  const prices = markets.map(m => ({ market_id: m.market_id, date: today, yes_price: m.yesPrice, no_price: m.noPrice }))
  try {
    await supabase.from('polymarket_phase1_prices').insert(prices)
  } catch (e) {
    console.error('Failed to insert prices', e)
  }
  console.log('Phase1 ingestion complete for', today)
}

main().catch(console.error)
