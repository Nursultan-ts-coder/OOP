import { Card } from '@mui/material';
import { alpha, keyframes, styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

export const UplinkRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0,
  padding: theme.spacing(1, 0),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

/** The link between two uplink nodes; dashed and amber when the hop is degraded. */
export const Connector = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDegraded',
})<{ isDegraded: boolean }>(({ theme, isDegraded }) => ({
  position: 'relative',
  flex: '1 1 24px',
  minWidth: 24,
  borderTop: `${isDegraded ? 2 : 1}px ${isDegraded ? 'dashed' : 'solid'} ${
    isDegraded ? theme.palette.warning.main : theme.palette.divider
  }`,
  '& svg': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, calc(-50% - 1px))',
    backgroundColor: theme.palette.background.widget,
    borderRadius: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    flexBasis: 16,
    alignSelf: 'center',
    borderTop: 0,
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

export const NodeCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: StatusTone }>(({ theme, tone }) => {
  const color = resolveToneColor(theme.palette, tone);
  return {
    position: 'relative',
    flex: '1 1 0',
    minWidth: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1.25, 1),
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
    '& .node-icon': {
      display: 'inline-flex',
      padding: theme.spacing(0.75),
      borderRadius: theme.shape.card,
      color: theme.palette.text.secondary,
      backgroundColor: alpha(color, 0.12),
      boxShadow: `0 0 0 3px ${alpha(color, 0.2)}`,
    },
  };
});

/** The live beat of a status light: it brightens and glows, then dims, every two seconds. */
const statusBeat = (color: string) =>
  keyframes({
    '0%, 100%': { opacity: 0.55, boxShadow: `0 0 0 0 ${alpha(color, 0)}` },
    '50%': {
      opacity: 1,
      boxShadow: `0 0 0 4px ${alpha(color, 0.25)}, 0 0 10px 2px ${alpha(color, 0.6)}`,
    },
  });

/** A node's status light, beating to show it is live (still for reduced motion). */
export const NodeDot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: StatusTone }>(({ theme, tone }) => {
  const color = resolveToneColor(theme.palette, tone);
  return {
    position: 'absolute',
    top: theme.spacing(1.25),
    right: theme.spacing(1.25),
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    backgroundColor: color,
    animation: `${statusBeat(color)} 2s ease-in-out infinite`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  };
});

export const NodeLabel = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightSemiBold,
  color: theme.palette.text.primary,
}));

export const NodeDetail = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(11),
  color: theme.palette.text.secondary,
}));

export const ClientsHeading = styled('div')(({ theme }) => ({
  margin: theme.spacing(1.5, 0, 1),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightBold,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
}));

export const ClientsRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: theme.spacing(1.5),
}));

export const LayoutFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(0.5, 1.5),
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  borderTop: `1px solid ${theme.palette.divider}`,
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));
