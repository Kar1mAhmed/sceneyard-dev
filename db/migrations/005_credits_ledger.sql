-- Migration: 005_credits_ledger.sql
-- Description: Create credits_ledger table (append-only, source of truth for credits)
-- Dependencies: 001_users.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- CREDITS LEDGER TABLE
-- Append-only, source of truth for all credit transactions
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS credits_ledger (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id          TEXT NOT NULL,
  occurred_at      INTEGER NOT NULL DEFAULT (unixepoch()),
  source           TEXT NOT NULL CHECK (source IN ('subscription_refill','topup','download','referral','expiry','refund','admin')),
  delta            INTEGER NOT NULL,            -- +adds, -spends
  idempotency_key  TEXT UNIQUE,                 -- dedupe at write-time
  ref_type         TEXT,                        -- 'payment','download','webhook','admin'
  ref_id           TEXT,                        -- external/local id
  meta             TEXT,                        -- JSON
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for user credit history queries
CREATE INDEX IF NOT EXISTS idx_credits_ledger_user_time 
  ON credits_ledger(user_id, occurred_at);

-- Index for filtering by source
CREATE INDEX IF NOT EXISTS idx_credits_ledger_source 
  ON credits_ledger(source, occurred_at);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('005_credits_ledger');
