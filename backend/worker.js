/**
 * ============================================================================
 * MAHTO CLINIC (کلینیک زیبایی مه تو) — Cloudflare Workers + D1 Backend API
 * ============================================================================
 * Bindings expected in wrangler.toml:
 *   - SITE_DB : Cloudflare D1 Database
 *   - ASSETS  : Static site assets (index.html, admin.html, style.css, app.js, assets/)
 *   - SITE_KV : (Optional) Legacy KV fallback for assets
 */

const VALID_STATUSES = new Set(["pending", "confirmed", "done", "cancelled"]);
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const DEFAULT_CLINIC_CONFIG = {
  name: "کلینیک زیبایی مه تو",
  enName: "MAHTO CLINIC · BABOL",
  doctor: "دکتر توحید اسماعیلی",
  license: "۲۳۰۲۴۹",
  phone1: "09201827726",
  phone1Display: "۰۹۲۰ ۱۸۲ ۷۷۲۶",
  phone2: "09001827726",
  phone2Display: "۰۹۰۰ ۱۸۲ ۷۷۲۶",
  address: "مازندران، بابل، خورشیدکلا، بلوار جانبازان، میدان شهید سجودی (میدان قاضی کتی)، ساختمان مازیار، طبقهٔ ۷، واحد ۲۹",
  hours: "شنبه تا پنج‌شنبه · ۱۰:۰۰ تا ۲۰:۰۰",
  campaignBadge: "✦ کمپین ویژه کلینیک مه تو",
  campaignTitle: "به‌جای بیلبورد ۳۰۰ میلیونی، هدیه‌اش را به شما دادیم!",
  campaignBody:
    "«قرار بود برای معرفی کلینیک یک بیلبورد بزرگ در شهر رزرو کنیم؛ هزینه‌اش ۳۰۰ میلیون تومان بود. تصمیم گرفتیم به‌جای تبلیغات موقت، این مبلغ را به شکل تخفیف‌ها، هدایا و آفرهای واقعی به مراجعین عزیز اختصاص دهیم؛ چون بهترین تبلیغ ما، لبخند رضایت شماست.»",
  links: {
    instagram: "https://www.instagram.com/mahto_clinic",
    telegram: "https://t.me/mahto_clinic",
    eitaa: "https://eitaa.com/mahto_clinic",
    bale: "https://ble.ir/join/mahto_clinic",
    rubika: "https://rubika.ir/mahto_clinic",
    whatsapp: "https://wa.me/989201827726",
    neshan: "https://nshn.ir/24_bfh6w5FLSm4",
    gmaps: "https://www.google.com/maps/search/?api=1&query=36.54234479458029,52.67127432342055",
  },
};

function corsHeaders(req) {
  const origin = req.headers.get("Origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function json(req, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(req),
    },
  });
}

function normalizePhone(raw) {
  return String(raw || "")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[\s\-()]/g, "");
}

function toHex(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return arr;
}

function randomHex(bytes = 16) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return toHex(arr);
}

function b64urlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: fromHex(saltHex), iterations: 100000, hash: "SHA-256" },
    key,
    256
  );
  return toHex(bits);
}

async function signToken(secretHex) {
  const payload = b64urlEncode(JSON.stringify({ sub: "admin", iat: Date.now(), exp: Date.now() + TOKEN_TTL_MS }));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretHex),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(sig)}`;
}

async function verifyToken(token, secretHex) {
  if (!token || !secretHex || !token.includes(".")) return false;
  const [payload, sigHex] = token.split(".");
  if (!payload || !sigHex) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretHex),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expectedSig = toHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  if (!timingSafeEqual(sigHex, expectedSig)) return false;
  try {
    const parsed = JSON.parse(b64urlDecode(payload));
    return parsed && parsed.sub === "admin" && typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_admin (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      salt TEXT NOT NULL,
      hash TEXT NOT NULL,
      token_secret TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_appointments (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      preferred_time TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      admin_note TEXT DEFAULT '',
      status TEXT DEFAULT 'pending',
      source TEXT DEFAULT 'website',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_services (
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
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_offers (
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
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_reels (
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
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_config (
      key TEXT PRIMARY KEY,
      val TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS mahto_activity_log (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      actor TEXT DEFAULT 'system',
      detail TEXT DEFAULT '',
      created_at TEXT NOT NULL
    )`),
  ]);
  schemaReady = true;
}

