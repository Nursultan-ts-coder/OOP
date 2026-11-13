import type { Layer } from '@deck.gl/core';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { useTheme } from '@mui/material/styles';
import type { MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { APIProvider, useMap } from '@vis.gl/react-google-maps';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import mapStyles from '../../const/map-styles.json';
import mapStylesLight from '../../const/map-styles-light.json';
import mapStylesLightCountry from '../../const/map-styles-light-country.json';
import { useIsMapReady } from '../../hooks/use-is-map-ready';
import { MapContainer, OverlayContainer, StyledGoogleMap } from './base-map.styled';
import { INITIAL_VIEW_STATE } from './deck-constants';
import { DeckLayersContext } from './deck-layers-context';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type PickedInfo = {
  layer?: { props?: { onClick?: (info: PickedInfo, event?: unknown) => void } } | null;
  object?: unknown;
};

type DeckInternals = {
  _deck?: {
    setProps: (p: Record<string, unknown>) => void;
    getCanvas?: () => HTMLCanvasElement | undefined;
    pickObject?: (opts: { x: number; y: number; radius?: number }) => PickedInfo | null;
  };
  _overlay?: google.maps.OverlayView & {
    draw: () => void;
    getProjection?: () => google.maps.MapCanvasProjection;
  };
};

function DeckOverlay({
  layers,
  overlayRef,
}: {
  layers: Layer[];
  overlayRef: React.MutableRefObject<GoogleMapsOverlay | null>;
}) {
  const map = useMap();
  const isMapReady = useIsMapReady();
  const deckCanvasZIndex = String(useTheme().zIndex.mapCanvas);
  // Tracks the latest layers so Effect A can flush them when the overlay becomes ready,
  // covering the window where Effect B fired before the overlay was created.
  const pendingLayersRef = useRef<Layer[]>(layers);

  useEffect(() => {
    if (!map || !isMapReady) return;

    const overlay = new GoogleMapsOverlay({
      interleaved: false,
      pickingRadius: 8,
      layers: pendingLayersRef.current,
    });
    overlay.setMap(map);
    overlayRef.current = overlay;

    const mapDiv = map.getDiv?.() as HTMLElement | undefined;
    const internals = overlay as unknown as DeckInternals;

    const clickListener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      const deck = internals._deck;
      if (!deck?.pickObject || !mapDiv) return;
      const domEvent = (e as unknown as { domEvent?: MouseEvent }).domEvent;
      if (!domEvent) return;
      const rect = mapDiv.getBoundingClientRect();
      const picked = deck.pickObject({
        x: domEvent.clientX - rect.left,
        y: domEvent.clientY - rect.top,
        radius: 8,
      });
      const onClick = picked?.layer?.props?.onClick;
      if (picked && onClick) onClick(picked, domEvent);
    });

    const innerOverlay = internals._overlay;
    if (innerOverlay && mapDiv) {
      // @vis.gl/react-google-maps wraps the map in extra divs so deck's internal
      // getMapSize() returns 0×0. We patch draw() to push the correct size after
      // every Google Maps render cycle, which overrides the 0×0 that draw() sets.
      const originalDraw = innerOverlay.draw.bind(innerOverlay);
      const patchSize = () => {
        const deck = internals._deck;
        if (!deck) return;
        const { width, height } = mapDiv.getBoundingClientRect();
        const w = Math.round(width);
        const h = Math.round(height);
        if (w <= 0 || h <= 0) return;
        deck.setProps({ width: w, height: h });
        const canvas = deck.getCanvas?.();
        const parent = canvas?.parentElement as HTMLElement | undefined;
        if (parent) {
          parent.style.width = `${w}px`;
          parent.style.height = `${h}px`;
        }
      };
      innerOverlay.draw = () => {
        originalDraw();
        patchSize();
        const canvas = internals._deck?.getCanvas?.();
        const parent = canvas?.parentElement as HTMLElement | undefined;
        if (parent && parent.style.zIndex !== deckCanvasZIndex) {
          parent.style.zIndex = deckCanvasZIndex;
        }
      };
      const triggerDraw = () => {
        try {
          innerOverlay.draw();
        } catch {
          /* ignore */
        }
      };
      requestAnimationFrame(triggerDraw);
      setTimeout(triggerDraw, 100);
      setTimeout(triggerDraw, 500);
    }

    return () => {
      clickListener.remove();
      overlay.setMap(null);
      overlayRef.current = null;
    };
  }, [map, isMapReady]);

  useEffect(() => {
    pendingLayersRef.current = layers;
    overlayRef.current?.setProps({ layers });
  }, [layers]);

  return null;
}

