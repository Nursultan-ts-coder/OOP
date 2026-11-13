import type { Layer } from '@deck.gl/core';
import { createContext, useContext } from 'react';

export interface DeckLayersContextValue {
  registerLayers: (id: string, layers: Layer[]) => void;
  unregisterLayers: (id: string) => void;
  /**
   * If a pickable deck.gl object exists at the given LatLng, dispatch its
   * layer's onClick and return true. Used by CountryPolygons to let marker
   * clicks win over country-polygon clicks when both sit at the same point.
   */
  tryPickAndDispatchAtLatLng: (
    latLng: google.maps.LatLng | google.maps.LatLngLiteral,
    domEvent?: MouseEvent
  ) => boolean;
}

export const DeckLayersContext = createContext<DeckLayersContextValue | null>(null);

export function useDeckLayersRegistry(): DeckLayersContextValue | null {
  return useContext(DeckLayersContext);
}
