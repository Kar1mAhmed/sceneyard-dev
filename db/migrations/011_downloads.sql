-- Migration: 011_downloads.sql
-- Description: Create downloads table for tracking user downloads
-- Dependencies: 001_users.sql, 007_templates.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- DOWNLOADS TABLE
-- Usage facts; idempotent per attempt
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS downloads (
  id               TEXT PRIMARY KEY,            -- uuid
  user_id          TEXT NOT NULL,
  template_id      TEXT NOT NULL,
  cost_credits     INTEGER NOT NULL,
  idempotency_key  TEXT UNIQUE,                 -- prevents double-charge
  created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE
);

-- Index for user download history
CREATE INDEX IF NOT EXISTS idx_downloads_user_created 
  ON downloads(user_id, created_at);

-- Index for template download tracking
CREATE INDEX IF NOT EXISTS idx_downloads_template 
  ON downloads(template_id, created_at);

-- Optional: Uncomment if re-downloads should be FREE (charge once per template)
-- CREATE UNIQUE INDEX IF NOT EXISTS uniq_download_once_per_template
--   ON downloads(user_id, template_id);

-- Auto-increment templates.downloads_count on each new download
CREATE TRIGGER IF NOT EXISTS downloads_after_insert
AFTER INSERT ON downloads
BEGIN
  UPDATE templates SET downloads_count = downloads_count + 1 WHERE id = NEW.template_id;
END;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('011_downloads');
