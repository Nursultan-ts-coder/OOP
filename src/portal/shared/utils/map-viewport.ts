import type { Feature, Point } from 'geojson';
import type { ClusterProperties } from 'supercluster';

import { defaultMaxZoom } from '@/shared/const/map';

/** Zoom level a single location is framed at when focused directly. */
const FOCUSED_FEATURE_ZOOM = 16;

/**
 * Camera movements that frame map features — panning and zooming the viewport in response
 * to a user interaction, independent of how those features are styled or rendered.
 */

export type ClusterClickProps = {
  map: google.maps.Map | null;
  feature: Feature<Point>;
  leaves: Feature<Point>[];
  expansionZoomGetter: (clusterId: number) => number | undefined;
};

/**
 * Zooms into a clicked cluster.
 *
 * Prefers supercluster's expansion zoom (the level at which the cluster breaks apart); when
 * that is unavailable, falls back to fitting the bounding box of the cluster's leaves.
 */
export const onClusterClick = ({
  map,
  feature,
  leaves,
  expansionZoomGetter,
}: ClusterClickProps) => {
  if (!map) return;
  const clusterProperties = feature.properties as ClusterProperties;
  const clusterId = clusterProperties.cluster_id;
  const [lng, lat] = feature.geometry.coordinates;
  const expansionZoom = expansionZoomGetter(clusterId);
  if (typeof expansionZoom === 'number') {
    map.panTo({ lat, lng });
    map.setZoom(Math.min(expansionZoom + 1, defaultMaxZoom));
    return;
  }

  if (!leaves.length) return;
  let minLat = Infinity,
    maxLat = -Infinity,
    minLng = Infinity,
    maxLng = -Infinity;

  leaves.forEach((leaf) => {
    const [llng, llat] = leaf.geometry.coordinates;
    if (llng < minLng) minLng = llng;
    if (llng > maxLng) maxLng = llng;
    if (llat < minLat) minLat = llat;
    if (llat > maxLat) maxLat = llat;
  });

  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(minLat, minLng),
    new google.maps.LatLng(maxLat, maxLng)
  );
  map.fitBounds(bounds);
};

/** Centers the map on a single location feature without zooming back out. */
export function focusFeature(map: google.maps.Map, feature: Feature<Point>) {
  const [lng, lat] = feature.geometry.coordinates;
  map.panTo({ lat, lng });
  map.setZoom(Math.max(map.getZoom() ?? 0, FOCUSED_FEATURE_ZOOM));
}
