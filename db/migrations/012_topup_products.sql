-- Migration: 012_topup_products.sql
-- Description: Create topup_products table for credit purchases
-- Dependencies: None (independent table)

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- TOP-UP PRODUCTS TABLE
-- One-time credit purchase options
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS topup_products (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  credits               INTEGER NOT NULL,
  price_cents           INTEGER NOT NULL,
  currency              TEXT NOT NULL DEFAULT 'USD',
  provider              TEXT,
  provider_product_id   TEXT,
  active                INTEGER NOT NULL DEFAULT 1,
  created_at            INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Index for active products
CREATE INDEX IF NOT EXISTS idx_topup_products_active 
  ON topup_products(active) 
  WHERE active = 1;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('012_topup_products');
