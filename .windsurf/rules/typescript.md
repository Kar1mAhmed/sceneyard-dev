---
trigger: always_on
---

## Strict Mode (MANDATORY)

tsconfig.json MUST have:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Type Safety Rules

### 1. NO `any` Type
❌ **FORBIDDEN**: Using `any` type
```typescript
// ❌ Wrong
function process(data: any) { }
const result: any = await fetch();

// ✅ Correct
function process(data: unknown) { }
const result: ApiResponse = await fetch();
```

**Only exception**: When wrapping untyped third-party libraries

### 2. Use `unknown` Instead of `any`
```typescript
// ✅ Correct - forces type checking
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

### 3. Explicit Return Types
✅ **REQUIRED**: All functions must have explicit return types
```typescript
// ✅ Correct
async function getUser(id: string): Promise {
  return await userRepo.findById(id);
}

// ❌ Wrong - missing return type
async function getUser(id: string) {
  return await userRepo.findById(id);
}
```

### 4. No Implicit Any
```typescript
// ❌ Wrong
function map(items, fn) { } // implicit any

// ✅ Correct
function map(items: T[], fn: (item: T) => U): U[] { }
```

---

## Zod Validation (MANDATORY)

### 1. All External Input MUST Be Validated
```typescript
import { z } from 'zod';

// ✅ Correct - validate all API inputs
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['user', 'admin']),
});

export type CreateUserInput = z.infer;

// In handler
const parsed = CreateUserSchema.safeParse(body);
if (!parsed.success) {
  return Response.json({ error: parsed.error }, { status: 400 });
}
```

### 2. Derive Types from Zod
```typescript
// ✅ Correct - single source of truth
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer;

// ❌ Wrong - duplicate definitions
export type User = {
  id: string;
  email: string;
  name: string;
};
```

### 3. Create Variants with Zod Methods
```typescript
// Base schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
});

// ✅ Create variants
export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });
export const UpdateUserSchema = UserSchema.partial().required({ id: true });

export type User = z.infer;
export type CreateUserInput = z.infer;
export type UpdateUserInput = z.infer;
```

---

## Interface vs Type

### Use `interface` for:
- Object shapes that might be extended
- Public APIs
- Class contracts

```typescript
// ✅ Use interface
export interface Repository {
  findById(id: string): Promise;
  create(data: Partial): Promise;
}
```

### Use `type` for:
- Unions and intersections
- Mapped types
- Aliases

```typescript
// ✅ Use type
export type ApiResponse = 
  | { success: true; data: T }
  | { success: false; error: string };

export type UserId = string;
```

---

## Null vs Undefined

### Use `null` for:
- Database results (not found)
- Explicit absence of value

```typescript
// ✅ Use null for "not found"
async findById(id: string): Promise {
  const result = await db.query();
  return result || null;
}
```

### Use `undefined` for:
- Optional parameters
- Optional object properties

```typescript
// ✅ Use undefined for optional
interface Config {
  apiKey: string;
  timeout?: number; // undefined if not provided
}
```

---

## Generics

### 1. Use Descriptive Type Parameter Names
```typescript
// ❌ Wrong - unclear
function map(items: T[]): U[] { }

// ✅ Correct - descriptive
function map(
  items: TInput[],
  fn: (item: TInput) => TOutput
): TOutput[] { }
```

### 2. Constrain Generic Types
```typescript
// ✅ Add constraints when needed
function getProperty(
  obj: TObj,
  key: TKey
): TObj[TKey] {
  return obj[key];
}
```

---

## Error Handling

### 1. Use Custom Error Classes
```typescript
// ✅ Create typed errors
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class InsufficientCreditsError extends AppError {
  constructor() {
    super('Insufficient credits', 402, 'INSUFFICIENT_CREDITS');
  }
}
```

### 2. Type Guard for Error Handling
```typescript
// ✅ Use type guards
function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

try {
  await service.process();
} catch (error) {
  if (isAppError(error)) {
    return Response.json({ error: error.message }, { status: error.statusCode });
  }
  // Handle unknown errors
  return Response.json({ error: 'Internal error' }, { status: 500 });
}
```

---

## Async/Await

### 1. Always Use Async/Await (Not Promises)
```typescript
// ❌ Wrong - promise chains
function getUser(id: string) {
  return db.query(id)
    .then(user => user)
    .catch(error => null);
}

// ✅ Correct - async/await
async function getUser(id: string): Promise {
  try {
    return await db.query(id);
  } catch (error) {
    return null;
  }
}
```

### 2. Parallel Execution
```typescript
// ❌ Wrong - sequential (slow)
const user = await getUser(userId);
const subscription = await getSubscription(userId);
const downloads = await getDownloads(userId);

// ✅ Correct - parallel (fast)
const [user, subscription, downloads] = await Promise.all([
  getUser(userId),
  getSubscription(userId),
  getDownloads(userId),
]);
```

---

## Type Assertions

### 1. Avoid `as` Casting
```typescript
// ❌ Wrong - unsafe casting
const user = data as User;

// ✅ Correct - validate with Zod
const user = UserSchema.parse(data);
```

### 2. Use Type Guards Instead
```typescript
// ✅ Create type guard
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  );
}

if (isUser(data)) {
  // TypeScript knows data is User
  console.log(data.email);
}
```

---

## Immutability

### 1. Use `readonly` for Arrays and Objects
```typescript
// ✅ Prevent mutations
interface Config {
  readonly apiKey: string;
  readonly features: readonly string[];
}

function processItems(items: readonly Item[]): Item[] {
  // items.push() // Error - readonly
  return [...items]; // Must create new array
}
```

### 2. Use `const` Assertions
```typescript
// ✅ Make object deeply readonly
const PLANS = {
  FREE: { credits: 10, price: 0 },
  PRO: { credits: 50, price: 25 },
} as const;

type PlanKey = keyof typeof PLANS; // 'FREE' | 'PRO'
```

---

## Utility Types

### Use Built-in Utility Types
```typescript
// ✅ Use TypeScript utilities
type UserUpdate = Partial; // All properties optional
type UserCreate = Omit; // Exclude fields
type UserKeys = keyof User; // Union of keys
type UserId = Pick; // Pick specific fields
type NonNullableUser = Required; // All required
```

---

## Module Declarations

### 1. Declare Environment Variables
```typescript
// types/env.d.ts
export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  LEMON_SQUEEZY_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  JWT_SECRET: string;
}
```

### 2. Augment Third-Party Types
```typescript
// types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
```

---

## Import/Export Best Practices

### 1. Use Named Exports (Not Default)
```typescript
// ✅ Correct - named exports
export class UserService { }
export interface User { }
export const createUser = () => { };

// ❌ Wrong - default exports
export default class UserService { }
```

### 2. Barrel Exports for Features
```typescript
// features/download/index.ts
export * from './download.models';
export * from './download.repository';
export * from './download.service';
export * from './download.handlers';
```

### 3. Type-Only Imports
```typescript
// ✅ Use type-only imports for types
import type { User, CreateUserInput } from './user.models';
import { UserService } from './user.service';
```

---

## Validation Checklist

Before committing TypeScript code, verify:

- [ ] No `any` types (use `unknown` or proper types)
- [ ] All functions have explicit return types
- [ ] All external input validated with Zod
- [ ] Types derived from Zod schemas (single source of truth)
- [ ] Custom error classes used
- [ ] async/await used (not promise chains)
- [ ] Named exports (not default)
- [ ] Type-only imports for types
- [ ] `strict: true` in tsconfig.json
```
