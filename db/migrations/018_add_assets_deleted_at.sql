-- Migration: 018_add_assets_deleted_at.sql
-- Description: Add deleted_at column to assets table for soft deletes
-- Dependencies: 006_assets.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- ADD deleted_at TO ASSETS
----------------------------------------------------------------
ALTER TABLE assets ADD COLUMN deleted_at INTEGER DEFAULT NULL;

-- Index for filtering non-deleted assets
CREATE INDEX IF NOT EXISTS idx_assets_not_deleted 
  ON assets(deleted_at) WHERE deleted_at IS NULL;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('018_add_assets_deleted_at');
