// Simple deterministic engine for a Polymarket 'Yes/No' bet in paper trading
function decide(market, balance) {
  const { yesPrice } = market
  if (yesPrice < 0.6) {
    const stake = Math.min(balance * 0.25, 2)
    return { action: 'Yes', stake, marketId: market.marketId, price: yesPrice }
  }
  if (yesPrice > 0.66) {
    const stake = Math.min(balance * 0.25, 2)
    return { action: 'No', stake, marketId: market.marketId, price: yesPrice }
  }
  return { action: 'Hold', stake: 0, marketId: market.marketId, price: yesPrice }
}

module.exports = { decide }
