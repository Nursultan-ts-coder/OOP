import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import AppCard from '@/shared/components/app-card';
import Table from '@/shared/components/table';

import { restaurantPath } from '../../const/paths';
import type { Restaurant } from '../../types/portal';
import { columns } from './columns';

interface RestaurantsTableProps {
  restaurants: Restaurant[];
  footer?: string;
}

/** The portfolio in grafana's Table (sorting, paging, sticky header); a row opens its restaurant. */
const RestaurantsTable = ({ restaurants, footer }: RestaurantsTableProps) => {
  const navigate = useNavigate();

  return (
    <AppCard title="Restaurants" subtitle="Sort by any column; pick a row to open it">
      <Table
        data={restaurants}
        columns={columns}
        onRowClick={(restaurant) => navigate(restaurantPath(restaurant.id))}
      />
      {footer && (
        <Typography variant="body2" color="text.secondary" align="center">
          {footer}
        </Typography>
      )}
    </AppCard>
  );
};

export default RestaurantsTable;