export type BaseMapProps = {
  /** deck.gl layers rendered pixel-aligned on the basemap via GoogleMapsOverlay. */
  layers?: Layer[];
  /**
   * Which light basemap to draw. `global` (default) is a soft slate-tinted map without land-cover
   * shading; `country` is Google's default light map with only the features the dark style hides
   * removed.
   */
  variant?: 'global' | 'country';
  /**
   * `greedy` (default) lets the wheel and one finger move the map. A map with page content below it
   * takes `cooperative`, so they scroll the page and Ctrl/⌘ + wheel or two fingers move the map.
   */
  gestureHandling?: 'greedy' | 'cooperative';
  children?: ReactNode;
};

function BaseMap({
  children,
  layers = [],
  variant = 'global',
  gestureHandling = 'greedy',
}: BaseMapProps) {
  const registryRef = useRef<Map<string, Layer[]>>(new Map());
  const overlayRef = useRef<GoogleMapsOverlay | null>(null);
  // The last camera, so the map re-created for a new color scheme opens where the old one was.
  const cameraRef = useRef({
    center: { lat: INITIAL_VIEW_STATE.latitude, lng: INITIAL_VIEW_STATE.longitude },
    zoom: INITIAL_VIEW_STATE.zoom,
  });
  const handleCameraChanged = useCallback(({ detail }: MapCameraChangedEvent) => {
    cameraRef.current = { center: detail.center, zoom: detail.zoom };
  }, []);
  const [tick, bump] = useReducer((n: number) => n + 1, 0);
  const bumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Coalesces concurrent registerLayers/unregisterLayers calls into one re-render,
  // preventing N countries from each triggering a separate allLayers recomputation.
  const bumpOnce = useCallback(() => {
    if (bumpTimerRef.current !== null) return;
    bumpTimerRef.current = setTimeout(() => {
      bumpTimerRef.current = null;
      bump();
    }, 0);
  }, []);

  const registerLayers = useCallback(
    (id: string, newLayers: Layer[]) => {
      registryRef.current.set(id, newLayers);
      bumpOnce();
    },
    [bumpOnce]
  );

  const unregisterLayers = useCallback(
    (id: string) => {
      registryRef.current.delete(id);
      bumpOnce();
    },
    [bumpOnce]
  );

  const tryPickAndDispatchAtLatLng = useCallback(
    (latLng: google.maps.LatLng | google.maps.LatLngLiteral, domEvent?: MouseEvent): boolean => {
      const overlay = overlayRef.current;
      if (!overlay) return false;
      const internals = overlay as unknown as DeckInternals;
      const deck = internals._deck;
      const innerOverlay = internals._overlay;
      if (!deck?.pickObject || !innerOverlay) return false;
      const projection = innerOverlay.getProjection?.();
      const ll =
        latLng instanceof google.maps.LatLng
          ? latLng
          : new google.maps.LatLng(latLng.lat, latLng.lng);
      const point = projection?.fromLatLngToContainerPixel?.(ll);
      if (!point) return false;
      const picked = deck.pickObject({ x: point.x, y: point.y, radius: 12 });
      const onClick = picked?.layer?.props?.onClick;
      if (picked?.object && onClick) {
        onClick(picked, domEvent);
        return true;
      }
      return false;
    },
    []
  );

  const contextValue = useMemo(
    () => ({ registerLayers, unregisterLayers, tryPickAndDispatchAtLatLng }),
    [registerLayers, unregisterLayers, tryPickAndDispatchAtLatLng]
  );

  // `tick` ensures this re-computes whenever the registry changes.
  const allLayers = useMemo(() => {
    const registered = Array.from(registryRef.current.values()).flat();
    return [...layers, ...registered];
  }, [layers, tick]);

  // Google Maps takes styles as JSON, not CSS, so the map picks its style for the active scheme.
  // Changing `colorScheme` makes the library re-create the map instance, and every layer holds
  // state tied to the old one (loaded GeoJSON, overrides, the deck overlay). Keying the container by
  // scheme remounts the map with all of its layers, so they load onto the new map from scratch.
  const isLight = useTheme().palette.mode === 'light';
  const lightStyles = isLight
    ? variant === 'country'
      ? mapStylesLightCountry
      : mapStylesLight
    : undefined;

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <MapContainer key={isLight ? 'light' : 'dark'}>
        <StyledGoogleMap
          defaultCenter={cameraRef.current.center}
          defaultZoom={cameraRef.current.zoom}
          onCameraChanged={handleCameraChanged}
          styles={lightStyles ?? mapStyles}
          disableDefaultUI
          gestureHandling={gestureHandling}
          minZoom={2}
          colorScheme={isLight ? 'LIGHT' : 'DARK'}
        />
        <DeckOverlay layers={allLayers} overlayRef={overlayRef} />
        {children !== undefined && (
          <OverlayContainer>
            <DeckLayersContext.Provider value={contextValue}>{children}</DeckLayersContext.Provider>
          </OverlayContainer>
        )}
      </MapContainer>
    </APIProvider>
  );
}

export default BaseMap;
