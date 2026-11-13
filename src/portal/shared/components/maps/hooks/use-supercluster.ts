import type { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import type { ClusterProperties } from 'supercluster';
import Supercluster from 'supercluster';

import { useMapViewport } from './use-map-viewport';

export function useSupercluster<T extends GeoJsonProperties>(
  geojson: FeatureCollection<Point, T>,
  superclusterOptions: Supercluster.Options<T, ClusterProperties>
) {
  const clusterer = useMemo(() => {
    return new Supercluster(superclusterOptions);
  }, [superclusterOptions]);

  // version-number for the data loaded into the clusterer
  // (this is needed to trigger updating the clusters when data was changed)
  const [version, dataWasUpdated] = useReducer((x: number) => x + 1, 0);

  const { bbox, zoom } = useMapViewport({ padding: 0 });

  useEffect(() => {
    clusterer.load(geojson.features);
    dataWasUpdated();
  }, [clusterer, geojson]);

  const isBboxReady =
    Array.isArray(bbox) &&
    bbox?.length === 4 &&
    bbox.every((n) => typeof n === 'number' && !Number.isNaN(n));

  const clusters = useMemo(() => {
    // don't try to read clusters before data was loaded into the clusterer (version===0),
    // otherwise getClusters will crash
    if (!clusterer || version === 0 || !isBboxReady) return [];

    return clusterer.getClusters(bbox, zoom);
  }, [version, clusterer, bbox, zoom, isBboxReady]);

  const getChildren = useCallback(
    (clusterId: number) => clusterer.getChildren(clusterId),
    [clusterer]
  );

  // note: here, the paging that would be possible is disabled; we found this
  // has no significant performance impact when it's just used in a click event handler.
  const getLeaves = useCallback(
    (clusterId: number) => clusterer.getLeaves(clusterId, Infinity),
    [clusterer]
  );

  const getClusterExpansionZoom = useCallback(
    (clusterId: number) => clusterer.getClusterExpansionZoom(clusterId),
    [clusterer]
  );

  return {
    clusters,
    getChildren,
    getLeaves,
    getClusterExpansionZoom,
    isBboxReady,
  };
}
