# Analytics activation

Set `VITE_GA_MEASUREMENT_ID` to the real GA4 web stream ID (`G-...`) in Vercel production environment variables, then redeploy. No requests to Google Analytics are made without a valid ID and explicit cookie acceptance.

In the GA4 web stream enhanced measurement settings, disable page views based on browser history changes and automatic form interactions. This app sends its own route page views and form events; leaving automatic equivalents enabled can double-count them. Mark `generate_lead` as a key event. It fires only after Formspree confirms success. Verify in GA4 Realtime/DebugView after accepting cookies; reject/withdraw consent to check tracking stops. Automated contact form tests should mock Formspree rather than submit real enquiries.

Events: `page_view`, `contact_cta_click`, `contact_click`, `contact_form_submit`, `generate_lead`, `contact_form_error`, `file_download`, `outbound_click`. Contact fields, message contents and URL query strings are not included in custom event payloads.

Add/verify `arsenij.dev` in Google Search Console and submit `https://arsenij.dev/sitemap.xml`. Property verification and Analytics reporting need account access; site source alone cannot confirm them. Rankings are not guaranteed by these changes.
