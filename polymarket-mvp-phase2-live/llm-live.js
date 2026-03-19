// Live-phase LLM integration for Phase 2 (mocked for safe patching in MVP)
async function callLLM(prompt) {
  // In a real implementation, call a free-tier LLM API here
  // For now, return a deterministic JSON string to be parsed by the validator
  return JSON.stringify({ signal: 'BUY', confidence: 68, reasoning: 'Live data pattern detected; simulated signal for Phase 2 MVP.' })
}

function parseSignalOutput(output) {
  try {
    const data = typeof output === 'string' ? JSON.parse(output) : output
    if (!data || typeof data.signal !== 'string' || !["BUY","SELL","HOLD"].includes(data.signal)) return null
    if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 100) return null
    if (typeof data.reasoning !== 'string' || data.reasoning.trim().length === 0) return null
    return data
  } catch (e) {
    return null
  }
}

module.exports = { callLLM, parseSignalOutput }