async function logActivity(db, action, actor, detail) {
  try {
    await db
      .prepare("INSERT INTO mahto_activity_log (id, action, actor, detail, created_at) VALUES (?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), action, actor, detail, new Date().toISOString())
      .run();
  } catch {}
}

async function getAdminRow(db) {
  return await db.prepare("SELECT * FROM mahto_admin WHERE id = 1").first();
}

async function isAuthenticated(req, db) {
  const admin = await getAdminRow(db);
  if (!admin) return { configured: false, authenticated: false, admin: null };
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const ok = await verifyToken(token, admin.token_secret);
  return { configured: true, authenticated: ok, admin };
}

async function readJsonBody(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

async function getClinicConfig(db) {
  const row = await db.prepare("SELECT val FROM mahto_config WHERE key = 'clinic'").first();
  if (!row) return DEFAULT_CLINIC_CONFIG;
  try {
    const parsed = JSON.parse(row.val);
    return { ...DEFAULT_CLINIC_CONFIG, ...parsed, links: { ...DEFAULT_CLINIC_CONFIG.links, ...(parsed.links || {}) } };
  } catch {
    return DEFAULT_CLINIC_CONFIG;
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const { pathname } = url;

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req) });
    }

    // Serve API routes
    if (pathname.startsWith("/api/")) {
      const db = env.SITE_DB;
      if (!db) {
        return json(req, { error: "دیتابیس SITE_DB در تنظیمات Worker متصل نیست." }, 500);
      }

      try {
        await ensureSchema(db);

        // 1. Health Check
        if (pathname === "/api/health" && req.method === "GET") {
          return json(req, { ok: true, engine: "cloudflare-d1", clinic: "کلینیک زیبایی مه تو", time: new Date().toISOString() });
        }

        // 2. Public Bootstrap (Dynamic CMS data for index.html)
        if (pathname === "/api/public/bootstrap" && req.method === "GET") {
          const [config, svcRes, offerRes, reelRes] = await Promise.all([
            getClinicConfig(db),
            db.prepare("SELECT * FROM mahto_services WHERE is_active = 1 ORDER BY sort_order ASC, updated_at DESC").all(),
            db.prepare("SELECT * FROM mahto_offers WHERE is_active = 1 ORDER BY sort_order ASC, updated_at DESC").all(),
            db.prepare("SELECT * FROM mahto_reels WHERE is_active = 1 ORDER BY sort_order ASC, updated_at DESC").all(),
          ]);

          const services = (svcRes.results || []).map((s) => ({
            ...s,
            bullets: (() => { try { return JSON.parse(s.bullets_json || "[]"); } catch { return []; } })(),
          }));

          return json(req, {
            config,
            services,
            offers: offerRes.results || [],
            reels: reelRes.results || [],
          });
        }

        // 3. Public Appointment Booking
        if (pathname === "/api/appointments" && req.method === "POST") {
          const body = await readJsonBody(req);
          if (!body) return json(req, { error: "فرمت درخواست نامعتبر است." }, 400);

          const fullName = String(body.fullName || "").trim();
          const phone = normalizePhone(body.phone);
          const service = String(body.service || "").trim();
          const preferredTime = String(body.preferredTime || "تماس در اولین فرصت").trim();
          const notes = String(body.notes || "").trim().slice(0, 600);

          if (fullName.length < 2) return json(req, { error: "لطفاً نام و نام خانوادگی معتبر وارد کنید." }, 400);
          if (!/^09\d{9}$/.test(phone)) return json(req, { error: "لطفاً شماره موبایل ۱۱ رقمی معتبر (شروع با ۰۹) وارد کنید." }, 400);
          if (!service) return json(req, { error: "لطفاً خدمت مورد نظر را انتخاب کنید." }, 400);

          const id = crypto.randomUUID();
          const code = "MHT-" + String(Math.floor(100000 + Math.random() * 900000));
          const now = new Date().toISOString();

          await db
            .prepare(
              `INSERT INTO mahto_appointments
               (id, code, full_name, phone, service, preferred_time, notes, admin_note, status, source, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, '', 'pending', 'website', ?, ?)`
            )
            .bind(id, code, fullName, phone, service, preferredTime, notes, now, now)
            .run();

          await logActivity(db, "appointment.created", fullName, `ثبت نوبت آنلاین ${code} — ${service}`);

          return json(
            req,
            {
              ok: true,
              appointment: { id, code, full_name: fullName, phone, service, preferred_time: preferredTime, notes, status: "pending", created_at: now },
            },
            201
          );
        }

        // 4. Admin Auth Status
        if (pathname === "/api/admin/status" && req.method === "GET") {
          const st = await isAuthenticated(req, db);
          return json(req, { configured: st.configured, authenticated: st.authenticated, engine: "cloudflare-d1" });
        }

        // 5. Admin First-Time Setup
        if (pathname === "/api/admin/setup" && req.method === "POST") {
          const existing = await getAdminRow(db);
          if (existing) return json(req, { error: "رمز مدیریت قبلاً تنظیم شده است. لطفاً وارد شوید." }, 409);

          const body = await readJsonBody(req);
          const password = String(body?.password || "").trim();
          if (password.length < 8) return json(req, { error: "رمز عبور باید حداقل ۸ کاراکتر باشد." }, 400);

          const salt = randomHex(16);
          const hash = await hashPassword(password, salt);
          const secret = randomHex(32);
          const now = new Date().toISOString();

          await db
            .prepare("INSERT INTO mahto_admin (id, salt, hash, token_secret, created_at, updated_at) VALUES (1, ?, ?, ?, ?, ?)")
            .bind(salt, hash, secret, now, now)
            .run();

          await logActivity(db, "admin.setup", "admin", "تنظیم رمز عبور اولیه پنل پذیرش");
          const token = await signToken(secret);
          return json(req, { ok: true, token });
        }

        // 6. Admin Login
        if (pathname === "/api/admin/login" && req.method === "POST") {
          const admin = await getAdminRow(db);
          if (!admin) return json(req, { error: "هنوز رمز مدیریت تعریف نشده است." }, 400);

          const body = await readJsonBody(req);
          const password = String(body?.password || "").trim();
          const candidate = await hashPassword(password, admin.salt);
          if (!timingSafeEqual(candidate, admin.hash)) {
            return json(req, { error: "رمز عبور نادرست است." }, 401);
          }

          const token = await signToken(admin.token_secret);
          await logActivity(db, "admin.login", "admin", "ورود موفق به پنل مدیریت");
          return json(req, { ok: true, token });
        }

        // --- All routes below require Admin Authentication ---
        if (pathname.startsWith("/api/admin/")) {
          const auth = await isAuthenticated(req, db);
          if (!auth.authenticated) {
            return json(req, { error: "دسترسی غیرمجاز. لطفاً دوباره وارد پنل شوید." }, 401);
          }

          // Change password
          if (pathname === "/api/admin/password" && req.method === "POST") {
            const body = await readJsonBody(req);
            const currentPassword = String(body?.currentPassword || "").trim();
            const newPassword = String(body?.newPassword || "").trim();
            if (newPassword.length < 8) return json(req, { error: "رمز جدید باید حداقل ۸ کاراکتر باشد." }, 400);

            const check = await hashPassword(currentPassword, auth.admin.salt);
            if (!timingSafeEqual(check, auth.admin.hash)) {
              return json(req, { error: "رمز عبور فعلی صحیح نیست." }, 401);
            }

            const salt = randomHex(16);
            const hash = await hashPassword(newPassword, salt);
            const secret = randomHex(32);
            const now = new Date().toISOString();

            await db
              .prepare("UPDATE mahto_admin SET salt = ?, hash = ?, token_secret = ?, updated_at = ? WHERE id = 1")
              .bind(salt, hash, secret, now)
              .run();

            await logActivity(db, "admin.password_changed", "admin", "تغییر رمز عبور مدیریت");
            const token = await signToken(secret);
            return json(req, { ok: true, token });
          }

          // Overview KPIs
          if (pathname === "/api/admin/overview" && req.method === "GET") {
            const [allAppts, actRes, svcCount, offerCount, reelCount] = await Promise.all([
              db.prepare("SELECT status, service, created_at FROM mahto_appointments").all(),
              db.prepare("SELECT * FROM mahto_activity_log ORDER BY created_at DESC LIMIT 20").all(),
              db.prepare("SELECT COUNT(*) as c FROM mahto_services").first(),
              db.prepare("SELECT COUNT(*) as c FROM mahto_offers").first(),
              db.prepare("SELECT COUNT(*) as c FROM mahto_reels").first(),
            ]);

            const list = allAppts.results || [];
            const todayPrefix = new Date().toISOString().slice(0, 10);
            const stats = { total: list.length, pending: 0, confirmed: 0, done: 0, cancelled: 0, today: 0 };
            const serviceCounts = {};
            for (const row of list) {
              if (stats[row.status] !== undefined) stats[row.status]++;
              if (String(row.created_at || "").startsWith(todayPrefix)) stats.today++;
              serviceCounts[row.service] = (serviceCounts[row.service] || 0) + 1;
            }

            return json(req, {
              stats,
              serviceCounts,
              cmsCounts: {
                services: svcCount?.c || 0,
                offers: offerCount?.c || 0,
                reels: reelCount?.c || 0,
              },
              activity: actRes.results || [],
            });
          }

          // Appointments List & Manual Creation
          if (pathname === "/api/admin/appointments") {
            if (req.method === "GET") {
              const status = url.searchParams.get("status") || "";
              const q = (url.searchParams.get("q") || "").trim().toLowerCase();
              const res = await db.prepare("SELECT * FROM mahto_appointments ORDER BY created_at DESC").all();
              let items = res.results || [];
              if (status && VALID_STATUSES.has(status)) {
                items = items.filter((a) => a.status === status);
              }
              if (q) {
                items = items.filter(
                  (a) =>
                    String(a.full_name).toLowerCase().includes(q) ||
                    String(a.phone).includes(q) ||
                    String(a.code).toLowerCase().includes(q) ||
                    String(a.service).toLowerCase().includes(q)
                );
              }
              return json(req, { appointments: items });
            }

            if (req.method === "POST") {
              const body = await readJsonBody(req);
              const fullName = String(body?.fullName || "").trim();
              const phone = normalizePhone(body?.phone);
              const service = String(body?.service || "").trim();
              const preferredTime = String(body?.preferredTime || "تماس در اولین فرصت").trim();
              const notes = String(body?.notes || "").trim();
              const adminNote = String(body?.adminNote || "").trim();
              const status = VALID_STATUSES.has(body?.status) ? body.status : "confirmed";

              if (fullName.length < 2 || !/^09\d{9}$/.test(phone) || !service) {
                return json(req, { error: "اطلاعات مراجعه‌کننده کامل یا معتبر نیست." }, 400);
              }

              const id = crypto.randomUUID();
              const code = "MHT-" + String(Math.floor(100000 + Math.random() * 900000));
              const now = new Date().toISOString();

              await db
                .prepare(
                  `INSERT INTO mahto_appointments
                   (id, code, full_name, phone, service, preferred_time, notes, admin_note, status, source, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'admin', ?, ?)`
                )
                .bind(id, code, fullName, phone, service, preferredTime, notes, adminNote, status, now, now)
                .run();

              await logActivity(db, "appointment.manual_add", "admin", `ثبت دستی نوبت ${code} برای ${fullName}`);
              return json(req, { ok: true, id, code }, 201);
            }
          }

          // Appointment Update / Delete
          if (pathname.startsWith("/api/admin/appointments/")) {
            const id = decodeURIComponent(pathname.slice("/api/admin/appointments/".length));
            if (req.method === "PATCH") {
              const body = await readJsonBody(req);
              const existing = await db.prepare("SELECT * FROM mahto_appointments WHERE id = ?").bind(id).first();
              if (!existing) return json(req, { error: "نوبت مورد نظر یافت نشد." }, 404);

              const status = body?.status && VALID_STATUSES.has(body.status) ? body.status : existing.status;
              const adminNote = body?.adminNote !== undefined ? String(body.adminNote) : existing.admin_note;
              const preferredTime = body?.preferredTime !== undefined ? String(body.preferredTime) : existing.preferred_time;
              const service = body?.service !== undefined ? String(body.service) : existing.service;
              const now = new Date().toISOString();

              await db
                .prepare("UPDATE mahto_appointments SET status = ?, admin_note = ?, preferred_time = ?, service = ?, updated_at = ? WHERE id = ?")
                .bind(status, adminNote, preferredTime, service, now, id)
                .run();

              await logActivity(db, "appointment.updated", "admin", `بروزرسانی نوبت ${existing.code} به وضعیت ${status}`);
              return json(req, { ok: true });
            }

            if (req.method === "DELETE") {
              await db.prepare("DELETE FROM mahto_appointments WHERE id = ?").bind(id).run();
              await logActivity(db, "appointment.deleted", "admin", `حذف نوبت ${id.slice(0, 8)}`);
              return json(req, { ok: true });
            }
          }

          // Services CRUD
          if (pathname === "/api/admin/services") {
            if (req.method === "GET") {
              const res = await db.prepare("SELECT * FROM mahto_services ORDER BY sort_order ASC, updated_at DESC").all();
              return json(req, {
                services: (res.results || []).map((s) => ({
                  ...s,
                  bullets: (() => { try { return JSON.parse(s.bullets_json || "[]"); } catch { return []; } })(),
                })),
              });
            }
            if (req.method === "POST") {
              const b = await readJsonBody(req);
              if (!b?.title || !b?.description) return json(req, { error: "عنوان و توضیحات خدمت الزامی است." }, 400);
              const id = b.id || "svc-" + randomHex(4);
              const now = new Date().toISOString();
              const bullets = Array.isArray(b.bullets) ? b.bullets : [];
              await db
                .prepare(
                  `INSERT OR REPLACE INTO mahto_services
                   (id, title, category, badge, description, bullets_json, image_url, reel_id, sort_order, is_active, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                )
                .bind(
                  id,
                  String(b.title).trim(),
                  String(b.category || "skin"),
                  String(b.badge || ""),
                  String(b.description).trim(),
                  JSON.stringify(bullets),
                  String(b.image_url || "./assets/mahto/welcome.jpg"),
                  String(b.reel_id || ""),
                  Number(b.sort_order || 0),
                  b.is_active === false || b.is_active === 0 ? 0 : 1,
                  now
                )
                .run();
              await logActivity(db, "service.saved", "admin", `ذخیره خدمت: ${b.title}`);
              return json(req, { ok: true, id }, 201);
            }
          }

          if (pathname.startsWith("/api/admin/services/")) {
            const id = decodeURIComponent(pathname.slice("/api/admin/services/".length));
            if (req.method === "PUT") {
              const b = await readJsonBody(req);
              const now = new Date().toISOString();
              const bullets = Array.isArray(b?.bullets) ? b.bullets : [];
              await db
                .prepare(
                  `UPDATE mahto_services
                   SET title=?, category=?, badge=?, description=?, bullets_json=?, image_url=?, reel_id=?, sort_order=?, is_active=?, updated_at=?
                   WHERE id=?`
                )
                .bind(
                  String(b?.title || "").trim(),
                  String(b?.category || "skin"),
                  String(b?.badge || ""),
                  String(b?.description || "").trim(),
                  JSON.stringify(bullets),
                  String(b?.image_url || "./assets/mahto/welcome.jpg"),
                  String(b?.reel_id || ""),
                  Number(b?.sort_order || 0),
                  b?.is_active === false || b?.is_active === 0 ? 0 : 1,
                  now,
                  id
                )
                .run();
              return json(req, { ok: true });
            }
            if (req.method === "DELETE") {
              await db.prepare("DELETE FROM mahto_services WHERE id = ?").bind(id).run();
              return json(req, { ok: true });
            }
          }

          // Offers CRUD
          if (pathname === "/api/admin/offers") {
            if (req.method === "GET") {
              const res = await db.prepare("SELECT * FROM mahto_offers ORDER BY sort_order ASC, updated_at DESC").all();
              return json(req, { offers: res.results || [] });
            }
            if (req.method === "POST") {
              const b = await readJsonBody(req);
              if (!b?.title || !b?.price) return json(req, { error: "عنوان و مبلغ آفر الزامی است." }, 400);
              const id = b.id || "off-" + randomHex(4);
              const now = new Date().toISOString();
              await db
                .prepare(
                  `INSERT OR REPLACE INTO mahto_offers
                   (id, title, badge, badge_style, old_price, price, unit, subtitle, service_name, reel_id, sort_order, is_active, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                )
                .bind(
                  id,
                  String(b.title).trim(),
                  String(b.badge || ""),
                  String(b.badge_style || "gold"),
                  String(b.old_price || ""),
                  String(b.price).trim(),
                  String(b.unit || ""),
                  String(b.subtitle || ""),
                  String(b.service_name || b.title),
                  String(b.reel_id || ""),
                  Number(b.sort_order || 0),
                  b.is_active === false || b.is_active === 0 ? 0 : 1,
                  now
                )
                .run();
              await logActivity(db, "offer.saved", "admin", `ذخیره آفر: ${b.title}`);
              return json(req, { ok: true, id }, 201);
            }
          }

          if (pathname.startsWith("/api/admin/offers/")) {
            const id = decodeURIComponent(pathname.slice("/api/admin/offers/".length));
            if (req.method === "DELETE") {
              await db.prepare("DELETE FROM mahto_offers WHERE id = ?").bind(id).run();
              return json(req, { ok: true });
            }
          }

          // Reels CRUD
          if (pathname === "/api/admin/reels") {
            if (req.method === "GET") {
              const res = await db.prepare("SELECT * FROM mahto_reels ORDER BY sort_order ASC, updated_at DESC").all();
              return json(req, { reels: res.results || [] });
            }
            if (req.method === "POST") {
              const b = await readJsonBody(req);
              if (!b?.title || !b?.video_url) return json(req, { error: "عنوان و آدرس ویدیو الزامی است." }, 400);
              const id = b.id || "reel-" + randomHex(4);
              const now = new Date().toISOString();
              await db
                .prepare(
                  `INSERT OR REPLACE INTO mahto_reels
                   (id, label, badge, title, service, category, cat_label, poster_url, video_url, ig_url, description, sort_order, is_active, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                )
                .bind(
                  id,
                  String(b.label || b.title).slice(0, 32),
                  String(b.badge || "🎬 ریلز مه تو"),
                  String(b.title).trim(),
                  String(b.service || ""),
                  String(b.category || "skin"),
                  String(b.cat_label || "ریلز کلینیک"),
                  String(b.poster_url || "./assets/mahto/welcome.jpg"),
                  String(b.video_url).trim(),
                  String(b.ig_url || "https://www.instagram.com/mahto_clinic"),
                  String(b.description || ""),
                  Number(b.sort_order || 0),
                  b.is_active === false || b.is_active === 0 ? 0 : 1,
                  now
                )
                .run();
              await logActivity(db, "reel.saved", "admin", `ذخیره ریلز: ${b.title}`);
              return json(req, { ok: true, id }, 201);
            }
          }

          if (pathname.startsWith("/api/admin/reels/")) {
            const id = decodeURIComponent(pathname.slice("/api/admin/reels/".length));
            if (req.method === "DELETE") {
              await db.prepare("DELETE FROM mahto_reels WHERE id = ?").bind(id).run();
              return json(req, { ok: true });
            }
          }

          // Config Get / Put
          if (pathname === "/api/admin/config") {
            if (req.method === "GET") {
              return json(req, { config: await getClinicConfig(db) });
            }
            if (req.method === "PUT") {
              const body = await readJsonBody(req);
              const current = await getClinicConfig(db);
              const merged = {
                ...current,
                ...(body || {}),
                links: { ...current.links, ...(body?.links || {}) },
              };
              const now = new Date().toISOString();
              await db
                .prepare("INSERT OR REPLACE INTO mahto_config (key, val, updated_at) VALUES ('clinic', ?, ?)")
                .bind(JSON.stringify(merged), now)
                .run();
              await logActivity(db, "config.updated", "admin", "بروزرسانی تنظیمات کلینیک و لینک‌ها");
              return json(req, { ok: true, config: merged });
            }
          }

          // Full JSON Export
          if (pathname === "/api/admin/export" && req.method === "GET") {
            const [config, appointments, services, offers, reels, activity] = await Promise.all([
              getClinicConfig(db),
              db.prepare("SELECT * FROM mahto_appointments ORDER BY created_at DESC").all(),
              db.prepare("SELECT * FROM mahto_services ORDER BY sort_order ASC").all(),
              db.prepare("SELECT * FROM mahto_offers ORDER BY sort_order ASC").all(),
              db.prepare("SELECT * FROM mahto_reels ORDER BY sort_order ASC").all(),
              db.prepare("SELECT * FROM mahto_activity_log ORDER BY created_at DESC LIMIT 100").all(),
            ]);
            return json(req, {
              exportedAt: new Date().toISOString(),
              clinic: "MAHTO CLINIC",
              config,
              appointments: appointments.results || [],
              services: services.results || [],
              offers: offers.results || [],
              reels: reels.results || [],
              activity: activity.results || [],
            });
          }

          return json(req, { error: "مسیر API یافت نشد." }, 404);
        }

        return json(req, { error: "مسیر API یافت نشد." }, 404);
      } catch (err) {
        return json(req, { error: "خطای داخلی سرور", detail: String(err?.message || err) }, 500);
      }
    }

    // Rewrite clean /admin -> /admin.html
    if (pathname === "/admin" || pathname === "/admin/") {
      const adminUrl = new URL("/admin.html", req.url);
      if (env.ASSETS) return env.ASSETS.fetch(new Request(adminUrl, req));
    }

    // Serve static files via Workers Static Assets binding
    if (env.ASSETS) {
      return env.ASSETS.fetch(req);
    }

    return new Response("Mahto Clinic Backend Active. Bind ASSETS in wrangler.toml to serve static files.", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
