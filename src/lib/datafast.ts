/**
 * DataFast revenue attribution helpers.
 * DataFast drops two first-party cookies on the visitor's browser:
 *  - datafast_visitor_id
 *  - datafast_session_id
 * These must be forwarded to Stripe as PaymentIntent / Checkout metadata
 * so DataFast can attribute the revenue to the right marketing channel.
 */

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getDatafastAttribution(): {
  datafast_visitor_id?: string;
  datafast_session_id?: string;
} {
  const visitorId = readCookie("datafast_visitor_id");
  const sessionId = readCookie("datafast_session_id");
  return {
    ...(visitorId ? { datafast_visitor_id: visitorId } : {}),
    ...(sessionId ? { datafast_session_id: sessionId } : {}),
  };
}
