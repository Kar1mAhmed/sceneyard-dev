-- Migration: 022_restore_downloads_trigger.sql
-- Description: Restore downloads trigger after table recreation

DROP TRIGGER IF EXISTS downloads_after_insert;

CREATE TRIGGER IF NOT EXISTS downloads_after_insert
AFTER INSERT ON downloads
BEGIN
  UPDATE templates SET downloads_count = downloads_count + 1 WHERE id = NEW.template_id;
END;

INSERT OR IGNORE INTO schema_migrations (version) VALUES ('022_restore_downloads_trigger');
