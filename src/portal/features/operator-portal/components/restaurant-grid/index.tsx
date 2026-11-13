import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as RouterLink } from 'react-router-dom';

import { restaurantPath } from '../../const/paths';
import type { Restaurant } from '../../types/portal';
import { storeLocation, storeTitle } from '../../utils/restaurant';
import { STORE_STATUS_LABEL, storeStatusToTone } from '../../utils/status';
import ServicePips from '../service-pips';
import StatusChip from '../status-chip';
import {
  CardFooter,
  CardLocation,
  CardTitle,
  CardTop,
  Grid,
  RestaurantCardAction,
  RestaurantCardRoot,
} from './restaurant-grid.styled';

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

/** The portfolio's restaurants as glass cards; each opens its restaurant's page. */
const RestaurantGrid = ({ restaurants }: RestaurantGridProps) => (
  <Grid>
    {restaurants.map((restaurant) => (
      <RestaurantCardRoot
        key={restaurant.id}
        variant="glass"
        data-testid={`card-store-${restaurant.id}`}
      >
        <RestaurantCardAction component={RouterLink} to={restaurantPath(restaurant.id)}>
          <CardTop>
            <CardTitle>{storeTitle(restaurant)}</CardTitle>
            <StatusChip
              tone={storeStatusToTone(restaurant.status)}
              label={STORE_STATUS_LABEL[restaurant.status]}
            />
          </CardTop>
          <CardLocation>{storeLocation(restaurant)}</CardLocation>
          <ServicePips services={restaurant.services} />
          <CardFooter>
            Updated {restaurant.lastUpdate}
            <ChevronRightIcon fontSize="small" aria-hidden="true" />
          </CardFooter>
        </RestaurantCardAction>
      </RestaurantCardRoot>
    ))}
  </Grid>
);

export default RestaurantGrid;
