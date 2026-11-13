import { alpha, styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

type ToneProps = { tone: StatusTone; isLarge?: boolean };

/** The Next app's status chip: an outlined pill with a dot, in the status color. */
export const ChipRoot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone' && prop !== 'isLarge',
})<ToneProps>(({ theme, tone, isLarge }) => {
  const color = resolveToneColor(theme.palette, tone);
  return {
    flex: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    padding: theme.spacing(0.375, 1.25),
    border: `1px solid ${color}`,
    borderRadius: theme.shape.pill,
    backgroundColor: alpha(color, 0.08),
    color,
    fontSize: theme.typography.pxToRem(12.5),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '0.03em',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...(isLarge && {
      gap: theme.spacing(0.875),
      padding: theme.spacing(0.5, 1.5),
      fontSize: theme.typography.pxToRem(14),
    }),
  };
});

export const ChipDot = styled('span')(({ theme }) => ({
  flex: 'none',
  width: theme.spacing(0.875),
  height: theme.spacing(0.875),
  borderRadius: '50%',
  backgroundColor: 'currentColor',
}));
