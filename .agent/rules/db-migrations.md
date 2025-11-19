---
trigger: model_decision
description: Whenever you touch `db/`, create tables, add columns, or change schema.
---

- All schema changes must go through `db/migrations/`:
  - File name: `NNNN_short_description.sql` (e.g. `0003_add_credits_ledger.sql`).
  - One concern per migration (keep them small and focused).

- `db/schema/*`:
  - Define typed table helpers and query builders.
  - Must reflect the latest schema from migrations.
  - No schema-changing SQL here.

- Only these places may contain raw SQL:
  - `db/migrations/*`
  - `db/schema/*`
  - `features/*/repo.ts` (for queries only, not schema changes)

- Never:
  - Run `CREATE TABLE` or `ALTER TABLE` from `api/`, `frontend/`, or `features/*/service.ts`.
  - Change schema in tests.

- After schema changes:
  - Update `model.ts` and `repo.ts` in relevant `features/`.
  - Update or add tests that cover the new behavior.