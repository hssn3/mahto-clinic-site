-- MAHTO CLINIC D1 SQLite Schema & Config Seed
-- Exported at 2026-11-25T02:28:27.450Z

CREATE TABLE IF NOT EXISTS mahto_appointments (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_time TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_admin (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  salt TEXT NOT NULL,
  hash TEXT NOT NULL,
  token_secret TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_config (
  key TEXT PRIMARY KEY,
  val TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

INSERT OR REPLACE INTO mahto_config (key, val, updated_at) VALUES ('links', '{"instagram":"https://www.instagram.com/mahto_clinic","telegram":"https://t.me/mahto_clinic","eitaa":"https://eitaa.com/mahto_clinic","bale":"https://ble.ir/join/mahto_clinic","rubika":"https://rubika.ir/mahto_clinic","neshan":"https://nshn.ir/24_bfh6w5FLSm4","gmaps":"https://www.google.com/maps/search/?api=1&query=36.54234479458029,52.67127432342055"}', '2026-11-24T23:15:38.666Z');
