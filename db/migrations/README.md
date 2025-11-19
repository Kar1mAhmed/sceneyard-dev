# Database Migrations

## ⚠️ MIGRATION NOTICE

**This folder is being phased out in favor of feature-based migrations.**

- **Old approach**: All migrations in `lib/db/migrations/`
- **New approach**: Migrations in `lib/features/*/migrations/`

For now, both locations are supported. New migrations should be added to the appropriate feature folder when possible.

See `ARCHITECTURE.md` for details on the new feature-based structure.

---

## Overview

Database migrations organized by domain. Cloudflare D1 handles execution and tracking automatically.

## Structure

```
migrations/
├── 000_bootstrap.sql       # Schema tracking table
├── 001_users.sql           # User accounts
├── 002_plans.sql           # Subscription plans
├── 003_subscriptions.sql   # User subscriptions
├── 004_payment_events.sql  # Payment tracking
├── 005_credits_ledger.sql  # Credits system
├── 006_assets.sql          # R2 file references
├── 007_templates.sql       # After Effects templates
├── 008_styles.sql          # Template styles
├── 009_tags.sql            # Template tags
├── 010_likes.sql           # User favorites
├── 011_downloads.sql       # Download tracking
├── 012_topup_products.sql  # Credit top-ups
└── 013_referrals.sql       # Referral system
```

## Running Migrations

### Local Development

```bash
# Apply all migrations
wrangler d1 migrations apply sceneyard-db --local

# List migration status
wrangler d1 migrations list sceneyard-db --local
```

### Production

```bash
# Apply all migrations
wrangler d1 migrations apply sceneyard-db

# List migration status
wrangler d1 migrations list sceneyard-db
```

## Execution Order

Migrations run in numerical order (000 → 013) to respect foreign key dependencies.

## Adding New Migrations

1. Create `014_feature_name.sql`
2. Use `CREATE TABLE IF NOT EXISTS`
3. Test locally: `wrangler d1 migrations apply sceneyard-db --local`
4. Deploy: `wrangler d1 migrations apply sceneyard-db`

## Migration Template

```sql
-- Migration: 014_feature_name.sql
-- Description: What this does
-- Dependencies: Which migrations must run first

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS table_name (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_table_column
  ON table_name(column);

INSERT OR IGNORE INTO schema_migrations (version)
VALUES ('014_feature_name');
```

## Notes

- All migrations are idempotent (safe to re-run)
- Cloudflare D1 tracks applied migrations automatically
- Never modify existing migrations - create new ones instead
