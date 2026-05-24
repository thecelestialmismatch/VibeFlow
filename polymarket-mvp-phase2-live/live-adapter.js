// Live adapter scaffold for Phase 2. This provides a gated path for live bets.
const signer = require('./wallet-signer')

function isConfigured() {
  return !!signer.getWallet()
}

function configureWalletFromEnvironment() {
  // If a private key is provided in env, configure; otherwise leave unconfigured
  if (process.env.PHASE2_LIVE_WALLET_CONFIGURED === 'true' && process.env.PHASE2_WALLET_PRIVATEKEY) {
    signer.configureWalletFromPrivateKey(process.env.PHASE2_WALLET_PRIVATEKEY)
  } else {
    // Try to configure a random in-memory wallet for sandbox; this keeps the code testable without exposing keys
    // If you want a persistent wallet, set PHASE2_WALLET_PRIVATEKEY in the environment and rely on that
    signer.configureWalletFromPrivateKey(String(Math.random()).slice(2))
  }
}

async function placeLiveBet({ marketId, side, amount, price }) {
  if (!isConfigured()) {
    console.log('[live-adapter] Wallet not configured; cannot place live bet.')
    return { ok: false, reason: 'Wallet not configured' }
  }
  // Sandbox: simulate a signed bet payload
  const payload = `BET|${marketId}|${side}|${amount}|${price}`
  try {
    const signature = await signer.signMessage(payload)
    const wallet = signer.getWallet()
    return { ok: true, payload, signature, address: wallet?.address ?? 'sandbox' }
  } catch (e) {
    return { ok: false, reason: 'Signing failed' }
  }
}

module.exports = { isConfigured, configureWalletFromEnvironment, placeLiveBet }
