-- Migration: 004_payment_events.sql
-- Description: Create payment_events table for tracking all payment transactions
-- Dependencies: 001_users.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- PAYMENT EVENTS TABLE
-- Raw provider facts; idempotent by (provider, external_id)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payment_events (
  id            TEXT PRIMARY KEY,               -- uuid
  user_id       TEXT NOT NULL,
  provider      TEXT NOT NULL,                  -- 'lemon_squeezy'
  type          TEXT NOT NULL CHECK (type IN ('subscription_created','renewal','topup','upgrade','downgrade','refund','cancel')),
  status        TEXT NOT NULL CHECK (status IN ('success','failed','pending')),
  amount_cents  INTEGER NOT NULL,
  currency      TEXT NOT NULL DEFAULT 'USD',
  external_id   TEXT NOT NULL,                  -- provider event/invoice id
  payload       TEXT,                           -- JSON (raw webhook)
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (provider, external_id)
);

-- Index for user payment history
CREATE INDEX IF NOT EXISTS idx_payment_events_user_created 
  ON payment_events(user_id, created_at);

-- Index for external ID lookups (idempotency)
CREATE INDEX IF NOT EXISTS idx_payment_events_external 
  ON payment_events(external_id);

-- Index for filtering by type and status
CREATE INDEX IF NOT EXISTS idx_payment_events_type_status 
  ON payment_events(type, status);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('004_payment_events');
