import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import type { ReactElement } from 'react';

import type { HealthSignalKey, Restaurant } from '../../types/portal';
import { buildHealthSignals } from '../../utils/health-signals';
import { storeLocation } from '../../utils/restaurant';
import { STORE_STATUS_LABEL, storeStatusToTone } from '../../utils/status';
import InfoCard, { InfoCardRow } from '../info-card';

const SIGNAL_ICONS: Record<HealthSignalKey, ReactElement> = {
  internet: <WifiOutlinedIcon />,
  devices: <DnsOutlinedIcon />,
  secure: <ShieldOutlinedIcon />,
  routing: <RouterOutlinedIcon />,
};

interface RestaurantSignalsProps {
  restaurant: Restaurant;
}

/**
 * The top of a restaurant's page, as the Next app's store page (StoreInfo.js): one row of glass
 * cards, the restaurant and its status first, then one card per health signal.
 */
const RestaurantSignals = ({ restaurant }: RestaurantSignalsProps) => (
  <InfoCardRow data-testid="restaurant-signals">
    <InfoCard
      icon={<StorefrontOutlinedIcon />}
      label={`Store ${restaurant.storeNumber}`}
      value={storeLocation(restaurant)}
      detail={`${restaurant.address} · Updated ${restaurant.lastUpdate}`}
      tone={storeStatusToTone(restaurant.status)}
      chipLabel={STORE_STATUS_LABEL[restaurant.status]}
      isHighlighted
    />
    {buildHealthSignals(restaurant).map((signal) => (
      <InfoCard
        key={signal.key}
        icon={SIGNAL_ICONS[signal.key]}
        label={signal.label}
        value={signal.value}
        detail={signal.detail}
        tone={signal.tone}
      />
    ))}
  </InfoCardRow>
);

export default RestaurantSignals;
