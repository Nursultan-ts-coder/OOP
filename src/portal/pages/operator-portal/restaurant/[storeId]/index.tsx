import { useParams } from 'react-router-dom';

import { RestaurantLayout, RestaurantOverview } from '@/features/operator-portal';

/** A restaurant's Overview tab: `/operator-portal/restaurant/:storeId`. */
const RestaurantOverviewPage = () => {
  const { storeId = '' } = useParams<{ storeId: string }>();

  return (
    <RestaurantLayout storeId={storeId} tab="overview">
      <RestaurantOverview storeId={storeId} />
    </RestaurantLayout>
  );
};

export default RestaurantOverviewPage;
