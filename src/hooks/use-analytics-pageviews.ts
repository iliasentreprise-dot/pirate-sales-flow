import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { captureAttribution, trackPageView } from "@/lib/analytics";

/**
 * Sends one GA4 page_view per unique pathname+search, including the first load.
 * Auto page_view is disabled in index.html so nothing is double-counted.
 */
export function useAnalyticsPageviews() {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastPath.current === path) return;
    lastPath.current = path;
    trackPageView(path);
  }, [location.pathname, location.search]);
}
