---
trigger: model_decision
description: When working with models
---

**Applies to**: `lib/models/**/*.model.ts`

### Structure Template
```typescript
import { z } from 'zod';

// Main schema
export const EntitySchema = z.object({
  id: z.string().uuid(),
  // ... fields
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type inference
export type Entity = z.infer;

// Create schema (omit auto-generated fields)
export const CreateEntitySchema = EntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateEntityInput = z.infer;

// Update schema (partial of create schema)
export const UpdateEntitySchema = CreateEntitySchema.partial();
export type UpdateEntityInput = z.infer;
```

### Rules
- Always use Zod for schema definition
- Export both schema and inferred type
- Create separate schemas for: full entity, create input, update input
- Use `.omit()` for create schemas (exclude id, timestamps)
- Use `.partial()` for update schemas
- No logic beyond validation

---