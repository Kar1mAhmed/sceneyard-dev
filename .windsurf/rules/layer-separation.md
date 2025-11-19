---
trigger: always_on
---

## Models Layer (`{feature}.models.ts`)

### MUST Contain:
- ✅ TypeScript type definitions
- ✅ Zod validation schemas
- ✅ Input/Output type variants
- ✅ Type guards

### MUST NOT Contain:
- ❌ Database queries
- ❌ Business logic
- ❌ HTTP handling
- ❌ External API calls
- ❌ Any side effects

### Example Pattern:
```typescript
import { z } from 'zod';

// Database schema
export const EntitySchema = z.object({
  id: z.string().uuid(),
  // ... fields
});

export type Entity = z.infer<typeof EntitySchema>;

// Input schemas
export const CreateEntitySchema = EntitySchema.omit({ id: true });
export type CreateEntityInput = z.infer<typeof CreateEntitySchema>;
```

---

## Repository Layer (`{feature}.repository.ts`)

### MUST Contain:
- ✅ Database CRUD operations
- ✅ SQL queries
- ✅ Simple data transformations
- ✅ Transaction handling

### MUST NOT Contain:
- ❌ Business logic
- ❌ Validation (models do this)
- ❌ Calls to other repositories
- ❌ Calls to services
- ❌ External API calls
- ❌ Complex computations

### Method Naming:
- `findById()`, `findByEmail()`, `findAll()`
- `create()`, `update()`, `delete()`
- `count()`, `exists()`

### Example Pattern:
```typescript
export class EntityRepository {
  constructor(private db: D1Database) {}

  async findById(id: string): Promise {
    return await this.db
      .prepare('SELECT * FROM entities WHERE id = ?')
      .bind(id)
      .first();
  }

  async create(data: CreateEntityInput): Promise {
    // INSERT query
    // Return created entity
  }
}
```

---

## Service Layer (`{feature}.service.ts`)

### MUST Contain:
- ✅ ALL business logic
- ✅ Complex workflows
- ✅ Orchestration of multiple repositories
- ✅ Calls to other services
- ✅ Business rule validation
- ✅ External API calls (via providers)

### MUST NOT Contain:
- ❌ Direct database queries (use repositories)
- ❌ SQL statements
- ❌ HTTP request/response handling
- ❌ Direct external API calls (use providers)

### Method Naming:
- Use business action verbs
- `processDownload()`, `renewSubscription()`, `deductCredits()`
- NOT: `getDownload()`, `setSubscription()`

### Example Pattern:
```typescript
export class EntityService {
  constructor(
    private entityRepo: EntityRepository,
    private otherService: OtherService
  ) {}

  async processEntity(data: ProcessEntityInput): Promise {
    // 1. Business validation
    // 2. Check preconditions
    // 3. Call repositories
    // 4. Orchestrate workflow
    // 5. Return result
  }
}
```

---

## Handler Layer (`{feature}.handlers.ts`)

### MUST Contain:
- ✅ HTTP request parsing
- ✅ Authentication/authorization
- ✅ Input validation (Zod)
- ✅ Service calls
- ✅ Response formatting
- ✅ Error handling

### MUST NOT Contain:
- ❌ Business logic
- ❌ Database queries
- ❌ Direct repository calls
- ❌ Complex computations

### Method Naming:
- `handleDownload()`, `handleGetUser()`, `handleCreateSubscription()`

### Example Pattern:
```typescript
export async function handleAction(req: Request, env: Env): Promise {
  try {
    // 1. Authenticate
    const user = await authenticateRequest(req, env);
    
    // 2. Parse & validate input
    const body = await req.json();
    const parsed = InputSchema.safeParse(body);
    
    // 3. Initialize service
    const service = new EntityService(/* deps */);
    
    // 4. Call service
    const result = await service.processAction(parsed.data);
    
    // 5. Return response
    return Response.json(result);
  } catch (error) {
    return handleError(error);
  }
}
```

---

## Layer Communication Rules

### Allowed Calls:
```
✅ Handler → Service
✅ Service → Repository
✅ Service → Service (same or different feature)
✅ Service → Provider (external APIs)
✅ Any layer → Models (for types)
```

### Forbidden Calls:
```
❌ Handler → Repository (must go through service)
❌ Repository → Service (breaks separation)
❌ Repository → Repository (use service to orchestrate)
❌ Repository → Provider (business logic belongs in service)
❌ Handler → Provider (must go through service)
```

---

## Validation Checkpoints

Before committing ANY code, verify:

1. **Is business logic in the service layer?**
   - If yes ✅, if in handler/repository ❌

2. **Are database queries only in repositories?**
   - If yes ✅, if in service/handler ❌

3. **Does handler only handle HTTP concerns?**
   - If yes ✅, if doing business logic ❌

4. **Are dependencies injected via constructor?**
   - If yes ✅, if hard-coded ❌

5. **Does the file follow naming convention?**
   - Pattern: `{feature}.{layer}.ts`
   - If yes ✅, otherwise ❌
```