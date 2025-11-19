-- Migration: 010_likes.sql
-- Description: Create likes table for user favorites
-- Dependencies: 001_users.sql, 007_templates.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- LIKES TABLE
-- User favorites (unique per user/template)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS likes (
  id          TEXT PRIMARY KEY,                  -- uuid
  user_id     TEXT NOT NULL,
  template_id TEXT NOT NULL,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE,
  UNIQUE (user_id, template_id)
);

-- Index for user's liked templates
CREATE INDEX IF NOT EXISTS idx_likes_user 
  ON likes(user_id, created_at DESC);

-- Index for template's likes
CREATE INDEX IF NOT EXISTS idx_likes_template 
  ON likes(template_id, created_at DESC);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('010_likes');
