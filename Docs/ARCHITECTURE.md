Here’s your “single source of truth” file.

---

# Project Architecture & Organization

> This file is the **source of truth** for how the project is structured and how code must be written.
> It applies to humans and AI agents (Windsurf, Cursor, etc.).

---

## 1. Goals

- Keep **frontend, API, and backend logic** cleanly separated.
- Make it easy to:
  - Add a new feature.
  - Change database schema safely.
  - Refactor without breaking everything.
- Give AI agents strict rules so they don’t scatter logic randomly.

This repo follows a **feature-based architecture** (similar to Django apps):
- `features/*` = the core of the system (domain logic).
- `api/*` = HTTP endpoints only (thin layer).
- `src/*` = UI (components + pages).
- `db/*` = schema & migrations.
- `lib/` + `utils/` = shared helpers.

---

## 2. Top-Level Structure

```text
/ (repo root)
  package.json
  tsconfig.json
  ARCHITECTURE.md         # THIS FILE

  api/                    # All HTTP endpoints
  features/               # All backend domain logic
  src/                    # All frontend code
  db/                     # Database schema & migrations
  lib/                    # Shared backend helpers (auth, logger, config, etc.)
  utils/                  # Tiny pure helpers (no IO, no domain rules)
  tests/                  # Global tests (e2e, integration) if needed
````

---

## 3. Backend Organization

### 3.1 `api/` – HTTP Layer Only

**Responsibility:**
Expose endpoints (REST / RPC) and translate HTTP ↔ domain.

```text
api/
  users/
    getUser.ts
    updateUser.ts
    listUsers.ts
  auth/
    login.ts
    callbackGoogle.ts
  templates/
    listTemplates.ts
    getTemplate.ts
    downloadTemplate.ts
  billing/
    createCheckout.ts
    webhookLemonSqueezy.ts
```

**Rules:**

* An endpoint file:

  * Parses input (query, params, body).
  * Calls **one or more `features/*/service` functions**.
  * Maps domain results or errors to HTTP responses.
* **No direct DB queries in `api/`.**
* **No business logic decisions** (credits, pricing, access rules, etc.) in `api/`. That belongs in `features/*/service.ts`.

---

### 3.2 `features/` – Core Domain Logic (Like Django Apps)

All backend feature logic lives here. If it’s about “users”, “templates”, “billing”, “credits”, “downloads”, etc., it belongs in `features/`.

```text
features/
  users/
    types.ts          # User types (User, UserRole, etc.)
    model.ts          # Map DB rows ↔ domain objects
    repo.ts           # All DB queries for users
    service.ts        # Business logic / use-cases
    validations.ts    # Zod/Yup schemas for user-related input
    tests/            # Unit tests for this feature

  auth/
    types.ts
    service.ts
    validations.ts
    repo.ts?          # If auth has its own tables (sessions, tokens, etc.)
    tests/

  templates/
    types.ts
    model.ts
    repo.ts
    service.ts
    validations.ts
    tests/

  credits/
    types.ts
    model.ts
    repo.ts
    service.ts
    validations.ts
    tests/

  billing/
    types.ts
    model.ts
    repo.ts
    service.ts
    validations.ts
    tests/

  downloads/
    types.ts
    model.ts
    repo.ts
    service.ts
    validations.ts
    tests/
