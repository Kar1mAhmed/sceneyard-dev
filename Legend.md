# SceneYard - Project Legend

**Last Updated**: December 31, 2025  
**Current Phase**: Administrative Infrastructure & User Outreach  
**Tech Stack**: Next.js 16 + Cloudflare Workers + D1 + R2 + Resend

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
- ✅ **High-Fidelity Loading**: Branded `Loading` component with SMIL morphing, rhythmic leg animation, and Geist Mono typography.
- ✅ **FAQ Page**: Dedicated `/faq` page with expanded questions and contact integration.
- ✅ **Toggleable Aesthetics**: Optional pulsing purple glow and cutout effect for extreme flexibility.
- ✅ **Visual Verification**: Dedicated `/test-loading` page for cross-component validation.
#### **7. Architectural Rebirth (Service/Repo Pattern)**
- ✅ **Strict Layering**: Refactored codebase to use `features/*/service.ts` for logic and `features/*/repo.ts` for DB access.
- ✅ **Server/Client Separation**: Refactored admin pages (e.g., `NewTemplatePage`) to be Server Components with lightweight Client Component forms.
- ✅ **Type Safety**: Unified `Template`, `Asset`, and `Category` types across layers with strict TypeScript.
- ✅ **Dev Tools**: Implemented `/api/seed` to generate 100+ random templates for UI testing.

#### **8. Pricing & Payments**
- ✅ **Pricing Page**: Dedicated page at `/pricing` assembling Golden Member perks, subscription plans, and secure payment highlights.
- ✅ **Yearly Toggle**: Functional switch between monthly and annual billing with discounted rates.
- ✅ **Enhanced Features**: Detailed feature lists for each tier including credit-based downloads, premium templates, and priority access.
- ✅ **Secure Checkout Section**: Branded "Easy and Secure Payment" section with varied icons (Credit Card, Lock, Cancellation) and trusted provider logos.

#### **9. Contact & Outreach System**
- ✅ **Functional Contact Form**: Direct D1 storage with rigorous backend validation logic.
- ✅ **Real Email Notifications**: Transactional emails via **Resend** (fully authorized via domain verification).
- ✅ **Admin Inbox**: Dedicated `/admin/messages` module for reading, managing, and deleting user inquiries.
- ✅ **Dashboard Integration**: "Support Messages" stat card with quick-access to the messaging portal.

#### **10. Premium UI Polish**
- ✅ **Global Toast Notifications**: Cinematic glassmorphism-based toast system matching brand colors (Yellow/Purple/Pink).
- ✅ **Legal Consolidation**: Unified Privacy and Return & Refund Policy into a single `/privacy` destination.
- ✅ **Mobile Optimization**: Refined contact page hero and header margins for various device breakpoints.

---

## 🚧 In Progress

### **Template Marketplace & Search**
- ✅ Template browse page with vertical/horizontal filters
- ✅- **Library Responsiveness**: Reduced top margin, aligned search bar/filters with grid margins. Implemented a premium mobile filter modal with smooth animations and solid design. Enhanced template grid with 2-column mobile layout, smart spanning for vertical items, and optimized row heights.
- ✅ **Settings Pages Layout**: Created `ProfileHeader` and `SettingsNav` components. Built `/favorites` page with `BigColumnsHeader` integration.
- ✅ **Settings Route Group**: Implemented `(settings)` route group with shared layout. Pages: `/profile`, `/favorites`, `/downloads`, `/plan`.
- [/] Search bar with FTS5 implementation
- [ ] Template likes and interaction metrics
- ✅ **Download History**: Full-stack implementation of template purchase tracking, credit costs, and a polished user-facing history page with real-time data fetching and brand-accurate loading states.
- ✅ **UI Refinement**: Consistent settings navigation, premium empty states, and optimized action buttons on the scene detail page.

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

### **R2 Upload & Creation**
- ✅ **RESOLEVED**: Fixed `FOREIGN KEY constraint failed` during template creation by ensuring Asset creation precedes Template creation.

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

### **December 24, 2025 - Architectural Refinement & Infrastructure Fixes**
1. ✅ **Service/Repo Layering**:
   - Implemented `service.ts` for all features to centralize business logic.
   - Refactored all API routes to use the service layer, removing direct DB access from the edge.
   - Unified error handling and logging at the service level.

2. ✅ **Template Creation Stability**:
   - Fixed a critical "D1_ERROR: FOREIGN KEY constraint failed" by updating the presigned URL flow to create asset records in the DB *before* the template is instantiated.
   - Refactored `NewTemplatePage` into a Server Component for better performance and data hydration.

