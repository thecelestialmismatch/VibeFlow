require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const axios = require('axios')
const path = require('path')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Simple in-memory paper-trade ledger for the session
let balance = 10
let trades = []

// Minimal mock market feed (replace with real Polymarket feed later)
const smarket = {
  marketId: 'POLY-TEST-MKT-1',
  name: 'Test Yes/No Market on Polymarket',
  yesPrice: 0.58,
  noPrice: 0.42
}

async function writeSignalToDB(signal) {
  // Persist signal in a simple table in Supabase
  try {
    await supabase.from('polymarket_signals').insert([{ market_id: smarket.marketId, signal: signal, price: smarket.yesPrice, timestamp: new Date().toISOString() }])
  } catch (e) {
    console.error('DB write failed', e)
  }
}

async function mainCycle() {
  // 1) fetch latest market data (mock currently)
  const market = smarket
  // 2) simple rule-based decision (beginner-friendly): buy Yes if Yes price < 0.6, buy No if Yes price > 0.66
  let action = null
  let stake = 0
  if (market.yesPrice < 0.6) {
    stake = Math.min(balance * 0.25, 2)
    action = { marketId: market.marketId, side: 'Yes', stake, price: market.yesPrice }
  } else if (market.yesPrice > 0.66) {
    stake = Math.min(balance * 0.25, 2)
    action = { marketId: market.marketId, side: 'No', stake, price: market.yesPrice }
  } else {
    action = { marketId: market.marketId, side: 'Hold', stake: 0, price: market.yesPrice }
  }

  // 3) simulate placing a bet (no real money): update balance immediately using simple rule
  if (action.side === 'Yes' || action.side === 'No') {
    const s = action.stake
    // naive outcome: resolve with 50/50 random to illustrate payoff in sandbox
    const outcomeYes = Math.random() < market.yesPrice
    const payout = action.side === 'Yes' ? (outcomeYes ? (s / market.yesPrice) : 0) : ((outcomeYes ? 0 : s / (1 - market.yesPrice)))
    const profit = payout - s
    balance += profit
    trades.push({ date: new Date().toISOString(), market: market.marketId, side: action.side, stake: s, outcome: outcomeYes ? 'YES' : 'NO', profit, balance })
  } else {
    // Hold: no change
  }

  // 4) Persist snapshot to simple DB tables if possible
  await writeSignalToDB(action.side)
  // also store trades snapshot in a lightweight table
  try {
    await supabase.from('polymarket_trades').insert([{ market_id: market.marketId, side: action.side, stake: action.stake, balance: balance, time: new Date().toISOString() }])
  } catch (e) {
    // ignore if not exists yet
  }
  // 5) Log current balance to a public file for quick visualization (optional)
  console.log('Balance:', balance.toFixed(2), 'Trade:', action)
}

async function run() {
  // Run a single cycle; for a real bot you'd schedule via Inngest/cron
  await mainCycle()
}

run().catch(console.error)
