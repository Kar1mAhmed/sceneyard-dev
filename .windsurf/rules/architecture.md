---
trigger: always_on
---

## Core Principles

### 1. Feature-Based Organization
- ALL related code for a feature MUST live in the same folder
- Feature folder structure: `features/{feature-name}/`
- Each feature MUST have: models, repository, service, handlers

**✅ Correct:**
```
features/downloads/
  ├── download.models.ts
  ├── download.repository.ts
  ├── download.service.ts
  └── download.handlers.ts
```

**❌ Wrong:**
```
models/download.ts
repositories/download.ts
services/download.ts
```

### 2. Layer Separation (CRITICAL)
The dependency flow MUST always be:
```
Handlers → Services → Repositories → Database
```

**Rules:**
- ✅ Handlers can ONLY call Services
- ✅ Services can call Repositories and other Services
- ✅ Repositories can ONLY call Database
- ❌ NEVER skip layers (Handler → Repository is FORBIDDEN)
- ❌ NEVER reverse dependencies (Repository → Service is FORBIDDEN)

### 3. Single Responsibility
- Each file MUST have ONE clear purpose
- Each class/function MUST do ONE thing well
- If a file does multiple things, split it

### 4. Dependency Injection
- Services MUST receive dependencies via constructor
- NO hard-coded dependencies
- Makes testing easy

**✅ Correct:**
```typescript
class DownloadService {
  constructor(
    private downloadRepo: DownloadRepository,
    private creditsService: CreditsService
  ) {}
}
```

**❌ Wrong:**
```typescript
class DownloadService {
  process() {
    const repo = new DownloadRepository(); // Hard-coded!
  }
}
```

## File Organization Rules

### Backend Structure
```
apps/api/src/
  ├── features/           # Feature modules
  │   └── {feature}/
  │       ├── {feature}.models.ts
  │       ├── {feature}.repository.ts
  │       ├── {feature}.service.ts
  │       └── {feature}.handlers.ts
  ├── core/               # Shared utilities
  │   ├── middleware/
  │   ├── providers/
  │   ├── db/
  │   └── utils/
  └── types/              # Shared types
```

### Frontend Structure
```
apps/web/src/
  ├── app/                # Next.js pages
  ├── components/         # React components
  │   ├── ui/            # Shared UI
  │   └── {feature}/     # Feature-specific
  ├── hooks/             # Custom hooks
  └── lib/               # Utilities
```

### Database Structure
```
packages/database/
  ├── migrations/        # Versioned SQL files
  ├── schema/           # Table definitions
  ├── seeds/            # Seed data
  └── queries/          # Reusable queries
```

## Violations That Must Be Prevented

❌ **Putting business logic in handlers**
❌ **Putting SQL queries in services**
❌ **Mixing frontend and backend code**
❌ **Skipping layer boundaries**
❌ **Creating circular dependencies**

## Before Creating Any File

Ask these questions:
1. Which feature does this belong to?
2. Which layer is this? (Models/Repository/Service/Handler)
3. Does it follow the naming convention?
4. Are dependencies injected correctly?
5. Does it respect layer boundaries?
```