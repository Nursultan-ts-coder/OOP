import { useMap } from '@vis.gl/react-google-maps';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { useCallback, useEffect, useMemo } from 'react';
import type { ClusterProperties } from 'supercluster';

import { DEFAULT_SUPERCLUSTER_OPTIONS } from '@/shared/const/map';
import { useMapTheme } from '@/shared/hooks/use-map-theme';
import { onClusterClick } from '@/shared/utils/map-viewport';

import { useDeckLayersRegistry } from '../components/base-map/deck-layers-context';
import type { ClusterColorAccessor, RGBA } from '../layers/cluster-layers';
import { createClusterLayers } from '../layers/cluster-layers';
import { useSupercluster } from './use-supercluster';

type GetLeaves = (clusterId: number) => Feature<Point>[];
type ClusterColorRule =
  ClusterColorAccessor | ((feature: Feature<Point>, getLeaves: GetLeaves) => RGBA);

type UseClusterLayersOptions = {
  id: string;
  geojson: FeatureCollection<Point>;
  getMarkerIconUrl: (feature: Feature<Point>, isSelected: boolean) => string;
  getClusterColor: ClusterColorRule;
  getClusterAuraColor: ClusterColorRule;
  onMarkerClick: (feature: Feature<Point>) => void;
  isMarkerSelected?: (feature: Feature<Point>) => boolean;
};

export function useClusterLayers({
  id,
  geojson,
  getMarkerIconUrl,
  getClusterColor,
  getClusterAuraColor,
  onMarkerClick,
  isMarkerSelected,
}: UseClusterLayersOptions): void {
  const map = useMap();
  const registry = useDeckLayersRegistry();
  const { cluster } = useMapTheme();
  const { clusters, getClusterExpansionZoom, getLeaves } = useSupercluster(
    geojson,
    DEFAULT_SUPERCLUSTER_OPTIONS
  );

  const handleClusterClick = useCallback(
    (feature: Feature<Point>) => {
      if (!map) return;
      const clusterId = (feature.properties as ClusterProperties).cluster_id;
      onClusterClick({
        map,
        feature,
        leaves: getLeaves(clusterId) as Feature<Point>[],
        expansionZoomGetter: () => getClusterExpansionZoom(clusterId),
      });
    },
    [map, getClusterExpansionZoom, getLeaves]
  );

  const layers = useMemo(() => {
    const resolveColorRule = (rule: ClusterColorRule): ClusterColorAccessor =>
      typeof rule === 'function' ? (feature) => rule(feature, getLeaves as GetLeaves) : rule;

    return createClusterLayers({
      id,
      data: clusters,
      getMarkerIconUrl,
      getClusterColor: resolveColorRule(getClusterColor),
      getClusterAuraColor: resolveColorRule(getClusterAuraColor),
      clusterLabelColor: cluster.label,
      onMarkerClick,
      onClusterClick: handleClusterClick,
      isMarkerSelected,
    });
  }, [
    id,
    clusters,
    cluster.label,
    getMarkerIconUrl,
    getClusterColor,
    getClusterAuraColor,
    onMarkerClick,
    handleClusterClick,
    isMarkerSelected,
    getLeaves,
  ]);

  useEffect(() => {
    if (!registry) return;
    registry.registerLayers(id, layers);
    return () => registry.unregisterLayers(id);
  }, [registry, id, layers]);
}
