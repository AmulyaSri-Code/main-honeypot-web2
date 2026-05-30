# HoneyPot Cybersecurity Website

Public React/Vite frontend for a defensive honeypot and threat-intelligence showcase. This site is intended to be the public layer for a personal website: it can show polished, sanitized telemetry and explain the honeypot project without exposing the real operator dashboard, raw logs, credentials, or attacker payloads.

## Recommended deployment model

```text
Public visitors
  -> personal website / HoneyPot frontend
  -> optional sanitized /public/summary API

Private operator access
  -> VPN / IP allowlist / strong auth
  -> real HoneyPot dashboard + raw telemetry

Suspicious bot paths on the real website
  -> reverse proxy trap routes
  -> private HoneyPot HTTP sensor
```

Use this public frontend first for views, indexing, screenshots, and portfolio/demo value. Add live backend data only through a deliberately sanitized public summary endpoint.

## Safety rules

- Do not expose the real honeypot admin dashboard publicly.
- Do not publish raw IP lists, captured passwords, command payloads, webhook URLs, API keys, database files, or logs.
- Keep real sensors on a VPS or controlled server, not on static hosting.
- Static hosts such as Vercel, Netlify, GitHub Pages, and Cloudflare Pages can host this frontend, but they cannot run real SSH/FTP/Telnet honeypot listeners.
- If you route suspicious paths from a real website, route only trap paths such as `/.env`, `/.git`, `/wp-login.php`, `/phpmyadmin`, `/adminer`, `/cgi-bin`, and `/server-status`.

## Local development

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Deploy on Vercel

1. Push this repository to GitHub.
2. Open Vercel and import the repository.
3. Use these defaults:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add your domain in Vercel Project Settings.
5. Replace placeholder URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the final HTTPS domain.
6. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.

`vercel.json` is included with basic security headers, clean URLs, static asset caching, and SPA fallback routing.

## Deploy on Netlify

1. Import the GitHub repository in Netlify.
2. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add the custom domain.
4. Replace placeholder canonical/sitemap URLs with the final domain.
5. Submit the sitemap to Google Search Console.

## Optional future backend connection

When the real HoneyPot backend is running safely, add a separate public endpoint like:

```text
GET /public/summary
```

Recommended response shape:

```json
{
  "updated_at": "2026-05-30T12:00:00Z",
  "total_events": 1234,
  "high_risk_events": 12,
  "top_services": ["http", "ssh", "telnet"],
  "top_categories": ["port-scan", "web-probe", "credential-attack"],
  "countries": [{ "code": "US", "events": 120 }]
}
```

Do not include raw credentials, full payloads, admin tokens, private notes, or sensitive operator data.

## Reverse-proxy trap route example

Example Nginx pattern for a real personal website on a VPS:

```nginx
server {
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }

    location ~ ^/(\.env|\.git|wp-login\.php|wp-admin|phpmyadmin|adminer|cgi-bin|server-status|manager/html) {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8080;
    }

    location /honeypot-admin/ {
        allow YOUR_STATIC_IP;
        deny all;
        proxy_pass http://127.0.0.1:5050/;
    }
}
```

This keeps normal visitors on the real site, sends common bot probes to the HTTP sensor, and blocks public access to the admin dashboard.

## Indexing checklist

- Replace all `https://honeypot.example.com` placeholders with the final public domain.
- Confirm `/robots.txt` works.
- Confirm `/sitemap.xml` works.
- Confirm the homepage returns a 200 status.
- Submit the sitemap in Google Search Console.
- Share the deployed URL with a screenshot/demo clip on GitHub, LinkedIn, X, and relevant cybersecurity communities.
