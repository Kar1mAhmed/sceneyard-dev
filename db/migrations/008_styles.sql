-- Migration: 008_styles.sql
-- Description: Create styles taxonomy and template_styles junction table
-- Dependencies: 007_templates.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- STYLES TABLE
-- Controlled list of template styles
----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS styles (
  id    TEXT PRIMARY KEY,                       -- uuid
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE
);

----------------------------------------------------------------
-- TEMPLATE_STYLES JUNCTION TABLE
-- Many-to-many relationship between templates and styles
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

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('008_styles');
