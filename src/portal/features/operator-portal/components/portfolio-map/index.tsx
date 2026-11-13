import { Alert } from '@mui/material';
import { lazy, Suspense, useRef, useState } from 'react';

import AppCard from '@/shared/components/app-card';
import SuspenseLoader from '@/shared/components/suspense-loader';

import { useFillViewportHeight } from '../../hooks/use-fill-viewport-height';
import type { Restaurant } from '../../types/portal';
import { filterByStatus, type StatusFilter } from '../../utils/restaurant';
import { STORE_STATUS_LABEL, STORE_STATUSES, storeStatusToTone } from '../../utils/status';
import type { PortalTabItem } from '../portal-tabs';
import PortalTabs from '../portal-tabs';
import StatusDot from '../status-dot';
import { MapPlaceholder, MapSlot } from './portfolio-map.styled';

const RestaurantMap = lazy(() => import('../restaurant-map'));

/** grafana's map key (the same variable grafana reads); without it the map cannot load. */
const hasMapsKey = () => Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

/** The map reaches the bottom of the window, but never gets shorter than this. */
const MIN_MAP_HEIGHT = 420;
/** Below the map: the card's padding and the page's bottom margin. */
const MAP_BOTTOM_GAP = 40;

/** All, then one tab per status with its color dot, as the Next map's status tabs. */
const STATUS_TABS: PortalTabItem<StatusFilter>[] = [
  { key: 'ALL', label: 'All' },
  ...STORE_STATUSES.map((status) => ({
    key: status,
    label: STORE_STATUS_LABEL[status],
    icon: <StatusDot tone={storeStatusToTone(status)} />,
  })),
];

interface PortfolioMapProps {
  restaurants: Restaurant[];
  /** The restaurant whose info window shows first. */
  initialSelectedId?: string;
}

/**
 * The portfolio on grafana's Google map: one marker per restaurant in its status color, clusters
 * where they overlap, and the picked restaurant's info window, whose title opens its page. The
 * status tabs in the map's top-right corner show only the restaurants in one status, as on the
 * Next Command Center map.
 */
const PortfolioMap = ({ restaurants, initialSelectedId }: PortfolioMapProps) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const slotRef = useRef<HTMLDivElement>(null);
  const mapHeight = useFillViewportHeight(slotRef, {
    minHeight: MIN_MAP_HEIGHT,
    bottomGap: MAP_BOTTOM_GAP,
  });

  const statusTabs = (
    <PortalTabs
      items={STATUS_TABS}
      value={statusFilter}
      onChange={setStatusFilter}
      label="Show restaurants by status"
    />
  );

  return (
    <AppCard title="Restaurant map" subtitle="Pick a marker to see the restaurant">
      <MapSlot ref={slotRef} fillHeight={mapHeight} data-testid="portfolio-map">
        {hasMapsKey() ? (
          <Suspense fallback={<SuspenseLoader />}>
            <RestaurantMap
              restaurants={filterByStatus(restaurants, statusFilter)}
              selectedId={selectedId}
              onSelect={setSelectedId}
              controls={statusTabs}
            />
          </Suspense>
        ) : (
          <MapPlaceholder>
            <Alert severity="info">
              The map needs a Google Maps key. Add VITE_GOOGLE_MAPS_API_KEY to .env.local, or to the
              grafana app&apos;s .env.production, and restart the dev server.
            </Alert>
          </MapPlaceholder>
        )}
      </MapSlot>
    </AppCard>
  );
};

export default PortfolioMap;
