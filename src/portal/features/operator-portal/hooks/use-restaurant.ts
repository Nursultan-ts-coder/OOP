import { usePortfolio } from './use-portfolio';

/** One restaurant of the portfolio, by its id; `restaurant` is undefined for an unknown id. */
export function useRestaurant(storeId: string) {
  const { data, isInitialLoading, error } = usePortfolio();
  const restaurant = data?.restaurants.find((item) => item.id === storeId);

  return { restaurant, restaurants: data?.restaurants ?? [], isInitialLoading, error };
}
