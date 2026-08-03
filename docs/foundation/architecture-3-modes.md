# Architecture: 3 Modes

## Teachable
Manual raw JSON drop + normalize command. Best for learning.

## Automated
Scheduled workflow ingests raw JSON, normalizes, commits snapshots.

## Scalable
Future: object storage + queue + worker normalization + snapshot API.