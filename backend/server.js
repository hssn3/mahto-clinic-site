#!/usr/bin/env node
/**
 * ============================================================================
 * MAHTO CLINIC (کلینیک زیبایی مه تو) — Zero-Dependency Node.js Fullstack Server
 * ============================================================================
 * Run:  node backend/server.js   (or: PORT=8787 node backend/server.js)
 * Serves static site (index.html, admin.html, assets/) + full /api/* REST API
 * Persists data safely to backend/data/mahto-db.json
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "mahto-db.json");
const PORT = Number(process.env.PORT || 8787);
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const VALID_STATUSES = new Set(["pending", "confirmed", "done", "cancelled"]);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const DEFAULT_DB = {
  admin: null,
  config: {
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
  },
  appointments: [],
  services: [],
  offers: [],
  reels: [],
  activity: [],
};

function loadDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf8");
    return structuredClone(DEFAULT_DB);
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    return {
      ...structuredClone(DEFAULT_DB),
      ...parsed,
      config: {
        ...DEFAULT_DB.config,
        ...(parsed.config || {}),
        links: { ...DEFAULT_DB.config.links, ...(parsed.config?.links || {}) },
      },
    };
  } catch {
    return structuredClone(DEFAULT_DB);
  }
}

function saveDb(db) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = DB_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), "utf8");
  fs.renameSync(tmp, DB_FILE);
}

function logActivity(db, action, actor, detail) {
  db.activity.unshift({
    id: crypto.randomUUID(),
    action,
    actor,
    detail,
    created_at: new Date().toISOString(),
  });
  db.activity = db.activity.slice(0, 100);
}

function normalizePhone(raw) {
  return String(raw || "")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[\s\-()]/g, "");
}

function hashPassword(password, saltHex) {
  return crypto.pbkdf2Sync(password, Buffer.from(saltHex, "hex"), 100000, 32, "sha256").toString("hex");
}

function signToken(secret) {
  const payload = Buffer.from(JSON.stringify({ sub: "admin", iat: Date.now(), exp: Date.now() + TOKEN_TTL_MS })).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyToken(token, secret) {
  if (!token || !secret || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return parsed.sub === "admin" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

function sendJson(req, res, data, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 2 * 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve(null); }
    });
  });
}

function isAuthed(req, db) {
  if (!db.admin) return { configured: false, authenticated: false };
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7).trim() : "";
  return { configured: true, authenticated: verifyToken(token, db.admin.token_secret) };
}

function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath);
  if (rel === "/" || rel === "") rel = "/index.html";
  if (rel === "/admin" || rel === "/admin/") rel = "/admin.html";
  const safePath = path.normalize(path.join(ROOT_DIR, rel));
  if (!safePath.startsWith(ROOT_DIR) || safePath.includes(`${path.sep}backend${path.sep}`)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }
  const ext = path.extname(safePath).toLowerCase();
  const stat = fs.statSync(safePath);

  // Support Range requests for smooth MP4 Reels streaming
  if (req.headers.range && ext === ".mp4") {
    const [s, e] = req.headers.range.replace(/bytes=/, "").split("-");
    const start = parseInt(s, 10);
    const end = e ? parseInt(e, 10) : stat.size - 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(safePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Content-Length": stat.size,
    "Accept-Ranges": "bytes",
  });
  fs.createReadStream(safePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { pathname } = url;

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": req.headers.origin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  if (!pathname.startsWith("/api/")) {
    serveStatic(req, res, pathname);
    return;
  }

  const db = loadDb();

  // Public Endpoints
  if (pathname === "/api/health" && req.method === "GET") {
    return sendJson(req, res, { ok: true, engine: "node-fullstack", clinic: db.config.name, time: new Date().toISOString() });
  }

  if (pathname === "/api/public/bootstrap" && req.method === "GET") {
    return sendJson(req, res, {
      config: db.config,
      services: db.services.filter((s) => s.is_active !== false && s.is_active !== 0),
      offers: db.offers.filter((o) => o.is_active !== false && o.is_active !== 0),
      reels: db.reels.filter((r) => r.is_active !== false && r.is_active !== 0),
    });
  }

  if (pathname === "/api/appointments" && req.method === "POST") {
    const b = await readBody(req);
    const fullName = String(b?.fullName || "").trim();
    const phone = normalizePhone(b?.phone);
    const service = String(b?.service || "").trim();
    if (fullName.length < 2) return sendJson(req, res, { error: "لطفاً نام و نام خانوادگی معتبر وارد کنید." }, 400);
    if (!/^09\d{9}$/.test(phone)) return sendJson(req, res, { error: "شماره موبایل ۱۱ رقمی معتبر نیست." }, 400);
    if (!service) return sendJson(req, res, { error: "خدمت مورد نظر را انتخاب کنید." }, 400);

    const now = new Date().toISOString();
    const appt = {
      id: crypto.randomUUID(),
      code: "MHT-" + String(Math.floor(100000 + Math.random() * 900000)),
      full_name: fullName,
      phone,
      service,
      preferred_time: String(b?.preferredTime || "تماس در اولین فرصت"),
      notes: String(b?.notes || "").trim(),
      admin_note: "",
      status: "pending",
      source: "website",
      created_at: now,
      updated_at: now,
    };
    db.appointments.unshift(appt);
    logActivity(db, "appointment.created", fullName, `ثبت نوبت آنلاین ${appt.code} — ${service}`);
    saveDb(db);
    return sendJson(req, res, { ok: true, appointment: appt }, 201);
  }

  // Admin Auth Endpoints
  if (pathname === "/api/admin/status" && req.method === "GET") {
    return sendJson(req, res, { ...isAuthed(req, db), engine: "node-fullstack" });
  }

  if (pathname === "/api/admin/setup" && req.method === "POST") {
    if (db.admin) return sendJson(req, res, { error: "رمز مدیریت قبلاً تعریف شده است." }, 409);
    const b = await readBody(req);
    const password = String(b?.password || "").trim();
    if (password.length < 8) return sendJson(req, res, { error: "رمز عبور باید حداقل ۸ کاراکتر باشد." }, 400);
    const salt = crypto.randomBytes(16).toString("hex");
    const secret = crypto.randomBytes(32).toString("hex");
    const now = new Date().toISOString();
    db.admin = { salt, hash: hashPassword(password, salt), token_secret: secret, created_at: now, updated_at: now };
    logActivity(db, "admin.setup", "admin", "تنظیم رمز عبور اولیه پنل پذیرش");
    saveDb(db);
    return sendJson(req, res, { ok: true, token: signToken(secret) });
  }

  if (pathname === "/api/admin/login" && req.method === "POST") {
    if (!db.admin) return sendJson(req, res, { error: "رمز مدیریت تنظیم نشده است." }, 400);
    const b = await readBody(req);
    const cand = hashPassword(String(b?.password || "").trim(), db.admin.salt);
    if (!crypto.timingSafeEqual(Buffer.from(cand), Buffer.from(db.admin.hash))) {
      return sendJson(req, res, { error: "رمز عبور نادرست است." }, 401);
    }
    logActivity(db, "admin.login", "admin", "ورود موفق به پنل مدیریت");
    saveDb(db);
    return sendJson(req, res, { ok: true, token: signToken(db.admin.token_secret) });
  }

  // Protected Admin Routes
  if (pathname.startsWith("/api/admin/")) {
    const auth = isAuthed(req, db);
    if (!auth.authenticated) return sendJson(req, res, { error: "دسترسی غیرمجاز." }, 401);

    if (pathname === "/api/admin/password" && req.method === "POST") {
      const b = await readBody(req);
      const cur = hashPassword(String(b?.currentPassword || "").trim(), db.admin.salt);
      if (!crypto.timingSafeEqual(Buffer.from(cur), Buffer.from(db.admin.hash))) {
        return sendJson(req, res, { error: "رمز عبور فعلی صحیح نیست." }, 401);
      }
      const next = String(b?.newPassword || "").trim();
      if (next.length < 8) return sendJson(req, res, { error: "رمز جدید باید حداقل ۸ کاراکتر باشد." }, 400);
      const salt = crypto.randomBytes(16).toString("hex");
      const secret = crypto.randomBytes(32).toString("hex");
      db.admin = { ...db.admin, salt, hash: hashPassword(next, salt), token_secret: secret, updated_at: new Date().toISOString() };
      logActivity(db, "admin.password_changed", "admin", "تغییر رمز عبور مدیریت");
      saveDb(db);
      return sendJson(req, res, { ok: true, token: signToken(secret) });
    }

    if (pathname === "/api/admin/overview" && req.method === "GET") {
      const todayPrefix = new Date().toISOString().slice(0, 10);
      const stats = { total: db.appointments.length, pending: 0, confirmed: 0, done: 0, cancelled: 0, today: 0 };
      const serviceCounts = {};
      for (const a of db.appointments) {
        if (stats[a.status] !== undefined) stats[a.status]++;
        if (String(a.created_at || "").startsWith(todayPrefix)) stats.today++;
        serviceCounts[a.service] = (serviceCounts[a.service] || 0) + 1;
      }
      return sendJson(req, res, {
        stats,
        serviceCounts,
        cmsCounts: { services: db.services.length, offers: db.offers.length, reels: db.reels.length },
        activity: db.activity.slice(0, 20),
      });
    }

    if (pathname === "/api/admin/appointments") {
      if (req.method === "GET") {
        const status = url.searchParams.get("status") || "";
        const q = (url.searchParams.get("q") || "").trim().toLowerCase();
        let list = db.appointments;
        if (status && VALID_STATUSES.has(status)) list = list.filter((a) => a.status === status);
        if (q) {
          list = list.filter((a) =>
            a.full_name.toLowerCase().includes(q) || a.phone.includes(q) || a.code.toLowerCase().includes(q) || a.service.toLowerCase().includes(q)
          );
        }
        return sendJson(req, res, { appointments: list });
      }
      if (req.method === "POST") {
        const b = await readBody(req);
        const now = new Date().toISOString();
        const appt = {
          id: crypto.randomUUID(),
          code: "MHT-" + String(Math.floor(100000 + Math.random() * 900000)),
          full_name: String(b?.fullName || "").trim(),
          phone: normalizePhone(b?.phone),
          service: String(b?.service || "").trim(),
          preferred_time: String(b?.preferredTime || "تماس در اولین فرصت"),
          notes: String(b?.notes || ""),
          admin_note: String(b?.adminNote || ""),
          status: VALID_STATUSES.has(b?.status) ? b.status : "confirmed",
          source: "admin",
          created_at: now,
          updated_at: now,
        };
        db.appointments.unshift(appt);
        logActivity(db, "appointment.manual_add", "admin", `ثبت دستی ${appt.code} برای ${appt.full_name}`);
        saveDb(db);
        return sendJson(req, res, { ok: true, id: appt.id, code: appt.code }, 201);
      }
    }

    if (pathname.startsWith("/api/admin/appointments/")) {
      const id = decodeURIComponent(pathname.slice("/api/admin/appointments/".length));
      const idx = db.appointments.findIndex((a) => a.id === id);
      if (idx === -1) return sendJson(req, res, { error: "نوبت یافت نشد." }, 404);
      if (req.method === "PATCH") {
        const b = await readBody(req);
        const cur = db.appointments[idx];
        db.appointments[idx] = {
          ...cur,
          status: b?.status && VALID_STATUSES.has(b.status) ? b.status : cur.status,
          admin_note: b?.adminNote !== undefined ? String(b.adminNote) : cur.admin_note,
          preferred_time: b?.preferredTime !== undefined ? String(b.preferredTime) : cur.preferred_time,
          service: b?.service !== undefined ? String(b.service) : cur.service,
          updated_at: new Date().toISOString(),
        };
        logActivity(db, "appointment.updated", "admin", `بروزرسانی ${cur.code} → ${db.appointments[idx].status}`);
        saveDb(db);
        return sendJson(req, res, { ok: true });
      }
      if (req.method === "DELETE") {
        const [removed] = db.appointments.splice(idx, 1);
        logActivity(db, "appointment.deleted", "admin", `حذف نوبت ${removed.code}`);
        saveDb(db);
        return sendJson(req, res, { ok: true });
      }
    }

    // Generic CMS array handlers (services, offers, reels)
    for (const col of ["services", "offers", "reels"]) {
      if (pathname === `/api/admin/${col}`) {
        if (req.method === "GET") return sendJson(req, res, { [col]: db[col] });
        if (req.method === "POST") {
          const b = await readBody(req);
          const id = b?.id || `${col.slice(0, 3)}-${crypto.randomBytes(4).toString("hex")}`;
          const item = { ...b, id, updated_at: new Date().toISOString() };
          const idx = db[col].findIndex((x) => x.id === id);
          if (idx >= 0) db[col][idx] = item;
          else db[col].push(item);
          logActivity(db, `${col}.saved`, "admin", `ذخیره آیتم در ${col}: ${b?.title || id}`);
          saveDb(db);
          return sendJson(req, res, { ok: true, id }, 201);
        }
      }
      if (pathname.startsWith(`/api/admin/${col}/`)) {
        const id = decodeURIComponent(pathname.slice(`/api/admin/${col}/`.length));
        if (req.method === "DELETE") {
          db[col] = db[col].filter((x) => x.id !== id);
          saveDb(db);
          return sendJson(req, res, { ok: true });
        }
      }
    }

    if (pathname === "/api/admin/config") {
      if (req.method === "GET") return sendJson(req, res, { config: db.config });
      if (req.method === "PUT") {
        const b = await readBody(req);
        db.config = { ...db.config, ...(b || {}), links: { ...db.config.links, ...(b?.links || {}) } };
        logActivity(db, "config.updated", "admin", "بروزرسانی تنظیمات کلینیک");
        saveDb(db);
        return sendJson(req, res, { ok: true, config: db.config });
      }
    }

    if (pathname === "/api/admin/export" && req.method === "GET") {
      return sendJson(req, res, { exportedAt: new Date().toISOString(), ...db, admin: undefined });
    }
  }

  return sendJson(req, res, { error: "مسیر API یافت نشد." }, 404);
});

server.listen(PORT, () => {
  console.log(`🌙 MAHTO CLINIC Fullstack Server running at http://localhost:${PORT}`);
  console.log(`   Site:  http://localhost:${PORT}/`);
  console.log(`   Admin: http://localhost:${PORT}/admin.html`);
});
