// Lightweight in-memory ledger for paper trading balance and history
let balance = 10
const trades = []

function getBalance() {
  return balance
}

function applyTrade(side, stake, market, price, occurred) {
  // Simple PnL model per Yes/No share
  // If Yes and event occurs: payout = shares; shares = stake / price; net = payout - stake
  // If event does not occur: net = -stake
  const p = stake
  let pnl = 0
  if (side === 'Yes') {
    const shares = p / price
    const payoutPossible = occurs(occurred) ? shares : 0
    pnl = payoutPossible - p
  } else if (side === 'No') {
    const shares = p / (1 - price)
    const payoutPossible = occurs(occurred) ? 0 : shares
    pnl = payoutPossible - p
  } else {
    pnl = 0
  }
  balance += pnl
  trades.push({ date: new Date().toISOString(), market, side, stake: p, price, pnl, balance, occurred })
}

function occurs(flag) { return Boolean(flag) }

module.exports = { getBalance, applyTrade, trades }
