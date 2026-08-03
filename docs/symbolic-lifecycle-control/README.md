# Symbolic Lifecycle Control (SLC)

## Purpose
SLC manages repository lifecycle without destructive defaults.

## Lifecycle States
- `active`
- `deprecated`
- `archived`
- `delete_candidate`

## Symbolic Actions
- `set_active`
- `symbolic_deprecate`
- `symbolic_archive`
- `symbolic_delete`

## Why symbolic-first?
- Prevent accidental loss
- Keep operational history
- Support reversible governance decisions

## Data Sources
- Registry: `data/meta/lifecycle-registry.json`
- Policy: `config/lifecycle-policy.yml`
- Intents: `data/meta/intents.jsonl`