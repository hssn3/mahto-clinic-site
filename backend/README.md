# بک‌اند و پنل ادمین کلینیک زیبایی مه تو (MAHTO CLINIC V3)

این پروژه با معماری **Dual-Backend** طراحی شده است و همزمان روی **Cloudflare Workers + D1**، **سرور Node.js مستقل (Doprax / Railway / ArvanCloud)** و **حالت پیش‌نمایش استاتیک (Local Sync)** کار می‌کند.

## ۱. اجرای سریع با Node.js (بدون نیاز به نصب پکیج)
```bash
npm start
# یا:
PORT=8787 node backend/server.js
```
- سایت اصلی: `http://localhost:8787/`
- پنل ادمین: `http://localhost:8787/admin.html`

## ۲. دیپلوی روی Cloudflare Workers + D1
```bash
npm install
npm run db:init
npm run deploy:cf
```

## ۳. لیست Endpoint های API
- `GET /api/health` — بررسی وضعیت سرور
- `GET /api/public/bootstrap` — دریافت تنظیمات، خدمات، آفرها و ریلزهای فعال برای صفحه اصلی
- `POST /api/appointments` — ثبت نوبت آنلاین مراجعین + صدور کد پیگیری `MHT-XXXXXX`
- `GET /api/admin/status` — وضعیت پیکربندی رمز و اعتبار توکن
- `POST /api/admin/setup` — تنظیم رمز اولیه مدیریت (PBKDF2-SHA256)
- `POST /api/admin/login` — ورود و دریافت توکن امضاشده HMAC-SHA256
- `POST /api/admin/password` — تغییر رمز عبور مدیریت
- `GET /api/admin/overview` — آمار زنده داشبورد و گزارش فعالیت‌ها
- `GET/POST/PATCH/DELETE /api/admin/appointments` — مدیریت کامل نوبت‌ها و یادداشت پذیرش
- `GET/POST/PUT/DELETE /api/admin/services` — مدیریت خدمات کلینیک
- `GET/POST/DELETE /api/admin/offers` — مدیریت آفرها و کمپین‌ها
- `GET/POST/DELETE /api/admin/reels` — مدیریت ویدیوها و ریلزها
- `GET/PUT /api/admin/config` — مدیریت اطلاعات تماس، آدرس، کمپین ۳۰۰ میلیونی و شبکه‌های اجتماعی
- `GET /api/admin/export` — خروجی بکاپ کامل JSON
