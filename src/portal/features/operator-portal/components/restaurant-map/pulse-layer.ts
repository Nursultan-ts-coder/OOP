import type { Layer } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Feature, Point } from 'geojson';

import { CLUSTER_CORE_RADIUS } from '@/shared/const/map';
import type { RgbChannels } from '@/shared/utils/map-colors';

/*
 * The Next Command Center map's critical pulse (restaurant-map/store-pins.js): a ring grows from
 * the pin's head to 2.6x and fades out, once every 1.4 s.
 */
const PULSE_MS = 1400;
const PULSE_GROWTH = 1.6;
const PULSE_ALPHA = 140;
/** The pin's round head, for a 40px pin anchored at the bottom of its 40 x 37 box. */
const PIN_HEAD_SIZE = 25;
const PIN_HEAD_HEIGHT = 23;

/** A white disc the layer tints (`mask`), so one picture serves every color. */
const RING_ICON = {
  url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="32" fill="white"/></svg>'
  )}`,
  width: 64,
  height: 64,
  mask: true,
};

const isCluster = (feature: Feature<Point>) => Boolean(feature.properties?.cluster);

/** The pulse under the given pins and clusters at time `now` (ms), in `color`. */
export function createPulseLayer(
  id: string,
  data: Feature<Point>[],
  color: RgbChannels,
  now: number
): Layer {
  const phase = (now % PULSE_MS) / PULSE_MS;
  return new IconLayer<Feature<Point>>({
    id,
    data,
    pickable: false,
    getPosition: (feature) => feature.geometry.coordinates as [number, number],
    getIcon: () => RING_ICON,
    getSize: (feature) =>
      (isCluster(feature) ? CLUSTER_CORE_RADIUS * 2 : PIN_HEAD_SIZE) * (1 + PULSE_GROWTH * phase),
    getPixelOffset: (feature) => (isCluster(feature) ? [0, 0] : [0, -PIN_HEAD_HEIGHT]),
    getColor: [...color, Math.round(PULSE_ALPHA * (1 - phase))],
    updateTriggers: { getSize: now },
  });
}
