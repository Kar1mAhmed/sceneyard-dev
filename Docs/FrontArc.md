# SceneYard Frontend Architecture

## 🎯 Philosophy

**Keep frontend simple and clean:**
- Components render UI
- Hooks manage state and API calls
- Server Actions for mutations
- API routes for complex operations

---

## 📁 Frontend Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/              # Protected routes
│   │   ├── layout.tsx            # Dashboard layout
│   │   ├── templates/
│   │   │   ├── page.tsx          # Templates list
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Template detail
│   │   ├── account/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       └── page.tsx
│   │
│   ├── api/                      # API Routes (backend)
│   │   └── ...
│   │
│   ├── actions/                  # Server Actions
│   │   ├── templates.actions.ts
│   │   ├── downloads.actions.ts
│   │   └── subscription.actions.ts
│   │
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
│
├── components/                   # React Components
│   ├── ui/                       # Shadcn/UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   │
│   ├── templates/                # Template-specific
│   │   ├── template-card.tsx
│   │   ├── template-grid.tsx
│   │   ├── template-filters.tsx
│   │   └── download-button.tsx
│   │
│   ├── auth/
│   │   ├── login-button.tsx
│   │   └── user-menu.tsx
│   │
│   ├── credits/
│   │   ├── credits-display.tsx
│   │   └── credits-history.tsx
│   │
│   └── layout/
│       ├── header.tsx
│       ├── footer.tsx
│       └── sidebar.tsx
│
├── hooks/                        # Custom React Hooks
│   ├── use-templates.ts          # Fetch templates
│   ├── use-credits.ts            # Get credits balance
│   ├── use-downloads.ts          # Download functionality
│   └── use-subscription.ts       # Subscription data
│
├── lib/
│   ├── api/                      # API Client Layer
│   │   ├── client.ts             # Base fetch wrapper
│   │   ├── templates.ts          # Template endpoints
│   │   ├── downloads.ts          # Download endpoints
│   │   └── subscription.ts       # Subscription endpoints
│   │
│   └── utils/                    # Utilities
│       ├── cn.ts                 # Class names
│       ├── format.ts             # Formatters
│       └── constants.ts
│
└── types/                        # Frontend types
    ├── templates.ts
    ├── user.ts
    └── api.ts
```

---

## 🏗️ Architecture Pattern

### For Next.js 15/16: Use Server Actions + API Client

```
Component → Hook → Server Action (mutations) → Backend Service
         ↘ Hook → API Client (queries) → API Route → Backend Service
```

**Why this pattern?**
- ✅ Server Actions for mutations (POST, PUT, DELETE) - automatic revalidation
- ✅ API Client for queries (GET) - simple data fetching
- ✅ Hooks abstract the logic from components
- ✅ Clean separation of concerns

---

## 🔧 Implementation Patterns

### 1. API Client Layer (`/lib/api/`)

**Purpose**: Wrapper around fetch for calling your API routes

```typescript
// lib/api/client.ts
type ApiResponse<T> = {
  data?: T;
  error?: string;
  code?: string;
};

class ApiClient {
  private baseUrl = '/api';

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // or 'force-cache' for static data
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-idempotency-key': crypto.randomUUID(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
```

```typescript
// lib/api/templates.ts
import { apiClient } from './client';
import type { Template } from '@/types/templates';

export const templatesApi = {
  getAll: () => apiClient.get<Template[]>('/templates'),
  
  getById: (id: string) => apiClient.get<Template>(`/templates/${id}`),
  
  search: (query: string, filters?: any) => 
    apiClient.get<Template[]>(`/templates/search?q=${query}`),
};
```

---

### 2. Server Actions (`/app/actions/`)

**Purpose**: Server-side mutations with automatic revalidation

```typescript
// app/actions/downloads.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { DownloadService } from '@/lib/services/download.service';
import { getSession } from '@/lib/auth';

export async function downloadTemplate(videoId: string) {
  // Get session
  const session = await getSession();
  if (!session) {
    return { error: 'Unauthorized', code: 'UNAUTHORIZED' };
  }

  try {
    // Call backend service
    const downloadService = new DownloadService();
    const result = await downloadService.processDownload(
      session.userId,
      videoId,
      crypto.randomUUID()
    );

    // Revalidate relevant pages
    revalidatePath('/account');
    revalidatePath('/templates');

    return { 
      success: true, 
      downloadUrl: result.downloadUrl 
    };
  } catch (error) {
    return { 
      error: error.message, 
      code: error.code 
    };
  }
}
```

```typescript
// app/actions/subscription.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { SubscriptionService } from '@/lib/services/subscription.service';
import { getSession } from '@/lib/auth';

export async function upgradeSubscription(planId: string) {
  const session = await getSession();
  if (!session) {
    return { error: 'Unauthorized' };
  }

  try {
    const subscriptionService = new SubscriptionService();
    const checkoutUrl = await subscriptionService.createCheckout(
      session.userId,
      planId
    );

    return { success: true, checkoutUrl };
  } catch (error) {
    return { error: error.message };
  }
}
```

---

### 3. Custom Hooks (`/hooks/`)

**Purpose**: Abstract data fetching and state management

```typescript
// hooks/use-templates.ts
'use client';

import { useState, useEffect } from 'react';
import { templatesApi } from '@/lib/api/templates';
import type { Template } from '@/types/templates';

export function useTemplates(filters?: any) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        const data = await templatesApi.getAll();
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [filters]);

  return { templates, loading, error };
}
```

```typescript
// hooks/use-download.ts
'use client';

