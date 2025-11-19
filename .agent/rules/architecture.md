---
trigger: model_decision
description: Whenever youre doing structural changes (new folders, moving files, refactors across layers).
---

 Use this project layout:
  - `api/`  HTTP layer only (no business logic, no DB).
  - `features/`  ALL backend domain logic (types, repos, services, validations).
  - `src/`  pages, components, feature UI (never touch DB directly).
  - `db/`  schema & migrations only.
  - `lib/`  shared infra (config, logger, auth helpers).
  - `utils/`  tiny pure functions (no IO, no domain rules).

- Respect dependency flow:
  - `features/*` can depend on `db/`, `lib/`, `utils/`.
  - `api/*` can depend on `features/*`, `lib/`, `utils/`.
  - `src/*` can depend on `api/*`, `lib/`, `utils/`.
  - `lib/` and `utils/` must NOT import from `features/`, `api/`, or `src/`.

- If youre unsure where something belongs:
  - Business rule  `features/<domain>/service.ts`.
  - DB query  `features/<domain>/repo.ts`.
  - HTTP shape / routing  `api/`.
  - Visual UI  `src/`.
  - Generic helper used across domains  `lib/` or `utils/`.
