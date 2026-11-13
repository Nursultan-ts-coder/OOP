import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { Alert } from '@mui/material';
import { useState } from 'react';

import WidgetWrapper from '@/shared/components/widget-wrapper';

import { portfolioPath } from '../../const/paths';
import { usePortfolio } from '../../hooks/use-portfolio';
import { filterRestaurants, hiddenRestaurantCount } from '../../utils/restaurant';
import MaintenanceCard from '../maintenance-card';
import PortalHeader from '../portal-header';
import type { PortalTabItem } from '../portal-tabs';
import PortalTabs from '../portal-tabs';
import PortfolioHealth from '../portfolio-health';
import PortfolioMap from '../portfolio-map';
import PortfolioSummary from '../portfolio-summary';
import PriorityAttention from '../priority-attention';
import RestaurantGrid from '../restaurant-grid';
import RestaurantSearch from '../restaurant-search';
import RestaurantsTable from '../restaurants-table';
import { PageColumns, PageStack, WidgetColumn } from '../section-grid/section-grid.styled';
import { Toolbar, ToolbarTabs } from './portfolio-overview.styled';

type PortfolioView = 'cards' | 'table' | 'map';

const VIEW_TABS: PortalTabItem<PortfolioView>[] = [
  { key: 'cards', label: 'Cards', icon: <GridViewOutlinedIcon fontSize="small" /> },
  { key: 'table', label: 'Table', icon: <TableRowsOutlinedIcon fontSize="small" /> },
  { key: 'map', label: 'Map', icon: <MapOutlinedIcon fontSize="small" /> },
];

/** The info card row above has five cards; the rail is one of them wide. */
const TOP_CARD_COUNT = 5;

/** The Portfolio page: every restaurant of the owner/operator, its status and what needs attention. */
const PortfolioOverview = () => {
  const { data, isInitialLoading, error } = usePortfolio();
  const [view, setView] = useState<PortfolioView>('cards');
  const [search, setSearch] = useState('');
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const header = <PortalHeader crumbs={[{ label: 'Portfolio', path: portfolioPath() }]} />;

  if (!data) {
    return (
      <PageStack>
        {header}
        <WidgetWrapper
          title="Portfolio"
          isLoading={isInitialLoading}
          error={error}
          isEmpty={!isInitialLoading && !error}
        />
      </PageStack>
    );
  }

  const restaurants = filterRestaurants(data.restaurants, search);
  const hidden = hiddenRestaurantCount(data.summary.total, data.restaurants.length);
  const moreNote = !search && hidden > 0 ? `+${hidden} more restaurants` : undefined;

  return (
    <PageStack>
      {header}
      {isBannerOpen && (
        <Alert
          severity="warning"
          variant="outlined"
          onClose={() => setIsBannerOpen(false)}
          slotProps={{ closeButton: { 'aria-label': 'Dismiss maintenance notice' } }}
        >
          {data.maintenance.bannerText}
        </Alert>
      )}
      <PortfolioSummary summary={data.summary} />
      <PageColumns columns={TOP_CARD_COUNT}>
        <WidgetColumn>
          <Toolbar>
            <RestaurantSearch restaurants={data.restaurants} value={search} onChange={setSearch} />
            <ToolbarTabs>
              <PortalTabs
                items={VIEW_TABS}
                value={view}
                onChange={setView}
                label="Portfolio view"
              />
            </ToolbarTabs>
          </Toolbar>
          {restaurants.length === 0 ? (
            <WidgetWrapper
              isEmpty
              emptyTitle="No restaurants match"
              emptyDescription="Try another store number or city."
              height={160}
            />
          ) : (
            <>
              {view === 'cards' && <RestaurantGrid restaurants={restaurants} />}
              {view === 'table' && <RestaurantsTable restaurants={restaurants} footer={moreNote} />}
              {view === 'map' && (
                <PortfolioMap restaurants={restaurants} initialSelectedId="4023" />
              )}
            </>
          )}
        </WidgetColumn>
        <WidgetColumn>
          <PriorityAttention alerts={data.priorityAlerts} />
          <MaintenanceCard maintenance={data.maintenance} />
          <PortfolioHealth summary={data.summary} />
        </WidgetColumn>
      </PageColumns>
    </PageStack>
  );
};

export default PortfolioOverview;
