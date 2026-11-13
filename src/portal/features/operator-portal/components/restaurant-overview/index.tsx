import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import AppCard from '@/shared/components/app-card';
import WidgetWrapper from '@/shared/components/widget-wrapper';

import { restaurantPath } from '../../const/paths';
import { useRestaurant } from '../../hooks/use-restaurant';
import { useRestaurantOverview } from '../../hooks/use-restaurant-overview';
import ActiveIssues from '../active-issues';
import HealthTrend from '../health-trend';
import NetworkLayout from '../network-layout';
import NetworkSummary from '../network-summary';
import RestaurantInfo from '../restaurant-info';
import { PageColumns, WidgetColumn } from '../section-grid/section-grid.styled';
import ServiceCheckList from '../service-check-list';

/** The info card row above has five cards; the rail is one of them wide. */
const TOP_CARD_COUNT = 5;

interface RestaurantOverviewProps {
  storeId: string;
}

/** A restaurant's Overview tab: its network, open issues and checks, and the 24-hour trend. */
const RestaurantOverview = ({ storeId }: RestaurantOverviewProps) => {
  const { restaurant } = useRestaurant(storeId);
  const { data, isInitialLoading, error } = useRestaurantOverview(storeId);

  if (!data || !restaurant) {
    return (
      <WidgetWrapper
        title="Overview"
        isLoading={isInitialLoading}
        error={error}
        isEmpty={!isInitialLoading && !error}
      />
    );
  }

  return (
    <PageColumns columns={TOP_CARD_COUNT}>
      <WidgetColumn>
        <NetworkLayout topology={data.topology} network={data.network} />
        <ActiveIssues storeId={storeId} issues={data.activeIssues} />
        <AppCard
          title="Service checks"
          subtitle={`${data.serviceChecks.length} monitored`}
          actions={
            <Button
              component={RouterLink}
              to={restaurantPath(storeId, 'insights')}
              size="small"
              color="info"
              endIcon={<ArrowForwardIcon />}
            >
              All checks
            </Button>
          }
        >
          <ServiceCheckList checks={data.serviceChecks} columns={2} />
        </AppCard>
      </WidgetColumn>
      <WidgetColumn>
        <RestaurantInfo restaurant={restaurant} lastSync={data.lastSync} />
        <HealthTrend trend={data.healthTrend} />
        <NetworkSummary network={data.network} />
      </WidgetColumn>
    </PageColumns>
  );
};

export default RestaurantOverview;
