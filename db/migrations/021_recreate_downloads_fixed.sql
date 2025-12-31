-- Migration: 021_recreate_downloads_fixed.sql
-- Description: Recreate downloads table with correct foreign key references (templates instead of videos)
-- Dependencies: 001_users.sql, 007_templates.sql

PRAGMA foreign_keys = OFF;

-- Drop existing table and related objects
DROP TABLE IF EXISTS downloads;
DROP TRIGGER IF EXISTS downloads_after_insert;
DROP INDEX IF EXISTS idx_downloads_user_created;
DROP INDEX IF EXISTS idx_downloads_template;

-- Create correct table
CREATE TABLE downloads (
  id               TEXT PRIMARY KEY,            -- uuid
  user_id          TEXT NOT NULL,
  template_id      TEXT NOT NULL,
  cost_credits     INTEGER NOT NULL,
  idempotency_key  TEXT UNIQUE,                 -- prevents double-charge
  created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE
);

-- Re-create indices
CREATE INDEX IF NOT EXISTS idx_downloads_user_created 
  ON downloads(user_id, created_at);

CREATE INDEX IF NOT EXISTS idx_downloads_template 
  ON downloads(template_id, created_at);

-- Re-create trigger
CREATE TRIGGER IF NOT EXISTS downloads_after_insert
AFTER INSERT ON downloads
BEGIN
  UPDATE templates SET downloads_count = downloads_count + 1 WHERE id = NEW.template_id;
END;

PRAGMA foreign_keys = ON;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('021_recreate_downloads_fixed');
