import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const pages = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const [path, [title, description]] of Object.entries(pages)) {
  const html = readFileSync(`dist${path === '/' ? '' : path}/index.html`, 'utf8');
  assert.ok(html.includes(`<title>${escape(title)}</title>`), path);
  assert.ok(new RegExp(`<meta\\s+name="description"\\s+content="${escape(description).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html), path);
  assert.ok(html.includes(`<link rel="canonical" href="https://arsenij.dev${path}"`), path);
  assert.ok(html.includes('id="root"><') && html.includes('<h1'), path);
  assert.ok(readFileSync('dist/sitemap.xml', 'utf8').includes(`<loc>https://arsenij.dev${path}</loc>`), path);
}
const notFound = readFileSync('dist/404.html', 'utf8');
assert.ok(notFound.includes('content="noindex,follow"'));
assert.ok(!notFound.includes('rel="canonical"'));
assert.ok(existsSync('dist/portfolio/komilfo.webp'));
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes('Sitemap: https://arsenij.dev/sitemap.xml'));
function analytics(measurementId) {
  const source = readFileSync('src/analytics.ts', 'utf8').replace('import.meta.env.VITE_GA_MEASUREMENT_ID', JSON.stringify(measurementId));
  const js = ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 });
  const scripts = [];
  const listeners = {};
  const window = { location: { origin: 'https://arsenij.dev', pathname: '/services' } };
  const document = { title: 'Services', referrer: 'https://example.com', createElement: () => ({}), head: { append: script => scripts.push(script) }, addEventListener: (name, handler) => { listeners[name] = handler; } };
  const context = { exports: {}, window, document, localStorage: { getItem: () => null } };
  vm.runInNewContext(js, context);
  return { api: context.exports, window, scripts, listeners };
}
const { api, window, scripts } = analytics('G-TEST123');
api.initAnalytics(); api.trackPageView('/services'); assert.equal(scripts.length, 0);
api.setAnalyticsConsent(true); assert.equal(scripts.length, 1);
api.trackPageView('/services');
assert.equal(window.dataLayer.map(item => Array.from(item)).filter(item => item[0] === 'event' && item[1] === 'page_view').length, 1);
api.trackPageView('/contacts'); api.trackEvent('generate_lead', { method: 'contact_form' });
const events = window.dataLayer.map(item => Array.from(item)).filter(item => item[0] === 'event');
assert.equal(events.filter(item => item[1] === 'page_view').length, 2);
assert.equal(events.filter(item => item[1] === 'generate_lead').length, 1);
api.setAnalyticsConsent(false); const count = window.dataLayer.length;
api.trackEvent('generate_lead'); assert.equal(window.dataLayer.length, count);
assert.equal(window['ga-disable-G-TEST123'], true);
for (const id of ['', 'invalid']) {
  const result = analytics(id); result.api.setAnalyticsConsent(true); assert.equal(result.scripts.length, 0);
}
console.log('PASS: rendered SEO on all pages, sitemap, robots, sharing asset, noindex 404, consent gating, route deduplication, lead events and missing-ID behavior.');

const clicks = analytics('G-TEST123');
clicks.api.initAnalytics();
function click(link, selector = '') {
  clicks.listeners.click({ target: { closest: query => query === 'a[href]' ? link : query === selector ? {} : null } });
}
const project = { protocol: 'https:', origin: 'https://arsenij.dev', pathname: '/portfolio/alcemi', closest: () => null };
click(project); assert.equal(clicks.window.dataLayer, undefined);
clicks.api.setAnalyticsConsent(true);
click(project);
click({ protocol: 'mailto:', closest: () => null });
click({ protocol: 'https:', origin: 'https://apps.shopify.com', hostname: 'apps.shopify.com', pathname: '/alcemi', closest: query => query === '.project-meta' ? {} : null });
click(null, '.menu-btn');
const names = clicks.window.dataLayer.map(item => Array.from(item)).filter(item => item[0] === 'event').map(item => item[1]);
for (const name of ['select_content', 'contact_click', 'project_external_click', 'outbound_click', 'menu_toggle']) assert.ok(names.includes(name), name);
clicks.api.setAnalyticsConsent(false);
const previous = clicks.window.dataLayer.length; click(project); assert.equal(clicks.window.dataLayer.length, previous);
console.log('PASS: delegated click events fire after consent and stop after withdrawal.');
