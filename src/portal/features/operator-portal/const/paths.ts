import type { RestaurantTab } from '../types/portal';

/** Where the portal is mounted, in grafana and in the standalone app alike. */
export const OPERATOR_PORTAL_PATH = '/operator-portal';

/** The route segment of a restaurant's pages, under `OPERATOR_PORTAL_PATH`. */
export const RESTAURANT_SEGMENT = 'restaurant';

/** Where the portal is mounted right now: `OPERATOR_PORTAL_PATH`, unless a host app moved it. */
let portalBasePath = OPERATOR_PORTAL_PATH;

/**
 * Mounts the portal under another path, before it renders: the Grafana app plugin serves it at
 * `/a/<plugin id>`. Every link inside the portal follows.
 */
export const configurePortalBasePath = (path: string) => {
  portalBasePath = path.replace(/\/+$/, '') || OPERATOR_PORTAL_PATH;
};

export const portfolioPath = () => portalBasePath;

/** A restaurant's page; the overview is the restaurant's own path. */
export const restaurantPath = (storeId: string, tab: RestaurantTab = 'overview') => {
  const base = `${portalBasePath}/${RESTAURANT_SEGMENT}/${encodeURIComponent(storeId)}`;
  return tab === 'overview' ? base : `${base}/${tab}`;
};
