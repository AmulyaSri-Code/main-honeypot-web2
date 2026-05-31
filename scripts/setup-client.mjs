#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function usage() {
  console.log(`Usage:
  npm run setup:client -- --url https://security.example.com [--name "Client Honeypot"] [--indexnow-key auto|KEY]

What it updates:
  - index.html canonical/OpenGraph/Twitter URLs
  - public/robots.txt sitemap URL
  - public/sitemap.xml canonical URL + lastmod
  - optional public/<indexnow-key>.txt for IndexNow

Examples:
  npm run setup:client -- --url https://main-honeypot-web2.vercel.app
  npm run setup:client -- --url https://security.client.com --name "Client Security Honeypot" --indexnow-key auto
`);
}

const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--help' || arg === '-h') {
    usage();
    process.exit(0);
  }
  if (!arg.startsWith('--')) {
    console.error(`Unknown argument: ${arg}`);
    usage();
    process.exit(1);
  }
  const key = arg.slice(2);
  const next = args[i + 1];
  if (!next || next.startsWith('--')) {
    console.error(`Missing value for ${arg}`);
    usage();
    process.exit(1);
  }
  opts[key] = next;
  i += 1;
}

if (!opts.url) {
  console.error('Missing required --url');
  usage();
  process.exit(1);
}

let siteUrl = opts.url.trim().replace(/\/+$/, '');
if (!/^https:\/\//.test(siteUrl)) {
  console.error('Use a public HTTPS URL, for example: https://security.example.com');
  process.exit(1);
}

const siteName = opts.name?.trim() || 'HoneyPot Cybersecurity';
const today = new Date().toISOString().slice(0, 10);

function read(rel) {
  return readFileSync(resolve(root, rel), 'utf8');
}

function write(rel, content) {
  writeFileSync(resolve(root, rel), content);
  console.log(`updated ${rel}`);
}

function replaceUrlEverywhere(content) {
  return content
    .replaceAll('https://honeypot.example.com', siteUrl)
    .replaceAll('https://main-honeypot-web2.vercel.app', siteUrl);
}

let html = replaceUrlEverywhere(read('index.html'));
html = html.replace(
  /<meta property="og:site_name" content="[^"]*" \/>/,
  `<meta property="og:site_name" content="${siteName.replaceAll('"', '&quot;')}" />`,
);
write('index.html', html);

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
write('public/robots.txt', robots);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
write('public/sitemap.xml', sitemap);

let indexNowKey = opts['indexnow-key'];
if (indexNowKey) {
  if (indexNowKey === 'auto') {
    indexNowKey = randomBytes(16).toString('hex');
  }
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(indexNowKey)) {
    console.error('IndexNow key must be 8-128 characters and contain only letters, numbers, underscore, or hyphen.');
    process.exit(1);
  }
  const keyPath = `public/${indexNowKey}.txt`;
  if (!existsSync(resolve(root, keyPath))) {
    write(keyPath, `${indexNowKey}\n`);
  } else {
    console.log(`kept existing ${keyPath}`);
  }
  console.log(`IndexNow key URL: ${siteUrl}/${indexNowKey}.txt`);
}

console.log('\nSetup complete. Next run:');
console.log('  npm run lint');
console.log('  npm run build');
console.log('\nAfter deployment verify:');
console.log(`  curl ${siteUrl}/robots.txt`);
console.log(`  curl ${siteUrl}/sitemap.xml`);
