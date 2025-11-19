-- Migration: 007_templates.sql
-- Description: Create templates table for After Effects templates
-- Dependencies: 006_assets.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- TEMPLATES TABLE
-- After Effects templates with metadata
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS templates (
  id                    TEXT PRIMARY KEY,           -- uuid
  title                 TEXT NOT NULL,
  description           TEXT DEFAULT '',
  preview_asset_id      TEXT NOT NULL,              -- High-quality preview video
  preview_thumbnail_id  TEXT,                       -- Low-quality thumbnail for grid views
  file_asset_id         TEXT NOT NULL,
  ae_version_min        TEXT,
  credits_cost          INTEGER NOT NULL CHECK (credits_cost BETWEEN 1 AND 4),
  likes_count           INTEGER NOT NULL DEFAULT 0,
  downloads_count       INTEGER NOT NULL DEFAULT 0,
  tags_text             TEXT DEFAULT '',            -- denormalized for FTS
  published_at          INTEGER,                    -- when made public (null = draft)
  early_access_until    INTEGER,                    -- premium members can access before this
  deleted_at            INTEGER,                    -- soft delete
  created_at            INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at            INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (preview_asset_id) REFERENCES assets(id),
  FOREIGN KEY (preview_thumbnail_id) REFERENCES assets(id),
  FOREIGN KEY (file_asset_id) REFERENCES assets(id)
);

-- Auto-update timestamp on template changes
CREATE TRIGGER IF NOT EXISTS templates_set_updated_at
AFTER UPDATE ON templates
BEGIN
  UPDATE templates SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Index for chronological listing
CREATE INDEX IF NOT EXISTS idx_templates_created_at 
  ON templates(created_at);

-- Index for filtering by cost
CREATE INDEX IF NOT EXISTS idx_templates_cost 
  ON templates(credits_cost);

-- Composite index for cost + date sorting
CREATE INDEX IF NOT EXISTS idx_templates_cost_created 
  ON templates(credits_cost, created_at DESC);

-- Index for popular templates
CREATE INDEX IF NOT EXISTS idx_templates_downloads 
  ON templates(downloads_count DESC);

-- Index for most liked
CREATE INDEX IF NOT EXISTS idx_templates_likes 
  ON templates(likes_count DESC);

-- Index for published content
CREATE INDEX IF NOT EXISTS idx_templates_published 
  ON templates(published_at) 
  WHERE published_at IS NOT NULL;

-- Index for active (non-deleted) content
CREATE INDEX IF NOT EXISTS idx_templates_active 
  ON templates(deleted_at) 
  WHERE deleted_at IS NULL;

----------------------------------------------------------------
-- FULL-TEXT SEARCH
-- Contentless FTS5 table for searching templates
----------------------------------------------------------------
CREATE VIRTUAL TABLE IF NOT EXISTS templates_fts USING fts5(
  title, 
  description, 
  tags_text,
  content='',
  tokenize='porter'
);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('007_templates');
