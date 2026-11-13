import { Typography } from '@mui/material';
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomInfoWindow from '@/shared/components/custom-info';
import BaseMap from '@/shared/components/maps/components/base-map';
import FullscreenButton from '@/shared/components/maps/components/base-map/control-buttons/fullscreen-button';
import ZoomControl from '@/shared/components/maps/components/base-map/control-buttons/zoom-control';

import { restaurantPath } from '../../const/paths';
import type { Restaurant } from '../../types/portal';
import { storeLocation, storeTitle } from '../../utils/restaurant';
import { STORE_STATUS_LABEL, storeStatusToTone } from '../../utils/status';
import ServicePips from '../service-pips';
import StatusChip from '../status-chip';
import { InfoBody, MapCorner, MapFrame } from './restaurant-map.styled';
import RestaurantMarkers from './restaurant-markers';

export interface RestaurantMapProps {
  restaurants: Restaurant[];
  selectedId?: string;
  onSelect: (id: string | undefined) => void;
  /** Shown in the map's top-right corner, e.g. the status tabs. */
  controls?: ReactNode;
}

/**
 * grafana's Google map (BaseMap, its zoom and fullscreen controls and info window) with the
 * portfolio's restaurants on it. Loaded lazily: it pulls in Google Maps and deck.gl.
 */
const RestaurantMap = ({ restaurants, selectedId, onSelect, controls }: RestaurantMapProps) => {
  const navigate = useNavigate();
  const frameRef = useRef<HTMLDivElement>(null);
  const selected = restaurants.find((restaurant) => restaurant.id === selectedId);

  return (
    <MapFrame ref={frameRef}>
      <BaseMap variant="country" gestureHandling="cooperative">
        <RestaurantMarkers restaurants={restaurants} selectedId={selectedId} onSelect={onSelect} />

        <MapControl position={ControlPosition.LEFT_TOP}>
          <ZoomControl />
        </MapControl>
        <MapControl position={ControlPosition.LEFT_TOP}>
          <FullscreenButton containerRef={frameRef} />
        </MapControl>
        {controls && (
          <MapControl position={ControlPosition.TOP_RIGHT}>
            <MapCorner>{controls}</MapCorner>
          </MapControl>
        )}

        {selected && (
          <CustomInfoWindow
            key={selected.id}
            isOpen
            onOpenChange={() => onSelect(undefined)}
            position={selected.coordinates}
            title={storeTitle(selected)}
            onClick={() => navigate(restaurantPath(selected.id))}
          >
            <InfoBody>
              <StatusChip
                tone={storeStatusToTone(selected.status)}
                label={STORE_STATUS_LABEL[selected.status]}
                isLarge
              />
              <Typography variant="body1" color="text.secondary">
                {storeLocation(selected)} · {selected.address}
              </Typography>
              <ServicePips services={selected.services} isLarge />
            </InfoBody>
          </CustomInfoWindow>
        )}
      </BaseMap>
    </MapFrame>
  );
};

export default RestaurantMap;
