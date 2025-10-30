-- Migration: 000_bootstrap.sql
-- Description: Create schema_migrations table for tracking applied migrations
-- Dependencies: None (must run first)

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- SCHEMA MIGRATIONS TABLE
-- Tracks which migrations have been applied
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schema_migrations (
  version    TEXT PRIMARY KEY,
  applied_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Record this bootstrap migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('000_bootstrap');
