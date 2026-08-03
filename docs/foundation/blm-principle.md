# BLM Principle: Betterment, Learning, Mastery

## Purpose
BLM measures whether the management system is becoming better over time.

## Pillars
- **Betterment**: outcomes improve (stability, freshness, safety)
- **Learning**: knowledge is captured and reused
- **Mastery**: execution becomes consistent and reliable

## Composite
`blmComposite = 0.4*betterment + 0.35*learning + 0.25*mastery`

## Governance Gate (recommended)
Only expand automation permissions when:
- `blmComposite >= 70`
- no pillar below 60
- sustained across 2 cycles