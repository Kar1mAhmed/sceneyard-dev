---
trigger: always_on
---

## File Naming

### Feature Files
**Pattern**: `{feature}.{layer}.ts`

Examples:
- ✅ `download.models.ts`
- ✅ `download.repository.ts`
- ✅ `download.service.ts`
- ✅ `download.handlers.ts`
- ❌ `downloadModels.ts` (wrong format)
- ❌ `models.ts` (missing feature name)
- ❌ `DownloadRepository.ts` (use lowercase)

### React Components
**Pattern**: `PascalCase.tsx`

Examples:
- ✅ `TemplateCard.tsx`
- ✅ `CreditBalance.tsx`
- ✅ `UserProfile.tsx`
- ❌ `templateCard.tsx` (wrong case)
- ❌ `template-card.tsx` (wrong separator)

### Utilities & Helpers
**Pattern**: `kebab-case.ts`

Examples:
- ✅ `api-client.ts`
- ✅ `date-utils.ts`
- ✅ `error-handler.ts`
- ❌ `apiClient.ts` (use kebab-case)
- ❌ `DateUtils.ts` (use kebab-case)

### Test Files
**Pattern**: `{filename}.test.ts` or `__tests__/{filename}.test.ts`

Examples:
- ✅ `download.service.test.ts`
- ✅ `__tests__/download.service.test.ts`
- ❌ `download-test.ts` (use .test.ts)
- ❌ `download.spec.ts` (use .test.ts)

### SQL Files
**Pattern**: `NNNN_description.sql`

Examples:
- ✅ `0001_initial_schema.sql`
- ✅ `0002_add_credits_ledger.sql`
- ✅ `0003_add_fts5_search.sql`
- ❌ `1_initial.sql` (use 4 digits)
- ❌ `add_credits.sql` (missing number prefix)

---

## Code Naming

### Classes
**Pattern**: `PascalCase` with descriptive suffix

Examples:
- ✅ `DownloadRepository`
- ✅ `CreditsService`
- ✅ `AuthMiddleware`
- ✅ `R2Provider`
- ❌ `Download` (missing layer suffix)
- ❌ `downloadRepository` (wrong case)

### Functions

#### Repository Methods
Use CRUD verbs:
- ✅ `findById()`, `findByEmail()`, `findAll()`
- ✅ `create()`, `update()`, `delete()`
- ✅ `count()`, `exists()`
- ❌ `get()`, `set()` (too generic)
- ❌ `processUser()` (business logic verb)

#### Service Methods
Use business action verbs:
- ✅ `processDownload()`, `renewSubscription()`
- ✅ `deductCredits()`, `addCredits()`
- ✅ `validateAccess()`, `authorizeUser()`
- ❌ `getDownload()` (use repo instead)
- ❌ `download()` (be more specific)

