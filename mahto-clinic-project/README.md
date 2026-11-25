# کلینیک زیبایی مه تو (MAHTO CLINIC V2 Pro)

آرشیو کامل پروژه Cloudflare Worker، دیتابیس D1، فایل‌های استاتیک و نسخه آفلاین HTML.

## ساختار پوشه‌ها
- `src/index.js` — سورس کامل Cloudflare Worker (فرانت‌اند، پنل ادمین، API نوبت‌دهی و سرو فایل‌های KV)
- `wrangler.toml` و `package.json` — تنظیمات دیپلوی روی Cloudflare Workers
- `public/index.html` و `public/admin.html` — نسخه خروجی HTML آماده باز کردن لوکال یا آپلود روی هاست استاتیک
- `public/assets/` — تمامی تصاویر و فونت فارسی (Vazirmatn) استخراج‌شده از KV
- `database/schema.sql` و `database/backup-data.json` — ساختار جداول و بکاپ داده‌های D1
- `scripts/upload-kv-assets.sh` — اسکریپت آپلود مجدد فایل‌های `assets` در Cloudflare KV

## اجرای لوکال سریع
برای پیش‌نمایش ظاهری سایت کافیست فایل `public/index.html` را در مرورگر باز کنید.

## دیپلوی روی Cloudflare Workers
```bash
npm install
npx wrangler d1 execute SITE_DB --remote --file=database/schema.sql
bash scripts/upload-kv-assets.sh
npm run deploy
```
