/**
 * GA4 analytics helper — DropDigital Automatisé
 * The gtag.js tag itself is loaded once in index.html (G-26JFDRLX3T).
 * Never duplicate gtag logic in components: use trackEvent / trackPageView.
 */

export const GA_MEASUREMENT_ID = "G-26JFDRLX3T";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Funnel event names — single source of truth. */
export const AnalyticsEvents = {
  PAGE_VIEW: "page_view",
  VIEW_SALES_PAGE: "view_sales_page",
  CLICK_CTA: "click_cta",
  VIEW_OFFER: "view_offer",
  CLICK_PAYMENT_BUTTON: "click_payment_button",
  BEGIN_CHECKOUT: "begin_checkout",
  /** Only fire on RELIABLE payment confirmation. Never on a button click. */
  PURCHASE: "purchase",
  VIEW_UPSELL: "view_upsell",
  ACCEPT_UPSELL: "accept_upsell",
  DECLINE_UPSELL: "decline_upsell",
  VIEW_THANK_YOU_PAGE: "view_thank_you_page",
  LEAD: "lead",
} as const;

export type AnalyticsEvent =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

type Params = Record<string, unknown>;

const ATTRIBUTION_KEY = "dd_attribution";

type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Capture first-touch acquisition data once per session. */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      referrer: document.referrer || "direct",
      landing_page: window.location.pathname + window.location.search,
    };
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) attribution[key] = value;
    });
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return {};
  }
}

export function getAttribution(): Attribution {
  return captureAttribution();
}

/** Low-level event sender. Safe no-op when gtag is unavailable (blockers, SSR). */
export function trackEvent(eventName: string, parameters: Params = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    ...getAttribution(),
    ...parameters,
  });
}

/** Manual SPA page_view. Auto page_view is disabled in index.html. */
export function trackPageView(path?: string): void {
  if (typeof window === "undefined") return;
  const page_path = path ?? window.location.pathname + window.location.search;
  trackEvent(AnalyticsEvents.PAGE_VIEW, {
    page_title: document.title,
    page_location: window.location.href,
    page_path,
    send_to: GA_MEASUREMENT_ID,
  });
}
