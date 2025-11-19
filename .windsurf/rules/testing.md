---
trigger: model_decision
description: When doing code testing
---

## Testing Stack

- **Framework**: Vitest
- **Mocking**: Vitest mocks
- **Assertions**: Vitest expect
- **Coverage**: Required minimum 80%

---

## Test File Organization

### 1. File Naming
```
features/download/
  ├── download.service.ts
  ├── download.repository.ts
  └── __tests__/
      ├── download.service.test.ts
      └── download.repository.test.ts
```

### 2. Test Structure
```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FeatureService', () => {
  // Setup
  let service: FeatureService;
  let mockRepo: MockRepository;
  
  beforeEach(() => {
    // Initialize before each test
    mockRepo = createMockRepository();
    service = new FeatureService(mockRepo);
  });
  
  afterEach(() => {
    // Cleanup
    vi.clearAllMocks();
  });
  
  describe('methodName', () => {
    it('should do something when condition is met', async () => {
      // Arrange
      const input = { /* test data */ };
      mockRepo.findById.mockResolvedValue(mockData);
      
      // Act
      const result = await service.methodName(input);
      
      // Assert
      expect(result).toEqual(expected);
      expect(mockRepo.findById).toHaveBeenCalledWith('123');
    });
    
    it('should throw error when validation fails', async () => {
      // Arrange
      const invalidInput = { /* invalid data */ };
      
      // Act & Assert
      await expect(service.methodName(invalidInput))
        .rejects.toThrow('Validation error');
    });
  });
});
```

---

## Unit Testing (Services)

### 1. Mock All Dependencies
```typescript
// ✅ Mock repositories and other services
describe('DownloadService', () => {
  let downloadService: DownloadService;
  let mockDownloadRepo: MockType;
  let mockCreditsService: MockType;
  let mockStorageService: MockType;
  
  beforeEach(() => {
    mockDownloadRepo = {
      findByIdempotencyKey: vi.fn(),
      create: vi.fn(),
    };
    
    mockCreditsService = {
      deductCredits: vi.fn(),
    };
    
    mockStorageService = {
      getSignedDownloadUrl: vi.fn(),
    };
    
    downloadService = new DownloadService(
      mockDownloadRepo as any,
      mockCreditsService as any,
      mockStorageService as any
    );
  });
  
  it('should return cached download if idempotency key exists', async () => {
    // Arrange
    const existingDownload = { id: '123', userId: 'user1', templateId: 'tmpl1' };
    mockDownloadRepo.findByIdempotencyKey.mockResolvedValue(existingDownload);
    mockStorageService.getSignedDownloadUrl.mockResolvedValue('https://signed-url');
    
    // Act
    const result = await downloadService.processDownload('user1', 'tmpl1', 'key123');
    
    // Assert
    expect(result.cached).toBe(true);
    expect(mockCreditsService.deductCredits).not.toHaveBeenCalled();
    expect(mockDownloadRepo.create).not.toHaveBeenCalled();
  });
});
```

### 2. Test All Paths
```typescript
// ✅ Test happy path, error cases, edge cases
describe('processDownload', () => {
  it('should process new download successfully', async () => {
    // Happy path
  });
  
  it('should return cached download if already exists', async () => {
    // Idempotency case
  });
  
  it('should throw error if template not found', async () => {
    // Error case
  });
  
  it('should throw error if insufficient credits', async () => {
    // Business rule violation
  });
  
  it('should rollback if storage fails', async () => {
    // Failure recovery
  });
});
```

---

## Integration Testing (Repositories)

### 1. Use Real Database
```typescript
// ✅ Test with actual D1 database
describe('DownloadRepository', () => {
  let db: D1Database;
  let repo: DownloadRepository;
  
  beforeEach(async () => {
    db = await setupTestDatabase();
    await runMigrations(db);
    repo = new DownloadRepository(db);
  });
  
  afterEach(async () => {
    await cleanupTestDatabase(db);
  });
  
  it('should create and retrieve download', async () => {
    // Arrange
    const downloadData = {
      userId: 'user1',
      templateId: 'tmpl1',
      idempotencyKey: 'key123',
    };
    
    // Act
    const created = await repo.create(downloadData);
    const retrieved = await repo.findById(created.id);
    
    // Assert
    expect(retrieved).toEqual(created);
    expect(retrieved?.idempotencyKey).toBe('key123');
  });
  
  it('should enforce unique idempotency key', async () => {
    // Arrange
    const data = { userId: 'user1', templateId: 'tmpl1', idempotencyKey: 'key123' };
    await repo.create(data);
    
    // Act & Assert - second insert should fail
    await expect(repo.create(data)).rejects.toThrow();
  });
});
```

---

## Handler Testing

