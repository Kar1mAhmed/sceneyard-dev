---
trigger: model_decision
description: When working with any database realted code, migrations, quires.
---

## SQL Query Standards

### 1. Use Prepared Statements (ALWAYS)
❌ **FORBIDDEN**: String interpolation in SQL
```typescript
// ❌ NEVER DO THIS - SQL injection risk
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ ALWAYS use prepared statements
const result = await db
  .prepare('SELECT * FROM users WHERE email = ?')
  .bind(email)
  .first();
```

### 2. Explicit Column Selection
```typescript
// ❌ Wrong - avoid SELECT *
await db.prepare('SELECT * FROM users').all();

// ✅ Correct - explicit columns
await db.prepare('SELECT id, email, name, created_at FROM users').all();
```

### 3. Use Proper Indexes
```sql
-- ✅ Always add indexes for foreign keys
CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_template_id ON downloads(template_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- ✅ Composite indexes for common queries
CREATE INDEX idx_downloads_user_template ON downloads(user_id, template_id);
```

---

## Repository Patterns

### 1. Constructor Injection
```typescript
// ✅ Correct - inject database
export class UserRepository {
  constructor(private db: D1Database) {}
  
  async findById(id: string): Promise {
    // implementation
  }
}

// ❌ Wrong - global database
let db: D1Database;
export class UserRepository {
  async findById(id: string) {
    return await db.query(); // Don't use global
  }
}
```

### 2. Return Types
```typescript
// ✅ Return null for "not found"
async findById(id: string): Promise {
  const result = await this.db.prepare('...').first();
  return result || null;
}

// ✅ Return empty array for collections
async findAll(): Promise {
  const { results } = await this.db.prepare('...').all();
  return results || [];
}

// ❌ Don't throw errors for "not found"
async findById(id: string): Promise {
  const result = await this.db.prepare('...').first();
  if (!result) throw new Error('Not found'); // Don't do this
  return result;
}
```

### 3. Method Naming Convention
```typescript
// ✅ Use consistent CRUD verbs
class UserRepository {
  async findById(id: string): Promise
  async findByEmail(email: string): Promise
  async findAll(limit?: number, offset?: number): Promise
  async create(data: CreateUserInput): Promise
  async update(id: string, data: Partial): Promise
  async delete(id: string): Promise
  async exists(id: string): Promise
  async count(where?: object): Promise
}

// ❌ Don't use business logic verbs in repositories
async processUser() { } // Wrong - this is a service method
async validateUser() { } // Wrong - validation is service layer
```

---

## Transaction Handling

### 1. Batch Operations
```typescript
// ✅ Use batch for multiple inserts
async createMany(users: CreateUserInput[]): Promise {
  const statements = users.map(user => 
    this.db.prepare('INSERT INTO users (id, email, name) VALUES (?, ?, ?)')
      .bind(user.id, user.email, user.name)
  );
  
  await this.db.batch(statements);
}
```

### 2. Transaction Safety
```typescript
// ✅ Atomic operations for related changes
async transferCredits(
  fromUserId: string,
  toUserId: string,
  amount: number
): Promise {
  // Use batch for atomicity
  await this.db.batch([
    this.db.prepare('UPDATE subscriptions SET credits_balance = credits_balance - ? WHERE user_id = ?')
      .bind(amount, fromUserId),
    this.db.prepare('UPDATE subscriptions SET credits_balance = credits_balance + ? WHERE user_id = ?')
      .bind(amount, toUserId),
  ]);
}
```

---

## Idempotency Pattern

### 1. Check Before Insert
```typescript
// ✅ Always check idempotency key first
async createDownload(data: CreateDownloadInput): Promise {
  // 1. Check if already exists
  const existing = await this.findByIdempotencyKey(data.idempotencyKey);
  if (existing) {
    return existing; // Idempotent - return existing
  }
  
  // 2. Create new record
  const id = crypto.randomUUID();
  await this.db
    .prepare('INSERT INTO downloads (id, user_id, template_id, idempotency_key) VALUES (?, ?, ?, ?)')
    .bind(id, data.userId, data.templateId, data.idempotencyKey)
    .run();
  
  return this.findById(id) as Promise;
}
```

