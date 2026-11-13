import { MenuItem, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';

import { QUICK_SWITCH_STORE_IDS } from '../../const/restaurant-tabs';
import type { Restaurant } from '../../types/portal';
import { storeLocation, storeTitle } from '../../utils/restaurant';
import { STORE_STATUS_LABEL } from '../../utils/status';

interface RestaurantSwitcherProps {
  restaurants: Restaurant[];
  value: string;
  onChange: (storeId: string) => void;
}

/** Restaurants offered first in the switcher, then the rest by store number. */
const orderForSwitcher = (restaurants: Restaurant[]) => {
  const rank = (restaurant: Restaurant) => {
    const index = QUICK_SWITCH_STORE_IDS.indexOf(restaurant.id);
    return index === -1 ? QUICK_SWITCH_STORE_IDS.length : index;
  };
  return [...restaurants].sort(
    (a, b) => rank(a) - rank(b) || a.storeNumber.localeCompare(b.storeNumber)
  );
};

/** The Next app's page filter (layout.js): MUI's small outlined select, its label on the border. */
const RestaurantSwitcher = ({ restaurants, value, onChange }: RestaurantSwitcherProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== value) onChange(event.target.value);
  };

  return (
    <TextField
      select
      size="small"
      id="operator-portal-store"
      label="Restaurant"
      value={value}
      onChange={handleChange}
      sx={{ minWidth: 280 }}
    >
      {orderForSwitcher(restaurants).map((restaurant) => (
        <MenuItem key={restaurant.id} value={restaurant.id}>
          {storeTitle(restaurant)} · {storeLocation(restaurant)}
          {restaurant.status !== 'HEALTHY' && ` (${STORE_STATUS_LABEL[restaurant.status]})`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default RestaurantSwitcher;
