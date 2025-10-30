-- Migration: 007_videos.sql
-- Description: Create videos table for After Effects templates
-- Dependencies: 006_assets.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- VIDEOS TABLE
-- After Effects templates with metadata
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS videos (
  id                    TEXT PRIMARY KEY,           -- uuid
  title                 TEXT NOT NULL,
  description           TEXT DEFAULT '',
  preview_asset_id      TEXT NOT NULL,
  file_asset_id         TEXT NOT NULL,
  ae_version_min        TEXT,
  resolution            TEXT,                       -- '1080p','4K', etc.
  plugins               TEXT DEFAULT '',            -- comma list (simple)
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
  FOREIGN KEY (file_asset_id)    REFERENCES assets(id)
);

-- Auto-update timestamp on video changes
CREATE TRIGGER IF NOT EXISTS videos_set_updated_at
AFTER UPDATE ON videos
BEGIN
  UPDATE videos SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Index for chronological listing
CREATE INDEX IF NOT EXISTS idx_videos_created_at 
  ON videos(created_at);

-- Index for filtering by cost
CREATE INDEX IF NOT EXISTS idx_videos_cost 
  ON videos(credits_cost);

-- Composite index for cost + date sorting
CREATE INDEX IF NOT EXISTS idx_videos_cost_created 
  ON videos(credits_cost, created_at DESC);

-- Index for popular templates
CREATE INDEX IF NOT EXISTS idx_videos_downloads 
  ON videos(downloads_count DESC);

-- Index for most liked
CREATE INDEX IF NOT EXISTS idx_videos_likes 
  ON videos(likes_count DESC);

-- Index for published content
CREATE INDEX IF NOT EXISTS idx_videos_published 
  ON videos(published_at) 
  WHERE published_at IS NOT NULL;

-- Index for active (non-deleted) content
CREATE INDEX IF NOT EXISTS idx_videos_active 
  ON videos(deleted_at) 
  WHERE deleted_at IS NULL;

----------------------------------------------------------------
-- FULL-TEXT SEARCH
-- Contentless FTS5 table for searching videos
----------------------------------------------------------------
CREATE VIRTUAL TABLE IF NOT EXISTS videos_fts USING fts5(
  title, 
  description, 
  tags_text,
  content='',
  tokenize='porter'
);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('007_videos');
