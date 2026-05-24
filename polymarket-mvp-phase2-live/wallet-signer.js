// Wallet signer scaffold using ethers.js
const { Wallet } = require('ethers')
let wallet = null

function configureWalletFromWalletObj(w) {
  wallet = w
}

function configureWalletFromPrivateKey(pk) {
  try {
    wallet = new Wallet(pk)
  } catch (e) {
    wallet = null
  }
}

function getWallet() {
  return wallet
}

async function signMessage(msg) {
  if (!wallet) throw new Error('Wallet not configured')
  return await wallet.signMessage(msg)
}

module.exports = { configureWalletFromWalletObj, configureWalletFromPrivateKey, getWallet, signMessage }
