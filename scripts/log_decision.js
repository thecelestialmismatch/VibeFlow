#!/usr/bin/env node
"use strict";
const fs = require('fs');
const path = require('path');
// Simple CLI argument parser without extra dependencies
const rawArgs = process.argv.slice(2);
const args = {};
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if (a.startsWith('--')) {
    const key = a.substring(2);
    const val = (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('--')) ? rawArgs[i + 1] : true;
    args[key] = val;
  }
}

function escapeCSV(val) {
  if (val === undefined || val === null) return '""';
  const s = String(val).replace(/"/g, '""');
  return '"' + s + '"';
}

const decision = args.decision;
const reasoning = args.reasoning;
const expected_outcome = args.expected_outcome;
const review_date = args.review_date;

if (!decision || !reasoning || !expected_outcome || !review_date) {
  console.log('Usage: node scripts/log_decision.js --decision "..." --reasoning "..." --expected_outcome "..." --review_date YYYY-MM-DD');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const csvPath = path.join(root, 'memory', 'decisions.csv');

const date = new Date().toISOString().slice(0, 10);
const line = [date, escapeCSV(decision), escapeCSV(reasoning), escapeCSV(expected_outcome), escapeCSV(review_date)].join(',') + '\n';
fs.appendFileSync(csvPath, line);
console.log('Logged decision to', csvPath);
