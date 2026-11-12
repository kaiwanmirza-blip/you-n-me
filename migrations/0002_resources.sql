CREATE TABLE profiles (
  session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
  body TEXT NOT NULL CHECK(json_valid(body))
);
CREATE TABLE plan_versions (
  session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  version INTEGER NOT NULL CHECK(version > 0),
  body TEXT NOT NULL CHECK(json_valid(body)),
  PRIMARY KEY(session_id, plan_id, version)
);
CREATE TABLE progress_events (
  session_id TEXT NOT NULL,
  event_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  action_id TEXT NOT NULL,
  operation TEXT NOT NULL CHECK(operation IN ('complete','undo')),
  body TEXT NOT NULL CHECK(json_valid(body)),
  PRIMARY KEY(session_id,event_id),
  FOREIGN KEY(session_id,plan_id,version) REFERENCES plan_versions(session_id,plan_id,version) ON DELETE CASCADE
);
CREATE TABLE completions (
  session_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  action_id TEXT NOT NULL,
  PRIMARY KEY(session_id,plan_id,version,action_id),
  FOREIGN KEY(session_id,plan_id,version) REFERENCES plan_versions(session_id,plan_id,version) ON DELETE CASCADE
);
CREATE TABLE entitlements (
  session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
  body TEXT NOT NULL CHECK(json_valid(body))
);
