-- Migration: Create contacts table
-- Description: Stores contact form submissions for support and outreach.

CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread', -- 'unread', 'read', 'replied'
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

-- Index for filtering by status and date
CREATE INDEX IF NOT EXISTS idx_contacts_status_created ON contacts(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
