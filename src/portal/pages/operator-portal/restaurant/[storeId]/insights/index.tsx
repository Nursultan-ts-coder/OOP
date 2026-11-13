import { useParams } from 'react-router-dom';

import { RestaurantInsights, RestaurantLayout } from '@/features/operator-portal';

/** A restaurant's Insights tab: `/operator-portal/restaurant/:storeId/insights`. */
const RestaurantInsightsPage = () => {
  const { storeId = '' } = useParams<{ storeId: string }>();

  return (
    <RestaurantLayout storeId={storeId} tab="insights" tabsNote="Visibility only">
      <RestaurantInsights storeId={storeId} />
    </RestaurantLayout>
  );
};

export default RestaurantInsightsPage;
