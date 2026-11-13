import type { Restaurant, StoreStatus } from '../types/portal';

/** "Store #4023". */
export const storeTitle = (restaurant: Pick<Restaurant, 'storeNumber'>) =>
  `Store #${restaurant.storeNumber}`;

/** "Schaumburg, IL". */
export const storeLocation = (restaurant: Pick<Restaurant, 'city' | 'state'>) =>
  `${restaurant.city}, ${restaurant.state}`;

/** The text a search matches: "store #4023 4023 schaumburg, il". */
const searchText = (restaurant: Restaurant) =>
  `${storeTitle(restaurant)} ${restaurant.storeNumber} ${storeLocation(restaurant)}`.toLowerCase();

/** Restaurants whose store number or location (city, state) contains the search text, ignoring case. */
export function filterRestaurants(restaurants: Restaurant[], search: string): Restaurant[] {
  const query = search.trim().toLowerCase();
  if (!query) return restaurants;
  return restaurants.filter((restaurant) => searchText(restaurant).includes(query));
}

/** A search suggestion: a location (every store in it) or one store. */
export interface SearchSuggestion {
  kind: 'location' | 'store';
  /** What the search box is set to when it is picked; it matches what the suggestion names. */
  label: string;
  /** The muted second line. */
  detail: string;
}

/** Locations first ("Evanston, IL", with their store count), then stores, both matching the text. */
export function searchSuggestions(restaurants: Restaurant[], search: string): SearchSuggestion[] {
  const matches = filterRestaurants(restaurants, search);
  const counts = new Map<string, number>();
  matches.forEach((restaurant) => {
    const location = storeLocation(restaurant);
    counts.set(location, (counts.get(location) ?? 0) + 1);
  });
  const locations: SearchSuggestion[] = [...counts]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, count]) => ({
      kind: 'location',
      label,
      detail: count === 1 ? '1 restaurant' : `${count} restaurants`,
    }));
  const stores: SearchSuggestion[] = [...matches]
    .sort((a, b) => a.storeNumber.localeCompare(b.storeNumber))
    .map((restaurant) => ({
      kind: 'store',
      label: storeTitle(restaurant),
      detail: storeLocation(restaurant),
    }));
  return [...locations, ...stores];
}

/** How many restaurants of the portfolio the sample list leaves out. */
export const hiddenRestaurantCount = (total: number, shown: number) => Math.max(total - shown, 0);

/** A status filter: every restaurant, or only those in one status. */
export type StatusFilter = 'ALL' | StoreStatus;

/** The restaurants a status filter keeps. */
export const filterByStatus = (restaurants: Restaurant[], status: StatusFilter): Restaurant[] =>
  status === 'ALL' ? restaurants : restaurants.filter((restaurant) => restaurant.status === status);
