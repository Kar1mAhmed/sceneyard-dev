-- Migration: 016_fix_template_styles.sql
-- Description: Fix missing template_styles table in production
-- Dependencies: 008_styles.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- STYLES TABLE (Ensure exists)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS styles (
  id    TEXT PRIMARY KEY,                       -- uuid
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE
);

----------------------------------------------------------------
-- TEMPLATE_STYLES JUNCTION TABLE (Ensure exists)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS template_styles (
  template_id TEXT NOT NULL,
  style_id TEXT NOT NULL,
  PRIMARY KEY (template_id, style_id),
  FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE,
  FOREIGN KEY (style_id) REFERENCES styles(id) ON DELETE CASCADE
);

-- Index for finding templates by style
CREATE INDEX IF NOT EXISTS idx_template_styles_style 
  ON template_styles(style_id);

-- Index for finding styles of a template
CREATE INDEX IF NOT EXISTS idx_template_styles_template 
  ON template_styles(template_id);
