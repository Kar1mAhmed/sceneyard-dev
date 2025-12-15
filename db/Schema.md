# SceneYard Database Design

## Overview

SceneYard uses **Cloudflare D1** (SQLite) with a normalized schema optimized for:

- Credit-based subscription system
- After Effects template marketplace
- Idempotent payment processing
- Full-text search
- Audit trails

## Core Principles

### 1. Idempotency First

Every state-changing operation uses idempotency keys to prevent duplicate charges, downloads, or credit transactions.

### 2. Append-Only Ledger

The `credits_ledger` is the single source of truth for all credit movements. The `subscriptions.balance` is a cached value for performance.

### 3. Soft Deletes

Templates use `deleted_at` for soft deletion, preserving download history and analytics.

### 4. Denormalized Search

`templates.tags_text` stores denormalized tags for FTS5 performance, synchronized with normalized `template_tags` junction table.

---

## Schema Overview

### User & Authentication

```
users
├── id (uuid)
├── email (unique)
├── name
├── country (ISO-2)
├── role (user|admin)
├── referred_by → users.id
├── referral_code (unique)
└── golden_member (boolean)
```

**Key Features:**

- Self-referential FK for referral system
- Golden member flag for lifetime perks
- Role-based access control

---

### Subscription System

#### Plans (Canonical Tiers)

```
plans
├── id (uuid)
├── plan_key (starter|pro|ultimate)
├── name
├── billing_period (monthly|yearly)
├── credits_per_period
├── rollover_months
├── early_access_days
├── topup_discount_percent
├── price_cents
├── provider (lemon_squeezy)
└── provider_product_id
```

**Design Notes:**

- Database is source of truth (not hardcoded)
- Supports multiple billing periods per tier
- Provider integration fields for Lemon Squeezy

#### Subscriptions (User State)

```
subscriptions
├── user_id (PK, FK → users)
├── plan_id (FK → plans)
├── status (active|canceled|past_due|trialing)
├── current_period_start
├── current_period_end
├── trial_end
├── cancel_at
├── balance (cached credits)
└── version (optimistic locking)
```

**Design Notes:**

- One row per user (current subscription only)
- `balance` is cached from `credits_ledger`
- `version` prevents race conditions on balance updates

---

### Credits System

#### Credits Ledger (Append-Only)

```
credits_ledger
├── id (autoincrement)
├── user_id (FK → users)
├── occurred_at
├── source (subscription_refill|topup|download|referral|expiry|refund|admin)
├── delta (+/- credits)
├── idempotency_key (unique)
├── ref_type (payment|download|webhook|admin)
├── ref_id (external reference)
└── meta (JSON)
```

**Design Notes:**

- Never delete or update rows (append-only)
- `delta` is positive for additions, negative for deductions
- `idempotency_key` prevents duplicate transactions
- `meta` stores additional context as JSON

#### Payment Events (Audit Trail)

```
payment_events
├── id (uuid)
├── user_id (FK → users)
├── provider (lemon_squeezy)
├── type (subscription_created|renewal|topup|upgrade|downgrade|refund|cancel)
├── status (success|failed|pending)
├── amount_cents
├── currency
├── external_id (unique per provider)
└── payload (JSON webhook data)
```

**Design Notes:**

- Idempotent by `(provider, external_id)`
- Stores raw webhook payload for debugging
- Separate from credits ledger (events vs transactions)

---

### Content System

#### Assets (R2 Storage)

```
assets
├── id (uuid)
├── kind (preview|download)
├── r2_key (unique)
├── mime
└── bytes
```

**Design Notes:**

- References to Cloudflare R2 objects
- All files are private (signed URLs generated on demand)
- `kind` distinguishes preview videos from downloadable zips

#### Templates (After Effects Projects)

```
templates
├── id (uuid)
├── title
├── description
├── preview_asset_id (FK → assets) [high-quality preview]
├── preview_thumbnail_id (FK → assets) [low-quality thumbnail for grids]
├── file_asset_id (FK → assets) [downloadable .zip]
├── ae_version_min
├── credits_cost (1-4)
├── orientation (horizontal|vertical)
├── likes_count (denormalized)
├── downloads_count (denormalized)
├── tags_text (denormalized for FTS)
├── published_at (null = draft)
├── early_access_until
├── is_featured (boolean) [default: false]
└── deleted_at (soft delete)
```

**Design Notes:**

- Two preview assets: high-quality for detail pages, low-quality thumbnails for grid listings
- **Orientation field**: Tracks whether template is horizontal or vertical format
- Denormalized counts for performance (updated via triggers)
- `published_at` controls visibility
- `early_access_until` for premium member early access
- `deleted_at` for soft deletion (preserves history)

#### Full-Text Search

```
templates_fts (FTS5 virtual table)
├── title
├── description
└── tags_text
```

**Design Notes:**

- Contentless FTS5 (manually managed rowids)
- Porter stemming tokenizer
- Synchronized with `templates` table manually

---

### Taxonomy

#### Styles (Controlled Vocabulary)

```
styles
├── id (uuid)
├── name (unique)
└── slug (unique)

template_styles (junction)
├── template_id (FK → templates)
└── style_id (FK → styles)
```

