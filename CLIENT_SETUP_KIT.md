# Client Setup Kit

This file is the setup material for giving the project to another website owner/developer.

## What is included

- `scripts/setup-client.mjs` — updates the project for a client's real public URL.
- `MANUAL_CLIENT_DEPLOYMENT.md` — full manual deployment and sidecar honeypot guide.
- `README.md` — project overview, safety rules, Vercel/Netlify deployment, reverse-proxy trap route example.
- `HONEYPOT_TEST_REPORT.md` — live test report from the current Vercel deployment.

## Fast setup for a new user's domain

From the project root:

```bash
npm install
npm run setup:client -- --url https://security.clientdomain.com --name "Client Honeypot" --indexnow-key auto
npm run lint
npm run build
```

Then deploy to Vercel/Netlify/Cloudflare Pages.

## What the setup command changes

The command updates:

- `index.html`
  - canonical URL
  - OpenGraph URL
  - OpenGraph image URL
  - Twitter image URL
  - site name
- `public/robots.txt`
  - sitemap location
- `public/sitemap.xml`
  - canonical URL
  - lastmod date
- optional `public/<indexnow-key>.txt`
  - IndexNow verification key

## Example

```bash
npm run setup:client -- \
  --url https://honeypot.example-client.com \
  --name "Example Client Honeypot" \
  --indexnow-key auto
```

After deployment, verify:

```bash
curl https://honeypot.example-client.com/robots.txt
curl https://honeypot.example-client.com/sitemap.xml
```

## Real honeypot setup reminder

Static hosts like Vercel can host the public dashboard/showcase, but they do not run real SSH/FTP/Telnet honeypot listeners.

For real capture, deploy a sensor on a VPS and route only suspicious paths to it through Nginx/Caddy:

```text
/.env
/.git
/wp-login.php
/wp-admin
/phpmyadmin
/adminer
/cgi-bin
/server-status
/manager/html
```

Keep the admin dashboard private behind VPN, localhost, IP allowlist, or strong authentication.

## Handoff checklist

- [ ] Client owns or authorized the target domain.
- [ ] Run `npm run setup:client -- --url https://client-domain.com --indexnow-key auto`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Deploy `dist/` through Vercel/Netlify/Cloudflare Pages.
- [ ] Verify live `/robots.txt` and `/sitemap.xml`.
- [ ] Submit sitemap in Google Search Console.
- [ ] If real honeypot mode is enabled, verify trap-path hits appear in backend logs.
