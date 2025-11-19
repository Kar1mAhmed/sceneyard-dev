-- Migration: 014_add_oauth_columns.sql
-- Description: Add OAuth provider columns to users table
-- Dependencies: 001_users.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- ADD OAUTH COLUMNS TO USERS TABLE
----------------------------------------------------------------

-- Add provider column (google, github, etc.)
ALTER TABLE users ADD COLUMN provider TEXT DEFAULT 'google';

-- Add provider_id column (OAuth provider's user ID)
ALTER TABLE users ADD COLUMN provider_id TEXT;

-- Add image column (profile picture URL)
ALTER TABLE users ADD COLUMN image TEXT;

-- Create index for provider lookups
CREATE INDEX IF NOT EXISTS idx_users_provider 
  ON users(provider, provider_id);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('014_add_oauth_columns');
