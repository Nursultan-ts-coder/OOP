import type { RestaurantTab } from '../types/portal';

export interface RestaurantTabOption {
  key: RestaurantTab;
  label: string;
  /** False for a tab whose page isn't built yet: it shows, but can't be picked. */
  isLive: boolean;
}

export const RESTAURANT_TABS: RestaurantTabOption[] = [
  { key: 'overview', label: 'Overview', isLive: true },
  { key: 'network', label: 'Network', isLive: false },
  { key: 'devices', label: 'Devices', isLive: false },
  { key: 'insights', label: 'Insights', isLive: true },
  { key: 'wireless', label: 'Wireless', isLive: false },
];

/** The restaurants offered first in the restaurant switcher. */
export const QUICK_SWITCH_STORE_IDS = ['4023', '4031', '4038', '4012', '4015'];
