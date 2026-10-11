import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const pages = JSON.parse(await readFile('src/data/seo.json', 'utf8'));
const template = await readFile('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  for (const path of [...Object.keys(pages), '/404']) {
    const known = pages[path];
    const [title, description] = known || ['Page not found | Arsenij.dev', 'The requested page could not be found.'];
    let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
    for (const name of ['description', 'og:description', 'twitter:description']) html = html.replace(new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*"`, 's'), `$1${escape(description)}"`);
    for (const name of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*"`, 's'), `$1${escape(title)}"`);
    const url = `https://arsenij.dev${path}`;
    html = html.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`).replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`);
    if (!known) html = html.replace('<meta name="robots" content="index,follow" />', '<meta name="robots" content="noindex,follow" />').replace(/<link rel="canonical"[^>]+>/, '');
    html = html.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
    const directory = path === '/' ? 'dist' : `dist${path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
    if (path === '/404') await writeFile('dist/404.html', html);
  }
} finally { await server.close(); }
console.log(`Prerendered ${Object.keys(pages).length} pages and the 404 page.`);
