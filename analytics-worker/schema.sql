CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visited_at INTEGER NOT NULL,
  visit_day TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer_host TEXT,
  country TEXT,
  region TEXT,
  browser TEXT NOT NULL,
  device TEXT NOT NULL,
  language TEXT,
  viewport TEXT
);

CREATE INDEX IF NOT EXISTS idx_visits_day ON visits (visit_day);
CREATE INDEX IF NOT EXISTS idx_visits_hash_day ON visits (visit_day, visitor_hash);
CREATE INDEX IF NOT EXISTS idx_visits_time ON visits (visited_at);
CREATE INDEX IF NOT EXISTS idx_visits_path ON visits (path);
