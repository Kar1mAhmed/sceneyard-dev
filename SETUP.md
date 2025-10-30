# SceneYard Setup Guide

## Quick Start

### 1. Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .dev.vars.example .dev.vars
```

Generate your `AUTH_SECRET`:

```bash
npx auth secret
```

Add your Google OAuth credentials to `.dev.vars`:

```env
AUTH_SECRET=<generated-secret>
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Secret to `.dev.vars`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
sceneyard-dev/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth API routes
│   ├── globals.css                   # Brand colors & fonts
│   └── layout.tsx
├── lib/
│   ├── auth/
│   │   ├── index.ts                  # Auth exports
│   │   ├── helpers.ts                # Auth helper functions
│   │   └── README.md                 # Auth documentation
│   ├── auth.ts                       # NextAuth configuration
│   └── config/
│       ├── branding.ts               # Brand colors & fonts
│       └── README.md                 # Branding guide
├── .dev.vars.example                 # Environment template
└── wrangler.jsonc                    # Cloudflare config
```

## Branding

### Colors

- **Primary**: `#7558f8`
- **Secondary Cyan**: `#00fff0`
- **Secondary Yellow**: `#ffd53e`
- **Secondary Purple**: `#d77bff`
- **White**: `#e8eaf6`
- **Black**: `#0f111a`

### Font

**BR Sonoma** (Light, Regular, Medium, SemiBold, Bold)

### Usage

```tsx
// Tailwind classes
<button className="bg-primary text-white font-semibold">
  Click me
</button>

// CSS variables
<div style={{ color: 'var(--color-primary)' }}>
  Styled text
</div>
```

See `lib/config/README.md` for complete branding guide.

## Authentication

### NextAuth.js v5 with Google OAuth

**Session Strategy**: JWT (required for Cloudflare Workers)

### Usage Examples

```tsx
// Server Component
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  return <div>Welcome {session?.user?.name}</div>;
}

// With helpers
import { requireAuth, getCurrentUser } from "@/lib/auth";

export default async function ProtectedPage() {
  const user = await requireAuth(); // Auto-redirects if not authenticated
  return <div>Hello {user.name}</div>;
}

// Sign in/out
import { signIn, signOut } from "@/lib/auth";

export async function handleSignIn() {
  "use server";
  await signIn("google");
}

export async function handleSignOut() {
  "use server";
  await signOut();
}
```

See `lib/auth/README.md` for complete authentication guide.

## Database Integration (TODO)

The auth system has placeholders for database integration:

1. **User lookup** - Check if user exists by email
2. **User creation** - Create new user on first sign-in
3. **Session enrichment** - Add custom user data to JWT/session

Implement these in the following files:
- `lib/repositories/user.repository.ts` - Database operations
- `lib/services/auth.service.ts` - Business logic
- Update callbacks in `lib/auth.ts`

## Deployment

### Cloudflare Workers

1. **Set secrets**:
   ```bash
   npx wrangler secret put AUTH_SECRET
   npx wrangler secret put AUTH_GOOGLE_ID
   npx wrangler secret put AUTH_GOOGLE_SECRET
   ```

2. **Update callback URL** in Google Console:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## Next Steps

1. ✅ Branding configured
2. ✅ NextAuth with Google OAuth setup
3. ⏳ Implement user repository (database layer)
4. ⏳ Implement auth service (business logic)
5. ⏳ Create sign-in/sign-out pages
6. ⏳ Add protected routes
7. ⏳ Integrate with subscription system

## Resources

- [NextAuth.js Docs](https://authjs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)
- [Google OAuth Setup](https://authjs.dev/getting-started/providers/google)
