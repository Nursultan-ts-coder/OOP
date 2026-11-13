import { Card } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

type BadgeProps = { tone?: StatusTone; isHighlighted: boolean };

/** The card: Figma's padding and gaps; its surface comes from the portal (PortalSurface). */
export const InfoCardRoot = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isHighlighted',
})<{ isHighlighted: boolean }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
  // Low and wide: little vertical padding, so the row stays short.
  padding: theme.spacing(1.5, 2.25),
  [theme.breakpoints.down('xl')]: { padding: theme.spacing(1.25, 1.75) },
}));

export const InfoCardHead = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  minWidth: 0,
  [theme.breakpoints.down('xl')]: { gap: theme.spacing(1.5) },
}));

/** The round icon badge: the icon in its status color on a 20% tint of it (the Figma badge). */
export const InfoCardBadge = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone' && prop !== 'isHighlighted',
})<BadgeProps>(({ theme, tone, isHighlighted }) => {
  const color = isHighlighted
    ? theme.palette.brand.loginCta
    : tone && tone !== 'neutral'
      ? resolveToneColor(theme.palette, tone)
      : theme.palette.text.secondary;
  return {
    flex: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: '50%',
    color,
    backgroundColor: alpha(color, 0.2),
    '& svg': { fontSize: theme.typography.pxToRem(32) },
    [theme.breakpoints.down('xl')]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      '& svg': { fontSize: theme.typography.pxToRem(28) },
    },
  };
});

export const InfoCardText = styled('span')(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
}));

export const InfoCardValue = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(30),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.15,
  [theme.breakpoints.down('xl')]: { fontSize: theme.typography.pxToRem(23) },
  color: theme.palette.text.primary,
  fontVariantNumeric: 'tabular-nums',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const InfoCardLabel = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(17),
  fontWeight: theme.typography.fontWeightMedium,
  color: alpha(theme.palette.text.primary, 0.8),
  [theme.breakpoints.down('xl')]: { fontSize: theme.typography.pxToRem(15) },
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

/** The foot line (Figma's "↗ 3.46% Since last month"): the status chip, then a muted note. */
export const InfoCardFoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
}));

export const InfoCardDetail = styled('span')(({ theme }) => ({
  minWidth: 0,
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightMedium,
  color: alpha(theme.palette.text.primary, 0.6),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

/** A row of equal-width info cards, a widget gap apart; two by two on narrow screens. */
export const InfoCardRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'minmax(0, 1fr)',
  alignItems: 'stretch',
  gap: theme.spacing(theme.layout.widgetGap),
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));
