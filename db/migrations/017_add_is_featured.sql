-- Migration number: 016 	 2025-12-15T12:00:00.000Z
-- Description: Add is_featured column to templates table

ALTER TABLE templates ADD COLUMN is_featured INTEGER DEFAULT 0;
