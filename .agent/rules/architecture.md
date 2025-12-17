---
trigger: model_decision
description: Whenever you're doing structural changes (new folders, moving files, refactors across layers).
---

Use this project layout:
  - `src/app/api/` → HTTP layer only (no business logic, no DB).
  - `features/` → ALL backend domain logic (types, repos, services, validations).
  - `src/` → pages, components, feature UI (never touch DB directly).
  - `db/` → schema & migrations only.
  - `lib/` → shared infra (config, logger, auth helpers).
  - `src/utils/` → tiny pure functions (no IO, no domain rules).

- Respect dependency flow:
  - `features/*` can depend on `db/`, `lib/`, `src/utils/`.
  - `src/app/api/*` can depend on `features/*`, `lib/`, `src/utils/`.
  - `src/*` (UI) can depend on `features/*/types.ts`, `lib/`, `src/utils/`.
  - `lib/` must NOT import from `features/`, `src/app/api/`, or `src/` (except utils).

- If you're unsure where something belongs:
  - Business rule → `features/<domain>/service.ts`.
  - DB query → `features/<domain>/repo.ts`.
  - HTTP shape / routing → `src/app/api/`.
  - Visual UI → `src/`.
  - Generic helper used across domains → `lib/` or `src/utils/`.
