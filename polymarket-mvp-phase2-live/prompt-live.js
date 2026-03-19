function buildSignalPrompt(market, date, price) {
  return `Live prompt for market ${market.name} (${market.market_id}). Date: ${date}. Yes price: ${price.yesPrice}, No price: ${price.noPrice}. Provide a single trading signal for the next event in JSON with keys: signal (BUY|SELL|HOLD), confidence (0-100), reasoning (plain language).`;
}

module.exports = { buildSignalPrompt }
