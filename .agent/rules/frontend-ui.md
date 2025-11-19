---
trigger: model_decision
description: Whenever you work in `src/` (pages, components, hooks).
---

- Structure:
  - `src/app/`  routing, pages, layouts.
  - `src/components/`  shared UI components (buttons, layout, inputs, modals).
  - `src/features/<domain>/`  domain-specific UI (cards, forms, hooks).
  - `src/styles/`  global/theme styles.

- Data flow:
  - Frontend never talks directly to the DB.
  - Fetch data via:
    - `api/*` endpoints, or
    - server-side functions that call `features/*/service.ts` (if framework supports it).

- Rules:
  - Shared components (`src/components`) must not contain business rules (no credits math, no billing logic).
  - Domain UI (`src/features/<domain>`) can:
    - Use hooks to call `api/<domain>` endpoints.
    - Contain view-level logic (loading states, error display, form wiring).

- Avoid:
  - Importing `features/*` directly into client components.
  - Putting heavy business decisions into components; keep that in services and just display the result.

- **Admin Dashboard Isolation:**
  - `src/app/admin` is distinct from the rest of the app.
  - Use specific styles (Dark Mode + Branding) for admin pages.
  - Avoid coupling admin components with public-facing components.
