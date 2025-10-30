-- Migration: 003_subscriptions.sql
-- Description: Create subscriptions table linking users to plans
-- Dependencies: 001_users.sql, 002_plans.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- SUBSCRIPTIONS TABLE
-- One row per user: current snapshot + cached balance
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriptions (
  user_id               TEXT PRIMARY KEY,       -- FK users.id
  plan_id               TEXT NOT NULL,          -- FK plans.id
  status                TEXT NOT NULL CHECK (status IN ('active','canceled','past_due','trialing','incomplete')),
  current_period_start  INTEGER NOT NULL,
  current_period_end    INTEGER NOT NULL,
  trial_end             INTEGER,                -- nullable
  cancel_at             INTEGER,                -- nullable
  balance               INTEGER NOT NULL DEFAULT 0, -- cached credits
  version               INTEGER NOT NULL DEFAULT 0, -- optimistic lock
  created_at            INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at            INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

-- Auto-update timestamp on subscription changes
CREATE TRIGGER IF NOT EXISTS subscriptions_set_updated_at
AFTER UPDATE ON subscriptions
BEGIN
  UPDATE subscriptions SET updated_at = unixepoch() WHERE user_id = NEW.user_id;
END;

-- Index for querying active subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_status 
  ON subscriptions(status);

-- Index for finding expiring subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end 
  ON subscriptions(current_period_end) 
  WHERE status = 'active';

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('003_subscriptions');
