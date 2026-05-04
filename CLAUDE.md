# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CertSync is a credential management platform for Australian businesses and workers to track professional licenses, permits, and certifications. The marketing website is a hybrid architecture combining static HTML pages with a React-powered hero section, built with Vite and deployed on Netlify.

## Development Commands

### Build and Development
```bash
# Start development server (Vite)
npm run dev

# Build production bundle (compiles React hero to dist/hero.js)
npm run build

# Preview production build
npm run preview
```

### Testing the Build
The React hero component builds to an IIFE bundle at `dist/hero.js`. After running `npm run build`, check that:
- `dist/hero.js` exists
- index.html loads without errors
- Hero animations work on scroll

## Architecture

### Hybrid Static + React Structure

This is **not** a single-page application. It's a multi-page static site with a React-powered hero section on the homepage.

**Static HTML Pages** (in root directory):
- `index.html` - Homepage with React hero
- `about.html` - About page
- `pricing.html` - Pricing tiers
- `contact.html` - Contact form
- `policies.html` - Privacy policy, terms of service
- `login.html` - Login page (placeholder)

**React Hero Section** (`src/hero/`):
- Built with React 19, TypeScript, styled-components, and Framer Motion
- Scroll-driven animation: credentials drift chaotically, then organize into a grid as user scrolls
- Builds to `dist/hero.js` as an IIFE (self-executing bundle)
- Loaded in `index.html` via `<script type="module" src="/dist/hero.js"></script>`
- Mounts to `<div id="hero-root"></div>`

**Key architectural decision**: The hero is built separately because it requires React/animation libraries, but the rest of the site is static HTML for performance and simplicity.

### Build System (Vite)

`vite.config.ts` is configured to:
- Build the React hero as a library (IIFE format)
- Entry point: `src/hero/main.tsx`
- Output: `dist/hero.js` (single bundle with all dependencies)
- External dependencies: none (everything bundled)
- Path alias: `@` maps to `./src`

**Why IIFE?** The hero needs to run immediately when loaded via `<script>` tag in static HTML, without requiring a separate module loader.

### CSS Architecture

**Three-layer system**:

1. **`css/main.css`** - Core styles, variables, typography, base components
2. **`css/layout-system.css`** - Semantic layout utilities (section spacing, card styles, section backgrounds)
3. **`css/sections.css`** - Page-specific sections (hero, value-framing, proof, testimonials, etc.)

**Design system**:
- White cards with subtle shadows on alternating white/grey backgrounds
- Card styles unified across `.card`, `.feature-card`, `.pricing-card`
- Spacing: 64px vertical padding (desktop), 40px (mobile), or 32px for compact sections
- Max-width: 1200px content wrapper

**Why this matters**: When adding new sections, use `.section-wrapper` for consistent width/padding, and alternate `.section-grey`/`.section-white` for visual rhythm.

### React Hero Component Structure

```
src/hero/
├── main.tsx                      # Entry point, ReactDOM.render
├── HeroContainer.tsx             # Root component, scroll progress tracking
├── components/
│   ├── HeroBackground.tsx        # Gradient background
│   ├── CredentialScene.tsx       # Orchestrates credential cards + animation
│   ├── CredentialCard.tsx        # Individual credential card (Framer Motion)
│   ├── CredentialItem.tsx        # Legacy/simpler card variant
│   ├── HeroContent.tsx           # Text overlay (headline, CTA buttons)
│   └── WaveDivider.tsx           # SVG transition to next section
├── context/
│   └── AnimationContext.tsx      # Shared animation state
└── hooks/
    └── useScrollProgress.tsx     # Scroll tracking (MotionValue)
```

**Animation timeline** (controlled by scroll progress):
- `0.00-0.15`: Chaos - cards drift randomly
- `0.15-0.75`: Organizing - cards smoothly arrange into grid
- `0.75-0.85`: Settling - final adjustments
- `0.85-1.00`: Stable - no motion, grid locked

Debug mode: Press `Ctrl+D` or set `window.__HERO_DEBUG__ = true` to see scroll progress overlay.

## Key Files and Their Purpose

- **`vite.config.ts`** - Build configuration for React hero
- **`tsconfig.json`** - TypeScript config (strict mode, React JSX)
- **`netlify.toml`** - Deployment config, security headers, caching rules
- **`package.json`** - Dependencies (React 19, Framer Motion, styled-components, Vite)
- **`css/styles.min.css`** - Minified production CSS (check if this is generated or manual)
- **`js/main.js`, `js/navigation.js`, `js/animations.js`** - Vanilla JS for non-React pages

## Important Design Context

