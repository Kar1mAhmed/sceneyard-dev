-- Migration: 002_plans.sql
-- Description: Create plans table for subscription tiers
-- Dependencies: None (independent table)

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- PLANS TABLE
-- Canonical subscription plans (seed from code, DB is source of truth)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plans (
  id                      TEXT PRIMARY KEY,     -- uuid
  plan_key                TEXT NOT NULL UNIQUE, -- 'starter' | 'pro' | 'ultimate'
  name                    TEXT NOT NULL,
  billing_period          TEXT NOT NULL CHECK (billing_period IN ('monthly','yearly')),
  credits_per_period      INTEGER NOT NULL,
  rollover_months         INTEGER NOT NULL DEFAULT 0,
  early_access_days       INTEGER NOT NULL DEFAULT 0,
  topup_discount_percent  INTEGER NOT NULL DEFAULT 0,
  price_cents             INTEGER NOT NULL,
  currency                TEXT NOT NULL DEFAULT 'USD',
  provider                TEXT,                 -- e.g. 'lemon_squeezy'
  provider_product_id     TEXT,
  active                  INTEGER NOT NULL DEFAULT 1,
  created_at              INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at              INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Auto-update timestamp on plan changes
CREATE TRIGGER IF NOT EXISTS plans_set_updated_at
AFTER UPDATE ON plans
BEGIN
  UPDATE plans SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('002_plans');
