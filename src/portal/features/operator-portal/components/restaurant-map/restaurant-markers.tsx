import { useTheme } from '@mui/material/styles';
import { useMap } from '@vis.gl/react-google-maps';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ClusterProperties } from 'supercluster';

import { useDeckLayersRegistry } from '@/shared/components/maps/components/base-map/deck-layers-context';
import { useSupercluster } from '@/shared/components/maps/hooks/use-supercluster';
import {
  clusterColor,
  clusterColorDim,
  createClusterLayers,
} from '@/shared/components/maps/layers/cluster-layers';
import { DEFAULT_SUPERCLUSTER_OPTIONS } from '@/shared/const/map';
import { useMapTheme } from '@/shared/hooks/use-map-theme';
import { toRgbChannels } from '@/shared/utils/map-colors';
import { onClusterClick } from '@/shared/utils/map-viewport';

import { useAnimationClock } from '../../hooks/use-animation-clock';
import type { Restaurant, StoreStatus } from '../../types/portal';
import { pinIconUrl, storeStatusToHealth, worstStoreStatus } from '../../utils/map-markers';
import { resolveToneColor, storeStatusToTone } from '../../utils/status';
import { createPulseLayer } from './pulse-layer';

const LAYER_ID = 'operator-portal-restaurants';
/** Pixels kept free around the restaurants when the map frames them. */
const FIT_PADDING = 48;
/** How close the map comes when one restaurant is left: its streets around it. */
const SINGLE_STORE_ZOOM = 14;

type MarkerProperties = { id: string; status: StoreStatus };

interface RestaurantMarkersProps {
  restaurants: Restaurant[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const statusOf = (feature: Feature<Point>): StoreStatus =>
  (feature.properties as MarkerProperties | null)?.status ?? 'UNKNOWN';

/**
 * The restaurants on grafana's map, built from grafana's own clustering (useSupercluster) and
 * marker layers (createClusterLayers): sharp pins in their status color, clusters in their worst
 * restaurant's color, and the Next map's pulse under every Down pin and every cluster holding
 * one. Frames all restaurants once the map is up.
 */
const RestaurantMarkers = ({ restaurants, selectedId, onSelect }: RestaurantMarkersProps) => {
  const map = useMap();
  const registry = useDeckLayersRegistry();
  const theme = useTheme();
  const { cluster } = useMapTheme();
  // The restaurants last framed: the map re-frames when a search or tab changes them.
  const framedKeyRef = useRef('');

  const geojson = useMemo<FeatureCollection<Point, MarkerProperties>>(
    () => ({
      type: 'FeatureCollection',
      features: restaurants.map((restaurant) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [restaurant.coordinates.lng, restaurant.coordinates.lat],
        },
        properties: { id: restaurant.id, status: restaurant.status },
      })),
    }),
    [restaurants]
  );
  const { clusters, getLeaves, getClusterExpansionZoom } = useSupercluster(
    geojson,
    DEFAULT_SUPERCLUSTER_OPTIONS
  );

  // The worst status under each pin or cluster on screen.
  const worstOf = useCallback(
    (feature: Feature<Point>): StoreStatus => {
      const clusterId = (feature.properties as ClusterProperties | null)?.cluster_id;
      if (!feature.properties?.cluster || clusterId === undefined) return statusOf(feature);
      return worstStoreStatus((getLeaves(clusterId) as Feature<Point>[]).map(statusOf));
    },
    [getLeaves]
  );
  const statusFill = useCallback(
    (status: StoreStatus) => resolveToneColor(theme.palette, storeStatusToTone(status)),
    [theme]
  );

  const baseLayers = useMemo(
    () =>
      createClusterLayers({
        id: LAYER_ID,
        data: clusters as Feature<Point>[],
        getMarkerIconUrl: (feature) => pinIconUrl(statusFill(statusOf(feature))),
        getClusterColor: (feature) =>
          clusterColor(storeStatusToHealth(worstOf(feature)), cluster.health),
        getClusterAuraColor: (feature) =>
          clusterColorDim(storeStatusToHealth(worstOf(feature)), cluster.health),
        clusterLabelColor: cluster.label,
        onMarkerClick: (feature) => onSelect((feature.properties as MarkerProperties).id),
        onClusterClick: (feature) => {
          const clusterId = (feature.properties as ClusterProperties).cluster_id;
          onClusterClick({
            map,
            feature,
            leaves: getLeaves(clusterId) as Feature<Point>[],
            expansionZoomGetter: () => getClusterExpansionZoom(clusterId),
          });
        },
        isMarkerSelected: (feature) => (feature.properties as MarkerProperties).id === selectedId,
      }),
    [
      clusters,
      cluster,
      statusFill,
      worstOf,
      onSelect,
      map,
      getLeaves,
      getClusterExpansionZoom,
      selectedId,
    ]
  );

  const pulsing = useMemo(
    () => (clusters as Feature<Point>[]).filter((feature) => worstOf(feature) === 'DOWN'),
    [clusters, worstOf]
  );
  const now = useAnimationClock(pulsing.length > 0);
  const downColor = useMemo(() => toRgbChannels(statusFill('DOWN')), [statusFill]);

  useEffect(() => {
    if (!registry) return;
    const [aura, ...rest] = baseLayers;
    // The pulse sits above the cluster aura and under the cluster cores and pins.
    const pulse =
      pulsing.length > 0 ? [createPulseLayer(`${LAYER_ID}-pulse`, pulsing, downColor, now)] : [];
    registry.registerLayers(LAYER_ID, [aura, ...pulse, ...rest]);
  }, [registry, baseLayers, pulsing, downColor, now]);

  useEffect(() => (registry ? () => registry.unregisterLayers(LAYER_ID) : undefined), [registry]);

  useEffect(() => {
    if (!map || restaurants.length === 0) return;
    const key = restaurants.map(({ id }) => id).join(',');
    if (key === framedKeyRef.current) return;
    framedKeyRef.current = key;
    if (restaurants.length === 1) {
      map.setCenter(restaurants[0].coordinates);
      map.setZoom(SINGLE_STORE_ZOOM);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    restaurants.forEach(({ coordinates }) => bounds.extend(coordinates));
    map.fitBounds(bounds, FIT_PADDING);
  }, [map, restaurants]);

  return null;
};

export default RestaurantMarkers;
