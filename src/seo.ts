import pages from "./data/seo.json";
export function applySeo(pathname: string) {
  const page = (pages as Record<string, string[]>)[pathname];
  const [title, description] = page || ["Page not found | Arsenij.dev", "The requested page could not be found."];
  document.title = title;
  const set = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
  set('meta[name="description"]', description);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
  set('meta[name="twitter:title"]', title);
  set('meta[name="twitter:description"]', description);
  set('meta[property="og:url"]', `https://arsenij.dev${pathname === "/" ? "/" : pathname}`);
  set('meta[name="robots"]', page ? "index,follow" : "noindex,follow");
  let canonical = document.querySelector('link[rel="canonical"]');
  if (page) {
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.append(canonical); }
    canonical.setAttribute("href", `https://arsenij.dev${pathname === "/" ? "/" : pathname}`);
  }
  else canonical?.remove();
}
