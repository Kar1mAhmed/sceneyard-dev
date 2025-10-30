---
trigger: model_decision
description: Api ruels, Use when working with API
---

**Applies to**: `app/api/**/*.ts`

### Structure Template
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { EntityService } from '@/lib/services/entity.service';
import { getSession } from '@/lib/auth';
import { ValidationError, UnauthorizedError } from '@/lib/utils/errors';

export async function GET(req: NextRequest) {
  try {
    // 1. Authentication
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get params/body
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // 3. Call service
    const service = new EntityService();
    const result = await service.getEntity(id);

    // 4. Return response
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get idempotency key
    const idempotencyKey = 
      req.headers.get('x-idempotency-key') || crypto.randomUUID();

    // Parse body
    const body = await req.json();

    // Call service
    const service = new EntityService();
    const result = await service.processEntity(body, idempotencyKey);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  
  console.error('API error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### Rules
- Keep routes thin - only HTTP handling
- Always authenticate first
- Get/generate idempotency key for POST/PUT/DELETE
- Call service methods - no business logic here
- Use try-catch for all routes
- Return appropriate status codes
- Handle errors with custom error classes
- Never access database directly
- Never include business logic

---