# Security Assessment – CertSync Marketing Site

## Overview
This assessment reviews the static CertSync marketing site contained in this repository, focusing on in-scope HTML, CSS, and JavaScript assets. The goal is to highlight strengths, note potential risks, and recommend mitigations relevant to eventually deploying the site.

## Methodology
* Static analysis of HTML templates, JavaScript modules, and stylesheets.
* Review of client-side form handling and navigation logic.
* Identification of missing security headers and defensive browser controls that should be configured at the hosting layer.

## Positive Observations
* All assets load from the same origin with no third-party scripts or iframes (other than optional demo placeholders), reducing the attack surface for supply-chain issues.【F:index.html†L6-L77】【F:pricing.html†L5-L43】
* Interactive behaviors respect reduced-motion preferences and rely on locally bundled code, lowering the risk of third-party vulnerabilities.【F:js/animations.js†L1-L213】

## Findings
### 1. Missing security headers (Medium)
The templates do not declare a Content Security Policy (CSP), HTTP Strict-Transport-Security (HSTS), or Referrer-Policy headers. Without these, browsers cannot enforce script/style source restrictions or ensure HTTPS-only transport, which leaves room for content injection or downgrade attacks if the hosting configuration is permissive.【F:index.html†L6-L77】

**Recommendation:** Configure the hosting platform (e.g., Netlify, CDN) to emit a CSP such as `default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self';` alongside HSTS and a strict Referrer-Policy. Keep inline scripting to a minimum so the CSP can omit `'unsafe-inline'`.

### 2. Client-side form stub without validation (Low)
`js/main.js` intercepts all form submissions, simulates an asynchronous response, and resets the form without server-side validation.【F:js/main.js†L1-L80】 When the site connects to a real backend, relying solely on this logic would expose the API to injection or spam because inputs are not sanitized or rate limited.

**Recommendation:** Treat the current handler as a UX placeholder only. Introduce backend endpoints that perform robust validation, enforce CAPTCHA/rate limiting, and return structured responses for the front end to surface.

### 3. Template string rendering for pricing cards (Informational)
`js/pricing.js` builds card markup via `innerHTML` using data stored in the `DATA` constant.【F:js/pricing.js†L1-L123】 While the data is static today, converting it to dynamic or user-supplied content in the future would create an XSS risk.

**Recommendation:** If pricing data becomes dynamic, sanitize content before interpolation or generate DOM nodes via `createElement`/`textContent` instead of raw HTML strings.

## Conclusion
The codebase is a strong foundation for a static marketing presence. Harden deployment with modern security headers and plan for server-side validation once forms integrate with production services. Keeping these mitigations in mind will help preserve the site's security posture as functionality grows.
