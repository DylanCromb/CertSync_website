# Bundle Optimization Notes

## Current Status
- `dist/hero.js`: ~665 KB (210 KB gzipped)
- `dist/certsync_website.css`: ~8.7 KB (1.8 KB gzipped)

## Why the bundle is committed
The dist folder is committed to the repository for Vercel deployment. This ensures the built files are available immediately without requiring a build step on Vercel.

## Deployment
When pushing to GitHub, Vercel will automatically redeploy. The committed dist files will be served directly.

## Updating the hero
When making changes to the hero component:
1. Run `npm run build`
2. Commit the updated dist files
3. Push to trigger deployment
