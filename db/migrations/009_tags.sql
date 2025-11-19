-- Migration: 009_tags.sql
-- Description: Create tags taxonomy and template_tags junction table
-- Dependencies: 007_templates.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- TAGS TABLE
-- Open-ended tags for templates (normalized)
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tags (
  id    TEXT PRIMARY KEY,                       -- uuid
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE
);

----------------------------------------------------------------
-- TEMPLATE_TAGS JUNCTION TABLE
-- Many-to-many relationship between templates and tags
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS template_tags (
  template_id TEXT NOT NULL,
  tag_id   TEXT NOT NULL,
  PRIMARY KEY (template_id, tag_id),
  FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id)   REFERENCES tags(id)   ON DELETE CASCADE
);

-- Index for finding templates by tag
CREATE INDEX IF NOT EXISTS idx_template_tags_tag 
  ON template_tags(tag_id);

-- Index for finding tags of a template
CREATE INDEX IF NOT EXISTS idx_template_tags_template 
  ON template_tags(template_id);

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('009_tags');
