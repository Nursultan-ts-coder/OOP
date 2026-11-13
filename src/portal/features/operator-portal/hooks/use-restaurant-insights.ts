import { useQuery } from '@tanstack/react-query';

import { MOCK_RESTAURANT_INSIGHTS } from '../const/mock-data';
import type { RestaurantInsights } from '../types/portal';
import { portalQueryKeys } from './query-keys';

// Store 4023's sample until the API exists.
const fetchRestaurantInsights = async (_storeId: string): Promise<RestaurantInsights> =>
  MOCK_RESTAURANT_INSIGHTS;

/** A restaurant's findings: cable issues, network insights, every service check and the timeline. */
export const useRestaurantInsights = (storeId: string) =>
  useQuery({
    queryKey: portalQueryKeys.restaurantInsights(storeId),
    queryFn: () => fetchRestaurantInsights(storeId),
    enabled: !!storeId,
  });
