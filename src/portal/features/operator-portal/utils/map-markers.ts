import markerSvg from '@/shared/components/maps/assets/marker-success.svg?raw';
import { HealthStatus } from '@/shared/types/common';

import type { StoreStatus } from '../types/portal';

/** Worst first: a cluster takes the color of its worst restaurant. */
const SEVERITY: StoreStatus[] = ['DOWN', 'DEGRADED', 'UNKNOWN', 'HEALTHY'];

/**
 * grafana's restaurant pin (golden arches on a map pin, maps/assets/marker-success.svg), redrawn
 * in any fill and at 8x its 40 x 37 size. deck.gl rasterizes an SVG at the size it declares, and
 * the IconLayer draws markers from a 320 x 296 box (cluster-layers.ts), so the declared size has to
 * match that box for the pin to stay sharp.
 */
// eslint-disable-next-line no-restricted-syntax -- the pin artwork's own fill, swapped for the status color
const ARTWORK_FILL = 'fill="#004B10"';
const pinUris = new Map<string, string>();

export function pinIconUrl(fill: string): string {
  const cached = pinUris.get(fill);
  if (cached) return cached;
  const svg = markerSvg
    .replace('width="40" height="37"', 'width="320" height="296"')
    .replace(ARTWORK_FILL, `fill="${fill}"`);
  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  pinUris.set(fill, uri);
  return uri;
}

/** The grafana health status a store status counts as, for cluster colors. */
export function storeStatusToHealth(status: StoreStatus): HealthStatus {
  switch (status) {
    case 'HEALTHY':
      return HealthStatus.healthy;
    case 'DEGRADED':
      return HealthStatus.warning;
    case 'DOWN':
      return HealthStatus.critical;
    default:
      return HealthStatus.unknown;
  }
}

/** The most severe of some store statuses (`UNKNOWN` for none). */
export function worstStoreStatus(statuses: StoreStatus[]): StoreStatus {
  return SEVERITY.find((status) => statuses.includes(status)) ?? 'UNKNOWN';
}
