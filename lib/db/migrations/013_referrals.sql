-- Migration: 013_referrals.sql
-- Description: Create referral_conversions table for tracking referral bonuses
-- Dependencies: 001_users.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- REFERRAL CONVERSIONS TABLE
-- Explicit tracking of referral rewards
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS referral_conversions (
  id                TEXT PRIMARY KEY,
  referrer_user_id  TEXT NOT NULL,
  referred_user_id  TEXT NOT NULL,
  converted_at      INTEGER NOT NULL DEFAULT (unixepoch()),
  bonus_credits     INTEGER NOT NULL,
  idempotency_key   TEXT UNIQUE NOT NULL,
  FOREIGN KEY (referrer_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (referred_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (referrer_user_id, referred_user_id)
);

-- Index for referrer's conversions
CREATE INDEX IF NOT EXISTS idx_referral_conversions_referrer 
  ON referral_conversions(referrer_user_id);

-- Index for referred user lookup
CREATE INDEX IF NOT EXISTS idx_referral_conversions_referred 
  ON referral_conversions(referred_user_id);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('013_referrals');