### 2. Unique Constraints
```sql
-- ✅ Add unique constraint for idempotency
CREATE TABLE downloads (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  template_id TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE, -- Enforce uniqueness
  created_at TEXT NOT NULL
);
```

---

## Migration Standards

### 1. File Naming
```
migrations/
  ├── 0001_initial_schema.sql
  ├── 0002_add_credits_ledger.sql
  ├── 0003_add_fts5_search.sql
  └── 0004_add_golden_members.sql
```

### 2. Migration Structure
```sql
-- ✅ Each migration should have:

-- UP migration (apply changes)
-- Description: Add credits ledger table
CREATE TABLE IF NOT EXISTS credits_ledger (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  reason TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_credits_user_id ON credits_ledger(user_id);
CREATE INDEX idx_credits_idempotency ON credits_ledger(idempotency_key);

-- DOWN migration (rollback)
-- DROP TABLE IF EXISTS credits_ledger;
-- Note: Keep DROP statements commented for reference
```

### 3. Migration Rules
- ✅ Never modify existing migrations
- ✅ Create new migration for schema changes
- ✅ Always use `IF NOT EXISTS` / `IF EXISTS`
- ✅ Add comments explaining purpose
- ❌ Never delete migrations
- ❌ Never modify production data in migrations (use seeds)

---

## Query Optimization

### 1. Use LIMIT for Large Results
```typescript
// ✅ Always add LIMIT to prevent large result sets
async findAll(limit: number = 100, offset: number = 0): Promise {
  const { results } = await this.db
    .prepare('SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?')
    .bind(limit, offset)
    .all();
  
  return results || [];
}
```

### 2. Use Indexes for WHERE Clauses
```sql
-- ✅ Index columns used in WHERE
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_downloads_user_created ON downloads(user_id, created_at);

-- Query will use index
SELECT * FROM users WHERE email = ?;
SELECT * FROM downloads WHERE user_id = ? ORDER BY created_at DESC;
```

### 3. Avoid N+1 Queries
```typescript
// ❌ Wrong - N+1 query problem
async getUsersWithSubscriptions(): Promise {
  const users = await this.findAll();
  
  // This creates N queries!
  return Promise.all(users.map(async user => ({
    ...user,
    subscription: await subscriptionRepo.findByUserId(user.id)
  })));
}

// ✅ Correct - use JOIN
async getUsersWithSubscriptions(): Promise {
  const { results } = await this.db
    .prepare(`
      SELECT 
        u.*, 
        s.plan_id, 
        s.credits_balance
      FROM users u
      LEFT JOIN subscriptions s ON s.user_id = u.id
    `)
    .all();
  
  return results || [];
}
```

---

## Schema Standards

### 1. Table Structure
```sql
-- ✅ Standard table pattern
CREATE TABLE table_name (
  -- Primary key (always TEXT for UUID)
  id TEXT PRIMARY KEY,
  
  -- Foreign keys (always indexed)
  user_id TEXT NOT NULL,
  
  -- Data columns (explicit types)
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  amount INTEGER NOT NULL DEFAULT 0,
  
  -- Timestamps (TEXT for ISO 8601)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  
  -- Constraints
  CHECK (status IN ('active', 'inactive')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_table_name_user_id ON table_name(user_id);
CREATE INDEX idx_table_name_created_at ON table_name(created_at);
```

### 2. Column Types
```sql
-- ✅ Use these types:
id TEXT              -- UUIDs
name TEXT            -- Strings
email TEXT           -- Emails  
amount INTEGER       -- Numbers
is_active INTEGER    -- Booleans (0 or 1)
created_at TEXT      -- Dates (ISO 8601 strings)
metadata TEXT        -- JSON (store as TEXT)

-- ❌ Don't use:
SERIAL              -- Use TEXT with UUID
TIMESTAMP           -- Use TEXT with ISO 8601
BOOLEAN             -- Use INTEGER (0/1)
```