import { useState } from 'react';
import { downloadTemplate } from '@/app/actions/downloads.actions';
import { toast } from 'sonner';

export function useDownload() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (videoId: string) => {
    setDownloading(videoId);
    
    try {
      const result = await downloadTemplate(videoId);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      // Trigger browser download
      window.location.href = result.downloadUrl!;
      toast.success('Download started');
    } catch (error) {
      toast.error('Download failed');
    } finally {
      setDownloading(null);
    }
  };

  return { download, downloading };
}
```

```typescript
// hooks/use-credits.ts
'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';

export function useCredits() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const data = await apiClient.get<{ balance: number }>('/credits/balance');
        setBalance(data.balance);
      } catch (error) {
        console.error('Failed to fetch credits:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, []);

  const refetch = async () => {
    setLoading(true);
    const data = await apiClient.get<{ balance: number }>('/credits/balance');
    setBalance(data.balance);
    setLoading(false);
  };

  return { balance, loading, refetch };
}
```

---

### 4. Components (`/components/`)

**Purpose**: Pure UI - receive data via props, call hooks for logic

```typescript
// components/templates/template-card.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDownload } from '@/hooks/use-download';
import type { Template } from '@/types/templates';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { download, downloading } = useDownload();

  return (
    <Card>
      <img src={template.previewUrl} alt={template.title} />
      <h3>{template.title}</h3>
      <p>{template.creditsCost} credits</p>
      
      <Button
        onClick={() => download(template.id)}
        disabled={downloading === template.id}
      >
        {downloading === template.id ? 'Downloading...' : 'Download'}
      </Button>
    </Card>
  );
}
```

```typescript
// components/templates/template-grid.tsx
'use client';

import { useTemplates } from '@/hooks/use-templates';
import { TemplateCard } from './template-card';
import { Skeleton } from '@/components/ui/skeleton';

