#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
CSV="$ROOT_DIR/memory/decisions.csv"
RECUR="$ROOT_DIR/memory/recurring_reviews.csv"

if [ ! -f "$RECUR" ]; then
  echo "date,decision,review_date,status" > "$RECUR"
fi

today=$(date +%Y-%m-%d)
> "$RECUR"  # reset to accumulate fresh warnings for the day
if [ ! -f "$CSV" ]; then
  echo "Decisions file not found at $CSV" >&2
  exit 0
fi

tail -n +2 "$CSV" | while IFS=',' read -r date decision reasoning expected_outcome review_date; do
  # naive parse; assumes no embedded newlines and simple CSV
  if [ -z "$date" ]; then continue; fi
  if [ -n "$review_date" ] && [ "$review_date" 
= "$today" ] || [ "$review_date" 
lt "$today" ]; then
    echo "$date,$decision,$review_date,REVIEW_DUE" >> "$RECUR"
  fi
done

echo "Due decisions appended to $RECUR"
