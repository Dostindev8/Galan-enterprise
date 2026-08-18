# Galan Operations LLC — Website

Production site for **Galan Operations LLC** (freight, trucking, and logistics — Amazon Relay / OTR). Built with Next.js 15, React 19, Tailwind CSS 4, next-intl (EN default / ES), and Framer Motion.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Locale routing sends `/` to `/en` or `/es` from `Accept-Language`.

## Environment variables

Documented in `.env.example`. Never commit real secrets.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (also used for CSRF/Origin checks) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | E.164 digits for `wa.me` links |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional footer Instagram link |
| `RESEND_API_KEY` | Server-only email delivery |
| `CONTACT_TO_EMAIL` | Inbox for contact + apply notifications |
| `CONTACT_FROM_EMAIL` | Verified Resend from-address |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Optional rate-limit store; in-memory `Map()` is used if omitted |

## Forms & data

- Contact and apply posts go to `POST /api/contact`.
- Zod validation runs on the client and again on the server.
- Honeypot field `company_website` is dropped silently if filled.
- Rate limit: 5 requests / 10 minutes / IP.
- **PII:** only fields required to respond are emailed. Do not store form bodies in logs. Recommended retention: delete or de-identify inquiry email after you have responded (and any legal recordkeeping window). Document uploads are **not** in v1.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set Production env vars (see table above).
4. Attach the production domain and confirm HTTPS.

## Scripts

```bash
npm run dev        # Turbopack
npm run build
npm run lint
npm test           # Vitest
npx playwright install
npm run test:e2e
```

## Legal

Privacy Policy and Terms of Use are drafting templates. A licensed U.S. attorney should review them before treating the language as final.

## Client confirmations still open

1. Public legal address (intentionally omitted)
2. Instagram URL
3. Document uploads on the apply form (deferred to v2)
4. Attorney sign-off on legal pages
5. Verified numeric stats (years in business, fleet size, etc.)
6. Production domain
