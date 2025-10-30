---
trigger: model_decision
description: Services rules use when working with services
---

**Applies to**: `lib/services/**/*.service.ts`

### Structure Template
```typescript
import { EntityRepository } from '../repositories/entity.repository';
import { CreateEntityInput } from '../models/entity.model';
import { ValidationError } from '../utils/errors';

export class EntityService {
  constructor(
    private entityRepo: EntityRepository,
    // other dependencies
  ) {}

  async getEntity(id: string) {
    const entity = await this.entityRepo.findById(id);
    if (!entity) {
      throw new EntityNotFoundError();
    }
    return entity;
  }

  async createEntity(data: CreateEntityInput) {
    // Business validation
    if (data.someField < 0) {
      throw new ValidationError('Field must be positive');
    }
    
    // Orchestrate repositories
    const entity = await this.entityRepo.create(data);
    
    // Additional business logic
    // ...
    
    return entity;
  }

  async processComplexOperation(
    param1: string,
    param2: number,
    idempotencyKey: string
  ) {
    // Check idempotency
    const existing = await this.checkExisting(idempotencyKey);
    if (existing) return existing;
    
    // Complex business logic
    // Call multiple repositories
    // Coordinate operations
    
    return result;
  }
}
```

### Rules
- Use dependency injection via constructor
- Accept repositories, other services, and providers as dependencies
- All business logic belongs here
- Validate business rules before calling repositories
- Orchestrate multiple repositories when needed
- Handle idempotency checks
- Throw descriptive errors
- Never make direct database queries
- Method names: action verbs (`processDownload`, `calculateTotal`)

---