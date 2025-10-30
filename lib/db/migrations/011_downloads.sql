-- Migration: 011_downloads.sql
-- Description: Create downloads table for tracking user downloads
-- Dependencies: 001_users.sql, 007_videos.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- DOWNLOADS TABLE
-- Usage facts; idempotent per attempt
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS downloads (
  id               TEXT PRIMARY KEY,            -- uuid
  user_id          TEXT NOT NULL,
  video_id         TEXT NOT NULL,
  cost_credits     INTEGER NOT NULL,
  idempotency_key  TEXT UNIQUE,                 -- prevents double-charge
  created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

-- Index for user download history
CREATE INDEX IF NOT EXISTS idx_downloads_user_created 
  ON downloads(user_id, created_at);

-- Index for video download tracking
CREATE INDEX IF NOT EXISTS idx_downloads_video 
  ON downloads(video_id, created_at);

-- Optional: Uncomment if re-downloads should be FREE (charge once per video)
-- CREATE UNIQUE INDEX IF NOT EXISTS uniq_download_once_per_video
--   ON downloads(user_id, video_id);

-- Auto-increment videos.downloads_count on each new download
CREATE TRIGGER IF NOT EXISTS downloads_after_insert
AFTER INSERT ON downloads
BEGIN
  UPDATE videos SET downloads_count = downloads_count + 1 WHERE id = NEW.video_id;
END;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('011_downloads');
