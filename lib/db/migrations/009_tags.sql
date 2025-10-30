-- Migration: 009_tags.sql
-- Description: Create tags taxonomy and video_tags junction table
-- Dependencies: 007_videos.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- TAGS TABLE
-- Open-ended tags for videos (normalized)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tags (
  id    TEXT PRIMARY KEY,                       -- uuid
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE
);

----------------------------------------------------------------
-- VIDEO_TAGS JUNCTION TABLE
-- Many-to-many relationship between videos and tags
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS video_tags (
  video_id TEXT NOT NULL,
  tag_id   TEXT NOT NULL,
  PRIMARY KEY (video_id, tag_id),
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id)   REFERENCES tags(id)   ON DELETE CASCADE
);

-- Index for finding videos by tag
CREATE INDEX IF NOT EXISTS idx_video_tags_tag 
  ON video_tags(tag_id);

-- Index for finding tags of a video
CREATE INDEX IF NOT EXISTS idx_video_tags_video 
  ON video_tags(video_id);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('009_tags');
