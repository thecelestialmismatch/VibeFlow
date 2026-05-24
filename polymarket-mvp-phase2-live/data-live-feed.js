// Live data adapter for Phase 2 (Polymarket live feed).
// If a live feed endpoint is configured, fetch from it; otherwise fallback to Phase 1 mock feed.
const axios = require('axios')

async function fetchLiveMarkets() {
  const endpoint = process.env.POLYMARKET_LIVE_FEED_ENDPOINT
  if (!endpoint) {
    // Fallback to Phase 1 mock data (stable for now)
    return [
      { market_id: 'POLY_PHASE2_MKT_1', name: 'Polymarket MVP Phase 2 Demo 1 Yes/No', yesPrice: 0.58, noPrice: 0.42 },
      { market_id: 'POLY_PHASE2_MKT_2', name: 'Polymarket MVP Phase 2 Demo 2 Yes/No', yesPrice: 0.32, noPrice: 0.68 }
    ]
  }
  try {
    const r = await axios.get(endpoint)
    const markets = (r.data.markets || []).map(mm => ({
      market_id: mm.id || mm.market_id,
      name: mm.name || mm.market,
      yesPrice: mm.yesPrice != null ? mm.yesPrice : mm.yes_price,
      noPrice: mm.noPrice != null ? mm.noPrice : mm.no_price
    }))
    return markets
  } catch (e) {
    console.error('Live feed fetch failed', e)
    return []
  }
}

module.exports = { fetchLiveMarkets }
