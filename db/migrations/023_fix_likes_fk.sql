-- Migration: 023_fix_likes_fk.sql
-- Description: Fix likes table FK to reference templates instead of videos (legacy name)
-- This migration recreates the likes table with correct FK constraint

PRAGMA foreign_keys = OFF;

-- Backup existing likes
CREATE TABLE IF NOT EXISTS likes_backup AS SELECT * FROM likes;

-- Drop old table
DROP TABLE IF EXISTS likes;

-- Recreate with correct FK to templates
CREATE TABLE likes (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  video_id    TEXT NOT NULL,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES templates(id) ON DELETE CASCADE,
  UNIQUE (user_id, video_id)
);

-- Restore data (only rows where template exists)
INSERT INTO likes (id, user_id, video_id, created_at)
SELECT b.id, b.user_id, b.video_id, b.created_at
FROM likes_backup b
INNER JOIN templates t ON b.video_id = t.id;

-- Drop backup
DROP TABLE IF EXISTS likes_backup;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_likes_user 
  ON likes(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_likes_template 
  ON likes(video_id, created_at DESC);

PRAGMA foreign_keys = ON;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('023_fix_likes_fk');
