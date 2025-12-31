-- Migration: 020_fix_downloads_column.sql
-- Description: Rename video_id to template_id in downloads table for consistency
-- Dependencies: 011_downloads.sql (even if it was named incorrectly previously)

PRAGMA foreign_keys = OFF;

-- SQLite doesn't support RENAME COLUMN in older versions or some D1 environments might be tricky
-- but newer ones do. Let's try the modern way first, and if it fails, we'll do the table recreation.
-- Actually, for D1, RENAME COLUMN should work.

ALTER TABLE downloads RENAME COLUMN video_id TO template_id;

PRAGMA foreign_keys = ON;

-- Record migration
INSERT OR IGNORE INTO schema_migrations (version) 
VALUES ('020_fix_downloads_column');
