import { IconButton, styled } from '@mui/material';

import { glassStyles } from '@/shared/styles/glass';

export const MapControlButton = styled(IconButton)(({ theme }) => ({
  ...glassStyles(theme),
  color: theme.palette.text.primary,
  width: 48,
  height: 48,
  borderRadius: theme.shape.pill,

  '&:hover': {
    backgroundColor: theme.palette.tonal.hover,
    color: theme.palette.tonal.text,
  },
}));
