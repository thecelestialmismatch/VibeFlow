// Starter prompt builder (kept simple for MVP)
function buildSignalPrompt(market, date, price) {
  return `You are analyzing a Polymarket Yes/No market. Market: ${market.name} (${market.marketId}). Date: ${date}. Yes price: ${price.yesPrice}, No price: ${price.noPrice}. Provide a single trading signal for the next event in JSON with keys: signal (BUY|SELL|HOLD), confidence (0-100), reasoning (plain language).`
}

module.exports = { buildSignalPrompt }
