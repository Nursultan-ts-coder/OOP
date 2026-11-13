/** React Query keys of the portal's data, one place so invalidation can find them. */
export const portalQueryKeys = {
  portfolio: ['operator-portal', 'portfolio'] as const,
  restaurantOverview: (storeId: string) =>
    ['operator-portal', 'restaurant', storeId, 'overview'] as const,
  restaurantInsights: (storeId: string) =>
    ['operator-portal', 'restaurant', storeId, 'insights'] as const,
};
