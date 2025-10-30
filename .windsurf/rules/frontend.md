---
trigger: model_decision
description: Frontend Architecture Rules (Core)
---

# File 1 — frontend-rules-core.md

---

# Frontend Architecture Rules (Core)

**Applies to**: `components/**`, `hooks/**`, `app/**/page.tsx`, `app/actions/**`, `lib/api/**`

> Architecture: **Component → Hook → Server Action / API Client → Backend**

**Golden Rule**: Never call API routes directly from components. Always go through hooks or Server Actions.

---

## 1. Components Layer — `/components/**/*.tsx`

**Purpose**: Presentational UI. Keep components focused, testable, and trivial.

**Allowed**

* Render UI from props
* Use hooks for logic and data
* Handle user events
* Local UI state (modals, dropdowns)

**Forbidden**

* ❌ Direct fetch/API calls
* ❌ Business logic or heavy computations
* ❌ Data fetching inside `useEffect` in non-trivial ways
* ❌ Complex state management spanning many children

**Pattern (small example)**

```tsx
'use client';
import { useDownload } from '@/hooks/use-download';
import { Button } from '@/components/ui/button';

export function DownloadButton({ templateId }: { templateId: string }) {
  const { download, downloading } = useDownload();

  return (
    <Button
      onClick={() => download(templateId)}
      disabled={downloading === templateId}
    >
      {downloading === templateId ? 'Downloading...' : 'Download'}
    </Button>
  );
}
```

**Component types**

* `ui/` — tiny, style-only primitives
* `feature/` — composes hooks & ui
* `layout/` — structural, can use hooks but minimal logic

---

## 2. Hooks Layer — `/hooks/*.ts`

**Purpose**: Abstraction layer for all state, side-effects, data access, and UI-agnostic logic.

**Allowed**

* `useState`, `useEffect`, custom hooks
* Call API client or Server Actions
* Loading, error handling, transforms

**Forbidden**

* ❌ Return JSX
* ❌ Direct service calls to backend internals (services live on server)

**Naming**

* Files: `use-templates.ts`, `use-download.ts`
* Exports: `useTemplates()`, `useDownload()`

**Pattern (example)**

```ts
'use client';
import { useState, useEffect } from 'react';
import { templatesApi } from '@/lib/api/templates';

export function useTemplates(filters?: any) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const data = await templatesApi.getAll();
        if (!mounted) return;
        setTemplates(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [filters]);

  return { templates, loading, error } as const;
}
```

---

## 3. Server Actions — `/app/actions/*.actions.ts`

**Use for**

* Mutations (POST/PUT/DELETE)
* Operations that require server-side auth or revalidation
* Heavy backend service access

**Rules**

* `'use server'` directive required
* Authenticate early
* Return `{ success: true, data }` or `{ error: string, code?: string }`
* Call `revalidatePath()` / `revalidateTag()` after mutations when needed

**Pattern (example)**

```ts
'use server';
import { revalidatePath } from 'next/cache';
import { DownloadService } from '@/lib/services/download.service';
import { getSession } from '@/lib/auth';

export async function downloadTemplate(videoId: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };
  try {
    const service = new DownloadService();
    const result = await service.processDownload(session.userId, videoId, crypto.randomUUID());
    revalidatePath('/account');
    return { success: true, downloadUrl: result.downloadUrl };
  } catch (error: any) {
    return { error: error.message || 'Something went wrong' };
  }
}
```

---

## 4. API Client — `/lib/api/*.ts`

**Use for**

* Client-side GETs
* Search, pagination, and realtime queries

**Rules**

* One file per domain (templates, downloads, credits)
* Throw on non-OK responses; handle errors in hooks
* Use TypeScript generics

**Pattern (small client)**

```ts
class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`/api${endpoint}`, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'API error');
    }
    return res.json();
  }
}
export const apiClient = new ApiClient();
```

---

## 5. Pages Layer — `/app/**/page.tsx`

**Purpose**: Compose layout and server-rendered entry points. Default to Server Components for better perf & SEO.

**Rules**

* Prefer Server Components for initial data and SEO
* Use `'use client'` only when interactivity required
* Keep pages composition-focused; push logic to hooks/components

**Server component example**

```tsx
import { templatesApi } from '@/lib/api/templates';
import TemplateGrid from '@/components/templates/template-grid';

export default async function TemplatesPage() {
  const templates = await templatesApi.getAll();
  return (
    <div>
      <h1>Templates</h1>
      <TemplateGrid templates={templates} />
    </div>
  );
}
```

---

## 6. Data Fetching Decision Matrix

* **Server Actions** → Mutations, revalidation
* **API Client** → Client-side GETs, realtime, search, pagination
* **Server Components** → Initial page data, SEO-critical

---

## 7. Error Handling & Loading

* Hooks throw/catch and expose `error` + `loading`
* Components show `Skeleton` or `ErrorState`
* Server actions return structured error codes for client side translation

**Example: optimistic update**

```ts
export function useLike(templateId: string) {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = async () => {
    const prev = isLiked;
    setIsLiked(!prev);
    try {
      await likeTemplate(templateId);
    } catch (e) {
      setIsLiked(prev);
      toast.error('Failed to like');
    }
  };
  return { isLiked, toggleLike };
}
```

---

## 8. Quick Reference Table

| Task         | Where                |
| ------------ | -------------------- |
| UI rendering | Component            |
| State/logic  | Hook                 |
| Fetch        | Hook → API Client    |
| Mutations    | Hook → Server Action |
| Layout       | Page                 |

---


