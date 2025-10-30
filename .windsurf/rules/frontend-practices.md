---
trigger: model_decision
description: Frontend Rules — Practices, Naming, Performance, Next.js 16 Features
---


---

# Frontend Rules — Practices, Naming, Performance, Next.js 16 Features

This file collects practical patterns: naming, clean code, performance, Next.js 16 specific recommendations, and small focused examples.

---

## 1. Naming Conventions

* Files: `template-card.tsx`, `use-download.ts`, `templates.actions.ts`, `templates.ts`
* Hooks: `useTemplates()`
* Actions: `downloadTemplate()`
* API methods: `templatesApi.getAll()`
* Imports: Always absolute: `@/hooks/use-templates`

**Opinionated rule**: Use dash-case for filenames and PascalCase for React components and exported functions.

---

## 2. Clean Code / Organization

* Single responsibility per file
* Keep components small (≤ 80 lines ideal)
* Prefer composition over inheritance
* Group related files in feature folders
* Keep services and server-only code out of client bundles

**Example folder layout**

```
/components
  /templates
    template-card.tsx
/hooks
  use-templates.ts
/lib
  /api
    templates.ts
/app
  /templates
    page.tsx
    layout.tsx
/app/actions
  templates.actions.ts
```

---

## 3. TypeScript Patterns

* Define `Template`, `User`, `ApiError` centrally (`/types`)
* Use `ActionResult<T>` union for server actions

```ts
type ActionResult<T> =
  | { success: true; data: T }
  | { error: string; code?: string };
```

---

## 4. Performance (practical rules)

* **Memoize** derived lists via `useMemo`.
* **Lazy-load** heavy widgets with `dynamic()`.
* **Debounce** search inputs.
* **Use skeletons** to reduce layout shift.
* **Prefer Server Components** for pages where possible.

**Example: lazy-load**

```ts
import dynamic from 'next/dynamic';
const Heavy = dynamic(() => import('@/components/heavy'), { loading: () => <Loading /> });
```

---

## 5. Next.js 16 — Recommended Features & How to Use Them (practical)

We adopt specific Next.js 16 features to make the site smoother and reduce client work. Keep examples minimal and copy+paste friendly.

### 5.1 Cache Components (`use cache`)

* Use `use cache` to mark pure data functions or components as cacheable and speed up repeat renders.

```ts
// app/(components)/recent-layout.tsx
'use server';

export const revalidate = 60; // fallback

export async function RecentTemplates() {
  'use cache';
  const templates = await getRecentTemplatesFromDb();
  return <TemplateList templates={templates} />;
}
```

> Use caching where data is stable between requests and can be safely shared.

### 5.2 Turbopack & Filesystem Caching

* Enable Turbopack for faster dev HMR. Use the `upgrade` codemod and follow Next docs.
* Filesystem caching reduces subsequent dev start times for big repos.

```js
// next.config.ts
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true, // opt-in
  experimental: {
    turbopack: true,
  }
};
export default nextConfig;
```

### 5.3 Enhanced Routing & Incremental Prefetching

* Prefer `Link` prefetching defaults; structure layouts to maximize deduplication.

```tsx
import Link from 'next/link';
export default function ProductList({ items }) {
  return items.map(i => (
    <Link key={i.id} href={`/p/${i.slug}`} prefetch={true}>{i.title}</Link>
  ));
}
```

### 5.4 React Compiler (automatic memoization)

* If your project benefits from compile-time memoization, enable `reactCompiler` in `next.config.ts`.

---

## 6. Clean Deployment & Build Practices

* Use codemod: `npx @next/codemod@canary upgrade latest` when upgrading major versions.
* Keep build adapters/config small.
* Run linting and type-checking in CI step before deploy.

---

## 7. Small Patterns & Recipes

### Server action form example

```tsx
// Client form component
'use client';
import { useState } from 'react';
import { createTemplate } from '@/app/actions/templates.actions';

export function CreateForm() {
  const [title, setTitle] = useState('');
  return (
    <form action={async () => await createTemplate(title)}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
```

### Hook that uses API client

```ts
export function useTemplate(id: string) {
  const [template, setTemplate] = useState<Template | null>(null);
  useEffect(() => { templatesApi.getById(id).then(setTemplate); }, [id]);
  return { template };
}
```

---

## 8. Organizational Split (why two files?)

* **File 1 (core)**: Architecture, layers, decision flow, core patterns — what developers must follow.
* **File 2 (practices)**: Naming, clean code, performance, Next.js 16 tips, recipes — actionable how-to.

---

## 9. Final Checklist (for PR review)

* [ ] No direct fetches in components
* [ ] Hooks return simple data/flags, not JSX
* [ ] Server actions hold server-only logic
* [ ] Types present for public interfaces
* [ ] next.config.ts reviewed for `cacheComponents`, `reactCompiler`, `turbopack`
* [ ] CI runs typecheck + lint

---

*End of files.*