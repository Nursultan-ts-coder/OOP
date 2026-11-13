import type { PortalSettings } from './constants';

declare global {
  interface Window {
    /** Read by the portal's code where the standalone app reads `import.meta.env` (webpack.config.ts). */
    __OPERATOR_PORTAL_CONFIG__?: { googleMapsApiKey?: string };
  }
}

/** Hands the app's settings to the portal; call it before the portal's pages load. */
export function applyPortalSettings(settings: PortalSettings | undefined) {
  window.__OPERATOR_PORTAL_CONFIG__ = { googleMapsApiKey: settings?.googleMapsApiKey?.trim() || undefined };
}
