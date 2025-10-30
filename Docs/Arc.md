# SceneYard Architecture & File Structure Guide

## 🏗️ Architecture Overview

**Pattern**: Service Layer + Repository Pattern  
**Philosophy**: Separation of concerns with clear boundaries

```
┌─────────────┐
│  Frontend   │ (React Components, Pages)
└──────┬──────┘
       │
┌──────▼──────┐
│  API Routes │ (Next.js API handlers)
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │ (Business Logic Layer)
└──────┬──────┘
       │
┌──────▼──────┐
│ Repositories│ (Data Access Layer)
└──────┬──────┘
       │
┌──────▼──────┐
│   Database  │ (Cloudflare D1)
└─────────────┘
```

---

## 📁 File Structure

```
sceneyard/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth routes group
│   │   │   ├── login/
│   │   │   └── callback/
│   │   ├── (dashboard)/              # Protected routes
│   │   │   ├── account/
│   │   │   ├── templates/
│   │   │   └── admin/
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   ├── templates/
│   │   │   ├── download/
│   │   │   ├── subscription/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── lib/                          # Core Business Logic
│   │   ├── db/                       # Database Layer
│   │   │   ├── schema.sql            # D1 schema
│   │   │   ├── client.ts             # DB connection
│   │   │   └── migrations/           # Migration files
│   │   │
│   │   ├── repositories/             # Data Access Layer
│   │   │   ├── user.repository.ts
│   │   │   ├── subscription.repository.ts
│   │   │   ├── credits.repository.ts
│   │   │   ├── video.repository.ts
│   │   │   ├── download.repository.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/                 # Business Logic Layer
│   │   │   ├── auth.service.ts
│   │   │   ├── subscription.service.ts
│   │   │   ├── credits.service.ts
│   │   │   ├── download.service.ts
│   │   │   ├── video.service.ts
│   │   │   ├── payment.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── models/                   # Domain Models (TypeScript types + validation)
│   │   │   ├── user.model.ts
│   │   │   ├── subscription.model.ts
│   │   │   ├── video.model.ts
│   │   │   ├── credits.model.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── providers/                # External Integrations
│   │   │   ├── r2.provider.ts        # Cloudflare R2
│   │   │   ├── lemon.provider.ts     # Lemon Squeezy
│   │   │   ├── google.provider.ts    # Google OAuth
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                    # Utilities
│   │   │   ├── crypto.ts             # Hashing, signing
│   │   │   ├── errors.ts             # Custom errors
│   │   │   ├── validators.ts         # Input validation
│   │   │   └── constants.ts          # App constants
│   │   │
│   │   └── types/                    # Shared TypeScript types
│   │       ├── api.types.ts
│   │       ├── db.types.ts
│   │       └── index.ts
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                       # Shadcn components
│   │   ├── templates/                # Template-related components
│   │   ├── auth/
│   │   └── layout/
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useCredits.ts
│   │   ├── useDownload.ts
│   │   └── useSubscription.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
├── .env.local
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🎯 Layer Responsibilities

### 1. **Models** (`/lib/models/`)
**Purpose**: Define data structures and validation logic

```typescript
// user.model.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  googleId: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['user', 'admin']),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

**Rules**:
- ✅ Define TypeScript types and Zod schemas
- ✅ Export validation functions
- ❌ NO database calls
- ❌ NO business logic
- ❌ NO external API calls

---

### 2. **Repositories** (`/lib/repositories/`)
**Purpose**: Pure data access - CRUD operations only

