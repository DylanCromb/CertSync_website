import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://www.certsync.com.au';
const APK_DOWNLOAD_URL = 'https://github.com/DylanCromb/CertSync_website/releases/download/v1.0.24/certsync_1.0.26.apk';
const PUBLIC_PAGES = [
  'index.html',
  'features/index.html',
  'features/licence-expiry-reminders.html',
  'features/credential-register.html',
  'features/compliance-reporting.html',
  'features/contractor-document-tracking.html',
  'industries/index.html',
  'industries/demolition.html',
  'industries/asbestos-removal.html',
  'industries/civil-excavation.html',
  'industries/construction.html',
  'industries/mining.html',
  'industries/labour-hire.html',
  'industries/healthcare.html',
  'industries/transport-logistics.html',
  'industries/manufacturing.html',
  'use-cases/replace-compliance-spreadsheets.html',
  'use-cases/worksafe-audit-ready-records.html',
  'resources/best-way-to-track-employee-licence-expiry-dates.html',
  'resources/contractor-compliance-software-australia.html',
  'resources/spreadsheet-alternative-compliance-document-tracking.html',
  'resources/how-demolition-companies-manage-swms-licence-records.html',
  'resources/keep-contractor-evidence-ready-for-audits.html',
  'resources/track-employee-licence-expiry-dates.html',
  'resources/contractor-compliance-checklist-australia.html',
  'about.html',
  'support.html',
  'contact.html',
  'custom-plan.html',
  'book-demo.html',
  'policies.html',
  'download.html',
];
const NOINDEX_PAGES = ['login.html', 'pricing.html'];

const errors = [];

function listHtmlPages(dir = ROOT) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.astro', '.claude', 'components'].includes(entry.name)) return [];
      return listHtmlPages(fullPath);
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) return [];
    return [path.relative(ROOT, fullPath).split(path.sep).join('/')];
  });
}

const htmlPages = listHtmlPages().sort();

const canonicalFor = (page) => {
  if (page === 'index.html') return `${BASE_URL}/`;
  if (page.endsWith('/index.html')) return `${BASE_URL}/${page.replace(/index\.html$/, '')}`;
  return `${BASE_URL}/${page}`;
};
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

function hasLink(head, rel, href) {
  return new RegExp(`<link\\s+[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*href=["']${escapeRegExp(href)}["'][^>]*>`, 'i').test(head)
    || new RegExp(`<link\\s+[^>]*href=["']${escapeRegExp(href)}["'][^>]*rel=["']${escapeRegExp(rel)}["'][^>]*>`, 'i').test(head);
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
  const author = getMeta(head, 'name', 'author');
  const appName = getMeta(head, 'name', 'application-name');
  const appleAppName = getMeta(head, 'name', 'apple-mobile-web-app-title');

  validateLength(page, 'title', title, 20, 80);
  validateLength(page, 'description', description, 50, 180);

  if (canonical !== expectedCanonical) {
    fail(page, `canonical should be ${expectedCanonical}`);
  }

  if (!hasLink(head, 'alternate', expectedCanonical) || !/hreflang=["']en-AU["']/i.test(head)) {
    fail(page, 'missing en-AU alternate link matching canonical');
  }

  if (!hasLink(head, 'alternate', expectedCanonical) || !/hreflang=["']x-default["']/i.test(head)) {
    fail(page, 'missing x-default alternate link matching canonical');
  }

  if (author !== 'CertSync') fail(page, 'missing author metadata');
  if (appName !== 'CertSync') fail(page, 'missing application-name metadata');
  if (appleAppName !== 'CertSync') fail(page, 'missing apple mobile app title metadata');

  if (!hasLink(head, 'icon', '/favicon.ico')) {
    fail(page, 'favicon should expose /favicon.ico');
  }

  if (!/rel=["']icon["'][^>]*sizes=["']48x48["'][^>]*href=["']\/assets\/icons\/favicon-48x48\.png["']/i.test(head)
    && !/href=["']\/assets\/icons\/favicon-48x48\.png["'][^>]*sizes=["']48x48["'][^>]*rel=["']icon["']/i.test(head)) {
    fail(page, 'missing 48x48 PNG favicon link');
  }

  if (!hasLink(head, 'manifest', '/site.webmanifest')) {
    fail(page, 'missing web manifest link');
  }

  if (isPublic && robots !== 'index, follow, max-image-preview:large') {
    fail(page, 'public page should use robots="index, follow, max-image-preview:large"');
  }

  if (isNoindex && robots !== 'noindex, follow') {
    fail(page, 'non-public page should use robots="noindex, follow"');
  }

  if (isPublic) {
    const ogUrl = getMeta(head, 'property', 'og:url');
    const ogTitle = getMeta(head, 'property', 'og:title');
    const ogDescription = getMeta(head, 'property', 'og:description');
    const ogImage = getMeta(head, 'property', 'og:image');
    const ogImageWidth = getMeta(head, 'property', 'og:image:width');
    const ogImageHeight = getMeta(head, 'property', 'og:image:height');
    const ogImageAlt = getMeta(head, 'property', 'og:image:alt');
    const twitterUrl = getMeta(head, 'name', 'twitter:url');
    const twitterCard = getMeta(head, 'name', 'twitter:card');
    const twitterImage = getMeta(head, 'name', 'twitter:image');
    const twitterImageAlt = getMeta(head, 'name', 'twitter:image:alt');

    if (ogUrl !== expectedCanonical) fail(page, 'og:url must match canonical');
    if (!ogTitle) fail(page, 'missing og:title');
    if (!ogDescription) fail(page, 'missing og:description');
    if (ogImage !== `${BASE_URL}/assets/images/certsync-og.png`) fail(page, 'og:image must use canonical social image');
    if (ogImageWidth !== '1200') fail(page, 'missing og:image:width=1200');
    if (ogImageHeight !== '630') fail(page, 'missing og:image:height=630');
    if (!ogImageAlt) fail(page, 'missing og:image:alt');
    if (twitterUrl !== expectedCanonical) fail(page, 'twitter:url must match canonical');
    if (twitterCard !== 'summary_large_image') fail(page, 'twitter:card should use summary_large_image');
    if (twitterImage !== `${BASE_URL}/assets/images/certsync-og.png`) fail(page, 'twitter:image must use canonical social image');
    if (!twitterImageAlt) fail(page, 'missing twitter:image:alt');
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
  if (/Disallow:\s*\/login\.html/i.test(robots)) {
    errors.push('robots.txt: should not block /login.html; the page-level noindex must be crawlable');
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

for (const assetPath of [
  'favicon.ico',
  'assets/favicon.ico',
  'assets/icons/favicon-48x48.png',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/icon-192x192.png',
  'assets/icons/icon-512x512.png',
  'assets/images/certsync-og.png',
  'site.webmanifest',
  'llms.txt',
]) {
  if (!existsSync(path.join(ROOT, assetPath))) {
    errors.push(`${assetPath}: missing`);
  }
}

const manifestPath = path.join(ROOT, 'site.webmanifest');
if (existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const iconSrcs = new Set((manifest.icons ?? []).map((icon) => icon.src));
    if (!iconSrcs.has('/assets/icons/icon-192x192.png')) {
      errors.push('site.webmanifest: missing 192x192 icon');
    }
    if (!iconSrcs.has('/assets/icons/icon-512x512.png')) {
      errors.push('site.webmanifest: missing 512x512 icon');
    }
  } catch (error) {
    errors.push(`site.webmanifest: invalid JSON: ${error.message}`);
  }
}

if (errors.length) {
  console.error(`SEO audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO audit passed for ${htmlPages.length} HTML page(s).`);
