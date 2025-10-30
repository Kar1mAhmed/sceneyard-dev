-- Migration: 008_styles.sql
-- Description: Create styles taxonomy and video_styles junction table
-- Dependencies: 007_videos.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- STYLES TABLE
-- Controlled list of video styles
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS styles (
  id    TEXT PRIMARY KEY,                       -- uuid
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE
);

----------------------------------------------------------------
-- VIDEO_STYLES JUNCTION TABLE
-- Many-to-many relationship between videos and styles
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS video_styles (
  video_id TEXT NOT NULL,
  style_id TEXT NOT NULL,
  PRIMARY KEY (video_id, style_id),
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
  FOREIGN KEY (style_id) REFERENCES styles(id) ON DELETE CASCADE
);

-- Index for finding videos by style
CREATE INDEX IF NOT EXISTS idx_video_styles_style 
  ON video_styles(style_id);

-- Index for finding styles of a video
CREATE INDEX IF NOT EXISTS idx_video_styles_video 
  ON video_styles(video_id);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('008_styles');
