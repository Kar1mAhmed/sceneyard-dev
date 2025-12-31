-- Migration: 021_fix_downloads_final.sql
-- Description: Consolidated fix for downloads table - Drops and recreates correctly

PRAGMA foreign_keys = OFF;

-- Drop any existing objects to ensure clean state
DROP TRIGGER IF EXISTS downloads_after_insert;
DROP INDEX IF EXISTS idx_downloads_user_created;
DROP INDEX IF EXISTS idx_downloads_template;
DROP TABLE IF EXISTS downloads;

-- Create table with correct schema (Referencing templates, NOT videos)
CREATE TABLE downloads (
  id               TEXT PRIMARY KEY,
  user_id          TEXT NOT NULL,
  template_id      TEXT NOT NULL,
  cost_credits     INTEGER NOT NULL,
  idempotency_key  TEXT UNIQUE,
  created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE
);

-- Recreate indices
CREATE INDEX idx_downloads_user_created ON downloads(user_id, created_at);
CREATE INDEX idx_downloads_template ON downloads(template_id, created_at);

-- Recreate trigger
CREATE TRIGGER downloads_after_insert
AFTER INSERT ON downloads
BEGIN
  UPDATE templates SET downloads_count = downloads_count + 1 WHERE id = NEW.template_id;
END;

PRAGMA foreign_keys = ON;

-- Record migration manually (if project uses this table)
INSERT OR IGNORE INTO schema_migrations (version) VALUES ('021_fix_downloads_final');
