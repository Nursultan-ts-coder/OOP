import { decomposeColor } from '@mui/material/styles';

import type { HealthStatus } from '@/shared/types/common';

/**
 * Color generation for map features.
 *
 * The country palettes are deterministic functions of a feature index rather than a fixed
 * token list, so an arbitrary number of countries on screen still get visually distinct fills
 * without maintaining a palette per market.
 */

/** Per-country fill color: a fixed blue hue with index-varied saturation and lightness. */
export const getCountryColor = (idx: number) => {
  const hue = 220;
  const sat = 60 + ((idx * 17) % 30); // 60%–89% saturation
  const light = 40 + ((idx * 23) % 30); // 40%–69% lightness
  return `hsl(${hue}, ${sat}%, ${light}%)`;
};

/** Hover/highlight variant of {@link getCountryColor}, lightened by 30 percentage points. */
export const getHighlightColor = (idx: number) => {
  const hue = 220;
  const sat = 60 + ((idx * 17) % 30); // 60%–89% saturation
  const light = 70 + ((idx * 23) % 30); // 70%–99% lightness
  return `hsl(${hue}, ${sat}%, ${light}%)`;
};

/** Deep variant of {@link getCountryColor} for outlines on a light basemap, 20 points darker. */
export const getDeepCountryColor = (idx: number) => {
  const hue = 220;
  const sat = 60 + ((idx * 17) % 30); // 60%–89% saturation
  const light = 20 + ((idx * 23) % 30); // 20%–49% lightness
  return `hsl(${hue}, ${sat}%, ${light}%)`;
};

/** Single accent color used for the selected country on the globe. */
export const getHighlightCountryColor = () => {
  const hue = 255;
  const sat = 100;
  // Has no variable input, so it always evaluates to 95% (pinned in map-colors.test.ts).
  const light = 65 + ((150 * 7) % 34);
  return `hsl(${hue}, ${sat}%, ${light}%)`;
};

/** Service-layer fill color for a country, by its health status (`theme.palette.location`). */
export const getServiceColor = (
  status: HealthStatus | undefined,
  locationColors: Record<HealthStatus, string>
) => {
  if (!status) {
    return 'transparent';
  }
  return locationColors[status] || 'transparent';
};

/** `[r, g, b]` channels (0–255) of a CSS color, as deck.gl takes them. */
export type RgbChannels = [number, number, number];

export const toRgbChannels = (color: string): RgbChannels => {
  const [r, g, b] = decomposeColor(color).values;
  return [r, g, b];
};
