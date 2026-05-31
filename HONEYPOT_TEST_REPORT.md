# Honeypot Live Test Report

Target: https://main-honeypot-web2.vercel.app/
Test time: 2026-05-31 04:37:19 UTC
Scope: Safe public smoke test only. No exploitation, no brute force, no load testing, no bypass attempts.

## Executive summary

Status: Partially working as a public honeypot/cybersecurity landing page.

The public website loads correctly, renders as a polished honeypot cybersecurity dashboard, and has no browser console errors on initial load. The public SEO/indexing setup had one blocking issue: the live robots.txt and sitemap.xml still pointed to `https://honeypot.example.com`, so crawlers were being told the canonical site was the placeholder domain instead of the real Vercel URL. That has now been fixed in source.

The safe probe test did not confirm that traffic is being captured by a real backend honeypot sensor from this public URL. Common trap URLs mostly return Vercel 404 or 403 responses. That is safe, but it means the public Vercel frontend currently behaves more like a cybersecurity showcase/static dashboard than a confirmed live sensor endpoint.

## What passed

- Homepage returned HTTP 200.
- Page title: `HoneyPot Cybersecurity | Defensive Honeypot Threat Intelligence`.
- Browser console after homepage load: 0 JavaScript errors.
- The visual UI clearly communicates honeypot/deception/threat-intelligence value.
- `robots.txt` exists.
- `sitemap.xml` exists.
- Security headers observed on Vercel responses include:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security` from Vercel

## Safe probe results

| Path | Result | Notes |
| --- | ---: | --- |
| `/` | 200 | Homepage works. |
| `/robots.txt` | 200 | Was live but pointed to placeholder sitemap before this fix. |
| `/sitemap.xml` | 200 | Was live but pointed to placeholder canonical URL before this fix. |
| `/.env` | 404 | No secret exposure. Good. |
| `/.git/config` | 404 | No git config exposure. Good. |
| `/wp-login.php` | 403 | Blocked by Vercel/config. Safe, but not a confirmed honeypot capture. |
| `/wp-admin` | 403 | Blocked by Vercel/config. Safe, but not a confirmed honeypot capture. |
| `/phpmyadmin` | 404 | No fake/admin trap page visible. |
| `/adminer` | 404 | No fake/admin trap page visible. |
| `/cgi-bin/` | 403 | Blocked by Vercel/config. |
| `/server-status` | 404 | No Apache status exposure. Good. |
| `/manager/html` | 404 | No Tomcat manager exposure. Good. |
| `/api/honeypot` | 404 | No public API endpoint detected. |
| `/api/events` | 404 | No public event endpoint detected. |
| `/admin` | 404 | No public admin interface. Good. |
| `/login` | 404 | No login surface. Good. |
| `/dashboard` | 404 | No standalone route; homepage contains dashboard-like sections. |

## Findings

### 1. SEO/indexing bug: live canonical URLs pointed to placeholder domain
Severity: High for indexing/views

The deployed site served crawler discovery files that referenced `https://honeypot.example.com`, not `https://main-honeypot-web2.vercel.app`. This can delay or prevent indexing because search engines are being told the canonical URL/sitemap belongs to a different domain.

Fixed in source:
- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

### 2. Honeypot capture path is not externally verifiable from the public site
Severity: Medium

The public URL does not expose a verified sensor endpoint. Common attacker paths return Vercel 404/403 responses. That is not unsafe, but I cannot prove those probes are logged unless you have backend logs, alert notifications, or a private dashboard showing the events.

Recommended next step:
- If you want the Vercel site itself to record trap hits, add serverless API routes or a backend webhook receiver.
- If you already connected an external honeypot backend, expose only narrow trap rewrites such as `/.env`, `/wp-login.php`, `/phpmyadmin`, etc. to that backend and keep dashboard/admin private.

### 3. Public page is credible but dense
Severity: Low

The visual site looks professional, but the homepage is very long and information-dense. For better visitor conversion, add one clearer above-the-fold CTA such as `View Live Demo`, `Read Setup Guide`, or `Deploy This Safely`.

## Changes made after testing

- Replaced placeholder canonical URL with the real Vercel URL.
- Replaced placeholder OpenGraph/Twitter image URLs with the real Vercel URL.
- Replaced placeholder sitemap URL in `robots.txt`.
- Replaced placeholder `<loc>` in `sitemap.xml`.
- Added `<lastmod>2026-05-31</lastmod>` to `sitemap.xml`.
- Added an IndexNow key file in `public/` for faster Bing/Yandex-compatible discovery after deployment.

## What still needs manual/external confirmation

- Confirm Vercel redeployed the latest commit.
- Re-test live `robots.txt`, `sitemap.xml`, and the IndexNow key file after deployment.
- Submit the live sitemap in Google Search Console.
- If you want real honeypot telemetry, verify that trap requests appear in the backend logs or alerts.

## Bottom line

The site is safe to show publicly and now has the right source-level SEO fixes for indexing. It is not yet proven as a live public honeypot sensor from the Vercel URL because the probe paths do not show evidence of being captured by a honeypot backend.