3. ✅ **Developer Experience**:
   - Created `/api/seed` endpoint to generate a full library of 100 dummy templates for UI testing.
   - Cleaned up NextAuth role typing issues (removed @ts-ignore).

4. ✅ **Storage Cleanup**:
   - Added `deleted_at` to assets table.
   - Improved R2 cleanup logic during template deletion.

### **December 25, 2025 - Library UI Enhancements**
1. ✅ **Library Grid Layout**:
   - Implemented smart masonry grid with responsive row heights (220px-260px).
   - Vertical videos span 2 rows, horizontal videos span 1 row.
   - Using `grid-flow-row-dense` to auto-fill gaps and prevent empty spaces.

2. ✅ **Scroll-Hide Navbar**:
   - Added scroll direction detection to the Navbar component.
   - Navbar hides automatically when scrolling down to maximize content visibility.
   - Navbar reappears instantly when scrolling up or at the top of the page.
   - Smooth 500ms CSS transition for premium feel.
   - Integrated with existing footer visibility logic.

3. ✅ **Global Branding & Loading System**:
   - **High-Fidelity Branded Loader**: Replaced legacy spinners with a code-driven `Loading` component using SVG morphing between brand frames.
   - **"Living Brand" Animation**: Integrated rhythmic leg "breathing" and slow idle rotation for a futuristic, mechanical feel.
   - **Premium Aesthetics**: Geist Mono typography, radiant purple ambient glow, and even-odd cutout transparency.
   - **Verification Page**: Created `/test-loading` to showcase the component in inline, fullscreen, and button-nested states.

---

## 📊 Brief vs. Implementation Gap Analysis

Based on the [Full Project Brief](./Docs/sceneyard_full_brief.md), here is the current status:

### ✅ **Implemented (Aligned with Brief)**
| Feature | Brief Section | Status |
|---------|---------------|--------|
| Google OAuth | Section 5, 10 | ✅ Complete |
| Template Library | Section 5 | ✅ Complete |
| Categories & Tags | Section 5 | ✅ Complete |
| Credits Cost System | Section 6 | ✅ DB Ready (1-4 credits) |
| Admin Dashboard | Section 5 | ✅ Complete |
| R2 Storage (Preview/Download) | Section 7, 8 | ✅ Complete |
| FTS5 Search | Section 7 | ✅ DB Ready |
| User Roles | Section 8 | ✅ Complete |
| Responsive UI | Section 9 | ✅ Complete |

### 🚧 **In Progress**
| Feature | Brief Section | Notes |
|---------|---------------|-------|
| Templates Page (Browse) | Section 9 | Grid done, filters in progress |
| Search & Filter | Section 5 | FTS5 ready, UI pending |

### ❌ **Not Yet Started (From Brief)**
| Feature | Brief Section | Priority |
|---------|---------------|----------|
| Credit Ledger System | Section 7 | High |
| Subscription Management | Section 6, 10 | High |
| Lemon Squeezy Payments | Section 7 | High |
| Download Flow (Credit Deduction) | Section 10 | High |
| Account Page | Section 9 | Medium |
| Pricing Page | Section 9 | Medium |
| Referral System | Section 6 | Low |
| Golden Membership | Section 6 | Low |
| Favorites/Likes UI | Section 5 | Low |

### 🎯 **Recommended Next Steps**
1. **Complete Search UI**: Connect FTS5 backend to the search bar on the Library page.
2. **Build Pricing Page**: Display subscription tiers (Starter, Pro, Ultimate).
3. **Implement Credit System**: Create `credits_ledger` table, service, and deduction logic.
4. **Integrate Lemon Squeezy**: Set up webhooks for subscription/payment events.

---

### **December 31, 2025 - Admin Inbox & Global Outreach**
1. ✅ **Support Inbox module**:
   - Created `/admin/messages` with a high-performance `MessagesTable` component.
   - Built server actions for updating message status (Read/Unread) and hard deletions.
   - Linked the inbox directly to the Admin Dashboard for instant visibility.

2. ✅ **Email Notification Engine**:
   - Integrated **Resend** as the transactional email provider for Cloudflare compatibility.
   - Implemented direct-to-Gmail routing for contact submissions with fallback logic for domain verification testing.
   - Added detailed server-side logging for email dispatch monitoring.

3. ✅ **Brand Identity Polish**:
   - Replaced basic browser alerts with a custom, high-fidelity Toast system.
   - Consolidated legal docs into a unified `/privacy` page to streamline user navigation.
   - Refined the Contact landing page with white spotlight effects and left-pinned 3D illustrations for 2K displays.

---

**Status**: Backend infrastructure is stable. The project now features a complete administrative management loop for users, templates, and support outreach. Next focus is completing the Search UI and starting the Credit Ledger system.
