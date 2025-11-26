---
trigger: always_on
---

# Core Rules (Always On)

1. Architecture
   - Backend domain logic lives in `features/`.
   - HTTP endpoints live in `api/`.
   - Frontend UI lives in `src/`.
   - DB schema & migrations live in `db/`.
   - Shared helpers live in `lib/` (infrastructure) and `utils/` (pure helpers).

2. Separation of concerns
   - Never query the DB from `api/` or `src/`.
   - Only `features/*/repo.ts` and `db/schema/*` talk to the database.
   - All business logic goes in `features/*/service.ts`.