```typescript
// user.repository.ts
import { db } from '../db/client';
import { User, CreateUserInput } from '../models/user.model';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(id)
      .first<User>();
    
    return result || null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const result = await db
      .prepare('SELECT * FROM users WHERE google_id = ?')
      .bind(googleId)
      .first<User>();
    
    return result || null;
  }

  async create(data: CreateUserInput): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    await db
      .prepare(`
        INSERT INTO users (id, google_id, email, name, role, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(id, data.googleId, data.email, data.name, data.role, now)
      .run();
    
    return this.findById(id) as Promise<User>;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = [...Object.values(data), id];
    
    await db
      .prepare(`UPDATE users SET ${fields} WHERE id = ?`)
      .bind(...values)
      .run();
    
    return this.findById(id) as Promise<User>;
  }

  async delete(id: string): Promise<void> {
    await db
      .prepare('DELETE FROM users WHERE id = ?')
      .bind(id)
      .run();
  }
}
```

**Rules**:
- ✅ Direct database queries only
- ✅ Simple CRUD operations
- ✅ Return plain data objects
- ❌ NO business logic
- ❌ NO validation (models handle this)
- ❌ NO external API calls
- ❌ NO complex computations

---

### 3. **Services** (`/lib/services/`)
**Purpose**: Business logic and orchestration

```typescript
// credits.service.ts
import { CreditsRepository } from '../repositories/credits.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { InsufficientCreditsError } from '../utils/errors';

export class CreditsService {
  constructor(
    private creditsRepo: CreditsRepository,
    private subscriptionRepo: SubscriptionRepository
  ) {}

  async addCredits(
    userId: string,
    amount: number,
    reason: string,
    idempotencyKey: string
  ): Promise<void> {
    // Check if already processed
    const existing = await this.creditsRepo.findByIdempotencyKey(idempotencyKey);
    if (existing) {
      return; // Idempotent - already processed
    }

    // Add to ledger
    await this.creditsRepo.create({
      userId,
      amount,
      type: 'credit',
      reason,
      idempotencyKey,
    });

    // Update subscription balance
    const subscription = await this.subscriptionRepo.findByUserId(userId);
    if (subscription) {
      await this.subscriptionRepo.updateBalance(
        subscription.id,
        subscription.creditsBalance + amount
      );
    }
  }

  async deductCredits(
    userId: string,
    amount: number,
    reason: string,
    idempotencyKey: string
  ): Promise<void> {
    // Check if already processed
    const existing = await this.creditsRepo.findByIdempotencyKey(idempotencyKey);
    if (existing) {
      return; // Already deducted
    }

    // Check balance
    const subscription = await this.subscriptionRepo.findByUserId(userId);
    if (!subscription || subscription.creditsBalance < amount) {
      throw new InsufficientCreditsError();
    }

    // Deduct from ledger
    await this.creditsRepo.create({
      userId,
      amount: -amount,
      type: 'debit',
      reason,
      idempotencyKey,
    });

    // Update balance
    await this.subscriptionRepo.updateBalance(
      subscription.id,
      subscription.creditsBalance - amount
    );
  }

  async getBalance(userId: string): Promise<number> {
    const subscription = await this.subscriptionRepo.findByUserId(userId);
    return subscription?.creditsBalance || 0;
  }
}
```

**Rules**:
- ✅ Contains ALL business logic
- ✅ Orchestrates multiple repositories
- ✅ Handles complex workflows
- ✅ Validates business rules
- ✅ Can call external APIs (via providers)
- ❌ NO direct database queries (use repositories)
- ❌ NO HTTP request/response handling (that's API routes)

---

### 4. **API Routes** (`/app/api/`)
**Purpose**: HTTP handlers - thin layer that calls services

```typescript
// app/api/download/[videoId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DownloadService } from '@/lib/services/download.service';
import { getSession } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    // 1. Authenticate
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get idempotency key
    const idempotencyKey = req.headers.get('x-idempotency-key') || crypto.randomUUID();

    // 3. Call service
    const downloadService = new DownloadService();
    const result = await downloadService.processDownload(
      session.userId,
      params.videoId,
      idempotencyKey
    );

    // 4. Return response
    return NextResponse.json(result);
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
```

**Rules**:
- ✅ Handle HTTP requests/responses
- ✅ Authentication/authorization
- ✅ Call services
- ✅ Error handling
- ❌ NO business logic
- ❌ NO direct database calls
- ❌ Keep it thin!

---

## 🔄 Example: Complete Download Flow

```typescript
// 1. USER CLICKS DOWNLOAD BUTTON
// components/TemplateCard.tsx
const handleDownload = async () => {
  const response = await fetch(`/api/download/${videoId}`, {
    method: 'POST',
    headers: {
      'x-idempotency-key': generateIdempotencyKey(),
    },
  });
  const { downloadUrl } = await response.json();
  window.location.href = downloadUrl;
};

