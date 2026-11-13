import AppCard from '@/shared/components/app-card';

import type { Restaurant } from '../../types/portal';
import DetailRows from '../detail-rows';

interface RestaurantInfoProps {
  restaurant: Restaurant;
  lastSync: string;
}

/** Who runs the restaurant and where it is. */
const RestaurantInfo = ({ restaurant, lastSync }: RestaurantInfoProps) => (
  <AppCard title="Restaurant info">
    <DetailRows
      rows={[
        { label: 'Store', value: `#${restaurant.storeNumber}` },
        { label: 'Region', value: restaurant.region },
        { label: 'Owner', value: restaurant.owner },
        { label: 'Admin', value: restaurant.admin },
        { label: 'Address', value: restaurant.address },
        { label: 'Last sync', value: lastSync },
      ]}
    />
  </AppCard>
);

export default RestaurantInfo;
