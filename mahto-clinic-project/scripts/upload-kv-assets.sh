#!/usr/bin/env bash
# Upload all static assets into Cloudflare KV (SITE_KV)
set -euo pipefail

npx wrangler kv key put --binding=SITE_KV "/assets/fonts/vazirmatn-var.woff2" --path="public/assets/fonts/vazirmatn-var.woff2" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/botox-care.jpg" --path="public/assets/mahto/botox-care.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/brand-logo.jpg" --path="public/assets/mahto/brand-logo.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/chin-filler.jpg" --path="public/assets/mahto/chin-filler.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/filler-myth.jpg" --path="public/assets/mahto/filler-myth.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/hair-filler-1.jpg" --path="public/assets/mahto/hair-filler-1.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/hair-filler-2.jpg" --path="public/assets/mahto/hair-filler-2.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/laser-before-after.jpg" --path="public/assets/mahto/laser-before-after.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/laser-cycle.jpg" --path="public/assets/mahto/laser-cycle.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/laser-protocol.jpg" --path="public/assets/mahto/laser-protocol.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/profile.jpg" --path="public/assets/mahto/profile.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/soprano-intro.jpg" --path="public/assets/mahto/soprano-intro.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/soprano-tech.jpg" --path="public/assets/mahto/soprano-tech.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/undereye.jpg" --path="public/assets/mahto/undereye.jpg" --remote
npx wrangler kv key put --binding=SITE_KV "/assets/mahto/welcome.jpg" --path="public/assets/mahto/welcome.jpg" --remote
