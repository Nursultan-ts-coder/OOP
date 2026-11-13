import { GlobalStyles } from '@mui/material';
import type { ReactNode } from 'react';

import { portalSurfaces } from '../../theme/surfaces';
import { SurfaceRoot } from './portal-surface.styled';

/**
 * The portal's page: its own darker page color and the Figma card style for every card inside,
 * in the standalone app and inside grafana alike. The page color also goes on <body> while the
 * portal is open, so it reaches the edges of the window.
 */
const PortalSurface = ({ children }: { children: ReactNode }) => (
  <>
    <GlobalStyles styles={(theme) => ({ body: { backgroundColor: portalSurfaces(theme).page } })} />
    <SurfaceRoot>{children}</SurfaceRoot>
  </>
);

export default PortalSurface;
