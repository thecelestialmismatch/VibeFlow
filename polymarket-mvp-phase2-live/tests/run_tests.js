// Lightweight unit tests for Phase 2 edge computation
const edge = require('../edge')
const assert = require('assert')

function testYesEdge() {
  const market = { market_id: 'X', market: 'X', yesPrice: 0.4, noPrice: 0.6 }
  const res = edge.computeEdge(market, 0.6, 'Yes')
  assert.strictEqual(res.edge, 0.2)
  assert.strictEqual(res.betFraction, 0.25)
  console.log('Yes edge test passed')
}

function testNoEdge() {
  const market = { market_id: 'X', market: 'X', yesPrice: 0.4, noPrice: 0.6 }
  const res = edge.computeEdge({ market_id: market.market_id, yesPrice: market.yesPrice, noPrice: market.noPrice }, 0.2, 'No')
  // edge should be pYes - qModel = 0.4 - 0.2 = 0.2; betFraction clamp -> 0.25
  assert.strictEqual(res.edge, 0.2)
  assert.strictEqual(res.betFraction, 0.25)
  console.log('No edge test passed')
}

function runAll() {
  testYesEdge()
  testNoEdge()
  console.log('All phase2 edge tests passed')
}

runAll()
