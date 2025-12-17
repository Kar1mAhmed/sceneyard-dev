# SceneYard - Project Legend

**Last Updated**: December 17, 2025  
**Current Phase**: Landing Page Completion & Interactive Elements  
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

### **Color Palette**

#### Absolute Colors
- **White**: `#FFFFFF`
- **Black**: `#000000`

#### Primary Colors - Purple Scale
- **Primary 55**: `#6725F6` (Deep purple)
- **Primary 60**: `#7558F8` (Main brand purple)
- **Primary 70**: `#947CFF` (Light purple)
- **Primary 80**: `#BEAFFF` (Lighter purple)

#### Primary Colors - Accents
- **Primary 90**: `#00FFF0` (Cyan)
- **Primary 95**: `#D77BFF` (Purple light)
- **Primary 97**: `#FFD53E` (Yellow)
- **Primary 99**: `#E8EAF6` (Purple lightest)

#### Dark Shades (Backgrounds)
- **Dark 03**: `#070908` (Main background)
- **Dark 08**: `#0E0E10` (Card backgrounds)
- **Dark 12-30**: Various dark shades for depth

#### Grey Shades (Text & UI)
- **Grey 40**: `#626A6C`
- **Grey 50**: `#7F7C83`
- **Grey 70**: `#A1A0B5` (Body text)
- **Grey 90-99**: Light greys for subtle elements

### **Typography**
- **Font Family**: BR Sonoma (all weights: Light, Regular, Medium, SemiBold, Bold)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Font Loading**: Preloaded OTF files with `font-display: swap`

### **Design Tokens**
- **Spacing**: xs (4px) to 3xl (64px)
- **Border Radius**: sm (8px) to full (9999px)
- **Shadows**: Standard shadows + glow effects (primary, cyan)

### **Utility Patterns**
- **Glassmorphism**: `.glass` - Frosted glass effect with backdrop blur
- **Gradient Text**: `.gradient-text` - Purple to cyan gradient
- **Animations**: fade-in, float, pulse-glow, slide-in, etc.
- **Admin Pattern**: Dotted background for admin pages only

---

## 📝 Recent Changes (Last Session)

### **December 17, 2025 - Landing Page Completion**
1. ✅ **Full Section Implementation**:
   - Built **Pricing**, **Golden Member**, **FAQ**, and **Footer** sections.
   - Implemented responsive design, animations, and dark mode theming.
   - **Footer**: Custom layout with split navigation, oversized logo, and auto-hiding Navbar interaction.

2. ✅ **Architecture Refinement**:
   - Created `LandingPageWrapper` (Client Component) to handle global page state (Navbar visibility) while preserving Server Components for performance.
   - Optimized `FeaturedTemplates` to remain async Server Component.

3. ✅ **Interactive Elements**:
   - `Navbar`: Auto-hides when Footer enters view.
   - `FAQ`: Smooth accordion animations using Grid transition.
   - `Pricing`: Interactive monthly/yearly toggle.


### **December 11, 2025 - Landing Page Navbar Component**
1. ✅ **Navbar Component Creation**:
   - Created reusable `Navbar.tsx` component in `src/components/`
   - Implemented glassmorphism effect using `.glass` utility class
   - Added SceneYard logo with gradient SVG (purple to cyan)
   - Included navigation links for Library and Pricing

2. ✅ **Styling & Interactions**:
   - Added `.navbar-link` utility class with animated gradient underline
   - Implemented hover effects with smooth transitions
   - Used BR Sonoma font and design system color tokens
   - Fixed positioning at top of page with proper z-index

3. ✅ **Integration**:
   - Integrated navbar into landing page (`page.tsx`)
   - Adjusted hero section padding to account for fixed navbar
   - Fixed import path for module resolution
   - Verified appearance in browser with screenshots

### **December 9, 2025 - Design System Implementation**
1. ✅ **Complete Color Palette**:
   - Implemented all color palettes: Absolute (White/Black), Primary purples (55-80), Accents (90, 95, 97, 99)
   - Added Dark shades (03-30) for backgrounds and depth
   - Added Grey shades (40-99) for text and UI elements
   - Organized as CSS custom properties in `globals.css`

2. ✅ **BR Sonoma Font Integration**:
   - Added font-face declarations for all 5 weights (Light, Regular, Medium, SemiBold, Bold)
   - Implemented font preloading in `layout.tsx` for better performance
   - Used `font-display: swap` to prevent FOUT
   - Font files in OTF format (can be optimized to WOFF2 later)

3. ✅ **Design Tokens & Utilities**:
   - Created comprehensive CSS custom properties for Tailwind v4
   - Added spacing scale (xs to 3xl), border radius, shadows
   - Implemented utility classes: `.glass`, `.gradient-text`, animation classes
   - Organized design system with clear sections and comments

4. ✅ **Landing Page Updates**:
   - Updated `page.tsx` to use new color tokens (dark-03 bg, primary-60 purple)
   - Applied gradient text effect to headline
   - Enhanced animations (fade-in-up, pulse-glow)
   - Improved visual hierarchy and spacing
   - Added second background glow (cyan accent)

5. ✅ **SEO & Performance**:
   - Updated metadata with better descriptions and keywords
   - Added Open Graph tags for social sharing
   - Preloaded critical font files
   - Optimized font loading strategy

### **December 8, 2025 - R2 & Template Deletion Enhancements**
1. ✅ **R2 Storage Fixes**:
   - Fixed `R2_PUBLIC_DOMAIN` environment variable issue (exposed to client-side).
   - Configured CORS for R2 bucket to allow uploads from admin panel.
   - Refactored `VideoThumbnail` and `TemplateMediaViewer` to use hardcoded public URLs for better stability.

2. ✅ **Template Management**:
   - Implemented **Cascade Deletion**: Deleting a template now automatically removes associated stored files (preview, thumbnail, download) from R2.
   - Prevents storage leaks and reduces costs.
   - Soft-deletes database records for audit trail.

### **December 4, 2025 - API Logging Implementation**
1. ✅ **Comprehensive API Endpoint Logging**:
   - Added structured logging to all 11 API endpoints.
   - **Categories**: GET, POST, PUT, DELETE with user tracking.
   - **R2 Storage**: Download, upload, stream, presigned-url logs with file metadata.
   - **Templates**: Create & Assets logs with credit costs and asset IDs.
   - All logs include: timestamp, user email, method, status, duration, and sanitized parameters.

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

1. **Landing Page Development**
   - ✅ Build hero section with dynamic background effects
   - ✅ Create demo section with video template previews
   - ✅ Add pricing section with subscription tiers
   - ✅ Implement FAQ section
   - ✅ Design footer with links and branding

2. **Component Library**
   - Create reusable button components (primary, secondary, outline)
   - Build input field components with validation
   - Design card components for templates
   - Implement navigation bar
   - Create modal/dialog components

3. **Templates Marketplace (Public)**
   - Build templates browse page
   - Implement search and filtering
   - Create template detail page
   - Add preview video player
   - Design download flow

4. **User Management Actions (Admin)**
   - Implement role editing (user ↔ admin)
   - Add user deletion with confirmation
   - Add user search and filtering

5. **Subscription System**
   - Implement plans management
   - Add subscription creation/update
   - Integrate Lemon Squeezy webhooks

---

**Status**: Landing Page fully implemented with high-end aesthetic, responsive design, and interactive elements. Pricing, FAQ, and Footer sections complete. Admin dashboard stable. Next focus: Public Marketplace functionality (Browse/Search/Detail).