### 3. Naming Conventions
```sql
-- Tables: snake_case, plural
users, subscriptions, credits_ledger, payment_events

-- Columns: snake_case
user_id, created_at, credit_cost, idempotency_key

-- Indexes: idx_{table}_{columns}
idx_users_email, idx_downloads_user_id

-- Foreign keys: {referenced_table}_id
user_id, template_id, plan_id
```

---

## Full-Text Search (FTS5)

### 1. Create FTS5 Table
```sql
-- ✅ Create FTS5 virtual table
CREATE VIRTUAL TABLE videos_fts USING fts5(
  video_id UNINDEXED,  -- Store but don't index
  title,                -- Indexed for search
  description,          -- Indexed for search
  tags                  -- Indexed for search
);

-- Trigger to keep in sync
CREATE TRIGGER videos_fts_insert AFTER INSERT ON videos
BEGIN
  INSERT INTO videos_fts (video_id, title, description, tags)
  VALUES (NEW.id, NEW.title, NEW.description, NEW.tags);
END;

CREATE TRIGGER videos_fts_update AFTER UPDATE ON videos
BEGIN
  UPDATE videos_fts 
  SET title = NEW.title, description = NEW.description, tags = NEW.tags
  WHERE video_id = NEW.id;
END;

CREATE TRIGGER videos_fts_delete AFTER DELETE ON videos
BEGIN
  DELETE FROM videos_fts WHERE video_id = OLD.id;
END;
```

### 2. Search Query Pattern
```typescript
// ✅ Search with FTS5
async search(query: string, limit: number = 50): Promise {
  const { results } = await this.db
    .prepare(`
      SELECT v.* 
      FROM videos v
      INNER JOIN videos_fts fts ON fts.video_id = v.id
      WHERE videos_fts MATCH ?
      ORDER BY rank
      LIMIT ?
    `)
    .bind(query, limit)
    .all();
  
  return results || [];
}
```

---

## Error Handling in Repositories

### 1. Let Errors Bubble Up
```typescript
// ✅ Don't catch errors in repository
async create(data: CreateUserInput): Promise {
  // Let database errors bubble up to service layer
  const id = crypto.randomUUID();
  await this.db
    .prepare('INSERT INTO users (...) VALUES (...)')
    .bind(...)
    .run();
  
  return this.findById(id) as Promise;
}

// ❌ Don't catch here
async create(data: CreateUserInput): Promise {
  try {
    // ...
  } catch (error) {
    console.error(error); // Don't do this
    return null;
  }
}
```

### 2. Database Constraint Violations
```typescript
// Service layer handles constraint violations
async createUser(data: CreateUserInput): Promise {
  try {
    return await this.userRepo.create(data);
  } catch (error) {
    // Handle unique constraint violation
    if (error.message.includes('UNIQUE constraint')) {
      throw new ConflictError('Email already exists');
    }
    throw error;
  }
}
```

---

## Testing Repositories

### 1. Use Real Database for Tests
```typescript
// ✅ Integration tests with actual DB
describe('UserRepository', () => {
  let db: D1Database;
  let repo: UserRepository;
  
  beforeEach(async () => {
    // Setup test database
    db = await setupTestDatabase();
    repo = new UserRepository(db);
  });
  
  afterEach(async () => {
    // Cleanup
    await cleanupTestDatabase(db);
  });
  
  it('should find user by id', async () => {
    const user = await repo.create({
      email: 'test@example.com',
      name: 'Test User',
    });
    
    const found = await repo.findById(user.id);
    expect(found).toEqual(user);
  });
});
```

---

## Validation Checklist

Before committing repository code:

- [ ] All queries use prepared statements (no string interpolation)
- [ ] Explicit column selection (no SELECT *)
- [ ] Return types are correct (null for not found, array for collections)
- [ ] Idempotency checks for mutations
- [ ] Indexes exist for foreign keys and WHERE clauses
- [ ] Method names follow CRUD conventions
- [ ] No business logic in repository
- [ ] Errors bubble up (not caught)
- [ ] Transactions used for related operations
```

---