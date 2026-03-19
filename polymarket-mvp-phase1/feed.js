// Simple mock market feed for Phase 1 MVP ingestion
function generateSampleMarkets() {
  return [
    { market_id: 'POLY_PHASE1_MKT_1', name: 'Polymarket MVP Demo 1 Yes/No', yesPrice: 0.58, noPrice: 0.42 },
    { market_id: 'POLY_PHASE1_MKT_2', name: 'Polymarket MVP Demo 2 Yes/No', yesPrice: 0.32, noPrice: 0.68 }
  ]
}

module.exports = { generateSampleMarkets }
