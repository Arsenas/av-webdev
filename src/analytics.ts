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
    const link = (event.target as Element)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    if (link.protocol === 'mailto:') trackEvent('contact_click', { method: 'email' });
    else if (link.pathname.endsWith('.pdf') && link.origin === window.location.origin) trackEvent('file_download', { file_name: link.pathname.split('/').pop() || '', file_extension: 'pdf' });
    else if (link.origin !== window.location.origin && link.protocol === 'https:') trackEvent('outbound_click', { link_domain: link.hostname, link_path: link.pathname });
    else if (link.pathname === '/contacts') trackEvent('contact_cta_click', { source_page: window.location.pathname });
  });
}
