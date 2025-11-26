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
# SceneYard - Project Legend

**Last Updated**: November 26, 2025  
**Current Phase**: Admin Dashboard & Templates System Development  
**Tech Stack**: Next.js 16 + Cloudflare Workers + D1 + R2

---

## � Project Overview

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

## �🚧 In Progress

### **Template Form Enhancements**
- ✅ Categories multi-select with checkboxes
- ✅ Smart tags input with autocomplete
- ✅ Min AE Version dropdown (2024, 2023, 2022, etc.)
- ✅ Modern delete confirmation modal

---

## 📝 Pending Features

### **High Priority**
- [ ] Template search and filtering
- [ ] User role management (Edit Role, Make Admin, Delete)
- [ ] Template publishing workflow improvements

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
│   │   │   ├── layout.tsx  # Toast provider wrapper
│   │   │   ├── page.tsx
│   │   │   ├── components/ # Admin-specific components
│   │   │   │   ├── CategoryItem.tsx
│   │   │   │   ├── EditTemplateForm.tsx
│   │   │   │   ├── TemplateMediaViewer.tsx
│   │   │   │   ├── TemplatesTable.tsx
│   │   │   │   └── VideoThumbnail.tsx
│   │   │   ├── users/
│   │   │   ├── templates/
│   │   │   │   ├── actions.ts  # Server actions
│   │   │   │   └── [id]/
│   │   │   └── categories/
│   │   └── api/            # API routes
│   │       ├── r2/
│   │       │   ├── public-url/
│   │       │   ├── download-url/
│   │       │   ├── stream/     # Video streaming
│   │       │   ├── download/   # Zip download
│   │       │   └── upload/     # Direct R2 upload
│   │       ├── templates/
│   │       ├── categories/
│   │       └── tags/
│   └── components/         # Shared components
│       ├── TagInput.tsx
│       └── ToastProvider.tsx
└── wrangler.jsonc          # Cloudflare config

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
- **Junction tables**: `template_styles` for many-to-many category relationships

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
- **Toast notifications**: Context-based notification system

---

## 🐛 Known Issues

### **TypeScript Linting**
- ⚠️ Type annotation warnings in `TagInput.tsx` and template form (non-blocking)
- ⚠️ `@ts-ignore` used for `session.user.role` (needs proper type extension)

### **Build Warnings**
- ⚠️ CSS `@theme` rule warning (Tailwind v4 syntax, can be ignored)

### **R2 Upload**
- ⚠️ 503 errors reported during template upload (investigating - added detailed logging)

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
npm run migrations-local   # Apply all pending migrations
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

## � Recent Changes (Last Session)

### **November 26, 2025 - Session 2**
1. ✅ **Edit Template Form Enhancements**:
   - Refactored into `EditTemplateForm.tsx` client component
   - Added `TagInput` for better tag management
   - Implemented category selection with checkboxes
   - Added AE Version dropdown (2024, 2023, 2022, etc.)
   - Created modern delete confirmation modal with glassmorphism
   - Styled timestamps (Created at, Updated at)
   - Moved server actions to `actions.ts`

2. ✅ **Toast Notification System**:
   - Created `ToastProvider.tsx` context component
   - Added admin layout wrapper for toast provider
   - Integrated success/error toasts in EditTemplateForm
   - Auto-dismiss after 3 seconds with manual close option
   - Smooth slide-in animations from right
   - Modern design with icons and glassmorphism

3. ✅ **Template Sorting Features**:
   - Created `TemplatesTable.tsx` client component
   - Added modern icon-based sort controls
   - Implemented client-side sorting (Recent, Likes, Downloads, A-Z)
   - Active state with purple glow effect
   - Instant sorting without server calls

4. ✅ **Bug Fixes & Improvements**:
   - Fixed Suspense boundary error (moved `await params` inside Suspense)
   - Fixed form submission (changed `action` to `onSubmit`)
   - Fixed database schema error (applied `template_styles` migration)
   - Restored missing `createAsset` and `createTemplate` exports
   - Added `await connection()` to R2 upload endpoint
   - Improved error handling with detailed logging in upload endpoint

5. ✅ **Type System Updates**:
   - Added `categories` property to `TemplateWithAssets` type
   - Updated `updateTemplate` to handle category updates
   - Updated `getTemplateById` to fetch categories
   - Exported `getAllCategories` alias for consistency

### **November 26, 2025 - Session 1**
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

1. **Debug R2 Upload Issues**
   - Investigate 503 errors during template upload
   - Check R2 bucket configuration
   - Test with smaller files
   - Review console logs for detailed error messages

2. **User Management Actions**
   - Implement role editing (user ↔ admin)
   - Add user deletion with confirmation
   - Add user search and filtering

3. **Template Features**
   - Implement template search and filtering
   - Add bulk actions (publish/unpublish multiple)
   - Improve template preview experience

4. **Subscription System**
   - Implement plans management
   - Add subscription creation/update
   - Integrate Lemon Squeezy webhooks

---

**Status**: Active development, admin dashboard phase complete with enhanced template management. Edit form now matches Create form UI/UX. Toast notifications and modern sorting implemented. Ready to debug upload issues and move to subscription system.
