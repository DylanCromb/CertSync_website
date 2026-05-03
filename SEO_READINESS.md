# SEO Readiness Plan

This repo is now set up so the deeper SEO work can happen on top of a cleaner technical base.

## Current Baseline

- Canonical production domain: `https://www.certsync.com.au`
- Public indexable pages:
  - `/`
  - `/about.html`
  - `/pricing.html`
  - `/support.html`
  - `/contact.html`
  - `/custom-plan.html`
  - `/book-demo.html`
  - `/policies.html`
- Non-indexable utility page:
  - `/login.html`
- SEO guardrail:
  - `npm run seo:audit`

## Technical SEO Standards

Each public page should have:

- one clear search intent;
- a unique title between roughly 20 and 80 characters;
- a unique meta description between roughly 50 and 180 characters;
- `robots` set to `index, follow`;
- one canonical URL on `https://www.certsync.com.au`;
- matching `og:url` and `twitter:url`;
- an absolute Open Graph image URL;
- valid JSON-LD where it genuinely describes the page;
- one primary H1 in rendered output;
- internal links to the most important conversion path.

Pages that should not rank, such as login/account utility pages, should use `noindex, follow` and stay out of `sitemap.xml`.

## Recommended SEO Buildout

1. Search intent map
   - credential management software Australia
   - licence tracking software Australia
   - workforce compliance software
   - construction compliance software
   - mining contractor compliance
   - labour hire credential tracking
   - SWMS and licence document tracking

2. Landing page architecture
   - `/industries/construction.html`
   - `/industries/mining.html`
   - `/industries/labour-hire.html`
   - `/features/expiry-alerts.html`
   - `/features/audit-ready-reporting.html`
   - `/features/credential-register.html`

3. Conversion path
   - keep `/book-demo.html` as the primary high-intent CTA;
   - support it with industry-specific proof, objections, FAQs, and internal links;
   - track form submissions as conversion events once analytics is added.

4. Content depth
   - add comparison sections against spreadsheets/manual registers;
   - add Australian compliance language naturally without making legal claims;
   - include examples for licences, permits, certifications, SWMS, inductions, and insurance audits;
   - keep regulator references factual and externally linked.

5. Performance and crawl quality
   - keep third-party scripts out of page heads unless they are essential;
   - prefer built CSS/JS assets from `dist/`;
   - compress or replace oversized social images once a real OG image exists;
   - run `npm run build`, `npm run seo:audit`, and `npm audit` before deployment.

## Next Best Work

The next high-impact SEO pass should be content architecture, not more meta tags. Build the industry and feature pages above, then use internal links from the homepage, support page, pricing page, and demo page to make those search intents discoverable.
