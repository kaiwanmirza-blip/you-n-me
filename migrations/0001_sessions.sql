-- Shared SQLite / intended D1 schema. Application timestamps are UTC epoch milliseconds.
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  CHECK (expires_at > created_at)
);
CREATE INDEX sessions_expiry ON sessions(expires_at);
