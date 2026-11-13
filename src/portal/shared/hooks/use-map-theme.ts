import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

import type { TechnologyStatus } from '@/api/generated';
import { HealthStatus } from '@/shared/types/common';
import type { RgbChannels } from '@/shared/utils/map-colors';
import { getDeepCountryColor, getHighlightColor, toRgbChannels } from '@/shared/utils/map-colors';

/** deck.gl cluster colors (no alpha; the cluster layers add it) keyed by status or technology. */
export type ClusterPalette = {
  colors: Partial<Record<HealthStatus | TechnologyStatus, RgbChannels>>;
  /** For a cluster with no status, or with mixed technologies. */
  fallback: RgbChannels;
};

const mapChannels = <Key extends string>(colors: Record<Key, string>) =>
  Object.fromEntries(
    Object.entries<string>(colors).map(([key, color]) => [key, toRgbChannels(color)])
  ) as Record<Key, RgbChannels>;

const buildMapTheme = ({ palette }: Theme) => {
  const isLight = palette.mode === 'light';
  return {
    /** Google Maps Data-layer country outlines and fills. */
    polygon: {
      outline: palette.map.outline,
      outlineActive: palette.map.outlineActive,
      dimmedFill: palette.map.dimmedFill,
      /** The selected country on a single-country map: outlined, not filled. */
      selected: {
        strokeColor: palette.map.outlineActive,
        strokeWeight: isLight ? 3 : 1,
        // The light veil below hides every outline (`strokeOpacity: 0`); the selection must not inherit it.
        strokeOpacity: 1,
        fillColor: 'transparent',
      } satisfies google.maps.Data.StyleOptions,
      /**
       * Every other country on a single-country map. The dark map keeps Google's default Data-layer
       * style (a dark mask around the selected country); the light map veils them in `dimmedFill`.
       */
      surroundings: (isLight
        ? { fillColor: palette.map.dimmedFill, fillOpacity: 0.6, strokeOpacity: 0 }
        : {}) satisfies google.maps.Data.StyleOptions,
      /** Status and GMA country tints; a pale basemap needs a stronger tint to show them. */
      fillOpacity: isLight ? 0.5 : 0.2,
      /** Per-market outline; the light map takes deep shades so they show on a pale basemap. */
      marketOutline: isLight ? getDeepCountryColor : getHighlightColor,
      marketOutlineWeight: isLight ? 2 : 1,
      /** The country clicked on the global map. */
      selectedOutlineWeight: isLight ? 3 : 2,
    },
    /** Country fill by health status (service layer). */
    location: palette.location,
    /** Technology legend colors. */
    technology: palette.technology,
    cluster: {
      health: {
        colors: {
          [HealthStatus.healthy]: toRgbChannels(palette.map.clusterHealthy),
          [HealthStatus.warning]: toRgbChannels(palette.map.clusterWarning),
          [HealthStatus.critical]: toRgbChannels(palette.map.clusterCritical),
        },
        fallback: toRgbChannels(palette.map.clusterDefault),
      } satisfies ClusterPalette,
      technology: {
        colors: mapChannels(palette.technology),
        fallback: toRgbChannels(palette.border.default),
      } satisfies ClusterPalette,
      /** The point count drawn on a cluster. */
      label: [...toRgbChannels(palette.map.clusterLabel), 255] as [number, number, number, number],
    },
  };
};

/** Theme colors for the maps, converted to what Google Maps and deck.gl take. */
export type MapTheme = ReturnType<typeof buildMapTheme>;

/**
 * Map colors read from the MUI theme and memoized per theme, so deck.gl layers and Google Maps
 * styles built from them do not re-create on every render.
 */
export const useMapTheme = (): MapTheme => {
  const theme = useTheme();
  return useMemo(() => buildMapTheme(theme), [theme]);
};
