-- =============================================================================
-- MAHTO CLINIC (کلینیک زیبایی مه تو) — Relational SQLite / Cloudflare D1 Schema
-- =============================================================================

CREATE TABLE IF NOT EXISTS mahto_admin (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  salt TEXT NOT NULL,
  hash TEXT NOT NULL,
  token_secret TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_appointments (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_time TEXT DEFAULT 'تماس در اولین فرصت',
  notes TEXT DEFAULT '',
  admin_note TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'done', 'cancelled')),
  source TEXT DEFAULT 'website',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointments_status ON mahto_appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON mahto_appointments(created_at DESC);

CREATE TABLE IF NOT EXISTS mahto_services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'skin',
  badge TEXT DEFAULT '',
  description TEXT NOT NULL,
  bullets_json TEXT NOT NULL DEFAULT '[]',
  image_url TEXT DEFAULT './assets/mahto/welcome.jpg',
  reel_id TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_offers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  badge TEXT DEFAULT '',
  badge_style TEXT DEFAULT 'gold',
  old_price TEXT DEFAULT '',
  price TEXT NOT NULL,
  unit TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  service_name TEXT NOT NULL,
  reel_id TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_reels (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  badge TEXT DEFAULT '',
  title TEXT NOT NULL,
  service TEXT DEFAULT '',
  category TEXT DEFAULT 'skin',
  cat_label TEXT DEFAULT '',
  poster_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  ig_url TEXT DEFAULT 'https://www.instagram.com/mahto_clinic',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_config (
  key TEXT PRIMARY KEY,
  val TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mahto_activity_log (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT DEFAULT 'system',
  detail TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

-- Default Clinic Configuration Seed
INSERT OR IGNORE INTO mahto_config (key, val, updated_at) VALUES (
  'clinic',
  '{"name":"کلینیک زیبایی مه تو","enName":"MAHTO CLINIC · BABOL","doctor":"دکتر توحید اسماعیلی","license":"۲۳۰۲۴۹","phone1":"09201827726","phone1Display":"۰۹۲۰ ۱۸۲ ۷۷۲۶","phone2":"09001827726","phone2Display":"۰۹۰۰ ۱۸۲ ۷۷۲۶","address":"مازندران، بابل، خورشیدکلا، بلوار جانبازان، میدان شهید سجودی (میدان قاضی کتی)، ساختمان مازیار، طبقهٔ ۷، واحد ۲۹","hours":"شنبه تا پنج‌شنبه · ۱۰:۰۰ تا ۲۰:۰۰","campaignBadge":"✦ کمپین ویژه کلینیک مه تو","campaignTitle":"به‌جای بیلبورد ۳۰۰ میلیونی، هدیه‌اش را به شما دادیم!","campaignBody":"«قرار بود برای معرفی کلینیک یک بیلبورد بزرگ در شهر رزرو کنیم؛ هزینه‌اش ۳۰۰ میلیون تومان بود. تصمیم گرفتیم به‌جای تبلیغات موقت، این مبلغ را به شکل تخفیف‌ها، هدایا و آفرهای واقعی به مراجعین عزیز اختصاص دهیم؛ چون بهترین تبلیغ ما، لبخند رضایت شماست.»","links":{"instagram":"https://www.instagram.com/mahto_clinic","telegram":"https://t.me/mahto_clinic","eitaa":"https://eitaa.com/mahto_clinic","bale":"https://ble.ir/join/mahto_clinic","rubika":"https://rubika.ir/mahto_clinic","whatsapp":"https://wa.me/989201827726","neshan":"https://nshn.ir/24_bfh6w5FLSm4","gmaps":"https://www.google.com/maps/search/?api=1&query=36.54234479458029,52.67127432342055"}}',
  datetime('now')
);
