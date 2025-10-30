-- Migration: 006_assets.sql
-- Description: Create assets table for R2 file storage references
-- Dependencies: None (independent table)

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- ASSETS TABLE
-- R2 pointers for previews & downloadable zips
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS assets (
  id        TEXT PRIMARY KEY,                   -- uuid
  kind      TEXT NOT NULL CHECK (kind IN ('preview','download')),
  r2_key    TEXT NOT NULL UNIQUE,
  mime      TEXT NOT NULL,
  bytes     INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Index for finding assets by R2 key
CREATE INDEX IF NOT EXISTS idx_assets_r2_key 
  ON assets(r2_key);

-- Index for filtering by asset type
CREATE INDEX IF NOT EXISTS idx_assets_kind 
  ON assets(kind);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('006_assets');