#### Handler Functions
Prefix with "handle":
- ✅ `handleDownload()`, `handleGetUser()`
- ✅ `handleCreateSubscription()`
- ❌ `download()` (missing handle prefix)
- ❌ `processDownload()` (that's service method)

### Variables

#### Constants
Use SCREAMING_SNAKE_CASE:
- ✅ `MAX_CREDITS`, `DEFAULT_PLAN_ID`
- ✅ `API_BASE_URL`, `TOKEN_EXPIRY`
- ❌ `maxCredits` (use SCREAMING_SNAKE_CASE)
- ❌ `Max_Credits` (use SCREAMING_SNAKE_CASE)

#### Regular Variables
Use camelCase:
- ✅ `userId`, `templateId`, `downloadCount`
- ✅ `creditsBalance`, `signedUrl`
- ❌ `UserID`, `template_id` (use camelCase)

#### Private Class Members
Prefix with underscore:
- ✅ `private _db: D1Database`
- ✅ `private _cache: Map<string, any>`
- ❌ `private db: D1Database` (use underscore)

---

## TypeScript Type Naming

### Interfaces
Use PascalCase with descriptive name:
- ✅ `interface User { }`
- ✅ `interface CreateUserInput { }`
- ✅ `interface DownloadResponse { }`
- ❌ `interface IUser { }` (no I prefix)
- ❌ `interface user { }` (wrong case)

### Types
Use PascalCase:
- ✅ `type UserId = string;`
- ✅ `type ApiResponse<T> = { data: T }`
- ❌ `type userId = string;` (wrong case)

### Enums
Use PascalCase for enum, SCREAMING_SNAKE_CASE for values:
- ✅ `enum UserRole { ADMIN = 'admin', USER = 'user' }`
- ❌ `enum userRole { }` (wrong case)
- ❌ `enum UserRole { Admin = 'admin' }` (wrong value case)

---

## Database Naming

### Table Names
Use snake_case, plural:
- ✅ `users`, `subscriptions`, `credits_ledger`
- ✅ `downloads`, `payment_events`
- ❌ `Users` (use lowercase)
- ❌ `user` (use plural)
- ❌ `creditLedger` (use snake_case)

### Column Names
Use snake_case:
- ✅ `user_id`, `created_at`, `credit_cost`
- ✅ `idempotency_key`, `stripe_customer_id`
- ❌ `userId` (use snake_case)
- ❌ `CreatedAt` (use lowercase)

### Indexes
Pattern: `idx_{table}_{columns}`:
- ✅ `idx_downloads_user_id`
- ✅ `idx_users_email`
- ✅ `idx_subscriptions_user_id_status`
- ❌ `download_user_index` (use pattern)

---

## Folder Naming

### Features
Use lowercase, singular:
- ✅ `features/download/`
- ✅ `features/subscription/`
- ✅ `features/auth/`
- ❌ `features/downloads/` (use singular)
- ❌ `features/Download/` (use lowercase)

### Components
Use lowercase for folders, PascalCase for files:
```
✅ components/
     ├── templates/
     │   ├── TemplateCard.tsx
     │   └── TemplateGrid.tsx
     └── ui/
         └── Button.tsx
```

### Utilities
Use kebab-case:
- ✅ `utils/date-formatter/`
- ✅ `utils/api-client/`
- ❌ `utils/dateFormatter/` (use kebab-case)

---

## Import Naming

### Consistent Aliasing
```typescript
// ✅ Consistent, clear
import { DownloadRepository } from './download.repository';
import { DownloadService } from './download.service';
import type { Download } from './download.models';

// ❌ Inconsistent
import { DownloadRepository as DR } from './download.repository';
import DownloadSvc from './download.service'; // default export
```

### Barrel Exports
Use index.ts for feature exports:
```typescript
// features/download/index.ts
export * from './download.models';
export * from './download.repository';
export * from './download.service';
export * from './download.handlers';
```

---

## Validation Rules

### Before Creating ANY File:

1. **Does the name follow the pattern for its type?**
   - Feature: `{feature}.{layer}.ts`
   - Component: `PascalCase.tsx`
   - Utility: `kebab-case.ts`

2. **Is it in the correct folder?**
   - Features: `features/{feature}/`
   - Components: `components/{category}/`
   - Utils: `core/utils/`

3. **Does it match existing naming in the codebase?**
   - Check similar files
   - Follow established patterns

### Quick Reference

| Type | Pattern | Example |
|------|---------|---------|
| Feature file | `{feature}.{layer}.ts` | `download.service.ts` |
| Component | `PascalCase.tsx` | `TemplateCard.tsx` |
| Utility | `kebab-case.ts` | `api-client.ts` |
| Test | `{filename}.test.ts` | `download.test.ts` |
| Class | `PascalCase` | `DownloadService` |
| Function | `camelCase()` | `processDownload()` |
| Constant | `SCREAMING_SNAKE_CASE` | `MAX_CREDITS` |
| Variable | `camelCase` | `userId` |
| DB Table | `snake_case` (plural) | `downloads` |
| DB Column | `snake_case` | `user_id` |
```
