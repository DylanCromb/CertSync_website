import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://www.certsync.com.au';
const APK_DOWNLOAD_URL = 'https://github.com/DylanCromb/CertSync_website/releases/download/v1.0.24/certsync_1.0.24.apk';
const PUBLIC_PAGES = [
  'index.html',
  'about.html',
  'pricing.html',
  'support.html',
  'contact.html',
  'custom-plan.html',
  'book-demo.html',
  'policies.html',
  'download.html',
];
const NOINDEX_PAGES = ['login.html'];

const errors = [];

const htmlPages = readdirSync(ROOT)
  .filter((file) => file.endsWith('.html'))
  .sort();

const canonicalFor = (page) => (page === 'index.html' ? `${BASE_URL}/` : `${BASE_URL}/${page}`);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const stripTags = (value) => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

function fail(page, message) {
  errors.push(`${page}: ${message}`);
}

function getHead(html) {
  return html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
}

function getTagContent(html, tagName) {
  return stripTags(html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'))?.[1] ?? '');
}

function getMeta(head, attr, value) {
  const tag = head.match(new RegExp(`<meta\\s+[^>]*${attr}=["']${escapeRegExp(value)}["'][^>]*>`, 'i'))?.[0];
  return tag?.match(/\scontent=["']([^"']*)["']/i)?.[1]?.trim() ?? '';
}

function getCanonical(head) {
  const tag = head.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
  return tag?.match(/\shref=["']([^"']*)["']/i)?.[1]?.trim() ?? '';
}

function validateLength(page, field, value, min, max) {
  if (value.length < min || value.length > max) {
    fail(page, `${field} length is ${value.length}; expected ${min}-${max} characters`);
  }
}

for (const page of htmlPages) {
  const html = readFileSync(path.join(ROOT, page), 'utf8');
  const head = getHead(html);
  const isPublic = PUBLIC_PAGES.includes(page);
  const isNoindex = NOINDEX_PAGES.includes(page);
  const expectedCanonical = canonicalFor(page);

  if (!head) fail(page, 'missing <head>');

  const beforeHead = html.slice(0, html.search(/<head\b/i));
  if (/<a\s/i.test(beforeHead)) {
    fail(page, 'contains body content before <head>');
  }

  const lang = html.match(/<html\b[^>]*\slang=["']([^"']+)["']/i)?.[1];
  if (lang !== 'en-AU') fail(page, 'expected <html lang="en-AU">');

  if (!/<main\b/i.test(html)) fail(page, 'missing <main>');

  const skipLinkCount = (html.match(/class=["'][^"']*\bskip-to-content\b[^"']*["']/gi) ?? []).length;
  if (skipLinkCount !== 1) fail(page, `expected exactly one skip link, found ${skipLinkCount}`);

  const title = getTagContent(head, 'title');
  const description = getMeta(head, 'name', 'description');
  const robots = getMeta(head, 'name', 'robots').toLowerCase();
  const canonical = getCanonical(head);
  const favicon = head.match(/<link\s+[^>]*rel=["']icon["'][^>]*>/i)?.[0];
  const faviconHref = favicon?.match(/\shref=["']([^"']*)["']/i)?.[1]?.trim() ?? '';

  validateLength(page, 'title', title, 20, 80);
  validateLength(page, 'description', description, 50, 180);

  if (!['/assets/favicon.ico', 'assets/favicon.ico'].includes(faviconHref)) {
    fail(page, 'favicon should use assets/favicon.ico');
  }

  if (canonical !== expectedCanonical) {
    fail(page, `canonical should be ${expectedCanonical}`);
  }

  if (isPublic && robots !== 'index, follow') {
    fail(page, 'public page should use robots="index, follow"');
  }

  if (isNoindex && robots !== 'noindex, follow') {
    fail(page, 'non-public page should use robots="noindex, follow"');
  }

  if (isPublic) {
    const ogUrl = getMeta(head, 'property', 'og:url');
    const ogTitle = getMeta(head, 'property', 'og:title');
    const ogDescription = getMeta(head, 'property', 'og:description');
    const ogImage = getMeta(head, 'property', 'og:image');
    const twitterUrl = getMeta(head, 'name', 'twitter:url');
    const twitterCard = getMeta(head, 'name', 'twitter:card');

    if (ogUrl !== expectedCanonical) fail(page, 'og:url must match canonical');
    if (!ogTitle) fail(page, 'missing og:title');
    if (!ogDescription) fail(page, 'missing og:description');
    if (!ogImage.startsWith(`${BASE_URL}/assets/`)) fail(page, 'og:image must use canonical asset URL');
    if (twitterUrl !== expectedCanonical) fail(page, 'twitter:url must match canonical');
    if (!twitterCard) fail(page, 'missing twitter:card');
  }

  if (/<meta\s+[^>]*property=["']twitter:/i.test(head)) {
    fail(page, 'Twitter meta tags should use name="", not property=""');
  }

  for (const [, rawJson] of html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(rawJson.trim());
    } catch (error) {
      fail(page, `invalid JSON-LD: ${error.message}`);
    }
  }

  if (/https:\/\/certsync\.com(?!\.au)/i.test(head)) {
    fail(page, 'uses legacy certsync.com domain in metadata');
  }

  if (/assets\/resources\/certsync_1\.0\.24\.apk/i.test(html)) {
    fail(page, `APK downloads must use ${APK_DOWNLOAD_URL}`);
  }
}

const downloadHtml = readFileSync(path.join(ROOT, 'download.html'), 'utf8');
const apkLinkCount = (downloadHtml.match(new RegExp(escapeRegExp(APK_DOWNLOAD_URL), 'g')) ?? []).length;
if (apkLinkCount < 3) {
  errors.push(`download.html: expected APK release URL in structured data and download links`);
}

const robotsPath = path.join(ROOT, 'robots.txt');
if (!existsSync(robotsPath)) {
  errors.push('robots.txt: missing');
} else {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${BASE_URL}/sitemap.xml`)) {
    errors.push('robots.txt: missing canonical sitemap URL');
  }
  if (!/Disallow:\s*\/login\.html/i.test(robots)) {
    errors.push('robots.txt: should disallow /login.html');
  }
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  errors.push('sitemap.xml: missing');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const page of PUBLIC_PAGES) {
    const loc = `<loc>${canonicalFor(page)}</loc>`;
    if (!sitemap.includes(loc)) errors.push(`sitemap.xml: missing ${loc}`);
  }
  for (const page of NOINDEX_PAGES) {
    if (sitemap.includes(canonicalFor(page))) {
      errors.push(`sitemap.xml: should not include ${page}`);
    }
  }
}

if (errors.length) {
  console.error(`SEO audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO audit passed for ${htmlPages.length} HTML page(s).`);
