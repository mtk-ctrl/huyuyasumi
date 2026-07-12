CREATE TABLE IF NOT EXISTS family_state (
  id TEXT PRIMARY KEY NOT NULL,
  state_json TEXT NOT NULL,
  client_updated_at INTEGER NOT NULL,
  server_updated_at INTEGER NOT NULL
);
