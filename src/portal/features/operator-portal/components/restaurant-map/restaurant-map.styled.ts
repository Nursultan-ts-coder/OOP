import { styled } from '@mui/material/styles';

import { glassStyles } from '@/shared/styles/glass';

/** The map's box: it fills its slot (PortfolioMap sizes it), rounded like the cards. */
export const MapFrame = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  borderRadius: theme.shape.panel,
  overflow: 'hidden',
  // The info window's title (grafana's CustomInfoWindow heading), up from its card-title size.
  '& .gm-style-iw h2': {
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1.3,
  },
}));

export const InfoBody = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1.25),
  minWidth: 260,
}));

/** The top-right control, on the frosted glass of grafana's map controls (the Next map's tabs). */
export const MapCorner = styled('div')(({ theme }) => ({
  ...glassStyles(theme),
  borderRadius: theme.shape.pill,
  margin: theme.spacing(1.5),
  maxWidth: `calc(100cqw - ${theme.spacing(10)})`,
}));
