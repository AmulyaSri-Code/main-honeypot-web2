# Manual Deployment Guide for Other Users

This guide explains how to manually deploy the Honeypot Cybersecurity website for another website owner or client.

Use this only for websites/infrastructure you own or have permission to monitor.

## Deployment models

There are two safe ways to deploy this for other users:

1. Public showcase website only
   - Deploys the cybersecurity landing/dashboard UI.
   - Good for marketing, demos, portfolios, and awareness.
   - Does not prove real attacker capture unless connected to a backend.

2. Real honeypot sidecar deployment
   - Keeps the real website running normally.
   - Routes only suspicious trap paths to a private honeypot sensor.
   - Keeps dashboard/admin APIs private.

Recommended architecture:

```text
Internet -> Nginx/Caddy/Cloudflare -> real website backend
                               -> suspicious paths -> honeypot sensor
                               -> private admin/VPN -> dashboard/API
```

Never route an entire real customer website to a honeypot unless it is intentionally a decoy/lab site.

---

## Part A: Manual public website deployment on Vercel

### 1. Fork or clone the repo

```bash
git clone https://github.com/AmulyaSri-Code/main-honeypot-web2.git
cd main-honeypot-web2
npm install
```

### 2. Run the setup command

Use the included setup script to update the project for the new user's domain:

```bash
npm run setup:client -- --url https://security.clientdomain.com --name "Client Honeypot" --indexnow-key auto
```

This updates:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- optional IndexNow key file in `public/`

You can also edit those files manually if needed.

Check these values:

```html
<link rel="canonical" href="https://security.clientdomain.com/" />
<meta property="og:url" content="https://security.clientdomain.com/" />
<meta property="og:image" content="https://security.clientdomain.com/og-image.svg" />
<meta name="twitter:image" content="https://security.clientdomain.com/og-image.svg" />
```

`public/robots.txt` should contain:

```text
User-agent: *
Allow: /

Sitemap: https://security.clientdomain.com/sitemap.xml
```

`public/sitemap.xml` should contain:

```xml
<loc>https://security.clientdomain.com/</loc>
```

### 3. Test locally

```bash
npm run lint
npm run build
npm run preview
```

Open the local preview URL and confirm the page renders.

### 4. Push to GitHub

```bash
git add .
git commit -m "Deploy honeypot site for client domain"
git push
```

### 5. Import into Vercel

In Vercel:

- New Project
- Import the GitHub repo
- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Deploy

### 6. Add the custom domain

In Vercel Project Settings -> Domains:

- Add `security.clientdomain.com` or the chosen domain.
- Update DNS as Vercel instructs.
- Wait for HTTPS certificate to become active.

### 7. Verify live deployment

Run:

```bash
curl -I https://security.clientdomain.com/
curl https://security.clientdomain.com/robots.txt
curl https://security.clientdomain.com/sitemap.xml
```

Expected:

- Homepage returns `200`.
- `robots.txt` points to the client's real sitemap.
- `sitemap.xml` contains the client's real URL.

---

## Part B: Manual real honeypot sidecar deployment

Use this when the client wants actual trap-path logging.

### 1. Keep real website and honeypot separate

Example ports:

- Real website: `127.0.0.1:3000`
- Honeypot sensor: `127.0.0.1:8081`
- Private dashboard/API: `127.0.0.1:8082` or VPN only

The public internet should not access the admin dashboard directly.

### 2. Recommended trap paths

Route only suspicious paths to the honeypot sensor:

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

### 3. Nginx example

```nginx
server {
    listen 80;
    server_name clientdomain.com www.clientdomain.com;

    # Normal website traffic
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Honeypot trap paths
    location ~ ^/(\.env|\.git|wp-login\.php|wp-admin|phpmyadmin|adminer|cgi-bin|server-status|manager/html) {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Never expose admin dashboard publicly
    location /honeypot-admin {
        return 404;
    }
}
```

After editing:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Caddy example

```caddyfile
clientdomain.com {
    @traps path /.env /.git* /wp-login.php /wp-admin* /phpmyadmin* /adminer* /cgi-bin* /server-status /manager/html*
    reverse_proxy @traps 127.0.0.1:8081

    reverse_proxy 127.0.0.1:3000
}
```

Reload:

```bash
sudo caddy validate
sudo systemctl reload caddy
```

### 5. Test real trap capture safely

Run a few harmless requests:

```bash
curl -I https://clientdomain.com/.env
curl -I https://clientdomain.com/wp-login.php
curl -I https://clientdomain.com/phpmyadmin
```

Then check honeypot logs/dashboard for those exact paths and timestamps.

If the logs show those requests, the sidecar is working.

If the logs do not show those requests, the reverse-proxy routing is not connected correctly.

---

## Part C: Indexing and getting views

After deployment:

### 1. Submit to Google Search Console

- Go to Google Search Console.
- Add the client's domain/property.
- Verify ownership.
- Submit:

```text
https://clientdomain.com/sitemap.xml
```

### 2. Submit to Bing Webmaster Tools

- Add the site.
- Submit the same sitemap.

### 3. Optional IndexNow

Create a random key file in `public/`, for example:

```text
public/indexnow-key.txt
```

Then submit:

```bash
curl -X POST 'https://api.indexnow.org/indexnow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data '{
    "host": "clientdomain.com",
    "key": "YOUR_INDEXNOW_KEY",
    "keyLocation": "https://clientdomain.com/indexnow-key.txt",
    "urlList": ["https://clientdomain.com/"]
  }'
```

A `202` response means accepted.

### 4. Shareable content for views

To get real views, publish/share:

- A short LinkedIn post: “I deployed a public honeypot dashboard showing common attacker probes.”
- A GitHub README with screenshots and live demo link.
- A blog post explaining safe honeypot sidecar deployment.
- A YouTube/short demo showing `/.env` or `/wp-login.php` trap-path logging.
- Submit the project to cybersecurity/student portfolio communities.

Do not publish private admin links, real victim IPs, webhook URLs, API tokens, or raw logs.

---

## Final handoff checklist

For every user/client deployment, confirm:

- [ ] Client owns or authorized the domain.
- [ ] Site URL is updated in `index.html`, `robots.txt`, and `sitemap.xml`.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Live homepage returns 200.
- [ ] Live `robots.txt` points to the right sitemap.
- [ ] Live `sitemap.xml` points to the right domain.
- [ ] Search Console sitemap submitted.
- [ ] Honeypot dashboard/admin is private.
- [ ] Trap-path test requests appear in logs if real sensor mode is enabled.