```

**File responsibilities:**

* `types.ts`

  * Domain types/interfaces.
  * Example: `User`, `Template`, `Plan`, `SubscriptionStatus`, `CreditsLedgerEntry`.
* `model.ts`

  * Converts raw DB rows into clean domain objects and back.
  * Place serialization / deserialization logic here.
* `repo.ts`

  * All **DB operations** for this feature (SELECT, INSERT, UPDATE, DELETE).
  * No business rules here, only “talk to the database”.
* `service.ts`

  * **Business logic / use-cases**.
  * Uses `repo.ts` and sometimes other features’ services.
  * Example functions:

    * `createUser`, `updateProfile`, `createTemplate`, `downloadTemplateForUser`, `applyCreditsForDownload`, `startSubscription`, etc.
* `validations.ts`

  * Input schemas (e.g. Zod) for this feature.
  * Used by both `api/` and `frontend/` when possible.
* `tests/`

  * Unit/integration tests for this feature’s services and repos.

**Hard rule:**

> **All backend logic MUST live under `features/`.
> The `api/` layer and `frontend/` must always call `features/*/service.ts` for any real work.**

---

### 3.3 `db/` – Schema & Migrations

We keep database structure in one clear place.

```text
db/
  migrations/
    0001_init.sql
    0002_add_templates.sql
    0003_add_credits_ledger.sql
    0004_add_downloads.sql
    ...
  schema/
    index.ts           # DB client setup, exports all tables
    users.ts
    templates.ts
    credits.ts
    downloads.ts
    billing.ts
```

**Rules:**

* **All schema changes** (tables, columns, indexes) must be done via **new files in `db/migrations/`**.
* Application code **must not** contain `CREATE TABLE` or `ALTER TABLE`.
* After a migration, update the corresponding `db/schema/*.ts` file.
* `features/*/repo.ts` uses the helpers exported from `db/schema`.

---

### 3.4 `lib/` – Shared Backend Helpers

```text
lib/
  config.ts         # env vars, URLs, feature flags
  logger.ts         # logging helpers
  crypto.ts         # generic crypto helpers (hashing, signing)
  auth.ts           # generic auth helper (not feature-specific)
  http.ts           # HTTP utils, error mappers
