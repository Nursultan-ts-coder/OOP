import { useQuery } from '@tanstack/react-query';

import { MOCK_RESTAURANT_OVERVIEW } from '../const/mock-data';
import type { RestaurantOverview } from '../types/portal';
import { portalQueryKeys } from './query-keys';

// Every restaurant shows store 4023's sample until the API exists; the header cards still follow
// each restaurant's own services (utils/health-signals).
const fetchRestaurantOverview = async (_storeId: string): Promise<RestaurantOverview> =>
  MOCK_RESTAURANT_OVERVIEW;

/** A restaurant's overview: topology, open issues, service checks and its 24-hour trend. */
export const useRestaurantOverview = (storeId: string) =>
  useQuery({
    queryKey: portalQueryKeys.restaurantOverview(storeId),
    queryFn: () => fetchRestaurantOverview(storeId),
    enabled: !!storeId,
  });
