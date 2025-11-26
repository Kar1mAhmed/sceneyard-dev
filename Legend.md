# SceneYard - Project Legend

**Last Updated**: November 26, 2025  
**Current Phase**: Admin Dashboard & Templates System Development  
**Tech Stack**: Next.js 16 + Cloudflare Workers + D1 + R2

---

## 📋 Project Overview

SceneYard is a credit-based marketplace for After Effects templates. Users subscribe to plans, receive monthly credits, and download premium templates. The platform features:

- **Subscription System**: Starter, Pro, Ultimate tiers with monthly credits
- **Template Marketplace**: High-quality After Effects templates with preview videos
- **Credit Economy**: Templates cost 1-4 credits based on complexity
- **Admin Dashboard**: Full management interface for users, templates, and categories

---

## 🎯 Current Development Stage

### ✅ Completed Features

#### **1. Authentication & User Management**
- ✅ NextAuth v5 with Google OAuth
- ✅ User schema with roles (user/admin)
- ✅ "First user is admin" logic
- ✅ Admin-only access control
- ✅ User management page with status, subscription, and actions

#### **2. Database Architecture**
- ✅ Cloudflare D1 (SQLite) with migrations
- ✅ Users, Plans, Subscriptions, Templates, Assets tables
- ✅ Categories (styles) and Tags with many-to-many relationships
- ✅ Full-text search (FTS5) for templates
- ✅ Soft deletes and audit trails

#### **3. Admin Dashboard**
- ✅ Statistics overview (users, templates)
- ✅ Purple-themed dark mode UI with dotted background pattern
- ✅ Manage Users page with role editing and deletion
- ✅ Manage Templates page with stats and list view
- ✅ Manage Categories page for template organization
- ✅ **Component Organization**: Admin components isolated in `src/app/admin/components/`

#### **4. Templates System**
- ✅ Template CRUD operations
- ✅ Asset management (preview video, thumbnail, download file)
- ✅ R2 direct upload (bypasses Worker limits)
- ✅ Client-side video thumbnail generation (480p)
- ✅ Template orientation (horizontal/vertical)
- ✅ Categories and smart tags with autocomplete
- ✅ Credits cost (1-4), likes, downloads tracking
- ✅ Draft/Published status
- ✅ **Live Refresh**: Categories and Templates updates reflect immediately using `revalidatePath`
- ✅ **Video Previews**: Hover-to-play video thumbnails on listing page
- ✅ **Template Detail**: High-quality video player and secure zip download

#### **5. R2 Asset Storage & Security**
- ✅ Direct R2 uploads via presigned URLs
- ✅ **Streaming API**: `/api/r2/stream` for video playback
- ✅ **Secure Downloads**: `/api/r2/download` for authenticated zip file access
- ✅ **Security Model**: 
    - **Videos**: Publicly accessible via streaming API (7-day cache)
    - **Zip Files**: Restricted to Admin/Purchased users (requires auth, no public access)
- ✅ Asset metadata in D1 database

#### **6. UI/UX**
- ✅ Landing page with hero section
- ✅ Admin dashboard with solid purple theme
- ✅ Dotted background pattern across all admin pages
- ✅ Responsive design
- ✅ Form validation and error handling
- ✅ **Inline Editing**: Category names can be edited directly in the list

---

## 🚧 In Progress

### **Template Form Enhancements**
- ⏳ Categories multi-select
- ⏳ Smart tags input with autocomplete
- ⏳ Min AE Version dropdown (2024, 2023, 2022, etc.)

---

## 📝 Pending Features

### **High Priority**
- [ ] Template edit page with R2 upload (currently only metadata edit)
- [ ] User role management (Edit Role, Make Admin, Delete)
- [ ] Template publishing workflow
- [ ] Template search and filtering

### **Medium Priority**
- [ ] Subscription plans management
- [ ] Credit system implementation
- [ ] Payment integration (Lemon Squeezy)
- [ ] Download tracking and credit deduction
- [ ] User profile page

### **Low Priority**
- [ ] Template likes/favorites
- [ ] Template reviews/ratings
- [ ] Collections/bundles
- [ ] Referral system
- [ ] Analytics dashboard

---

## 🗂️ Project Structure

```
sceneyard-dev/
├── db/
│   ├── migrations/          # SQL migration files
│   │   ├── 001_users.sql
│   │   ├── 006_assets.sql
│   │   ├── 007_templates.sql
│   │   ├── 008_styles.sql (categories)
│   │   ├── 009_tags.sql
│   │   └── 015_add_template_orientation.sql
│   └── Schema.md            # Database documentation
├── features/                # Backend domain logic
│   ├── auth/
│   ├── users/
│   ├── templates/
│   ├── categories/
│   └── tags/
├── lib/                     # Infrastructure utilities
│   ├── env.ts              # Environment variables
│   └── r2-upload.ts        # R2 upload utilities
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Landing page
│   │   ├── home/           # User home
│   │   ├── admin/          # Admin dashboard
│   │   │   ├── page.tsx
│   │   │   ├── components/ # Admin-specific components (NEW)
│   │   │   │   ├── CategoryItem.tsx
│   │   │   │   ├── TemplateMediaViewer.tsx
│   │   │   │   └── VideoThumbnail.tsx
│   │   │   ├── users/
│   │   │   ├── templates/
│   │   │   └── categories/
│   │   └── api/            # API routes
│   │       ├── r2/
│   │       │   ├── public-url/
│   │       │   ├── download-url/
│   │       │   ├── stream/     # Video streaming
│   │       │   └── download/   # Zip download
│   │       ├── templates/
│   │       ├── categories/
│   │       └── tags/
│   └── components/         # Main website components (public)
│       └── TagInput.tsx
└── wrangler.jsonc          # Cloudflare config
```

