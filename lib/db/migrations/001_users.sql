-- Migration: 001_users.sql
-- Description: Create users table with authentication and referral support
-- Dependencies: None (base table)

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- USERS TABLE
-- Stores user accounts, authentication info, and referral data
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,               -- uuid
  email         TEXT NOT NULL UNIQUE,
  name          TEXT,
  country       TEXT,                           -- ISO-2 optional
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  referred_by   TEXT,                           -- FK users.id (nullable)
  referral_code TEXT UNIQUE,                    -- user's own referral code
  golden_member INTEGER NOT NULL DEFAULT 0,     -- 0/1 boolean
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (referred_by) REFERENCES users(id)
);

-- Auto-update timestamp on user changes
CREATE TRIGGER IF NOT EXISTS users_set_updated_at
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Index for referral code lookups
CREATE INDEX IF NOT EXISTS idx_users_referral_code 
  ON users(referral_code) 
  WHERE referral_code IS NOT NULL;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('001_users');
