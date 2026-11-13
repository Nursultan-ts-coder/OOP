import { useMap } from '@vis.gl/react-google-maps';
import type { BBox } from 'geojson';
import { useEffect, useState } from 'react';

type MapViewportOptions = {
  padding?: number;
};

export function useMapViewport({ padding = 0 }: MapViewportOptions = {}) {
  const map = useMap();
  const [bbox, setBbox] = useState<BBox | null>(null);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (!map) return;

    const compute = () => {
      const bounds = map.getBounds();
      const z = map.getZoom();
      const projection = map.getProjection();
      if (!bounds || !z || !projection) return;

      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const paddingDegrees = degreesPerPixel(z) * padding;
      const n = Math.min(90, ne.lat() + paddingDegrees);
      const s = Math.max(-90, sw.lat() - paddingDegrees);
      const w = sw.lng() - paddingDegrees;
      const e = ne.lng() + paddingDegrees;
      setBbox([w, s, e, n]);
      setZoom(z);
    };

    // Try compute immediately when bounds are available
    if (map.getBounds()) {
      requestAnimationFrame(compute);
    }

    // Keep updating on idle thereafter
    const idleListener = map.addListener('idle', compute);

    return () => {
      idleListener.remove();
    };
  }, [map, padding]);

  return { bbox, zoom };
}

function degreesPerPixel(zoomLevel: number) {
  // 360° divided by the number of pixels at the zoom-level
  return 360 / (Math.pow(2, zoomLevel) * 256);
}
