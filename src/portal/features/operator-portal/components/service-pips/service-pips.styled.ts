import { styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

export const PipList = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5, 1.5),
}));

export const Pip = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isLarge',
})<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.625),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  ...(isLarge && { gap: theme.spacing(0.75), fontSize: theme.typography.pxToRem(14) }),
}));

export const PipDot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone' && prop !== 'isLarge',
})<{ tone: StatusTone; isLarge: boolean }>(({ theme, tone, isLarge }) => ({
  width: theme.spacing(isLarge ? 1 : 0.75),
  height: theme.spacing(isLarge ? 1 : 0.75),
  borderRadius: '50%',
  backgroundColor: resolveToneColor(theme.palette, tone),
}));
