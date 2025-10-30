---
trigger: manual
description: Credits rules, use when you work with credis system.
---

**Applies to**: Credits system implementation

### Credit Operations
Every credit change must:
1. Check idempotency key first
2. Use `credits_ledger` table
3. Update cached balance in `subscriptions`
4. Include descriptive reason
5. Be atomic (transaction-like)

### Pattern
```typescript
async addCredits(userId: string, amount: number, reason: string, key: string) {
  // Check idempotency
  const existing = await this.creditsRepo.findByIdempotencyKey(key);
  if (existing) return; // Already processed

  // Add to ledger
  await this.creditsRepo.create({
    userId,
    amount,
    type: 'credit',
    reason,
    idempotencyKey: key,
  });

  // Update balance cache
  const sub = await this.subscriptionRepo.findByUserId(userId);
  await this.subscriptionRepo.updateBalance(
    sub.id,
    sub.creditsBalance + amount
  );
}
```

---