### 1. Mock Service Layer
```typescript
// ✅ Test HTTP handling, not business logic
describe('handleDownload', () => {
  let mockEnv: Env;
  let mockDownloadService: MockType;
  
  beforeEach(() => {
    mockEnv = {
      DB: {} as D1Database,
      R2: {} as R2Bucket,
    };
    
    mockDownloadService = {
      processDownload: vi.fn(),
    };
  });
  
  it('should return 401 if not authenticated', async () => {
    // Arrange
    const req = new Request('https://api.example.com/download', {
      method: 'POST',
      headers: {}, // No auth header
    });
    
    // Act
    const response = await handleDownload(req, mockEnv);
    
    // Assert
    expect(response.status).toBe(401);
  });
  
  it('should return 400 if request invalid', async () => {
    // Arrange
    const req = new Request('https://api.example.com/download', {
      method: 'POST',
      headers: { 'x-user-id': 'user123' },
      body: JSON.stringify({ invalid: 'data' }),
    });
    
    // Act
    const response = await handleDownload(req, mockEnv);
    
    // Assert
    expect(response.status).toBe(400);
  });
  
  it('should return download URL on success', async () => {
    // Arrange
    const req = new Request('https://api.example.com/download', {
      method: 'POST',
      headers: { 'x-user-id': 'user123' },
      body: JSON.stringify({
        templateId: 'tmpl123',
        idempotencyKey: 'key123',
      }),
    });
    
    mockDownloadService.processDownload.mockResolvedValue({
      downloadUrl: 'https://signed-url',
      expiresAt: '2024-01-01T00:00:00Z',
      cached: false,
    });
    
    // Act
    const response = await handleDownload(req, mockEnv);
    const data = await response.json();
    
    // Assert
    expect(response.status).toBe(200);
    expect(data.downloadUrl).toBe('https://signed-url');
  });
});
```

---

## Test Coverage Requirements

### 1. Minimum Coverage
- **Overall**: 80% minimum
- **Services**: 90% minimum (business logic critical)
- **Repositories**: 85% minimum
- **Handlers**: 75% minimum
- **Utils**: 90% minimum

### 2. Coverage Command
```bash
# Run with coverage
pnpm test --coverage

# Coverage should be in CI/CD
```

---

## Testing Best Practices

### 1. AAA Pattern (Arrange-Act-Assert)
```typescript
// ✅ Always use AAA pattern
it('should deduct credits', async () => {
  // Arrange - setup
  const userId = 'user123';
  const amount = 5;
  mockRepo.findByUserId.mockResolvedValue(subscription);
  
  // Act - execute
  await service.deductCredits(userId, amount, 'test', 'key');
  
  // Assert - verify
  expect(mockRepo.create).toHaveBeenCalledWith(
    expect.objectContaining({ amount: -5 })
  );
});
```

### 2. One Assertion Per Test
```typescript
// ❌ Wrong - multiple unrelated assertions
it('should process download', async () => {
  const result = await service.processDownload();
  expect(result.url).toBeDefined();
  expect(mockRepo.create).toHaveBeenCalled();
  expect(mockCredits.deduct).toHaveBeenCalled();
});

// ✅ Correct - focused tests
it('should return download URL', async () => {
  const result = await service.processDownload();
  expect(result.url).toBeDefined();
});

it('should create download record', async () => {
  await service.processDownload();
  expect(mockRepo.create).toHaveBeenCalled();
});

it('should deduct credits', async () => {
  await service.processDownload();
  expect(mockCredits.deduct).toHaveBeenCalledWith('user1', 5, 'test', 'key');
});
```

### 3. Descriptive Test Names
```typescript
// ❌ Wrong - vague
it('works', () => {});
it('test download', () => {});

// ✅ Correct - descriptive
it('should return cached download when idempotency key exists', () => {});
it('should throw InsufficientCreditsError when balance is zero', () => {});
it('should create download record with correct timestamp', () => {});
```

### 4. Test Data Builders
```typescript
// ✅ Use builders for complex test data
function createMockUser(overrides?: Partial): User {
  return {
    id: 'user123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    createdAt: new Date(),
    ...overrides,
  };
}

// Use in tests
const adminUser = createMockUser({ role: 'admin' });
const newUser = createMockUser({ createdAt: new Date() });
```

---

## Mocking Guidelines

### 1. Mock External Dependencies Only
```typescript
// ✅ Mock external services
const mockR2 = vi.mock('@/core/providers/r2.provider');

// ❌ Don't mock internal pure functions
// const mockDateFormatter = vi.mock('@/utils/date');
```

### 2. Reset Mocks Between Tests
```typescript
afterEach(() => {
  vi.clearAllMocks(); // Clear call history
  vi.resetAllMocks(); // Reset implementations
});
```

---

## Validation Checklist

Before committing tests:

- [ ] All tests follow AAA pattern
- [ ] Test names are descriptive (should + when + expected)
- [ ] One focused assertion per test
- [ ] Mocks are cleared between tests
- [ ] Coverage meets minimums (80% overall)
- [ ] Happy path tested
- [ ] Error cases tested
- [ ] Edge cases tested
- [ ] No hardcoded test data (use builders)
- [ ] Integration tests use real database
```