export function TemplateGrid() {
  const { templates, loading, error } = useTemplates();

  if (loading) {
    return <SkeletonGrid />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
```

```typescript
// components/credits/credits-display.tsx
'use client';

import { useCredits } from '@/hooks/use-credits';
import { Coins } from 'lucide-react';

export function CreditsDisplay() {
  const { balance, loading } = useCredits();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <Coins className="w-5 h-5" />
      <span className="font-semibold">{balance} credits</span>
    </div>
  );
}
```

---

### 5. Pages (`/app/**page.tsx`)

**Purpose**: Layout and data fetching orchestration

```typescript
// app/(dashboard)/templates/page.tsx
import { TemplateGrid } from '@/components/templates/template-grid';
import { TemplateFilters } from '@/components/templates/template-filters';

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Templates</h1>
      
      <div className="flex gap-8">
        <aside className="w-64">
          <TemplateFilters />
        </aside>
        
        <main className="flex-1">
          <TemplateGrid />
        </main>
      </div>
    </div>
  );
}
```

```typescript
// app/(dashboard)/templates/[id]/page.tsx
import { templatesApi } from '@/lib/api/templates';
import { DownloadButton } from '@/components/templates/download-button';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const template = await templatesApi.getById(params.id);
  
  if (!template) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1>{template.title}</h1>
      <video src={template.previewUrl} controls />
      
      <div className="mt-8">
        <p>Cost: {template.creditsCost} credits</p>
        <DownloadButton templateId={template.id} />
      </div>
    </div>
  );
}
```

---

## 📋 Decision Matrix

### Use Server Actions When:
- ✅ Mutations (create, update, delete)
- ✅ Need automatic revalidation
- ✅ Direct backend service access
- ✅ Form submissions

### Use API Client When:
- ✅ Fetching data (GET requests)
- ✅ Client-side data refresh
- ✅ Real-time updates
- ✅ Complex queries with parameters

### Use Direct API Routes When:
- ✅ Webhooks (external services)
- ✅ File uploads
- ✅ Streaming responses
- ✅ Complex middleware needs

---

## 🎯 Best Practices

### 1. Component Composition
```typescript
// ❌ Bad - Fat component
function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data));
  }, []);
  
  return (
    <div>
      {templates.map(t => (
        <div>
          <h3>{t.title}</h3>
          <button onClick={() => download(t.id)}>Download</button>
        </div>
      ))}
    </div>
  );
}

// ✅ Good - Composed components
function TemplatesPage() {
  return <TemplateGrid />;
}

function TemplateGrid() {
  const { templates, loading } = useTemplates();
  return templates.map(t => <TemplateCard template={t} />);
}

function TemplateCard({ template }) {
  const { download } = useDownload();
  return (
    <Card>
      <h3>{template.title}</h3>
      <Button onClick={() => download(template.id)}>Download</Button>
    </Card>
  );
}
```

### 2. Error Handling
```typescript
// hooks/use-templates.ts
export function useTemplates() {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    templatesApi.getAll()
      .catch(err => {
        setError(err.message);
        toast.error('Failed to load templates');
      });
  }, []);
  
  return { templates, loading, error };
}
```

### 3. Loading States
```typescript
// components/template-grid.tsx
export function TemplateGrid() {
  const { templates, loading } = useTemplates();
  
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-3 gap-6">
      {templates.map(t => <TemplateCard key={t.id} template={t} />)}
    </div>
  );
}
```

### 4. Optimistic Updates
```typescript
// hooks/use-like.ts
export function useLike(templateId: string) {
  const [isLiked, setIsLiked] = useState(false);
  
  const toggleLike = async () => {
    // Optimistic update
    setIsLiked(!isLiked);
    
    try {
      await likeTemplate(templateId);
    } catch (error) {
      // Rollback on error
      setIsLiked(!isLiked);
      toast.error('Failed to like template');
    }
  };
  
  return { isLiked, toggleLike };
}
```

---

## 🚫 Anti-Patterns to Avoid

### ❌ Don't: Call API routes directly in components
```typescript
// Bad
function TemplateCard({ template }) {
  const handleDownload = async () => {
    const res = await fetch(`/api/download/${template.id}`, {
      method: 'POST',
    });
    const data = await res.json();
    window.location.href = data.downloadUrl;
  };
  
  return <Button onClick={handleDownload}>Download</Button>;
}
```

### ✅ Do: Use hooks that call API client or Server Actions
```typescript
// Good
function TemplateCard({ template }) {
  const { download, downloading } = useDownload();
  
  return (
    <Button 
      onClick={() => download(template.id)}
      disabled={downloading === template.id}
    >
      Download
    </Button>
  );
}
```

---

### ❌ Don't: Mix data fetching with UI logic
```typescript
// Bad
function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  
  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(setTemplates);
  }, []);
  
  return (
    <div>
      {templates.map(t => <TemplateCard template={t} />)}
    </div>
  );
}
```

### ✅ Do: Separate concerns with hooks
```typescript
// Good
function TemplatesPage() {
  return <TemplateGrid />;
}

function TemplateGrid() {
  const { templates, loading } = useTemplates();
  
  if (loading) return <Loading />;
  
  return templates.map(t => <TemplateCard template={t} />);
}
```

---

## 📚 Summary

### Frontend Architecture Flow

```
User Interaction
    ↓
Component (UI only)
    ↓
Hook (state + logic)
    ↓
├─→ Server Action (mutations) → Backend Service → Database
│
└─→ API Client (queries) → API Route → Backend Service → Database
```

### Key Principles

1. **Components**: Pure UI, receive props, call hooks
2. **Hooks**: Abstract logic, manage state, call API/actions
3. **Server Actions**: Mutations with auto-revalidation
4. **API Client**: Simple fetch wrapper for queries
5. **Types**: Share between frontend and backend

### File Organization

- `/components` - UI components (dumb)
- `/hooks` - Logic and state (smart)
- `/app/actions` - Server actions (mutations)
- `/lib/api` - API client (queries)
- `/types` - TypeScript types

**Keep it simple. Keep it clean. Keep concerns separated.**