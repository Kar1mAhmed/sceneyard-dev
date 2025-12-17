---
trigger: model_decision
description: Whenever you create or edit Server Actions ('use server')
---

# Rule: Server Actions

Server Actions are special Next.js functions marked with `'use server'` that run on the server but can be called from client components.

## Structure

- Server Actions live in `src/app/<path>/actions.ts`
- Each action file groups related actions for that route

## Dependencies

- **Must call**: `features/*/service.ts`
- **Never call**: `features/*/repo.ts` directly

## Error Handling

- Next.js `redirect()` throws a special error with a `digest` property
- Do NOT catch and display redirect errors - re-throw them:

```typescript
try {
    await someAction();
} catch (error) {
    // Check if this is a Next.js redirect (expected behavior)
    if (error && typeof error === 'object' && 'digest' in error) {
        throw error; // Let it propagate
    }
    // Handle actual errors
    showToast('Something went wrong', 'error');
}
```

## Cache Invalidation

- Use `revalidatePath('/path')` for page-level revalidation
- Use `revalidateTag('tag-name', 'max')` for tag-based revalidation (Next.js 16 requires 2 args)

## Auth Checks

- Always verify `session?.user?.role` before destructive operations
- Use the extended NextAuth types from `types/next-auth.d.ts`
