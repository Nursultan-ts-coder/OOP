import { useQuery } from '@tanstack/react-query';

import {
  MOCK_MAINTENANCE,
  MOCK_PORTFOLIO_SUMMARY,
  MOCK_PRIORITY_ALERTS,
  MOCK_RESTAURANTS,
} from '../const/mock-data';
import type {
  MaintenanceWindow,
  PortfolioSummary,
  PriorityAlert,
  Restaurant,
} from '../types/portal';
import { portalQueryKeys } from './query-keys';

export interface Portfolio {
  restaurants: Restaurant[];
  summary: PortfolioSummary;
  priorityAlerts: PriorityAlert[];
  maintenance: MaintenanceWindow;
}

// The sample data until the portal's API exists; replace the body with the API call.
const fetchPortfolio = async (): Promise<Portfolio> => ({
  restaurants: MOCK_RESTAURANTS,
  summary: MOCK_PORTFOLIO_SUMMARY,
  priorityAlerts: MOCK_PRIORITY_ALERTS,
  maintenance: MOCK_MAINTENANCE,
});

/** The owner/operator's restaurants, their counts, the alerts to look at first and maintenance. */
export const usePortfolio = () =>
  useQuery({ queryKey: portalQueryKeys.portfolio, queryFn: fetchPortfolio });
