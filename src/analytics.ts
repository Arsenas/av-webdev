type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer: unknown[]; gtag?: Gtag; } }
const id = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ||
  (typeof window !== 'undefined' && ['arsenij.dev', 'www.arsenij.dev'].includes(window.location.hostname)
    ? 'G-MGSVZQY4GW' : undefined);
let started = false;
let allowed = false;
let lastPage = '';
let previousPage = '';
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (allowed && started) window.gtag?.('event', name, params);
}
export function trackPageView(pathname: string) {
  if (!allowed || !started || pathname === lastPage) return;
  lastPage = pathname;
  const location = `${window.location.origin}${pathname}`;
  trackEvent('page_view', { page_title: document.title, page_location: location, page_referrer: previousPage || document.referrer });
  previousPage = location;
}
export function setAnalyticsConsent(accepted: boolean) {
  allowed = accepted;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;
  window[`ga-disable-${id}` as keyof Window] = !accepted as never;
  if (!accepted) {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    lastPage = '';
    return;
  }
  if (!started) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (..._args: unknown[]) { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(script);
    started = true;
  } else window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  trackPageView(window.location.pathname);
}
export function initAnalytics() {
  try { setAnalyticsConsent(localStorage.getItem('cookie-consent:v1') === 'accepted'); } catch { /* Analytics stays disabled. */ }
  document.addEventListener('click', event => {
    const target = event.target as Element;
    const menu = target?.closest?.('.menu-btn');
    if (menu) trackEvent('menu_toggle', { source_page: window.location.pathname });
    const slide = target?.closest?.('.hero-dots button');
    if (slide) trackEvent('hero_slide_select', { slide: slide.textContent?.trim().slice(0, 60) || '' });
    const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const source_page = window.location.pathname;
    if (link.protocol === 'mailto:' || link.protocol === 'tel:') trackEvent('contact_click', { method: link.protocol === 'tel:' ? 'phone' : 'email' });
    else if (link.pathname.endsWith('.pdf') && link.origin === window.location.origin) trackEvent('file_download', { file_name: link.pathname.split('/').pop() || '', file_extension: 'pdf' });
    else if (link.origin !== window.location.origin && link.protocol === 'https:') {
      const params = { link_domain: link.hostname, link_path: link.pathname, source_page };
      trackEvent('outbound_click', params);
      if (link.closest('.project-meta')) trackEvent('project_external_click', { ...params, project_id: source_page.split('/').pop() || '' });
      else if (link.closest('.footer-right')) trackEvent('social_click', { network: link.hostname.replace('www.', ''), source_page });
    }
    else if (link.origin === window.location.origin) {
      if (link.pathname === '/contacts') trackEvent('contact_cta_click', { source_page });
      if (/^\/portfolio\/[^/]+$/.test(link.pathname)) trackEvent('select_content', { content_type: 'portfolio_project', item_id: link.pathname.split('/').pop() || '', source_page });
      if (link.closest('.nav-menu')) trackEvent('navigation_click', { destination: link.pathname, source_page });
      if (link.closest('.project-navigation')) trackEvent('project_navigation', { destination: link.pathname, source_page });
    }
  });
}
