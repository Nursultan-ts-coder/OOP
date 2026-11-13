import { alpha, styled } from '@mui/material/styles';

import type { StatusTone } from '../../types/portal';
import { resolveToneColor } from '../../utils/status';

export const Dot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone: StatusTone }>(({ theme, tone }) => {
  const color = resolveToneColor(theme.palette, tone);
  return {
    flex: 'none',
    width: theme.spacing(1.25),
    height: theme.spacing(1.25),
    borderRadius: '50%',
    backgroundColor: color,
    boxShadow: `0 0 0 3px ${alpha(color, 0.25)}`,
  };
});
