# Operational Runbook

## Manual (teachable)
1. Put raw files in data/raw
2. Run: node scripts/normalize.mjs
3. Run dashboard

## Automated
1. Trigger workflow: data-sync
2. Verify manifest at data/meta/manifest.json
3. Check ledger append in data/evidence-log.md