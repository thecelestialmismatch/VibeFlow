// Simple mock Polymarket data provider (replace with real Polymarket API later)
module.exports = {
  async fetchMarket(marketId) {
    // Return deterministic sample values suitable for a demo
    return {
      marketId,
      name: 'Polymarket Demo Yes/No',
      yesPrice: 0.58,
      noPrice: 0.42,
      lastUpdated: new Date().toISOString()
    }
  }
}
