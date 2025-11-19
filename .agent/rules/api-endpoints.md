---
trigger: model_decision
description: Whenever you edit files in `api/` or add new endpoints.
---

- Role of `api/`:
  - Expose HTTP endpoints (REST/RPC).
  - Translate HTTP requests into calls to `features/*/service.ts`.
  - Map domain results and errors back to HTTP responses.

- Endpoint pattern:
  - Parse params/query/body.
  - Validate with schemas from `features/<domain>/validations.ts` when available.
  - Call one or more functions from `features/<domain>/service.ts`.
  - Return a clean JSON response.

- Never:
  - Query the DB directly inside `api/`.
  - Re-implement business logic that already exists in `features/*/service.ts`.

- Naming:
  - Group by domain: `api/users/getUser.ts`, `api/templates/downloadTemplate.ts`, etc.
  - Use clear verbs in filenames that match behavior (`get`, `list`, `create`, `update`, `delete`, `download`).