---

## 🔑 Key Technical Decisions

### **Architecture**
- **Feature-based structure**: Domain logic in `features/`, HTTP in `api/`, UI in `src/`
- **Component organization**: Admin components in `src/app/admin/components/`, public components in `src/components/`
- **Separation of concerns**: No DB queries from API routes or UI components
- **Repository pattern**: All DB access through `repo.ts` files

### **Database**
- **Cloudflare D1**: SQLite with automatic backups
- **Migrations**: Idempotent, versioned SQL files
- **Denormalization**: `likes_count`, `downloads_count`, `tags_text` for performance
- **Soft deletes**: `deleted_at` preserves history

### **File Storage & Security**
- **Cloudflare R2**: S3-compatible object storage
- **Direct uploads**: Client uploads directly to R2 via presigned URLs
- **Streaming**: Videos streamed via `/api/r2/stream` with range support
- **Downloads**: Zip files streamed via `/api/r2/download` with auth check
- **Asset types**: preview (high-quality), thumbnail (480p), download (.zip)

### **Authentication**
- **NextAuth v5**: Beta version with enhanced features
- **Google OAuth**: Primary authentication method
- **Role-based access**: User/Admin roles with middleware protection

### **UI Framework**
- **Next.js 16**: Latest with Cache Components enabled
- **Tailwind CSS**: Utility-first styling
- **Dark mode**: Purple-themed admin interface
- **Responsive**: Mobile-first design

---

## 🐛 Known Issues

### **TypeScript Linting**
- ⚠️ Type annotation warnings in `TagInput.tsx` and template form (non-blocking)
- ⚠️ `@ts-ignore` used for `session.user.role` (needs proper type extension)

### **Build Warnings**
- ⚠️ CSS `@theme` rule warning (Tailwind v4 syntax, can be ignored)

---

## 📚 Documentation

- **[Schema.md](./db/Schema.md)**: Complete database schema documentation
- **[ARCHITECTURE.md](./Docs/ARCHITECTURE.md)**: System architecture overview
- **[sceneyard_full_brief.md](./Docs/sceneyard_full_brief.md)**: Full project requirements

---

## 🚀 Quick Start

### **Development**
```bash
npm run dev          # Start Next.js dev server (port 3000)
```

### **Database**
```bash
npx wrangler d1 execute SCENEYARD_DB --local --file=db/migrations/XXX.sql
```

### **Build**
```bash
npm run build        # Production build
```

---

## 🎨 Design System

### **Colors**
- **Primary**: Purple (`#7558f8`)
- **Secondary**: Cyan (`#00fff0`), Yellow (`#ffd53e`)
- **Background**: Black (`#0f111a`)
- **Text**: White (`#e8eaf6`)

### **Typography**
- **Font**: BR Sonoma (custom), fallback to system-ui

### **Patterns**
- **Dotted background**: Subtle purple dots on admin pages
- **Glassmorphism**: Transparent overlays with blur
- **Rounded corners**: 2xl (16px) for cards, xl (12px) for inputs

---

## 📞 Environment Variables

Required in `.dev.vars` (local) and Cloudflare Dashboard (production):

```env
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_random_secret
```

**Bindings** (configured in `wrangler.jsonc`):
- `SCENEYARD_DB`: D1 database
- `ASSET_BUCKET`: R2 bucket

---

## 🔄 Recent Changes (Last Session)

### **November 26, 2025**
1. ✅ **Admin Panel Enhancements**:
   - Implemented inline category editing with live refresh
   - Added video thumbnails with hover-to-play on templates list
   - Enhanced template detail view with video player and secure download
2. ✅ **R2 Integration**:
   - Replaced signed URLs with direct R2 bucket binding
   - Created streaming endpoint for videos
   - Created secure download endpoint for zip files
3. ✅ **Component Reorganization**:
   - Moved admin components to `src/app/admin/components/`
   - Cleaned up `src/components/`
4. ✅ **Bug Fixes**:
   - Fixed `DevalueError` in streaming route
   - Resolved TypeScript errors in admin components
   - Fixed syntax errors in `TemplateMediaViewer`

---

## 📈 Next Steps

1. **Complete Template Management**
   - Implement edit template page with R2 upload
   - Add template deletion with confirmation
   - Implement publish/unpublish workflow

2. **User Management Actions**
   - Implement role editing (user ↔ admin)
   - Add user deletion with confirmation
   - Add user search and filtering

3. **Testing & Verification**
   - Manual testing of all admin features
   - Build verification (no errors)
   - Google Sign-in testing

4. **Subscription System**
   - Implement plans management
   - Add subscription creation/update
   - Integrate Lemon Squeezy webhooks

---

**Status**: Active development, admin dashboard phase nearly complete. R2 integration and security model finalized. Ready to move to subscription system and payment integration.
