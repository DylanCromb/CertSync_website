# CertSync Website

Static marketing website for CertSync, an Australian credential management and workforce compliance platform.

The site is mostly hand-authored HTML/CSS with a few Vite-built React islands:

- `index.html` mounts the animated hero from `src/hero-new/main.tsx`.
- `support.html` mounts the FAQ island from `src/faq/main.tsx`.
- `pricing.html` mounts the pricing island from `src/pricing-new/main.tsx`.

## Canonical Domain

Production SEO metadata uses:

```text
https://www.certsync.com.au
```

Use that domain for canonicals, Open Graph URLs, Twitter URLs, sitemap entries, and structured data.

## Project Structure

```text
.
├── *.html                 Static pages served from the site root
├── api/                   Serverless form handler
├── assets/                Favicons and image assets
├── css/                   Shared static CSS
├── dist/                  Vite-built browser bundles used by HTML pages
├── js/                    Shared static browser scripts
├── scripts/               Repo automation and audits
├── src/                   React island source
├── robots.txt             Search crawler rules
├── sitemap.xml            Canonical public URL list
├── netlify.toml           Netlify build, headers, and cache policy
├── package.json           Build and audit scripts
└── vite*.config.ts        Vite build targets
```

## Local Development

Install dependencies:

```bash
npm ci
```

Run the Vite dev server:

```bash
npm run dev
```

Build all React islands into `dist/`:

```bash
npm run build
```

Run SEO metadata checks:

```bash
npm run seo:audit
```

`npm test` currently runs the SEO audit.

## SEO Readiness

The SEO baseline is intentionally machine-checkable. The audit verifies:

- every HTML page has `lang="en-AU"`;
- public pages have `index, follow`, a canonical URL, Open Graph tags, Twitter tags, and valid JSON-LD;
- `login.html` is marked `noindex, follow`;
- `robots.txt` points to the canonical sitemap;
- `sitemap.xml` includes public pages and excludes login;
- page metadata does not drift back to the old `certsync.com` domain.

When adding a new public page, add it to:

- `scripts/seo-audit.mjs`;
- `sitemap.xml`;
- the relevant navigation/footer links.

## Deployment

Netlify builds with Node `20.19.0` and runs:

```bash
npm ci && npm run build
```

The publish directory is the repo root because the HTML files are served directly.
