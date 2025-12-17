---
trigger: always_on
---

# Core Rules (Always On)

1. Architecture
   - Backend domain logic lives in `features/`.
   - HTTP endpoints live in `src/app/api/`.
   - Frontend UI lives in `src/`.
   - DB schema & migrations live in `db/`.
   - Shared helpers live in `lib/` (infrastructure) and `src/utils/` (pure helpers).

2. Separation of concerns
   - Never query the DB from `src/app/api/` or `src/` (UI).
   - Only `features/*/repo.ts` and `db/migrations/*` talk to the database.
   - All business logic goes in `features/*/service.ts`.
   - Server Actions (`'use server'`) must call `service.ts`, not `repo.ts`.
