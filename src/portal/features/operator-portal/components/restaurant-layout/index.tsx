import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import WidgetWrapper from '@/shared/components/widget-wrapper';

import { portfolioPath, restaurantPath } from '../../const/paths';
import { RESTAURANT_TABS } from '../../const/restaurant-tabs';
import { useRestaurant } from '../../hooks/use-restaurant';
import type { RestaurantTab } from '../../types/portal';
import { storeTitle } from '../../utils/restaurant';
import { STORE_STATUS_LABEL, storeStatusToTone } from '../../utils/status';
import type { Crumb } from '../portal-breadcrumbs';
import PortalHeader from '../portal-header';
import PortalTabs from '../portal-tabs';
import RestaurantSignals from '../restaurant-signals';
import RestaurantSwitcher from '../restaurant-switcher';
import { PageStack } from '../section-grid/section-grid.styled';
import StatusChip from '../status-chip';
import { TabsNote, TabsRow } from './restaurant-layout.styled';

export interface RestaurantLayoutProps {
  storeId: string;
  tab: RestaurantTab;
  /** A note beside the tabs, e.g. "Visibility only". */
  tabsNote?: string;
  children: ReactNode;
}

const TAB_ITEMS = RESTAURANT_TABS.map((tab) => ({
  key: tab.key,
  label: tab.label,
  isDisabled: !tab.isLive,
  title: tab.isLive ? undefined : 'Coming soon',
}));

/**
 * A restaurant's page frame, laid out as the Next app's store page: the breadcrumbs and the
 * restaurant switcher, the restaurant's info cards, then its tabs and the tab's content.
 */
const RestaurantLayout = ({ storeId, tab, tabsNote, children }: RestaurantLayoutProps) => {
  const navigate = useNavigate();
  const { restaurant, restaurants, isInitialLoading, error } = useRestaurant(storeId);

  const crumbs: Crumb[] = [{ label: 'Portfolio', path: portfolioPath() }];
  const storeLabel = restaurant
    ? `${storeTitle(restaurant)} · ${restaurant.city}`
    : `Store #${storeId}`;
  crumbs.push({ label: storeLabel, path: restaurantPath(storeId) });
  if (tab !== 'overview') {
    crumbs.push({ label: RESTAURANT_TABS.find((item) => item.key === tab)?.label ?? tab });
  }

  const header = (
    <PortalHeader
      crumbs={crumbs}
      badge={
        restaurant && (
          <StatusChip
            tone={storeStatusToTone(restaurant.status)}
            label={STORE_STATUS_LABEL[restaurant.status]}
          />
        )
      }
      actions={
        restaurants.length > 0 && (
          <RestaurantSwitcher
            restaurants={restaurants}
            value={restaurant ? storeId : ''}
            onChange={(nextId) => navigate(restaurantPath(nextId, tab))}
          />
        )
      }
    />
  );

  if (!restaurant) {
    return (
      <PageStack>
        {header}
        <WidgetWrapper
          title={`Store #${storeId}`}
          isLoading={isInitialLoading}
          error={error}
          isEmpty={!isInitialLoading && !error}
          emptyTitle="Restaurant not found"
          emptyDescription="This store number is not in your portfolio."
        />
      </PageStack>
    );
  }

  return (
    <PageStack>
      {header}
      <RestaurantSignals restaurant={restaurant} />
      <TabsRow>
        <PortalTabs
          items={TAB_ITEMS}
          value={tab}
          onChange={(next) => navigate(restaurantPath(storeId, next))}
          label="Restaurant pages"
        />
        {tabsNote && <TabsNote>{tabsNote}</TabsNote>}
      </TabsRow>
      {children}
    </PageStack>
  );
};

export default RestaurantLayout;
