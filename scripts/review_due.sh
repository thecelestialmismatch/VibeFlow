#!/usr/bin/env bash
ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
RECUR="$ROOT_DIR/memory/recurring_reviews.csv"

if [ ! -f "$RECUR" ]; then
  echo "No due reviews file found at $RECUR" >&2
  exit 0
fi

echo "Review items flagged for action:"
grep "REVIEW_DUE" "$RECUR" || true
