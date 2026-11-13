import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PortalSurface, portfolioPath, RESTAURANT_SEGMENT } from '@/features/operator-portal';

const PortfolioPage = lazy(() => import('./portfolio'));
const RestaurantOverviewPage = lazy(() => import('./restaurant/[storeId]'));
const RestaurantInsightsPage = lazy(() => import('./restaurant/[storeId]/insights'));

/**
 * The Owner Operator Portal's routes, under the portal's base path (`portfolioPath()`). The same element is mounted
 * by the standalone app (src/app/routes/router.tsx), by grafana's router and by the Grafana app
 * plugin (grafana-plugin/).
 */
const OperatorPortalPage = () => (
  <PortalSurface>
    <Suspense fallback={null}>
      <Routes>
        <Route index element={<PortfolioPage />} />
        <Route path={`${RESTAURANT_SEGMENT}/:storeId`} element={<RestaurantOverviewPage />} />
        <Route
          path={`${RESTAURANT_SEGMENT}/:storeId/insights`}
          element={<RestaurantInsightsPage />}
        />
        <Route path="*" element={<Navigate to={portfolioPath()} replace />} />
      </Routes>
    </Suspense>
  </PortalSurface>
);

export default OperatorPortalPage;
