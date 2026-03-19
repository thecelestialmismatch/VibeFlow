// Edge and bet sizing engine for Phase 2 live path (sandboxed)
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function computeEdge(market, qModel, signal) {
  const pYes = market.yesPrice
  const edge = signal === 'Yes' ? Math.max(0, qModel - pYes) : (signal === 'No' ? Math.max(0, pYes - qModel) : 0)
  // Simple bet fraction derived from edge; cap at 25%
  const betFraction = clamp(edge * 1.5, 0, 0.25)
  return { edge, betFraction }
}

module.exports = { computeEdge }
