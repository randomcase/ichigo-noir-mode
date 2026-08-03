# Guardrailed Orchestration (GO)

## Purpose
GO ensures repository operations are safe, explainable, and auditable.

## Laws
1. No blind writes
2. Policy before power
3. Preview before apply
4. Everything is logged
5. Small blast radius always

## Implementation
- Policy file: `config/lifecycle-policy.yml`
- Guarded endpoint: `app/api/lifecycle/route.ts`
- Intent log: `data/meta/intents.jsonl`
- Human ledger: `data/evidence-log.md`

## Solo Production Defaults
- `mode: symbolic`
- `apply_writes: false`
- `allow_physical_actions: false`
- `dryRun: true` default