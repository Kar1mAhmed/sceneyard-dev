# Admin Dashboard Setup

## Overview

The application now has a complete separation between regular users and admin users:

### User Flow
1. **Landing Page** (`/`) - Hero section with Google sign-in
2. **User Home** (`/home`) - Shows user profile after login
3. **Admin Dashboard** (`/dashboard`) - Admin-only panel with statistics

---

## Routes

### Public Routes
- **`/`** - Landing page with Google sign-in button
- **`/auth/error`** - Authentication error page

### User Routes (Authenticated)
- **`/home`** - User home page showing profile information
  - Displays user name, email, avatar
  - Shows user ID and account type
  - "Coming soon" section for templates

### Admin Routes (Admin Only)
- **`/dashboard`** - Admin dashboard with statistics
  - Total users, subscribers, revenue, templates
  - Placeholder charts for subscribers and revenue over time
  - Quick actions to manage users and templates
  
- **`/dashboard/users`** - User management page
  - View all users in a table
  - Filter by role, subscription status
  - Statistics: total users, admins, active subscriptions, total credits

---

## Authentication Flow

### Sign In
1. User clicks "Continue with Google" on landing page
2. Google OAuth authentication
3. User is created in database (if new)
4. **Regular users** → Redirected to `/home`
5. **Admin users** → Can access `/dashboard`

### Admin Check
- Admin routes check user role in database
- Non-admin users attempting to access `/dashboard` are redirected to `/home`
- In local dev (without database), admin check is skipped for testing

---

## Admin Dashboard Features

### Statistics (Placeholder Data)
- **Total Users**: 1,234 (+12% from last month)
- **Active Subscribers**: 456 (+8% from last month)
- **Monthly Revenue**: $12,345 (+15% from last month)
- **Total Templates**: 89 (+5 this month)

### Charts (Placeholders)
- **Subscribers Over Time** - Coming soon
- **Revenue Over Time** - Coming soon

### Quick Actions
- **Manage Users** - View and manage all users
- **Manage Templates** - Coming soon

---

## Database Schema

### Users Table
- `id` - UUID primary key
- `email` - Unique email address
- `name` - User's full name
- `image` - Profile picture URL
- `role` - 'user' or 'admin'
- `provider` - OAuth provider (e.g., 'google')
- `provider_id` - OAuth provider's user ID
- `created_at` - Timestamp
- `updated_at` - Timestamp

---

## Making a User Admin

### Local Development
```sql
-- Connect to local D1 database
npx wrangler d1 execute sceneyard --local --command "UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com'"
```

### Production
```sql
-- Connect to production D1 database
npx wrangler d1 execute sceneyard --remote --command "UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com'"
```

---

## Testing

### Local Development
1. Run migrations:
   ```bash
   npm run migrations-local
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Sign in with Google at `http://localhost:3000`

4. You'll be redirected to `/home` (user page)

5. To test admin dashboard:
   - Make your user an admin (see SQL above)
   - Visit `http://localhost:3000/dashboard`

### Production
1. Deploy to Cloudflare:
   ```bash
   npm run deploy
   ```

2. Run migrations on production:
   ```bash
   npm run migrations
   ```

3. Make your user an admin (see SQL above)

---

## Next Steps

### Implement Real Data
- [ ] Connect statistics to actual database queries
- [ ] Add chart library (e.g., Recharts, Chart.js)
- [ ] Implement subscribers over time chart
- [ ] Implement revenue over time chart

### Add Template Management
- [ ] Create templates table
- [ ] Build template upload interface
- [ ] Build template management page
- [ ] Add template categories and tags

### Enhance User Management
- [ ] Add user search and filtering
- [ ] Add pagination
- [ ] Add user actions (ban, delete, change role)
- [ ] Add user details modal

---

## File Structure

```
app/
├── (dashboard)/              # Admin routes
│   ├── layout.tsx           # Admin layout with header
│   └── dashboard/
│       ├── page.tsx         # Admin dashboard
│       └── users/
│           └── page.tsx     # User management
├── (user)/                  # User routes
│   └── home/
│       └── page.tsx         # User home page
├── auth/
│   └── error/
│       └── page.tsx         # Auth error page
└── page.tsx                 # Landing page

components/
├── auth/
│   └── google-signin-button.tsx
├── hero/
│   └── hero-section.tsx
└── providers/
    └── session-provider.tsx

lib/
├── models/
│   └── user.model.ts
├── repositories/
│   └── user.repository.ts
├── services/
│   └── auth.service.ts
└── auth.ts
```

---

## Environment Variables

### `.env.local` (for Next.js)
```env
AUTH_SECRET="your-secret-here"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_URL="http://localhost:3000"
```

### `.dev.vars` (for Cloudflare local dev)
```env
AUTH_SECRET="your-secret-here"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_URL="http://localhost:3000"
```

### `wrangler.jsonc` (for production)
```jsonc
{
  "vars": {
    "AUTH_URL": "https://your-domain.workers.dev",
    "AUTH_GOOGLE_ID": "your-google-client-id",
    "AUTH_GOOGLE_SECRET": "your-google-client-secret",
    "AUTH_SECRET": "your-secret-here"
  }
}
```