**Design Notes:**

- Admin-managed controlled list
- Many-to-many relationship

#### Tags (Open Vocabulary)

```
tags
├── id (uuid)
├── name (unique)
└── slug (unique)

template_tags (junction)
├── template_id (FK → templates)
└── tag_id (FK → tags)
```

**Design Notes:**

- User-generated or admin-managed
- Many-to-many relationship
- Denormalized to `templates.tags_text` for FTS

---

### User Interactions

#### Likes (Favorites)

```
likes
├── id (uuid)
├── user_id (FK → users)
├── template_id (FK → templates)
└── created_at
UNIQUE (user_id, template_id)
```

**Design Notes:**

- One like per user per template
- Triggers update `templates.likes_count`

#### Downloads (Usage Tracking)

```
downloads
├── id (uuid)
├── user_id (FK → users)
├── template_id (FK → templates)
├── cost_credits
├── idempotency_key (unique)
└── created_at
```

**Design Notes:**

- Idempotent by `idempotency_key`
- Records credit cost at time of download
- Triggers update `templates.downloads_count`
- Optional: Add `UNIQUE(user_id, template_id)` for one-time charges

---

### Additional Features

#### Top-Up Products

```
topup_products
├── id (uuid)
├── name
├── credits
├── price_cents
├── currency
├── provider
├── provider_product_id
└── active
```

**Design Notes:**

- One-time credit purchases
- Separate from subscription plans

#### Referral Conversions

```
referral_conversions
├── id (uuid)
├── referrer_user_id (FK → users)
├── referred_user_id (FK → users)
├── converted_at
├── bonus_credits
└── idempotency_key (unique)
UNIQUE (referrer_user_id, referred_user_id)
```

**Design Notes:**

- Tracks successful referrals
- One conversion per referrer-referred pair
- Bonus credits recorded in `credits_ledger`

---

## Data Flow Examples

### Download Flow

1. User requests template download
2. Check `subscriptions.balance` >= `templates.credits_cost`
3. Insert into `downloads` with `idempotency_key`
4. Insert into `credits_ledger` (negative delta)
5. Update `subscriptions.balance` (cached)
6. Trigger updates `templates.downloads_count`
7. Generate signed R2 URL (10-15 min expiry)

### Subscription Renewal

1. Lemon Squeezy webhook received
2. Insert into `payment_events` (idempotent by `external_id`)
3. Insert into `credits_ledger` (positive delta, source: subscription_refill)
4. Update `subscriptions` (balance, period dates, status)
5. Apply rollover logic if applicable

### Referral Bonus

1. New user signs up with referral code
2. Set `users.referred_by`
3. On first payment, check `referral_conversions`
4. Insert conversion record (idempotent)
5. Add credits to both referrer and referred via `credits_ledger`

---

## Performance Considerations

### Indexes

- **Composite indexes** on `(credits_cost, created_at DESC)` for filtered sorting
- **Partial indexes** on `published_at IS NOT NULL` and `deleted_at IS NULL`
- **Covering indexes** on junction tables for both directions

### Denormalization

- `templates.likes_count` and `downloads_count` updated via triggers
- `templates.tags_text` synchronized for FTS5
- `subscriptions.balance` cached from ledger

### Optimization

- Use `preview_thumbnail_id` for grid views (low-quality, fast loading)
- Use `preview_asset_id` for detail pages (high-quality)
- FTS5 for fast text search
- Signed URLs generated on-demand (not stored)

---

## Migration Strategy

Migrations are organized by domain and executed in dependency order:

1. **Base entities** (users, plans, assets)
2. **Relationships** (subscriptions, templates)
3. **Transactions** (payments, credits, downloads)
4. **Taxonomy** (styles, tags)
5. **Features** (likes, referrals, top-ups)

All migrations are **idempotent** and use `CREATE TABLE IF NOT EXISTS`.

---

## Key Constraints

### Foreign Keys

- `PRAGMA foreign_keys = ON` in all migrations
- Cascade deletes on user-owned data
- Protect referential integrity

### Check Constraints

- `credits_cost BETWEEN 1 AND 4`
- `role IN ('user', 'admin')`
- `status IN ('active', 'canceled', ...)`

### Unique Constraints

- Idempotency keys across all transaction tables
- Email uniqueness
- Referral code uniqueness
- One subscription per user

---

## Backup & Recovery

### Cloudflare D1

- Automatic point-in-time recovery
- Export via `wrangler d1 export`
- Import via `wrangler d1 execute --file`

### Critical Tables

- `credits_ledger` - Never delete (audit trail)
- `payment_events` - Never delete (legal/accounting)
- `downloads` - Preserve for analytics

---

## Future Considerations

### Potential Additions

- `template_versions` for template updates
- `reviews` for user ratings/comments
- `collections` for curated template bundles
- `notifications` for user alerts
- `analytics_events` for detailed tracking

### Scaling

- D1 handles millions of rows efficiently
- Consider read replicas for heavy analytics
- Archive old payment events if needed
- Partition credits ledger by year if massive scale
