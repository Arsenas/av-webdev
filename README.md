# arsenij.dev

React, TypeScript and Vite portfolio for Shopify technical support and front-end freelance work. English, Lithuanian and Russian copy lives in `src/i18n`.

## Development

```sh
npm ci
npm run dev
npm run build
npm run lint
```

Vercel serves the `dist` build. `vercel.json` rewrites incoming paths to the SPA entry point so links such as `/contacts` and `/services` work on direct visits and refreshes. Unknown routes render the app’s 404 page.

## Content and contact

- Update services and profile copy in all three translation files.
- Portfolio screenshots are listed in `src/data/portfolio.json`. Add only completed work with permission to display it; current entries are website work, not Shopify case studies.
- The contact form uses the existing Formspree endpoint `manbgjlg`. HTTP/network failures keep the entered message and show an email fallback.
- Confirm receipt of a real test inquiry with the owner after deployment. Automated checks must mock submissions to avoid sending messages.

## Deployment review

Before merging, inspect the deployment preview at desktop and mobile widths, switch all three languages, open/close the menu and portfolio dialog with keyboard controls, and refresh `/contacts` and `/services`. The Vercel rewrite can only be verified on a Vercel deployment; Vite’s local SPA fallback does not validate it.