```

**Rules:**

* `lib/` is **cross-cutting infrastructure**, not domain-specific.
* Must never depend on a specific feature (`features/*`).
* Fine to be used from `api/`, `features/`, `db/`, etc.

---

### 3.5 `utils/` – Small Pure Helpers

```text
utils/
  formatDate.ts
  safeJsonParse.ts
  isNonEmptyString.ts
  paginate.ts
```

**Rules:**

* Tiny, stateless, pure functions.
* No IO, no DB, no HTTP, no business rules.
* Can be used anywhere.

---

## 4. Frontend Organization

All UI code lives in `src/`.

```text
src/
  app/              # routing, pages, layouts
    layout.tsx
    page.tsx

    (marketing)/
      page.tsx
      pricing/page.tsx

    (app)/
      dashboard/page.tsx
      templates/page.tsx
      templates/[id]/page.tsx
      account/page.tsx

  components/       # shared UI components
    Button.tsx
    Input.tsx
    Modal.tsx
    Card.tsx
    Layout/
      Shell.tsx
      Sidebar.tsx

  features/         # feature-specific UI
    users/
      ProfileForm.tsx
      useUserProfile.ts
    templates/
      TemplateCard.tsx
      TemplateGrid.tsx
      useTemplates.ts
    billing/
      BillingSummary.tsx
      useBilling.ts

  styles/           # global styles, theme, CSS files
```

**Rules:**

* `src/app`:

  * Contains pages / layouts (routing).
  * Pages fetch data via:

    * API calls to `api/*`, or
    * server functions that call `features/*/service` (if using a server-side framework).
* `src/components`:

  * Reusable, shared UI (buttons, layout, inputs, modals).
  * No domain-specific logic (no “credits”, no “templates” logic).
* `src/features`:

  * UI and hooks that belong to a specific domain.
  * Can call `api/*` endpoints for that feature.

**Frontend hard rules:**

* Frontend **never** talks directly to the database.
* All data flows through:

  * `api/*` endpoints, or
  * `api/*` endpoints, or
  * server-side functions that call `features/*/service`.

* **Admin Dashboard Exception:**
  * The Admin Dashboard (`src/app/admin`) is a completely isolated environment.
  * It has its own UI rules, theme (Dark Mode + Branding), and components.
  * Do not reuse main site components in the Admin Dashboard unless they are strictly generic.
  * This allows the Admin UI to evolve independently of the main site's design system.

---

## 5. Global Rules (Always On – For Humans & Agents)

These rules must be followed for **every change**, no matter how small.

1. **Backend logic must live in `features/`.**

   * If you are writing business rules (who can do what, credits, pricing, limits, etc.), it belongs in `features/*/service.ts`.

2. **Never query the DB from `api/` or `src/`.**

   * Only `features/*/repo.ts` and `db/schema/*` can talk to the database.

3. **API endpoints must be thin.**

   * Parse → validate → call feature service → map to HTTP response.
   * No heavy logic, no duplication of service rules.

4. **Schema changes must go through `db/migrations`.**

   * Every table/column/index change = new migration file.
   * Then update `db/schema`.

5. **Reuse domain types.**

   * If a type exists in `features/<feature>/types.ts`, reuse it instead of redefining.

6. **Respect layering:**

   * `features/*` may use `db/`, `lib/`, `utils/`.
   * `api/*` may use `features/*`, `lib/`, `utils/`.
   * `src/*` may use `api/*`, `lib/`, `utils/`.
   * `lib/` and `utils/` must **not** import from `features/*`.

7. **Naming:**

   * Services: `createX`, `updateX`, `deleteX`, `listX`, `getXById`, `downloadXForUser`, `applyX`, etc.
   * Repos: `findXById`, `insertX`, `updateXRow`, `deleteXRow`, etc.
   * Endpoints: verbs in file name express intent (`getUser.ts`, `downloadTemplate.ts`).

---

## 6. Scenario-Specific Rules (When to Activate)

These are “profiles” that agents should follow in certain situations.

### 6.1 When Adding a New Feature / Domain

**When to use:**
You’re introducing something like `referrals`, `notifications`, `favorites`, etc.

**Do:**

1. Create `features/<feature>/` with:

   * `types.ts`
   * `model.ts`
   * `repo.ts`
   * `service.ts`
   * `validations.ts` (optional but recommended)
   * `tests/` (optional initially, important later)
2. If it needs a table:

   * Add migration file in `db/migrations/`.
   * Add table definition in `db/schema/<feature>.ts`.
3. If it has HTTP endpoints:

   * Add endpoint files under `api/<feature>/`.
   * Call `features/<feature>/service.ts`.

**Don’t:**

* Don’t dump everything into existing features just because they “work”.
* Don’t put new feature logic in `lib/` or `utils/`.

---

### 6.2 When Changing the Database Schema

**When to use:**
You add/remove/rename tables/columns/indexes.

**Do:**

1. Create a new migration under `db/migrations/NNNN_description.sql`.
2. Update `db/schema/<table>.ts` accordingly.
3. Update `features/*/model.ts` + `features/*/repo.ts` + `features/*/service.ts` that depend on this table.
4. Update or add tests.

**Don’t:**

* Don’t run `CREATE TABLE` / `ALTER TABLE` from anywhere else.
* Don’t silently change schema without updating schema files and services.

---

### 6.3 When Adding / Changing an API Endpoint

**When to use:**
New route, or changing behavior of an existing endpoint.

**Do:**

1. Create / edit file in `api/<domain>/<action>.ts`.
2. Validate input using schemas from `features/<domain>/validations.ts` if available.
3. Call one or more service functions from `features/<domain>/service.ts`.
4. Map domain errors to HTTP status codes.

**Don’t:**

* Don’t put business logic directly in the endpoint.
* Don’t query the DB directly from `api/`.

---

### 6.4 When Editing Frontend UI

**When to use:**
Changes in pages, layouts, components, or hooks.

**Do:**

1. For routing / pages → edit `src/app/**`.
2. For shared UI elements → edit or create in `src/components`.
3. For domain-specific UI → use `src/features/<domain>`.
4. Get data from `api/*` endpoints (or server actions that call `features/*/service`).

**Don’t:**

* Don’t import `features/*` directly into client-side components.
* Don’t implement business rules in UI components.

---

### 6.5 When Touching Payments / Credits / Billing

**When to use:**
Anything related to money, subscriptions, credits, or download charges.

**Do:**

1. Centralize logic in:

   * `features/billing/service.ts`
   * `features/credits/service.ts`
   * `features/downloads/service.ts`
2. Use a **credits ledger** approach:

   * Always add rows representing changes instead of just setting a number.
3. Make endpoints simply call the billing/credits services.

**Don’t:**

* Don’t modify balances directly in random places.
* Don’t handle complex billing logic inside endpoints or frontend.

---

## 7. Summary

* **`features/` is the heart.**
  All backend logic must live there.
* **`api/` is just a shell.**
  It exposes `features/*` to HTTP.
* **`src/` is just UI.**
  It talks to `api/`, not to the DB.
* **`db/` is the single source of truth for schema.**
  All migrations go there.
* **`lib/` and `utils/` are generic helpers.**
  No domain or business logic.

If you (or an agent) follow this file strictly, the project will stay clean, predictable, and easy to extend.

```

If you want, next step we can split the “always on” and “scenario-specific” parts into separate `.windsurf` rule files, but this `ARCHITECTURE.md` should be the master reference.
```
