import { AppRootProps, PageLayoutType } from '@grafana/data';
import { PluginPage } from '@grafana/runtime';
import { lazy, Suspense } from 'react';

import { configurePortalBasePath } from '@/features/operator-portal';

import { PLUGIN_BASE_URL, type PortalSettings } from '../../constants';
import { applyPortalSettings } from '../../portal-config';
import { PluginPropsContext } from '../../utils/utils.plugin';
import { PortalProviders } from './PortalProviders';

// The portal's links point under the plugin's path, set before any of its pages render.
configurePortalBasePath(PLUGIN_BASE_URL);

/** The portal's own routes (portfolio, restaurant overview and insights), from src/portal. */
const OperatorPortalPage = lazy(() => import('@/pages/operator-portal'));

/** The app's root page: Grafana's page frame (without its header) around the Owner Operator Portal. */
function App(props: AppRootProps<PortalSettings>) {
  applyPortalSettings(props.meta.jsonData);

  return (
    <PluginPropsContext.Provider value={props}>
      {/* Canvas: no plugin title/description header (from plugin.json); the portal has its own. */}
      <PluginPage layout={PageLayoutType.Canvas}>
        <PortalProviders>
          <Suspense fallback={null}>
            <OperatorPortalPage />
          </Suspense>
        </PortalProviders>
      </PluginPage>
    </PluginPropsContext.Provider>
  );
}

export default App;
