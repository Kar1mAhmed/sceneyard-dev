---
trigger: model_decision
description: Whenever you edit anything in `features/`.
---

# Rule: Backend Features (Domain Logic)

**When to use:**  

- Every domain lives in `features/<domain>/` (e.g. `users`, `templates`, `billing`, `credits`).

- Recommended structure per feature:
  - `types.ts` → domain types (User, Template, Plan, CreditsLedgerEntry, etc.).
  - `model.ts` → map DB rows ↔ domain objects.
  - `repo.ts` → all DB operations for this domain (queries only, no business rules).
  - `service.ts` → use-cases / business logic (can call multiple repos / features).
  - `validations.ts` → Zod/Yup schemas for inputs (used by both API & frontend).
  - `tests/` → tests for services and repos.

- Rules:
  - Do NOT call the DB directly from `service.ts`; always go through `repo.ts`.
  - Do NOT import `frontend/*` or UI from `features/`.
  - If logic touches multiple domains (e.g. “download template and deduct credits”):
    - Implement a single use-case in the dominant feature (e.g. `features/templates/service.ts`).
    - Inside it, call other feature services (`credits`, `downloads`, `billing`) instead of duplicating logic.
