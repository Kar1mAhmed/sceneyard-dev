-- Migration: 010_likes.sql
-- Description: Create likes table for user favorites
-- Dependencies: 001_users.sql, 007_videos.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- LIKES TABLE
-- User favorites (unique per user/video)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS likes (
  id         TEXT PRIMARY KEY,                  -- uuid
  user_id    TEXT NOT NULL,
  video_id   TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
  UNIQUE (user_id, video_id)
);

-- Index for user's liked videos
CREATE INDEX IF NOT EXISTS idx_likes_user 
  ON likes(user_id, created_at DESC);

-- Index for video's likes
CREATE INDEX IF NOT EXISTS idx_likes_video 
  ON likes(video_id, created_at DESC);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('010_likes');
