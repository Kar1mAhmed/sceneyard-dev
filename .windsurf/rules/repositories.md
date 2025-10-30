---
trigger: model_decision
description: Repositories and database usage rules
---

**Applies to**: `lib/repositories/**/*.repository.ts`

### Structure Template
```typescript
import { db } from '../db/client';
import { Entity, CreateEntityInput } from '../models/entity.model';

export class EntityRepository {
  // Find operations
  async findById(id: string): Promise {
    const result = await db
      .prepare('SELECT * FROM entities WHERE id = ?')
      .bind(id)
      .first();
    return result || null;
  }

  async findAll(): Promise {
    const result = await db
      .prepare('SELECT * FROM entities ORDER BY created_at DESC')
      .all();
    return result.results || [];
  }

  // Create operation
  async create(data: CreateEntityInput): Promise {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    await db
      .prepare('INSERT INTO entities (...) VALUES (...)')
      .bind(id, ...Object.values(data), now, now)
      .run();
    
    return this.findById(id) as Promise;
  }

  // Update operation
  async update(id: string, data: Partial): Promise {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(data), new Date().toISOString(), id];
    
    await db
      .prepare(`UPDATE entities SET ${fields}, updated_at = ? WHERE id = ?`)
      .bind(...values)
      .run();
    
    return this.findById(id) as Promise;
  }

  // Delete operation
  async delete(id: string): Promise {
    await db
      .prepare('DELETE FROM entities WHERE id = ?')
      .bind(id)
      .run();
  }
}
```

### Rules
- All methods must be async
- Use prepared statements with `.bind()`
- Return `null` for not found, never throw
- Generate UUIDs with `crypto.randomUUID()`
- Use ISO strings for timestamps
- Return typed results (`Entity`, `Entity[]`, etc.)
- Create returns full entity by calling `findById`
- Include common finders: `findById`, `findAll`, `findBy*`
- No business logic - only SQL

---