### Target Audience
- **Primary**: Australian compliance managers, safety officers, HR directors
- **Industry**: Construction, mining, labour hire, facility management
- **Buyer psychology**: High-trust environment, WorkSafe compliance focus, risk-averse

### Design Principles (from DESIGN_IMPROVEMENTS.md)
1. **Trust over trendiness** - Elevated white cards, subtle shadows, professional aesthetic
2. **Clarity over creativity** - Clear information hierarchy, audit-ready feel
3. **Professionalism over personality** - Matches enterprise SaaS expectations (Stripe, Linear)

**Current card style** (CARD_STYLE_OPTIONS.md):
- Option 1: Elevated white cards on grey backgrounds (RECOMMENDED - current implementation)
- Reasoning: Compliance software requires visual polish that signals reliability
- Alternatives documented but not recommended for this market

### Content Strategy
- Australian English spelling (licences, organisations, WorkSafe)
- Compliance-focused language (not generic SaaS copy)
- Quantified outcomes preferred ("6+ hours saved per week" vs "save time")
- Real regulatory examples (Queensland prosecutions, AHPRA cases)

## Common Development Tasks

### Adding a New Section to Homepage
1. Add semantic HTML to `index.html` (after `</section>` tags)
2. Wrap content in `<div class="section-wrapper">`
3. Alternate `section-grey` and `section-white` classes for background
4. Use existing card classes: `.card`, `.feature-card`, `.pricing-card`
5. Add section-specific styles to `css/sections.css` if needed

### Modifying the React Hero
1. Edit files in `src/hero/`
2. Run `npm run dev` to test with hot reload
3. Run `npm run build` to compile to `dist/hero.js`
4. Test production build with `npm run preview`

**Animation tuning**: Adjust timing in `CredentialScene.tsx` by modifying scroll progress thresholds (0.15, 0.75, 0.85).

### Updating Styles
- **Global changes**: Edit `css/main.css` (colors, typography, base components)
- **Layout system**: Edit `css/layout-system.css` (section spacing, card shadows)
- **Page-specific**: Edit `css/sections.css` (section variants)
- **Responsive**: Check `css/responsive.css` for mobile overrides

**CSS precedence**: `main.css` → `layout-system.css` → `sections.css` → `responsive.css`

### Deployment
Site is configured for Netlify static hosting:
- No build step required for HTML/CSS/JS
- React hero must be pre-built (`npm run build`) before deployment
- **Critical**: Commit `dist/hero.js` to git before deploying, or add build command to `netlify.toml`

Current `netlify.toml` build command: `echo 'Static site - no build required'`

**If hero needs rebuilding on deploy**, change to:
```toml
[build]
  command = "npm install && npm run build"
  publish = "."
```

## Known Issues and Gotchas

1. **React hero gap under navigation**: Fixed with `#hero-root { margin: 0; padding: 0; }` in index.html inline styles
2. **Scroll progress tracking**: Uses `ref` to hero section, requires `position: relative` parent
3. **IIFE bundle format**: React hero is NOT a module - don't try to import it elsewhere
4. **TypeScript strict mode**: Enabled - all new code must satisfy strict type checking
5. **Netlify redirect rule**: Currently has conditional redirect for admin/US only - review if causing routing issues

## File Conventions

- **HTML pages**: Root directory (kebab-case: `about.html`, `pricing.html`)
- **React components**: PascalCase (e.g., `HeroContainer.tsx`)
- **CSS files**: kebab-case (e.g., `layout-system.css`)
- **JS utilities**: camelCase (e.g., `animations.js`)

## References to External Documentation

- **Design rationale**: See `DESIGN_IMPROVEMENTS.md` for B2B trust optimization
- **Card style options**: See `CARD_STYLE_OPTIONS.md` for visual design system reasoning
- **When to replace policies**: See `WHEN_TO_REPLACE_POLICIES.md` (if exists)
- **README.md**: Contains project overview, deployment instructions, future roadmap

## Security Considerations

- CSP headers configured in `netlify.toml` (`unsafe-inline` allowed for compatibility)
- Security headers: X-Frame-Options, X-XSS-Protection, X-Content-Type-Options
- Cache control: 1 year for static assets (`/css/*`, `/js/*`, `/assets/*`)
- No backend API currently - contact form likely uses Netlify Forms

## Future Migration Path

Current stack is intentionally simple (static HTML + single React component). If the site grows to need:
- Multiple React sections → Consider migrating to Astro (supports islands architecture)
- Dynamic data → Add Netlify Functions or move to Next.js/Remix
- CMS → Astro + Markdown or headless CMS integration

**Do not over-engineer prematurely**. The current hybrid approach is appropriate for a pre-launch marketing site.

<!-- Last reviewed: 2026-04-07 -->
