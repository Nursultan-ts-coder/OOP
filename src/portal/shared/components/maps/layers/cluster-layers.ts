import type { PickingInfo } from '@deck.gl/core';
import { IconLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Feature, Point } from 'geojson';
import type { ClusterProperties } from 'supercluster';

import {
  CLUSTER_AURA_ALPHA,
  CLUSTER_AURA_RADIUS,
  CLUSTER_CORE_RADIUS,
  CLUSTER_FILL_ALPHA,
  CLUSTER_TEXT_SIZE,
  LOCATION_ICON_SIZE,
  SELECTED_LOCATION_ICON_SIZE,
} from '@/shared/const/map';
import type { ClusterPalette } from '@/shared/hooks/use-map-theme';

export type RGBA = [number, number, number, number];
type MarkerIcon = {
  url: string;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
};

export type ClusterColorAccessor = RGBA | ((feature: Feature<Point>) => RGBA);

export type ClusterLayersConfig = {
  id: string;
  data: Feature<Point>[];
  getMarkerIconUrl: (feature: Feature<Point>, isSelected: boolean) => string;
  getClusterColor: ClusterColorAccessor;
  getClusterAuraColor: ClusterColorAccessor;
  /** Color of the point count drawn on each cluster (`useMapTheme().cluster.label`). */
  clusterLabelColor: RGBA;
  onMarkerClick: (feature: Feature<Point>) => void;
  onClusterClick: (feature: Feature<Point>) => void;
  isMarkerSelected?: (feature: Feature<Point>) => boolean;
};
/**
 * Cluster core fill for a health status or technology, from a `useMapTheme().cluster` palette.
 * The alpha mirrors the cluster SVG artwork (fill `#rrggbb9e`, ~62% opacity).
 */
export function clusterColor(key: string | undefined, palette: ClusterPalette): RGBA {
  const [r, g, b] =
    (key && palette.colors[key as keyof ClusterPalette['colors']]) || palette.fallback;
  return [r, g, b, CLUSTER_FILL_ALPHA];
}

/** The faint outer aura around a cluster, in the same color as its core. */
export function clusterColorDim(key: string | undefined, palette: ClusterPalette): RGBA {
  const [r, g, b] = clusterColor(key, palette);
  return [r, g, b, CLUSTER_AURA_ALPHA];
}

export function createClusterLayers({
  id,
  data,
  getMarkerIconUrl,
  getClusterColor,
  getClusterAuraColor,
  clusterLabelColor,
  onMarkerClick,
  onClusterClick,
  isMarkerSelected = () => false,
}: ClusterLayersConfig) {
  const clusterFeatures = data.filter((feature) => feature.properties?.cluster);
  const markerFeatures = data.filter((feature) => !feature.properties?.cluster);

  return [
    createClusterAuraLayer(`${id}-cluster-aura`, clusterFeatures, getClusterAuraColor),
    createClusterCoreLayer(`${id}-cluster-core`, clusterFeatures, getClusterColor, (info) => {
      if (info.object) onClusterClick(info.object);
    }),
    new IconLayer({
      id: `${id}-markers`,
      data: markerFeatures,
      pickable: true,
      getPosition: (feature: Feature<Point>) => feature.geometry.coordinates as [number, number],
      getIcon: (feature: Feature<Point>) =>
        getMarkerIcon(getMarkerIconUrl(feature, isMarkerSelected(feature))),
      getSize: (feature: Feature<Point>) =>
        isMarkerSelected(feature) ? SELECTED_LOCATION_ICON_SIZE : LOCATION_ICON_SIZE,
      sizeScale: 1,
      onClick: (info: PickingInfo<Feature<Point>>) => {
        if (info.object) onMarkerClick(info.object);
      },
    }),
    createClusterTextLayer(`${id}-cluster-labels`, clusterFeatures, clusterLabelColor),
  ];
}

const markerIcons = new Map<string, MarkerIcon>();

function getMarkerIcon(url: string): MarkerIcon {
  const cachedIcon = markerIcons.get(url);
  if (cachedIcon) return cachedIcon;

  const icon = {
    url,
    width: 320,
    height: 296,
    anchorX: 160,
    anchorY: 296,
  };
  markerIcons.set(url, icon);
  return icon;
}

function createClusterTextLayer(
  id: string,
  data: Feature<Point>[],
  color: RGBA
): TextLayer<Feature<Point>> {
  return new TextLayer({
    id,
    data,
    pickable: false,
    getPosition: (d: Feature<Point>) => d.geometry.coordinates as [number, number],
    getText: (d: Feature<Point>) => String((d.properties as ClusterProperties).point_count),
    getSize: CLUSTER_TEXT_SIZE,
    getColor: color,
    getTextAnchor: 'middle' as const,
    getAlignmentBaseline: 'center' as const,
    fontWeight: 'bold',
  });
}

const createClusterCoreLayer = (
  id: string,
  data: Feature<Point>[],
  fillColor: ClusterColorAccessor,
  onClick: (info: PickingInfo<Feature<Point>>) => void
) =>
  new ScatterplotLayer({
    id,
    data,
    pickable: true,
    getPosition: (d: Feature<Point>) => d.geometry.coordinates as [number, number],
    getRadius: CLUSTER_CORE_RADIUS,
    radiusUnits: 'pixels' as const,
    getFillColor: fillColor,
    stroked: false,
    onClick,
  });

const createClusterAuraLayer = (
  id: string,
  data: Feature<Point>[],
  auraColor: ClusterColorAccessor
) =>
  new ScatterplotLayer({
    id,
    data,
    pickable: false,
    getPosition: (d: Feature<Point>) => d.geometry.coordinates as [number, number],
    getRadius: CLUSTER_AURA_RADIUS,
    radiusUnits: 'pixels' as const,
    getFillColor: auraColor,
    stroked: false,
  });
