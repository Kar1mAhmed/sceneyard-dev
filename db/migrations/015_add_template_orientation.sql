-- Migration: 015_add_template_orientation.sql
-- Description: Add orientation field to templates table
-- Dependencies: 007_templates.sql

PRAGMA foreign_keys = ON;

----------------------------------------------------------------
-- ADD ORIENTATION COLUMN TO TEMPLATES
-- Tracks whether template is horizontal or vertical
----------------------------------------------------------------
ALTER TABLE templates ADD COLUMN orientation TEXT DEFAULT 'horizontal' CHECK (orientation IN ('horizontal', 'vertical'));

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('015_add_template_orientation');