// 2. API ROUTE RECEIVES REQUEST
// app/api/download/[videoId]/route.ts
export async function POST(req, { params }) {
  const session = await getSession(req);
  const downloadService = new DownloadService();
  
  return downloadService.processDownload(
    session.userId,
    params.videoId,
    idempotencyKey
  );
}

// 3. SERVICE ORCHESTRATES BUSINESS LOGIC
// lib/services/download.service.ts
async processDownload(userId, videoId, idempotencyKey) {
  // Check if already downloaded
  const existing = await this.downloadRepo.findByIdempotencyKey(idempotencyKey);
  if (existing) {
    return { downloadUrl: existing.signedUrl };
  }

  // Check credits
  const video = await this.videoRepo.findById(videoId);
  await this.creditsService.deductCredits(
    userId,
    video.creditCost,
    `Download: ${video.title}`,
    idempotencyKey
  );

  // Create download record
  const download = await this.downloadRepo.create({
    userId,
    videoId,
    idempotencyKey,
  });

  // Generate signed URL
  const signedUrl = await this.r2Provider.getSignedUrl(video.downloadAssetKey);

  return { downloadUrl: signedUrl };
}

// 4. REPOSITORIES EXECUTE DATABASE OPERATIONS
// lib/repositories/download.repository.ts
async create(data) {
  return db.prepare('INSERT INTO downloads ...').run();
}
```

---

## 📋 Naming Conventions

### Files
- Models: `user.model.ts`, `subscription.model.ts`
- Repositories: `user.repository.ts`, `credits.repository.ts`
- Services: `auth.service.ts`, `download.service.ts`
- Providers: `r2.provider.ts`, `lemon.provider.ts`

### Classes
- Repositories: `UserRepository`, `CreditsRepository`
- Services: `AuthService`, `DownloadService`
- Providers: `R2Provider`, `LemonSqueezyProvider`

### Functions
- Repositories: CRUD verbs - `findById()`, `create()`, `update()`, `delete()`
- Services: Business actions - `processDownload()`, `renewSubscription()`, `addCredits()`

---

## ✅ Best Practices

### 1. **Dependency Injection**
```typescript
// ❌ Bad - hard to test
class DownloadService {
  async process() {
    const repo = new DownloadRepository(); // tight coupling
  }
}

// ✅ Good - easy to test
class DownloadService {
  constructor(private repo: DownloadRepository) {}
  
  async process() {
    await this.repo.create();
  }
}
```

### 2. **Single Responsibility**
- Each service handles ONE domain (downloads, credits, auth)
- Each repository handles ONE table
- Each model represents ONE entity

### 3. **Error Handling**
```typescript
// lib/utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
  }
}

export class InsufficientCreditsError extends AppError {
  constructor() {
    super('Insufficient credits', 402, 'INSUFFICIENT_CREDITS');
  }
}
```

### 4. **Idempotency**
Always use idempotency keys for:
- Downloads
- Credit transactions
- Payment processing

### 5. **Testing Strategy**
- **Repositories**: Test with actual DB (integration tests)
- **Services**: Mock repositories (unit tests)
- **API Routes**: Mock services (integration tests)

---

## 🚀 Getting Started Checklist

1. ✅ Create folder structure
2. ✅ Define models with Zod schemas
3. ✅ Build repositories (one per table)
4. ✅ Create services (start with auth, then credits)
5. ✅ Build API routes
6. ✅ Connect frontend components
7. ✅ Add error handling
8. ✅ Implement idempotency
9. ✅ Add logging/monitoring

---

## 🎓 Key Principles to Remember

1. **Models** = Data structure + validation
2. **Repositories** = Database operations ONLY
3. **Services** = Business logic + orchestration
4. **API Routes** = HTTP handling ONLY
5. **Keep layers independent** = Easy to test and modify
6. **Always use idempotency** = Safe retries
7. **Error handling at every layer** = Robust system

---

## 📚 Example Workflow Summary

```
User Action (Frontend)
  ↓
API Route (validates & authenticates)
  ↓
Service (business logic)
  ↓
Repository (database)
  ↓
Database (D1)
```

**Remember**: Data flows DOWN, never sideways. Services can call multiple repositories, but repositories never call services.