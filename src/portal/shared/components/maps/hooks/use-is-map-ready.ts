import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function useIsMapReady() {
  const map = useMap();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!map) return;

    // If map is already ready (fast loads), set immediately
    if (map.getBounds()) {
      setIsReady(true);
      return;
    }

    const handleTilesLoaded = () => {
      setIsReady(true);
      google.maps.event.removeListener(listener);
    };

    const listener = map.addListener('tilesloaded', handleTilesLoaded);

    return () => listener.remove?.();
  }, [map]);

  return isReady;
}
