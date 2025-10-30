# Authentication Setup

This directory contains the authentication configuration for SceneYard using NextAuth.js v5.

## Overview

- **Provider**: Google OAuth
- **Session Strategy**: JWT (required for Cloudflare Workers)
- **Framework**: Next.js 16 App Router

## Files

- `auth.ts` - Main NextAuth.js configuration
- `helpers.ts` - Authentication helper functions
- `README.md` - This file

## Setup Instructions

### 1. Install Dependencies

```bash
npm install next-auth@beta
```

### 2. Configure Environment Variables

Create a `.dev.vars` file in the root directory (copy from `.dev.vars.example`):

```bash
# Generate AUTH_SECRET
npx auth secret

# Add to .dev.vars
AUTH_SECRET=your-generated-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.dev.vars` file

### 4. Deploy Secrets to Cloudflare

For production deployment, set secrets using Wrangler:

```bash
# Set AUTH_SECRET
npx wrangler secret put AUTH_SECRET

# Set Google OAuth credentials
npx wrangler secret put AUTH_GOOGLE_ID
npx wrangler secret put AUTH_GOOGLE_SECRET
```

## Usage

### In Server Components

```typescript
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  
  if (!session) {
    return <div>Not authenticated</div>;
  }
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

### Using Helper Functions

```typescript
import { requireAuth, getCurrentUser, isAuth } from "@/lib/auth/helpers";

// Require authentication (redirects if not authenticated)
export default async function ProtectedPage() {
  const user = await requireAuth();
  return <div>Welcome, {user.name}!</div>;
}

// Check if authenticated
export default async function Page() {
  const authenticated = await isAuth();
  return authenticated ? <Dashboard /> : <LandingPage />;
}

// Get current user
export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return <SignIn />;
  return <Profile user={user} />;
}
```

### Sign In / Sign Out

```typescript
import { signIn, signOut } from "@/lib/auth";

// Sign in with Google
export async function handleSignIn() {
  "use server";
  await signIn("google", { redirectTo: "/dashboard" });
}

// Sign out
export async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}
```

### In API Routes

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  return NextResponse.json({ user: session.user });
}
```

## Database Integration (TODO)

The following placeholders need to be implemented:

### 1. Sign-In Callback (`auth.ts`)

```typescript
async signIn({ user, account, profile }) {
  // TODO: Check if user exists
  const existingUser = await userRepository.findByEmail(user.email);
  
  // TODO: Create user if doesn't exist
  if (!existingUser) {
    await userRepository.create({
      email: user.email,
      name: user.name,
      image: user.image,
      provider: account?.provider,
      providerId: account?.providerAccountId,
    });
  }
  
  return true;
}
```

### 2. JWT Callback (`auth.ts`)

```typescript
async jwt({ token, user }) {
  if (user) {
    // TODO: Fetch user data from database
    const dbUser = await userRepository.findByEmail(user.email);
    if (dbUser) {
      token.id = dbUser.id;
      token.role = dbUser.role;
      token.subscriptionStatus = dbUser.subscriptionStatus;
    }
  }
  return token;
}
```

### 3. Session Callback (`auth.ts`)

```typescript
async session({ session, token }) {
  // TODO: Add custom user data to session
  session.user.id = token.id;
  session.user.role = token.role;
  session.user.subscriptionStatus = token.subscriptionStatus;
  return session;
}
```

## Architecture

Following the Service Layer + Repository Pattern:

```
Frontend → API Routes → Services → Repositories → Database
```

### Example Implementation

```typescript
// lib/repositories/user.repository.ts
export class UserRepository {
  async findByEmail(email: string) {
    // Database query
  }
  
  async create(data: CreateUserInput) {
    // Database insert
  }
}

// lib/services/auth.service.ts
export class AuthService {
  constructor(private userRepo: UserRepository) {}
  
  async handleGoogleSignIn(profile: GoogleProfile) {
    const user = await this.userRepo.findByEmail(profile.email);
    if (!user) {
      return await this.userRepo.create({
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      });
    }
    return user;
  }
}
```

## Security Notes

- ✅ JWT tokens are encrypted with `AUTH_SECRET`
- ✅ All secrets should be stored in Cloudflare Secrets (production)
- ✅ `.dev.vars` is gitignored (local development)
- ✅ Google OAuth requires HTTPS in production
- ✅ Callback URLs must be whitelisted in Google Console

## Troubleshooting

### "Missing AUTH_SECRET" Error

Generate a new secret:
```bash
npx auth secret
```

### "Invalid callback URL" Error

Make sure your callback URL is added to Google Console:
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://yourdomain.com/api/auth/callback/google`

### Session Not Persisting

Check that:
1. `AUTH_SECRET` is set correctly
2. Cookies are enabled in your browser
3. You're using HTTPS in production

## Resources

- [NextAuth.js Documentation](https://authjs.dev)
- [Google OAuth Setup](https://authjs.dev/getting-started/providers/google)
- [Cloudflare Workers Deployment](https://authjs.dev/getting-started/deployment)
